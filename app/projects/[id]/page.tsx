"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaMapMarkerAlt, FaBed, FaRulerCombined } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
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
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const id = Number(params.id);

  const project = allProjects.find((p) => p.id == id);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(img);

  useEffect(() => {
    // HERO ANIMATION
    gsap.from(heroRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // CONTENT ANIMATION
    gsap.from(contentRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.from(".floor-card", {
  y: 80,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
});
  }, []);
const router = useRouter();
  return (
    <div className="bg-black text-white min-h-screen">
      {/* 🔥 BACK */}
      <div
      onClick={() => router.back()}
      className="flex items-center gap-2 p-6 text-sm cursor-pointer">
        <FaArrowLeft />
        Back
      </div>

      {/* 🔥 HERO */}
      <div ref={heroRef} className="relative h-[70vh] w-full overflow-hidden">
        <Image src={activeImage} alt="project" fill className="object-cover" />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* CONTENT */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center items-end">
          <div className="flex items-center p-2">
            <h1 className="text-3xl md:text-5xl font-semibold mb-3 mr-4 border-r pr-4">
              {project?.title}
            </h1>

            <div className="flex flex-col justify-center gap-2 text-sm text-gray-300">
              <h1 className="text-3xl md:text46xl font-bold">
                {project?.title}
              </h1>
              <span className="flex text-xl items-center gap-2">
                <FaMapMarkerAlt /> Downtown Dubai, UAE
              </span>
              <div className="flex items-center gap-2 text-[#FFFFFFAD]">
                <span>$2.3M - $3.8M</span>
                <span className="flex items-center gap-2">
                  <FaBed /> 2-8
                </span>
                <span className="flex items-center gap-2">
                  <FaRulerCombined /> 2,800 - 7,200 sq.ft.
                </span>
              </div>
            </div>
          </div>

          <button className="bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black px-6 py-3 rounded-xl">
            Schedule Private Visit
          </button>
        </div>
      </div>

      {/* 🔥 THUMBNAILS */}
      <div className="flex gap-4 px-10 py-4 overflow-x-auto bg-[#FFFFFF1A] mb-6">
        {gallery.map((g, i) => (
          <div
            key={i}
            onClick={() => setActiveImage(g)}
            className="relative w-[150px] h-[100px] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#d4a373]"
          >
            <Image src={g} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* 🔥 TABS */}
      <div className="px-10">
        <div className="inline-flex bg-white/5 border border-white/10 rounded-2xl p-1 backdrop-blur-md">
          {["overview", "lifestyle", "amenities"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm rounded-xl transition-all duration-300 capitalize
        ${
          activeTab === tab
            ? "bg-white/10 text-white shadow-inner"
            : "text-gray-400 hover:text-white"
        }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* 🔥 CONTENT */}
      <div ref={contentRef} className="px-10 py-8 max-w-5xl">
        {activeTab === "overview" && (
          <div className="space-y-4 text-gray-300 text-xl leading-relaxed">
            <p>
              Aurelia Heights offers a limited collection of ultra-luxury
              residences set within one of Dubai’s most prestigious districts.
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Prime Downtown Dubai location</li>
              <li>2 to 8-bedroom luxury residences</li>
              <li>2,800 – 7,200 sq.ft. expansive layouts</li>
              <li>Panoramic skyline views</li>
              <li>Low-density, private living</li>
            </ul>
          </div>
        )}

        {activeTab === "lifestyle" && (
          <div className="text-gray-300">
            Designed for elite living with world-class dining, retail, and
            entertainment.
          </div>
        )}

        {activeTab === "amenities" && (
          <div className="text-gray-300 grid grid-cols-2 gap-4">
            <div>Swimming Pool</div>
            <div>Private Cinema</div>
            <div>Gym</div>
            <div>Spa</div>
          </div>
        )}
      </div>
      <div ref={contentRef} className="px-10 pb-20">

  {/* 🔥 FLOOR PLANS */}
  <h2 className="text-3xl font-semibold mb-8">
    {project?.title} Floor Plans
  </h2>

  <div className="grid md:grid-cols-3 gap-6 mb-20">

    {[
      { title: "1BHK", size: "2,800 - 7,200 sq.ft." },
      { title: "2BHK", size: "7,200 - 8,400 sq.ft." },
      { title: "3BHK", size: "8,400 - 9,800 sq.ft." },
    ].map((item, i) => (
      <div
        key={i}
        className="border border-white/10 rounded-2xl p-4 bg-[#0c0c0c] hover:border-[#d4a373] transition"
      >
        <div className="flex gap-4 items-center mb-4">
          <div className="w-[120px] h-[120px] relative rounded-lg overflow-hidden bg-black">
            <Image src={img2} alt="" fill className="object-cover" />
          </div>

          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-400 text-sm">Apartment</p>
            <p className="text-gray-500 text-xs">{item.size}</p>
          </div>
        </div>

        <button className="w-full border border-[#d4a373]/40 text-[#F1DC7F] py-2 rounded-lg hover:bg-[#d4a373] hover:text-black transition">
          Get Floor Plan Details
        </button>
      </div>
    ))}
  </div>

  {/* 🔥 DEVELOPER SECTION */}
  <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
    
    <div className="max-w-xl">
      <h3 className="text-2xl font-semibold text-[#F1DC7F] mb-3">
        DAMAC Properties
      </h3>
      <p className="text-gray-400 leading-relaxed">
        DAMAC is a Dubai-based luxury real estate developer known for premium
        residential and commercial projects. Established in 2002, it has
        delivered high-end properties across the Middle East and global markets.
      </p>
    </div>

    <div className="text-4xl md:text-6xl font-bold text-white/30 italic">
      DAMAC
    </div>
  </div>

  {/* 🔥 FORM */}
  <div className="max-w-3xl mx-auto text-center">

    <h2 className="text-2xl font-semibold mb-2">
      Register Your Interest in
    </h2>
    <h3 className="text-2xl font-semibold text-[#F1DC7F] mb-8">
      {project?.title}
    </h3>

    <form className="space-y-4 text-left">

      <input
        placeholder="Enter your full name"
        className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="+971"
          className="bg-white/10 border border-white/10 rounded-lg px-4 py-3"
        />
        <input
          placeholder="Enter your email"
          className="bg-white/10 border border-white/10 rounded-lg px-4 py-3"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <select className="bg-white/10 border border-white/10 rounded-lg px-4 py-3">
          <option>Apartment</option>
        </select>

        <select className="bg-white/10 border border-white/10 rounded-lg px-4 py-3">
          <option>3</option>
        </select>
      </div>

      <button className="w-full bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black py-3 rounded-xl mt-4">
        Submit
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
      </p>
    </form>
  </div>
</div>
    </div>
  );
}
