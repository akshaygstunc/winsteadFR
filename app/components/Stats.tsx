"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function Stats() {
  useEffect(() => {
    gsap.from(".stat", { scale: 0, stagger: 0.2 });
  }, []);

  const stats = [
    "50K+ Satisfied Customers",
    "2.5B+ Property Listed",
    "300+ Premium Developers",
    "60+ Locations",
  ];

  return (
    <div className="section flex justify-around">
      {stats.map((s, i) => (
        <div key={i} className="stat border border-gold rounded-full p-10 text-center">
          {s}
        </div>
      ))}
    </div>
  );
}