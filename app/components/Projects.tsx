"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import image1 from "../../public/image_7.png";
import image2 from "../../public/image_5.png";
import image3 from "../../public/image_6.png";
import WebsiteContentService from "../services/websitecontent.service";
import Link from "next/link";

const images = [image1, image2, image1, image2, image3, image1, image2];

type CategoryItem = {
  _id: string;
  title: string;
};

type ProjectItem = {
  _id?: string;
  title?: string;
  location?: string;
  price?: string | number;
  thumbnail?: string;
  category?: string;
  categoryId?: string;
  vendor?: string;
  developer?: string;
  builder?: string;
  data?: {
    category?: string;
    categoryId?: string;
    vendor?: string;
    developer?: string;
    builder?: string;
    location?: string;
    price?: string | number;
  };
};

function FeaturedProjects({
  activeFilter,
  setActiveFilter,
  selectedVendor,
  setSelectedVendor,
}: {
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  selectedVendor: string;
  setSelectedVendor: (value: string) => void;
}) {
  const [vendorOpen, setVendorOpen] = useState(false);
  const [vendors, setVendors] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedVendorname, setSelectedVendorname] = useState("");
  useEffect(() => {
    async function fetchCategories() {
      try {
        setCategoriesLoading(true);
        const response = await WebsiteContentService.getCategory();
        const developers = await WebsiteContentService.getDevelopers();
        setVendors(developers)
        const filtercat = response?.filter((item) => item.title !== "Ultra Luxury")
        setCategories(filtercat || []);
      } catch (error) {
        console.error("Error fetching project categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleMainFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter !== "Vendor") {
      setSelectedVendor("");
      setVendorOpen(false);
    }
  };

  const handleVendorSelect = (vendor: string) => {
    setSelectedVendor(vendor._id);
    setSelectedVendorname(vendor.title);

    setActiveFilter("Vendor");
    setVendorOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-1">
      <div>
        <h2 className="bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent text-3xl md:text-4xl font-semibold">
          Featured Projects
        </h2>
        <p className="text-lg text-white text-[.95rem] mt-5 mb-5 max-w-xl">
          Discover exceptional properties with Winstead in premium locations worldwide.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 relative">
        <button
          onClick={() => handleMainFilter("All")}
          className={`text-[1.05rem] px-4 py-2 text-sm mb-2 lg:text-md rounded-lg border transition ${activeFilter === "All"
            ? "bg-yellow-500 text-black border-yellow-500"
            : "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            }`}
        >
          All
        </button>

        {categoriesLoading
          ? Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-[44px] w-[100px] rounded-lg border border-white/10 bg-white/10 animate-pulse"
            />
          ))
          : categories?.map((category) => (
            <button
              key={category._id}
              onClick={() => handleMainFilter(category._id)}
              className={`text-[1.05rem] mb-2 px-4 py-2 text-sm lg:text-md rounded-lg border transition ${activeFilter === category._id
                ? "bg-yellow-500 text-black border-yellow-500"
                : "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                }`}
            >
              {category.title}
            </button>
          ))}

        <div className="relative">
          <button
            onClick={() => {
              setVendorOpen((prev) => !prev);
              // setActiveFilter("Vendor");
            }}
            className={`text-[1.05rem] mb-2 px-4 py-2 text-sm lg:text-md rounded-lg border transition flex items-center gap-2 ${activeFilter === "Vendor"
              ? "bg-yellow-500 text-black border-yellow-500"
              : "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              }`}
          >
            {selectedVendorname || "Developer"}
            <span className="text-xs">▼</span>
          </button>

          {vendorOpen && (
            <div className="absolute right-0 mt-2 min-w-[180px] bg-black border border-yellow-500/30 rounded-lg shadow-lg z-50 overflow-hidden">
              {vendors?.map((vendor) => (
                <button
                  key={vendor._id}
                  onClick={() => handleVendorSelect(vendor)}
                  className="text-[1.05rem] block w-full text-left px-4 py-2 text-sm lg:text-md text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
                >
                  {vendor?.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects = [], homePage }: any) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState("");

  useEffect(() => {
    setLoading(!projects);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];

    // STEP 1: Normalize
    const normalized = projects.map((project) => {
      const category =
        Array.isArray(project.type)
          ? project.type
          : project.type
            ? [project.type]
            : [];

      const vendor =
        project.vendor ||
        project.developer ||
        project.builder ||
        project.data?.vendor ||
        project.data?.developer ||
        project.data?.builder ||
        "";

      const featured =
        project.featured ??
        project.data?.featured ??
        false;

      return {
        ...project,
        _category: category,
        _vendor: String(vendor).toLowerCase(),
        _sortOrder: Number(project.sortOrder || project.data?.sortOrder || 0),
        _featured: Boolean(featured),
      };
    });

    // ✅ STEP 2: ONLY FEATURED
    let filtered = normalized.filter((p) => p._featured === true);

    // ✅ ⭐ SPECIAL CASE: ALL → return everything (sorted)
    if (activeFilter === "All") {
      return filtered.sort((a, b) => a._sortOrder - b._sortOrder);
    }

    // ✅ STEP 3: Apply filters
    if (activeFilter === "Vendor" && selectedVendor) {
      filtered = filtered.filter(
        (p) => p._vendor === selectedVendor.toLowerCase()
      );
    } else {
      filtered = filtered.filter((p) =>
        p._category?.includes(String(activeFilter))
      );
    }

    // ✅ STEP 4: Sort
    filtered.sort((a, b) => a._sortOrder - b._sortOrder);

    // ✅ STEP 5: Limit 6 per category
    const grouped: Record<string, typeof filtered> = {};

    filtered.forEach((p) => {
      if (!grouped[p._category]) {
        grouped[p._category] = [];
      }

      if (grouped[p._category].length < 6) {
        grouped[p._category].push(p);
      }
    });

    return Object.values(grouped).flat();

  }, [projects, activeFilter, selectedVendor]);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.from(".card", {
        opacity: 0,
        y: 100,
        scale: 0.95,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, filteredProjects]);

  useEffect(() => {
    if (Array.isArray(projects)) {
      setLoading(false);
    }
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[85rem] relative px-6 md:px-10 pt-44 md:pt-40 pb-20 bg-black text-white"
    >
      <section className="bg-black text-white py-16">
        <div className="grid md:grid-cols-[30%_70%] gap-10 items-center">
          {loading ? (
            <>
              <div className="w-full h-[200px] md:h-[300px] rounded-xl bg-white/10 animate-pulse" />

              <div className="max-w-7xl space-y-4">
                <div className="h-10 w-56 rounded bg-white/10 animate-pulse" />
                <div className="h-5 w-full rounded bg-white/10 animate-pulse" />
                <div className="h-5 w-11/12 rounded bg-white/10 animate-pulse" />
                <div className="h-5 w-10/12 rounded bg-white/10 animate-pulse" />
                <div className="h-5 w-9/12 rounded bg-white/10 animate-pulse mt-4" />
                <div className="h-5 w-8/12 rounded bg-white/10 animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <div>
               <Image
    src={
      homePage?.data?.aboutWinsteadImage ||
      image2
    }
    alt="About"
    width={600}
    height={400}
    className="w-full h-[150px] md:h-[300px] object-cover rounded-xl"
  />

              </div>

              <div className="max-w-7xl">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
    {homePage?.data?.aboutWinsteadTitle || "About Winstead"}
                </h3>

                <p className="text-lg text-gray-300 leading-relaxed">
                    {homePage?.data?.aboutWinsteadDescription?.slice(0, 361) ||
      "Our extensive portfolio features an array of premium villas, apartments, and townhouses designed to offer unmatched comfort and elegance."}<br/>
      <div className="mt-4">
                    <Link href="/about-us" className="bg-gradient-to-r from-yellow-300 to-yellow-600 py-3 px-4 rounded-xl text-black text-sm">Read More </Link>
                    </div> </p>

                {/* <p className="text-gray-300 mt-4 leading-relaxed">
                  Our team of experienced professionals is dedicated to helping
                  you find the perfect home that exceeds your expectations.
                </p> */}
              </div>
            </>
          )}
        </div>
      </section>

      <FeaturedProjects
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedVendor={selectedVendor}
        setSelectedVendor={setSelectedVendor}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] animate-pulse"
            >
              <div className="w-full h-full min-h-[300px] bg-white/10 relative">
                <div className="absolute bottom-0 p-5 w-full space-y-3">
                  <div className="h-6 w-2/3 rounded bg-white/10" />
                  <div className="h-4 w-24 rounded bg-white/10" />
                  <div className="h-4 w-32 rounded bg-white/10" />
                  <div className="h-9 w-28 rounded-md bg-white/10 mt-3" />
                </div>
              </div>
            </div>
          ))
        ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
            <div key={project._id || i} className="card">
              <Card
                image={project.thumbnail}
                title={project.title}
                location={project.location || project.data?.location}
                price={project.price || project.data?.price}
                slug={project?.slug}
              />
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-3 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-white">
            No projects found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}

function Card({
  image,
  title,
  location,
  price,
  slug
}: {
  image?: string;
  title?: string;
  location?: string;
  price?: string | number;
  slug: string
}) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2">
      <img
        src={image || (images[0] as any).src}
        alt="project"
        className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent group-hover:border-yellow-400/40 transition duration-500" />
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-500 group-hover:w-full" />
      <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-transparent via-yellow-400 to-transparent transition-all duration-500 group-hover:w-full" />

      <div className="absolute bottom-0 p-5 w-full transition duration-500 group-hover:translate-y-[-4px]">
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>

        <div className="text-[1.15rem] md:text-sm lg:text-md text-white mt-2 space-y-1 opacity-90">
          <p className="text-[1.05rem]">AED {price?.toLocaleString()}</p>
          <p className="text-[1.05rem]">{location}</p>
        </div>

        <Link href={`/projects/${slug}`} className="mt-4 text-xs md:text-sm lg:text-md border border-yellow-500 px-4 py-1.5 rounded-md opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
          Check Details
        </Link>
      </div>
    </div>
  );
}