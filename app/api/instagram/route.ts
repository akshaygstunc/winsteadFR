import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts",
      {
        params: { username_or_id_or_url: "winstead_properties" },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "instagram-scraper-api2.p.rapidapi.com",
        },
      }
    );

    const posts = response?.data?.data?.items || [];

    const reels = posts
      .filter((item: any) => item.video_versions?.length > 0)
      .slice(0, 12) // limit to 12 reels
      .map((item: any) => ({
        original: item.code
          ? `https://www.instagram.com/reel/${item.code}/`
          : "#",
        // ✅ Pass the CDN url as a query param to YOUR proxy route
        video: `/api/instagram/proxy?url=${encodeURIComponent(
          item.video_versions[0]?.url || ""
        )}`,
        thumbnail: item.image_versions?.items?.[0]?.url || "",
      }));

    return NextResponse.json(reels);
  } catch (error) {
    console.error("Instagram API error:", error);
    return NextResponse.json([], { status: 200 });
  }
}