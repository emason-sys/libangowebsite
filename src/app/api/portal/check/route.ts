import { NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/portal-cookie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Portal gate — nginx `auth_request` validator.
 *
 * Called internally by the nginx server block for devportal.libangolr.net on
 * every protected request. Reads the `libango_portal` cookie from the client's
 * headers (forwarded by nginx), verifies its HMAC signature and expiry, and
 * returns 200 (allow) or 401 (deny). nginx maps a 401 to a 302 redirect to
 * the gate page.
 *
 * Body is never read; the response body is always empty. Uses a lightweight
 * cookie parser rather than reading Next.js `cookies()` so the endpoint stays
 * dependency-free and fast for every proxied hit.
 */
export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = parseCookie(cookieHeader, COOKIE_NAME);

  if (verifySessionToken(token)) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 401 });
}

function parseCookie(header: string, name: string): string | undefined {
  if (!header) return undefined;
  const target = `${name}=`;
  for (const part of header.split(";")) {
    const trimmed = part.trimStart();
    if (trimmed.startsWith(target)) {
      const raw = trimmed.slice(target.length);
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    }
  }
  return undefined;
}
