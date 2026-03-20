"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";
import image1 from "../../public/image_7.png";
import image2 from "../../public/image_5.png";
import image3 from "../../public/image_6.png";

const images = [image1, image2, image1, image2, image3, image1, image2];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // scroll reveal
      gsap.from(".card", {
        opacity: 0,
        y: 100,
        scale: 0.95,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 👉 HOVER PARALLAX EFFECT
  const handleMove = (e: any, el: any) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 20;
    const moveY = (y - rect.height / 2) / 20;

    gsap.to(el.querySelector(".image"), {
      x: moveX,
      y: moveY,
      rotate: moveX * 0.3,
      scale: 1.12,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleLeave = (el: any) => {
    gsap.to(el.querySelector(".image"), {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-6 md:px-10 pt-24 md:pt-40 pb-20 bg-black text-white"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            Discover exceptional properties with Winstead in premium locations
            worldwide.
          </p>
        </div>

        <button className="border border-yellow-500 px-5 py-2 rounded-lg text-sm hover:bg-yellow-500 hover:text-black transition">
          View All Projects
        </button>
      </div>

      {/* GRID */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">

  {/* BIG LEFT */}
  <div className="card md:row-span-2">
    <Card img={images[0]} />
  </div>

  {/* SMALL */}
  <div className="card">
    <Card img={images[1]} />
  </div>

  <div className="card">
    <Card img={images[2]} />
  </div>

  {/* SMALL */}
  <div className="card">
    <Card img={images[3]} />
  </div>

  {/* BIG RIGHT (TOP ALIGN) */}
  <div className="card md:row-span-2">
    <Card img={images[4]} />
  </div>

  {/* BOTTOM SMALL */}
  <div className="card">
    <Card img={images[5]} />
  </div>
  <div className="card">
    <Card img={images[6]} />
  </div>

</div>
    </section>
  );
}

function Card({ img }: any) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer">

      {/* IMAGE */}
      <Image
        src={img}
        alt="project"
        className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* SOFT OVERLAY (NO HEAVY SHADOW) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-0 p-5 w-full transition duration-500 group-hover:translate-y-[-4px]">

        <h3 className="text-lg md:text-xl font-semibold">
          Aurelia Heights
        </h3>

        <div className="text-xs md:text-sm text-gray-300 mt-2 space-y-1 opacity-90">
          <p>2–8</p>
          <p>$2.3M – $3.8M</p>
          <p>2,800 – 7,200 sq.ft.</p>
          <p>Downtown Dubai, UAE</p>
        </div>

        {/* BUTTON */}
        <button className="mt-3 text-xs md:text-sm border border-yellow-500 px-4 py-1.5 rounded-md opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
          Check Details
        </button>

      </div>
    </div>
  );
}
