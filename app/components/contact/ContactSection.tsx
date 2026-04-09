import { FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import InfoCard from "./InfoCard";
export default function ContactSection({ contactPoints }: { contactPoints: string[] }) {
    return (
        <section className="py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
                {/* LEFT SIDE */}
                <div className="space-y-8">
                    <div>
                        <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.25em] text-yellow-400 mb-3">
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
                            value="2601, Iris Bay, Business Bay, Dubai
Dubai, UAE"
                        />
                    </div>

                </div>

                {/* RIGHT SIDE FORM */}
                <div className="rounded-[32px] border border-yellow-500/20 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-[0_0_40px_rgba(250,204,21,0.08)]">
                    <div className="mb-8">
                        <p className="text-sm lg:text-xl lg:text-xl uppercase tracking-[0.22em] text-white-400 mb-2">
                            Inquiry Form
                        </p>
                        <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                            Register Your Interest in{" "}
                            <span className="text-yellow-400">Aurelia Heights</span>
                        </h3>
                    </div>

                    <form className="space-y-5">
                        {/* FULL NAME */}
                        <div>
                            <label className="text-sm lg:text-xl lg:text-xl mb-2 block text-white-300">Full Name</label>
                            <input
                                placeholder="Enter your full name"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white-500 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.12)] transition"
                            />
                        </div>

                        {/* PHONE + EMAIL */}
                        {/* <div className="grid md:grid-cols-2 gap-4"> */}
                            <div>
                                <label className="text-sm lg:text-xl lg:text-xl mb-2 block text-white-300">Phone</label>
                                <div className="flex items-center bg-black/40 border border-white/10 rounded-2xl px-4 py-4 focus-within:border-yellow-400 focus-within:shadow-[0_0_14px_rgba(241,220,127,0.12)] transition">
                                    <div className="w-6 h-4 mr-2 rounded-sm bg-[linear-gradient(to_bottom,#00732f_33%,#fff_33%,#fff_66%,#000_66%)]" />
                                    <span className="text-white-300 mr-3">+971</span>
                                    <input
                                        className="bg-transparent outline-none flex-1 text-white placeholder:text-white-500"
                                        placeholder="Enter phone"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm lg:text-xl lg:text-xl mb-2 block text-white-300">Email</label>
                                <input
                                    placeholder="Enter your email"
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white-500 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.12)] transition"
                                />
                            </div>
                        {/* </div> */}

                        {/* SELECTS */}
                        {/* <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm lg:text-xl lg:text-xl mb-2 block text-white-300">Project Type</label>
                                <select className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.12)] transition">
                                    <option>Apartment</option>
                                    <option>Villa</option>
                                    <option>Penthouse</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm lg:text-xl lg:text-xl mb-2 block text-white-300">Bedrooms</label>
                                <select className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.12)] transition">
                                    <option>1 Bedroom</option>
                                    <option>2 Bedrooms</option>
                                    <option>3 Bedrooms</option>
                                    <option>4+ Bedrooms</option>
                                </select>
                            </div>
                        </div> */}

                        {/* MESSAGE */}
                        {/* <div>
                            <label className="text-sm lg:text-xl lg:text-xl mb-2 block text-white-300">Message</label>
                            <textarea
                                rows={5}
                                placeholder="Tell us what kind of property or opportunity you are looking for"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white-500 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_14px_rgba(241,220,127,0.12)] transition resize-none"
                            />
                        </div> */}

                        {/* SUBMIT */}
                        <button
                            className="w-full mt-2 py-4 rounded-2xl bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] text-black text-lg font-semibold hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(241,220,127,0.22)] transition-all duration-300 inline-flex items-center justify-center gap-2"
                        >
                            Submit Inquiry
                            <FaArrowRight className="text-sm lg:text-xl lg:text-xl" />
                        </button>

                        {/* FOOTER TEXT */}
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