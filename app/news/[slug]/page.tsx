import { notFound } from "next/navigation";

import { getArticleBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Colombo"
});

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({
  params
}: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="section-wrap py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card p-6 sm:p-8">
          <p className="eyebrow">{article.category}</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-supreme-ink sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-supreme-mid sm:text-base sm:leading-8">
            {article.body ?? article.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="data-pill">
              Published · {dateFormatter.format(article.publishedAt)}
            </span>
            <span className="data-pill">Category · {article.category}</span>
            <span className="data-pill">Slug · /news/{article.slug}</span>
          </div>
        </div>

        <img
          src={article.imageUrl ?? "/images/news-cover.jpeg"}
          alt={article.title}
          className="surface-card h-full min-h-[240px] w-full object-cover sm:min-h-[360px]"
        />
      </div>
    </section>
  );
}
