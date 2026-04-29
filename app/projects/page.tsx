/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { FaBed, FaDollarSign, FaRulerCombined } from "react-icons/fa6";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import "rc-slider/assets/index.css";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import ProjectsHero from "../components/projects/ProjectsHero";
import WebsiteContentService from "../services/websitecontent.service";
import img from "../../public/hero2.png";
import AutoBreadcrumbs from "../components/BreadCrumbs";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="bg-black text-white min-h-screen p-8">Loading...</div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const [liveFilters, setLiveFilters] = useState(getDefaultFilters());
  const [appliedFilters, setAppliedFilters] = useState(getDefaultFilters());

  const fetchProjects = async (filters: any) => {
    try {
      setLoading(true);

      const query = buildQuery(filters);

      const [response, cat] = await Promise.all([
        WebsiteContentService.getProperties(query),
        WebsiteContentService.getCategory(),
      ]);

      setProjects(
        response?.sort((a: any, b: any) => a._sortOrder - b._sortOrder) || [],
      );
      setCategories(cat?.filter((c: any) => c.title !== "Ultra Luxury") || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlFilters = {
      ...getDefaultFilters(),
      type: searchParams.get("type") || "",
      residence: searchParams.get("residence") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      location: searchParams.get("location") || "",
      subLocation: searchParams.get("subLocation") || "",
      developer: searchParams.get("developer") || "",
      communities: searchParams.get("communities") || "",
      minSize: searchParams.get("minSize") || "",
      maxSize: searchParams.get("maxSize") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      priceRange: searchParams.get("priceRange") || "",
      sort: searchParams.get("sort") || "",
      featured: searchParams.get("featured") || "",
    };

    setLiveFilters(urlFilters);
    setAppliedFilters(urlFilters);
    fetchProjects(urlFilters);
  }, [searchParams]);

  const updateLiveFilter = (key: string, value: any) => {
    const updated = {
      ...liveFilters,
      [key]: value,
      ...(key === "location" ? { subLocation: "" } : {}),
    };

    setLiveFilters(updated);
    fetchProjects(updated);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    setAppliedFilters(liveFilters);
    fetchProjects(liveFilters);
  };

  const clearAllFilters = () => {
    const reset = getDefaultFilters();
    setLiveFilters(reset);
    setAppliedFilters(reset);
    fetchProjects(reset);
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <ProjectsHero />

      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-6">
        <AutoBreadcrumbs />
      </section>

      <ProjectsToolbar
        filters={liveFilters}
        handleSearch={handleSearch}
        setShowFilter={setShowFilter}
        updateFilter={setLiveFilters}
      />

      <div className="max-w-[85rem] mx-auto px-4 md:px-12 pb-20">
        <ResultsBar
          count={projects.length}
          filters={liveFilters}
          clearAllFilters={clearAllFilters}
        />

        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="hidden md:block">
            <Sidebar
              filters={liveFilters}
              updateFilter={updateLiveFilter}
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
                <Sidebar
                  filters={liveFilters}
                  updateFilter={updateLiveFilter}
                  categories={categories}
                />
              </div>
            </div>
          )}

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))
            ) : projects.length > 0 ? (
              projects.map((p: any, index: number) => (
                <ProjectCard
                  key={p.id || p._id || `project-${index}`}
                  data={p}
                />
              ))
            ) : (
              <div className="col-span-full text-center p-10">
                No properties found
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
  updateFilter,
}: any) {
  const [type, setType] = useState<any[]>([]);
  const [location, setLocation] = useState<any[]>([]);
  const [sublocation, setsubLocation] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCatLOc() {
      try {
        const [typeRes, locationRes, subLocation] = await Promise.all([
          fetch("https://winsteadglobal.com/api/content/property-types"),
          fetch("https://winsteadglobal.com/api/content/locations"),
          fetch("https://winsteadglobal.com/api/content/sub-locations"),
        ]);

        const typeData = await typeRes.json();
        const locationData = await locationRes.json();
        const subLocationData = await subLocation.json();
        setType(typeData || []);
        setLocation(locationData || []);
        setsubLocation(subLocationData || []);
      } catch (error) {
        console.error("Toolbar fetch error:", error);
      }
    }

    fetchCatLOc();
  }, []);

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
              onChange={(e) =>
                updateFilter((prev: any) => ({ ...prev, type: e.target.value }))
              }
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="">Property Type</option>
              {type?.map((ty: any) => (
                <option key={ty?._id} value={ty?.title} className="text-black">
                  {ty?.title}
                </option>
              ))}
            </select>

            <select
              name="residence"
              value={filters.residence}
              onChange={(e) =>
                updateFilter((prev: any) => ({
                  ...prev,
                  residence: e.target.value,
                }))
              }
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="" className="text-black">
                Residence Type
              </option>
              <option value="Villa" className="text-black">
                Villa
              </option>
              <option value="Apartment" className="text-black">
                Apartment
              </option>
              <option value="Office" className="text-black">
                Office
              </option>
            </select>

            <select
              name="location"
              value={filters.location}
              onChange={(e) =>
                updateFilter((prev: any) => ({
                  ...prev,
                  location: e.target.value,
                  subLocation: "",
                }))
              }
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="">Location</option>
              {location?.map((ty: any) => (
                <option key={ty?._id} value={ty?.title} className="text-black">
                  {ty?.title}
                </option>
              ))}
            </select>

            <select
              name="subLocation"
              value={filters.subLocation}
              onChange={(e) =>
                updateFilter((prev: any) => ({
                  ...prev,
                  subLocation: e.target.value,
                }))
              }
              className="px-5 py-4 bg-transparent outline-none"
            >
              <option value="">Sub Location</option>
              {sublocation?.map((ty: any) => (
                <option key={ty?._id} value={ty?.title} className="text-black">
                  {ty?.title}
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
    filters.communities,
    filters.priceRange,
    filters.sort,
    filters.featured,
  ].filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <p className="text-white text-lg font-medium">
          Showing <span className="text-yellow-400">{count}</span> curated
          properties
        </p>
        {active.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {active.map((item: string) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-white"
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

      <button className="border border-white/10 text-white px-5 py-3 rounded-full hover:border-yellow-500 hover:text-white transition w-fit">
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

  const [locations, setLocations] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [developers, setDevelopers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [locRes, commRes, deveRes] = await Promise.all([
          fetch("https://winsteadglobal.com/api/content/locations"),
          fetch("https://winsteadglobal.com/api/content/communities"),
          fetch("https://winsteadglobal.com/api/content/developer-community"),
        ]);

        const locData = await locRes.json();
        const commData = await commRes.json();
        const devData = await deveRes.json();

        setLocations(locData || []);
        setCommunities(commData || []);
        setDevelopers(devData || []);
      } catch (error) {
        console.error("Sidebar fetch error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="w-[300px] rounded-[28px] border border-yellow-500/20 bg-gradient-to-b from-[#0c0c0c] to-[#111] p-6">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      <Section title="Category">
        {categories?.map((cat: any) => (
          <Check
            key={cat._id}
            label={cat.title}
            // checked={filters.type === cat.title}
            // onChange={() =>
            //   updateFilter("type", filters.type === cat.title ? "" : cat.title)
            // }
            checked={filters.type.includes(cat.title)}
            onChange={() => {
              const exists = filters.type.includes(cat.title);

              const updated = exists
                ? filters.type.filter((t: string) => t !== cat.title)
                : [...filters.type, cat.title];

              updateFilter("type", updated);
            }}
          />
        ))}
      </Section>

      <Section title="Location">
        {locations.map((loc: any) => (
          <Check
            key={loc._id}
            label={loc.title}
            checked={filters.location === loc.title}
            onChange={() =>
              updateFilter(
                "location",
                filters.location === loc.title ? "" : loc.title,
              )
            }
          />
        ))}
      </Section>

      <Section title="Bedrooms">
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
          ),
        )}
      </Section>

      <Section title="Price Range">
        {[
          { label: "500k – 2M", value: "500k-2m" },
          { label: "2M – 5M", value: "2m-5m" },
          { label: "5M Above", value: "5m" },
        ].map((p) => (
          <Check
            key={p.value}
            label={p.label}
            checked={filters.priceRange === p.value}
            onChange={() =>
              updateFilter(
                "priceRange",
                filters.priceRange === p.value ? "" : p.value,
              )
            }
          />
        ))}
      </Section>

      <Section title="Sort By">
        {[
          { label: "Low to High", value: "lowToHigh" },
          { label: "High to Low", value: "highToLow" },
        ].map((s) => (
          <Check
            key={s.value}
            label={s.label}
            checked={filters.sort === s.value}
            onChange={() =>
              updateFilter("sort", filters.sort === s.value ? "" : s.value)
            }
          />
        ))}
      </Section>

      <Section title="Project Type">
        <Check
          label="Featured Projects"
          checked={filters.featured === "true"}
          onChange={() =>
            updateFilter("featured", filters.featured === "true" ? "" : "true")
          }
        />
      </Section>

      <Collapsible
        title="Developer"
        open={open.developer}
        toggle={() =>
          setOpen((prev) => ({ ...prev, developer: !prev.developer }))
        }
      >
        {developers.map((d: any) => (
          <Check
            key={d._id}
            label={d.title}
            checked={filters.developer === d._id}
            onChange={() =>
              updateFilter(
                "developer",
                filters.developer === d._id ? "" : d._id,
              )
            }
          />
        ))}
      </Collapsible>

    <Section title="Community">
  {(communities || [])
    .filter((c: any) => {
      // ✅ No developer selected → show all
      if (!filters.developer) return true;

      // ✅ Match using correct path
      return c.data?.developer === filters.developer;
    })
    .map((c: any) => (
      <Check
        key={c._id}
        label={c.title}
        checked={filters.communities === c._id}
        onChange={() =>
          updateFilter(
            "communities",
            filters.communities === c._id ? "" : c._id
          )
        }
      />
    ))}
</Section>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="mb-7">
      <p className="text-sm uppercase tracking-[0.14em] text-white mb-3">
        {title}
      </p>
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
      <span className="group-hover:text-white text-white transition">
        {label}
      </span>
    </label>
  );
}

function Collapsible({ title, children, open, toggle }: any) {
  return (
    <div className="mb-7 border-t border-white/10 pt-5">
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={toggle}
      >
        <p className="text-sm uppercase tracking-[0.14em] text-white">
          {title}
        </p>
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
    <Link href={`/projects/${data.slug}`} className="block">
      <div className="group relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 transition duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.08)] cursor-pointer">
        <div className="relative h-[440px]">
          <Image
            src={data?.thumbnail || img}
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

            <div className="space-y-2 text-sm text-white">
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

function getDefaultFilters() {
  return {
    type: [],
    residence: "",
    bedrooms: [],
    location: "",
    subLocation: "",
    developer: "",
    communities: "",
    minSize: "",
    maxSize: "",
    minPrice: "",
    maxPrice: "",
    priceRange: "",
    sort: "",
    featured: "",
  };
}

function buildQuery(filters: any) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  return params.toString();
}
