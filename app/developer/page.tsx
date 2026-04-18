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
import memberImg6 from "../../public/female2.png";
import TeamHero from "../components/teams/TeamHero";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import Link from "next/link";
import WebsiteContentService from "../services/websitecontent.service";
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
function SkeletonCard() {
    return (
        <div className="animate-pulse rounded-[28px] bg-white/5 h-[400px]" />
    );
}

function DevelopersTabsAndGrid({ teamData }: { teamData: any[] }) {
    const [activeTab, setActiveTab] = useState<DeveloperCategory>("All");
    const [developers, setDevelopers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/backend/developer-community");
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
        <section className="relative bg-[#050505] text-white px-6 md:px-12 py-20 overflow-hidden">
            {/* Luxury background glows */}
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.08),transparent_40%)]" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-14 md:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    <div className="max-w-3xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-4 font-medium">
                            Elite Developer Collection
                        </p>

                        <h2 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
                            Discover world-class
                            <span className="block bg-[linear-gradient(90deg,#B8860B,#FFD700,#FFF2B2,#B8860B)] bg-clip-text text-transparent">
                                luxury developers & builders
                            </span>
                        </h2>
                    </div>

                    <p className="text-white text-sm md:text-lg max-w-xl leading-relaxed">
                        Explore globally trusted real estate developers known for exceptional
                        architecture, premium communities, and high-value investment
                        portfolios curated for luxury living.
                    </p>
                </div>

                {/* Premium Tabs */}
                {/* <div className="flex gap-3 overflow-x-auto pb-4 mb-12 scrollbar-hide">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;

                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative whitespace-nowrap rounded-full px-6 py-3 text-sm tracking-wide border transition-all duration-300 ${isActive
                                    ? "bg-[linear-gradient(90deg,#8B6B1F,#D4AF37,#FFF2B2,#8B6B1F)] text-black border-transparent shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                                    : "border-[#D4AF37]/20 bg-white/[0.02] text-white/80 hover:border-[#D4AF37]/60 hover:text-white"
                                    }`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div> */}

                {/* Count */}
                <div className="mb-10 text-sm text-white/60 tracking-wide">
                    Showcasing{" "}
                    <span className="text-[#FFD700] font-semibold text-base">
                        {filteredDevelopers.length}
                    </span>{" "}
                    premium developer{filteredDevelopers.length !== 1 ? "s" : ""}
                </div>

                {/* Luxury Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                        : filteredDevelopers.map((developer) => (
                            <Link
                                key={developer.id}
                                href={`/developer/${developer.slug}`}
                                className="group"
                            >
                                <article className="rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-xl hover:border-[#FFD700]/50 hover:shadow-[0_0_30px_rgba(255,215,0,0.12)] transition-all duration-300 p-6 flex items-center gap-5">

                                    {/* Logo */}
                                    <div className="relative w-20 h-20 min-w-[64px] rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
                                        <Image
                                            src={developer.image}
                                            alt={developer.name}
                                            fill
                                            className="object-contain p-2 bg-white"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-semibold leading-tight group-hover:text-[#FFD700] transition">
                                            {developer.name}
                                        </h3>

                                        <p className="text-white text-md mt-1">
                                            {developer.type}
                                        </p>

                                        {/* Projects */}
                                        <div className="mt-3 text-md">
                                            <span className="text-white">Projects: </span>
                                            <span className="text-white font-medium">
                                                {developer.projects}
                                            </span>
                                        </div>
                                    </div>

                                </article>
                            </Link>
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
    const [developersData, setDevelopersData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await WebsiteContentService.getDeveloperPage();
                console.log(res)
                setDevelopersData(res);
                setLoading(false);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    
    return (
        <main className="bg-black text-white">
            <TeamHero teamData={developersData} />
            <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
                <AutoBreadcrumbs />
            </section>
            <DevelopersTabsAndGrid teamData={developersData} />
            {/* <DeveloperCTA /> */}
        </main>
    );
}