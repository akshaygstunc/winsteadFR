"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import img1 from "../../public/hero1.jpg";
import img2 from "../../public/hero2.png";
import img3 from "../../public/hero3.jpg";

const slides = [
  {
    image: img1,
    title: "The Grand Estate",
    description1:
      "Experience unmatched luxury with our ultra premium residences. Designed with world-class architecture, high-end interiors, and prime locations, these homes redefine modern living.",
    description2:
      "From panoramic views to exclusive amenities, every detail is crafted for elegance and comfort.",
  },
  {
    image: img2,
    title: "Skyline Residences",
    description1:
      "Step into a lifestyle of sophistication with residences crafted for those who expect the extraordinary. Every space is designed to reflect timeless luxury and modern comfort.",
    description2:
      "Enjoy premium finishes, expansive layouts, and exceptional views in locations that elevate your everyday living experience.",
  },
  {
    image: img3,
    title: "Royal Horizon",
    description1:
      "Discover iconic living spaces where luxury meets architectural brilliance. These homes combine exclusivity, style, and comfort in every corner.",
    description2:
      "With refined interiors, curated amenities, and a prestigious address, every moment feels elevated and exceptional.",
  },
];

export default function UltraLuxury() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    if (!sliderRef.current) return;

    gsap.to(sliderRef.current, {
      x: `-${index * 100}%`,
      duration: 1,
      ease: "power3.inOut",
    });

    setActiveIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % slides.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="max-w-[87rem] mx-auto bg-black text-white py-16 px-6 md:px-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold">Ultra Luxury</h1>

        <Link
          href="/projects"
          className="border border-[#F1DC7F]/40 px-5 py-2 rounded-full text-sm lg:text-md hover:bg-yellow-400 hover:text-black transition"
        >
          View Projects
        </Link>
      </div>

      {/* WHOLE SECTION SLIDER */}
      <div className="overflow-hidden rounded-xl">
        <div ref={sliderRef} className="flex w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full grid md:grid-cols-[60%_40%] gap-8 items-start"
            >
              {/* LEFT IMAGE */}
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[250px] md:h-[325px] object-cover rounded-xl"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-2xl md:text-3xl text-yellow-400 mb-4">
                    {slide.title}
                  </h2>

                  <p className="text-gray-300 leading-relaxed">
                    {slide.description1}
                  </p>

                  <p className="text-gray-300 mt-4 leading-relaxed">
                    {slide.description2}
                  </p>
                </div>

                {/* BUTTONS IN PLACE OF BOTTOM IMAGES */}
                <div className="flex items-center gap-3 mt-8">
                  <a
                    className="px-6 py-3 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black font-medium hover:scale-[1.02] transition"
                  // onClick={() => openContactModal("book-consultation")}
                  >
                    Read More
                  </a>

                  {/* <button
                    onClick={nextSlide}
                    className="px-5 py-2 rounded-full border border-[#F1DC7F]/40 text-sm hover:bg-yellow-400 hover:text-black transition"
                  >
                    Next
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}