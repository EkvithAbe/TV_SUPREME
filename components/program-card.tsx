import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ProgramWithCategory } from "@/lib/queries";

type ProgramCardProps = {
  program: ProgramWithCategory;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#e9e1f2] bg-white shadow-[0_14px_32px_rgba(33,24,51,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(33,24,51,0.12)]">
      <img
        src={program.imageUrl ?? "/images/news-cover.jpeg"}
        alt={program.title}
        className="h-56 w-full object-cover sm:h-60 lg:h-64"
      />
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span className="rounded-full bg-[#fff1f6] px-3 py-1.5 text-[10px] font-heading font-bold uppercase tracking-[0.16em] text-[#cf247b]">
            {program.category?.name ?? "Program"}
          </span>
          <span className="text-xs uppercase tracking-[0.14em] text-supreme-mid">
            {program.status}
          </span>
        </div>
        <h3 className="line-clamp-2 font-heading text-2xl font-extrabold leading-tight tracking-[-0.03em] text-supreme-ink sm:text-[1.7rem]">
          {program.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-supreme-mid">
          {program.summary}
        </p>
        <Link
          href={`/programs/${program.slug}`}
          className="link-pill mt-6 w-full justify-center sm:w-auto"
        >
          View Program
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </article>
  );
}
