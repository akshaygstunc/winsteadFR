"use client";
import ServicesHero from "../components/services/ServiceHero";
import ServicesOverview from "../components/services/ServiceOverview";
import Testimonials from "../components/Testimonials";
import HowItWork from "../components/services/HowItWork";
import WhyChooseWinstead from "../components/services/WhyChooseWinstead";
import ServicesCTA from "../components/services/ServicesCTA";

import DetailedServices from "../components/services/DetailService";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import { use, useEffect, useState } from "react";
import WebsiteContentService from "../services/websitecontent.service";

const services = [
  {
    title: "Off-Plan Investments",
    desc: "Access upcoming developments in prime locations, selected for long-term value and strategic growth.",
    longDesc:
      "Explore off-plan opportunities from leading developers, offering early access to new projects before completion. These properties are positioned in high-demand areas and structured to support both capital appreciation and flexible ownership timelines.",
    points: [
      "Early access to new developments",
      "Flexible payment structures",
      "Positioned for long-term value",
    ],
  },
  {
    title: "Ready Residences",
    desc: "Move-in ready homes across established communities and prime urban locations.",
    longDesc:
      "Discover completed residences designed for buyers who value immediate usability, premium locations, and a smoother purchase journey. These homes are suited for end-users as well as investors seeking quicker occupancy or rental readiness.",
    points: [
      "Ready-to-move residences",
      "Established locations",
      "Immediate usability",
    ],
  },
  {
    title: "Long-Term Leasing",
    desc: "Secure premium rental properties with stable returns and long-term occupancy benefits.",
    longDesc:
      "We help clients identify leasing opportunities that combine location quality, tenant stability, and consistent rental potential. Our focus is on long-term value rather than short-term transaction volume.",
    points: [
      "Verified long-term tenants",
      "Consistent rental income",
      "Prime leasing locations",
    ],
  },
];

const processSteps = [
  {
    title: "Understand Your Requirement",
    desc: "We begin by understanding your purpose, budget, timeline, and preferred property profile.",
  },
  {
    title: "Curate Relevant Options",
    desc: "Instead of showing everything, we shortlist opportunities aligned with your exact goals.",
  },
  {
    title: "Evaluate with Clarity",
    desc: "We guide you through comparisons, site visits, and practical evaluation for smarter decisions.",
  },
  {
    title: "Move Toward Closure",
    desc: "From discussions to next steps, we help make the journey more structured and transparent.",
  },
];

const trustPoints = [
  "Curated opportunities instead of random listings",
  "Guidance backed by market understanding",
  "Transparent and client-first communication",
  "Focus on long-term value, not rushed selling",
];

export default function OurServices() {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await WebsiteContentService.servicePage();
        console.log("Service Page Content:", data);
        setServicesData(data);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching service page content:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="bg-black text-white">
      <ServicesHero servicesData={servicesData} loading={loading} />
       <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-6">
                <AutoBreadcrumbs />
              </section>
      <ServicesOverview servicesData={servicesData} loading={loading} />
      <DetailedServices servicesData={servicesData} loading={loading} />
      <HowItWork servicesData={servicesData} loading={loading} />
      <WhyChooseWinstead servicesData={servicesData} loading={loading} />
      {/* <ServicesCTA /> */}
      <Testimonials />
    </div>
  );
}