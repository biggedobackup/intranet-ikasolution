"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page404 = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var Page404 = function () {
    return (React.createElement("main", { className: "pt-32 sm:pt-36 pb-16 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[50vh] text-center" },
                React.createElement("div", { className: "flex justify-center" },
                    React.createElement(fa6_1.FaTriangleExclamation, { className: "text-6xl text-ikaRed" })),
                React.createElement("h1", { className: "text-5xl font-black text-ikaBlueDark mt-4" }, "404"),
                React.createElement("p", { className: "text-slate-500 mt-2" }, "Page introuvable"),
                React.createElement("a", { href: "#page-accueil", className: "inline-block mt-6 bg-ikaBlue text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 shadow transition" }, "Retour \u00E0 l'accueil")))));
};
exports.Page404 = Page404;
exports.default = exports.Page404;
//# sourceMappingURL=page-404.js.map