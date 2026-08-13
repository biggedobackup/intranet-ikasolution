"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouteGalerie = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var fa6_1 = require("react-icons/fa6");
var data_1 = require("../../services/galerie/data");
var TouteGalerie = function () {
    var _a = React.useState('all'), category = _a[0], setCategory = _a[1];
    var _b = React.useState(null), lightbox = _b[0], setLightbox = _b[1];
    var categories = tslib_1.__spreadArray(['all'], Array.from(new Set(data_1.GALERIE.map(function (g) { return g.category; }))), true);
    var filtered = data_1.GALERIE.filter(function (g) { return category === 'all' || g.category === category; });
    React.useEffect(function () {
        var onKey = function (e) {
            if (lightbox === null)
                return;
            if (e.key === 'ArrowLeft')
                setLightbox((lightbox + filtered.length - 1) % filtered.length);
            if (e.key === 'ArrowRight')
                setLightbox((lightbox + 1) % filtered.length);
            if (e.key === 'Escape')
                setLightbox(null);
        };
        window.addEventListener('keydown', onKey);
        return function () { return window.removeEventListener('keydown', onKey); };
    }, [lightbox, filtered.length]);
    React.useEffect(function () {
        document.body.style.overflow = lightbox !== null ? 'hidden' : '';
        return function () { document.body.style.overflow = ''; };
    }, [lightbox]);
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden" },
                React.createElement("div", { className: "absolute -right-10 -top-10 w-48 h-48 bg-purple-50 rounded-full opacity-70" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                        React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                        React.createElement("span", null, "/"),
                        React.createElement("span", { className: "text-purple-600" }, "Galerie")),
                    React.createElement("h1", { className: "mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark flex items-center gap-2" },
                        React.createElement(fa6_1.FaImages, { className: "text-purple-500 text-2xl" }),
                        " Galerie Moments d'\u00C9quipe"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, "Tous les moments forts de la vie d'IKA SOLUTION en images."),
                    React.createElement("div", { className: "mt-6 flex flex-wrap items-center gap-2 text-[11px] font-bold" },
                        categories.map(function (c) { return (React.createElement("button", { key: c, onClick: function () { return setCategory(c); }, className: "px-3 py-1.5 rounded-full transition ".concat(category === c ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200') }, c === 'all' ? 'Toutes' : c)); }),
                        React.createElement("span", { className: "text-[11px] font-semibold text-slate-400 ml-2" },
                            filtered.length,
                            " photo(s)")))),
            filtered.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucune photo dans cette cat\u00E9gorie."))) : (React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" }, filtered.map(function (g, i) { return (React.createElement("button", { key: g.id, onClick: function () { return setLightbox(i); }, className: "group relative rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer shadow" },
                React.createElement("img", { src: g.src, alt: g.caption, className: "w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-500" }),
                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end" },
                    React.createElement("span", { className: "text-[10px] font-bold text-white" }, g.caption)),
                React.createElement("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" },
                    React.createElement("span", { className: "bg-white/20 backdrop-blur-sm rounded-full p-2" },
                        React.createElement(fa6_1.FaExpand, { className: "text-white text-sm" }))))); })))),
        lightbox !== null && filtered[lightbox] && (React.createElement("div", { className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4", onClick: function (e) { if (e.target === e.currentTarget)
                setLightbox(null); } },
            React.createElement("div", { className: "absolute top-4 left-0 right-0 flex items-center justify-between px-6 z-10" },
                React.createElement("span", { className: "text-white/70 text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full" },
                    lightbox + 1,
                    " / ",
                    filtered.length),
                React.createElement("button", { onClick: function () { return setLightbox(null); }, className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20" },
                    React.createElement(fa6_1.FaXmark, null))),
            React.createElement("div", { className: "relative w-full max-w-4xl flex items-center justify-center" },
                React.createElement("button", { onClick: function () { return setLightbox((lightbox + filtered.length - 1) % filtered.length); }, className: "absolute left-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition -translate-x-2" },
                    React.createElement(fa6_1.FaChevronLeft, null)),
                React.createElement("img", { src: filtered[lightbox].src, alt: "", className: "max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" }),
                React.createElement("button", { onClick: function () { return setLightbox((lightbox + 1) % filtered.length); }, className: "absolute right-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition translate-x-2" },
                    React.createElement(fa6_1.FaChevronRight, null))),
            React.createElement("div", { className: "mt-4 text-center" },
                React.createElement("p", { className: "text-white font-bold text-sm" }, filtered[lightbox].caption))))));
};
exports.TouteGalerie = TouteGalerie;
exports.default = exports.TouteGalerie;
//# sourceMappingURL=toute-galerie.js.map