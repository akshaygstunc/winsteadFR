import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://winsteadglobal.com/api/content/home-page/singleton"
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch home data" },
      { status: 500 }
    );
  }
}