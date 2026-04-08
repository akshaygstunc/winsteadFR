"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AutoBreadcrumbs from "../../components/BreadCrumbs";

import Img1 from "../../../public/hero5.png";
import Img2 from "../../../public/hero1.jpg";
import Img3 from "../../../public/hero2.png";
import Img4 from "../../../public/hero3.jpg";

const news = [
  {
    id: 1,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    fullDesc:
      "Dubai’s real estate market has reached new heights driven by strong international demand, investor confidence, and luxury developments across prime locations.",
    date: "March 2026",
    img: Img1,
    category: "Market Update",
  },
  {
    id: 2,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    fullDesc:
      "Emerging communities across Dubai and Abu Dhabi are attracting investors due to strong ROI and infrastructure growth.",
    date: "Feb 2026",
    img: Img2,
    category: "Investment",
  },
  {
    id: 3,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    fullDesc:
      "Off-plan properties are gaining traction due to flexible payment plans and high capital appreciation potential.",
    date: "Jan 2026",
    img: Img4,
    category: "Off-Plan",
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const blog = news.find((item) => item.id == params.id);

  if (!blog) return notFound();

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="relative h-[65vh]">
        <Image src={blog.img} alt={blog.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <p className="text-yellow-400 uppercase text-sm tracking-[0.2em] mb-3">
            {blog.category}
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
            {blog.title}
          </h1>

          <p className="text-gray-300 text-sm">{blog.date}</p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="max-w-4xl  px-6 py-6">
        <AutoBreadcrumbs />
      </div>

      {/* ARTICLE CONTENT */}
      <section className="max-w-[88rem] mx-auto px-6 pb-16">

        {/* INTRO */}
        <p className="text-xl md:text-2xl text-white/85 leading-relaxed mb-10">
          {blog.desc}
        </p>

        {/* BODY */}
        <div className="space-y-8 text-white/75 leading-8 text-base md:text-lg">

          <p>{blog.fullDesc}</p>

          {/* SUB HEADING */}
          <h2 className="text-2xl md:text-3xl font-semibold text-white pt-4">
            Why Dubai Market is Growing
          </h2>

          <p>
            Dubai continues to position itself as a global real estate hub with
            investor-friendly policies, strong infrastructure, and tax advantages.
          </p>

          <p>
            The luxury segment is seeing exponential growth with high-net-worth
            individuals investing in waterfront villas and branded residences.
          </p>

          {/* IMAGE IN CONTENT */}
          <div className="relative rounded-[24px] overflow-hidden border border-white/10">
            <Image
              src={Img3}
              alt="Article visual"
              className="w-full h-[300px] md:h-[450px] object-cover"
            />
          </div>

          {/* SECOND SECTION */}
          <h2 className="text-2xl md:text-3xl font-semibold text-white pt-4">
            What This Means for Investors
          </h2>

          <p>
            Investors are now focusing more on long-term appreciation, rental yield,
            and branded developments that offer both lifestyle and asset value.
          </p>

        </div>

        {/* CTA */}
      </section>

      {/* RELATED BLOGS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Related Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/media/${item.id}`}
              className="group border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="relative h-44">
                <Image
                  src={item.img}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5">
                <p className="text-sm text-yellow-400 mb-1">
                  {item.category}
                </p>
                <h3 className="font-semibold text-white group-hover:text-yellow-400 transition">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}