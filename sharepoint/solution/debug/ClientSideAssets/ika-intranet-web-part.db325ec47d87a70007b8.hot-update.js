"use strict";
self["webpackHotUpdate_75e4b5d4_d962_489b_a3d6_4d96675cb3b4_0_0_1"]("ika-intranet-web-part",{

/***/ 8072
/*!*******************************************************!*\
  !*** ./lib/webparts/ikaIntranet/components/Footer.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Footer: () => (/* binding */ Footer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa6 */ 251);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../assets/imges/logo.png'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());



var Footer = function (props) {
    var columns = props.columns || [];
    var year = new Date().getFullYear();
    var logoSrc = props.logoUrl || Object(function webpackMissingModule() { var e = new Error("Cannot find module '../assets/imges/logo.png'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("footer", { className: "border-t border-slate-200 bg-slate-900 text-white mt-auto" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "mx-auto grid max-w-[1650px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "flex items-center gap-3" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", { className: "h-14 w-auto bg-white p-1 rounded-xl shadow-md object-contain", src: logoSrc, alt: "IKA SOLUTION" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", { className: "font-black text-white text-base" }, "IKA INTRANET"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "text-xs text-slate-400" }, "Plateforme Interne"))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: "mt-4 text-xs leading-relaxed text-slate-400" }, "Espace r\u00E9serv\u00E9 aux collaborateurs d'IKA SOLUTION. Centralisation de la documentation, de l'agenda, des bilans et du suivi de projets.")),
            columns.map(function (col) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: col.Category },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { className: "text-xs font-black uppercase tracking-[0.18em] text-white" }, col.Category),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "mt-4 grid gap-2 text-xs font-semibold text-slate-300" }, col.links.map(function (link) {
                    var isTel = link.URL.toLowerCase().startsWith('tel:');
                    var isMail = link.URL.toLowerCase().startsWith('mailto:');
                    var hasUrl = !!link.URL && link.URL !== '#';
                    var cls = 'hover:text-ikaBlue transition flex items-center gap-2';
                    var icon = isTel ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "w-4 h-4 text-emerald-400 flex items-center justify-center" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaPhone, null))) : isMail ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "w-4 h-4 text-ikaBlue flex items-center justify-center" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaEnvelope, null))) : null;
                    return hasUrl ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { key: link.Title, className: cls, href: link.URL },
                        icon,
                        link.Title)) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { key: link.Title, className: "text-slate-400 flex items-center gap-2" },
                        icon,
                        link.Title));
                })))); })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "bg-slate-950 border-t border-slate-800" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null,
                    "\u00A9 ",
                    year,
                    " IKA SOLUTION LTD. Intranet d'entreprise confidentiel.")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);


/***/ },

/***/ 4086
/*!*******************************************************!*\
  !*** ./lib/webparts/ikaIntranet/components/Header.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Header: () => (/* binding */ Header),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa6 */ 251);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../assets/imges/logo.png'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());



var Header = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0__.useState(false), mobileOpen = _a[0], setMobileOpen = _a[1];
    var items = props.menuItems || [];
    var logoSrc = props.logoUrl || Object(function webpackMissingModule() { var e = new Error("Cannot find module '../assets/imges/logo.png'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("header", { id: "top", className: "sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-md backdrop-blur" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", { className: "mx-auto grid h-20 max-w-[1650px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "#page-accueil", className: "flex items-center gap-3 justify-self-start", "aria-label": "IKA SOLUTION Intranet" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", { className: "h-14 w-auto object-contain", src: logoSrc, alt: "IKA SOLUTION" })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "hidden items-center gap-3 xl:gap-4 text-sm font-bold text-slate-700 justify-self-center lg:flex" }, items.map(function (item) {
                if (item.children && item.children.length > 0) {
                    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: item.Title, className: "relative group" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: item.MenuUrl, className: "flex items-center gap-1.5 transition hover:text-ikaBlue px-3 py-1.5 rounded-lg hover:bg-slate-100/80 focus:outline-none" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, item.Title),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_1__.FaChevronDown, { className: "text-[10px] text-slate-400 transition-transform duration-200 group-hover:rotate-180" })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "absolute left-0 top-full hidden w-56 rounded-xl border border-slate-200 bg-white p-2 pt-3 shadow-premium group-hover:block transition-all duration-200 z-50" }, item.children.map(function (child) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { key: child.Title, href: child.MenuUrl, className: "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-ikaSoft hover:text-ikaBlue transition" },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, child.Title))); }))));
                }
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { key: item.Title, href: item.MenuUrl, className: "transition hover:text-ikaBlue px-3 py-1.5 rounded-lg hover:bg-slate-100/80" }, item.Title));
            })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { id: "menuButton", className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-ikaBlue justify-self-end lg:hidden", "aria-label": "Menu", "aria-expanded": mobileOpen, onClick: function () { return setMobileOpen(!mobileOpen); } },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" })))),
        mobileOpen && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { id: "mobileMenu", className: "border-t border-slate-100 bg-white px-4 py-4 lg:hidden" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "mx-auto grid max-w-[1600px] gap-2 text-sm font-semibold text-slate-700" }, items.map(function (item) {
                if (item.children && item.children.length > 0) {
                    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: item.Title, className: "rounded-xl bg-slate-50 p-2 space-y-1" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "px-2 py-1 text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5" }, item.Title),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2" }, item.children.map(function (child) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { key: child.Title, href: child.MenuUrl, className: "rounded-lg px-2.5 py-1.5 hover:bg-white text-xs font-medium text-slate-700 flex items-center gap-2" }, child.Title)); }))));
                }
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { key: item.Title, className: "rounded-xl px-3 py-2.5 hover:bg-ikaSoft", href: item.MenuUrl }, item.Title));
            }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("846abd78059bcec52223")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=ika-intranet-web-part.db325ec47d87a70007b8.hot-update.js.map