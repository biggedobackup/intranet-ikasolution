"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailProduit = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/produits/data");
var getProduitIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var produitIcon = function (name) {
    switch (name) {
        case 'cubes': return React.createElement(fa6_1.FaCubes, null);
        case 'cloud': return React.createElement(fa6_1.FaCloud, null);
        case 'chart-line': return React.createElement(fa6_1.FaChartLine, null);
        case 'mobile-screen-button': return React.createElement(fa6_1.FaMobileScreenButton, null);
        case 'headset': return React.createElement(fa6_1.FaHeadset, null);
        case 'graduation-cap': return React.createElement(fa6_1.FaGraduationCap, null);
        default: return React.createElement(fa6_1.FaCubes, null);
    }
};
var DetailProduit = function () {
    var _a = React.useState(getProduitIdFromHash), produitId = _a[0], setProduitId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setProduitId(getProduitIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var produit = data_1.PRODUITS.find(function (p) { return p.id === produitId; }) || data_1.PRODUITS[0];
    var idx = data_1.PRODUITS.findIndex(function (p) { return p.id === produit.id; });
    var prev = data_1.PRODUITS[(idx - 1 + data_1.PRODUITS.length) % data_1.PRODUITS.length];
    var next = data_1.PRODUITS[(idx + 1) % data_1.PRODUITS.length];
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-tous-produits", className: "hover:text-ikaBlue transition" }, "Produits & Services"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, produit.name)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "relative h-40 sm:h-48 overflow-hidden bg-gradient-to-r from-ikaBlueDark to-ikaBlue flex flex-col items-center justify-center text-white p-6" },
                        React.createElement("div", { className: "w-20 h-20 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-3xl" },
                            React.createElement("span", { className: produit.iconCls }, produitIcon(produit.icon))),
                        React.createElement("h1", { className: "mt-3 text-xl sm:text-2xl font-black" }, produit.name),
                        React.createElement("span", { className: "mt-2 px-3 py-1 rounded-full bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaTag, { className: "text-[10px]" }),
                            " ",
                            produit.category)),
                    React.createElement("div", { className: "p-5 sm:p-8" },
                        React.createElement("div", { className: "mt-2" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Pr\u00E9sentation"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, produit.description)),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Points forts"),
                            React.createElement("div", { className: "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2" }, produit.features.map(function (f, i) { return (React.createElement("div", { key: i, className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                                React.createElement(fa6_1.FaCircleCheck, { className: "text-emerald-500 text-sm shrink-0" }),
                                React.createElement("span", { className: "text-xs font-semibold text-slate-700" }, f))); }))),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-tous-produits", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir tous les services")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaLayerGroup, { className: "text-ikaBlue text-[11px]" }),
                            " Autres services"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3" }, data_1.PRODUITS.filter(function (p) { return p.id !== produit.id; }).map(function (p) { return (React.createElement("a", { key: p.id, href: "#page-detail-produit&id=".concat(p.id), className: "flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group" },
                            React.createElement("span", { className: "w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center ".concat(p.iconCls) }, produitIcon(p.icon)),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition" }, p.name),
                                React.createElement("p", { className: "text-[10px] text-slate-400" }, p.category)))); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-produit&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, prev.name)),
                        React.createElement("a", { href: "#page-detail-produit&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, next.name),
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-tous-produits", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir tous les services"))))));
};
exports.DetailProduit = DetailProduit;
exports.default = exports.DetailProduit;
//# sourceMappingURL=detail-produit.js.map