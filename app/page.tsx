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
import UltraLuxury from "./components/ultraLuxury";
import { useEffect, useState } from "react";
import WebsiteContentService from "./services/websitecontent.service";
export default function Home() {
  const [homePage, setHomePage] = useState({});
  const [projects, setProjects] = useState([]);
  const [testimonialsdata, settestimonials] = useState([]);
  useEffect(() => {
    async function fetchHomePage() {
      try {
        const response = await WebsiteContentService.getHomePageContent1(); // ✅ correct

        const projects = await WebsiteContentService.getProperties({});
        const testimonials = await WebsiteContentService.getTestimonials()
        settestimonials(testimonials)
        setHomePage(response); // ✅ direct object
        setProjects(projects)
      } catch (error) {
        console.error("Error fetching homepage content:", error);
      }
    }

    fetchHomePage();
  }, []);
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
      img: img2,
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
    const requestBrowserLocation = async () => {
      if (typeof window === "undefined" || !navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          localStorage.setItem("lat", String(lat));
          localStorage.setItem("long", String(long));

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}&accept-language=en`
            );

            const data = await res.json();

            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              "";

            const country = data.address.country || "";

            localStorage.setItem("city", city);
            localStorage.setItem("country", country);

            console.log({ city, country });
          } catch (error) {
            console.error("Reverse geocoding failed", error);
          }
        },
        (error) => {
          console.error("Location permission denied", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    requestBrowserLocation();
  }, []);
  return (
    <div className="bg-black text-white">
      {/* <Navbar /> */}
      <Hero asset={homePage} />      <Projects projects={projects} homePage={homePage} />
      <Logos />
      <UltraLuxury />
      <Testimonials testimonialsdata={testimonialsdata} />
      <Reel data={homePage?.data} />
      <Stats data={homePage?.data} />      <LatestArticles news={news} />
    </div>
  );
}