import Image from "next/image";

type ContactHeroProps = {
    contactData?: any;
    loading?: boolean;
};

export default function ContactHero({
    contactData,
    loading = false,
}: ContactHeroProps) {
    const bannerTitle = contactData?.data?.bannerTitle || "Contact Us";
    const bannerSubtitle =
        contactData?.data?.bannerSubtitle || "Let’s start your next\nconversation.";
    const bannerImage =
        contactData?.data?.bannerImage ||
        "https://uqmdvshcqbuzetgffwjd.supabase.co/storage/v1/object/public/winstead/projects/gallery/1776154954306-hero1.jpg";

    const subtitleLines = bannerSubtitle.split("\n");

    return (
        <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black text-white">
            <div className="absolute inset-0">
                {loading ? (
                    <div className="h-full w-full animate-pulse bg-white/10" />
                ) : (
                        <Image
                            src={bannerImage}
                            alt={bannerTitle}
                            fill
                            priority
                            className="object-cover object-center"
                        />
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            <div className="relative z-10 flex h-full items-end justify-center">
                <div className="w-full max-w-7xl px-6 pb-14 md:px-12 md:pb-20">
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
                                        {bannerTitle}
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

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />
        </section>
    );
}