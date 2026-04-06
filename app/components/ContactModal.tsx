import React from "react";
import { FaTimes } from "react-icons/fa";

type ContactIntent =
    | "schedule-visit"
    | "download-floor-plan"
    | "request-brochure"
    | "book-consultation"
    | "general";


export default function ContactModal({
    isOpen,
    onClose,
    onSubmit,
    form,
    onChange,
    projectTitle,
    intent,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    form: {
        fullName: string;
        email: string;
        phone: string;
        message: string;
    };
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    projectTitle?: string;
    intent: ContactIntent;
}) {
    function getModalHeading(intent: ContactIntent) {
        switch (intent) {
            case "schedule-visit":
                return "Schedule your private project visit";
            case "download-floor-plan":
                return "Request detailed floor plan access";
            case "request-brochure":
                return "Get the full project brochure";
            case "book-consultation":
                return "Book a premium consultation";
            default:
                return "Connect with our property team";
        }
    }
    function getIntentLabel(intent: ContactIntent) {
        switch (intent) {
            case "schedule-visit":
                return "Schedule Private Visit";
            case "download-floor-plan":
                return "Download Floor Plan";
            case "request-brochure":
                return "Request Brochure";
            case "book-consultation":
                return "Book Consultation";
            default:
                return "General Inquiry";
        }
    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_20px_100px_rgba(0,0,0,0.65)]">
                <div className="absolute -top-20 -left-10 h-60 w-60 rounded-full bg-yellow-500/10 blur-3xl" />
                <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

                <div className="relative grid lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-6 md:p-8 bg-white/[0.02]">
                        <div className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-yellow-400 mb-5">
                            Premium Assistance
                        </div>

                        <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
                            {getModalHeading(intent)}
                        </h3>

                        <p className="text-white-400 leading-relaxed mb-6">
                            Share your details and our team will connect with you regarding{" "}
                            <span className="text-white font-medium">{projectTitle}</span>.
                        </p>

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <p className="text-xs uppercase tracking-[0.16em] text-white-500 mb-1">
                                    Project
                                </p>
                                <p className="text-white font-medium">{projectTitle}</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <p className="text-xs uppercase tracking-[0.16em] text-white-500 mb-1">
                                    Request Type
                                </p>
                                <p className="text-white font-medium">{getIntentLabel(intent)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative p-6 md:p-8">
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center hover:border-yellow-400/40 transition"
                        >
                            <FaTimes />
                        </button>

                        <form onSubmit={onSubmit} className="space-y-4 pr-0 md:pr-8">
                            <div>
                                <label className="text-sm text-white-300 mb-2 block">
                                    Full Name
                                </label>
                                <input
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={onChange}
                                    placeholder="Enter your full name"
                                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-white-300 mb-2 block">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={onChange}
                                        placeholder="Enter your email"
                                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-white-300 mb-2 block">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={onChange}
                                        placeholder="Enter your phone number"
                                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-white-300 mb-2 block">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={onChange}
                                    placeholder="Tell us what you are looking for"
                                    rows={5}
                                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/50 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black py-4 font-semibold hover:scale-[1.01] transition"
                            >
                                Submit Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}