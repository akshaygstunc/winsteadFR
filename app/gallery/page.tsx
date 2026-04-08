"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
    FaArrowRight,
    FaCamera,
    FaImage,
    FaPlay,
    FaSearchPlus,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import galleryImg1 from "../../public/hero1.jpg";
import galleryImg2 from "../../public/hero2.png";
import galleryImg5 from "../../public/hero3.jpg";
import galleryImg6 from "../../public/hero4.png";
import galleryImg7 from "../../public/hero5.png";
import AutoBreadcrumbs from "../components/BreadCrumbs";

type GalleryCategory =
    | "All"
    | "Luxury Villas"
    | "Apartments"
    | "Interiors"
    | "Commercial"
    | "Lifestyle";

type GalleryItem = {
    id: number;
    title: string;
    category: Exclude<GalleryCategory, "All">;
    image: StaticImageData;
    location: string;
    type: "image" | "video";
    size: "small" | "medium" | "large";
    videoUrl?: string;
};

const tabs: GalleryCategory[] = [
    "All",
    "Luxury Villas",
    "Apartments",
    "Interiors",
    "Commercial",
    "Lifestyle",
];

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Palm Waterfront Villa",
        category: "Luxury Villas",
        image: galleryImg1,
        location: "Palm Jumeirah",
        type: "image",
        size: "large",
    },
    {
        id: 2,
        title: "Modern Skyline Apartment",
        category: "Apartments",
        image: galleryImg2,
        location: "Downtown Dubai",
        type: "image",
        size: "medium",
    },
    {
        id: 3,
        title: "Elegant Living Interior",
        category: "Interiors",
        image: galleryImg5,
        location: "Dubai Marina",
        type: "image",
        size: "small",
    },
    {
        id: 4,
        title: "Commercial Business Tower",
        category: "Commercial",
        image: galleryImg5,
        location: "Business Bay",
        type: "video",
        size: "medium",
        videoUrl: "/videos/sample1.mp4",
    },
    {
        id: 5,
        title: "Luxury Poolside Experience",
        category: "Lifestyle",
        image: galleryImg5,
        location: "JBR",
        type: "image",
        size: "small",
    },
    {
        id: 6,
        title: "Premium Penthouse Tour",
        category: "Apartments",
        image: galleryImg6,
        location: "Dubai Hills",
        type: "video",
        size: "large",
        videoUrl: "/videos/sample2.mp4",
    },
    {
        id: 7,
        title: "Designer Bedroom Interior",
        category: "Interiors",
        image: galleryImg7,
        location: "Bluewaters",
        type: "image",
        size: "medium",
    },
];

