"use client";

import Image, { StaticImageData } from "next/image";
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
import { FaArrowRight, FaDollarSign } from "react-icons/fa6";
import hero1 from "../../../public/image_7.png";
import hero2 from "../../../public/image_6.png";
import hero3 from "../../../public/image_5.png";

type Project = {
  id: number;
  title: string;
  type: string;
  residence: string;
  category: string;
  location: string;
  subLocation: string;
  price: string;
  bedrooms: string;
  area: string;
  handover: string;
  developer: string;
  description: string;
  heroImages: StaticImageData[];
  floorPlans: {
    label: string;
    size: string;
    price: string;
    image: StaticImageData;
  }[];
  amenities: string[];
  highlights: string[];
};

const allProjects: Project[] = [
  {
    id: 1,
    title: "Aurelia Heights",
    type: "Residential",
    residence: "Villa",
    category: "Luxury",
    location: "Dubai",
    subLocation: "Downtown Dubai",
    price: "From AED 2.3M",
    bedrooms: "2–8 Bedrooms",
    area: "2,800 – 7,200 sq.ft.",
    handover: "Q4 2029",
    developer: "Emaar",
    description:
      "A refined collection of ultra-luxury residences crafted for buyers seeking iconic location, architectural elegance, and long-term value in one of Dubai’s most desirable districts.",
    heroImages: [hero1, hero2, hero3, hero1, hero2],
    floorPlans: [
      {
        label: "1 Bedroom",
        size: "872 sq.ft.",
        price: "From AED 1.9M",
        image: hero2,
      },
      {
        label: "2 Bedroom",
        size: "1,420 sq.ft.",
        price: "From AED 2.8M",
        image: hero3,
      },
      {
        label: "3 Bedroom",
        size: "2,180 sq.ft.",
        price: "From AED 4.7M",
        image: hero1,
      },
    ],
    amenities: [
      "Infinity Pool",
      "Private Lounge",
      "Fitness Studio",
      "Landscaped Gardens",
      "Kids Play Area",
      "Wellness Zone",
      "Concierge Service",
      "Retail & Dining",
    ],
    highlights: [
      "Prime address in a high-demand Dubai district",
      "Strong end-user and investor appeal",
      "Spacious premium layouts with luxury finishes",
      "Curated lifestyle amenities and wellness focus",
    ],
  },
  {
    id: 2,
    title: "Skyline Tower",
    type: "Residential",
    residence: "Apartment",
    category: "Elite",
    location: "Dubai",
    subLocation: "Dubai Marina",
    price: "From AED 1.8M",
    bedrooms: "1–4 Bedrooms",
    area: "1,100 – 3,600 sq.ft.",
    handover: "Q2 2028",
    developer: "Meraas",
    description:
      "An elegant waterfront address designed for buyers seeking elevated city living, strong rental appeal, and premium convenience in one of Dubai’s most recognizable locations.",
    heroImages: [hero2, hero1, hero3, hero2],
    floorPlans: [
      {
        label: "1 Bedroom",
        size: "790 sq.ft.",
        price: "From AED 1.8M",
        image: hero2,
      },
      {
        label: "2 Bedroom",
        size: "1,330 sq.ft.",
        price: "From AED 2.6M",
        image: hero1,
      },
    ],
    amenities: [
      "Rooftop Pool",
      "Gym",
      "Sky Lounge",
      "Cinema Room",
      "Children’s Zone",
      "Valet",
    ],
    highlights: [
      "Waterfront location with long-term demand",
      "Modern layouts and premium design language",
      "Lifestyle-led amenities with investor potential",
      "Well-connected urban address",
    ],
  },
];

const tabs = ["overview", "floorplans", "amenities", "gallery"] as const;
type TabKey = (typeof tabs)[number];

