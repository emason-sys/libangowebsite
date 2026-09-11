# Libango Holdings — Public Website

Public site for Libango Holdings, LEC's super vendor: vendor application, vendor
locator, last-token retrieval, and company information. Next.js (App Router,
TypeScript), design carried over from the approved prototype.

## Pages

| Route     | What it does |
| --------- | ------------ |
| `/`       | Home — hero, network map, stats, how-it-works, platform partners, vendor CTA |
| `/locate` | Vendor locator — area-bubble map + Greater Monrovia detail, filters, search, directions, distance sort |
| `/token`  | Retrieve last token — meter number + Cloudflare Turnstile → secure lookup |
| `/apply`  | Vendor application — county→city cascade, PDF/JPG registration document upload |
| `/about`  | Super-vendor story, values, FAQ |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in what you have (all optional in dev)
npm run dev                  # http://localhost:3000
```

With no environment variables set, the site runs fully in **mock mode**: the
apply and token APIs validate input and return mock responses (flagged as such),
and the token page shows a visible placeholder instead of the real Turnstile
widget. This keeps every flow testable without touching production systems.

After the first `npm install`, commit the generated `package-lock.json` and
switch the CI install step to `npm ci`.

## Environment variables

| Variable | Purpose |
| -------- | ------- |
| `BACKEND_APPLY_URL`  | Existing Libango backend endpoint that receives vendor applications (multipart form, incl. `submittedAt`) |
| `BACKEND_TOKEN_URL`  | Secure last-token API endpoint (receives `{ meter, turnstileToken }`) |
| `BACKEND_API_KEY`    | Optional bearer token sent to both backend endpoints |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (server-side verification is the token API's responsibility) |

## Vendor data

`src/lib/vendors.ts` is generated from the master workbook
("LIBANGO Vendors Full List 2026") — regenerate it when the directory changes
rather than hand-editing rows. Vendors carry landmark addresses; exact GPS
coordinates are optional per vendor (`lat`/`lon`) and automatically upgrade
"Get directions" from a landmark search to precise navigation.

## CI/CD

`.github/workflows/ci.yml` installs and builds (which type-checks) on every push
and pull request. The deploy step is intentionally absent until the hosting
target is confirmed — see the notes at the bottom of the workflow file.
