/* eslint-disable @typescript-eslint/no-explicit-any */
import ServiceBlock from "./ServiceBlock";
import Image from "next/image";

import hero1 from "../../../public/hero1.jpg";
import hero2 from "../../../public/hero2.png";
import hero3 from "../../../public/hero3.jpg";

type DetailedServicesProps = {
  servicesData?: any;
  loading?: boolean;
};

export default function DetailedServices({
  servicesData,
  loading = false,
}: DetailedServicesProps) {
  const fallbackImages = [hero1, hero2, hero3];

  const sectionTitle =
    servicesData?.data?.detailedServicesTitle ||
    "A closer look at what we offer.";

  const sectionSubtitle =
    servicesData?.data?.detailedServicesSubtitle ||
    "Each service is designed to solve a different property need while keeping the experience structured, transparent, and client-focused.";

  const services = [
    {
      title:
        servicesData?.data?.detailedService1Title || "Off-Plan Investments",
      desc:
        servicesData?.data?.detailedService1ShortDescription ||
        "Access upcoming developments in prime locations, selected for long-term value and strategic growth.",
      longDesc:
        servicesData?.data?.detailedService1Description ||
        "Explore off-plan opportunities from leading developers, offering early access to new projects before completion. These properties are positioned in high-demand areas and structured to support both capital appreciation and flexible ownership timelines.",
      points: [
        servicesData?.data?.detailedService1Point1 ||
        "Early access to new developments",
        servicesData?.data?.detailedService1Point2 ||
        "Flexible payment structures",
        servicesData?.data?.detailedService1Point3 ||
        "Positioned for long-term value",
      ],
      image: servicesData?.data?.detailedService1Image || fallbackImages[0],
    },
    {
      title:
        servicesData?.data?.detailedService2Title || "Ready Residences",
      desc:
        servicesData?.data?.detailedService2ShortDescription ||
        "Move-in ready homes across established communities and prime urban locations.",
      longDesc:
        servicesData?.data?.detailedService2Description ||
        "Discover completed residences designed for buyers who value immediate usability, premium locations, and a smoother purchase journey. These homes are suited for end-users as well as investors seeking quicker occupancy or rental readiness.",
      points: [
        servicesData?.data?.detailedService2Point1 ||
        "Ready-to-move residences",
        servicesData?.data?.detailedService2Point2 || "Established locations",
        servicesData?.data?.detailedService2Point3 || "Immediate usability",
      ],
      image: servicesData?.data?.detailedService2Image || fallbackImages[1],
    },
    {
      title:
        servicesData?.data?.detailedService3Title || "Long-Term Leasing",
      desc:
        servicesData?.data?.detailedService3ShortDescription ||
        "Secure premium rental properties with stable returns and long-term occupancy benefits.",
      longDesc:
        servicesData?.data?.detailedService3Description ||
        "We help clients identify leasing opportunities that combine location quality, tenant stability, and consistent rental potential. Our focus is on long-term value rather than short-term transaction volume.",
      points: [
        servicesData?.data?.detailedService3Point1 ||
        "Verified long-term tenants",
        servicesData?.data?.detailedService3Point2 ||
        "Consistent rental income",
        servicesData?.data?.detailedService3Point3 || "Prime leasing locations",
      ],
      image: servicesData?.data?.detailedService3Image || fallbackImages[2],
    },
  ];

  return (
    <section className="relative py-8 px-6 md:px-12 border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <Image src={hero1} alt="bg" fill className="object-cover" />
      </div>

      <div className="relative max-w-[85rem] mx-auto space-y-5">
        <div className="max-w-3xl">
          {loading ? (
            <>
              <div className="h-4 w-40 rounded bg-white/10 animate-pulse mb-3" />
              <div className="h-10 w-[70%] rounded bg-white/10 animate-pulse mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-[85%] rounded bg-white/10 animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <p className="text-sm lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                Detailed Services
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                {sectionTitle}
              </h2>
              <p className="text-white leading-relaxed">{sectionSubtitle}</p>
            </>
          )}
        </div>

        {loading
          ? Array.from({ length: 3 }).map((_, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                <div className={`${isReverse ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 min-h-[320px] md:min-h-[520px] animate-pulse" />
                </div>

                <div className={`${isReverse ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 rounded bg-white/10 animate-pulse" />
                    <div className="h-5 w-full rounded bg-white/10 animate-pulse" />
                    <div className="h-5 w-[90%] rounded bg-white/10 animate-pulse" />
                    <div className="h-5 w-[95%] rounded bg-white/10 animate-pulse" />
                    <div className="pt-2 space-y-3">
                      <div className="h-4 w-2/3 rounded bg-white/10 animate-pulse" />
                      <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse" />
                      <div className="h-4 w-3/5 rounded bg-white/10 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          : services.map((service, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                <div className={`${isReverse ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 min-h-[320px] md:min-h-[520px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover h-65"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  </div>
                </div>

                <div className={`${isReverse ? "lg:order-1" : "lg:order-2"}`}>
                  <ServiceBlock
                    title={service.title}
                    desc={service.desc}
                    longDesc={service.longDesc}
                    points={service.points}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}