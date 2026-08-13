"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailAgenda = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/agenda/data");
var getAgendaIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var AgendaCard = function (props) {
    var item = props.item;
    return (React.createElement("a", { href: "#page-detail-agenda&id=".concat(item.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
        React.createElement("div", { className: "p-4 flex items-start gap-3" },
            React.createElement("div", { className: "w-12 h-12 rounded-xl ".concat(item.bg, " text-white flex flex-col items-center justify-center shrink-0 shadow-sm") },
                React.createElement("span", { className: "text-[9px] font-black uppercase" }, item.month),
                React.createElement("span", { className: "text-sm font-bold leading-none" }, item.day)),
            React.createElement("div", { className: "min-w-0" },
                React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, item.category),
                React.createElement("h3", { className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2" }, item.title),
                React.createElement("div", { className: "flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-slate-500" },
                    React.createElement(fa6_1.FaClock, { className: "text-[10px]" }),
                    " ",
                    item.time)))));
};
var DetailAgenda = function () {
    var _a = React.useState(getAgendaIdFromHash), agendaId = _a[0], setAgendaId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setAgendaId(getAgendaIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var item = data_1.AGENDA.find(function (a) { return a.id === agendaId; }) || data_1.AGENDA[0];
    var idx = data_1.AGENDA.findIndex(function (a) { return a.id === item.id; });
    var prev = data_1.AGENDA[(idx - 1 + data_1.AGENDA.length) % data_1.AGENDA.length];
    var next = data_1.AGENDA[(idx + 1) % data_1.AGENDA.length];
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-toutes-agenda", className: "hover:text-ikaBlue transition" }, "Agenda complet"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, item.title)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "relative h-48 sm:h-56 overflow-hidden bg-ikaBlueDark flex flex-col items-center justify-center text-white" },
                        React.createElement("div", { className: "w-20 h-20 rounded-2xl ".concat(item.bg, " text-white flex flex-col items-center justify-center shadow-lg") },
                            React.createElement("span", { className: "text-sm font-black uppercase" }, item.month),
                            React.createElement("span", { className: "text-3xl font-black leading-none" }, item.day)),
                        React.createElement("span", { className: "mt-4 px-3 py-1 rounded-lg bg-white/90 text-[11px] font-black uppercase tracking-wide text-ikaBlueDark flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaTag, { className: "text-[10px]" }),
                            " ",
                            item.category)),
                    React.createElement("div", { className: "p-5 sm:p-8" },
                        React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark leading-snug" }, item.title),
                        React.createElement("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-600" },
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaCalendarDays, { className: "text-ikaBlue" }),
                                " ",
                                item.month,
                                " ",
                                item.day),
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaClock, { className: "text-ikaBlue" }),
                                " ",
                                item.time),
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaLocationDot, { className: "text-ikaBlue" }),
                                " ",
                                item.location)),
                        React.createElement("div", { className: "mt-6 space-y-5" },
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "\u00C0 propos de cet \u00E9v\u00E9nement"),
                                React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, item.text)),
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Organisateur"),
                                React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                    React.createElement(fa6_1.FaUser, { className: "text-ikaBlue text-xs" }),
                                    " ",
                                    item.organizer))),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-toutes-agenda", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir l'agenda complet")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaCalendarDays, { className: "text-ikaBlue text-[11px]" }),
                            " Prochains rendez-vous"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-4" }, data_1.AGENDA.filter(function (a) { return a.id !== item.id; }).map(function (a) { return (React.createElement(AgendaCard, { key: a.id, item: a })); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-agenda&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, prev.title)),
                        React.createElement("a", { href: "#page-detail-agenda&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, next.title),
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-toutes-agenda", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir l'agenda complet"))))));
};
exports.DetailAgenda = DetailAgenda;
exports.default = exports.DetailAgenda;
//# sourceMappingURL=detail-agenda.js.map