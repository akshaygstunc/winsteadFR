"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProjectsHero() {
  const [projectDetail, setProjectDetail] = useState(null);

  useEffect(() => {
    fetch("https://winsteadglobal.com/api/content/projects-page/singleton")
      .then((response) => response.json())
      .then((data) => setProjectDetail(data))
      .catch((error) =>
        console.error("Error fetching project details:", error),
      );
  }, []);

  const bannerImage = projectDetail?.data?.bannerImage || "/hero4.png";

  const bannerTitle = projectDetail?.data?.bannerTitle || "Curated Projects";

  const bannerSubtitle =
    projectDetail?.data?.bannerSubtitle ||
    "Explore premium properties crafted for clients";

  return (
    <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black text-white bg-center">
      {" "}
      {/* IMAGE */}{" "}
      <div className="absolute inset-0">
        {" "}
        <Image
          src={bannerImage}
          alt="News Banner"
          fill
          priority
          className="object-cover object-center"
        />{" "}
      </div>{" "}
      {/* OVERLAY (only for readability, not full dark) */}{" "}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" /> */}{" "}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />{" "}
      {/* CONTENT (BOTTOM LEFT ONLY) */}{" "}
      <div className="relative z-10 h-full flex items-end justify-center">
        {" "}
        <div className="w-full max-w-7xl px-6 md:px-12 pb-14 md:pb-20">
          {" "}
          <div className="max-w-xl text-left ">
            {" "}
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
              {" "}
              {bannerTitle}{" "}
            </p>{" "}
            <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
              {" "}
              {bannerSubtitle?.split("\n")[0]}{" "}
              {bannerSubtitle?.split("\n")[1] &&(
              <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                {" "}
               {bannerSubtitle?.split("\n")[1]}
              </span>)}
            </h1>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* BOTTOM GOLD LINE */}{" "}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />{" "}
    </section>
  );
}
