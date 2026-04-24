"use client"
import NewsHero from "../components/Blogs/NewsHero";
import MarketBrief from "../components/Blogs/MarketBreif";
import FeaturedStory from "../components/Blogs/FeaturedStory";
import NewsCTA from "../components/Blogs/NewsCTA";
import LatestArticles from "../components/Blogs/LatestArticles";
import NewsGrid from "../components/Blogs/NewsGrid";
import NewsToolbar from "../components/Blogs/NewsToolbar";
import { useState, useMemo, useEffect } from "react";
import Img1 from "../../public/hero5.png";
import Img2 from "../../public/hero1.jpg";
import Img3 from "../../public/hero2.png";
import Img4 from "../../public/hero3.jpg";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import WebsiteContentService from "../services/websitecontent.service";

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
    id: 5,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
    img: Img1,
    category: "Market Update",
  },
  {
    id: 6,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
    img: Img3,
    category: "Investment",
  },
  {
    id: 7,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
    img: Img4,
    category: "Off-Plan",
  },
  {
    id: 8,
    title: "Luxury Living Redefined",
    desc: "A new wave of ultra-premium developments reshaping skylines.",
    date: "Dec 2025",
    img: Img1,
    category: "Luxury Trends",
  },
  {
    id: 9,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
    img: Img3,
    category: "Market Update",
  },
  {
    id: 10,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
    img: Img1,
    category: "Investment",
  },
  {
    id: 11,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
    img: Img1,
    category: "Off-Plan",
  },
  {
    id: 12,
    title: "Luxury Living Redefined",
    desc: "A new wave of ultra-premium developments reshaping skylines.",
    date: "Dec 2025",
    img: Img1,
    category: "Luxury Trends",
  },
  {
    id: 13,
    title: "Dubai Real Estate Market Hits New Highs",
    desc: "Luxury properties continue to dominate with increasing global demand.",
    date: "March 2026",
    img: Img1,
    category: "Market Update",
  },
  {
    id: 14,
    title: "Top Investment Hotspots in UAE",
    desc: "Explore emerging areas offering strong ROI and growth potential.",
    date: "Feb 2026",
    img: Img1,
    category: "Investment",
  },
  {
    id: 15,
    title: "Why Off-Plan Investments Are Booming",
    desc: "Flexible payment plans and capital appreciation driving demand.",
    date: "Jan 2026",
    img: Img1,
    category: "Off-Plan",
  },
  {
    id: 16,
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
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([])

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await WebsiteContentService.getBlogs();
        setNews(response || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);
  const filteredNews = useMemo(() => {
    let items = [...news];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        // item.category.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    items.sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sort === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
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
      <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
        <AutoBreadcrumbs />
      </section>
      <NewsToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <NewsGrid news={filteredNews} loading={loading} />
      {/* <NewsCTA /> */}
    </div>
  );
}


