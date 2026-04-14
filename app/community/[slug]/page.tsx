"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaBed,
  FaRulerCombined,
  FaArrowLeft,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import hero2 from "../../../public/image_6.png";
import hero1 from "../../../public/image_7.png";
import hero3 from "../../../public/image_5.png";
import projectImage from "../../../public/hero1.jpg";
import AutoBreadcrumbs from "@/app/components/BreadCrumbs";
import WebsiteContentService from "@/app/services/websitecontent.service";
import ContactModal from "@/app/components/ContactModal";
import MortgageCalculator from "@/app/components/MortrageForm";
import LuxuryFAQ from "@/app/components/FAQ";
import ProjectHeroSlider from "@/app/components/ProjectSlider";
import FloorPlan from "../../../public/floorplan.webp";
import ReadMoreSlider from "@/app/components/ReadMoreSlider";

const tabs = ["overview", "amenities", "FAQ"] as const;
type TabKey = (typeof tabs)[number];

type ContactIntent =
  | "schedule-visit"
  | "download-floor-plan"
  | "request-brochure"
  | "book-consultation"
  | "general";

type BackendAmenity =
  | string
  | {
    name?: string;
    icon?: string;
  };

type BackendFloorPlan =
  | {
    label?: string;
    title?: string;
    name?: string;
    size?: string | number;
    price?: string | number;
    image?: string;
    url?: string;
  }
  | string;

type BackendProject = {
  _id?: string;
  title?: string;
  buildingName?: string;
  metaTitle?: string;
  slug?: string;
  metaDescription?: string;
  type?: string | { _id?: string; name?: string; title?: string };
  subType?: string | { _id?: string; name?: string; title?: string };
  developer?: string | { _id?: string; name?: string; title?: string };
  developerType?: string;
  shortDescription?: string;
  category?: string;
  city?: string;
  fullDescription?: string;
  appDescription?: string;
  location?: string;
  address?: string;
  longitude?: string | number;
  latitude?: string | number;
  propertyStatus?: string;
  visibility?: string;
  price?: string | number;
  status?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  thumbnail?: string;
  gallery?: string[];
  enquireFormImage?: string;
  featured?: boolean;
  active?: boolean;
  hotLaunch?: boolean;
  exclusive?: boolean;
  sortOrder?: number;
  tag?: string;
  url?: string;
  author?: string;
  propertyBanner?: string;
  amenities?: BackendAmenity[];
  floorPlans?: BackendFloorPlan[];
  createdAt?: string;
  updatedAt?: string;
};

type UiFloorPlan = {
  label: string;
  size: string;
  price: string;
  image: string;
};

type UiProject = {
  id: string;
  title: string;
  category: string;
  location: string;
  subLocation: string;
  price: string;
  bedrooms: string;
  area: string;
  handover: string;
  developer: string;
  residence: string;
  description: string;
  heroImages: string[];
  floorPlans: UiFloorPlan[];
  amenities: string[];
  highlights: string[];
};

const EMPTY_VALUE = "Not available";

const fallbackImages = [hero1.src, hero2.src, hero3.src];

function getDisplayValue(value: unknown, fallback = EMPTY_VALUE) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && !value.trim()) return fallback;
  return String(value);
}

function getRelationLabel(
  value: string | { name?: string; title?: string } | undefined,
  fallback = EMPTY_VALUE,
) {
  if (!value) return fallback;
  if (typeof value === "string") return value.trim() || fallback;
  return value.name || value.title || fallback;
}

function formatPrice(value: string | number | undefined) {
  if (value === null || value === undefined || value === "" || Number(value) === 0) {
    return EMPTY_VALUE;
  }

  if (typeof value === "number") {
    return `AED ${value.toLocaleString("en-AE")}`;
  }

  const numeric = Number(String(value).replace(/,/g, ""));
  if (!Number.isNaN(numeric) && numeric > 0) {
    return `AED ${numeric.toLocaleString("en-AE")}`;
  }

  return String(value);
}

