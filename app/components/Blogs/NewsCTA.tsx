export default function NewsCTA() {
    return (
        <section className="py-20 px-6 md:px-12">
            <div className="max-w-5xl mx-auto rounded-[32px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-10 md:p-16 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                    Stay Connected
                </p>

                <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-5">
                    Follow the market with sharper insight and more perspective.
                </h2>

                <p className="text-white-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    Explore curated updates, premium property intelligence, and real
                    estate signals designed for more informed decisions.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300">
                        Explore More Insights
                    </button>
                    <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition duration-300">
                        Contact Winstead
                    </button>
                </div>
            </div>
        </section>
    );
}