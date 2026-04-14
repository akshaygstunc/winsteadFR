"use client";

import Image from "next/image";
import bannerFallback from "../../../public/hero1.jpg";

type TeamHeroProps = {
    teamData?: any;
    loading?: boolean;
};

export default function TeamHero({
    teamData,
    loading = false,
}: TeamHeroProps) {
    const bannerImage = teamData?.data?.bannerImage || bannerFallback;
    const bannerEyebrow = teamData?.data?.bannerEyebrow || "Our Team";
    const bannerTitle =
        teamData?.data?.bannerTitle || "Let’s start your next conversation.";

    const titleParts = bannerTitle.split("\n");
    const firstLine = titleParts[0] || "";
    const secondLine = titleParts[1] || "";

    return (
        <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black text-white">
            {/* IMAGE */}
            <div className="absolute inset-0">
                {loading ? (
                    <div className="h-full w-full bg-white/10 animate-pulse" />
                ) : (
                        <Image
                            src={bannerImage}
                            alt={bannerEyebrow || "Team Banner"}
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
                                <div className="mb-3 h-3 w-24 rounded bg-white/10 animate-pulse" />
                                <div className="h-8 w-72 rounded bg-white/10 animate-pulse md:h-10 xl:h-14" />
                                <div className="mt-3 h-8 w-56 rounded bg-white/10 animate-pulse md:h-10 xl:h-14" />
                            </>
                        ) : (
                            <>
                                <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
                                        {bannerEyebrow}
                                </p>

                                <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
                                        {firstLine}
                                        {secondLine ? (
                                            <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                                                {secondLine}
                                            </span>
                                        ) : (
                                            <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                                                conversation.
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