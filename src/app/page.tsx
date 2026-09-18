import Link from "next/link";
import { AREAS, PARTNERS, VENDORS } from "@/lib/vendors";
import { LiberiaMap } from "@/components/maps";

function countsByArea(): Record<string, number> {
  const c: Record<string, number> = {};
  for (const v of VENDORS) c[v.area] = (c[v.area] ?? 0) + 1;
  return c;
}

export default function HomePage() {
  const counts = countsByArea();
  const active = VENDORS.filter((v) => v.status === "Active").length;
  const groups = ["Telcos", "Banks", "Payment & top-up apps"] as const;
  return (
    <main className="view">
      <div className="wrap">
        <div className="hero">
          <div>
            <span className="eyebrow">Prepaid electricity, close to home</span>
            <h1 style={{ marginTop: 10 }}>
              Power, <span className="amp">within reach.</span>
            </h1>
            <p className="lede">
              Libango Holdings is LEC&apos;s super vendor — bringing prepaid electricity tokens to your
              neighborhood through 180+ trusted vendors and the banks, telcos, and payment apps you
              already use.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/locate">
                Locate a Vendor
              </Link>
              <a className="btn btn-ghost" href="https://devportal.libangolr.net/">
                Retrieve Last Token
              </a>
            </div>
          </div>
          <div className="hero-map">
            <div className="cap">
              <span className="eyebrow">Vendor network</span>
              <span>2026 vendor directory</span>
            </div>
            <LiberiaMap counts={counts} />
          </div>
        </div>

        <div className="stat-strip">
          <div className="stat">
            <b>{VENDORS.length}</b>
            <span>retail vendors nationwide</span>
          </div>
          <div className="stat">
            <b>{active}</b>
            <span>active vendors today</span>
          </div>
          <div className="stat">
            <b>{PARTNERS.length}</b>
            <span>electronic platform partners</span>
          </div>
          <div className="stat">
            <b>{AREAS.length}</b>
            <span>sales areas across Liberia</span>
          </div>
        </div>

        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Three steps to light</h2>
        </div>
        <div className="steps">
          <div className="step">
            <span className="n">01</span>
            <h3>Find a vendor near you</h3>
            <p>Search the map or filter by area to find the closest Libango vendor.</p>
          </div>
          <div className="step">
            <span className="n">02</span>
            <h3>Buy a token for your meter</h3>
            <p>
              Give the vendor your meter number and the amount you want. Pay in LRD or USD — or buy
              straight from MTN, Orange, your bank, or your favorite app.
            </p>
          </div>
          <div className="step">
            <span className="n">03</span>
            <h3>Enter the token, get power</h3>
            <p>
              Key the 20-digit token into your prepaid meter. Lost the slip? Retrieve your last token
              here anytime.
            </p>
          </div>
        </div>

        <div className="section-head">
          <span className="eyebrow">Already on your phone</span>
          <h2>Buy tokens from the platforms you use every day</h2>
          <p className="chan-note">
            As LEC&apos;s super vendor, Libango doesn&apos;t stop at kiosks and shops. We&apos;re
            integrated with the telcos, banks, and payment apps Liberians already trust — top up your
            meter from the account you already have, comfortably.
          </p>
        </div>
        <div className="chan-groups">
          {groups.map((g) => (
            <div className="chan" key={g}>
              <h3>{g}</h3>
              <div className="chan-badges">
                {PARTNERS.filter((p) => p.group === g).map((p) => (
                  <span className="badge" key={p.name}>
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="home-vendor-cta">
          <div>
            <h2>Run a shop? Sell power.</h2>
            <p>
              Join the Libango vendor network and add electricity tokens to what your business offers.
              Apply online — bring your business registration document.
            </p>
          </div>
          <a className="btn btn-primary" href="https://devportal.libangolr.net/vendor-applications/">
            Become a Vendor
          </a>
        </div>
      </div>
    </main>
  );
}
