"use client";
import { useState, useMemo, useEffect } from "react";
import NewsHero from "../components/Blogs/NewsHero";
import NewsGrid from "../components/Blogs/NewsGrid";
import NewsToolbar from "../components/Blogs/NewsToolbar";
import AutoBreadcrumbs from "../components/BreadCrumbs";
import WebsiteContentService from "../services/websitecontent.service";
import Pagination from "../components/Pagination";

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const [pageContent, setPageContent] = useState(null); 
  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const res = await WebsiteContentService.getBlogs();
         const res2 = await WebsiteContentService.getBlogPage();// ✅ different call
        setPageContent(res2 || null); // ✅ set page content
        setItems(res || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const filtered = useMemo(() => {
    let data = [...items];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q)
      );
    }
    if (category !== "all") data = data.filter((i) => i.data?.category === category);
    data.sort((a, b) => {
      if (sort === "latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });
    return data;
  }, [items, search, category, sort]);

  useEffect(() => { setCurrentPage(1); }, [search, category, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
console.log("pageContent-blog",pageContent)
  return (
    <div className="bg-black text-white">
      {/* <NewsHero pageContent={pageContent} /> */}
      <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black text-white mt-20">
      {/* IMAGE */}
      <div className="absolute inset-0">
        <img
          src={pageContent?.data?.bannerImage}
          alt="News Banner"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* OVERLAY (only for readability, not full dark) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

      {/* CONTENT (BOTTOM LEFT ONLY) */}
      <div className="relative z-10 h-full flex items-end justify-center">
        <div className="w-full max-w-7xl  px-6 md:px-12 pb-14 md:pb-20">
          <div className="max-w-xl text-left ">
            <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#F1DC7F]">
              {pageContent?.data?.bannerTitle}
            </p>

            <h1 className="text-xl md:text-2xl xl:text-5xl font-semibold leading-[1.05] max-w-[520px]">
              Editorial insights from
              <span className="block bg-gradient-to-r from-[#B9A650] via-[#F1DC7F] to-[#7C5700] bg-clip-text text-transparent">
                luxury real estate
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* BOTTOM GOLD LINE */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,#F1DC7F,transparent)] opacity-80" />
    </section>
      <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
        <AutoBreadcrumbs />
      </section>
      <NewsToolbar search={search} setSearch={setSearch} category={category} setCategory={setCategory} sort={sort} setSort={setSort} />
      <NewsGrid news={paginated} loading={loading} basePath="blogs" />
      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
    </div>
  );
}