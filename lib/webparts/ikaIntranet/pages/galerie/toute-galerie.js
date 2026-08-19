import * as React from 'react';
import { FaImages, FaExpand, FaXmark, FaChevronLeft, FaChevronRight, FaFolder, FaArrowLeft } from 'react-icons/fa6';
import { loadGalerieFolders, loadGalerieImages, getGalerieRootFolder } from '../../services/galerie/index';
export var TouteGalerie = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState([]), folders = _b[0], setFolders = _b[1];
    var _c = React.useState(true), loadingFolders = _c[0], setLoadingFolders = _c[1];
    var _d = React.useState(null), currentFolder = _d[0], setCurrentFolder = _d[1];
    var _e = React.useState([]), images = _e[0], setImages = _e[1];
    var _f = React.useState(false), loadingImages = _f[0], setLoadingImages = _f[1];
    var _g = React.useState(null), lightbox = _g[0], setLightbox = _g[1];
    React.useEffect(function () {
        if (!siteUrl) {
            setLoadingFolders(false);
            return;
        }
        getGalerieRootFolder(siteUrl)
            .then(function (rootUrl) { return loadGalerieFolders(siteUrl, rootUrl); })
            .then(function (f) {
            setFolders(f);
            setLoadingFolders(false);
        })
            .catch(function (err) {
            console.error('[TouteGalerie] Dossiers :', err);
            setLoadingFolders(false);
        });
    }, [siteUrl]);
    var openFolder = function (folder) {
        if (!siteUrl)
            return;
        setCurrentFolder(folder);
        setLoadingImages(true);
        setImages([]);
        loadGalerieImages(siteUrl, folder.serverRelativeUrl)
            .then(function (imgs) {
            setImages(imgs);
            setLoadingImages(false);
        })
            .catch(function (err) {
            console.error('[TouteGalerie] Images :', err);
            setLoadingImages(false);
        });
    };
    var goBack = function () {
        setCurrentFolder(null);
        setImages([]);
        setLightbox(null);
    };
    React.useEffect(function () {
        var onKey = function (e) {
            if (lightbox === null)
                return;
            if (e.key === 'ArrowLeft')
                setLightbox((lightbox + images.length - 1) % images.length);
            if (e.key === 'ArrowRight')
                setLightbox((lightbox + 1) % images.length);
            if (e.key === 'Escape')
                setLightbox(null);
        };
        window.addEventListener('keydown', onKey);
        return function () { return window.removeEventListener('keydown', onKey); };
    }, [lightbox, images.length]);
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
                        React.createElement(FaImages, { className: "text-purple-500 text-2xl" }),
                        " Galerie Moments d'\u00C9quipe"),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500 max-w-2xl" }, currentFolder
                        ? "Images du dossier \u00AB ".concat(currentFolder.name, " \u00BB. Cliquez sur une photo pour l&apos;afficher.")
                        : 'Tous les moments forts de la vie d&apos;IKA SOLUTION en images. Ouvrez un dossier pour découvrir ses photos.'),
                    !loadingFolders && !currentFolder && (React.createElement("span", { className: "inline-block mt-4 text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg" },
                        folders.length,
                        " dossier(s)")))),
            !currentFolder && (loadingFolders ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-400 font-semibold" }, "Chargement..."))) : folders.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucun dossier pour le moment."))) : (React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3" }, folders.map(function (f) { return (React.createElement("button", { key: f.serverRelativeUrl, onClick: function () { return openFolder(f); }, className: "group p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg transition flex flex-col items-center gap-2" },
                React.createElement("div", { className: "w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 transition" },
                    React.createElement(FaFolder, null)),
                React.createElement("span", { className: "text-xs font-bold text-slate-700 group-hover:text-purple-600 text-center line-clamp-2" }, f.name),
                f.itemCount > 0 && (React.createElement("span", { className: "px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500" }, f.itemCount)))); })))),
            currentFolder && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "flex items-center gap-3 flex-wrap" },
                    React.createElement("button", { onClick: goBack, className: "px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition text-xs font-bold flex items-center gap-1.5" },
                        React.createElement(FaArrowLeft, { className: "text-[10px]" }),
                        " Tous les dossiers"),
                    React.createElement("span", { className: "text-xs font-bold text-slate-600 flex items-center gap-1.5" },
                        React.createElement(FaFolder, { className: "text-purple-500" }),
                        " ",
                        currentFolder.name),
                    React.createElement("span", { className: "text-[11px] font-semibold text-slate-400" },
                        images.length,
                        " photo(s)")),
                loadingImages ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    React.createElement("p", { className: "text-sm text-slate-400 font-semibold" }, "Chargement des images..."))) : images.length === 0 ? (React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Aucune image dans ce dossier."))) : (React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" }, images.map(function (g, i) { return (React.createElement("button", { key: g.id, onClick: function () { return setLightbox(i); }, className: "group relative rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer shadow" },
                    React.createElement("img", { src: g.url, alt: g.title, className: "w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-500" }),
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end" },
                        React.createElement("span", { className: "text-[10px] font-bold text-white" }, g.title)),
                    React.createElement("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" },
                        React.createElement("span", { className: "bg-white/20 backdrop-blur-sm rounded-full p-2" },
                            React.createElement(FaExpand, { className: "text-white text-sm" }))))); })))))),
        lightbox !== null && images[lightbox] && (React.createElement("div", { className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4", onClick: function (e) { if (e.target === e.currentTarget)
                setLightbox(null); } },
            React.createElement("div", { className: "absolute top-4 left-0 right-0 flex items-center justify-between px-6 z-10" },
                React.createElement("span", { className: "text-white/70 text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full" },
                    lightbox + 1,
                    " / ",
                    images.length),
                React.createElement("button", { onClick: function () { return setLightbox(null); }, className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20" },
                    React.createElement(FaXmark, null))),
            React.createElement("div", { className: "relative w-full max-w-4xl flex items-center justify-center" },
                React.createElement("button", { onClick: function () { return setLightbox((lightbox + images.length - 1) % images.length); }, className: "absolute left-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition -translate-x-2" },
                    React.createElement(FaChevronLeft, null)),
                React.createElement("img", { src: images[lightbox].url, alt: "", className: "max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" }),
                React.createElement("button", { onClick: function () { return setLightbox((lightbox + 1) % images.length); }, className: "absolute right-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition translate-x-2" },
                    React.createElement(FaChevronRight, null))),
            React.createElement("div", { className: "mt-4 text-center" },
                React.createElement("p", { className: "text-white font-bold text-sm" }, images[lightbox].title),
                images[lightbox].description && (React.createElement("p", { className: "text-white/60 text-xs mt-1 max-w-xl" }, images[lightbox].description)))))));
};
export default TouteGalerie;
//# sourceMappingURL=toute-galerie.js.map