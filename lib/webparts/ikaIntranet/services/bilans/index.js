import { __awaiter, __generator } from "tslib";
var LIST_NAME = 'Bilans';
var CACHE_TTL = 5 * 60 * 1000;
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
function formatSize(bytes) {
    if (!bytes || isNaN(bytes) || bytes <= 0)
        return 'PDF';
    if (bytes < 1024)
        return "".concat(bytes, " o - PDF");
    if (bytes < 1024 * 1024)
        return "".concat(Math.round(bytes / 1024), " Ko - PDF");
    return "".concat((bytes / (1024 * 1024)).toFixed(1), " Mo - PDF");
}
function getFieldMap(siteUrl, listName) {
    return __awaiter(this, void 0, void 0, function () {
        var res, fields, map_1, _a;
        return __generator(this, function (_b) {
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
export function loadBilans(siteUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var cached, fieldMap_1, res, items, bilans, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cached = readCache();
                    if (cached)
                        return [2 /*return*/, cached];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, getFieldMap(siteUrl, LIST_NAME)];
                case 2:
                    fieldMap_1 = _a.sent();
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/items?$select=*,AttachmentFiles/ServerRelativeUrl,AttachmentFiles/FileName,AttachmentFiles/Length&$expand=AttachmentFiles&$top=500"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 3:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 4:
                    items = ((_a.sent()).value || []);
                    bilans = items
                        .filter(function (it) { return isActive(getVal(it, fieldMap_1, 'Active', ['Active'])); })
                        .map(function (it) {
                        var _a;
                        var id = Number((_a = getVal(it, fieldMap_1, 'Id', ['Id'])) !== null && _a !== void 0 ? _a : 0);
                        var attachments = it.AttachmentFiles || [];
                        var att = attachments[0];
                        var period = asString(getVal(it, fieldMap_1, 'Titre', ['Title']));
                        return {
                            id: id,
                            period: period,
                            summary: asString(getVal(it, fieldMap_1, 'Résumé', ['Resume', 'Summary', 'Description'])),
                            file: (att && (att.FileName || '')) || "".concat(period || 'Bilan', ".pdf"),
                            fileUrl: att && att.ServerRelativeUrl ? normalizeUrl(att.ServerRelativeUrl, siteUrl) : '',
                            size: att ? formatSize(att.Length || 0) : 'PDF'
                        };
                    })
                        .filter(function (b) { return b.period !== ''; });
                    if (bilans.length > 0) {
                        cache = { data: bilans, ts: Date.now() };
                    }
                    return [2 /*return*/, bilans];
                case 5:
                    err_1 = _a.sent();
                    console.error('[bilans] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map