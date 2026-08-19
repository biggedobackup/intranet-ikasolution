"use strict";
self["webpackHotUpdate_75e4b5d4_d962_489b_a3d6_4d96675cb3b4_0_0_1"]("ika-intranet-web-part",{

/***/ 8778
/*!**********************************************************************!*\
  !*** ./lib/webparts/ikaIntranet/services/workflow/absences/index.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ABSENCE_STATUTS: () => (/* binding */ ABSENCE_STATUTS),
/* harmony export */   ABSENCE_TYPES: () => (/* binding */ ABSENCE_TYPES),
/* harmony export */   applyAbsenceDecision: () => (/* binding */ applyAbsenceDecision),
/* harmony export */   createAbsence: () => (/* binding */ createAbsence),
/* harmony export */   deleteAbsence: () => (/* binding */ deleteAbsence),
/* harmony export */   formatDateFR: () => (/* binding */ formatDateFR),
/* harmony export */   loadAbsence: () => (/* binding */ loadAbsence),
/* harmony export */   loadAbsenceAttachment: () => (/* binding */ loadAbsenceAttachment),
/* harmony export */   loadAbsences: () => (/* binding */ loadAbsences),
/* harmony export */   removeAbsenceAttachment: () => (/* binding */ removeAbsenceAttachment),
/* harmony export */   updateAbsence: () => (/* binding */ updateAbsence),
/* harmony export */   uploadAbsenceAttachment: () => (/* binding */ uploadAbsenceAttachment)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var _shared_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/index */ 8717);


