# ADR-0013 · Portal reverse proxy on a dedicated subdomain, gated by Turnstile

**Date:** 2026-09-18 · **Status:** Accepted

## Context

The vendor-facing backend team stood up a new Next.js application at `10.0.1.177:3001` (host `srv-app-prod`, same OCI VCN as `dev-webserver`) that serves the *authoritative* Retrieve-Token and Vendor-Application flows. Users clicking those CTAs on the marketing site must be sent to that backend UI, not to our own `/token` and `/apply` forms. Two constraints shape the design:

1. **The backend is on a private VCN IP** — browsers cannot reach `10.0.1.177:3001` directly, so we must reverse-proxy it through our public origin on `dev-webserver`.
2. **The backend is a Next.js app** — its assets are served under `/_next/static/*`, the same path our own Next.js app uses. Same-domain reverse-proxy at a subpath like `/portal/*` would cause asset-namespace collision the moment either app fetches a chunk by absolute path (which Next.js does by default).

We also want to keep our existing `/token` and `/apply` forms in the codebase and routable, and we want bot protection at the proxy edge — not just at the backend.

## Decision

Add a new dedicated subdomain `devportal.libangolr.net` served by `dev-webserver` and reverse-proxy the entire backend UI through it. Namespaces are cleanly isolated because each Next.js app owns its own domain root. On top of the proxy, run a Cloudflare Turnstile challenge with a signed HMAC session cookie so bots can't harvest the proxied paths.

Concrete pieces:

- **DNS.** A record `devportal.libangolr.net` → `132.145.24.253` (same OCI public IP as `devsite.libangolr.net`), authoritative at DNSmadeeasy.
- **TLS.** A separate Let's Encrypt certificate for `devportal.libangolr.net`, obtained via `certbot certonly --nginx`, on the certbot-renew timer we already run.
- **Nginx.** A new server block (`deploy/nginx-portal.conf`) with the same TLS hardening and security-headers block as the `devsite` block. Two location patterns:
  - `/gate` and `/api/portal/*` route to our Next.js on `127.0.0.1:3000` (they are the gate itself, so they cannot be gated).
  - Everything else runs `auth_request /_portal_check` first; on 200 it proxies to `10.0.1.177:3001`, on 401 it redirects to `/gate?next=<original-uri>`.
  - `/_next/*` is a special case: gated identically, and on 401 it routes to *our* Next.js so the gate page's own JS chunks load. On 200 it routes to the backend so the backend UI's chunks load. Content-hashed chunk filenames guarantee no client-side cache collision.
- **Gate page.** A new `/gate` route on our Next.js. Renders the Turnstile widget; on success POSTs the token to `/api/portal/verify`, which calls Cloudflare `siteverify` with `TURNSTILE_SECRET_KEY` and, on `success: true`, issues an HMAC-signed cookie `libango_portal` (`HttpOnly; Secure; SameSite=Lax; Path=/`; TTL 15 min).
- **Check endpoint.** `GET /api/portal/check` reads the cookie, verifies its HMAC and expiry, returns 200 or 401. Called internally by nginx `auth_request` on every hit to the proxied paths.
- **CTAs.** The homepage and header links for "Retrieve Token" and "Become a Vendor" now point at `https://devportal.libangolr.net/` and `https://devportal.libangolr.net/vendor-applications/` respectively. The existing `/token` and `/apply` pages stay in the codebase and remain routable but are no longer linked from primary nav.

## Consequences

- **Clean namespace.** Each Next.js app owns its own domain root, so there are no asset-path rewrites and no fragile `sub_filter` chains. If either app changes its build output, nothing in nginx needs to change.
- **Real Cloudflare `siteverify`.** The Phase 5 "explicit siteverify at the public site edge" gap is closed. `TURNSTILE_SECRET_KEY` is now actually consumed.
- **Additional cert + DNS + nginx server block** to manage. One more Let's Encrypt renewal that runs on the same certbot timer we already have, so ongoing cost is near zero.
- **UX handoff.** Users see the URL change from `devsite.libangolr.net` to `devportal.libangolr.net` when they click the CTA. This is standard portal-handoff UX (`portal.stripe.com`, `dashboard.aws`, etc.) and clearly signals "you are now in the app."
- **15-min TTL, no rolling refresh.** A visitor who takes longer than 15 min filling out a multi-step form on the backend may be re-challenged mid-form. Backend session handling (and the backend's own form state) determines whether progress is lost. Rolling-refresh is a v2 improvement (`auth_request_set` capturing a Set-Cookie header from the check endpoint) if we see this happen in practice.
- **Two failure modes worth naming.** If the backend on `10.0.1.177:3001` goes down, the entire portal returns 502 through our nginx — same shape as the existing devsite→backend hop. If Cloudflare's `siteverify` endpoint is unreachable, our verify route returns 502 and users see "Verification service is unavailable" — they can retry on the same gate.

## Alternatives considered

- **`basePath: '/portal'` on the backend.** Add `basePath` to the backend's `next.config.js` and mount the reverse proxy at `devsite.libangolr.net/portal/*` on a single domain. Cleaner single-domain URL structure, but requires a backend redeploy and risks breaking any other consumer (mobile app, another site) that expects the current `/vendor-applications/` path. Rejected because the subdomain approach needs zero backend code changes.
- **`sub_filter` path rewrites in nginx.** Rewrite `/_next/` to `/portal/_next/` in HTML responses on the fly. Works for static HTML but any URL constructed by JavaScript at runtime (`fetch`, image lazy-loads, HMR-style updates) still requests `/_next/*` and fails. Not viable for a real Next.js app.
- **Iframe the backend inside a page on our site.** Loses URL fidelity, breaks browser back/forward, gives the backend no meaningful control of its own top-level layout, and complicates the Turnstile flow (iframe cannot easily communicate with the parent for cookie setting). Rejected.
- **Skip the gate; rely on the backend's own bot protection.** The backend team might already have Turnstile or rate limits on their side, but layering our own gate at the proxy edge blocks unauthenticated scraping of even the login page. Defense-in-depth is worth the small operational cost.
