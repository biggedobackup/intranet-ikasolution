import { __awaiter, __generator, __spreadArray } from "tslib";
import * as React from 'react';
import { FaArrowLeft, FaArrowRight, FaCakeCandles, FaComment, FaHeart, FaPaperPlane, FaPlaneDeparture, FaUsers, FaBullhorn, FaXmark } from 'react-icons/fa6';
import { loadAnnonces, updateAnnonceLikedBy, updateAnnonceComments } from '../../services/annonces/index';
import { getCurrentUserEmail, getCurrentUserName } from '../../services/shared/index';
var getAnnonceIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var typeIcon = function (type) {
    switch (type) {
        case 'anniversaire': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0" },
            React.createElement(FaCakeCandles, { className: "text-sm" }));
        case 'mariage': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0" },
            React.createElement(FaHeart, { className: "text-sm" }));
        case 'absence': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-blue-100 text-ikaBlue flex items-center justify-center shrink-0" },
            React.createElement(FaPlaneDeparture, { className: "text-sm" }));
        default: return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0" },
            React.createElement(FaBullhorn, { className: "text-sm" }));
    }
};
export var DetailAnnonce = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(getAnnonceIdFromHash), annonceId = _b[0], setAnnonceId = _b[1];
    var _c = React.useState([]), items = _c[0], setItems = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    var _e = React.useState([]), likedBy = _e[0], setLikedBy = _e[1];
    var _f = React.useState([]), itemComments = _f[0], setItemComments = _f[1];
    var _g = React.useState(''), userEmail = _g[0], setUserEmail = _g[1];
    var _h = React.useState(''), userName = _h[0], setUserName = _h[1];
    var _j = React.useState(false), commentModal = _j[0], setCommentModal = _j[1];
    var _k = React.useState(''), commentInput = _k[0], setCommentInput = _k[1];
    React.useEffect(function () {
        var onHash = function () { return setAnnonceId(getAnnonceIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    React.useEffect(function () {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        loadAnnonces(siteUrl)
            .then(function (data) {
            setItems(data);
            setLoading(false);
        })
            .catch(function () { return setLoading(false); });
    }, [siteUrl]);
    React.useEffect(function () {
        if (!siteUrl)
            return;
        getCurrentUserEmail(siteUrl)
            .then(setUserEmail)
            .catch(function (err) {
            console.error('[DetailAnnonce] Email courant :', err);
        });
        getCurrentUserName(siteUrl)
            .then(setUserName)
            .catch(function (err) {
            console.error('[DetailAnnonce] Nom courant :', err);
        });
    }, [siteUrl]);
    var annonce = items.find(function (a) { return a.id === annonceId; }) || items[0];
    React.useEffect(function () {
        if (annonce) {
            setLikedBy(annonce.likedBy || []);
            setItemComments(annonce.comments || []);
        }
    }, [annonce]);
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("div", { className: "spinner-border text-amber-600", role: "status" }),
                React.createElement("p", { className: "mt-3 text-sm text-slate-500" }, "Chargement de l'annonce..."))));
    }
    if (!annonce) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Annonce introuvable."),
                React.createElement("a", { href: "#page-toutes-annonces", className: "inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" }, "Voir toutes les annonces"))));
    }
    var idx = items.findIndex(function (a) { return a.id === annonce.id; });
    var prev = items[(idx - 1 + items.length) % items.length];
    var next = items[(idx + 1) % items.length];
    var isLiked = userEmail !== '' && likedBy.indexOf(userEmail) !== -1;
    var toggleLike = function () { return __awaiter(void 0, void 0, void 0, function () {
        var newLikedBy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!siteUrl || !userEmail)
                        return [2 /*return*/];
                    newLikedBy = isLiked
                        ? likedBy.filter(function (e) { return e !== userEmail; })
                        : __spreadArray(__spreadArray([], likedBy, true), [userEmail], false);
                    setLikedBy(newLikedBy);
                    return [4 /*yield*/, updateAnnonceLikedBy(siteUrl, annonce.id, newLikedBy)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var addComment = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var val, newComment, newComments;
        return __generator(this, function (_a) {
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
                    newComments = __spreadArray(__spreadArray([], itemComments, true), [newComment], false);
                    setItemComments(newComments);
                    setCommentInput('');
                    setCommentModal(false);
                    return [4 /*yield*/, updateAnnonceComments(siteUrl, annonce.id, newComments)];
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
                React.createElement("a", { href: "#page-toutes-annonces", className: "hover:text-ikaBlue transition" }, "Annonces"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-amber-600" }, annonce.title)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "p-6 sm:p-8" },
                        React.createElement("div", { className: "flex items-center gap-4" },
                            annonce.avatar ? (React.createElement("img", { src: annonce.avatar, alt: "", className: "w-14 h-14 rounded-full object-cover ".concat(annonce.badge) })) : typeIcon(annonce.type),
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, annonce.title),
                                React.createElement("p", { className: "text-xs font-semibold text-slate-400 mt-0.5" }, annonce.time))),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Message"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, annonce.text)),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Cat\u00E9gorie"),
                            React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                React.createElement(FaBullhorn, { className: "text-amber-600 text-xs" }),
                                " ",
                                annonce.type)),
                        React.createElement("div", { className: "mt-6 flex items-center gap-2" },
                            React.createElement("button", { onClick: toggleLike, className: "px-4 py-2 rounded-full border font-bold text-xs transition flex items-center gap-1.5 ".concat(isLiked ? 'bg-rose-500 text-white border-rose-500 shadow-sm' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100') },
                                React.createElement(FaHeart, { className: isLiked ? '' : 'text-xs' }),
                                " ",
                                likedBy.length,
                                " J'aime"),
                            React.createElement("button", { onClick: function () { return setCommentModal(true); }, className: "px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs hover:bg-blue-100 transition flex items-center gap-1.5" },
                                React.createElement(FaComment, { className: "text-xs" }),
                                " ",
                                itemComments.length,
                                " Commentaires")),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-toutes-annonces", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(FaArrowLeft, null),
                                " Voir toutes les annonces")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(FaUsers, { className: "text-amber-600 text-[11px]" }),
                            " Autres annonces"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3" }, items.filter(function (a) { return a.id !== annonce.id; }).map(function (a) { return (React.createElement("a", { key: a.id, href: "#page-detail-annonce&id=".concat(a.id), className: "flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition group" },
                            a.avatar ? React.createElement("img", { src: a.avatar, alt: "", className: "w-9 h-9 rounded-full object-cover ".concat(a.badge, " shrink-0") })
                                : typeIcon(a.type),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-amber-600 transition" }, a.title),
                                React.createElement("p", { className: "text-[10px] text-slate-400" }, a.time)))); }))),
                    React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-annonce&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2" }, prev.title)),
                        React.createElement("a", { href: "#page-detail-annonce&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2" }, next.title),
                            React.createElement(FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-amber-600 ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-toutes-annonces", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition" },
                        React.createElement(FaArrowRight, null),
                        " Voir toutes les annonces")))),
        commentModal && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative" },
                React.createElement("button", { onClick: function () { return setCommentModal(false); }, className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg" },
                    React.createElement(FaXmark, null)),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("span", { className: "w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-base" },
                        React.createElement(FaBullhorn, null)),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-slate-900 text-sm" }, "Commenter"),
                        React.createElement("p", { className: "text-xs text-slate-500" },
                            "Laissez votre avis sur ",
                            annonce.title.toLowerCase()))),
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
                            React.createElement(FaPaperPlane, { className: "text-xs" })))))))));
};
export default DetailAnnonce;
//# sourceMappingURL=detail-annonce.js.map