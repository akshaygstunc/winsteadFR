import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Logos from "./components/Logos";
import Blogs from "./components/Blogs";
import Testimonials from "./components/Testimonials";
import Reel from "./components/Reel";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* <Navbar /> */}
      <Hero />
      <Projects />
      <Stats />
      <Testimonials />
      <Reel/>
      <Logos />
      <Blogs />
    </div>
  );
}