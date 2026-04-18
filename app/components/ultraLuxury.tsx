"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import WebsiteContentService from "../services/websitecontent.service";
import ReadMoreSlider from "./ReadMoreSlider"
export default function UltraLuxury() {
  const [luxuaryProject, setLuxuaryProjects] = useState<any[]>([]);
  const [activeProject, setActiveProject] = useState(0);
  const [activeMedia, setActiveMedia] = useState(0);

  // ✅ SAFE CURRENT PROJECT
  const currentProject = luxuaryProject[activeProject];

  // ✅ BUILD MEDIA ARRAY FROM API
  const media =
    currentProject
      ? [
        ...(currentProject.thumbnail
          ? [{ type: "image", src: currentProject.thumbnail }]
          : []),
        ...(currentProject.gallery || []).map((img: string) => ({
          type: "image",
          src: img,
        })),
        ...(currentProject.propertydoc
          ? [{ type: "video", src: currentProject.propertydoc }]
          : []),
      ]
      : [];

  const currentMedia = media[activeMedia];

  const nextProject = () => {
    setActiveProject((prev) =>
      prev + 1 >= luxuaryProject.length ? 0 : prev + 1
    );
    setActiveMedia(0);
  };

  const prevProject = () => {
    setActiveProject((prev) =>
      prev - 1 < 0 ? luxuaryProject.length - 1 : prev - 1
    );
    setActiveMedia(0);
  };

  useEffect(() => {
    async function fetchLuxuryProjects() {
      const luxuryProjects = await WebsiteContentService.getProperties();

      // ✅ FILTER BY TYPE ID
      const filteredLuxuaryProject = luxuryProjects.filter(
        (project: any) =>
          project.type === "69d711938447debd74aa5b13"
      ).sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

      setLuxuaryProjects(filteredLuxuaryProject);
    }

    fetchLuxuryProjects();
  }, []);

  // ✅ LOADING / EMPTY STATE
  if (!luxuaryProject.length) {
    return (
      <section className="max-w-[87rem] mx-auto bg-black text-white py-16 px-6 md:px-10 animate-pulse">

        {/* HEADER SHIMMER */}
        <div className="flex items-center justify-between mb-10">
          <div className="h-10 w-48 bg-gray-800 rounded-lg"></div>

          <div className="flex gap-4">
            <div className="h-10 w-10 bg-gray-800 rounded-full"></div>
            <div className="h-10 w-10 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* MAIN GRID SHIMMER */}
        <div className="grid md:grid-cols-[60%_40%] gap-8 items-start">

          {/* LEFT IMAGE */}
          <div>
            <div className="w-full h-[250px] md:h-[325px] bg-gray-800 rounded-xl"></div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-16 bg-gray-800 rounded-lg"
                ></div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-800 rounded"></div>
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-800 rounded"></div>

            <div className="mt-6 h-10 w-40 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[87rem] mx-auto bg-black text-white py-16 px-6 md:px-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Ultra Luxury
        </h1>

        {/* NAVIGATION */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevProject}
            className="text-xl border border-yellow-500/40 px-4 py-1 rounded-full hover:bg-yellow-400 hover:text-black transition"
          >
            ‹
          </button>

          <button
            onClick={nextProject}
            className="text-xl border border-yellow-500/40 px-4 py-1 rounded-full hover:bg-yellow-400 hover:text-black transition"
          >
            ›
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-[60%_40%] gap-8 items-start">
        {/* LEFT MEDIA */}
        <div>
          {/* MAIN */}
          <div className="rounded-xl overflow-hidden">
            {currentMedia?.type === "image" ? (
              <Image
                src={currentMedia.src}
                alt="media"
                width={800}
                height={500}
                className="w-full h-[250px] md:h-[325px] object-cover"
              />
            ) : (
              <video
                src={currentMedia?.src}
                controls
                className="w-full h-[250px] md:h-[325px] object-cover"
              />
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {media.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveMedia(index)}
                className={`cursor-pointer border-2 rounded-lg overflow-hidden ${activeMedia === index
                  ? "border-yellow-400"
                  : "border-transparent"
                  }`}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt="thumb"
                    width={100}
                    height={80}
                    className="w-20 h-16 object-cover"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-20 h-16 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl md:text-3xl text-yellow-400 mb-4">
              {currentProject.title}
            </h2>

            <p className="text-gray-300 leading-relaxed">
              {currentProject.shortDescription ||
                "Luxury living with premium amenities."}
            </p>

            <p className="text-gray-300 mt-4 leading-relaxed">
              {<ReadMoreSlider description={currentProject.fullDescription} heading={currentProject.title} /> ||
                "Experience world-class comfort and elegance."}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}