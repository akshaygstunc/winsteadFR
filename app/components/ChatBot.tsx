"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
    X,
    Send,
    Loader2,
    Phone,
    MessageCircle,
} from "lucide-react";
import { DefaultChatTransport } from "ai";
import WebsiteContentService from "../services/websitecontent.service";

export default function LuxuryChatbot() {
    const [open, setOpen] = useState(false);
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [value, setValue] = useState("");
    const [leadForm, setLeadForm] = useState({
        name: "",
        email: "",
        phone: "",
    });
    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedLeadStatus = localStorage.getItem(
            "luxury-chatbot-lead-captured"
        );

        const savedLead = localStorage.getItem("luxury-chatbot-lead");

        if (savedLeadStatus === "true" && savedLead) {
            setLeadCaptured(true);
            setLeadForm(JSON.parse(savedLead));
        }
    }, []);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const { messages, sendMessage, status, error } = useChat({
        transport: new DefaultChatTransport({
            api: "/backend/chat",
        }),
    });
    const isLoading = status === "submitted" || status === "streaming";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!value.trim() || isLoading) return;

        await sendMessage({
            text: value,
        });

        setValue("");
    };

    const submitLeadForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!leadForm.name || !leadForm.email || !leadForm.phone) return;

        try {
            const city =
                typeof window !== "undefined"
                    ? localStorage.getItem("city") || ""
                    : "";

            const country =
                typeof window !== "undefined"
                    ? localStorage.getItem("country") || ""
                    : "";

            const payload = {
                contact: {
                    fullName: leadForm.name.trim(),
                    email: leadForm.email.trim(),
                    phone: leadForm.phone.trim(),
                    location: `${city}, ${country}`,
                },
                sourcePage:
                    typeof window !== "undefined" ? window.location.href : "",
                referrer:
                    typeof document !== "undefined" ? document.referrer : "",
                device: {
                    deviceType:
                        typeof navigator !== "undefined" &&
                            /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
                            ? "mobile"
                            : "desktop",
                    os:
                        typeof navigator !== "undefined"
                            ? navigator.platform || ""
                            : "",
                    browser:
                        typeof navigator !== "undefined"
                            ? navigator.userAgent || ""
                            : "",
                    browserVersion: "",
                    ipAddress: "",
                    userAgent:
                        typeof navigator !== "undefined"
                            ? navigator.userAgent || ""
                            : "",
                },
                browserLocation: {
                    latitude:
                        typeof window !== "undefined"
                            ? Number(localStorage.getItem("lat")) || null
                            : null,
                    longitude:
                        typeof window !== "undefined"
                            ? Number(localStorage.getItem("long")) || null
                            : null,
                },
            };

            await WebsiteContentService.createContactQuery(payload);
            if (typeof window !== "undefined") {
                localStorage.setItem("luxury-chatbot-lead-captured", "true");
                localStorage.setItem(
                    "luxury-chatbot-lead",
                    JSON.stringify(leadForm)
                );
            }
            setLeadCaptured(true);
        } catch (error) {
            console.error("Failed to submit inquiry:", error);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <>
            {/* Luxury Launcher */}
            {!open && (
                <>
                    <button
                        onClick={() => setOpen(true)}
                        className="fixed bottom-5 left-2 z-50 flex items-center gap-4 rounded-tr-[30px] rounded-tl-[30px]  bg-gradient-to-r from-[#B9A650] to-[#F1DC7F] px-4 py-1 shadow-2xl min-w-[320px]"
                    >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                                src="/avataaars.png"
                                alt="Agent"
                                fill
                                className="object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white" />
                        </div>

                        <div className="text-left flex-1">
                            <p className="text-white font-medium">Liz</p>
                            <p className="text-white/90 text-sm">
                                Property Sales Department
                            </p>
                        </div>

                        <MessageCircle className="text-white" size={26} />
                    </button>

                    {/* <button className="fixed bottom-6 right-6 z-50 bg-[#B9973E] p-5 rounded-xl shadow-2xl">
                        <Phone fill="white" className="text-white" />
                    </button> */}
                </>
            )}

            {/* Popup */}
            {open && (
                <div className="fixed bottom-5 left-6 z-50 w-[390px] max-w-[calc(100vw-24px)] h-[600px] rounded-[28px] border border-white/10 bg-black/90 backdrop-blur-xl shadow-[0_0_80px_rgba(241,220,127,0.15)] flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="p-5 border-b border-white/10 flex justify-between items-center">
                        <div>
                            <h3 className="text-white font-semibold text-lg">
                                Winstead Global
                            </h3>
                            <p className="text-sm text-white/70">
                                Find your next premium property in Dubai
                            </p>
                        </div>

                        <button onClick={() => setOpen(false)}>
                            <X className="text-white" />
                        </button>
                    </div>

                    {/* Lead form first */}
                    {!leadCaptured ? (
                        <form
                            onSubmit={submitLeadForm}
                            className="p-5 space-y-4 flex-1"
                        >
                            <h4 className="text-white text-lg font-medium">
                                Before we begin
                            </h4>

                            <input
                                placeholder="Your Name"
                                value={leadForm.name}
                                onChange={(e) =>
                                    setLeadForm((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                            />

                            <input
                                placeholder="Your Email"
                                type="email"
                                value={leadForm.email}
                                onChange={(e) =>
                                    setLeadForm((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                            />

                            <input
                                placeholder="Phone Number"
                                value={leadForm.phone}
                                onChange={(e) =>
                                    setLeadForm((prev) => ({
                                        ...prev,
                                        phone: e.target.value,
                                    }))
                                }
                                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-gradient-to-r from-[#B9A650] to-[#F1DC7F] py-3 text-black font-medium"
                            >
                                Start Chat
                            </button>
                        </form>
                    ) : (
                        <>
                            {/* Chat */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4"
                            >
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm ${message.role === "user"
                                            ? "ml-auto bg-[#F1DC7F] text-black"
                                            : "bg-white/5 text-white"
                                            }`}
                                    >
                                        {message.parts?.map((part, i) =>
                                            part.type === "text" ? (
                                                <span key={i}>{part.text}</span>
                                            ) : null
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="bg-white/5 text-white rounded-2xl px-4 py-3 w-fit">
                                        <Loader2 size={16} className="animate-spin" />
                                    </div>
                                )}

                                {error && (
                                    <div className="text-red-400 text-sm">
                                        Something went wrong.
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={onSubmit}
                                className="p-4 border-t border-white/10 flex gap-2"
                            >
                                <input
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Ask about Dubai luxury properties..."
                                    className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="rounded-2xl bg-gradient-to-r from-[#B9A650] to-[#F1DC7F] px-4 text-black"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    );
}