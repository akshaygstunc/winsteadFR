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
        <section className="bg-black text-white px-6 md:px-12 py-16 md:py-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            Explore Developers & Builders
                        </p>
                        <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
                            Discover trusted
                            <span className="text-yellow-400"> developers and builders</span>
                        </h2>
                    </div>

                    <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
                        Browse leading real estate developers, builders, and project creators
                        by category to find the right development partner, brand strength,
                        and project portfolio.
                    </p>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;

                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm border transition ${isActive
                                    ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black border-transparent"
                                    : "border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/40 hover:text-white"
                                    }`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                <div className="mb-8 text-sm text-white/60">
                    Showing{" "}
                    <span className="text-yellow-400 font-medium">
                        {filteredDevelopers.length}
                    </span>{" "}
                    developer{filteredDevelopers.length !== 1 ? "s" : ""}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                        : filteredDevelopers.map((developer) => (

                            <Link href={`/developer/${developer.slug}`}>

                                <article
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

                                    <div className="p-5 md:p-6">
                                        <h3 className="text-2xl font-semibold leading-tight">
                                            {developer.name}
                                        </h3>

                                        {/* <div className="flex gap-3 mt-6">
                                            {[FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn, FaWhatsapp, FaYoutube].map(
                                                (Icon, i) => (
                                                    <a
                                                        key={i}
                                                        href="#"
                                                        className="w-10 h-10 rounded-full border border-yellow-500/60 flex items-center justify-center text-yellow-400 text-xl hover:bg-yellow-500 hover:text-black transition duration-300"
                                                    >
                                                        <Icon />
                                                    </a>
                                                )
                                            )}
                                        </div> */}

                                        <p className="text-white/55 mt-2 text-sm md:text-base">
                                            {developer.type}
                                        </p>

                                        <div className="mt-5 grid grid-cols-1 gap-3 text-sm">
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                                <span className="block text-white/40 text-xs uppercase tracking-[0.18em] mb-1">
                                                    Headquarters
                                                </span>
                                                <span className="text-white">{developer.headquarters}</span>
                                            </div>

                                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                                <span className="block text-white/40 text-xs uppercase tracking-[0.18em] mb-1">
                                                    Portfolio
                                                </span>
                                                <span className="text-white">{developer.projects}</span>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <p className="text-xs uppercase tracking-[0.18em] text-white/35 mb-3">
                                                Specializations
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {developer.specializations.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-5">
                                            {developer.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
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