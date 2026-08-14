"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailAnnonce = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/annonces/data");
var getAnnonceIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var typeIcon = function (type) {
    switch (type) {
        case 'anniversaire': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0" },
            React.createElement(fa6_1.FaCakeCandles, { className: "text-sm" }));
        case 'mariage': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0" },
            React.createElement(fa6_1.FaHeart, { className: "text-sm" }));
        case 'absence': return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-blue-100 text-ikaBlue flex items-center justify-center shrink-0" },
            React.createElement(fa6_1.FaPlaneDeparture, { className: "text-sm" }));
        default: return React.createElement("span", { className: "w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0" },
            React.createElement(fa6_1.FaBullhorn, { className: "text-sm" }));
    }
};
var DetailAnnonce = function () {
    var _a = React.useState(getAnnonceIdFromHash), annonceId = _a[0], setAnnonceId = _a[1];
    React.useEffect(function () {
        var onHash = function () { return setAnnonceId(getAnnonceIdFromHash()); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var annonce = data_1.ANNONCES.find(function (a) { return a.id === annonceId; }) || data_1.ANNONCES[0];
    var idx = data_1.ANNONCES.findIndex(function (a) { return a.id === annonce.id; });
    var prev = data_1.ANNONCES[(idx - 1 + data_1.ANNONCES.length) % data_1.ANNONCES.length];
    var next = data_1.ANNONCES[(idx + 1) % data_1.ANNONCES.length];
    var _b = React.useState({}), likedIds = _b[0], setLikedIds = _b[1];
    var _c = React.useState({ 1: 12, 2: 8, 3: 5, 4: 9 }), likeCounts = _c[0], setLikeCounts = _c[1];
    var _d = React.useState({
        1: [
            { user: 'Aïcha KABORÉ :', text: ' Bonne fête Kadiatou ! 🎉' },
            { user: 'Jean OUEDRAOGO :', text: ' Tous mes vœux ! 👏' }
        ]
    }), comments = _d[0], setComments = _d[1];
    var _e = React.useState({ 1: 12, 2: 7, 3: 4, 4: 6 }), commentCounts = _e[0], setCommentCounts = _e[1];
    var _f = React.useState(false), commentModal = _f[0], setCommentModal = _f[1];
    var _g = React.useState(''), commentInput = _g[0], setCommentInput = _g[1];
    var toggleLike = function () {
        var liked = likedIds[annonce.id];
        setLikedIds(function (p) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, p), (_a = {}, _a[annonce.id] = !liked, _a)));
        });
        setLikeCounts(function (p) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, p), (_a = {}, _a[annonce.id] = (p[annonce.id] || 0) + (liked ? -1 : 1), _a)));
        });
    };
    var addComment = function (e) {
        e.preventDefault();
        var val = commentInput.trim();
        if (!val)
            return;
        setComments(function (p) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, p), (_a = {}, _a[annonce.id] = tslib_1.__spreadArray(tslib_1.__spreadArray([], (p[annonce.id] || []), true), [{ user: 'Vous :', text: " ".concat(val), mine: true }], false), _a)));
        });
        setCommentCounts(function (p) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, p), (_a = {}, _a[annonce.id] = (p[annonce.id] || 0) + 1, _a)));
        });
        setCommentInput('');
        setCommentModal(false);
    };
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
                            annonce.avatars.length > 0 ? (React.createElement("div", { className: "flex -space-x-3 shrink-0" }, annonce.avatars.map(function (av, j) { return (React.createElement("img", { key: j, src: av, className: "w-12 h-12 rounded-full object-cover border-2 border-white", alt: "" })); }))) : (annonce.avatar ? (React.createElement("img", { src: annonce.avatar, alt: "", className: "w-14 h-14 rounded-full object-cover ".concat(annonce.badge) })) : typeIcon(annonce.type)),
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, annonce.title),
                                React.createElement("p", { className: "text-xs font-semibold text-slate-400 mt-0.5" }, annonce.time))),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Message"),
                            React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, annonce.text)),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Cat\u00E9gorie"),
                            React.createElement("p", { className: "mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700" },
                                React.createElement(fa6_1.FaBullhorn, { className: "text-amber-600 text-xs" }),
                                " ",
                                annonce.type)),
                        React.createElement("div", { className: "mt-6 flex items-center gap-2" },
                            React.createElement("button", { onClick: toggleLike, className: "px-4 py-2 rounded-full border font-bold text-xs transition flex items-center gap-1.5 ".concat(likedIds[annonce.id] ? 'bg-rose-500 text-white border-rose-500 shadow-sm' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100') },
                                React.createElement(fa6_1.FaHeart, { className: likedIds[annonce.id] ? '' : 'text-xs' }),
                                " ",
                                likeCounts[annonce.id] || 0,
                                " J'aime"),
                            React.createElement("button", { onClick: function () { return setCommentModal(true); }, className: "px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs hover:bg-blue-100 transition flex items-center gap-1.5" },
                                React.createElement(fa6_1.FaComment, { className: "text-xs" }),
                                " ",
                                commentCounts[annonce.id] || 0,
                                " Commentaires")),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("a", { href: "#page-toutes-annonces", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                                React.createElement(fa6_1.FaArrowLeft, null),
                                " Voir toutes les annonces")))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-slate-200" },
                        React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaUsers, { className: "text-amber-600 text-[11px]" }),
                            " Autres annonces"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3" }, data_1.ANNONCES.filter(function (a) { return a.id !== annonce.id; }).map(function (a) { return (React.createElement("a", { key: a.id, href: "#page-detail-annonce&id=".concat(a.id), className: "flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition group" },
                            a.avatars.length > 0 ? (React.createElement("div", { className: "flex -space-x-2 shrink-0" }, a.avatars.map(function (av, j) { return (React.createElement("img", { key: j, src: av, className: "w-8 h-8 rounded-full object-cover border border-white", alt: "" })); }))) : (a.avatar ? React.createElement("img", { src: a.avatar, alt: "", className: "w-9 h-9 rounded-full object-cover ".concat(a.badge, " shrink-0") })
                                : typeIcon(a.type)),
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
                            React.createElement(fa6_1.FaArrowRight, { className: "text-[10px] text-slate-300 group-hover:text-amber-600 ml-auto mt-1" }))),
                    React.createElement("a", { href: "#page-toutes-annonces", className: "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition" },
                        React.createElement(fa6_1.FaArrowRight, null),
                        " Voir toutes les annonces")))),
        commentModal && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative" },
                React.createElement("button", { onClick: function () { return setCommentModal(false); }, className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg" },
                    React.createElement(fa6_1.FaXmark, null)),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("span", { className: "w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-base" },
                        React.createElement(fa6_1.FaBullhorn, null)),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-slate-900 text-sm" }, "Commenter"),
                        React.createElement("p", { className: "text-xs text-slate-500" },
                            "Laissez votre avis sur ",
                            annonce.title.toLowerCase()))),
                React.createElement("div", { className: "max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs" }, (comments[annonce.id] || []).map(function (c, i) { return (React.createElement("div", { key: i, className: "p-2 rounded-lg border ".concat(c.mine ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100') },
                    React.createElement("span", { className: "font-bold text-slate-900" }, c.user),
                    React.createElement("span", { className: "text-slate-600" }, c.text))); })),
                React.createElement("form", { onSubmit: addComment, className: "space-y-3" },
                    React.createElement("textarea", { value: commentInput, onChange: function (e) { return setCommentInput(e.target.value); }, required: true, rows: 3, placeholder: "\u00C9crivez votre commentaire ici...", className: "w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue" }),
                    React.createElement("div", { className: "flex items-center justify-end gap-2" },
                        React.createElement("button", { type: "button", onClick: function () { return setCommentModal(false); }, className: "px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50" }, "Annuler"),
                        React.createElement("button", { type: "submit", className: "px-4 py-2 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 shadow transition flex items-center gap-1.5" },
                            React.createElement("span", null, "Envoyer"),
                            React.createElement(fa6_1.FaPaperPlane, { className: "text-xs" })))))))));
};
exports.DetailAnnonce = DetailAnnonce;
exports.default = exports.DetailAnnonce;
//# sourceMappingURL=detail-annonce.js.map