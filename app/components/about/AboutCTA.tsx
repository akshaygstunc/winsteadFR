export default function AboutCTA() {
    return (
        <section className="py-20 px-6 md:px-10 border-t border-white/10">
            <div className="max-w-5xl mx-auto text-center rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-10 md:p-16">
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                    Let’s Start
                </p>

                <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-5">
                    Start your property journey with more clarity and less guesswork.
                </h2>

                <p className="text-white-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    Whether you are exploring opportunities, comparing options, or ready
                    to move forward, Winstead is here to guide you with confidence.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300">
                        Get in Touch
                    </button>
                    <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition duration-300">
                        View Our Services
                    </button>
                </div>
            </div>
        </section>
    );
}