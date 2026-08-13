"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailBilan = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/bilans/data");
var getBilanIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var DetailBilan = function () {
    var _a = React.useState(getBilanIdFromHash), bilanId = _a[0], setBilanId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setBilanId(getBilanIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var bilan = data_1.BILANS.find(function (b) { return b.id === bilanId; }) || data_1.BILANS[0];
    var idx = data_1.BILANS.findIndex(function (b) { return b.id === bilan.id; });
    var prev = data_1.BILANS[(idx - 1 + data_1.BILANS.length) % data_1.BILANS.length];
    var next = data_1.BILANS[(idx + 1) % data_1.BILANS.length];
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-tous-bilans", className: "hover:text-ikaBlue transition" }, "Bilans hebdomadaires"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, bilan.period)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "relative h-36 sm:h-40 overflow-hidden bg-gradient-to-r from-ikaBlueDark to-ikaBlue flex flex-col items-center justify-center text-white p-6" },
                        React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center" },
                            React.createElement(fa6_1.FaFilePdf, { className: "text-3xl" })),
                        React.createElement("h1", { className: "mt-3 text-lg sm:text-xl font-black" }, "Bilan hebdomadaire"),
                        React.createElement("span", { className: "mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark" },
                            React.createElement(fa6_1.FaCalendarDay, { className: "text-[10px]" }),
                            " ",
                            bilan.period)),
                    React.createElement("div", { className: "p-5 sm:p-8" },
                        React.createElement("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-600" },
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaFilePdf, { className: "text-rose-600 text-sm" }),
                                " ",
                                bilan.file),
                            React.createElement("span", { className: "px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400" }, bilan.size)),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "R\u00E9sum\u00E9 de la semaine"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, bilan.summary)),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Points cl\u00E9s"),
                            React.createElement("div", { className: "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2" }, bilan.highlights.map(function (h, i) { return (React.createElement("div", { key: i, className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                                React.createElement(fa6_1.FaCircleCheck, { className: "text-emerald-500 text-sm shrink-0" }),
                                React.createElement("span", { className: "text-xs font-semibold text-slate-700" }, h))); }))),
                        React.createElement("div", { className: "mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                            React.createElement("a", { href: "#pdf", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                                React.createElement(fa6_1.FaDownload, null),
                                " T\u00E9l\u00E9charger le PDF"),
                            React.createElement("a", { href: "#pdf", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaEye, null),
                                " Consulter en ligne"),
                            React.createElement("a", { href: "#page-tous-bilans", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Tous les bilans")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4" }, "Autres bilans"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3" }, data_1.BILANS.filter(function (b) { return b.id !== bilan.id; }).map(function (b) { return (React.createElement("a", { key: b.id, href: "#page-detail-bilan&id=".concat(b.id), className: "p-3 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group block" },
                            React.createElement("div", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-700" },
                                React.createElement(fa6_1.FaCalendarDay, { className: "text-ikaBlue shrink-0" }),
                                React.createElement("span", { className: "flex-1 group-hover:text-ikaBlue transition" }, b.period)),
                            React.createElement("div", { className: "mt-1.5 flex items-center gap-2 text-[10px] text-slate-400" },
                                React.createElement(fa6_1.FaFilePdf, { className: "text-rose-500 text-xs shrink-0" }),
                                React.createElement("span", { className: "truncate" }, b.file)))); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-bilan&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, prev.period)),
                        React.createElement("a", { href: "#page-detail-bilan&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, next.period),
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-tous-bilans", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir tous les bilans"))))));
};
exports.DetailBilan = DetailBilan;
exports.default = exports.DetailBilan;
//# sourceMappingURL=detail-bilan.js.map