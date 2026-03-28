import Image from "next/image";
import heroImg from "../../../public/blog3.png";
export default function ProjectsHero() {
    return (
        <section className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0">
                <Image src={heroImg} alt="Projects Hero" fill className="object-cover opacity-30" priority />
                <div className="absolute inset-0 bg-black/75" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
                <div className="absolute top-0 left-[-10%] h-[320px] w-[320px] rounded-full bg-yellow-500/10 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
                <p className="text-sm uppercase tracking-[0.28em] text-yellow-400 mb-4">
                    Curated Projects
                </p>

                <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold leading-[1.05] max-w-5xl">
                    Explore premium properties crafted for
                    <span className="text-yellow-400"> luxury, value, and long-term appeal.</span>
                </h1>

                <p className="text-gray-300 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
                    Discover a curated collection of high-end residences, investment-led opportunities,
                    and landmark developments across prime locations.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                    {["Luxury", "Elite", "Ultra Luxury", "Prime Locations"].map((item) => (
                        <span
                            key={item}
                            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-200 backdrop-blur-sm"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}