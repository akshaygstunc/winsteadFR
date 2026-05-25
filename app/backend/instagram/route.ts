import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const username = req.nextUrl.searchParams.get("username");

    if (!username) {
      return new Response(JSON.stringify({ error: "Missing username" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const response = await fetch(
      "https://instagram120.p.rapidapi.com/api/instagram/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "instagram120.p.rapidapi.com",
          "x-rapidapi-key":
            process.env.RAPIDAPI_KEY ||
            "959e144d07mshad5248c12758c1ep1f1689jsnde478f1f91c9",
        },
        body: JSON.stringify({
          username,
          maxId: "",
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      return new Response(
        JSON.stringify({
          error: "Failed to fetch Instagram posts",
          details: errorText,
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Instagram API proxy error:", err);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
