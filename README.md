# Libango Holdings — Public Website

Public site for Libango Holdings, LEC's super vendor: vendor application, vendor locator, last-token retrieval, and company information.

Stack: Next.js 15 (App Router, TypeScript, Node standalone), Nginx reverse proxy, Cloudflare in front (WAF + Turnstile + rate limits), self-hosted on Oracle Cloud Infrastructure. Design carried over from the approved Claude Artifact prototype.

**Target dev host:** `devsite.libangolr.net` · **Repo:** `github.com/emason-sys/libangowebsite`

## Pages

| Route     | What it does |
| --------- | ------------ |
| `/`       | Home — hero, network map, stats, how-it-works, platform partners, vendor CTA |
| `/locate` | Vendor locator — area-bubble map + Greater Monrovia detail, filters, search, directions, distance sort |
| `/token`  | Retrieve last token — meter number + Cloudflare Turnstile → secure lookup |
| `/apply`  | Vendor application — county → city cascade, PDF/JPG registration document upload |
| `/about`  | Super-vendor story, values, FAQ |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; all optional in dev
npm run dev                  # http://localhost:3000
npm run build && npm start   # production-mode local run
```

With no environment variables set, the site runs fully in **mock mode**: `/api/apply` and `/api/token` validate input and return mock responses (flagged as such), and the token page shows a visible placeholder instead of the real Turnstile widget. This keeps every flow testable without touching production systems.

After the first `npm install`, commit the generated `package-lock.json` and switch the CI install step to `npm ci`.

## Environment variables

| Variable | Purpose | Required |
| -------- | ------- | :---: |
| `BACKEND_APPLY_URL`  | Libango application endpoint that receives vendor applications | prod |
| `BACKEND_TOKEN_URL`  | Libango application endpoint for last-token retrieval | prod |
| `BACKEND_API_KEY`    | Bearer token sent to the backend on inter-site calls (ADR-0010) | prod |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public; used by the browser widget) | prod |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (server-side siteverify) | prod |

Never commit `.env.local` or any file containing real secrets. Push protection is enabled on the repo.

## Vendor data

`src/lib/vendors.ts` is generated from the master workbook ("LIBANGO Vendors Full List 2026") — regenerate it when the directory changes rather than hand-editing rows. Vendors carry landmark addresses; exact GPS coordinates are optional per vendor (`lat`/`lon`) and automatically upgrade "Get directions" from a landmark search to precise navigation.

## Architecture

At a glance:

```
Visitor → Cloudflare (WAF + rate limit + Turnstile edge)
       → OCI (nginx → Next.js standalone, systemd)
         → Libango backend at dev.libangolr.net (private VCN path, bearer token)
```

Full documentation:

- [`docs/adr/`](docs/adr/) — architecture decision records, one file per decision
- [`docs/source-recovery-playbook.md`](docs/source-recovery-playbook.md) — how the site was recovered from a Claude Artifact into a maintainable project (reusable for other Artifact ports)

Additional design & operational documents live in the private project workspace (architecture brief, phased plan, requirements & decisions).

## CI/CD

`.github/workflows/ci.yml` installs and builds (which type-checks) on every push and pull request. Additional checks (`npm audit`, ESLint, `next lint`) land in the first PR against `main`. The deploy step is intentionally absent until Phase 3 (OCI deployment) — see notes at the bottom of the workflow file.

## Security posture

- Cloudflare edge: DNS proxied, TLS at edge, WAF managed rules, rate limits on `/api/apply` and `/api/token`.
- Origin lockout: nginx accepts 443 only from Cloudflare IP ranges + a shared origin secret header.
- Turnstile: server-side siteverify in `/api/apply` and `/api/token` before any backend call.
- Inter-site auth: bearer token, private VCN path, source-IP allowlist on the backend (ADR-0010).
- No secret ever ships in the client bundle.

See the ADRs for the full rationale.

## License

Proprietary. All rights reserved by Libango Holdings.
