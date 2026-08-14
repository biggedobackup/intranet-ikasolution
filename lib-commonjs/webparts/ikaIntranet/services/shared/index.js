"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserEmail = getCurrentUserEmail;
exports.getCurrentUserName = getCurrentUserName;
exports.parseLikedBy = parseLikedBy;
exports.parseComments = parseComments;
exports.getRequestDigest = getRequestDigest;
exports.patchField = patchField;
var tslib_1 = require("tslib");
function getCurrentUserEmail(siteUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, data, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/currentuser?$select=Email,Title"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, ''];
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    return [2 /*return*/, data.Email || ''];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getCurrentUserName(siteUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, data, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/currentuser?$select=Title"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, ''];
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    return [2 /*return*/, data.Title || ''];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function parseJsonArray(value) {
    if (Array.isArray(value))
        return value;
    if (typeof value === 'string' && value.trim()) {
        try {
            var parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch (_a) {
            return [];
        }
    }
    return [];
}
function parseLikedBy(value) {
    return parseJsonArray(value).filter(function (x) { return typeof x === 'string'; });
}
function parseComments(value) {
    return parseJsonArray(value).filter(function (c) { return typeof c === 'object' && c !== null && 'text' in c; });
}
var digestCache = null;
function digestFromPage() {
    try {
        var el = document.getElementById('__REQUESTDIGEST');
        if (el && el.value)
            return el.value;
        var el2 = document.querySelector('input[name="__REQUESTDIGEST"]');
        if (el2 && el2.value)
            return el2.value;
    }
    catch (_a) {
        // ignore
    }
    return '';
}
function getRequestDigest(siteUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var pageDigest, attempts, _i, attempts_1, attempt, res, data, digest, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (digestCache && Date.now() - digestCache.ts < 20 * 60 * 1000)
                        return [2 /*return*/, digestCache.value];
                    pageDigest = digestFromPage();
                    if (pageDigest) {
                        digestCache = { value: pageDigest, ts: Date.now() };
                        return [2 /*return*/, pageDigest];
                    }
                    attempts = [
                        { accept: 'application/json;odata=nometadata', body: '{}' },
                        { accept: 'application/json;odata=verbose', body: '{}' },
                        { accept: 'application/json;odata=nometadata', body: '' }
                    ];
                    _i = 0, attempts_1 = attempts;
                    _a.label = 1;
                case 1:
                    if (!(_i < attempts_1.length)) return [3 /*break*/, 7];
                    attempt = attempts_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/contextinfo"), {
                            method: 'POST',
                            headers: {
                                Accept: attempt.accept,
                                'Content-Type': attempt.accept
                            },
                            body: attempt.body
                        })];
                case 3:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error('[getRequestDigest] contextinfo HTTP', res.status, 'accept=', attempt.accept);
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, res.json()];
                case 4:
                    data = _a.sent();
                    digest = '';
                    if (data && data.GetContextWebInformation) {
                        digest = data.GetContextWebInformation.FormDigestValue || '';
                    }
                    else if (data && data.d && data.d.GetContextWebInformation) {
                        digest = data.d.GetContextWebInformation.FormDigestValue || '';
                    }
                    if (digest) {
                        digestCache = { value: digest, ts: Date.now() };
                        return [2 /*return*/, digest];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.error('[getRequestDigest] Erreur contextinfo (accept=', attempt.accept, ') :', err_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7:
                    console.error('[getRequestDigest] Aucun digest obtenu');
                    return [2 /*return*/, ''];
            }
        });
    });
}
function patchField(siteUrl, listName, itemId, fieldName, value) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var digest, body, res, err_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 1:
                    digest = _a.sent();
                    if (!digest) {
                        console.error('[patchField] Impossible d’obtenir le digest pour', listName, itemId, fieldName);
                        return [2 /*return*/, false];
                    }
                    body = {};
                    body[fieldName] = typeof value === 'string' ? value : JSON.stringify(value);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/items(").concat(itemId, ")"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'Content-Type': 'application/json;odata=nometadata',
                                'X-HTTP-Method': 'MERGE',
                                'IF-MATCH': '*',
                                'X-RequestDigest': digest
                            },
                            body: JSON.stringify(body)
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error('[patchField] Échec HTTP', res.status, listName, itemId, fieldName);
                    }
                    return [2 /*return*/, res.ok];
                case 3:
                    err_2 = _a.sent();
                    console.error('[patchField] Erreur', err_2);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map