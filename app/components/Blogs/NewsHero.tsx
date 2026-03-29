import Image from "next/image";
import banner from "../../../public/services.png";


export default function NewsHero() {
    return (
        <section className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0">
                <Image
                    src={banner}
                    alt="News Banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/65" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="max-w-4xl">
                    <p className="text-sm uppercase tracking-[0.28em] text-yellow-400 mb-4">
                        News & Media
                    </p>

                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold leading-[1.05] max-w-5xl">
                        Editorial insights from the world of
                        <span className="text-yellow-400"> luxury real estate.</span>
                    </h1>

                    <p className="text-gray-300 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
                        Stay ahead with curated market movements, premium property trends,
                        and real estate intelligence shaping the next wave of opportunity.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-8">
                        {["Market Trends", "Luxury Insights", "Investment Signals"].map((item) => (
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