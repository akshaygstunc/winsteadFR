export default function MarketBrief() {
    const briefs = [
        {
            label: "Prime Demand",
            value: "Rising",
            desc: "Luxury demand continues to remain resilient across premium districts.",
        },
        {
            label: "Investor Sentiment",
            value: "Strong",
            desc: "Capital continues to favor high-growth, design-led developments.",
        },
        {
            label: "Off-Plan Activity",
            value: "Active",
            desc: "Flexible structures and appreciation outlook are driving interest.",
        },
    ];

    return (
        <section className="py-16 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
                {briefs.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6 hover:bg-white/10 transition duration-300"
                    >
                        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-3">
                            {item.label}
                        </p>
                        <h3 className="text-2xl font-semibold mb-2">{item.value}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}