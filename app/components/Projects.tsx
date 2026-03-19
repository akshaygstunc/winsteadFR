"use client";
import gsap from "gsap";
import { useEffect } from "react";


const images = [
  "/subtract.png",
  "/subtract.png",
  "/subtract.png",
  "/subtract.png",
  "/subtract.png",
  "/subtract.png",
];
export default function Projects() {
  useEffect(() => {
    gsap.from(".card", {
      opacity: 0,
      y: 80,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="relative px-10 pt-40 pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-semibold">Featured Projects</h2>
          <p className="text-gray-400 text-sm mt-2">
            Discover exceptional properties with Winstead in premium locations worldwide.
          </p>
        </div>

        <button className="border border-yellow-500 px-5 py-2 rounded-lg text-sm hover:bg-yellow-500 hover:text-black transition">
          View All Projects
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">

        {[1,2,3,4,5,6].map((i) => (
          <div
            key={i}
            className="card relative h-[260px] rounded-2xl overflow-hidden group cursor-pointer"
          >

            {/* IMAGE */}
            <img
              src={images[i-1]}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* CONTENT */}
            <div className="absolute bottom-0 p-5 w-full">

              <h3 className="text-lg font-semibold">Aurelia Heights</h3>

              <div className="text-sm text-gray-300 mt-2 space-y-1">
                <p>2–8</p>
                <p>$2.3M – $3.8M</p>
                <p>2,800 – 7,200 sq.ft.</p>
                <p>Downtown Dubai, UAE</p>
              </div>

              <button className="mt-3 text-sm border border-yellow-500 px-4 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                Check Details
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}