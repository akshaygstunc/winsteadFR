"use client";
import ContactSection from "../components/contact/ContactSection";
import ContactTrustStrip from "../components/contact/ContactTrustStrip";
import ContactHero from "../components/contact/ContactHero";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import { useEffect, useState } from "react";
import WebsiteContentService from "../services/websitecontent.service";

export default function ContactUs() {
  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContactInfo() {
      try {
        const res = await WebsiteContentService.getContact();
        console.log("API response:", res);
        setContactData(res);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
      }
    }

    loadContactInfo();
  }, []);

  return (
    <div className="bg-black text-white">
      <ContactHero contactData={contactData} loading={loading} />

      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-6">
        <AutoBreadcrumbs />
      </section>

      <ContactSection contactInfo={contactData} loading={loading} />

      <ContactTrustStrip />
    </div>
  );
}