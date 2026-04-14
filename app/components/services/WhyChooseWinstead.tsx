import { IoMdCheckboxOutline } from "react-icons/io";
import Image from "next/image";

import hero3 from "../../../public/hero3.jpg";

type WhyChooseWinsteadProps = {
  servicesData?: any;
  loading?: boolean;
};

export default function WhyChooseWinstead({
  servicesData,
  loading = false,
}: WhyChooseWinsteadProps) {
  const sectionTitle =
    servicesData?.data?.whyChooseWinsteadTitle ||
    "More than listings. A more considered approach.";

  const sectionSubtitle =
    servicesData?.data?.whyChooseWinsteadSubtitle ||
    "We focus on relevance, trust, and thoughtful guidance rather than overwhelming clients with volume. That difference shapes the entire experience.";

  const sectionImage =
    servicesData?.data?.whyChooseWinsteadImage || hero3;

  const trustPoints = [
    servicesData?.data?.whyChooseWinsteadPoint1 ||
    "Curated opportunities instead of random listings",
    servicesData?.data?.whyChooseWinsteadPoint2 ||
    "Guidance backed by market understanding",
    servicesData?.data?.whyChooseWinsteadPoint3 ||
    "Transparent and client-first communication",
    servicesData?.data?.whyChooseWinsteadPoint4 ||
    "Focus on long-term value, not rushed selling",
  ].filter(Boolean);

  return (
    <section className="py-8 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-[85rem] mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
        <div className="relative rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 min-h-[320px] md:min-h-[457px]">
          {loading ? (
            <div className="h-full w-full bg-white/10 animate-pulse" />
          ) : (
            <>
                <Image
                  src={sectionImage}
                  alt="Why choose Winstead"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </>
          )}
        </div>

        <div>
          {loading ? (
            <>
              <div className="h-4 w-40 rounded bg-white/10 animate-pulse mb-3" />
              <div className="h-10 w-[80%] rounded bg-white/10 animate-pulse mb-4" />
              <div className="space-y-2 max-w-xl mb-8">
                <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-[85%] rounded bg-white/10 animate-pulse" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 mt-1 rounded bg-white/10 animate-pulse shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                        <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                Why Choose Winstead
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                  {sectionTitle}
                </h2>
                <p className="text-white leading-relaxed max-w-xl mb-8">
                  {sectionSubtitle}
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}