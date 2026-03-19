import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Logos from "./components/Logos";
import Blogs from "./components/Blogs";
import Newsletter from "./components/Newsletter";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Projects />
      <Stats />
      <Testimonials />
      <Logos />
      <Blogs />
      <Newsletter />
    </main>
  );
}