/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { FaBed, FaRulerCombined } from "react-icons/fa6";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "rc-slider/assets/index.css";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import ProjectsHero from "../components/projects/ProjectsHero";
import WebsiteContentService from "../services/websitecontent.service";
import AutoBreadcrumbs from "../components/BreadCrumbs";

const PAGE_SIZE = 15;

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

function getDefaultFilters() {
  return {
    category: [] as string[],
    residence: "",
    bedrooms: [] as string[],
    // location, subLocation, developer, communities all send IDs to the API
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

/**
 * buildQuery handles arrays as repeated params: category=Villa&category=Apartment
 */
function buildQuery(filters: ReturnType<typeof getDefaultFilters>) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== "" && v !== null && v !== undefined)
          params.append(key, String(v));
      });
    } else if (value !== "" && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

function ProjectsContent() {
  const searchParams = useSearchParams();
const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [liveFilters, setLiveFilters] = useState(getDefaultFilters());

  const fetchProjects = async (
    filters: ReturnType<typeof getDefaultFilters>,
  ) => {
    try {
      setLoading(true);
      setCurrentPage(1);

      const query = buildQuery(filters);
      console.log("Sending query:", query);
      // const [response, cat] = await Promise.all([
      //   WebsiteContentService.getProperties(query),
      //   WebsiteContentService.getCategory(),
      // ]);
      
      // setAllProjects(
      //   response?.sort((a: any, b: any) => a._sortOrder - b._sortOrder) || [],
      // );
      const [response, cat] = await Promise.all([
  WebsiteContentService.getProperties(query),
  WebsiteContentService.getCategory(),
]);

let projects = response || [];

// Community title based frontend filtering
if (filters.communities && selectedCommunity?.title) {
  const community = selectedCommunity.title.toLowerCase();

  projects = projects.filter(
    (p: any) =>
      p.title?.toLowerCase().includes(community) ||
      p.fullDescription?.toLowerCase().includes(community),
  );
}

console.log("Filtered Response", projects);

setAllProjects(
  projects.sort((a: any, b: any) => a.sortOrder - b.sortOrder),
);
      setCategories(cat?.filter((c: any) => c.title !== "Ultra Luxury") || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Read URL params on mount
  useEffect(() => {
    const parseArray = (val: string | null) =>
      val ? val.split(",").filter(Boolean) : [];

    const urlFilters: ReturnType<typeof getDefaultFilters> = {
      ...getDefaultFilters(),
      category: parseArray(
        searchParams.get("category") || searchParams.get("type"),
      ),
      bedrooms: parseArray(searchParams.get("bedrooms")),
      residence: searchParams.get("residence") || "",
      // These all send IDs — read them as-is from URL
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
    fetchProjects(urlFilters);
  }, [searchParams]);

  const updateLiveFilter = (key: string, value: any) => {
    setLiveFilters((prev) => {
      const updated = {
        ...prev,
        [key]: value,
        // Reset subLocation when location changes
        ...(key === "location" ? { subLocation: "" } : {}),
        // Reset communities when developer changes
        ...(key === "developer" ? { communities: "" } : {}),
      };
      fetchProjects(updated);
      return updated;
    });
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    fetchProjects(liveFilters);
  };

  const clearAllFilters = () => {
    const reset = getDefaultFilters();
    setLiveFilters(reset);
    fetchProjects(reset);
  };

  // ─── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(allProjects.length / PAGE_SIZE);
  const paginatedProjects = allProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden sm:mt-[80px]">
      <ProjectsHero />

      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-6">
        <AutoBreadcrumbs />
      </section>

      <ProjectsToolbar
        filters={liveFilters}
        handleSearch={handleSearch}
        setShowFilter={setShowFilter}
        updateFilter={updateLiveFilter}
      />

      <div className="max-w-[85rem] mx-auto px-4 md:px-12 pb-20">
        <ResultsBar
          count={allProjects.length}
          filters={liveFilters}
          clearAllFilters={clearAllFilters}
        />

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <Sidebar
              filters={liveFilters}
              updateFilter={updateLiveFilter}
              categories={categories}
              selectedCommunity={selectedCommunity}
  setSelectedCommunity={setSelectedCommunity}
            />
          </div>

          {/* Mobile sidebar drawer */}
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

          {/* Cards grid */}
          <div className="flex-1 w-full flex flex-col gap-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 md:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))
              ) : paginatedProjects.length > 0 ? (
                paginatedProjects.map((p: any, index: number) => (
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

            {!loading && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={allProjects.length}
                pageSize={PAGE_SIZE}
                onPageChange={goToPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGINATION ================= */

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-white/40 text-sm">
        Showing {from}–{to} of {totalItems} properties
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/50 disabled:opacity-30 hover:border-yellow-500/50 hover:text-yellow-400 transition"
        >
          <FaChevronLeft className="text-xs" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 flex items-center justify-center text-white/30 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition ${
                p === currentPage
                  ? "bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black"
                  : "border border-white/10 text-white/60 hover:border-yellow-500/50 hover:text-yellow-400"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/50 disabled:opacity-30 hover:border-yellow-500/50 hover:text-yellow-400 transition"
        >
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
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
        setType((await typeRes.json()) || []);
        setLocation((await locationRes.json()) || []);
        setsubLocation((await subLocation.json()) || []);
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
            {/* Category: sends title string (property.category is a string like "Residential") */}
            <select
              name="category"
              value={
                Array.isArray(filters.category)
                  ? filters.category[0] || ""
                  : filters.category
              }
              onChange={(e) =>
                updateFilter("category", e.target.value ? [e.target.value] : [])
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
              onChange={(e) => updateFilter("residence", e.target.value)}
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

            {/* FIX: Location toolbar sends _id to match property.location (which is an ID) */}
            <select
              name="location"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
            >
              <option value="">Location</option>
              {location?.map((ty: any) => (
                <option key={ty?._id} value={ty?._id} className="text-black">
                  {ty?.title}
                </option>
              ))}
            </select>

            {/* FIX: SubLocation toolbar sends _id to match property.sublocation (which is an ID) */}
            <select
              name="subLocation"
              value={filters.subLocation}
              onChange={(e) => updateFilter("subLocation", e.target.value)}
              className="px-5 py-4 bg-transparent outline-none"
            >
              <option value="">Sub Location</option>
              {sublocation?.map((ty: any) => (
                <option key={ty?._id} value={ty?._id} className="text-black">
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
    ...(Array.isArray(filters.category)
      ? filters.category
      : filters.category
        ? [filters.category]
        : []),
    ...(Array.isArray(filters.bedrooms)
      ? filters.bedrooms
      : filters.bedrooms
        ? [filters.bedrooms]
        : []),
    filters.residence,
    // For IDs we just show that a filter is active; labels are shown as tags
    filters.location ? "Location selected" : "",
    filters.subLocation ? "Sub-location selected" : "",
    filters.developer ? "Developer selected" : "",
    filters.communities ? "Community selected" : "",
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

function Sidebar({ filters, updateFilter, categories,selectedCommunity, setSelectedCommunity }: any) {
  const [open, setOpen] = useState({ developer: true, amenities: true });
  const [locations, setLocations] = useState<any[]>([]);
  const [allCommunities, setAllCommunities] = useState<any[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<any[]>([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState<any>(null);
  // const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
  const [developersWithCommunity, setDevelopersWithCommunity] = useState<any[]>(
    [],
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const [locRes, commRes, deveRes] = await Promise.all([
          fetch("https://winsteadglobal.com/api/content/locations"),
          fetch("https://winsteadglobal.com/api/content/communities"),
          fetch("https://winsteadglobal.com/api/content/developer-community"),
        ]);

        const locationsData = await locRes.json();
        const communitiesData = await commRes.json();
        const developersData = await deveRes.json();

        setLocations(locationsData || []);
        setAllCommunities(communitiesData || []);
        console.log("Filters", filters);
        console.log("Query", buildQuery(filters));
        // Only entities that are developers
        const devs = (developersData || []).filter(
          (item: any) => item.entity === "developer-community",
        );
        setDevelopersWithCommunity(devs);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // When developer filter changes, filter communities to only those belonging to that developer
  useEffect(() => {
    if (!selectedDeveloper) {
      setFilteredCommunities(allCommunities);
      return;
    }

    const matched = allCommunities.filter((community: any) => {
      const dev = community?.data?.developer;

      return (
        String(dev) === String(selectedDeveloper._id) ||
        String(dev).trim().toLowerCase() ===
          String(selectedDeveloper.title).trim().toLowerCase()
      );
    });

    setFilteredCommunities(matched);
  }, [selectedDeveloper, allCommunities]);
  const toggleArrayFilter = (key: string, value: string, current: string[]) => {
    const exists = current.includes(value);
    updateFilter(
      key,
      exists ? current.filter((v) => v !== value) : [...current, value],
    );
  };

  return (
    <div className="w-[300px] rounded-[28px] border border-yellow-500/20 bg-gradient-to-b from-[#0c0c0c] to-[#111] p-6">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      {/* Category: filter value is the title string (matches property.category) */}
      <Section title="Category">
        {categories?.map((cat: any) => (
          <Check
            key={cat._id}
            label={cat.title}
            checked={(filters.category as string[]).includes(cat.title)}
            onChange={() =>
              toggleArrayFilter(
                "category",
                cat.title,
                filters.category as string[],
              )
            }
          />
        ))}
      </Section>

      {/* FIX: Location sends _id to match property.location which is an ID */}
      <Section title="Location">
        {locations.map((loc: any) => (
          <Check
            key={loc._id}
            label={loc.title}
            checked={filters.location === loc._id}
            onChange={() =>
              updateFilter(
                "location",
                filters.location === loc._id ? "" : loc._id,
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
              checked={(filters.bedrooms as string[]).includes(item)}
              onChange={() =>
                toggleArrayFilter(
                  "bedrooms",
                  item,
                  filters.bedrooms as string[],
                )
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
        title="Developers"
        open={open.developer}
        toggle={() =>
          setOpen((prev) => ({
            ...prev,
            developer: !prev.developer,
          }))
        }
      >
        {developersWithCommunity.map((d: any) => (
          <Check
            key={d._id}
            label={d.title}
            checked={selectedDeveloper?._id === d._id}
            onChange={() => {
              setSelectedDeveloper(selectedDeveloper?._id === d._id ? null : d);

              // API ke liye title bhejo
              updateFilter(
                "developer",
                selectedDeveloper?._id === d._id ? "" : d.title,
              );
            }}
          />
        ))}
      </Collapsible>

      {/*
        Community section.
        FIX: sends community._id (matches property.communities which is an ID).
        When a developer is selected above, only that developer's communities are shown.
        When no developer is selected, all communities are shown.
      */}
      <Section title="Community">
        {filteredCommunities.map((c: any) => (
          <Check
            key={c._id}
            label={c.title}
            checked={selectedCommunity?._id === c._id}
            onChange={() => {
              const value = selectedCommunity?._id === c._id ? null : c;

              setSelectedCommunity(value);
              console.log("Selected Community", value);
              updateFilter("communities", value ? value._id : value.title);
            }}
          />
        ))}
      </Section>

      {/*
        Standalone Developers section.
        FIX: sends developer._id (same filter key "developer", same ID format).
        A developer can appear here AND in the Developers section above — both
        sections set the same filter key so they stay in sync (only one can be
        active at a time).
      */}
      {/* <Section title="Standalone Developers">
        {standaloneDevelopers.map((d: any) => (
          <Check
            key={d._id}
            label={d.title}
            checked={filters.developer === d.title}
            onChange={() =>
              updateFilter(
                "developer",
                filters.developer === d.title ? "" : d.title,
              )
            }
          />
        ))}
      </Section> */}
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
  function getBedroomRange(floorPlans: any[]) {
    if (!Array.isArray(floorPlans) || !floorPlans.length) return null;
    const plans = floorPlans
      .map((fp) => (fp?.title || fp?.name || "").trim())
      .filter(Boolean);
    if (!plans.length) return null;
    const groups: Record<string, string[]> = {};
    for (const plan of plans) {
      const words = plan.split(" ");
      const suffix = words[words.length - 1];
      const prefix = words
        .slice(0, -1)
        .join(" ")
        .replace(/\s+/g, "")
        .toUpperCase();
      if (!groups[suffix]) groups[suffix] = [];
      if (!groups[suffix].includes(prefix)) groups[suffix].push(prefix);
    }
    const allSuffixes = Object.keys(groups).join(", ");
    const allPrefixes = Object.values(groups)
      .flat()
      .filter((v, i, arr) => arr.indexOf(v) === i);
    const compressed = allPrefixes.map((p, i) =>
      i === 0 || i === allPrefixes.length - 1 ? p : p.replace("BR", ""),
    );
    return `${compressed.join(", ")} ${allSuffixes}`;
  }

  function getSqftRange(floorPlans: any[]) {
    if (!Array.isArray(floorPlans) || !floorPlans.length) return null;
    const nums = floorPlans
      .map((fp) => Number(String(fp?.data?.size || "").replace(/[^\d.]/g, "")))
      .filter((n) => !isNaN(n) && n > 0);
    if (!nums.length) return null;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return min === max ? `${min} sqft` : `${min} to ${max} sqft`;
  }

  return (
    <Link href={`/projects/${data.slug}`} className="block">
      <div className="group relative rounded-[20px] overflow-hidden border border-black/20 bg-[#0e0e0f] transition-all duration-350 hover:-translate-y-1 cursor-pointer">
        <div className="relative h-[200px] overflow-hidden">
          {data?.thumbnail ? (
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-600"
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <span className="text-white/20 text-xs">No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/15 via-[#0a0a0b]/10 to-transparent" />
          <div className="absolute top-[10px] left-[10px] text-[10px] font-medium tracking-wide px-[9px] py-[3px] rounded-full bg-black/10 border border-white/15 backdrop-blur-md text-white/85">
            {data.category}
          </div>
        </div>

        <div className="px-[14px] pt-3 pb-[14px]">
          <h2 className="text-[14px] font-semibold text-white mb-[10px] truncate">
            {data.title}
          </h2>

          <div className="grid grid-cols-2 gap-[6px] mb-3">
            <div className="flex items-center gap-[5px] text-[11px] text-white/55">
              <FaBed className="text-yellow-400 text-[11px] shrink-0" />
              <span className="truncate">
                {getBedroomRange(data.floorPlans) || "—"}
              </span>
            </div>
            <div className="flex items-center gap-[5px] text-[11px] text-white/55">
              <FaRulerCombined className="text-yellow-400 text-[11px] shrink-0" />
              <span className="truncate">
                {getSqftRange(data.floorPlans) || "—"}
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-[5px] text-[11px] text-white/55">
              <FaMapMarkerAlt className="text-yellow-400 text-[11px] shrink-0" />
              {/* property.sublocation is a string (may be ID or label depending on API) */}
              <span className="truncate">
                {[
                  
                  data?.subLocation?.name, data.location?.name || data?.subLocation?.name,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-[10px] border-t border-white/7 flex-wrap lg:flex-nowrap">
            <p className="text-[15px] font-semibold text-white">
              <sup className="text-[10px] font-medium text-yellow-400 mr-[2px]">
                AED
              </sup>
              <span className="sm:text-[13px] lg:text-[16px]">
                {Number(data.price || 0).toLocaleString()}
              </span>
            </p>
            <button className="flex items-center gap-1 text-[11px] font-medium text-white/50 border border-white/12 mt-1 lg:mt-0 px-[10px] py-[5px] rounded-[8px] group-hover:text-yellow-400 group-hover:border-yellow-400/40 transition-all">
              Details <FaArrowRight className="text-[9px]" />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-transparent group-hover:border-yellow-400/40 transition duration-500" />
        <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-500 group-hover:w-full" />
        <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-transparent via-yellow-400 to-transparent transition-all duration-500 group-hover:w-full" />
      </div>
    </Link>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="rounded-[20px] overflow-hidden border border-white/10 bg-white/5 animate-pulse">
      <div className="h-[200px] bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
        <div className="h-3 w-1/3 rounded bg-white/10" />
        <div className="h-3 w-3/4 rounded bg-white/10" />
      </div>
    </div>
  );
}
