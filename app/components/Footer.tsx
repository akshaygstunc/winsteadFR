"use client";

import { PhoneCall, X } from "lucide-react";
import Image from "next/image";
import person from "../../public/person.png";
import logo from "../../public/winstead.png";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const [openChat, setOpenChat] = useState(false);
 useEffect(() => {
  if (openChat) {
    gsap.fromTo(
      ".chat-box",
      { y: 120, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }
}, [openChat]);
  return (
    <footer className="bg-[#1a1a1a] text-white relative">
      {/* MAIN CONTENT */}
      <div className="mx-auto px-6 md:px-12 py-14">
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
            <p className="text-[1.01rem] text-gray-300 leading-relaxed">
              Dubai Hills Estate Business Park 4th, Office 204no <br />
              Dubai - UAE, PO Box No: 453881
            </p>

            <div className="border-t border-white/10 my-6"></div>

            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <h4 className="mb-3 text-white">Company Info</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
                    About Us
                  </li>
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
                    Services
                  </li>
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
                    Contact Us
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-white opacity-0">hidden</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
                    Our Team
                  </li>
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
                    Partnership
                  </li>
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
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
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
                    Projects
                  </li>
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
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
                  <li className="text-[1.01rem] hover:text-yellow-400 cursor-pointer">
                    News & Media
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* middle grid */}
        {/* BOTTOM BAR */}
        <div className="mt-16 h-[1px] w-full bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]"></div>
        <div className="overflow-hidden">
          <h6 className="text-[18vw] leading-none text-center text-[#AFAFAF] font-bold whitespace-nowrap">
            Winstead
          </h6>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
          <p>© 2026 Winstead Properties. All rights reserved.</p>

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
      <div
        onClick={() => setOpenChat(true)}
        className="fixed bottom-6 left-6 bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black px-5 py-3 rounded-full flex items-center gap-4 shadow-lg"
      >
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
      {openChat && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="chat-box w-full md:max-w-md bg-white/95 backdrop-blur-xl text-black rounded-t-2xl md:rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            {/* HEADER */}
            <div className="relative px-5 py-4 flex items-center justify-between bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)]">
              {/* glow */}
              <div className="absolute inset-0 opacity-20 blur-xl bg-yellow-300"></div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <Image
                    src={person}
                    alt="person"
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  {/* online pulse */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white animate-ping"></span>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
                </div>

                <div>
                  <p className="font-semibold text-black">Sophie</p>
                  <p className="text-xs text-black/80">
                    Property Sales Department
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpenChat(false)}
                className="relative z-10 hover:scale-110 transition"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5">
              <p className="text-gray-600 text-sm">
                Please share your details to start chatting.
              </p>

              {/* INPUTS */}
              <div className="space-y-4">
                <input
                  placeholder="Your Name *"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-yellow-500 focus:shadow-[0_0_10px_rgba(241,220,127,0.3)] transition"
                />

                <input
                  placeholder="Email Address *"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-yellow-500 focus:shadow-[0_0_10px_rgba(241,220,127,0.3)] transition"
                />

                <div className="flex border border-gray-300 rounded-xl overflow-hidden focus-within:border-yellow-500 focus-within:shadow-[0_0_10px_rgba(241,220,127,0.3)] transition">
                  <div className="px-4 flex items-center bg-gray-100 text-sm">
                    🇦🇪
                  </div>

                  <input
                    placeholder="+971"
                    className="flex-1 px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button className="w-full py-3 rounded-xl font-semibold text-black bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] hover:scale-[1.02] active:scale-[0.98] transition shadow-[0_10px_30px_rgba(241,220,127,0.3)]">
                Start Chat
              </button>

              <p className="text-xs text-gray-500 text-center">
                By starting this chat, you agree to our{" "}
                <span className="text-yellow-600 cursor-pointer">
                  Terms & Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
