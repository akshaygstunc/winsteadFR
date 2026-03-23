import Image from "next/image";
import { FaBed, FaDollarSign, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";

import img1 from "../../public/image_5.png"; // replace with your images
import img2 from "../../public/image_6.png";
import img3 from "../../public/image_7.png";

export default function Projects() {
  return (
    <div className="bg-black text-white px-6 md:px-12 pt-4 pb-16">

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-12 bg-white/5 border border-white/10 rounded-xl p-3 max-w-7xl">
        {["Property Type", "Residence Type", "Location"].map((item, i) => (
          <select
            key={i}
            className="bg-transparent text-gray-300 px-4 py-2 outline-none text-sm border-r border-white/10 last:border-none"
          >
            <option>{item}</option>
          </select>
        ))}

        <button className="ml-auto px-6 py-2 rounded-xl text-black font-medium bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] hover:opacity-90 transition">
          Search
        </button>
      </div>

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">
        All Projects
      </h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <ProjectCard img={img3} />
        <ProjectCard img={img3} />
        <ProjectCard img={img3} />
        <ProjectCard img={img3} />
        <ProjectCard img={img3} />
        <ProjectCard img={img3} />

      </div>
    </div>
  );
}

/* ================= CARD ================= */

function ProjectCard({ img }: { img: any }) {
  return (
    <div className="relative rounded-2xl overflow-hidden group">

      {/* IMAGE */}
      <div className="relative h-[450px]">
        <Image
          src={img}
          alt="project"
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* TAG */}
      <div className="absolute top-4 left-4 bg-black/70 text-xs px-3 py-1 rounded-full border border-white/20">
        Ultra Luxury
      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 p-5 w-full">

        <h2 className="text-xl font-semibold mb-2">
          Aurelia Heights
        </h2>

        <div className="space-y-1 text-sm text-gray-300">

          <div className="flex items-center gap-2">
            <FaBed className="text-yellow-400 text-xs" />
            2-8
          </div>

          <div className="flex items-center gap-2">
            <FaDollarSign className="text-yellow-400 text-xs" />
            $2.3M – $3.8M
          </div>

          <div className="flex items-center gap-2">
            <FaRulerCombined className="text-yellow-400 text-xs" />
            2,800 – 7,200 sq.ft.
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-400 text-xs" />
            Downtown Dubai, UAE
          </div>
        </div>

        {/* BUTTON */}
        <button className="mt-4 w-full py-3 border border-white/20 rounded-xl text-sm hover:border-yellow-400 hover:text-white transition">
          Check Details
        </button>
      </div>
    </div>
  );
}