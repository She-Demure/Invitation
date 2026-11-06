"use client";

import { FormEvent, useState } from "react";

type Rsvp = { id: number; name: string; attending: boolean; party_size: number; note: string; created_at: string };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Rsvp[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(event?: FormEvent) {
    event?.preventDefault();
    setLoading(true); setError("");
    const response = await fetch("/api/rsvps", { headers: { "x-admin-password": password }, cache: "no-store" }).catch(() => null);
    setLoading(false);
    if (response?.ok) setRows(await response.json());
    else { setRows(null); setError(response?.status === 401 ? "That password was not accepted." : "Could not load replies. Check your storage setup and try again."); }
  }

  const accepted = rows?.filter((r) => r.attending) ?? [];
  const declined = rows?.filter((r) => !r.attending) ?? [];
  const guests = accepted.reduce((sum, r) => sum + r.party_size, 0);

  return (
    <main className="min-h-screen bg-[#eaf6ff] px-5 py-12 text-[#193d61] sm:px-10">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-xs uppercase tracking-[0.18em] text-[#567c9f]">← Invitation</a>
        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a37727]">Private RSVP dashboard</p>
        <h1 className="mt-3 font-serif text-5xl sm:text-7xl">Guest replies</h1>
        <form onSubmit={load} className="mt-8 flex max-w-xl gap-3">
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" className="min-w-0 flex-1 rounded-full border border-[#b8d2e5] bg-white px-5 py-3 text-sm outline-none focus:border-[#b8862e]" />
          <button disabled={loading} className="gold-button rounded-full px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">{loading ? "Loading…" : "View replies"}</button>
        </form>
        {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
        {rows && <>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            <Summary label="Attending" value={accepted.length} />
            <Summary label="Guests attending" value={guests} />
            <Summary label="Unable to attend" value={declined.length} />
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white bg-white/80 shadow-lg">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#dceefb] text-[10px] uppercase tracking-widest text-[#567c9f]"><tr><th className="px-5 py-4">Name</th><th className="px-5 py-4">Reply</th><th className="px-5 py-4">Party size</th><th className="px-5 py-4">Note</th><th className="px-5 py-4">Received</th></tr></thead>
              <tbody>{rows.map((r) => <tr key={r.id} className="border-t border-[#e4eff7]"><td className="px-5 py-4 font-medium">{r.name}</td><td className="px-5 py-4">{r.attending ? "Attending" : "Declined"}</td><td className="px-5 py-4">{r.attending ? r.party_size : "—"}</td><td className="max-w-xs whitespace-pre-wrap px-5 py-4">{r.note || "—"}</td><td className="whitespace-nowrap px-5 py-4">{new Date(r.created_at).toLocaleDateString()}</td></tr>)}</tbody>
            </table>
            {rows.length === 0 && <p className="p-8 text-center text-sm text-[#688198]">No replies yet.</p>}
          </div>
        </>}
      </div>
    </main>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-white bg-white/80 p-6 shadow"><p className="text-[10px] font-semibold uppercase tracking-widest text-[#7891a5]">{label}</p><p className="mt-2 font-serif text-4xl text-[#b8862e]">{value}</p></div>;
}
