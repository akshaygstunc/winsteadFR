/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

import hero1 from "../../../public/hero1.jpg";
import hero2 from "../../../public/hero2.png";
import hero3 from "../../../public/hero3.jpg";

type ServicesOverviewProps = {
  servicesData?: any;
  loading?: boolean;
};

export default function ServicesOverview({
  servicesData,
  loading = false,
}: ServicesOverviewProps) {
  const fallbackImages = [hero1, hero2, hero3];

  const sectionTitle =
    servicesData?.data?.servicesOverviewTitle ||
    "Focused services for different real estate goals.";

  const sectionSubtitle =
    servicesData?.data?.servicesOverviewSubtitle ||
    "Whether your priority is investment growth, immediate ownership, or long-term leasing, our services are designed to match specific property goals with greater precision.";

  const services = [
    {
      number: servicesData?.data?.overviewService1Number || "1",
      title: servicesData?.data?.overviewService1Title || "Off-Plan Investments",
      desc:
        servicesData?.data?.overviewService1Description ||
        "Access upcoming developments in prime locations, selected for long-term value and strategic growth.",
      image: servicesData?.data?.overviewService1Image || fallbackImages[0],
    },
    {
      number: servicesData?.data?.overviewService2Number || "2",
      title: servicesData?.data?.overviewService2Title || "Ready Residences",
      desc:
        servicesData?.data?.overviewService2Description ||
        "Move-in ready homes across established communities and prime urban locations.",
      image: servicesData?.data?.overviewService2Image || fallbackImages[1],
    },
    {
      number: servicesData?.data?.overviewService3Number || "3",
      title: servicesData?.data?.overviewService3Title || "Long-Term Leasing",
      desc:
        servicesData?.data?.overviewService3Description ||
        "Secure premium rental properties with stable returns and long-term occupancy benefits.",
      image: servicesData?.data?.overviewService3Image || fallbackImages[2],
    },
  ];

  return (
    <section className="py-8 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-[85rem] mx-auto">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          {loading ? (
            <div className="space-y-4 flex flex-col items-center">
              <div className="h-4 w-36 rounded bg-white/10 animate-pulse" />
              <div className="space-y-3 w-full flex flex-col items-center">
                <div className="h-8 md:h-10 w-[80%] rounded bg-white/10 animate-pulse" />
                <div className="h-8 md:h-10 w-[65%] rounded bg-white/10 animate-pulse" />
              </div>
              <div className="space-y-2 w-full flex flex-col items-center pt-1">
                <div className="h-4 w-[85%] rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-[70%] rounded bg-white/10 animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                Services Overview
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-5 leading-tight">
                {sectionTitle}
              </h2>
              <p className="text-white leading-relaxed text-sm lg:text-md md:text-base">
                {sectionSubtitle}
              </p>
            </>
          )}
        </div>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
              <article
                key={index}
                className="rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/[0.04]"
              >
                <div className="relative h-56 overflow-hidden bg-white/10 animate-pulse">
                  <div className="absolute top-4 left-4 h-11 w-11 rounded-full border border-white/10 bg-white/10" />
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 w-3/4 rounded bg-white/10 animate-pulse" />
                    <div className="h-6 w-2/3 rounded bg-white/10 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-2/3 rounded bg-white/10 animate-pulse" />
                  </div>
                </div>
              </article>
            ))
            : services.map((service, index) => (
              <div
                key={index}
                className="group rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/[0.04] hover:bg-white/[0.07] transition duration-300 hover:-translate-y-1"
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute top-4 left-4 w-11 h-11 rounded-full border border-yellow-400/40 bg-black/40 backdrop-blur-sm flex items-center justify-center text-yellow-400 text-sm lg:text-md font-semibold">
                    {String(service.number).padStart(2, "0")}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 md:p-7 h-full">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-white leading-7 text-sm lg:text-md md:text-base">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}