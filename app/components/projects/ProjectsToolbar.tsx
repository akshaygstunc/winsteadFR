/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProjectsToolbar({ filters, handleSearch, setShowFilter }: any) {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8">
            <form
                onSubmit={handleSearch}
                className="rounded-[28px] border border-yellow-500/20 bg-white/5 backdrop-blur-md p-3 md:p-4 shadow-[0_0_30px_rgba(250,204,21,0.06)]"
            >
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex flex-col md:flex-row flex-1 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                        <select
                            name="type"
                            defaultValue={filters.type}
                            className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
                        >
                            <option value="">Property Type</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>

                        <select
                            name="residence"
                            defaultValue={filters.residence}
                            className="px-5 py-4 bg-transparent outline-none md:border-r border-white/10"
                        >
                            <option value="">Residence Type</option>
                            <option value="Villa">Villa</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Office">Office</option>
                        </select>

                        <select
                            name="location"
                            defaultValue={filters.location}
                            className="px-5 py-4 bg-transparent outline-none"
                        >
                            <option value="">Location</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setShowFilter(true)}
                            className="md:hidden px-5 py-4 rounded-2xl bg-white/10 border border-white/10"
                        >
                            Filters
                        </button>

                        <button
                            type="submit"
                            className="px-7 py-4 rounded-2xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black font-semibold hover:scale-[1.02] transition"
                        >
                            Search Properties
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}