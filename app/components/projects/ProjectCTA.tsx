export default function ProjectsCTA() {
    return (
        <section className="pb-20 px-4 md:px-12">
            <div className="max-w-7xl mx-auto rounded-[32px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-10 md:p-14 text-center">
                <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.25em] text-yellow-400 mb-3">
                    Need Guidance?
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-5">
                    Let us help you discover the right property with more clarity.
                </h2>
                <p className="text-white-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    From luxury residences to investment-led opportunities, Winstead helps you
                    shortlist better options and move forward with confidence.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
                        Speak With Our Team
                    </button>
                    <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition">
                        Register Interest
                    </button>
                </div>
            </div>
        </section>
    );
}