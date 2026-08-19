"use strict";
self["webpackHotUpdate_75e4b5d4_d962_489b_a3d6_4d96675cb3b4_0_0_1"]("ika-intranet-web-part",{

/***/ 6299
/*!********************************************************!*\
  !*** ./lib/webparts/ikaIntranet/IkaIntranetWebPart.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ 9676);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-property-pane */ 9877);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ 6642);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom */ 8398);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var IkaIntranetWebPartStrings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! IkaIntranetWebPartStrings */ 79);
/* harmony import */ var IkaIntranetWebPartStrings__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(IkaIntranetWebPartStrings__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_css_tailwind_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/css/tailwind.css */ 3904);
/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/css/style.css */ 4175);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './App'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());










var IkaIntranetWebPart = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(IkaIntranetWebPart, _super);
    function IkaIntranetWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IkaIntranetWebPart.prototype.onInit = function () {
        var fontId = 'ika-intranet-fonts';
        if (!document.getElementById(fontId)) {
            var link = document.createElement('link');
            link.id = fontId;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
            document.head.appendChild(link);
        }
        return _super.prototype.onInit.call(this);
    };
    IkaIntranetWebPart.prototype.render = function () {
        var element = react__WEBPACK_IMPORTED_MODULE_4__.createElement(Object(function webpackMissingModule() { var e = new Error("Cannot find module './App'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            siteUrl: this.context.pageContext.web.absoluteUrl
        });
        react_dom__WEBPACK_IMPORTED_MODULE_5__.render(element, this.domElement);
        this._removeSharePointConstraints();
        this._injectHideStyles();
    };
    IkaIntranetWebPart.prototype._injectHideStyles = function () {
        var styleId = 'ika-intranet-hide-nav';
        if (document.getElementById(styleId))
            return;
        var style = document.createElement('style');
        style.id = styleId;
        style.textContent = [
            '[dir=ltr] .s_Yo8kY_SIvUI, [dir=ltr] .s_fH4eG_SIvUI {',
            '  display: none !important;',
            '}',
            '#spLeftNav, #sideNavBox {',
            '  display: none !important;',
            '}',
            '.CanvasZone, .ControlZone {',
            '  max-width: none !important;',
            '}',
            '.spAppAndPropertyPanelContainer .sp-appBar.sp-appBar-ngsp {',
            '  display: none !important;',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    };
    IkaIntranetWebPart.prototype._removeSharePointConstraints = function () {
        var el = this.domElement;
        if (!el)
            return;
        var suiteBar = document.getElementById('suiteBarDelta');
        var suiteBarHeight = suiteBar && suiteBar.offsetHeight > 0 ? suiteBar.offsetHeight : 48;
        el.style.setProperty('position', 'fixed', 'important');
        el.style.setProperty('top', suiteBarHeight + 'px', 'important');
        el.style.setProperty('left', '0', 'important');
        el.style.setProperty('width', '100vw', 'important');
        el.style.setProperty('height', "calc(100vh - ".concat(suiteBarHeight, "px)"), 'important');
        el.style.setProperty('max-width', '100vw', 'important');
        el.style.setProperty('margin', '0', 'important');
        el.style.setProperty('padding', '0', 'important');
        el.style.setProperty('z-index', '1', 'important');
        el.style.setProperty('overflow-y', 'auto', 'important');
        el.style.setProperty('overflow-x', 'hidden', 'important');
        el.style.setProperty('background', '#fff', 'important');
        ['sideNavBox', 'footer', 'globalNavBox', 'DeltaTopNavigation', 'DeltaSuiteNavigation', 'workbench-page'].forEach(function (id) {
            var node = document.getElementById(id);
            if (node) {
                node.style.setProperty('display', 'none', 'important');
                node.style.setProperty('height', '0', 'important');
            }
        });
        var parent = el.parentElement;
        while (parent && parent !== document.body) {
            parent.style.setProperty('max-width', 'none', 'important');
            parent.style.setProperty('width', '100%', 'important');
            parent.style.setProperty('padding', '0', 'important');
            parent.style.setProperty('margin', '0', 'important');
            parent = parent.parentElement;
        }
    };
    IkaIntranetWebPart.prototype.onDispose = function () {
        react_dom__WEBPACK_IMPORTED_MODULE_5__.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(IkaIntranetWebPart.prototype, "dataVersion", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    IkaIntranetWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: { description: IkaIntranetWebPartStrings__WEBPACK_IMPORTED_MODULE_6__.PropertyPaneDescription },
                    groups: [
                        {
                            groupName: IkaIntranetWebPartStrings__WEBPACK_IMPORTED_MODULE_6__.BasicGroupName,
                            groupFields: [
                                (0,_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_2__.PropertyPaneTextField)('description', { label: IkaIntranetWebPartStrings__WEBPACK_IMPORTED_MODULE_6__.DescriptionFieldLabel })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return IkaIntranetWebPart;
}(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__.BaseClientSideWebPart));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IkaIntranetWebPart);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cc84ace2ebd84e5481c6")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=ika-intranet-web-part.9dd0e6fe27e09ee9d3ac.hot-update.js.map