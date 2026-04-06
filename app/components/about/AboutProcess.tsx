const steps = [
    {
        title: "Understand Your Goal",
        description:
            "We begin by understanding your lifestyle needs, investment intent, priorities, and timeline.",
    },
    {
        title: "Curate the Right Options",
        description:
            "Instead of showing everything, we shortlist the most relevant opportunities for you.",
    },
    {
        title: "Guide Evaluation & Visits",
        description:
            "We support your property review with context, insights, and a more informed evaluation process.",
    },
    {
        title: "Support Negotiation & Closure",
        description:
            "From discussions to final paperwork, we help make the journey smoother and more transparent.",
    },
];

export default function AboutProcess() {
    return (
        <section className="py-20 px-6 md:px-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-14">
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        How We Work
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        A Clear Process. A More Confident Decision.
                    </h2>
                    <p className="text-white-400 leading-relaxed">
                        Our process is designed to remove confusion and create a smoother, more guided real estate experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative border border-white/10 rounded-2xl p-8 bg-gradient-to-b from-white/5 to-transparent hover:border-yellow-500/40 transition duration-300"
                        >
                            <div className="text-5xl font-semibold text-yellow-500/20 absolute top-4 right-5">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3 pr-10">
                                {step.title}
                            </h3>
                            <p className="text-white-400 leading-relaxed text-sm md:text-base">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}