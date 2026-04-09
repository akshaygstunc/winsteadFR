/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import { FaBed, FaDollarSign, FaRulerCombined } from "react-icons/fa6";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import ProjectsHero from "../components/projects/ProjectsHero";
import WebsiteContentService from "../services/websitecontent.service";
import img from "../../public/hero2.png"
import AutoBreadcrumbs from "../components/BreadCrumbs";
export default function Page() {
  return (
    <Suspense
      fallback={<div className="bg-black text-white min-h-screen p-8">Loading...</div>}
    >
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [projects, setProjects] = useState<any[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    type: "",
    residence: "",
    bedrooms: "",
    location: "",
    subLocation: "",
    category: "",
    developer: "",
    minSize: 1000,
    maxSize: 10000,
    minPrice: 1000,
    maxPrice: 100000,
  });

  const subLocationsMap: Record<string, string[]> = {
    Dubai: [
      "Downtown Dubai",
      "Dubai Marina",
      "Business Bay",
      "Palm Jumeirah",
      "Jumeirah Village Circle",
    ],
    "Abu Dhabi": [
      "Saadiyat Island",
      "Yas Island",
      "Al Reem Island",
      "Corniche Area",
    ],
  };

  const syncFiltersToUrl = (nextFilters: any) => {
    const params = new URLSearchParams();

    if (nextFilters.type) params.set("type", nextFilters.type);
    if (nextFilters.residence) params.set("residence", nextFilters.residence);
    if (nextFilters.bedrooms) params.set("bedrooms", nextFilters.bedrooms);
    if (nextFilters.location) params.set("location", nextFilters.location);
    if (nextFilters.subLocation) params.set("subLocation", nextFilters.subLocation);
    if (nextFilters.category) params.set("category", nextFilters.category);
    if (nextFilters.developer) params.set("developer", nextFilters.developer);

    params.set("minSize", String(nextFilters.minSize));
    params.set("maxSize", String(nextFilters.maxSize));
    params.set("minPrice", String(nextFilters.minPrice));
    params.set("maxPrice", String(nextFilters.maxPrice));

    router.push(`/projects?${params.toString()}`);
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);

        const [response, cat] = await Promise.all([
          WebsiteContentService.getProperties(),
          WebsiteContentService.getCategory(),
        ]);

        setCategories(cat?.filter((c: any) => c.title !== "Ultra Luxury") || []);
        setProjects(response || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    setFilters({
      type: searchParams.get("type") || "",
      residence: searchParams.get("residence") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      location: searchParams.get("location") || "",
      subLocation: searchParams.get("subLocation") || "",
      category: searchParams.get("category") || "",
      developer: searchParams.get("developer") || "",
      minSize: Number(searchParams.get("minSize") || 1000),
      maxSize: Number(searchParams.get("maxSize") || 10000),
      minPrice: Number(searchParams.get("minPrice") || 1000),
      maxPrice: Number(searchParams.get("maxPrice") || 100000),
    });
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p: any) => {
      const type = p.type || p?.data?.type || "";
      const residence = p.residence || p?.data?.residence || "";
      const bedrooms = p.bedrooms || p?.data?.bedrooms || "";
      const location = p.location || p?.data?.location || "";
      const subLocation = p.subLocation || p?.data?.subLocation || "";
      const category = p.category || p?.data?.category || "";
      const developer = p.developer || p?.data?.developer || "";

      const sizeRaw = p.area || p?.data?.area || "";
      const numericSize = extractFirstNumber(sizeRaw);

      const priceRaw = p.price || p?.data?.price || "";
      const numericPrice = extractFirstNumber(priceRaw);

      return (
        (!filters.type || type === filters.type) &&
        (!filters.residence || residence === filters.residence) &&
        (!filters.bedrooms || bedrooms === filters.bedrooms) &&
        (!filters.location || location === filters.location) &&
        (!filters.subLocation || subLocation === filters.subLocation) &&
        (!filters.category || category === filters.category) &&
        (!filters.developer || developer === filters.developer) &&
        (!numericSize ||
          (numericSize >= filters.minSize && numericSize <= filters.maxSize)) &&
        (!numericPrice ||
          (numericPrice >= filters.minPrice && numericPrice <= filters.maxPrice))
      );
    });
  }, [projects, filters]);

  const handleSearch = (e: any) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (filters.type) params.set("type", filters.type);
    if (filters.residence) params.set("residence", filters.residence);
    if (filters.location) params.set("location", filters.location);
    if (filters.subLocation) params.set("subLocation", filters.subLocation);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    if (filters.category) params.set("category", filters.category);
    if (filters.developer) params.set("developer", filters.developer);
    params.set("minSize", String(filters.minSize));
    params.set("maxSize", String(filters.maxSize));
    params.set("minPrice", String(filters.minPrice));
    params.set("maxPrice", String(filters.maxPrice));

    router.push(`/projects?${params.toString()}`);
  };

  const updateFilter = (key: string, value: any) => {
    const nextFilters = {
      ...filters,
      [key]: value,
      ...(key === "location" ? { subLocation: "" } : {}),
    };

    setFilters(nextFilters);
    syncFiltersToUrl(nextFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      type: "",
      residence: "",
      bedrooms: "",
      location: "",
      subLocation: "",
      category: "",
      developer: "",
      minSize: 1000,
      maxSize: 10000,
      minPrice: 1000,
      maxPrice: 100000,
    };

    setFilters(resetFilters);
    router.push("/projects");
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <ProjectsHero />
       <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-6">
                                        <AutoBreadcrumbs />
                                      </section>
      <ProjectsToolbar
        filters={filters}
        handleSearch={handleSearch}
        setShowFilter={setShowFilter}
        subLocationsMap={subLocationsMap}
        updateFilter={updateFilter}
      />

      <div className="max-w-[85rem] mx-auto px-4 md:px-12 pb-20">
        <ResultsBar
          count={filteredProjects.length}
          filters={filters}
          clearAllFilters={clearAllFilters}
        />

        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="hidden md:block">
            <Sidebar
              filters={filters}
              updateFilter={updateFilter}
              categories={categories}
            />
          </div>

          {showFilter && (
            <div className="fixed inset-0 z-50 flex">
              <div
                className="flex-1 bg-black/70"
                onClick={() => setShowFilter(false)}
              />
              <div className="w-[85%] max-w-[340px] bg-[#0c0c0c] p-4 overflow-y-auto border-l border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setShowFilter(false)}>✕</button>
                </div>
                <Sidebar
                  filters={filters}
                  updateFilter={updateFilter}
                  categories={categories}
                />
              </div>
            </div>
          )}

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            ) : filteredProjects.length > 0 ? (
                filteredProjects.map((p: any, index: number) => (
                  <ProjectCard key={p.id || p._id || `project-${index}`} data={p} />
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                <h3 className="text-2xl font-semibold mb-3">No matching properties found</h3>
                    <p className="text-white/70">
                  Try adjusting your filters to explore more curated opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function extractFirstNumber(value: string | number) {
  if (typeof value === "number") return value;
  if (!value) return 0;

  const cleaned = String(value).replace(/,/g, "");
  const match = cleaned.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

/* ================= TOOLBAR ================= */

function ProjectsToolbar({
  filters,
  handleSearch,
  setShowFilter,
  subLocationsMap,
  updateFilter,
}: any) {
  const availableSubLocations =
    filters.location && subLocationsMap[filters.location]
      ? subLocationsMap[filters.location]
      : [];

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
              value={filters.type}
              onChange={(e) => updateFilter("type", e.target.value)}
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="">Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>

            <select
              name="residence"
              value={filters.residence}
              onChange={(e) => updateFilter("residence", e.target.value)}
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="">Residence Type</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Office">Office</option>
            </select>

            <select
              name="location"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="">Location</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
            </select>

            <select
              name="subLocation"
              value={filters.subLocation}
              onChange={(e) => updateFilter("subLocation", e.target.value)}
              className="px-5 py-4 bg-transparent outline-none"
            >
              <option value="">Sub Location</option>
              {availableSubLocations.map((item: string) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
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

function ResultsBar({ count, filters, clearAllFilters }: any) {
  const active = [
    filters.type,
    filters.residence,
    filters.bedrooms,
    filters.location,
    filters.subLocation,
    filters.category,
    filters.developer,
  ].filter(Boolean);

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
                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-white/80"
              >
                {item}
              </span>
            ))}

            <button
              onClick={clearAllFilters}
              className="px-3 py-1 rounded-full border border-yellow-500/30 text-yellow-400 text-sm"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <button className="border border-white/10 text-white/80 px-5 py-3 rounded-full hover:border-yellow-500 hover:text-white transition w-fit">
        Sort by Featured
      </button>
    </div>
  );
}

/* ================= SIDEBAR ================= */

function Sidebar({ filters, updateFilter, categories }: any) {
  const [open, setOpen] = useState({
    developer: true,
    amenities: true,
  });

  const developers = ["DAMAC", "Emaar", "Meraas", "XYZ Properties"];

  return (
    <div className="w-[300px] rounded-[28px] border border-yellow-500/20 bg-gradient-to-b from-[#0c0c0c] to-[#111] p-6 shadow-[0_0_30px_rgba(250,204,21,0.05)]">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      <Section title="Category">
        {categories?.map((cat: any) => (
          <Check
            key={cat._id}
            label={cat.title}
            checked={filters.category === cat.title}
            onChange={() =>
              updateFilter("category", filters.category === cat.title ? "" : cat.title)
            }
          />
        ))}
      </Section>

      <Section title="Residence Type">
        {["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom", "5+ Bedroom"].map(
          (item) => (
            <Check
              key={item}
              label={item}
              checked={filters.bedrooms === item}
              onChange={() =>
                updateFilter("bedrooms", filters.bedrooms === item ? "" : item)
              }
            />
          )
        )}
      </Section>

      <div className="mb-7">
        <p className="text-sm uppercase tracking-[0.14em] text-white/70 mb-3">Size</p>
        <div className="flex justify-between text-xs mb-3 text-white/70">
          <span>{filters.minSize.toLocaleString()} sq. ft.</span>
          <span>{filters.maxSize.toLocaleString()} sq. ft.</span>
        </div>
        <Slider
          range
          min={1000}
          max={10000}
          value={[filters.minSize, filters.maxSize]}
          onChange={(val: any) => {
            if (!Array.isArray(val)) return;
            updateFilter("minSize", val[0]);
            updateFilter("maxSize", val[1]);
          }}
          onChangeComplete={(val: any) => {
            if (!Array.isArray(val)) return;
            updateFilter("minSize", val[0]);
            updateFilter("maxSize", val[1]);
          }}
          trackStyle={[{ backgroundColor: "#d4a373" }]}
          handleStyle={[
            { borderColor: "#d4a373", backgroundColor: "#d4a373" },
            { borderColor: "#d4a373", backgroundColor: "#d4a373" },
          ]}
        />
      </div>

      <div className="mb-7">
        <p className="text-sm uppercase tracking-[0.14em] text-white/70 mb-3">Price Range</p>
        <div className="flex justify-between text-xs mb-3 text-white/70">
          <span>{filters.minPrice.toLocaleString()} AED</span>
          <span>{filters.maxPrice.toLocaleString()} AED</span>
        </div>
        <Slider
          range
          min={1000}
          max={100000}
          value={[filters.minPrice, filters.maxPrice]}
          onChange={(val: any) => {
            if (!Array.isArray(val)) return;
            updateFilter("minPrice", val[0]);
            updateFilter("maxPrice", val[1]);
          }}
          onChangeComplete={(val: any) => {
            if (!Array.isArray(val)) return;
            updateFilter("minPrice", val[0]);
            updateFilter("maxPrice", val[1]);
          }}
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
        {developers.map((d) => (
          <Check
            key={d}
            label={d}
            checked={filters.developer === d}
            onChange={() =>
              updateFilter("developer", filters.developer === d ? "" : d)
            }
          />
        ))}
      </Collapsible>

      <Collapsible
        title="Amenities"
        open={open.amenities}
        toggle={() => setOpen((prev) => ({ ...prev, amenities: !prev.amenities }))}
      >
        {["Swimming Pool", "Lounge", "Play Area", "Park", "Cinema"].map((a) => (
          <Check key={a} label={a} checked={false} onChange={() => { }} />
        ))}
      </Collapsible>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="mb-7">
      <p className="text-sm uppercase tracking-[0.14em] text-white/70 mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm cursor-pointer group">
      <input
        type="checkbox"
        className="appearance-none w-4 h-4 border border-white/30 rounded bg-transparent checked:bg-[#d4a373] checked:border-[#d4a373]"
        checked={checked}
        onChange={onChange}
      />
      <span className="group-hover:text-white text-white/80 transition">{label}</span>
    </label>
  );
}

function Collapsible({ title, children, open, toggle }: any) {
  return (
    <div className="mb-7 border-t border-white/10 pt-5">
      <div className="flex justify-between items-center cursor-pointer mb-3" onClick={toggle}>
        <p className="text-sm uppercase tracking-[0.14em] text-white/70">{title}</p>
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

/* ================= CARD ================= */

function ProjectCard({ data }: any) {
  return (
    <Link href={`/projects/${data.slug}`} className="block">
      <div className="group relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 transition duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.08)] cursor-pointer">
        <div className="relative h-[440px]">
          <Image
            src={data.thumbnail || img}
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

            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <FaBed className="text-yellow-400 text-xs" />
                {data.bedrooms}
              </div>

              <div className="flex items-center gap-2">
                <FaDollarSign className="text-yellow-400 text-xs" />
                {data.price}
              </div>

              <div className="flex items-center gap-2">
                <FaRulerCombined className="text-yellow-400 text-xs" />
                {data.area}
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-400 text-xs" />
                {data.location}, {data.subLocation}
              </div>
            </div>

            <div className="mt-5 w-full py-3 rounded-xl border border-white/20 text-sm hover:border-yellow-400 hover:text-white transition inline-flex items-center justify-center gap-2">
              Check Details <FaArrowRight className="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="rounded-[28px] overflow-hidden border border-white/10 bg-white/5 animate-pulse">
      <div className="relative h-[440px] bg-white/10">
        <div className="absolute top-4 left-4 h-7 w-24 rounded-full bg-white/10" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
            <div className="h-7 w-2/3 rounded bg-white/10 mb-4" />

            <div className="space-y-3">
              <div className="h-4 w-1/2 rounded bg-white/10" />
              <div className="h-4 w-1/3 rounded bg-white/10" />
              <div className="h-4 w-2/3 rounded bg-white/10" />
              <div className="h-4 w-3/4 rounded bg-white/10" />
            </div>

            <div className="mt-5 h-11 w-full rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}