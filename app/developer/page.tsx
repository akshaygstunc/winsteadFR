"use client";

import Image, { StaticImageData } from "next/image";
import { useMemo, useState } from "react";
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
import memberImg6 from "../../public/female2.png";
import TeamHero from "../components/teams/TeamHero";
import AutoBreadcrumbs from "../components/BreadCrumbs";

type DeveloperCategory =
    | "All"
    | "Luxury"
    | "Residential"
    | "Commercial"
    | "Mixed Use"
    | "International";

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
};

const tabs: DeveloperCategory[] = [
    "All",
    "Luxury",
    "Residential",
    "Commercial",
    "Mixed Use",
    "International",
];

const developers: Developer[] = [
    {
        id: 1,
        name: "Emaar Developments",
        type: "Master Developer",
        category: "Luxury",
        image: memberImg,
        experience: "15+ Years in Market",
        headquarters: "Dubai, UAE",
        projects: "120+ Projects",
        specializations: ["Luxury Communities", "Waterfront Towers", "Branded Residences"],
        tags: ["Premium Developer", "High ROI", "Trusted Builder"],
        slug: "emaar-developments",
    },
    {
        id: 2,
        name: "Damac Properties",
        type: "Luxury Builder",
        category: "Luxury",
        image: memberImg2,
        experience: "20+ Years in Market",
        headquarters: "Dubai, UAE",
        projects: "90+ Projects",
        specializations: ["Golf Communities", "Luxury Apartments", "Villas"],
        tags: ["Investor Choice", "Luxury Living", "Prime Locations"],
        slug: "damac-properties",
    },
    {
        id: 3,
        name: "Omniyat",
        type: "Residential Developer",
        category: "Residential",
        image: memberImg3,
        experience: "18+ Years in Market",
        headquarters: "Dubai, UAE",
        projects: "70+ Projects",
        specializations: ["Apartments", "Family Communities", "Quality Construction"],
        tags: ["Premium Finish", "Residential Focus", "End User Friendly"],
        slug: "sobha-realty",
    },
    {
        id: 4,
        name: "Aldar Properties",
        type: "Mixed Use Developer",
        category: "Mixed Use",
        image: memberImg4,
        experience: "22+ Years in Market",
        headquarters: "Dubai, UAE",
        projects: "60+ Projects",
        specializations: ["Communities", "Retail", "Waterfront Developments"],
        tags: ["Community Builder", "Iconic Projects", "Dubai Landmarks"],
        slug: "nakheel",
    },
    {
        id: 5,
        name: "Meraas",
        type: "Commercial & Residential Builder",
        category: "Commercial",
        image: memberImg5,
        experience: "12+ Years in Market",
        headquarters: "Dubai, UAE",
        projects: "45+ Projects",
        specializations: ["Urban Destinations", "Retail Spaces", "Lifestyle Communities"],
        tags: ["Lifestyle Focus", "Commercial Spaces", "Modern Design"],
        slug: "meraas",
    },
];

function DevelopersTabsAndGrid() {
    const [activeTab, setActiveTab] = useState<DeveloperCategory>("All");

    const [search, setSearch] = useState("");

    const filteredDevelopers = useMemo(() => {
        const base =
            activeTab === "All"
                ? developers
                : developers.filter((developer) => developer.category === activeTab);

        return base.filter((developer) =>
            `${developer.name} ${developer.type} ${developer.headquarters} ${developer.category}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [activeTab, search]);

    return (
        <div className="ml-20 mr-20 mx-auto space-y-4 mt-4 mb-8">
            <div className="mb-6 ">
                <input
                    type="text"
                    placeholder="Search developers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-[360px] rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-yellow-400/40"
                />
            </div>
            {filteredDevelopers.map((developer) => (
                <article
                    key={developer.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 md:px-6 py-4 hover:border-yellow-400/30 transition"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-white">
                                <Image
                                    src={developer.image}
                                    alt={developer.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="text-lg md:text-xl font-semibold text-white">
                                        {developer.name}
                                    </h3>
                                    <span className="px-2 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                        {developer.category}
                                    </span>
                                </div>

                                <p className="text-sm text-white/55">{developer.type}</p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {developer.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/80"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:min-w-[420px]">
                            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/35 mb-1">
                                    HQ
                                </span>
                                <span className="text-sm text-white">{developer.headquarters}</span>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/35 mb-1">
                                    Projects
                                </span>
                                <span className="text-sm text-white">{developer.projects}</span>
                            </div>

                            <div className="flex items-center">
                                <a
                                    href={`/developer/${developer.slug}`}
                                    className="w-full text-center rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black px-4 py-2.5 text-sm font-medium hover:scale-[1.02] transition"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
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
            <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
                                        <AutoBreadcrumbs />
                                      </section>
            <DevelopersTabsAndGrid />
            {/* <DeveloperCTA /> */}
        </main>
    );
}