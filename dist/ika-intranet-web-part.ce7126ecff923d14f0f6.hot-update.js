"use strict";
self["webpackHotUpdate_75e4b5d4_d962_489b_a3d6_4d96675cb3b4_0_0_1"]("ika-intranet-web-part",{

/***/ 1776
/*!***************************************************************************!*\
  !*** ./lib/webparts/ikaIntranet/pages/workflow/absences/DetailAbsence.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DetailAbsence: () => (/* binding */ DetailAbsence),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa6 */ 251);
/* harmony import */ var _services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/workflow/absences/index */ 8778);
/* harmony import */ var _services_workflow_absences_DecisionValidation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/workflow/absences/DecisionValidation */ 3137);
/* harmony import */ var _services_shared_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/shared/index */ 8717);
/* harmony import */ var _components_DecisionModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/DecisionModal */ 5156);
/* harmony import */ var _components_ConfirmDelete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/ConfirmDelete */ 6832);







var getAbsenceIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 0;
};
var statusBadge = function (status) {
    switch (status) {
        case 'Approuvé': return react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCircleCheck, null),
            " Approuv\u00E9");
        case 'Refusé': return react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 flex items-center gap-1" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCircleXmark, null),
            " Refus\u00E9");
        case 'Annulé': return react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 flex items-center gap-1" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCircleXmark, null),
            " Annul\u00E9");
        default: return react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaHourglassHalf, null),
            " En attente");
    }
};
var DetailAbsence = function (props) {
    var siteUrl = props.siteUrl;
    var _a = react__WEBPACK_IMPORTED_MODULE_0__.useState(undefined), absence = _a[0], setAbsence = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0__.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_0__.useState(''), error = _c[0], setError = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_0__.useState(null), decision = _d[0], setDecision = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_0__.useState(false), deciding = _e[0], setDeciding = _e[1];
    var _f = react__WEBPACK_IMPORTED_MODULE_0__.useState(false), confirmDelete = _f[0], setConfirmDelete = _f[1];
    var _g = react__WEBPACK_IMPORTED_MODULE_0__.useState(false), deleting = _g[0], setDeleting = _g[1];
    var _h = react__WEBPACK_IMPORTED_MODULE_0__.useState(''), currentUserEmail = _h[0], setCurrentUserEmail = _h[1];
    var _j = react__WEBPACK_IMPORTED_MODULE_0__.useState(undefined), attachment = _j[0], setAttachment = _j[1];
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        if (!siteUrl)
            return;
        (0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.getCurrentUserEmail)(siteUrl).then(setCurrentUserEmail).catch(function () { return undefined; });
    }, [siteUrl]);
    var fetchAbsence = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function () {
        if (!siteUrl)
            return;
        setLoading(true);
        var id = getAbsenceIdFromHash();
        (0,_services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__.loadAbsence)(siteUrl, id)
            .then(function (item) {
            setAbsence(item);
            setLoading(false);
            if (item)
                (0,_services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__.loadAbsenceAttachment)(siteUrl, item.id).then(setAttachment).catch(function () { return undefined; });
        })
            .catch(function () { setError('Impossible de charger le signalement.'); setLoading(false); });
    }, [siteUrl]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        fetchAbsence();
        var onHash = function () { setDecision(null); fetchAbsence(); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, [fetchAbsence]);
    var isEnAttente = absence && absence.statut === 'En attente';
    var isValidateur = !!currentUserEmail && !!(absence === null || absence === void 0 ? void 0 : absence.validateurEmail) && currentUserEmail.toLowerCase() === absence.validateurEmail.toLowerCase();
    var handleDecision = function (comment, date) {
        if (!decision || !siteUrl || !absence)
            return;
        setDeciding(true);
        (0,_services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__.applyAbsenceDecision)(siteUrl, absence, decision, comment, date)
            .then(function (ok) {
            setDeciding(false);
            if (ok) {
                setDecision(null);
                fetchAbsence();
            }
            else
                setError('La décision n’a pas pu être enregistrée. Réessayez.');
        })
            .catch(function () { setDeciding(false); setError('La décision n’a pas pu être enregistrée. Réessayez.'); });
    };
    var handleDelete = function () {
        if (!siteUrl || !absence)
            return;
        setDeleting(true);
        (0,_services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__.deleteAbsence)(siteUrl, absence.id)
            .then(function (ok) {
            setDeleting(false);
            if (ok)
                window.location.hash = '#page-workflow-liste-absence';
            else {
                setConfirmDelete(false);
                setError('La suppression a échoué. Réessayez.');
            }
        })
            .catch(function () { setDeleting(false); setConfirmDelete(false); setError('La suppression a échoué. Réessayez.'); });
    };
    if (loading) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center text-sm text-slate-500 font-semibold" }, "Chargement du signalement..."))));
    }
    if (!absence) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Signalement introuvable."),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "#page-workflow-liste-absence", className: "mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaArrowLeft, null),
                        " Retour \u00E0 la liste")))));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "/"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "#page-workflow-liste-absence", className: "hover:text-ikaBlue transition" }, "Signalements d'absence"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "/"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "text-ikaBlue" }, absence.titre)),
            error ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600" }, error)) : null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "relative px-6 sm:px-8 py-7 border-b border-slate-100 overflow-hidden" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "absolute -right-10 -top-10 w-40 h-40 bg-ikaSoft rounded-full opacity-70" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "relative" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "flex items-start justify-between gap-4 flex-wrap" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, absence.titre),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "mt-1 text-xs text-slate-500" },
                                    "Signalement d'absence #",
                                    absence.id)),
                            statusBadge(absence.statut)))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "p-6 sm:p-8 space-y-5" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaUser, { className: "text-ikaBlue" }),
                                " Demandeur"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" }, absence.demandeur || '—')),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaBriefcase, { className: "text-ikaBlue" }),
                                " Type d'absence"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" }, absence.type)),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCalendarDays, { className: "text-ikaBlue" }),
                                " P\u00E9riode"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" },
                                (0,_services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__.formatDateFR)(absence.dateDebut),
                                " \u2192 ",
                                (0,_services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__.formatDateFR)(absence.dateFin))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCalendarDays, { className: "text-ikaBlue" }),
                                " Jours"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" },
                                absence.jours,
                                " jour(s)"))),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Motif"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, absence.motif)),
                    attachment ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: attachment.url, target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-ikaBlue hover:underline w-fit max-w-full" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaPaperclip, { className: "text-ikaBlue shrink-0" }),
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "truncate" }, attachment.fileName))) : null,
                    isEnAttente && isValidateur ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rounded-xl border border-amber-200 bg-amber-50/60 p-5 space-y-3" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-800" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaGavel, { className: "text-xs" }),
                            " D\u00E9cision de validation"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "text-xs text-amber-700/80 leading-relaxed" }, "Ce signalement est en attente. Vous pouvez le valider ou le rejeter avec un commentaire."),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return setDecision('valider'); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow transition" },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCircleCheck, null),
                                " Valider"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return setDecision('rejeter'); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow transition" },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCircleXmark, null),
                                " Rejeter")))) : isEnAttente ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaHourglassHalf, { className: "text-xs text-amber-500" }),
                            " En attente de validation"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" },
                            "Ce signalement est en attente de validation par ",
                            absence.validateur || 'le validateur désigné',
                            "."))) : absence.commentaireDecision ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaGavel, { className: "text-xs text-ikaBlue" }),
                            " D\u00E9cision"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "text-xs font-semibold text-slate-700" },
                            absence.statut === 'Approuvé' ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "flex items-center gap-1.5 text-emerald-700" },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCircleCheck, null),
                                " ",
                                _services_workflow_absences_DecisionValidation__WEBPACK_IMPORTED_MODULE_3__.ABSENCE_DECISION_CONFIG.validateVerb)) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "flex items-center gap-1.5 text-rose-600" },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaCircleXmark, null),
                                " ",
                                _services_workflow_absences_DecisionValidation__WEBPACK_IMPORTED_MODULE_3__.ABSENCE_DECISION_CONFIG.rejectVerb)),
                            absence.dateDecision ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "text-slate-400 font-normal" },
                                " \u2014 le ",
                                (0,_services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__.formatDateFR)(absence.dateDecision)) : null),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, absence.commentaireDecision))) : null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null,
                            "Cr\u00E9\u00E9 le ",
                            (0,_services_workflow_absences_index__WEBPACK_IMPORTED_MODULE_2__.formatDateFR)(absence.createdAt))),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "#page-workflow-modifier-absence&id=".concat(absence.id), className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaPen, null),
                            " Modifier le signalement"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return setConfirmDelete(true); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaTrashCan, null),
                            " Supprimer"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "#page-workflow-liste-absence", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaArrowLeft, null),
                            " Retour \u00E0 la liste"))))),
        decision ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_DecisionModal__WEBPACK_IMPORTED_MODULE_5__.DecisionModal, { title: _services_workflow_absences_DecisionValidation__WEBPACK_IMPORTED_MODULE_3__.ABSENCE_DECISION_CONFIG.modalTitle(decision), message: _services_workflow_absences_DecisionValidation__WEBPACK_IMPORTED_MODULE_3__.ABSENCE_DECISION_CONFIG.modalMessage(absence, decision), actionLabel: deciding ? 'Enregistrement...' : (decision === 'valider' ? _services_workflow_absences_DecisionValidation__WEBPACK_IMPORTED_MODULE_3__.ABSENCE_DECISION_CONFIG.validateLabel : _services_workflow_absences_DecisionValidation__WEBPACK_IMPORTED_MODULE_3__.ABSENCE_DECISION_CONFIG.rejectLabel), action: decision, onConfirm: handleDecision, onCancel: function () { return setDecision(null); } })) : null,
        confirmDelete ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ConfirmDelete__WEBPACK_IMPORTED_MODULE_6__.ConfirmDelete, { title: "Supprimer le signalement", message: "Voulez-vous vraiment supprimer le signalement \u00AB ".concat(absence.titre, " \u00BB de ").concat(absence.demandeur, " ? Cette action est irr\u00E9versible."), onConfirm: handleDelete, onCancel: function () { return !deleting && setConfirmDelete(false); } })) : null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailAbsence);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("933bdd8fc3a24a71aeb7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=ika-intranet-web-part.ce7126ecff923d14f0f6.hot-update.js.map