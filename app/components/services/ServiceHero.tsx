"use client";

import Image from "next/image";
import serviceImg from "../../../public/hero1.jpg";

export default function ServicesHero({ servicesData, loading = false }) {
    const heroImage =
        servicesData?.data?.heroImage || serviceImg;

    const heroTitle =
        servicesData?.heroTitle ||
        servicesData?.data?.heroTitle ||
        "Our Services";

    const heroSubtitle =
        servicesData?.heroSubtitle ||
        servicesData?.data?.heroSubtitle ||
        "Luxury real estate\nmade effortless";

    const subtitleLines = heroSubtitle.split("\n");

    return (
        <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black text-white">

            {/* IMAGE */}
            <div className="absolute inset-0">
                {loading ? (
                    <div className="relative h-full w-full overflow-hidden bg-neutral-800">
                        <div className="absolute inset-0 shimmer" />
                    </div>
                ) : (
                    <Image
                        src={heroImage}
                        alt={heroTitle || "Winstead Services"}
                        fill
                        priority
                        className="object-cover object-center"
                    />
                )}
            </div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* CONTENT */}
            <div className="relative z-10 h-full flex items-end justify-center">
                <div className="w-full max-w-7xl px-6 md:px-12 pb-14 md:pb-20">
                    <div className="max-w-xl text-left">

                        {loading ? (
                            <>
                                <div className="mb-3 h-3 w-28 bg-neutral-700 rounded overflow-hidden relative">
                                    <div className="shimmer absolute inset-0" />
                                </div>

                                <div className="h-8 w-56 md:h-10 md:w-72 xl:h-14 xl:w-96 bg-neutral-700 rounded overflow-hidden relative">
                                    <div className="shimmer absolute inset-0" />
                                </div>

                                <div className="mt-3 h-8 w-44 md:h-10 md:w-60 xl:h-14 xl:w-80 bg-neutral-700 rounded overflow-hidden relative">
                                    <div className="shimmer absolute inset-0" />
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
                                    {heroTitle}
                                </p>

                                <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
                                    {subtitleLines[0]}
                                    {subtitleLines[1] && (
                                        <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                                            {subtitleLines[1]}
                                        </span>
                                    )}
                                </h1>
                            </>
                        )}

                    </div>
                </div>
            </div>

            {/* BOTTOM GOLD LINE */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />
        </section>
    );
}