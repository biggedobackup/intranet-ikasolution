import * as React from 'react';
import { FaArrowLeft, FaCalendarDays, FaUser, FaUserCheck, FaPaperPlane, FaRotate, FaCircleCheck } from 'react-icons/fa6';
import { CONGES, CONGE_VALIDATEURS } from '../../../services/workflow/conges/data';
var CONGE_TYPES = ['Congé annuel', 'Congé exceptionnel', 'Congé de maladie', 'Congé de maternité', 'Congé de paternité'];
export var AjouterConge = function (props) {
    var mode = props.mode, id = props.id;
    var existing = (mode === 'modifier' && id) ? CONGES.find(function (i) { return i.id === id; }) : undefined;
    var _a = React.useState((existing === null || existing === void 0 ? void 0 : existing.titre) || ''), titre = _a[0], setTitre = _a[1];
    var _b = React.useState((existing === null || existing === void 0 ? void 0 : existing.demandeur) || ''), demandeur = _b[0], setDemandeur = _b[1];
    var _c = React.useState((existing === null || existing === void 0 ? void 0 : existing.type) || 'Congé annuel'), type = _c[0], setType = _c[1];
    var _d = React.useState((existing === null || existing === void 0 ? void 0 : existing.dateDebut) || ''), dateDebut = _d[0], setDateDebut = _d[1];
    var _e = React.useState((existing === null || existing === void 0 ? void 0 : existing.dateFin) || ''), dateFin = _e[0], setDateFin = _e[1];
    var _f = React.useState(existing ? String(existing.jours) : ''), jours = _f[0], setJours = _f[1];
    var _g = React.useState((existing === null || existing === void 0 ? void 0 : existing.motif) || ''), motif = _g[0], setMotif = _g[1];
    var _h = React.useState((existing === null || existing === void 0 ? void 0 : existing.validateur) || CONGE_VALIDATEURS[0]), validateur = _h[0], setValidateur = _h[1];
    var _j = React.useState(false), submitted = _j[0], setSubmitted = _j[1];
    var isEdit = mode === 'modifier';
    var handleSubmit = function (e) {
        e.preventDefault();
        setSubmitted(true);
    };
    var inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm";
    if (submitted) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    React.createElement("div", { className: "flex justify-center" },
                        React.createElement("span", { className: "w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center" },
                            React.createElement(FaCircleCheck, { className: "text-3xl" }))),
                    React.createElement("h1", { className: "mt-4 text-xl font-black text-ikaBlueDark" }, isEdit ? 'Demande modifiée' : 'Demande envoyée'),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500" },
                        "Votre demande de cong\u00E9 a bien \u00E9t\u00E9 ",
                        isEdit ? 'modifiée' : 'enregistrée',
                        "."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-center justify-center gap-3" },
                        React.createElement("a", { href: "#page-workflow-liste-conge", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                            React.createElement(FaArrowLeft, null),
                            " Retour \u00E0 la liste"),
                        React.createElement("a", { href: "#page-workflow-ajouter-conge", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" }, "Nouvelle demande"))))));
    }
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-workflow-liste-conge", className: "hover:text-ikaBlue transition" }, "Demandes de Cong\u00E9"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, isEdit ? "Modifier : ".concat((existing === null || existing === void 0 ? void 0 : existing.titre) || '') : 'Nouvelle demande de congé')),
            React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                React.createElement("div", { className: "px-6 sm:px-8 py-5 border-b border-slate-100" },
                    React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, isEdit ? 'Modifier la demande de congé' : 'Nouvelle demande de congé'),
                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "La demande sera transmise au validateur s\u00E9lectionn\u00E9.")),
                React.createElement("form", { onSubmit: handleSubmit, className: "p-6 sm:p-8 space-y-5" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Titre"),
                        React.createElement("input", { type: "text", value: titre, onChange: function (e) { return setTitre(e.target.value); }, required: true, placeholder: "Titre de la demande", className: inputCls })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            React.createElement(FaUser, { className: "text-ikaBlue text-[10px]" }),
                            " Demandeur"),
                        React.createElement("input", { type: "text", value: demandeur, onChange: function (e) { return setDemandeur(e.target.value); }, required: true, placeholder: "Nom du demandeur", className: inputCls })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            React.createElement(FaUserCheck, { className: "text-ikaBlue text-[10px]" }),
                            " Validateur"),
                        React.createElement("select", { value: validateur, onChange: function (e) { return setValidateur(e.target.value); }, className: inputCls }, CONGE_VALIDATEURS.map(function (v) { return React.createElement("option", { key: v, value: v }, v); }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Type de cong\u00E9"),
                        React.createElement("select", { value: type, onChange: function (e) { return setType(e.target.value); }, className: inputCls }, CONGE_TYPES.map(function (t) { return React.createElement("option", { key: t, value: t }, t); }))),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                                React.createElement(FaCalendarDays, { className: "text-ikaBlue text-[10px]" }),
                                " Date de d\u00E9but"),
                            React.createElement("input", { type: "date", value: dateDebut, onChange: function (e) { return setDateDebut(e.target.value); }, required: true, className: inputCls })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                                React.createElement(FaCalendarDays, { className: "text-ikaBlue text-[10px]" }),
                                " Date de fin"),
                            React.createElement("input", { type: "date", value: dateFin, onChange: function (e) { return setDateFin(e.target.value); }, required: true, className: inputCls })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Nombre de jours"),
                            React.createElement("input", { type: "number", min: 1, value: jours, onChange: function (e) { return setJours(e.target.value); }, required: true, placeholder: "0", className: inputCls }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Motif"),
                        React.createElement("textarea", { value: motif, onChange: function (e) { return setMotif(e.target.value); }, required: true, rows: 4, placeholder: "D\u00E9crivez le motif de votre demande...", className: inputCls })),
                    React.createElement("div", { className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("button", { type: "submit", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                            React.createElement(FaPaperPlane, null),
                            " ",
                            isEdit ? 'Enregistrer les modifications' : 'Envoyer la demande'),
                        React.createElement("a", { href: isEdit ? "#page-workflow-modifier-conge&id=".concat(id) : '#page-workflow-ajouter-conge', onClick: function (e) { e.preventDefault(); setTitre((existing === null || existing === void 0 ? void 0 : existing.titre) || ''); setDemandeur((existing === null || existing === void 0 ? void 0 : existing.demandeur) || ''); setType((existing === null || existing === void 0 ? void 0 : existing.type) || 'Congé annuel'); setDateDebut((existing === null || existing === void 0 ? void 0 : existing.dateDebut) || ''); setDateFin((existing === null || existing === void 0 ? void 0 : existing.dateFin) || ''); setJours(existing ? String(existing.jours) : ''); setMotif((existing === null || existing === void 0 ? void 0 : existing.motif) || ''); setValidateur((existing === null || existing === void 0 ? void 0 : existing.validateur) || CONGE_VALIDATEURS[0]); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(FaRotate, null),
                            " R\u00E9initialiser"),
                        React.createElement("a", { href: "#page-workflow-liste-conge", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(FaArrowLeft, null),
                            " Annuler")))))));
};
export default AjouterConge;
//# sourceMappingURL=AjouterConge.js.map