"use client";

import { useState } from "react";

export default function ReviewText({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <p
                className={`text-[15px] md:text-[16px] leading-7 text-white transition-all duration-300 ${expanded ? "" : "line-clamp-3"
                    }`}
            >
                {text}
            </p>

            {text.length > 80 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-yellow-400 text-sm lg:text-xl lg:text-xl font-medium hover:underline transition"
                >
                    {expanded ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    );
}