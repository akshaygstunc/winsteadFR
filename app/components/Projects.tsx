"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";
import image1 from "../../public/image_7.png";
import image2 from "../../public/image_5.png";
import image3 from "../../public/image_6.png";

const images = [image1, image2, image1, image2, image3, image1, image2];
import { useState } from "react";

const vendors = ["Vendor A", "Vendor B", "Vendor C"];

function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [vendorOpen, setVendorOpen] = useState(false);

  const handleMainFilter = (filter: any) => {
    setActiveFilter(filter);
    if (filter !== "Vendor") {
      setSelectedVendor("");
      setVendorOpen(false);
    }
  };

  const handleVendorSelect = (vendor: any) => {
    setActiveFilter("Vendor");
    setSelectedVendor(vendor);
    setVendorOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-[.95rem] mt-2 max-w-xl">
          Discover exceptional properties with Winstead in premium locations worldwide.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 relative">
        {/* All */}
        <button
          onClick={() => handleMainFilter("All")}
          className={`text-[1.05rem] px-4 py-2 text-sm rounded-lg border transition ${activeFilter === "All"
            ? "bg-yellow-500 text-black border-yellow-500"
            : "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            }`}
        >
          All
        </button>

        {/* Elite */}
        <button
          onClick={() => handleMainFilter("Elite")}
          className={`text-[1.05rem] px-4 py-2 text-sm rounded-lg border transition ${activeFilter === "Elite"
            ? "bg-yellow-500 text-black border-yellow-500"
            : "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            }`}
        >
          Elite
        </button>

        {/* Luxury */}
        <button
          onClick={() => handleMainFilter("Luxury")}
          className={`text-[1.05rem] px-4 py-2 text-sm rounded-lg border transition ${activeFilter === "Luxury"
            ? "bg-yellow-500 text-black border-yellow-500"
            : "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            }`}
        >
          Luxury
        </button>

        {/* Vendor Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setVendorOpen(!vendorOpen);
              setActiveFilter("Vendor");
            }}
            className={`text-[1.05rem] px-4 py-2 text-sm rounded-lg border transition flex items-center gap-2 ${activeFilter === "Vendor"
              ? "bg-yellow-500 text-black border-yellow-500"
              : "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              }`}
          >
            {selectedVendor || "Vendor"}
            <span className="text-xs">▼</span>
          </button>

          {vendorOpen && (
            <div className="absolute right-0 mt-2 min-w-[180px] bg-black border border-yellow-500/30 rounded-lg shadow-lg z-50 overflow-hidden">
              {vendors.map((vendor) => (
                <button
                  key={vendor}
                  onClick={() => handleVendorSelect(vendor)}
                  className="text-[1.05rem] block w-full text-left px-4 py-2 text-sm text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
                >
                  {vendor}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
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
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-md mt-2 max-w-xl">
            Discover exceptional properties with Winstead in premium locations
            worldwide.
          </p>
        </div>

        <button className="border border-yellow-500 px-5 py-2 rounded-lg text-sm hover:bg-yellow-500 hover:text-black transition">
          View All Projects
        </button>
      </div> */}
      <FeaturedProjects />
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {/* BIG LEFT */}
        <div className="card">
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
        <div className="card">
          <Card img={images[4]} />
        </div>

        {/* BOTTOM SMALL */}
        <div className="card">
          <Card img={images[5]} />
        </div>
        {/* <div className="card">
          <Card img={images[6]} />
        </div> */}
      </div>
    </section>
  );
}

function Card({ img }: any) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2">
      {/* IMAGE */}
      <Image
        src={img}
        alt="project"
        className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* SOFT OVERLAY (NO HEAVY SHADOW) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent group-hover:border-yellow-400/40 transition duration-500" />
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-500 group-hover:w-full" />
      <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-transparent via-yellow-400 to-transparent transition-all duration-500 group-hover:w-full" />
      {/* CONTENT */}
      <div className="absolute bottom-0 p-5 w-full transition duration-500 group-hover:translate-y-[-4px]">
        <h3 className="text-lg md:text-xl font-semibold">Aurelia Heights</h3>

        <div className="text-[1.15rem] md:text-sm text-gray-300 mt-2 space-y-1 opacity-90">
          <p className="text-[1.05rem]">2–8</p>
          <p className="text-[1.05rem]">$2.3M – $3.8M</p>
          <p className="text-[1.05rem]">2,800 – 7,200 sq.ft.</p>
          <p className="text-[1.05rem]">Downtown Dubai, UAE</p>
        </div>

        {/* BUTTON */}
        <button className="mt-3 text-xs md:text-sm border border-yellow-500 px-4 py-1.5 rounded-md opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
          Check Details
        </button>
      </div>
    </div>
  );
}
