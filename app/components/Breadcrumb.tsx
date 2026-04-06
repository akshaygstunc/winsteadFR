"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <div className="w-full border-b border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 text-sm text-gray-400 flex flex-wrap items-center gap-2">
        
        {/* HOME */}
        <Link href="/" className="hover:text-yellow-400 transition">
          Home
        </Link>      
  
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <span key={index} className="flex items-center gap-2">
              <span>/</span>

              <Link
                href={href}
                className="capitalize hover:text-yellow-400 transition"
              >
                {segment.replace(/-/g, " ")}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}