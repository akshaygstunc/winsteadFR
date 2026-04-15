"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBriefcase, FaClock, FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";
import serviceImg from "../../../public/hero1.jpg";
import Image from "next/image";
import WebsiteContentService from "@/app/services/websitecontent.service";
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
    responsibilities: [
      "Handle property inquiries and client consultations",
      "Conduct property viewings and presentations",
      "Build long-term client relationships",
      "Close high-value real estate deals",
    ],
    requirements: [
      "Strong communication skills",
      "Real estate experience preferred",
      "Sales-driven mindset",
      "Knowledge of Dubai market",
    ],
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

export default function CareerDetailPage() {
  const [jobData, setJobData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const params = useParams();
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await WebsiteContentService.GetCareers();
        console.log(res)

        const job = res?.filter((item: any) => item.slug === params.id);
        console.log(job[0])
        setJobData(job[0]);
      } catch (error) {
        console.log("Career fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);
  console.log(jobData)
  return (
    <div className="min-h-screen bg-black text-white">

      {/* 🔥 HERO */}
      {/* <section className="relative h-[50vh] flex items-end bg-gradient-to-r from-black/80 to-black/40">
        <div className="max-w-7xl mx-auto px-6 pb-10">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm lg:text-md lg:text-md mb-2">
            Career Opportunity
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            {job.title}
          </h1>
        </div>
      </section> */}
      <section className="relative h-[40vh] min-h-[600px] w-full overflow-hidden bg-black text-white">

        {/* IMAGE */}
        <div className="absolute inset-0">
          <Image
            src={serviceImg}
            alt="Winstead Services"
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
                Career Opportunity
              </p>

              {/* <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
                                     
                                     
                                 </h1> */}


            </div>

          </div>
        </div>

        {/* BOTTOM GOLD LINE */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />

      </section>

      {/* 🔥 CONTENT */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-14">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">

          {/* LEFT SIDE */}
          <div>
            <span className="text-2xl mb-10 block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
              {jobData?.title}
            </span>
            {/* Overview */}
            <div className="mb-10">
              {/* <h2 className="text-2xl font-semibold mb-4">Overview</h2> */}
              <div
                className="
        prose prose-invert max-w-none
        prose-p:text-gray-300
        prose-p:leading-relaxed
        prose-headings:text-white
        prose-headings:font-semibold
        prose-strong:text-yellow-400
        prose-a:text-yellow-400
        prose-li:text-gray-300
      "
                dangerouslySetInnerHTML={{ __html: jobData?.description || "" }}
              />
            </div>

          </div>

          {/* RIGHT SIDE (SIDEBAR) */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 h-fit sticky top-10">

            <h3 className="text-xl font-semibold mb-6">Job Details</h3>

            <div className="space-y-4 text-sm lg:text-md lg:text-md text-gray-300">

              <div className="flex items-center gap-3">
                <FaBriefcase className="text-yellow-400" />
                {jobData?.data?.department}
              </div>

              <div className="flex items-center gap-3">
                <FaClock className="text-yellow-400" />
                {jobData?.data?.employmentType}
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-yellow-400" />
                {jobData?.data?.location}
              </div>

              {/* <div>
                <span className="text-yellow-400">Experience:</span>{" "}
                {jobData?.data?.experience}
              </div> */}
            </div>

            {/* CTA */}
            <button
              onClick={() => setSelectedJob(jobData)}
              className="mt-8 w-full inline-flex items-center justify-center rounded-full bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] px-6 py-3 font-semibold text-black hover:scale-[1.02] transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
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
                {selectedJob.department}
              </span>
              <span className="border border-white/10 px-3 py-1 rounded-full">
                {selectedJob.location}
              </span>
              <span className="border border-white/10 px-3 py-1 rounded-full">
                {selectedJob.type}
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
              <div className="border border-dashed border-white/20 rounded-xl p-4 text-center">
                <p className="text-sm lg:text-md lg:text-md text-gray-400 mb-2">
                  Upload Resume (PDF / DOC)
                </p>
                <input type="file" className="text-white text-sm lg:text-md lg:text-md" />
              </div>

              {/* SOCIAL LINKS */}
              <div className="mt-6">
                <p className="text-sm lg:text-md lg:text-md text-gray-400 mb-3">Social Profiles (Optional)</p>

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
    </div>
  );
}