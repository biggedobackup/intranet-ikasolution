"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailProjet = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var index_1 = require("../../services/projets/index");
var getProjetIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var DetailProjet = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(getProjetIdFromHash), projetId = _b[0], setProjetId = _b[1];
    var _c = React.useState([]), projets = _c[0], setProjets = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    React.useEffect(function () {
        var onHash = function () { return setProjetId(getProjetIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    React.useEffect(function () {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        (0, index_1.loadProjets)(siteUrl)
            .then(function (data) {
            setProjets(data);
            setLoading(false);
        })
            .catch(function () { return setLoading(false); });
    }, [siteUrl]);
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("div", { className: "spinner-border text-ikaBlue", role: "status" }),
                React.createElement("p", { className: "mt-3 text-sm text-slate-500" }, "Chargement du projet..."))));
    }
    var projet = projets.find(function (p) { return p.id === projetId; }) || projets[0];
    if (!projet) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Projet introuvable."),
                React.createElement("a", { href: "#page-tous-projets", className: "inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" }, "Voir tous les projets"))));
    }
    var idx = projets.findIndex(function (p) { return p.id === projet.id; });
    var prev = projets[(idx - 1 + projets.length) % projets.length];
    var next = projets[(idx + 1) % projets.length];
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-tous-projets", className: "hover:text-ikaBlue transition" }, "Tous les projets"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, projet.name)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "relative h-40 sm:h-48 overflow-hidden bg-gradient-to-r from-ikaBlueDark to-ikaBlue flex flex-col items-center justify-center text-white p-6" },
                        React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center" },
                            React.createElement(fa6_1.FaDiagramProject, { className: "text-3xl text-white/90" })),
                        React.createElement("h1", { className: "mt-3 text-xl sm:text-2xl font-black" }, projet.name),
                        React.createElement("span", { className: "mt-2 px-3 py-1 rounded-full text-[10px] font-bold ".concat(projet.cls) }, projet.status)),
                    React.createElement("div", { className: "p-5 sm:p-8" },
                        React.createElement("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600" },
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaCalendarDays, { className: "text-ikaBlue" }),
                                " D\u00E9but : ",
                                projet.start),
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaCalendarDays, { className: "text-ikaBlue" }),
                                " Fin : ",
                                projet.end)),
                        React.createElement("div", { className: "mt-6 space-y-5" },
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Description du projet"),
                                React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, projet.description)),
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Client"),
                                React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                    React.createElement(fa6_1.FaUser, { className: "text-ikaBlue text-xs" }),
                                    " ",
                                    projet.client)),
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "\u00C9quipe projet"),
                                React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                    React.createElement(fa6_1.FaUsers, { className: "text-emerald-600 text-xs" }),
                                    " ",
                                    projet.members))),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-tous-projets", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir tous les projets")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaDiagramProject, { className: "text-ikaBlue text-[11px]" }),
                            " Autres projets"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3" }, projets.filter(function (p) { return p.id !== projet.id; }).map(function (p) { return (React.createElement("a", { key: p.id, href: "#page-detail-projet&id=".concat(p.id), className: "p-3 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group block" },
                            React.createElement("div", { className: "flex items-center justify-between gap-2" },
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition" }, p.name),
                                React.createElement("span", { className: "px-2 py-0.5 rounded-full text-[9px] font-bold ".concat(p.cls) }, p.status)),
                            React.createElement("p", { className: "mt-1 text-[10px] text-slate-500" },
                                p.start,
                                " \u2192 ",
                                p.end))); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-projet&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, prev.name)),
                        React.createElement("a", { href: "#page-detail-projet&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, next.name),
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-tous-projets", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir tous les projets"))))));
};
exports.DetailProjet = DetailProjet;
exports.default = exports.DetailProjet;
//# sourceMappingURL=detail-projet.js.map