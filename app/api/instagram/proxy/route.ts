import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("Missing url", { status: 400 });
  }

  try {
    const upstream = await fetch(url, {
      headers: {
        // Mimic a browser request so Instagram CDN accepts it
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://www.instagram.com/",
        Origin: "https://www.instagram.com",
      },
    });

    if (!upstream.ok) {
      return new Response("Failed to fetch video", { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") || "video/mp4";
    const contentLength = upstream.headers.get("content-length");

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    };

    if (contentLength) headers["Content-Length"] = contentLength;

    // ✅ Stream the video body directly — no buffering
    return new Response(upstream.body, { headers });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response("Proxy error", { status: 500 });
  }
}