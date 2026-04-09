"use client";

import { useState } from "react";
import {
    FaArrowRight,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { toast } from "react-toastify";
import InfoCard from "./InfoCard";
import WebsiteContentService from "@/app/services/websitecontent.service";

type ContactSectionProps = {
    contactPoints: string[];
};

type FormData = {
    fullName: string;
    phone: string;
    email: string;
};

type FormErrors = {
    fullName?: string;
    phone?: string;
    email?: string;
};

export default function ContactSection({ contactPoints }: ContactSectionProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        countryCode: "+971",
    });
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
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        const fullName = formData.fullName.trim();
        const phone = formData.phone.trim();
        const email = formData.email.trim();

        if (!fullName) {
            newErrors.fullName = "Full name is required";
        } else if (fullName.length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            newErrors.fullName = "Full name should contain only letters";
        }

        if (!phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d+$/.test(phone)) {
            newErrors.phone = "Phone number should contain only digits";
        } else if (phone.length < 7 || phone.length > 15) {
            newErrors.phone = "Phone number must be between 7 and 15 digits";
        }

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        try {
            setIsSubmitting(true);

            const payload = {
                contact: {
                    fullName: formData.fullName.trim(),
                    email: formData.email.trim(),
                    phone: `+971${formData.phone.trim()}`,
                    location: "",
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
                    browser:
                        typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
                    browserVersion: "",
                    ipAddress: "",
                    userAgent:
                        typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
                },
                browserLocation: {
                    latitude: null,
                    longitude: null,
                },
            };

            await WebsiteContentService.createContactQuery(payload);

            toast.success("Inquiry submitted successfully.");

            setFormData({
                fullName: "",
                phone: "",
                email: "",
            });

            setErrors({});
        } catch (error) {
            console.error("Failed to submit inquiry:", error);
            toast.error("Failed to submit inquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-8 px-6 md:px-12">
            <div className="max-w-[85rem] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
                <div className="space-y-8">
                    <div>
                        <p className="text-sm lg:text-xl uppercase tracking-[0.25em] text-yellow-400 mb-3">
                            Get In Touch
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
                            Register your interest with a more premium experience.
                        </h2>
                        <p className="text-white-400 leading-relaxed max-w-xl">
                            Share your preferences and our team will connect with relevant
                            options, next steps, and a more personalized property discussion.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {contactPoints.map((point, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                            >
                                <IoMdCheckboxOutline className="text-yellow-400 w-6 h-6 mt-0.5 shrink-0" />
                                <p className="text-white-300 leading-relaxed">{point}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 pt-2">
                        <InfoCard
                            icon={<FaPhoneAlt />}
                            label="Phone"
                            value="+971 54 755 8866"
                        />
                        <InfoCard
                            icon={<FaEnvelope />}
                            label="Email"
                            value="info@winsteadglobal.com"
                        />
                        <InfoCard
                            icon={<FaMapMarkerAlt />}
                            label="Location"
                            value={`2601, Iris Bay, Business Bay, Dubai
Dubai, UAE`}
                        />
                    </div>
                </div>

                <div className="rounded-[32px] border border-yellow-500/20 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-[0_0_40px_rgba(250,204,21,0.08)]">
                    <div className="mb-8">
                        <p className="text-sm lg:text-xl uppercase tracking-[0.22em] text-white-400 mb-2">
                            Inquiry Form
                        </p>
                        <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                            Register Your Interest in{" "}
                            <span className="text-yellow-400">Aurelia Heights</span>
                        </h3>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label className="text-sm lg:text-xl mb-2 block text-white-300">
                                Full Name
                            </label>
                            <input
                                value={formData.fullName}
                                onChange={(e) => handleChange("fullName", e.target.value)}
                                placeholder="Enter your full name"
                                className={`w-full bg-black/40 border rounded-2xl px-5 py-4 text-white placeholder:text-white-500 focus:outline-none transition ${errors.fullName
                                        ? "border-red-500"
                                        : "border-white/10 focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.12)]"
                                    }`}
                            />
                            {errors.fullName && (
                                <p className="mt-2 text-sm text-red-400">{errors.fullName}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm lg:text-xl mb-2 block text-white-300">
                                Phone
                            </label>

                            <div className="grid grid-cols-[130px_1fr] gap-3">

                                {/* Country Code Dropdown */}
                                <select
                                    value={formData.countryCode}
                                    onChange={(e) => handleChange("countryCode", e.target.value)}
                                    className="rounded-2xl border border-white/10 bg-black/40 px-3 py-4 text-white outline-none focus:border-yellow-400"
                                >
                                    {countryCodes.map((item) => (
                                        <option key={item.code} value={item.code} className="bg-[#111]">
                                            {item.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Phone Input */}
                                <input
                                    value={formData.phone}
                                    onChange={(e) =>
                                        handleChange("phone", e.target.value.replace(/\D/g, ""))
                                    }
                                    placeholder="Enter phone number"
                                    maxLength={15}
                                    className={`w-full bg-black/40 border rounded-2xl px-4 py-4 text-white placeholder:text-white-500 outline-none ${errors.phone
                                            ? "border-red-500"
                                            : "border-white/10 focus:border-yellow-400"
                                        }`}
                                />
                            </div>

                            {errors.phone && (
                                <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm lg:text-xl mb-2 block text-white-300">
                                Email
                            </label>
                            <input
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="Enter your email"
                                className={`w-full bg-black/40 border rounded-2xl px-5 py-4 text-white placeholder:text-white-500 focus:outline-none transition ${errors.email
                                        ? "border-red-500"
                                        : "border-white/10 focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.12)]"
                                    }`}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-2 py-4 rounded-2xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black text-lg font-semibold hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(241,220,127,0.22)] transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                            {!isSubmitting && <FaArrowRight className="text-sm lg:text-xl" />}
                        </button>

                        <p className="text-xs text-white-500 text-center mt-3 leading-relaxed">
                            By submitting this form, you agree to our{" "}
                            <span className="text-yellow-400">Terms & Conditions</span> and{" "}
                            <span className="text-yellow-400">Privacy Policy</span>.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}