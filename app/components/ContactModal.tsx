import React, { useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import WebsiteContentService from "../services/websitecontent.service";
import { toast } from "react-toastify";

type ContactIntent =
    | "schedule-visit"
    | "download-floor-plan"
    | "request-brochure"
    | "book-consultation"
    | "general";

const countryCodes = [
    { code: "+971", label: "UAE (+971)" },
    { code: "+91", label: "India (+91)" },
    { code: "+1", label: "USA (+1)" },
    { code: "+44", label: "UK (+44)" },
    { code: "+61", label: "Australia (+61)" },
    { code: "+966", label: "Saudi (+966)" },
    { code: "+974", label: "Qatar (+974)" },
    { code: "+968", label: "Oman (+968)" },
    { code: "+973", label: "Bahrain (+973)" },
    { code: "+965", label: "Kuwait (+965)" },
];

type FormErrors = {
    fullName?: string;
    email?: string;
    phone?: string;
    terms?: string;
};

export default function ContactModal({
    isOpen,
    onClose,
    projectTitle,
    intent,
}: {
    isOpen: boolean;
    onClose: () => void;
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

    const [contactForm, setContactForm] = useState({
        fullName: "",
        email: "",
        countryCode: "+971",
        phone: "",
        message: "",
        terms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [locationStatus, setLocationStatus] = useState<
        "idle" | "fetching" | "granted" | "denied" | "unavailable"
    >("idle");

    const [browserLocation, setBrowserLocation] = useState<{
        latitude: number | null;
        longitude: number | null;
    } | null>(null);

    const handleContactChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const nextValue =
            type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        setContactForm((prev) => ({
            ...prev,
            [name]: nextValue,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        const fullName = contactForm.fullName.trim();
        const email = contactForm.email.trim();
        const phone = contactForm.phone.trim();

        if (!fullName) {
            newErrors.fullName = "Full name is required";
        } else if (fullName.length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            newErrors.fullName = "Full name should contain only letters";
        }

        if (!email) {
            newErrors.email = "Email address is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d+$/.test(phone)) {
            newErrors.phone = "Phone number should contain only digits";
        } else if (phone.length < 7 || phone.length > 15) {
            newErrors.phone = "Phone number must be between 7 and 15 digits";
        }

        if (!contactForm.terms) {
            newErrors.terms = "Please accept terms and conditions";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the highlighted fields before submitting.");
            return;
        }

        try {
            setIsSubmitting(true);

            const payload = {
                contact: {
                    fullName: contactForm.fullName.trim(),
                    email: contactForm.email.trim(),
                    phone: `${contactForm.countryCode}${contactForm.phone}`.replace(/\s+/g, ""),
                    location:
                        browserLocation?.latitude && browserLocation?.longitude
                            ? `${browserLocation.latitude}, ${browserLocation.longitude}`
                            : "",
                },
                sourcePage: typeof window !== "undefined" ? window.location.href : "",
                referrer: typeof document !== "undefined" ? document.referrer : "",
                device: {
                    deviceType:
                        typeof navigator !== "undefined" &&
                            /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
                            ? "mobile"
                            : "desktop",
                    os: typeof navigator !== "undefined" ? navigator.platform || "" : "",
                    browser: typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
                    browserVersion: "",
                    ipAddress: "",
                    userAgent: typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
                },
                browserLocation: {
                    latitude: browserLocation?.latitude ?? null,
                    longitude: browserLocation?.longitude ?? null,
                },
            };

            await WebsiteContentService.createContactQuery(payload);

            setIsSubmitted(true);
            setErrors({});

            setContactForm({
                fullName: "",
                email: "",
                countryCode: "+971",
                phone: "",
                message: "",
                terms: false,
            });

            toast.success("Inquiry submitted successfully!");

            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setLocationStatus("idle");
                setBrowserLocation(null);
            }, 2500);
        } catch (error) {
            toast.error("Failed to submit inquiry. Please try again later.");
            console.error("Failed to submit inquiry:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200]">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-[201] flex min-h-screen items-start justify-center overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_20px_100px_rgba(0,0,0,0.65)] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)]">
                    <div className="absolute -top-20 -left-10 h-60 w-60 rounded-full bg-yellow-500/10 blur-3xl" />
                    <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)]">
                        <div className="overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10 p-5 sm:p-6 md:p-8 bg-white/[0.02]">
                            <div className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-yellow-400 mb-5">
                                Premium Assistance
                            </div>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-4">
                                {isSubmitted ? "Thank you for your inquiry" : getModalHeading(intent)}
                            </h3>

                            <p className="text-white/70 leading-relaxed mb-6 text-sm sm:text-base">
                                {isSubmitted ? (
                                    <>
                                        We’ve received your request for{" "}
                                        <span className="text-white font-medium">{projectTitle}</span>.
                                        Our team will get back to you shortly.
                                    </>
                                ) : (
                                    <>
                                        Share your details and our team will connect with you regarding{" "}
                                        <span className="text-white font-medium">{projectTitle}</span>.
                                    </>
                                )}
                            </p>

                            <div className="space-y-4">
                                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                    <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                                        Project
                                    </p>
                                    <p className="text-white font-medium text-sm sm:text-base">
                                        {projectTitle || "N/A"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                    <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                                        Request Type
                                    </p>
                                    <p className="text-white font-medium text-sm sm:text-base">
                                        {getIntentLabel(intent)}
                                    </p>
                                </div>

                                {/* {!isSubmitted && (
                                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                        <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                                            Location Access
                                        </p>
                                        <p className="text-white font-medium text-sm sm:text-base">
                                            {locationStatus === "fetching" && "Requesting browser location..."}
                                            {locationStatus === "granted" && "Location captured"}
                                            {locationStatus === "denied" && "Location permission denied"}
                                            {locationStatus === "unavailable" && "Location not supported"}
                                            {(!locationStatus || locationStatus === "idle") &&
                                                "Please allow location for better inquiry tracking"}
                                        </p>
                                    </div>
                                )} */}
                            </div>
                        </div>

                        <div className="relative overflow-y-auto p-5 sm:p-6 md:p-8">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center hover:border-yellow-400/40 transition"
                            >
                                <FaTimes />
                            </button>

                            {isSubmitted ? (
                                <div className="min-h-[320px] sm:min-h-[420px] flex flex-col items-center justify-center text-center px-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                                        <FaCheckCircle className="text-green-400 text-3xl sm:text-4xl" />
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                                        Inquiry Submitted Successfully
                                    </h4>
                                    <p className="text-white/70 max-w-md text-sm sm:text-base">
                                        Thank you. Our team will review your request and contact you soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="space-y-4 pt-8 sm:pt-4">
                                    <div>
                                        <label className="text-sm text-white/80 mb-2 block">Full Name</label>
                                        <input
                                            name="fullName"
                                            value={contactForm.fullName}
                                            onChange={handleContactChange}
                                            placeholder="Enter your full name"
                                            className={`w-full rounded-2xl border bg-black/30 px-4 py-3 text-white outline-none ${errors.fullName
                                                    ? "border-red-500"
                                                    : "border-white/10 focus:border-yellow-400/50"
                                                }`}
                                        />
                                        {errors.fullName && (
                                            <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm text-white/80 mb-2 block">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={contactForm.email}
                                            onChange={handleContactChange}
                                            placeholder="Enter your email"
                                            className={`w-full rounded-2xl border bg-black/30 px-4 py-3 text-white outline-none ${errors.email
                                                    ? "border-red-500"
                                                    : "border-white/10 focus:border-yellow-400/50"
                                                }`}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm text-white/80 mb-2 block">Phone Number</label>

                                        <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-3">
                                            <select
                                                name="countryCode"
                                                value={contactForm.countryCode}
                                                onChange={handleContactChange}
                                                className="rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-white outline-none focus:border-yellow-400/50"
                                            >
                                                {countryCodes.map((item) => (
                                                    <option
                                                        key={item.code}
                                                        value={item.code}
                                                        className="bg-[#111] text-white"
                                                    >
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                name="phone"
                                                value={contactForm.phone}
                                                onChange={handleContactChange}
                                                placeholder="Enter phone number"
                                                className={`w-full rounded-2xl border bg-black/30 px-4 py-3 text-white outline-none ${errors.phone
                                                        ? "border-red-500"
                                                        : "border-white/10 focus:border-yellow-400/50"
                                                    }`}
                                            />
                                        </div>

                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div className="flex items-start gap-2 mt-2">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            checked={contactForm.terms}
                                            onChange={handleContactChange}
                                            className="mt-1 accent-yellow-500"
                                        />
                                        <label className="text-sm text-white/70">
                                            I accept all{" "}
                                            <span className="text-yellow-400 underline cursor-pointer">
                                                terms and conditions
                                            </span>
                                        </label>
                                    </div>
                                    {errors.terms && (
                                        <p className="text-sm text-red-400">{errors.terms}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full rounded-2xl bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black py-4 font-semibold hover:scale-[1.01] transition disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}