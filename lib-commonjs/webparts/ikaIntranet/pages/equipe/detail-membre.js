"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailMembre = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/equipe/data");
var getMembreIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var DetailMembre = function () {
    var _a = React.useState(getMembreIdFromHash), membreId = _a[0], setMembreId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setMembreId(getMembreIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var membre = data_1.MEMBRES.find(function (m) { return m.id === membreId; }) || data_1.MEMBRES[0];
    var colleagues = data_1.MEMBRES.filter(function (m) { return m.id !== membre.id && m.dept === membre.dept; });
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
                                    React.createElement(fa6_1.FaBriefcase, { className: "text-xs" }),
                                    " ",
                                    membre.role),
                                React.createElement("span", { className: "inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ".concat(data_1.DEPT_COLORS[membre.dept] || 'bg-slate-100 text-slate-700') }, membre.dept)),
                            React.createElement("div", { className: "flex gap-2" },
                                React.createElement("a", { href: "tel:".concat(membre.phone.replace(/\s/g, '')), className: "py-2 px-3 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center gap-1.5 shadow" },
                                    React.createElement(fa6_1.FaPhone, null),
                                    " Appeler"),
                                React.createElement("a", { href: "mailto:".concat(membre.email), className: "py-2 px-3 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 transition flex items-center gap-1.5 shadow" },
                                    React.createElement(fa6_1.FaEnvelope, null),
                                    " E-mail"))),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Biographie"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, membre.bio)),
                        React.createElement("div", { className: "mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs" },
                            React.createElement("div", { className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                                React.createElement("span", { className: "w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0" },
                                    React.createElement(fa6_1.FaMobileScreen, { className: "text-sm" })),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-[10px] text-slate-400 font-semibold uppercase tracking-wide" }, "T\u00E9l\u00E9phone Mobile"),
                                    React.createElement("a", { href: "tel:".concat(membre.phone.replace(/\s/g, '')), className: "font-bold text-slate-800 hover:text-ikaBlue transition" }, membre.phone))),
                            React.createElement("div", { className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                                React.createElement("span", { className: "w-8 h-8 rounded-lg bg-blue-100 text-ikaBlue flex items-center justify-center shrink-0" },
                                    React.createElement(fa6_1.FaPhone, { className: "text-sm" })),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-[10px] text-slate-400 font-semibold uppercase tracking-wide" }, "Poste IP"),
                                    React.createElement("span", { className: "font-mono font-bold text-ikaBlue" }, membre.ip))),
                            React.createElement("div", { className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                                React.createElement("span", { className: "w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0" },
                                    React.createElement(fa6_1.FaEnvelope, { className: "text-sm" })),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-[10px] text-slate-400 font-semibold uppercase tracking-wide" }, "Email"),
                                    React.createElement("span", { className: "font-semibold text-slate-700" }, membre.email)))),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-toute-equipe", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir toute l'\u00E9quipe")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaUsers, { className: "text-ikaBlue text-[11px]" }),
                            " Coll\u00E8gues \u2014 ",
                            membre.dept),
                        colleagues.length === 0 ? (React.createElement("p", { className: "text-xs text-slate-400 font-semibold" }, "Aucun coll\u00E8gue dans ce d\u00E9partement.")) : (React.createElement("div", { className: "grid grid-cols-1 gap-3" }, colleagues.map(function (c) { return (React.createElement("a", { key: c.id, href: "#page-detail-membre&id=".concat(c.id), className: "flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group" },
                            React.createElement("img", { src: c.avatar, alt: c.name, className: "w-10 h-10 rounded-full object-cover border border-slate-300 shrink-0" }),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition truncate" }, c.name),
                                React.createElement("p", { className: "text-[11px] text-slate-500 truncate" }, c.role)))); })))))))));
};
exports.DetailMembre = DetailMembre;
exports.default = exports.DetailMembre;
//# sourceMappingURL=detail-membre.js.map