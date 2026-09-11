"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

interface TokenResult {
  meter: string;
  token: string;
  issuedAt: string;
  units: string;
  amount: string;
  vendor: string;
  sample?: boolean;
}

export default function TokenPage() {
  const [meter, setMeter] = useState("");
  const [meterErr, setMeterErr] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [humanErr, setHumanErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TokenResult | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const meterOk = /^\d{10,13}$/.test(meter.trim());
    setMeterErr(!meterOk);
    setHumanErr(!captcha);
    if (!meterOk || !captcha) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meter: meter.trim(), turnstileToken: captcha }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "The lookup failed. Please try again in a moment.");
      }
      setResult((await res.json()) as TokenResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The lookup failed. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="view">
      <div className="wrap">
        <div className="token-grid">
          <div className="token-side">
            <span className="eyebrow">Lost your slip?</span>
            <h2>Retrieve your last token</h2>
            <p>
              Enter the meter number you bought for, and we&apos;ll show the most recent token issued
              to that meter — the same 20 digits that were on your receipt.
            </p>
            <p style={{ fontSize: ".88rem" }}>
              This lookup is protected by human verification and only ever returns the <em>last</em>{" "}
              token for a meter. It cannot generate new credit.
            </p>
          </div>
          <div>
            <form className="token-form" onSubmit={submit} noValidate>
              <div className={`field${meterErr ? " bad" : ""}`} style={{ marginTop: 0 }}>
                <label htmlFor="t-meter">
                  Meter number <span className="req">*</span>
                </label>
                <input
                  id="t-meter"
                  className="mono"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="e.g. 04123456789"
                  maxLength={14}
                  value={meter}
                  onChange={(e) => setMeter(e.target.value)}
                />
                <p className="err">Enter the meter number as digits only (10–13 digits).</p>
              </div>
              <Turnstile
                onToken={(t) => {
                  setCaptcha(t);
                  if (t) setHumanErr(false);
                }}
              />
              {humanErr && <p className="form-err">Please complete the verification first.</p>}
              {error && <p className="form-err">{error}</p>}
              <div className="form-foot" style={{ marginTop: 20 }}>
                <button className="btn btn-dark" type="submit" disabled={busy}>
                  {busy ? "Looking up…" : "Retrieve token"}
                </button>
              </div>
            </form>

            {result && (
              <div style={{ marginTop: 22 }}>
                <div className="token-card">
                  {result.sample && <span className="sample-tag">Sample result</span>}
                  <p className="lbl" style={{ margin: 0 }}>
                    Last token · meter <span className="mono">{result.meter}</span>
                  </p>
                  <p className="digits">{result.token}</p>
                  <div className="token-meta">
                    <div>
                      <span>Issued</span>
                      <b>{result.issuedAt}</b>
                    </div>
                    <div>
                      <span>Units</span>
                      <b>{result.units}</b>
                    </div>
                    <div>
                      <span>Amount</span>
                      <b>{result.amount}</b>
                    </div>
                    <div>
                      <span>Vendor</span>
                      <b>{result.vendor}</b>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
