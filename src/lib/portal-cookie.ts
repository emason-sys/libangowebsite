import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed HMAC session cookie for the portal reverse proxy at devportal.libangolr.net.
 *
 * The cookie proves the visitor solved a Cloudflare Turnstile challenge within
 * the TTL window. Format: `<expiryMs>.<base64url(hmac_sha256(expiryMs, secret))>`.
 * There is no user identity in it — just a bearer-of-token flag that nginx's
 * `auth_request` module consults on every hit to the proxied paths.
 *
 * The 15-minute TTL is fixed at build time. Rolling refresh is a v2 improvement.
 */

export const COOKIE_NAME = "libango_portal";
export const TTL_MS = 15 * 60 * 1000;

function requireSecret(): string {
  const secret = process.env.PORTAL_COOKIE_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("PORTAL_COOKIE_SECRET must be set to a 32+ character value.");
  }
  return secret;
}

export function issueSessionToken(now: number = Date.now()): {
  value: string;
  maxAgeSec: number;
} {
  const exp = now + TTL_MS;
  const mac = createHmac("sha256", requireSecret()).update(String(exp)).digest();
  return {
    value: `${exp}.${mac.toString("base64url")}`,
    maxAgeSec: Math.floor(TTL_MS / 1000),
  };
}

export function verifySessionToken(
  token: string | undefined,
  now: number = Date.now(),
): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) return false;
  const expStr = token.slice(0, dot);
  const macStr = token.slice(dot + 1);
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp <= now) return false;

  let given: Buffer;
  try {
    given = Buffer.from(macStr, "base64url");
  } catch {
    return false;
  }
  const expected = createHmac("sha256", requireSecret()).update(expStr).digest();
  if (given.length !== expected.length) return false;
  return timingSafeEqual(expected, given);
}

/**
 * Sanitize a `next` redirect target: only allow same-origin absolute paths,
 * rejecting scheme-relative (`//host`) and backslash-based host smuggling.
 */
export function sanitizeNext(candidate: string | null | undefined): string {
  if (!candidate) return "/";
  if (typeof candidate !== "string") return "/";
  if (!candidate.startsWith("/")) return "/";
  if (candidate.startsWith("//") || candidate.startsWith("/\\")) return "/";
  return candidate;
}
