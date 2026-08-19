"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToutesAnnonces = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var index_1 = require("../../services/annonces/index");
var typeBadge = function (type) {
    switch (type) {
        case 'anniversaire': return React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase" },
            React.createElement(fa6_1.FaCakeCandles, { className: "text-[10px]" }),
            " Anniversaire");
        case 'mariage': return React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold uppercase" },
            React.createElement(fa6_1.FaHeart, { className: "text-[10px]" }),
            " Mariage");
        case 'absence': return React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-ikaBlue text-[10px] font-bold uppercase" },
            React.createElement(fa6_1.FaPlaneDeparture, { className: "text-[10px]" }),
            " Absence");
        default: return React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase" },
            React.createElement(fa6_1.FaBullhorn, { className: "text-[10px]" }),
            " Annonce");
    }
};
var ToutesAnnonces = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState('all'), filter = _b[0], setFilter = _b[1];
    var _c = React.useState([]), annonces = _c[0], setAnnonces = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    React.useEffect(function () {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        (0, index_1.loadAnnonces)(siteUrl)
            .then(function (data) {
            setAnnonces(data);
            setLoading(false);
        })
            .catch(function () { return setLoading(false); });
    }, [siteUrl]);
    var typeFilters = [['all', 'Tous']];
    Array.from(new Set(annonces.map(function (a) { return a.type; }))).forEach(function (t) {
        if (t)
            typeFilters.push([t, t.charAt(0).toUpperCase() + t.slice(1)]);
    });
    var filtered = annonces.filter(function (a) { return filter === 'all' || a.type === filter; });
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("div", { className: "spinner-border text-amber-600", role: "status" }),
                React.createElement("p", { className: "mt-3 text-sm text-slate-500" }, "Chargement des annonces..."))));
    }
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
                        typeFilters.map(function (_a) {
                            var type = _a[0], label = _a[1];
                            return (React.createElement("button", { key: type, onClick: function () { return setFilter(type); }, className: "px-3 py-1.5 rounded-full transition ".concat(filter === type ? 'bg-ikaBlue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200') }, label));
                        }),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400 ml-2" },
                            filtered.length,
                            " annonce(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucune annonce dans cette cat\u00E9gorie."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, filtered.map(function (a) { return (React.createElement("a", { key: a.id, href: "#page-detail-annonce&id=".concat(a.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg transition block" },
                React.createElement("div", { className: "flex items-center justify-between" },
                    a.avatar ? React.createElement("img", { src: a.avatar, alt: "", className: "w-10 h-10 rounded-full object-cover ".concat(a.badge) })
                        : React.createElement("span", { className: "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400" },
                            React.createElement(fa6_1.FaBullhorn, null)),
                    typeBadge(a.type)),
                React.createElement("h3", { className: "mt-3 text-sm font-black text-slate-900 group-hover:text-amber-600 transition" }, a.title),
                React.createElement("p", { className: "text-[10px] font-semibold text-slate-400 mt-0.5" }, a.time),
                React.createElement("p", { className: "mt-2 text-[11px] text-slate-500 line-clamp-2 leading-relaxed" }, a.text))); }))))));
};
exports.ToutesAnnonces = ToutesAnnonces;
exports.default = exports.ToutesAnnonces;
//# sourceMappingURL=toutes-annonces.js.map