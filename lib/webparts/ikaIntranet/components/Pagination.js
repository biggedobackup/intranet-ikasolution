import * as React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
export var Pagination = function (props) {
    var total = props.total, page = props.page, _a = props.pageSize, pageSize = _a === void 0 ? 10 : _a, _b = props.labelSingular, labelSingular = _b === void 0 ? 'élément' : _b, _c = props.labelPlural, labelPlural = _c === void 0 ? 'éléments' : _c, onPageChange = props.onPageChange;
    var totalPages = Math.max(1, Math.ceil(total / pageSize));
    var safePage = Math.min(page, totalPages);
    var start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
    var end = Math.min(safePage * pageSize, total);
    var label = total > 1 ? labelPlural : labelSingular;
    var pages = [];
    for (var i = 1; i <= totalPages; i += 1) {
        if (totalPages <= 7 || i === 1 || i === totalPages || Math.abs(i - safePage) <= 1) {
            pages.push(i);
        }
        else if (pages[pages.length - 1] !== '...') {
            pages.push('...');
        }
    }
    return (React.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-slate-50/60 border-t border-slate-100 rounded-b-2xl" },
        React.createElement("p", { className: "text-[11px] font-semibold text-slate-500 order-2 sm:order-1" },
            start,
            " - ",
            end,
            " sur ",
            total,
            " ",
            label),
        totalPages > 1 && (React.createElement("div", { className: "flex items-center gap-1.5 order-1 sm:order-2" },
            React.createElement("button", { type: "button", disabled: safePage <= 1, onClick: function () { return onPageChange(safePage - 1); }, className: "inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-[11px] hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition" },
                React.createElement(FaChevronLeft, { className: "text-[9px]" }),
                " Pr\u00E9c\u00E9dent"),
            pages.map(function (p, i) {
                return p === '...' ? (React.createElement("span", { key: "e".concat(i), className: "px-1 text-[11px] text-slate-400" }, "\u2026")) : (React.createElement("button", { key: p, type: "button", onClick: function () { return onPageChange(p); }, className: "w-8 h-8 rounded-lg border text-[11px] font-bold transition ".concat(p === safePage ? 'bg-ikaBlue text-white border-ikaBlue shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100') }, p));
            }),
            React.createElement("button", { type: "button", disabled: safePage >= totalPages, onClick: function () { return onPageChange(safePage + 1); }, className: "inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-[11px] hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition" },
                "Suivant ",
                React.createElement(FaChevronRight, { className: "text-[9px]" }))))));
};
export default Pagination;
//# sourceMappingURL=Pagination.js.map