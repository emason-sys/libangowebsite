# ADR-0009 · Backend integration path: private VCN preferred

**Date:** 2026-09-17 · **Status:** Accepted

## Context

Both `devsite.libangolr.net` and the existing Libango application at `dev.libangolr.net` are hosted on OCI. The website's server-side handlers (`/api/apply`, `/api/token`) call the application's API. That traffic can travel two ways: over the public internet (via the app's Cloudflare-fronted public LB) or over a private path inside OCI (same VCN or peered VCNs).

## Decision

Prefer the private VCN path. If `devsite` is deployed into the same VCN as the app (see requirements-and-decisions.md Q5), reach the app by its private endpoint. If peered VCNs are used, reach it across the peering. Only fall back to the public LB path if a private path is not available.

## Consequences

- No public-internet leg for API traffic; no reliance on Cloudflare or the public LB being up for backend calls.
- Zero egress cost (private traffic inside a tenancy is free).
- Lower and more predictable latency.
- TLS is still enforced on the private hop.
- Bearer authentication still applies (see ADR-0010) — private path is defense in depth, not authentication.

## Alternatives considered

- **Public LB path (Cloudflare-fronted).** Works, and is what we fall back to if there's no private path. Adds a hop and creates a shared-fate dependency with public visitor traffic. Kept as fallback.
- **Direct instance-to-instance over Cloudflare Tunnel.** Elegant but adds a new component and an outbound dependency to Cloudflare for backend traffic. Not warranted when a native VCN path exists.
