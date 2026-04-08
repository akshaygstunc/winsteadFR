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
import UltraLuxury from "./components/ultraLuxury";
export default function Home() {
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
  return (
    <div className="bg-black text-white">
      {/* <Navbar /> */}
      <Hero />
      <Projects />
      <Logos />
      <UltraLuxury />
      <Testimonials />
      <Reel/>
      <Stats />
      <LatestArticles news={news} />
    </div>
  );
}