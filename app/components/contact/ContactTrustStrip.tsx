export default function ContactTrustStrip() {
    return (
        <section className="pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto rounded-[28px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 px-6 py-6 md:px-10 md:py-8">
                <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
                    <div>
                        <p className="text-yellow-400 text-sm mb-1">Private Guidance</p>
                        <p className="text-gray-300 text-sm">
                            Thoughtful support tailored to your property goals.
                        </p>
                    </div>
                    <div>
                        <p className="text-yellow-400 text-sm mb-1">Premium Opportunities</p>
                        <p className="text-gray-300 text-sm">
                            Access to curated residences and investment-led options.
                        </p>
                    </div>
                    <div>
                        <p className="text-yellow-400 text-sm mb-1">Clear Next Steps</p>
                        <p className="text-gray-300 text-sm">
                            A more structured journey from inquiry to conversation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}