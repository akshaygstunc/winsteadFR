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

  const [blogDetails, setBlogDetails] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [suggestedProperties, setSuggestedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);

        const response = await WebsiteContentService.getBlogBySlug(slug);
        const blogsResponse = await WebsiteContentService.getBlogs();

        setBlogDetails(response || null);
        setBlogs(blogsResponse || []);
        setSuggestedProperties(response?.suggestedProperties || []);
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

      heroVideo:
        blogDetails.heroVideo || blogDetails.data?.videoUrl || "",

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

      {/* HERO */}
      <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
        {blog.heroVideo ? (
          <video
            src={blog.heroVideo}
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={blog.img}
            alt={blog.title}
            fill
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <p className="text-yellow-400 uppercase text-sm mb-3">
            {blog.category}
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            {blog.title}
          </h1>

          <p className="text-gray-300 text-sm">{blog.date}</p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="max-w-4xl px-6 py-6">
        <AutoBreadcrumbs />
      </div>

      {/* MAIN LAYOUT */}
      <section className="max-w-[88rem] mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-16">

            {/* BLOG CONTENT */}
            <div className="space-y-8 text-base md:text-lg leading-8">
              <HtmlRenderer content={blog.fullDesc} />

              <div className="rounded-[24px] overflow-hidden border border-white/10">
                <Image
                  src={blog.img || Img3}
                  alt="blog"
                  width={1600}
                  height={900}
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
              </div>
            </div>

            {/* RELATED BLOGS */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Related Articles
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {blogs
                  ?.filter((b) => b.slug !== slug)
                  ?.slice(0, 3)
                  ?.map((item) => (
                    <Link
                      key={item._id}
                      href={`/blogs/${item.slug}`}
                      className="border border-white/10 rounded-2xl overflow-hidden group"
                    >
                      <div className="relative h-44">
                        <Image
                          src={item.image || Img1}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition"
                        />
                      </div>

                      <div className="p-5">
                        <p className="text-yellow-400 text-sm mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-semibold group-hover:text-yellow-400">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          {suggestedProperties.length > 0 && (
  <div className="space-y-4 sticky top-24">

    <h3 className="text-xl font-semibold">
      Featured Properties
    </h3>

    {/* ✅ SCROLLABLE BOX */}
    <div className="max-h-[500px] overflow-y-auto pr-2">

      {/* ✅ 2 COLUMN GRID */}
      <div className="grid grid-cols-2 gap-3">

        {suggestedProperties.map((p: any) => (
          <Link
            key={p._id}
            href={`/projects/${p.slug}`}
            className="border border-white/10 rounded-xl overflow-hidden group bg-white/5 hover:bg-white/10 transition"
          >
            {/* Image */}
            <div className="relative h-24 w-full">
              <Image
                src={p.thumbnail || p.gallery?.[0] || Img1}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <div className="p-2 space-y-1">
              <h4 className="text-xs font-medium line-clamp-2 group-hover:text-yellow-400">
                {p.title}
              </h4>

              <p className="text-[10px] text-gray-400 truncate">
                {p.location?.title}
              </p>

              {/* <p className="text-xs text-yellow-400 font-semibold">
                ₹ {p.price?.toLocaleString()}
              </p> */}
            </div>
          </Link>
        ))}

      </div>
    </div>
  </div>
)}

        </div>
      </section>
    </div>
  );
}