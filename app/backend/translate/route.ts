import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, target } = await req.json();
    console.log(process.env.NEXT_PUBLIC_API_KEY);
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key="AIzaSyBMXskxn6f3v7SJfSpjivxjAj-CKQm3TpQ"`,
      {
        method: "POST",
        body: JSON.stringify({
          q: text,
          target,
          format: "text",
        }),
      },
    );

    const data = await res.json();

    return NextResponse.json({
      translatedText: data.data.translations[0].translatedText,
    });
  } catch (e: any) {
    console.log(e.response);
    return NextResponse.error(e.response);
  }
}
