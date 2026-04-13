import Image from "next/image";
import banner from "../../public/services.png";
import { FaArrowRight, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import ContactMap from "../components/contact/ContactMap";
import ContactSection from "../components/contact/ContactSection";
import ContactTrustStrip from "../components/contact/ContactTrustStrip";
import ContactHero from "../components/contact/ContactHero";
import AutoBreadcrumbs from "../components/BreadCrumbs";

const contactPoints = [
  "Personalized property consultation",
  "Luxury residences and investment opportunities",
  "Transparent guidance from inquiry to next steps",
];
const contactInfo = {
  phones: ["+971 54 755 8866", "+971 50 123 4567"],
  emails: ["info@winsteadglobal.com", "sales@winsteadglobal.com"],
  locations: [
    `2601, Iris Bay, Business Bay, Dubai\nDubai, UAE`,
    `Office 1204, Marina Plaza, Dubai Marina\nDubai, UAE`,
  ],
}
export default function ContactUs() {
  return (
    <div className="bg-black text-white">
      <ContactHero />
      <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-6">
                                  <AutoBreadcrumbs />
                                </section>
      <ContactSection contactPoints={contactPoints} contactInfo={contactInfo}/>

      <ContactTrustStrip />
    </div>
  );
}

/* ================= HERO ================= */



