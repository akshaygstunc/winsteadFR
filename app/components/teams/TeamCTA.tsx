export default function TeamCTA({ teamPerson }: { teamPerson: string }) {
    return (
        <section className="py-20 px-6 md:px-12">
            <div className="max-w-5xl mx-auto rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-10 md:p-14 text-center">
                <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.25em] text-yellow-400 mb-3">
                    Start The Conversation
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-5">
                    Connect with {teamPerson.split(" ")[0]} for a more thoughtful property journey.
                </h2>
                <p className="text-white-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    Whether you are exploring premium residences or evaluating investment
                    opportunities, we are here to help you move with more clarity and confidence.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
                        Book a Consultation
                    </button>
                    <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition">
                        Explore Opportunities
                    </button>
                </div>
            </div>
        </section>
    );
}
