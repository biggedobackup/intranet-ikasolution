"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImageFile = isImageFile;
exports.getGalerieRootFolder = getGalerieRootFolder;
exports.loadGalerieFolders = loadGalerieFolders;
exports.loadGalerieImages = loadGalerieImages;
var tslib_1 = require("tslib");
var LIBRARY_NAME = 'Galerie';
var CACHE_TTL = 5 * 60 * 1000;
var folderCache = {};
var imagesCache = {};
function asString(value) {
    return value === null || value === undefined ? '' : String(value).trim();
}
function sitePathOf(siteUrl) {
    try {
        return new URL(siteUrl).pathname;
    }
    catch (_a) {
        return '';
    }
}
function toSiteRelative(siteUrl, path) {
    var sp = sitePathOf(siteUrl);
    if (sp && path.startsWith(sp))
        return path.slice(sp.length) || '/';
    return path;
}
function normalizeUrl(value, siteUrl) {
    var s = asString(value);
    if (!s)
        return '';
    if (s.startsWith('http'))
        return s;
    var rel = toSiteRelative(siteUrl, s);
    return rel.startsWith('/') ? "".concat(siteUrl).concat(rel) : s;
}
function encodeODataString(value) {
    return value.replace(/'/g, "''");
}
function isImageFile(fileName) {
    return /\.(apng|avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(fileName);
}
function getListRootUrl(siteUrl, listName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, data, sr;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/RootFolder?$select=ServerRelativeUrl"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_a.sent());
                    sr = data.ServerRelativeUrl || '';
                    if (!sr)
                        throw new Error('RootFolder vide');
                    return [2 /*return*/, sr];
            }
        });
    });
}
function getGalerieRootFolder(siteUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, _b, sp;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 7]);
                    return [4 /*yield*/, getListRootUrl(siteUrl, LIBRARY_NAME)];
                case 1: return [2 /*return*/, _c.sent()];
                case 2:
                    _a = _c.sent();
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, getListRootUrl(siteUrl, 'galerie')];
                case 4: return [2 /*return*/, _c.sent()];
                case 5:
                    _b = _c.sent();
                    sp = sitePathOf(siteUrl);
                    return [2 /*return*/, sp ? "".concat(sp, "/").concat(LIBRARY_NAME) : "/".concat(LIBRARY_NAME)];
                case 6: return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function readFolderCache(rootUrl) {
    var cached = folderCache[rootUrl];
    if (cached && Date.now() - cached.ts < CACHE_TTL)
        return cached.data;
    return undefined;
}
function readImagesCache(folderUrl) {
    var cached = imagesCache[folderUrl];
    if (cached && Date.now() - cached.ts < CACHE_TTL)
        return cached.data;
    return undefined;
}
function loadGalerieFolders(siteUrl, rootUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cachedFolder, url, res, data, folders, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cachedFolder = readFolderCache(rootUrl);
                    if (cachedFolder)
                        return [2 /*return*/, cachedFolder];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    url = "".concat(siteUrl, "/_api/web/GetFolderByServerRelativeUrl('").concat(encodeODataString(rootUrl), "')/Folders?$select=Name,ServerRelativeUrl,ItemCount&$orderby=Name asc");
                    return [4 /*yield*/, fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 2:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = (_a.sent());
                    folders = (data.value || [])
                        .filter(function (f) {
                        var name = asString(f.Name);
                        return name !== '' && name !== 'Forms' && !name.startsWith('_');
                    })
                        .map(function (f) { return ({
                        name: asString(f.Name),
                        serverRelativeUrl: asString(f.ServerRelativeUrl),
                        itemCount: Number(f.ItemCount || 0)
                    }); });
                    if (folders.length > 0) {
                        folderCache[rootUrl] = { data: folders, ts: Date.now() };
                    }
                    return [2 /*return*/, folders];
                case 4:
                    err_1 = _a.sent();
                    console.error('[galerie] Erreur de chargement des dossiers :', err_1);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function loadGalerieImages(siteUrl, folderUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cachedImages, url, res, data, images, err_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cachedImages = readImagesCache(folderUrl);
                    if (cachedImages)
                        return [2 /*return*/, cachedImages];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    url = "".concat(siteUrl, "/_api/web/GetFolderByServerRelativeUrl('").concat(encodeODataString(folderUrl), "')/Files?$select=Name,ServerRelativeUrl,ListItemAllFields/Title,ListItemAllFields/Description&$expand=ListItemAllFields&$top=5000");
                    return [4 /*yield*/, fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 2:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = (_a.sent());
                    images = (data.value || [])
                        .filter(function (file) { return isImageFile(asString(file.Name)); })
                        .map(function (file) {
                        var fields = file.ListItemAllFields || {};
                        var name = asString(file.Name);
                        return {
                            id: asString(file.ServerRelativeUrl) || name,
                            name: name,
                            title: asString(fields.Title) || name.replace(/\.[^.]+$/, ''),
                            description: asString(fields.Description),
                            url: normalizeUrl(file.ServerRelativeUrl, siteUrl)
                        };
                    });
                    if (images.length > 0) {
                        imagesCache[folderUrl] = { data: images, ts: Date.now() };
                    }
                    return [2 /*return*/, images];
                case 4:
                    err_2 = _a.sent();
                    console.error('[galerie] Erreur de chargement des images :', err_2);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map