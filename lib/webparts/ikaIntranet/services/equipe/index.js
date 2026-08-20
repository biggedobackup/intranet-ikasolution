import { __awaiter, __generator } from "tslib";
import { createListItem, updateListItemFields } from '../shared/index';
var LIST_NAME = 'Equipes';
var LIST_NAME_ALT = 'Equipe';
var CACHE_TTL = 5 * 60 * 1000;
var PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='40' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3EIKA%3C/text%3E%3C/svg%3E";
export var DEPT_COLORS = {
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
function invalidateCache() {
    cache = null;
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
function resolveImageUrl(siteUrl, listName, listNameAlt, rootFolder, itemId, fileName) {
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
function resolveEquipeList(siteUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var fieldMap, fieldMapAlt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFieldMap(siteUrl, LIST_NAME)];
                case 1:
                    fieldMap = _a.sent();
                    if (Object.keys(fieldMap).length > 0)
                        return [2 /*return*/, { listName: LIST_NAME, fieldMap: fieldMap }];
                    return [4 /*yield*/, getFieldMap(siteUrl, LIST_NAME_ALT)];
                case 2:
                    fieldMapAlt = _a.sent();
                    return [2 /*return*/, { listName: LIST_NAME_ALT, fieldMap: fieldMapAlt }];
            }
        });
    });
}
export function loadMembres(siteUrl, force) {
    return __awaiter(this, void 0, void 0, function () {
        var cached, _a, listName_1, fieldMapFinal_1, res, items, missingImages_1, membres_1, rootFolder_1, err_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!force) {
                        cached = readCache();
                        if (cached)
                            return [2 /*return*/, cached];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, resolveEquipeList(siteUrl)];
                case 2:
                    _a = _b.sent(), listName_1 = _a.listName, fieldMapFinal_1 = _a.fieldMap;
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName_1, "')/items?$select=*,Author/Title&$expand=Author/Title&$top=500"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 3:
                    res = _b.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 4:
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
                    if (!missingImages_1.length) return [3 /*break*/, 7];
                    return [4 /*yield*/, getListRootFolder(siteUrl, listName_1)];
                case 5:
                    rootFolder_1 = _b.sent();
                    return [4 /*yield*/, Promise.all(missingImages_1.map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                            var url, target;
                            var id = _b.id, fileName = _b.fileName;
                            return __generator(this, function (_c) {
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
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    if (membres_1.length > 0) {
                        cache = { data: membres_1, ts: Date.now() };
                    }
                    return [2 /*return*/, membres_1];
                case 8:
                    err_1 = _b.sent();
                    console.error('[equipe] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 9: return [2 /*return*/];
            }
        });
    });
}
var GRAPH_BASE_URL = 'https://graph.microsoft.com/v1.0';
export function fetchAadUsers(graphClient) {
    return __awaiter(this, void 0, void 0, function () {
        var users, path, res, batch, next;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = [];
                    path = "/users?$select=displayName,mail,userPrincipalName,jobTitle,department,mobilePhone,businessPhones,accountEnabled,userType&$filter=accountEnabled eq true and userType eq 'Member'&$top=999";
                    _a.label = 1;
                case 1:
                    if (!path) return [3 /*break*/, 3];
                    return [4 /*yield*/, graphClient.api(path).version('v1.0').get()];
                case 2:
                    res = _a.sent();
                    batch = (res && res.value) || [];
                    batch.forEach(function (u) {
                        var email = asString(u.mail) || asString(u.userPrincipalName);
                        var displayName = asString(u.displayName);
                        if (!email || !displayName)
                            return;
                        var businessPhones = Array.isArray(u.businessPhones)
                            ? u.businessPhones.map(function (p) { return asString(p); }).filter(Boolean)
                            : [];
                        users.push({
                            displayName: displayName,
                            email: email,
                            jobTitle: asString(u.jobTitle),
                            department: asString(u.department),
                            phone: asString(u.mobilePhone) || businessPhones[0] || ''
                        });
                    });
                    next = res && typeof res['@odata.nextLink'] === 'string' ? String(res['@odata.nextLink']) : '';
                    path = next ? next.replace(GRAPH_BASE_URL, '') : '';
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, users];
            }
        });
    });
}
export function importMembresFromAad(siteUrl, graphClient) {
    return __awaiter(this, void 0, void 0, function () {
        var result, aadUsers, _a, listName, fieldMap, titreKey, posteKey, deptKey, phoneKey, posteIpKey, emailKey, activeKey, existing, existingByEmail, _i, aadUsers_1, user, match, fields, ok, fields, id, err_2;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    result = { created: 0, updated: 0, errors: 0, total: 0 };
                    return [4 /*yield*/, fetchAadUsers(graphClient)];
                case 1:
                    aadUsers = _d.sent();
                    result.total = aadUsers.length;
                    if (!aadUsers.length)
                        return [2 /*return*/, result];
                    return [4 /*yield*/, resolveEquipeList(siteUrl)];
                case 2:
                    _a = _d.sent(), listName = _a.listName, fieldMap = _a.fieldMap;
                    titreKey = fieldMap['titre'] || 'Title';
                    posteKey = fieldMap['poste'] || 'Poste';
                    deptKey = fieldMap['département'] || 'Departement';
                    phoneKey = fieldMap['téléphone mobile'] || 'TelephoneMobile';
                    posteIpKey = fieldMap['poste ip'] || 'PosteIP';
                    emailKey = fieldMap['email'] || 'Email';
                    activeKey = fieldMap['active'] || 'Active';
                    return [4 /*yield*/, loadMembres(siteUrl, true)];
                case 3:
                    existing = _d.sent();
                    existingByEmail = new Map();
                    existing.forEach(function (m) {
                        if (m.email)
                            existingByEmail.set(m.email.toLowerCase(), m);
                    });
                    _i = 0, aadUsers_1 = aadUsers;
                    _d.label = 4;
                case 4:
                    if (!(_i < aadUsers_1.length)) return [3 /*break*/, 12];
                    user = aadUsers_1[_i];
                    match = existingByEmail.get(user.email.toLowerCase());
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 10, , 11]);
                    if (!match) return [3 /*break*/, 7];
                    fields = (_b = {},
                        _b[titreKey] = user.displayName,
                        _b[phoneKey] = user.phone,
                        _b);
                    if (user.jobTitle)
                        fields[posteKey] = user.jobTitle;
                    if (user.department)
                        fields[deptKey] = user.department;
                    return [4 /*yield*/, updateListItemFields(siteUrl, listName, match.id, fields)];
                case 6:
                    ok = _d.sent();
                    if (ok)
                        result.updated += 1;
                    else
                        result.errors += 1;
                    return [3 /*break*/, 9];
                case 7:
                    fields = (_c = {},
                        _c[titreKey] = user.displayName,
                        _c[posteKey] = user.jobTitle || 'À définir',
                        _c[deptKey] = user.department || 'Non classé',
                        _c[phoneKey] = user.phone,
                        _c[posteIpKey] = 0,
                        _c[emailKey] = user.email,
                        _c[activeKey] = true,
                        _c);
                    return [4 /*yield*/, createListItem(siteUrl, listName, fields)];
                case 8:
                    id = _d.sent();
                    if (id)
                        result.created += 1;
                    else
                        result.errors += 1;
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    err_2 = _d.sent();
                    console.error('[equipe] Erreur import AAD pour', user.email, err_2);
                    result.errors += 1;
                    return [3 /*break*/, 11];
                case 11:
                    _i++;
                    return [3 /*break*/, 4];
                case 12:
                    invalidateCache();
                    return [2 /*return*/, result];
            }
        });
    });
}
//# sourceMappingURL=index.js.map