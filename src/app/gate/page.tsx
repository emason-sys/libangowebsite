"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Portal gate page.
 *
 * Rendered under devportal.libangolr.net/gate when a visitor lacks a valid
 * `libango_portal` cookie. Presents the Cloudflare Turnstile widget; on
 * success, POSTs the token to /api/portal/verify, which issues the cookie
 * and returns the sanitized `next` target. The browser then navigates to
 * that target on the same origin (devportal.libangolr.net) and nginx lets it
 * through to the backend at 10.0.1.177:3001.
 *
 * The page is intentionally minimal — no site header or footer — because it
 * is a transient checkpoint, not a page a visitor lingers on. The site
 * header and footer skip themselves for this route.
 */
function GateInner() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/";
  const widgetRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"waiting" | "verifying" | "error">("waiting");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!SITE_KEY || !widgetRef.current) return;
    const el = widgetRef.current;
    let widgetId: string | undefined;

    const submit = async (token: string) => {
      setStatus("verifying");
      setError("");
      try {
        const res = await fetch("/api/portal/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ turnstileToken: token, next }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "Verification failed. Please try again.");
        }
        const data = (await res.json()) as { next: string };
        window.location.replace(data.next);
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Verification failed.");
        if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
      }
    };

    const render = () => {
      if (window.turnstile && el.childElementCount === 0) {
        widgetId = window.turnstile.render(el, {
          sitekey: SITE_KEY,
          callback: submit,
          "expired-callback": () => setStatus("waiting"),
          "error-callback": () => {
            setStatus("error");
            setError("The verification widget could not load. Please refresh and try again.");
          },
        });
      }
    };

    if (window.turnstile) {
      render();
    } else {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.onload = render;
      s.onerror = () => {
        setStatus("error");
        setError("Could not load the verification widget. Please refresh and try again.");
      };
      document.head.appendChild(s);
    }

    return () => {
      if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
    };
  }, [next]);

  return (
    <main className="gate-view">
      <div className="gate-card">
        <span className="eyebrow">Human check</span>
        <h1>One moment — verifying you&apos;re human</h1>
        <p>
          We ask this once before letting you into the Libango portal, so the
          service stays fast and safe for real customers. You&apos;ll be sent
          straight through when the check passes.
        </p>
        <div ref={widgetRef} className="gate-widget" />
        {status === "verifying" && <p className="gate-note">Verifying…</p>}
        {status === "error" && <p className="gate-error">{error}</p>}
        {!SITE_KEY && (
          <p className="gate-note">
            Verification is not configured on this server yet. Set
            <code> NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> and restart.
          </p>
        )}
      </div>
    </main>
  );
}

export default function GatePage() {
  return (
    <Suspense fallback={<div />}>
      <GateInner />
    </Suspense>
  );
}
