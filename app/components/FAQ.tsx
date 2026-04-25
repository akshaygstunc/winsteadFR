"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const faqData = [
    {
        question: "What types of properties do you offer?",
        answer:
            "We offer a curated portfolio of premium apartments, villas, townhouses, waterfront residences, and investment-led real estate opportunities across prime locations.",
    },
    {
        question: "Can I schedule a private property viewing?",
        answer:
            "Yes, absolutely. You can schedule a private viewing with our team, and we will arrange a personalized visit based on your preferred date, time, and shortlisted property.",
    },
    {
        question: "Do you assist with mortgage and payment plan guidance?",
        answer:
            "Yes. We help buyers understand mortgage estimates, developer payment plans, financing structures, and the most suitable purchase route based on their requirements.",
    },
    {
        question: "Are these properties suitable for investment purposes?",
        answer:
            "Many of our listed properties are selected with strong investment potential in mind, including rental demand, future appreciation, premium location advantage, and developer credibility.",
    },
    {
        question: "Can international buyers purchase property?",
        answer:
            "Yes, eligible international buyers can purchase property in designated zones. Our team also assists with the process, required documents, and general purchase guidance.",
    },
];

export default function LuxuryFAQ({ faq }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        !faq || faq.length === 0 ? (
            <div className="text-center py-10 text-white">
                No FAQs available
            </div>
        ) : (<section className="relative max-w-[85rem] mx-auto px-4 md:px-10 mb-2 py-1 md:py-1 overflow-hidden">
            {/* background glow */}
            <div className="absolute top-10 left-[10%] h-52 w-52 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
                {/* heading block */}

                {/* faq grid */}
                <div className="grid gap-5">
                    {faq?.map((fa, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-[28px] border transition-all duration-300 ${isOpen
                                    ? "border-yellow-400/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-[0_20px_60px_rgba(241,220,127,0.08)]"
                                    : "border-white/10 bg-white/[0.03] hover:border-yellow-400/20"
                                    }`}
                            >
                                {/* top highlight line */}
                                <div
                                    className={`absolute top-0 left-0 h-[2px] w-full bg-[linear-gradient(90deg,#7C5700,#F1DC7F,#B9A650)] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                                        }`}
                                />

                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-6 md:px-8 py-2 md:py-3 flex items-start justify-between gap-6"
                                >
                                    <div className="flex items-start gap-4 md:gap-5">
                                        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
                                            <span className="text-sm font-semibold">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-lg md:text-xl font-semibold text-white leading-snug">
                                                {fa.question}
                                            </h3>
                                        </div>
                                    </div>

                                    <div
                                        className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
                                            ? "border-yellow-400/30 bg-yellow-400 text-black"
                                            : "border-white/10 bg-white/[0.03] text-white"
                                            }`}
                                    >
                                        {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
                                    </div>
                                </button>

                                <div
                                    className={`grid transition-all duration-500 ease-in-out ${isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 md:px-8 pb-6 md:pb-8">
                                            <div className="ml-14 md:ml-[60px] border-l border-yellow-400/15 pl-5 md:pl-6">
                                                <p className="text-white text-sm md:text-base leading-relaxed">
                                                    {fa.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>)
    );
}