type ContactIntent =
  | "schedule-visit"
  | "download-floor-plan"
  | "request-brochure"
  | "book-consultation"
  | "general";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = Number(params?.id);

  const project = useMemo(
    () => allProjects.find((item) => item.id === projectId),
    [projectId]
  );

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [activeImage, setActiveImage] = useState<StaticImageData>(
    project?.heroImages?.[0] || hero1
  );
  const [selectedPlan, setSelectedPlan] = useState(
    project?.floorPlans?.[0]?.label || "1 Bedroom"
  );

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState<ContactIntent>("general");

  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Mortgage calculator defaults (Dubai-style estimate)
  const [calcTab, setCalcTab] = useState<"mortgage" | "payment-plan">("mortgage");
  const [selectedUnit, setSelectedUnit] = useState(
    project?.floorPlans?.[0]?.label || ""
  );

  const getNumericPrice = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const num = Number(cleaned);

    if (!num) return 0;
    if (/m/i.test(value)) return Math.round(num * 1000000);
    if (/k/i.test(value)) return Math.round(num * 1000);

    return Math.round(num);
  };

  const selectedUnitPlan =
    project?.floorPlans?.find((item) => item.label === selectedUnit) ||
    project?.floorPlans?.[0];

  const [propertyPrice, setPropertyPrice] = useState(
    selectedUnitPlan?.price ? getNumericPrice(selectedUnitPlan.price) : 2300000
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanYears, setLoanYears] = useState(25);

  const [bookingPercent, setBookingPercent] = useState(10);
  const [constructionPercent, setConstructionPercent] = useState(50);
  const [handoverPercent, setHandoverPercent] = useState(40);
  useEffect(() => {
    if (selectedUnitPlan?.price) {
      setPropertyPrice(getNumericPrice(selectedUnitPlan.price));
    }
  }, [selectedUnitPlan]);
  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white px-6 md:px-12 py-14">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          <FaArrowLeft />
          Back to Projects
        </Link>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <h1 className="text-2xl font-semibold mb-2">Project not found</h1>
          <p className="text-gray-400">
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
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

    // TODO:
    // connect API here
    // await fetch("/api/inquiry", { method: "POST", body: JSON.stringify(payload) })

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
        {/* back */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <FaArrowLeft />
            Back to Projects
          </Link>
        </section>

        {/* hero */}
        <section className="relative mt-4 px-4 md:px-10">
          <div className="relative h-[74vh] min-h-[560px] md:min-h-[640px] overflow-hidden rounded-[32px] border border-white/10">
            <Image
              src={activeImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/15 to-transparent" />

            <div className="absolute top-5 right-5 md:top-8 md:right-8 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-1">
                Category
              </p>
              <p className="text-white font-medium">{project.category}</p>
            </div>

            <div className="absolute left-5 right-5 bottom-6 md:left-8 md:right-8 md:bottom-8">
              <div className="max-w-[760px]">
                <p className="text-[11px] md:text-sm uppercase tracking-[0.28em] text-yellow-400 mb-3">
                  Signature Residence
                </p>

                <h1 className="text-4xl md:text-6xl xl:text-4xl font-semibold leading-[1.02] mb-4">
                  {project.title}
                </h1>

                <div className="flex items-center gap-2 text-base md:text-lg text-gray-200 mb-4">
                  <FaMapMarkerAlt className="text-yellow-400" />
                  {project.subLocation}, {project.location}
                </div>

                <p className="max-w-[620px] text-sm md:text-base text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* quick facts + mortgage */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 mt-6 md:mt-8 relative z-20">
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
              <div className="space-y-3 text-sm text-gray-300">
                <MetaRow label="Developer" value={project.developer} />
                <MetaRow label="Property Type" value={project.residence} />
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

        {/* gallery thumbs */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-8">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {project.heroImages.map((image, index) => {
              const active = activeImage === image;
              return (
                <button
                  key={index}
                  onClick={() => setActiveImage(image)}
                  className={`relative w-[170px] h-[110px] md:w-[220px] md:h-[140px] rounded-2xl overflow-hidden border transition shrink-0 ${active
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

        {/* tabs */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 pt-2 pb-8">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm border transition ${active
                    ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black border-transparent"
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:border-yellow-400/40 hover:text-white"
                    }`}
                >
                  {tab === "floorplans"
                    ? "Floor Plans"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
          </div>
        </section>

        {/* overview */}
        {activeTab === "overview" && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 pb-14">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                  Project Overview
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-5">
                  Premium living shaped by design, location, and long-term value
                </h2>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  {project.description}
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {project.highlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-start gap-3"
                    >
                      <FaCheckCircle className="text-yellow-400 mt-1 shrink-0" />
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                  Why It Stands Out
                </p>
                <div className="space-y-5 text-gray-400">
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      Strategic Positioning
                    </h3>
                    <p className="leading-relaxed">
                      A premium address supported by strong demand drivers,
                      refined product positioning, and attractive appeal for end
                      users and investors alike.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      Design-Led Living
                    </h3>
                    <p className="leading-relaxed">
                      Spacious layouts, elevated finishes, and lifestyle-focused
                      planning create a more complete residential experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      Long-Term Potential
                    </h3>
                    <p className="leading-relaxed">
                      Supported by location relevance, premium branding, and a
                      stronger quality perception in the broader luxury market.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* floor plans */}
        {activeTab === "floorplans" && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 pb-14">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                    Floor Plans
                  </p>
                  <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                    Explore available layouts
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.floorPlans.map((plan) => {
                    const active = selectedPlan === plan.label;
                    return (
                      <button
                        key={plan.label}
                        onClick={() => setSelectedPlan(plan.label)}
                        className={`rounded-full px-5 py-2.5 text-sm border transition ${active
                          ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black border-transparent"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:border-yellow-400/40 hover:text-white"
                          }`}
                      >
                        {plan.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start mt-6">
              <div className="relative min-h-[420px] rounded-[28px] overflow-hidden border border-white/10 bg-black/30">
                <Image
                  src={activePlan.image}
                  alt={activePlan.label}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/30 p-6">
                <MetaRow label="Unit Type" value={activePlan.label} />
                <MetaRow label="Approx. Size" value={activePlan.size} />
                <MetaRow
                  label="Starting Price"
                  value={activePlan.price}
                  isLast
                />

                <button
                  onClick={() => openContactModal("download-floor-plan")}
                  className="mt-6 w-full rounded-2xl border border-white/15 py-3.5 hover:border-yellow-400 hover:text-white transition"
                >
                  Download Floor Plan
                </button>
              </div>
            </div>
          </section>
        )}

        {/* amenities */}
        {activeTab === "amenities" && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 pb-14">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                Amenities
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-8">
                Elevated lifestyle experiences
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.amenities.map((item) => (
                  <div
                    key={item}
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

        {/* gallery */}
        {activeTab === "gallery" && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 pb-14">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-yellow-400 mb-3">
                Gallery
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-8">
                Visual highlights of the project
              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {project.heroImages.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative h-[260px] rounded-[24px] overflow-hidden border border-white/10"
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="max-w-7xl mx-auto px-4 md:px-10 mt-6 md:mt-8 relative z-20">
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
                    className={`rounded-full px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase transition ${calcTab === "mortgage"
                      ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black shadow-[0_8px_30px_rgba(241,220,127,0.25)]"
                      : "border border-white/10 bg-white/[0.03] text-white/65 hover:border-yellow-400/30 hover:text-white"
                      }`}
                  >
                    Mortgage Calculator
                  </button>

                  <button
                    onClick={() => setCalcTab("payment-plan")}
                    className={`rounded-full px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase transition ${calcTab === "payment-plan"
                      ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black shadow-[0_8px_30px_rgba(241,220,127,0.25)]"
                      : "border border-white/10 bg-white/[0.03] text-white/65 hover:border-yellow-400/30 hover:text-white"
                      }`}
                  >
                    Payment Plans
                  </button>
                </div>

                <div className="grid xl:grid-cols-[0.85fr_1.15fr] gap-8 xl:gap-10">
                  {/* left side */}
                  <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 md:p-7">
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
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
                          onChange={(value) => setPropertyPrice(Number(value) || 0)}
                        />
                        <PremiumCalcInput
                          label="Down Payment %"
                          value={downPaymentPercent}
                          onChange={(value) => setDownPaymentPercent(Number(value) || 0)}
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
                          onChange={(value) => setInterestRate(Number(value) || 0)}
                        />
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <PremiumCalcInput
                          label="Property Value"
                          value={propertyPrice}
                          onChange={(value) => setPropertyPrice(Number(value) || 0)}
                        />
                        <PremiumCalcInput
                          label="Booking %"
                          value={bookingPercent}
                          onChange={(value) => setBookingPercent(Number(value) || 0)}
                        />
                        <PremiumCalcInput
                          label="During Construction %"
                          value={constructionPercent}
                          onChange={(value) => setConstructionPercent(Number(value) || 0)}
                        />
                        <PremiumCalcInput
                          label="On Handover %"
                          value={handoverPercent}
                          onChange={(value) => setHandoverPercent(Number(value) || 0)}
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
                        <h3 className="text-2xl md:text-3xl font-semibold text-white">
                          {calcTab === "mortgage" ? "Mortgage Overview" : "Payment Plan Overview"}
                        </h3>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-sm uppercase tracking-[0.15em] text-gray-400 mb-1">
                          Property Value
                        </p>
                        <p className="text-3xl md:text-5xl font-semibold leading-none text-transparent bg-clip-text bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)]">
                          AED {formatAED(propertyPrice)}
                        </p>
                      </div>
                    </div>

                    {calcTab === "mortgage" ? (
                      <>
                        <div className="grid md:grid-cols-3 gap-4 mb-8">
                          <PremiumResultCard
                            title="Total Cost"
                            value={formatAED(totalCost)}
                            suffix="AED"
                          />
                          <PremiumResultCard
                            title="Mortgage Payment"
                            value={formatAED(monthlyPayment)}
                            suffix="AED /Month"
                            highlighted
                          />
                          <PremiumResultCard
                            title="Annual Cost"
                            value={formatAED(annualCost)}
                            suffix="AED /Year"
                          />
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-black/25 p-5 md:p-6 space-y-5">
                          <PremiumBreakdownRow
                            label="Down Payment"
                            value={`AED ${formatAED(downPaymentAmount)}`}
                          />
                          <PremiumBreakdownRow
                            label="Amount Financed"
                            value={`AED ${formatAED(amountFinanced)}`}
                          />
                          <PremiumBreakdownRow
                            label="Total Interest Paid"
                            value={`AED ${formatAED(totalInterestPaid)}`}
                          />
                          <div className="border-t border-white/10 pt-5">
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
                          <PremiumBreakdownRow
                            label="During Construction"
                            value={`AED ${formatAED(constructionAmount)}`}
                          />
                          <PremiumBreakdownRow
                            label="On Handover"
                            value={`AED ${formatAED(handoverAmount)}`}
                          />
                          <div className="border-t border-white/10 pt-5">
                            <PremiumBreakdownRow
                              label="Total Cost"
                              value={`AED ${formatAED(propertyPrice)}`}
                              bold
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="mt-8 flex flex-wrap gap-4">
                      <button
                        onClick={() => openContactModal("book-consultation")}
                        className="rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black px-7 py-3.5 font-semibold hover:scale-[1.02] transition"
                      >
                        Speak To Advisor
                      </button>

                      <button
                        onClick={() => openContactModal("request-brochure")}
                        className="rounded-full border border-white/15 bg-white/[0.03] text-white px-7 py-3.5 font-medium hover:border-yellow-400/40 hover:text-yellow-400 transition"
                      >
                        Request Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
        {/* cta */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-20">
          <div className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-8 md:p-12">
            <div className="absolute top-0 left-[10%] h-[220px] w-[220px] rounded-full bg-yellow-500/10 blur-3xl" />
            <div className="absolute bottom-[-60px] right-[5%] h-[220px] w-[220px] rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                  Interested In This Project?
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
                  Let’s help you evaluate the right opportunity with more clarity
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Speak with our team for brochure access, floor plans, pricing,
                  availability, and personalized project guidance.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => openContactModal("request-brochure")}
                  className="bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black px-6 py-3 rounded-full font-medium hover:scale-[1.03] transition inline-flex items-center gap-2"
                >
                  Request Brochure
                  <FaArrowRight className="text-sm" />
                </button>

                <button
                  onClick={() => openContactModal("book-consultation")}
                  className="border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:border-yellow-400 hover:text-yellow-400 transition"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
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
        <p className="text-sm text-gray-400">{label}</p>
      </div>
      <p className="text-white font-semibold">{value}</p>
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
      <span className="text-white font-semibold text-right">{value}</span>
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
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
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
      className={`rounded-[24px] border p-5 min-h-[150px] flex flex-col justify-between ${highlighted
        ? "border-yellow-400/25 bg-[linear-gradient(180deg,rgba(250,204,21,0.08),rgba(255,255,255,0.02))] shadow-[0_10px_30px_rgba(250,204,21,0.08)]"
        : "border-white/10 bg-white/[0.03]"
        }`}
    >
      <p className="text-sm text-gray-400">{title}</p>
      <div>
        <p className="text-2xl md:text-3xl font-semibold text-white leading-tight">
          {value}
        </p>
        <p className="mt-2 text-base font-medium text-gray-300">{suffix}</p>
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
      <p className={bold ? "text-lg md:text-xl font-semibold text-white" : "text-base md:text-lg text-gray-300"}>
        {label}
      </p>
      <p className={bold ? "text-lg md:text-xl font-semibold text-yellow-400" : "text-base md:text-lg font-medium text-white"}>
        {value}
      </p>
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
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  projectTitle: string;
  intent: ContactIntent;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_20px_100px_rgba(0,0,0,0.65)]">
        <div className="absolute -top-20 -left-10 h-60 w-60 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="relative grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-6 md:p-8 bg-white/[0.02]">
            <div className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-yellow-400 mb-5">
              Premium Assistance
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
              {getModalHeading(intent)}
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              Share your details and our team will connect with you regarding{" "}
              <span className="text-white font-medium">{projectTitle}</span>.
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500 mb-1">
                  Project
                </p>
                <p className="text-white font-medium">{projectTitle}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500 mb-1">
                  Request Type
                </p>
                <p className="text-white font-medium">{getIntentLabel(intent)}</p>
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
                <label className="text-sm text-gray-300 mb-2 block">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Email Address
                  </label>
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
                  <label className="text-sm text-gray-300 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell us what you are looking for"
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50 resize-none"
                />
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

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("en-AE");
}

function getIntentLabel(intent: ContactIntent) {
  switch (intent) {
    case "schedule-visit":
      return "Schedule Private Visit";
    case "download-floor-plan":
      return "Download Floor Plan";
    case "request-brochure":
      return "Request Brochure";
    case "book-consultation":
      return "Book Consultation";
    default:
      return "General Inquiry";
  }
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
  floorPlanLabel?: string
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