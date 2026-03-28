/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import img from "../../public/image_7.png";
import { FaBed, FaDollarSign, FaRulerCombined } from "react-icons/fa6";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import ProjectsHero from "../components/projects/ProjectsHero";

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

export default function Page() {
  return (
    <Suspense fallback={<div className="bg-black text-white min-h-screen p-8">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    residence: "",
    location: "",
    category: "",
  });

  useEffect(() => {
    setFilters({
      type: searchParams.get("type") || "",
      residence: searchParams.get("residence") || "",
      location: searchParams.get("location") || "",
      category: "",
    });
  }, [searchParams]);

  const filteredProjects = allProjects.filter((p) => {
    return (
      (!filters.type || p.type === filters.type) &&
      (!filters.residence || p.residence === filters.residence) &&
      (!filters.location || p.location === filters.location) &&
      (!filters.category || p.category === filters.category)
    );
  });

  const handleSearch = (e: any) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const params = new URLSearchParams();

    if (form.get("type")) params.set("type", form.get("type") as string);
    if (form.get("residence")) params.set("residence", form.get("residence") as string);
    if (form.get("location")) params.set("location", form.get("location") as string);

    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <ProjectsHero />
      <ProjectsToolbar
        filters={filters}
        handleSearch={handleSearch}
        setShowFilter={setShowFilter}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-12 pb-20">
        <ResultsBar count={filteredProjects.length} filters={filters} />

        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="hidden md:block">
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>

          {showFilter && (
            <div className="fixed inset-0 z-50 flex">
              <div className="flex-1 bg-black/70" onClick={() => setShowFilter(false)} />
              <div className="w-[85%] max-w-[340px] bg-[#0c0c0c] p-4 overflow-y-auto border-l border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setShowFilter(false)}>✕</button>
                </div>
                <Sidebar filters={filters} setFilters={setFilters} />
              </div>
            </div>
          )}

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => <ProjectCard key={p.id} data={p} />)
            ) : (
              <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                <h3 className="text-2xl font-semibold mb-3">No matching properties found</h3>
                <p className="text-gray-400">
                  Try adjusting your filters to explore more curated opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProjectsCTA />
    </div>
  );
}



/* ================= TOOLBAR ================= */

function ProjectsToolbar({ filters, handleSearch, setShowFilter }: any) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8">
      <form
        onSubmit={handleSearch}
        className="rounded-[28px] border border-yellow-500/20 bg-white/5 backdrop-blur-md p-3 md:p-4 shadow-[0_0_30px_rgba(250,204,21,0.06)]"
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex flex-col md:flex-row flex-1 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
            <select
              name="type"
              defaultValue={filters.type}
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="">Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>

            <select
              name="residence"
              defaultValue={filters.residence}
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="">Residence Type</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Office">Office</option>
            </select>

            <select
              name="location"
              defaultValue={filters.location}
              className="px-5 py-4 bg-transparent outline-none"
            >
              <option value="">Location</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowFilter(true)}
              className="md:hidden px-5 py-4 rounded-2xl bg-white/10 border border-white/10"
            >
              Filters
            </button>

            <button
              type="submit"
              className="px-7 py-4 rounded-2xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black font-semibold hover:scale-[1.02] transition"
            >
              Search Properties
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ================= RESULTS BAR ================= */

