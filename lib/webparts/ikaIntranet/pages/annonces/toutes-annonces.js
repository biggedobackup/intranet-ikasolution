import * as React from 'react';
import { FaCakeCandles, FaHeart, FaPlaneDeparture, FaBullhorn } from 'react-icons/fa6';
import { ANNONCES } from '../../services/annonces/data';
var TYPE_FILTERS = [
    ['all', 'Tous'],
    ['anniversaire', 'Anniversaire'],
    ['mariage', 'Mariage'],
    ['absence', 'Absence']
];
var typeBadge = function (type) {
    switch (type) {
        case 'anniversaire': return React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase" },
            React.createElement(FaCakeCandles, { className: "text-[10px]" }),
            " Anniversaire");
        case 'mariage': return React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold uppercase" },
            React.createElement(FaHeart, { className: "text-[10px]" }),
            " Mariage");
        case 'absence': return React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-ikaBlue text-[10px] font-bold uppercase" },
            React.createElement(FaPlaneDeparture, { className: "text-[10px]" }),
            " Absence");
        default: return React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase" },
            React.createElement(FaBullhorn, { className: "text-[10px]" }),
            " Annonce");
    }
};
export var ToutesAnnonces = function () {
    var _a = React.useState('all'), filter = _a[0], setFilter = _a[1];
    var filtered = ANNONCES.filter(function (a) { return filter === 'all' || a.type === filter; });
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-amber-50 rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-amber-600" }, "Annonces")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Annonces"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Toutes les annonces de la vie d'\u00E9quipe : anniversaires, mariages, naissances et absences."),
                    React.createElement("div", { className: "mt-6 flex flex-wrap items-center gap-2 text-[11px] font-bold" },
                        TYPE_FILTERS.map(function (_a) {
                            var type = _a[0], label = _a[1];
                            return (React.createElement("button", { key: type, onClick: function () { return setFilter(type); }, className: "px-3 py-1.5 rounded-full transition ".concat(filter === type ? 'bg-ikaBlue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200') }, label));
                        }),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400 ml-2" },
                            filtered.length,
                            " annonce(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucune annonce dans cette cat\u00E9gorie."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, filtered.map(function (a) { return (React.createElement("a", { key: a.id, href: "#page-detail-annonce&id=".concat(a.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg transition block" },
                React.createElement("div", { className: "flex items-center justify-between" },
                    a.avatars.length > 0 ? (React.createElement("div", { className: "flex -space-x-2.5 shrink-0" }, a.avatars.map(function (av, j) { return (React.createElement("img", { key: j, src: av, className: "w-9 h-9 rounded-full object-cover border-2 border-white", alt: "" })); }))) : (a.avatar ? React.createElement("img", { src: a.avatar, alt: "", className: "w-10 h-10 rounded-full object-cover ".concat(a.badge) })
                        : React.createElement("span", { className: "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400" },
                            React.createElement(FaBullhorn, null))),
                    typeBadge(a.type)),
                React.createElement("h3", { className: "mt-3 text-sm font-black text-slate-900 group-hover:text-amber-600 transition" }, a.title),
                React.createElement("p", { className: "text-[10px] font-semibold text-slate-400 mt-0.5" }, a.time),
                React.createElement("p", { className: "mt-2 text-[11px] text-slate-500 line-clamp-2 leading-relaxed" }, a.text))); }))))));
};
export default ToutesAnnonces;
//# sourceMappingURL=toutes-annonces.js.map