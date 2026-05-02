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
import Schema from "../../components/Schema";
import { resolveSchemas } from "../../components/lib/schema/resolver";
import projectImage from "../../../public/hero1.jpg";
import AutoBreadcrumbs from "@/app/components/BreadCrumbs";
import WebsiteContentService from "@/app/services/websitecontent.service";
import ContactModal from "@/app/components/ContactModal";
import LuxuryFAQ from "@/app/components/FAQ";
import ProjectHeroSlider from "@/app/components/ProjectSlider";
import FloorPlan from "../../../public/floorplan.webp";
import PDFViewer from "@/app/components/PdfViewerSlider";
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
      category?: string;
      bedrooms?: string;
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
  developer?:
    | string
    | {
        _id?: string;
        name?: string;
        title?: string;
        image?: string;
        description?: string;
      };
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
  handover?: string | number;
  duringconstruction?: string | number;
  communities?: { slug?: string; title?: string }[];
  propertydoc?: string;
};

type UiFloorPlan = {
  label: string;
  size: string;
  price: string;
  image: string;
  bedrooms: string;
  category: string;
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
  status: string;
  handover: string;
  duringconstruction: string;
  developer: string;
  residence: string;
  description: string;
  heroImages: string[];
  floorPlans: UiFloorPlan[];
  amenities: string[];
  highlights: string[];
  thumbnail?: string;
  propertydoc?: string;
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
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    Number(value) === 0
  ) {
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
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    Number(value) === 0
  ) {
    return EMPTY_VALUE;
  }
  return `${value} Bedroom${Number(value) > 1 ? "s" : ""}`;
}

function getProjectImages(data?: BackendProject) {
  const images = [
    data?.propertyBanner,
    data?.thumbnail,
    ...(Array.isArray(data?.gallery) ? data.gallery : []),
  ].filter((item): item is string => Boolean(item && item.trim()));

  return images.length ? Array.from(new Set(images)) : fallbackImages;
}
function getRange(values: (string | number)[], suffix = "") {
  const nums = values
    .map((v) => Number(String(v).replace(/[^\d.]/g, "")))
    .filter((v) => !isNaN(v));

  if (!nums.length) return EMPTY_VALUE;

  const min = Math.min(...nums);
  const max = Math.max(...nums);

  return min === max ? `${min}${suffix}` : `${min} - ${max}${suffix}`;
}
function getAmenities(data?: BackendProject) {
  if (!Array.isArray(data?.amenities) || !data.amenities.length) {
    return [{ title: EMPTY_VALUE, icon: null }];
  }

  return data.amenities.map((item) => {
    // string fallback (old data)
    if (typeof item === "string") {
      return { title: item || EMPTY_VALUE, icon: null };
    }

    // object format (current API)
    if (typeof item === "object" && item !== null) {
      return {
        title: item?.title || EMPTY_VALUE,
        icon: item?.icon || null,
      };
    }

    return { title: EMPTY_VALUE, icon: null };
  });
}

function getFloorPlans(data?: BackendProject): UiFloorPlan[] {
  if (!Array.isArray(data?.floorPlans) || !data.floorPlans.length) {
    return [
      {
        label: EMPTY_VALUE,
        size: EMPTY_VALUE,
        price: EMPTY_VALUE,
        bedrooms: EMPTY_VALUE,
        category: EMPTY_VALUE,
        image: data?.thumbnail || fallbackImages[0],
      },
    ];
  }

  return data.floorPlans.map((plan, index) => {
    if (typeof plan === "string") {
      return {
        label: plan || `Plan ${index + 1}`,
        size: EMPTY_VALUE,
        price: EMPTY_VALUE,
        bedrooms: EMPTY_VALUE,
        category: EMPTY_VALUE,
        image: data?.thumbnail || fallbackImages[0],
      };
    }

    return {
  label: plan.label || plan.title || plan.name || `Plan ${index + 1}`,

  size: getDisplayValue(plan.size),

  price:
    plan.price !== undefined &&
    plan.price !== null &&
    String(plan.price).trim() !== ""
      ? formatPrice(plan.price)
      : EMPTY_VALUE,

  image: plan.image || plan.url || data?.thumbnail || fallbackImages[0],

  // ✅ ADD THESE
  bedrooms:
    plan.bedrooms && Number(plan.bedrooms) > 0
      ? `${plan.bedrooms} Bedroom${Number(plan.bedrooms) > 1 ? "s" : ""}`
      : plan.unitType || EMPTY_VALUE,

  category: getDisplayValue(plan.category),
};
  });
}

