import { NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";
import { syncYoutubeChannels } from "@/lib/social/youtube";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-sync-secret");

  if (secret !== env.SYNC_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncYoutubeChannels();

  return NextResponse.json({
    ok: true,
    processed: result.processed
  });
}
