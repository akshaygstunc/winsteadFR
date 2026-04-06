import { FaArrowRight } from "react-icons/fa";

export default function ServicesCTA() {
    return (
        <section className="py-20 px-6 md:px-12">
            <div className="max-w-5xl mx-auto text-center rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-10 md:p-16">
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                    Let’s Talk
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-5">
                    Find the right property path with more clarity and less guesswork.
                </h2>
                <p className="text-white-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    Whether you are exploring investments, ready residences, or leasing
                    opportunities, our team can help you move forward with confidence.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300 inline-flex items-center gap-2">
                        Get in Touch <FaArrowRight className="text-sm" />
                    </button>
                    <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition duration-300">
                        View Properties
                    </button>
                </div>
            </div>
        </section>
    );
}