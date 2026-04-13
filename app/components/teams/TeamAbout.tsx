export default function TeamAbout({ teamPerson }: { teamPerson: string }) {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
                <div>
                    <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        About {teamPerson.split(" ")[0]}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        A more personal, strategic approach to luxury real estate.
                    </h2>
                </div>

                <div className="space-y-5 text-white-400 leading-relaxed">
                    <p>
                        Sophie works closely with clients who value more than just listings.
                        Her focus is on understanding intent, identifying relevant
                        opportunities, and making high-value real estate decisions feel more
                        structured and informed.
                    </p>
                    <p>
                        Whether the goal is a premium residence, a strategic investment, or a
                        long-term portfolio move, her advisory style is rooted in clarity,
                        discretion, and market awareness.
                    </p>
                    <p>
                        By combining tailored guidance with a refined understanding of luxury
                        property dynamics, she helps clients move forward with greater
                        confidence and less noise.
                    </p>
                </div>
            </div>
        </section>
    );
}