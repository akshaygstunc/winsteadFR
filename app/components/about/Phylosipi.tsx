const philosophyItems = [
    {
        title: "Clarity Over Noise",
        description:
            "We focus on what truly fits your goals instead of overwhelming you with endless listings.",
    },
    {
        title: "Advisory Over Pressure",
        description:
            "Our role is to guide decisions with honesty and context, not push properties for quick closures.",
    },
    {
        title: "Value Over Volume",
        description:
            "We prioritize relevance, timing, and long-term value over mass-market selling.",
    },
];

export default function AboutPhilosophy() {
    return (
        <section className="py-20 px-6 md:px-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        Our Philosophy
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        What Makes Winstead Different
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        We do not believe great real estate service is about showing more.
                        It is about understanding better, filtering smarter, and guiding with integrity.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {philosophyItems.map((item, index) => (
                        <div
                            key={index}
                            className="border border-yellow-500/20 rounded-2xl p-8 bg-white/5 hover:bg-white/10 transition duration-300"
                        >
                            <div className="text-yellow-400 text-3xl font-semibold mb-4">
                                0{index + 1}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}