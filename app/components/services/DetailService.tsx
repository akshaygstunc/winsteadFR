/* eslint-disable @typescript-eslint/no-explicit-any */
import ServiceBlock from "./ServiceBlock";
export default function DetailedServices({ services }: { services: any[] }) {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-white/10">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="max-w-3xl">
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                        Detailed Services
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        A closer look at what we offer.
                    </h2>
                    <p className="text-white-400 leading-relaxed">
                        Each service is designed to solve a different property need while
                        keeping the experience structured, transparent, and client-focused.
                    </p>
                </div>

                {services.map((service, index) => (
                    <ServiceBlock
                        key={index}
                        title={service.title}
                        desc={service.desc}
                        longDesc={service.longDesc}
                        points={service.points}
                    />
                ))}
            </div>
        </section>
    );
}