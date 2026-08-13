"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailEmployeMois = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/employes-mois/data");
var getEmployeMoisIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var DetailEmployeMois = function () {
    var _a = React.useState(getEmployeMoisIdFromHash), employeId = _a[0], setEmployeId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setEmployeId(getEmployeMoisIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var employe = data_1.EMPLOYES_MOIS.find(function (e) { return e.id === employeId; }) || data_1.EMPLOYES_MOIS[0];
    var idx = data_1.EMPLOYES_MOIS.findIndex(function (e) { return e.id === employe.id; });
    var prev = data_1.EMPLOYES_MOIS[(idx - 1 + data_1.EMPLOYES_MOIS.length) % data_1.EMPLOYES_MOIS.length];
    var next = data_1.EMPLOYES_MOIS[(idx + 1) % data_1.EMPLOYES_MOIS.length];
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-tous-employes-mois", className: "hover:text-ikaBlue transition" }, "Employ\u00E9s du mois"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-amber-600" }, employe.name)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "relative h-40 sm:h-48 overflow-hidden bg-gradient-to-r from-amber-500 to-amber-400 flex flex-col items-center justify-center text-white p-6" },
                        React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center" },
                            React.createElement(fa6_1.FaTrophy, { className: "text-3xl" })),
                        React.createElement("h1", { className: "mt-3 text-xl sm:text-2xl font-black" }, employe.name),
                        React.createElement("span", { className: "mt-2 px-3 py-1 rounded-full bg-white/90 text-[10px] font-black uppercase tracking-wide text-amber-700 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaCrown, { className: "text-[10px]" }),
                            " Employ\u00E9 du mois \u2014 ",
                            employe.month,
                            " ",
                            employe.year)),
                    React.createElement("div", { className: "p-6 sm:p-8 text-center" },
                        React.createElement("img", { src: employe.photo, alt: employe.name, className: "w-28 h-28 rounded-full object-cover mx-auto border-4 border-amber-400 shadow-md" }),
                        React.createElement("h2", { className: "mt-4 text-lg font-black text-ikaBlueDark" }, employe.name),
                        React.createElement("p", { className: "text-sm font-bold text-ikaBlue mt-0.5" },
                            employe.role,
                            " \u2014 ",
                            employe.dept),
                        React.createElement("div", { className: "mt-5 mx-auto max-w-lg" },
                            React.createElement("h3", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Pourquoi lui / elle ?"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600 italic border-l-2 border-amber-400 pl-3 text-left" },
                                "\u00AB ",
                                employe.quote,
                                " \u00BB")),
                        React.createElement("div", { className: "mt-6 flex items-center justify-center gap-3" },
                            React.createElement("span", { className: "px-4 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs flex items-center gap-1.5" },
                                React.createElement(fa6_1.FaHeart, null),
                                " ",
                                employe.likeCount),
                            React.createElement("span", { className: "px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs flex items-center gap-1.5" },
                                React.createElement(fa6_1.FaComment, null),
                                " ",
                                employe.commentCount)),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-tous-employes-mois", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir tous les employ\u00E9s du mois")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaTrophy, { className: "text-amber-500 text-[11px]" }),
                            " Autres laur\u00E9ats"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3" }, data_1.EMPLOYES_MOIS.filter(function (e) { return e.id !== employe.id; }).map(function (e) { return (React.createElement("a", { key: e.id, href: "#page-detail-employe-mois&id=".concat(e.id), className: "flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition group" },
                            React.createElement("img", { src: e.photo, alt: e.name, className: "w-11 h-11 rounded-full object-cover border border-amber-300 shrink-0" }),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-amber-600 transition" }, e.name),
                                React.createElement("p", { className: "text-[10px] text-slate-400 flex items-center gap-1" },
                                    React.createElement(fa6_1.FaCalendarDays, { className: "text-[9px]" }),
                                    " ",
                                    e.month,
                                    " ",
                                    e.year)))); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-employe-mois&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2" }, prev.name)),
                        React.createElement("a", { href: "#page-detail-employe-mois&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2" }, next.name),
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-amber-600 ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-tous-employes-mois", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir tous les employ\u00E9s du mois"))))));
};
exports.DetailEmployeMois = DetailEmployeMois;
exports.default = exports.DetailEmployeMois;
//# sourceMappingURL=detail-employe-mois.js.map