/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ResultsBar({ count, filters }: any) {
    const active = [filters.type, filters.residence, filters.location, filters.category].filter(Boolean);

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
                <p className="text-white text-lg font-medium">
                    Showing <span className="text-yellow-400">{count}</span> curated properties
                </p>
                {active.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {active.map((item: string) => (
                            <span
                                key={item}
                                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-white-300"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <button className="border border-white/10 text-white-300 px-5 py-3 rounded-full hover:border-yellow-500 hover:text-white transition w-fit">
                Sort by Featured
            </button>
        </div>
    );
}