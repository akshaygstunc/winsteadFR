/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed, FaDollarSign, FaRulerCombined } from "react-icons/fa6";

export default function ProjectCard({ img }: { img: any }) {
    return (
        <div className="relative rounded-2xl overflow-hidden group border border-white/10 bg-white/5">
            <div className="relative h-[420px]">
                {/* <Image
                    src={img}
                    alt="project"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            <div className="absolute top-4 left-4 bg-black/70 text-xs px-3 py-1 rounded-full border border-white/20">
                Ultra Luxury
            </div>

            <div className="absolute bottom-0 p-5 w-full">
                <h3 className="text-xl font-semibold mb-2">Aurelia Heights</h3>

                <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                        <FaBed className="text-yellow-400 text-xs" />
                        2-8 Bedrooms
                    </div>
                    <div className="flex items-center gap-2">
                        <FaDollarSign className="text-yellow-400 text-xs" />
                        $2.3M – $3.8M
                    </div>
                    <div className="flex items-center gap-2">
                        <FaRulerCombined className="text-yellow-400 text-xs" />
                        2,800 – 7,200 sq.ft.
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-yellow-400 text-xs" />
                        Downtown Dubai, UAE
                    </div>
                </div>

                <button className="mt-4 w-full py-3 border border-white/20 rounded-xl text-sm hover:border-yellow-400 transition">
                    Check Details
                </button>
            </div>
        </div>
    );
}