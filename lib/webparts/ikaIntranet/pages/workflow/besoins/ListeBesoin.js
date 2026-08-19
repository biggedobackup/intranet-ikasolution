import * as React from 'react';
import { FaMagnifyingGlass, FaPlus, FaPen, FaUser, FaCalendarDays, FaCircleCheck, FaCircleXmark, FaHourglassHalf, FaEye, FaTrashCan } from 'react-icons/fa6';
import { loadBesoins, deleteBesoin, formatDateFR } from '../../../services/workflow/besoins/index';
import { Pagination } from '../../../components/Pagination';
import { ConfirmDelete } from '../../../components/ConfirmDelete';
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
var prioriteBadge = function (priorite) {
    var cls = priorite === 'Haute' ? 'bg-rose-100 text-rose-700' : priorite === 'Moyenne' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600';
    return React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold ".concat(cls) }, priorite);
};
export var ListeBesoin = function (props) {
    var siteUrl = props.siteUrl;
    var _a = React.useState(''), search = _a[0], setSearch = _a[1];
    var _b = React.useState('all'), status = _b[0], setStatus = _b[1];
    var _c = React.useState(1), page = _c[0], setPage = _c[1];
    var _d = React.useState([]), items = _d[0], setItems = _d[1];
    var _e = React.useState(true), loading = _e[0], setLoading = _e[1];
    var _f = React.useState(''), error = _f[0], setError = _f[1];
    var _g = React.useState(null), deleteItem = _g[0], setDeleteItem = _g[1];
    var _h = React.useState(false), deleting = _h[0], setDeleting = _h[1];
    var fetchItems = React.useCallback(function (force) {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        setLoading(true);
        loadBesoins(siteUrl, force)
            .then(function (data) { setItems(data); setLoading(false); })
            .catch(function () { setError('Impossible de charger les expressions de besoin.'); setLoading(false); });
    }, [siteUrl]);
    React.useEffect(function () { fetchItems(); }, [fetchItems]);
    var statuses = ['all'].concat(Array.from(new Set(items.map(function (i) { return i.statut; }))));
    var filtered = items.filter(function (i) {
        var q = search.toLowerCase();
        var matchesSearch = i.titre.toLowerCase().indexOf(q) !== -1 || i.demandeur.toLowerCase().indexOf(q) !== -1 || i.description.toLowerCase().indexOf(q) !== -1;
        var matchesStatus = status === 'all' || i.statut === status;
        return matchesSearch && matchesStatus;
    });
    var pageSize = 10;
    var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    var safePage = Math.min(page, totalPages);
    var paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
    var handleConfirmDelete = function () {
        if (!siteUrl || !deleteItem)
            return;
        setDeleting(true);
        deleteBesoin(siteUrl, deleteItem.id)
            .then(function (ok) {
            setDeleting(false);
            if (ok) {
                setItems(function (prev) { return prev.filter(function (x) { return x.id !== deleteItem.id; }); });
                setDeleteItem(null);
                setPage(1);
            }
            else {
                setError('La suppression a échoué. Réessayez.');
                setDeleteItem(null);
            }
        })
            .catch(function () { setDeleting(false); setDeleteItem(null); setError('La suppression a échoué. Réessayez.'); });
    };
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Expressions de besoin")),
                    React.createElement("div", { className: "mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Expressions de besoin"),
                            React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Consultez, ajoutez ou modifiez les expressions de besoin.")),
                        React.createElement("a", { href: "#page-workflow-ajouter-besoin", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition shrink-0" },
                            React.createElement(FaPlus, null),
                            " Nouvelle expression de besoin")),
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { setSearch(e.target.value); setPage(1); }, placeholder: "Rechercher...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: status, onChange: function (e) { setStatus(e.target.value); setPage(1); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }, statuses.map(function (s) { return (React.createElement("option", { key: s, value: s }, s === 'all' ? 'Tous les statuts' : s)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " besoin(s)")))),
            error ? (React.createElement("div", { className: "rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600" }, error)) : null,
            loading ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Chargement des besoins..."))) : filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun besoin ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                React.createElement("div", { className: "overflow-x-auto" },
                    React.createElement("table", { className: "w-full text-left text-xs min-w-[1000px]" },
                        React.createElement("thead", null,
                            React.createElement("tr", { className: "border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]" },
                                React.createElement("th", { className: "py-3 px-4" }, "Besoin"),
                                React.createElement("th", { className: "py-3 px-4" }, "Demandeur"),
                                React.createElement("th", { className: "py-3 px-4" }, "Priorit\u00E9"),
                                React.createElement("th", { className: "py-3 px-4" }, "Date souhait\u00E9e"),
                                React.createElement("th", { className: "py-3 px-4" }, "Description"),
                                React.createElement("th", { className: "py-3 px-4" }, "Statut"),
                                React.createElement("th", { className: "py-3 px-4 text-right" }, "Actions"))),
                        React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, paginated.map(function (i) { return (React.createElement("tr", { key: i.id, className: "hover:bg-slate-50 transition" },
                            React.createElement("td", { className: "py-3 px-4 font-black text-slate-900" }, i.titre),
                            React.createElement("td", { className: "py-3 px-4" },
                                React.createElement("span", { className: "flex items-center gap-1.5 text-slate-500" },
                                    React.createElement(FaUser, { className: "text-[10px]" }),
                                    " ",
                                    i.demandeur || '—')),
                            React.createElement("td", { className: "py-3 px-4" }, prioriteBadge(i.priorite)),
                            React.createElement("td", { className: "py-3 px-4 text-slate-500" },
                                React.createElement("span", { className: "flex items-center gap-1.5" },
                                    React.createElement(FaCalendarDays, { className: "text-[10px]" }),
                                    " ",
                                    formatDateFR(i.dateSouhaitee))),
                            React.createElement("td", { className: "py-3 px-4 text-slate-500 max-w-[200px] truncate" }, i.description),
                            React.createElement("td", { className: "py-3 px-4" }, statusBadge(i.statut)),
                            React.createElement("td", { className: "py-3 px-4 text-right" },
                                React.createElement("div", { className: "inline-flex items-center gap-1.5" },
                                    React.createElement("a", { href: "#page-workflow-detail-besoin&id=".concat(i.id), className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-[10px] hover:bg-blue-100 transition" },
                                        React.createElement(FaEye, { className: "text-[9px]" }),
                                        " D\u00E9tail"),
                                    React.createElement("a", { href: "#page-workflow-modifier-besoin&id=".concat(i.id), className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-ikaBlue font-bold text-[10px] hover:bg-ikaSoft transition" },
                                        React.createElement(FaPen, { className: "text-[9px]" }),
                                        " Modifier"),
                                    React.createElement("button", { onClick: function () { return setDeleteItem(i); }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 font-bold text-[10px] hover:bg-rose-100 transition" },
                                        React.createElement(FaTrashCan, { className: "text-[9px]" }),
                                        " Supprimer"))))); })))),
                React.createElement("div", { className: "px-4" },
                    React.createElement(Pagination, { total: filtered.length, page: safePage, pageSize: pageSize, labelSingular: "besoin", labelPlural: "besoins", onPageChange: setPage }))))),
        deleteItem ? (React.createElement(ConfirmDelete, { title: "Supprimer l'expression", message: "Voulez-vous vraiment supprimer l'expression de besoin \u00AB ".concat(deleteItem.titre, " \u00BB de ").concat(deleteItem.demandeur, " ? Cette action est irr\u00E9versible."), onConfirm: handleConfirmDelete, onCancel: function () { return !deleting && setDeleteItem(null); } })) : null));
};
export default ListeBesoin;
//# sourceMappingURL=ListeBesoin.js.map