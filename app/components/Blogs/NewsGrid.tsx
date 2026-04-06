"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import img from "../../../public/image_7.png";

type NewsItem = {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
};

export default function NewsGrid({ news }: { news: NewsItem[] }) {
    return (
        <section className="bg-black text-white px-6 md:px-12 py-14 md:py-18">
            <div className="max-w-7xl mx-auto">
                {news.length === 0 ? (
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-10 text-center text-white">
                        No articles found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {news.map((item, index) => {
                            const isLarge = index < 2;

                            return (
                                <article
                                    key={item.id}
                                    className={`group rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#F1DC7F]/30 hover:shadow-[0_0_40px_rgba(241,220,127,0.08)] transition duration-300 ${isLarge ? "md:col-span-1 xl:col-span-1" : ""
                                        }`}
                                >
                                    <Link href={`/news-media/${item.slug}`} className="block">
                                        <div className={`relative w-full ${isLarge ? "h-[320px] md:h-[360px]" : "h-[260px]"}`}>
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/65 border border-white/10 text-[11px] uppercase tracking-[0.18em] text-[#F1DC7F] backdrop-blur-sm">
                                                {item.category}
                                            </div>
                                        </div>

                                        <div className="p-5 md:p-6">


                                            <h3 className={`font-semibold leading-[1.15] group-hover:text-[#F1DC7F] transition ${isLarge ? "text-2xl md:text-3xl" : "text-xl"
                                                }`}>
                                                {item.title}
                                            </h3>

                                            <p className="mt-4 text-white text-sm md:text-base leading-relaxed">
                                                {item.desc}
                                            </p>

                                            <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#F1DC7F]">
                                                Read More
                                                <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}