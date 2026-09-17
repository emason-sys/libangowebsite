# ADR-0008 · Availability: single instance for dev, HA path for prod

**Date:** 2026-09-17 · **Status:** Accepted

## Context

`devsite.libangolr.net` is a development environment. Production will need higher availability. We should be explicit about what we're accepting now and what changes when we go to prod, so nobody discovers the gap in an incident.

## Decision

`devsite` runs on a single Ampere A1 Flex OCI compute instance. Cloudflare caches static assets at the edge, softening origin outages for GET traffic; POSTs (apply, token) fail during any origin outage. Recovery relies on a daily boot-volume snapshot and the repo-as-source-of-truth (any instance can be rebuilt from git).

For production, the target is: two instances in different Availability Domains behind an OCI Public Load Balancer (same pattern the existing Libango app uses), Cloudflare configured with the origin pool for automatic failover, and a documented, drilled restore procedure.

## Consequences

- Single point of failure accepted for `devsite`. RPO 24h, RTO 4h (proposed; needs Eric's sign-off).
- Instance patching or a reboot causes a visible outage — schedule to low-traffic windows and pre-announce.
- The path to HA is design-compatible: no code changes required, only deployment topology and DNS/LB config.

## Alternatives considered

- **Two instances behind LB from day one.** Overkill for a dev env; doubles cost; adds LB config, health checks, and session-stickiness decisions before they're needed.
- **Serverless as HA-by-default.** See ADR-0001 — wrong shape for this workload.
