export default function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 py-14">
      <button
        disabled={currentPage === 1}
        onClick={() => onChange((p) => p - 1)}
        className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] disabled:opacity-40"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(Math.max(currentPage - 3, 0), Math.max(currentPage - 3, 0) + 5)
        .map((page) => (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`h-11 min-w-[44px] rounded-xl border transition ${
              currentPage === page
                ? "border-yellow-400 bg-yellow-400 text-black"
                : "border-white/10 bg-white/[0.03] text-white hover:border-yellow-400"
            }`}
          >
            {page}
          </button>
        ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onChange((p) => p + 1)}
        className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}