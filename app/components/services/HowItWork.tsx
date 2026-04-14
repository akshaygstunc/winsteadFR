/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

import hero2 from "../../../public/hero2.png";

type HowItWorksProps = {
    servicesData?: any;
    loading?: boolean;
};

export default function HowItWorks({
    servicesData,
    loading = false,
}: HowItWorksProps) {
    const sectionTitle =
        servicesData?.data?.howItWorksTitle ||
        "A simple process designed to reduce confusion.";

    const sectionSubtitle =
        servicesData?.data?.howItWorksSubtitle ||
        "Our workflow helps clients move through the real estate journey with better clarity, better filtering, and more confidence.";

    const sectionImage =
        servicesData?.data?.howItWorksImage || hero2;

    const processSteps = [
        {
            number: servicesData?.data?.howItWorksStep1Number || "1",
            title:
                servicesData?.data?.howItWorksStep1Title ||
                "Understand Your Requirement",
            desc:
                servicesData?.data?.howItWorksStep1Description ||
                "We begin by understanding your purpose, budget, timeline, and preferred property profile.",
        },
        {
            number: servicesData?.data?.howItWorksStep2Number || "2",
            title:
                servicesData?.data?.howItWorksStep2Title || "Curate Relevant Options",
            desc:
                servicesData?.data?.howItWorksStep2Description ||
                "Instead of showing everything, we shortlist opportunities aligned with your exact goals.",
        },
        {
            number: servicesData?.data?.howItWorksStep3Number || "3",
            title:
                servicesData?.data?.howItWorksStep3Title || "Evaluate with Clarity",
            desc:
                servicesData?.data?.howItWorksStep3Description ||
                "We guide you through comparisons, site visits, and practical evaluation for smarter decisions.",
        },
        {
            number: servicesData?.data?.howItWorksStep4Number || "4",
            title:
                servicesData?.data?.howItWorksStep4Title || "Move Toward Closure",
            desc:
                servicesData?.data?.howItWorksStep4Description ||
                "From discussions to next steps, we help make the journey more structured and transparent.",
        },
    ];

    return (
        <section className="py-8 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-[85rem] mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
                <div className="relative rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 min-h-[320px] md:min-h-[650px]">
                    {loading ? (
                        <div className="h-full w-full bg-white/10 animate-pulse" />
                    ) : (
                        <>
                                <Image
                                    src={sectionImage}
                                    alt="How it works"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        </>
                    )}
                </div>

                <div>
                    <div className="max-w-3xl mb-10">
                        {loading ? (
                            <>
                                <div className="h-4 w-32 rounded bg-white/10 animate-pulse mb-3" />
                                <div className="h-10 w-[85%] rounded bg-white/10 animate-pulse mb-4" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                                    <div className="h-4 w-[80%] rounded bg-white/10 animate-pulse" />
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                                    How It Works
                                </p>
                                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                                        {sectionTitle}
                                    </h2>
                                <p className="text-white leading-relaxed">{sectionSubtitle}</p>
                            </>
                        )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {loading
                            ? Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-2xl border border-white/10 bg-white/5 p-8"
                                >
                                    <div className="absolute top-4 right-5 h-10 w-10 rounded bg-white/10 animate-pulse" />
                                    <div className="space-y-3 pr-10">
                                        <div className="h-6 w-3/4 rounded bg-white/10 animate-pulse" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                                            <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                                            <div className="h-4 w-2/3 rounded bg-white/10 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            ))
                            : processSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-yellow-500/30 transition duration-300"
                                >
                                    <div className="absolute top-4 right-5 text-5xl font-semibold text-yellow-500/20">
                                        {step.number || index + 1}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 pr-10 text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-white leading-relaxed text-sm lg:text-md md:text-base">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}