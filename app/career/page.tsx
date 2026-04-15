"use client";

import Link from "next/link";
// import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaChartLine,
  FaClock,
  FaHandshake,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import Image from "next/image";
import banner from "../../public/hero1.jpg";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";
import WebsiteContentService from "../services/websitecontent.service";
const openings = [
  {
    id: "property-consultant",
    title: "Property Consultant",
    department: "Sales",
    type: "Full Time",
    location: "Dubai",
    experience: "2+ Years",
    description:
      "Guide buyers and investors through premium property opportunities, build strong relationships, and drive high-value closings.",
  },
  {
    id: "real-estate-sales-manager",
    title: "Real Estate Sales Manager",
    department: "Sales Leadership",
    type: "Full Time",
    location: "Dubai",
    experience: "4+ Years",
    description:
      "Lead the sales team, improve conversion performance, manage targets, and create strong pipelines across off-plan and secondary market opportunities.",
  },
  {
    id: "client-relationship-executive",
    title: "Client Relationship Executive",
    department: "Customer Success",
    type: "Full Time",
    location: "Dubai / Hybrid",
    experience: "2+ Years",
    description:
      "Support clients across inquiries, viewings, onboarding, and post-sale coordination while delivering a premium service experience.",
  },
  {
    id: "real-estate-marketing-specialist",
    title: "Real Estate Marketing Specialist",
    department: "Marketing",
    type: "Full Time",
    location: "Dubai / Remote",
    experience: "3+ Years",
    description:
      "Plan and execute campaigns, listings promotion, lead generation, and brand growth for luxury and investment-focused property segments.",
  },
  {
    id: "leasing-consultant",
    title: "Leasing Consultant",
    department: "Leasing",
    type: "Full Time",
    location: "Dubai",
    experience: "1+ Years",
    description:
      "Manage rental inquiries, property tours, negotiations, and tenant coordination with a polished, service-led approach.",
  },
  {
    id: "crm--operations-coordinator",
    title: "CRM & Operations Coordinator",
    department: "Operations",
    type: "Full Time",
    location: "Dubai",
    experience: "2+ Years",
    description:
      "Maintain lead quality, support internal sales processes, manage CRM workflows, and keep day-to-day property operations organized.",
  },
];

