import { __spreadArray } from "tslib";
import * as React from 'react';
import { FaClock, FaMagnifyingGlass } from 'react-icons/fa6';
import { ACTUALITES } from '../../services/actualites/data';
export var ToutesActualites = function () {
    var _a = React.useState(''), search = _a[0], setSearch = _a[1];
    var _b = React.useState('all'), category = _b[0], setCategory = _b[1];
    var categories = __spreadArray(['all'], Array.from(new Set(ACTUALITES.map(function (a) { return a.category; }))), true);
    var filtered = ACTUALITES.filter(function (a) {
        var q = search.toLowerCase();
        var matchesSearch = a.title.toLowerCase().includes(q) || a.text.toLowerCase().includes(q);
        var matchesCat = category === 'all' || a.category === category;
        return matchesSearch && matchesCat;
    });
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-red-50 rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaRed" }, "Actualit\u00E9s")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Toutes les actualit\u00E9s"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Retrouvez ici toute l'actualit\u00E9 de la vie d'IKA SOLUTION : projets, \u00E9v\u00E9nements, nouveaut\u00E9s et vie de l'\u00E9quipe."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Rechercher une actualit\u00E9...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaRed bg-white shadow-sm" }),
                            React.createElement(FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: category, onChange: function (e) { return setCategory(e.target.value); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaRed bg-white shadow-sm" }, categories.map(function (c) { return (React.createElement("option", { key: c, value: c }, c === 'all' ? 'Toutes les catégories' : c)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " actualit\u00E9(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucune actualit\u00E9 ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, filtered.map(function (a) { return (React.createElement("a", { key: a.id, href: "#page-detail-actualite&id=".concat(a.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
                React.createElement("div", { className: "relative h-44 overflow-hidden" },
                    React.createElement("img", { src: a.img, alt: a.title, className: "w-full h-full object-cover group-hover:scale-105 transition duration-500" }),
                    React.createElement("span", { className: "absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaRed backdrop-blur-sm" }, a.category)),
                React.createElement("div", { className: "p-4" },
                    React.createElement("h3", { className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2" }, a.title),
                    React.createElement("div", { className: "flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-slate-400" },
                        React.createElement(FaClock, { className: "text-[10px]" }),
                        " ",
                        a.time),
                    React.createElement("p", { className: "mt-2 text-[11px] text-slate-500 line-clamp-2 leading-relaxed" }, a.text)))); }))))));
};
export default ToutesActualites;
//# sourceMappingURL=toutes-les-actualites.js.map