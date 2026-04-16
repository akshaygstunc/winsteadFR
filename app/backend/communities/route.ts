import { NextResponse } from "next/server";

export async function GET(slug: string) {
  const res = await fetch(
    `https://winsteadglobal.com/api/content/communities/developer/${slug}`,
  );

  const data = await res.json();

  return NextResponse.json(data);
}