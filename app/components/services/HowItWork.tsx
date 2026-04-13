/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

import hero1 from "../../../public/hero1.jpg";
import hero2 from "../../../public/hero2.png";

export default function HowItWorks({ processSteps }: { processSteps: any[] }) {
    return (
        <section className="py-8 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-[85rem] mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
                <div className="relative rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 min-h-[320px] md:min-h-[650px]">
                    <Image
                        src={hero2}
                        alt="How it works"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                <div>
                    <div className="max-w-3xl mb-10">
                        <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            How It Works
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                            A simple process designed to reduce confusion.
                        </h2>
                        <p className="text-white leading-relaxed">
                            Our workflow helps clients move through the real estate journey with
                            better clarity, better filtering, and more confidence.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className="relative rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-yellow-500/30 transition duration-300"
                            >
                                <div className="absolute top-4 right-5 text-5xl font-semibold text-yellow-500/20">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 pr-10 text-white">
                                    {step.title}
                                </h3>
                                <p className="text-white leading-relaxed text-sm lg:text-md lg:text-md md:text-base">
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