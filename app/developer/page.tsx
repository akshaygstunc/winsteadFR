"use client";

import Image, { StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import memberImg from "../../public/logoo4.webp";
import memberImg2 from "../../public/logoo2.webp";
import memberImg3 from "../../public/logoo5.png";
import memberImg4 from "../../public/logoo1.webp";
import memberImg5 from "../../public/logoo3.png";
import TeamHero from "../components/teams/TeamHero";
import AutoBreadcrumbs from "../components/BreadCrumbs";

type DeveloperCategory =
    | "All"
    | "Luxury"
    | "Residential"
    | "Commercial"
    | "Mixed Use"
    | "International";

type PropertyType =
    | "Apartment"
    | "Villa"
    | "Townhouse"
    | "Penthouse"
    | "Commercial";

type CityFilter =
    | "Dubai"
    | "Abu Dhabi"
    | "Sharjah"
    | "Ras Al Khaimah";

type StatusFilter = "Ready" | "Off Plan" | "New Launch";

type DeveloperTypeFilter =
    | "Master Developer"
    | "Luxury Builder"
    | "Residential Developer"
    | "Mixed Use Developer"
    | "Commercial Builder";

type PriceRangeFilter =
    | "Under AED 1M"
    | "AED 1M - 3M"
    | "AED 3M - 5M"
    | "AED 5M+";

type Developer = {
    id: number;
    name: string;
    type: string;
    category: Exclude<DeveloperCategory, "All">;
    image: StaticImageData;
    experience: string;
    headquarters: string;
    projects: string;
    specializations: string[];
    tags: string[];
    slug: string;
    propertyTypes: PropertyType[];
    cities: CityFilter[];
    status: StatusFilter;
    developerType: DeveloperTypeFilter;
    priceRange: PriceRangeFilter;
    rating: number;
    reviews: string;
};

const tabs: DeveloperCategory[] = [
    "All",
    "Luxury",
    "Residential",
    "Commercial",
    "Mixed Use",
    "International",
];

const propertyTypes: PropertyType[] = [
    "Apartment",
    "Villa",
    "Townhouse",
    "Penthouse",
    "Commercial",
];

const cities: CityFilter[] = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ras Al Khaimah",
];

const statuses: StatusFilter[] = ["Ready", "Off Plan", "New Launch"];

const developerTypes: DeveloperTypeFilter[] = [
    "Master Developer",
    "Luxury Builder",
    "Residential Developer",
    "Mixed Use Developer",
    "Commercial Builder",
];

const priceRanges: PriceRangeFilter[] = [
    "Under AED 1M",
    "AED 1M - 3M",
    "AED 3M - 5M",
    "AED 5M+",
];

const developers: Developer[] = [
    {
        id: 1,
        name: "Emaar Developments",
        type: "Master Developer",
        category: "Luxury",
        image: memberImg,
        experience: "15+ Years in Market",
        headquarters: "Dubai, UAE",
        projects: "120+ Projects",
        specializations: ["Luxury Communities", "Waterfront Towers", "Branded Residences"],
        tags: ["Premium Developer", "High ROI", "Trusted Builder"],
        slug: "emaar-developments",
        propertyTypes: ["Apartment", "Villa", "Penthouse"],
        cities: ["Dubai"],
        status: "Ready",
        developerType: "Master Developer",
        priceRange: "AED 3M - 5M",
        rating: 4.4,
        reviews: "1.7k+ reviews",
    },
    {
        id: 2,
        name: "Damac Properties",
        type: "Luxury Builder",
        category: "Luxury",
        image: memberImg2,
        experience: "20+ Years in Market",
        headquarters: "Dubai, UAE",
        projects: "90+ Projects",
        specializations: ["Golf Communities", "Luxury Apartments", "Villas"],
        tags: ["Investor Choice", "Luxury Living", "Prime Locations"],
        slug: "damac-properties",
        propertyTypes: ["Apartment", "Villa", "Townhouse"],
        cities: ["Dubai", "Sharjah"],
        status: "Off Plan",
        developerType: "Luxury Builder",
        priceRange: "AED 1M - 3M",
        rating: 4.1,
        reviews: "980 reviews",
    },
    {
        id: 3,
        name: "Omniyat",
        type: "Residential Developer",
        category: "Residential",
        image: memberImg3,
        experience: "18+ Years in Market",
        headquarters: "Dubai, UAE",
        projects: "70+ Projects",
        specializations: ["Apartments", "Family Communities", "Quality Construction"],
        tags: ["Premium Finish", "Residential Focus", "End User Friendly"],
        slug: "omniyat",
        propertyTypes: ["Apartment", "Penthouse"],
        cities: ["Dubai"],
        status: "New Launch",
        developerType: "Residential Developer",
        priceRange: "AED 5M+",
        rating: 4.0,
        reviews: "760 reviews",
    },
    {
        id: 4,
        name: "Aldar Properties",
        type: "Mixed Use Developer",
        category: "Mixed Use",
        image: memberImg4,
        experience: "22+ Years in Market",
        headquarters: "Abu Dhabi, UAE",
        projects: "60+ Projects",
        specializations: ["Communities", "Retail", "Waterfront Developments"],
        tags: ["Community Builder", "Iconic Projects", "Landmark Projects"],
        slug: "aldar-properties",
        propertyTypes: ["Apartment", "Villa", "Commercial"],
        cities: ["Abu Dhabi"],
        status: "Ready",
        developerType: "Mixed Use Developer",
        priceRange: "AED 1M - 3M",
        rating: 4.3,
        reviews: "1.2k reviews",
    },
   
];

