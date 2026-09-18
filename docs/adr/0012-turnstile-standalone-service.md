# ADR-0012 · Cloudflare Turnstile as a standalone service, not an edge-integrated one

**Date:** 2026-09-17 · **Status:** Accepted · **Supersedes:** ADR-0011

## Context

The original plan (ADR-0011) was to delegate `devsite.libangolr.net` as a subdomain zone to Cloudflare so we could take advantage of Cloudflare's WAF, rate limits, and Turnstile support behind a single orange-cloud proxy. On Phase 4 execution, Cloudflare Free rejected a subdomain-only zone: their free tier requires the apex zone. Moving the full `libangolr.net` zone to Cloudflare would coordinate a broader DNS migration touching MX, the main site, `dev.libangolr.net`, and every other record — well outside the scope of a dev-site build. Upgrading to a paid Cloudflare plan for one subdomain isn't warranted at this scale either.

But we still need Turnstile: it's the CAPTCHA choice from ADR-0004 and the API developers explicitly require it on the token retrieval flow.

## Decision

Split Cloudflare's role. Use Turnstile as a **standalone service** — a Cloudflare product that is provisioned per widget and requires no DNS or edge integration to work. The site key is embedded in the client bundle, the secret key is stored server-side in the systemd EnvironmentFile, and the server verifies each token against `https://challenges.cloudflare.com/turnstile/v0/siteverify`. DNSmadeeasy stays authoritative for `libangolr.net` and every subdomain under it. No zone migration.

Concrete pieces:

- Cloudflare account owns one thing about this project: the Turnstile widget(s).
- Widgets are configured with the specific hostnames they run under.
- The site's Turnstile server-side calls go directly to `challenges.cloudflare.com` — no Cloudflare-fronted DNS required.

## Consequences

- **Scope preserved.** Zero coordination cost with whoever administers `libangolr.net` at DNSmadeeasy.
- **No edge WAF or rate limiting from Cloudflare.** ADR-0005 already committed to nginx-level rate limits and OCI Security List as the origin defense; that stands with more weight now.
- **Turnstile still solves the core problem.** Human-check on write-through endpoints (`/api/apply`, `/api/token`, and later the portal gate — see ADR-0013) rejects bots before the backend is called.
- **Portable pattern.** The standalone Turnstile approach can be reused for any subdomain we add later without touching DNS.

## Alternatives considered

- **Full-zone migration to Cloudflare.** Rejected: too broad a change for this project to trigger. Kept as a possibility for a separate consolidation conversation.
- **Cloudflare Business plan for subdomain zones.** $200/mo for one subdomain during dev is not justified.
- **Different CAPTCHA (hCaptcha, Google reCAPTCHA).** The backend API developers specified Turnstile in the design; changing that would ripple into their code. Their preference stands.
- **No CAPTCHA at the public site, rely on backend's own bot protection.** Loses defense-in-depth and lets bots hammer our routes before the backend has a chance to reject them.
