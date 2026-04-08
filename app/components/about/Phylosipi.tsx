import Image from "next/image";
import AutoBreadcrumbs from "../BreadCrumbs";

import hero1 from "../../../public/hero1.jpg";
import hero2 from "../../../public/hero2.png";
import hero3 from "../../../public/hero3.jpg";

const philosophyItems = [
  {
    title: "Clarity Over Noise",
    description:
      "We focus on what truly fits your goals instead of overwhelming you with endless listings.",
    image: hero1,
  },
  {
    title: "Advisory Over Pressure",
    description:
      "Our role is to guide decisions with honesty and context, not push properties for quick closures.",
    image: hero2,
  },
  {
    title: "Value Over Volume",
    description:
      "We prioritize relevance, timing, and long-term value over mass-market selling.",
    image: hero3,
  },
];

export default function AboutPhilosophy() {
  return (
    <section className="py-20 px-6 md:px-10 border-t border-white/10">

      <AutoBreadcrumbs />

      <div className="max-w-7xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
            Our Philosophy
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            What Makes Winstead Different
          </h2>
          <p className="text-white-400 leading-relaxed">
            We do not believe great real estate service is about showing more.
            It is about understanding better, filtering smarter, and guiding with integrity.
          </p>
        </div>

        {/* 🔥 CARDS WITH IMAGES */}
        <div className="grid md:grid-cols-3 gap-6">
          {philosophyItems.map((item, index) => (
            <div
              key={index}
              className="group border border-yellow-500/20 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition duration-300"
            >

              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <div className="text-yellow-400 text-2xl font-semibold mb-3">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-white-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}