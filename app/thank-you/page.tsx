"use client";

import Link from "next/link";
import { FaCheckCircle, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

type Office = {
    city: string;
    address: string;
};

const offices: Office[] = [
    {
        city: "Dubai Office",
        address: `2601, Iris Bay, Business Bay,
Dubai, UAE`,
    },
    {
        city: "Abu Dhabi Office",
        address: `Office 1204, Marina Plaza,
Abu Dhabi, UAE`,
    },
    {
        city: "Sharjah Office",
        address: `Suite 804, Al Majaz Tower,
Sharjah, UAE`,
    },
];

export default function ThankYouPage() {
    return (
        <section className="min-h-screen bg-black text-white px-6 md:px-10 py-16 md:py-24">
            <div className="max-w-[85rem] mx-auto">
                {/* Main Thank You Card */}
                <div className="rounded-[32px] border border-yellow-500/20 bg-white/5 backdrop-blur-sm p-8 md:p-12 shadow-[0_0_40px_rgba(250,204,21,0.08)] text-center">
                    <div className="flex justify-center mb-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-400/20">
                            <FaCheckCircle className="text-yellow-400 text-4xl" />
                        </div>
                    </div>

                    <p className="text-sm md:text-base uppercase tracking-[0.28em] text-yellow-400 mb-3">
                        Inquiry Submitted
                    </p>

                    <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
                        Thank you for your interest.
                    </h1>

                    <p className="max-w-2xl mx-auto text-white text-sm md:text-lg leading-relaxed">
                        We’ve received your inquiry successfully. Our team will connect with
                        you shortly with relevant options, next steps, and personalized
                        assistance based on your requirements.
                    </p>

                    <p className="mt-4 text-white text-sm md:text-base">
                        You can also visit our offices here:
                    </p>

                    <div className="mt-12 md:mt-16">
                        <div className="mb-8">
                            <p className="text-sm uppercase tracking-[0.24em] text-yellow-400 mb-3">
                                Our Offices
                            </p>
                            <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
                                Visit us at any of our office locations
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {offices.map((office, index) => (
                                <div
                                    key={index}
                                    className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-yellow-400/30 hover:bg-white/[0.07] transition"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10">
                                            <FaMapMarkerAlt className="text-yellow-400 text-sm" />
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                {office.city}
                                            </h3>
                                            <p className="text-white leading-relaxed whitespace-pre-line text-sm md:text-base">
                                                {office.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Offices Section */}
               
            </div>
        </section>
    );
}