const benefits = [
  {
    icon: <FaBuilding className="text-yellow-400" />,
    title: "Premium Real Estate Brand",
    text: "Be part of a business focused on high-quality developments, strong presentation standards, and serious market positioning.",
  },
  {
    icon: <FaHandshake className="text-yellow-400" />,
    title: "High-Value Client Exposure",
    text: "Work directly with buyers, investors, landlords, and partners across premium and opportunity-rich property segments.",
  },
  {
    icon: <FaChartLine className="text-yellow-400" />,
    title: "Performance-Driven Growth",
    text: "Join a team that rewards initiative, consistency, relationship-building, and strong commercial outcomes.",
  },
  {
    icon: <FaUsers className="text-yellow-400" />,
    title: "Collaborative Team Culture",
    text: "Work with ambitious professionals who care about service, speed, execution, and long-term brand value.",
  },
];
function JobSkeleton() {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8 animate-pulse">
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="h-9 w-28 rounded-full bg-white/10" />
        <div className="h-9 w-24 rounded-full bg-white/10" />
        <div className="h-9 w-32 rounded-full bg-white/10" />
      </div>

      <div className="h-8 w-1/2 bg-white/10 rounded mb-4" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-white/10 rounded" />
        <div className="h-4 w-5/6 bg-white/10 rounded" />
      </div>

      <div className="h-4 w-40 bg-white/10 rounded" />
    </div>
  );
}
export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [careerData, setCareerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await WebsiteContentService.GetCareers();
        console.log(res)


        setCareerData(res);
      } catch (error) {
        console.log("Career fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black text-white">
        {/* IMAGE */}
        <div className="absolute inset-0">
          <Image
            src={banner}
            alt="News Banner"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* OVERLAY (only for readability, not full dark) */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* CONTENT (BOTTOM LEFT ONLY) */}
        <div className="relative z-10 h-full flex items-end justify-center">
          <div className="w-full max-w-7xl  px-6 md:px-12 pb-14 md:pb-20">
            <div className="max-w-xl text-left ">
              <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
                Career
              </p>

              <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
                Build a career
                <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                  in premium real estate.
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* BOTTOM GOLD LINE */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
        <AutoBreadcrumbs />
      </section>
      <section
        id="culture"
        className="max-w-7xl mx-auto px-4 md:px-10 pt-16 md:pb-20"
      >
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.22em] text-yellow-400 mb-3">
              Our Culture
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-5">
              Professional standards. Relationship-first mindset.
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              Real estate is driven by trust, speed, and presentation. We bring
              those together with a premium brand approach, sharp execution, and
              a strong focus on delivering real value for buyers, investors,
              landlords, and partners.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Client trust comes first",
                "Strong presentation matters",
                "Speed and follow-up drive results",
                "Execution beats empty promises",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="open-roles"
        className="max-w-7xl mx-auto px-4 md:px-10 pb-16 md:pb-20"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.22em] text-yellow-400 mb-3">
              Open Positions
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
              Current opportunities
            </h2>
          </div>
          <p className="max-w-2xl text-gray-400 leading-relaxed">
            We are looking for ambitious professionals across sales, leasing,
            client servicing, marketing, and operations who can help elevate the
            full real estate journey.
          </p>
        </div>

        <div className="grid gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <JobSkeleton key={i} />)
            : careerData.map((job) => (
              <div
                key={job.id}
                className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8 hover:border-yellow-400/25 transition"
              >
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-3 mb-4">
              <Tag icon={<FaBriefcase />} text={job?.data?.department} />
              <Tag icon={<FaClock />} text={job?.data?.employmentType} />
              <Tag icon={<FaMapMarkerAlt />} text={job?.data?.location} />
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              {job.title}
            </h3>

            <p className="text-gray-300 leading-relaxed mb-4">
              {job.subtitle}
            </p>

            <p className="text-sm text-gray-500">
              Experience Required: {job.experience}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row xl:flex-col gap-3 xl:min-w-[200px]">
            <button
              onClick={() => setSelectedJob(job)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-6 py-3.5 font-semibold text-black hover:scale-[1.02] transition"
            >
              Apply Now
              <FaArrowRight className="text-sm" />
            </button>

            <Link
              href={`/career/${job.slug}`}
              className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 font-medium text-white hover:border-yellow-400/35 hover:text-yellow-300 transition text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    ))}
        </div>
        {selectedJob && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">

            {/* Background click close */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedJob(null)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-3xl bg-[#0c0c0c] rounded-3xl p-6 md:p-8 border border-white/10 overflow-y-auto max-h-[90vh]">

              {/* CLOSE */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-5 text-white text-2xl"
              >
                ✕
              </button>

              {/* TITLE */}
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Apply for {selectedJob.title}
              </h2>

              {/* JOB INFO */}
              <div className="flex flex-wrap gap-3 mb-6 text-sm lg:text-md lg:text-md text-gray-300">
                <span className="border border-white/10 px-3 py-1 rounded-full">
                  {selectedJob?.data?.department}
                </span>
                <span className="border border-white/10 px-3 py-1 rounded-full">
                  {selectedJob?.data?.location}
                </span>
                <span className="border border-white/10 px-3 py-1 rounded-full">
                  {selectedJob?.data?.employmentType}
                </span>
              </div>

              {/* FORM */}
              <form className="space-y-4">

                <input
                  placeholder="Full Name"
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                />

                <input
                  placeholder="Email"
                  type="email"
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                />

                <input
                  placeholder="Phone"
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                />

                <input
                  placeholder="Address"
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                />

                {/* RESUME UPLOAD */}


                {/* SOCIAL LINKS */}
                <div className="mt-6">
                  <p className="text-sm lg:text-md lg:text-md text-gray-400 mb-3">Social Profiles </p>

                  <div className="space-y-3">

                    {/* FACEBOOK */}
                    <div className="flex items-center gap-3">
                      <FaFacebookF className="text-yellow-400 text-lg" />
                      <input
                        type="url"
                        placeholder="Facebook profile link"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
                      />
                    </div>

                    {/* INSTAGRAM */}
                    <div className="flex items-center gap-3">
                      <FaInstagram className="text-yellow-400 text-lg" />
                      <input
                        type="url"
                        placeholder="Instagram profile link"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
                      />
                    </div>

                    {/* TWITTER */}
                    <div className="flex items-center gap-3">
                      <FaTwitter className="text-yellow-400 text-lg" />
                      <input
                        type="url"
                        placeholder="Twitter (X) profile link"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
                      />
                    </div>

                    {/* TIKTOK */}
                    <div className="flex items-center gap-3">
                      <FaTiktok className="text-yellow-400 text-lg" />
                      <input
                        type="url"
                        placeholder="TikTok profile link"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
                      />
                    </div>

                    {/* YOUTUBE */}
                    <div className="flex items-center gap-3">
                      <FaYoutube className="text-yellow-400 text-lg" />
                      <input
                        type="url"
                        placeholder="YouTube channel link"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
                      />
                    </div>
                    <div className="border border-dashed border-white/20 rounded-xl p-4 ">
                      <p className="text-sm lg:text-md lg:text-md text-gray-400 mb-2">
                        Upload Resume (PDF / DOC)
                      </p>
                      <input type="file" className="text-white text-sm lg:text-md lg:text-md" />
                    </div>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full mt-6 py-3 rounded-xl bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black font-semibold"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
        <div className="relative overflow-hidden rounded-[34px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-8 md:p-12">
          <div className="absolute top-0 left-[10%] h-[220px] w-[220px] rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute bottom-[-60px] right-[5%] h-[220px] w-[220px] rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                Don’t See Your Role?
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
                Great real estate talent does not always fit inside a standard
                job title.
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you believe you can add value across sales, client
                relationships, leasing, operations, or marketing, send us your
                profile and let’s talk.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-7 py-4 font-semibold text-black hover:scale-[1.03] transition"
            >
              Send Your Application
              <FaArrowRight className="text-sm lg:text-md lg:text-md" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/25 p-6 md:p-7 min-h-[160px] flex flex-col justify-between">
      <p className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)]">
        {value}
      </p>
      <p className="text-gray-300 text-sm lg:text-md lg:text-md md:text-base">{label}</p>
    </div>
  );
}

function Tag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm lg:text-md lg:text-md text-gray-300">
      <span className="text-yellow-400">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
