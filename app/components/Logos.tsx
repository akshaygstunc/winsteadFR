"use client";

import Image from "next/image";
import vector from "../../public/Vector.png";
import vec2 from "../../public/brandlogo1.png";
import vec3 from "../../public/brandlogo2.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [vector, vec2, vec3, vector, vec2, vec3, vector, vec2];

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
              className="logo-item w-1/2 sm:w-1/4 flex justify-center items-center opacity-50 hover:opacity-100 transition"
            >
              <Image
                src={logo}
                alt="logo"
                className="w-[200px] px-4 object-contain"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}