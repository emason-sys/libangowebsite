# Architecture Decision Records

Short, dated records of decisions that shape this project. Format: context (why the decision was in front of us), decision (what we chose), consequences (what we now accept), alternatives (what we rejected and why). MADR-lite.

New ADRs get the next four-digit number and go under `docs/adr/NNNN-slug.md`.

| # | Title | Date | Status |
|---|---|---|---|
| [0001](0001-runtime-nextjs-standalone.md) | Runtime: Next.js standalone on VM | 2026-09-17 | Accepted |
| [0002](0002-reverse-proxy-nginx.md) | Reverse proxy: Nginx | 2026-09-17 | Accepted |
| [0003](0003-tls-letsencrypt-origin.md) | TLS on origin: Let's Encrypt | 2026-09-17 | Accepted |
| [0004](0004-captcha-cloudflare-turnstile.md) | CAPTCHA: Cloudflare Turnstile | 2026-09-17 | Accepted |
| [0005](0005-waf-cloudflare.md) | WAF: Cloudflare, not OCI WAF | 2026-09-17 | Accepted |
| [0006](0006-version-control-github.md) | Version control: GitHub over Azure DevOps | 2026-09-17 | Accepted |
| [0007](0007-secrets-envfile-then-vault.md) | Secrets: systemd EnvironmentFile at start, OCI Vault later | 2026-09-17 | Accepted |
| [0008](0008-availability-single-instance.md) | Availability: single instance for dev, HA path for prod | 2026-09-17 | Accepted |
| [0009](0009-backend-integration-private-vcn.md) | Backend integration path: private VCN preferred | 2026-09-17 | Accepted |
| [0010](0010-inter-site-auth-bearer-plus-ip-allowlist.md) | Inter-site auth: bearer + private VCN + IP allowlist | 2026-09-17 | Accepted |
| [0011](0011-dns-subdomain-delegation-to-cloudflare.md) | DNS: subdomain delegation to Cloudflare | 2026-09-17 | Superseded by 0012 |
| [0012](0012-turnstile-standalone-service.md) | Cloudflare Turnstile as a standalone service | 2026-09-17 | Accepted |
| [0013](0013-portal-reverse-proxy.md) | Portal reverse proxy on a dedicated subdomain, gated by Turnstile | 2026-09-18 | Accepted |
