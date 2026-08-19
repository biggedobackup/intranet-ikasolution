"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToutesAgenda = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var index_1 = require("../../services/agenda/index");
var ToutesAgenda = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(''), search = _b[0], setSearch = _b[1];
    var _c = React.useState('all'), category = _c[0], setCategory = _c[1];
    var _d = React.useState([]), items = _d[0], setItems = _d[1];
    React.useEffect(function () {
        if (!siteUrl)
            return;
        (0, index_1.loadAgendas)(siteUrl)
            .then(function (data) {
            setItems(data);
        })
            .catch(function () { return undefined; });
    }, [siteUrl]);
    var categories = tslib_1.__spreadArray(['all'], Array.from(new Set(items.map(function (a) { return a.category; }))), true);
    var filtered = items.filter(function (a) {
        var q = search.toLowerCase();
        var matchesSearch = a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q) || a.text.toLowerCase().includes(q);
        var matchesCat = category === 'all' || a.category === category;
        return matchesSearch && matchesCat;
    });
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Agenda")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Agenda complet"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Retrouvez ici tous les rendez-vous, r\u00E9unions, formations et \u00E9ch\u00E9ances importantes d'IKA SOLUTION."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Rechercher un rendez-vous...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(fa6_1.FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: category, onChange: function (e) { return setCategory(e.target.value); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }, categories.map(function (c) { return (React.createElement("option", { key: c, value: c }, c === 'all' ? 'Toutes les catégories' : c)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " rendez-vous")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun rendez-vous ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" }, filtered.map(function (a) { return (React.createElement("a", { key: a.id, href: "#page-detail-agenda&id=".concat(a.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
                React.createElement("div", { className: "p-5 flex items-start gap-4" },
                    React.createElement("div", { className: "w-16 h-16 rounded-xl ".concat(a.bg, " text-white flex flex-col items-center justify-center shrink-0 shadow-sm") },
                        React.createElement("span", { className: "text-[10px] font-black uppercase" }, a.month),
                        React.createElement("span", { className: "text-xl font-black leading-none" }, a.day)),
                    React.createElement("div", { className: "min-w-0 flex-1" },
                        React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, a.category),
                        React.createElement("h3", { className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2" }, a.title),
                        React.createElement("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] font-semibold text-slate-500" },
                            React.createElement("span", { className: "flex items-center gap-1.5" },
                                React.createElement(fa6_1.FaClock, { className: "text-[10px]" }),
                                " ",
                                a.time),
                            React.createElement("span", { className: "flex items-center gap-1.5" },
                                React.createElement(fa6_1.FaLocationDot, { className: "text-[10px]" }),
                                " ",
                                a.location)))))); }))))));
};
exports.ToutesAgenda = ToutesAgenda;
exports.default = exports.ToutesAgenda;
//# sourceMappingURL=toutes-agenda.js.map