import { NextResponse } from "next/server";
import { COOKIE_NAME, issueSessionToken, sanitizeNext } from "@/lib/portal-cookie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface VerifyBody {
  turnstileToken?: string;
  next?: string;
}

interface SiteverifyResponse {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Portal gate — Turnstile verification endpoint.
 *
 * Called by the client-side gate page after the Turnstile widget produces a
 * token. Verifies the token with Cloudflare's siteverify endpoint using
 * TURNSTILE_SECRET_KEY, and on success issues an HMAC-signed cookie that the
 * nginx `auth_request` module consults on every hit to devportal.libangolr.net.
 *
 * Body: JSON { turnstileToken: string, next?: string }
 * Success: 200 { ok: true, next: <sanitized-path> } + Set-Cookie: libango_portal
 * Failure modes:
 *   400 — missing token or malformed body
 *   403 — Cloudflare rejected the token
 *   500 — TURNSTILE_SECRET_KEY not configured on the server
 *   502 — could not reach Cloudflare
 */
export async function POST(req: Request) {
  let body: VerifyBody;
  try {
    body = (await req.json()) as VerifyBody;
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const token = body.turnstileToken?.trim();
  if (!token) {
    return NextResponse.json(
      { error: "Complete the human verification first." },
      { status: 400 },
    );
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("portal/verify: TURNSTILE_SECRET_KEY is not set");
    return NextResponse.json(
      { error: "Verification is not configured." },
      { status: 500 },
    );
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  const remoteip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (remoteip) form.set("remoteip", remoteip);

  let cf: SiteverifyResponse;
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body: form,
      cache: "no-store",
    });
    cf = (await res.json()) as SiteverifyResponse;
  } catch (err) {
    console.error("portal/verify: siteverify unreachable", err);
    return NextResponse.json(
      { error: "Verification service is unavailable. Please try again shortly." },
      { status: 502 },
    );
  }

  if (!cf.success) {
    console.warn("portal/verify: siteverify rejected", cf["error-codes"]);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 403 },
    );
  }

  const next = sanitizeNext(body.next);
  const session = issueSessionToken();

  const response = NextResponse.json({ ok: true, next });
  response.cookies.set(COOKIE_NAME, session.value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: session.maxAgeSec,
  });
  return response;
}
