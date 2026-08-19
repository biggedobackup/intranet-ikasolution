import { __awaiter, __generator, __spreadArray } from "tslib";
import * as React from 'react';
import { FaArrowLeft, FaArrowRight, FaCrown, FaHeart, FaComment, FaTrophy, FaCalendarDays, FaPaperPlane, FaXmark } from 'react-icons/fa6';
import { loadEmployesMois, updateEmployeMoisLikedBy, updateEmployeMoisComments } from '../../services/employes-mois/index';
import { getCurrentUserEmail, getCurrentUserName } from '../../services/shared/index';
var getEmployeMoisIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
export var DetailEmployeMois = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(getEmployeMoisIdFromHash), employeId = _b[0], setEmployeId = _b[1];
    var _c = React.useState([]), employes = _c[0], setEmployes = _c[1];
    var _d = React.useState(true), loading = _d[0], setLoading = _d[1];
    var _e = React.useState([]), likedBy = _e[0], setLikedBy = _e[1];
    var _f = React.useState([]), itemComments = _f[0], setItemComments = _f[1];
    var _g = React.useState(false), commentModal = _g[0], setCommentModal = _g[1];
    var _h = React.useState(''), commentInput = _h[0], setCommentInput = _h[1];
    var _j = React.useState(''), userEmail = _j[0], setUserEmail = _j[1];
    var _k = React.useState(''), userName = _k[0], setUserName = _k[1];
    React.useEffect(function () {
        var onHash = function () { return setEmployeId(getEmployeMoisIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
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
            console.error('[DetailEmployeMois] Erreur :', err);
            setLoading(false);
        });
        getCurrentUserEmail(siteUrl)
            .then(setUserEmail)
            .catch(function (err) {
            console.error('[DetailEmployeMois] Email courant :', err);
        });
        getCurrentUserName(siteUrl)
            .then(setUserName)
            .catch(function (err) {
            console.error('[DetailEmployeMois] Nom courant :', err);
        });
    }, [siteUrl]);
    var employe = employes.find(function (e) { return e.id === employeId; }) || employes[0];
    React.useEffect(function () {
        if (!employe)
            return;
        setLikedBy(employe.likedBy || []);
        setItemComments(employe.comments || []);
    }, [employe]);
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    React.createElement("p", { className: "text-sm text-slate-400 font-semibold" }, "Chargement...")))));
    }
    if (!employe) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun laur\u00E9at trouv\u00E9."),
                    React.createElement("a", { href: "#page-tous-employes-mois", className: "mt-4 inline-block px-5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition" }, "Voir tous les employ\u00E9s du mois")))));
    }
    var isLiked = userEmail !== '' && likedBy.indexOf(userEmail) !== -1;
    var idx = employes.findIndex(function (e) { return e.id === employe.id; });
    var prev = employes[(idx - 1 + employes.length) % employes.length];
    var next = employes[(idx + 1) % employes.length];
    var toggleLike = function () {
        if (!siteUrl || !userEmail)
            return;
        var isLiked = likedBy.indexOf(userEmail) !== -1;
        var newLikedBy = isLiked ? likedBy.filter(function (e) { return e !== userEmail; }) : __spreadArray(__spreadArray([], likedBy, true), [userEmail], false);
        setLikedBy(newLikedBy);
        updateEmployeMoisLikedBy(siteUrl, employe.id, newLikedBy).catch(function (err) {
            console.error('[DetailEmployeMois] Like :', err);
        });
    };
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
                    return [4 /*yield*/, updateEmployeMoisComments(siteUrl, employe.id, newComments)];
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
                React.createElement("a", { href: "#page-tous-employes-mois", className: "hover:text-ikaBlue transition" }, "Employ\u00E9s du mois"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-amber-600" }, employe.name)),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4" },
                React.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                    React.createElement("div", { className: "relative h-40 sm:h-48 overflow-hidden bg-gradient-to-r from-amber-500 to-amber-400 flex flex-col items-center justify-center text-white p-6" },
                        React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center" },
                            React.createElement(FaTrophy, { className: "text-3xl" })),
                        React.createElement("h1", { className: "mt-3 text-xl sm:text-2xl font-black" }, employe.name),
                        React.createElement("span", { className: "mt-2 px-3 py-1 rounded-full bg-white/90 text-[10px] font-black uppercase tracking-wide text-amber-700 flex items-center gap-1.5" },
                            React.createElement(FaCrown, { className: "text-[10px]" }),
                            " Employ\u00E9 du mois \u2014 ",
                            employe.month,
                            " ",
                            employe.year)),
                    React.createElement("div", { className: "p-6 sm:p-8 text-center" },
                        React.createElement("img", { src: employe.photo, alt: employe.name, className: "w-28 h-28 rounded-full object-cover mx-auto border-4 border-amber-400 shadow-md" }),
                        React.createElement("h2", { className: "mt-4 text-lg font-black text-ikaBlueDark" }, employe.name),
                        React.createElement("p", { className: "text-sm font-bold text-ikaBlue mt-0.5" },
                            employe.role,
                            " \u2014 ",
                            employe.dept),
                        React.createElement("div", { className: "mt-5 mx-auto max-w-lg" },
                            React.createElement("h3", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Pourquoi lui / elle ?"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600 italic border-l-2 border-amber-400 pl-3 text-left" },
                                "\u00AB ",
                                employe.quote,
                                " \u00BB")),
                        React.createElement("div", { className: "mt-6 flex items-center justify-center gap-3" },
                            React.createElement("button", { onClick: toggleLike, className: "px-4 py-1.5 rounded-full border font-bold text-xs flex items-center gap-1.5 transition ".concat(isLiked ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100') },
                                React.createElement(FaHeart, null),
                                " ",
                                likedBy.length),
                            React.createElement("button", { onClick: function () { return setCommentModal(true); }, className: "px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs flex items-center gap-1.5 hover:bg-blue-100 transition" },
                                React.createElement(FaComment, null),
                                " ",
                                itemComments.length)),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-tous-employes-mois", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(FaArrowLeft, null),
                                " Voir tous les employ\u00E9s du mois")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(FaTrophy, { className: "text-amber-500 text-[11px]" }),
                            " Autres laur\u00E9ats"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3" },
                            employes.filter(function (e) { return e.id !== employe.id; }).map(function (e) { return (React.createElement("a", { key: e.id, href: "#page-detail-employe-mois&id=".concat(e.id), className: "flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition group" },
                                React.createElement("img", { src: e.photo, alt: e.name, className: "w-11 h-11 rounded-full object-cover border border-amber-300 shrink-0" }),
                                React.createElement("div", { className: "min-w-0" },
                                    React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-amber-600 transition" }, e.name),
                                    React.createElement("p", { className: "text-[10px] text-slate-400 flex items-center gap-1" },
                                        React.createElement(FaCalendarDays, { className: "text-[9px]" }),
                                        " ",
                                        e.month,
                                        " ",
                                        e.year)))); }),
                            employes.length <= 1 && React.createElement("p", { className: "text-[11px] text-slate-400" }, "Aucun autre laur\u00E9at."))),
                    employes.length > 1 && (React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("a", { href: "#page-detail-employe-mois&id=".concat(prev.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Pr\u00E9c\u00E9dent"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2" }, prev.name)),
                        React.createElement("a", { href: "#page-detail-employe-mois&id=".concat(next.id), className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group text-right" },
                            React.createElement("span", { className: "text-[10px] font-bold uppercase text-slate-400" }, "Suivant"),
                            React.createElement("p", { className: "mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2" }, next.name),
                            React.createElement(FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-amber-600 ml-auto mt-1" })))),
                    React.createElement("a", { href: "#page-tous-employes-mois", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition" },
                        React.createElement(FaArrowRight, null),
                        " Voir tous les employ\u00E9s du mois")))),
        commentModal && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative" },
                React.createElement("button", { onClick: function () { return setCommentModal(false); }, className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg" },
                    React.createElement(FaXmark, null)),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("img", { src: employe.photo, className: "w-12 h-12 rounded-full object-cover border-2 border-amber-400", alt: "" }),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-slate-900 text-sm" },
                            "F\u00E9liciter ",
                            employe.name),
                        React.createElement("p", { className: "text-xs text-slate-500" }, "Laissez un message d'encouragement"))),
                React.createElement("div", { className: "max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs" },
                    itemComments.map(function (c, i) { return (React.createElement("div", { key: i, className: "p-2 rounded-lg border ".concat(c.email === userEmail ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100') },
                        React.createElement("span", { className: "font-bold text-slate-900" },
                            c.user,
                            " :"),
                        React.createElement("span", { className: "text-slate-600" },
                            " ",
                            c.text))); }),
                    itemComments.length === 0 && React.createElement("p", { className: "text-slate-400 text-center" }, "Aucun commentaire pour le moment.")),
                React.createElement("form", { onSubmit: addComment, className: "space-y-3" },
                    React.createElement("textarea", { value: commentInput, onChange: function (e) { return setCommentInput(e.target.value); }, required: true, rows: 3, placeholder: "\u00C9crivez votre commentaire ici...", className: "w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue" }),
                    React.createElement("div", { className: "flex items-center justify-end gap-2" },
                        React.createElement("button", { type: "button", onClick: function () { return setCommentModal(false); }, className: "px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50" }, "Annuler"),
                        React.createElement("button", { type: "submit", className: "px-4 py-2 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 shadow transition flex items-center gap-1.5" },
                            React.createElement("span", null, "Envoyer"),
                            React.createElement(FaPaperPlane, { className: "text-xs" })))))))));
};
export default DetailEmployeMois;
//# sourceMappingURL=detail-employe-mois.js.map