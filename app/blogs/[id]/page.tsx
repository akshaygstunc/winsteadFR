"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AutoBreadcrumbs from "../../components/BreadCrumbs";
import Schema from "@/app/components/Schema";
import { resolveSchemas } from "@/app/components/lib/schema/resolver";
import Img1 from "../../../public/hero5.png";
import Img3 from "../../../public/hero2.png";
import WebsiteContentService from "@/app/services/websitecontent.service";
import { useEffect, useMemo, useState } from "react";
import HtmlRenderer from "@/app/components/HtmlRenderer";

// ─── Advertisement Components ───────────────────────────────────────────────
type AdBannerLargeProps = {
  ad: {
    image: any;
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    badge?: string;
  };
};

function AdBannerLarge({ ad }: AdBannerLargeProps) {
  return (
    <Link
      href={ad.href}
      className="group relative block rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
    >
      <div className="relative h-[220px] w-full">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>
      {ad.badge && (
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 px-2 py-0.5 rounded-full">
          {ad.badge}
        </span>
      )}
      <div className="absolute bottom-0 p-4 w-full">
        <h4 className="text-white font-semibold text-base leading-snug">{ad.title}</h4>
        <p className="text-gray-400 text-xs mt-1 mb-3">{ad.subtitle}</p>
        <span className="inline-block text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold px-4 py-1.5 rounded-lg">
          {ad.cta}
        </span>
      </div>
    </Link>
  );
}

type AdFeaturedCardProps = {
  ad: {
    image: any;
    title: string;
    location: string;
    price: string;
    href: string;
    badge?: string;
  };
};

function AdFeaturedCard({ ad }: AdFeaturedCardProps) {
  return (
    <Link
      href={ad.href}
      className="group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/40 transition-all duration-300 bg-white/[0.03]"
    >
      {ad.badge && (
        <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 px-2 py-0.5 rounded-full">
          {ad.badge}
        </span>
      )}
      <div className="relative h-[160px] w-full">
        <img
          src={ad.image}
          alt={ad.title}
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-4">
        <h4 className="text-white font-semibold text-sm">{ad.title}</h4>
        <p className="text-gray-400 text-xs mt-1">{ad.location}</p>
        <p className="text-yellow-400 text-sm font-medium mt-2">{ad.price}</p>
      </div>
      <div className="px-4 pb-4">
        <span className="block text-center text-xs border border-yellow-500/50 text-yellow-400 py-1.5 rounded-lg group-hover:bg-yellow-500 group-hover:text-black transition duration-300">
          Check Details
        </span>
      </div>
    </Link>
  );
}

type AdSquareBannerProps = {
  ad: {
    image: any;
    headline: string;
    cta: string;
    href: string;
    badge?: string;
  };
};

