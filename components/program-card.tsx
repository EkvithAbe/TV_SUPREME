import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ProgramWithCategory } from "@/lib/queries";

type ProgramCardProps = {
  program: ProgramWithCategory;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="overflow-hidden rounded-[34px] border border-[#ece8f2] bg-white shadow-[0_24px_60px_rgba(78,38,149,0.10)]">
      <img
        src={program.imageUrl ?? "/images/news-cover.jpeg"}
        alt={program.title}
        className="h-56 w-full object-cover sm:h-64 lg:h-72"
      />
      <div className="p-5 sm:p-8">
        <div className="mb-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span className="rounded-full bg-[#fff1f6] px-4 py-2 text-[11px] font-heading font-bold uppercase tracking-[0.16em] text-[#d9485b]">
            {program.category?.name ?? "Program"}
          </span>
          <span className="text-sm uppercase tracking-[0.16em] text-supreme-mid">
            {program.status}
          </span>
        </div>
        <h3 className="font-heading text-[1.8rem] font-extrabold tracking-tight text-supreme-ink sm:text-[2.1rem]">
          {program.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-supreme-mid sm:text-lg sm:leading-9">
          {program.summary}
        </p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#e6e1ed] px-6 py-3.5 text-base font-heading font-semibold text-supreme-ink transition hover:border-[#7a2de0] hover:text-[#7a2de0] sm:mt-8 sm:w-auto sm:px-8 sm:py-4 sm:text-xl"
        >
          View Program
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </article>
  );
}
