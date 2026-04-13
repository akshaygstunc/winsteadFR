"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowRight, FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import heroImg from "../../public/blog3.png";
import memberImg from "../../public/female.png";
import memberImg2 from "../../public/male.png";
import memberImg3 from "../../public/male1.png";
import memberImg4 from "../../public/female1.png";
import memberImg5 from "../../public/male2.png";
import memberImg6 from "../../public/female2.png";
import TeamHero from "../components/teams/TeamHero";
import AutoBreadcrumbs from "../components/BreadCrumbs";

type TeamCategory =
  | "All"
  | "Leadership"
  | "Sales"
  | "Advisory"
  | "International"
  | "Leasing";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  category: Exclude<TeamCategory, "All">;
  image: StaticImageData;
  experience: string;
  languages: string[];
  tags: string[];
  slug: string;
};

const tabs: TeamCategory[] = [
  "All",
  "Leadership",
  "Sales",
  "Advisory",
  "International",
  "Leasing",
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sophie Williams",
    role: "Senior Luxury Property Advisor",
    category: "Leadership",
    image: memberImg,
    experience: "8+ Years Experience",
    languages: ["English", "Arabic"],
    tags: ["Luxury Homes", "Investor Advisory", "Prime Locations"],
    slug: "sophie-williams",
  },
  {
    id: 2,
    name: "Abbas Khan",
    role: "Investment Property Specialist",
    category: "Advisory",
    image: memberImg2,
    experience: "10+ Years Experience",
    languages: ["English", "Urdu", "Hindi"],
    tags: ["Off-Plan", "High ROI", "Portfolio Growth"],
    slug: "abbas-khan",
  },
  {
    id: 3,
    name: "Nadia Rahman",
    role: "Luxury Sales Consultant",
    category: "Sales",
    image: memberImg3,
    experience: "6+ Years Experience",
    languages: ["English", "Arabic"],
    tags: ["Waterfront", "Branded Residences", "Family Homes"],
    slug: "nadia-rahman",
  },
  {
    id: 4,
    name: "Daniel Morris",
    role: "International Client Advisor",
    category: "International",
    image: memberImg4,
    experience: "7+ Years Experience",
    languages: ["English", "French"],
    tags: ["Cross-Border Buyers", "Relocation", "Investment Planning"],
    slug: "daniel-morris",
  },
  {
    id: 5,
    name: "Aisha Noor",
    role: "Leasing & Portfolio Consultant",
    category: "Leasing",
    image: memberImg5,
    experience: "5+ Years Experience",
    languages: ["English", "Arabic"],
    tags: ["Premium Leasing", "Yield Focus", "Tenant Strategy"],
    slug: "aisha-noor",
  },
  {
    id: 6,
    name: "Zaid Malik",
    role: "Luxury Property Consultant",
    category: "Sales",
    image: memberImg6,
    experience: "9+ Years Experience",
    languages: ["English", "Hindi"],
    tags: ["Villas", "End Users", "Negotiation"],
    slug: "zaid-malik",
  },

];



function TeamTabsAndGrid() {
  const [activeTab, setActiveTab] = useState<TeamCategory>("All");

  const filteredMembers = useMemo(() => {
    if (activeTab === "All") return teamMembers;
    return teamMembers.filter((member) => member.category === activeTab);
  }, [activeTab]);

  return (
    <section className="bg-black text-white px-6 md:px-12 ">
        <section className="max-w-[85rem] mx-auto px-4 md:px-10 pt-6 py-8">
                       <AutoBreadcrumbs />
                     </section>
      <div className="max-w-[85rem] mx-auto">
        <div className="mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
              Explore Our Team
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
              A boutique team with a
              <span className="text-yellow-400"> global perspective</span>
            </h2>
          </div>

          <p className="text-white-400 text-sm lg:text-md lg:text-md md:text-base max-w-xl leading-relaxed">
            Browse our specialists by function and discover the expertise that
            supports every stage of your buying, leasing, or investment journey.
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm lg:text-md lg:text-md border transition ${isActive
                  ? "bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black border-transparent"
                  : "border-white/10 bg-white/[0.03] text-white hover:border-yellow-400/40 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* <div className="mb-8 text-sm lg:text-md lg:text-md text-white-400">
          Showing{" "}
          <span className="text-yellow-400 font-medium">
            {filteredMembers.length}
          </span>{" "}
          team member{filteredMembers.length !== 1 ? "s" : ""}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="group rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-yellow-400/30 hover:shadow-[0_0_40px_rgba(241,220,127,0.08)] transition duration-300"
            >
              <div className="relative h-[360px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-[11px] uppercase tracking-[0.18em] text-yellow-400">
                  {member.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="inline-block px-3 py-1.5 rounded-full bg-black/65 border border-white/10 text-xs text-white backdrop-blur-sm">
                    {member.experience}
                  </p>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-2xl font-semibold leading-tight">
                  {member.name}
                </h3>

                <p className="text-white mt-2 text-sm lg:text-md lg:text-md md:text-base">
                  {member.role}
                </p>
                <div className="flex gap-3 mt-6">
                  {[FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn, FaWhatsapp, FaYoutube].map(
                    (Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-10 h-10 rounded-full border border-yellow-500/60 flex items-center justify-center text-yellow-400 text-xl hover:bg-yellow-500 hover:text-black transition duration-300"
                      >
                        <Icon />
                      </a>
                    )
                  )}
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-white mb-3">
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.languages.map((language) => (
                      <span
                        key={language}
                        className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCTA() {
  return (
    <section className="px-6 md:px-12 pb-20 md:pb-24 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-white/[0.03] px-6 md:px-10 py-10 md:py-14">
          <div className="absolute top-0 left-[10%] h-[220px] w-[220px] rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute bottom-[-60px] right-[5%] h-[220px] w-[220px] rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-sm lg:text-md lg:text-md uppercase tracking-[0.25em] text-yellow-400 mb-3">
                Let’s Connect
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                Speak with the right expert for your next property move
              </h3>
              <p className="mt-4 text-white-400 text-base md:text-lg leading-relaxed">
                Whether you are buying, investing, or leasing, our advisors are
                ready to guide you with tailored market insight and premium
                support.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)] text-black px-6 py-3 rounded-full font-medium hover:scale-[1.03] transition inline-flex items-center gap-2">
                Book Consultation
                <FaArrowRight className="text-sm lg:text-md lg:text-md" />
              </button>

              <button className="border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:border-yellow-400 hover:text-yellow-400 transition">
                Explore Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <main className="bg-black text-white">
      <TeamHero />
      <TeamTabsAndGrid />
      {/* <TeamCTA /> */}
    </main>
  );
}