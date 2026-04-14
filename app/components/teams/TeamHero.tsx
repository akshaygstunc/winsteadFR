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
        const bannerEyebrow = teamData?.data?.bannerEyebrow || "Developer";
        const bannerTitle =
            teamData?.data?.bannerTitle || "Let’s start your next conversation.";
        const bannerSubtitle = teamData?.data?.bannerSubtitle || "";

        const titleParts = bannerTitle.split("\n");
        const firstLine = titleParts[0] || "";
        const secondLine = titleParts[1] || "";

        return (
            <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black text-white">
                {/* IMAGE */}
                <div className="absolute inset-0">
                    {loading ? (
                        <div className="h-full w-full animate-pulse bg-white/10" />
                    ) : (
                        <Image
                            src={bannerImage}
                            alt={bannerEyebrow || "Developer Banner"}
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    )}
                </div>

                {/* OVERLAYS */}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* CONTENT */}
                <div className="relative z-10 flex h-full items-end justify-center">
                    <div className="w-full max-w-7xl px-6 pb-14 md:px-12 md:pb-20">
                        <div className="max-w-2xl text-left">
                            {loading ? (
                                <>
                                    <div className="mb-3 h-3 w-24 animate-pulse rounded bg-white/10" />
                                    <div className="h-8 w-72 animate-pulse rounded bg-white/10 md:h-10 xl:h-14" />
                                    <div className="mt-3 h-8 w-56 animate-pulse rounded bg-white/10 md:h-10 xl:h-14" />
                                    <div className="mt-4 h-4 w-80 animate-pulse rounded bg-white/10" />
                                </>
                            ) : (
                                <>
                                    <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
                                        {bannerEyebrow}
                                    </p>

                                    <h1 className="max-w-[700px] text-2xl font-semibold leading-[1.05] md:text-4xl xl:text-5xl">
                                        {firstLine}
                                        {secondLine ? (
                                            <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                                                {secondLine}
                                            </span>
                                        ) : null}
                                    </h1>

                                    {bannerSubtitle ? (
                                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                                            {bannerSubtitle}
                                        </p>
                                    ) : null}
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