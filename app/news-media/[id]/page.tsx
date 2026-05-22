"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AutoBreadcrumbs from "../../components/BreadCrumbs";
import WebsiteContentService from "../../services/websitecontent.service.ts";
import { useEffect, useMemo, useState } from "react";
import Img1 from "../../../public/hero5.png";
import Img3 from "../../../public/hero2.png";
import HtmlRenderer from "../../components/HtmlRenderer"
// ─── Helpers ────────────────────────────────────────────────────────────────

const EMPTY_TEXT = "Not available";

function formatDate(value?: string) {
  if (!value) return EMPTY_TEXT;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return EMPTY_TEXT;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function NewsMediaDetailPage() {
  const params = useParams();
  const slug = String(params?.id || "");

  const [details, setDetails] = useState<any>(null);
  const [relatedMedia, setRelatedMedia] = useState<any[]>([]);
  const [suggestedProperties, setSuggestedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // reuse getBlogBySlug — same API shape, just different collection
        // if your backend has a separate media slug endpoint, swap it here:
        // WebsiteContentService.getMediaBySlug(slug)
        const response = await WebsiteContentService.getMedia();
        const mediaList = await WebsiteContentService.getMedia();

       const matchedData =
  response?.find((item: any) => item?.slug === slug) || null;

setDetails(matchedData);
        setRelatedMedia(mediaList || []);
        setSuggestedProperties(response?.suggestedProperties || []);
      } catch (err) {
        console.error(err);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchData();
  }, [slug]);

  const article = useMemo(() => {
    if (!details) return null;

    return {
      title:
        details.title || details.heroTitle || details.metaTitle || EMPTY_TEXT,
      category:
        details.data?.category ||
        details.pageType ||
        details.entity ||
        EMPTY_TEXT,
      description: details.description,
      img: details.image || Img1,
      heroVideo: details.heroVideo || details.data?.videoUrl || "",
      date:
        formatDate(details.updatedAt) !== EMPTY_TEXT
          ? formatDate(details.updatedAt)
          : formatDate(details.createdAt),
    };
  }, [details]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-4xl px-6 animate-pulse">
          <div className="h-[65vh] bg-white/5 rounded-2xl" />
          <div className="h-6 w-1/3 bg-white/10 rounded" />
          <div className="h-10 w-2/3 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  // if (hasError || !article) return notFound();

  // related = all media except current slug, max 4
  const related = relatedMedia.filter((m) => m.slug !== slug).slice(0, 4);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ── HERO ── */}
      <section className="relative h-[65vh] min-h-[420px]">
        <Image
          src={article.img}
          alt={article.title}
          fill
          unoptimized={
            typeof article.img === "string" && article.img.startsWith("data:")
          }
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-yellow-400 mb-3">
            {article.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-[1.1] mb-4">
            {article.title}
          </h1>
          <p className="text-gray-400 text-sm">{article.date}</p>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-4xl px-6 py-6">
        <AutoBreadcrumbs />
      </div>

      {/* ── ARTICLE + SIDEBAR ── */}
      <section className="max-w-[88rem] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
          {/* LEFT: Article body */}
          <div>

            {/* Body HTML */}
          <HtmlRenderer content={details?.description} />

            {/* Video link */}
            {article.heroVideo && (
              <div className="mt-8 p-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center gap-3">
                <span className="text-yellow-400 text-sm font-medium">
                  📺 Video Reference
                </span>
                <a
                  href={article.heroVideo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-yellow-400 underline underline-offset-4"
                >
                  Watch now →
                </a>
              </div>
            )}

            {/* Suggested properties */}
            {suggestedProperties.length > 0 && (
              <div className="mt-12">
                <h3 className="text-base font-semibold text-white mb-4 uppercase tracking-widest text-xs text-white/50">
                  Suggested Properties
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {suggestedProperties.map((p: any) => (
                    <Link
                      key={p._id}
                      href={`/projects/${p.slug}`}
                      className="border border-white/10 rounded-xl overflow-hidden group bg-white/[0.03] hover:border-yellow-400/30 transition"
                    >
                      <div className="relative h-28 w-full">
                        <Image
                          src={p.thumbnail || p.gallery?.[0] || Img1}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <div className="p-3 space-y-1">
                        <h4 className="text-xs font-medium line-clamp-2 group-hover:text-yellow-400 transition">
                          {p.title}
                        </h4>
                        <p className="text-[10px] text-white truncate">
                          {p.location?.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Related media sidebar */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-28 self-start">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white mb-1">
              More from News & Media
            </p>

            {related.map((item) => (
              <Link
                key={item._id}
                href={`/news-media/${item.slug}`}
                className="group flex gap-3 border border-white/10 rounded-xl overflow-hidden bg-white/[0.03] hover:border-yellow-400/30 transition"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src={item.image || Img1}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Text */}
                <div className="py-2 pr-3 flex flex-col justify-center gap-1">
                  <p className="text-[10px] text-yellow-400/70 uppercase tracking-widest">
                    {item.data?.category || "Media"}
                  </p>
                  <h4 className="text-xs font-medium line-clamp-2 group-hover:text-yellow-400 transition leading-relaxed">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-white">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </Link>
            ))}

            {/* CTA */}
            <Link
              href="/news-media"
              className="mt-2 block text-center text-xs border border-white/10 hover:border-yellow-400/40 text-white hover:text-yellow-400 py-3 rounded-xl transition"
            >
              View all news & media →
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
