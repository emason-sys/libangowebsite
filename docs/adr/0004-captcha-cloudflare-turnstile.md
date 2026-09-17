# ADR-0004 · CAPTCHA: Cloudflare Turnstile

**Date:** 2026-09-17 · **Status:** Accepted

## Context

The last-token retrieval API's developers require CAPTCHA on requests. The vendor application form is also a bot magnet. The visitor base is largely on Liberian mobile connections, so friction on real users matters. Options: Google reCAPTCHA v2/v3, hCaptcha, Cloudflare Turnstile, or a homegrown challenge.

## Decision

Cloudflare Turnstile on `/token` and `/apply`. Server-side siteverify happens in the Next.js API route handlers before any backend call is made.

## Consequences

- Free at any scale we care about.
- Near-invisible for most real users — no image puzzles, no "select all the buses" — which matters on 3G/4G.
- Privacy-friendly (no cross-site tracking cookie), which is appropriate for a public utility site.
- Locks the app to Cloudflare for CAPTCHA specifically. If we ever leave Cloudflare, swap for hCaptcha (same shape of client widget + server siteverify).
- The site key is public; the secret key lives in the systemd EnvironmentFile (ADR-0007).

## Alternatives considered

- **Google reCAPTCHA v3.** Also invisible, but Google-specific tracking and higher network weight. Common on the internet but a poorer fit for this audience.
- **hCaptcha.** Good alternative, kept as fallback if we ever leave Cloudflare.
- **Homegrown "prove you're human" challenge (honeypot field + timing).** Cheap and defeats amateurs but not motivated attackers. Not enough on its own for a form that feeds the CRM.
