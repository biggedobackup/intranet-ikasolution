import * as React from 'react';
import { FaTriangleExclamation, FaTrashCan } from 'react-icons/fa6';
export var ConfirmDelete = function (props) {
    var title = props.title, message = props.message, onConfirm = props.onConfirm, onCancel = props.onCancel;
    return (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" },
        React.createElement("div", { className: "bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("span", { className: "w-11 h-11 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0" },
                    React.createElement(FaTrashCan, { className: "text-sm" })),
                React.createElement("h3", { className: "font-black text-slate-900 text-sm" }, title)),
            React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, message),
            React.createElement("div", { className: "flex items-center justify-end gap-2 pt-2" },
                React.createElement("button", { onClick: onCancel, className: "px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition" }, "Annuler"),
                React.createElement("button", { onClick: onConfirm, className: "px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 shadow transition flex items-center gap-1.5" },
                    React.createElement(FaTriangleExclamation, { className: "text-[10px]" }),
                    " Confirmer la suppression")))));
};
export default ConfirmDelete;
//# sourceMappingURL=ConfirmDelete.js.map