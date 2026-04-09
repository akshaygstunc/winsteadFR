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

const tabs = ["overview", "amenities"] as const;
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
        <section className="relative mt-4 px-4 md:px-10">
          <div className="relative h-[74vh] min-h-[560px] md:min-h-[640px] overflow-hidden rounded-[32px] border border-white/10">
            <Image
              src={project.heroImages[currentIndex] || fallbackImages[0]}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute top-5 right-5 md:top-8 md:right-8 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-1">
                Category
              </p>
              <p className="text-white font-medium">{project.category}</p>
            </div>

            <div className="flex absolute left-5 right-5 bottom-6 md:left-8 md:right-8 md:bottom-8">
              <div className="max-w-[760px]">
                <p className="text-[11px] md:text-sm uppercase tracking-[0.28em] text-yellow-400 mb-3">
                  Signature Residence
                </p>

                <h1 className="text-4xl md:text-6xl xl:text-4xl font-semibold leading-[1.02] mb-4">
                  {project.title}
                </h1>

                <div className="flex items-center gap-2 text-base md:text-lg text-white-200 mb-4">
                  <FaMapMarkerAlt className="text-yellow-400" />
                  {project.subLocation}, {project.location}
                </div>
              </div>

              <section className="max-w-4xl mx-auto px-4 md:px-10 py-8">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                  {project.heroImages.map((image, index) => {
                    const active = currentIndex === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative w-[120px] h-[70px] md:w-[150px] md:h-[100px] rounded-2xl overflow-hidden border transition shrink-0 ${active
                          ? "border-yellow-400 shadow-[0_0_20px_rgba(241,220,127,0.18)]"
                          : "border-white/10 hover:border-yellow-500/40"
                          }`}
                      >
                        <Image src={image} alt="" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
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
                <p className="text-white-400 leading-relaxed text-base md:text-lg">
                  {project.description}
                </p>

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
                    <p className="leading-relaxed">{project.description}</p>
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
                  className={`group cursor-pointer rounded-[28px] overflow-hidden border transition duration-300 ${active
                    ? "border-yellow-400 shadow-[0_0_30px_rgba(241,220,127,0.1)]"
                    : "border-white/10 hover:border-yellow-400/40"
                    }`}
                >
                  <div className="relative h-[240px]">
                    <Image
                      src={plan.image}
                      alt={plan.label}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  <div className="p-5 bg-black/40 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3 text-white">{plan.label}</h3>

                    <div className="space-y-2 text-sm text-white">
                      <div className="flex justify-between">
                        <span>Size</span>
                        <span>{plan.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Starting Price</span>
                        <span>{plan.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openContactModal("download-floor-plan");
                      }}
                      className="mt-5 w-full rounded-xl border border-white/15 py-3 text-sm hover:border-yellow-400 hover:text-white transition"
                    >
                      Download Plan
                    </button>
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

        {/* calculator section stays same */}
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        onSubmit={handleContactSubmit}
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

function formatAED(value: number) {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("en-AE");
}

function ContactModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  onChange,
  projectTitle,
  intent,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    fullName: string;
    email: string;
    phone: string;
    message: string;
    terms: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  projectTitle: string;
  intent: ContactIntent;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_20px_100px_rgba(0,0,0,0.65)]">
        <div className="relative grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-6 md:p-8 bg-white/[0.02]">
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
              {getModalHeading(intent)}
            </h3>

            <p className="text-white-400 leading-relaxed mb-6">
              Share your details and our team will connect with you regarding{" "}
              <span className="text-white font-medium">{projectTitle}</span>.
            </p>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white-500 mb-2">
                Project
              </p>

              <div className="w-full h-32 relative rounded-xl overflow-hidden">
                <Image src={projectImage} alt="Project" fill className="object-cover" />
              </div>
            </div>
          </div>

          <div className="relative p-6 md:p-8">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center hover:border-yellow-400/40 transition"
            >
              <FaTimes />
            </button>

            <form onSubmit={onSubmit} className="space-y-4 pr-0 md:pr-8">
              <div>
                <label className="text-sm text-white-300 mb-2 block">Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white-300 mb-2 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white-300 mb-2 block">Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                  required
                />
              </div>

              <div className="flex items-start gap-2 mt-2">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={onChange}
                  className="mt-1 accent-yellow-500"
                  required
                />
                <label className="text-sm text-white-300">
                  I accept all{" "}
                  <span className="text-yellow-400 underline cursor-pointer">
                    terms and conditions
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black py-4 font-semibold hover:scale-[1.01] transition"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
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