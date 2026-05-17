"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { useMemo, useState } from "react";

type BlogItem = {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  slug?: string;
  image: string;
  createdAt: string;
  data?: {
    category?: string;
  };
};

export default function NewsGrid({
  news,
  loading,
  basePath = "blogs",
}: any) {
  const [currentPage, setCurrentPage] = useState(1);

  const ARTICLES_PER_PAGE = 3;

  const totalPages = Math.ceil((news?.length || 0) / ARTICLES_PER_PAGE);

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    const end = start + ARTICLES_PER_PAGE;

    return news?.slice(start, end) || [];
  }, [news, currentPage]);

  return (
    <section className="bg-black text-white px-6 md:px-12 py-14 md:py-18">
      <div className="max-w-[85rem] mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <article
                key={index}
                className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 animate-pulse"
              >
                <div className="relative h-[260px] overflow-hidden bg-white/10">
                  <div className="absolute top-4 left-4 h-7 w-24 rounded-full bg-white/10" />
                </div>

                <div className="p-5 space-y-4">
                  <div className="h-3 w-24 rounded bg-white/10" />

                  <div className="space-y-2">
                    <div className="h-6 w-full rounded bg-white/10" />
                    <div className="h-6 w-4/5 rounded bg-white/10" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-2/3 rounded bg-white/10" />
                  </div>

                  <div className="h-4 w-28 rounded bg-white/10" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <>
            {/* ARTICLES */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedNews?.map((item: BlogItem) => (
                <Link
                  href={item.slug ? `/${basePath}/${item.slug}` : "#"}
                  key={item._id}
                  className="block"
                >
                  <article className="group h-full flex flex-col rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#F1DC7F]/30 hover:shadow-[0_0_40px_rgba(241,220,127,0.08)] transition duration-300">
                    {/* IMAGE */}
                    <div className="relative h-[260px] w-full shrink-0">
                      <Image
                        src={item?.image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/65 border border-white/10 text-[11px] uppercase tracking-[0.18em] text-[#F1DC7F] backdrop-blur-sm">
                        {item?.data?.category || "General"}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <p className="text-xs uppercase tracking-[0.18em] text-white mb-2">
                        {new Date(item.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>

                      <h3 className="font-semibold leading-[1.2] text-lg line-clamp-2 group-hover:text-[#F1DC7F] transition">
                        {item.title}
                      </h3>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#F1DC7F]">
                        Read More
                        <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12 flex-wrap">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full text-sm transition ${
                        currentPage === page
                          ? "bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black font-semibold"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}