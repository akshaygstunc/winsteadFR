"use client";

import { Search } from "lucide-react";

type Props = {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    sort: string;
    setSort: (value: string) => void;
};

export default function NewsToolbar({
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
}: Props) {
    return (
        <section className="bg-black text-white px-6 md:px-12 py-8 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
                    <div className="relative w-full xl:max-w-md">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full rounded-full border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3 text-sm lg:text-md lg:text-md outline-none placeholder:text-white focus:border-[#F1DC7F]"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm lg:text-md lg:text-md outline-none focus:border-[#F1DC7F]"
                        >
                            <option value="all" className="bg-black">All Categories</option>
                            <option value="market-trends" className="bg-black">Market Trends</option>
                            <option value="luxury-insights" className="bg-black">Luxury Insights</option>
                            <option value="investment-signals" className="bg-black">Investment Signals</option>
                        </select> */}

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm lg:text-md lg:text-md outline-none focus:border-[#F1DC7F]"
                        >
                            <option value="latest" className="bg-black">Latest First</option>
                            <option value="oldest" className="bg-black">Oldest First</option>
                            <option value="title-asc" className="bg-black">Title A-Z</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}