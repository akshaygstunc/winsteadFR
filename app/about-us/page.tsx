"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineHandshake, MdOutlineSupportAgent } from "react-icons/md";
import { PiMapPinLineDuotone } from "react-icons/pi";
import { RiSparklingLine } from "react-icons/ri";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import image2 from "../../public/image_5.png";
import aboutImg from "../../public/about.png";
import img1 from "../../public/hero1.jpg";
import img2 from "../../public/hero2.png";
import img3 from "../../public/hero3.jpg";
import img5 from "../../public/male.png";
import img4 from "../../public/hero4.png";
import AboutHero from "../components/about/About";

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "500+", label: "Properties Showcased" },
  { value: "200+", label: "Happy Clients" },
  { value: "24/7", label: "Client Assistance" },
];

const whyUs = [
  {
    title: "Premium Market Understanding",
    description:
      "We understand Dubai’s premium property landscape and guide clients with clarity, relevance, and confidence.",
    icon: <HiOutlineBuildingOffice2 className="text-[28px]" />,
  },
  {
    title: "Trust-Driven Relationships",
    description:
      "Our focus is not just selling a property, but building long-term trust through honest guidance and support.",
    icon: <MdOutlineHandshake className="text-[28px]" />,
  },
  {
    title: "Location & Investment Insight",
    description:
      "From lifestyle-led buying to investment-focused decisions, we help identify opportunities that truly fit.",
    icon: <PiMapPinLineDuotone className="text-[28px]" />,
  },
];

const helpItems = [
  "Buying premium apartments, villas, and branded residences",
  "Exploring investment-friendly real estate opportunities",
  "Understanding location advantages and market positioning",
  "Shortlisting properties aligned with lifestyle and goals",
  "Receiving transparent support through every decision stage",
  "Getting a more curated and premium buying experience",
];

const galleryImages = [
  { src: img1, alt: "Luxury property exterior" },
  { src: img2, alt: "Modern premium interior" },
  { src: img3, alt: "Dubai skyline lifestyle" },
  { src: img4, alt: "Real estate consultation visual" },
];