function formatBedrooms(value: string | number | undefined) {
  if (value === null || value === undefined || value === "" || Number(value) === 0) {
    return EMPTY_VALUE;
  }
  return `${value} Bedroom${Number(value) > 1 ? "s" : ""}`;
}

function getProjectImages(data?: BackendProject) {
  const images = [
    data?.propertyBanner,
    data?.thumbnail,
    ...(Array.isArray(data?.gallery) ? data!.gallery : []),
  ].filter((item): item is string => Boolean(item && item.trim()));

  return images.length ? Array.from(new Set(images)) : fallbackImages;
}

function getAmenities(data?: BackendProject) {
  if (!Array.isArray(data?.amenities) || !data!.amenities!.length) {
    return [EMPTY_VALUE];
  }

  return data!.amenities!.map((item) => {
    if (typeof item === "string") return item || EMPTY_VALUE;
    return item?.name || EMPTY_VALUE;
  });
}

function getFloorPlans(data?: BackendProject): UiFloorPlan[] {
  if (!Array.isArray(data?.floorPlans) || !data!.floorPlans!.length) {
    return [
      {
        label: EMPTY_VALUE,
        size: EMPTY_VALUE,
        price: EMPTY_VALUE,
        image: data?.thumbnail || fallbackImages[0],
      },
    ];
  }

  return data!.floorPlans!.map((plan, index) => {
    if (typeof plan === "string") {
      return {
        label: plan || `Plan ${index + 1}`,
        size: EMPTY_VALUE,
        price: EMPTY_VALUE,
        image: data?.thumbnail || fallbackImages[0],
      };
    }

    return {
      label: plan.label || plan.title || plan.name || `Plan ${index + 1}`,
      size: getDisplayValue(plan.size),
      price:
        plan.price !== undefined && plan.price !== null && String(plan.price).trim() !== ""
          ? formatPrice(plan.price)
          : EMPTY_VALUE,
      image: plan.image || plan.url || data?.thumbnail || fallbackImages[0],
    };
  });
}

