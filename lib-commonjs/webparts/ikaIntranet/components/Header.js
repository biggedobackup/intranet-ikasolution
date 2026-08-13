"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var logo_png_1 = tslib_1.__importDefault(require("../assets/imges/logo.png"));
var Header = function (props) {
    var _a = React.useState(false), mobileOpen = _a[0], setMobileOpen = _a[1];
    var items = props.menuItems || [];
    var logoSrc = props.logoUrl || logo_png_1.default;
    return (React.createElement("header", { id: "top", className: "sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-md backdrop-blur" },
        React.createElement("nav", { className: "mx-auto grid h-20 max-w-[1650px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8" },
            React.createElement("a", { href: "#page-accueil", className: "flex items-center gap-3 justify-self-start", "aria-label": "IKA SOLUTION Intranet" },
                React.createElement("img", { className: "h-14 w-auto object-contain", src: logoSrc, alt: "IKA SOLUTION" })),
            React.createElement("div", { className: "hidden items-center gap-3 xl:gap-4 text-sm font-bold text-slate-700 justify-self-center lg:flex" }, items.map(function (item) {
                if (item.children && item.children.length > 0) {
                    return (React.createElement("div", { key: item.Title, className: "relative group" },
                        React.createElement("a", { href: item.MenuUrl, className: "flex items-center gap-1.5 transition hover:text-ikaBlue px-3 py-1.5 rounded-lg hover:bg-slate-100/80 focus:outline-none" },
                            React.createElement("span", null, item.Title),
                            React.createElement(fa6_1.FaChevronDown, { className: "text-[10px] text-slate-400 transition-transform duration-200 group-hover:rotate-180" })),
                        React.createElement("div", { className: "absolute left-0 top-full hidden w-56 rounded-xl border border-slate-200 bg-white p-2 pt-3 shadow-premium group-hover:block transition-all duration-200 z-50" }, item.children.map(function (child) { return (React.createElement("a", { key: child.Title, href: child.MenuUrl, className: "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-ikaSoft hover:text-ikaBlue transition" },
                            React.createElement("span", null, child.Title))); }))));
                }
                return (React.createElement("a", { key: item.Title, href: item.MenuUrl, className: "transition hover:text-ikaBlue px-3 py-1.5 rounded-lg hover:bg-slate-100/80" }, item.Title));
            })),
            React.createElement("button", { id: "menuButton", className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-ikaBlue justify-self-end lg:hidden", "aria-label": "Menu", "aria-expanded": mobileOpen, onClick: function () { return setMobileOpen(!mobileOpen); } },
                React.createElement("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" })))),
        mobileOpen && (React.createElement("div", { id: "mobileMenu", className: "border-t border-slate-100 bg-white px-4 py-4 lg:hidden" },
            React.createElement("div", { className: "mx-auto grid max-w-[1600px] gap-2 text-sm font-semibold text-slate-700" }, items.map(function (item) {
                if (item.children && item.children.length > 0) {
                    return (React.createElement("div", { key: item.Title, className: "rounded-xl bg-slate-50 p-2 space-y-1" },
                        React.createElement("div", { className: "px-2 py-1 text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5" }, item.Title),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2" }, item.children.map(function (child) { return (React.createElement("a", { key: child.Title, href: child.MenuUrl, className: "rounded-lg px-2.5 py-1.5 hover:bg-white text-xs font-medium text-slate-700 flex items-center gap-2" }, child.Title)); }))));
                }
                return (React.createElement("a", { key: item.Title, className: "rounded-xl px-3 py-2.5 hover:bg-ikaSoft", href: item.MenuUrl }, item.Title));
            }))))));
};
exports.Header = Header;
exports.default = exports.Header;
//# sourceMappingURL=Header.js.map