"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TousEvenements = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var index_1 = require("../../services/evenements/index");
var TousEvenements = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(''), search = _b[0], setSearch = _b[1];
    var _c = React.useState('all'), category = _c[0], setCategory = _c[1];
    var _d = React.useState([]), items = _d[0], setItems = _d[1];
    var _e = React.useState(true), loading = _e[0], setLoading = _e[1];
    React.useEffect(function () {
        if (!siteUrl)
            return;
        (0, index_1.loadEvenements)(siteUrl)
            .then(function (data) {
            setItems(data);
            setLoading(false);
        })
            .catch(function () { return setLoading(false); });
    }, [siteUrl]);
    var categories = tslib_1.__spreadArray(['all'], Array.from(new Set(items.map(function (e) { return e.category; }))), true);
    var filtered = items.filter(function (e) {
        var q = search.toLowerCase();
        var matchesSearch = e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.text.toLowerCase().includes(q);
        var matchesCat = category === 'all' || e.category === category;
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
                        React.createElement("span", { className: "text-ikaBlue" }, "\u00C9v\u00E9nements")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Tous les \u00E9v\u00E9nements"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Retrouvez ici l'ensemble des \u00E9v\u00E9nements, s\u00E9minaires, ateliers et moments de coh\u00E9sion organis\u00E9s par IKA SOLUTION."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Rechercher un \u00E9v\u00E9nement...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(fa6_1.FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: category, onChange: function (e) { return setCategory(e.target.value); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }, categories.map(function (c) { return (React.createElement("option", { key: c, value: c }, c === 'all' ? 'Toutes les catégories' : c)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " \u00E9v\u00E9nement(s)")))),
            loading ? (React.createElement("div", { className: "bg-white rounded-2xl p-16 shadow-sm border border-slate-200 text-center" },
                React.createElement("div", { className: "spinner-border text-ikaBlue", role: "status" }),
                React.createElement("p", { className: "mt-3 text-sm text-slate-500" }, "Chargement des \u00E9v\u00E9nements..."))) : filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun \u00E9v\u00E9nement ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, filtered.map(function (e) { return (React.createElement("a", { key: e.id, href: "#page-detail-evenement&id=".concat(e.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
                React.createElement("div", { className: "relative h-44 overflow-hidden" },
                    React.createElement("img", { src: e.img, alt: e.title, className: "w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" }),
                    React.createElement("span", { className: "absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark backdrop-blur-sm" }, e.category)),
                React.createElement("div", { className: "p-4" },
                    React.createElement("h3", { className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2" }, e.title),
                    React.createElement("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] font-semibold text-slate-500" },
                        React.createElement("span", { className: "flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaCalendarDays, { className: e.dateIcon }),
                            " ",
                            e.date),
                        React.createElement("span", { className: "flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaLocationDot, { className: e.locationIcon }),
                            " ",
                            e.location)),
                    React.createElement("p", { className: "mt-2 text-[11px] text-slate-500 line-clamp-2 leading-relaxed" }, e.text)))); }))))));
};
exports.TousEvenements = TousEvenements;
exports.default = exports.TousEvenements;
//# sourceMappingURL=tous-evenements.js.map