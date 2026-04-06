"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/winstead.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#0b0b0b] text-white overflow-hidden border-t border-white/10">
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
            <p className="text-sm md:text-base text-white mt-3 max-w-2xl">
              Explore curated opportunities across Dubai’s most desirable
              communities with expert guidance from our team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button className="px-6 py-3 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black font-medium hover:scale-[1.02] transition">
              Book a Consultation
            </button>
            <button className="px-6 py-3 rounded-full border border-yellow-500/60 hover:border-[#F1DC7F] hover:text-[#F1DC7F] transition">
              <FaWhatsapp className="w-6 h-6 text-yellow-400 text-lg transition duration-300"/>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative px-6 md:px-12 lg:px-20 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image src={logo} alt="Winstead" width={74} className="mb-5" />
            <p className="text-white leading-relaxed text-sm md:text-base max-w-sm">
              Winstead delivers access to refined living and high-potential real
              estate opportunities through a tailored, investor-first approach.
            </p>

            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-yellow-500/60 flex items-center justify-center text-yellow-400 text-xl hover:bg-yellow-500 hover:text-black transition duration-300"
                  >
                    <Icon />

                  </a>
                ),
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3 text-white">
              <li><Link href="/about-us" className="hover:text-[#F1DC7F] transition">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-[#F1DC7F] transition">Projects</Link></li>
              <li><Link href="/our-services" className="hover:text-[#F1DC7F] transition">Services</Link></li>
              <li><Link href="/our-team" className="hover:text-[#F1DC7F] transition">Our Team</Link></li>
              <li><Link href="/news-media" className="hover:text-[#F1DC7F] transition">News & Media</Link></li>
              <li><Link href="/career" className="hover:text-[#F1DC7F] transition">Career</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white text-lg mb-5">Explore</h3>
            <ul className="space-y-3 text-white">
              <li><a href="#" className="hover:text-[#F1DC7F] transition">Luxury Apartments</a></li>
              <li><a href="#" className="hover:text-[#F1DC7F] transition">Villas & Townhouses</a></li>
              <li><a href="#" className="hover:text-[#F1DC7F] transition">Waterfront Homes</a></li>
              <li><a href="#" className="hover:text-[#F1DC7F] transition">Investment Opportunities</a></li>
              <li><a href="#" className="hover:text-[#F1DC7F] transition">Prime Communities</a></li>
            </ul>
          </div>

          {/* Contact */}  
          <div>
            <h3 className="text-white text-lg mb-5">Contact</h3>
            <div className="space-y-4 text-white text-sm md:text-base">
              <p>
                2601, Iris Bay, Business Bay, Dubai
                <br />
                Dubai, UAE
              </p>
              <p>+971 54 755 8866</p>
              <p>info@winstead.com</p>
              <p>Mon - Sat : 9:00 AM - 7:00 PM</p>
            </div>

            <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-sm text-white mb-2">Stay updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent border border-white/10 rounded-full px-4 py-2 text-sm outline-none focus:border-[#F1DC7F]"
                />
                <button className="px-4 py-2 rounded-full bg-[#F1DC7F] text-black text-sm font-medium">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-20 
    bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700]" />

          <h6 className="relative text-[15vw] leading-none text-center font-bold whitespace-nowrap 
    bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] 
    bg-clip-text text-transparent opacity-80">
            WINSTEAD
          </h6>
        </div>
      </div>

      {/* bottom strip */}
      <div className="px-6 md:px-12 lg:px-20 py-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm text-white">
          <p>© 2026 Winstead Global Real Estate LLC</p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#F1DC7F] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[#F1DC7F] transition">Terms & Conditions</a>
            <a href="#" className="hover:text-[#F1DC7F] transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}