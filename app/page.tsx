"use client";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Logos from "./components/Logos";
import Blogs from "./components/Blogs";
import Testimonials from "./components/Testimonials";
import Reel from "./components/Reel";
import LatestArticles from "./components/Blogs/LatestArticles";
import img1 from "../public/hero1.jpg";
import img2 from "../public/hero2.png";
import img3 from "../public/hero3.jpg";
import img4 from "../public/hero4.png";
import { useEffect, useState } from "react";
import WebsiteContentService from "./services/websitecontent.service";
export default function Home() {
  const [homepagecontent, setHomepageContent] = useState(null);
  const news = [
    {
      id: 1,
      title: "Dubai Real Estate Market Hits New Highs",
      desc: "Luxury properties continue to dominate with increasing global demand.",
      date: "March 2026",
      img: img1, 
           category: "Market Update",
    },
    {
      id: 2,
      title: "Top Investment Hotspots in UAE",
      desc: "Explore emerging areas offering strong ROI and growth potential.",
      date: "Feb 2026",
      img:img2,
      category: "Investment",
    },
    {
      id: 3,
      title: "Why Off-Plan Investments Are Booming",
      desc: "Flexible payment plans and capital appreciation driving demand.",
      date: "Jan 2026",
      img: img3,
      category: "Off-Plan",
    },
    {
      id: 4,
      title: "Luxury Living Redefined",
      desc: "A new wave of ultra-premium developments reshaping skylines.",
      date: "Dec 2025",
      img: img4, 
      category: "Luxury Trends",
    },
  ];
  useEffect(() => {
    async function loadContent() {
      try {
        const content = await WebsiteContentService.getHomePageContent({ slug: "home" });
        setHomepageContent(content[0]);
      } catch (error) {
        console.error("Failed to load homepage content:", error);
      }
    }
    loadContent();
  }, []);
  return (
    <div className="bg-black text-white">
      {/* <Navbar /> */}
      <Hero asset={homepagecontent?.data?.herovideo}/>
      <Projects />
      <Stats />
      <Testimonials />
      <Reel/>
      <Logos />
      <LatestArticles news={news} />
    </div>
  );
}