function GalleryHero() {
    return (
        <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black text-white">
       
                   {/* IMAGE */}
                   <div className="absolute inset-0">
                       <Image
                           src={galleryImg1}
                           alt="News Banner"
                           fill
                           priority
                           className="object-cover object-center"
                       />
                   </div>
       
                   {/* OVERLAY (only for readability, not full dark) */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
       
                   {/* CONTENT (BOTTOM LEFT ONLY) */}
                   <div className="relative z-10 h-full flex items-end justify-center">
                       <div className="w-full max-w-7xl  px-6 md:px-12 pb-14 md:pb-20">
       
                           <div className="max-w-xl text-left ">
       
                               <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
                            Our Gallery
                               </p>
       
                               <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
                            Explore our visual world of
                                   <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                                luxury properties
                                   </span>
                               </h1>
       
       
       
                           </div>
       
                       </div>
                   </div>
       
                   {/* BOTTOM GOLD LINE */}
                   <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />
       
               </section>
    );
}

function GalleryStats() {
    const stats = [
        { label: "Photos & Media", value: "500+" },
        { label: "Luxury Projects", value: "80+" },
        { label: "Communities Covered", value: "25+" },
        { label: "Video Walkthroughs", value: "40+" },
    ];

    return (
        <section className="bg-black px-6 md:px-12 py-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-6 text-center"
                    >
                        <p className="text-2xl md:text-3xl font-semibold text-yellow-400">
                            {item.value}
                        </p>
                        <p className="mt-2 text-sm lg:text-md lg:text-md text-white">{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function GalleryModal({
    items,
    activeIndex,
    isOpen,
    onClose,
    onPrev,
    onNext,
}: {
    items: GalleryItem[];
    activeIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    const activeItem = items[activeIndex];

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onClose, onPrev, onNext]);

    if (!isOpen || !activeItem) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm">
            <button
                onClick={onClose}
                className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
                <FaTimes />
            </button>

            {items.length > 1 && (
                <>
                    <button
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
                    >
                        <FaChevronRight />
                    </button>
                </>
            )}

            <div className="flex h-full w-full items-center justify-center px-4 py-16">
                <div className="w-full max-w-6xl">
                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black">
                        {activeItem.type === "image" ? (
                            <div className="relative h-[70vh] w-full">
                                <Image
                                    src={activeItem.image}
                                    alt={activeItem.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <div className="relative w-full bg-black">
                                <video
                                    src={activeItem.videoUrl}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="h-[70vh] w-full object-contain bg-black"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-5 flex flex-col gap-2 text-center">
                        <h3 className="text-2xl md:text-3xl font-semibold text-white">
                            {activeItem.title}
                        </h3>
                        <p className="text-white">{activeItem.location}</p>
                        <div className="flex items-center justify-center gap-3">
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-yellow-400">
                                {activeItem.category}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">
                                {activeItem.type}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GalleryGrid() {
    const [activeTab, setActiveTab] = useState<GalleryCategory>("All");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredItems = useMemo(() => {
        if (activeTab === "All") return galleryItems;
        return galleryItems.filter((item) => item.category === activeTab);
    }, [activeTab]);

    const getSpanClass = (size: GalleryItem["size"]) => {
        switch (size) {
            case "large":
                return "md:col-span-2 md:row-span-2";
            case "medium":
                return "md:col-span-1 md:row-span-1";
            default:
                return "md:col-span-1 md:row-span-1";
        }
    };

    const openModal = (index: number) => {
        setSelectedIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const goPrev = () => {
        setSelectedIndex((prev) =>
            prev === 0 ? filteredItems.length - 1 : prev - 1
        );
    };

    const goNext = () => {
        setSelectedIndex((prev) =>
            prev === filteredItems.length - 1 ? 0 : prev + 1
        );
    };

    useEffect(() => {
        setSelectedIndex(0);
        setIsModalOpen(false);
    }, [activeTab]);

    return (
        <>
            <section className="bg-black px-6 md:px-12 py-16 md:py-20 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="max-w-2xl">
                            <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                                Curated Collections
                            </p>
                            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
                                Browse by
                                <span className="text-yellow-400"> category</span>
                            </h2>
                        </div>

                        <p className="max-w-xl text-sm lg:text-md lg:text-md md:text-base leading-relaxed text-white">
                            From premium villas and apartments to sophisticated interiors and
                            commercial developments, explore every visual detail in one place.
                        </p>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;

                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm lg:text-md lg:text-md border transition ${isActive
                                        ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black border-transparent"
                                        : "border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/40"
                                        }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mb-8 flex items-center justify-between gap-4 text-sm lg:text-md lg:text-md text-white">
                        <p>
                            Showing{" "}
                            <span className="font-medium text-yellow-400">
                                {filteredItems.length}
                            </span>{" "}
                            gallery item{filteredItems.length !== 1 ? "s" : ""}
                        </p>

                        <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 hover:border-yellow-400/40 transition">
                            <FaImage className="text-yellow-400" />
                            View All Media
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-6">
                        {filteredItems.map((item, index) => (
                            <article
                                key={item.id}
                                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] ${getSpanClass(
                                    item.size
                                )}`}
                            >
                                {item.image?.src?.includes("mp4") ? (
                                    <video
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                        controls
                                    />
                                ) : (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                <div className="absolute left-4 top-4 flex items-center gap-2">
                                    <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-yellow-400 backdrop-blur-sm">
                                        {item.category}
                                    </span>

                                    <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                                        {item.type === "video" ? "Video" : "Photo"}
                                    </span>
                                </div>

                                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-black/20" />

                                <div className="absolute right-4 top-4 opacity-0 transition duration-300 group-hover:opacity-100">
                                    <button
                                        onClick={() => openModal(index)}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/40 bg-black/60 text-yellow-400 backdrop-blur-sm transition hover:bg-yellow-500 hover:text-black"
                                    >
                                        {item.type === "video" ? <FaPlay /> : <FaSearchPlus />}
                                    </button>
                                </div>

                                <button
                                    onClick={() => openModal(index)}
                                    className="absolute inset-0 z-10 cursor-pointer"
                                    aria-label={`Open ${item.title}`}
                                />

                                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6 pointer-events-none">
                                    <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm lg:text-md lg:text-md text-white">{item.location}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <GalleryModal
                items={filteredItems}
                activeIndex={selectedIndex}
                isOpen={isModalOpen}
                onClose={closeModal}
                onPrev={goPrev}
                onNext={goNext}
            />
        </>
    );
}

function GalleryCTA() {
    return (
        <section className="bg-black px-6 md:px-12 pb-20 md:pb-24 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-white/[0.03] px-6 md:px-10 py-10 md:py-14">
                    <div className="absolute top-0 left-[10%] h-[220px] w-[220px] rounded-full bg-yellow-500/10 blur-3xl" />
                    <div className="absolute bottom-[-60px] right-[5%] h-[220px] w-[220px] rounded-full bg-yellow-400/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div className="max-w-2xl">
                            <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                                Need More Details?
                            </p>
                            <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                                Let us help you explore the right property visually and strategically
                            </h3>
                            <p className="mt-4 text-base md:text-lg leading-relaxed text-white">
                                From image galleries to project walkthroughs, our team can guide
                                you through the finest real estate opportunities tailored to your
                                lifestyle and investment goals.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-6 py-3 font-medium text-black transition hover:scale-[1.03]">
                                Contact Us
                                <FaArrowRight className="text-sm lg:text-md lg:text-md" />
                            </button>

                            <button className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:border-yellow-400 hover:text-yellow-400">
                                Explore Projects
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function GalleryPage() {
    return (
        <main className="bg-black text-white">
            <GalleryHero />
            <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
                                        <AutoBreadcrumbs />
                                      </section>
            {/* <GalleryStats /> */}
            <GalleryGrid />
            {/* <GalleryCTA /> */}
        </main>
    );
}