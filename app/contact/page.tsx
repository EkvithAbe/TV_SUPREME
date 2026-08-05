import Link from "next/link";
import { ArrowUpRight, CalendarDays, Play, Radio } from "lucide-react";

const CHANNELS = [
  {
    label: "TV Supreme on Facebook",
    description: "Daily updates, viewer conversations, and programme announcements.",
    href: "https://www.facebook.com/tvsupremelk"
  },
  {
    label: "TV Supreme on YouTube",
    description: "Watch recent episodes, show clips, and channel highlights.",
    href: "https://www.youtube.com/@tvsupreme"
  },
  {
    label: "TV Supreme News",
    description: "Follow the latest news updates through the official Facebook page.",
    href: "https://www.facebook.com/tvsupremenews"
  }
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(239,43,145,0.1),transparent_28%),radial-gradient(circle_at_80%_28%,rgba(93,42,185,0.12),transparent_25%)] py-10 lg:py-16">
      <div className="section-wrap relative">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="eyebrow">Contact</p>
            <h1 className="section-title mt-3 text-[2.5rem] sm:text-5xl lg:text-[3.6rem]">
              Stay in touch with TV Supreme
            </h1>
            <p className="section-copy mt-5">
              Find the latest programme updates, watch recent episodes, and join the conversation through TV Supreme&apos;s official channels.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/live" className="primary-pill w-full justify-center sm:w-auto">
                <Play className="h-4 w-4 fill-current" />
                Watch Live
              </Link>
              <Link href="/schedule" className="link-pill w-full justify-center sm:w-auto">
                <CalendarDays className="h-4 w-4" />
                View Schedule
              </Link>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(145deg,#2b1450_0%,#4d218c_58%,#9b2787_100%)] p-6 text-white shadow-[0_16px_36px_rgba(49,20,89,0.18)] sm:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <img
              src="/images/tv-supreme-logo-final.png"
              alt="TV Supreme"
              className="relative h-16 w-16 object-contain"
            />
            <p className="relative mt-8 text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-white/64">
              Viewer support
            </p>
            <h2 className="relative mt-3 font-heading text-2xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
              Your next show is always close by.
            </h2>
            <p className="relative mt-4 max-w-md text-sm leading-7 text-white/74">
              Check what is on now, browse the programme guide, or follow the official channels for daily updates.
            </p>
            <Link
              href="/programs"
              className="relative mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/24 bg-white/8 px-5 py-3 text-sm font-heading font-semibold text-white transition hover:bg-white/16"
            >
              Browse Programs
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:pr-[19rem]">
          {CHANNELS.map((channel) => (
            <a
              key={channel.href}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="surface-card group flex min-h-48 flex-col p-5 transition duration-200 hover:-translate-y-1 hover:shadow-card-hover sm:p-6"
            >
              <Radio className="h-5 w-5 text-[#ef2b91]" />
              <h2 className="mt-5 font-heading text-xl font-extrabold leading-tight tracking-[-0.02em] text-supreme-ink">
                {channel.label}
              </h2>
              <p className="mt-3 text-sm leading-7 text-supreme-mid">{channel.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-heading font-semibold text-[#5d2ab9]">
                Open channel
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
