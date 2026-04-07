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
import AutoBreadcrumbs from "@/app/components/BreadCrumbs";
import memberImg from "@/public/logoo4.webp";
import memberImg2 from "@/public/logoo2.webp";
import memberImg3 from "@/public/hero1.jpg";
import memberImg4 from "@/public/hero2.png";
import memberImg5 from "@/public/logoo3.png";
import { useParams } from "next/navigation";

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
    about: string;
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
        about:
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
        about:
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
        about:
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
        about:
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
        about:
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
    const params = useParams()
    const developer = developers.find((item) => item.slug === params.slug);

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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(241,220,127,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(185,166,80,0.10),transparent_25%)]" />
                <div className="max-w-7xl mx-auto px-4 md:px-10 pt-6 relative z-10">
                    <AutoBreadcrumbs />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20 relative z-10">
                    <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-center">
                        <div className="relative rounded-[32px] border border-white/10 bg-white/[0.03] p-8 min-h-[420px] flex items-center justify-center overflow-hidden">
                            <div className="absolute top-0 left-0 h-44 w-44 rounded-full bg-yellow-500/10 blur-3xl" />
                            <Image
                                src={developer.image}
                                alt={developer.name}
                                className="object-contain max-h-[300px] w-auto filter brightness-10 invert relative z-10"
                            />
                        </div>

                        <div>
                            <div className="flex flex-wrap gap-3 mb-5">
                                <span className="px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-xs uppercase tracking-[0.22em]">
                                    {developer.category}
                                </span>
                                <span className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/80 text-xs uppercase tracking-[0.22em]">
                                    {developer.type}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                                {developer.name}
                            </h1>

                            <p className="mt-5 max-w-3xl text-white text-base md:text-lg leading-relaxed">
                                {developer.about}
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4 mt-8">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                                    <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                                        <FaClock />
                                        <span>Experience</span>
                                    </div>
                                    <p className="text-lg font-medium">{developer.experience}</p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                                    <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                                        <FaMapMarkerAlt />
                                        <span>Headquarters</span>
                                    </div>
                                    <p className="text-lg font-medium">{developer.headquarters}</p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                                    <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                                        <FaBuilding />
                                        <span>Portfolio</span>
                                    </div>
                                    <p className="text-lg font-medium">{developer.projects}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-8">
                                <Link
                                    href="#properties"
                                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black px-6 py-3 font-medium"
                                >
                                    View Projectre Projects
                                    <FaArrowRight className="text-sm" />
                                </Link>

                                <Link
                                    href="/contact-us"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-white hover:border-yellow-400 hover:text-yellow-400 transition"
                                >
                                    Contact Us
                                </Link>
                            </div>

                            {/* <div className="flex gap-3 mt-8">
                                {socialIcons.map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-11 h-11 rounded-full border border-yellow-500/40 flex items-center justify-center text-yellow-400 hover:bg-yellow-500 hover:text-black transition"
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-10 py-16 md:py-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
                    <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            Developer Details
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                            About {developer.name}
                        </h2>
                        <p className="text-white leading-relaxed text-base md:text-lg">
                            {developer.about}
                        </p>

                        <div className="mt-8">
                            <p className="text-sm uppercase tracking-[0.22em] text-white mb-4">
                                Specializations
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {developer.specializations.map((item) => (
                                    <span
                                        key={item}
                                        className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm uppercase tracking-[0.22em]  mb-4">
                                Highlights
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {developer.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-sm text-yellow-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            Quick Info
                        </p>

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white/35 mb-1">
                                    Developer Name
                                </span>
                                <span className="text-white font-medium">{developer.name}</span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white/35 mb-1">
                                    Category
                                </span>
                                <span className="text-white font-medium">{developer.category}</span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white/35 mb-1">
                                    Developer Type
                                </span>
                                <span className="text-white font-medium">{developer.type}</span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white/35 mb-1">
                                    Portfolio Size
                                </span>
                                <span className="text-white font-medium">{developer.projects}</span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <span className="block text-xs uppercase tracking-[0.18em] text-white/35 mb-1">
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
                            <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                                Properties
                            </p>
                            <h2 className="text-3xl md:text-5xl font-semibold">
                                Properties by {developer.name}
                            </h2>
                        </div>

                        <p className="text-white/60 max-w-2xl">
                            Explore selected properties associated with this developer, including
                            residential, luxury, and investment-driven opportunities.
                        </p>
                    </div>

                    {developerProperties.length > 0 ? (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {developerProperties.map((property) => (
                                <article
                                    key={property.id}
                                    className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] transition hover:border-yellow-400/30"
                                >
                                    <div className="relative h-[260px] overflow-hidden">
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-cover transition duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs text-yellow-400">
                                            {property.type}
                                        </div>
                                    </div>

                                    <div className="p-5 md:p-6">
                                        <h3 className="text-2xl font-semibold">{property.title}</h3>
                                        <p className="text-white/55 mt-2">{property.location}</p>

                                        <div className="mt-5 flex items-center justify-between gap-3">
                                            <div>
                                                <span className="block text-xs uppercase tracking-[0.18em] text-white/35 mb-1">
                                                    Starting From
                                                </span>
                                                <span className="text-lg font-medium text-yellow-400">
                                                    {property.startingPrice}
                                                </span>
                                            </div>

                                            <Link
                                                href={`/projects/${property.slug}`}
                                                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-5 py-2.5 text-sm font-medium text-black"
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
                            <p className="text-white/55">
                                Once properties are mapped with this developer, they can be shown here.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}