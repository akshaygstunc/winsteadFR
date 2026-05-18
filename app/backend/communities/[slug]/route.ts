import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const res = await fetch(
    `https://winsteadglobal.com/api/content/communities/developer/${slug}`,
  );

  const data = await res.json();

  return NextResponse.json(data);
}