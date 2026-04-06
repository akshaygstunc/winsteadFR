"use client"
import NewsHero from "../components/Blogs/NewsHero";
import MarketBrief from "../components/Blogs/MarketBreif";
import FeaturedStory from "../components/Blogs/FeaturedStory";
import NewsCTA from "../components/Blogs/NewsCTA";
import LatestArticles from "../components/Blogs/LatestArticles";
import NewsGrid from "../components/Blogs/NewsGrid";
import NewsToolbar from "../components/Blogs/NewsToolbar";
import { useState, useMemo } from "react";
import Img1 from "../../public/hero5.png";
import Img2 from "../../public/hero1.jpg";
import Img3 from "../../public/hero2.png";
import Img4 from "../../public/hero3.jpg";

const news = [
  {
    id: 1,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
    img: Img1,
    category: "Market Update",
  },
  {
    id: 2,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
    img: Img2,
    category: "Investment",
  },
  {
    id: 3,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
    img: Img4,
    category: "Off-Plan",
  },
  {
    id: 4,
    title: "Luxury Living Redefined",
    desc: "A new wave of ultra-premium developments reshaping skylines.",
    date: "Dec 2025",
    img: Img2,
    category: "Luxury Trends",
  },
  {
    id: 1,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
    img: Img1,
    category: "Market Update",
  },
  {
    id: 2,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
    img: Img3,
    category: "Investment",
  },
  {
    id: 3,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
    img: Img4,
    category: "Off-Plan",
  },
  {
    id: 4,
    title: "Luxury Living Redefined",
    desc: "A new wave of ultra-premium developments reshaping skylines.",
    date: "Dec 2025",
    img: Img1,
    category: "Luxury Trends",
  },
  {
    id: 1,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
    img: Img3,
    category: "Market Update",
  },
  {
    id: 2,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
    img: Img1,
    category: "Investment",
  },
  {
    id: 3,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
    img: Img1,
    category: "Off-Plan",
  },
  {
    id: 4,
    title: "Luxury Living Redefined",
    desc: "A new wave of ultra-premium developments reshaping skylines.",
    date: "Dec 2025",
    img: Img1,
    category: "Luxury Trends",
  },
  {
    id: 1,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
    img: Img1,
    category: "Market Update",
  },
  {
    id: 2,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
    img: Img1,
    category: "Investment",
  },
  {
    id: 3,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
    img: Img1,
    category: "Off-Plan",
  },
  {
    id: 4,
    title: "Luxury Living Redefined",
    desc: "A new wave of ultra-premium developments reshaping skylines.",
    date: "Dec 2025",
    img: Img1,
    category: "Luxury Trends",
  },
];

export default function NewsMedia() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  const filteredNews = useMemo(() => {
    let items = [...news];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    items.sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sort === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sort === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return items;
  }, [news, search, category, sort]);


  return (
    <div className="bg-black text-white">
      <NewsHero />
      <NewsToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />
      <NewsGrid news={news} />
      {/* <NewsCTA /> */}
    </div>
  );
}


