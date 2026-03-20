"use client";

import { PhoneCall, X } from "lucide-react";
import Image from "next/image";
import person from "../../public/person.png";
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
    <footer className="bg-[#1a1a1a] text-white relative">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        {/* TOP GRID */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div>
            <Image src={logo} alt="logo" width={60} className="mb-6" />
            <h2 className="text-xl md:text-2xl font-light leading-snug mb-6">
              Get exclusive <br />
              <span className="text-yellow-400">property updates</span> <br />
              in your inbox.
            </h2>
            {/* SOCIAL */}
            <div className="flex gap-5 text-xl mb-8">
              {[
                FaFacebookF,
                FaInstagram,
                FaLinkedinIn,
                FaWhatsapp,
                FaYoutube,
              ].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full cursor-pointer hover:bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] hover:text-black transition"
                >
                  <Icon />
                </div>
              ))}
            </div>

            {/* EMAIL SUBSCRIBE */}
            <div className="flex max-w-md">
              <div className="flex w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-white/20 px-4 py-3 rounded-l-md outline-none focus:border-yellow-400 transition"
                />

                <button className="px-6 py-3 text-black font-semibold rounded-r-md bg-[linear-gradient(84.04deg,#B9A650_0.77%,#F1DC7F_43.94%,#7C5700_82.27%)] hover:opacity-90 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div>
            <h3 className="text-lg mb-4">Address</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Dubai Hills Estate Business Park 4th, Office 204no <br />
              Dubai - UAE, PO Box No: 453881
            </p>

            <div className="border-t border-white/10 my-6"></div>

            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <h4 className="mb-3 text-white">Company Info</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-yellow-400 cursor-pointer">
                    About Us
                  </li>
                  <li className="hover:text-yellow-400 cursor-pointer">
                    Services
                  </li>
                  <li className="hover:text-yellow-400 cursor-pointer">
                    Contact Us
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-white opacity-0">hidden</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-yellow-400 cursor-pointer">
                    Our Team
                  </li>
                  <li className="hover:text-yellow-400 cursor-pointer">
                    Partnership
                  </li>
                  <li className="hover:text-yellow-400 cursor-pointer">
                    Career
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between">
            <div className="flex justify-end">
              <button className="border border-white/50 px-6 py-3 text-sm hover:bg-white hover:text-black transition">
                Get Expert Help
              </button>
            </div>

            <div className="grid grid-cols-2 gap-10 text-sm mt-10">
              <div>
                <h4 className="mb-3">Our Portfolio</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-yellow-400 cursor-pointer">
                    Projects
                  </li>
                  <li className="hover:text-yellow-400 cursor-pointer">
                    Locations
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 opacity-0">hidden</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-yellow-400 cursor-pointer">
                    Our Partners
                  </li>
                  <li className="hover:text-yellow-400 cursor-pointer">
                    News & Media
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* middle grid */}
        {/* <div className="w-full">
          <h6 className="text-[160px] text-center">Winstead</h6>
        </div> */}
        {/* BOTTOM BAR */}
        <div className="mt-16 h-[1px] w-full bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]"></div>
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
          <p>© 2026 Richkey Properties. All rights reserved.</p>

          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>

      {/* FLOATING CALL BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 rounded-xl bg-yellow-500 blur-2xl opacity-20 animate-pulse"></div>

          {/* Button */}
          <button className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black shadow-lg hover:scale-110 transition">
            <PhoneCall />
          </button>
        </div>
      </div>

      {/* AGENT CARD */}
      <div className="fixed bottom-6 left-6 bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black px-5 py-3 rounded-full flex items-center gap-4 shadow-lg">
        <div className="w-10 h-10 rounded-full bg-black">
          <Image
            src={person}
            alt="Winstead Logo"
            priority
            className="relative"
          />
        </div>

        <div className="text-sm">
          <p className="font-semibold">Sophie</p>
          <p className="text-xs">Property Sales Department</p>
        </div>

        <button>
          <X size={16} />
        </button>
      </div>
    </footer>
  );
}
