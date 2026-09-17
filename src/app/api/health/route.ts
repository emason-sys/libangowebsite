import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Always fresh — never cache a liveness probe.
export const dynamic = "force-dynamic";

/**
 * Liveness endpoint for uptime monitors and the nginx health hook.
 *
 * Returns 200 with a small JSON body when the Node process is up and can
 * respond. Deliberately does NOT touch downstream services (backend API,
 * Turnstile) — a health probe should reflect *this* process's liveness only.
 * Deeper "readiness" checks (backend reachable, keys valid) belong in a
 * separate `/api/ready` route if we introduce one later.
 */
export function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "libango-website",
      ts: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
