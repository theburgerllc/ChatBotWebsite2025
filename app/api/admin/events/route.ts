import { NextRequest, NextResponse } from "next/server";
import { getEvents } from "@/lib/events";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as any;
  const limit = parseInt(searchParams.get("limit") || "100");
  
  const events = await getEvents(limit, type);
  
  return NextResponse.json({ events });
}
