/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

import hero1 from "../../../public/hero1.jpg";
import hero2 from "../../../public/hero2.png";
import hero3 from "../../../public/hero3.jpg";

export default function ServicesOverview({ services }: { services: any[] }) {
  const serviceImages = [hero1, hero2, hero3];

  return (
    <section className="py-20 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
            Services Overview
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-5 leading-tight">
            Focused services for different real estate goals.
          </h2>
          <p className="text-white leading-relaxed text-sm lg:text-md lg:text-md md:text-base">
            Whether your priority is investment growth, immediate ownership, or
            long-term leasing, our services are designed to match specific
            property goals with greater precision.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service: any, index: number) => (
            <div
              key={index}
              className="group rounded-[28px] overflow-hidden border border-yellow-500/20 bg-white/[0.04] hover:bg-white/[0.07] transition duration-300 hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={serviceImages[index % serviceImages.length]}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 w-11 h-11 rounded-full border border-yellow-400/40 bg-black/40 backdrop-blur-sm flex items-center justify-center text-yellow-400 text-sm lg:text-md lg:text-md font-semibold">
                  0{index + 1}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 md:p-7">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-white leading-7 text-sm lg:text-md lg:text-md md:text-base">
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