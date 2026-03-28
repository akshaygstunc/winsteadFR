import Image from "next/image";
import banner from "../../public/services.png";
import img from "../../public/image_7.png";

const news = [
  {
    id: 1,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
  },
  {
    id: 2,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
  },
  {
    id: 3,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
  },
  {
    id: 4,
    title: "Luxury Living Redefined",
    desc: "A new wave of ultra-premium developments reshaping skylines.",
    date: "Dec 2025",
  },
];

export default function NewsMedia() {
  return (
    <div className="bg-black text-white">

      {/* 🔥 HEADER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-4">
        <h1 className="text-3xl md:text-4xl font-semibold animate-fadeUp">
          News & Media
        </h1>
      </div>

      {/* 🔥 HERO */}
      <div className="relative w-full h-[45vh] overflow-hidden">
        <Image
          src={banner}
          alt="News Banner"
          fill
          className="object-cover animate-zoomIn"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />

        <div className="absolute bottom-10 left-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 animate-fadeUp">
            Latest Insights & Updates
          </h2>
          <p className="text-gray-300 animate-fadeUp">
            Stay informed with the latest trends, market insights, and updates
            from the world of luxury real estate.
          </p>
        </div>
      </div>

      {/* 🔥 FEATURED ARTICLE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden animate-fadeUp">
            <Image src={img} alt="" fill className="object-cover" />
          </div>

          <div className="space-y-4 animate-fadeUp">
            <p className="text-sm text-gray-400">Featured</p>

            <h2 className="text-2xl md:text-3xl font-semibold">
              Dubai’s Luxury Property Market Sees Record Growth
            </h2>

            <p className="text-gray-400 leading-relaxed">
              High-net-worth investors continue to drive demand in Dubai’s
              premium real estate sector, setting new benchmarks in property
              value and lifestyle offerings.
            </p>

            <button className="mt-4 px-6 py-3 rounded-xl 
              bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)]
              text-black font-semibold hover:scale-105 transition">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* 🔥 NEWS GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">

        <h2 className="text-2xl font-semibold mb-10 animate-fadeUp">
          Latest Articles
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

          {news.map((item, i) => (
            <div
              key={item.id}
              className="group border border-white/10 rounded-2xl overflow-hidden 
              hover:border-[#F1DC7F] transition-all duration-300
              animate-fadeUp"
              style={{ animationDelay: `${i * 0.15}s` }}
            >

              {/* IMAGE */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-gray-400">{item.date}</p>

                <h3 className="text-lg font-semibold group-hover:text-[#F1DC7F] transition">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {item.desc}
                </p>

                <button className="text-sm 
                  bg-[linear-gradient(84.04deg,#B9A650,#F1DC7F,#7C5700)] 
                  bg-clip-text text-transparent font-semibold">
                  Read More →
                </button>
              </div>

            </div>
          ))}

        </div>
      </section>
    </div>
  );
}