const trustPoints = [
    {
        title: "Personalized Guidance",
        description: "Every client journey is different, so our recommendations are never one-size-fits-all.",
    },
    {
        title: "Transparent Communication",
        description: "We believe trust is built through honesty, clarity, and timely communication.",
    },
    {
        title: "Market Understanding",
        description: "We track trends, opportunities, and local dynamics to support smarter decisions.",
    },
    {
        title: "Long-Term Relationships",
        description: "Our focus is not only on closing deals, but on building lasting trust with every client.",
    },
];

export default function AboutTrust() {
    return (
        <section className="py-20 px-6 md:px-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr_3fr] gap-10 items-start">
                <div>
                    <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        Why Clients Trust Us
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        Built on trust, guided by experience.
                    </h2>
                    <p className="text-white-400 leading-relaxed max-w-xl">
                        At the heart of Winstead is a commitment to thoughtful service,
                        honest guidance, and relationships that go beyond transactions.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {trustPoints.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-yellow-500/20 p-6 bg-white/5"
                        >
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-white-400 leading-relaxed text-sm lg:text-xl lg:text-xl md:text-base">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}