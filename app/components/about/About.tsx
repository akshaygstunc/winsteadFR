import Image from "next/image";
import img1 from "../../../public/img1.png";
import img2 from "../../../public/img2.png";

export default function AboutHero() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_3fr] gap-12 items-center">

        {/* LEFT SIDE */}
        <div className="flex justify-center">
          <div className="relative w-[260px] md:w-[320px] h-[420px] md:h-[520px] rounded-full border-2 border-yellow-500 overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.15)]">
            <div className="absolute top-0 left-0 w-full h-1/2">
              <Image
                src={img1}
                alt="Winstead real estate"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-500/40" />

            <div className="absolute bottom-0 left-0 w-full h-1/2">
              <Image
                src={img2}
                alt="Luxury property"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
            About Winstead
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white max-w-3xl">
            We help people make smarter real estate decisions with clarity and confidence.
          </h1>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
            At Winstead Global Real Estate, we believe property is more than a
            transaction. It is a long-term decision shaped by trust, timing, and
            the right guidance.
          </p>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
            Whether you are searching for a dream home, a strategic investment,
            or the right commercial opportunity, we focus on relevance,
            transparency, and a smooth journey from search to closure.
          </p>

          <div className="flex flex-wrap gap-4 pt-3">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300">
              Speak With Our Team
            </button>
            <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition duration-300">
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}