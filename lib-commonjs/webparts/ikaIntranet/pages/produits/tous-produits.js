"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TousProduits = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var index_1 = require("../../services/produits/index");
var TousProduits = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(''), search = _b[0], setSearch = _b[1];
    var _c = React.useState([]), produits = _c[0], setProduits = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    React.useEffect(function () {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        (0, index_1.loadProduits)(siteUrl)
            .then(function (data) {
            setProduits(data);
            setLoading(false);
        })
            .catch(function () { return setLoading(false); });
    }, [siteUrl]);
    var filtered = produits.filter(function (p) {
        var q = search.toLowerCase();
        var matchesSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        return matchesSearch;
    });
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("div", { className: "spinner-border text-ikaBlue", role: "status" }),
                React.createElement("p", { className: "mt-3 text-sm text-slate-500" }, "Chargement des produits..."))));
    }
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Produits & Services")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Produits & Services"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "D\u00E9couvrez l'ensemble des produits et services propos\u00E9s par IKA SOLUTION."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Rechercher un produit...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(fa6_1.FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " produit(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun produit ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, filtered.map(function (p) { return (React.createElement("a", { key: p.id, href: "#page-detail-produit&id=".concat(p.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg transition block" },
                React.createElement("div", { className: "w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden" },
                    React.createElement("img", { src: p.logo, alt: p.name, className: "w-full h-full object-cover" })),
                React.createElement("h3", { className: "mt-3 text-sm font-black text-slate-900 group-hover:text-ikaBlue transition" }, p.name),
                React.createElement("p", { className: "mt-1.5 text-[11px] text-slate-500 line-clamp-2 leading-relaxed" }, p.description))); }))))));
};
exports.TousProduits = TousProduits;
exports.default = exports.TousProduits;
//# sourceMappingURL=tous-produits.js.map