/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Check({ label, filters, setFilters }: any) {
    return (
        <label className="flex items-center gap-3 text-sm cursor-pointer group">
            <input
                type="checkbox"
                className="appearance-none w-4 h-4 border border-white/30 rounded bg-transparent checked:bg-[#d4a373] checked:border-[#d4a373]"
                checked={filters?.category === label}
                onChange={() => {
                    if (!setFilters) return;
                    setFilters((prev: any) => ({
                        ...prev,
                        category: prev.category === label ? "" : label,
                    }));
                }}
            />
            <span className="group-hover:text-white text-gray-300 transition">{label}</span>
        </label>
    );
}