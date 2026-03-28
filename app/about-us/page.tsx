import Image from "next/image";
import aboutImg from "../../public/about.png";
import Stats from "@/app/components/Stats";
import Testimonials from "@/app/components/Testimonials";

export default function AboutUs() {
  return (
    <section className="bg-black text-white overflow-hidden">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide animate-fadeUp">
          About Us
        </h1>
      </div>

      {/* IMAGE */}
      <div className="w-full relative overflow-hidden">
        <div className="animate-zoomIn">
          <Image
            src={aboutImg}
            alt="About Winstead"
            className="w-full object-cover scale-105"
            priority
          />
        </div>

        {/* PREMIUM OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 space-y-8 text-gray-300 leading-relaxed text-[16px] md:text-[20px]">

        {[
          "At Winstead Global Real Estate, we believe real estate is more than buying, selling, or investing in property — it is about building futures, creating opportunities, and helping our clients make confident decisions with peace of mind.",
          "As a trusted name in the real estate industry, we are committed to delivering professional, transparent, and results-driven services tailored to the unique needs of every client. Whether you are searching for your dream home, expanding your investment portfolio, or looking for the right commercial opportunity, our team is dedicated to guiding you every step of the way with expertise and integrity.",
          "Our mission is to connect people with the right properties while providing a seamless and rewarding experience. We take pride in understanding market trends, identifying valuable opportunities, and offering personalized solutions that align with our clients’ goals.",
          "At the heart of Winstead Global Real Estate is our unwavering commitment to customer satisfaction. We understand that every client’s journey is different, which is why we place great importance on listening carefully, communicating clearly, and delivering service that exceeds expectations. Building long-term relationships based on trust, reliability, and exceptional service is what drives us every day.",
          "With Winstead Global Real Estate, you can expect dedication, professionalism, and a genuine passion for helping you succeed in every real estate decision."
        ].map((text, i) => (
          <p
            key={i}
            className="animate-fadeUp"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {text}
          </p>
        ))}

      </div>

      <Stats />
      <Testimonials />
    </section>
  );
}