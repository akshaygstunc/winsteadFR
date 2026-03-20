"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Star } from "lucide-react";
import avatar from "../../public/Subtract.png";

const reviews = [
  { name: "Rubina Mukhtar", text: "Working with Abbas was wonderful. He has deep knowledge and guided us from start to end." },
  { name: "Amaan Ajmal", text: "Had an amazing experience buying property. Very smooth and professional." },
  { name: "YUSUF ERKASLAN", text: "Very reliable and trustworthy. The process was smooth and well managed." },
  { name: "Client Review", text: "Excellent service and seamless experience throughout the process." },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const loopedReviews = [...reviews, ...reviews];

  useEffect(() => {
    let index = 0;
    const cardWidth = 320; // adjust based on your card width

    const animate = () => {
      index++;

      gsap.to(trackRef.current, {
        x: -(cardWidth * index),
        duration: 0.8,
        ease: "power2.inOut",
      });

      if (index >= reviews.length) {
        setTimeout(() => {
          gsap.set(trackRef.current, { x: 0 });
          index = 0;
        }, 900);
      }
    };

    const interval = setInterval(animate, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white px-6 md:px-16 pt-0 py-20 overflow-hidden">
      <div className=" mx-auto">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-16">
          Stories from Our Clients
        </h2>

        {/* SLIDER */}
        <div className="">
          <div ref={trackRef} className="flex gap-6">

            {loopedReviews.map((review, i) => (
              <div
                key={i}
                className="min-w-[280px] md:min-w-[300px] bg-[#0f0f0f] p-6 pt-12 rounded-[28px] relative text-center flex flex-col items-center transition duration-300 hover:shadow-[0_0_30px_rgba(241,220,127,0.15)]"
              >

                {/* GLOW */}
                <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none"></div>

                {/* AVATAR */}
                <div className="absolute -top-8 w-20 h-20 rounded-full p-[2px] bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black">
                    <Image
                      src={avatar}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* NAME */}
                <h4 className="text-lg font-semibold mb-2 mt-2">
                  {review.name}
                </h4>

                {/* TEXT */}
                <p className="text-sm text-gray-300 leading-relaxed mb-4 max-w-xs">
                  {review.text}
                </p>

                {/* STARS */}
                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} fill="gold" />
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-16 flex justify-center md:justify-start">
          <button className="border border-yellow-500 px-6 py-2 rounded-md text-sm hover:bg-yellow-500 hover:text-black transition">
            Write a Review
          </button>
        </div>

      </div>

      {/* GOLD LINE */}
      <div className="mt-16 h-[0.5px] w-full bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] opacity-70"></div>
    </section>
  );
}