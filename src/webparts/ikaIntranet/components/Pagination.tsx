import * as React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export interface IPaginationProps {
  total: number;
  page: number;
  pageSize?: number;
  labelSingular?: string;
  labelPlural?: string;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = (props) => {
  const { total, page, pageSize = 10, labelSingular = 'élément', labelPlural = 'éléments', onPageChange } = props;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, total);
  const label = total > 1 ? labelPlural : labelSingular;

  const pages: Array<number | '...'> = [];
  for (let i = 1; i <= totalPages; i += 1) {
    if (totalPages <= 7 || i === 1 || i === totalPages || Math.abs(i - safePage) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-slate-50/60 border-t border-slate-100 rounded-b-2xl">
      <p className="text-[11px] font-semibold text-slate-500 order-2 sm:order-1">
        {start} - {end} sur {total} {label}
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5 order-1 sm:order-2">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-[11px] hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <FaChevronLeft className="text-[9px]" /> Précédent
          </button>
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`e${i}`} className="px-1 text-[11px] text-slate-400">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-lg border text-[11px] font-bold transition ${p === safePage ? 'bg-ikaBlue text-white border-ikaBlue shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}
              >
                {p}
              </button>
            )
          )}
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => onPageChange(safePage + 1)}
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-[11px] hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Suivant <FaChevronRight className="text-[9px]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;