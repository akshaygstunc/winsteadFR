"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import winstead from "../../public/win-logo.png";
import star from "../../public/hugeicons_star.png";
import { FcGoogle } from "react-icons/fc";
import FollowUsIcons from "./SocialMedia";

const navLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Projects", href: "/projects" },
  { name: "Our Services", href: "/our-services" },
  { name: "Our Team", href: "/our-team" },
  { name: "News & Media", href: "/news-media" },
  { name: "Contact Us", href: "/contact-us" },
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
        <Link href="/" className="nav-item flex items-center">
          <Image
            src={winstead}
            alt="Winstead Logo"
            width={80}
            height={30}
            priority
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-[1.01rem] nav-item relative text-white text-sm font-normal group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-6 nav-item">
          {/* Follow Us */}
          <FollowUsIcons />

          {/* Divider */}
          <div className="h-6 w-[1px] bg-white/20"></div>

          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="w-8 h-8 rounded-full border border-yellow-500/30 flex items-center justify-center bg-black">
              <FcGoogle size={18} />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-semibold text-white">4.8</span>
                <span className="text-yellow-500 text-sm">★★★★★</span>
              </div>
              <p className="text-white-400 text-xs">
                Rated by&nbsp; 200+ clients
              </p>
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
              href={link.href}
              className="text-white text-sm border-b border-white/10 pb-2 hover:text-yellow-400 transition"
            >
              {link.name}
            </a>
          ))}

          {/* FOLLOW US (MOBILE DROPDOWN) */}
          <div className="mt-4">
            <FollowUsIcons />
          </div>

          {/* GOOGLE RATING */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="w-8 h-8 rounded-full border border-yellow-500/30 flex items-center justify-center bg-black">
              <FcGoogle size={18} />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-semibold text-white">4.8</span>
                <span className="text-yellow-500 text-sm">★★★★★</span>
              </div>
              <p className="text-white-400 text-xs">
                Rated by&nbsp; 200+ clients
              </p>
            </div>
          </div>

          {/* CTA */}
          {/* <button className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-2 rounded-md">
      Contact Us
    </button> */}
        </div>
      </div>
    </header>
  );
}
