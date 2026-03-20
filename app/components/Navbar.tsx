"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import winstead from "../../public/winstead.png";
import star from "../../public/hugeicons_star.png";
import { FcGoogle } from "react-icons/fc";

const navLinks = [
  "Home",
  "About Us",
  "Projects",
  "Our Services",
  "Our Team",
  "News & Media",
  "Contact Us",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    gsap.from(".nav-item", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, []);
  useEffect(() => {
    if (showDropdown) {
      gsap.fromTo(
        ".dropdown-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }
  }, [showDropdown]);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <div className="nav-item flex items-center">
          <Image
            src={winstead}
            alt="Winstead Logo"
            width={60}
            height={30}
            priority
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="nav-item relative text-white text-sm font-normal group"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-6 nav-item">
          {/* Follow Us */}
          <div className="relative" ref={dropdownRef}>
            {/* Trigger */}
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white text-sm cursor-pointer hover:text-yellow-400 transition flex items-center gap-1"
            >
              Follow Us ▾
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-10 right-0 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl">
                {["Discord", "Instagram", "X", "YouTube", "LinkedIn"].map(
                  (item, index) => (
                    <div
                      key={index}
                      className="dropdown-item relative text-white text-sm py-2 px-3 cursor-pointer overflow-hidden group"
                    >
                      {/* Gradient Hover Background */}
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[linear-gradient(84.04deg,#B9A650_0.77%,#F1DC7F_43.94%,#7C5700_82.27%)]"></span>

                      {/* Text */}
                      <span className="relative z-10 group-hover:text-black transition duration-300">
                        {item}
                      </span>

                      {/* Underline animation */}
                      <span className="absolute left-3 bottom-1 w-0 h-[1px] bg-white group-hover:w-[80%] transition-all duration-300"></span>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-white/20"></div>

          {/* Google Rating */}
          <div className="flex items-center gap-2 text-white text-sm">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20">
              <FcGoogle size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1 font-semibold">
                4.8{" "}
                <span className="text-yellow-400">
                  <Image
                    src={star}
                    alt="Winstead Logo"
                    width={15}
                    height={15}
                    priority
                  />
                </span>
              </div>
              <div className="text-xs text-gray-400">200+ Reviews</div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white nav-item"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
  className={`lg:hidden bg-black/95 backdrop-blur-lg transition-all duration-500 overflow-hidden ${
    isOpen ? "max-h-[600px]" : "max-h-0"
  }`}
>
  <div className="flex flex-col px-6 py-4 space-y-4">

    {/* NAV LINKS */}
    {navLinks.map((link, index) => (
      <a
        key={index}
        href="#"
        className="text-white text-sm border-b border-white/10 pb-2 hover:text-yellow-400 transition"
      >
        {link}
      </a>
    ))}

    {/* FOLLOW US (MOBILE DROPDOWN) */}
    <div className="mt-4">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-white text-sm cursor-pointer flex justify-between items-center border-b border-white/10 pb-2"
      >
        Follow Us
        <span className={`${showDropdown ? "rotate-180" : ""} transition`}>
          ▾
        </span>
      </div>

      {/* Dropdown Items */}
      {showDropdown && (
        <div className="mt-2 space-y-2">
          {["Discord", "Instagram", "X", "YouTube", "LinkedIn"].map(
            (item, index) => (
              <div
                key={index}
                className="text-white text-sm px-2 py-2 rounded-md hover:bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] hover:text-black transition"
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
    </div>

    {/* GOOGLE RATING */}
    <div className="flex items-center gap-3 mt-4">
      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20">
        <FcGoogle size={18} />
      </div>

      <div>
        <div className="flex items-center gap-1 font-semibold text-white">
          4.8
          <Image src={star} alt="star" width={14} height={14} />
        </div>
        <div className="text-xs text-gray-400">200+ Reviews</div>
      </div>
    </div>

    {/* CTA */}
    <button className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-2 rounded-md">
      Contact Us
    </button>

  </div>
</div>
    </header>
  );
}
