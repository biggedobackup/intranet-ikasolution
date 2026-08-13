"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListeConge = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../../services/workflow/conges/data");
var Pagination_1 = require("../../../components/Pagination");
var ConfirmDelete_1 = require("../../../components/ConfirmDelete");
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
var ListeConge = function () {
    var _a = React.useState(''), search = _a[0], setSearch = _a[1];
    var _b = React.useState('all'), status = _b[0], setStatus = _b[1];
    var _c = React.useState(1), page = _c[0], setPage = _c[1];
    var _d = React.useState(data_1.CONGES), items = _d[0], setItems = _d[1];
    var _e = React.useState(null), deleteItem = _e[0], setDeleteItem = _e[1];
    var statuses = tslib_1.__spreadArray(['all'], Array.from(new Set(items.map(function (i) { return i.statut; }))), true);
    var filtered = items.filter(function (i) {
        var q = search.toLowerCase();
        var matchesSearch = i.titre.toLowerCase().includes(q) || i.demandeur.toLowerCase().includes(q) || i.motif.toLowerCase().includes(q);
        var matchesStatus = status === 'all' || i.statut === status;
        return matchesSearch && matchesStatus;
    });
    var pageSize = 10;
    var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    var safePage = Math.min(page, totalPages);
    var paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Demandes de Cong\u00E9")),
                    React.createElement("div", { className: "mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Demandes de Cong\u00E9"),
                            React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Consultez, ajoutez ou modifiez les demandes de cong\u00E9.")),
                        React.createElement("a", { href: "#page-workflow-ajouter-conge", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition shrink-0" },
                            React.createElement(fa6_1.FaPlus, null),
                            " Nouvelle demande de cong\u00E9")),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { setSearch(e.target.value); setPage(1); }, placeholder: "Rechercher...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(fa6_1.FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: status, onChange: function (e) { setStatus(e.target.value); setPage(1); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }, statuses.map(function (s) { return (React.createElement("option", { key: s, value: s }, s === 'all' ? 'Tous les statuts' : s)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " demande(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucune demande ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                React.createElement("div", { className: "overflow-x-auto" },
                    React.createElement("table", { className: "w-full text-left text-xs min-w-[900px]" },
                        React.createElement("thead", null,
                            React.createElement("tr", { className: "border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]" },
                                React.createElement("th", { className: "py-3 px-4" }, "Demande"),
                                React.createElement("th", { className: "py-3 px-4" }, "Demandeur"),
                                React.createElement("th", { className: "py-3 px-4" }, "Type"),
                                React.createElement("th", { className: "py-3 px-4" }, "P\u00E9riode"),
                                React.createElement("th", { className: "py-3 px-4" }, "Jours"),
                                React.createElement("th", { className: "py-3 px-4" }, "Motif"),
                                React.createElement("th", { className: "py-3 px-4" }, "Statut"),
                                React.createElement("th", { className: "py-3 px-4 text-right" }, "Actions"))),
                        React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, paginated.map(function (i) { return (React.createElement("tr", { key: i.id, className: "hover:bg-slate-50 transition" },
                            React.createElement("td", { className: "py-3 px-4 font-black text-slate-900" }, i.titre),
                            React.createElement("td", { className: "py-3 px-4" },
                                React.createElement("span", { className: "flex items-center gap-1.5 text-slate-500" },
                                    React.createElement(fa6_1.FaUser, { className: "text-[10px]" }),
                                    " ",
                                    i.demandeur)),
                            React.createElement("td", { className: "py-3 px-4 text-slate-500" }, i.type),
                            React.createElement("td", { className: "py-3 px-4" },
                                React.createElement("span", { className: "flex items-center gap-1.5 text-slate-500" },
                                    React.createElement(fa6_1.FaCalendarDays, { className: "text-[10px]" }),
                                    " ",
                                    i.dateDebut,
                                    " \u2192 ",
                                    i.dateFin)),
                            React.createElement("td", { className: "py-3 px-4 font-bold text-slate-800" },
                                i.jours,
                                " j"),
                            React.createElement("td", { className: "py-3 px-4 text-slate-500 max-w-[180px] truncate" }, i.motif),
                            React.createElement("td", { className: "py-3 px-4" }, statusBadge(i.statut)),
                            React.createElement("td", { className: "py-3 px-4 text-right" },
                                React.createElement("div", { className: "inline-flex items-center gap-1.5" },
                                    React.createElement("a", { href: "#page-workflow-detail-conge&id=".concat(i.id), className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-[10px] hover:bg-blue-100 transition" },
                                        React.createElement(fa6_1.FaEye, { className: "text-[9px]" }),
                                        " D\u00E9tail"),
                                    React.createElement("a", { href: "#page-workflow-modifier-conge&id=".concat(i.id), className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-ikaBlue font-bold text-[10px] hover:bg-ikaSoft transition" },
                                        React.createElement(fa6_1.FaPen, { className: "text-[9px]" }),
                                        " Modifier"),
                                    React.createElement("button", { onClick: function () { return setDeleteItem(i); }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 font-bold text-[10px] hover:bg-rose-100 transition" },
                                        React.createElement(fa6_1.FaTrashCan, { className: "text-[9px]" }),
                                        " Supprimer"))))); })))),
                React.createElement("div", { className: "px-4" },
                    React.createElement(Pagination_1.Pagination, { total: filtered.length, page: safePage, pageSize: pageSize, labelSingular: "demande", labelPlural: "demandes", onPageChange: setPage }))))),
        deleteItem && (React.createElement(ConfirmDelete_1.ConfirmDelete, { title: "Supprimer la demande", message: "Voulez-vous vraiment supprimer la demande de cong\u00E9 \u00AB ".concat(deleteItem.titre, " \u00BB de ").concat(deleteItem.demandeur, " ? Cette action est irr\u00E9versible."), onConfirm: function () { setItems(function (prev) { return prev.filter(function (x) { return x.id !== deleteItem.id; }); }); setDeleteItem(null); setPage(1); }, onCancel: function () { return setDeleteItem(null); } }))));
};
exports.ListeConge = ListeConge;
exports.default = exports.ListeConge;
//# sourceMappingURL=ListeConge.js.map