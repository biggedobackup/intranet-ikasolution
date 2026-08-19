"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileAttachmentField = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
function fileIcon(fileName) {
    var ext = (fileName.split('.').pop() || '').toLowerCase();
    if (ext === 'pdf')
        return React.createElement(fa6_1.FaFilePdf, { className: "text-rose-500" });
    if (ext === 'doc' || ext === 'docx')
        return React.createElement(fa6_1.FaFileWord, { className: "text-ikaBlue" });
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].indexOf(ext) !== -1)
        return React.createElement(fa6_1.FaFileImage, { className: "text-emerald-500" });
    return React.createElement(fa6_1.FaFileLines, { className: "text-slate-400" });
}
var FileAttachmentField = function (props) {
    var existing = props.existing, onRemoveExisting = props.onRemoveExisting, file = props.file, onFileChange = props.onFileChange, maxSizeMB = props.maxSizeMB, className = props.className;
    var _a = React.useState(''), localError = _a[0], setLocalError = _a[1];
    var inputRef = React.useRef(null);
    var limitMB = maxSizeMB || 10;
    var inputCls = className || 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm';
    var handleChange = function (e) {
        var picked = e.target.files && e.target.files[0] ? e.target.files[0] : undefined;
        if (picked && picked.size > limitMB * 1024 * 1024) {
            setLocalError("Le fichier d\u00E9passe la taille maximale autoris\u00E9e (".concat(limitMB, " Mo)."));
            onFileChange(undefined);
            if (inputRef.current)
                inputRef.current.value = '';
            return;
        }
        setLocalError('');
        onFileChange(picked);
    };
    var clearSelection = function () {
        setLocalError('');
        onFileChange(undefined);
        if (inputRef.current)
            inputRef.current.value = '';
    };
    if (existing) {
        return (React.createElement("div", { className: "flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3" },
            React.createElement("a", { href: existing.url, target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 text-xs font-semibold text-ikaBlue hover:underline truncate min-w-0" },
                fileIcon(existing.fileName),
                " ",
                React.createElement("span", { className: "truncate" }, existing.fileName)),
            React.createElement("button", { type: "button", onClick: onRemoveExisting, className: "text-rose-500 hover:text-rose-600 shrink-0", "aria-label": "Supprimer la pi\u00E8ce jointe" },
                React.createElement(fa6_1.FaTrashCan, { className: "text-xs" }))));
    }
    return (React.createElement("div", null,
        file ? (React.createElement("div", { className: "flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3" },
            React.createElement("span", { className: "flex items-center gap-2 text-xs font-semibold text-slate-700 truncate min-w-0" },
                fileIcon(file.name),
                " ",
                React.createElement("span", { className: "truncate" }, file.name)),
            React.createElement("button", { type: "button", onClick: clearSelection, className: "text-slate-400 hover:text-slate-600 shrink-0", "aria-label": "Retirer le fichier" },
                React.createElement(fa6_1.FaXmark, { className: "text-xs" })))) : (React.createElement("input", { ref: inputRef, type: "file", accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif", onChange: handleChange, className: inputCls })),
        localError ? React.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, localError) : null));
};
exports.FileAttachmentField = FileAttachmentField;
exports.default = exports.FileAttachmentField;
//# sourceMappingURL=FileAttachmentField.js.map