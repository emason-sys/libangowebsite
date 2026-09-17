# ADR-0011 · DNS: subdomain delegation to Cloudflare

**Date:** 2026-09-17 · **Status:** Accepted

## Context

`libangolr.net` is authoritatively served by DNSmadeeasy. We want Cloudflare in front of `devsite.libangolr.net` for WAF, Turnstile support, TLS at the edge, and rate limiting — none of which work unless Cloudflare is authoritative for something. We don't want the website deployment to trigger a broader DNS migration for the whole zone.

## Decision

Delegate the single subdomain `devsite.libangolr.net` to Cloudflare. Add the subdomain as its own zone in a Cloudflare account (Free plan). Cloudflare provides two nameservers; DNSmadeeasy is configured with `NS` records for `devsite.libangolr.net` pointing to those nameservers. All records under `devsite.libangolr.net` are then managed in Cloudflare. Nothing else on `libangolr.net` is touched.

## Consequences

- Surgical: only the one subdomain is in Cloudflare's authority; MX, the main site, `dev.libangolr.net`, and all other DNSmadeeasy-managed records are untouched.
- Reversible: to roll back, remove the `NS` records at DNSmadeeasy and the subdomain resolves back to whatever DNSmadeeasy has for it (or NXDOMAIN if nothing).
- Cost: $0 on the Cloudflare Free plan.
- Coordination: needs whoever administers DNSmadeeasy for the zone to add the two `NS` records. Low-risk change.
- Verification steps (part of Phase 4): confirm the new `NS` delegation propagates (`dig +trace devsite.libangolr.net NS`), confirm Cloudflare shows the zone as active, confirm records added under it resolve, confirm the proxied A record returns Cloudflare IPs to a public resolver.

## Alternatives considered

- **Move the whole zone to Cloudflare.** Simpler in some ways (one authoritative provider) but a bigger change than this project should trigger. Loses any DNSmadeeasy-specific features the zone uses. Kept as a possibility for a separate consolidation conversation.
- **Cloudflare CNAME setup / "Cloudflare for SaaS".** Requires Business plan or higher ($200/mo). Not warranted at this scale.
- **Skip Cloudflare, use OCI WAF.** Loses Turnstile integration and adds cost. See ADR-0005.
