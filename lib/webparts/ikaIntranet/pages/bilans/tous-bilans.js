import * as React from 'react';
import { FaCalendarDay, FaFilePdf, FaMagnifyingGlass } from 'react-icons/fa6';
import { loadBilans } from '../../services/bilans/index';
export var TousBilans = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(''), search = _b[0], setSearch = _b[1];
    var _c = React.useState([]), bilans = _c[0], setBilans = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    React.useEffect(function () {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        loadBilans(siteUrl)
            .then(function (data) {
            setBilans(data);
            setLoading(false);
        })
            .catch(function (err) {
            console.error('[TousBilans] Erreur :', err);
            setLoading(false);
        });
    }, [siteUrl]);
    var filtered = bilans.filter(function (b) {
        var q = search.toLowerCase();
        return b.period.toLowerCase().includes(q) || b.file.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q);
    });
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Bilans hebdomadaires")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Bilans hebdomadaires"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Retrouvez ici l'ensemble des bilans d'activit\u00E9 hebdomadaires d'IKA SOLUTION."),
                    React.createElement("div", { className: "mt-6 relative max-w-md" },
                        React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Rechercher un bilan...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                        React.createElement(FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })))),
            loading ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-400 font-semibold" }, "Chargement..."))) : filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, bilans.length === 0 ? 'Aucun bilan pour le moment.' : 'Aucun bilan ne correspond à votre recherche.'))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, filtered.map(function (b) { return (React.createElement("a", { key: b.id, href: b.fileUrl || '#', target: b.fileUrl ? '_blank' : undefined, rel: "noopener noreferrer", className: "group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg transition block" },
                React.createElement("div", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-700" },
                    React.createElement(FaCalendarDay, { className: "text-ikaBlue shrink-0" }),
                    React.createElement("span", { className: "flex-1 group-hover:text-ikaBlue transition" }, b.period)),
                React.createElement("div", { className: "mt-3 flex items-center gap-2.5 border-t border-slate-100 pt-3" },
                    React.createElement(FaFilePdf, { className: "text-rose-600 text-xl shrink-0" }),
                    React.createElement("div", { className: "min-w-0" },
                        React.createElement("h3", { className: "text-xs font-bold text-slate-900 truncate group-hover:text-ikaBlue transition" }, b.file),
                        React.createElement("p", { className: "text-[10px] text-slate-400" }, b.size))))); }))))));
};
export default TousBilans;
//# sourceMappingURL=tous-bilans.js.map