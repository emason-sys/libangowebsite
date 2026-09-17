# Deploy artifacts

The nginx server block and systemd unit that run the site on the origin.
They live in the repo so the deploy is reproducible from source — anyone
following `docs/runbooks/phase3-deployment-runbook.md` can install the
exact configuration we're running.

## Files

| File | Installed at | Owner | Mode |
|---|---|---|---|
| `nginx-devsite.conf` | `/etc/nginx/conf.d/devsite.libangolr.net.conf` | `root:root` | `0644` |
| `libango-web.service` | `/etc/systemd/system/libango-web.service` | `root:root` | `0644` |

## Installing

From a fresh clone on the origin (or from `/home/opc/libango-website` on
`dev-webserver`), as `opc`:

```bash
sudo install -o root -g root -m 0644 deploy/nginx-devsite.conf \
  /etc/nginx/conf.d/devsite.libangolr.net.conf
sudo install -o root -g root -m 0644 deploy/libango-web.service \
  /etc/systemd/system/libango-web.service

sudo nginx -t && sudo systemctl reload nginx
sudo systemctl daemon-reload && sudo systemctl restart libango-web
```

## What each file assumes

**`nginx-devsite.conf`** — assumes the letsencrypt cert exists at
`/etc/letsencrypt/live/devsite.libangolr.net/{fullchain,privkey}.pem`
(obtained via `certbot certonly --nginx` per the Phase 3 runbook) and the
Node process is listening on `127.0.0.1:3000`. It sets HSTS, the security
headers block, and `X-Robots-Tag: noindex, nofollow` for the dev host.

**`libango-web.service`** — assumes the `libango` system user exists and
owns `/var/lib/libango-web/`, and the standalone Next.js runtime is at
`/var/lib/libango-web/current/server.js`. Hardening: `NoNewPrivileges`,
`PrivateTmp`, `PrivateDevices`, `ProtectSystem=strict` with
`ReadWritePaths=/var/lib/libango-web` (so Next.js can write its runtime
`.next/cache`), `ProtectHome`, `MemoryMax=512M`.

## SELinux

Nginx needs one boolean flipped to reverse-proxy to the Node process:

```bash
sudo setsebool -P httpd_can_network_connect on
```

Set once per host. Not a file in this directory.
