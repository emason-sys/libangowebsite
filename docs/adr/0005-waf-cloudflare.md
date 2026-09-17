# ADR-0005 · WAF: Cloudflare, not OCI WAF

**Date:** 2026-09-17 · **Status:** Accepted

## Context

We need a WAF in front of the public origin. Two viable choices: Cloudflare's WAF (already in the request path once we adopt Cloudflare) or OCI WAF (attaches to an OCI Load Balancer or a public endpoint).

## Decision

Cloudflare WAF. Enable Cloudflare Managed Rules and the OWASP Core Rule Set. Add custom rules for `/api/apply` and `/api/token` rate limits (see ADR-0004 and the Phase 4 runbook).

## Consequences

- Sits at the earliest point in the request path, before the origin ever sees a packet.
- Rules, rate limits, and Turnstile all live in the same Cloudflare account — one admin surface.
- Free plan includes managed rules and basic rate limiting; Pro/Business unlock advanced rules and higher rate-limit ceilings. We can start on Free and upgrade if traffic warrants.
- If Libango ever moves off Cloudflare, OCI WAF is the fallback; the rules would need reauthoring.

## Alternatives considered

- **OCI WAF.** Costs per-policy per-month plus per-million-requests. Adds a second admin surface. Sensible if Cloudflare is not in the picture at all. Kept as a fallback.
- **ModSecurity in Nginx (origin only).** Free, self-hosted, but any origin-only WAF is bypassed by the traffic that never reaches origin — DDoS, credential stuffing, scraping. And running ModSecurity well is a job.
