import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "supreme-tv-web",
    timestamp: new Date().toISOString()
  });
}
