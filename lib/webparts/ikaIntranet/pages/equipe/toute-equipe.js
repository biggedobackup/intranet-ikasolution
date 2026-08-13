import { __spreadArray } from "tslib";
import * as React from 'react';
import { FaMagnifyingGlass, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { MEMBRES, DEPT_COLORS } from '../../services/equipe/data';
export var TouteEquipe = function () {
    var _a = React.useState(''), search = _a[0], setSearch = _a[1];
    var _b = React.useState('all'), dept = _b[0], setDept = _b[1];
    var departments = __spreadArray(['all'], Array.from(new Set(MEMBRES.map(function (m) { return m.dept; }))), true);
    var filtered = MEMBRES.filter(function (m) {
        var q = search.toLowerCase();
        var matchesSearch = m.name.toLowerCase().includes(q) || m.phone.toLowerCase().includes(q) || m.ip.includes(q);
        var matchesDept = dept === 'all' || m.dept === dept;
        return matchesSearch && matchesDept;
    });
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Notre \u00E9quipe")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Notre \u00C9quipe"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "D\u00E9couvrez les collaborateurs d'IKA SOLUTION, r\u00E9partis par d\u00E9partement."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Nom, T\u00E9l\u00E9phone ou IP...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: dept, onChange: function (e) { return setDept(e.target.value); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }, departments.map(function (d) { return (React.createElement("option", { key: d, value: d }, d === 'all' ? 'Tous les départements' : d)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " collaborateur(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun collaborateur ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, filtered.map(function (m) { return (React.createElement("a", { key: m.id, href: "#page-detail-membre&id=".concat(m.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
                React.createElement("div", { className: "h-16 bg-gradient-to-r from-ikaBlueDark to-ikaBlue relative" },
                    React.createElement("img", { src: m.avatar, alt: m.name, className: "absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl object-cover border-4 border-white shadow" })),
                React.createElement("div", { className: "pt-11 px-4 pb-4 text-center" },
                    React.createElement("h3", { className: "text-sm font-black text-slate-900 group-hover:text-ikaBlue transition" }, m.name),
                    React.createElement("p", { className: "text-[11px] font-bold text-ikaBlue mt-0.5" }, m.role),
                    React.createElement("span", { className: "inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ".concat(DEPT_COLORS[m.dept] || 'bg-slate-100 text-slate-700') }, m.dept),
                    React.createElement("div", { className: "mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-500" },
                        React.createElement("span", { className: "flex items-center gap-1.5" },
                            React.createElement(FaPhone, { className: "text-emerald-500 text-[10px]" }),
                            " ",
                            m.phone)),
                    React.createElement("div", { className: "mt-1 flex items-center justify-center gap-1.5 text-[10px] text-slate-400" },
                        React.createElement(FaEnvelope, { className: "text-[9px]" }),
                        " ",
                        React.createElement("span", { className: "truncate" }, m.email))))); }))))));
};
export default TouteEquipe;
//# sourceMappingURL=toute-equipe.js.map