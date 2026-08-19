import * as React from 'react';
import { FaCrown, FaTrophy, FaHeart, FaComment } from 'react-icons/fa6';
import { loadEmployesMois } from '../../services/employes-mois/index';
export var TousEmployesMois = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState([]), employes = _b[0], setEmployes = _b[1];
    var _c = React.useState(true), loading = _c[0], setLoading = _c[1];
    React.useEffect(function () {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        loadEmployesMois(siteUrl)
            .then(function (data) {
            setEmployes(data);
            setLoading(false);
        })
            .catch(function (err) {
            console.error('[TousEmployesMois] Erreur :', err);
            setLoading(false);
        });
    }, [siteUrl]);
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-amber-50 rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-amber-600" }, "Employ\u00E9s du mois")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark flex items-center gap-2" },
                        React.createElement(FaTrophy, { className: "text-amber-500 text-2xl" }),
                        " Employ\u00E9s du mois"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Les collaborateurs d'IKA SOLUTION distingu\u00E9s chaque mois pour leur engagement et leurs contributions."))),
            loading ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-400 font-semibold" }, "Chargement..."))) : employes.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun laur\u00E9at pour le moment."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, employes.map(function (e) { return (React.createElement("a", { key: e.id, href: "#page-detail-employe-mois&id=".concat(e.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
                React.createElement("div", { className: "relative h-14 bg-gradient-to-r from-amber-500 to-amber-400" },
                    React.createElement("span", { className: "absolute top-3 right-3 px-2 py-1 rounded-full bg-white/90 text-[9px] font-black uppercase tracking-wide text-amber-700 flex items-center gap-1" },
                        React.createElement(FaCrown, { className: "text-[9px]" }),
                        " ",
                        e.month,
                        " ",
                        e.year),
                    React.createElement("img", { src: e.photo, alt: e.name, className: "absolute -bottom-9 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full object-cover border-4 border-white shadow" })),
                React.createElement("div", { className: "pt-12 px-4 pb-4 text-center" },
                    React.createElement("h3", { className: "text-sm font-black text-slate-900 group-hover:text-amber-600 transition" }, e.name),
                    React.createElement("p", { className: "text-[11px] font-bold text-ikaBlue mt-0.5" },
                        e.role,
                        " \u2014 ",
                        e.dept),
                    React.createElement("p", { className: "mt-2 text-[11px] text-slate-500 italic line-clamp-4 leading-snug" },
                        "\u00AB ",
                        e.quote,
                        " \u00BB"),
                    React.createElement("div", { className: "mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] font-bold" },
                        React.createElement("span", { className: "px-2.5 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-600 flex items-center gap-1" },
                            React.createElement(FaHeart, { className: "text-[10px]" }),
                            " ",
                            (e.likedBy || []).length),
                        React.createElement("span", { className: "px-2.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue flex items-center gap-1" },
                            React.createElement(FaComment, { className: "text-[10px]" }),
                            " ",
                            (e.comments || []).length))))); }))))));
};
export default TousEmployesMois;
//# sourceMappingURL=tous-employes-mois.js.map