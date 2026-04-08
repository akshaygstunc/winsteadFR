import { IoMdCheckboxOutline } from "react-icons/io";
import Image from "next/image";

import hero3 from "../../../public/hero3.jpg";

export default function WhyChooseWinstead({
  trustPoints,
}: {
  trustPoints: string[];
}) {
  return (
    <section className="py-20 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
        <div className="relative rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 min-h-[320px] md:min-h-[620px]">
          <Image
            src={hero3}
            alt="Why choose Winstead"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        <div>
          <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
            Why Choose Winstead
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            More than listings. A more considered approach.
          </h2>
          <p className="text-white leading-relaxed max-w-xl mb-8">
            We focus on relevance, trust, and thoughtful guidance rather than
            overwhelming clients with volume. That difference shapes the entire experience.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-3">
                  <IoMdCheckboxOutline className="text-yellow-400 w-6 h-6 mt-1 shrink-0" />
                  <p className="text-white leading-relaxed">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}