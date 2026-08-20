import { __awaiter, __generator } from "tslib";
import { parseLikedBy, parseComments, patchField } from '../shared/index';
var LIST_NAME = 'Annonces';
var CACHE_TTL = 5 * 60 * 1000;
var PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23fef3c7'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='30' fill='%23d97706' text-anchor='middle' dominant-baseline='middle'%3EIKA%3C/text%3E%3C/svg%3E";
var cache = null;
function readCache() {
    if (cache && Date.now() - cache.ts < CACHE_TTL)
        return cache.data;
    return undefined;
}
function invalidateCache() {
    cache = null;
}
function isActive(value) {
    return value !== false && value !== 0;
}
function asString(value) {
    return value === null || value === undefined ? '' : String(value).trim();
}
function badgeFor(type) {
    var t = type.toLowerCase();
    if (t.indexOf('annivers') !== -1)
        return 'border-2 border-amber-400';
    if (t.indexOf('mariage') !== -1)
        return 'border-2 border-rose-400';
    if (t.indexOf('naissance') !== -1)
        return 'border-2 border-emerald-400';
    return 'border border-slate-300';
}
var fieldMapCache = {};
var FIELD_MAP_CACHE_TTL = 20 * 60 * 1000;
function setCachedFieldMap(cacheKey, value) {
    fieldMapCache[cacheKey] = { value: value, ts: Date.now() };
}
function getFieldMap(siteUrl, listName) {
    return __awaiter(this, void 0, void 0, function () {
        var cacheKey, cached, res, fields, map_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cacheKey = "".concat(siteUrl, "::").concat(listName);
                    cached = fieldMapCache[cacheKey];
                    if (cached && Date.now() - cached.ts < FIELD_MAP_CACHE_TTL)
                        return [2 /*return*/, cached.value];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/fields?$select=Title,InternalName&$top=500"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 2:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, cached ? cached.value : {}];
                    return [4 /*yield*/, res.json()];
                case 3:
                    fields = (_b.sent()).value;
                    map_1 = {};
                    (fields || []).forEach(function (f) {
                        if (f.Title && f.InternalName)
                            map_1[String(f.Title).toLowerCase()] = f.InternalName;
                    });
                    setCachedFieldMap(cacheKey, map_1);
                    return [2 /*return*/, map_1];
                case 4:
                    _a = _b.sent();
                    return [2 /*return*/, cached ? cached.value : {}];
                case 5: return [2 /*return*/];
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
    return __awaiter(this, void 0, void 0, function () {
        var res, data, sr, _a;
        return __generator(this, function (_b) {
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
function resolveImageUrl(siteUrl, listName, rootFolder, itemId, fileName) {
    return __awaiter(this, void 0, void 0, function () {
        var candidates, res, files, f, _a, encoded_1, folders, seen, _i, candidates_1, c, r, ct, _b;
        return __generator(this, function (_c) {
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
                        folders = [rootFolder || "/Lists/".concat(listName), "/Lists/".concat(listName)];
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
                        console.log('[annonces] Photo item', itemId, '→', c);
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
                    console.warn('[annonces] Photo introuvable item', itemId, ':', fileName);
                    return [2 /*return*/, ''];
            }
        });
    });
}
function relativeTime(value) {
    var iso = asString(value);
    if (!iso)
        return '';
    var date = new Date(iso);
    if (isNaN(date.getTime()))
        return '';
    var diffMs = Date.now() - date.getTime();
    var minutes = Math.floor(diffMs / 60000);
    if (minutes < 1)
        return "À l'instant";
    if (minutes < 60)
        return "Il y a ".concat(minutes, " minute").concat(minutes > 1 ? 's' : '');
    var hours = Math.floor(minutes / 60);
    if (hours < 24)
        return "Il y a ".concat(hours, " heure").concat(hours > 1 ? 's' : '');
    var days = Math.floor(hours / 24);
    if (days < 30)
        return "Il y a ".concat(days, " jour").concat(days > 1 ? 's' : '');
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
export function loadAnnonces(siteUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var cached, fieldMap_1, res, items, missingImages_1, annonces_1, rootFolder_1, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cached = readCache();
                    if (cached)
                        return [2 /*return*/, cached];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, getFieldMap(siteUrl, LIST_NAME)];
                case 2:
                    fieldMap_1 = _a.sent();
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/items?$select=*,Author/Title&$expand=Author/Title&$top=500"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 3:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 4:
                    items = ((_a.sent()).value || []);
                    missingImages_1 = [];
                    annonces_1 = items
                        .filter(function (it) { return isActive(getVal(it, fieldMap_1, 'Active', ['Active'])); })
                        .map(function (it) {
                        var _a;
                        var id = Number((_a = getVal(it, fieldMap_1, 'Id', ['Id'])) !== null && _a !== void 0 ? _a : 0);
                        var rawImg = getVal(it, fieldMap_1, 'Photo', ['Photo', 'Image']);
                        var images = parseImages(rawImg, siteUrl);
                        if (!images.length) {
                            var fileName = getImageFileName(rawImg);
                            if (fileName)
                                missingImages_1.push({ id: id, fileName: fileName });
                        }
                        var type = asString(getVal(it, fieldMap_1, 'Types', ['Types', 'Type']));
                        var published = getVal(it, fieldMap_1, 'Date de publication', ['DatePublication', 'DateDePublication', 'Published']);
                        return {
                            id: id,
                            type: type.toLowerCase(),
                            title: asString(getVal(it, fieldMap_1, 'Titre', ['Title'])),
                            time: relativeTime(published),
                            text: asString(getVal(it, fieldMap_1, 'Message', ['Message'])),
                            avatar: images[0] || PLACEHOLDER_IMG,
                            badge: badgeFor(type),
                            likedBy: parseLikedBy(getVal(it, fieldMap_1, 'AimePar', ['AimePar'])),
                            comments: parseComments(getVal(it, fieldMap_1, 'CommenterPar', ['CommenterPar']))
                        };
                    })
                        .filter(function (a) { return a.title !== ''; });
                    if (!missingImages_1.length) return [3 /*break*/, 7];
                    return [4 /*yield*/, getListRootFolder(siteUrl, LIST_NAME)];
                case 5:
                    rootFolder_1 = _a.sent();
                    return [4 /*yield*/, Promise.all(missingImages_1.map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                            var url, target;
                            var id = _b.id, fileName = _b.fileName;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, resolveImageUrl(siteUrl, LIST_NAME, rootFolder_1, id, fileName)];
                                    case 1:
                                        url = _c.sent();
                                        target = annonces_1.find(function (a) { return a.id === id; });
                                        if (target && url)
                                            target.avatar = url;
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    if (annonces_1.length > 0) {
                        cache = { data: annonces_1, ts: Date.now() };
                    }
                    return [2 /*return*/, annonces_1];
                case 8:
                    err_1 = _a.sent();
                    console.error('[annonces] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 9: return [2 /*return*/];
            }
        });
    });
}
export function updateAnnonceLikedBy(siteUrl, itemId, likedBy) {
    return __awaiter(this, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, patchField(siteUrl, LIST_NAME, itemId, 'AimePar', likedBy)];
                case 1:
                    ok = _a.sent();
                    if (ok)
                        invalidateCache();
                    return [2 /*return*/, ok];
            }
        });
    });
}
export function updateAnnonceComments(siteUrl, itemId, comments) {
    return __awaiter(this, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, patchField(siteUrl, LIST_NAME, itemId, 'CommenterPar', comments)];
                case 1:
                    ok = _a.sent();
                    if (ok)
                        invalidateCache();
                    return [2 /*return*/, ok];
            }
        });
    });
}
//# sourceMappingURL=index.js.map