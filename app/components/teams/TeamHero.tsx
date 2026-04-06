"use client";

import Image from "next/image";
import heroImg from "../../../public/hero5.png";
import { FaArrowRight } from "react-icons/fa";

export default function TeamHero({ teamPerson }: { teamPerson: string }) {
    return (
        <section className="relative h-[78vh] min-h-[620px] overflow-hidden border-b border-white/10 bg-black text-white">
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0">
                <Image
                    src={heroImg}
                    alt={"Winstead global Team page"}
                    fill
                    priority
                    className="object-cover object-center"
                />

                {/* OVERLAYS */}
                {/* <div className="absolute inset-0 bg-black/50" /> */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" /> */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

                {/* SOFT GLOW */}
                <div className="absolute top-0 left-[-8%] h-[320px] w-[320px] rounded-full bg-yellow-500/10 blur-3xl" />
                <div className="absolute bottom-[-80px] right-[-5%] h-[280px] w-[280px] rounded-full bg-yellow-400/10 blur-3xl" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 h-full flex items-end">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
                    <div className="max-w-[620px]">
                        <p className="text-[11px] md:text-sm uppercase tracking-[0.28em] text-yellow-400 mb-4">
                            Meet The Advisor
                        </p>

                        <h4 className="mt-3 text-lg md:text-4xl text-white/90 font-medium">
                            Luxury Property  <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                                Advisor.
                            </span>
                        </h4>



                    </div>
                </div>
            </div>

            {/* BOTTOM LINE */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />
        </section>
    );
}