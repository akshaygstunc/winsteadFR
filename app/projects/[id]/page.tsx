"use client"
import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { FaMapMarkerAlt, FaBed, FaRulerCombined } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import img from "../../../public/image_7.png";
import img2 from "../../../public/image_6.png";
import img3 from "../../../public/image_5.png";
import Link from "next/link";

const gallery = [img, img2, img3, img, img];

const allProjects = [
  {
    id: 1,
    title: "Aurelia Heights",
    type: "Residential",
    residence: "Villa",
    location: "Dubai",
    category: "Luxury",
  },
  {
    id: 2,
    title: "Skyline Tower",
    type: "Residential",
    residence: "Apartment",
    location: "Dubai",
    category: "Elite",
  },
  {
    id: 3,
    title: "Palm Villas",
    type: "Residential",
    residence: "Villa",
    location: "Abu Dhabi",
    category: "Ultra Luxury",
  },
  {
    id: 4,
    title: "Business Bay Offices",
    type: "Commercial",
    residence: "Office",
    location: "Dubai",
    category: "Luxury",
  },
];

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    id: project.id.toString(),
  }));
}

export default function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  const heroRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState("1 Bedroom");
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(img);

  const project = allProjects.find((p) => p.id === Number(params.id));

  if (!project) {
    return <div className="text-white p-10">Project not found</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          <FaArrowLeft />
          Back to Projects
        </Link>
      </div>

      <section className="relative mt-4">
        <div
          ref={heroRef}
          className="relative h-[78vh] min-h-[560px] w-full overflow-hidden rounded-b-[32px]"
        >
          <Image
            src={activeImage}
            alt="project"
            fill
            className="object-cover"
            unoptimized
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />

          <div className="absolute top-8 right-8 hidden md:block rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-1">
              Category
            </p>
            <p className="text-white font-medium">{project.category}</p>
          </div>

          <div className="absolute bottom-6 left-4 right-4 md:bottom-10 md:left-10 md:right-10">
            <div className="max-w-6xl rounded-[28px] border border-white/10 bg-black/35 backdrop-blur-xl p-6 md:p-8 shadow-[0_0_40px_rgba(250,204,21,0.06)]">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                    Signature Residence
                  </p>

                  <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">
                    {project.title}
                  </h1>

                  <div className="flex items-center gap-2 text-base md:text-lg text-gray-200 mb-4">
                    <FaMapMarkerAlt className="text-yellow-400" />
                    Downtown Dubai, UAE
                  </div>

                  <p className="text-gray-300 max-w-3xl leading-relaxed text-sm md:text-base">
                    A refined collection of ultra-luxury residences designed for
                    buyers seeking iconic location, architectural elegance, and
                    long-term value in one of Dubai’s most desirable districts.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Starting Price</span>
                      <span className="text-white font-semibold">$2.3M</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Bedrooms</span>
                      <span className="text-white font-semibold">2–8</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Size Range</span>
                      <span className="text-white font-semibold">2,800 – 7,200 sq.ft.</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Property Type</span>
                      <span className="text-white font-semibold">{project.residence}</span>
                    </div>
                  </div>

                  <button className="mt-6 w-full rounded-2xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black py-4 font-semibold">
                    Schedule Private Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {gallery.map((g, i) => {
            const active = activeImage === g;
            return (
              <button
                key={i}
                onClick={() => setActiveImage(g)}
                className={`relative w-[170px] h-[110px] rounded-2xl overflow-hidden border transition shrink-0 ${active
                    ? "border-yellow-400 shadow-[0_0_20px_rgba(241,220,127,0.18)]"
                    : "border-white/10 hover:border-yellow-500/40"
                  }`}
              >
                <Image src={g} alt="" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-black/20" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}