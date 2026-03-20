"use client";

import Image from "next/image";
import winstead from "../../public/winstead.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function Newsletter() {
  return (
    <section className="bg-[#0f0f0f] text-white px-6 md:px-16 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT */}
        <div>
          <Image src={winstead} alt="logo" width={140} className="mb-6" />

          <h2 className="text-3xl md:text-4xl font-light leading-snug mb-6">
            Get exclusive <br />
            <span className="text-yellow-400">property updates</span> <br />
            in your inbox.
          </h2>

          {/* Input */}
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

          {/* Social Icons */}
          <div className="flex gap-5 mt-8 text-lg">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full cursor-pointer hover:bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] hover:text-black transition duration-300"
                >
                  <Icon />
                </div>
              )
            )}
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
                  <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
                  <li className="hover:text-yellow-400 cursor-pointer">Services</li>
                  <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-white opacity-0">hidden</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-yellow-400 cursor-pointer">Our Team</li>
                  <li className="hover:text-yellow-400 cursor-pointer">Partnership</li>
                  <li className="hover:text-yellow-400 cursor-pointer">Career</li>
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
                  <li className="hover:text-yellow-400 cursor-pointer">Projects</li>
                  <li className="hover:text-yellow-400 cursor-pointer">Locations</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 opacity-0">hidden</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-yellow-400 cursor-pointer">Our Partners</li>
                  <li className="hover:text-yellow-400 cursor-pointer">News & Media</li>
                </ul>
              </div>
            </div>
          </div>
        {/* RIGHT */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
          
          <div>
            <h4 className="text-gray-400 mb-4">Company Info</h4>
            <ul className="space-y-2">
              {["About Us", "Services", "Contact Us"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-yellow-400 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 mb-4">Our Team</h4>
            <ul className="space-y-2">
              {["Our Team", "Partnership", "Career"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-yellow-400 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 mb-4">Portfolio</h4>
            <ul className="space-y-2">
              {["Projects", "Locations", "News & Media"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-yellow-400 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div> */}
      </div>
    </section>
  );
}