export default function AboutUs() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* HERO */}
      <AboutHero />



      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-6">
                      <AutoBreadcrumbs />
                    </section>

      {/* 1. ABOUT SMALL SECTION - IMAGE + TEXT */}
      <section className="">
        <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:px-12">
          <section className="bg-black text-white py-16">
            <div className="grid md:grid-cols-[30%_70%] gap-10 items-center">
              {/* LEFT IMAGE */}
              <div>
                <Image
                  src={image2}
                  alt="About"
                  className="w-full h-[150px] md:h-[300px] object-cover rounded-xl"
                />
              </div>

              {/* RIGHT TEXT */}
              <div className="max-w-[85rem]">
                <h3 className="text-3xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                  About Winstead
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  Our extensive portfolio features an array of premium villas,
                  apartments, and townhouses designed to offer unmatched comfort
                  and elegance.
                </p>

                <p className="text-gray-300 mt-4 leading-relaxed">
                  Our team of experienced professionals is dedicated to helping
                  you find the perfect home that exceeds your expectations.
                </p>
              </div>
            </div>
          </section>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-[28px] overflow-hidden border border-[#b89b45]/25 bg-white/5 order-2 lg:order-1">
              <Image
                src={img1}
                alt="About Winstead section"
                className="w-full h-[320px] md:h-[400px] object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[12px] md:text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-[#b89b45] mb-4">
                Small Introduction
              </p>
              <h2 className="text-3xl md:text-3xl font-light leading-tight mb-6">
                We don’t just present properties — we present confidence.
              </h2>
              <p className="text-white leading-8 text-base md:text-lg mb-5">
                Our approach combines premium real estate presentation with practical
                advisory. We aim to make the search experience feel more curated, more
                transparent, and more valuable for buyers, families, and investors.
              </p>
              <p className="text-white leading-8 text-base md:text-lg">
                Whether someone is searching for a dream residence or a strategic
                investment, our role is to bring more clarity, trust, and direction to
                the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS - TEXT + IMAGE */}
      <section className="py-12 md:py-20">
        <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[12px] md:text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-[#b89b45] mb-4">
                Stats
              </p>
              <h2 className="text-3xl md:text-3xl font-light leading-tight mb-6">
                Numbers that reflect trust, growth, and premium service.
              </h2>
              <p className="text-white leading-8 text-base md:text-lg mb-8">
                Over time, our focus on quality guidance and curated opportunities has
                helped us build stronger client relationships and a more premium real
                estate presence.
              </p>

              <div className="grid grid-cols-2 gap-5">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[28px] border border-[#b89b45]/30 bg-white/[0.03] p-6 md:p-8 shadow-[0_0_30px_rgba(184,155,69,0.08)] text-center"
                  >
                    <h3 className="text-2xl md:text-2xl font-light text-[#d7bd70]">
                      {item.value}
                    </h3>
                    <p className="mt-3 text-sm lg:text-md lg:text-md md:text-base text-white">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[28px] overflow-hidden border border-[#b89b45]/25 bg-white/5">
              <Image
                src={img2}
                alt="Stats section image"
                className="w-full h-[320px] md:h-[520px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORD FROM CEO - CLEARLY VISIBLE IMAGE + TEXT */}
      <section className="">
        <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:px-12">
          <div className="rounded-[32px] border border-[#b89b45]/25 bg-gradient-to-br from-[#0f0f0f] to-[#151515] overflow-hidden">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] items-center">
              <div className="relative">
                <Image
                  src={img5}
                  alt="Word from CEO"
                  className="w-full h-[320px] md:h-[620px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="p-8 md:p-12 lg:p-16">
                <FaQuoteLeft className="text-[#b89b45] text-3xl md:text-4xl mb-6" />
                <p className="text-[12px] md:text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-[#b89b45] mb-4">
                  Word From CEO
                </p>
                <h2 className="text-3xl md:text-3xl font-light leading-tight mb-6">
                  Our vision is to make every real estate decision feel more informed,
                  elevated, and secure.
                </h2>
                <p className="text-white leading-8 text-base md:text-lg mb-5">
                  We believe premium real estate deserves premium guidance. That means
                  better listening, better understanding, and a stronger commitment to
                  helping each client move forward with confidence.
                </p>
                <p className="text-white leading-8 text-base md:text-lg mb-8">
                  Our goal is not only to showcase properties, but to create an
                  experience where every buyer and investor feels supported with clarity,
                  trust, and a more thoughtful approach.
                </p>

                <div>
                  <h4 className="text-lg md:text-xl font-medium text-white">CEO Name</h4>
                  <p className="text-[#d7bd70] text-sm lg:text-md lg:text-md md:text-base mt-1">
                    Chief Executive Officer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY US - IMAGE + TEXT */}
      <section className="py-12 md:py-15">
        <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[12px] md:text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-[#b89b45] mb-4">
                Why Us
              </p>
              <h2 className="text-3xl md:text-3xl font-light leading-tight mb-5">
                Why clients choose us for premium property guidance
              </h2>
              <p className="text-white leading-8 text-base md:text-lg mb-8">
                We combine presentation, market understanding, and relationship-led
                service to create a smoother and more premium real estate experience.
              </p>

              <div className="grid gap-5">
                {whyUs.map((item) => (
                  <div
                    key={item.title}
                    className="flex space-x-4 rounded-[28px] border border-[#b89b45]/25 bg-white/[0.03] p-2 md:p-6 shadow-[0_0_25px_rgba(184,155,69,0.06)]"
                  >
                    <div className="w-16 h-10 rounded-xl border border-[#b89b45]/40 bg-[#b89b45]/10 flex items-center justify-center text-[#d7bd70] mb-6">
                      {item.icon}

                    </div>
                    <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white leading-7">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[28px] overflow-hidden border border-[#b89b45]/25 bg-white/5">
              <Image
                src={img4}
                alt="Why choose us"
                className="w-full h-[320px] md:h-[745px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW WE CAN HELP - IMAGE + TEXT */}
      <section className="py-8 md:py-8">
        <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative rounded-[28px] overflow-hidden border border-[#b89b45]/25 bg-white/5 order-2 lg:order-1">
              <Image
                src={aboutImg}
                alt="How we can help"
                className="w-full h-[320px] md:h-[950px] object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[12px] md:text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-[#b89b45] mb-4">
                How We Can Help
              </p>
              <h2 className="text-3xl md:text-3xl font-light leading-tight mb-6">
                Helping you move from interest to the right opportunity
              </h2>
              <p className="text-white leading-8 text-base md:text-lg mb-8">
                Our role is to simplify the process, narrow down the right choices,
                and make sure every decision feels more strategic and better supported.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {helpItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-[22px] border border-[#b89b45]/20 bg-white/[0.03] px-5 py-4"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-white leading-2 ">{item}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
               
                  <div
                    className=" items-start gap-4 rounded-[22px] border border-[#b89b45]/20 bg-white/[0.03] px-5 py-4"
                  >
                  <div className="w-14 h-14 rounded-2xl border border-[#b89b45]/40 bg-[#b89b45]/10 flex items-center justify-center text-[#d7bd70] mb-5">
                      <RiSparklingLine className="text-[22px]" />
                    </div>
                  <h3 className="text-2xl font-light mb-3">Curated Experience</h3>
                  <p className="text-white leading-7">
                    We help reduce noise and focus on properties that actually align
                    with your needs.
                  </p>
                </div>
              

                <div className="rounded-[28px] border border-[#b89b45]/25 bg-white/[0.03] p-7">
                  <div className="w-14 h-14 rounded-2xl border border-[#b89b45]/40 bg-[#b89b45]/10 flex items-center justify-center text-[#d7bd70] mb-5">
                    <MdOutlineSupportAgent className="text-[28px]" />
                  </div>
                  <h3 className="text-2xl font-light mb-3">Guided Support</h3>
                  <p className="text-white leading-7">
                    From discovery to final decision, we stay involved with a
                    client-first and transparent approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALLERY WITH SLIDER */}
      <section className="py-8 md:py-8 pb-20 md:pb-4">
        <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center mb-10">
            <div>
              <p className="text-[12px] md:text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-[#b89b45] mb-4">
                Gallery
              </p>
              <h2 className="text-3xl md:text-3xl font-light leading-tight mb-4">
                A visual glimpse into the premium world we represent
              </h2>
              <p className="text-white leading-8 text-base md:text-lg">
                A more picturized section that keeps the same theme while making the
                page feel richer and more premium.
              </p>

              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={goPrev}
                  className="w-12 h-12 rounded-full border border-[#b89b45]/30 bg-white/[0.03] flex items-center justify-center hover:bg-[#b89b45] hover:text-black transition"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={goNext}
                  className="w-12 h-12 rounded-full border border-[#b89b45]/30 bg-white/[0.03] flex items-center justify-center hover:bg-[#b89b45] hover:text-black transition"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="relative rounded-[32px] overflow-hidden border border-[#b89b45]/25 bg-white/[0.03]">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {galleryImages.map((item, index) => (
                  <div key={index} className="min-w-full relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-[320px] md:h-[320px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-10 bg-[#d7bd70]" : "w-2.5 bg-white/40"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}