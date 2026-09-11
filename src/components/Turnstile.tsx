"use client";

import { useEffect, useRef, useState } from "react";

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
 * Cloudflare Turnstile widget. When NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset
 * (local development), renders a visible placeholder checkbox instead so the
 * flow stays testable end to end.
 */
export function Turnstile({ onToken }: { onToken: (token: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const cbRef = useRef(onToken);
  cbRef.current = onToken;
  const [placeholderOk, setPlaceholderOk] = useState(false);

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    const el = ref.current;
    let widgetId: string | undefined;
    const render = () => {
      if (window.turnstile && el.childElementCount === 0) {
        widgetId = window.turnstile.render(el, {
          sitekey: SITE_KEY,
          callback: (token: string) => cbRef.current(token),
          "expired-callback": () => cbRef.current(null),
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
      document.head.appendChild(s);
    }
    return () => {
      if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
    };
  }, []);

  if (SITE_KEY) return <div ref={ref} style={{ marginTop: 18 }} />;

  const toggle = () => {
    const next = !placeholderOk;
    setPlaceholderOk(next);
    onToken(next ? "dev-placeholder-token" : null);
  };

  return (
    <div
      className={`turnstile${placeholderOk ? " ok" : ""}`}
      role="checkbox"
      aria-checked={placeholderOk}
      tabIndex={0}
      aria-label="Verify you are human"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <span className="box">
        {placeholderOk && (
          <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 12.5 9.5 18 20 6.5"
              fill="none"
              stroke="#fff"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span style={{ fontWeight: 600, fontSize: ".92rem" }}>Verify you are human</span>
      <small>
        Cloudflare
        <br />
        Turnstile · dev placeholder
      </small>
    </div>
  );
}
