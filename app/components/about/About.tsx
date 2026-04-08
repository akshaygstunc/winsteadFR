import Image from "next/image";
import img1 from "../../../public/hero2.png";
import img2 from "../../../public/img2.png";

export default function AboutHero() {
  return (
 

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
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" /> */}
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