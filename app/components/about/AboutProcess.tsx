import Image from "next/image";
import hero1 from "../../../public/hero1.jpg";
import hero2 from "../../../public/hero2.png";
import hero3 from "../../../public/hero3.jpg";
import hero4 from "../../../public/hero4.png";

const steps = [
  {
    title: "Understand Your Goal",
    description:
      "We begin by understanding your lifestyle needs, investment intent, priorities, and timeline.",
    image: hero1,
  },
  {
    title: "Curate the Right Options",
    description:
      "Instead of showing everything, we shortlist the most relevant opportunities for you.",
    image: hero2,
  },
  {
    title: "Guide Evaluation & Visits",
    description:
      "We support your property review with context, insights, and a more informed evaluation process.",
    image: hero3,
  },
  {
    title: "Support Negotiation & Closure",
    description:
      "From discussions to final paperwork, we help make the journey smoother and more transparent.",
    image: hero4,
  },
];

export default function AboutProcess() {
  return (
    <section className="py-20 px-6 md:px-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="max-w-3xl mb-14">
          <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.25em] text-yellow-400 mb-3">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            A Clear Process. A More Confident Decision.
          </h2>
          <p className="text-white-400 leading-relaxed">
            Our process is designed to remove confusion and create a smoother, more guided real estate experience.
          </p>
        </div>

        {/* STEPS WITH IMAGE */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-yellow-500/40 transition duration-300"
            >
              
              {/* IMAGE */}
              <div className="relative h-40">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* CONTENT */}
              <div className="p-6 relative">

                {/* STEP NUMBER */}
                <div className="text-5xl font-semibold text-yellow-500/20 absolute top-2 right-4">
                  {index + 1}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 pr-8">
                  {step.title}
                </h3>

                <p className="text-white-400 leading-relaxed text-sm lg:text-xl lg:text-xl md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}