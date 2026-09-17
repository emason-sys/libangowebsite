# ADR-0002 · Reverse proxy: Nginx

**Date:** 2026-09-17 · **Status:** Accepted

## Context

Node processes shouldn't bind to 443 directly in production. We need TLS termination, security headers, gzip/brotli, a place to enforce the origin-lockout header from Cloudflare, and a way to serve static assets efficiently.

## Decision

Nginx (stable channel, Ubuntu package) as the reverse proxy in front of Next.js.

## Consequences

- Consistent with the existing Libango stack (the current `dev.libangolr.net` runs Nginx behind an OCI LB); operators already know it.
- Certbot + `letsencrypt` integration is well-trodden with Nginx.
- Adds one hop of latency (negligible, all local socket).
- We own the config — headers, redirects, and the Cloudflare-IP allowlist live in one file that can be reviewed in the repo.

## Alternatives considered

- **Caddy.** Automatic HTTPS out of the box is genuinely nice, but not enough to justify a second tool in the org. Revisit if we ever want automatic cert management without certbot.
- **No reverse proxy (Next.js bound to 443 via `setcap`).** Removes a component but also removes a natural place for headers, allowlists, and static asset serving. Node isn't the right process to run as the public listener.
