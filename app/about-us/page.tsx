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
import WebsiteContentService from "../services/websitecontent.service";



export default function AboutUs() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [aboutPage, setAboutPage] = useState<any>({});
  const galleryImages =
    aboutPage?.data?.media?.map((img: string) => ({
      src: img,
      alt: "gallery",
    })) || [];
  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await WebsiteContentService.getAboutPage();
        setAboutPage(res);
      } catch (error) {
        console.error("Error fetching about page:", error);
      }
    }

    fetchAbout();
  }, []);
  useEffect(() => {
    if (!galleryImages.length) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [galleryImages.length]);
  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const stats = [
    {
      value: aboutPage?.data?.stat1Number,
      label: aboutPage?.data?.stat1Label,
    },
    {
      value: aboutPage?.data?.stat2Number,
      label: aboutPage?.data?.stat2Label,
    },
    {
      value: aboutPage?.data?.stat3Number,
      label: aboutPage?.data?.stat3Label,
    },
    {
      value: aboutPage?.data?.stat4Number,
      label: aboutPage?.data?.stat4Label,
    },
  ];
  const whyUs = [
    {
      title: aboutPage?.data?.whyChooseCard1Title,
      description: aboutPage?.data?.whyChooseCard1Description,
      icon: <HiOutlineBuildingOffice2 className="text-[28px]" />,
    },
    {
      title: aboutPage?.data?.whyChooseCard2Title,
      description: aboutPage?.data?.whyChooseCard2Description,
      icon: <MdOutlineHandshake className="text-[28px]" />,
    },
    {
      title: aboutPage?.data?.whyChooseCard3Title,
      description: aboutPage?.data?.whyChooseCard3Description,
      icon: <PiMapPinLineDuotone className="text-[28px]" />,
    },
  ];


  const helpItems = [
    aboutPage?.data?.point1Text,
    aboutPage?.data?.point2Text,
    aboutPage?.data?.point3Text,
    aboutPage?.data?.point4Text,
    aboutPage?.data?.point5Text,
    aboutPage?.data?.point6Text,
  ];



  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* HERO */}
      <AboutHero data={aboutPage?.data} />


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
                <div className="relative w-full h-[150px] md:h-[300px]">
                  <Image
                    src={aboutPage?.data?.aboutWinsteadImage || image2}
                    alt="About"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* RIGHT TEXT */}
              <div className="max-w-[85rem]">
                <h3 className="text-3xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                  {aboutPage?.data?.aboutWinsteadTitle || "About Winstead"}
                </h3>

                {aboutPage?.data?.aboutWinsteadDescription
                  ?.split("\n\n")
                  .map((para: string, index: number) => (
                    <p
                      key={index}
                      className="text-gray-300 leading-relaxed mt-4 first:mt-0"
                    >
                      {para}
                    </p>
                  ))}
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
                {aboutPage?.data?.description || "We don’t just present properties — we present confidence."}
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
                {aboutPage?.data?.statsTitle || 'Numbers that reflect trust, growth, and premium service.'}               </h2>
              <p className="text-white leading-8 text-base md:text-lg mb-8">
                {aboutPage?.data?.statsSubtitle || 'Over time, our focus on quality guidance and curated opportunities has helped us build stronger client relationships and a more premium real         estate presence.'}
              </p>

              <div className="grid grid-cols-2 gap-5">
                {stats.map((item, index) => (
                  <div
                    key={index}
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

              {/* IMAGE (keep static or make dynamic later) */}
              <div className="relative">
                <img
                  src={aboutPage?.data?.ceoImage || img5}
                  alt="Word from CEO"
                  className="w-full h-[320px] md:h-[620px] object-cover"
                  // width={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-8 md:p-12 lg:p-16">
                <FaQuoteLeft className="text-[#b89b45] text-3xl md:text-4xl mb-6" />

                <p className="text-[12px] md:text-sm lg:text-md uppercase tracking-[0.25em] text-[#b89b45] mb-4">
                  {aboutPage?.data?.ceoMessageTitle || "Word From CEO"}
                </p>

                <h2 className="text-3xl md:text-3xl font-light leading-tight mb-6">
                  {aboutPage?.data?.ceoMessageTitle}
                </h2>

                {/* DESCRIPTION (handles multiple paragraphs) */}
                {aboutPage?.data?.ceoMessageDescription
                  ?.split("\n\n")
                  .map((para: string, index: number) => (
                    <p
                      key={index}
                      className="text-white leading-8 text-base md:text-lg mb-5"
                    >
                      {para}
                    </p>
                  ))}

                {/* NAME */}
                <div>
                  <h4 className="text-lg md:text-xl font-medium text-white">
                    {aboutPage?.data?.ceoName}
                  </h4>

                  <p className="text-[#d7bd70] text-sm md:text-base mt-1">
                    {aboutPage?.data?.ceoDesignation}
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
                {aboutPage?.data?.whyChooseTitle || "Why clients choose us for premium property guidance"}
              </h2>
              <p className="text-white leading-8 text-base md:text-lg mb-8">
                {aboutPage?.data?.whyChooseDescription || "We combine presentation, market understanding, and relationship-led service to create a smoother and more premium real estate experience."}
              </p>

              <div className="grid gap-5">
                {whyUs.map((item, index) => (
                  <div
                    key={index}
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
              <div className="relative w-full h-[320px] md:h-[745px]">
                <Image
                  src={aboutPage?.data?.whyChooseImage || img4}
                  alt="Why choose us"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW WE CAN HELP - IMAGE + TEXT */}
      <section className="py-8 md:py-8">
        <div className="max-w-[88rem] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* IMAGE */}
            <div className="relative rounded-[28px] overflow-hidden border border-[#b89b45]/25 bg-white/5 order-2 lg:order-1">
              <div className="relative w-full h-[320px] md:h-[950px]">
                <Image
                  src={aboutPage?.data?.howWeHelpImage || aboutImg}
                  alt="How we can help"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="order-1 lg:order-2">

              {/* TITLE */}
              <p className="text-[12px] md:text-sm lg:text-md uppercase tracking-[0.25em] text-[#b89b45] mb-4">
                How We Can Help
              </p>

              {/* HEADING */}
              <h2 className="text-3xl md:text-3xl font-light leading-tight mb-6">
                {aboutPage?.data?.howWeHelpTitle || "Guidance that goes beyond listings — making the search smoother, clearer, and more rewarding."}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-white leading-8 text-base md:text-lg mb-8">
                {aboutPage?.data?.howWeHelpDescription || "NO DESCRIPTION"}
              </p>

              {/* POINTS */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  aboutPage?.data?.point1Text,
                  aboutPage?.data?.point2Text,
                  aboutPage?.data?.point3Text,
                  aboutPage?.data?.point4Text,
                  aboutPage?.data?.point5Text,
                  aboutPage?.data?.point6Text,
                ]
                  .filter(Boolean)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-[22px] border border-[#b89b45]/20 bg-white/[0.03] px-5 py-4"
                    >
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-white leading-2">{item}</p>
                    </div>
                  ))}
              </div>

              {/* CARDS */}
              <div className="grid md:grid-cols-2 gap-5">

                {/* Curated Experience */}
                <div className="rounded-[22px] border border-[#b89b45]/20 bg-white/[0.03] px-5 py-4">
                  <div className="w-14 h-14 rounded-2xl border border-[#b89b45]/40 bg-[#b89b45]/10 flex items-center justify-center text-[#d7bd70] mb-5">
                    <RiSparklingLine className="text-[22px]" />
                  </div>
                  <h3 className="text-2xl font-light mb-3">
                    {aboutPage?.data?.curatedExperienceTitle}
                  </h3>
                  <p className="text-white leading-7">
                    {aboutPage?.data?.curatedExperienceDescription}
                  </p>
                </div>

                {/* Guided Support */}
                <div className="rounded-[28px] border border-[#b89b45]/25 bg-white/[0.03] p-7">
                  <div className="w-14 h-14 rounded-2xl border border-[#b89b45]/40 bg-[#b89b45]/10 flex items-center justify-center text-[#d7bd70] mb-5">
                    <MdOutlineSupportAgent className="text-[28px]" />
                  </div>
                  <h3 className="text-2xl font-light mb-3">
                    {aboutPage?.data?.guidedSupportTitle}
                  </h3>
                  <p className="text-white leading-7">
                    {aboutPage?.data?.guidedSupportDescription}
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
                {aboutPage?.data?.galleryTitle || 'A visual glimpse into the premium world we represent'}
              </h2>
              <p className="text-white leading-8 text-base md:text-lg">
                {aboutPage?.data?.galleryDescription || 'A more picturized section that keeps the same theme while making the page feel richer and more premium.'}
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
                {/* {galleryImages.map((item, index) => (
                  <div key={index} className="min-w-full relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-[320px] md:h-[320px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                ))} */}

                {galleryImages.map((item, index) => (
                  <div key={index} className="min-w-full relative">

                    <div className="relative w-full h-[320px] md:h-[320px]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>

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