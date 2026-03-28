import Image from "next/image";
import banner from "../../public/services.png";
import img from "../../public/image_7.png";
import { FaArrowRight } from "react-icons/fa";

const news = [
  {
    id: 1,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
    category: "Market Update",
  },
  {
    id: 2,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
    category: "Investment",
  },
  {
    id: 3,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
    category: "Off-Plan",
  },
  {
    id: 4,
    title: "Luxury Living Redefined",
    desc: "A new wave of ultra-premium developments reshaping skylines.",
    date: "Dec 2025",
    category: "Luxury Trends",
  },
];

export default function NewsMedia() {
  return (
    <div className="bg-black text-white">
      <NewsHero />
      <MarketBrief />
      <FeaturedStory />
      <LatestArticles />
      <NewsCTA />
    </div>
  );
}

/* ================= HERO ================= */

function NewsHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <Image
          src={banner}
          alt="News Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.28em] text-yellow-400 mb-4">
            News & Media
          </p>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold leading-[1.05] max-w-5xl">
            Editorial insights from the world of
            <span className="text-yellow-400"> luxury real estate.</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
            Stay ahead with curated market movements, premium property trends,
            and real estate intelligence shaping the next wave of opportunity.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {["Market Trends", "Luxury Insights", "Investment Signals"].map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-200 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= MARKET BRIEF ================= */

function MarketBrief() {
  const briefs = [
    {
      label: "Prime Demand",
      value: "Rising",
      desc: "Luxury demand continues to remain resilient across premium districts.",
    },
    {
      label: "Investor Sentiment",
      value: "Strong",
      desc: "Capital continues to favor high-growth, design-led developments.",
    },
    {
      label: "Off-Plan Activity",
      value: "Active",
      desc: "Flexible structures and appreciation outlook are driving interest.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {briefs.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6 hover:bg-white/10 transition duration-300"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-3">
              {item.label}
            </p>
            <h3 className="text-2xl font-semibold mb-2">{item.value}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= FEATURED STORY ================= */

function FeaturedStory() {
  return (
    <section className="py-20 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
            Featured Story
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            The defining trends shaping luxury real estate in 2026.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="relative h-[360px] md:h-[520px] rounded-[28px] overflow-hidden border border-yellow-500/20 shadow-[0_0_40px_rgba(250,204,21,0.08)]">
            <Image src={img} alt="Featured Story" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-black/70 border border-white/10 text-xs uppercase tracking-[0.18em] text-yellow-400 backdrop-blur-sm">
              Featured Insight
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.22em] text-gray-400">
              March 2026
            </p>

            <h3 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
              Dubai’s luxury property market continues to set new benchmarks.
            </h3>

            <p className="text-gray-400 leading-relaxed text-base md:text-lg">
              High-net-worth investors are continuing to reshape demand across
              the premium property segment, with design-led developments,
              waterfront locations, and branded residences remaining at the
              center of attention.
            </p>

            <p className="text-gray-400 leading-relaxed text-base md:text-lg">
              As capital becomes more selective, curated real estate strategies
              are proving more valuable than broad market exposure.
            </p>

            <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:scale-105 transition duration-300">
              Read Full Story <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= LATEST ARTICLES ================= */

function LatestArticles() {
  return (
    <section className="py-20 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
              Latest Articles
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Curated updates from the market.
            </h2>
          </div>

          <button className="border border-yellow-500 text-yellow-400 px-5 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition">
            View All Articles
          </button>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="group rounded-[24px] overflow-hidden border border-white/10 bg-white/5 hover:border-yellow-500/30 transition duration-300"
            >
              <div className="relative h-[260px] overflow-hidden">
                <Image
                  src={img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[11px] uppercase tracking-[0.15em] text-yellow-400 backdrop-blur-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                  {item.date}
                </p>

                <h3 className="text-xl font-semibold leading-snug group-hover:text-yellow-300 transition">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

                <button className="inline-flex items-center gap-2 text-sm text-yellow-400 font-medium hover:text-white transition">
                  Read More <FaArrowRight className="text-xs" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CTA ================= */

function NewsCTA() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto rounded-[32px] border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-white/5 to-yellow-500/10 p-10 md:p-16 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400 mb-3">
          Stay Connected
        </p>

        <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-5">
          Follow the market with sharper insight and more perspective.
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Explore curated updates, premium property intelligence, and real
          estate signals designed for more informed decisions.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition duration-300">
            Explore More Insights
          </button>
          <button className="border border-yellow-500 text-yellow-400 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition duration-300">
            Contact Winstead
          </button>
        </div>
      </div>
    </section>
  );
}