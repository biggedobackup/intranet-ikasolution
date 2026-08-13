import * as React from 'react';
import { FaArrowLeft, FaCalendarDays, FaUser, FaPen, FaCircleCheck, FaCircleXmark, FaHourglassHalf, FaBriefcase, FaGavel } from 'react-icons/fa6';
import { ABSENCES } from '../../../services/workflow/absences/data';
import { ABSENCE_DECISION_CONFIG, applyAbsenceDecision } from '../../../services/workflow/absences/DecisionValidation';
import { DecisionModal } from '../../../components/DecisionModal';
var getAbsenceIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
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
export var DetailAbsence = function () {
    var _a = React.useState(function () { return ABSENCES.find(function (a) { return a.id === getAbsenceIdFromHash(); }) || ABSENCES[0]; }), absence = _a[0], setAbsence = _a[1];
    var _b = React.useState(null), decision = _b[0], setDecision = _b[1];
    React.useEffect(function () {
        var onHash = function () {
            var id = getAbsenceIdFromHash();
            setAbsence(ABSENCES.find(function (a) { return a.id === id; }) || ABSENCES[0]);
            setDecision(null);
        };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var isEnAttente = absence.statut === 'En attente';
    var handleDecision = function (comment, date) {
        if (!decision)
            return;
        setAbsence(function (prev) { return applyAbsenceDecision(prev, decision, comment, date); });
        setDecision(null);
    };
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-workflow-liste-absence", className: "hover:text-ikaBlue transition" }, "Signalements d'absence"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, absence.titre)),
            React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                React.createElement("div", { className: "relative px-6 sm:px-8 py-7 border-b border-slate-100 overflow-hidden" },
                    React.createElement("div", { className: "absolute -right-10 -top-10 w-40 h-40 bg-ikaSoft rounded-full opacity-70" }),
                    React.createElement("div", { className: "relative" },
                        React.createElement("div", { className: "flex items-start justify-between gap-4 flex-wrap" },
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, absence.titre),
                                React.createElement("p", { className: "mt-1 text-xs text-slate-500" },
                                    "Signalement d'absence #",
                                    absence.id)),
                            statusBadge(absence.statut)))),
                React.createElement("div", { className: "p-6 sm:p-8 space-y-5" },
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(FaUser, { className: "text-ikaBlue" }),
                                " Demandeur"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" }, absence.demandeur)),
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(FaBriefcase, { className: "text-ikaBlue" }),
                                " Type d'absence"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" }, absence.type)),
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(FaCalendarDays, { className: "text-ikaBlue" }),
                                " P\u00E9riode"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" },
                                absence.dateDebut,
                                " \u2192 ",
                                absence.dateFin))),
                    React.createElement("section", null,
                        React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Motif"),
                        React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, absence.motif)),
                    isEnAttente ? (React.createElement("div", { className: "rounded-xl border border-amber-200 bg-amber-50/60 p-5 space-y-3" },
                        React.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-800" },
                            React.createElement(FaGavel, { className: "text-xs" }),
                            " D\u00E9cision de validation"),
                        React.createElement("p", { className: "text-xs text-amber-700/80 leading-relaxed" }, "Ce signalement est en attente. Vous pouvez le valider ou le rejeter avec un commentaire."),
                        React.createElement("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                            React.createElement("button", { onClick: function () { return setDecision('valider'); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow transition" },
                                React.createElement(FaCircleCheck, null),
                                " Valider"),
                            React.createElement("button", { onClick: function () { return setDecision('rejeter'); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow transition" },
                                React.createElement(FaCircleXmark, null),
                                " Rejeter")))) : absence.decisionComment ? (React.createElement("div", { className: "rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2" },
                        React.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900" },
                            React.createElement(FaGavel, { className: "text-xs text-ikaBlue" }),
                            " D\u00E9cision"),
                        React.createElement("p", { className: "text-xs font-semibold text-slate-700" },
                            absence.statut === 'Approuvé' ? (React.createElement("span", { className: "flex items-center gap-1.5 text-emerald-700" },
                                React.createElement(FaCircleCheck, null),
                                " ",
                                ABSENCE_DECISION_CONFIG.validateVerb)) : (React.createElement("span", { className: "flex items-center gap-1.5 text-rose-600" },
                                React.createElement(FaCircleXmark, null),
                                " ",
                                ABSENCE_DECISION_CONFIG.rejectVerb)),
                            absence.decisionDate && React.createElement("span", { className: "text-slate-400 font-normal" },
                                " \u2014 le ",
                                absence.decisionDate)),
                        React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, absence.decisionComment))) : null,
                    React.createElement("div", { className: "pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400" },
                        React.createElement("span", null,
                            "Cr\u00E9\u00E9 le ",
                            absence.createdAt)),
                    React.createElement("div", { className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("a", { href: "#page-workflow-modifier-absence&id=".concat(absence.id), className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                            React.createElement(FaPen, null),
                            " Modifier le signalement"),
                        React.createElement("a", { href: "#page-workflow-liste-absence", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(FaArrowLeft, null),
                            " Retour \u00E0 la liste"))))),
        decision && (React.createElement(DecisionModal, { title: ABSENCE_DECISION_CONFIG.modalTitle(decision), message: ABSENCE_DECISION_CONFIG.modalMessage(absence, decision), actionLabel: decision === 'valider' ? ABSENCE_DECISION_CONFIG.validateLabel : ABSENCE_DECISION_CONFIG.rejectLabel, action: decision, onConfirm: handleDecision, onCancel: function () { return setDecision(null); } }))));
};
export default DetailAbsence;
//# sourceMappingURL=DetailAbsence.js.map