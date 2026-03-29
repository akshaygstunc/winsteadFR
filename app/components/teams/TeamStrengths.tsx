import { IoMdCheckboxOutline } from "react-icons/io";

export default function TeamStrengths() {
    const points = [
        "Luxury residential advisory",
        "Investment-focused property curation",
        "Transparent decision support",
        "High-touch client experience",
    ];

    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-12">
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        Why Clients Work With Us
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Expertise shaped around trust, relevance, and value.
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        A premium advisory experience is not just about access. It is about
                        filtering well, communicating clearly, and guiding each step with care.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {points.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6"
                        >
                            <IoMdCheckboxOutline className="text-yellow-400 w-8 h-8 mb-4" />
                            <p className="text-white leading-relaxed">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}