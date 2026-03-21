"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // top stats animation
      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // COUNTER ANIMATION
      document.querySelectorAll(".counter").forEach((el: any) => {
        const target = Number(el.getAttribute("data-value"));
        const suffix = el.getAttribute("data-suffix");

        let obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val).toLocaleString() + suffix;
          },
        });
      });

      // glow pulse
      gsap.to(".stat-glow", {
        opacity: 0.8,
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });

      // circle animation
     gsap.fromTo(
  ".help-card",
  { scale: 0.8, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 85%",
      once: true, // 👈 IMPORTANT
    },
  }
);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "50K+", label: "Satisfied Customers" },
    { value: "2.5B+", label: "Property Listed" },
    { value: "300+", label: "Premium Developers" },
    { value: "60+", label: "Locations" },
  ];

  const help = [
    {
      title: "Discover",
      text: "Browse curated luxury properties across prime global locations, tailored to your preferences and investment goals.",
    },
    {
      title: "Evaluate",
      text: "Access detailed insights, pricing, and expert guidance to help you make informed decisions with confidence.",
    },
    {
      title: "Connect",
      text: "Schedule viewings or get in touch with the right partners for a smooth and seamless buying experience.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-20 px-6 md:px-16"
    >
        <div className="mb-16 h-[1px] w-full bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]"></div>

      <div className="mx-auto">
        {/* TOP STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item relative">
              {/* glow */}
              <div className="stat-glow absolute inset-0 blur-2xl opacity-40 bg-yellow-400/20 rounded-full"></div>

              <h3 className="text-3xl md:text-4xl font-bold relative">
                <span
                  className="counter"
                  data-value={parseFloat(stat.value)}
                  data-suffix={stat.value.replace(/[0-9.]/g, "")}
                >
                  0
                </span>
              </h3>

              <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* TITLE */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-14">
          How We Help
        </h2>

        {/* HELP CARDS */}
        <div className="help-section grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          {help.map((item, i) => (
            <div
              key={i}
              className="help-card w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-full flex flex-col items-center justify-center text-center px-6 border border-yellow-500/40 hover:border-yellow-400 transition duration-500"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      <div className="mt-16 h-[0.5px] w-full bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] opacity-70"></div>

        <div className="mt-16 h-[1px] w-full bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]"></div>

      </div>
    </section>
  );
}
