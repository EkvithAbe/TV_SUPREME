import { NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";
import { syncFacebookPages } from "@/lib/social/facebook";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-sync-secret");

  if (secret !== env.SYNC_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncFacebookPages();

  return NextResponse.json({
    ok: true,
    processed: result.processed
  });
}
