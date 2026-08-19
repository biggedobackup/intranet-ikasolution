import * as React from 'react';
import { FaArrowLeft, FaCalendarDays, FaUser, FaPen, FaCircleCheck, FaCircleXmark, FaHourglassHalf, FaGavel, FaTrashCan, FaPaperclip } from 'react-icons/fa6';
import { loadConge, applyCongeDecision, deleteConge, loadCongeAttachment, formatDateFR } from '../../../services/workflow/conges/index';
import { CONGE_DECISION_CONFIG } from '../../../services/workflow/conges/DecisionValidation';
import { getCurrentUserEmail } from '../../../services/shared/index';
import { DecisionModal } from '../../../components/DecisionModal';
import { ConfirmDelete } from '../../../components/ConfirmDelete';
var getCongeIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 0;
};
var statusBadge = function (status) {
    switch (status) {
        case 'Approuvé': return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1" },
            React.createElement(FaCircleCheck, null),
            " Approuv\u00E9");
        case 'Refusé': return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 flex items-center gap-1" },
            React.createElement(FaCircleXmark, null),
            " Refus\u00E9");
        case 'Annulé': return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 flex items-center gap-1" },
            React.createElement(FaCircleXmark, null),
            " Annul\u00E9");
        default: return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1" },
            React.createElement(FaHourglassHalf, null),
            " En attente");
    }
};
export var DetailConge = function (props) {
    var siteUrl = props.siteUrl;
    var _a = React.useState(undefined), conge = _a[0], setConge = _a[1];
    var _b = React.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = React.useState(''), error = _c[0], setError = _c[1];
    var _d = React.useState(null), decision = _d[0], setDecision = _d[1];
    var _e = React.useState(false), deciding = _e[0], setDeciding = _e[1];
    var _f = React.useState(false), confirmDelete = _f[0], setConfirmDelete = _f[1];
    var _g = React.useState(false), deleting = _g[0], setDeleting = _g[1];
    var _h = React.useState(''), currentUserEmail = _h[0], setCurrentUserEmail = _h[1];
    var _j = React.useState(undefined), attachment = _j[0], setAttachment = _j[1];
    React.useEffect(function () {
        if (!siteUrl)
            return;
        getCurrentUserEmail(siteUrl).then(setCurrentUserEmail).catch(function () { return undefined; });
    }, [siteUrl]);
    var fetchConge = React.useCallback(function () {
        if (!siteUrl)
            return;
        setLoading(true);
        var id = getCongeIdFromHash();
        loadConge(siteUrl, id)
            .then(function (item) {
            setConge(item);
            setLoading(false);
            if (item)
                loadCongeAttachment(siteUrl, item.id).then(setAttachment).catch(function () { return undefined; });
        })
            .catch(function () { setError('Impossible de charger la demande.'); setLoading(false); });
    }, [siteUrl]);
    React.useEffect(function () {
        fetchConge();
        var onHash = function () { setDecision(null); fetchConge(); };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, [fetchConge]);
    var isEnAttente = conge && conge.statut === 'En attente';
    var isValidateur = !!currentUserEmail && !!(conge === null || conge === void 0 ? void 0 : conge.validateurEmail) && currentUserEmail.toLowerCase() === conge.validateurEmail.toLowerCase();
    var handleDecision = function (comment, date) {
        if (!decision || !siteUrl || !conge)
            return;
        setDeciding(true);
        applyCongeDecision(siteUrl, conge, decision, comment, date)
            .then(function (ok) {
            setDeciding(false);
            if (ok) {
                setDecision(null);
                fetchConge();
            }
            else
                setError('La décision n’a pas pu être enregistrée. Réessayez.');
        })
            .catch(function () { setDeciding(false); setError('La décision n’a pas pu être enregistrée. Réessayez.'); });
    };
    var handleDelete = function () {
        if (!siteUrl || !conge)
            return;
        setDeleting(true);
        deleteConge(siteUrl, conge.id)
            .then(function (ok) {
            setDeleting(false);
            if (ok)
                window.location.hash = '#page-workflow-liste-conge';
            else {
                setConfirmDelete(false);
                setError('La suppression a échoué. Réessayez.');
            }
        })
            .catch(function () { setDeleting(false); setConfirmDelete(false); setError('La suppression a échoué. Réessayez.'); });
    };
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center text-sm text-slate-500 font-semibold" }, "Chargement de la demande..."))));
    }
    if (!conge) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Demande introuvable."),
                    React.createElement("a", { href: "#page-workflow-liste-conge", className: "mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                        React.createElement(FaArrowLeft, null),
                        " Retour \u00E0 la liste")))));
    }
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-workflow-liste-conge", className: "hover:text-ikaBlue transition" }, "Demandes de Cong\u00E9"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, conge.titre)),
            error ? (React.createElement("div", { className: "rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600" }, error)) : null,
            React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                React.createElement("div", { className: "relative px-6 sm:px-8 py-7 border-b border-slate-100 overflow-hidden" },
                    React.createElement("div", { className: "absolute -right-10 -top-10 w-40 h-40 bg-ikaSoft rounded-full opacity-70" }),
                    React.createElement("div", { className: "relative" },
                        React.createElement("div", { className: "flex items-start justify-between gap-4 flex-wrap" },
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, conge.titre),
                                React.createElement("p", { className: "mt-1 text-xs text-slate-500" },
                                    "Demande de cong\u00E9 #",
                                    conge.id)),
                            statusBadge(conge.statut)))),
                React.createElement("div", { className: "p-6 sm:p-8 space-y-5" },
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(FaUser, { className: "text-ikaBlue" }),
                                " Demandeur"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" }, conge.demandeur || '—')),
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(FaCalendarDays, { className: "text-ikaBlue" }),
                                " P\u00E9riode"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" },
                                formatDateFR(conge.dateDebut),
                                " \u2192 ",
                                formatDateFR(conge.dateFin))),
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(FaCalendarDays, { className: "text-ikaBlue" }),
                                " Type de cong\u00E9"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" }, conge.type)),
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(FaCalendarDays, { className: "text-ikaBlue" }),
                                " Jours"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" },
                                conge.jours,
                                " jour(s)"))),
                    React.createElement("section", null,
                        React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Motif"),
                        React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, conge.motif)),
                    attachment ? (React.createElement("a", { href: attachment.url, target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-ikaBlue hover:underline w-fit max-w-full" },
                        React.createElement(FaPaperclip, { className: "text-ikaBlue shrink-0" }),
                        " ",
                        React.createElement("span", { className: "truncate" }, attachment.fileName))) : null,
                    isEnAttente && isValidateur ? (React.createElement("div", { className: "rounded-xl border border-amber-200 bg-amber-50/60 p-5 space-y-3" },
                        React.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-800" },
                            React.createElement(FaGavel, { className: "text-xs" }),
                            " D\u00E9cision de validation"),
                        React.createElement("p", { className: "text-xs text-amber-700/80 leading-relaxed" }, "Cette demande est en attente. Vous pouvez la valider ou la rejeter avec un commentaire."),
                        React.createElement("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                            React.createElement("button", { onClick: function () { return setDecision('valider'); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow transition" },
                                React.createElement(FaCircleCheck, null),
                                " Valider"),
                            React.createElement("button", { onClick: function () { return setDecision('rejeter'); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow transition" },
                                React.createElement(FaCircleXmark, null),
                                " Rejeter")))) : isEnAttente ? (React.createElement("div", { className: "rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2" },
                        React.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900" },
                            React.createElement(FaHourglassHalf, { className: "text-xs text-amber-500" }),
                            " En attente de validation"),
                        React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" },
                            "Cette demande est en attente de validation par ",
                            conge.validateur || 'le validateur désigné',
                            "."))) : conge.commentaireDecision ? (React.createElement("div", { className: "rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2" },
                        React.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900" },
                            React.createElement(FaGavel, { className: "text-xs text-ikaBlue" }),
                            " D\u00E9cision"),
                        React.createElement("p", { className: "text-xs font-semibold text-slate-700" },
                            conge.statut === 'Approuvé' ? (React.createElement("span", { className: "flex items-center gap-1.5 text-emerald-700" },
                                React.createElement(FaCircleCheck, null),
                                " ",
                                CONGE_DECISION_CONFIG.validateVerb)) : (React.createElement("span", { className: "flex items-center gap-1.5 text-rose-600" },
                                React.createElement(FaCircleXmark, null),
                                " ",
                                CONGE_DECISION_CONFIG.rejectVerb)),
                            conge.dateDecision ? React.createElement("span", { className: "text-slate-400 font-normal" },
                                " \u2014 le ",
                                formatDateFR(conge.dateDecision)) : null),
                        React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, conge.commentaireDecision))) : null,
                    React.createElement("div", { className: "pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400" },
                        React.createElement("span", null,
                            "Cr\u00E9\u00E9e le ",
                            formatDateFR(conge.createdAt))),
                    React.createElement("div", { className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("a", { href: "#page-workflow-modifier-conge&id=".concat(conge.id), className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                            React.createElement(FaPen, null),
                            " Modifier la demande"),
                        React.createElement("button", { onClick: function () { return setConfirmDelete(true); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition" },
                            React.createElement(FaTrashCan, null),
                            " Supprimer"),
                        React.createElement("a", { href: "#page-workflow-liste-conge", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(FaArrowLeft, null),
                            " Retour \u00E0 la liste"))))),
        decision ? (React.createElement(DecisionModal, { title: CONGE_DECISION_CONFIG.modalTitle(decision), message: CONGE_DECISION_CONFIG.modalMessage(conge, decision), actionLabel: deciding ? 'Enregistrement...' : (decision === 'valider' ? CONGE_DECISION_CONFIG.validateLabel : CONGE_DECISION_CONFIG.rejectLabel), action: decision, onConfirm: handleDecision, onCancel: function () { return setDecision(null); } })) : null,
        confirmDelete ? (React.createElement(ConfirmDelete, { title: "Supprimer la demande", message: "Voulez-vous vraiment supprimer la demande de cong\u00E9 \u00AB ".concat(conge.titre, " \u00BB de ").concat(conge.demandeur, " ? Cette action est irr\u00E9versible."), onConfirm: handleDelete, onCancel: function () { return !deleting && setConfirmDelete(false); } })) : null));
};
export default DetailConge;
//# sourceMappingURL=DetailConge.js.map