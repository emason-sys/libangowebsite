import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Last-token retrieval.
 *
 * When BACKEND_TOKEN_URL is set, the meter number and the visitor's Turnstile
 * token are forwarded to the existing secure token API (its developers require
 * CAPTCHA verification). Without it (local development) the route returns a
 * deterministic sample response flagged `sample: true`.
 */
export async function POST(req: Request) {
  let body: { meter?: string; turnstileToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const meter = (body.meter ?? "").trim();
  if (!/^\d{10,13}$/.test(meter)) {
    return NextResponse.json({ error: "Enter the meter number as 10–13 digits." }, { status: 400 });
  }
  if (!body.turnstileToken) {
    return NextResponse.json({ error: "Complete the human verification first." }, { status: 400 });
  }

  const backend = process.env.BACKEND_TOKEN_URL;
  if (backend) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.BACKEND_API_KEY) headers.Authorization = `Bearer ${process.env.BACKEND_API_KEY}`;
    const res = await fetch(backend, {
      method: "POST",
      headers,
      body: JSON.stringify({ meter, turnstileToken: body.turnstileToken }),
    });
    if (res.status === 404) {
      return NextResponse.json({ error: "No token found for that meter number." }, { status: 404 });
    }
    if (!res.ok) {
      console.error(`token: backend responded ${res.status}`);
      return NextResponse.json(
        { error: "The lookup service is unavailable right now. Please try again shortly." },
        { status: 502 }
      );
    }
    return NextResponse.json(await res.json());
  }

  // Development mock — deterministic per meter so repeat lookups look stable.
  let seed = 0;
  for (const ch of meter) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const groups: string[] = [];
  for (let g = 0; g < 5; g++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    groups.push(String(seed % 10000).padStart(4, "0"));
  }
  return NextResponse.json({
    meter,
    token: groups.join(" "),
    issuedAt: new Date(Date.now() - 26 * 3600e3).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    units: "52.4 kWh",
    amount: "1,250.00 LRD",
    vendor: "Express Current Services",
    sample: true,
  });
}
