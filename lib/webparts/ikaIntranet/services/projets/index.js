import { __awaiter, __generator } from "tslib";
var LIST_NAME = 'Projets';
var CACHE_TTL = 5 * 60 * 1000;
var cache = null;
function readCache() {
    if (cache && Date.now() - cache.ts < CACHE_TTL)
        return cache.data;
    return undefined;
}
function asString(value) {
    return value === null || value === undefined ? '' : String(value).trim();
}
function formatDateFR(value) {
    var d = new Date(String(value));
    if (isNaN(d.getTime()))
        return '';
    var dd = ('0' + d.getDate()).slice(-2);
    var mm = ('0' + (d.getMonth() + 1)).slice(-2);
    return "".concat(dd, "/").concat(mm, "/").concat(d.getFullYear());
}
function statusCls(status) {
    var s = status.toLowerCase();
    if (s.indexOf('termin') !== -1)
        return 'bg-emerald-100 text-emerald-700';
    if (s.indexOf('retard') !== -1)
        return 'bg-rose-100 text-rose-700';
    if (s.indexOf('plan') !== -1 || s.indexOf('a venir') !== -1 || s.indexOf('avenir') !== -1)
        return 'bg-slate-100 text-slate-700';
    return 'bg-blue-100 text-blue-700';
}
function isActive(value) {
    return value !== false && value !== 0;
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
export function loadProjets(siteUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var cached, fieldMap_1, res, items, projets, err_1;
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
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/items?$select=*,Author/Title&$expand=Author/Title&$top=500"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 3:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 4:
                    items = ((_a.sent()).value || []);
                    projets = items
                        .filter(function (it) { return isActive(getVal(it, fieldMap_1, 'Active', ['Active'])); })
                        .map(function (it) {
                        var _a;
                        var status = asString(getVal(it, fieldMap_1, 'Statut', ['Statut', 'Status']));
                        var membersRaw = asString(getVal(it, fieldMap_1, 'Équipe projet', ['EquipeProjet', 'Team', 'Members', 'Equipe']));
                        return {
                            id: Number((_a = getVal(it, fieldMap_1, 'Id', ['Id'])) !== null && _a !== void 0 ? _a : 0),
                            name: asString(getVal(it, fieldMap_1, 'Titre', ['Title'])),
                            start: formatDateFR(getVal(it, fieldMap_1, 'Date de début', ['DateDebut', 'StartDate', 'Debut'])),
                            end: formatDateFR(getVal(it, fieldMap_1, 'Date de fin', ['DateFin', 'EndDate', 'Fin'])),
                            status: status,
                            cls: statusCls(status),
                            client: asString(getVal(it, fieldMap_1, 'Client', ['Client'])),
                            description: asString(getVal(it, fieldMap_1, 'Description', ['Description'])),
                            members: membersRaw
                                .split(/[\n,;]+/)
                                .map(function (s) { return s.trim(); })
                                .filter(function (s) { return s !== ''; })
                                .join(', ')
                        };
                    })
                        .filter(function (p) { return p.name !== ''; });
                    if (projets.length > 0) {
                        cache = { data: projets, ts: Date.now() };
                    }
                    return [2 /*return*/, projets];
                case 5:
                    err_1 = _a.sent();
                    console.error('[projets] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map