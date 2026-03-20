"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const stats = [
    { value: 3000, suffix: "+", label: "Happy Customers" },
    { value: 324, suffix: "+", label: "Premium Developers" },
    { value: 200, suffix: "+", label: "Property Experts" },
    { value: 30, suffix: "+", label: "Languages" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // entry animation
      gsap.from(".stat-card", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // counter
      stats.forEach((stat, i) => {
        let obj = { val: 0 };

        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            const el = document.getElementById(`counter-${i}`);
            if (el) el.innerText = Math.floor(obj.val).toLocaleString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-20 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* TOP LINE */}
        <div className="border-t mb-16 h-[1px] w-full bg-[linear-gradient(84.04deg,#B9A650_0.77%,#F1DC7F_43.94%,#7C5700_82.27%)] opacity-70"></div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {stats.map((stat, i) => (
            <div key={i} className="stat-card flex justify-center">
              
              {/* ROTATING GRADIENT BORDER */}
              <div className="relative w-[150px] h-[150px] md:w-[190px] md:h-[190px]">
                
                {/* rotating ring */}
                <div className="absolute inset-0 rounded-full p-[2px] bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] animate-[spin_6s_linear_infinite]"></div>

                {/* inner circle (prevents content from rotating) */}
                <div className="absolute inset-[2px] rounded-full bg-black flex flex-col items-center justify-center">
                  
                  {/* NUMBER */}
                  <h3 className="text-2xl md:text-3xl font-semibold text-yellow-400">
                    <span id={`counter-${i}`}>0</span>
                    {stat.suffix}
                  </h3>

                  {/* LABEL */}
                  <p className="text-xs md:text-sm text-gray-300 mt-2 text-center px-2">
                    {stat.label}
                  </p>

                </div>
              </div>

            </div>
          ))}

        </div>

        {/* BOTTOM LINE */}
        <div className="mt-16 h-[1px] w-full bg-[linear-gradient(84.04deg,#B9A650_0.77%,#F1DC7F_43.94%,#7C5700_82.27%)] opacity-70"></div>
<div className="mt-16 h-[1px] w-full bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]"></div>
      </div>
    </section>
  );
}