"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailActualite = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/actualites/data");
var getActualiteIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var ActualiteCard = function (props) {
    var actualite = props.actualite;
    return (React.createElement("a", { href: "#page-detail-actualite&id=".concat(actualite.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
        React.createElement("div", { className: "relative h-36 overflow-hidden" },
            React.createElement("img", { src: actualite.img, alt: actualite.title, className: "w-full h-full object-cover group-hover:scale-105 transition duration-500" }),
            React.createElement("span", { className: "absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaRed backdrop-blur-sm" }, actualite.category)),
        React.createElement("div", { className: "p-4" },
            React.createElement("h3", { className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2" }, actualite.title),
            React.createElement("div", { className: "flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-slate-400" },
                React.createElement(fa6_1.FaClock, { className: "text-[10px]" }),
                " ",
                actualite.time))));
};
var DetailActualite = function () {
    var _a = React.useState(getActualiteIdFromHash), actualiteId = _a[0], setActualiteId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setActualiteId(getActualiteIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var actualite = data_1.ACTUALITES.find(function (a) { return a.id === actualiteId; }) || data_1.ACTUALITES[0];
    var idx = data_1.ACTUALITES.findIndex(function (a) { return a.id === actualite.id; });
    var prev = data_1.ACTUALITES[(idx - 1 + data_1.ACTUALITES.length) % data_1.ACTUALITES.length];
    var next = data_1.ACTUALITES[(idx + 1) % data_1.ACTUALITES.length];
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-toutes-actualites", className: "hover:text-ikaBlue transition" }, "Toutes les actualit\u00E9s"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaRed" }, actualite.title)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "relative h-64 sm:h-80 lg:h-96 overflow-hidden" },
                        React.createElement("img", { src: actualite.img, alt: actualite.title, className: "w-full h-full object-cover" }),
                        React.createElement("span", { className: "absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-black uppercase tracking-wide text-ikaRed backdrop-blur-sm flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaTag, { className: "text-[10px]" }),
                            " ",
                            actualite.category)),
                    React.createElement("div", { className: "p-5 sm:p-8" },
                        React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark leading-snug" }, actualite.title),
                        React.createElement("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-600" },
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaClock, { className: "text-ikaRed" }),
                                " ",
                                actualite.time),
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaUser, { className: "text-ikaBlue" }),
                                " ",
                                actualite.author)),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("p", { className: "text-sm leading-relaxed text-slate-600" }, actualite.longText)),
                        React.createElement("div", { className: "mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                            React.createElement("a", { href: "#page-toutes-actualites", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir toutes les actualit\u00E9s")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaNewspaper, { className: "text-ikaRed text-[11px]" }),
                            " Autres actualit\u00E9s"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-4" }, data_1.ACTUALITES.filter(function (a) { return a.id !== actualite.id; }).map(function (a) { return (React.createElement(ActualiteCard, { key: a.id, actualite: a })); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-actualite&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaRed transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaRed line-clamp-2" }, prev.title)),
                        React.createElement("a", { href: "#page-detail-actualite&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaRed transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaRed line-clamp-2" }, next.title),
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-ikaRed ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-toutes-actualites", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaRed bg-red-50 text-ikaRed font-bold text-xs hover:bg-ikaRed hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir toutes les actualit\u00E9s"))))));
};
exports.DetailActualite = DetailActualite;
exports.default = exports.DetailActualite;
//# sourceMappingURL=detail-actualite.js.map