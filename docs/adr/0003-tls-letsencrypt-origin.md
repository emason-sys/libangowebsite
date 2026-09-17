# ADR-0003 · TLS on origin: Let's Encrypt

**Date:** 2026-09-17 · **Status:** Accepted

## Context

Cloudflare fronts the site with its own edge TLS. The origin still needs a cert so Cloudflare can talk to it in **Full (Strict)** mode — the only Cloudflare TLS mode we consider secure. Two mainstream options for the origin cert: Let's Encrypt (free, 90-day, publicly trusted) or Cloudflare Origin CA (free, up to 15-year, trusted only by Cloudflare).

## Decision

Let's Encrypt on the origin, obtained via certbot with the DNS-01 challenge (preferred because Cloudflare is in front and HTTP-01 requires a validation path through the edge).

## Consequences

- Certs auto-renew via the certbot systemd timer; renewal failures alert us before expiry via the standard `dev@…` notification.
- The origin cert is publicly trusted, so if we ever need to test the origin directly (bypassing Cloudflare with a temporary allowlist), no cert warnings.
- 90-day renewal cadence is a monitoring point — we track renewal success as a runbook item.

## Alternatives considered

- **Cloudflare Origin CA.** Longer-lived (up to 15 years), dedicated to the Cloudflare-origin leg, no ACME machinery. The tradeoff is dependence on Cloudflare's trust chain at the origin: if we ever move off Cloudflare, we have to switch cert providers as part of the migration. Kept as a fallback for a future prod build where Cloudflare is a firmer commitment.
- **Self-signed cert.** Rejected: Full (Strict) still validates the cert chain in some configurations, and no publicly-trusted chain means we can't verify the origin from anywhere but through Cloudflare.
