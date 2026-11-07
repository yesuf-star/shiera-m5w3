import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function Pagination({page,totalPages,onPageChange,disabled = false,}: PaginationProps) {
  return (
    <div className="mt-10 flex items-center justify-center gap-5">
      <button
        type="button"
        disabled={page === 1 || disabled}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="text-sm font-semibold text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page >= totalPages || disabled}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}