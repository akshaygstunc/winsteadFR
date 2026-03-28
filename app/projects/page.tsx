"use client";

export const dynamic = "force-dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import img from "../../public/image_7.png";
import { FaBed, FaDollarSign, FaRulerCombined } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
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
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}

// 🔥 Your actual code here
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

  // sync URL → state
  useEffect(() => {
    setFilters({
      type: searchParams.get("type") || "",
      residence: searchParams.get("residence") || "",
      location: searchParams.get("location") || "",
      category: "",
    });
  }, [searchParams]);

  // 🔥 FILTER LOGIC (MAIN FIX)
  const filteredProjects = allProjects.filter((p) => {
    return (
      (!filters.type || p.type === filters.type) &&
      (!filters.residence || p.residence === filters.residence) &&
      (!filters.location || p.location === filters.location) &&
      (!filters.category || p.category === filters.category)
    );
  });

  const isFiltered =
    filters.type || filters.residence || filters.location || filters.category;

  // 🔥 HANDLE FORM SUBMIT (URL UPDATE)
  const handleSearch = (e: any) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const params = new URLSearchParams();

    if (form.get("type")) params.set("type", form.get("type") as string);
    if (form.get("residence"))
      params.set("residence", form.get("residence") as string);
    if (form.get("location"))
      params.set("location", form.get("location") as string);

    router.push(`/projects?${params.toString()}`);
  };

  return (
    // <div className="bg-black text-white min-h-screen">
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* 🔥 TOP FILTER */}
      {/* <form onSubmit={handleSearch} className="flex justify-center gap-4 p-6">
        <div className="flex bg-[#FFFFFF1A] border border-white/10 rounded-2xl overflow-hidden">
          <select
            name="type"
            defaultValue={filters.type}
            className="px-6 py-4 bg-transparent"
          >
            <option value="">Property Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>

          <select
            name="residence"
            defaultValue={filters.residence}
            className="px-6 py-4 bg-transparent border-l border-white/10"
          >
            <option value="">Residence Type</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
          </select>

          <select
            name="location"
            defaultValue={filters.location}
            className="px-6 py-4 bg-transparent border-l border-white/10"
          >
            <option value="">Location</option>
            <option value="Dubai">Dubai</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-8 py-4 rounded-2xl bg-yellow-500 text-black"
        >
          Search
        </button>
      </form> */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-3 p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row flex-1 p-2 bg-[#FFFFFF1A] border border-white/10 rounded-2xl overflow-hidden">
          <select
            name="type"
            defaultValue={filters.type}
            className="px-4 py-3 bg-transparent"
          >
            <option value="">Property Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>

          <select
            name="residence"
            defaultValue={filters.residence}
            className="px-4 py-3 bg-transparent md:border-l border-white/10"
          >
            <option value="">Residence Type</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
          </select>

          <select
            name="location"
            defaultValue={filters.location}
            className="px-4 py-3 bg-transparent md:border-l border-white/10"
          >
            <option value="">Location</option>
            <option value="Dubai">Dubai</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
          </select>
        </div>

        <div className="flex gap-2">
          {/* 🔥 FILTER BUTTON (MOBILE) */}
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="md:hidden px-4 py-3 rounded-xl bg-white/10 border border-white/10"
          >
            Filters
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-yellow-500 text-black"
          >
            Search
          </button>
        </div>
      </form>
      {/* 🔥 MAIN */}
      {/* <div className="flex items-start gap-6 px-6 md:px-12 pb-16 mt-3"> */}
      <div className="flex flex-col md:flex-row items-start gap-6 px-4 md:px-12 pb-16 mt-3">
        {/* SIDEBAR */}
        {/* 💻 DESKTOP SIDEBAR */}
        <div className="hidden md:block">
  <Sidebar filters={filters} setFilters={setFilters} />
</div>

        {/* 📱 MOBILE DRAWER */}
        {showFilter && (
          <div className="fixed inset-0 z-50 flex">
            {/* BACKDROP */}
            <div
              className="flex-1 bg-black/60"
              onClick={() => setShowFilter(false)}
            />

            {/* DRAWER */}
            <div className="w-[80%] max-w-[320px] bg-[#0c0c0c] p-4 overflow-y-auto">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setShowFilter(false)}>✕</button>
              </div>

              <Sidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>
        )}

        {/* GRID */}
       <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => <ProjectCard key={p.id} data={p} />)
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </div>
    </div>
  );
}
function Sidebar({ filters, setFilters }: any) {
  const [size, setSize] = useState([4000, 6000]);
  const [price, setPrice] = useState([10000, 40000]);

  const [open, setOpen] = useState({
    developer: true,
    amenities: true,
  });

  return (
    <div className="w-[300px] bg-gradient-to-b from-[#0c0c0c] to-[#111] p-6 rounded-2xl border border-white/10">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      {/* CATEGORY */}
      <Section title="Category">
        <Check label="Elite" filters={filters} setFilters={setFilters} />
        <Check label="Luxury" filters={filters} setFilters={setFilters} />
        <Check label="Ultra Luxury" filters={filters} setFilters={setFilters} />
      </Section>

      {/* SIZE */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">Size</p>

        <div className="flex justify-between text-xs mb-2">
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

      {/* PRICE */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">Price Range</p>

        <div className="flex justify-between text-xs mb-2">
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

      {/* DEVELOPER */}
      <Collapsible
        title="Developer"
        open={open.developer}
        toggle={() =>
          setOpen((prev) => ({ ...prev, developer: !prev.developer }))
        }
      >
        {["DAMAC", "Emaar", "Meraas", "XYZ Properties"].map((d) => (
          <Check key={d} label={d} />
        ))}
      </Collapsible>

      {/* AMENITIES */}
      <Collapsible
        title="Amenities"
        open={open.amenities}
        toggle={() =>
          setOpen((prev) => ({ ...prev, amenities: !prev.amenities }))
        }
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
    <div className="mb-6">
      <p className="text-sm text-gray-400 mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({ label, filters, setFilters }: any) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer group">
      <input
        type="checkbox"
        className="appearance-none w-4 h-4 border border-white/30 rounded bg-transparent checked:bg-[#d4a373] checked:border-[#d4a373]"
        onChange={() => {
          if (!setFilters) return;

          setFilters((prev: any) => ({
            ...prev,
            category: prev.category === label ? "" : label,
          }));
        }}
      />
      <span className="group-hover:text-white text-gray-300">{label}</span>
    </label>
  );
}

function Collapsible({ title, children, open, toggle }: any) {
  return (
    <div className="mb-6">
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={toggle}
      >
        <p className="text-sm text-gray-400">{title}</p>
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}
/* ================= CARD ================= */

function ProjectCard({ data }: any) {
  return (
    <div className="group relative rounded-2xl overflow-hidden transition duration-500 hover:scale-[1.03] hover:-translate-y-2">
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

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* TAG */}
      <div className="absolute top-4 left-4 bg-black/70 text-xs px-3 py-1 rounded-full border border-white/20">
        Ultra Luxury
      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 p-5 w-full">
        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>

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
            {data.location}
          </div>
        </div>

        {/* BUTTON */}
        <Link href={`/projects/${data.id}`}>
          <button className="mt-4 w-full py-3 border border-white/20 rounded-xl text-sm hover:border-yellow-400 hover:text-white transition">
            Check Details
          </button>
        </Link>
      </div>
    </div>
  );
}
