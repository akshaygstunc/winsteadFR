"use client";

import Image from "next/image";
import vector from "../../public/logoo1.webp";
import vec2 from "../../public/logoo2.webp";
import vec3 from "../../public/logoo3.png";
import vec4 from "../../public/logoo4.webp";
import vec5 from "../../public/logoo5.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [vector, vec2, vec3, vec4, vec5, vector, vec2];

export default function Logos() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;

    // horizontal infinite scroll
    const tween = gsap.to(".logo-track", {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });

    // wave effect (floating up/down)
    gsap.to(".logo-item", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "random",
      },
    });

    // pause on hover
    el?.addEventListener("mouseenter", () => tween.pause());
    el?.addEventListener("mouseleave", () => tween.play());

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="bg-black py-6 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
      >
        {/* TRACK */}
        <div className="flex w-[200%] logo-track">
          
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="logo-item w-1/2 sm:w-1/4 px-2 sm:px-1 flex justify-center items-center opacity-70 hover:opacity-100 transition"
            >
               <Image
                src={logo}
                alt="logo"
                className="w-[120px] h-auto sm:w-[150px] md:w-[180px] lg:w-[200px] object-contain bg-white"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}