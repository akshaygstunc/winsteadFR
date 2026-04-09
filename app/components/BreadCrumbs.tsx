"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AutoBreadcrumbs() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    return (
        <nav>
            <ol className="flex flex-wrap items-center gap-2 text-md lg:text-md mt-4 ml-4 text-white">
                <li>
                    <Link href="/">Home</Link>
                </li>

                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;
                    const label = segment
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase());

                    return (
                        <li key={href} className="flex items-center gap-2">
                            <span>{"/"}</span>
                            {isLast ? (
                                <span className="text-yellow-400">{label}</span>
                            ) : (
                                <Link href={href}>{label}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}