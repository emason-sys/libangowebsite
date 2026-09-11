import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["application/pdf", "image/jpeg"];
const MAX_DOC_BYTES = 10 * 1024 * 1024;

/**
 * Vendor application submission.
 *
 * When BACKEND_APPLY_URL is set, the multipart payload (plus the server-side
 * submission timestamp) is forwarded to the existing Libango backend, which is
 * already set up to process applications. Without it (local development) the
 * route validates and returns a mock acknowledgement so the flow is testable.
 */
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected a multipart form submission." }, { status: 400 });
  }

  const required = ["businessName", "email", "phone", "county", "city", "address"] as const;
  for (const key of required) {
    const value = form.get(key);
    if (typeof value !== "string" || value.trim().length === 0) {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }
  }
  const doc = form.get("document");
  if (!(doc instanceof File) || doc.size === 0) {
    return NextResponse.json({ error: "Attach the business registration document." }, { status: 400 });
  }
  if (doc.size > MAX_DOC_BYTES) {
    return NextResponse.json({ error: "Document is larger than 10 MB." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(doc.type)) {
    return NextResponse.json({ error: "Document must be a PDF or JPG." }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  form.set("submittedAt", submittedAt);

  const backend = process.env.BACKEND_APPLY_URL;
  if (backend) {
    const headers: Record<string, string> = {};
    if (process.env.BACKEND_API_KEY) headers.Authorization = `Bearer ${process.env.BACKEND_API_KEY}`;
    const res = await fetch(backend, { method: "POST", headers, body: form });
    if (!res.ok) {
      console.error(`apply: backend responded ${res.status}`);
      return NextResponse.json(
        { error: "We couldn't submit your application right now. Please try again shortly." },
        { status: 502 }
      );
    }
    const data = await res.json().catch(() => ({}));
    return NextResponse.json({
      reference: data.reference ?? data.id ?? "submitted",
      submittedAt: new Date(submittedAt).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" }),
    });
  }

  // Development mock — no backend configured.
  const now = new Date();
  const reference = `VA-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
  return NextResponse.json({
    reference,
    submittedAt: now.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" }),
    mock: true,
  });
}
