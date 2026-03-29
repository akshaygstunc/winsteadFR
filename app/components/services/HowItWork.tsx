/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HowItWorks({processSteps}: {processSteps: any[]}) {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-14">
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        How It Works
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        A simple process designed to reduce confusion.
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Our workflow helps clients move through the real estate journey with
                        better clarity, better filtering, and more confidence.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            className="relative rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-yellow-500/30 transition duration-300"
                        >
                            <div className="absolute top-4 right-5 text-5xl font-semibold text-yellow-500/20">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 pr-10">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}