function getHighlights(data?: BackendProject) {
  const list = [
    data?.category ? `${data.category} property in ${getDisplayValue(data.city)}` : "",
    data?.location ? `Located in ${data.location}` : "",
    data?.propertyStatus ? `Status: ${data.propertyStatus}` : "",
    data?.tag ? `Property tag: ${data.tag}` : "",
  ].filter(Boolean);

  return list.length ? list : [EMPTY_VALUE];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = String(params?.id || "");

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<BackendProject | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState<ContactIntent>("general");

  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    terms: false,
  });

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await WebsiteContentService.getPropertyBySlug(slug);
        setProjectDetails(response || null);
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setProjectDetails(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProject();
  }, [slug]);

  const project = useMemo<UiProject | null>(() => {
    if (!projectDetails) return null;

    const heroImages = getProjectImages(projectDetails);
    const floorPlans = getFloorPlans(projectDetails);

    return {
      id: projectDetails._id || "",
      title: getDisplayValue(projectDetails.title),
      category: getDisplayValue(projectDetails.category),
      location: getDisplayValue(projectDetails.city),
      subLocation: getDisplayValue(projectDetails.location),
      price: formatPrice(projectDetails.price),
      bedrooms: formatBedrooms(projectDetails.bedrooms),
      area: EMPTY_VALUE,
      handover: getDisplayValue(projectDetails.propertyStatus),
      developer: getRelationLabel(projectDetails.developer),
      residence: getRelationLabel(projectDetails.type),
      description:
        projectDetails.fullDescription?.trim() ||
        projectDetails.shortDescription?.trim() ||
        projectDetails.metaDescription?.trim() ||
        EMPTY_VALUE,
      heroImages,
      floorPlans,
      amenities: getAmenities(projectDetails),
      highlights: getHighlights(projectDetails),
    };
  }, [projectDetails]);

  useEffect(() => {
    if (!project?.floorPlans?.length) return;
    setSelectedPlan(project.floorPlans[0].label);
  }, [project]);

  const selectedUnitPlan =
    project?.floorPlans.find((item) => item.label === selectedPlan) ||
    project?.floorPlans?.[0];

  const [calcTab, setCalcTab] = useState<"mortgage" | "payment-plan">("mortgage");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanYears, setLoanYears] = useState(25);
  const [bookingPercent, setBookingPercent] = useState(10);
  const [constructionPercent, setConstructionPercent] = useState(50);
  const [handoverPercent, setHandoverPercent] = useState(40);

  useEffect(() => {
    if (!project?.floorPlans?.length) return;
    setSelectedUnit(project.floorPlans[0].label);
  }, [project]);

  function getNumericPrice(value: string) {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const num = Number(cleaned);
    return Number.isFinite(num) ? Math.round(num) : 0;
  }

  useEffect(() => {
    if (selectedUnitPlan?.price && selectedUnitPlan.price !== EMPTY_VALUE) {
      setPropertyPrice(getNumericPrice(selectedUnitPlan.price));
      return;
    }

    if (project?.price && project.price !== EMPTY_VALUE) {
      setPropertyPrice(getNumericPrice(project.price));
      return;
    }

    setPropertyPrice(0);
  }, [selectedUnitPlan, project]);

  useEffect(() => {
    if (!project?.heroImages?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === project.heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (loading) {
    return (
      <ProjectDetailsSkeleton />
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white px-6 md:px-12 py-14">


        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <h1 className="text-2xl font-semibold mb-2">Project not found</h1>
          <p className="text-white-400">
            The requested property could not be located.
          </p>
        </div>
      </div>
    );
  }

  const activePlan =
    project.floorPlans.find((item) => item.label === selectedPlan) ||
    project.floorPlans[0];

  const openContactModal = (intent: ContactIntent) => {
    setContactIntent(intent);
    setContactForm((prev) => ({
      ...prev,
      message: getDefaultMessage(intent, project.title, activePlan?.label),
    }));
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setContactForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...contactForm,
      intent: contactIntent,
      projectId: project.id,
      projectTitle: project.title,
      floorPlan: activePlan?.label || "",
    };

    console.log("Contact Form Submit:", payload);
    closeContactModal();
  };

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const amountFinanced = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanYears * 12;

  const monthlyPayment =
    monthlyRate > 0
      ? (amountFinanced *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : amountFinanced / Math.max(numberOfPayments, 1);

  const annualCost = monthlyPayment * 12;
  const totalMortgagePaid = monthlyPayment * numberOfPayments;
  const totalInterestPaid = totalMortgagePaid - amountFinanced;
  const totalCost = downPaymentAmount + totalMortgagePaid;

  const bookingAmount = (propertyPrice * bookingPercent) / 100;
  const constructionAmount = (propertyPrice * constructionPercent) / 100;
  const handoverAmount = (propertyPrice * handoverPercent) / 100;

  return (
    <>
      <main className="bg-black text-white min-h-screen overflow-x-hidden">
        <section className="relative">
          <ProjectHeroSlider project={project} fallbackImages={fallbackImages} />
        </section>

        <div className="flex justify-between w-full items-center">
          <section className="max-w-2xl px-4 md:px-10 pt-6">
            <AutoBreadcrumbs />
          </section>
          {/* <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-white-300 hover:text-white transition"
            >
              <FaArrowLeft />
              Back to Projects
            </Link>
          </section> */}
        </div>

        <section className="max-w-[85rem] mx-auto px-4 md:px-10 mt-6 md:mt-8 relative z-20">
          <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-black/65 backdrop-blur-xl p-5 md:p-6">
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <FactCard
                    icon={<FaDollarSign className="text-yellow-400" />}
                    label="Starting Price"
                    value={project.price}
                  />
                  <FactCard
                    icon={<FaBed className="text-yellow-400" />}
                    label="Bedrooms"
                    value={project.bedrooms}
                  />
                  <FactCard
                    icon={<FaRulerCombined className="text-yellow-400" />}
                    label="Size Range"
                    value={project.area}
                  />
                  <FactCard
                    icon={<FaMapMarkerAlt className="text-yellow-400" />}
                    label="Location"
                    value={project.subLocation}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/65 backdrop-blur-xl p-5 md:p-6 shadow-[0_0_40px_rgba(250,204,21,0.06)]">
              <div className="space-y-3 text-sm text-white-300">
                <MetaRow label="Developer" value={"DAMAC"} />
                <MetaRow label="Property Type" value={"Luxury"} />
                <MetaRow label="Handover" value={project.handover} />
                <MetaRow label="Category" value={project.category} isLast />
              </div>

              <button
                onClick={() => openContactModal("schedule-visit")}
                className="mt-6 w-full rounded-2xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black py-4 font-semibold hover:scale-[1.01] transition"
              >
                Schedule Private Visit
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-2 pb-8">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm border transition ${active
                    ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black border-transparent"
                    : "border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/40 hover:text-white"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
          </div>
        </section>

        {activeTab === "overview" && (
          <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                  Project Overview
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-5">
                  Premium living shaped by design, location, and long-term value
                </h2>
                <ReadMoreSlider description={project.description} heading="Project Description" />

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {project.highlights.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-start gap-3"
                    >
                      <FaCheckCircle className="text-yellow-400 mt-1 shrink-0" />
                      <p className="text-white-300 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                  Why It Stands Out
                </p>
                <div className="space-y-5 text-white-400">
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Strategic Positioning</h3>
                    <p className="leading-relaxed">{project.category}</p>
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Design-Led Living</h3>
                    <p className="leading-relaxed"><ReadMoreSlider description={project.description} heading="Project Description" /></p>
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Long-Term Potential</h3>
                    <p className="leading-relaxed">{project.handover}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "amenities" && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 pb-14">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                Amenities
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-8">
                Elevated lifestyle experiences
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.amenities.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5 hover:border-yellow-400/30 transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4">
                      <FaCheckCircle className="text-yellow-400" />
                    </div>
                    <p className="text-white font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {activeTab === "FAQ" && <LuxuryFAQ />}

        <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8 mb-8">
            <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
              Floor Plans
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Explore available layouts
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {project.floorPlans.map((plan) => {
              const active = selectedPlan === plan.label;

              return (
                <div
                  key={plan.label}
                  onClick={() => setSelectedPlan(plan.label)}
                  className={`group relative cursor-pointer overflow-hidden rounded-[30px] border transition-all duration-500 ${active
                      ? "border-yellow-400/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_20px_60px_rgba(241,220,127,0.12)]"
                      : "border-white/10 bg-white/[0.03] hover:border-yellow-400/30 hover:shadow-[0_16px_50px_rgba(241,220,127,0.08)]"
                    }`}
                >
                  {/* glow */}
                  <div className="absolute -top-16 left-[-20px] h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-[-30px] right-[-10px] h-44 w-44 rounded-full bg-yellow-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                  {/* top gold line */}
                  <div
                    className={`absolute top-0 left-0 h-[2px] w-full bg-[linear-gradient(90deg,#7C5700,#F1DC7F,#B9A650)] transition-all duration-500 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-80"
                      }`}
                  />

                  {/* image */}
                  <div className="relative h-[260px] overflow-hidden blur-sm">
                    <Image
                      src={FloorPlan}
                      alt={plan.label}
                      fill
                      className="object-contain transition duration-700 group-hover:scale-110 bg-white "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent,rgba(0,0,0,0.45))]" />

                    {/* floating badge */}
                    <div className="absolute top-5 left-5 rounded-full border border-yellow-400/20 bg-black/40 backdrop-blur-md px-4 py-2">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-yellow-400">
                        Floor Plan
                      </p>
                    </div>

                    {/* title over image */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-2xl font-semibold text-white leading-tight">
                        {plan.label}
                      </h3>
                    </div>
                  </div>

                  {/* content */}
                  <div className="relative p-6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] backdrop-blur-xl">
                    <div className="mb-5 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white mb-2">
                          Size
                        </p>
                        <p className="text-white font-medium text-base">{plan.size}</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white mb-2">
                          Starting Price
                        </p>
                        <p className="text-white font-medium text-base">{plan.price}</p>
                      </div>
                    </div>

                    {/* bottom row */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-yellow-400 mb-1">
                          Premium Layout
                        </p>
                        <p className="text-sm text-white">
                          Crafted for luxury living
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openContactModal("download-floor-plan");
                        }}
                        className={`rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${active
                            ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black shadow-[0_10px_30px_rgba(241,220,127,0.18)]"
                            : "border border-white/15 bg-white/[0.03] text-white hover:border-yellow-400/40 hover:text-yellow-400"
                          }`}
                      >
                        Download Plan
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
              Gallery
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-8">
              Visual highlights of the project
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {project.heroImages.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => setPreviewImage(image)}
                  className="relative h-[260px] rounded-[24px] overflow-hidden border border-white/10 cursor-pointer group"
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {previewImage && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setPreviewImage(null)} />
            <div className="relative max-w-4xl w-full px-4">
              <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden">
                <Image src={previewImage} alt="Preview" fill className="object-contain" />
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-2 right-6 text-white text-3xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        <section className="max-w-[85rem] mx-auto px-4 md:px-10 mt-6 md:mt-8 mb-2 relative z-20">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[36px] border border-yellow-500/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.08),transparent_24%)]" />
              <div className="absolute top-0 left-[12%] h-[220px] w-[220px] rounded-full bg-yellow-400/10 blur-3xl" />
              <div className="absolute bottom-[-40px] right-[8%] h-[260px] w-[260px] rounded-full bg-yellow-500/10 blur-3xl" />

              <div className="relative z-10 px-5 md:px-8 lg:px-10 py-6 md:py-8">
                {/* top tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <button
                    onClick={() => setCalcTab("mortgage")}
                    className={`rounded-full px-6 py-3 text-xs md:text-sm lg:text-md lg:text-md font-semibold tracking-[0.18em] uppercase transition ${calcTab === "mortgage"
                      ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black shadow-[0_8px_30px_rgba(241,220,127,0.25)]"
                      : "border border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/30 hover:text-white"
                      }`}
                  >
                    Mortgage Calculator
                  </button>

                  <button
                    onClick={() => setCalcTab("payment-plan")}
                    className={`rounded-full px-6 py-3 text-xs md:text-sm lg:text-md lg:text-md font-semibold tracking-[0.18em] uppercase transition ${calcTab === "payment-plan"
                      ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black shadow-[0_8px_30px_rgba(241,220,127,0.25)]"
                      : "border border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/30 hover:text-white"
                      }`}
                  >
                    Payment Plans
                  </button>
                </div>

                <div className="grid xl:grid-cols-[0.85fr_1.15fr] gap-8 xl:gap-10">
                  {/* left side */}
                  <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 md:p-7">
                    <div className="mb-8">
                      <label className="block text-sm lg:text-md lg:text-md font-medium text-white-300 mb-3">
                        Select Unit
                      </label>

                      <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
                        <select
                          value={selectedUnit}
                          onChange={(e) => setSelectedUnit(e.target.value)}
                          className="w-full bg-transparent text-white text-lg outline-none"
                        >
                          {project.floorPlans.map((plan) => (
                            <option
                              key={plan.label}
                              value={plan.label}
                              className="bg-[#111111] text-white"
                            >
                              {plan.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {calcTab === "mortgage" ? (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <PremiumCalcInput
                          label="Property Value"
                          value={propertyPrice}
                          onChange={(value) =>
                            setPropertyPrice(Number(value) || 0)
                          }
                        />
                        <PremiumCalcInput
                          label="Down Payment %"
                          value={downPaymentPercent}
                          onChange={(value) =>
                            setDownPaymentPercent(Number(value) || 0)
                          }
                        />
                        <PremiumCalcInput
                          label="Term (Years)"
                          value={loanYears}
                          onChange={(value) => setLoanYears(Number(value) || 0)}
                        />
                        <PremiumCalcInput
                          label="Interest Rate %"
                          value={interestRate}
                          step="0.1"
                          onChange={(value) =>
                            setInterestRate(Number(value) || 0)
                          }
                        />
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <PremiumCalcInput
                          label="Property Value"
                          value={propertyPrice}
                          onChange={(value) =>
                            setPropertyPrice(Number(value) || 0)
                          }
                        />
                        <PremiumCalcInput
                          label="Booking %"
                          value={bookingPercent}
                          onChange={(value) =>
                            setBookingPercent(Number(value) || 0)
                          }
                        />
                        <PremiumCalcInput
                          label="During Construction %"
                          value={constructionPercent}
                          onChange={(value) =>
                            setConstructionPercent(Number(value) || 0)
                          }
                        />
                        <PremiumCalcInput
                          label="On Handover %"
                          value={handoverPercent}
                          onChange={(value) =>
                            setHandoverPercent(Number(value) || 0)
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* right side */}
                  <div className="rounded-[28px] border border-yellow-500/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 md:p-7">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-yellow-400 mb-2">
                          Financial Estimate
                        </p>
                        <h3 className="text-md md:text-md font-semibold text-white">
                          {calcTab === "mortgage"
                            ? "Mortgage Overview"
                            : "Payment Plan Overview"}
                        </h3>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-white-400 mb-2">
                          Property Value
                        </p>
                        <h3 className="text-md md:text-md text-transparent font-semibold bg-clip-text bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)]">
                          AED {formatAED(propertyPrice)}
                        </h3>
                      </div>

                    </div>

                    {calcTab === "mortgage" ? (
                      <>
                        <div className="grid md:grid-cols-3 ml-4  gap-6 md:gap-0 mb-1 items-stretch">

                          <div className="flex items-center">
                            <PremiumResultCard
                              title="Total Cost"
                              value={formatAED(totalCost)}
                              suffix="AED"
                            />

                            {/* Divider */}
                            <div className="hidden md:block h-[60%] w-[1px] mx-6 bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent" />
                          </div>

                          <div className="flex items-center">
                            <PremiumResultCard
                              title="Mortgage Payment"
                              value={formatAED(monthlyPayment)}
                              suffix="AED /Month"
                              highlighted
                            />

                            {/* Divider */}
                            <div className="hidden md:block h-[60%] w-[1px] mx-6 bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent" />
                          </div>

                          <div>
                            <PremiumResultCard
                              title="Annual Cost"
                              value={formatAED(annualCost)}
                              suffix="AED /Year"
                            />
                          </div>

                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-black/25 md:p-2 space-y-4">
                          <PremiumBreakdownRow
                            label="Down Payment"
                            value={`AED ${formatAED(downPaymentAmount)}`}
                          />
                          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent " />

                          <PremiumBreakdownRow
                            label="Amount Financed"
                            value={`AED ${formatAED(amountFinanced)}`}
                          />
                          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent " />

                          <PremiumBreakdownRow
                            label="Total Interest Paid"
                            value={`AED ${formatAED(totalInterestPaid)}`}
                          />

                          {/* 🔥 Golden subtle divider */}
                          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent " />

                          <div className="pt-3">
                            <PremiumBreakdownRow
                              label="Total Cost"
                              value={`AED ${formatAED(totalCost)}`}
                              bold
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid md:grid-cols-3 gap-4 mb-8">
                          <PremiumResultCard
                            title="Booking Amount"
                            value={formatAED(bookingAmount)}
                            suffix="AED"
                            highlighted
                          />
                          
                          <PremiumResultCard
                            title="Construction"
                            value={formatAED(constructionAmount)}
                            suffix="AED"
                          />
                          <PremiumResultCard
                            title="Handover"
                            value={formatAED(handoverAmount)}
                            suffix="AED"
                          />
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-black/25 p-5 md:p-6 space-y-5">
                          <PremiumBreakdownRow
                            label="Booking Payment"
                            value={`AED ${formatAED(bookingAmount)}`}
                          />
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent " />
                          <PremiumBreakdownRow
                            label="During Construction"
                            value={`AED ${formatAED(constructionAmount)}`}
                          />
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent " />
                          <PremiumBreakdownRow
                            label="On Handover"
                            value={`AED ${formatAED(handoverAmount)}`}
                          />
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent " />
                          <div className=" ">
                            <PremiumBreakdownRow
                              label="Total Cost"
                              value={`AED ${formatAED(propertyPrice)}`}
                              bold
                            />
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* calculator section stays same */}
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        onSubmit={handleContactSubmit}
        projectImage={project.heroImages[0] || project.thumbnail || ""}
        form={contactForm}
        onChange={handleContactChange}
        projectTitle={project.title}
        intent={contactIntent}
      />
    </>
  );
}

function FactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <p className="text-sm text-white-400">{label}</p>
      </div>
      <p className="text-white font-semibold">{value || EMPTY_VALUE}</p>
    </div>
  );
}

function MetaRow({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${!isLast ? "border-b border-white/10 pb-3" : ""
        }`}
    >
      <span>{label}</span>
      <span className="text-white font-semibold text-right">{value || EMPTY_VALUE}</span>
    </div>
  );
}



function formatAED(value: number) {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("en-AE");
}

function SkeletonBlock({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-white/10 ${className}`}
    />
  );
}

function ProjectDetailsSkeleton() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative mt-4 px-4 md:px-10">
        <div className="relative h-[74vh] min-h-[560px] md:min-h-[640px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <SkeletonBlock className="absolute inset-0 rounded-[32px]" />

          <div className="absolute top-5 right-5 md:top-8 md:right-8 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md px-5 py-4 w-[140px]">
            <SkeletonBlock className="h-3 w-16 mb-2" />
            <SkeletonBlock className="h-5 w-24" />
          </div>

          <div className="absolute left-5 right-5 bottom-6 md:left-8 md:right-8 md:bottom-8">
            <div className="max-w-[760px]">
              <SkeletonBlock className="h-3 w-32 mb-4" />
              <SkeletonBlock className="h-10 md:h-14 w-[320px] md:w-[500px] mb-4" />
              <SkeletonBlock className="h-5 w-[220px]" />
            </div>

            <section className="max-w-4xl mx-auto px-4 md:px-10 py-8">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {[1, 2, 3, 4].map((item) => (
                  <SkeletonBlock
                    key={item}
                    className="w-[120px] h-[70px] md:w-[150px] md:h-[100px] shrink-0 rounded-2xl"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Breadcrumb + back */}
      <div className="flex justify-between w-full items-center px-4 md:px-10 pt-6 gap-4">
        <SkeletonBlock className="h-5 w-48" />
        <SkeletonBlock className="h-5 w-32" />
      </div>

      {/* Quick facts + meta */}
      <section className="max-w-[85rem] mx-auto px-4 md:px-10 mt-6 md:mt-8 relative z-20">
        <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">
          <div className="rounded-[28px] border border-white/10 bg-black/65 backdrop-blur-xl p-5 md:p-6">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <SkeletonBlock className="h-5 w-5 rounded-full" />
                    <SkeletonBlock className="h-4 w-24" />
                  </div>
                  <SkeletonBlock className="h-5 w-28" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/65 backdrop-blur-xl p-5 md:p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-4 w-28" />
                </div>
              ))}
            </div>

            <SkeletonBlock className="mt-6 h-14 w-full rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-2 pb-8">
        <div className="flex gap-3">
          <SkeletonBlock className="h-11 w-28 rounded-full" />
          <SkeletonBlock className="h-11 w-28 rounded-full" />
        </div>
      </section>

      {/* Overview section */}
      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <SkeletonBlock className="h-4 w-36 mb-3" />
            <SkeletonBlock className="h-10 w-[70%] mb-5" />
            <div className="space-y-3 mb-8">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-[95%]" />
              <SkeletonBlock className="h-4 w-[88%]" />
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <SkeletonBlock className="h-4 w-full mb-2" />
                  <SkeletonBlock className="h-4 w-[80%]" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <SkeletonBlock className="h-4 w-36 mb-3" />
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <SkeletonBlock className="h-5 w-40 mb-2" />
                  <SkeletonBlock className="h-4 w-full mb-2" />
                  <SkeletonBlock className="h-4 w-[90%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floor plans */}
      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8 mb-8">
          <SkeletonBlock className="h-4 w-28 mb-3" />
          <SkeletonBlock className="h-8 w-60" />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-[28px] overflow-hidden border border-white/10"
            >
              <SkeletonBlock className="h-[240px] w-full rounded-none" />
              <div className="p-5 bg-black/40">
                <SkeletonBlock className="h-6 w-32 mb-4" />
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between">
                    <SkeletonBlock className="h-4 w-16" />
                    <SkeletonBlock className="h-4 w-20" />
                  </div>
                  <div className="flex justify-between">
                    <SkeletonBlock className="h-4 w-24" />
                    <SkeletonBlock className="h-4 w-24" />
                  </div>
                </div>
                <SkeletonBlock className="h-11 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <SkeletonBlock className="h-4 w-20 mb-3" />
          <SkeletonBlock className="h-8 w-64 mb-8" />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SkeletonBlock
                key={item}
                className="h-[260px] w-full rounded-[24px]"
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
function getModalHeading(intent: ContactIntent) {
  switch (intent) {
    case "schedule-visit":
      return "Schedule your private project visit";
    case "download-floor-plan":
      return "Request detailed floor plan access";
    case "request-brochure":
      return "Get the full project brochure";
    case "book-consultation":
      return "Book a premium consultation";
    default:
      return "Connect with our property team";
  }
}

function getDefaultMessage(
  intent: ContactIntent,
  projectTitle: string,
  floorPlanLabel?: string,
) {
  switch (intent) {
    case "schedule-visit":
      return `I am interested in scheduling a private visit for ${projectTitle}. Please contact me with available timings.`;
    case "download-floor-plan":
      return `I would like to receive the floor plan for ${projectTitle}${floorPlanLabel ? ` (${floorPlanLabel})` : ""
        }.`;
    case "request-brochure":
      return `Please share the latest brochure, pricing, and availability for ${projectTitle}.`;
    case "book-consultation":
      return `I would like to book a consultation regarding ${projectTitle}, financing options, and availability.`;
    default:
      return `I am interested in ${projectTitle}. Please contact me with more details.`;
  }
}

function PremiumCalcInput({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  step?: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
      <label className="block text-sm text-white-400 mb-2">{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-xl font-medium text-white outline-none"
      />
    </div>
  );
}

function PremiumResultCard({
  title,
  value,
  suffix,
  highlighted = false,
}: {
  title: string;
  value: string;
  suffix: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-[24px]  p-5 min-h-[80px] flex flex-col justify-between ${highlighted
        ? "border-yellow-400/25"
        : ""
        }`}
    >
      <p className="text-sm text-white-400">{title}</p>
      <div>
        <p className="text-md md:text-md font-semibold text-white leading-tight mt-1">
          {value}
        </p>
        <p className="mt-2 text-base font-medium text-white-300">{suffix}</p>
      </div>
    </div>
  );
}

function PremiumBreakdownRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <p
        className={
          bold
            ? "text-md md:text-lg font-semibold text-white"
            : "text-base text-white-300"
        }
      >
        {label}
      </p>
      <p
        className={
          bold
            ? "text-md md:text-lg font-semibold text-yellow-400"
            : "text-base font-medium text-white"
        }
      >
        {value}
      </p>
    </div>
  );
}
