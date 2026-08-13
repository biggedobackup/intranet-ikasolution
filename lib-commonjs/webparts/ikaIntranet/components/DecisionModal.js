"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionModal = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var DecisionModal = function (props) {
    var title = props.title, message = props.message, actionLabel = props.actionLabel, action = props.action, onConfirm = props.onConfirm, onCancel = props.onCancel;
    var _a = React.useState(''), comment = _a[0], setComment = _a[1];
    var _b = React.useState(new Date().toISOString().slice(0, 10)), date = _b[0], setDate = _b[1];
    var isValider = action === 'valider';
    return (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" },
        React.createElement("div", { className: "bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("span", { className: "w-11 h-11 rounded-full flex items-center justify-center shrink-0 ".concat(isValider ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600') }, isValider ? React.createElement(fa6_1.FaCircleCheck, { className: "text-sm" }) : React.createElement(fa6_1.FaCircleXmark, { className: "text-sm" })),
                React.createElement("h3", { className: "font-black text-slate-900 text-sm" }, title)),
            React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, message),
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Commentaire"),
                React.createElement("textarea", { value: comment, onChange: function (e) { return setComment(e.target.value); }, rows: 3, placeholder: "Ajoutez un commentaire sur votre d\u00E9cision...", className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" })),
            React.createElement("div", null,
                React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Date de d\u00E9cision"),
                React.createElement("input", { type: "date", value: date, onChange: function (e) { return setDate(e.target.value); }, className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" })),
            React.createElement("div", { className: "flex items-center justify-end gap-2 pt-2" },
                React.createElement("button", { onClick: onCancel, className: "px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition" }, "Annuler"),
                React.createElement("button", { onClick: function () { return onConfirm(comment, date); }, className: "px-4 py-2 rounded-xl text-white text-xs font-bold shadow transition flex items-center gap-1.5 ".concat(isValider ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-500 hover:bg-rose-600') },
                    isValider ? React.createElement(fa6_1.FaCircleCheck, { className: "text-[10px]" }) : React.createElement(fa6_1.FaCircleXmark, { className: "text-[10px]" }),
                    actionLabel)))));
};
exports.DecisionModal = DecisionModal;
exports.default = exports.DecisionModal;
//# sourceMappingURL=DecisionModal.js.map