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
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const [pageContent, setPageContent] = useState(null); 
  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const res = await WebsiteContentService.getBlogs();
        const res2 = await WebsiteContentService.getNewsMedia(); // ✅ different call
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

  return (
    <div className="bg-black text-white">
      <NewsHero pageContent={pageContent} />
      <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
        <AutoBreadcrumbs />
      </section>
      <NewsToolbar search={search} setSearch={setSearch} category={category} setCategory={setCategory} sort={sort} setSort={setSort} />
      <NewsGrid news={paginated} loading={loading} basePath="blogs" />
      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
    </div>
  );
}