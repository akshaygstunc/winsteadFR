import Image from "next/image";
import heroImg from "../../public/blog3.png"; // replace with your skyline image
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed, FaDollarSign, FaRulerCombined } from "react-icons/fa6";
import img3 from "../../public/image_7.png";
import Script from "next/script";

export default function OurTeam({ params }: { params: { slug: string } }) {
  const teamPerson = "SOPHIE ";
  // params.slug.toUpperCase();
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-center">
        {/* IMAGE */}
        <Image src={heroImg} alt="hero" fill className="object-cover" />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-3xl">
          {/* LOGO TEXT */}
          <h1 className="hero-title text-4xl md:text-6xl font-bold tracking-wide mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 bg-clip-text text-transparent">
            {teamPerson}WINSTEAD
          </h1>

          {/* HEADING */}
          <h2 className="hero-sub text-xl md:text-3xl font-extrabold mb-4">
            A Legacy Of Excellence In Luxury Real Estate
          </h2>

          {/* DESCRIPTION */}
          <p className="hero-desc text-gray-300 text-sm md:text-base leading-relaxed">
            Winstead Properties is redefining the luxury real estate landscape
            with curated residential, commercial, and investment opportunities
            across prime global locations.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-6 md:px-12 py-16">
        {/* GRID */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* CARD */}
          <StatCard title="Upto 22%" desc="High Rental Returns" />
          <StatCard title="INR 3.1 Crores" desc="Starting Price" />
          <StatCard title="1%" desc="Easy Payment Plan" />

          {/* SECOND ROW CENTERED */}
          <div className="w-full flex justify-center gap-6 flex-wrap mt-4">
            <StatCard title="Upto 48%" desc="Capital Appreciation" />
            <StatCard title="Golden Visa" desc="Long Term Residency" />
          </div>
        </div>
      </section>
      <div className="bg-black text-white">
        <div className="bg-black text-white px-6 md:px-12 pt-4 pb-16">
          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-extrabold mb-8">
            {teamPerson}Projects
          </h1>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            <ProjectCard img={img3} />
            <ProjectCard img={img3} />
            <ProjectCard img={img3} />
            <ProjectCard img={img3} />
            <ProjectCard img={img3} />
            <ProjectCard img={img3} />
            <ProjectCard img={img3} />
            <ProjectCard img={img3} />
            <ProjectCard img={img3} />
          </div>
        </div>
      </div>
      <Script id="gsap-anim" strategy="afterInteractive">
        {`
  const loadGSAP = () => {
    if (!window.gsap) return;

    // HERO TEXT
    gsap.from(".hero-title", {
      y: 120,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    });

    gsap.from(".hero-sub", {
      y: 60,
      opacity: 0,
      delay: 0.3,
      duration: 1
    });

    gsap.from(".hero-desc", {
      y: 40,
      opacity: 0,
      delay: 0.6,
      duration: 1
    });

    // 🔥 WIGGLY STATS ANIMATION
 // STEP 1: ENTRY (important)
gsap.from(".stat-card", {
  y: 80,
  autoAlpha: 0,
  scale: 0.9,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
  onComplete: () => {

    // STEP 2: FLOAT (your code)
    gsap.to(".stat-card", {
      y: "-=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.15
    });

  }
});
    // PROJECT CARDS
    gsap.from(".project-card", {
      y: 120,
      opacity: 0,
      scale: 0.9,
      stagger: 0.08,
      duration: 0.8,
      delay: 1.2,
      ease: "power3.out"
    });
  };

  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
  script.onload = loadGSAP;
  document.body.appendChild(script);
`}
      </Script>
    </div>
  );
}

/* ================= CARD ================= */

function StatCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="stat-card opacity-100 translate-y-0 w-[260px] p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-yellow-400 ">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
function ProjectCard({ img }: { img: any }) {
  return (
    <div className="project-card relative rounded-2xl overflow-hidden group">
      {/* IMAGE */}
      <div className="relative h-[450px]">
        <Image
          src={img}
          alt="project"
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* TAG */}
      <div className="absolute top-4 left-4 bg-black/70 text-xs px-3 py-1 rounded-full border border-white/20">
        Ultra Luxury
      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 p-5 w-full">
        <h2 className="text-xl font-semibold mb-2">Aurelia Heights</h2>

        <div className="space-y-1 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <FaBed className="text-yellow-400 text-xs" />
            2-8
          </div>

          <div className="flex items-center gap-2">
            <FaDollarSign className="text-yellow-400 text-xs" />
            $2.3M – $3.8M
          </div>

          <div className="flex items-center gap-2">
            <FaRulerCombined className="text-yellow-400 text-xs" />
            2,800 – 7,200 sq.ft.
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-400 text-xs" />
            Downtown Dubai, UAE
          </div>
        </div>

        {/* BUTTON */}
        <button className="mt-4 w-full py-3 border border-white/20 rounded-xl text-sm hover:border-yellow-400 hover:text-white transition">
          Check Details
        </button>
      </div>
    </div>
  );
}
