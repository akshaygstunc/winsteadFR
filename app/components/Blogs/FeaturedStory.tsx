/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import img from "../../../public/image_7.png";
export default function FeaturedStory() {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 max-w-3xl">
                    <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        Featured Story
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                        The defining trends shaping luxury real estate in 2026.
                    </h2>
                </div>

                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                    <div className="relative h-[360px] md:h-[520px] rounded-[28px] overflow-hidden border border-yellow-500/20 shadow-[0_0_40px_rgba(250,204,21,0.08)]">
                        <Image src={img} alt="Featured Story" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-black/70 border border-white/10 text-xs uppercase tracking-[0.18em] text-yellow-400 backdrop-blur-sm">
                            Featured Insight
                        </div>
                    </div>

                    <div className="space-y-5">
                        <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.22em] text-white-400">
                            March 2026
                        </p>

                        <h3 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
                            Dubai’s luxury property market continues to set new benchmarks.
                        </h3>

                        <p className="text-white-400 leading-relaxed text-base md:text-lg">
                            High-net-worth investors are continuing to reshape demand across
                            the premium property segment, with design-led developments,
                            waterfront locations, and branded residences remaining at the
                            center of attention.
                        </p>

                        <p className="text-white-400 leading-relaxed text-base md:text-lg">
                            As capital becomes more selective, curated real estate strategies
                            are proving more valuable than broad market exposure.
                        </p>

                        <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:scale-105 transition duration-300">
                            Read Full Story <FaArrowRight className="text-sm lg:text-xl lg:text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}