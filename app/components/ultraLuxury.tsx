"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import img1 from "../../public/hero1.jpg";
import img2 from "../../public/hero2.png";
import img3 from "../../public/hero3.jpg";

export default function UltraLuxury() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (!sliderRef.current) return;

      gsap.to(sliderRef.current, {
        x: `-${index * 100}%`,
        duration: 1,
        ease: "power3.inOut",
      });

      if (index >= 2) {
        setTimeout(() => {
          gsap.set(sliderRef.current, { x: 0 });
          index = 0;
        }, 1000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white py-16 px-6 md:px-10">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Ultra Luxury
        </h1>

        <Link
          href="/projects"
          className="border border-[#F1DC7F]/40 px-5 py-2 rounded-full text-sm hover:bg-yellow-400 hover:text-black transition"
        >
          View Projects
        </Link>
      </div>

      {/* MAIN SECTION */}
      <div className="grid md:grid-cols-[60%_40%] gap-8 items-start">
        
        {/* LEFT SLIDER */}
        <div className="overflow-hidden rounded-xl">
          <div ref={sliderRef} className="flex w-full">
            {[img1, img2, img3].map((img, i) => (
              <div key={i} className="min-w-full">
                <Image
                  src={img}
                  alt="project"
                  className="w-full h-[250px] md:h-[400px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-2xl md:text-3xl text-yellow-400 mb-4">
            The Grand Estate
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Experience unmatched luxury with our ultra premium residences.
            Designed with world-class architecture, high-end interiors, and
            prime locations, these homes redefine modern living.
          </p>

          <p className="text-gray-300 mt-4 leading-relaxed">
            From panoramic views to exclusive amenities, every detail is crafted
            for elegance and comfort.
          </p>

          {/* SMALL GALLERY */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[img1, img2, img3].map((img, i) => (
              <Image
                key={i}
                src={img}
                alt="gallery"
                className="w-full h-[80px] md:h-[100px] object-cover rounded-lg hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}