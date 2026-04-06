import Image from "next/image";
import img1 from "../../../public/hero2.png";
import img2 from "../../../public/img2.png";

export default function AboutHero() {
  return (
    // <section className="bg-black text-white py-20 px-6 md:px-10">
    //   <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_3fr] gap-12 items-center">

    //     {/* LEFT SIDE */}
    //     <div className="flex justify-center">
    //       <div className="relative w-[260px] md:w-[320px] h-[420px] md:h-[520px] rounded-full border-2 border-yellow-500 overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.15)]">
    //         <div className="absolute top-0 left-0 w-full h-1/2">
    //           <Image
    //             src={img1}
    //             alt="Winstead real estate"
    //             className="w-full h-full object-cover"
    //           />
    //         </div>

    //         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-500/40" />

    //         <div className="absolute bottom-0 left-0 w-full h-1/2">
    //           <Image
    //             src={img2}
    //             alt="Luxury property"
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     {/* RIGHT SIDE */}
    //     <div className="space-y-6">
    //       <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
    //         About Winstead
    //       </p>

    //       <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white max-w-3xl">
    //         We help people make smarter real estate decisions with clarity and confidence.
    //       </h1>

    //       <p className="text-white-400 text-base md:text-lg leading-relaxed max-w-2xl">
    //         At Winstead Global Real Estate, we believe property is more than a
    //         transaction. It is a long-term decision shaped by trust, timing, and
    //         the right guidance.
    //       </p>

    //       <p className="text-white-400 text-base md:text-lg leading-relaxed max-w-2xl">
    //         Whether you are searching for a dream home, a strategic investment,
    //         or the right commercial opportunity, we focus on relevance,
    //         transparency, and a smooth journey from search to closure.
    //       </p>

    //       <div className="flex flex-wrap gap-4 pt-3">
    //         <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300">
    //           Speak With Our Team
    //         </button>
    //         <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition duration-300">
    //           Explore Services
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black text-white">

      {/* IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={img1}
          alt="News Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* OVERLAY (only for readability, not full dark) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* CONTENT (BOTTOM LEFT ONLY) */}
      <div className="relative z-10 h-full flex items-end justify-center">
        <div className="w-full max-w-7xl  px-6 md:px-12 pb-14 md:pb-20">

          <div className="max-w-xl text-left ">

            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
              About Winstead
            </p>

            <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
              We help people make smarter
              <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                real estate decisions
              </span>
            </h1>

            {/* <p className="mt-4 max-w-[420px] text-sm md:text-base text-white leading-relaxed">
              Discover a curated collection of high-end residences, investment-led opportunities,
              and landmark.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {["Luxury", "Elite", "Ultra Luxury", "Prime Locations"].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white-200 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div> */}

          </div>

        </div>
      </div>

      {/* BOTTOM GOLD LINE */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />

    </section>
  );
}