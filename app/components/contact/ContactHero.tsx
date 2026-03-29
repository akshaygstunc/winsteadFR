import Image from "next/image";
import banner from "../../../public/services.png";
export default function ContactHero() {
    return (
        <section className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0">
                <Image
                    src={banner}
                    alt="Contact Banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-28">
                <div className="max-w-4xl">
                    <p className="text-sm uppercase tracking-[0.28em] text-yellow-400 mb-4">
                        Contact Us
                    </p>

                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold leading-[1.05] max-w-5xl">
                        Let’s start your next
                        <span className="text-yellow-400"> real estate conversation.</span>
                    </h1>

                    <p className="text-gray-300 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
                        Whether you are exploring premium residences, evaluating investment
                        opportunities, or registering interest in a featured property, our
                        team is here to guide you with clarity and discretion.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-8">
                        {["Private Consultation", "Investment Inquiry", "Luxury Properties"].map((item) => (
                            <span
                                key={item}
                                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-200 backdrop-blur-sm"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
