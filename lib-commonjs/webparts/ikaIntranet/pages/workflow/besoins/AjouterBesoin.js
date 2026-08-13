"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjouterBesoin = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../../services/workflow/besoins/data");
var BESOIN_TYPES = ['Matériel informatique', 'Formation', 'Logiciel', 'Autre'];
var PRIORITES = ['Basse', 'Moyenne', 'Haute'];
var AjouterBesoin = function (props) {
    var mode = props.mode, id = props.id;
    var existing = (mode === 'modifier' && id) ? data_1.BESOINS.find(function (i) { return i.id === id; }) : undefined;
    var _a = React.useState((existing === null || existing === void 0 ? void 0 : existing.titre) || ''), titre = _a[0], setTitre = _a[1];
    var _b = React.useState((existing === null || existing === void 0 ? void 0 : existing.demandeur) || ''), demandeur = _b[0], setDemandeur = _b[1];
    var _c = React.useState((existing === null || existing === void 0 ? void 0 : existing.type) || 'Matériel informatique'), type = _c[0], setType = _c[1];
    var _d = React.useState((existing === null || existing === void 0 ? void 0 : existing.priorite) || 'Moyenne'), priorite = _d[0], setPriorite = _d[1];
    var _e = React.useState((existing === null || existing === void 0 ? void 0 : existing.dateSouhaitee) || ''), dateSouhaitee = _e[0], setDateSouhaitee = _e[1];
    var _f = React.useState((existing === null || existing === void 0 ? void 0 : existing.description) || ''), description = _f[0], setDescription = _f[1];
    var _g = React.useState((existing === null || existing === void 0 ? void 0 : existing.validateur) || data_1.BESOIN_VALIDATEURS[0]), validateur = _g[0], setValidateur = _g[1];
    var _h = React.useState(false), submitted = _h[0], setSubmitted = _h[1];
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
                            React.createElement(fa6_1.FaCircleCheck, { className: "text-3xl" }))),
                    React.createElement("h1", { className: "mt-4 text-xl font-black text-ikaBlueDark" }, isEdit ? 'Expression modifiée' : 'Expression envoyée'),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500" },
                        "Votre expression de besoin a bien \u00E9t\u00E9 ",
                        isEdit ? 'modifiée' : 'enregistrée',
                        "."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-center justify-center gap-3" },
                        React.createElement("a", { href: "#page-workflow-liste-besoin", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                            React.createElement(fa6_1.FaArrowLeft, null),
                            " Retour \u00E0 la liste"),
                        React.createElement("a", { href: "#page-workflow-ajouter-besoin", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" }, "Nouvelle expression"))))));
    }
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-workflow-liste-besoin", className: "hover:text-ikaBlue transition" }, "Expressions de besoin"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, isEdit ? "Modifier : ".concat((existing === null || existing === void 0 ? void 0 : existing.titre) || '') : 'Nouvelle expression de besoin')),
            React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                React.createElement("div", { className: "px-6 sm:px-8 py-5 border-b border-slate-100" },
                    React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, isEdit ? 'Modifier l\'expression de besoin' : 'Nouvelle expression de besoin'),
                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Le besoin sera transmis au validateur s\u00E9lectionn\u00E9.")),
                React.createElement("form", { onSubmit: handleSubmit, className: "p-6 sm:p-8 space-y-5" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Titre"),
                        React.createElement("input", { type: "text", value: titre, onChange: function (e) { return setTitre(e.target.value); }, required: true, placeholder: "Titre du besoin", className: inputCls })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaUser, { className: "text-ikaBlue text-[10px]" }),
                            " Demandeur"),
                        React.createElement("input", { type: "text", value: demandeur, onChange: function (e) { return setDemandeur(e.target.value); }, required: true, placeholder: "Nom du demandeur", className: inputCls })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaUserCheck, { className: "text-ikaBlue text-[10px]" }),
                            " Validateur"),
                        React.createElement("select", { value: validateur, onChange: function (e) { return setValidateur(e.target.value); }, className: inputCls }, data_1.BESOIN_VALIDATEURS.map(function (v) { return React.createElement("option", { key: v, value: v }, v); }))),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Type de besoin"),
                            React.createElement("select", { value: type, onChange: function (e) { return setType(e.target.value); }, className: inputCls }, BESOIN_TYPES.map(function (t) { return React.createElement("option", { key: t, value: t }, t); }))),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Priorit\u00E9"),
                            React.createElement("select", { value: priorite, onChange: function (e) { return setPriorite(e.target.value); }, className: inputCls }, PRIORITES.map(function (p) { return React.createElement("option", { key: p, value: p }, p); })))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            React.createElement(fa6_1.FaCalendarDays, { className: "text-ikaBlue text-[10px]" }),
                            " Date souhait\u00E9e"),
                        React.createElement("input", { type: "date", value: dateSouhaitee, onChange: function (e) { return setDateSouhaitee(e.target.value); }, required: true, className: inputCls })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Description"),
                        React.createElement("textarea", { value: description, onChange: function (e) { return setDescription(e.target.value); }, required: true, rows: 4, placeholder: "D\u00E9crivez votre besoin...", className: inputCls })),
                    React.createElement("div", { className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("button", { type: "submit", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                            React.createElement(fa6_1.FaPaperPlane, null),
                            " ",
                            isEdit ? 'Enregistrer les modifications' : 'Envoyer l\'expression'),
                        React.createElement("a", { href: isEdit ? "#page-workflow-modifier-besoin&id=".concat(id) : '#page-workflow-ajouter-besoin', onClick: function (e) { e.preventDefault(); setTitre((existing === null || existing === void 0 ? void 0 : existing.titre) || ''); setDemandeur((existing === null || existing === void 0 ? void 0 : existing.demandeur) || ''); setType((existing === null || existing === void 0 ? void 0 : existing.type) || 'Matériel informatique'); setPriorite((existing === null || existing === void 0 ? void 0 : existing.priorite) || 'Moyenne'); setDateSouhaitee((existing === null || existing === void 0 ? void 0 : existing.dateSouhaitee) || ''); setDescription((existing === null || existing === void 0 ? void 0 : existing.description) || ''); setValidateur((existing === null || existing === void 0 ? void 0 : existing.validateur) || data_1.BESOIN_VALIDATEURS[0]); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(fa6_1.FaRotate, null),
                            " R\u00E9initialiser"),
                        React.createElement("a", { href: "#page-workflow-liste-besoin", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(fa6_1.FaArrowLeft, null),
                            " Annuler")))))));
};
exports.AjouterBesoin = AjouterBesoin;
exports.default = exports.AjouterBesoin;
//# sourceMappingURL=AjouterBesoin.js.map