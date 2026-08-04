import { PlayCircle } from "lucide-react";

import type { VideoWithAccount } from "@/lib/queries";
import { formatCompactNumber } from "@/lib/utils";

type VideoCardProps = {
  video: VideoWithAccount;
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="surface-card overflow-hidden">
      <img
        src={video.thumbnailUrl ?? "/images/live.jpeg"}
        alt={video.title}
        className="h-56 w-full object-cover"
      />
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-supreme-vivid/10 px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-supreme-vivid">
            {video.isLive ? "Live" : video.platform}
          </span>
          <span className="text-xs text-supreme-mid">
            {new Intl.DateTimeFormat("en-LK", { dateStyle: "medium" }).format(video.publishedAt)}
          </span>
        </div>
        <h3 className="line-clamp-2 font-heading text-xl font-extrabold tracking-tight text-supreme-ink">
          {video.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-supreme-mid">
          {video.description ?? "Social video metadata synced from the source channel."}
        </p>
        <div className="mt-5 flex items-center justify-between gap-4 text-xs text-supreme-mid">
          <span className="inline-flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-supreme-vivid" />
            {video.account?.title ?? "TV Supreme"}
          </span>
          <span>{formatCompactNumber(video.viewCount)} views</span>
        </div>
        <a
          href={video.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e6e1ed] px-5 py-3 text-sm font-heading font-semibold text-supreme-ink transition hover:border-[#7a2de0] hover:text-[#7a2de0]"
        >
          Watch on YouTube
        </a>
      </div>
    </article>
  );
}
