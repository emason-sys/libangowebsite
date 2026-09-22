"use client";

import { useMemo, useState } from "react";
import { AREAS, AREA_BY_KEY, VENDORS, type Vendor } from "@/lib/vendors";
import { directionsUrl, distanceKm, vendorLat, vendorLon } from "@/lib/geo";
import { LiberiaMap, MetroInset, METRO_KEY } from "@/components/maps";

type StatusFilter = "" | "Active" | "New" | "Inactive";

function statusChip(v: Vendor) {
  if (v.status !== "Active") return <span className="chip off">Inactive</span>;
  return (
    <>
      {v.isNew && <span className="newtag">NEW </span>}
      <span className="chip">Active</span>
    </>
  );
}

export default function LocatePage() {
  const [area, setArea] = useState("");
  const [status, setStatus] = useState<StatusFilter>("");
  const [q, setQ] = useState("");
  const [hl, setHl] = useState(-1);
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(null);
  const [locNote, setLocNote] = useState("");
  const [locating, setLocating] = useState(false);

  const matches = (v: Vendor) => {
    const query = q.trim().toLowerCase();
    return (
      (!area || v.area === area) &&
      (!status || (status === "New" ? v.isNew : v.status === status)) &&
      (!query || `${v.name} ${v.landmark} ${AREA_BY_KEY[v.area].label}`.toLowerCase().includes(query))
    );
  };

  const rows = useMemo(() => {
    const r = VENDORS.map((v, i) => ({
      v,
      i,
      d: userLoc ? distanceKm(userLoc.lat, userLoc.lon, vendorLat(v), vendorLon(v)) : null,
    })).filter((o) => matches(o.v));
    if (userLoc) r.sort((a, b) => (a.d ?? 0) - (b.d ?? 0));
    return r;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, status, q, userLoc]);

  const totalCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const v of VENDORS) c[v.area] = (c[v.area] ?? 0) + 1;
    return c;
  }, []);

  const activeKeys = useMemo(() => {
    const s = new Set<string>();
    for (const v of VENDORS) if (matches(v)) s.add(v.area);
    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, status, q]);

  const selectArea = (key: string) => {
    setHl(-1);
    if (key === METRO_KEY) setArea("");
    else setArea(area === key ? "" : key);
  };

  const requestLocation = () => {
    if (userLoc) {
      setUserLoc(null);
      setLocNote("");
      return;
    }
    if (!("geolocation" in navigator)) {
      setLocNote("Location isn't available in this browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setUserLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLocNote("Distances are approximate — measured to each vendor's sales area.");
      },
      () => {
        setLocating(false);
        setLocNote("Couldn't get your location — check the browser's location permission and try again.");
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  const selected = hl >= 0 ? VENDORS[hl] : null;

  return (
    <main className="view">
      <div className="wrap">
        <span className="eyebrow">Find power near you</span>
        <h2 className="page-title">Locate a Vendor</h2>
        <div className="locate-grid">
          <div className="map-card">
            <LiberiaMap counts={totalCounts} activeKeys={activeKeys} selectedKey={area} onSelect={selectArea} />
            <p className="inset-cap">Greater Monrovia — detail</p>
            <MetroInset counts={totalCounts} activeKeys={activeKeys} selectedKey={area} onSelect={selectArea} />
            <p className="count-note">
              {selected ? (
                <>
                  {selected.name} — {selected.landmark ? `${selected.landmark}, ` : ""}
                  {AREA_BY_KEY[selected.area].label}
                  {selected.phone ? (
                    <>
                      {" · "}
                      <span className="mono">{selected.phone}</span>
                    </>
                  ) : null}
                  {" · "}
                  <a className="dir" style={{ margin: 0 }} href={directionsUrl(selected)} target="_blank" rel="noopener noreferrer">
                    Get directions ↗
                  </a>
                </>
              ) : (
                "Tap an area bubble to filter the vendor list."
              )}
            </p>
          </div>
          <div>
            <div className="filters">
              <div className="field search" style={{ margin: 0 }}>
                <label htmlFor="f-search">Search</label>
                <input
                  id="f-search"
                  type="search"
                  placeholder="Vendor name, landmark, community…"
                  autoComplete="off"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setHl(-1);
                  }}
                />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label htmlFor="f-area">Area</label>
                <select
                  id="f-area"
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value);
                    setHl(-1);
                  }}
                >
                  <option value="">All areas</option>
                  {AREAS.map((a) => (
                    <option key={a.key} value={a.key}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label htmlFor="f-status">Status</label>
                <select
                  id="f-status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as StatusFilter);
                    setHl(-1);
                  }}
                >
                  <option value="">All vendors</option>
                  <option value="Active">Active</option>
                  <option value="New">New (POS)</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="near-row">
              <p className="count-note" style={{ margin: 0 }}>
                {rows.length > 0 &&
                  `${rows.length} vendor${rows.length > 1 ? "s" : ""} shown${userLoc ? " · nearest area first" : ""}`}
              </p>
              <button className="btn btn-ghost btn-sm" type="button" onClick={requestLocation}>
                {locating ? "Locating…" : userLoc ? "Clear distance sort" : "Sort by distance from me"}
              </button>
            </div>
            {locNote && (
              <p className="count-note" style={{ marginTop: 8 }}>
                {locNote}
              </p>
            )}
            <div className="vendor-list">
              {rows.length === 0 ? (
                <p className="empty">
                  No vendors match those filters yet. Try another area — or{" "}
                  <a href="https://devportal.libangolr.net/vendor-applications/">apply to become the first</a>.
                </p>
              ) : (
                rows.map((o) => (
                  <div
                    key={o.i}
                    className={`vendor-card${o.i === hl ? " hl" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setHl(hl === o.i ? -1 : o.i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setHl(hl === o.i ? -1 : o.i);
                      }
                    }}
                  >
                    <span>
                      <b>{o.v.name}</b>
                      <span className="loc">
                        {o.v.landmark ? `${o.v.landmark} · ` : ""}
                        {AREA_BY_KEY[o.v.area].label}
                        {o.d != null &&
                          ` · ~${o.d < 1 ? `${(o.d * 1000).toFixed(0)} m` : `${o.d.toFixed(1)} km`}`}
                      </span>
                      <a
                        className="dir"
                        href={directionsUrl(o.v)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Get directions ↗
                      </a>
                    </span>
                    <span style={{ textAlign: "right" }}>
                      {statusChip(o.v)}
                      {o.v.phone && <span className="ph mono">{o.v.phone}</span>}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
