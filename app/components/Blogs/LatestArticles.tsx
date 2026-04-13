"use client";

import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState } from "react";
import WebsiteContentService from "@/app/services/websitecontent.service";
import Link from "next/link";

type BlogItem = {
    _id: string;
    title: string;
    description?: string;
    date?: string;
    slug?: string;
    image: string;
    data?: {
        category?: string;
    };
};

export default function LatestArticles() {
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                setLoading(true);
                const response = await WebsiteContentService.getBlogs();
                setBlogs(response || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    return (
        <section className="py-1 mb-2 px-6 md:px-6 border-b border-white/10">
            <div className="max-w-[85rem] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                    <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            Latest Articles
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            Curated updates from the market.
                        </h2>
                    </div>

                    <button className="border border-yellow-500 text-yellow-400 px-5 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition">
                        View All Articles
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 4 }).map((_, index) => (
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
                        ))
                        : blogs?.slice(0, 4)?.map((item) => (
                            <article
                                key={item._id}
                                className="group rounded-[24px] overflow-hidden border border-white/10 bg-white/5 hover:border-yellow-500/30 transition duration-300"
                            >
                                <div className="relative h-[260px] overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[11px] uppercase tracking-[0.15em] text-yellow-400 backdrop-blur-sm">
                                        {item?.data?.category || "Category"}
                                    </div>
                                </div>

                                <div className="p-5 space-y-4">
                                    <p className="text-xs uppercase tracking-[0.18em] text-white">
                                        {item.date || "Recent Article"}
                                    </p>

                                    <h3 className="text-xl font-semibold leading-snug group-hover:text-yellow-300 transition">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm lg:text-md text-white leading-relaxed">
                                        {item?.description?.slice(0, 100)}....
                                    </p>

                                    <Link
                                        href={`/blogs/${item?.slug}`}
                                        className="inline-flex items-center gap-2 text-sm text-yellow-400 font-medium hover:text-white transition"
                                    >
                                        Read More <FaArrowRight className="text-xs" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
}