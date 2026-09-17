# ADR-0007 · Secrets: systemd EnvironmentFile at start, OCI Vault later

**Date:** 2026-09-17 · **Status:** Accepted

## Context

The app needs to hold a small set of secrets at runtime: `BACKEND_API_KEY`, `TURNSTILE_SECRET_KEY`, and (later) an origin-lockout shared header. Options run from "plain env file on disk" to "secrets manager with short-lived credentials issued per request".

## Decision

For `devsite`, use a systemd `EnvironmentFile` at `/etc/libango-web.env`, owned `root:libango`, mode `0400`, containing key=value pairs. The systemd unit references it with `EnvironmentFile=`. Values are set by the deploy runbook (not the repo). For production, migrate to OCI Vault with Instance Principal authentication, so nothing sensitive sits on disk.

## Consequences

- Dead simple to review and rotate on a single-instance dev.
- No dependency on a running Vault service for the app to start.
- Rotation is manual: edit the file, `systemctl restart libango-web`. Acceptable at this scale.
- Contents never touch the repo (the file is not in `.env.example`, only its variable names are). `.gitignore` covers `.env*` broadly.
- Prod migration path is documented, not built.

## Alternatives considered

- **OCI Vault from day one.** Better answer for prod. Overhead is disproportionate for one dev instance — Vault, secrets, KMS keys, IAM policies for Instance Principal to read them. Kept as the target state.
- **HashiCorp Vault.** Excellent, but running another service for this deployment is not warranted.
- **Environment variables in the systemd unit.** They end up in `systemctl show`, visible to any user who can read unit files. Worse than an `EnvironmentFile` at 0400.
