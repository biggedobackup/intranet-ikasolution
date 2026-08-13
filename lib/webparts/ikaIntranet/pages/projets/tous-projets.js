import { __spreadArray } from "tslib";
import * as React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { PROJETS } from '../../services/projets/data';
export var TousProjets = function () {
    var _a = React.useState(''), search = _a[0], setSearch = _a[1];
    var _b = React.useState('all'), status = _b[0], setStatus = _b[1];
    var statuses = __spreadArray(['all'], Array.from(new Set(PROJETS.map(function (p) { return p.status; }))), true);
    var filtered = PROJETS.filter(function (p) {
        var q = search.toLowerCase();
        var matchesSearch = p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        var matchesStatus = status === 'all' || p.status === status;
        return matchesSearch && matchesStatus;
    });
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Projets")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Tous les projets"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Suivez l'avancement des projets men\u00E9s par IKA SOLUTION pour ses clients et en interne."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Rechercher un projet...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: status, onChange: function (e) { return setStatus(e.target.value); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }, statuses.map(function (s) { return (React.createElement("option", { key: s, value: s }, s === 'all' ? 'Tous les statuts' : s)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " projet(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun projet ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                React.createElement("div", { className: "overflow-x-auto" },
                    React.createElement("table", { className: "w-full text-left text-xs min-w-[720px]" },
                        React.createElement("thead", null,
                            React.createElement("tr", { className: "border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]" },
                                React.createElement("th", { className: "py-3 px-4" }, "Projet"),
                                React.createElement("th", { className: "py-3 px-4" }, "Client"),
                                React.createElement("th", { className: "py-3 px-4" }, "D\u00E9but"),
                                React.createElement("th", { className: "py-3 px-4" }, "Fin"),
                                React.createElement("th", { className: "py-3 px-4" }, "Statut"))),
                        React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, filtered.map(function (p) { return (React.createElement("tr", { key: p.id, className: "hover:bg-slate-50 transition cursor-pointer" },
                            React.createElement("td", { className: "py-3 px-4" },
                                React.createElement("a", { href: "#page-detail-projet&id=".concat(p.id), className: "font-black text-slate-900 hover:text-ikaBlue transition" }, p.name)),
                            React.createElement("td", { className: "py-3 px-4 text-slate-500" }, p.client),
                            React.createElement("td", { className: "py-3 px-4 text-slate-500" }, p.start),
                            React.createElement("td", { className: "py-3 px-4 text-slate-500" }, p.end),
                            React.createElement("td", { className: "py-3 px-4" },
                                React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold ".concat(p.cls) }, p.status)))); })))))))));
};
export default TousProjets;
//# sourceMappingURL=tous-projets.js.map