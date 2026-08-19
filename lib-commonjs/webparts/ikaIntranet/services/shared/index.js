"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlank = isBlank;
exports.isValidEmail = isValidEmail;
exports.escapeHtml = escapeHtml;
exports.getAppPageUrl = getAppPageUrl;
exports.sendEmail = sendEmail;
exports.computeJoursInclusive = computeJoursInclusive;
exports.getCurrentUserEmail = getCurrentUserEmail;
exports.getCurrentUserName = getCurrentUserName;
exports.getCurrentUser = getCurrentUser;
exports.ensureUser = ensureUser;
exports.searchUsers = searchUsers;
exports.getFieldMap = getFieldMap;
exports.getVal = getVal;
exports.getListEntityTypeFullName = getListEntityTypeFullName;
exports.createListItem = createListItem;
exports.updateListItemFields = updateListItemFields;
exports.deleteListItem = deleteListItem;
exports.getAttachments = getAttachments;
exports.addAttachment = addAttachment;
exports.deleteAttachment = deleteAttachment;
exports.parseLikedBy = parseLikedBy;
exports.parseComments = parseComments;
exports.getRequestDigest = getRequestDigest;
exports.patchField = patchField;
var tslib_1 = require("tslib");
function isBlank(value) {
    return !value || !value.replace(/^\s+|\s+$/g, '');
}
function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.replace(/^\s+|\s+$/g, ''));
}
function escapeHtml(value) {
    return (value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
function getAppPageUrl() {
    try {
        return window.location.href.split('#')[0];
    }
    catch (_a) {
        return '';
    }
}
function sendEmail(siteUrl, to, subject, body) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var recipients, digest, res, text, _a, err_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    recipients = (to || []).map(function (e) { return (e || '').replace(/^\s+|\s+$/g, ''); }).filter(Boolean);
                    if (!recipients.length)
                        return [2 /*return*/, false];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 2:
                    digest = _b.sent();
                    if (!digest)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/SP.Utilities.Utility.SendEmail"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=verbose',
                                'Content-Type': 'application/json;odata=verbose',
                                'X-RequestDigest': digest
                            },
                            body: JSON.stringify({
                                properties: {
                                    __metadata: { type: 'SP.Utilities.EmailProperties' },
                                    To: { results: recipients },
                                    Subject: subject,
                                    Body: body
                                }
                            })
                        })];
                case 3:
                    res = _b.sent();
                    if (!!res.ok) return [3 /*break*/, 8];
                    text = '';
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, res.text()];
                case 5:
                    text = _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _a = _b.sent();
                    text = '';
                    return [3 /*break*/, 7];
                case 7:
                    console.error('[sendEmail] Échec HTTP', res.status, recipients, text);
                    return [2 /*return*/, false];
                case 8: return [2 /*return*/, true];
                case 9:
                    err_1 = _b.sent();
                    console.error('[sendEmail] Erreur', err_1);
                    return [2 /*return*/, false];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function computeJoursInclusive(dateDebut, dateFin) {
    if (!dateDebut || !dateFin)
        return undefined;
    var start = new Date(dateDebut);
    var end = new Date(dateFin);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end.getTime() < start.getTime())
        return undefined;
    return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
}
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
function getCurrentUser(siteUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, data, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/currentuser?$select=Id,Title,Email,LoginName"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, undefined];
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    if (data.Id === undefined || data.Id === null)
                        return [2 /*return*/, undefined];
                    return [2 /*return*/, { id: Number(data.Id), title: data.Title || '', email: data.Email || '', loginName: data.LoginName || '' }];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function ensureUser(siteUrl, logonName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var trimmed, digest, res, data, err_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trimmed = (logonName || '').replace(/^\s+|\s+$/g, '');
                    if (!trimmed)
                        return [2 /*return*/, undefined];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 2:
                    digest = _a.sent();
                    if (!digest)
                        return [2 /*return*/, undefined];
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/ensureuser"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'Content-Type': 'application/json;odata=nometadata',
                                'X-RequestDigest': digest
                            },
                            body: JSON.stringify({ logonName: trimmed })
                        })];
                case 3:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error('[ensureUser] Échec HTTP', res.status, trimmed);
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, res.json()];
                case 4:
                    data = _a.sent();
                    if (data.Id === undefined || data.Id === null)
                        return [2 /*return*/, undefined];
                    return [2 /*return*/, { id: Number(data.Id), title: data.Title || trimmed, email: data.Email || trimmed, loginName: data.LoginName || '' }];
                case 5:
                    err_2 = _a.sent();
                    console.error('[ensureUser] Erreur', err_2);
                    return [2 /*return*/, undefined];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function searchUsers(siteUrl, query) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var trimmed, digest, queryParams, res, data, raw, entities, err_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trimmed = (query || '').replace(/^\s+|\s+$/g, '');
                    if (trimmed.length < 2)
                        return [2 /*return*/, []];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 2:
                    digest = _a.sent();
                    if (!digest)
                        return [2 /*return*/, []];
                    queryParams = {
                        AllowEmailAddresses: true,
                        AllowMultipleEntities: false,
                        MaximumEntitySuggestions: 15,
                        PrincipalSource: 15,
                        PrincipalType: 1,
                        QueryString: trimmed
                    };
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'Content-Type': 'application/json;odata=nometadata',
                                'X-RequestDigest': digest
                            },
                            body: JSON.stringify({ queryParams: queryParams })
                        })];
                case 3:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error('[searchUsers] Échec HTTP', res.status, trimmed);
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, res.json()];
                case 4:
                    data = _a.sent();
                    raw = data.value !== undefined ? data.value : data;
                    entities = [];
                    if (typeof raw === 'string') {
                        try {
                            entities = JSON.parse(raw);
                        }
                        catch (_b) {
                            entities = [];
                        }
                    }
                    else if (Array.isArray(raw)) {
                        entities = raw;
                    }
                    return [2 /*return*/, entities
                            .map(function (entry) {
                            var _a;
                            var email = ((_a = entry.EntityData) === null || _a === void 0 ? void 0 : _a.Email) || (entry.Key && entry.Key.indexOf('@') !== -1 ? entry.Key : '');
                            return { displayName: entry.DisplayText || email || '', email: email || '', loginName: entry.Key || '' };
                        })
                            .filter(function (u) { return !!u.email; })];
                case 5:
                    err_3 = _a.sent();
                    console.error('[searchUsers] Erreur', err_3);
                    return [2 /*return*/, []];
                case 6: return [2 /*return*/];
            }
        });
    });
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
function getListEntityTypeFullName(siteUrl, listName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, data, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')?$select=ListItemEntityTypeFullName"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, ''];
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    return [2 /*return*/, data.ListItemEntityTypeFullName || ''];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createListItem(siteUrl, listName, fields) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var digest, body_1, res, text, _a, data, id, err_4;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 1:
                    digest = _b.sent();
                    if (!digest) {
                        console.error('[createListItem] Impossible d’obtenir le digest pour', listName);
                        return [2 /*return*/, undefined];
                    }
                    body_1 = {};
                    Object.keys(fields).forEach(function (k) { body_1[k] = fields[k]; });
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/items"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'Content-Type': 'application/json;odata=nometadata',
                                'X-RequestDigest': digest
                            },
                            body: JSON.stringify(body_1)
                        })];
                case 2:
                    res = _b.sent();
                    if (!!res.ok) return [3 /*break*/, 7];
                    text = '';
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, res.text()];
                case 4:
                    text = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    text = '';
                    return [3 /*break*/, 6];
                case 6:
                    console.error('[createListItem] Échec HTTP', res.status, listName, text);
                    return [2 /*return*/, undefined];
                case 7: return [4 /*yield*/, res.json()];
                case 8:
                    data = _b.sent();
                    id = data.Id !== undefined ? data.Id : data.ID;
                    return [2 /*return*/, id !== undefined ? Number(id) : undefined];
                case 9:
                    err_4 = _b.sent();
                    console.error('[createListItem] Erreur', err_4);
                    return [2 /*return*/, undefined];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function updateListItemFields(siteUrl, listName, itemId, fields) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var digest, res, text, _a, err_5;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 1:
                    digest = _b.sent();
                    if (!digest) {
                        console.error('[updateListItemFields] Impossible d’obtenir le digest pour', listName, itemId);
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/items(").concat(itemId, ")"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'Content-Type': 'application/json;odata=nometadata',
                                'X-HTTP-Method': 'MERGE',
                                'IF-MATCH': '*',
                                'X-RequestDigest': digest
                            },
                            body: JSON.stringify(fields)
                        })];
                case 2:
                    res = _b.sent();
                    if (!!res.ok) return [3 /*break*/, 7];
                    text = '';
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, res.text()];
                case 4:
                    text = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    text = '';
                    return [3 /*break*/, 6];
                case 6:
                    console.error('[updateListItemFields] Échec HTTP', res.status, listName, itemId, text);
                    _b.label = 7;
                case 7: return [2 /*return*/, res.ok];
                case 8:
                    err_5 = _b.sent();
                    console.error('[updateListItemFields] Erreur', err_5);
                    return [2 /*return*/, false];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function deleteListItem(siteUrl, listName, itemId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var digest, res, text, _a, err_6;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 1:
                    digest = _b.sent();
                    if (!digest) {
                        console.error('[deleteListItem] Impossible d’obtenir le digest pour', listName, itemId);
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/items(").concat(itemId, ")"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'X-HTTP-Method': 'DELETE',
                                'IF-MATCH': '*',
                                'X-RequestDigest': digest
                            }
                        })];
                case 2:
                    res = _b.sent();
                    if (!!res.ok) return [3 /*break*/, 7];
                    text = '';
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, res.text()];
                case 4:
                    text = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    text = '';
                    return [3 /*break*/, 6];
                case 6:
                    console.error('[deleteListItem] Échec HTTP', res.status, listName, itemId, text);
                    _b.label = 7;
                case 7: return [2 /*return*/, res.ok];
                case 8:
                    err_6 = _b.sent();
                    console.error('[deleteListItem] Erreur', err_6);
                    return [2 /*return*/, false];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function getAttachments(siteUrl, listName, itemId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, files, origin_1, err_7;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/items(").concat(itemId, ")/AttachmentFiles?$select=FileName,ServerRelativeUrl"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, res.json()];
                case 2:
                    files = ((_a.sent()).value || []);
                    origin_1 = new URL(siteUrl).origin;
                    return [2 /*return*/, files
                            .filter(function (f) { return !!f.FileName && !!f.ServerRelativeUrl; })
                            .map(function (f) { return ({ fileName: String(f.FileName), url: "".concat(origin_1).concat(f.ServerRelativeUrl) }); })];
                case 3:
                    err_7 = _a.sent();
                    console.error('[getAttachments] Erreur', err_7);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addAttachment(siteUrl, listName, itemId, file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var digest, buffer, safeName, res, text, _a, err_8;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 1:
                    digest = _b.sent();
                    if (!digest) {
                        console.error('[addAttachment] Impossible d’obtenir le digest pour', listName, itemId);
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, file.arrayBuffer()];
                case 2:
                    buffer = _b.sent();
                    safeName = file.name.replace(/'/g, "''");
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/items(").concat(itemId, ")/AttachmentFiles/add(FileName='").concat(encodeURIComponent(safeName), "')"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'X-RequestDigest': digest
                            },
                            body: buffer
                        })];
                case 3:
                    res = _b.sent();
                    if (!!res.ok) return [3 /*break*/, 8];
                    text = '';
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, res.text()];
                case 5:
                    text = _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _a = _b.sent();
                    text = '';
                    return [3 /*break*/, 7];
                case 7:
                    console.error('[addAttachment] Échec HTTP', res.status, listName, itemId, file.name, text);
                    return [2 /*return*/, false];
                case 8: return [2 /*return*/, true];
                case 9:
                    err_8 = _b.sent();
                    console.error('[addAttachment] Erreur', err_8);
                    return [2 /*return*/, false];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function deleteAttachment(siteUrl, listName, itemId, fileName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var digest, safeName, res, err_9;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getRequestDigest(siteUrl)];
                case 1:
                    digest = _a.sent();
                    if (!digest) {
                        console.error('[deleteAttachment] Impossible d’obtenir le digest pour', listName, itemId, fileName);
                        return [2 /*return*/, false];
                    }
                    safeName = fileName.replace(/'/g, "''");
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(listName, "')/items(").concat(itemId, ")/AttachmentFiles/getByFileName('").concat(encodeURIComponent(safeName), "')"), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json;odata=nometadata',
                                'X-HTTP-Method': 'DELETE',
                                'IF-MATCH': '*',
                                'X-RequestDigest': digest
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        console.error('[deleteAttachment] Échec HTTP', res.status, listName, itemId, fileName);
                    }
                    return [2 /*return*/, res.ok];
                case 3:
                    err_9 = _a.sent();
                    console.error('[deleteAttachment] Erreur', err_9);
                    return [2 /*return*/, false];
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
        var pageDigest, attempts, _i, attempts_1, attempt, res, data, digest, err_10;
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
                    err_10 = _a.sent();
                    console.error('[getRequestDigest] Erreur contextinfo (accept=', attempt.accept, ') :', err_10);
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
        var digest, body, res, err_11;
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
                    err_11 = _a.sent();
                    console.error('[patchField] Erreur', err_11);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map