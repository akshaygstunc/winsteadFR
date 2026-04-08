"use client"
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa";
import ContactModal from "../ContactModal";
import Link from "next/link";
type ContactIntent =
    | "schedule-visit"
    | "download-floor-plan"
    | "request-brochure"
    | "book-consultation"
    | "general";
export default function ServicesCTA() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactIntent, setContactIntent] = useState<ContactIntent>("general");

    const [contactForm, setContactForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });
    const closeContactModal = () => {
        setIsContactModalOpen(false);
    };

    const handleContactChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setContactForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const getDefaultMessage = (intent: ContactIntent) => {
        switch (intent) {
            case "schedule-visit":
                return `I am interested in scheduling a private visit . Please contact me with available timings.`;
            case "download-floor-plan":
                return `I would like to receive the floor plan for`
                    ;
            case "request-brochure":
                return `Please share the latest brochure, pricing, and availability `;
            case "book-consultation":
                return `I would like to book a consultation regarding, financing options, and availability.`;
            default:
                return `I am interested. Please contact me with more details.`;
        }
    }
    const openContactModal = (intent: ContactIntent) => {
        setContactIntent(intent);
        setContactForm((prev) => ({
            ...prev,
            message: getDefaultMessage(intent, "", ""),
        }));
        setIsContactModalOpen(true);
    };
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...contactForm,
            intent: contactIntent,
            // projectId: project.id,
            // projectTitle: project.title,
            // floorPlan: activePlan?.label || "",
        };

        console.log("Contact Form Submit:", payload);

        // TODO:
        // connect API here
        // await fetch("/api/inquiry", { method: "POST", body: JSON.stringify(payload) })

        closeContactModal();
    };
    return (
        <section className="py-20 px-6 md:px-12">
            <div className="max-w-5xl mx-auto text-center rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-10 md:p-16">
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
                    Let’s Talk
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-5">
                    Find the right property path with more clarity and less guesswork.
                </h2>
                <p className="text-white-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    Whether you are exploring investments, ready residences, or leasing
                    opportunities, our team can help you move forward with confidence.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300 inline-flex items-center gap-2" onClick={() => openContactModal("general")}>
                        Get in Touch <FaArrowRight className="text-sm" />
                    </button>
                    <Link href="/projects" className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition duration-300">
                        View Properties
                    </Link>
                </div>
            </div>
            <ContactModal
                isOpen={isContactModalOpen}
                onClose={closeContactModal}
                onSubmit={handleContactSubmit}
                form={contactForm}
                onChange={handleContactChange}
                // projectTitle={project.title}
                intent={contactIntent}
            />
        </section>
    );
}