function ResultsBar({ count, filters }: any) {
  const active = [filters.type, filters.residence, filters.location, filters.category].filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <p className="text-white text-lg font-medium">
          Showing <span className="text-yellow-400">{count}</span> curated properties
        </p>
        {active.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {active.map((item: string) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <button className="border border-white/10 text-gray-300 px-5 py-3 rounded-full hover:border-yellow-500 hover:text-white transition w-fit">
        Sort by Featured
      </button>
    </div>
  );
}

/* ================= SIDEBAR ================= */

function Sidebar({ filters, setFilters }: any) {
  const [size, setSize] = useState([4000, 6000]);
  const [price, setPrice] = useState([10000, 40000]);
  const [open, setOpen] = useState({
    developer: true,
    amenities: true,
  });

  return (
    <div className="w-[300px] rounded-[28px] border border-yellow-500/20 bg-gradient-to-b from-[#0c0c0c] to-[#111] p-6 shadow-[0_0_30px_rgba(250,204,21,0.05)]">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      <Section title="Category">
        <Check label="Elite" filters={filters} setFilters={setFilters} />
        <Check label="Luxury" filters={filters} setFilters={setFilters} />
        <Check label="Ultra Luxury" filters={filters} setFilters={setFilters} />
      </Section>

      <div className="mb-7">
        <p className="text-sm uppercase tracking-[0.14em] text-gray-400 mb-3">Size</p>
        <div className="flex justify-between text-xs mb-3 text-gray-300">
          <span>{size[0].toLocaleString()} sq. ft.</span>
          <span>{size[1].toLocaleString()} sq. ft.</span>
        </div>
        <Slider
          range
          min={1000}
          max={10000}
          value={size}
          onChange={(val: any) => setSize(val)}
          trackStyle={[{ backgroundColor: "#d4a373" }]}
          handleStyle={[
            { borderColor: "#d4a373", backgroundColor: "#d4a373" },
            { borderColor: "#d4a373", backgroundColor: "#d4a373" },
          ]}
        />
      </div>

      <div className="mb-7">
        <p className="text-sm uppercase tracking-[0.14em] text-gray-400 mb-3">Price Range</p>
        <div className="flex justify-between text-xs mb-3 text-gray-300">
          <span>{price[0].toLocaleString()} AED</span>
          <span>{price[1].toLocaleString()} AED</span>
        </div>
        <Slider
          range
          min={1000}
          max={100000}
          value={price}
          onChange={(val: any) => setPrice(val)}
          trackStyle={[{ backgroundColor: "#d4a373" }]}
          handleStyle={[
            { borderColor: "#d4a373", backgroundColor: "#d4a373" },
            { borderColor: "#d4a373", backgroundColor: "#d4a373" },
          ]}
        />
      </div>

      <Collapsible
        title="Developer"
        open={open.developer}
        toggle={() => setOpen((prev) => ({ ...prev, developer: !prev.developer }))}
      >
        {["DAMAC", "Emaar", "Meraas", "XYZ Properties"].map((d) => (
          <Check key={d} label={d} />
        ))}
      </Collapsible>

      <Collapsible
        title="Amenities"
        open={open.amenities}
        toggle={() => setOpen((prev) => ({ ...prev, amenities: !prev.amenities }))}
      >
        {["Swimming Pool", "Lounge", "Play Area", "Park", "Cinema"].map((a) => (
          <Check key={a} label={a} />
        ))}
      </Collapsible>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="mb-7">
      <p className="text-sm uppercase tracking-[0.14em] text-gray-400 mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({ label, filters, setFilters }: any) {
  return (
    <label className="flex items-center gap-3 text-sm cursor-pointer group">
      <input
        type="checkbox"
        className="appearance-none w-4 h-4 border border-white/30 rounded bg-transparent checked:bg-[#d4a373] checked:border-[#d4a373]"
        checked={filters?.category === label}
        onChange={() => {
          if (!setFilters) return;
          setFilters((prev: any) => ({
            ...prev,
            category: prev.category === label ? "" : label,
          }));
        }}
      />
      <span className="group-hover:text-white text-gray-300 transition">{label}</span>
    </label>
  );
}

function Collapsible({ title, children, open, toggle }: any) {
  return (
    <div className="mb-7 border-t border-white/10 pt-5">
      <div className="flex justify-between items-center cursor-pointer mb-3" onClick={toggle}>
        <p className="text-sm uppercase tracking-[0.14em] text-gray-400">{title}</p>
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

/* ================= CARD ================= */

function ProjectCard({ data }: any) {
  return (
    <div className="group relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 transition duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]">
      <div className="relative h-[440px]">
        <Image
          src={img}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="absolute top-4 left-4 bg-black/70 text-xs px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
        {data.category}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md p-5">
          <h2 className="text-xl font-semibold mb-3">{data.title}</h2>

          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <FaBed className="text-yellow-400 text-xs" />
              2-8 Bedrooms
            </div>

            <div className="flex items-center gap-2">
              <FaDollarSign className="text-yellow-400 text-xs" />
              From $2.3M
            </div>

            <div className="flex items-center gap-2">
              <FaRulerCombined className="text-yellow-400 text-xs" />
              2,800 – 7,200 sq.ft.
            </div>

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-400 text-xs" />
              {data.location}
            </div>
          </div>

          <Link href={`/projects/${data.id}`}>
            <button className="mt-5 w-full py-3 rounded-xl border border-white/20 text-sm hover:border-yellow-400 hover:text-white transition inline-flex items-center justify-center gap-2">
              Check Details <FaArrowRight className="text-xs" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================= CTA ================= */

function ProjectsCTA() {
  return (
    <section className="pb-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto rounded-[32px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-10 md:p-14 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
          Need Guidance?
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-5">
          Let us help you discover the right property with more clarity.
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          From luxury residences to investment-led opportunities, Winstead helps you
          shortlist better options and move forward with confidence.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
            Speak With Our Team
          </button>
          <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition">
            Register Interest
          </button>
        </div>
      </div>
    </section>
  );
}