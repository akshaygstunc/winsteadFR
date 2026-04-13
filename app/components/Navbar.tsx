"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import winstead from "../../public/logodetaile.png";
import star from "../../public/hugeicons_star.png";
import { FcGoogle } from "react-icons/fc";
import FollowUsIcons from "./SocialMedia";
import { IoMdArrowDropdown } from "react-icons/io";

const navLinks = [
  { name: "About Us", href: "/about-us" },
  // { name: "Projects", href: "/projects" },
  {
    name: "Projects",
    dropdown: [
      { name: "Off-Plan", href: "/projects" },
      { name: "Ready to Move In", href: "/projects" },
      { name: "Commercial", href: "/projects" },
      // { name: "Plot", href: "/projects" },
    ],
  },
  { name: "Our Services", href: "/our-services" },
  { name: "Our Team", href: "/our-team" },
  {
    name: "Media",
    dropdown: [
      { name: "Blogs", href: "/blogs" },
      { name: "Events", href: "/gallery" },
      // { name: "Awards", href: "/awards" },
      { name: "Contact Us", href: "/contact-us" },
    ],
  },
  { name: "Developer", href: "/developer" },
  // { name: "Media", href: "/news-media" },
  // { name: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
    if (activeDropdown) {
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
  }, [activeDropdown]);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const timeoutRef = useRef<any>(null);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-white/10">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <Link href="/" className="nav-item flex items-center">
          <Image
            src={"./Winsteadlogo.png"}
            alt="Winstead Logo"
            width={120}
            height={50}
            priority
            className="cursor-pointer"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => {
            // ✅ WITH DROPDOWN
            if (link.dropdown) {
              return (
                <div
                  key={index}
                  className="relative nav-item"
                  onMouseEnter={() => {
                    clearTimeout(timeoutRef.current);
                    setActiveDropdown(link.name); // 👈 track which dropdown
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setActiveDropdown(null);
                    }, 150);
                  }}
                >
                  <span className="cursor-pointer text-white text-sm lg:text-md lg:text-md flex items-center gap-1">
                    {link.name} <IoMdArrowDropdown />
                  </span>

                  {/* DROPDOWN */}
                  {activeDropdown === link.name && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full left-0 mt-4 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl py-2 z-50"
                    >
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="dropdown-item block px-4 py-2 text-sm lg:text-md lg:text-md text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // ✅ NORMAL LINK
            return (
              <Link
                key={index}
                href={link.href}
                className="text-[1.01rem] nav-item relative text-white text-sm lg:text-md  font-normal group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            );
          })}
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
                <span className="text-yellow-500 text-sm lg:text-md lg:text-md">★★★★★</span>
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
          {/* {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-white text-sm lg:text-md lg:text-md border-b border-white/10 pb-2 hover:text-yellow-400 transition"
            >
              {link.name}
            </a>
          ))} */}
          {navLinks.map((link, index) => {
            if (link.dropdown) {
              return (
                <div key={index}>
                  <p className="text-white text-sm lg:text-md lg:text-md font-semibold">
                    {link.name}
                  </p>

                  <div className="ml-3 mt-2 space-y-2">
                    {link.dropdown.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block text-gray-300 text-sm lg:text-md lg:text-md hover:text-yellow-400"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={link.href}
                className="text-white text-sm lg:text-md lg:text-md border-b border-white/10 pb-2 hover:text-yellow-400 transition"
              >
                {link.name}
              </Link>
            );
          })}
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
                <span className="text-yellow-500 text-sm lg:text-md lg:text-md">★★★★★</span>
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
