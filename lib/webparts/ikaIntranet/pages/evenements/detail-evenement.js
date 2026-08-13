import * as React from 'react';
import { FaCalendarDays, FaLocationDot, FaArrowLeft, FaArrowRight, FaUser, FaChair, FaTag, FaRegCalendarPlus } from 'react-icons/fa6';
import { EVENEMENTS } from '../../services/evenements/data';
var getEventIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var EventCard = function (props) {
    var event = props.event;
    return (React.createElement("a", { href: "#page-detail-evenement&id=".concat(event.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
        React.createElement("div", { className: "relative h-44 overflow-hidden" },
            React.createElement("img", { src: event.img, alt: event.title, className: "w-full h-full object-cover group-hover:scale-105 transition duration-500" }),
            React.createElement("span", { className: "absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark backdrop-blur-sm" }, event.category)),
        React.createElement("div", { className: "p-4" },
            React.createElement("h3", { className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2" }, event.title),
            React.createElement("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] font-semibold text-slate-500" },
                React.createElement("span", { className: "flex items-center gap-1.5" },
                    React.createElement(FaCalendarDays, { className: event.dateIcon }),
                    " ",
                    event.date),
                React.createElement("span", { className: "flex items-center gap-1.5" },
                    React.createElement(FaLocationDot, { className: event.locationIcon }),
                    " ",
                    event.location)))));
};
export var DetailEvenement = function () {
    var _a = React.useState(getEventIdFromHash), eventId = _a[0], setEventId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setEventId(getEventIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var event = EVENEMENTS.find(function (e) { return e.id === eventId; }) || EVENEMENTS[0];
    var idx = EVENEMENTS.findIndex(function (e) { return e.id === event.id; });
    var prev = EVENEMENTS[(idx - 1 + EVENEMENTS.length) % EVENEMENTS.length];
    var next = EVENEMENTS[(idx + 1) % EVENEMENTS.length];
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-tous-evenements", className: "hover:text-ikaBlue transition" }, "Tous les \u00E9v\u00E9nements"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, event.title)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "relative h-64 sm:h-80 lg:h-96 overflow-hidden" },
                        React.createElement("img", { src: event.img, alt: event.title, className: "w-full h-full object-cover" }),
                        React.createElement("span", { className: "absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-black uppercase tracking-wide text-ikaBlueDark backdrop-blur-sm flex items-center gap-1.5" },
                            React.createElement(FaTag, { className: "text-[10px]" }),
                            " ",
                            event.category)),
                    React.createElement("div", { className: "p-5 sm:p-8" },
                        React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark leading-snug" }, event.title),
                        React.createElement("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-600" },
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(FaCalendarDays, { className: event.dateIcon }),
                                " ",
                                event.date),
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(FaLocationDot, { className: event.locationIcon }),
                                " ",
                                event.location)),
                        React.createElement("div", { className: "mt-6 space-y-5" },
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "\u00C0 propos de l'\u00E9v\u00E9nement"),
                                React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, event.longText)),
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Intervenant"),
                                React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                    React.createElement(FaUser, { className: "text-ikaBlue text-xs" }),
                                    " ",
                                    event.speaker)),
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Capacit\u00E9"),
                                React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                    React.createElement(FaChair, { className: "text-emerald-600 text-xs" }),
                                    " ",
                                    event.seats))),
                        React.createElement("div", { className: "mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                            React.createElement("button", { className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                                React.createElement(FaRegCalendarPlus, null),
                                " S'inscrire \u00E0 l'\u00E9v\u00E9nement"),
                            React.createElement("a", { href: "#page-tous-evenements", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(FaArrowLeft, null),
                                " Voir tous les \u00E9v\u00E9nements")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4" }, "Autres \u00E9v\u00E9nements"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-4" }, EVENEMENTS.filter(function (e) { return e.id !== event.id; }).map(function (e) { return (React.createElement(EventCard, { key: e.id, event: e })); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-evenement&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, prev.title)),
                        React.createElement("a", { href: "#page-detail-evenement&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, next.title),
                            React.createElement(FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-tous-evenements", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition" },
                        React.createElement(FaArrowRight, null),
                        " Voir tous les \u00E9v\u00E9nements"))))));
};
export default DetailEvenement;
//# sourceMappingURL=detail-evenement.js.map