var ABSENCE_TYPES = ['Maladie', 'Autorisée', 'Imprévue', 'Rendez-vous'];
var ABSENCE_STATUTS = ['En attente', 'Approuvé', 'Refusé', 'Annulé'];
var LIST_NAME = 'Signalements Absence';
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
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var fieldMap;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getFieldMap)(siteUrl, LIST_NAME)];
                case 1:
                    fieldMap = _a.sent();
                    return [2 /*return*/, {
                            fieldMap: fieldMap,
                            demandeurKey: fieldMap['demandeur'] || 'Demandeur',
                            validateurKey: fieldMap['validateur'] || 'Validateur',
                            typeKey: fieldMap['type absence'] || 'TypeAbsence',
                            dateDebutKey: fieldMap['date début'] || 'DateDebut',
                            dateFinKey: fieldMap['date fin'] || 'DateFin',
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
        id: Number((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Id', ['Id']) || 0),
        titre: asString((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Titre', ['Title'])),
        demandeurId: personId(it, keys.demandeurKey),
        demandeur: personName(demandeurRaw),
        demandeurEmail: personEmail(demandeurRaw),
        type: asString((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Type Absence', ['TypeAbsence'])),
        dateDebut: toIsoDate((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Date Début', ['DateDebut'])),
        dateFin: toIsoDate((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Date Fin', ['DateFin'])),
        motif: asString((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Motif', ['Motif'])),
        validateurId: personId(it, keys.validateurKey),
        validateur: personName(validateurRaw),
        validateurEmail: personEmail(validateurRaw),
        statut: (asString((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Statut', ['Statut'])) || 'En attente'),
        commentaireDecision: asString((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Commentaire Décision', ['CommentaireDecision'])),
        dateDecision: toIsoDate((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Date Décision', ['DateDecision'])),
        createdAt: toIsoDate((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Créé', ['Created'])),
        active: isActive((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getVal)(it, keys.fieldMap, 'Active', ['Active']))
    };
}
function loadAbsences(siteUrl, force) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var cached, keys_1, expand, res, items, absences, err_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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
                    absences = items
                        .map(function (it) { return mapItem(it, keys_1); })
                        .filter(function (a) { return a.active && a.titre !== ''; });
                    cache = { data: absences, ts: Date.now() };
                    return [2 /*return*/, absences];
                case 5:
                    err_1 = _a.sent();
                    console.error('[absences] Erreur de chargement :', err_1);
                    return [2 /*return*/, []];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function loadAbsence(siteUrl, id) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var keys, expand, res, it_1, err_2;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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
                    console.error('[absences] Erreur de chargement item :', err_2);
                    return [2 /*return*/, undefined];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function createAbsence(siteUrl, payload) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var keys, currentUser, fields, validateur, id, link, subject, body, err_3;
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 1:
                    keys = _b.sent();
                    return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)(siteUrl)];
                case 2:
                    currentUser = _b.sent();
                    if (!currentUser) {
                        console.error('[absences] Utilisateur courant introuvable');
                        return [2 /*return*/, undefined];
                    }
                    fields = (_a = {
                            Title: payload.titre
                        },
                        _a[keys.typeKey] = payload.type,
                        _a[keys.dateDebutKey] = payload.dateDebut ? new Date(payload.dateDebut).toISOString() : null,
                        _a[keys.dateFinKey] = payload.dateFin ? new Date(payload.dateFin).toISOString() : null,
                        _a[keys.motifKey] = payload.motif,
                        _a[keys.statutKey] = 'En attente',
                        _a[keys.activeKey] = true,
                        _a["".concat(keys.demandeurKey, "Id")] = currentUser.id,
                        _a);
                    if (!payload.validateurEmail) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.ensureUser)(siteUrl, payload.validateurEmail)];
                case 3:
                    validateur = _b.sent();
                    if (validateur)
                        fields["".concat(keys.validateurKey, "Id")] = validateur.id;
                    _b.label = 4;
                case 4: return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.createListItem)(siteUrl, LIST_NAME, fields)];
                case 5:
                    id = _b.sent();
                    invalidateCache();
                    if (id && payload.validateurEmail) {
                        link = "".concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getAppPageUrl)(), "#page-workflow-detail-absence&id=").concat(id);
                        subject = "Nouveau signalement d'absence \u00E0 valider : ".concat(payload.titre);
                        body = "<p>Bonjour,</p>\n<p><strong>".concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(currentUser.title), "</strong> a soumis un nouveau signalement d'absence : <strong>").concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(payload.titre), "</strong>.</p>\n<p>Type : ").concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(payload.type), "<br/>P\u00E9riode : du ").concat(formatDateFR(payload.dateDebut), " au ").concat(formatDateFR(payload.dateFin), "</p>\n<p>Motif : ").concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(payload.motif), "</p>\n<p><a href=\"").concat(link, "\">Consulter et traiter le signalement</a></p>");
                        (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.sendEmail)(siteUrl, [payload.validateurEmail], subject, body).catch(function () { return undefined; });
                    }
                    return [2 /*return*/, id];
                case 6:
                    err_3 = _b.sent();
                    console.error('[absences] Erreur de création :', err_3);
                    return [2 /*return*/, undefined];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function updateAbsence(siteUrl, id, payload) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var keys, fields, validateur, ok, err_4;
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, resolveKeys(siteUrl)];
                case 1:
                    keys = _b.sent();
                    fields = (_a = {
                            Title: payload.titre
                        },
                        _a[keys.typeKey] = payload.type,
                        _a[keys.dateDebutKey] = payload.dateDebut ? new Date(payload.dateDebut).toISOString() : null,
                        _a[keys.dateFinKey] = payload.dateFin ? new Date(payload.dateFin).toISOString() : null,
                        _a[keys.motifKey] = payload.motif,
                        _a);
                    if (!payload.validateurEmail) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.ensureUser)(siteUrl, payload.validateurEmail)];
                case 2:
                    validateur = _b.sent();
                    if (validateur)
                        fields["".concat(keys.validateurKey, "Id")] = validateur.id;
                    _b.label = 3;
                case 3: return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.updateListItemFields)(siteUrl, LIST_NAME, id, fields)];
                case 4:
                    ok = _b.sent();
                    if (ok)
                        invalidateCache();
                    return [2 /*return*/, ok];
                case 5:
                    err_4 = _b.sent();
                    console.error('[absences] Erreur de mise à jour :', err_4);
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function deleteAbsence(siteUrl, id) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var ok;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.deleteListItem)(siteUrl, LIST_NAME, id)];
                case 1:
                    ok = _a.sent();
                    if (ok)
                        invalidateCache();
                    return [2 /*return*/, ok];
            }
        });
    });
}
function loadAbsenceAttachment(siteUrl, id) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var files;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getAttachments)(siteUrl, LIST_NAME, id)];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, files[0]];
            }
        });
    });
}
function uploadAbsenceAttachment(siteUrl, id, file) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
            return [2 /*return*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.addAttachment)(siteUrl, LIST_NAME, id, file)];
        });
    });
}
function removeAbsenceAttachment(siteUrl, id, fileName) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
            return [2 /*return*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.deleteAttachment)(siteUrl, LIST_NAME, id, fileName)];
        });
    });
}
function applyAbsenceDecision(siteUrl, absence, action, comment, date) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var keys, fields, ok, approved, link, subject, body, err_5;
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
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
                    return [4 /*yield*/, (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.updateListItemFields)(siteUrl, LIST_NAME, absence.id, fields)];
                case 2:
                    ok = _b.sent();
                    if (ok) {
                        invalidateCache();
                        if (absence.demandeurEmail) {
                            approved = action === 'valider';
                            link = "".concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.getAppPageUrl)(), "#page-workflow-detail-absence&id=").concat(absence.id);
                            subject = approved ? "Votre signalement d'absence a \u00E9t\u00E9 approuv\u00E9" : "Votre signalement d'absence a \u00E9t\u00E9 refus\u00E9";
                            body = "<p>Bonjour ".concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(absence.demandeur), ",</p>\n<p>Votre signalement d'absence <strong>").concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(absence.titre), "</strong> a \u00E9t\u00E9 ").concat(approved ? 'approuvé' : 'refusé', ".</p>\n").concat(comment ? "<p>Commentaire : ".concat((0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(comment), "</p>") : '', "\n<p><a href=\"").concat(link, "\">Voir le signalement</a></p>");
                            (0,_shared_index__WEBPACK_IMPORTED_MODULE_1__.sendEmail)(siteUrl, [absence.demandeurEmail], subject, body).catch(function () { return undefined; });
                        }
                    }
                    return [2 /*return*/, ok];
                case 3:
                    err_5 = _b.sent();
                    console.error('[absences] Erreur de décision :', err_5);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b7145e8ddb113d1aaebb")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=ika-intranet-web-part.f1b2359c5feaa66f8dc9.hot-update.js.map