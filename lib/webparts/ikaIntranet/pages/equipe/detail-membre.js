import * as React from 'react';
import { FaArrowLeft, FaMobileScreen, FaPhone, FaEnvelope, FaUsers, FaBriefcase } from 'react-icons/fa6';
import { loadMembres, DEPT_COLORS } from '../../services/equipe/index';
var getMembreIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
export var DetailMembre = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(getMembreIdFromHash), membreId = _b[0], setMembreId = _b[1];
    var _c = React.useState([]), membres = _c[0], setMembres = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    React.useEffect(function () {
        var onHash = function () { return setMembreId(getMembreIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    React.useEffect(function () {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        loadMembres(siteUrl)
            .then(function (data) {
            setMembres(data);
            setLoading(false);
        })
            .catch(function () { return setLoading(false); });
    }, [siteUrl]);
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("div", { className: "spinner-border text-ikaBlue", role: "status" }),
                React.createElement("p", { className: "mt-3 text-sm text-slate-500" }, "Chargement de la fiche membre..."))));
    }
    var membre = membres.find(function (m) { return m.id === membreId; }) || membres[0];
    if (!membre) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Membre introuvable."),
                React.createElement("a", { href: "#page-toute-equipe", className: "inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" }, "Voir toute l'\u00E9quipe"))));
    }
    var colleagues = membres.filter(function (m) { return m.id !== membre.id && m.dept === membre.dept; });
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-toute-equipe", className: "hover:text-ikaBlue transition" }, "Notre \u00E9quipe"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, membre.name)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "h-28 bg-gradient-to-r from-ikaBlueDark to-ikaBlue relative" },
                        React.createElement("div", { className: "absolute -bottom-12 left-6 sm:left-8" },
                            React.createElement("img", { src: membre.avatar, alt: membre.name, className: "w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg" }))),
                    React.createElement("div", { className: "pt-16 px-6 sm:px-8 pb-8" },
                        React.createElement("div", { className: "flex flex-wrap items-start justify-between gap-3" },
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, membre.name),
                                React.createElement("p", { className: "text-sm font-bold text-ikaBlue mt-0.5 flex items-center gap-1.5" },
                                    React.createElement(FaBriefcase, { className: "text-xs" }),
                                    " ",
                                    membre.role),
                                React.createElement("span", { className: "inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ".concat(DEPT_COLORS[membre.dept] || 'bg-slate-100 text-slate-700') }, membre.dept)),
                            React.createElement("div", { className: "flex gap-2" },
                                React.createElement("a", { href: "tel:".concat(membre.phone.replace(/\s/g, '')), className: "py-2 px-3 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center gap-1.5 shadow" },
                                    React.createElement(FaPhone, null),
                                    " Appeler"),
                                React.createElement("a", { href: "mailto:".concat(membre.email), className: "py-2 px-3 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 transition flex items-center gap-1.5 shadow" },
                                    React.createElement(FaEnvelope, null),
                                    " E-mail"))),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Biographie"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, membre.bio)),
                        React.createElement("div", { className: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs" },
                            React.createElement("div", { className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                                React.createElement("span", { className: "w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0" },
                                    React.createElement(FaMobileScreen, { className: "text-sm" })),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-[10px] text-slate-400 font-semibold uppercase tracking-wide" }, "T\u00E9l\u00E9phone Mobile"),
                                    React.createElement("a", { href: "tel:".concat(membre.phone.replace(/\s/g, '')), className: "font-bold text-slate-800 hover:text-ikaBlue transition" }, membre.phone))),
                            React.createElement("div", { className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                                React.createElement("span", { className: "w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0" },
                                    React.createElement(FaEnvelope, { className: "text-sm" })),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-[10px] text-slate-400 font-semibold uppercase tracking-wide" }, "Email"),
                                    React.createElement("span", { className: "font-semibold text-slate-700" }, membre.email)))),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-toute-equipe", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(FaArrowLeft, null),
                                " Voir toute l'\u00E9quipe")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(FaUsers, { className: "text-ikaBlue text-[11px]" }),
                            " Coll\u00E8gues \u2014 ",
                            membre.dept),
                        colleagues.length === 0 ? (React.createElement("p", { className: "text-xs text-slate-400 font-semibold" }, "Aucun coll\u00E8gue dans ce d\u00E9partement.")) : (React.createElement("div", { className: "grid grid-cols-1 gap-3" }, colleagues.map(function (c) { return (React.createElement("a", { key: c.id, href: "#page-detail-membre&id=".concat(c.id), className: "flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group" },
                            React.createElement("img", { src: c.avatar, alt: c.name, className: "w-10 h-10 rounded-full object-cover border border-slate-300 shrink-0" }),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition truncate" }, c.name),
                                React.createElement("p", { className: "text-[11px] text-slate-500 truncate" }, c.role)))); })))))))));
};
export default DetailMembre;
//# sourceMappingURL=detail-membre.js.map