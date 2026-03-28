import Image from "next/image";
import serviceImg from "../../../public/services.png";
import { FaArrowRight } from "react-icons/fa";

export default function ServicesHero() {
    return (
        <section className="relative overflow-hidden border-b border-white/10 bg-black text-white">
            {/* BACKGROUND ACCENTS */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-[-10%] h-[320px] w-[320px] rounded-full bg-yellow-500/10 blur-3xl" />
                <div className="absolute bottom-[-60px] right-[-5%] h-[260px] w-[260px] rounded-full bg-yellow-400/10 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.08]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-yellow-400 mb-4">
                            Our Services
                        </p>

                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold leading-[1.08] max-w-4xl">
                            Premium real estate services designed around
                            <span className="text-yellow-400"> clarity, value, and confidence.</span>
                        </h1>

                        <p className="text-gray-400 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
                            From off-plan investments to ready residences and long-term leasing,
                            Winstead helps buyers and investors move forward with sharper
                            direction and a more structured decision-making process.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300 inline-flex items-center gap-2">
                                Speak With Our Team
                                <FaArrowRight className="text-sm" />
                            </button>

                            <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition duration-300">
                                Explore Services
                            </button>
                        </div>

                        {/* HIGHLIGHT STRIP */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <p className="text-yellow-400 text-sm mb-1">01</p>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Curated property opportunities
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <p className="text-yellow-400 text-sm mb-1">02</p>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Strategic advisory approach
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <p className="text-yellow-400 text-sm mb-1">03</p>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Premium buying and leasing support
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <div className="relative">
                        <div className="relative rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 shadow-[0_0_40px_rgba(250,204,21,0.08)]">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />

                            <Image
                                src={serviceImg}
                                alt="Winstead Services"
                                className="w-full h-[420px] md:h-[520px] object-cover"
                                priority
                            />

                            {/* FLOATING CARD */}
                            <div className="absolute z-20 bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md p-5">
                                <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-2">
                                    Winstead Approach
                                </p>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Less noise. Better opportunities.
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    We focus on filtering the right options instead of overwhelming
                                    you with unnecessary listings.
                                </p>
                            </div>
                        </div>

                        {/* SMALL FLOATING STAT */}
                        <div className="hidden md:block absolute -left-8 top-10 rounded-2xl border border-yellow-500/20 bg-black/80 backdrop-blur-md px-5 py-4 shadow-[0_0_30px_rgba(250,204,21,0.08)]">
                            <p className="text-yellow-400 text-xs uppercase tracking-[0.2em] mb-1">
                                Focus
                            </p>
                            <p className="text-white text-lg font-semibold">Luxury • Investment • Leasing</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}