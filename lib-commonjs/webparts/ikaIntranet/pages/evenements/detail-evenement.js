"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailEvenement = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var index_1 = require("../../services/evenements/index");
var index_2 = require("../../services/shared/index");
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
            React.createElement("img", { src: event.img, alt: event.title, className: "w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" }),
            React.createElement("span", { className: "absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark backdrop-blur-sm" }, event.category)),
        React.createElement("div", { className: "p-4" },
            React.createElement("h3", { className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2" }, event.title),
            React.createElement("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] font-semibold text-slate-500" },
                React.createElement("span", { className: "flex items-center gap-1.5" },
                    React.createElement(fa6_1.FaCalendarDays, { className: event.dateIcon }),
                    " ",
                    event.date),
                React.createElement("span", { className: "flex items-center gap-1.5" },
                    React.createElement(fa6_1.FaLocationDot, { className: event.locationIcon }),
                    " ",
                    event.location)))));
};
var DetailEvenement = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(getEventIdFromHash), eventId = _b[0], setEventId = _b[1];
    var _c = React.useState([]), items = _c[0], setItems = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    var _e = React.useState([]), likedBy = _e[0], setLikedBy = _e[1];
    var _f = React.useState([]), itemComments = _f[0], setItemComments = _f[1];
    var _g = React.useState(''), userEmail = _g[0], setUserEmail = _g[1];
    var _h = React.useState(''), userName = _h[0], setUserName = _h[1];
    var _j = React.useState(false), commentModal = _j[0], setCommentModal = _j[1];
    var _k = React.useState(''), commentInput = _k[0], setCommentInput = _k[1];
    React.useEffect(function () {
        var onHash = function () { return setEventId(getEventIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
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
    React.useEffect(function () {
        if (!siteUrl)
            return;
        (0, index_2.getCurrentUserEmail)(siteUrl).then(setUserEmail);
        (0, index_2.getCurrentUserName)(siteUrl).then(setUserName);
    }, [siteUrl]);
    var event = items.find(function (e) { return e.id === eventId; }) || items[0];
    React.useEffect(function () {
        if (event) {
            setLikedBy(event.likedBy || []);
            setItemComments(event.comments || []);
        }
    }, [event]);
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("div", { className: "spinner-border text-ikaBlue", role: "status" }),
                React.createElement("p", { className: "mt-3 text-sm text-slate-500" }, "Chargement des \u00E9v\u00E9nements..."))));
    }
    if (!event) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun \u00E9v\u00E9nement trouv\u00E9."),
                React.createElement("a", { href: "#page-tous-evenements", className: "inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" }, "Voir tous les \u00E9v\u00E9nements"))));
    }
    var idx = items.findIndex(function (e) { return e.id === event.id; });
    var prev = items[(idx - 1 + items.length) % items.length];
    var next = items[(idx + 1) % items.length];
    var isJoined = userEmail !== '' && likedBy.indexOf(userEmail) !== -1;
    var toggleJoin = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var newLikedBy;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!siteUrl || !userEmail)
                        return [2 /*return*/];
                    newLikedBy = isJoined
                        ? likedBy.filter(function (e) { return e !== userEmail; })
                        : tslib_1.__spreadArray(tslib_1.__spreadArray([], likedBy, true), [userEmail], false);
                    setLikedBy(newLikedBy);
                    return [4 /*yield*/, (0, index_1.updateEvenementLikedBy)(siteUrl, event.id, newLikedBy)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var addComment = function (e) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var val, newComment, newComments;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    val = commentInput.trim();
                    if (!val || !siteUrl || !userEmail)
                        return [2 /*return*/];
                    newComment = {
                        user: userName || 'Utilisateur',
                        email: userEmail,
                        text: val,
                        date: new Date().toISOString()
                    };
                    newComments = tslib_1.__spreadArray(tslib_1.__spreadArray([], itemComments, true), [newComment], false);
                    setItemComments(newComments);
                    setCommentInput('');
                    setCommentModal(false);
                    return [4 /*yield*/, (0, index_1.updateEvenementComments)(siteUrl, event.id, newComments)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
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
                        React.createElement("img", { src: event.img, alt: event.title, className: "w-full h-full object-cover object-top" }),
                        React.createElement("span", { className: "absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-black uppercase tracking-wide text-ikaBlueDark backdrop-blur-sm flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaTag, { className: "text-[10px]" }),
                            " ",
                            event.category)),
                    React.createElement("div", { className: "p-5 sm:p-8" },
                        React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark leading-snug" }, event.title),
                        React.createElement("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-600" },
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaCalendarDays, { className: event.dateIcon }),
                                " ",
                                event.date),
                            React.createElement("span", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200" },
                                React.createElement(fa6_1.FaLocationDot, { className: event.locationIcon }),
                                " ",
                                event.location)),
                        React.createElement("div", { className: "mt-6 space-y-5" },
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "\u00C0 propos de l'\u00E9v\u00E9nement"),
                                React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, event.longText)),
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Intervenant"),
                                React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                    React.createElement(fa6_1.FaUser, { className: "text-ikaBlue text-xs" }),
                                    " ",
                                    event.speaker)),
                            React.createElement("section", null,
                                React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Capacit\u00E9"),
                                React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                    React.createElement(fa6_1.FaChair, { className: "text-emerald-600 text-xs" }),
                                    " ",
                                    event.seats))),
                        React.createElement("div", { className: "mt-6 flex items-center gap-2" },
                            React.createElement("button", { onClick: toggleJoin, className: "px-4 py-2 rounded-full border font-bold text-xs transition flex items-center gap-1.5 ".concat(isJoined ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100') },
                                React.createElement(fa6_1.FaCircleCheck, { className: isJoined ? '' : 'text-xs' }),
                                " Je participe (",
                                likedBy.length,
                                ")"),
                            React.createElement("button", { onClick: function () { return setCommentModal(true); }, className: "px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs hover:bg-blue-100 transition flex items-center gap-1.5" },
                                React.createElement(fa6_1.FaComment, { className: "text-xs" }),
                                " ",
                                itemComments.length,
                                " Commentaires")),
                        React.createElement("div", { className: "mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                            React.createElement("button", { className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                                React.createElement(fa6_1.FaRegCalendarPlus, null),
                                " S'inscrire \u00E0 l'\u00E9v\u00E9nement"),
                            React.createElement("a", { href: "#page-tous-evenements", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir tous les \u00E9v\u00E9nements")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4" }, "Autres \u00E9v\u00E9nements"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-4" }, items.filter(function (e) { return e.id !== event.id; }).map(function (e) { return (React.createElement(EventCard, { key: e.id, event: e })); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-evenement&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, prev.title)),
                        React.createElement("a", { href: "#page-detail-evenement&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2" }, next.title),
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-tous-evenements", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir tous les \u00E9v\u00E9nements")))),
        commentModal && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative" },
                React.createElement("button", { onClick: function () { return setCommentModal(false); }, className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg" },
                    React.createElement(fa6_1.FaXmark, null)),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("span", { className: "w-12 h-12 rounded-full bg-ikaBlue bg-opacity-10 text-ikaBlue flex items-center justify-center text-base" },
                        React.createElement(fa6_1.FaCalendarDays, null)),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-slate-900 text-sm" }, "Commenter"),
                        React.createElement("p", { className: "text-xs text-slate-500" },
                            "Laissez votre avis sur ",
                            event.title.toLowerCase()))),
                React.createElement("div", { className: "max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs" },
                    itemComments.map(function (c, i) {
                        var isMe = c.email === userEmail;
                        return (React.createElement("div", { key: i, className: "p-2 rounded-lg border ".concat(isMe ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100') },
                            React.createElement("span", { className: "font-bold text-slate-900" },
                                c.user,
                                " :"),
                            React.createElement("span", { className: "text-slate-600" },
                                " ",
                                c.text)));
                    }),
                    itemComments.length === 0 && React.createElement("p", { className: "text-slate-400 text-center" }, "Aucun commentaire pour le moment.")),
                React.createElement("form", { onSubmit: addComment, className: "space-y-3" },
                    React.createElement("textarea", { value: commentInput, onChange: function (e) { return setCommentInput(e.target.value); }, required: true, rows: 3, placeholder: "\u00C9crivez votre commentaire ici...", className: "w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue" }),
                    React.createElement("div", { className: "flex items-center justify-end gap-2" },
                        React.createElement("button", { type: "button", onClick: function () { return setCommentModal(false); }, className: "px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50" }, "Annuler"),
                        React.createElement("button", { type: "submit", className: "px-4 py-2 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 shadow transition flex items-center gap-1.5" },
                            React.createElement("span", null, "Envoyer"),
                            React.createElement(fa6_1.FaPaperPlane, { className: "text-xs" })))))))));
};
exports.DetailEvenement = DetailEvenement;
exports.default = exports.DetailEvenement;
//# sourceMappingURL=detail-evenement.js.map