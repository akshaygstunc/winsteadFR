"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaInstagram } from "react-icons/fa";

const reels = [
  "/video.mp4",
  "/video.mp4",
  "/video.mp4",
  "/video.mp4",
  "/video.mp4",
  "/video.mp4",
  "/video.mp4",
];

export default function Reel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
const [hovered, setHovered] = useState<number | null>(null);
  // duplicate for seamless loop
  const loopReels = [...reels, ...reels];

  useEffect(() => {
    let index = 0;

    const cardWidth = 350; // width + gap adjust if needed

    const animate = () => {
      index++;

      gsap.to(trackRef.current, {
        x: -(cardWidth * index),
        duration: 2,
        ease: "power3.inOut",
      });

      // seamless reset
      if (index >= reels.length) {
        setTimeout(() => {
          gsap.set(trackRef.current, { x: 0 });
          index = 0;
        }, 1000);
      }
    };

    const interval = setInterval(animate, 4000);

    return () => clearInterval(interval);
  }, []);
  

  return (
    <section className="bg-black pb-16 px-4 md:px-12 overflow-hidden">
      <div className="mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 px-5 py-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)]">
              W
            </div>

            <div>
              <p className="font-semibold text-white text-sm">
                Winstead_properties
              </p>
              <p className="text-xs text-gray-400">Latest On Our Social</p>
            </div>
          </div>

          <button className="px-5 py-1.5 text-sm rounded-full font-medium text-black bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] hover:scale-105 transition">
            Follow
          </button>
        </div>

        {/* REELS TRACK */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-4 will-change-transform">
            {loopReels.map((video, i) => (
            <div
  key={i}
  onMouseEnter={() => setHovered(i)}
  onMouseLeave={() => setHovered(null)}
  className="relative flex-shrink-0 
  w-[20%] min-w-[180px] md:min-w-[220px] 
  h-[300px] md:h-[400px] 
  rounded-xl overflow-hidden cursor-pointer"
>

  {/* VIDEO */}
  <video
    src={video}
    autoPlay
    loop
    muted
    playsInline
    className={`absolute inset-0 w-full h-full object-cover z-0 transition duration-700 ${
      hovered === i ? "scale-110" : "scale-100"
    }`}
  />

  {/* OVERLAY */}
  <div
    className={`absolute inset-0 transition duration-500 z-10 ${
      hovered === i ? "bg-black/50" : "bg-black/20"
    }`}
  />

  {/* ICON (NOW GUARANTEED WORKING) */}
  <div
    className={`absolute inset-0 flex items-center justify-center 
    transition duration-500 z-50 pointer-events-none ${
      hovered === i ? "opacity-100 scale-110" : "opacity-0 scale-75"
    }`}
  >
    <FaInstagram
      size={48}
      className="text-transparent bg-clip-text 
      bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]
      drop-shadow-[0_0_25px_rgba(255,0,150,0.6)]"
    />
  </div>
</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
