"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaMapMarkerAlt, FaBed, FaRulerCombined } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import img from "../../../public/image_7.png";
import img2 from "../../../public/image_6.png";
import img3 from "../../../public/image_5.png";
import { useParams, useRouter } from "next/navigation";

const gallery = [img, img2, img3, img, img];

const allProjects = [
  {
    id: 1,
    title: "Aurelia Heights",
    type: "Residential",
    residence: "Villa",
    location: "Dubai",
    category: "Luxury",
  },
  {
    id: 2,
    title: "Skyline Tower",
    type: "Residential",
    residence: "Apartment",
    location: "Dubai",
    category: "Elite",
  },
  {
    id: 3,
    title: "Palm Villas",
    type: "Residential",
    residence: "Villa",
    location: "Abu Dhabi",
    category: "Ultra Luxury",
  },
  {
    id: 4,
    title: "Business Bay Offices",
    type: "Commercial",
    residence: "Office",
    location: "Dubai",
    category: "Luxury",
  },
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const heroRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState("1 Bedroom");

  const id = Number(params.id);
  const project = allProjects.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(img);

  useEffect(() => {
    gsap.from(heroRef.current, {
      scale: 1.05,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".hero-content", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      stagger: 0.12,
      ease: "power3.out",
    });

    gsap.from(contentRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 0.45,
      ease: "power3.out",
    });

    gsap.from(".floor-card", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          <FaArrowLeft />
          Back to Projects
        </button>
      </div>

      {/* HERO */}
      <section className="relative mt-4">
        <div
          ref={heroRef}
          className="relative h-[78vh] min-h-[560px] w-full overflow-hidden rounded-b-[32px]"
        >
          <Image src={activeImage} alt="project" fill className="object-cover" />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />

          <div className="absolute top-8 right-8 hidden md:block rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-5 py-4 hero-content">
            <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-1">
              Category
            </p>
            <p className="text-white font-medium">{project?.category}</p>
          </div>

          <div className="absolute bottom-6 left-4 right-4 md:bottom-10 md:left-10 md:right-10">
            <div className="max-w-6xl rounded-[28px] border border-white/10 bg-black/35 backdrop-blur-xl p-6 md:p-8 shadow-[0_0_40px_rgba(250,204,21,0.06)]">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
                <div>
                  <p className="hero-content text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                    Signature Residence
                  </p>

                  <h1 className="hero-content text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">
                    {project?.title}
                  </h1>

                  <div className="hero-content flex items-center gap-2 text-base md:text-lg text-gray-200 mb-4">
                    <FaMapMarkerAlt className="text-yellow-400" />
                    Downtown Dubai, UAE
                  </div>

                  <p className="hero-content text-gray-300 max-w-3xl leading-relaxed text-sm md:text-base">
                    A refined collection of ultra-luxury residences designed for
                    buyers seeking iconic location, architectural elegance, and
                    long-term value in one of Dubai’s most desirable districts.
                  </p>

                  <div className="hero-content flex flex-wrap gap-3 mt-6">
                    {["Skyline Views", "Private Living", "Prime Address", "Low Density"].map(
                      (item) => (
                        <span
                          key={item}
                          className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-200"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="hero-content rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Starting Price</span>
                      <span className="text-white font-semibold">$2.3M</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Bedrooms</span>
                      <span className="text-white font-semibold">2–8</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Size Range</span>
                      <span className="text-white font-semibold">2,800 – 7,200 sq.ft.</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Property Type</span>
                      <span className="text-white font-semibold">{project?.residence}</span>
                    </div>
                  </div>

                  <button className="mt-6 w-full rounded-2xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black py-4 font-semibold hover:scale-[1.02] transition">
                    Schedule Private Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY THUMBNAILS */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {gallery.map((g, i) => {
            const active = activeImage === g;
            return (
              <button
                key={i}
                onClick={() => setActiveImage(g)}
                className={`relative w-[170px] h-[110px] rounded-2xl overflow-hidden border transition shrink-0 ${active
                    ? "border-yellow-400 shadow-[0_0_20px_rgba(241,220,127,0.18)]"
                    : "border-white/10 hover:border-yellow-500/40"
                  }`}
              >
                <Image src={g} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </button>
            );
          })}
        </div>
      </section>

      {/* CONTENT */}
      <section ref={contentRef} className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          {/* LEFT CONTENT */}
          <div>
            {/* TABS */}
            <div className="inline-flex bg-white/5 border border-white/10 rounded-2xl p-1 backdrop-blur-md mb-8">
              {["overview", "lifestyle", "amenities"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-sm rounded-xl transition-all duration-300 capitalize ${activeTab === tab
                      ? "bg-white/10 text-white shadow-inner"
                      : "text-gray-400 hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-sm p-7 md:p-9">
              {activeTab === "overview" && (
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    A landmark address with refined private living
                  </h2>

                  <p>
                    Aurelia Heights offers a limited collection of ultra-luxury
                    residences set within one of Dubai’s most prestigious districts.
                    Designed with generous layouts, elevated finishes, and an
                    emphasis on privacy, it brings together prestige, comfort,
                    and long-term investment appeal.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    {[
                      "Prime Downtown Dubai location",
                      "2 to 8-bedroom luxury residences",
                      "2,800 – 7,200 sq.ft. expansive layouts",
                      "Panoramic skyline views",
                      "Low-density private living",
                      "Curated lifestyle environment",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "lifestyle" && (
                <div className="space-y-5 text-gray-300 leading-relaxed">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    Designed for a more elevated lifestyle
                  </h2>
                  <p>
                    From fine dining and high-end retail to private leisure and
                    cultural access, Aurelia Heights is positioned for residents
                    who value convenience, prestige, and everyday sophistication.
                  </p>
                  <p>
                    The surrounding district combines connectivity with privacy,
                    allowing a seamless experience between city energy and personal retreat.
                  </p>
                </div>
              )}

              {activeTab === "amenities" && (
                <div className="space-y-5">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    Premium amenities curated for comfort
                  </h2>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-300">
                    {[
                      "Infinity Swimming Pool",
                      "Private Cinema",
                      "Wellness Spa",
                      "Fitness Studio",
                      "Residents Lounge",
                      "Landscaped Leisure Areas",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FLOOR PLANS */}
            <div className="mt-16">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                  Floor Plans
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Flexible layouts for different lifestyles
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "1 Bedroom", size: "2,800 - 7,200 sq.ft." },
                  { title: "2 Bedroom", size: "7,200 - 8,400 sq.ft." },
                  { title: "3 Bedroom", size: "8,400 - 9,800 sq.ft." },
                ].map((item, i) => {
                  const isActive = selectedPlan === item.title;

                  return (
                    <div
                      key={i}
                      ref={(el) => (cardRefs.current[i] = el)}
                      onClick={() => {
                        setSelectedPlan(item.title);

                        cardRefs.current[i]?.scrollIntoView({
                          behavior: "smooth",
                          inline: "center",
                          block: "nearest",
                        });
                      }}
                      className={`cursor-pointer rounded-[28px] border p-5 transition-all duration-300
        ${isActive
                          ? "border-yellow-400 bg-gradient-to-b from-yellow-500/10 to-white/5 shadow-[0_0_40px_rgba(241,220,127,0.15)] scale-[1.03]"
                          : "border-white/15 bg-white/[0.06] hover:border-yellow-500/30 hover:bg-white/[0.09]"
                        }`}
                    >
                      {/* IMAGE */}
                      <div className="relative h-[180px] rounded-2xl overflow-hidden mb-5">
                        <Image src={img2} alt="" fill className="object-cover" />
                        <div className={`absolute inset-0 ${isActive ? "bg-black/10" : "bg-black/20"}`} />
                      </div>

                      {/* TEXT */}
                      <h3 className={`text-xl font-semibold mb-1 ${isActive ? "text-white" : "text-white/90"}`}>
                        {item.title}
                      </h3>

                      <p className={`${isActive ? "text-gray-300" : "text-gray-400"} text-sm mb-1`}>
                        Apartment
                      </p>

                      <p className={`${isActive ? "text-gray-400" : "text-gray-500"} text-sm mb-5`}>
                        {item.size}
                      </p>

                      {/* BUTTON */}
                      <button
                        className={`w-full rounded-2xl py-3 transition ${isActive
                            ? "bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black font-semibold"
                            : "border border-white/20 text-white/90 hover:border-yellow-400 hover:text-white"
                          }`}
                      >
                        {isActive ? "Selected Plan" : "View Floor Plan"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE STICKY PANEL */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="rounded-[28px] border border-yellow-500/20 bg-white/5 backdrop-blur-sm p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                Quick Facts
              </p>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <FaBed className="text-yellow-400" />
                  2–8 Bedrooms
                </div>
                <div className="flex items-center gap-3">
                  <FaRulerCombined className="text-yellow-400" />
                  2,800 – 7,200 sq.ft.
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-yellow-400" />
                  Downtown Dubai
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#111] to-[#0b0b0b] p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                Developer
              </p>

              <h3 className="text-2xl font-semibold mb-3">DAMAC Properties</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                DAMAC is a Dubai-based luxury real estate developer known for
                premium residential and commercial projects across the Middle East
                and international markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-20">
        <div className="rounded-[32px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-6 md:p-10 lg:p-14">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                Register Interest
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-5">
                Enquire about {project?.title} with a private consultation.
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-xl">
                Share your requirements and our team will help you explore layouts,
                pricing, availability, and the next best step with clarity.
              </p>
            </div>

            <form className="space-y-4">
              <input
                placeholder="Enter your full name"
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="+971"
                  className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
                <input
                  placeholder="Enter your email"
                  className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-400 transition">
                  <option>Apartment</option>
                </select>

                <select className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-400 transition">
                  <option>3 Bedrooms</option>
                </select>
              </div>

              <button className="w-full rounded-2xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black py-4 font-semibold hover:scale-[1.01] transition inline-flex items-center justify-center gap-2">
                Submit Inquiry <FaArrowRight />
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}