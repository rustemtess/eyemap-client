interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const visiblePages = 5; // сколько показывать рядом

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= visiblePages + 2) {
      // если страниц мало — показываем все
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 2);

      pages.push(1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center gap-2 py-3">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="cursor-pointer text-sm px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        ←
      </button>

      <div className="flex items-center gap-2">
        {getPages().map((p, i) =>
          typeof p === "number" ? (
            <button
              key={i}
              onClick={() => onPageChange(p)}
              className={`text-sm px-3 py-1 rounded cursor-pointer ${
                currentPage === p ? "bg-[#5d7388] text-white" : "bg-gray-200"
              }`}
            >
              {p}
            </button>
          ) : (
            <span key={i}>…</span>
          ),
        )}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="cursor-pointer text-sm px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
