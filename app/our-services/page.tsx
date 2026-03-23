import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import Testimonials from "../components/Testimonials";
import serviceImg from "../../public/services.png"; // replace with your image
import { IoMdCheckboxOutline } from "react-icons/io";

export default function OurServices() {
  return (
    <div className="bg-black text-white">

      {/* HERO */}
     <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
         Services
        </h1>
      </div>

         <div className="w-full relative">
                <Image
                  src={serviceImg}
                  alt="About Winstead"
                  className="w-full object-cover"
                  priority
                />
        
                {/* PREMIUM OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black"></div>
              </div>

      {/* SERVICES */}
      <section className="px-6 md:px-12 pb-20 space-y-16">

        {/* OFF PLAN */}
        <ServiceBlock
          title="Off-Plan Investments"
          desc="Access upcoming developments in prime locations, selected for long-term value and strategic growth."
          points={[
            "Early access to new developments",
            "Flexible payment structures",
            "Positioned for long-term value",
          ]}
        />

        {/* READY RESIDENCES */}
        <ServiceBlock
          title="Ready Residences"
          desc="Move-in ready homes across established communities and prime urban locations."
          points={[
            "Ready-to-move residences",
            "Established locations",
            "Immediate usability",
          ]}
        />

        {/* LONG TERM LEASING */}
        <ServiceBlock
          title="Long-Term Leasing"
          desc="Secure premium rental properties with stable returns and long-term occupancy benefits."
          points={[
            "Verified long-term tenants",
            "Consistent rental income",
            "Prime leasing locations",
          ]}
        />
      </section>

      <Testimonials />
    </div>
  );
}

/* ================= BLOCK ================= */

function ServiceBlock({
  title,
  desc,
  points,
}: {
  title: string;
  desc: string;
  points: string[];
}) {
  return (
    <div className="space-y-5">

      {/* TITLE + ICON */}
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center">
          <IoMdCheckboxOutline className="text-yellow-400 w-12 h-12" />
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            {title}
          </h2>
          <p className="text-white font-thin text-xs mt-1">
            {desc}
          </p>
        </div>
      </div>

      {/* SUB DESCRIPTION (small line like image) */}
      <p className="text-white text-xs leading-relaxed max-w-3xl">
        Explore off-plan opportunities from leading developers, offering early
        access to new projects before completion. These properties are positioned
        in high-demand areas and structured to support both capital appreciation
        and flexible ownership timelines.
      </p>

      {/* CARDS */}
      <div className="flex flex-wrap gap-4 pt-2">
        {points.map((item, i) => (
          <div
            key={i}
            className="px-6 py-4 border border-white/20 rounded-xl text-md text-[#F1DC7F] hover:border-yellow-400 hover:text-white transition cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}