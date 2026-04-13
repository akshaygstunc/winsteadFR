"use client";

import { useState, useEffect } from "react";
import { PhoneCall, X } from "lucide-react";
import Image from "next/image";
import person from "../../public/person.png";
import gsap from "gsap";

export default function ChatWidget() {
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
    <>
      {/* FLOATING CALL */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black flex items-center justify-center shadow-lg">
          <PhoneCall />
        </button>
      </div>

      {/* AGENT BUTTON */}
      <div
        onClick={() => setOpenChat(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 py-3 rounded-full flex items-center gap-3 shadow-lg cursor-pointer"
      >
        <Image src={person} alt="person" className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm lg:text-md lg:text-md font-semibold">Sophie</p>
          <p className="text-xs">Sales Dept</p>
        </div>
      </div>

      {/* CHAT MODAL */}
      {openChat && (
       <ChatWidget />
      )}
    </>
  );
}