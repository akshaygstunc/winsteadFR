"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
    FaArrowRight,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaWhatsapp,
    FaYoutube,
    FaTiktok,
    FaMapMarkerAlt,
    FaBuilding,
    FaClock,
} from "react-icons/fa";
import bannerImg from "../../../public/hero1.jpg"
import AutoBreadcrumbs from "@/app/components/BreadCrumbs";
import memberImg from "@/public/logoo4.webp";
import memberImg2 from "@/public/logoo2.webp";
import memberImg3 from "@/public/hero1.jpg";
import memberImg4 from "@/public/hero2.png";
import memberImg5 from "@/public/logoo3.png";
import { useParams } from "next/navigation";
import ReadMoreSlider from "@/app/components/ReadMoreSlider";
import { useEffect, useState } from "react";

type DeveloperCategory =
    | "Luxury"
    | "Residential"
    | "Commercial"
    | "Mixed Use"
    | "International";

type Developer = {
    id: number;
    name: string;
    type: string;
    category: DeveloperCategory;
    image: StaticImageData;
    experience: string;
    headquarters: string;
    projects: string;
    specializations: string[];
    tags: string[];
    slug: string;
    description: string;
};

type Property = {
    id: number;
    title: string;
    slug: string;
    image: StaticImageData;
    location: string;
    type: string;
    startingPrice: string;
    developerSlug: string;
};

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
        description:
            "Emaar Developments is known for delivering premium communities, landmark residences, and high-value investment opportunities across prime locations. Their portfolio reflects strong design standards, brand trust, and consistent end-user and investor demand.",
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
        description:
            "Damac Properties focuses on luxury living, branded residences, and high-end urban communities. The brand is widely recognized for premium developments designed for both lifestyle buyers and investors.",
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
        slug: "omniyat",
        description:
            "Omniyat is positioned as a premium residential-focused developer with a strong emphasis on quality construction, elegant architecture, and long-term community value.",
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
        slug: "aldar-properties",
        description:
            "Aldar Properties develops mixed-use destinations that combine residential, lifestyle, and commercial value. Their projects are often positioned around community living and urban convenience.",
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
        description:
            "Meraas is known for creating modern destinations that blend residential, commercial, and lifestyle elements into strong city-driven developments.",
    },
];

const properties: Property[] = [
    {
        id: 1,
        title: "Dubai Marina Heights",
        slug: "dubai-marina-heights",
        image: memberImg,
        location: "Dubai Marina",
        type: "Apartment",
        startingPrice: "AED 1.2M",
        developerSlug: "emaar-developments",
    },
    {
        id: 2,
        title: "Palm Elite Residences",
        slug: "palm-elite-residences",
        image: memberImg2,
        location: "Palm Jumeirah",
        type: "Luxury Residence",
        startingPrice: "AED 3.8M",
        developerSlug: "emaar-developments",
    },
    {
        id: 3,
        title: "Canal View Towers",
        slug: "canal-view-towers",
        image: memberImg3,
        location: "Business Bay",
        type: "Apartment",
        startingPrice: "AED 980K",
        developerSlug: "damac-properties",
    },
    {
        id: 4,
        title: "Skyline Villas",
        slug: "skyline-villas",
        image: memberImg4,
        location: "Dubai Hills",
        type: "Villa",
        startingPrice: "AED 2.9M",
        developerSlug: "damac-properties",
    },
    {
        id: 5,
        title: "Urban Park Residences",
        slug: "urban-park-residences",
        image: memberImg5,
        location: "JVC",
        type: "Residential",
        startingPrice: "AED 850K",
        developerSlug: "omniyat",
    },
];

const socialIcons = [
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaLinkedinIn,
    FaWhatsapp,
    FaYoutube,
];

