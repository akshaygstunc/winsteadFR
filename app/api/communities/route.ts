import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://winsteadglobal.com/api/content/communities"
  );

  const data = await res.json();

  return NextResponse.json(data);
}