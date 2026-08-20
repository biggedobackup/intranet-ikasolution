"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
require("@microsoft/sp-http");
var React = tslib_1.__importStar(require("react"));
var ReactDOM = tslib_1.__importStar(require("react-dom"));
var strings = tslib_1.__importStar(require("IkaIntranetWebPartStrings"));
require("./assets/css/tailwind.css");
require("./assets/css/style.css");
var App_1 = require("./App");
var IkaIntranetWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(IkaIntranetWebPart, _super);
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
        var element = React.createElement(App_1.App, {
            siteUrl: this.context.pageContext.web.absoluteUrl,
            msGraphClientFactory: this.context.msGraphClientFactory
        });
        ReactDOM.render(element, this.domElement);
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
        ReactDOM.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(IkaIntranetWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    IkaIntranetWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: { description: strings.PropertyPaneDescription },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                (0, sp_property_pane_1.PropertyPaneTextField)('description', { label: strings.DescriptionFieldLabel })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return IkaIntranetWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = IkaIntranetWebPart;
//# sourceMappingURL=IkaIntranetWebPart.js.map