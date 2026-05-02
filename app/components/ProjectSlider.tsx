"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

type Props = {
    project: {
        heroImages?: string[];
        gallery?: string[];
        title: string;
        category: string;
        subLocation?: string;
        location?: string;
        locations?: { title?: string };
    };
    fallbackImages: string[];
};

export default function ProjectHeroSlider({
    project,
    fallbackImages,
}: Props) {
    const images =
        project?.gallery?.length > 0 ? project.gallery : fallbackImages;

    const [currentIndex, setCurrentIndex] = useState(0);

    // ✅ detect video
    const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

    // ✅ auto slider (skip video)
    useEffect(() => {
        if (images.length <= 1) return;

        const currentItem = images[currentIndex];

        // ❌ don't auto-slide if current is video
        if (isVideo(currentItem)) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images, currentIndex]);

    return (
        <div className="relative h-[74vh] min-h-[560px] md:min-h-[640px] overflow-hidden rounded-[32px] border border-white/10">
            {/* SLIDES */}
            {images.map((media, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {isVideo(media) ? (
                        <video
                            src={media}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={media}
                            alt={`${project.title}-${index}`}
                            fill
                            priority={index === 0}
                            className="object-cover"
                        />
                    )}
                </div>
            ))}

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/20 z-20" />

            {/* CATEGORY */}
            <div className="absolute top-5 right-5 md:top-8 md:right-8 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md px-5 py-4 z-30">
                <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-1">
                    Category
                </p>
                <p className="text-white font-medium">{project.category}</p>
            </div>

            {/* CONTENT */}
            <div className="flex absolute left-5 right-5 bottom-6 md:left-8 md:right-8 md:bottom-8 z-30">
                <div className="max-w-[760px]">
                    <p className="text-[11px] md:text-sm uppercase tracking-[0.28em] text-yellow-400 mb-3">
                        Signature Residence
                    </p>

                    <h1 className="text-4xl md:text-6xl xl:text-4xl font-semibold leading-[1.02] mb-4 text-white">
                        {project.title}
                    </h1>

                    <div className="flex items-center gap-2 text-base md:text-lg text-white mb-4">
                        <FaMapMarkerAlt className="text-yellow-400" />
                        <span>
                            {project?.locations?.title || project.location}
                        </span>
                    </div>
                </div>
            </div>

            {/* DOT NAVIGATION */}
            {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
                    {images.map((_, index) => {
                        const active = currentIndex === index;

                        return (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-3 w-3 rounded-full transition-all duration-300 ${active
                                        ? "bg-yellow-400 scale-110"
                                        : "bg-white/40 hover:bg-white/70"
                                    }`}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}