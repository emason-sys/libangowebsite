# Phase 4 (part 1) · Cloudflare Zone Setup and DNS Delegation

_Adding `devsite.libangolr.net` as a Cloudflare-managed subdomain while DNSmadeeasy stays authoritative for the rest of `libangolr.net`. Per ADR-0011._

You can do Part 1 (this file) in parallel with the OCI provisioning runbook. The remainder of Phase 4 (WAF, rate limits, Turnstile, origin lockout) comes after the origin is deployed in Phase 3.

## Step 1 — Create a Cloudflare account

Go to https://dash.cloudflare.com/sign-up. Use a stable email address you'll keep access to (recovery matters more than convenience). Enable 2FA immediately after account creation — **Profile → Authentication → Two-factor authentication**. Use an authenticator app rather than SMS.

**Verify:** you're signed in, 2FA is on, recovery codes are saved somewhere safe (a password manager).

## Step 2 — Add `devsite.libangolr.net` as a zone

On the dashboard, **Add a site**.

- Domain: `devsite.libangolr.net` — **not** `libangolr.net`. This is the subdomain-zone pattern; adding the whole apex would try to take over the entire domain.
- Plan: **Free** — enough for what we've designed.

Cloudflare scans for existing records. Because `devsite` is a fresh subdomain, it should find none. That's fine.

**Verify:** the zone appears in your dashboard as `devsite.libangolr.net` with status *Pending Nameserver Update*.

## Step 3 — Get the two Cloudflare nameservers

On the zone's overview page, Cloudflare shows two nameservers, e.g.:

```
gordon.ns.cloudflare.com
tara.ns.cloudflare.com
```

Yours will be different. **Copy them exactly** — the names are your specific nameservers, not a shared pool.

## Step 4 — Delegate the subdomain at DNSmadeeasy

Log in to DNSmadeeasy for the `libangolr.net` zone. Add two NS records for the `devsite` label:

| Name | Type | Value | TTL |
|---|---|---|---|
| `devsite` | NS | `<first Cloudflare NS>` | 3600 |
| `devsite` | NS | `<second Cloudflare NS>` | 3600 |

**Do not** add an A record for `devsite` at DNSmadeeasy — the whole point of delegation is that Cloudflare now answers for everything under `devsite.libangolr.net`. An A record here would either be ignored (child records win in DNS resolution) or cause confusion during propagation.

**Do not** delete or touch any other records for `libangolr.net` — MX, the root A/AAAA, `dev.libangolr.net`, everything else stays exactly as it is.

**Verify at DNSmadeeasy:** the two `NS` records are saved for `devsite`.

## Step 5 — Wait for delegation to propagate, then confirm

Delegation propagation is usually minutes but can be up to your DNSmadeeasy zone's SOA TTL. Confirm from your local machine:

```bash
# Should return the two Cloudflare nameservers you added
dig +short NS devsite.libangolr.net @8.8.8.8

# Trace shows the whole chain: root → .net → libangolr.net (DNSmadeeasy) →
#   devsite.libangolr.net (Cloudflare) — the last hop should be Cloudflare
dig +trace devsite.libangolr.net NS
```

**Verify:** the answering nameservers for `devsite.libangolr.net` are the two Cloudflare nameservers Cloudflare gave you. Once they are, refresh the Cloudflare dashboard — the zone status changes to *Active*.

## Step 6 — Baseline zone settings

On the `devsite.libangolr.net` zone in Cloudflare:

- **SSL/TLS → Overview → SSL/TLS encryption mode → Full (strict).**
  This requires a valid, publicly-trusted cert on the origin. Certbot in Phase 3 gives us that.
- **SSL/TLS → Edge Certificates → Always Use HTTPS = On.**
- **SSL/TLS → Edge Certificates → Minimum TLS Version = TLS 1.2** (bump to 1.3 later if you like; not universally supported on old Android).
- **SSL/TLS → Edge Certificates → HTTP Strict Transport Security (HSTS)** — leave *off* for now. We'll enable it in Phase 4 part 2 after we've been running clean over HTTPS for a week; enabling HSTS is a one-way door.
- **Speed → Optimization → Auto Minify → HTML/CSS/JS all on.**
- **Rules → Page Rules / Cache Rules → nothing yet.**

## Step 7 — Create the API token certbot will use

Certbot's DNS-01 challenge needs to add/remove a TXT record in the Cloudflare zone to prove ownership. Give it a **scoped** API token, not the account-wide Global API Key.

**My Profile → API Tokens → Create Token → Use template: "Edit zone DNS"**

- Permissions: `Zone.DNS.Edit` (that's the template)
- Zone Resources: **Include → Specific zone → `devsite.libangolr.net`**
- TTL: unbounded (or set 1 year and mark a rotation reminder)

Copy the token value once and store it in your password manager. Cloudflare shows it exactly once.

**Verify:** you have the token stored securely. Do not paste it in the chat or check it into git. We'll write it into `/root/.secrets/cloudflare.ini` (mode 0600) on `devsite` in Phase 3.

## Step 8 — Create the placeholder DNS record

In Cloudflare, add an A record for `devsite.libangolr.net` (the apex of your new zone):

- Type: A
- Name: `@` (this represents `devsite.libangolr.net` itself)
- IPv4: the public IP of your `devsite` instance from the OCI runbook
- Proxy status: **Proxied** (orange cloud) — this is what puts Cloudflare in the request path
- TTL: Auto

**Verify from your local machine:**

```bash
dig +short devsite.libangolr.net @1.1.1.1
```

Returns a Cloudflare IP (starts with `104.` or `172.` typically), not your origin IP. That means the proxy is engaged and your origin is masked. If it returns your OCI IP directly, the record is set to *DNS only* (grey cloud) — flip it to *Proxied*.

## What comes next

Once Cloudflare is Active and OCI is provisioned, Phase 3 installs Nginx and Node on the instance, obtains the letsencrypt cert via certbot DNS-01 (using the token from Step 7), and starts the app. Then Phase 4 part 2 — WAF managed rules, rate limits on `/api/apply` and `/api/token`, origin lockout (narrow security-list 443 from `0.0.0.0/0` to Cloudflare IP ranges + shared origin secret header), and turning on HSTS.
