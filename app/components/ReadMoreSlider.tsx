"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
    project: {
        description?: string;
    };
};

export default function ReadMoreSlider({ description, heading }: Props) {
    const [open, setOpen] = useState(false);

    const fullText = description || "No description available.";
    const shortText =
        fullText.length > 80 ? `${fullText.slice(0, 140)}...` : fullText;

    return (
        <>
            <div>
                <p className="text-white leading-relaxed text-base md:text-lg">
                    {shortText}
                </p>

                {fullText.length > 80 && (
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-gradient-to-r from-yellow-300 to-yellow-600 py-3 px-4 rounded-xl text-black text-sm mt-4"
                    >
                        Read More
                    </button>
                )}
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/50  transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* Right Slider */}
            <div
                className={`fixed right-0 z-50 w-48 sm:w-[85%] md:w-[300px] lg:w-[30%] bg-[#0b0b0b] border-l border-white/10 transform transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{
                    top: "80px",                 // 👈 pushes below header
                    height: "calc(100vh - 80px)" // 👈 prevents full height
                }}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                        {heading}
                    </h3>

                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-full border border-white/10 p-2 text-white hover:bg-white/10 transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="h-[calc(100%-80px)] overflow-y-auto px-6 py-6">
                    <p className="text-white leading-8 text-base md:text-lg whitespace-pre-line">
                        {fullText}
                    </p>
                </div>
            </div>
        </>
    );
}