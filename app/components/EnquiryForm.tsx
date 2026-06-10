"use client"
import { toast } from "react-toastify";
import React, { useEffect,useState } from "react"
import WebsiteContentService from "../services/websitecontent.service";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

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
export default function EnquiryForm() {
      const route = useRouter();
//   function getModalHeading(intent: ContactIntent) {
//     switch (intent) {
//       case "schedule-visit":
//         return "Schedule your private project visit";
//       case "download-floor-plan":
//         return "Request detailed floor plan access";
//       case "request-brochure":
//         return "Get the full project brochure";
//       case "book-consultation":
//         return "Book a premium consultation";
//       default:
//         return "Connect with our property team";
//     }
//   }

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
    city: string | null;
    country: string | null;
  } | null>(null);
  useEffect(() => {
    async function fetchLoc() {
      if (typeof window !== "undefined" && navigator.geolocation) {
        // Implementation for fetching location
        setLocationStatus("fetching");
        setBrowserLocation({
          city: localStorage.getItem("city"),
          country: localStorage.getItem("country"),
        });
      }
    }
    fetchLoc();
  }, []);
  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
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
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      const payload = {
        contact: {
          fullName: contactForm.fullName.trim(),
          email: contactForm.email.trim(),
          phone: `${contactForm.countryCode}${contactForm.phone}`.replace(
            /\s+/g,
            "",
          ),
          location:
            browserLocation?.city && browserLocation?.country
              ? `${browserLocation.city}, ${browserLocation.country}`
              : "",
        },
        // ✅ PROPERTY DATA
        projectTitle: "General Inquiry",
        intent: "general",
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
          ipAddress: ipData?.ip || "",
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
        },
        browserLocation: {
          city: browserLocation?.city ?? null,
          country: browserLocation?.country ?? null,
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

      route.push("/thank-you");
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again later.");
      console.error("Failed to submit inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        setBrowserLocation({
          city: data.city,
          country: data.country_name,
        });

        // optional: store for reuse
        localStorage.setItem("city", data.city);
        localStorage.setItem("country", data.country_name);
      } catch (err) {
        console.error("Location fetch failed", err);
      }
    }

    fetchLocation();
  }, []);

//   if (!isOpen) return null;

  return (
    <div className=" ">
    

      <div className=" flex  items-center justify-center  sm:px-4 sm:py-6">
        
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-2  sm:pt-4"
                >
                  <div>
                    <label className="text-sm text-white mb-2 block">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={contactForm.fullName}
                      onChange={handleContactChange}
                      placeholder="Enter your full name"
                      className={`w-full rounded-2xl border bg-black/30 px-4 py-3 text-white outline-none ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-yellow-400/50 focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.25)]"
                      }
  focus:outline-none
                                                }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-white mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="Enter your email"
                      className={`w-full rounded-2xl border bg-black/30 px-4 py-3 text-white outline-none ${
                        errors.email
                          ? "border-red-500"
                          : "border-yellow-400/50 focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.25)]"
                      }
  focus:outline-none
                                                }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-white mb-2 block">
                      Phone Number
                    </label>

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
                        className={`w-full rounded-2xl border bg-black/30 px-4 py-3 text-white outline-none ${
                          errors.phone
                            ? "border-red-500"
                            : "border-yellow-400/50 focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.25)]"
                        }
  focus:outline-none     }`}
                      />
                    </div>

                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.phone}
                      </p>
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
                    <label className="text-sm text-white">
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
              
            </div>
          </div>
      
    
  );
}