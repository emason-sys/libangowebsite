"use client";

import { useRef, useState } from "react";
import { COUNTIES, COUNTY_NAMES } from "@/lib/counties";
import { Turnstile } from "@/components/Turnstile";

interface ApplySuccess {
  reference: string;
  submittedAt: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,}$/;
const MAX_DOC_BYTES = 10 * 1024 * 1024;

export default function ApplyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [doc, setDoc] = useState<File | null>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [humanErr, setHumanErr] = useState(false);
  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<ApplySuccess | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const cities = county ? COUNTIES[county] : [];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bad: Record<string, boolean> = {
      name: name.trim().length < 2,
      email: !EMAIL_RE.test(email.trim()),
      phone: !PHONE_RE.test(phone.trim()),
      county: !county,
      city: !city,
      address: address.trim().length < 4,
      doc: !doc || doc.size > MAX_DOC_BYTES,
    };
    setErrs(bad);
    setHumanErr(!captcha);
    if (Object.values(bad).some(Boolean) || !captcha) return;
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.set("businessName", name.trim());
      fd.set("email", email.trim());
      fd.set("phone", phone.trim());
      fd.set("county", county);
      fd.set("city", city);
      fd.set("address", address.trim());
      fd.set("document", doc as File);
      fd.set("turnstileToken", captcha);
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Submission failed. Please try again in a moment.");
      }
      setSuccess((await res.json()) as ApplySuccess);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="view">
      <div className="wrap">
        <span className="eyebrow">Join the network</span>
        <h2 className="page-title">Vendor Application</h2>
        <p className="page-sub">
          Tell us about your business. Our team reviews every application and responds by phone or
          email — bring your business registration document as a PDF or JPG.
        </p>

        {success ? (
          <div className="success" role="status">
            <h3>Application received</h3>
            <p style={{ margin: "0 0 10px" }}>
              Thank you — our vendor team will contact you within 5 working days.
            </p>
            <p className="ref" style={{ margin: 0 }}>
              Reference: <span className="mono">{success.reference}</span>
            </p>
            <p style={{ margin: "10px 0 0", fontSize: ".85rem", color: "var(--muted)" }}>
              Submitted {success.submittedAt} · {name.trim()} · {city}, {county} County
            </p>
          </div>
        ) : (
          <form className="form-grid" onSubmit={submit} noValidate>
            <div className={`field${errs.name ? " bad" : ""}`}>
              <label htmlFor="a-name">
                Business name <span className="req">*</span>
              </label>
              <input
                id="a-name"
                type="text"
                autoComplete="organization"
                placeholder="e.g. Mama Weah Provision Store"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="err">Business name is required.</p>
            </div>
            <div className="two-col">
              <div className={`field${errs.email ? " bad" : ""}`}>
                <label htmlFor="a-email">
                  Email address <span className="req">*</span>
                </label>
                <input
                  id="a-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="err">Enter a valid email address.</p>
              </div>
              <div className={`field${errs.phone ? " bad" : ""}`}>
                <label htmlFor="a-phone">
                  Phone <span className="req">*</span>
                </label>
                <input
                  id="a-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+231 77 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="err">Enter a valid phone number.</p>
              </div>
            </div>
            <div className="two-col">
              <div className={`field${errs.county ? " bad" : ""}`}>
                <label htmlFor="a-county">
                  County <span className="req">*</span>
                </label>
                <select
                  id="a-county"
                  value={county}
                  onChange={(e) => {
                    setCounty(e.target.value);
                    setCity("");
                  }}
                >
                  <option value="">Select a county…</option>
                  {COUNTY_NAMES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="err">Select your county.</p>
              </div>
              <div className={`field${errs.city ? " bad" : ""}`}>
                <label htmlFor="a-city">
                  City <span className="req">*</span>
                </label>
                <select
                  id="a-city"
                  value={city}
                  disabled={!county}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">{county ? "Select a city…" : "Select a county first"}</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {county && !errs.city && (
                  <p className="hint">
                    {cities.length} cities listed for {county}.
                  </p>
                )}
                <p className="err">Select your city.</p>
              </div>
            </div>
            <div className={`field${errs.address ? " bad" : ""}`}>
              <label htmlFor="a-address">
                Address <span className="req">*</span>
              </label>
              <input
                id="a-address"
                type="text"
                autoComplete="street-address"
                placeholder="Street, landmark, or community"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <p className="err">Address is required.</p>
            </div>
            <div className="field">
              <label>
                Business registration document <span className="req">*</span>
              </label>
              <label className="upload" htmlFor="a-doc">
                <input
                  ref={fileRef}
                  id="a-doc"
                  type="file"
                  accept=".pdf,.jpg,.jpeg"
                  onChange={(e) => setDoc(e.target.files?.[0] ?? null)}
                />
                {doc ? (
                  <span className="mono" style={{ fontWeight: 600 }}>
                    {doc.name} ({(doc.size / 1024).toFixed(0)} KB)
                  </span>
                ) : (
                  <span>
                    Click to attach — <b>PDF or JPG</b>, up to 10 MB
                  </span>
                )}
              </label>
              {errs.doc && <p className="form-err">Attach your registration document (.pdf or .jpg, up to 10 MB).</p>}
            </div>
            <div className="field">
              <Turnstile
                onToken={(t) => {
                  setCaptcha(t);
                  if (t) setHumanErr(false);
                }}
              />
              {humanErr && <p className="form-err">Please complete the verification first.</p>}
            </div>
            {error && <p className="form-err">{error}</p>}
            <div className="form-foot">
              <button className="btn btn-primary" type="submit" disabled={busy}>
                {busy ? "Submitting…" : "Submit application"}
              </button>
              <span className="note">Submitted date is recorded automatically.</span>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
