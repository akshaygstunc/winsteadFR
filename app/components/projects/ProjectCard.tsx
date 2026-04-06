/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed, FaDollarSign, FaRulerCombined, FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import img from "../../../public/image_7.png";
export default function ProjectCard({ data }: any) {
    return (
        <div className="group relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 transition duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]">
            <div className="relative h-[440px]">
                <Image
                    src={img}
                    alt={data.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            <div className="absolute top-4 left-4 bg-black/70 text-xs px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                {data.category}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md p-5">
                    <h2 className="text-xl font-semibold mb-3">{data.title}</h2>

                    <div className="space-y-2 text-sm text-white-300">
                        <div className="flex items-center gap-2">
                            <FaBed className="text-yellow-400 text-xs" />
                            2-8 Bedrooms
                        </div>

                        <div className="flex items-center gap-2">
                            <FaDollarSign className="text-yellow-400 text-xs" />
                            From $2.3M
                        </div>

                        <div className="flex items-center gap-2">
                            <FaRulerCombined className="text-yellow-400 text-xs" />
                            2,800 – 7,200 sq.ft.
                        </div>

                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-yellow-400 text-xs" />
                            {data.location}
                        </div>
                    </div>

                    <Link href={`/projects/${data.id}`}>
                        <button className="mt-5 w-full py-3 rounded-xl border border-white/20 text-sm hover:border-yellow-400 hover:text-white transition inline-flex items-center justify-center gap-2">
                            Check Details <FaArrowRight className="text-xs" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}