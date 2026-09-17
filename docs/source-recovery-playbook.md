# How to recover a Claude Artifact into a maintainable project

_A reusable playbook. Written from the Libango website recovery (Sept 2026)._

Claude Artifacts are great for iteration but not built for production hosting: they live on a managed URL, ship as a single HTML document with inlined JS, and their update flow is Claude publishing new versions rather than a git-based one. Turning one into a self-hosted, version-controlled application is a repeatable exercise. This playbook is the steps we followed.

## When to do this

Do this when:

- The artifact has stabilized and design review is done.
- You need your own domain, your own analytics/logging, or your own uptime story.
- You have real backend integration to wire in (an API that shouldn't be called from the browser).
- You want version control, CI/CD, and the ability for teammates to contribute.

Don't do this when:

- The artifact is still being iterated on with the user; every version becomes a merge headache.
- The output is genuinely a one-off (a demo, a share).

## Prerequisites

- Access to the artifact (its URL, or the local file used to publish it).
- Node.js 22 (or the LTS you're standardizing on) locally.
- A git host account.
- If the artifact talked to a real backend, the API contract (endpoints, auth, request/response shapes).

## The recovery

**Step 1 — Get the source.** From Claude Code / the CLI, `Read` the artifact's underlying file. From the web UI, the artifact panel exposes source (`⋮` → View source / Copy). Save the whole HTML document as `original.html` in a scratch directory so you have a known baseline. Do not start editing this file.

**Step 2 — Inventory the artifact.** Read `original.html` end to end and list, in a notes file:

- Fonts loaded from CDNs (Google Fonts is the usual one).
- Any external scripts (charting libraries, Turnstile, etc.).
- The CSS block — its length and whether it uses design tokens (CSS custom properties).
- The JS blocks — page routing, form handlers, data.
- Inline data (large `const` arrays or JSON blobs — often vendor lists, sample data, config).
- Images (usually base64-embedded in an artifact).

This inventory is what you'll port. Nothing else survives.

**Step 3 — Decide the target shape.** For a static-content page with no server-side logic, a static HTML/CSS/JS bundle is fine. For anything that talks to a backend, needs CAPTCHA verification, or holds a secret, you need a server — Next.js (React), SvelteKit, Astro with server routes, or Express + templating are the common picks. Pick the one your team already knows.

**Step 4 — Scaffold the target.** `create-next-app` (or equivalent). TypeScript from day one — it will pay you back within the first refactor. App Router or the framework's current-generation routing. Match the artifact's structure: one page per artifact view.

**Step 5 — Port the tokens, then the layout, then the pages.** In order:

1. Copy the CSS custom properties block into `globals.css`. This is the design system — everything downstream references it.
2. Recreate the layout shell (header, footer, main).
3. For each artifact view, create a page. Copy the DOM structure from `original.html`, translate class names one-to-one, translate DOM manipulation into framework state.
4. Do NOT rewrite the design at this stage — the artifact is the source of truth. Faithfulness first, refactors later.

**Step 6 — Move inline data into typed modules.** Any `const VENDORS = [...]` or similar in the artifact becomes a `.ts` module with a real type. If the data has a source of truth outside the artifact (a spreadsheet, a database), also write a small generator script so the module can be regenerated when the source changes.

**Step 7 — Replace client-side "mock" APIs with real server routes.** In the artifact, forms probably POSTed to nothing (or to a mock) and rendered a fake success. Create real route handlers (`/api/*` in Next.js) that (a) validate input, (b) verify CAPTCHA server-side, (c) call the real backend, (d) return the real result. If the backend isn't ready yet, keep a mock-mode fallback keyed off missing environment variables so the flow stays testable.

**Step 8 — Add the operational spine.** `.gitignore`, `.editorconfig`, `README`, `CODEOWNERS`, a minimal CI workflow (install + build), an `.env.example` documenting variables. First git commit.

**Step 9 — Confirm parity.** Render every page. Compare to the artifact side by side. Fix visual differences before adding new features.

**Step 10 — Diverge on purpose.** Now the recovered app can grow features the artifact never had — proper accessibility passes, analytics, tests, hardening — with git history behind every change.

## Anti-patterns

- **Trying to make the artifact HTML file itself the production build.** It works for a while and rots fast: no dependency management, no build pipeline, no testability.
- **Rewriting the design during the port.** You'll spend twice as long and produce something that looks different from what was approved. Port first, redesign later, in visible commits.
- **Skipping type definitions "for now".** The inline data blocks in artifacts are prime candidates for `any` — and prime candidates to cause a runtime bug three weeks later. Type them.
- **Hard-coding the API secret into the client bundle because "it's easier".** The client is untrusted. The secret must live on the server route or the visitor can extract it in ten seconds with the browser devtools.

## What we saved for the portfolio

For the Libango recovery, the sanitized case study includes: the inventory list from Step 2 (redacted), the shape of the data types from Step 6 (structural, no vendor names), a before/after diagram of the artifact's request path vs the recovered app's, and this playbook itself as a reusable artifact.
