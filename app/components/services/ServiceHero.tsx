"use client";

import Image from "next/image";
import serviceImg from "../../../public/services.png";
import { FaArrowRight } from "react-icons/fa";

export default function ServicesHero() {
    return (
        <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black text-white">

            {/* IMAGE */}
            <div className="absolute inset-0">
                <Image
                    src={serviceImg}
                    alt="Winstead Services"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* OVERLAY (only for readability, not full dark) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* CONTENT (BOTTOM LEFT ONLY) */}
            <div className="relative z-10 h-full flex items-end justify-center">
                <div className="w-full max-w-7xl  px-6 md:px-12 pb-14 md:pb-20">

                    <div className="max-w-xl text-left ">

                        <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
                            Our Services
                        </p>

                        <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
                            Luxury real estate
                            <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                                made effortless
                            </span>
                        </h1>

                        <p className="mt-4 max-w-[420px] text-sm md:text-base text-white/70 leading-relaxed">
                            Expert support for buying, investing, and leasing premium properties.
                        </p>

                        <div className="mt-6 flex gap-3 flex-wrap">
                            <button className="px-6 py-3 rounded-full text-sm font-medium text-black bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] hover:scale-[1.03] transition">
                                Explore Services
                            </button>

                            <button className="px-6 py-3 rounded-full text-sm font-medium border border-white/20 hover:border-[#F1DC7F] hover:text-[#F1DC7F] transition">
                                Speak With Expert
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* BOTTOM GOLD LINE */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />

        </section>
    );
}