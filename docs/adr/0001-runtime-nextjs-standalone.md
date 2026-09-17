# ADR-0001 · Runtime: Next.js standalone on VM

**Date:** 2026-09-17 · **Status:** Accepted

## Context

The site needs SSR + API routes (Turnstile verification, backend proxying, per-request rate limits). A static export was ruled out — a browser cannot hold the backend API bearer token safely. That leaves three plausible ways to run the Next.js server: a plain Node process on a VM, a Docker container, or a serverless deployment. `devsite` is a single instance on OCI, and the team already runs Linux VMs.

## Decision

Run the Next.js application in `output: 'standalone'` mode as a plain Node.js 22 process, supervised by systemd on the OCI compute instance. Nginx (see ADR-0002) reverse-proxies to it on `127.0.0.1:3000`.

## Consequences

- Simplest possible operational surface: one systemd unit, `journalctl -u libango-web` for logs, `systemctl restart libango-web` to redeploy.
- No container runtime to manage, no image registry, no orchestration.
- Direct integration with `letsencrypt` and system users — no volume-mount dance.
- When we move to prod (Phase 6, path-to-HA), containerizing becomes attractive; the standalone build already includes everything needed and drops into a minimal Node image without code changes.
- Small memory footprint suits Ampere A1 Free Tier.

## Alternatives considered

- **Docker + docker-compose.** Extra moving part for a single-instance dev environment, no immediate benefit.
- **OCI Container Instances / OKE.** Overkill for one dev instance; costs more, adds a control plane.
- **Serverless (OCI Functions).** Cold starts hurt SSR feel on mobile connections; per-invocation cost model is wrong for a low-but-steady traffic public site.
