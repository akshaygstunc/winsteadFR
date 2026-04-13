/* eslint-disable @typescript-eslint/no-explicit-any */
import ServiceBlock from "./ServiceBlock";
import Image from "next/image";

import hero1 from "../../../public/hero1.jpg";
import hero2 from "../../../public/hero2.png";
import hero3 from "../../../public/hero3.jpg";

export default function DetailedServices({ services }: { services: any[] }) {
  const bgImages = [hero1, hero2, hero3];

  return (
    <section className="relative py-8 px-6 md:px-12 border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <Image src={hero1} alt="bg" fill className="object-cover" />
      </div>

      <div className="relative max-w-[85rem] mx-auto space-y-5">
        <div className="max-w-3xl">
          <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
            Detailed Services
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            A closer look at what we offer.
          </h2>
          <p className="text-white leading-relaxed">
            Each service is designed to solve a different property need while
            keeping the experience structured, transparent, and client-focused.
          </p>
        </div>

        {services.map((service, index) => {
          const image = bgImages[index % bgImages.length];
          const isReverse = index % 2 !== 0;

          return (
            <div
              key={index}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className={`${isReverse ? "lg:order-2" : "lg:order-1"}`}>
                <div className=" relative rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/5 min-h-[320px] md:min-h-[520px]">
                  <Image
                    src={image}
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