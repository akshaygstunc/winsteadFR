"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
    FaArrowRight,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTiktok,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";
import memberImg from "../../public/logoo4.webp";
import memberImg2 from "../../public/logoo2.webp";
import memberImg3 from "../../public/logoo5.png";
import memberImg4 from "../../public/logoo1.webp";
import memberImg5 from "../../public/logoo3.png";
import TeamHero from "../components/teams/TeamHero";
import AutoBreadcrumbs from "../components/BreadCrumbs";

type DeveloperCategory =
    | "All"
    | "Luxury"
    | "Residential"
    | "Commercial"
    | "Mixed Use"
    | "International";

type PropertyType =
    | "Apartment"
    | "Villa"
    | "Townhouse"
    | "Penthouse"
    | "Commercial";

type CityFilter =
    | "Dubai"
    | "Abu Dhabi"
    | "Sharjah"
    | "Ras Al Khaimah";

type StatusFilter = "Ready" | "Off Plan" | "New Launch";

type DeveloperTypeFilter =
    | "Master Developer"
    | "Luxury Builder"
    | "Residential Developer"
    | "Mixed Use Developer"
    | "Commercial Builder";

type PriceRangeFilter =
    | "Under AED 1M"
    | "AED 1M - 3M"
    | "AED 3M - 5M"
    | "AED 5M+";

type Developer = {
    id: number;
    name: string;
    type: string;
    category: Exclude<DeveloperCategory, "All">;
    image: StaticImageData;
    experience: string;
    headquarters: string;
    projects: string;
    specializations: string[];
    tags: string[];
    slug: string;
    propertyTypes: PropertyType[];
    cities: CityFilter[];
    status: StatusFilter;
    developerType: DeveloperTypeFilter;
    priceRange: PriceRangeFilter;
    rating: number;
    reviews: string;
};

const tabs: DeveloperCategory[] = [
    "All",
    "Luxury",
    "Residential",
    "Commercial",
    "Mixed Use",
    "International",
];
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[28px] bg-white/5 h-[400px]" />
  );
}

function DevelopersTabsAndGrid() {
    const [activeTab, setActiveTab] = useState<DeveloperCategory>("All");
const [developers, setDevelopers] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/developer-community");
      const data = await res.json();

      const mapped = data.map((item: any, index: number) => ({
        id: index + 1,
        name: item.title,
        type: "Developer",
        category: "Luxury",
        image: item.image || "/logoo4.webp",
        experience: "10+ Years",
        headquarters: item.data?.city || "Dubai",
        projects: "50+ Projects",
        specializations: ["Real Estate"],
        tags: ["Trusted Builder"],
        slug: item.slug,
      }));

      setDevelopers(mapped);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
  const filteredDevelopers = useMemo(() => {
  if (activeTab === "All") return developers;
  return developers.filter((d) => d.category === activeTab);
}, [activeTab, developers]);
    return (
        <section className="px-4 md:px-8 xl:px-10 pb-16 mt-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-3">
                        {tabs.map((tab) => {
                            const active = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-full px-4 py-2 text-sm lg:text-md lg:text-md font-medium transition ${active
                                            ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black"
                                        : "border border-white/10 bg-white/[0.03] text-white hover:border-yellow-500/30 hover:text-white"
                                        }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative max-w-md">
                        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm lg:text-md lg:text-md text-white" />
                        <input
                            type="text"
                            placeholder="Search developers here"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-11 pr-5 text-sm lg:text-md lg:text-md text-white placeholder:text-white outline-none focus:border-yellow-500/30"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
{loading
  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
  : filteredDevelopers.map((developer) => (                        <article
                            key={developer.id}
                            className="group rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-yellow-400/30 hover:shadow-[0_0_40px_rgba(241,220,127,0.08)] transition duration-300"
                        >
                            <div className="relative h-[360px] overflow-hidden">
                                <Image
                                    src={developer.image}
                                    alt={developer.name}
                                    fill
                                    className="object-contain transition duration-700 group-hover:scale-105 filter brightness-10 invert"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-[11px] uppercase tracking-[0.18em] text-yellow-400">
                                    {developer.category}
                                </div>

                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="inline-block px-3 py-1.5 rounded-full bg-black/65 border border-white/10 text-xs text-white backdrop-blur-sm">
                                        {developer.experience}
                                    </p>
                                </div>
                            </div>

                                    <div className="mt-5 text-center">
                                        <a
                                            href={`/developer/${developer.slug}`}
                                            className="line-clamp-2 text-2xl font-semibold text-white transition group-hover:text-yellow-300"
                                        >
                                            {developer.name}
                                        </a>

                                        {/* <div className="mt-3 flex items-center justify-center gap-2 text-sm lg:text-md lg:text-md text-white">
                                            <span className="text-yellow-400">★ {developer.rating.toFixed(1)}</span>
                                            <span>|</span>
                                            <span>{developer.reviews}</span>
                                        </div> */}
                                    </div>

                                    {/* <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white">
                                            {developer.developerType}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white">
                                            {developer.status}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white">
                                            {developer.priceRange}
                                        </span>
                                    </div> */}

                                    {/* <div className="mt-5 space-y-2 text-center text-sm lg:text-md lg:text-md text-white">
                                        <p>{developer.headquarters}</p>
                                        <p>{developer.projects}</p>
                                        <p>{developer.experience}</p>
                                    </div> */}

                                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                                        {developer.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-yellow-500/15 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={`/developer/${developer.slug}`}
                                        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-4 py-3 text-sm lg:text-md lg:text-md font-medium text-black transition hover:scale-[1.02]"
                                    >
                                        View Details
                                    </a>
                                </article>
                            ))}

                            {!filteredDevelopers.length && (
                                <div className="col-span-full rounded-[28px] border border-dashed border-white/10 bg-white/[0.02] p-10 text-center text-white">
                                    No developers found for the selected filters.
                                </div>
                            </div>
                        </article>
                     ))}
                </div>
            </div>
        </section>
    );
}

function DeveloperCTA() {
    return (
        <section className="px-6 md:px-12 pb-20 md:pb-24 bg-black text-white">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-white/[0.03] px-6 md:px-10 py-10 md:py-14">
                    <div className="absolute top-0 left-[10%] h-[220px] w-[220px] rounded-full bg-yellow-500/10 blur-3xl" />
                    <div className="absolute bottom-[-60px] right-[5%] h-[220px] w-[220px] rounded-full bg-yellow-400/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div className="max-w-2xl">
                            <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                                Let’s Connect
                            </p>
                            <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                                Explore the right builder for your next property investment
                            </h3>
                            <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed">
                                Compare leading developers, understand their strengths, and find
                                the best builder portfolio for residential, commercial, or luxury
                                investment opportunities.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black px-6 py-3 rounded-full font-medium hover:scale-[1.03] transition inline-flex items-center gap-2">
                                Contact Us
                                <FaArrowRight className="text-sm" />
                            </button>

                            <button className="border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:border-yellow-400 hover:text-yellow-400 transition">
                                Explore Projects
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function DeveloperPage() {
    return (
        <main className="bg-black text-white">
            <TeamHero />
            <section className="mx-auto max-w-7xl px-4 pt-6 md:px-10">
                <AutoBreadcrumbs />
            </section>
            <DeveloperListingSection />
        </main>
    );
}