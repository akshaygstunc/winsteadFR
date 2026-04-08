export default function TeamStats() {
    const stats = [
        { title: "Premium Advisory", desc: "Guidance built around client goals" },
        { title: "Prime Markets", desc: "Focused on high-value opportunities" },
        { title: "Tailored Curation", desc: "Relevant options over volume" },
        { title: "Long-Term Value", desc: "Decisions with future upside in mind" },
    ];

    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-yellow-500/40 transition"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                        <p className="text-white-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}