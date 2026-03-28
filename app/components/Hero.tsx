"use client";
import gsap from "gsap";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import subtractImage from "../../public/Subtract.png";
import { FaCircleNotch } from "react-icons/fa";
// import videoSrc from "../../public/video.mp4";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    gsap.from(".hero-img", {
      scale: 1.1, 
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".hero-box", {
      y: 120,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="h-screen relative">

      {/* FALLBACK IMAGE */}
      {!videoLoaded && (
        // <div
         
        //   className="hero-img object-cover object-top z-0 flex justify-center items-center"
        // >
         
        // </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">

            {/* LOADER */}
            <FaCircleNotch className="animate-spin text-yellow-400 text-3xl" />

            {/* OPTIONAL TEXT */}
            <p className="text-sm text-gray-400 tracking-wide">
              Loading experience...
            </p>
          </div>
        </div>
      )}

      {/* VIDEO */}
      <video
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
       src="/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
      />
      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0" />

      {/* CONTENT */}
      <div className="hero-content absolute bottom-[-80px] sm:bottom-[-120px] w-full flex justify-center z-30">
        <div className="hero-box w-[90%] max-w-5xl bg-black/80 backdrop-blur-2xl rounded-3xl p-4 sm:p-8 border border-yellow-500/20 shadow-[0_0_60px_rgba(201,162,74,0.15)]">
          <h1 className=" text-sm sm:text-2xl text-center mb-4 leading-snug">
            Find Curated Properties Across the Globe
          </h1>

          <SearchBar />
        </div>
      </div>
    </div>
  );
}
