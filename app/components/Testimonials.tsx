"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FcGoogle } from "react-icons/fc";
import { Star } from "lucide-react";
import avatar from "../../public/Subtract.png";

const reviews = [
  {
    name: "Rubina Mukhtar",
    text: "Working with Abbas was wonderful. He has deep knowledge and guided us from start to end.",
    time: "4 weeks ago",
  },
  {
    name: "Amaan Ajmal",
    text: "Had an amazing experience buying property. Very smooth and professional.",
    time: "3 weeks ago",
  },
  {
    name: "Amaan Ajmal",
    text: "Had an amazing experience buying property. Very smooth and professional.",
    time: "3 weeks ago",
  },
   {
    name: "YUSUF ERKASLAN",
    text: "Very reliable and trustworthy. The process was smooth and well managed.",
    time: "9 weeks ago",
  },
  {
    name: "Amaan Ajmal",
    text: "Had an amazing experience buying property. Very smooth and professional.",
    time: "3 weeks ago",
  },
 
  {
    name: "Extra Review",
    text: "Another happy client experience.",
    time: "1 week ago",
  },
  {
    name: "Extra Review",
    text: "Another happy client experience.",
    time: "1 week ago",
  },
  {
    name: "Extra Review",
    text: "Another happy client experience.",
    time: "1 week ago",
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
const loopedReviews = [...reviews, ...reviews];
 useEffect(() => {
  let index = 0;
  const cardWidth = 370; // adjust if needed

  const animate = () => {
    index++;

    gsap.to(trackRef.current, {
      x: -(cardWidth * index),
      duration: 0.8,
      ease: "power2.inOut",
    });

    // seamless reset (no jump visible)
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
    <section className="bg-black text-white px-6 md:px-16 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-start">

        {/* LEFT */}
        <div className="lg:col-span-1">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-yellow-400">
            What Our Clients Say
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <Image
              src={avatar}
              alt="company"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg">Richkey Properties</h3>
              <div className="flex items-center gap-1 text-yellow-400">
                <FcGoogle />
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="gold" />
                ))}
              </div>
              <p className="text-sm text-gray-400">4.8 (200 reviews)</p>
            </div>
          </div>

          <button className="mt-6 border rounded-md border-yellow-500 px-6 py-3 text-sm hover:bg-yellow-500 hover:text-black transition">
            Write a Review
          </button>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6"
          >
           {loopedReviews.map((review, i) => (
              <div
                key={i}
                className="min-w-[320px] md:min-w-[350px] bg-[#111] p-6 rounded-2xl relative"
              >
                <div className="absolute top-4 right-4">
                  <FcGoogle />
                </div>

                <h4 className="text-lg mb-1">{review.name}</h4>

                <div className="flex text-yellow-400 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="gold" />
                  ))}
                </div>

                <p className="text-xs text-gray-400 mb-3">
                  {review.time}
                </p>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {review.text}{" "}
                  <span className="text-yellow-400 cursor-pointer">
                    Read more
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="mt-16 h-[0.5px] w-full bg-[linear-gradient(84.04deg,#B9A650_0.77%,#F1DC7F_43.94%,#7C5700_82.27%)] opacity-70"></div>
    </section>
  );
}