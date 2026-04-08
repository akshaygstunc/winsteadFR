import { IoMdCheckboxOutline } from "react-icons/io";

export default function ServiceBlock({
    title,
    desc,
    longDesc,
    points,
}: {
    title: string;
    desc: string;
    longDesc: string;
    points: string[];
}) {
    return (
        <div className="space-y-6 rounded-3xl border border-white/10 p-8 md:p-10 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm">
            <div className="flex items-start gap-4 group">
                <div className="flex items-center justify-center shrink-0">
                    <IoMdCheckboxOutline className="text-yellow-400 w-12 h-12 group-hover:scale-110 transition duration-300" />
                </div>

                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white transition group-hover:text-[#F1DC7F]">
                        {title}
                    </h3>
                    <p className="text-white text-sm lg:text-md lg:text-md md:text-base mt-2 max-w-3xl">
                        {desc}
                    </p>
                </div>
            </div>

            <p className="text-white text-sm lg:text-md lg:text-md md:text-base leading-relaxed max-w-4xl">
                {longDesc}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
                {points.map((item, i) => (
                    <div
                        key={i}
                        className="group px-6 py-4 border border-white/20 rounded-xl text-sm lg:text-md lg:text-md md:text-base text-[#F1DC7F]
            transition-all duration-300 cursor-pointer
            hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(241,220,127,0.15)]
            hover:border-[#F1DC7F] hover:text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-transparent via-[#F1DC7F]/10 to-transparent" />
                        <span className="relative z-10">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}