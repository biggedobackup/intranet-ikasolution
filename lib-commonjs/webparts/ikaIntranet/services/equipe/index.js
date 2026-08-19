"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPT_COLORS = void 0;
exports.loadMembres = loadMembres;
var tslib_1 = require("tslib");
var LIST_NAME = 'Equipes';
var LIST_NAME_ALT = 'Equipe';
var CACHE_TTL = 5 * 60 * 1000;
var PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='40' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3EIKA%3C/text%3E%3C/svg%3E";
exports.DEPT_COLORS = {
    Direction: 'bg-blue-50 text-ikaBlue',
    'Gestion de projet': 'bg-purple-50 text-purple-700',
    Développement: 'bg-emerald-50 text-emerald-700',
    Comptabilité: 'bg-rose-50 text-rose-700',
    Système: 'bg-amber-50 text-amber-700'
};
var cache = null;
function readCache() {
    if (cache && Date.now() - cache.ts < CACHE_TTL)
        return cache.data;
    return undefined;
}
function isActive(value) {
    return value !== false && value !== 0;
}
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
function getFieldMap(siteUrl, listName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, fields, map_1, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/fields?$select=Title,InternalName&$top=500"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, {}];
                    return [4 /*yield*/, res.json()];
                case 2:
                    fields = (_b.sent()).value;
                    map_1 = {};
                    (fields || []).forEach(function (f) {
                        if (f.Title && f.InternalName)
                            map_1[String(f.Title).toLowerCase()] = f.InternalName;
                    });
                    return [2 /*return*/, map_1];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getVal(item, map, display, fallbacks) {
    if (fallbacks === void 0) { fallbacks = []; }
    var key = map[display.toLowerCase()];
    if (key && item[key] !== undefined)
        return item[key];
    for (var _i = 0, fallbacks_1 = fallbacks; _i < fallbacks_1.length; _i++) {
        var f = fallbacks_1[_i];
        if (item[f] !== undefined)
            return item[f];
    }
    return undefined;
}
function parseImages(value, siteUrl) {
    var candidates = [];
    if (value && typeof value === 'object') {
        var o_1 = value;
        ['serverRelativeUrl', 'Url', 'url', 'src', 'imageUrl', 'thumbnailUrl', 'fileName'].forEach(function (k) {
            if (o_1[k])
                candidates.push(String(o_1[k]));
        });
        if (!candidates.length) {
            var str = JSON.stringify(o_1);
            var m = str.match(/https?:\/\/[^"'\s]+/);
            if (m)
                candidates.push(m[0].trim());
        }
    }
    else {
        var raw = asString(value);
        if (!raw)
            return [];
        try {
            var parsed = JSON.parse(raw);
            var arr = Array.isArray(parsed) ? parsed : [parsed];
            arr.forEach(function (o) {
                if (o && typeof o === 'object') {
                    if (o.nativeFile && o.nativeFile.url)
                        candidates.push(o.nativeFile.url);
                    if (o.serverRelativeUrl)
                        candidates.push(o.serverRelativeUrl);
                    if (o.Url)
                        candidates.push(o.Url);
                    if (o.url)
                        candidates.push(o.url);
                    if (o.src)
                        candidates.push(o.src);
                    if (o.imageUrl)
                        candidates.push(o.imageUrl);
                    if (o.thumbnailUrl)
                        candidates.push(o.thumbnailUrl);
                }
                else if (typeof o === 'string') {
                    candidates.push(o);
                }
            });
        }
        catch (_a) {
            // pas du JSON : on traite comme du texte
        }
        if (!candidates.length) {
            raw.split(/[\n,;]+/).forEach(function (s) {
                var t = s.trim();
                if (t)
                    candidates.push(t);
            });
        }
    }
    return candidates
        .map(function (c) { return normalizeUrl(c, siteUrl); })
        .filter(function (c) { return c.startsWith('http') || c.startsWith('data:image'); });
}
function getImageFileName(value) {
    if (value && typeof value === 'object') {
        var o = value;
        return asString(o.fileName) || asString(o.originalImageName);
    }
    var s = asString(value);
    if (!s)
        return '';
    try {
        var p = JSON.parse(s);
        if (p && typeof p === 'object')
            return asString(p.fileName) || asString(p.originalImageName);
    }
    catch (_a) {
        // pas du JSON
    }
    return '';
}
function getListRootFolder(siteUrl, listName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, data, sr, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')?$select=RootFolder/ServerRelativeUrl&$expand=RootFolder"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, ''];
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_b.sent());
                    sr = (data.RootFolder && data.RootFolder.ServerRelativeUrl) || '';
                    return [2 /*return*/, toSiteRelative(siteUrl, sr)];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function resolveImageUrl(siteUrl, listName, listNameAlt, rootFolder, itemId, fileName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var candidates, res, files, f, _a, encoded_1, folders, seen, _i, candidates_1, c, r, ct, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    candidates = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/items(").concat(itemId, ")/AttachmentFiles?$select=ServerRelativeUrl&$top=10"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 2:
                    res = _c.sent();
                    if (!res.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, res.json()];
                case 3:
                    files = ((_c.sent()).value || []);
                    f = files[0];
                    if (f && f.ServerRelativeUrl)
                        candidates.push(normalizeUrl(f.ServerRelativeUrl, siteUrl));
                    _c.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    _a = _c.sent();
                    return [3 /*break*/, 6];
                case 6:
                    if (fileName) {
                        encoded_1 = encodeURIComponent(fileName);
                        folders = [rootFolder || "/Lists/".concat(listName), "/Lists/".concat(listName), "/Lists/".concat(listNameAlt)];
                        folders.forEach(function (f) { return candidates.push("".concat(siteUrl).concat(f, "/Attachments/").concat(itemId, "/").concat(encoded_1)); });
                    }
                    seen = {};
                    _i = 0, candidates_1 = candidates;
                    _c.label = 7;
                case 7:
                    if (!(_i < candidates_1.length)) return [3 /*break*/, 12];
                    c = candidates_1[_i];
                    if (seen[c])
                        return [3 /*break*/, 11];
                    seen[c] = true;
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, fetch(c, { method: 'HEAD' })];
                case 9:
                    r = _c.sent();
                    ct = (r.headers.get('content-type') || '').toLowerCase();
                    if (r.status === 200 && (ct.startsWith('image/') || ct.indexOf('octet-stream') !== -1)) {
                        console.log('[equipe] Photo item', itemId, '→', c);
                        return [2 /*return*/, c];
                    }
                    return [3 /*break*/, 11];
                case 10:
                    _b = _c.sent();
                    return [3 /*break*/, 11];
                case 11:
                    _i++;
                    return [3 /*break*/, 7];
                case 12:
                    console.warn('[equipe] Photo introuvable item', itemId, ':', fileName);
                    return [2 /*return*/, ''];
            }
        });
    });
}
function loadMembres(siteUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cached, fieldMap, listName_1, fieldMapFinal_1, _a, res, items, missingImages_1, membres_1, rootFolder_1, err_1;
        var _this = this;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cached = readCache();
                    if (cached)
                        return [2 /*return*/, cached];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, getFieldMap(siteUrl, LIST_NAME)];
                case 2:
                    fieldMap = _b.sent();
                    listName_1 = fieldMap && Object.keys(fieldMap).length > 0 ? LIST_NAME : LIST_NAME_ALT;
                    if (!(Object.keys(fieldMap).length > 0)) return [3 /*break*/, 3];
                    _a = fieldMap;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, getFieldMap(siteUrl, LIST_NAME_ALT)];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    fieldMapFinal_1 = _a;
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName_1, "')/items?$select=*,Author/Title&$expand=Author/Title&$top=500"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 6:
                    res = _b.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 7:
                    items = ((_b.sent()).value || []);
                    missingImages_1 = [];
                    membres_1 = items
                        .filter(function (it) { return isActive(getVal(it, fieldMapFinal_1, 'Active', ['Active'])); })
                        .map(function (it) {
                        var _a;
                        var name = asString(getVal(it, fieldMapFinal_1, 'Titre', ['Title']));
                        var bio = asString(getVal(it, fieldMapFinal_1, 'Bio', ['Bio', 'Description']));
                        var rawImg = getVal(it, fieldMapFinal_1, 'Photo', ['Photo', 'Image', 'Images']);
                        var id = Number((_a = getVal(it, fieldMapFinal_1, 'Id', ['Id'])) !== null && _a !== void 0 ? _a : 0);
                        var images = parseImages(rawImg, siteUrl);
                        if (!images.length) {
                            var fileName = getImageFileName(rawImg);
                            if (fileName)
                                missingImages_1.push({ id: id, fileName: fileName });
                        }
                        var phone = asString(getVal(it, fieldMapFinal_1, 'Téléphone Mobile', ['TelephoneMobile', 'Telephone', 'Phone']));
                        return {
                            id: id,
                            name: name,
                            role: asString(getVal(it, fieldMapFinal_1, 'Poste', ['Poste', 'Role'])),
                            dept: asString(getVal(it, fieldMapFinal_1, 'Département', ['Departement', 'Department', 'Dept'])),
                            phone: phone,
                            email: asString(getVal(it, fieldMapFinal_1, 'Email', ['Email', 'Courriel'])),
                            avatar: images[0] || PLACEHOLDER_IMG,
                            bio: bio
                        };
                    })
                        .filter(function (m) { return m.name !== ''; });
                    if (!missingImages_1.length) return [3 /*break*/, 10];
                    return [4 /*yield*/, getListRootFolder(siteUrl, listName_1)];
                case 8:
                    rootFolder_1 = _b.sent();
                    return [4 /*yield*/, Promise.all(missingImages_1.map(function (_a) { return tslib_1.__awaiter(_this, [_a], void 0, function (_b) {
                            var url, target;
                            var id = _b.id, fileName = _b.fileName;
                            return tslib_1.__generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, resolveImageUrl(siteUrl, listName_1, LIST_NAME_ALT, rootFolder_1, id, fileName)];
                                    case 1:
                                        url = _c.sent();
                                        target = membres_1.find(function (m) { return m.id === id; });
                                        if (target && url)
                                            target.avatar = url;
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    if (membres_1.length > 0) {
                        cache = { data: membres_1, ts: Date.now() };
                    }
                    return [2 /*return*/, membres_1];
                case 11:
                    err_1 = _b.sent();
                    console.error('[equipe] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 12: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map