"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailConge = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../../services/workflow/conges/data");
var DecisionValidation_1 = require("../../../services/workflow/conges/DecisionValidation");
var DecisionModal_1 = require("../../../components/DecisionModal");
var getCongeIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var statusBadge = function (status) {
    switch (status) {
        case 'Approuvé': return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1" },
            React.createElement(fa6_1.FaCircleCheck, null),
            " Approuv\u00E9");
        case 'Refusé': return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 flex items-center gap-1" },
            React.createElement(fa6_1.FaCircleXmark, null),
            " Refus\u00E9");
        case 'Annulé': return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 flex items-center gap-1" },
            React.createElement(fa6_1.FaCircleXmark, null),
            " Annul\u00E9");
        default: return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1" },
            React.createElement(fa6_1.FaHourglassHalf, null),
            " En attente");
    }
};
var DetailConge = function () {
    var _a = React.useState(function () { return data_1.CONGES.find(function (c) { return c.id === getCongeIdFromHash(); }) || data_1.CONGES[0]; }), conge = _a[0], setConge = _a[1];
    var _b = React.useState(null), decision = _b[0], setDecision = _b[1];
    React.useEffect(function () {
        var onHash = function () {
            var id = getCongeIdFromHash();
            setConge(data_1.CONGES.find(function (c) { return c.id === id; }) || data_1.CONGES[0]);
            setDecision(null);
        };
        window.addEventListener('hashchange', onHash);
        return function () { return window.removeEventListener('hashchange', onHash); };
    }, []);
    var isEnAttente = conge.statut === 'En attente';
    var handleDecision = function (comment, date) {
        if (!decision)
            return;
        setConge(function (prev) { return (0, DecisionValidation_1.applyCongeDecision)(prev, decision, comment, date); });
        setDecision(null);
    };
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-workflow-liste-conge", className: "hover:text-ikaBlue transition" }, "Demandes de Cong\u00E9"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, conge.titre)),
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
                                React.createElement(fa6_1.FaUser, { className: "text-ikaBlue" }),
                                " Demandeur"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" }, conge.demandeur)),
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(fa6_1.FaCalendarDays, { className: "text-ikaBlue" }),
                                " P\u00E9riode"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" },
                                conge.dateDebut,
                                " \u2192 ",
                                conge.dateFin)),
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(fa6_1.FaCalendarDays, { className: "text-ikaBlue" }),
                                " Type de cong\u00E9"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" }, conge.type)),
                        React.createElement("div", { className: "rounded-xl border border-slate-100 p-4 bg-slate-50/60" },
                            React.createElement("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400" },
                                React.createElement(fa6_1.FaCalendarDays, { className: "text-ikaBlue" }),
                                " Jours"),
                            React.createElement("p", { className: "mt-1.5 text-sm font-bold text-slate-800" },
                                conge.jours,
                                " jour(s)"))),
                    React.createElement("section", null,
                        React.createElement("h2", { className: "text-sm font-black uppercase tracking-wider text-slate-900" }, "Motif"),
                        React.createElement("p", { className: "mt-2 text-sm leading-relaxed text-slate-600" }, conge.motif)),
                    isEnAttente ? (React.createElement("div", { className: "rounded-xl border border-amber-200 bg-amber-50/60 p-5 space-y-3" },
                        React.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-800" },
                            React.createElement(fa6_1.FaGavel, { className: "text-xs" }),
                            " D\u00E9cision de validation"),
                        React.createElement("p", { className: "text-xs text-amber-700/80 leading-relaxed" }, "Cette demande est en attente. Vous pouvez la valider ou la rejeter avec un commentaire."),
                        React.createElement("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                            React.createElement("button", { onClick: function () { return setDecision('valider'); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow transition" },
                                React.createElement(fa6_1.FaCircleCheck, null),
                                " Valider"),
                            React.createElement("button", { onClick: function () { return setDecision('rejeter'); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow transition" },
                                React.createElement(fa6_1.FaCircleXmark, null),
                                " Rejeter")))) : conge.decisionComment ? (React.createElement("div", { className: "rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2" },
                        React.createElement("h2", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900" },
                            React.createElement(fa6_1.FaGavel, { className: "text-xs text-ikaBlue" }),
                            " D\u00E9cision"),
                        React.createElement("p", { className: "text-xs font-semibold text-slate-700" },
                            conge.statut === 'Approuvé' ? (React.createElement("span", { className: "flex items-center gap-1.5 text-emerald-700" },
                                React.createElement(fa6_1.FaCircleCheck, null),
                                " ",
                                DecisionValidation_1.CONGE_DECISION_CONFIG.validateVerb)) : (React.createElement("span", { className: "flex items-center gap-1.5 text-rose-600" },
                                React.createElement(fa6_1.FaCircleXmark, null),
                                " ",
                                DecisionValidation_1.CONGE_DECISION_CONFIG.rejectVerb)),
                            conge.decisionDate && React.createElement("span", { className: "text-slate-400 font-normal" },
                                " \u2014 le ",
                                conge.decisionDate)),
                        React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, conge.decisionComment))) : null,
                    React.createElement("div", { className: "pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400" },
                        React.createElement("span", null,
                            "Cr\u00E9\u00E9e le ",
                            conge.createdAt)),
                    React.createElement("div", { className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("a", { href: "#page-workflow-modifier-conge&id=".concat(conge.id), className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                            React.createElement(fa6_1.FaPen, null),
                            " Modifier la demande"),
                        React.createElement("a", { href: "#page-workflow-liste-conge", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(fa6_1.FaArrowLeft, null),
                            " Retour \u00E0 la liste"))))),
        decision && (React.createElement(DecisionModal_1.DecisionModal, { title: DecisionValidation_1.CONGE_DECISION_CONFIG.modalTitle(decision), message: DecisionValidation_1.CONGE_DECISION_CONFIG.modalMessage(conge, decision), actionLabel: decision === 'valider' ? DecisionValidation_1.CONGE_DECISION_CONFIG.validateLabel : DecisionValidation_1.CONGE_DECISION_CONFIG.rejectLabel, action: decision, onConfirm: handleDecision, onCancel: function () { return setDecision(null); } }))));
};
exports.DetailConge = DetailConge;
exports.default = exports.DetailConge;
//# sourceMappingURL=DetailConge.js.map