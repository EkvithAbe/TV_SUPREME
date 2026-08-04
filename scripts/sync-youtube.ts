import { syncYoutubeChannels } from "@/lib/social/youtube";

async function main() {
  const result = await syncYoutubeChannels();
  console.log(`YouTube sync finished. Processed ${result.processed} videos.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
