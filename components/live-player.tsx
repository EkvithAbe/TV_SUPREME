import { getHomePageData } from "@/lib/queries";
import { formatCompactNumber, formatMinutes } from "@/lib/utils";

import { LivePlayerWidget } from "@/components/live-player-widget";

export async function LivePlayer() {
  const { liveNow, latestVideos } = await getHomePageData();

  const featuredVideo = latestVideos[0] ?? null;
  const title = liveNow?.program?.title ?? liveNow?.title ?? "TV Supreme Live";
  const subtitle = liveNow
    ? `${formatMinutes(liveNow.startMinutes)} - ${formatMinutes(liveNow.endMinutes)}`
    : "Now Broadcasting";
  const viewerLabel =
    featuredVideo?.viewCount && Number(featuredVideo.viewCount) > 0
      ? `${formatCompactNumber(featuredVideo.viewCount)} watching`
      : "Live audience active";
  const heroImage =
    liveNow?.program?.imageUrl ?? featuredVideo?.thumbnailUrl ?? "/images/live.jpeg";

  return (
    <LivePlayerWidget
      title={title}
      subtitle={subtitle}
      viewerLabel={viewerLabel}
      heroImage={heroImage}
    />
  );
}
