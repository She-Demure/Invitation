"use client";

import { useState } from "react";
import RsvpForm from "./RsvpForm";

const invitation = {
  displayDate: "Example:Saturday, July 18, 2026",
  calendarStart: "20260718T103000",
  calendarEnd: "20260718T133000",
  church: "Saint Thomas Aquinas Parish, Mangaldan",
  churchAddress: "3CC5+J26, Rizal Ave, Mangaldan, 2432 Pangasinan",
  reception: "N/A",
  receptionAddress: "N/A",
};

const baptismPhoto = "/baby-first-photo.png";
const babyPhoto =
  "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1400";

function CrossMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 56" fill="none">
      <path d="M22 2V54M8 18H36" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="18" r="17" stroke="currentColor" strokeWidth=".7" opacity=".55" />
    </svg>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 0C20 13.2 26.8 20 40 20C26.8 20 20 26.8 20 40C20 26.8 13.2 20 0 20C13.2 20 20 13.2 20 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2V8M16 2V8M3 10H21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function App() {
  const [saved, setSaved] = useState(false);
  const [showGodparents, setShowGodparents] = useState(false);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [envelopeOpening, setEnvelopeOpening] = useState(false);

  const saveDate = () => {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Jose Ulyses Tano Duenas Jr Baptism//EN",
      "BEGIN:VEVENT",
      `DTSTART:${invitation.calendarStart}`,
      `DTEND:${invitation.calendarEnd}`,
      "SUMMARY:The Baptism of Jose Ulyses Tano Duenas Jr.",
      `LOCATION:${invitation.church}, ${invitation.churchAddress}`,
      "DESCRIPTION:Please join us for the baptism of Jose Ulyses Tano Duenas Jr. Reception to follow.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "jose-ulysses-tano-duenas-jr-baptism.ics";
    link.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const openInvitation = () => {
    if (envelopeOpening) return;

    setEnvelopeOpening(true);
    window.setTimeout(() => setInvitationOpened(true), 1000);
  };

  if (!invitationOpened) {
    return (
      <main
        className={`envelope-gate relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 text-center ${
          envelopeOpening ? "is-opening" : ""
        }`}
      >
        <div className="paper-grain absolute inset-0" />
        <div className="light-orb orb-one" />
        <div className="light-orb orb-two" />
        <div className="floating-cloud floating-cloud-one" aria-hidden="true" />
        <div className="floating-cloud floating-cloud-two" aria-hidden="true" />
        <div className="floating-cloud floating-cloud-three" aria-hidden="true" />
        <div className="star-field" aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <Sparkle className="twinkle absolute left-[10%] top-[16%] w-6 text-[#d8a847] sm:w-9" />
        <Sparkle className="twinkle-delay absolute right-[12%] top-[22%] w-5 text-white sm:w-8" />
        <Sparkle className="twinkle absolute bottom-[18%] right-[17%] w-4 text-[#e0b85e]" />

        <div className="envelope-intro relative z-10 w-full max-w-2xl">
          <div className="mx-auto mb-5 w-8 text-[#b78125]">
            <CrossMark />
          </div>
          <p className="tracking-label text-[10px] font-semibold uppercase text-[#587b99]">
            A blessed celebration awaits
          </p>
          <h1 className="gold-shimmer mt-4 pb-3 font-serif text-6xl italic sm:text-8xl">
            You are invited!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#5c7c96]">
            A little moment of joy has been sent especially for you.
          </p>

          <button
            type="button"
            onClick={openInvitation}
            aria-label="Open baptism invitation"
            className="envelope-button group mx-auto mt-9 block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#b8862e]"
          >
            <span className="envelope block" aria-hidden="true">
              <span className="envelope-back" />
              <span className="envelope-letter">
                <span className="block font-serif text-2xl italic text-[#b27b20]">Jr.</span>
                <span className="mt-2 block h-px w-16 bg-[#c7a25a]/50" />
              </span>
              <span className="envelope-flap" />
              <span className="envelope-front-left" />
              <span className="envelope-front-right" />
              <span className="wax-seal">
                <Sparkle className="w-5 text-[#fff1b3]" />
              </span>
              <span className="envelope-shine" />
            </span>
            <span className="mt-8 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#315d82] transition group-hover:text-[#a87621]">
              {envelopeOpening ? "Opening your invitation…" : "Click envelope to open"}
            </span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="invitation-page min-h-screen overflow-hidden bg-[#eaf6ff] text-[#193d61]">
      <header className="hero-sky relative min-h-screen px-5 py-8 sm:px-10 sm:py-12">
        <div className="paper-grain absolute inset-0" />
        <div className="light-orb orb-one" />
        <div className="light-orb orb-two" />
        <div className="floating-cloud hero-cloud-one" aria-hidden="true" />
        <div className="floating-cloud hero-cloud-two" aria-hidden="true" />
        <Sparkle className="twinkle absolute left-[7%] top-[13%] w-6 text-[#e6bd5f] sm:w-9" />
        <Sparkle className="twinkle-delay absolute right-[8%] top-[24%] w-4 text-white sm:w-7" />
        <Sparkle className="twinkle absolute bottom-[14%] left-[12%] w-4 text-white" />

        <section className="invitation-frame relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/35 shadow-[0_35px_100px_rgba(36,102,155,0.2)] backdrop-blur-md lg:grid-cols-[1.05fr_.95fr]">
          <span className="gold-line absolute inset-3 rounded-[1.7rem] border" />

          <div className="order-2 relative z-10 px-7 pb-14 pt-10 text-center sm:px-14 lg:order-1 lg:px-16 lg:py-20">
            <div className="mx-auto mb-5 w-9 text-[#c79631]">
              <CrossMark />
            </div>
            <p className="tracking-label text-[10px] font-semibold uppercase text-[#567c9f]">
              Together with our families
            </p>
            <p className="mt-5 font-serif text-xl italic text-[#426d91] sm:text-2xl">
              We joyfully invite you to the baptism of
            </p>

            <h1 className="gold-shimmer mt-6 pb-3 font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[0.82] tracking-[-0.045em]">
              <span className="block italic">Jose</span>
              <span className="mt-2 block italic">Ulyses</span>
              <span className="mt-5 block text-[.52em] italic">Tano Duenas Jr.</span>
            </h1>

            <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-5">
              <span className="gold-rule h-px flex-1" />
              <span className="font-serif text-3xl text-[#ad7b20]">Jr.</span>
              <span className="gold-rule h-px flex-1" />
            </div>

            <div className="mt-7">
              <p className="font-serif text-2xl text-[#193d61] sm:text-3xl">
                Saturday, the eighteenth of July
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#567c9f]">
                Two thousand twenty-six · 10:30 am
              </p>
            </div>

            <p className="mt-7 font-serif text-xl text-[#234f75]">{invitation.church}</p>
            <p className="mt-1 text-xs tracking-[0.1em] text-[#67849d]">Coral Gables, Florida</p>

            <button
              onClick={saveDate}
              className="gold-button mt-8 inline-flex min-w-48 items-center justify-center gap-3 rounded-full px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8862e]"
            >
              <span className="w-4">
                <CalendarIcon />
              </span>
              {saved ? "Date saved" : "Save the date"}
            </button>
          </div>

          <div className="order-1 relative flex min-h-[420px] items-center justify-center p-8 pb-0 sm:min-h-[520px] sm:p-14 sm:pb-0 lg:order-2 lg:min-h-full lg:p-16">
            <div className="photo-halo absolute left-1/2 top-1/2 h-[76%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]" />
            <div className="hero-photo relative h-[410px] w-full max-w-[420px] overflow-hidden rounded-[50%] border-[7px] border-white/75 shadow-[0_30px_65px_rgba(32,89,135,0.24)] sm:h-[530px] lg:h-[650px]">
              <img
                src={baptismPhoto}
                alt="A newborn baby in a blue knit blanket beside a teddy bear"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e6b9c]/25 via-transparent to-white/10" />
            </div>
            <Sparkle className="twinkle absolute right-[13%] top-[14%] w-8 text-[#e8c870] sm:w-12" />
            <Sparkle className="twinkle-delay absolute bottom-[14%] left-[13%] w-5 text-white sm:w-8" />
          </div>
        </section>
      </header>

      <section className="relative bg-[#f4faff] px-5 py-20 sm:px-10 sm:py-28">
        <div className="paper-grain absolute inset-0 opacity-15" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[13rem_13rem_1.5rem_1.5rem] border border-[#c9a248]/40" />
            <div className="aspect-[4/5] overflow-hidden rounded-[12rem_12rem_1rem_1rem] shadow-[0_28px_70px_rgba(49,105,148,0.2)]">
              <img
                src={babyPhoto}
                alt="A peacefully sleeping baby wrapped in a white blanket"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-[12rem_12rem_1rem_1rem] bg-gradient-to-t from-[#4c8fbd]/20 to-transparent" />
            </div>
            <div className="gold-medallion absolute -bottom-8 -right-3 flex size-24 items-center justify-center rounded-full border-4 border-[#edf7ff] font-serif text-2xl italic text-white shadow-xl sm:-right-10 sm:size-28">
              Blessed
            </div>
          </div>

          <div>
            <p className="tracking-label text-[10px] font-semibold uppercase text-[#a37727]">
              A beautiful day awaits
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-[0.95] text-[#193d61] sm:text-7xl">
              Ceremony <span className="gold-shimmer italic">& celebration</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#5b7891]">
              Please share in our joy as Jose is welcomed into the Christian faith, surrounded by
              the love and prayers of family and friends.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <DetailCard
                number="01"
                label="Holy Baptism"
                title={invitation.church}
                details={
                  <>
                    {invitation.displayDate}
                    <br />
                    10:30 in the morning
                    <br />
                    {invitation.churchAddress}
                  </>
                }
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${invitation.church} ${invitation.churchAddress}`)}`}
              />
              <DetailCard
                number="02"
                label="Luncheon"
                title={invitation.reception}
                details={
                  <>
                    Immediately following
                    <br />
                    Garden attire
                    <br />
                    {invitation.receptionAddress}
                  </>
                }
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${invitation.reception} ${invitation.receptionAddress}`)}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="godparents-sky relative overflow-hidden px-5 py-20 text-center sm:px-10 sm:py-28">
        <div className="paper-grain absolute inset-0 opacity-15" />
        <div className="light-orb absolute left-[12%] top-[25%] size-2" />
        <Sparkle className="twinkle absolute left-[8%] top-[18%] w-5 text-[#d9aa49]" />
        <Sparkle className="twinkle-delay absolute bottom-[20%] right-[9%] w-7 text-white/80" />

        <div className="relative mx-auto max-w-2xl">
          <p className="tracking-label text-[10px] font-semibold uppercase text-[#986d20]">
            Chosen with love
          </p>
          <h2 className="mt-4 font-serif text-5xl text-[#193d61] sm:text-7xl">
            Meet the <span className="gold-shimmer italic">Godparents</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#597994]">
            Two very special people will stand beside Jose as he begins his journey of faith.
          </p>

          <button
            type="button"
            aria-expanded={showGodparents}
            aria-controls="godparent-names"
            onClick={() => setShowGodparents((current) => !current)}
            className="reveal-button group mt-8 inline-flex min-w-56 items-center justify-center gap-3 rounded-full border border-[#b78a34]/55 bg-white/50 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#315d82] shadow-[0_12px_35px_rgba(42,97,139,0.1)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8862e]"
          >
            <Sparkle className="w-4 text-[#c59535] transition group-hover:rotate-12" />
            {showGodparents ? "Hide their names" : "Reveal their names"}
            <span
              aria-hidden="true"
              className={`text-base leading-none text-[#b9872d] transition-transform duration-300 ${
                showGodparents ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>

          <div
            id="godparent-names"
            className={`godparent-reveal ${showGodparents ? "is-open" : ""}`}
            aria-hidden={!showGodparents}
          >
            <div>
              <div className="mx-auto mt-9 max-w-xl rounded-[2rem] border border-white/80 bg-white/55 px-6 py-9 shadow-[0_24px_60px_rgba(42,97,139,0.13)] backdrop-blur-md sm:px-10">
                <div className="mx-auto mb-5 flex max-w-40 items-center gap-3">
                  <span className="gold-rule h-px flex-1" />
                  <Sparkle className="w-4 text-[#d0a044]" />
                  <span className="gold-rule h-px flex-1" />
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#7b91a3]">
                  Proud Godmother & Godfather
                </p>
                <p className="gold-shimmer mt-3 pb-2 font-serif text-4xl italic sm:text-5xl">
                  Sophia Grace & Daniel Thomas
                </p>
                <p className="mt-3 font-serif text-lg italic text-[#4f718e]">
                  “May you always walk in faith and love.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="night-sky relative overflow-hidden px-5 py-24 text-center text-white sm:py-32">
        <div className="paper-grain absolute inset-0 opacity-20" />
        <div className="light-orb footer-orb" />
        <Sparkle className="twinkle absolute left-[9%] top-[20%] w-5 text-[#e5be67]" />
        <Sparkle className="twinkle-delay absolute right-[12%] top-[18%] w-8 text-white/70" />
        <Sparkle className="twinkle absolute bottom-[18%] right-[19%] w-4 text-[#e5be67]" />

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto mb-6 w-9 text-[#e3bb62]">
            <CrossMark />
          </div>
          <p className="tracking-label text-[10px] font-semibold uppercase text-[#dfbe70]">
            Kindly respond
          </p>
          <h2 className="gold-shimmer mt-5 pb-2 font-serif text-5xl italic sm:text-7xl">
            Celebrate with us
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#c9def0]">
            Please let us know if you can join us by June 20, 2026. We cannot wait to share this
            blessed day with the people we love most.
          </p>
          <RsvpForm />
          <p className="mt-12 font-serif text-xl italic text-[#d9e9f6]">With love,</p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#dfbe70]">
            Amelia & Noah
          </p>
        </div>
      </footer>
    </main>
  );
}

function DetailCard({
  number,
  label,
  title,
  details,
  href,
}: {
  number: string;
  label: string;
  title: string;
  details: React.ReactNode;
  href: string;
}) {
  return (
    <article className="detail-card rounded-2xl border border-white bg-white/70 p-7 shadow-[0_18px_50px_rgba(41,98,143,0.09)] backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <p className="font-serif text-4xl text-[#c09132]">{number}</p>
        <Sparkle className="w-5 text-[#e2bd63]" />
      </div>
      <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8a6c2f]">
        {label}
      </p>
      <h3 className="mt-2 font-serif text-2xl leading-tight text-[#193d61]">{title}</h3>
      <p className="mt-3 text-xs leading-6 text-[#688198]">{details}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 border-b border-[#c79c40] pb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#315d82] transition hover:text-[#b08025]"
      >
        <span className="w-4 text-[#bd8f32]">
          <LocationIcon />
        </span>
        Get directions
      </a>
    </article>
  );
}
