import { ExternalLink } from "lucide-react";

import type { SocialPostWithAccount } from "@/lib/queries";

type SocialCardProps = {
  post: SocialPostWithAccount;
};

export function SocialCard({ post }: SocialCardProps) {
  return (
    <article className="surface-card flex h-full flex-col p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-supreme-mid">
            {post.account?.title ?? post.platform}
          </p>
          <p className="mt-1 font-heading text-lg font-bold text-supreme-ink">
            {post.platform}
          </p>
        </div>
        <span className="rounded-full border border-supreme-ink/10 bg-supreme-mist px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-supreme-mid">
          {post.contentType}
        </span>
      </div>

      <p className="line-clamp-4 flex-1 text-sm leading-7 text-supreme-mid">
        {post.message ?? "No copy captured for this post yet."}
      </p>

      {post.thumbnailUrl ? (
        <img
          src={post.thumbnailUrl}
          alt={post.account?.title ?? post.platform}
          className="mt-5 h-44 w-full rounded-2xl object-cover"
        />
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-supreme-mid">
        <span>{new Intl.DateTimeFormat("en-LK", { dateStyle: "medium" }).format(post.publishedAt)}</span>
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-heading font-bold text-supreme-vivid transition hover:text-supreme-ink"
        >
          Open Post
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
