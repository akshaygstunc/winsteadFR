import Image from "next/image";
import aboutImg from "../../public/about.png";
import Stats from "@/app/components/Stats";
import Testimonials from "@/app/components/Testimonials";
import AboutHero from "../components/about/About";
import AboutPhilosophyy from "../components/about/Phylosipi";
import AboutProcess from "../components/about/AboutProcess";
import AboutTrust from "../components/about/AboutTrust";
import AboutCTA from "../components/about/AboutCTA";
import AutoBreadcrumbs from "../components/BreadCrumbs";
export default function AboutUs() {
  return (<>
    <AboutHero />
    <AutoBreadcrumbs />
    <AboutPhilosophyy />
    <AboutProcess />
    <AboutTrust />
    {/* <AboutCTA /> */}
  </>
  );
}