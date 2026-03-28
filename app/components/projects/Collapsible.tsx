/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown } from "lucide-react";

export default function Collapsible({ title, children, open, toggle }: any) {
    return (
        <div className="mb-7 border-t border-white/10 pt-5">
            <div className="flex justify-between items-center cursor-pointer mb-3" onClick={toggle}>
                <p className="text-sm uppercase tracking-[0.14em] text-gray-400">{title}</p>
                <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
            </div>
            {open && <div className="space-y-2">{children}</div>}
        </div>
    );
}