export default function DeveloperDetailsPage() {
    const params = useParams();
    const [developer, setDeveloper] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


console.log("PROJECT:", projects);

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch("/api/communities");
            const data = await res.json();

            setProjects(data); // 👈 DIRECT set (no filter)
        };

        fetchProjects();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/developer-community");
            const data = await res.json();

            const found = data.find(
                (item: any) => item.slug === params.slug
            );

            // 🔥 MAP API → UI FORMAT
            const mapped = found
                ? {
                    name: found.title,
                    image: found.image || "/logoo4.webp",
                    category: "Luxury",
                    type: "Developer",
                    headquarters: found.data?.city || "Dubai",
                    projects: "50+ Projects",
                    specializations: ["Real Estate"],
                    tags: ["Trusted Builder"],
                    slug: found.slug,
                    description: found.description || "No description available",
                }
                : null;

            setDeveloper(mapped);
            setLoading(false);
        };

        fetchData();
    }, [params.slug]);
    if (!developer) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold mb-3">Developer not found</h1>
                    <p className="text-white mb-6">
                        The developer profile you are looking for does not exist.
                    </p>
                    <Link
                        href="/developers"
                        className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-6 py-3 text-black font-medium"
                    >
                        Back to Developers
                    </Link>
                </div>
            </main>
        );
    }

    const developerProperties = properties.filter(
        (item) => item.developerSlug === developer.slug
    );

    return (
        <main className="bg-black text-white">
            <section className="relative overflow-hidden border-b border-white/10">
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(241,220,127,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(185,166,80,0.10),transparent_25%)]" /> */}


                <div className="relative h-[65vh] min-h-[420px] overflow-hidden ">
                    {/* Background Image */}
                    <Image
                        src={bannerImg || developer.image}
                        alt={developer.name}
                        fill
                        priority
                        className="object-cover"
                    />

                    {/* Dark overlays for luxury feel */}
                    {/* <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(250,204,21,0.10),transparent_28%)]" /> */}

                    {/* Content */}
                    <div className="  h-full max-w-[80rem] mx-auto   mt-[80px]">
                        <div className="flex h-full items-end md:items-center">
                            <div className="flex flex-col items-center gap-5 md:gap-7 rounded-[28px] bg-black/25 backdrop-blur-xl px-3   md:py-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                                {/* Logo */}
                                <div className=" h-[50px] w-[50px] md:h-[110px] md:w-[110px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                                    <Image
                                        src={developer.image}
                                        alt={developer.name}
                                        fill
                                        className="object-contain p-6 filter brightness-0 invert"
                                    />
                                </div>
                                {/* <h6 className="text-sm  leading-tight text-white">
                                    {developer.name}
                                </h6> */}
                                {/* Name only */}

                            </div>
                        </div>
                        <div>


                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-10 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-10 py-2  relative z-10">
                    <AutoBreadcrumbs />
                </div>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
                    <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                        <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            Developer Details
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                            About {developer.name}
                        </h2>
                        <p className="text-white leading-relaxed text-base md:text-lg">
                            <ReadMoreSlider description={developer.about} heading="About" />
                        </p>

                        <div className="mt-8">
                            <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.22em] text-white mb-4">
                                Specializations
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {developer.specializations.map((item) => (
                                    <span
                                        key={item}
                                        className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm lg:text-md lg:text-md text-white"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.22em]  mb-4">
                                Highlights
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {developer.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-sm lg:text-md lg:text-md text-yellow-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                        <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            Quick Info
                        </p>

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white mb-1">
                                    Developer Name
                                </span>
                                <span className="text-white font-medium">{developer.name}</span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white mb-1">
                                    Category
                                </span>
                                <span className="text-white font-medium">{developer.category}</span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white mb-1">
                                    Developer Type
                                </span>
                                <span className="text-white font-medium">{developer.type}</span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white mb-1">
                                    Portfolio Size
                                </span>
                                <span className="text-white font-medium">{developer.projects}</span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white mb-1">
                                    Headquarters
                                </span>
                                <span className="text-white font-medium">{developer.headquarters}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="properties" className="px-6 md:px-10 pb-20 md:pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                        <div>
                            <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                                Properties
                            </p>
                            <h2 className="text-3xl md:text-5xl font-semibold">
                                Properties by {developer.name}
                            </h2>
                        </div>

                        <p className="text-white max-w-2xl">
                            Explore selected properties associated with this developer, including
                            residential, luxury, and investment-driven opportunities.
                        </p>
                    </div>

                    {projects.length > 0 ? (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {projects.map((property) => (
                                <article
                                    key={property._id}
                                    className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] transition hover:border-yellow-400/30"
                                >
                                    <div className="relative h-[260px] overflow-hidden">
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-contain transition duration-700 group-hover:scale-105 brightness-90 filter bg-white"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs text-yellow-400">
                                            {property.type}
                                        </div>
                                    </div>

                                    <div className="p-5 md:p-6">
                                        <h3 className="text-2xl font-semibold">{property.title}</h3>
                                        <p className="text-white mt-2">{property.location}</p>
<p className="text-white mt-2">
  {property.data?.city || "Dubai"}
</p>
                                        <div className="mt-5 flex items-center justify-between gap-3">
                                            <div>
                                                <span className="block text-xs uppercase tracking-[0.18em] text-white mb-1">
                                                    Starting From
                                                </span>
                                                <span className="text-lg font-medium text-yellow-400">
                                                    {property.startingPrice}
                                                </span>
                                            </div>

                                            <Link
 href={`/projects/${developer.slug}/${property.slug}`}                                                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-5 py-2.5 text-sm lg:text-md lg:text-md font-medium text-black"
                                            >
                                                View Project
                                                <FaArrowRight className="text-xs" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
                            <h3 className="text-2xl font-semibold mb-2">No properties added yet</h3>
                            <p className="text-white">
                                Once properties are mapped with this developer, they can be shown here.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}