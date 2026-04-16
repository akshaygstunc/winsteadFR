"use client";

import AutoBreadcrumbs from "@/app/components/BreadCrumbs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Property = {
    id: number;
    title: string;
    location: string;
    price: string;
    beds: string;
    image: string;
    href?: string;
};

type Feature = {
    title: string;
    description: string;
};

type Stat = {
    value: string;
    label: string;
};

type NearbyPlace = {
    time: string;
    label: string;
};

type FAQ = {
    question: string;
    answer: string;
};

const communityData = {
    eyebrow: "Exclusive Community",
    title: "Dubai Creek Harbour",
    subtitle:
        "A refined waterfront destination where modern architecture, serene landscapes, and elevated living come together.",
    heroImage:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1600&auto=format&fit=crop",
    overviewTitle: "The Future of Waterfront Living",
    overviewText:
        "Discover a destination designed for those who value space, prestige, and a seamless luxury lifestyle. From curated promenades and skyline-facing residences to hospitality-led amenities and everyday convenience, this community is crafted to feel both iconic and deeply livable.",
    stats: [
        { value: "711,399 sqm", label: "Serviced Apartments" },
        { value: "7.4 million sqm", label: "Residential Space" },
        { value: "500,000 sqm", label: "Parks & Open Spaces" },
    ] as Stat[],
    features: [
        {
            title: "Waterfront Promenade",
            description:
                "Elegant walkways, marina views, and vibrant leisure experiences in a serene luxury setting.",
        },
        {
            title: "Branded Residences",
            description:
                "Premium residences with refined finishes, panoramic outlooks, and lifestyle-led services.",
        },
        {
            title: "Retail & Dining",
            description:
                "High-end dining, curated retail, and destination-led social spaces just moments away.",
        },
        {
            title: "Wellness & Leisure",
            description:
                "Infinity pools, landscaped parks, wellness zones, and spaces designed for elevated everyday living.",
        },
    ] as Feature[],
    properties: [
        {
            id: 1,
            title: "Harbour Residences",
            location: "Dubai Creek Harbour",
            price: "From AED 1,790,888",
            beds: "1 - 3 BR",
            image:
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
            href: "#",
        },
        {
            id: 2,
            title: "Skyline Point",
            location: "Dubai Creek Harbour",
            price: "From AED 3,197,888",
            beds: "2 - 4 BR",
            image:
                "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
            href: "#",
        },
        {
            id: 3,
            title: "Palace Creek Blue",
            location: "Dubai Creek Harbour",
            price: "From AED 4,109,888",
            beds: "3 - 5 BR",
            image:
                "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
            href: "#",
        },
    ] as Property[],
    nearbyPlaces: [
        { time: "05 MIN", label: "Ras Al Khor Wildlife Sanctuary" },
        { time: "10 MIN", label: "Dubai International Airport" },
        { time: "15 MIN", label: "Burj Khalifa & Downtown Dubai" },
        { time: "25 MIN", label: "Dubai Marina" },
    ] as NearbyPlace[],
    mapImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop",
    nearbyCommunities: [
        {
            id: 1,
            title: "Arabian Ranches",
            subtitle: "Journey beyond the ordinary",
            image:
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Rashid Yachts & Marina",
            subtitle: "A unique heritage sails into the future",
            image:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "The Oasis",
            subtitle: "Resort-inspired luxury living",
            image:
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
        },
    ],
    faqs: [
        {
            question: "Why is this community ideal for luxury buyers?",
            answer:
                "It blends premium residences, landmark connectivity, waterfront views, and a hospitality-inspired lifestyle in one destination.",
        },
        {
            question: "What kind of properties are available?",
            answer:
                "The community typically features luxury apartments, branded residences, penthouses, and select family-oriented homes.",
        },
        {
            question: "Is it suitable for investment as well as end-use?",
            answer:
                "Yes, the location, brand positioning, and premium infrastructure make it attractive for both lifestyle buyers and long-term investors.",
        },
    ] as FAQ[],
};

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="max-w-3xl mt-4">
            {eyebrow ? (
                <p className="mb-3 text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C8A45D]">
                    {eyebrow}
                </p>
            ) : null}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-white">
                {title}
            </h2>
            {description ? (
                <p className="mt-5 text-sm sm:text-base leading-7 text-white/70">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

export default function CommunityPage() {
    const [community, setCommunity] = React.useState<any>(null);
    const params = useParams()
    console.log(params)
    React.useEffect(() => {
        // Fetch community data from the API
        const fetchCommunityData = async () => {
            try {
                const response = await fetch(
                    `https://winsteadglobal.com/api/content/commun/communities/slug/${params.communities}`,
                );
                const data = await response.json();
                setCommunity(data);
            }
            catch (error) {
                console.error("Error fetching community data:", error);
            }
        };

        fetchCommunityData();
    }, []);
    return (
        <main className="bg-black text-white">
            {/* HERO */}
            <section className="relative min-h-[58vh] overflow-hidden">
                {community?.image && (
                    <Image
                        src={community.image}
                        alt={community.title}
                        fill
                        priority
                        className="object-cover object-center"
                    />
                )}

                {/* <div className="absolute inset-0 bg-black/45" /> */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" /> */}
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_28%)]" /> */}


            </section>

            {/* DEVELOPER STRIP */}
            <section className="border-b border-white/10 bg-[#050505] py-4">
                <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 md:px-10">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl  border border-white/10 bg-white/[0.03] p-3">
                        {community?.developer?.image && (
                            <Image
                                src={community.developer.image}
                                alt={community.developer.title}
                                fill
                                className="object-contain bg-white"
                            />
                        )}
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                            Developer
                        </p>
                        <h3 className="mt-1 text-2xl font-light text-white">
                            {community?.developer?.title}
                        </h3>
                    </div>
                </div>
            </section>

            {/* OVERVIEW */}
            <section className="py-4 md:py-4">
                <div className="mx-auto max-w-7xl px-6 md:px-10">
                    <AutoBreadcrumbs />

                    <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl items-end px-6 pb-20 md:px-10">
                        <div className="max-w-4xl">
                            <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#F1DC7F]">
                                Our Communities
                            </p>

                            <h1 className="text-5xl md:text-7xl font-light leading-[0.95] text-white">
                                {community?.title}
                            </h1>

                            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
                                {community?.description}
                            </p>
                        </div>


                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section className="pb-24">
                <div className="mx-auto max-w-7xl px-6 md:px-10">
                    <div className="mb-12">
                        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
                            Signature Residences
                        </p>
                        <h2 className="text-4xl md:text-5xl font-light text-white">
                            Featured projects in this community
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {community?.projects?.map((project: any) => (
                            <Link
                                key={project._id}
                                href={`/projects/${project.slug}`}
                                className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] transition duration-500 hover:border-[#D4AF37]/40 hover:-translate-y-1"
                            >
                                <div className="relative h-[320px] overflow-hidden">
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                </div>

                                <div className="p-6">
                                    <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                                        {project.location}
                                    </p>

                                    <h3 className="mt-3 text-2xl font-light text-white">
                                        {project.title}
                                    </h3>

                                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                                                Starting Price
                                            </p>
                                            <p className="mt-2 text-lg text-[#D4AF37]">
                                                {project.price > 0
                                                    ? `AED ${project.price.toLocaleString()}`
                                                    : "Price on Request"}
                                            </p>
                                        </div>

                                        <span className="rounded-full border border-[#D4AF37]/30 px-4 py-2 text-sm text-[#D4AF37]">
                                            View
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>

    );
}