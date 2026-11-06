"use client";

import { FormEvent, useState } from "react";

export default function RsvpForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSending(true);
    setStatus("");
    const form = new FormData(formElement);
    const attending = form.get("attending") === "yes";
    const response = await fetch("/api/rsvps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        attending,
        partySize: attending ? Number(form.get("partySize")) : 0,
        note: form.get("note"),
      }),
    }).catch(() => null);
    setSending(false);
    if (response?.ok) {
      formElement.reset();
      setStatus("Thank you! Your reply has been received.");
    } else {
      setStatus("We couldn't save your reply. Please try again in a moment.");
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-9 grid max-w-lg gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 text-left backdrop-blur sm:p-8">
      <label className="grid gap-2 text-xs text-[#d9e9f6]">
        Your name
        <input required name="name" maxLength={120} className="rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-sm text-[#193d61] outline-none focus:border-[#e2b95f]" />
      </label>
      <label className="grid gap-2 text-xs text-[#d9e9f6]">
        Can you join us?
        <select name="attending" className="rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-sm text-[#193d61] outline-none focus:border-[#e2b95f]">
          <option value="yes">Joyfully accepts</option>
          <option value="no">Regretfully declines</option>
        </select>
      </label>
      <label className="grid gap-2 text-xs text-[#d9e9f6]">
        Number attending, including you
        <input required name="partySize" type="number" min="1" max="20" defaultValue="1" className="rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-sm text-[#193d61] outline-none focus:border-[#e2b95f]" />
      </label>
      <label className="grid gap-2 text-xs text-[#d9e9f6]">
        Dietary notes or a message (optional)
        <textarea name="note" maxLength={500} rows={3} className="resize-y rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-sm text-[#193d61] outline-none focus:border-[#e2b95f]" />
      </label>
      <button disabled={sending} className="gold-button mt-2 rounded-full px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white disabled:opacity-60">
        {sending ? "Sending…" : "Send RSVP"}
      </button>
      <p role="status" aria-live="polite" className="min-h-5 text-center text-xs text-[#d9e9f6]">{status}</p>
    </form>
  );
}