function getHighlights(data?: BackendProject) {
  const list = [
    data?.category
      ? `${data.category} property in ${getDisplayValue(data.city)}`
      : "",
    data?.locations ? `Located in ${data.locations.title}` : "",
    data?.propertyStatus ? `Status: ${data.propertyStatus}` : "",
    data?.tag ? `Property tag: ${data.tag}` : "",
  ].filter(Boolean);

  return list.length ? list : [EMPTY_VALUE];
}

function getNumericPrice(value: string | number | undefined) {
  if (value === null || value === undefined) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? Math.round(num) : 0;
}

function parsePercent(value: unknown, fallback = 0): number {
  if (value === null || value === undefined) return fallback;

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const num = Number(cleaned);
    if (Number.isFinite(num)) return num;
  }

  return fallback;
}

function formatAED(value: number) {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("en-AE");
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = String(params?.id || "");

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<BackendProject | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState<ContactIntent>("general");
  const [projectschema, setProjectschema] = useState({});
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
        setProjectschema(
          resolveSchemas({
            type: "project",
            data: response,
          }),
        );
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
    const bedroomValues = projectDetails.floorPlans?.map(
      (p: any) => p?.data?.bedrooms, // extract number from "2 Bedroom"
    );
    const sizeValues = projectDetails.floorPlans?.map((p: any) => p?.data?.size);
    console.log(sizeValues, "sizeValues")
    return {
      id: projectDetails._id || "",
      title: getDisplayValue(projectDetails.title),
      category: getDisplayValue(projectDetails.category),
      location: getDisplayValue(projectDetails.city),
      subLocation: getDisplayValue(projectDetails.location),
      price: formatPrice(projectDetails.price),
      bedrooms: getRange(bedroomValues, " Bedrooms"),
      area: getRange(sizeValues, " sq.ft"),
      status: getDisplayValue(projectDetails.propertyStatus),
      handover: getDisplayValue(projectDetails.handover),
      duringconstruction: getDisplayValue(projectDetails.duringconstruction),
      developer: getRelationLabel(projectDetails.developer as any),
      propertyType: getRelationLabel(projectDetails?.type),
      // residence: getRelationLabel(projectDetails.type),
      residence: Array.isArray(projectDetails.type)
  ? projectDetails.type.map((t: any) => t?.title || t?.name || "").filter(Boolean).join(", ") || EMPTY_VALUE
  : getRelationLabel(projectDetails.type),
      description:
        projectDetails.fullDescription?.trim() ||
        projectDetails.shortDescription?.trim() ||
        projectDetails.metaDescription?.trim() ||
        EMPTY_VALUE,
      heroImages,
      floorPlans,
      amenities: getAmenities(projectDetails),
      highlights: getHighlights(projectDetails),
      thumbnail: projectDetails.thumbnail,
      propertydoc: projectDetails.propertydoc,
    };
  }, [projectDetails]);

  useEffect(() => {
    if (!project?.floorPlans?.length) return;
    setSelectedPlan(project.floorPlans[0].label);
  }, [project]);

  const selectedUnitPlan =
    project?.floorPlans.find((item) => item.label === selectedPlan) ||
    project?.floorPlans?.[0];

  const [calcTab, setCalcTab] = useState<"mortgage" | "payment-plan">(
    "mortgage",
  );
  const [selectedUnit, setSelectedUnit] = useState("");
  const [propertyPrice, setPropertyPrice] = useState(0);

  const [interestRate, setInterestRate] = useState(3.5);
  const [loanYears, setLoanYears] = useState(25);

  const [bookingPercent, setBookingPercent] = useState(0);
  const [constructionPercent, setConstructionPercent] = useState(0);
  const [handoverPercent, setHandoverPercent] = useState(0);

  useEffect(() => {
    if (!project?.floorPlans?.length) return;
    setSelectedUnit(project.floorPlans[0].label);
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const selectedPlanPrice =
      selectedUnitPlan?.price && selectedUnitPlan.price !== EMPTY_VALUE
        ? getNumericPrice(selectedUnitPlan.price)
        : 0;

    const projectBasePrice =
      projectDetails?.price !== undefined && projectDetails?.price !== null
        ? getNumericPrice(projectDetails.price)
        : project?.price && project.price !== EMPTY_VALUE
          ? getNumericPrice(project.price)
          : 0;

    const finalPrice = selectedPlanPrice || projectBasePrice;
    setPropertyPrice(finalPrice);

    const backendConstruction = parsePercent(
      projectDetails?.duringconstruction,
      0,
    );
    const backendHandover = parsePercent(projectDetails?.handover, 0);

    let backendBooking = 100 - (backendConstruction + backendHandover);
    if (backendBooking < 0) backendBooking = 0;

    setConstructionPercent(backendConstruction);
    setHandoverPercent(backendHandover);
    setBookingPercent(backendBooking);
  }, [project, projectDetails, selectedUnitPlan]);

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
    return <ProjectDetailsSkeleton />;
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
    setIsContactModalOpen(true);
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
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...contactForm,
      intent: contactIntent,
      projectId: project.id,
      projectTitle: project.title,
      propertyType: project.residence,
      floorPlan: activePlan?.label || "",
    };

    console.log("Contact Form Submit:", payload);
    closeContactModal();
  };

  // PAYMENT PLAN
  const bookingAmount = (propertyPrice * bookingPercent) / 100;
  const constructionAmount = (propertyPrice * constructionPercent) / 100;
  const handoverAmount = (propertyPrice * handoverPercent) / 100;

  // MORTGAGE
  // duringconstruction = upfront/downpayment
  // handover = mortgage base amount
  const downPaymentPercent = constructionPercent;
  const downPaymentAmount = constructionAmount;
  const loanBaseAmount = handoverAmount;
  const amountFinanced = loanBaseAmount;

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

  const totalCost = bookingAmount + downPaymentAmount + totalMortgagePaid;
  console.log(projectDetails);
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
  return (
    <>
      {projectDetails && (
        <Schema
          schemas={resolveSchemas({
            type: "project", // or detectType(path)
            data: projectDetails,
          })}
        />
      )}
      <main className="bg-black text-white min-h-screen overflow-x-hidden">
        <section className="relative">
          <ProjectHeroSlider
            project={projectDetails}
            fallbackImages={fallbackImages}
          />
        </section>

        <div className="flex justify-between w-full items-center">
          <section className="max-w-2xl px-4 md:px-10 pt-6">
            <AutoBreadcrumbs />
          </section>
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
                    value={projectDetails?.locations?.title}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/65 backdrop-blur-xl p-5 md:p-6 shadow-[0_0_40px_rgba(250,204,21,0.06)]">
              <div className="space-y-3 text-sm text-white-300">
                <MetaRow label="Developer" value={project.developer} />
                <MetaRow label="Property Type" value={project.residence} />
                <MetaRow label="Handover" value={project.status} />
                <MetaRow label="Category" value={project.category} />
                <MetaRow
                  label="Payment Plan"
                  value={`${constructionPercent}/${handoverPercent}`}
                  isLast
                />
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
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm border transition ${
                    active
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

                <ReadMoreSlider

                  description={
                    project.description
                  }
                  heading="Project Description"
                />

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {project.highlights.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-start gap-3"
                    >
                      <FaCheckCircle className="text-yellow-400 mt-1 shrink-0" />
                      <p className="text-white-300 text-sm leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                  About Developer
                </p>
                <div className="space-y-5 text-white-400">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-white">
                      Developer
                    </h3>

                    <div className="flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                      {typeof projectDetails?.developer !== "string" &&
                        projectDetails?.developer?.image && (
                          <img
                            src={projectDetails.developer.image}
                            alt={projectDetails.developer.title || "Developer"}
                            className="h-14 w-14 rounded-xl object-contain bg-white p-2"
                          />
                        )}

                      <div>
                        <h4 className="text-base font-semibold text-white">
                          {typeof projectDetails?.developer !== "string"
                            ? projectDetails?.developer?.title || EMPTY_VALUE
                            : projectDetails?.developer || EMPTY_VALUE}
                        </h4>
                        <p className="mt-1 leading-relaxed text-white-400">
                          {typeof projectDetails?.developer !== "string"
                            ? projectDetails?.developer?.description || ""
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-white">
                      Communities
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {projectDetails?.communities?.map((community, index) => (
                        <a
                          href={`/projects/${projectDetails?.slug}/${community?.slug}`}
                          key={index}
                          className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#D4AF37] backdrop-blur-sm"
                        >
                          {community?.title}
                        </a>
                      ))}
                    </div>
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
                    key={`${item.title}-${index}`}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5 hover:border-yellow-400/30 transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4">
                      {item.icon ? (
                        <img
                          src={item?.icon}
                          alt={item.title}
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <FaCheckCircle className="text-yellow-400" />
                      )}
                    </div>

                    <p className="text-white font-medium">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "FAQ" && <LuxuryFAQ faq={projectDetails?.faq || []} />}

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
            {projectDetails.floorPlans.map((plan) => {
              const active = selectedPlan === plan.label;

              return (
                <div
                  key={plan.label}
                  onClick={() => {
                    setSelectedPlan(plan.label);
                    setSelectedUnit(plan.label);
                  }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${active
                    ? "border-yellow-400/50 bg-white/[0.05] shadow-[0_10px_40px_rgba(241,220,127,0.12)]"
                    : "border-white/10 bg-white/[0.03] hover:border-yellow-400/30"
                    }`}
                >
                  {/* IMAGE */}
                  <div className="relative h-[100px] flex  overflow-hidden">
                    <Image
                      src={FloorPlan}
                      alt={plan.label}
                      fill
                      className="object-contain bg-white transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-lg font-semibold text-white leading-tight">
                        {plan.label}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    {/* INLINE INFO (replaces 2 big boxes) */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/70">
                      <span>{plan?.data?.size}</span>
                      <span>• {plan?.data?.bedrooms} Beds</span>
                      <span>• {plan.category}</span>
                    </div>

                    {/* PRICE + CTA */}
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-white font-semibold text-base">
                        AED {plan.price}
                      </p>

                      <a
                        href={selectedUnitPlan?.image || "#"}
                        download
                        target="_blank"
                        onClick={(e) => {
                          if (!selectedUnitPlan?.image) {
                            e.preventDefault();
                            return;
                          }
                          e.stopPropagation();
                        }}
                        className={`text-xs px-4 py-2 rounded-full transition ${selectedUnitPlan?.image
                            ? active
                            ? "bg-yellow-400 text-black"
                            : "border border-white/20 text-white hover:border-yellow-400/50 hover:text-yellow-400"
                            : "opacity-50 cursor-not-allowed border border-white/10 text-gray-500"
                          }`}
                      >
                        {selectedUnitPlan?.image ? "Download" : "N/A"}
                      </a>
                    </div>

                    {/* SUBTEXT */}
                    <p className="text-xs text-white/50 mt-2 uppercase text-yellow">
                      {plan?.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {projectDetails?.latitude && projectDetails?.longitude && (
          <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">

              <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                Location Map
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-6">
                Explore project location
              </h2>

              <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${projectDetails.latitude},${projectDetails.longitude}&z=15&output=embed`}
                />
              </div>

              {/* OPTIONAL ADDRESS */}
              {projectDetails.address && (
                <p className="text-sm text-white-400 mt-4">
                  📍 {projectDetails.address}
                </p>
              )}
            </div>
          </section>
        )}
        <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
              Gallery
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-8">
              Visual highlights of the project
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {project.heroImages.map((media, idx) => (
                <div
                  key={idx}
                  onClick={() => setPreviewImage(media)}
                  className="relative h-[260px] rounded-[24px] overflow-hidden border border-white/10 cursor-pointer group"
                >
                  {isVideo(media) ? (
                    <video
                      src={media}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <Image
                      src={media}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />

                  {/* Optional: Video Indicator */}
                  {isVideo(media) && (
                    <div className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded">
                      VIDEO
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {previewImage && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div
              className="absolute inset-0"
              onClick={() => setPreviewImage(null)}
            />
            <div className="relative max-w-4xl w-full px-4">
              <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
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
                <div className="flex flex-wrap gap-3 mb-8">
                  <button
                    onClick={() => setCalcTab("mortgage")}
                    className={`rounded-full px-6 py-3 text-xs md:text-sm lg:text-md font-semibold tracking-[0.18em] uppercase transition ${
                      calcTab === "mortgage"
                        ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black shadow-[0_8px_30px_rgba(241,220,127,0.25)]"
                        : "border border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/30 hover:text-white"
                    }`}
                  >
                    Mortgage Calculator
                  </button>

                  {/* <button
                    onClick={() => setCalcTab("payment-plan")}
                    className={`rounded-full px-6 py-3 text-xs md:text-sm lg:text-md font-semibold tracking-[0.18em] uppercase transition ${
                      calcTab === "payment-plan"
                        ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black shadow-[0_8px_30px_rgba(241,220,127,0.25)]"
                        : "border border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/30 hover:text-white"
                    }`}
                  >
                    Payment Plans
                  </button> */}
                </div>

                <div className="grid xl:grid-cols-[0.85fr_1.15fr] gap-8 xl:gap-10">
                  <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 md:p-7">
                    <div className="mb-8">
                      <label className="block text-sm lg:text-md font-medium text-white-300 mb-3">
                        Select Unit
                      </label>

                      <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
                        <select
                          value={selectedUnit}
                          onChange={(e) => {
                            setSelectedUnit(e.target.value);
                            setSelectedPlan(e.target.value);
                          }}
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

                        {/* PROPERTY PRICE */}
                        <PremiumCalcInput
                          label="Property Price (AED)"
                          helper="Total price of the property"
                          value={propertyPrice}
                          onChange={(value) =>
                            setPropertyPrice(Number(value) || 0)
                          }
                        />

                        {/* DOWN PAYMENT */}
                        <PremiumCalcInput
                          label="Down Payment (%)"
                          helper="Amount you pay upfront"
                          value={constructionPercent}
                          onChange={(value) =>
                            setConstructionPercent(Number(value) || 0)
                          }
                        />

                        {/* LOAN DURATION */}
                        <PremiumCalcInput
                          label="Loan Duration (Years)"
                          helper="Number of years to repay the loan"
                          value={loanYears}
                          onChange={(value) =>
                            setLoanYears(Number(value) || 0)
                          }
                        />

                        {/* INTEREST RATE */}
                        <PremiumCalcInput
                          label="Interest Rate (%)"
                          helper="Average bank rate is around 3% – 5%"
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
                        <div className="grid md:grid-cols-3 gap-4 mb-6">

                          <PremiumResultCard
                            title="Total You Pay"
                            value={formatAED(totalCost)}
                            suffix="AED"
                          />

                          <PremiumResultCard
                            title="Monthly Payment"
                            value={formatAED(monthlyPayment)}
                            suffix="AED /Month"
                            highlighted
                          />

                          <PremiumResultCard
                            title="Yearly Payment"
                            value={formatAED(annualCost)}
                            suffix="AED /Year"
                          />
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-black/25 md:p-2 space-y-4">

                          <PremiumBreakdownRow
                            label="Your Down Payment"
                            value={`AED ${formatAED(downPaymentAmount)}`}
                          />
                          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

                          <PremiumBreakdownRow
                            label="Loan from Bank"
                            value={`AED ${formatAED(loanBaseAmount)}`}
                          />
                          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

                          <PremiumBreakdownRow
                            label="Total Loan Amount"
                            value={`AED ${formatAED(amountFinanced)}`}
                          />
                          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

                          <PremiumBreakdownRow
                            label="Interest You Will Pay"
                            value={`AED ${formatAED(totalInterestPaid)}`}
                          />
                          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

                          <div className="pt-3">
                            <PremiumBreakdownRow
                              label="Total Amount You Pay"
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
                          <div>
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
         property={{                                          // ← add this
    propertyId: project.id || null,
    propertyTitle: project.title || "",
    projectName: project.title || "",
    location: project.subLocation || project.location || "",
    unitLabel: activePlan?.label || "",
    configuration: activePlan?.bedrooms || "",
    area: activePlan?.size || "",
    price: getNumericPrice(activePlan?.price ?? project.price) || 0,
    currency: "AED",
    propertyUrl: typeof window !== "undefined" ? window.location.href : "",
  }}
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
      className={`flex items-center justify-between ${
        !isLast ? "border-b border-white/10 pb-3" : ""
      }`}
    >
      <span>{label}</span>
      <span className="text-white font-semibold text-right">
        {value || EMPTY_VALUE}
      </span>
    </div>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-white/10 ${className}`} />
  );
}

function ProjectDetailsSkeleton() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
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
          </div>
        </div>
      </section>

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

      <div className="flex justify-between w-full items-center px-4 md:px-10 pt-6 gap-4">
        <SkeletonBlock className="h-5 w-48" />
        <SkeletonBlock className="h-5 w-32" />
      </div>

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

      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-2 pb-8">
        <div className="flex gap-3">
          <SkeletonBlock className="h-11 w-28 rounded-full" />
          <SkeletonBlock className="h-11 w-28 rounded-full" />
        </div>
      </section>

      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pb-14">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <SkeletonBlock className="h-4 w-36 mb-3" />
            <SkeletonBlock className="h-10 w-70 mb-5" />
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

function getDefaultMessage(
  intent: ContactIntent,
  projectTitle: string,
  floorPlanLabel?: string,
) {
  switch (intent) {
    case "schedule-visit":
      return `I am interested in scheduling a private visit for ${projectTitle}. Please contact me with available timings.`;
    case "download-floor-plan":
      return `I would like to receive the floor plan for ${projectTitle}${floorPlanLabel ? ` (${floorPlanLabel})` : ""}.`;
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
  helper,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  step?: string;
    helper?: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#F1DC7F35] bg-white/[0.03] p-4 transition-all duration-300 focus-within:border-[#F1DC7F] focus-within:shadow-[0_0_0_1px_rgba(241,220,127,0.45),0_0_20px_rgba(241,220,127,0.12)]">

      {/* LABEL */}
      <label className="block text-sm text-[#F1DC7F] mb-1 font-medium">
        {label}
      </label>

      {/* HELPER TEXT */}
      {helper && (
        <p className="text-xs text-white/50 mb-2 leading-relaxed">
          {helper}
        </p>
      )}

      {/* INPUT */}
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-lg px-2 py-1 font-semibold text-white outline-none border-none placeholder:text-white/30"
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
      className={`rounded-[24px] p-5 min-h-[80px] flex flex-col justify-between ${
        highlighted ? "border border-yellow-400/25 bg-yellow-400/5" : ""
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
