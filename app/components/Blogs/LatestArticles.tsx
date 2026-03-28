import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import img from "../../../public/image_7.png";
export default function LatestArticles({ news }: { news: { id: number; title: string; desc: string; date: string; category: string }[] }) {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
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
                    {news.map((item) => (
                        <article
                            key={item.id}
                            className="group rounded-[24px] overflow-hidden border border-white/10 bg-white/5 hover:border-yellow-500/30 transition duration-300"
                        >
                            <div className="relative h-[260px] overflow-hidden">
                                <Image
                                    src={img}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[11px] uppercase tracking-[0.15em] text-yellow-400 backdrop-blur-sm">
                                    {item.category}
                                </div>
                            </div>

                            <div className="p-5 space-y-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                                    {item.date}
                                </p>

                                <h3 className="text-xl font-semibold leading-snug group-hover:text-yellow-300 transition">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {item.desc}
                                </p>

                                <button className="inline-flex items-center gap-2 text-sm text-yellow-400 font-medium hover:text-white transition">
                                    Read More <FaArrowRight className="text-xs" />
                                </button>
                            </div>
                            
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}