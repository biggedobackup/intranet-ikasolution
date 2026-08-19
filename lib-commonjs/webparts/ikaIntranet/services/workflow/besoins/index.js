"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BESOIN_STATUTS = exports.BESOIN_PRIORITES = void 0;
exports.formatDateFR = formatDateFR;
exports.loadBesoins = loadBesoins;
exports.loadBesoin = loadBesoin;
exports.createBesoin = createBesoin;
exports.updateBesoin = updateBesoin;
exports.deleteBesoin = deleteBesoin;
exports.loadBesoinAttachment = loadBesoinAttachment;
exports.uploadBesoinAttachment = uploadBesoinAttachment;
exports.removeBesoinAttachment = removeBesoinAttachment;
exports.applyBesoinDecision = applyBesoinDecision;
var tslib_1 = require("tslib");
var index_1 = require("../../shared/index");
exports.BESOIN_PRIORITES = ['Basse', 'Moyenne', 'Haute'];
exports.BESOIN_STATUTS = ['En attente', 'Approuvé', 'Refusé', 'Annulé'];
var LIST_NAME = 'Expressions Besoin';
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
function formatDateFR(iso) {
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
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fieldMap;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, index_1.getFieldMap)(siteUrl, LIST_NAME)];
                case 1:
                    fieldMap = _a.sent();
                    return [2 /*return*/, {
                            fieldMap: fieldMap,
                            demandeurKey: fieldMap['demandeur'] || 'Demandeur',
                            validateurKey: fieldMap['validateur'] || 'Validateur',
                            prioriteKey: fieldMap['priorité'] || 'Priorite',
                            dateSouhaiteeKey: fieldMap['date souhaitée'] || 'DateSouhaitee',
                            descriptionKey: fieldMap['description'] || 'Description',
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
        id: Number((0, index_1.getVal)(it, keys.fieldMap, 'Id', ['Id']) || 0),
        titre: asString((0, index_1.getVal)(it, keys.fieldMap, 'Titre', ['Title'])),
        demandeurId: personId(it, keys.demandeurKey),
        demandeur: personName(demandeurRaw),
        demandeurEmail: personEmail(demandeurRaw),
        priorite: (asString((0, index_1.getVal)(it, keys.fieldMap, 'Priorité', ['Priorite'])) || 'Moyenne'),
        dateSouhaitee: toIsoDate((0, index_1.getVal)(it, keys.fieldMap, 'Date Souhaitée', ['DateSouhaitee'])),
        description: asString((0, index_1.getVal)(it, keys.fieldMap, 'description', ['Description'])),
        validateurId: personId(it, keys.validateurKey),
        validateur: personName(validateurRaw),
        validateurEmail: personEmail(validateurRaw),
        statut: (asString((0, index_1.getVal)(it, keys.fieldMap, 'Statut', ['Statut'])) || 'En attente'),
        commentaireDecision: asString((0, index_1.getVal)(it, keys.fieldMap, 'Commentaire Décision', ['CommentaireDecision'])),
        dateDecision: toIsoDate((0, index_1.getVal)(it, keys.fieldMap, 'Date Décision', ['DateDecision'])),
        createdAt: toIsoDate((0, index_1.getVal)(it, keys.fieldMap, 'Créé', ['Created'])),
        active: isActive((0, index_1.getVal)(it, keys.fieldMap, 'Active', ['Active']))
    };
}
function loadBesoins(siteUrl, force) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var cached, keys_1, expand, res, items, besoins, err_1;
        return tslib_1.__generator(this, function (_a) {
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
                    besoins = items
                        .map(function (it) { return mapItem(it, keys_1); })
                        .filter(function (b) { return b.active && b.titre !== ''; });
                    cache = { data: besoins, ts: Date.now() };
                    return [2 /*return*/, besoins];
                case 5:
                    err_1 = _a.sent();
                    console.error('[besoins] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function loadBesoin(siteUrl, id) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var keys, expand, res, it_1, err_2;
        return tslib_1.__generator(this, function (_a) {
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
                    console.error('[besoins] Erreur de chargement item :', err_2);
                    return [2 /*return*/, undefined];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function createBesoin(siteUrl, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var keys, currentUser, fields, validateur, id, link, subject, body, err_3;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 1:
                    keys = _b.sent();
                    return [4 /*yield*/, (0, index_1.getCurrentUser)(siteUrl)];
                case 2:
                    currentUser = _b.sent();
                    if (!currentUser) {
                        console.error('[besoins] Utilisateur courant introuvable');
                        return [2 /*return*/, undefined];
                    }
                    fields = (_a = {
                            Title: payload.titre
                        },
                        _a[keys.prioriteKey] = payload.priorite,
                        _a[keys.dateSouhaiteeKey] = payload.dateSouhaitee ? new Date(payload.dateSouhaitee).toISOString() : null,
                        _a[keys.descriptionKey] = payload.description,
                        _a[keys.statutKey] = 'En attente',
                        _a[keys.activeKey] = true,
                        _a["".concat(keys.demandeurKey, "Id")] = currentUser.id,
                        _a);
                    if (!payload.validateurEmail) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, index_1.ensureUser)(siteUrl, payload.validateurEmail)];
                case 3:
                    validateur = _b.sent();
                    if (validateur)
                        fields["".concat(keys.validateurKey, "Id")] = validateur.id;
                    _b.label = 4;
                case 4: return [4 /*yield*/, (0, index_1.createListItem)(siteUrl, LIST_NAME, fields)];
                case 5:
                    id = _b.sent();
                    invalidateCache();
                    if (id && payload.validateurEmail) {
                        link = "".concat((0, index_1.getAppPageUrl)(), "#page-workflow-detail-besoin&id=").concat(id);
                        subject = "Nouvelle expression de besoin \u00E0 valider : ".concat(payload.titre);
                        body = "<p>Bonjour,</p>\n<p><strong>".concat((0, index_1.escapeHtml)(currentUser.title), "</strong> a soumis une nouvelle expression de besoin : <strong>").concat((0, index_1.escapeHtml)(payload.titre), "</strong>.</p>\n<p>Priorit\u00E9 : ").concat((0, index_1.escapeHtml)(payload.priorite), "<br/>Date souhait\u00E9e : ").concat(formatDateFR(payload.dateSouhaitee), "</p>\n<p>Description : ").concat((0, index_1.escapeHtml)(payload.description), "</p>\n<p><a href=\"").concat(link, "\">Consulter et traiter la demande</a></p>");
                        (0, index_1.sendEmail)(siteUrl, [payload.validateurEmail], subject, body).catch(function () { return undefined; });
                    }
                    return [2 /*return*/, id];
                case 6:
                    err_3 = _b.sent();
                    console.error('[besoins] Erreur de création :', err_3);
                    return [2 /*return*/, undefined];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function updateBesoin(siteUrl, id, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var keys, fields, validateur, ok, err_4;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 1:
                    keys = _b.sent();
                    fields = (_a = {
                            Title: payload.titre
                        },
                        _a[keys.prioriteKey] = payload.priorite,
                        _a[keys.dateSouhaiteeKey] = payload.dateSouhaitee ? new Date(payload.dateSouhaitee).toISOString() : null,
                        _a[keys.descriptionKey] = payload.description,
                        _a);
                    if (!payload.validateurEmail) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, index_1.ensureUser)(siteUrl, payload.validateurEmail)];
                case 2:
                    validateur = _b.sent();
                    if (validateur)
                        fields["".concat(keys.validateurKey, "Id")] = validateur.id;
                    _b.label = 3;
                case 3: return [4 /*yield*/, (0, index_1.updateListItemFields)(siteUrl, LIST_NAME, id, fields)];
                case 4:
                    ok = _b.sent();
                    if (ok)
                        invalidateCache();
                    return [2 /*return*/, ok];
                case 5:
                    err_4 = _b.sent();
                    console.error('[besoins] Erreur de mise à jour :', err_4);
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function deleteBesoin(siteUrl, id) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ok;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, index_1.deleteListItem)(siteUrl, LIST_NAME, id)];
                case 1:
                    ok = _a.sent();
                    if (ok)
                        invalidateCache();
                    return [2 /*return*/, ok];
            }
        });
    });
}
function loadBesoinAttachment(siteUrl, id) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var files;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, index_1.getAttachments)(siteUrl, LIST_NAME, id)];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, files[0]];
            }
        });
    });
}
function uploadBesoinAttachment(siteUrl, id, file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, index_1.addAttachment)(siteUrl, LIST_NAME, id, file)];
        });
    });
}
function removeBesoinAttachment(siteUrl, id, fileName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, index_1.deleteAttachment)(siteUrl, LIST_NAME, id, fileName)];
        });
    });
}
function applyBesoinDecision(siteUrl, besoin, action, comment, date) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var keys, fields, ok, approved, link, subject, body, err_5;
        var _a;
        return tslib_1.__generator(this, function (_b) {
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
                    return [4 /*yield*/, (0, index_1.updateListItemFields)(siteUrl, LIST_NAME, besoin.id, fields)];
                case 2:
                    ok = _b.sent();
                    if (ok) {
                        invalidateCache();
                        if (besoin.demandeurEmail) {
                            approved = action === 'valider';
                            link = "".concat((0, index_1.getAppPageUrl)(), "#page-workflow-detail-besoin&id=").concat(besoin.id);
                            subject = approved ? "Votre expression de besoin a \u00E9t\u00E9 approuv\u00E9e" : "Votre expression de besoin a \u00E9t\u00E9 refus\u00E9e";
                            body = "<p>Bonjour ".concat((0, index_1.escapeHtml)(besoin.demandeur), ",</p>\n<p>Votre expression de besoin <strong>").concat((0, index_1.escapeHtml)(besoin.titre), "</strong> a \u00E9t\u00E9 ").concat(approved ? 'approuvée' : 'refusée', ".</p>\n").concat(comment ? "<p>Commentaire : ".concat((0, index_1.escapeHtml)(comment), "</p>") : '', "\n<p><a href=\"").concat(link, "\">Voir la demande</a></p>");
                            (0, index_1.sendEmail)(siteUrl, [besoin.demandeurEmail], subject, body).catch(function () { return undefined; });
                        }
                    }
                    return [2 /*return*/, ok];
                case 3:
                    err_5 = _b.sent();
                    console.error('[besoins] Erreur de décision :', err_5);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map