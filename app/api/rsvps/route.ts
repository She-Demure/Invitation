import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("RSVP storage is not configured.");
  return { url: url.replace(/\/$/, ""), key };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const attending = data.attending;
  const partySize = Number(data.partySize);
  const note = typeof data.note === "string" ? data.note.trim() : "";
  if (!name || name.length > 120 || typeof attending !== "boolean" || (attending && (!Number.isInteger(partySize) || partySize < 1 || partySize > 20)) || note.length > 500) {
    return NextResponse.json({ error: "Please check your RSVP details." }, { status: 400 });
  }
  try {
    const { url, key } = supabaseConfig();
    const result = await fetch(`${url}/rest/v1/rsvps`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ name, attending, party_size: attending ? partySize : 0, note }),
      cache: "no-store",
    });
    if (!result.ok) throw new Error("Storage request failed.");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "RSVP storage is not configured or is unavailable." }, { status: 503 });
  }
}

export async function GET(request: NextRequest) {
  const password = process.env.RSVP_ADMIN_PASSWORD;
  if (!password || request.headers.get("x-admin-password") !== password) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { url, key } = supabaseConfig();
    const result = await fetch(`${url}/rest/v1/rsvps?select=id,name,attending,party_size,note,created_at&order=created_at.desc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store",
    });
    if (!result.ok) throw new Error("Storage request failed.");
    return NextResponse.json(await result.json());
  } catch {
    return NextResponse.json({ error: "RSVP storage is not configured or is unavailable." }, { status: 503 });
  }
}
