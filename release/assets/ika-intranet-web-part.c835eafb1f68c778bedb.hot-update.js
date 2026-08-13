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
/* harmony import */ var _assets_imges_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/imges/logo.png */ 6073);



var Footer = function (props) {
    var columns = props.columns || [];
    var year = new Date().getFullYear();
    var logoSrc = props.logoUrl || _assets_imges_logo_png__WEBPACK_IMPORTED_MODULE_2__;
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
                    " IKA SOLUTION LTD. Intranet d'entreprise confidentiel."),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Version 1.0.0 \u2014 All Systems Operational")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4eebd00ed94f8a38e4f9")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=ika-intranet-web-part.c835eafb1f68c778bedb.hot-update.js.map