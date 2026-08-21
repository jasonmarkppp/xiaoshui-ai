import { NextResponse } from "next/server";
import { getStore } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getStore());
}
