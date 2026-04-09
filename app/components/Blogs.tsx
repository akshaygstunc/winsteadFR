"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import image1 from "../../public/blog1.png";
import image2 from "../../public/blog2.png";
import image3 from "../../public/blog3.png";
import image4 from "../../public/blog4.png";

const blogs = [
  {
    title: "Defining Modern Luxury Living in Global Real Estate Markets",
    image: image1,
  },
  {
    title: "Defining Modern Luxury Living in Global Real Estate Markets",
    image: image2,
  },
  {
    title: "Defining Modern Luxury Living in Global Real Estate Markets",
    image: image3,
  },
  {
    title: "Defining Modern Luxury Living in Global Real Estate Markets",
    image: image4,
  },
];

export default function Blogs() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white px-6 md:px-16 py-0 mb-10"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light">Our Latest Blogs</h2>

        <button className="text-[1.05rem] rounded-md hidden md:block border border-yellow-500 px-6 py-2 text-sm lg:text-xl lg:text-xl hover:bg-yellow-500 hover:text-black transition">
          View All Blogs
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog, i) => (
          <div key={i} className="blog-card group cursor-pointer">
            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={blog.image}
                alt="blog"
                className="w-full h-[180px] object-cover transition duration-500 group-hover:scale-110"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
            </div>

            {/* CONTENT */}
            <div className="mt-4">
              <h4 className="text-[1.15rem] leading-relaxed mb-2 group-hover:text-yellow-400 transition">
                {blog.title}
              </h4>

              <p className="text-xs text-yellow-400 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                Read Now →
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE BUTTON */}
      <div className="mt-10 md:hidden">
        <button className="w-full border border-yellow-500 py-3 text-sm lg:text-xl lg:text-xl hover:bg-yellow-500 hover:text-black transition">
          View All Blogs
        </button>
      </div>
    </section>
  );
}
