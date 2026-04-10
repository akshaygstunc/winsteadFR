"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Star, Quote } from "lucide-react";
import avatar from "../../public/Subtract.png";
import ReviewText from "./ReviewText";
import WebsiteContentService from "../services/websitecontent.service";

type TestimonialItem = {
  _id?: string;
  role?: string;
  data?: {
    name?: string;
    quote?: string;
    rating?: number | string;
  };
};

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [testimonialsdata, settestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomePage() {
      try {
        setLoading(true);
        const testimonials = await WebsiteContentService.getTestimonials();
        settestimonials(testimonials || []);
      } catch (error) {
        console.error("Error fetching homepage content:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomePage();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-heading", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".testimonial-subtext", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(".review-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
      });
    }, sectionRef);

    let index = 0;
    const cardWidth = 374;

    const animate = () => {
      if (!trackRef.current || loading || testimonialsdata.length <= 1) return;

      index++;

      gsap.to(trackRef.current, {
        x: -(cardWidth * index),
        duration: 1.2,
        ease: "power3.inOut",
      });

      if (index >= testimonialsdata.length - 1) {
        setTimeout(() => {
          if (!trackRef.current) return;
          gsap.set(trackRef.current, { x: 0 });
          index = 0;
        }, 1200);
      }
    };

    const interval = setInterval(animate, 4500);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [loading, testimonialsdata.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white px-6 md:px-16 py-4"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] bg-yellow-400/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[85rem] relative mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#F1DC7F] mb-4">
              Client Testimonials
            </p>

            <h2 className="testimonial-heading text-3xl md:text-5xl font-semibold leading-tight">
              Stories of trust,
              <span className="bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                {" "}
                confidence, and results
              </span>
            </h2>

            <p className="testimonial-subtext mt-5 text-white text-base md:text-lg leading-relaxed">
              Discover how our clients experienced a smoother, smarter, and more
              refined property journey with expert guidance every step of the way.
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-6 will-change-transform">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="relative min-w-[300px] md:min-w-[350px] lg:min-w-[360px] rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 md:p-8 animate-pulse overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(241,220,127,0.08),transparent_55%)] opacity-70 pointer-events-none" />

                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/10 bg-white/[0.04]" />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-32 rounded bg-white/10" />
                      <div className="h-4 w-24 rounded bg-white/10" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-4/5 rounded bg-white/10" />
                  </div>

                  <div className="flex gap-1 mt-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10"
                      />
                    ))}
                  </div>

                  <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                    <div className="h-3 w-24 rounded bg-white/10" />
                    <div className="h-4 w-20 rounded bg-white/10" />
                  </div>
                </div>
              ))
              : testimonialsdata?.map((review, i) => (
                <div
                  key={review._id || i}
                  className="group relative min-w-[300px] md:min-w-[350px] lg:min-w-[360px] rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#F1DC7F]/30 hover:shadow-[0_0_40px_rgba(241,220,127,0.10)]"
                >
                  <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(241,220,127,0.12),transparent_55%)] opacity-70 pointer-events-none" />

                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#F1DC7F]/80">
                    <Quote size={16} />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-full p-[1.5px] bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)]">
                      <div className="w-full h-full rounded-full overflow-hidden bg-black">
                        <Image
                          src={avatar}
                          alt={review?.data?.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {review?.data?.name}
                      </h4>
                      <p className="text-sm lg:text-md text-white">
                        {review?.role}
                      </p>
                    </div>
                  </div>

                  <ReviewText text={review?.data?.quote || ""} />

                  <div className="flex gap-1 mt-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center"
                      >
                        <Star
                          size={14}
                          className="text-[#F1DC7F]"
                          fill="currentColor"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.22em] text-white">
                      Verified Review
                    </span>

                    <span className="text-sm lg:text-md text-[#F1DC7F]">
                      {review?.data?.rating || 5}.0 Rating
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="h-[1px] w-full bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />
        </div>
      </div>
    </section>
  );
}