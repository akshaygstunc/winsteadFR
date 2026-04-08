"use client";

import Image from "next/image";
import heroImg from "../../../public/hero5.png";
import { FaArrowRight, FaCircleNotch } from "react-icons/fa";
import { useState } from "react";

export default function TeamHero({ teamPerson }: { teamPerson: string }) {
    const [videoLoaded, setVideoLoaded] = useState(false);
    return (
        <section className="relative h-[78vh] min-h-[620px] overflow-hidden border-b border-white/10 bg-black text-white">
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0">
                {!videoLoaded && (
                // <div

                    //   className="hero-img object-cover object-top z-0 flex justify-center items-center"
                    // >

                    // </div>
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                        <div className="flex flex-col items-center gap-4">

                            {/* LOADER */}
                            <FaCircleNotch className="animate-spin text-yellow-400 text-3xl" />

                            {/* OPTIONAL TEXT */}
                            <p className="text-sm lg:text-md lg:text-md text-white-400 tracking-wide">
                                Loading experience...
                            </p>
                        </div>
                    </div>
                )}

                {/* VIDEO */}
                <video
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    src="/videoabout.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 h-full flex items-end">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
                    <div className="max-w-[620px]">
                        <p className="text-[11px] md:text-sm lg:text-md lg:text-md uppercase tracking-[0.28em] text-yellow-400 mb-4">
                            Meet The Advisor
                        </p>

                        <h4 className="mt-3 text-lg md:text-4xl text-white font-medium">
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