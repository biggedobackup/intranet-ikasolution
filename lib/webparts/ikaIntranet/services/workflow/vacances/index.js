import { __awaiter, __generator } from "tslib";
import { getFieldMap, getVal, getCurrentUser, ensureUser, createListItem, updateListItemFields, deleteListItem, sendEmail, escapeHtml, getAppPageUrl, getAttachments, addAttachment, deleteAttachment } from '../../shared/index';
export var VACANCE_STATUTS = ['En attente', 'Approuvé', 'Refusé', 'Annulé'];
var LIST_NAME = 'Demande de Vacances';
var CACHE_TTL = 60 * 1000;
var cache = null;
function invalidateCache() {
    cache = null;
}
function readCache() {
    if (cache && Date.now() - cache.ts < CACHE_TTL)
        return cache.data;
    return undefined;
}
function asString(value) {
    return value === null || value === undefined ? '' : String(value).replace(/^\s+|\s+$/g, '');
}
function isActive(value) {
    return value !== false && value !== 0;
}
function pad2(n) {
    return n < 10 ? '0' + String(n) : String(n);
}
function toIsoDate(value) {
    var s = asString(value);
    if (!s)
        return '';
    var d = new Date(s);
    if (isNaN(d.getTime()))
        return '';
    return "".concat(d.getUTCFullYear(), "-").concat(pad2(d.getUTCMonth() + 1), "-").concat(pad2(d.getUTCDate()));
}
export function formatDateFR(iso) {
    if (!iso)
        return '';
    var parts = iso.split('-');
    if (parts.length !== 3)
        return iso;
    return "".concat(parts[2], "/").concat(parts[1], "/").concat(parts[0]);
}
function personName(raw) {
    if (raw && typeof raw === 'object')
        return asString(raw.Title);
    return '';
}
function personEmail(raw) {
    if (raw && typeof raw === 'object')
        return asString(raw.EMail);
    return '';
}
function personId(item, key) {
    var raw = item["".concat(key, "Id")];
    if (raw === undefined || raw === null || raw === '')
        return undefined;
    var n = Number(raw);
    return isNaN(n) ? undefined : n;
}
function resolveKeys(siteUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var fieldMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFieldMap(siteUrl, LIST_NAME)];
                case 1:
                    fieldMap = _a.sent();
                    return [2 /*return*/, {
                            fieldMap: fieldMap,
                            demandeurKey: fieldMap['demandeur'] || 'Demandeur',
                            validateurKey: fieldMap['validateur'] || 'Validateur',
                            destinationKey: fieldMap['destination'] || 'Destination',
                            dateDebutKey: fieldMap['date début'] || 'DateDebut',
                            dateFinKey: fieldMap['datefin'] || 'DateFin',
                            joursKey: fieldMap['jours'] || 'Jours',
                            motifKey: fieldMap['motif'] || 'Motif',
                            statutKey: fieldMap['statut'] || 'Statut',
                            commentaireKey: fieldMap['commentaire décision'] || 'CommentaireDecision',
                            dateDecisionKey: fieldMap['date décision'] || 'DateDecision',
                            activeKey: fieldMap['active'] || 'Active'
                        }];
            }
        });
    });
}
function expandClause(keys) {
    return [
        "".concat(keys.demandeurKey, "/Title"),
        "".concat(keys.demandeurKey, "/EMail"),
        "".concat(keys.validateurKey, "/Title"),
        "".concat(keys.validateurKey, "/EMail")
    ].join(',');
}
function mapItem(it, keys) {
    var demandeurRaw = it[keys.demandeurKey];
    var validateurRaw = it[keys.validateurKey];
    return {
        id: Number(getVal(it, keys.fieldMap, 'Id', ['Id']) || 0),
        titre: asString(getVal(it, keys.fieldMap, 'Titre', ['Title'])),
        demandeurId: personId(it, keys.demandeurKey),
        demandeur: personName(demandeurRaw),
        demandeurEmail: personEmail(demandeurRaw),
        destination: asString(getVal(it, keys.fieldMap, 'Destination', ['Destination'])),
        dateDebut: toIsoDate(getVal(it, keys.fieldMap, 'Date Début', ['DateDebut'])),
        dateFin: toIsoDate(getVal(it, keys.fieldMap, 'DateFin', ['DateFin'])),
        jours: Number(getVal(it, keys.fieldMap, 'Jours', ['Jours']) || 0),
        motif: asString(getVal(it, keys.fieldMap, 'Motif', ['Motif'])),
        validateurId: personId(it, keys.validateurKey),
        validateur: personName(validateurRaw),
        validateurEmail: personEmail(validateurRaw),
        statut: (asString(getVal(it, keys.fieldMap, 'Statut', ['Statut'])) || 'En attente'),
        commentaireDecision: asString(getVal(it, keys.fieldMap, 'Commentaire Décision', ['CommentaireDecision'])),
        dateDecision: toIsoDate(getVal(it, keys.fieldMap, 'Date Décision', ['DateDecision'])),
        createdAt: toIsoDate(getVal(it, keys.fieldMap, 'Créé', ['Created'])),
        active: isActive(getVal(it, keys.fieldMap, 'Active', ['Active']))
    };
}
export function loadVacances(siteUrl, force) {
    return __awaiter(this, void 0, void 0, function () {
        var cached, keys_1, expand, res, items, vacances, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!force) {
                        cached = readCache();
                        if (cached)
                            return [2 /*return*/, cached];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 2:
                    keys_1 = _a.sent();
                    expand = expandClause(keys_1);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/items?$select=*,").concat(expand, "&$expand=").concat(expand, "&$top=500&$orderby=Id desc"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 3:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 4:
                    items = ((_a.sent()).value || []);
                    vacances = items
                        .map(function (it) { return mapItem(it, keys_1); })
                        .filter(function (v) { return v.active && v.titre !== ''; });
                    cache = { data: vacances, ts: Date.now() };
                    return [2 /*return*/, vacances];
                case 5:
                    err_1 = _a.sent();
                    console.error('[vacances] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function loadVacance(siteUrl, id) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, expand, res, it_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 1:
                    keys = _a.sent();
                    expand = expandClause(keys);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/items(").concat(id, ")?$select=*,").concat(expand, "&$expand=").concat(expand), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 2:
                    res = _a.sent();
                    if (!res.ok)
                        return [2 /*return*/, undefined];
                    return [4 /*yield*/, res.json()];
                case 3:
                    it_1 = (_a.sent());
                    return [2 /*return*/, mapItem(it_1, keys)];
                case 4:
                    err_2 = _a.sent();
                    console.error('[vacances] Erreur de chargement item :', err_2);
                    return [2 /*return*/, undefined];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function createVacance(siteUrl, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, currentUser, fields, validateur, id, link, subject, body, err_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 1:
                    keys = _b.sent();
                    return [4 /*yield*/, getCurrentUser(siteUrl)];
                case 2:
                    currentUser = _b.sent();
                    if (!currentUser) {
                        console.error('[vacances] Utilisateur courant introuvable');
                        return [2 /*return*/, undefined];
                    }
                    fields = (_a = {
                            Title: payload.titre
                        },
                        _a[keys.destinationKey] = payload.destination,
                        _a[keys.dateDebutKey] = payload.dateDebut ? new Date(payload.dateDebut).toISOString() : null,
                        _a[keys.dateFinKey] = payload.dateFin ? new Date(payload.dateFin).toISOString() : null,
                        _a[keys.joursKey] = payload.jours,
                        _a[keys.motifKey] = payload.motif,
                        _a[keys.statutKey] = 'En attente',
                        _a[keys.activeKey] = true,
                        _a["".concat(keys.demandeurKey, "Id")] = currentUser.id,
                        _a);
                    if (!payload.validateurEmail) return [3 /*break*/, 4];
                    return [4 /*yield*/, ensureUser(siteUrl, payload.validateurEmail)];
                case 3:
                    validateur = _b.sent();
                    if (validateur)
                        fields["".concat(keys.validateurKey, "Id")] = validateur.id;
                    _b.label = 4;
                case 4: return [4 /*yield*/, createListItem(siteUrl, LIST_NAME, fields)];
                case 5:
                    id = _b.sent();
                    invalidateCache();
                    if (id && payload.validateurEmail) {
                        link = "".concat(getAppPageUrl(), "#page-workflow-detail-vacances&id=").concat(id);
                        subject = "Nouvelle demande de vacances \u00E0 valider : ".concat(payload.titre);
                        body = "<p>Bonjour,</p>\n<p><strong>".concat(escapeHtml(currentUser.title), "</strong> a soumis une nouvelle demande de vacances : <strong>").concat(escapeHtml(payload.titre), "</strong>.</p>\n<p>Destination : ").concat(escapeHtml(payload.destination), "<br/>P\u00E9riode : du ").concat(formatDateFR(payload.dateDebut), " au ").concat(formatDateFR(payload.dateFin), " (").concat(payload.jours, " jour(s))</p>\n<p>Motif : ").concat(escapeHtml(payload.motif), "</p>\n<p><a href=\"").concat(link, "\">Consulter et traiter la demande</a></p>");
                        sendEmail(siteUrl, [payload.validateurEmail], subject, body).catch(function () { return undefined; });
                    }
                    return [2 /*return*/, id];
                case 6:
                    err_3 = _b.sent();
                    console.error('[vacances] Erreur de création :', err_3);
                    return [2 /*return*/, undefined];
                case 7: return [2 /*return*/];
            }
        });
    });
}
export function updateVacance(siteUrl, id, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, fields, validateur, ok, err_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 1:
                    keys = _b.sent();
                    fields = (_a = {
                            Title: payload.titre
                        },
                        _a[keys.destinationKey] = payload.destination,
                        _a[keys.dateDebutKey] = payload.dateDebut ? new Date(payload.dateDebut).toISOString() : null,
                        _a[keys.dateFinKey] = payload.dateFin ? new Date(payload.dateFin).toISOString() : null,
                        _a[keys.joursKey] = payload.jours,
                        _a[keys.motifKey] = payload.motif,
                        _a);
                    if (!payload.validateurEmail) return [3 /*break*/, 3];
                    return [4 /*yield*/, ensureUser(siteUrl, payload.validateurEmail)];
                case 2:
                    validateur = _b.sent();
                    if (validateur)
                        fields["".concat(keys.validateurKey, "Id")] = validateur.id;
                    _b.label = 3;
                case 3: return [4 /*yield*/, updateListItemFields(siteUrl, LIST_NAME, id, fields)];
                case 4:
                    ok = _b.sent();
                    if (ok)
                        invalidateCache();
                    return [2 /*return*/, ok];
                case 5:
                    err_4 = _b.sent();
                    console.error('[vacances] Erreur de mise à jour :', err_4);
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function deleteVacance(siteUrl, id) {
    return __awaiter(this, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deleteListItem(siteUrl, LIST_NAME, id)];
                case 1:
                    ok = _a.sent();
                    if (ok)
                        invalidateCache();
                    return [2 /*return*/, ok];
            }
        });
    });
}
export function loadVacanceAttachment(siteUrl, id) {
    return __awaiter(this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAttachments(siteUrl, LIST_NAME, id)];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, files[0]];
            }
        });
    });
}
export function uploadVacanceAttachment(siteUrl, id, file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, addAttachment(siteUrl, LIST_NAME, id, file)];
        });
    });
}
export function removeVacanceAttachment(siteUrl, id, fileName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, deleteAttachment(siteUrl, LIST_NAME, id, fileName)];
        });
    });
}
export function applyVacanceDecision(siteUrl, vacance, action, comment, date) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, fields, ok, approved, link, subject, body, err_5;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 1:
                    keys = _b.sent();
                    fields = (_a = {},
                        _a[keys.statutKey] = action === 'valider' ? 'Approuvé' : 'Refusé',
                        _a[keys.commentaireKey] = comment,
                        _a[keys.dateDecisionKey] = date ? new Date(date).toISOString() : new Date().toISOString(),
                        _a);
                    return [4 /*yield*/, updateListItemFields(siteUrl, LIST_NAME, vacance.id, fields)];
                case 2:
                    ok = _b.sent();
                    if (ok) {
                        invalidateCache();
                        if (vacance.demandeurEmail) {
                            approved = action === 'valider';
                            link = "".concat(getAppPageUrl(), "#page-workflow-detail-vacances&id=").concat(vacance.id);
                            subject = approved ? "Votre demande de vacances a \u00E9t\u00E9 approuv\u00E9e" : "Votre demande de vacances a \u00E9t\u00E9 refus\u00E9e";
                            body = "<p>Bonjour ".concat(escapeHtml(vacance.demandeur), ",</p>\n<p>Votre demande de vacances <strong>").concat(escapeHtml(vacance.titre), "</strong> a \u00E9t\u00E9 ").concat(approved ? 'approuvée' : 'refusée', ".</p>\n").concat(comment ? "<p>Commentaire : ".concat(escapeHtml(comment), "</p>") : '', "\n<p><a href=\"").concat(link, "\">Voir la demande</a></p>");
                            sendEmail(siteUrl, [vacance.demandeurEmail], subject, body).catch(function () { return undefined; });
                        }
                    }
                    return [2 /*return*/, ok];
                case 3:
                    err_5 = _b.sent();
                    console.error('[vacances] Erreur de décision :', err_5);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map