"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAgendas = loadAgendas;
var tslib_1 = require("tslib");
var LIST_NAME = 'Agendas';
var CACHE_TTL = 5 * 60 * 1000;
var MONTHS_FR = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
var BG_CLASSES = ['bg-ikaBlueDark', 'bg-ikaRed', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600', 'bg-rose-600'];
var cache = null;
function isActive(value) {
    return value !== false && value !== 0;
}
function asString(value) {
    return value === null || value === undefined ? '' : String(value).trim();
}
var fieldMapCache = {};
var FIELD_MAP_CACHE_TTL = 20 * 60 * 1000;
function setCachedFieldMap(cacheKey, value) {
    fieldMapCache[cacheKey] = { value: value, ts: Date.now() };
}
function getFieldMap(siteUrl, listName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cacheKey, cached, res, fields, map_1, _a;
        return tslib_1.__generator(this, function (_b) {
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
function formatTime(date) {
    return date && !isNaN(date.getTime())
        ? date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        : '';
}
function readCache() {
    if (cache && Date.now() - cache.ts < CACHE_TTL)
        return cache.data;
    return undefined;
}
function loadAgendas(siteUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cached, fieldMap_1, res, items, agenda, err_1;
        return tslib_1.__generator(this, function (_a) {
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
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/items?$select=*&$top=500"), {
                            headers: { Accept: 'application/json;odata=nometadata' }
                        })];
                case 3:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 4:
                    items = ((_a.sent()).value || []);
                    agenda = items
                        .filter(function (it) { return isActive(getVal(it, fieldMap_1, 'Active', ['Active'])); })
                        .map(function (it, i) {
                        var _a;
                        var startRaw = getVal(it, fieldMap_1, 'Date et heure de début', ['DateDebut', 'StartTime', 'EventDate', 'StartDateTime']);
                        var endRaw = getVal(it, fieldMap_1, 'Date et heure de fin', ['DateFin', 'EndTime', 'EndDate', 'EndDateTime']);
                        var start = startRaw ? new Date(String(startRaw)) : null;
                        var end = endRaw ? new Date(String(endRaw)) : null;
                        var startTime = formatTime(start);
                        var endTime = formatTime(end);
                        var time = start && end ? "".concat(startTime, " - ").concat(endTime) : startTime || 'Toute la journée';
                        return {
                            id: Number((_a = getVal(it, fieldMap_1, 'Id', ['Id'])) !== null && _a !== void 0 ? _a : i + 1),
                            month: start && !isNaN(start.getTime()) ? MONTHS_FR[start.getMonth()] : '',
                            day: start && !isNaN(start.getTime()) ? String(start.getDate()) : '',
                            bg: BG_CLASSES[i % BG_CLASSES.length],
                            title: asString(getVal(it, fieldMap_1, 'Titre', ['Title'])),
                            time: time,
                            location: asString(getVal(it, fieldMap_1, 'Localisation', ['Localisation', 'Location', 'Lieu'])),
                            category: asString(getVal(it, fieldMap_1, 'Catégorie', ['Categorie', 'Category'])),
                            organizer: asString(getVal(it, fieldMap_1, 'Organisateur', ['Organisateur', 'Organizer'])),
                            text: asString(getVal(it, fieldMap_1, 'Description', ['Description'])),
                            start: start && !isNaN(start.getTime()) ? start.toISOString() : undefined,
                            end: end && !isNaN(end.getTime()) ? end.toISOString() : undefined
                        };
                    })
                        .filter(function (a) { return a.title !== ''; });
                    if (agenda.length > 0) {
                        cache = { data: agenda, ts: Date.now() };
                    }
                    return [2 /*return*/, agenda];
                case 5:
                    err_1 = _a.sent();
                    console.error('[agenda] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map