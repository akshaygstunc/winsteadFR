"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaSearchPlus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaExpand,
} from "react-icons/fa";

import galleryImg1 from "../../public/hero1.jpg";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import WebsiteContentService from "../services/websitecontent.service";

// ─── Types ────────────────────────────────────────────────────────────────────

type EventFromApi = {
  _id: string;
  entity: string;
  title: string;
  subtitle?: string;
  slug: string;
  status: string;
  pageType: string;
  description?: string;
  sortOrder: number;
  data: {
    eventDate?: string;
    author?: string;
    location?: string;
    coverImage?: string;
    media?: string[]; // array of URLs (image or video)
    category?: string;
  };
  createdAt: string;
  updatedAt: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

function formatEventDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function GalleryHero({ galleryData, loading = false }: any) {
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

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

// ─── Modal ────────────────────────────────────────────────────────────────────

function EventGalleryModal({
  event,
  activeMediaIndex,
  isOpen,
  onClose,
  onPrevMedia,
  onNextMedia,
  onSelectMedia,
}: {
  event: EventFromApi | null;
  activeMediaIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevMedia: () => void;
  onNextMedia: () => void;
  onSelectMedia: (index: number) => void;
}) {
  const media = event?.data?.media || [];
  const activeUrl = media[activeMediaIndex];
  const total = media.length;

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

  if (!isOpen || !event || !activeUrl) return null;

  const currentIsVideo = isVideo(activeUrl);

  return (
    <div className="fixed inset-0 z-[999] bg-black/98 backdrop-blur-md flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          {/* Counter pill */}
          <span className="text-xs uppercase tracking-[0.2em] text-yellow-400 border border-yellow-500/30 rounded-full px-3 py-1">
            {activeMediaIndex + 1} / {total}
          </span>
          <h3 className="text-white font-semibold text-base md:text-lg truncate max-w-xs md:max-w-md">
            {event.title}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
        >
          <FaTimes />
        </button>
      </div>

      {/* ── Main viewer ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: main media + nav */}
        <div className="relative flex-1 flex items-center justify-center bg-black/60 px-4 py-4">
          {total > 1 && (
            <>
              <button
                onClick={onPrevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={onNextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80">
            {currentIsVideo ? (
              <video
                key={activeUrl}
                src={activeUrl}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[62vh] object-contain bg-black"
              />
            ) : (
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={activeUrl}
                  alt={`Media ${activeMediaIndex + 1}`}
                  fill
                  unoptimized
                  className="object-contain bg-black"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: info panel + filmstrip */}
        <div className="hidden lg:flex flex-col w-[300px] xl:w-[340px] border-l border-white/10 bg-black/80 shrink-0">
          {/* Event info */}
          <div className="p-6 border-b border-white/10">
            {/* Gold accent line */}
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#B9A650] to-[#7C5700] rounded-full mb-4" />

            <h4 className="text-white font-semibold text-lg leading-snug mb-4">
              {event.title}
            </h4>

            {event.data?.location && (
              <div className="flex items-start gap-2.5 mb-3">
                <FaMapMarkerAlt className="text-yellow-400 mt-0.5 shrink-0 text-xs" />
                <span className="text-gray-300 text-sm">
                  {event.data.location}
                </span>
              </div>
            )}

            {event.data?.eventDate && (
              <div className="flex items-start gap-2.5 mb-3">
                <FaCalendarAlt className="text-yellow-400 mt-0.5 shrink-0 text-xs" />
                <span className="text-gray-300 text-sm">
                  {formatEventDate(event.data.eventDate)}
                </span>
              </div>
            )}

            {event.data?.author && (
              <div className="flex items-start gap-2.5 mb-3">
                <FaUser className="text-yellow-400 mt-0.5 shrink-0 text-xs" />
                <span className="text-gray-300 text-sm capitalize">
                  {event.data.author}
                </span>
              </div>
            )}

            {event.description && (
              <p className="text-gray-400 text-sm leading-relaxed mt-3 border-t border-white/10 pt-3">
                {event.description}
              </p>
            )}

            {/* Media type badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-400">
                {currentIsVideo ? "Video" : "Photo"} · {activeMediaIndex + 1}/
                {total}
              </span>
            </div>
          </div>

          {/* Filmstrip / thumbnails */}
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
              All Media ({total})
            </p>

            <div className="grid grid-cols-2 gap-2">
              {media.map((url, index) => {
                const isActive = index === activeMediaIndex;
                const itemIsVideo = isVideo(url);

                return (
                  <button
                    key={index}
                    onClick={() => onSelectMedia(index)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      isActive
                        ? "border-yellow-400 scale-[0.97]"
                        : "border-white/10 hover:border-yellow-400/50"
                    }`}
                    style={{ aspectRatio: "4/3" }}
                  >
                    {itemIsVideo ? (
                      <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                        <FaPlay className="text-white text-lg" />
                      </div>
                    ) : (
                      <Image
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}

                    {/* Active overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-yellow-400/10 border-2 border-yellow-400 rounded-xl" />
                    )}

                    {/* Index badge */}
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded-md">
                      {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filmstrip (horizontal scroll) */}
      <div className="lg:hidden border-t border-white/10 bg-black/90 p-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((url, index) => {
            const isActive = index === activeMediaIndex;
            const itemIsVideo = isVideo(url);

            return (
              <button
                key={index}
                onClick={() => onSelectMedia(index)}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  isActive ? "border-yellow-400" : "border-white/10"
                }`}
              >
                {itemIsVideo ? (
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                    <FaPlay className="text-white text-sm" />
                  </div>
                ) : (
                  <Image
                    src={url}
                    alt={`Thumb ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

function GalleryGrid({
  events = [],
  loading,
  galleryData,
}: {
  events: EventFromApi[];
  loading: boolean;
  galleryData?: any;
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<EventFromApi | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive tabs from events (using entity or a fixed label since API has no category)
  const tabs = useMemo(() => {
    const cats = Array.from(
      new Set(events.map((e) => e.data?.category || e.entity || "Events")),
    );
    return ["All", ...cats];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (activeTab === "All") return events;
    return events.filter(
      (e) => (e.data?.category || e.entity || "Events") === activeTab,
    );
  }, [activeTab, events]);

  const openModal = (event: EventFromApi) => {
    setSelectedEvent(event);
    setSelectedMediaIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const goPrev = () => {
    if (!selectedEvent) return;
    const total = selectedEvent.data?.media?.length || 0;
    setSelectedMediaIndex((p) => (p === 0 ? total - 1 : p - 1));
  };

  const goNext = () => {
    if (!selectedEvent) return;
    const total = selectedEvent.data?.media?.length || 0;
    setSelectedMediaIndex((p) => (p === total - 1 ? 0 : p + 1));
  };

  const eyebrow = galleryData?.data?.introEyebrow || "Curated Events";
  const title = galleryData?.data?.introTitle || "Browse by event category";
  const description =
    galleryData?.data?.introDescription ||
    "Explore premium real estate events, launches, showcases, walkthroughs, and curated experiences.";

  return (
    <>
      <section className="bg-black px-6 md:px-12 md:py-8 text-white">
        <div className="max-w-[85rem] mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                {eyebrow}
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
                {title.replace("event category", "")}
                <span className="text-yellow-400">
                  {title.includes("event category") ? "event category" : ""}
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-sm md:text-base leading-relaxed text-gray-400">
              {description}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm border transition ${
                  activeTab === tab
                    ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black border-transparent"
                    : "border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/40"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <article
                    key={i}
                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] h-[360px] animate-pulse"
                  />
                ))
              : filteredEvents.map((event) => {
                  const coverSrc =
                    event?.data?.coverImage?.trim() || // ← trim to catch whitespace too
                    event?.data?.media?.[0] ||
                    null;
                  const mediaCount = event?.data?.media?.length || 0;
                  const dateLabel = formatEventDate(event.data?.eventDate);

                  return (
                    <article
                      key={event._id}
                      onClick={() => openModal(event)}
                      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] cursor-pointer hover:border-yellow-500/40 transition-all duration-300"
                    >
                      {/* Cover image */}
                      <div className="relative h-[320px] md:h-[360px]">
                        <Image
                          src={coverSrc}
                          alt={event.title}
                          fill
                          unoptimized
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      </div>

                      {/* Badges */}
                      <div className="absolute left-4 top-4 flex items-center gap-2 flex-wrap z-10">
                        <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-yellow-400 backdrop-blur-sm">
                          {event.data?.category || event.entity || "Event"}
                        </span>
                        {mediaCount > 0 && (
                          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                            {mediaCount} Media
                          </span>
                        )}
                      </div>

                      {/* Expand icon on hover */}
                      <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition duration-300">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-500/40 bg-black/60 text-yellow-400 backdrop-blur-sm">
                          <FaExpand className="text-xs" />
                        </span>
                      </div>

                      {/* Bottom info */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6 pointer-events-none">
                        {dateLabel && (
                          <p className="text-[11px] uppercase tracking-[0.22em] text-yellow-400 mb-2">
                            {dateLabel}
                          </p>
                        )}
                        <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                          {event.title}
                        </h3>
                        {event.data?.location && (
                          <p className="mt-2 text-sm text-gray-300 flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-yellow-400 text-xs shrink-0" />
                            {event.data.location}
                          </p>
                        )}
                      </div>

                      {/* Gold shimmer on hover */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                    </article>
                  );
                })}
          </div>
        </div>
      </section>

      <EventGalleryModal
        event={selectedEvent}
        activeMediaIndex={selectedMediaIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        onPrevMedia={goPrev}
        onNextMedia={goNext}
        onSelectMedia={setSelectedMediaIndex}
      />
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventFromApi[]>([]);

  useEffect(() => {
    async function fetchGalleryData() {
      const data = await WebsiteContentService.GalleryPage();
      const eventsData = await WebsiteContentService.getEvents();
      setGalleryData(data);
      setEvents(eventsData || []);
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
      <GalleryGrid
        events={events}
        loading={loading}
        galleryData={galleryData}
      />
    </main>
  );
}
