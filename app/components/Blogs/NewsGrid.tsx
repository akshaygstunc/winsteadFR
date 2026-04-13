"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import img from "../../../public/image_7.png";
import WebsiteContentService from "@/app/services/websitecontent.service";
import { useState, useEffect } from "react";

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

export default function NewsGrid() {
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
        <section className="bg-black text-white px-6 md:px-12 py-14 md:py-18">
            
            <div className="max-w-[85rem] mx-auto">
                {loading

                    ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> {Array.from({ length: 4 }).map((_, index) => (
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
                    ))}</div> : 
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {blogs?.map((item, index) => {
                            const isLarge = index < 2;

                            return (
                                <Link href={`/blogs/${item.slug}`} key={item._id} className="block">
                                    <article
                                        className={`group h-full flex flex-col rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#F1DC7F]/30 hover:shadow-[0_0_40px_rgba(241,220,127,0.08)] transition duration-300`}
                                    >
                                        {/* Image */}
                                        <div className="relative h-[260px] w-full shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/65 border border-white/10 text-[11px] uppercase tracking-[0.18em] text-[#F1DC7F] backdrop-blur-sm">
                                                {item?.data?.category || "General"}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 md:p-6 flex flex-col flex-1">
                                            {/* Title (fixed lines) */}
                                            <h3 className="font-semibold leading-[1.2] text-lg line-clamp-2 group-hover:text-[#F1DC7F] transition">
                                                {item.title}
                                            </h3>

                                            {/* Description (fixed lines) */}
                                            <p className="mt-4 text-white text-sm md:text-base leading-relaxed line-clamp-3 flex-1">
                                                {item.description || "No description available."}
                                            </p>

                                            {/* CTA stays at bottom */}
                                            <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#F1DC7F]">
                                                Read More
                                                <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                }
            </div>
        </section>
    );
}