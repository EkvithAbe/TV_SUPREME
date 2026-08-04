import { syncFacebookPages } from "@/lib/social/facebook";

async function main() {
  const result = await syncFacebookPages();
  console.log(`Facebook sync finished. Processed ${result.processed} posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
