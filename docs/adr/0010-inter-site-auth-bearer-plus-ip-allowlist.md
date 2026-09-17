# ADR-0010 · Inter-site auth: bearer token + private VCN + IP allowlist

**Date:** 2026-09-17 · **Status:** Accepted

## Context

The website's server-side handlers call the Libango application's API to submit vendor applications and to look up last tokens. That call needs to be authenticated in a way (a) that keeps the credential off any user-facing surface, (b) that is simple enough for another engineer to operate, and (c) that has room to strengthen without a rewrite when production requirements grow.

## Decision

Three layers, all applied to every inter-site call:

1. **Bearer token in the `Authorization` header.** A long random secret is provisioned once, stored on `devsite` as `BACKEND_API_KEY` in the systemd EnvironmentFile (ADR-0007), and validated by the backend on every request. Rotated on a schedule and on personnel change.
2. **Private VCN path** (ADR-0009). The token never traverses the public internet on this leg.
3. **Source-IP allowlist on the backend API endpoints.** Only `devsite`'s OCI internal IP is permitted for the vendor-submission and token-retrieval endpoints. Second layer if the token ever leaks or is misused from an unexpected origin.

Plus a fourth cheap addition: **short-window request timestamp.** Requests carry an `X-Submitted-At` ISO-8601 timestamp; the backend rejects requests older than a configurable window (proposed 5 minutes). Prevents trivial replay if the token is somehow captured mid-flight.

## Consequences

- Simple enough to explain in one paragraph and operate with `openssl rand -hex 32` + a systemd restart.
- Rotation is a two-step: rotate the value on the backend and on `devsite` within a maintenance window (they must agree). A grace period with two valid tokens supports zero-downtime rotation if we want it later.
- If the token ever leaks, the IP allowlist prevents remote abuse until it can be rotated.
- Does not preclude upgrading later to mTLS (client cert issued to `devsite` from a private CA) or HMAC-signed requests — either can replace #1 without touching #2 or #3.

## Alternatives considered

- **mTLS.** Stronger cryptographically; costs a private CA, a cert-rotation story, and dual server-side configuration (client cert verification on the backend). Overkill for `devsite`; kept as a prod upgrade path.
- **HMAC-signed requests.** Also stronger; requires a signing library on both ends and careful canonicalization of the request. Warranted when the backend faces multiple untrusted callers; here the backend has one caller.
- **No auth, rely on network isolation alone.** Rejected. Even with a private VCN, any other workload in the same VCN could impersonate `devsite`. Authentication is the load-bearing control; the network layer is defense in depth.
