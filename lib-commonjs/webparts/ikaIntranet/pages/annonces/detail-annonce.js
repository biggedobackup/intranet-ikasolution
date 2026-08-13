"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailAnnonce = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/annonces/data");
var getAnnonceIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var typeIcon = function (type) {
    switch (type) {
        case 'anniversaire': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0" },
            React.createElement(fa6_1.FaCakeCandles, { className: "text-sm" }));
        case 'mariage': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0" },
            React.createElement(fa6_1.FaHeart, { className: "text-sm" }));
        case 'absence': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-blue-100 text-ikaBlue flex items-center justify-center shrink-0" },
            React.createElement(fa6_1.FaPlaneDeparture, { className: "text-sm" }));
        default: return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0" },
            React.createElement(fa6_1.FaBullhorn, { className: "text-sm" }));
    }
};
var DetailAnnonce = function () {
    var _a = React.useState(getAnnonceIdFromHash), annonceId = _a[0], setAnnonceId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setAnnonceId(getAnnonceIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var annonce = data_1.ANNONCES.find(function (a) { return a.id === annonceId; }) || data_1.ANNONCES[0];
    var idx = data_1.ANNONCES.findIndex(function (a) { return a.id === annonce.id; });
    var prev = data_1.ANNONCES[(idx - 1 + data_1.ANNONCES.length) % data_1.ANNONCES.length];
    var next = data_1.ANNONCES[(idx + 1) % data_1.ANNONCES.length];
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-toutes-annonces", className: "hover:text-ikaBlue transition" }, "Annonces"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-amber-600" }, annonce.title)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "p-6 sm:p-8" },
                        React.createElement("div", { className: "flex items-center gap-4" },
                            annonce.avatars.length > 0 ? (React.createElement("div", { className: "flex -space-x-3 shrink-0" }, annonce.avatars.map(function (av, j) { return (React.createElement("img", { key: j, src: av, className: "w-12 h-12 rounded-full object-cover border-2 border-white", alt: "" })); }))) : (annonce.avatar ? (React.createElement("img", { src: annonce.avatar, alt: "", className: "w-14 h-14 rounded-full object-cover ".concat(annonce.badge) })) : typeIcon(annonce.type)),
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, annonce.title),
                                React.createElement("p", { className: "text-xs font-semibold text-slate-400 mt-0.5" }, annonce.time))),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Message"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, annonce.text)),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Cat\u00E9gorie"),
                            React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                React.createElement(fa6_1.FaBullhorn, { className: "text-amber-600 text-xs" }),
                                " ",
                                annonce.type)),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-toutes-annonces", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir toutes les annonces")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaUsers, { className: "text-amber-600 text-[11px]" }),
                            " Autres annonces"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3" }, data_1.ANNONCES.filter(function (a) { return a.id !== annonce.id; }).map(function (a) { return (React.createElement("a", { key: a.id, href: "#page-detail-annonce&id=".concat(a.id), className: "flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition group" },
                            a.avatars.length > 0 ? (React.createElement("div", { className: "flex -space-x-2 shrink-0" }, a.avatars.map(function (av, j) { return (React.createElement("img", { key: j, src: av, className: "w-8 h-8 rounded-full object-cover border border-white", alt: "" })); }))) : (a.avatar ? React.createElement("img", { src: a.avatar, alt: "", className: "w-9 h-9 rounded-full object-cover ".concat(a.badge, " shrink-0") })
                                : typeIcon(a.type)),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-amber-600 transition" }, a.title),
                                React.createElement("p", { className: "text-[10px] text-slate-400" }, a.time)))); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-annonce&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2" }, prev.title)),
                        React.createElement("a", { href: "#page-detail-annonce&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2" }, next.title),
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-amber-600 ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-toutes-annonces", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir toutes les annonces"))))));
};
exports.DetailAnnonce = DetailAnnonce;
exports.default = exports.DetailAnnonce;
//# sourceMappingURL=detail-annonce.js.map