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
import Banner from "@/public/hero1.jpg"
import { useParams } from "next/navigation";
import ReadMoreSlider from "@/app/components/ReadMoreSlider";
import { useEffect, useState } from "react";
import WebsiteContentService from "@/app/services/websitecontent.service";

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
            const res = await WebsiteContentService.GetDeveloperCommunities(params.slug);

            console.log(res)
            setProjects(res); // 👈 DIRECT set (no filter)
        };

        fetchProjects();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/backend/developer-community");
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
    if (loading) {
        return (
            <main className="min-h-screen bg-black text-white">
                <section className="px-6 md:px-10 py-16 md:py-20 animate-pulse">
                    <div className="mx-auto max-w-7xl">
                        {/* Breadcrumb shimmer */}
                        <div className="h-4 w-40 rounded-full bg-white/5" />

                        {/* Heading shimmer */}
                        <div className="mt-10 max-w-4xl space-y-5">
                            <div className="h-4 w-44 rounded-full bg-[#D4AF37]/20" />
                            <div className="h-14 w-[420px] rounded-xl bg-white/10" />
                            <div className="h-5 w-full max-w-3xl rounded-xl bg-white/5" />
                            <div className="h-5 w-2/3 rounded-xl bg-white/5" />
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-10 pb-24">
                    <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]"
                            >
                                {/* image shimmer */}
                                <div className="h-[300px] bg-white/5" />

                                {/* content shimmer */}
                                <div className="space-y-4 p-6">
                                    <div className="h-3 w-24 rounded-full bg-[#D4AF37]/20" />
                                    <div className="h-8 w-3/4 rounded-xl bg-white/10" />
                                    <div className="h-4 w-1/2 rounded-xl bg-white/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        );
    }

    if (!developer) return null;

    const developerProperties = properties.filter(
        (item) => item.developerSlug === developer.slug
    );

    return (
        <main className="bg-black text-white">
            <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black text-white">

                {/* IMAGE */}
                <div className="absolute inset-0">
                    <Image
                        src={developer?.data?.banner || Banner} alt="Winstead Services"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>

                {/* OVERLAY (only for readability, not full dark) */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" /> */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                {/* CONTENT (BOTTOM LEFT ONLY) */}


                {/* BOTTOM GOLD LINE */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />

            </section>
            <section className="px-6 md:px-10 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <AutoBreadcrumbs />

                    {/* Heading */}
                    <div className="mt-10 max-w-4xl">
                        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
                            Our Communities
                        </p>

                        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
                            {developer.name}
                        </h1>

                        <p className="mt-5 text-lg leading-relaxed text-white">
                            Discover master-planned luxury communities crafted by{" "}
                            {developer.name}, where lifestyle, architecture, and long-term
                            investment value come together in Dubai’s most desirable locations.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-10 pb-24">
                <div className="mx-auto max-w-7xl">
                    {projects?.communities?.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {projects?.communities?.map((property) => (
                                <Link
                                    key={property._id}
                                    href={`/projects/${developer.slug}/${property.slug}`}
                                    className="group block overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] transition duration-500 hover:border-[#D4AF37]/40 hover:bg-white/[0.05]"
                                >
                                    {/* Image */}
                                    <div className="relative h-[300px] overflow-hidden">
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-cover transition duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                        <div className="absolute bottom-5 left-5 right-5">
                                            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                                                Community
                                            </p>

                                            <h3 className="mt-2 text-2xl font-semibold text-white">
                                                {property.title}
                                            </h3>

                                            <p className="mt-2 text-sm text-white/75">
                                                {property.data?.city || property.location || "Dubai"}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                            <div className="rounded-[30px] border border-dashed border-white/10 bg-white/[0.02] py-20 text-center">
                                <h3 className="text-2xl font-semibold text-white">
                                    No communities available
                                </h3>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}