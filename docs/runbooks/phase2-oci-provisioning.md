# Phase 2 · OCI Provisioning Runbook

_For `devsite.libangolr.net` on Oracle Linux 9, Ampere A1 Flex Always Free, in the existing Libango VCN. Follow top to bottom; every step has a verification._

## Assumptions

- You're logged in to the OCI Console with permissions to create compute, VCN subnets, and security lists in the tenancy that hosts the existing Libango app.
- The existing VCN is `libango_vcn` (or whatever you've named it). Confirm the name from **Networking → Virtual Cloud Networks** before you start.
- Your local machine has an SSH key pair ready. If not: `ssh-keygen -t ed25519 -f ~/.ssh/libango_devsite -C devsite-libango` and note the public key.

## Step 1 — Create a public subnet for `devsite`

Reason for a new subnet rather than reusing the existing one: keeps the site's security list scoped to only what it needs, doesn't inherit rules that were written for the backend.

**Console:** *Networking → Virtual Cloud Networks → libango\_vcn → Subnets → Create Subnet*

- Name: `devsite_public_subnet`
- Type: Regional
- CIDR: pick one that doesn't overlap existing subnets; `10.0.10.0/24` is a common free slot — confirm by scanning the existing subnets first
- Subnet access: **Public**
- Route table: `Default Route Table for libango_vcn` (must have an Internet Gateway target for `0.0.0.0/0`)
- DHCP options: default
- Security list: leave blank for now — we'll attach a fresh one after creating it in Step 2

**Verify:** the subnet appears under *libango\_vcn → Subnets*, marked Public, no security list attached yet.

## Step 2 — Create a security list

**Console:** *Networking → Virtual Cloud Networks → libango\_vcn → Security Lists → Create Security List*

- Name: `devsite_seclist`
- Ingress rules (stateful):
  1. **Source `0.0.0.0/0` · TCP · Dest port 443** — *Temporarily* open to the world; we'll narrow to Cloudflare IPs at the end of this phase once the box is reachable
  2. **Source `<your admin IP>/32` · TCP · Dest port 22** — replace with the IP you'll SSH from; check yours with `curl -4 ifconfig.co` if you don't know it
- Egress rules: keep the default `0.0.0.0/0` all-protocols rule (needed for `dnf update`, letsencrypt DNS-01, calls to the backend if we can't stay private, etc.)

**Attach it:** back on the subnet, *Add Security List* → `devsite_seclist`.

**Verify:** the security list is attached and lists exactly those two ingress rules.

## Step 3 — Provision the compute instance

**Console:** *Compute → Instances → Create Instance*

- Name: `devsite`
- Compartment: same as the existing Libango app
- Image: **Oracle Linux 9** (latest 9.x from the platform images list)
- Shape: *Change shape* → **Ampere · VM.Standard.A1.Flex** · 1 OCPU · 6 GB memory (Always Free eligible if your tenancy hasn't exhausted the 4 OCPU / 24 GB quota)
- Primary VNIC: VCN `libango_vcn`, subnet `devsite_public_subnet`, **Assign a public IPv4 address** = yes
- SSH keys: paste the public key from `~/.ssh/libango_devsite.pub`
- Boot volume: 50 GB (Always Free ceiling)
- Advanced → OS management: leave defaults; we'll enable OS Management Hub later if you use it elsewhere

Click **Create**. Note the assigned public IP once the instance shows *Running*.

**Verify:** `ssh -i ~/.ssh/libango_devsite opc@<public-ip>` succeeds and drops you into a shell on Oracle Linux 9.

## Step 4 — Baseline hardening (first boot)

Run these on the instance as `opc`. Copy-paste block by block; each is idempotent.

```bash
# 4a. Full package update, then reboot if the kernel moved
sudo dnf -y update
[ -f /var/run/reboot-required ] && sudo reboot   # if this triggers, ssh back in

# 4b. Enable EPEL (needed for certbot's DNS plugins and a couple of nice-to-haves)
sudo dnf -y install oracle-epel-release-el9

# 4c. Timezone and hostname
sudo timedatectl set-timezone UTC
sudo hostnamectl set-hostname devsite

# 4d. Unattended security patching (weekly)
sudo dnf -y install dnf-automatic
sudo sed -i \
  -e 's/^upgrade_type = .*/upgrade_type = security/' \
  -e 's/^apply_updates = .*/apply_updates = yes/' \
  /etc/dnf/automatic.conf
sudo systemctl enable --now dnf-automatic.timer

# 4e. fail2ban for sshd
sudo dnf -y install fail2ban
sudo tee /etc/fail2ban/jail.d/sshd.local >/dev/null <<'EOF'
[sshd]
enabled = true
maxretry = 5
findtime = 10m
bantime  = 1h
EOF
sudo systemctl enable --now fail2ban

# 4f. firewalld — open only 80/443 for now (SSH is already allowed by the platform default zone)
sudo systemctl enable --now firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# 4g. Confirm SELinux is enforcing (it should be by default)
getenforce   # expect: Enforcing

# 4h. Create the application user (no login shell; the app runs as this user)
sudo useradd --system --home /var/lib/libango-web --shell /sbin/nologin libango
sudo mkdir -p /var/lib/libango-web && sudo chown libango:libango /var/lib/libango-web
```

**Verify:**
- `sudo systemctl is-active fail2ban dnf-automatic.timer firewalld` all return `active`.
- `sudo firewall-cmd --list-services` includes `http` and `https`.
- `getenforce` returns `Enforcing`.
- `id libango` shows the system user exists.

## Step 5 — Confirm the private path to the existing app

From the `devsite` instance, verify you can reach the existing Libango app over the VCN's internal network (not through Cloudflare). The exact command depends on how the existing app is addressable inside the VCN — replace `<internal-hostname-or-ip>` accordingly.

```bash
# Example — adjust the URL/port to match the backend
curl -v -o /dev/null -w "%{http_code}\n" https://<internal-hostname-or-ip>/api/health
```

You should get a 200 (or whatever the backend's health path returns). If you get "connection refused" or a timeout, the backend's security list is blocking `devsite_public_subnet`'s CIDR — add an ingress rule on the backend side allowing `10.0.10.0/24` (or whatever CIDR you picked) on the backend's port.

**Verify:** the health check works from `devsite` without touching Cloudflare. If it does, ADR-0009's private path is confirmed working.

## Step 6 — Note the state for the next phase

Record for later use:
- Instance public IP: `_______________`
- Instance private IP (VCN-internal): `_______________`
- Backend's internal address `devsite` will call: `_______________`
- Cloudflare IPv4 ranges (grab now from https://www.cloudflare.com/ips-v4 — we'll pin the security list to these in Phase 4)

## Rollback

If anything above went wrong and you want to start clean: terminate the instance, delete the security list, delete the subnet. Nothing about the existing `libango_vcn` or the existing app is modified until Step 5's optional backend security-list rule; if you added that rule, remove it too.

## What comes next

Phase 3 — installing Nginx, Node 22, and the app on this instance. Wait to run that until Cloudflare zone setup (see the Cloudflare runbook) is at least started, because certbot's DNS-01 challenge in Phase 3 needs Cloudflare API credentials.
