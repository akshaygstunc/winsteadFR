"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AutoBreadcrumbs from "../../components/BreadCrumbs";
import Schema from "@/app/components/Schema";
import { resolveSchemas } from "@/app/components/lib/schema/resolver";
import Img1 from "../../../public/hero5.png";
import Img2 from "../../../public/hero1.jpg";
import Img3 from "../../../public/hero2.png";
import Img4 from "../../../public/hero3.jpg";
import WebsiteContentService from "@/app/services/websitecontent.service";
import { useEffect, useMemo, useState } from "react";


// ─── Advertisement Components ───────────────────────────────────────────────
// These are ready to be wired to your admin-portal advertisement API.
// Each component accepts an `ad` prop — swap static values for API data.

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
        <Image
          src={ad.image}
          alt={ad.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {ad.badge && (
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 px-2 py-0.5 rounded-full">
          {ad.badge}
        </span>
      )}

      <div className="absolute bottom-0 p-4 w-full">
        <h4 className="text-white font-semibold text-base leading-snug">
          {ad.title}
        </h4>
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
        <Image
          src={ad.image}
          alt={ad.title}
          fill
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
        <Image
          src={ad.image}
          alt={ad.headline}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-black/70" />

        {ad.badge && (
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-black/60 border border-white/20 text-gray-400 px-2 py-0.5 rounded-full">
            {ad.badge}
          </span>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-white font-semibold text-sm leading-snug mb-3">
            {ad.headline}
          </p>
          <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold px-4 py-1.5 rounded-lg group-hover:opacity-90 transition">
            {ad.cta}
          </span>
        </div>
      </div>
    </Link>
  );
}
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

type RelatedArticle = {
  id: number;
  title: string;
  desc: string;
  fullDesc: string;
  date: string;
  img: any;
  category: string;
};

const news: RelatedArticle[] = [
  {
    id: 1,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    fullDesc:
      "Dubai’s real estate market has reached new heights driven by strong international demand, investor confidence, and luxury developments across prime locations.",
    date: "March 2026",
    img: Img1,
    category: "Market Update",
  },
  {
    id: 2,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    fullDesc:
      "Emerging communities across Dubai and Abu Dhabi are attracting investors due to strong ROI and infrastructure growth.",
    date: "Feb 2026",
    img: Img2,
    category: "Investment",
  },
  {
    id: 3,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    fullDesc:
      "Off-plan properties are gaining traction due to flexible payment plans and high capital appreciation potential.",
    date: "Jan 2026",
    img: Img4,
    category: "Off-Plan",
  },
];

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

export default function BlogDetailPage() {
  const params = useParams();
  const slug = String(params?.id || "");

  const [blogDetails, setBlogDetails] = useState<BlogApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        setHasError(false);
        const response = await WebsiteContentService.getBlogBySlug(slug);
        const blogsreponse = await WebsiteContentService.getBlogs();
        setBlogs(blogsreponse);
        setBlogDetails(response || null);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setHasError(true);
        setBlogDetails(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const blog = useMemo(() => {
    if (!blogDetails) return null;

    const category =
      blogDetails.data?.category ||
      blogDetails.pageType ||
      blogDetails.entity ||
      EMPTY_TEXT;

    const title =
      blogDetails.title ||
      blogDetails.heroTitle ||
      blogDetails.metaTitle ||
      EMPTY_TEXT;
    // ✅ description is the main article body from your API
    const intro = blogDetails?.description || EMPTY_TEXT;

    // const intro =
    //   blogDetails.description ||
    //   blogDetails.heroSubtitle ||
    //   blogDetails.metaDescription ||
    //   EMPTY_TEXT;

    // ✅ data.metaDescription has the detailed SEO body
    const fullBody =
      blogDetails.data?.metaDescription ||
      blogDetails.metaDescription ||
      blogDetails.description ||
      EMPTY_TEXT;

    const heroImage = blogDetails.image || Img1;

    const displayDate =
      formatDate(blogDetails.updatedAt) !== EMPTY_TEXT
        ? formatDate(blogDetails.updatedAt)
        : formatDate(blogDetails.createdAt);

    return {
      id: blogDetails._id || slug,
      title,
      subtitle: getText(blogDetails.subtitle, ""),
      category,
      desc: intro,
      fullDesc: fullBody,
      date: displayDate,
      img: heroImage,
      heroVideo: blogDetails.heroVideo || blogDetails.data?.videoUrl || "",
      suggestPropertyType: getText(blogDetails.data?.suggestPropertyType),
      suggestPropertyCategory: getText(
        blogDetails.data?.suggestPropertyCategory,
      ),
      suggestPropertyDeveloper: getText(
        blogDetails.data?.suggestPropertyDeveloper,
      ),
      metaKeywords: getText(blogDetails.data?.metaKeywords),
    };
  }, [blogDetails, slug]);

  if (loading) {
    return <BlogDetailsSkeleton />;
  }

  if (hasError || !blog) return notFound();

  return (
    <div className="bg-black text-white min-h-screen">
      <Schema
        schemas={resolveSchemas({
          type: "blog",
          data: blog,
        })}
      />
      {/* HERO */}
      <section className="relative h-[65vh] min-h-[420px]">
        <Image
          src={blog.img}
          alt={blog.title}
          fill
          unoptimized={
            typeof blog.img === "string" && blog.img.startsWith("data:")
          }
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <p className="text-yellow-400 uppercase text-sm tracking-[0.2em] mb-3">
            {blog.category}
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
            {blog.title}
          </h1>

          <p className="text-gray-300 text-sm">{blog.date}</p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="max-w-4xl px-6 py-6">
        <AutoBreadcrumbs />
      </div>


{/* ARTICLE CONTENT */}
<section className="max-w-[88rem] mx-auto px-6 pb-16">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
    
    {/* ── LEFT: Main Article ── */}
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white pb-4">
        Property Insights
      </h2>
      <div className="relative rounded-[24px] overflow-hidden border border-white/10">
        <Image
          src={blog.img || Img3}
          alt="Article visual"
          width={1600}
          height={900}
          unoptimized={
            typeof blog.img === "string" && blog.img.startsWith("data:")
          }
          className="w-full h-[300px] md:h-[450px] object-cover"
        />
      </div>
      <div className="space-y-8 text-white leading-8 text-base md:text-lg pt-5">
        <div
          className="prose prose-invert max-w-none text-white prose-headings:text-white prose-a:text-yellow-400"
          dangerouslySetInnerHTML={{ __html: blog.desc }}
        />

        {blog.heroVideo ? (
          <p>
            <span className="text-white font-medium">Video Reference:</span>{" "}
            <a
              href={blog?.heroVideo}
              target="_blank"
              rel="noreferrer"
              className="text-yellow-400 underline"
            >
              Watch related video
            </a>
          </p>
        ) : (
          <p>
            <span className="text-white font-medium">Video Reference:</span>{" "}
            Not available
          </p>
        )}
      </div>
    </div>

    {/* ── RIGHT: Advertisement Sidebar ── */}
    <aside className="hidden lg:flex flex-col gap-6 sticky top-28 self-start">
      
      {/* Ad Slot 1 — Large Banner */}
      {/* TODO: Replace static data with advertisement API response */}
      <AdBannerLarge
        ad={{
          image: Img1,             // TODO: ad.image
          title: "Premium Villa",  // TODO: ad.title
          subtitle: "Palm Jumeirah, Dubai", // TODO: ad.subtitle
          cta: "View Property",    // TODO: ad.ctaLabel
          href: "/projects",       // TODO: ad.ctaUrl
          badge: "Sponsored",
        }}
      />

      {/* Ad Slot 2 — Featured Project Card */}
      {/* TODO: Replace static data with advertisement API response */}
      <AdFeaturedCard
        ad={{
          image: Img2,
          title: "Luxury Apartments",
          location: "Downtown Dubai",
          price: "AED 2,400,000",
          href: "/projects",
          badge: "Featured",
        }}
      />

      {/* Ad Slot 3 — Small Square Ad */}
      {/* TODO: Replace static data with advertisement API response */}
      <AdSquareBanner
        ad={{
          image: Img3,
          headline: "Invest in UAE Real Estate",
          cta: "Get Free Consultation",
          href: "/contact",
          badge: "Ad",
        }}
      />
    </aside>
  </div>
</section>

      {/* RELATED BLOGS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Related Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs
            ?.filter((blg) => blg.slug && blg.slug !== params.id)
            ?.slice(0, 3)
            .map((item) => (
              <Link
                key={item.id}
                href={`/blogs/${item.slug}`}
                className="group border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="relative h-44">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <p className="text-sm text-yellow-400 mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-semibold text-white group-hover:text-yellow-400 transition">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-white/10 ${className}`} />
  );
}

function BlogDetailsSkeleton() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <section className="relative h-[65vh] min-h-[420px] px-4 md:px-6 pt-4">
        <div className="relative h-full rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.03]">
          <SkeletonBlock className="absolute inset-0 rounded-[32px]" />
          <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
            <SkeletonBlock className="h-4 w-28 mb-4" />
            <SkeletonBlock className="h-10 md:h-14 w-[80%] mb-4" />
            <SkeletonBlock className="h-4 w-32" />
          </div>
        </div>
      </section>

      <div className="max-w-4xl px-6 py-6">
        <SkeletonBlock className="h-5 w-48" />
      </div>

      <section className="max-w-[88rem] mx-auto px-6 pb-16">
        <SkeletonBlock className="h-8 w-[70%] mb-10" />

        <div className="space-y-4 mb-10">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-[96%]" />
          <SkeletonBlock className="h-4 w-[90%]" />
        </div>

        <SkeletonBlock className="h-[300px] md:h-[450px] w-full rounded-[24px] mb-10" />

        <div className="space-y-4">
          <SkeletonBlock className="h-8 w-64" />
          <SkeletonBlock className="h-4 w-[85%]" />
          <SkeletonBlock className="h-4 w-[75%]" />
          <SkeletonBlock className="h-4 w-[65%]" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <SkeletonBlock className="h-8 w-56 mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-white/10 rounded-2xl overflow-hidden"
            >
              <SkeletonBlock className="h-44 w-full rounded-none" />
              <div className="p-5">
                <SkeletonBlock className="h-4 w-24 mb-3" />
                <SkeletonBlock className="h-5 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