function FilterCheckbox({
    label,
    checked,
    onChange,
    count,
}: {
    label: string;
    checked: boolean;
    onChange: () => void;
    count?: number;
}) {
    return (
        <label className="flex cursor-pointer items-start gap-3 text-sm lg:text-md lg:text-md text-white">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mt-0.5 h-5 w-5 rounded border border-white/20 bg-transparent accent-yellow-400"
            />
            <span className="leading-5">
                {label} {typeof count === "number" ? <span className="text-white">({count})</span> : null}
            </span>
        </label>
    );
}

function DeveloperListingSection() {
    const [activeTab, setActiveTab] = useState<DeveloperCategory>("All");
    const [search, setSearch] = useState("");

    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<PropertyType[]>([]);
    const [selectedCities, setSelectedCities] = useState<CityFilter[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<StatusFilter[]>([]);
    const [selectedDeveloperTypes, setSelectedDeveloperTypes] = useState<DeveloperTypeFilter[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRangeFilter[]>([]);

    const toggleValue = <T,>(value: T, selected: T[], setter: (next: T[]) => void) => {
        setter(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
    };

    const filteredDevelopers = useMemo(() => {
        return developers.filter((developer) => {
            const matchesTab =
                activeTab === "All" ? true : developer.category === activeTab;

            const matchesSearch =
                `${developer.name} ${developer.type} ${developer.headquarters} ${developer.category} ${developer.developerType} ${developer.status} ${developer.cities.join(" ")} ${developer.propertyTypes.join(" ")}`
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesPropertyType =
                selectedPropertyTypes.length === 0 ||
                developer.propertyTypes.some((item) => selectedPropertyTypes.includes(item));

            const matchesCity =
                selectedCities.length === 0 ||
                developer.cities.some((item) => selectedCities.includes(item));

            const matchesStatus =
                selectedStatuses.length === 0 || selectedStatuses.includes(developer.status);

            const matchesDeveloperType =
                selectedDeveloperTypes.length === 0 ||
                selectedDeveloperTypes.includes(developer.developerType);

            const matchesPriceRange =
                selectedPriceRanges.length === 0 ||
                selectedPriceRanges.includes(developer.priceRange);

            return (
                matchesTab &&
                matchesSearch &&
                matchesPropertyType &&
                matchesCity &&
                matchesStatus &&
                matchesDeveloperType &&
                matchesPriceRange
            );
        });
    }, [
        activeTab,
        search,
        selectedPropertyTypes,
        selectedCities,
        selectedStatuses,
        selectedDeveloperTypes,
        selectedPriceRanges,
    ]);

    return (
        <section className="px-4 md:px-8 xl:px-10 pb-16 mt-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-3">
                        {tabs.map((tab) => {
                            const active = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-full px-4 py-2 text-sm lg:text-md lg:text-md font-medium transition ${active
                                            ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black"
                                        : "border border-white/10 bg-white/[0.03] text-white hover:border-yellow-500/30 hover:text-white"
                                        }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative max-w-md">
                        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm lg:text-md lg:text-md text-white" />
                        <input
                            type="text"
                            placeholder="Search developers here"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-11 pr-5 text-sm lg:text-md lg:text-md text-white placeholder:text-white outline-none focus:border-yellow-500/30"
                        />
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px,minmax(0,1fr)]">
                    <aside className="h-fit rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                        <h3 className="text-xl font-semibold text-white">All Filters</h3>

                        <div className="mt-6 border-t border-white/10 pt-6">
                            <button className="flex w-full items-center justify-between text-left">
                                <span className="text-lg font-medium text-white">Property Type</span>
                                <FaChevronDown className="text-sm lg:text-md lg:text-md text-white" />
                            </button>

                            <div className="mt-5 space-y-4">
                                {propertyTypes.map((item) => (
                                    <FilterCheckbox
                                        key={item}
                                        label={item}
                                        count={developers.filter((d) => d.propertyTypes.includes(item)).length}
                                        checked={selectedPropertyTypes.includes(item)}
                                        onChange={() =>
                                            toggleValue(item, selectedPropertyTypes, setSelectedPropertyTypes)
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <button className="flex w-full items-center justify-between text-left">
                                <span className="text-lg font-medium text-white">City</span>
                                <FaChevronDown className="text-sm lg:text-md lg:text-md text-white" />
                            </button>

                            <div className="mt-5 space-y-4">
                                {cities.map((item) => (
                                    <FilterCheckbox
                                        key={item}
                                        label={item}
                                        count={developers.filter((d) => d.cities.includes(item)).length}
                                        checked={selectedCities.includes(item)}
                                        onChange={() => toggleValue(item, selectedCities, setSelectedCities)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <button className="flex w-full items-center justify-between text-left">
                                <span className="text-lg font-medium text-white">Price Range</span>
                                <FaChevronDown className="text-sm lg:text-md lg:text-md text-white" />
                            </button>

                            <div className="mt-5 space-y-4">
                                {priceRanges.map((item) => (
                                    <FilterCheckbox
                                        key={item}
                                        label={item}
                                        count={developers.filter((d) => d.priceRange === item).length}
                                        checked={selectedPriceRanges.includes(item)}
                                        onChange={() =>
                                            toggleValue(item, selectedPriceRanges, setSelectedPriceRanges)
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <button className="flex w-full items-center justify-between text-left">
                                <span className="text-lg font-medium text-white">Developer Type</span>
                                <FaChevronDown className="text-sm lg:text-md lg:text-md text-white" />
                            </button>

                            <div className="mt-5 space-y-4">
                                {developerTypes.map((item) => (
                                    <FilterCheckbox
                                        key={item}
                                        label={item}
                                        count={developers.filter((d) => d.developerType === item).length}
                                        checked={selectedDeveloperTypes.includes(item)}
                                        onChange={() =>
                                            toggleValue(item, selectedDeveloperTypes, setSelectedDeveloperTypes)
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <button className="flex w-full items-center justify-between text-left">
                                <span className="text-lg font-medium text-white">Status</span>
                                <FaChevronDown className="text-sm lg:text-md lg:text-md text-white" />
                            </button>

                            <div className="mt-5 space-y-4">
                                {statuses.map((item) => (
                                    <FilterCheckbox
                                        key={item}
                                        label={item}
                                        count={developers.filter((d) => d.status === item).length}
                                        checked={selectedStatuses.includes(item)}
                                        onChange={() => toggleValue(item, selectedStatuses, setSelectedStatuses)}
                                    />
                                ))}
                            </div>
                        </div>
                    </aside>

                    <div>
                        <div className="mb-5 flex items-center justify-between">
                            <p className="text-base font-medium text-white">
                                Showing <span className="text-white">{filteredDevelopers.length}</span> developers
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {filteredDevelopers.map((developer) => (
                                <article
                                    key={developer.id}
                                    className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-yellow-500/25 hover:bg-white/[0.05]"
                                >
                                    <div className="flex justify-center">
                                        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white">
                                            <Image
                                                src={developer.image}
                                                alt={developer.name}
                                                fill
                                                className="object-contain p-3"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 text-center">
                                        <a
                                            href={`/developer/${developer.slug}`}
                                            className="line-clamp-2 text-2xl font-semibold text-white transition group-hover:text-yellow-300"
                                        >
                                            {developer.name}
                                        </a>

                                        {/* <div className="mt-3 flex items-center justify-center gap-2 text-sm lg:text-md lg:text-md text-white">
                                            <span className="text-yellow-400">★ {developer.rating.toFixed(1)}</span>
                                            <span>|</span>
                                            <span>{developer.reviews}</span>
                                        </div> */}
                                    </div>

                                    {/* <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white">
                                            {developer.developerType}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white">
                                            {developer.status}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white">
                                            {developer.priceRange}
                                        </span>
                                    </div> */}

                                    {/* <div className="mt-5 space-y-2 text-center text-sm lg:text-md lg:text-md text-white">
                                        <p>{developer.headquarters}</p>
                                        <p>{developer.projects}</p>
                                        <p>{developer.experience}</p>
                                    </div> */}

                                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                                        {developer.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-yellow-500/15 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={`/developer/${developer.slug}`}
                                        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-4 py-3 text-sm lg:text-md lg:text-md font-medium text-black transition hover:scale-[1.02]"
                                    >
                                        View Details
                                    </a>
                                </article>
                            ))}

                            {!filteredDevelopers.length && (
                                <div className="col-span-full rounded-[28px] border border-dashed border-white/10 bg-white/[0.02] p-10 text-center text-white">
                                    No developers found for the selected filters.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function DeveloperPage() {
    return (
        <main className="bg-black text-white">
            <TeamHero />
            <section className="mx-auto max-w-7xl px-4 pt-6 md:px-10">
                <AutoBreadcrumbs />
            </section>
            <DeveloperListingSection />
        </main>
    );
}