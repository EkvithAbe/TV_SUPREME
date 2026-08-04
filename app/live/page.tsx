import { PlayCircle, Radio } from "lucide-react";

import { getHomePageData } from "@/lib/queries";
import { formatMinutes } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function LivePage() {
  const { liveNow, upNext } = await getHomePageData();

  return (
    <section className="section-wrap py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="surface-card overflow-hidden">
          <div className="relative">
            <img
              src="/images/live.jpeg"
              alt="TV Supreme live"
              className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/[0.35] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-supreme-ink/10 bg-white px-4 py-2 text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-supreme-vivid">
                <Radio className="h-4 w-4 text-supreme-vivid" />
                Live Control Window
              </div>
              <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-supreme-ink sm:mt-5 sm:text-5xl">
                {liveNow?.program?.title ?? liveNow?.title ?? "No live slot configured"}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-supreme-mid sm:text-base">
                This page is now powered from the recurring schedule table, so
                the public live experience and the operator-facing schedule can
                rely on the same source of truth.
              </p>
            </div>
          </div>
        </div>

        <aside className="surface-card p-6 sm:p-8">
          <p className="eyebrow">On-Air Status</p>
          <div className="mt-6 space-y-4">
            <article className="rounded-[24px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                On air now
              </p>
              <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
                {liveNow?.program?.title ?? liveNow?.title ?? "Pending"}
              </h2>
              {liveNow ? (
                <p className="mt-2 text-sm text-supreme-mid">
                  {formatMinutes(liveNow.startMinutes)} -{" "}
                  {formatMinutes(liveNow.endMinutes)}
                </p>
              ) : (
                <p className="mt-2 text-sm text-supreme-mid">
                  Waiting for a live slot in the schedule.
                </p>
              )}
            </article>

            <article className="rounded-[24px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                Up next
              </p>
              <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-supreme-ink">
                {upNext?.program?.title ?? upNext?.title ?? "Pending"}
              </h2>
              {upNext ? (
                <p className="mt-2 text-sm text-supreme-mid">
                  Starts at {formatMinutes(upNext.startMinutes)}
                </p>
              ) : (
                <p className="mt-2 text-sm text-supreme-mid">
                  Next slot is not configured yet.
                </p>
              )}
            </article>

            <article className="rounded-[24px] border border-supreme-ink/10 bg-supreme-mist p-5">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
                Viewer-facing intent
              </p>
              <div className="mt-3 flex items-start gap-3">
                <PlayCircle className="mt-0.5 h-5 w-5 text-supreme-vivid" />
                <p className="text-sm leading-7 text-supreme-mid">
                  This layout is ready for an eventual real stream embed,
                  metadata overlays, and timed program transitions without
                  changing the page structure again.
                </p>
              </div>
            </article>
          </div>
        </aside>
      </div>
    </section>
  );
}
