"use client";

import { useState } from "react";
import { X, Maximize2 } from "lucide-react";

type Props = {
    description?: string;
    pdfurl?: string;
    heading?: string;
};

export default function PDFViewer({ description, pdfurl, heading }: Props) {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const fullText = description || "No description available.";
    const shortText =
        fullText.length > 80 ? `${fullText.slice(0, 140)}...` : fullText;

    return (
        <>
            {/* Trigger */}
            <div>
                <p className="text-white leading-relaxed text-base md:text-lg">
                    {shortText}
                </p>

                {fullText.length > 80 && (
                    <button
                        onClick={() => setOpen(true)}
                        className="mt-4 inline-flex items-center rounded-full border border-[#F1DC7F]/40 px-5 py-2 text-sm text-white hover:bg-[#F1DC7F] hover:text-black"
                    >
                        View Details
                    </button>
                )}
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* Right Slider */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-[90%] sm:w-[80%] md:w-[400px] lg:w-[35%] bg-[#0b0b0b] border-l border-white/10 transform transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                    <h3 className="text-white text-lg font-semibold">{heading}</h3>

                    <div className="flex items-center gap-3">
                        {/* Expand Button */}
                        <button
                            onClick={() => setExpanded(true)}
                            className="text-white hover:bg-white/10 p-2 rounded"
                            title="Expand"
                        >
                            <Maximize2 size={18} />
                        </button>

                        {/* Close Slider */}
                        <button
                            onClick={() => setOpen(false)}
                            className="text-white hover:bg-white/10 p-2 rounded"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* PDF inside slider (preview mode) */}
                <div className="h-[calc(100%-80px)]">
                    <iframe
                        src={`https://docs.google.com/gview?url=${pdfurl}&embedded=true`}
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* 🔥 Fullscreen Modal */}
            {expanded && (
                <div className="fixed inset-0 z-[999] bg-black">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                        <h3 className="text-white text-lg font-semibold">{heading}</h3>

                        <button
                            onClick={() => setExpanded(false)}
                            className="text-white hover:bg-white/10 p-2 rounded"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Fullscreen PDF */}
                    <div className="h-[calc(100vh-60px)] w-full">
                        <iframe
                            src={`https://docs.google.com/gview?url=${pdfurl}&embedded=true`}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}
        </>
    );
}