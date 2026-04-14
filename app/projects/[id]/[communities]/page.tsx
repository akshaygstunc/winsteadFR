"use client";

import AutoBreadcrumbs from "@/app/components/BreadCrumbs";
import { Fallback } from "next/dist/client/components/segment-cache/cache-map";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

    const params = useParams();
const communitySlug = params?.communitySlug || params?.communities;

const [community, setCommunity] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
  const fetchCommunity = async () => {
    try {
      const res = await fetch("/backend/communities");
      const json = await res.json();

      const found = json.find(
        (item: any) => item.slug === communitySlug
      );

      setCommunity(found);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (communitySlug) fetchCommunity();
    }, [communitySlug]);
    
const data = {
  ...communityData,         // fallback हमेशा रहेगा
  ...(community?.data || {}) // API overwrite करेगा
};    return (
        <main className="text-white">
            {/* Hero */}
            <section className="relative h-[65vh] min-h-[420px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={data.heroImage || "/fallback.jpg"}
                        alt={data.title}
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,164,93,0.22),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(200,164,93,0.14),transparent_22%)]" />
                </div>
              <div className="relative z-10 flex h-full items-end justify-center">
  <div className="w-full max-w-7xl px-6 pb-14 md:px-12 md:pb-20">
    <div className="max-w-xl text-left">
      <>
        <div className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
          <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.45em] text-[#C8A45D]">
            {data.eyebrow}
          </p>

          <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-light leading-[0.95]">
            {data.title}
          </h1>
        </div>

        <h2 className="max-w-4xl text-2xl sm:text-2xl lg:text-xl font-light leading-[0.95]">
          {data.title}
        </h2>
      </>
    </div>
  </div>
</div>
                <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 sm:px-6 lg:px-8  sm:pb-20">
                    <div className="max-w-4xl">
                        <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.45em] text-[#C8A45D]">
                            {data.eyebrow}
                        </p>
                        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-light leading-[0.95]">
                            {data.title}
                        </h1>
                        <p className="mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 text-white/75">
                            {data.subtitle}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="#properties"
                                className="rounded-full border border-[#C8A45D] bg-[#C8A45D] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
                            >
                                Explore Properties
                            </Link>
                            <Link
                                href="#overview"
                                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-[#C8A45D] hover:text-[#C8A45D]"
                            >
                                Discover Community
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview */}

            <section
                id="overview"
                className="relative border-t border-white/10 bg-black py-10 sm:py-10"
            >

                <AutoBreadcrumbs />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,164,93,0.10),transparent_22%)] " />
                <div className="relative z-10 mx-auto grid max-w-9xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
                    <SectionHeading
                        eyebrow="Community Overview"
                        title={data.overviewTitle}
                        description={data.overviewText}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                       {data?.stats?.map((stat: any, index: number) => (
  <div
    key={stat?.label || index}
    className="rounded-[28px] border border-[#C8A45D]/20 bg-[#0B0B0B] py-2 px-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
  >
    <div className="text-2xl sm:text-xl font-light text-[#C8A45D]">
      {stat?.value || ""}
    </div>
    <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">
      {stat?.label || ""}
    </div>
  </div>
))}
                    </div>
                </div>
            </section>

            {/* Lifestyle Features */}
            <section className="py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Lifestyle & Amenities"
                        title="Crafted for elevated living"
                        description="Every element of the community experience should feel premium, intentional, and visually calm."
                    />

                    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
{data?.stats?.map((stat: any, index: number) => (
                            <div
                                key={stat?.label || index}
                                className="group rounded-[30px] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-[#C8A45D]/50 hover:bg-white/[0.05]"
                            >
                                <div className="mb-5 h-[1px] w-12 bg-[#C8A45D] transition-all duration-300 group-hover:w-20" />
                                <h3 className="text-xl font-light text-white">{stat?.label || ""}</h3>
                                <p className="mt-4 text-sm leading-7 text-white/65">
                                    {stat?.description || ""}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section
                id="properties"
                className="border-t border-white/10 bg-[#050505] py-20 sm:py-24"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <SectionHeading
                            eyebrow="Signature Residences"
                            title="Featured properties in this community"
                            description="A curated showcase of luxurious residences designed for discerning buyers and investors."
                        />

                        <Link
                            href="#"
                            className="w-fit rounded-full border border-[#C8A45D]/40 px-5 py-3 text-sm text-[#C8A45D] transition hover:bg-[#C8A45D] hover:text-black"
                        >
                            View All Properties
                        </Link>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {data?.properties?.map((property: any) => (
                            <div
                                key={property?.id || Math.random()}
                                className="group overflow-hidden rounded-[32px] border border-white/10 bg-black"
                            >
                                <div className="relative h-[320px] overflow-hidden">
                                    <Image
                                        src={property.image}
                                        alt={property.title}
                                        fill
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    <div className="absolute left-5 top-5 rounded-full border border-[#C8A45D]/40 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#C8A45D] backdrop-blur-md">
                                        {property.beds}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                                        {property.location}
                                    </p>
                                    <h3 className="mt-3 text-2xl font-light text-white">
                                        {property.title}
                                    </h3>

                                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                                                Starting Price
                                            </p>
                                            <p className="mt-2 text-base text-[#C8A45D]">
                                                {property.price}
                                            </p>
                                        </div>

                                        <Link
                                            href={property.href || "#"}
                                            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:border-[#C8A45D] hover:text-[#C8A45D]"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map / Connectivity */}
            <section className="py-20 sm:py-24">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
                    <div className="flex flex-col justify-center">
                        <SectionHeading
                            eyebrow="Prime Connectivity"
                            title="Perfectly placed for prestige and convenience"
                            description="Position the community as both aspirational and practical, with strong access to key city landmarks."
                        />

                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {data?.nearbyPlaces?.map((item: any) => (
                                <div
                                    key={item?.label || Math.random()}
                                    className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
                                >
                                    <p className="text-sm uppercase tracking-[0.25em] text-[#C8A45D]">
                                        {item.time}
                                    </p>
                                    <p className="mt-3 text-white/80">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative min-h-[420px] overflow-hidden rounded-[36px] border border-[#C8A45D]/20">
                        <Image
                            src={data.mapImage}
                            alt="Community location map"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/35" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 rounded-[24px] border border-white/10 bg-black/50 p-5 backdrop-blur-xl">
                            <p className="text-xs uppercase tracking-[0.3em] text-[#C8A45D]">
                                Strategic Location
                            </p>
                            <p className="mt-3 text-sm leading-7 text-white/75">
                                Add your live map embed, custom location render, or branded
                                community map visual here.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nearby Communities */}
            <section className="border-t border-white/10 bg-[#050505] py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Related Destinations"
                        title="Explore nearby communities"
                        description="A luxury ecosystem feels stronger when connected to complementary destinations around it."
                    />

                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {data?.nearbyCommunities?.map((item: any) => (
                            <div
                                key={item?.id || Math.random()}
                                className="group overflow-hidden rounded-[30px] border border-white/10 bg-black"
                            >
                                <div className="relative h-[300px]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-light text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-white/65">
                                        {item.subtitle}
                                    </p>

                                    <button className="mt-6 rounded-full border border-[#C8A45D]/35 px-5 py-2.5 text-sm text-[#C8A45D] transition hover:bg-[#C8A45D] hover:text-black">
                                        Explore Community
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            {/* <section className="py-20 sm:py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Frequently Asked Questions"
                        title="Everything buyers want to know"
                    />

                    <div className="mt-12 space-y-4">
                        {data.faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-6"
                            >
                                <summary className="cursor-pointer list-none pr-8 text-lg font-light text-white marker:hidden">
                                    {faq.question}
                                </summary>
                                <p className="mt-4 text-sm leading-7 text-white/70">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* CTA */}
            {/* <section className="pb-20 sm:pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[36px] border border-[#C8A45D]/25 bg-[linear-gradient(135deg,#0B0B0B_0%,#111111_45%,#0A0A0A_100%)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,164,93,0.14),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(200,164,93,0.10),transparent_20%)]" />

                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-xs uppercase tracking-[0.35em] text-[#C8A45D]">
                                    Book a Private Consultation
                                </p>
                                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-white">
                                    Experience luxury beyond the brochure
                                </h2>
                                <p className="mt-5 text-sm sm:text-base leading-7 text-white/70">
                                    Invite users to enquire, request availability, schedule a
                                    viewing, or speak with your luxury property advisors.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact-us"
                                    className="rounded-full bg-[#C8A45D] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
                                >
                                    Enquire Now
                                </Link>
                                <Link
                                    href="/projects"
                                    className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-[#C8A45D] hover:text-[#C8A45D]"
                                >
                                    View More Projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </main>
    );
}