import { __spreadArray } from "tslib";
import * as React from 'react';
import { FaMagnifyingGlass, FaFolder, FaFilePdf, FaFileWord, FaFileExcel, FaDownload } from 'react-icons/fa6';
import { DOCUMENTS, DOC_FOLDERS } from '../../services/documentation/data';
var fileIcon = function (type) {
    switch (type) {
        case 'PDF': return React.createElement("span", { className: "w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0" },
            React.createElement(FaFilePdf, null));
        case 'DOCX': return React.createElement("span", { className: "w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0" },
            React.createElement(FaFileWord, null));
        case 'XLSX': return React.createElement("span", { className: "w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0" },
            React.createElement(FaFileExcel, null));
        default: return React.createElement("span", { className: "w-10 h-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0" },
            React.createElement(FaFileWord, null));
    }
};
export var TouteDocumentation = function () {
    var _a = React.useState(''), search = _a[0], setSearch = _a[1];
    var _b = React.useState('all'), folder = _b[0], setFolder = _b[1];
    var folders = __spreadArray(['all'], DOC_FOLDERS.map(function (f) { return f.name; }), true);
    var filtered = DOCUMENTS.filter(function (d) {
        var q = search.toLowerCase();
        var matchesSearch = d.name.toLowerCase().includes(q) || d.folder.toLowerCase().includes(q);
        var matchesFolder = folder === 'all' || d.folder === folder;
        return matchesSearch && matchesFolder;
    });
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-amber-50 rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Documentation")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Documentation & Dossiers partag\u00E9s"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Retrouvez l'ensemble de la documentation et des dossiers partag\u00E9s d'IKA SOLUTION."),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Rechercher un document...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: folder, onChange: function (e) { return setFolder(e.target.value); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }, folders.map(function (f) { return (React.createElement("option", { key: f, value: f }, f === 'all' ? 'Tous les dossiers' : f)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " document(s)")))),
            React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" }, DOC_FOLDERS.map(function (f) { return (React.createElement("button", { key: f.id, onClick: function () { return setFolder(f.name); }, className: "p-3 rounded-xl border transition text-center group ".concat(folder === f.name ? 'border-amber-300 bg-amber-50 shadow-sm' : 'border-slate-100 bg-white hover:bg-white hover:border-amber-300 hover:shadow-sm') },
                React.createElement("div", { className: "w-10 h-10 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center text-xl font-bold mx-auto mb-1" },
                    React.createElement(FaFolder, null)),
                React.createElement("h3", { className: "text-xs font-black text-slate-900 group-hover:text-ikaBlue transition" }, f.name),
                React.createElement("p", { className: "text-[10px] text-slate-400" }, f.desc))); })),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun document ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, filtered.map(function (d) { return (React.createElement("div", { key: d.id, className: "bg-white rounded-2xl shadow-sm border border-slate-200 p-4 hover:shadow-lg transition block" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    fileIcon(d.type),
                    React.createElement("div", { className: "min-w-0 flex-1" },
                        React.createElement("span", { className: "text-[9px] font-bold uppercase text-slate-400" }, d.folder),
                        React.createElement("h3", { className: "text-xs font-bold text-slate-900 truncate" }, d.name),
                        React.createElement("p", { className: "text-[10px] text-slate-500" },
                            d.size,
                            " \u00B7 ",
                            d.updated))),
                React.createElement("div", { className: "mt-3 pt-3 border-t border-slate-100 flex items-center justify-between" },
                    React.createElement("span", { className: "text-[10px] text-slate-400" }, d.desc),
                    React.createElement("a", { href: "#pdf", className: "px-2.5 py-1 rounded-lg bg-ikaBlue text-white font-bold text-[10px] hover:bg-blue-600 transition flex items-center gap-1" },
                        React.createElement(FaDownload, { className: "text-[9px]" }),
                        " T\u00E9l\u00E9charger")))); }))))));
};
export default TouteDocumentation;
//# sourceMappingURL=toute-documentation.js.map