"use client";
import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import winstead from "../../public/logo.png";

export default function Navbar() {
  useEffect(() => {
    gsap.from(".nav", {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
     <div className="fixed top-0 w-full z-50 flex justify-between items-center p-0 pr-10 bg-black/40 backdrop-blur-md">
      
      <Image src={winstead} alt="logo"/>

      <div className="flex gap-8 text-sm">
        <a>Home</a>
        <a>Projects</a>
        <a>About Us</a>
        <a>Blogs</a>
      </div>

      <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-5 py-2 rounded-md text-black font-semibold">
        Contact Us
      </button>
    </div>
  );
}