function AdSquareBanner({ ad }: AdSquareBannerProps) {
  return (
    <Link
      href={ad.href}
      className="group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/40 transition-all duration-300"
    >
      <div className="relative h-[140px] w-full">
        <img
          src={ad.image}
          alt={ad.headline}
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-black/70" />
        {ad.badge && (
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-black/60 border border-white/20 text-gray-400 px-2 py-0.5 rounded-full">
            {ad.badge}
          </span>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-white font-semibold text-sm leading-snug mb-3">{ad.headline}</p>
          <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold px-4 py-1.5 rounded-lg group-hover:opacity-90 transition">
            {ad.cta}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Enquire Form ────────────────────────────────────────────────────────────
// function EnquireForm() {
//   const [form, setForm] = useState({ name: "", phone: "", email: "" });

//   return (
//     <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
//       <h3 className="text-white font-semibold text-base mb-4 uppercase tracking-wide">
//         Enquire Now
//       </h3>
//       <div className="space-y-3">
//         <div>
//           <label className="text-gray-400 text-xs mb-1 block">Your name</label>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
//           />
//         </div>
//         <div>
//           <label className="text-gray-400 text-xs mb-1 block">Phone number</label>
//           <input
//             type="tel"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
//           />
//         </div>
//         <div>
//           <label className="text-gray-400 text-xs mb-1 block">Your e-mail</label>
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
//           />
//         </div>
//         <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 transition mt-1">
//           SUBMIT
//         </button>
//       </div>
//     </div>
//   );
// }

// ─── Inline link highlighter ─────────────────────────────────────────────────
// Wraps any <a> tags inside HtmlRenderer content with yellow highlight styling
// by injecting a style override via a wrapper div.
function ArticleContent({ content }: { content: string }) {
  return (
    <div className="article-content space-y-6 text-white leading-8 text-base md:text-lg [&_a]:text-yellow-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-yellow-400/50 [&_a]:font-medium [&_a:hover]:text-yellow-300 [&_a:hover]:decoration-yellow-300 [&_a]:transition-colors [&_a]:duration-200">
      <HtmlRenderer content={content} />
    </div>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────
type BlogApiResponse = {
  _id?: string;
  entity?: string;
  title?: string;
  subtitle?: string;
  slug?: string;
  status?: string;
  pageType?: string;
  image?: string;
  heroVideo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  sortOrder?: number;
  data?: {
    videoUrl?: string;
    category?: string;
    suggestPropertyType?: string;
    suggestPropertyCategory?: string;
    suggestPropertyDeveloper?: string;
    metaTitle?: string;
    metaKeywords?: string;
    metaDescription?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

const EMPTY_TEXT = "Not available";

function getText(value?: string, fallback = EMPTY_TEXT) {
  if (!value || !String(value).trim()) return fallback;
  return value;
}

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

// ─── Page ────────────────────────────────────────────────────────────────────
export default function BlogDetailPage() {
  const params = useParams();
  const slug = String(params?.id || "");

  const [blogDetails, setBlogDetails] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [suggestedProperties, setSuggestedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [advertisements, setAdvertisements] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const response = await WebsiteContentService.getBlogBySlug(slug);
        const blogsResponse = await WebsiteContentService.getBlogs();
        setBlogDetails(response || null);
        setBlogs(blogsResponse || []);
        setSuggestedProperties(response?.suggestedProperties || []);
        setAdvertisements(response?.data?.advertisements || []);
      } catch (err) {
        console.error(err);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchBlog();
  }, [slug]);

  const blog = useMemo(() => {
    if (!blogDetails) return null;

    return {
      id: blogDetails._id || slug,
      title:
        blogDetails.title ||
        blogDetails.heroTitle ||
        blogDetails.metaTitle ||
        EMPTY_TEXT,
      category:
        blogDetails.data?.category ||
        blogDetails.pageType ||
        blogDetails.entity ||
        EMPTY_TEXT,
      fullDesc:
        blogDetails.metaDescription ||
        blogDetails.data?.metaDescription ||
        blogDetails.description ||
        EMPTY_TEXT,
      img: blogDetails.image || Img1,
      heroVideo: blogDetails.heroVideo || blogDetails.data?.videoUrl || "",
      date:
        formatDate(blogDetails.updatedAt) !== EMPTY_TEXT
          ? formatDate(blogDetails.updatedAt)
          : formatDate(blogDetails.createdAt),
    };
  }, [blogDetails, slug]);

  if (loading) return <div className="p-10 text-white">Loading...</div>;
  if (hasError || !blog) return notFound();
  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── PAGE HEADER (matches screenshot: centered title + breadcrumb) ── */}
      <section className="border-b border-white/10 sm:pb-0 lg:py-10 text-center mt-[40px]">
        <h2 className="text-white text-2xl font-semibold mb-3">Our Blogs</h2>
        <span className="flex justify-center"><AutoBreadcrumbs /></span>
        
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-full mx-auto px-6 py-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* ── LEFT: Article ── */}
          <div>
            {/* Title + Author + Date */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-medium text-yellow-400 leading-snug mb-2">
                {blog.title}
              </h1>
              <p className="text-gray-400 text-sm">
                By{" "}
                <span className="text-gray-300 font-medium"> Winstead Global</span>
                {blog.date !== EMPTY_TEXT && (
                  <span className="ml-2">{blog.date}</span>
                )}
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-md overflow-hidden mb-8">
              <Image
                src={blog.img}
                alt={blog.title}
                width={1600}
                height={900}
                unoptimized={
                  typeof blog.img === "string" && blog.img.startsWith("data:")
                }
                className="w-full h-[300px] md:h-[480px] object-cover"
              />
            </div>

            {/* Article Body — links inside content are highlighted yellow */}
            <ArticleContent content={blog.fullDesc} />

            {/* Video Reference */}
            <div className="mt-8 pt-6 border-t border-white/10">
              {blog.heroVideo ? (
                <p className="text-sm text-gray-300">
                  <span className="text-white font-medium">Video Reference: </span>
                  <a
                    href={blog.heroVideo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300 transition"
                  >
                    Watch related video
                  </a>
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  <span className="text-white font-medium">Video Reference: </span>
                  Not available
                </p>
              )}
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">

            {/* Enquire Form */}
            {/* <EnquireForm /> */}

            {/* Suggested Properties */}
            {suggestedProperties.length > 0 && (
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-3">
                  Off-Plan
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {suggestedProperties.map((p: any) => (
                    <Link
                      key={p._id}
                      href={`/projects/${p.slug}`}
                      className=" flex justify-start border border-white/10 rounded-xl overflow-hidden group bg-white/5 hover:bg-white/10 transition"
                    >
                      <div className="relative h-20 w-20 rounded-sm">
                        <Image
                          src={p.thumbnail || p.gallery?.[0] || Img1}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <div className="p-2 space-y-1">
                        <h4 className="text-xs font-medium line-clamp-2 group-hover:text-yellow-400">
                          {p.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 truncate">
                          AED {p.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Advertisements */}
            {advertisements.length > 0 &&
              advertisements.map((ad: any, index: number) => (
                <AdBannerLarge
                  key={index}
                  ad={{
                    image: ad.image || Img1,
                    title: ad.text || "Premium Villa",
                    subtitle: ad.subtitle || "Palm Jumeirah, Dubai",
                    cta: ad.ctaLabel || "View Property",
                    href: ad.link || "/projects",
                    badge: ad.badge || "Sponsored",
                  }}
                />
              ))}
          </aside>
        </div>
      </section>
    </div>
  );
}