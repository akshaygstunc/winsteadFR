"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logodetaile.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";
import ContactModal from "./ContactModal";
import { FaPinterest } from "react-icons/fa6";
import LuxuryChatbot from "./ChatBot";
import { Tinos } from "next/font/google";
import WebsiteContentService from "../../app/services/websitecontent.service"; // adjust path
const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
type ContactSectionProps = {
  contactPoints?: string[];
  contactInfo?: any;
  loading?: boolean;
};
type ContactIntent =
  | "schedule-visit"
  | "download-floor-plan"
  | "request-brochure"
  | "book-consultation"
  | "general";
export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState<ContactIntent>("general");
  const [footerLinks, setFooterLinks] = useState<any[]>([]);
  const [exploreLinks, setExploreLinks] = useState<any[]>([]);
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await WebsiteContentService.getContact();
        console.log("CONTACT API DATA", data);
        setContactInfo(data);
      } catch (error) {
        console.error("Contact fetch error", error);
      }
    };

    fetchContact();
  }, []);
  const pageData = contactInfo || {};
  console.log("wwwwwwwwww", pageData);
  const phones = (pageData?.data?.phoneNumbers || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const emails = (pageData?.data?.emailAddresses || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const locations = (pageData?.data?.locationAddresses || "")
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getDefaultMessage = (intent: ContactIntent) => {
    switch (intent) {
      case "schedule-visit":
        return `I am interested in scheduling a private visit . Please contact me with available timings.`;
      case "download-floor-plan":
        return `I would like to receive the floor plan for`;
      case "request-brochure":
        return `Please share the latest brochure, pricing, and availability `;
      case "book-consultation":
        return `I would like to book a consultation regarding, financing options, and availability.`;
      default:
        return `I am interested. Please contact me with more details.`;
    }
  };
  const openContactModal = (intent: ContactIntent) => {
    setContactIntent(intent);
    setContactForm((prev) => ({
      ...prev,
      message: getDefaultMessage(intent, "", ""),
    }));
    setIsContactModalOpen(true);
  };
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...contactForm,
      intent: contactIntent,
      // projectId: project.id,
      // projectTitle: project.title,
      // floorPlan: activePlan?.label || "",
    };

    console.log("Contact Form Submit:", payload);

    // TODO:
    // connect API here
    // await fetch("/api/inquiry", { method: "POST", body: JSON.stringify(payload) })

    closeContactModal();
  };

  useEffect(() => {
    const fetchFooter = async () => {
      const res = await fetch("/backend/footer-menu");
      const data = await res.json();
      console.log("Footer Menu Data:", data);
      // only published (IMPORTANT)
      const filtered = data.filter((item: any) => item.status === "published");

      setFooterLinks(data);
    };

    fetchFooter();
  }, []);
  useEffect(() => {
    const fetchExplore = async () => {
      const res = await fetch("/backend/footer-menu-2");
      const data = await res.json();

      console.log("Explore Menu:", data);

      setExploreLinks(data); // no filter अभी
    };

    fetchExplore();
  }, []);

  return (
    <footer className="relative bg-[#000] text-white overflow-hidden border-t border-white/10">
      {/* top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#F1DC7F] to-transparent" />

      {/* CTA BAND */}
      <div className="px-6 md:px-12 lg:px-20 py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#F1DC7F] mb-2">
              Luxury Real Estate Concierge
            </p>
            <h2 className="text-2xl md:text-4xl font-light leading-tight">
              Let’s help you find your next
              <span className="text-[#F1DC7F]"> premium property</span>
            </h2>
            <p className="text-sm lg:text-xl lg:text-xl md:text-base text-white mt-3 max-w-2xl">
              Explore curated opportunities across Dubai’s most desirable
              communities with expert guidance from our team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              className="px-6 py-3 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black font-medium hover:scale-[1.02] transition"
              onClick={() => openContactModal("book-consultation")}
            >
              Book a Consultation
            </button>

            <Link
              href="https://wa.me/971547558866"
              target="_blank"
              className="px-6 py-3 rounded-full border border-yellow-500/60 hover:border-[#F1DC7F] hover:text-[#F1DC7F] transition flex items-center justify-center"
            >
              <FaWhatsapp className="w-6 h-6 text-yellow-400 text-lg transition duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative px-6 md:px-12 lg:px-20 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src={
                "https://storage.googleapis.com/winstead-global-assets/projects/gallery/1776246712700-winlogo.png"
              }
              alt="Winstead"
              width={180}
              height={180}
              className="mb-5"
            />
            {/* <p className="text-white leading-relaxed text-sm lg:text-xl lg:text-xl md:text-base max-w-sm">
              Winstead delivers access to refined living and high-potential real
              estate opportunities through a tailored, investor-first approach.
            </p> */}

            <div className="flex gap-3 mt-6">
              {[
                {
                  icon: FaFacebookF,
                  link: "https://www.facebook.com/winsteadglobalrealestate",
                },
                {
                  icon: FaInstagram,
                  link: "https://x.com/winsteadglobal",
                },
                {
                  icon: FaPinterest,
                  link: "https://in.pinterest.com/winsteadglobal/",
                },
                {
                  icon: FaWhatsapp,
                  link: "https://wa.me/971547558866",
                },
                {
                  icon: FaYoutube,
                  link: "https://www.youtube.com/@WinsteadGlobal",
                },
                {
                  icon: FaTiktok,
                  link: "https://www.tiktok.com/@winsteadglobal",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-yellow-500/60 flex items-center justify-center text-yellow-400 text-xl hover:bg-yellow-500 hover:text-black transition duration-300"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg mb-5 font-bold">Quick Links</h3>

            <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-3 gap-x-6 text-white">
              {footerLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.subtitle || "#"}
                    className="hover:text-[#F1DC7F] transition"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Explore */}
          <div>
            <h3 className="text-white text-lg mb-5 font-bold">Explore</h3>

            <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-3 gap-x-6 text-white">
              {exploreLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.subtitle || "#"}
                    className="hover:text-[#F1DC7F] transition"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-white text-lg mb-5 font-bold">Contact</h3>
            <div className="space-y-4 text-white text-sm  md:text-base">
              {/* <p>
                2601, Iris Bay, Business Bay, Dubai
                <br />
                Dubai, UAE
              </p> */}

              <div className="space-y-2">
                {locations.map((loc, index) => (
                  <p key={index}>{loc}</p>
                ))}
              </div>
              <div className="space-y-1">
                {phones.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block hover:text-yellow-400"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <div className="space-y-2 break-words">
                {emails.map((email: string, index: number) => (
                  <a
                    key={index}
                    href={`mailto:${email}`}
                    className="block text-md text-white hover:text-yellow-400 transition"
                  >
                    {email}
                  </a>
                ))}
              </div>

              <p>Mon - Sat : 9:00 AM - 7:00 PM</p>
            </div>

            {/* <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm lg:text-xl lg:text-xl text-white mb-2">Stay updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent border border-white/10 rounded-full px-4 py-2 text-sm lg:text-xl lg:text-xl outline-none focus:border-[#F1DC7F]"
                />
                <button className="px-4 py-2 rounded-full bg-[#F1DC7F] text-black text-sm lg:text-xl lg:text-xl font-medium">
                  Join
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* giant wordmark */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700]" />

          <h6
            className={`${tinos.className} relative text-[15vw] leading-none text-center font-bold whitespace-nowrap bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent opacity-80 mt-20`}
          >
            WINSTEAD
          </h6>
        </div>
      </div>

      {/* bottom strip */}
      <div className="px-6 md:px-12 lg:px-20 py-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm lg:text-sm  text-white">
          <p>© 2026 Winstead Global Real Estate LLC</p>

          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy"
              className="hover:text-[#F1DC7F] transition"
            >
              Privacy Policy
            </a>
            <a
              href="/term-and-conditions"
              className="hover:text-[#F1DC7F] transition"
            >
              Terms & Conditions
            </a>
            {/* <a href="#" className="hover:text-[#F1DC7F] transition">
              Sitemap
            </a> */}
          </div>
        </div>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        onSubmit={handleContactSubmit}
        form={contactForm}
        onChange={handleContactChange}
        projectTitle="General Inquiry"
        intent={contactIntent}
      />
      <div className="hidden md:block">
        <LuxuryChatbot />
      </div>
    </footer>
  );
}
