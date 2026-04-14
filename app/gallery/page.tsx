"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaPlay,
    FaSearchPlus,
} from "react-icons/fa";

import galleryImg1 from "../../public/hero1.jpg";
import galleryImg2 from "../../public/hero2.png";
import galleryImg3 from "../../public/hero3.jpg";
import galleryImg4 from "../../public/hero4.png";
import galleryImg5 from "../../public/hero5.png";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import WebsiteContentService from "../services/websitecontent.service";

type GalleryCategory =
    | "All"
    | "Luxury Villas"
    | "Apartments"
    | "Interiors"
    | "Commercial"
    | "Lifestyle";

type EventMedia = {
    id: number;
    type: "image" | "video";
    src: StaticImageData | string;
    thumbnail?: StaticImageData | string;
    title?: string;
    videoUrl?: string;
};

type GalleryEvent = {
    id: number;
    title: string;
    category: Exclude<GalleryCategory, "All">;
    coverImage: StaticImageData | string;
    location: string;
    eventDate: string;
    description?: string;
    media: EventMedia[];
};

const tabs: GalleryCategory[] = [
    "All",
    "Luxury Villas",
    "Apartments",
    "Interiors",
    "Commercial",
    "Lifestyle",
];



function GalleryHero({
    galleryData,
    loading = false,
}: any) {
    const bannerImage = galleryData?.data?.bannerImage || galleryImg1;
    const bannerTitle = galleryData?.data?.bannerTitle || "Our Gallery";
    const bannerSubtitle =
        galleryData?.data?.bannerSubtitle ||
        "Explore our visual world of\nluxury properties";

    const subtitleLines = bannerSubtitle.split("\n");

    return (
        <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black text-white">
            <div className="absolute inset-0">
                {loading ? (
                    <div className="h-full w-full bg-white/10 animate-pulse" />
                ) : (
                        <Image
                            src={bannerImage}
                            alt={bannerTitle}
                            fill
                            priority
                            className="object-cover object-center"
                        />
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            <div className="relative z-10 h-full flex items-end justify-center">
                <div className="w-full max-w-[85rem] px-6 md:px-12 pb-14 md:pb-20">
                    <div className="max-w-xl text-left">
                        {loading ? (
                            <>
                                <div className="mb-3 h-3 w-24 rounded bg-white/10 animate-pulse" />
                                <div className="h-8 w-72 rounded bg-white/10 animate-pulse md:h-10 xl:h-14" />
                                <div className="mt-3 h-8 w-56 rounded bg-white/10 animate-pulse md:h-10 xl:h-14" />
                            </>
                        ) : (
                            <>
                                    <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
                                        {bannerTitle}
                                    </p>

                                    <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
                                        {subtitleLines[0]}
                                        {subtitleLines[1] && (
                                            <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                                                {subtitleLines[1]}
                                            </span>
                                        )}
                                    </h1>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />
        </section>
    );
}

function EventGalleryModal({
    events,
    activeEventIndex,
    activeMediaIndex,
    isOpen,
    onClose,
    onPrevMedia,
    onNextMedia,
    onSelectMedia,
}: {
        events: GalleryEvent[];
        activeEventIndex: number;
        activeMediaIndex: number;
    isOpen: boolean;
    onClose: () => void;
        onPrevMedia: () => void;
        onNextMedia: () => void;
        onSelectMedia: (index: number) => void;
}) {
    const activeEvent = events[activeEventIndex];
    const eventMedia = activeEvent?.data?.media || activeEvent?.media || [];
    const activeMedia = eventMedia[activeMediaIndex];
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrevMedia();
            if (e.key === "ArrowRight") onNextMedia();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onClose, onPrevMedia, onNextMedia]);

    if (!isOpen || !activeEvent || !activeMedia) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm">
            <button
                onClick={onClose}
                className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
                <FaTimes />
            </button>

            {activeEvent?.data?.media?.length > 1 && (
                <>
                    <button
                        onClick={onPrevMedia}
                        className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        onClick={onNextMedia}
                        className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
                    >
                        <FaChevronRight />
                    </button>
                </>
            )}
            {console.log(activeMedia, "activemedia")}
            <div className="flex h-full w-full items-center justify-center px-4 py-16">
                <div className="w-full max-w-7xl">
                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black">
                        {activeMedia.includes(".png") || activeMedia.includes(".jpg") || activeMedia.includes(".jpeg") ? (
                            <div className="relative h-[65vh] w-full">
                                <Image
                                    src={activeMedia}
                                    alt={activeMedia.title || activeEvent.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <div className="relative w-full bg-black">
                                <video
                                        src={activeMedia}
                                    controls
                                    autoPlay
                                    playsInline
                                        className="h-[65vh] w-full object-contain bg-black"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-5 text-center">
                        <p className="text-xs uppercase tracking-[0.22em] text-yellow-400 mb-2">
                            {activeEvent.eventDate}
                        </p>

                        <h3 className="text-2xl md:text-3xl font-semibold text-white">
                            {activeEvent.title}
                        </h3>

                        <p className="mt-2 text-white">{activeEvent.location}</p>

                        {activeEvent.description && (
                            <p className="mt-3 max-w-3xl mx-auto text-sm md:text-base text-white leading-relaxed">
                                {activeEvent.description}
                            </p>
                        )}

                        <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-yellow-400">
                                {activeEvent.category}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">
                                {activeMedia.type}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">
                                {activeMediaIndex + 1} / {activeEvent?.data?.media.length}
                            </span>
                        </div>
                    </div>

                    {eventMedia.length > 1 && (
                        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                            {activeEvent?.data?.media.map((media, index) => {
                                const isActive = index === activeMediaIndex;

                                return (
                                    <button
                                        key={media.id}
                                        onClick={() => onSelectMedia(index)}
                                        className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition ${isActive
                                            ? "border-yellow-400"
                                            : "border-white/10 hover:border-yellow-400/40"
                                            }`}
                                    >
                                        <Image
                                            src={typeof media.thumbnail !== "undefined" ? media.thumbnail : media}
                                            alt={media.title || `Media ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />

                                        <div className="absolute inset-0 bg-black/20" />

                                        {media.type === "video" && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white">
                                                    <FaPlay className="text-xs ml-0.5" />
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function GalleryGrid({
    events = [],
    loading,
    galleryData,
}: {
    events: any[];
    loading: boolean;
    galleryData?: any;
}) {
    const [activeTab, setActiveTab] = useState<string>("All");
    const [selectedEventIndex, setSelectedEventIndex] = useState(0);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ Tabs from events dynamically
    const tabs = useMemo(() => {
        const categories = Array.from(
            new Set(events?.map((e) => e.category))
        );
        return ["All", ...categories];
    }, [events]);

    // ✅ Filtered events
    const filteredEvents = useMemo(() => {
        if (activeTab === "All") return events;
        return events.filter((event) => event.category === activeTab);
    }, [activeTab, events]);

    const openEventModal = (eventIndex: number) => {
        console.log("Opening modal for event index:", eventIndex);
        setSelectedEventIndex(eventIndex);
        setSelectedMediaIndex(0);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const goPrevMedia = () => {
        const activeEvent = filteredEvents[selectedEventIndex];
        if (!activeEvent) return;

        setSelectedMediaIndex((prev) =>
            prev === 0 ? activeEvent?.data?.media.length - 1 : prev - 1
        );
    };

    const goNextMedia = () => {
        const activeEvent = filteredEvents[selectedEventIndex];
        if (!activeEvent) return;

        setSelectedMediaIndex((prev) =>
            prev === activeEvent?.data?.media.length - 1 ? 0 : prev + 1
        );
    };

    useEffect(() => {
        setSelectedEventIndex(0);
        setSelectedMediaIndex(0);
        setIsModalOpen(false);
    }, [activeTab]);

    // ✅ JSON Data Mapping
    const eyebrow =
        galleryData?.data?.introEyebrow || "Curated Events";

    const title =
        galleryData?.data?.introTitle || "Browse by event category";

    const description =
        galleryData?.data?.introDescription ||
        "Explore premium real estate events, launches, showcases, walkthroughs, and curated experiences through a visual event-driven gallery.";

    return (
        <>
            <section className="bg-black px-6 md:px-12 md:py-8 text-white">
                <div className="max-w-[85rem] mx-auto">

                    {/* HEADER */}
                    <div className="mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="max-w-2xl">
                            <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                                {eyebrow}
                            </p>

                            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
                                {title.split("category")[0] || "Browse by "}
                                <span className="text-yellow-400">
                                    {title.includes("category") ? "event category" : ""}
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-xl text-sm md:text-base leading-relaxed text-white">
                            {description}
                        </p>
                    </div>

                    {/* TABS */}
                    <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;

                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm border transition ${isActive
                                        ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black border-transparent"
                                        : "border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/40"
                                        }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {loading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <article
                                    key={index}
                                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
                                >
                                    <div className="relative h-[320px] md:h-[360px] overflow-hidden">
                                        <div className="absolute inset-0 animate-pulse bg-white/10" />

                                        {/* shimmer */}
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    </div>

                                    <div className="absolute left-4 top-4 flex items-center gap-2 flex-wrap">
                                        <div className="h-7 w-24 rounded-full bg-white/10 animate-pulse" />
                                        <div className="h-7 w-20 rounded-full bg-white/10 animate-pulse" />
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                                        <div className="h-3 w-24 rounded bg-white/10 animate-pulse mb-3" />
                                        <div className="h-6 w-3/4 rounded bg-white/10 animate-pulse mb-3" />
                                        <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse" />
                                    </div>
                                </article>
                            ))
                            : filteredEvents.map((event, index) => (
                                <article
                                    key={event._id || index}
                                    className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
                                >
                                    <div className="relative h-[320px] md:h-[360px]">
                                        <Image
                                            src={event?.data?.coverImage || event?.data?.media?.[0] || event?.media?.[0]}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    </div>

                                    <div className="absolute left-4 top-4 flex items-center gap-2 flex-wrap">
                                        <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-yellow-400 backdrop-blur-sm">
                                            {event.category}
                                        </span>

                                        <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                                            {event?.data?.media?.length || event?.media?.length || 0} Media
                                        </span>
                                    </div>

                                    <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-black/20" />

                                    <div className="absolute right-4 top-4 opacity-0 transition duration-300 group-hover:opacity-100 z-20">
                                        <button
                                            onClick={() => openEventModal(index)}
                                            className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/40 bg-black/60 text-yellow-400 backdrop-blur-sm transition hover:bg-yellow-500 hover:text-black"
                                        >
                                            <FaSearchPlus />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => openEventModal(index)}
                                        className="absolute inset-0 z-10 cursor-pointer"
                                        aria-label={`Open ${event.title}`}
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6 pointer-events-none">
                                        <p className="text-[11px] uppercase tracking-[0.22em] text-yellow-400 mb-2">
                                            {event.eventDate}
                                        </p>
                                        <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                                            {event.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-white">{event.location}</p>
                                    </div>
                                </article>
                            ))}
                    </div>
                </div>
            </section>

            <EventGalleryModal
                events={filteredEvents}
                activeEventIndex={selectedEventIndex}
                activeMediaIndex={selectedMediaIndex}
                isOpen={isModalOpen}
                onClose={closeModal}
                onPrevMedia={goPrevMedia}
                onNextMedia={goNextMedia}
                onSelectMedia={setSelectedMediaIndex}
            />
        </>
    );
}

export default function GalleryPage() {
    const [galleryData, setGalleryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<any[]>([]);
    useEffect(() => {
        async function fetchGalleryData() {
            const data = await WebsiteContentService.GalleryPage();
            const eventsData = await WebsiteContentService.getEvents();
            setGalleryData(data);
            setEvents(eventsData);
            setLoading(false);
        }
        fetchGalleryData();
    }, []);
    return (
        <main className="bg-black text-white">
            <GalleryHero galleryData={galleryData} loading={loading} />
            <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
                <AutoBreadcrumbs />
            </section>
            <GalleryGrid events={events} loading={loading} />
        </main>
    );
}