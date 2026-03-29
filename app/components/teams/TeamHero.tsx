import Image from "next/image";
import heroImg from "../../../public/blog3.png";
import { FaArrowRight } from "react-icons/fa";
export default function TeamHero({ teamPerson }: { teamPerson: string }) {
    return (
        <section className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0">
                <Image src={heroImg} alt="hero" fill className="object-cover opacity-35" />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute top-0 left-[-10%] h-[320px] w-[320px] rounded-full bg-yellow-500/10 blur-3xl" />
                <div className="absolute bottom-[-80px] right-[-5%] h-[300px] w-[300px] rounded-full bg-yellow-400/10 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-4">
                            Meet The Advisor
                        </p>

                        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">
                            {teamPerson}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 font-medium mb-5">
                            Luxury Property Advisor
                        </p>

                        <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
                            Sophie helps buyers and investors navigate premium real estate with
                            more clarity, better opportunities, and a more personalized advisory
                            experience from exploration to decision.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition inline-flex items-center gap-2">
                                Book Consultation <FaArrowRight className="text-sm" />
                            </button>
                            <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition">
                                View Projects
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-8">
                            {["Luxury Homes", "Investor Advisory", "Prime Locations"].map((item) => (
                                <span
                                    key={item}
                                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-[28px] border border-yellow-500/20 bg-white/5 p-5 backdrop-blur-sm">
                            <div className="relative h-[420px] rounded-[24px] overflow-hidden">
                                <Image src={heroImg} alt={teamPerson} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            </div>

                            <div className="mt-5 rounded-2xl border border-white/10 bg-black/60 p-5">
                                <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-2">
                                    Advisory Focus
                                </p>
                                <p className="text-gray-300 leading-relaxed text-sm">
                                    Personalized property guidance for buyers, investors, and clients
                                    seeking long-term value in premium markets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}