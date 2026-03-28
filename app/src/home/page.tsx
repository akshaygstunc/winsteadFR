"use client";
import Stats from "@/app/components/Stats";
import Testimonials from "@/app/components/Testimonials";
import Reel from "@/app/components/Reel";
import Logos from "@/app/components/Logos";
import Blogs from "@/app/components/Blogs";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Image from "next/image";
import heroImg from "../../../public/Subtract.png";
import Projects from "@/app/components/Projects";
import About from "@/app/components/about/About";

export default function HomePage() {
  useEffect(() => {
    gsap.from(".hero-img", {
      scale: 1.08,
      duration: 2,
      ease: "power2.out",
    });

    gsap.from(".hero-text", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="h-screen relative overflow-hidden">
        {/* IMAGE */}
        <Image
          src={heroImg}
          alt="hero"
          fill
          priority
          className="hero-img object-cover object-center"
        />

        {/* DARK OVERLAY */}

        {/* CONTENT */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="mx-auto px-6 md:px-12 w-full">
            <div className="hero-text max-w-xl">
              <h1
                className="
  text-[36px] sm:text-[40px] md:text-[48px]
  font-extrabold
  leading-[100%]
  tracking-[0.02em]
  text-black
  mb-6
"
              >
                Find Curated <br />
                Properties Across the Globe
              </h1>

              <button className="bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black px-6 py-3 rounded-xl font-medium hover:scale-105 transition shadow-[0_10px_30px_rgba(241,220,127,0.3)]">
                Explore Properties
              </button>
            </div>
          </div>
        </div>
      </section>
      <Logos />
      
      <Projects />
      <Stats />
      <Testimonials />
      <About />
      <Reel />
      <Blogs />
    </div>
  );
}
