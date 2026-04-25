import { FaMapMarkerAlt } from "react-icons/fa";

export default function AddressSection({ addresses = [] }: any) {
    const shouldScroll = addresses.length > 4;

    const list = shouldScroll
        ? [...addresses, ...addresses] // duplicate for infinite loop
        : addresses;

    return (
        <div className="relative max-w-[85rem] mx-auto px-4 md:px-10 py-6 overflow-hidden">
            <div
                className={`flex gap-6 ${shouldScroll ? "animate-scroll" : "flex-wrap justify-between"
                    }`}
            >
                {list.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-yellow-400/30 hover:bg-white/[0.07] transition"
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10">
                                <FaMapMarkerAlt className="text-yellow-400 text-sm" />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {item.location}
                                </h3>
                                <p className="text-white leading-relaxed whitespace-pre-line text-sm md:text-base">
                                    {item.address}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}