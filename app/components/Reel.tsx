"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaInstagram } from "react-icons/fa";
import WebsiteContentService from "../services/websitecontent.service";

export default function Reel({ data }: any) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // 🔥 Duplicate for infinite loop
  const loopPosts = [...posts, ...posts];

  useEffect(() => {
    async function fetchPodcast() {
      const response = await WebsiteContentService.GetPodcasts();
      setPosts(response || []);
    }
    fetchPodcast();
  }, []);

  useEffect(() => {
    if (!trackRef.current || posts.length === 0) return;

    let index = 0;

    const getCardWidth = () => {
      const firstCard = trackRef.current?.querySelector(
        "[data-reel-card]"
      ) as HTMLDivElement | null;

      if (!firstCard) return 250;
      return firstCard.offsetWidth + 16; // width + gap
    };

    const animate = () => {
      if (!trackRef.current) return;

      index += 1;
      const moveWidth = getCardWidth();

      gsap.to(trackRef.current, {
        x: -(moveWidth * index),
        duration: 1.2,
        ease: "power3.inOut",
      });

      // 🔥 Smooth infinite reset (no jump visible)
      if (index >= posts.length) {
        setTimeout(() => {
          if (!trackRef.current) return;

          gsap.set(trackRef.current, { x: 0 });
          index = 0;
        }, 1300); // after animation completes
      }
    };

    intervalRef.current = setInterval(animate, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      gsap.killTweensOf(trackRef.current);
    };
  }, [posts]);

  const pauseSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!trackRef.current) return;

      const firstCard = trackRef.current.querySelector(
        "[data-reel-card]"
      ) as HTMLDivElement | null;

      const moveWidth = firstCard ? firstCard.offsetWidth + 16 : 250;

      const currentX = gsap.getProperty(trackRef.current, "x") as number;
      const currentIndex = Math.round(Math.abs(currentX) / moveWidth);
      let nextIndex = currentIndex + 1;

      gsap.to(trackRef.current, {
        x: -(moveWidth * nextIndex),
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          if (nextIndex >= posts.length) {
            gsap.set(trackRef.current, { x: 0 });
          }
        },
      });
    }, 3000);
  };

  return (
    <section className="bg-black pb-16 px-4 md:px-12 overflow-hidden">
      <div className="max-w-[85rem] mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 px-5 py-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)]">
              W
            </div>

            <div>
              <p className="font-semibold text-white text-sm lg:text-xl">
                {data?.socialHandle || "Winstead_properties"}
              </p>
              <p className="text-xs text-white">
                {data?.socialSectionTitle || "Latest On Our Social"}
              </p>
            </div>
          </div>

          <a
            href={
              data?.socialButtonUrl ||
              "https://www.instagram.com/winstead_properties/"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-1.5 text-sm lg:text-base rounded-full font-medium text-black bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] hover:scale-105 transition"
          >
            {data?.socialButtonText || "Follow"}
          </a>
        </div>

        {/* SLIDER */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-4 will-change-transform">
            {loopPosts.map((item, i) => (
              <a
                key={i}
                href={item?.data?.original || "#"}
                target="_blank"
                rel="noopener noreferrer"
                data-reel-card
                onMouseEnter={() => {
                  setHovered(i);
                  pauseSlider();
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  resumeSlider();
                }}
                className="relative flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[28vw] lg:w-[20%] min-w-[180px] md:min-w-[220px] h-[300px] md:h-[400px] rounded-xl overflow-hidden cursor-pointer group"
              >
                <video
                  src={item?.data?.post?.uploaded || item?.data?.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition duration-700 ${hovered === i ? "scale-110" : "scale-100"
                    }`}
                />

                <div
                  className={`absolute inset-0 transition duration-500 ${hovered === i ? "bg-black/45" : "bg-black/20"
                    }`}
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center transition duration-500 ${hovered === i
                      ? "opacity-100 scale-110"
                      : "opacity-0 scale-75"
                    }`}
                >
                  <FaInstagram
                    size={48}
                    className="text-transparent bg-clip-text bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}