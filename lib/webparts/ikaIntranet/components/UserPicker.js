import * as React from 'react';
import { FaUserCheck, FaSpinner, FaXmark } from 'react-icons/fa6';
import { searchUsers } from '../services/shared/index';
export var UserPicker = function (props) {
    var siteUrl = props.siteUrl, value = props.value, onChange = props.onChange, placeholder = props.placeholder, className = props.className;
    var _a = React.useState(value || ''), query = _a[0], setQuery = _a[1];
    var _b = React.useState([]), results = _b[0], setResults = _b[1];
    var _c = React.useState(false), open = _c[0], setOpen = _c[1];
    var _d = React.useState(false), loading = _d[0], setLoading = _d[1];
    var containerRef = React.useRef(null);
    var debounceRef = React.useRef(undefined);
    React.useEffect(function () { setQuery(value || ''); }, [value]);
    React.useEffect(function () {
        function onDocClick(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', onDocClick);
        return function () { return document.removeEventListener('mousedown', onDocClick); };
    }, []);
    var handleInputChange = function (text) {
        setQuery(text);
        onChange(text);
        setOpen(true);
        if (debounceRef.current)
            window.clearTimeout(debounceRef.current);
        var trimmed = text.trim();
        if (!siteUrl || trimmed.length < 2) {
            setResults([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        debounceRef.current = window.setTimeout(function () {
            searchUsers(siteUrl, trimmed)
                .then(function (users) { setResults(users); setLoading(false); })
                .catch(function () { setResults([]); setLoading(false); });
        }, 300);
    };
    var handleSelect = function (user) {
        setQuery(user.email);
        onChange(user.email);
        setResults([]);
        setOpen(false);
    };
    var handleClear = function () {
        setQuery('');
        onChange('');
        setResults([]);
    };
    var inputCls = className || 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm';
    return (React.createElement("div", { className: "relative", ref: containerRef },
        React.createElement("div", { className: "relative" },
            React.createElement("input", { type: "text", value: query, onChange: function (e) { return handleInputChange(e.target.value); }, onFocus: function () { return setOpen(true); }, placeholder: placeholder || 'Rechercher un collaborateur...', className: "".concat(inputCls, " pr-8"), autoComplete: "off" }),
            query ? (React.createElement("button", { type: "button", onClick: handleClear, className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600", "aria-label": "Effacer" },
                React.createElement(FaXmark, { className: "text-xs" }))) : null),
        open && (loading || results.length > 0) ? (React.createElement("div", { className: "absolute z-20 mt-1 w-full bg-white rounded-xl border border-slate-200 shadow-lg max-h-56 overflow-y-auto" }, loading ? (React.createElement("div", { className: "px-3.5 py-2.5 text-xs text-slate-400 flex items-center gap-2" },
            React.createElement(FaSpinner, { className: "animate-spin" }),
            " Recherche...")) : (results.map(function (u) { return (React.createElement("button", { type: "button", key: u.loginName || u.email, onClick: function () { return handleSelect(u); }, className: "w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 border-b border-slate-50 last:border-0" },
            React.createElement("span", { className: "w-7 h-7 rounded-full bg-ikaBlue/10 text-ikaBlue flex items-center justify-center shrink-0" },
                React.createElement(FaUserCheck, { className: "text-[10px]" })),
            React.createElement("span", { className: "min-w-0" },
                React.createElement("span", { className: "block text-xs font-bold text-slate-700 truncate" }, u.displayName),
                React.createElement("span", { className: "block text-[11px] text-slate-400 truncate" }, u.email)))); })))) : null));
};
export default UserPicker;
//# sourceMappingURL=UserPicker.js.map