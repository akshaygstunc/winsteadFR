/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ServicesOverview({ services }: { services: any[] }) {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 max-w-3xl">
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        Services Overview
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        Focused services for different real estate goals.
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Whether your priority is investment growth, immediate ownership, or
                        long-term leasing, our services are designed to match specific
                        property goals with greater precision.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service: any, index: any) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-yellow-500/20 bg-white/5 p-8 hover:bg-white/10 transition duration-300"
                        >
                            <div className="text-yellow-400 text-3xl font-semibold mb-4">
                                0{index + 1}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}