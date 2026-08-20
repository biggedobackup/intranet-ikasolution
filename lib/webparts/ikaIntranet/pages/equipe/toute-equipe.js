import { __spreadArray } from "tslib";
import * as React from 'react';
import { FaMagnifyingGlass, FaPhone, FaEnvelope, FaUserGroup, FaTriangleExclamation, FaCircleCheck } from 'react-icons/fa6';
import { loadMembres, importMembresFromAad, DEPT_COLORS } from '../../services/equipe/index';
export var TouteEquipe = function (_a) {
    var siteUrl = _a.siteUrl, msGraphClientFactory = _a.msGraphClientFactory;
    var _b = React.useState(''), search = _b[0], setSearch = _b[1];
    var _c = React.useState('all'), dept = _c[0], setDept = _c[1];
    var _d = React.useState([]), membres = _d[0], setMembres = _d[1];
    var _e = React.useState(true), loading = _e[0], setLoading = _e[1];
    var _f = React.useState(false), importing = _f[0], setImporting = _f[1];
    var _g = React.useState(''), importError = _g[0], setImportError = _g[1];
    var _h = React.useState(''), importMessage = _h[0], setImportMessage = _h[1];
    React.useEffect(function () {
        if (!siteUrl) {
            setLoading(false);
            return;
        }
        loadMembres(siteUrl)
            .then(function (data) {
            setMembres(data);
            setLoading(false);
        })
            .catch(function () { return setLoading(false); });
    }, [siteUrl]);
    var handleImportAad = function () {
        if (!siteUrl || !msGraphClientFactory || importing)
            return;
        setImporting(true);
        setImportError('');
        setImportMessage('');
        msGraphClientFactory
            .getClient('3')
            .then(function (client) { return importMembresFromAad(siteUrl, client); })
            .then(function (result) {
            setImporting(false);
            if (result.total === 0) {
                setImportMessage('Aucun compte actif trouvé dans l’annuaire.');
                return;
            }
            setImportMessage("".concat(result.created, " ajout\u00E9(s), ").concat(result.updated, " mis \u00E0 jour").concat(result.errors ? ", ".concat(result.errors, " \u00E9chec(s)") : '', "."));
            return loadMembres(siteUrl, true).then(setMembres);
        })
            .catch(function () {
            setImporting(false);
            setImportError("Impossible de contacter l'annuaire Azure AD. Cette fonctionnalité nécessite l'autorisation Microsoft Graph « User.Read.All », à valider par un administrateur dans le centre d'administration SharePoint (Paramètres avancés > Accès API).");
        });
    };
    var departments = __spreadArray(['all'], Array.from(new Set(membres.map(function (m) { return m.dept; }))), true);
    var filtered = membres.filter(function (m) {
        var q = search.toLowerCase();
        var matchesSearch = m.name.toLowerCase().includes(q) || m.phone.toLowerCase().includes(q);
        var matchesDept = dept === 'all' || m.dept === dept;
        return matchesSearch && matchesDept;
    });
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16" },
                React.createElement("div", { className: "spinner-border text-ikaBlue", role: "status" }),
                React.createElement("p", { className: "mt-3 text-sm text-slate-500" }, "Chargement de l'\u00E9quipe..."))));
    }
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-ikaBlue" }, "Notre \u00E9quipe")),
                    React.createElement("div", { className: "flex items-start justify-between gap-4 flex-wrap" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark" }, "Notre \u00C9quipe"),
                            React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "D\u00E9couvrez les collaborateurs d'IKA SOLUTION, r\u00E9partis par d\u00E9partement.")),
                        msGraphClientFactory ? (React.createElement("button", { type: "button", onClick: handleImportAad, disabled: importing, className: "mt-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition disabled:opacity-60 disabled:cursor-not-allowed shrink-0" },
                            React.createElement(FaUserGroup, { className: "text-xs" }),
                            " ",
                            importing ? 'Récupération en cours...' : "Récupérer toute l'équipe depuis l'AD")) : null),
                    importError ? (React.createElement("div", { className: "mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600" },
                        React.createElement(FaTriangleExclamation, { className: "mt-0.5 shrink-0" }),
                        " ",
                        React.createElement("span", null, importError))) : null,
                    importMessage ? (React.createElement("div", { className: "mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700" },
                        React.createElement(FaCircleCheck, { className: "mt-0.5 shrink-0" }),
                        " ",
                        React.createElement("span", null, importMessage))) : null,
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("div", { className: "relative flex-1 max-w-md" },
                            React.createElement("input", { type: "text", value: search, onChange: function (e) { return setSearch(e.target.value); }, placeholder: "Nom ou T\u00E9l\u00E9phone...", className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }),
                            React.createElement(FaMagnifyingGlass, { className: "absolute left-3 top-3.5 text-slate-400 text-xs" })),
                        React.createElement("select", { value: dept, onChange: function (e) { return setDept(e.target.value); }, className: "py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm" }, departments.map(function (d) { return (React.createElement("option", { key: d, value: d }, d === 'all' ? 'Tous les départements' : d)); })),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                            filtered.length,
                            " collaborateur(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun collaborateur ne correspond \u00E0 votre recherche."))) : (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, filtered.map(function (m) { return (React.createElement("a", { key: m.id, href: "#page-detail-membre&id=".concat(m.id), className: "group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block" },
                React.createElement("div", { className: "h-16 bg-gradient-to-r from-ikaBlueDark to-ikaBlue relative" },
                    React.createElement("img", { src: m.avatar, alt: m.name, className: "absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl object-cover border-4 border-white shadow" })),
                React.createElement("div", { className: "pt-11 px-4 pb-4 text-center" },
                    React.createElement("h3", { className: "text-sm font-black text-slate-900 group-hover:text-ikaBlue transition" }, m.name),
                    React.createElement("p", { className: "text-[11px] font-bold text-ikaBlue mt-0.5" }, m.role),
                    React.createElement("span", { className: "inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ".concat(DEPT_COLORS[m.dept] || 'bg-slate-100 text-slate-700') }, m.dept),
                    React.createElement("div", { className: "mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-500" },
                        React.createElement("span", { className: "flex items-center gap-1.5" },
                            React.createElement(FaPhone, { className: "text-emerald-500 text-[10px]" }),
                            " ",
                            m.phone)),
                    React.createElement("div", { className: "mt-1 flex items-center justify-center gap-1.5 text-[10px] text-slate-400" },
                        React.createElement(FaEnvelope, { className: "text-[9px]" }),
                        " ",
                        React.createElement("span", { className: "truncate" }, m.email))))); }))))));
};
export default TouteEquipe;
//# sourceMappingURL=toute-equipe.js.map