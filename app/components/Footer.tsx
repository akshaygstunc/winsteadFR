"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logodetaile.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import ContactModal from "./ContactModal";
import { FaPinterest } from "react-icons/fa6";
type ContactIntent =
  | "schedule-visit"
  | "download-floor-plan"
  | "request-brochure"
  | "book-consultation"
  | "general";
export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState<ContactIntent>("general");

  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
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
              className="px-6 py-3 rounded-full border border-yellow-500/60 hover:border-[#F1DC7F] hover:text-[#F1DC7F] transition"
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
            <Image src={logo} alt="Winstead" width={150} className="mb-5" />
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
            <ul className="space-y-3 text-white">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-[#F1DC7F] transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#F1DC7F] transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/our-services"
                  className="hover:text-[#F1DC7F] transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/our-team"
                  className="hover:text-[#F1DC7F] transition"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/news-media"
                  className="hover:text-[#F1DC7F] transition"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="hover:text-[#F1DC7F] transition"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white text-lg mb-5 font-bold">Explore</h3>
            <ul className="space-y-3 text-white">
              <li>
                <a href="#" className="hover:text-[#F1DC7F] transition">
                  Luxury Apartments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F1DC7F] transition">
                  Villas & Townhouses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F1DC7F] transition">
                  Waterfront Homes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F1DC7F] transition">
                  Investment Opportunities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F1DC7F] transition">
                  Prime Communities
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg mb-5 font-bold">Contact</h3>
            <div className="space-y-4 text-white text-sm  md:text-base">
              <p>
                2601, Iris Bay, Business Bay, Dubai
                <br />
                Dubai, UAE
              </p>
              <p>+971 54 755 8866</p>
              <p>info@winsteadglobal.com</p>
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
          <div
            className="absolute inset-0 blur-3xl opacity-20 
    bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700]"
          />

          <h6
            className="relative text-[15vw] leading-none text-center font-bold whitespace-nowrap 
    bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] 
    bg-clip-text text-transparent opacity-80"
          >
            WINSTEAD
          </h6>
        </div>
      </div>

      {/* bottom strip */}
      <div className="px-6 md:px-12 lg:px-20 py-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm lg:text-xl lg:text-xl text-white">
          <p>© 2026 Winstead Global Real Estate LLC</p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#F1DC7F] transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#F1DC7F] transition">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-[#F1DC7F] transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        onSubmit={handleContactSubmit}
        form={contactForm}
        onChange={handleContactChange}
        // projectTitle={project.title}
        intent={contactIntent}
      />
    </footer>
  );
}
