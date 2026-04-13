import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://winsteadglobal.com/api/content/footer-menu"
  );

  const data = await res.json();

  return NextResponse.json(data);
}