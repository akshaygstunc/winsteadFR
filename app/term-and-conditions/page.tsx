"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import Schema from "@/app/components/Schema";
import { resolveSchemas } from "@/app/components/lib/schema/resolver";
import WebsiteContentService from "@/app/services/websitecontent.service";
import { useEffect, useMemo, useState } from "react";

type LegalPageApiResponse = {
    _id?: string;
    entity?: string;
    title?: string;
    subtitle?: string;
    slug?: string;
    status?: string;
    pageType?: string;
    image?: string;
    heroVideo?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    sortOrder?: number;
    data?: {
        bannerImage?: string;
        bannerTitle?: string;
        bannerSubtitle?: string;
        bannerPrimaryButtonText?: string;
        bannerPrimaryButtonUrl?: string;
        bannerSecondaryButtonText?: string;
        bannerSecondaryButtonUrl?: string;
        metaTitle?: string;
        metaDescription?: string;
        ogImage?: string;
    };
    createdAt?: string;
    updatedAt?: string;
};

const EMPTY_TEXT = "Not available";

function getText(value?: string, fallback = EMPTY_TEXT) {
    if (!value || !String(value).trim()) return fallback;
    return value;
}

function formatDate(value?: string) {
    if (!value) return EMPTY_TEXT;

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return EMPTY_TEXT;

    return parsed.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default function LegalPage() {
    const params = useParams();
    const slug = String(params?.id || "");

    const [pageDetails, setPageDetails] = useState<LegalPageApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchPage() {
            try {
                setLoading(true);
                setHasError(false);

                // 🔥 CALL YOUR SINGLETON API
                const response = await WebsiteContentService.getSingletonBySlug("terms-and-conditions");
                setPageDetails(response || null);
            } catch (error) {
                console.error("Failed to fetch page:", error);
                setHasError(true);
                setPageDetails(null);
            } finally {
                setLoading(false);
            }
        }

        // if (slug) {
        fetchPage();
        // }
    }, []);

    const page = useMemo(() => {
        if (!pageDetails) return null;

        const title = pageDetails.title || pageDetails.data?.bannerTitle || EMPTY_TEXT;
        const description = pageDetails.description || EMPTY_TEXT;
        const heroImage = pageDetails.image || pageDetails.data?.bannerImage || "";
        const metaTitle = pageDetails.metaTitle || pageDetails.data?.metaTitle || "";
        const metaDescription = pageDetails.metaDescription || pageDetails.data?.metaDescription || "";

        return {
            id: pageDetails._id || slug,
            title,
            description,
            heroImage,
            metaTitle,
            metaDescription,
            bannerPrimaryButtonText: pageDetails.data?.bannerPrimaryButtonText || "",
            bannerPrimaryButtonUrl: pageDetails.data?.bannerPrimaryButtonUrl || "",
            bannerSecondaryButtonText: pageDetails.data?.bannerSecondaryButtonText || "",
            bannerSecondaryButtonUrl: pageDetails.data?.bannerSecondaryButtonUrl || "",
            updatedAt: pageDetails.updatedAt,
        };
    }, [pageDetails, slug]);

    if (loading) {
        return <LegalPageSkeleton />;
    }

    if (hasError || !page) return notFound();

    return (
        <div className="bg-black text-white min-h-screen">
            <Schema
                schemas={resolveSchemas({
                    type: pageDetails?.entity || "legal-page",
                    data: page
                })}
            />

            {/* HERO BANNER */}
            <section className="relative h-[65vh] min-h-[420px]">
                {page.heroImage ? (
                    <>
                        <Image
                            src={page.heroImage}
                            alt={page.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/70" />
                    </>
                ) : (
                    <div className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900" />
                )}

                <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
                        {page.title}
                    </h1>
                    <p className="text-gray-300 text-sm">
                        Last updated: {formatDate(page.updatedAt)}
                    </p>
                </div>
            </section>

            {/* BREADCRUMB */}
            <div className="max-w-4xl px-6 py-6">
                <AutoBreadcrumbs />
            </div>

            {/* MAIN CONTENT */}
            <section className="max-w-4xl mx-auto px-6 pb-20">
                {/* ACTION BUTTONS */}
                {(page.bannerPrimaryButtonText || page.bannerSecondaryButtonText) && (
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        {page.bannerPrimaryButtonText && (
                            <Link
                                href={page.bannerPrimaryButtonUrl || "#"}
                                className="px-8 py-4 bg-yellow-500/90 text-black font-semibold rounded-xl hover:bg-yellow-400 transition shadow-lg hover:shadow-xl"
                            >
                                {page.bannerPrimaryButtonText}
                            </Link>
                        )}
                        {page.bannerSecondaryButtonText && (
                            <Link
                                href={page.bannerSecondaryButtonUrl || "#"}
                                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition backdrop-blur-sm"
                            >
                                {page.bannerSecondaryButtonText}
                            </Link>
                        )}
                    </div>
                )}

                {/* LEGAL CONTENT */}
                <article
                    className="prose prose-invert max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: page.description }}
                />

                {/* CONTACT SECTION */}
                {/* <div className="mt-20 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <h2 className="text-2xl font-semibold mb-6">Need Help?</h2>
                    <p className="text-lg mb-6">
                        Questions about this policy? Contact our support team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="mailto:support@winsteadglobal.com"
                            className="px-8 py-4 bg-yellow-500/90 text-black font-semibold rounded-xl hover:bg-yellow-400 transition shadow-lg hover:shadow-xl"
                        >
                            Email Support
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition backdrop-blur-sm"
                        >
                            Contact Form
                        </Link>
                    </div>
                </div> */}
            </section>
        </div>
    );
}

function LegalPageSkeleton() {
    return (
        <main className="bg-black text-white min-h-screen overflow-x-hidden">
            <section className="relative h-[65vh] min-h-[420px] px-4 md:px-6 pt-4">
                <div className="relative h-full rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.03]">
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-gray-900 to-black animate-pulse" />
                    <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
                        <div className="h-10 md:h-14 w-[80%] mb-4 bg-white/10 rounded-xl animate-pulse" />
                        <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                    </div>
                </div>
            </section>

            <div className="max-w-4xl px-6 py-6">
                <div className="h-5 w-48 bg-white/10 rounded animate-pulse" />
            </div>

            <section className="max-w-4xl mx-auto px-6 pb-20">
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <div className="h-12 w-40 bg-white/10 rounded-xl animate-pulse" />
                    <div className="h-12 w-32 bg-white/10 rounded-xl animate-pulse" />
                </div>

                <div className="space-y-6 mb-16">
                    <div className="h-8 w-64 bg-white/10 rounded-xl animate-pulse" />
                    <div className="h-6 w-full bg-white/10 rounded-lg animate-pulse" />
                    <div className="h-6 w-[96%] bg-white/10 rounded-lg animate-pulse" />
                    <div className="h-6 w-[90%] bg-white/10 rounded-lg animate-pulse" />
                    <div className="h-6 w-[85%] bg-white/10 rounded-lg animate-pulse" />
                </div>

                <div className="h-[200px] w-full rounded-3xl bg-white/10 animate-pulse mb-12" />

                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md animate-pulse">
                    <div className="h-8 w-48 rounded-xl mb-6 animate-pulse" />
                    <div className="h-5 w-[80%] rounded-lg mb-6 animate-pulse" />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="h-12 w-40 bg-white/10 rounded-xl animate-pulse" />
                        <div className="h-12 w-32 bg-white/10 rounded-xl animate-pulse" />
                    </div>
                </div>
            </section>
        </main>
    );
}