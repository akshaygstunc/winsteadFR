"use client";
import gsap from "gsap";
import { useEffect } from "react";
import SearchBar from "./SearchBar";

export default function Hero() {
  useEffect(() => {
    gsap.from(".hero-img", {
      scale: 1.1,
      duration: 2,
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

      {/* IMAGE */}
      <img
        src="/subtract.png"
        className="hero-img absolute w-full h-full object-cover object-top"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0" />

      {/* CONTENT */}
      <div className="hero-content absolute bottom-[-80px] w-full flex justify-center z-50">
        
        <div className="hero-box w-[90%] max-w-5xl bg-black/80 backdrop-blur-2xl rounded-3xl p-10 border border-yellow-500/20 shadow-[0_0_60px_rgba(201,162,74,0.15)]">

          <h1 className="text-4xl text-center mb-8 leading-snug">
            Find Curated Properties <br /> Across the Globe
          </h1>

          <SearchBar />

        </div>

      </div>
    </div>
  );
}