"use strict";
self["webpackHotUpdate_75e4b5d4_d962_489b_a3d6_4d96675cb3b4_0_0_1"]("ika-intranet-web-part",{

/***/ 1397
/*!*********************************************************!*\
  !*** ./lib/webparts/ikaIntranet/services/headerMenu.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadHeaderMenu: () => (/* binding */ loadHeaderMenu)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);

var LIST_NAME = 'HeaderMenu';
var PARENT_FIELD_CANDIDATES = ['MenuParent', 'Menu_x0020_parent', 'MenuPrincipale', 'Menu_x0020_principale', 'Menu'];
function isActive(value) {
    return value === true || value === 1;
}
function asString(value) {
    return value === null || value === undefined ? '' : String(value).trim();
}
function asNumber(value) {
    var n = Number(value !== null && value !== void 0 ? value : 0);
    return Number.isNaN(n) ? 0 : n;
}
function normalizeMenuUrl(value) {
    var url = value === '#' ? '#' : value;
    if (url === '#top')
        return '#page-accueil';
    if (/^#page-(liste|ajouter|modifier|detail)-(conge|vacances|absence|besoin)$/.test(url)) {
        return url.replace(/^#page-/, '#page-workflow-');
    }
    return url;
}
function readParentValue(item, field) {
    var fields = [];
    if (field)
        fields.push(field);
    fields.push.apply(fields, PARENT_FIELD_CANDIDATES.filter(function (c) { return fields.indexOf(c) === -1; }));
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var f = fields_1[_i];
        var value = item[f];
        if (value && typeof value === 'object') {
            var obj = value;
            var id = asNumber(obj.Id);
            var title = asString(obj.Title);
            if (id > 0 || title)
                return { id: id > 0 ? id : undefined, title: title || undefined };
        }
        else if (typeof value === 'string' && asString(value)) {
            return { title: asString(value) };
        }
        var idValue = asNumber(item["".concat(f, "Id")]);
        if (idValue > 0)
            return { id: idValue };
    }
    return null;
}
function findParentField(siteUrl) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var res, fields, lookups, match, _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/fields?$select=Title,InternalName,TypeAsString,ReadOnlyField&$top=500"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, res.json()];
                case 2:
                    fields = (_b.sent()).value;
                    if (!fields)
                        return [2 /*return*/, null];
                    lookups = fields.filter(function (f) { return asString(f.TypeAsString).toLowerCase() === 'lookup' && !f.ReadOnlyField; });
                    match = lookups.find(function (f) { return asString(f.Title).toLowerCase() === 'menu parent'; }) ||
                        lookups.find(function (f) { return asString(f.Title).toLowerCase() === 'menu principale'; }) ||
                        lookups.find(function (f) { return asString(f.Title).toLowerCase().indexOf('parent') !== -1; }) ||
                        lookups.find(function (f) { return asString(f.Title).toLowerCase().indexOf('principale') !== -1; }) ||
                        lookups.find(function (f) { return asString(f.InternalName).toLowerCase().indexOf('menu') !== -1; });
                    return [2 /*return*/, match ? asString(match.InternalName) || null : null];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function loadHeaderMenu(siteUrl) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var base, resolvedField, expandCandidates_2, rawItems, usedField_1, _loop_1, _i, expandCandidates_1, field, state_1, res, res2, mapped, nodes_1, byId_1, byTitle_1, roots_1, order_1, sortByPosition_1, err_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    base = "".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/items");
                    return [4 /*yield*/, findParentField(siteUrl)];
                case 1:
                    resolvedField = _a.sent();
                    expandCandidates_2 = [];
                    if (resolvedField)
                        expandCandidates_2.push(resolvedField);
                    expandCandidates_2.push.apply(expandCandidates_2, PARENT_FIELD_CANDIDATES.filter(function (c) { return expandCandidates_2.indexOf(c) === -1; }));
                    rawItems = [];
                    _loop_1 = function (field) {
                        var url, res, json, arr;
                        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    url = resolvedField
                                        ? "".concat(base, "?$select=Id,Title,LienUrl,Position,EstActif,").concat(field, "/Title,").concat(field, "Id&$expand=").concat(field, "&$top=500")
                                        : "".concat(base, "?$select=*&$expand=").concat(field, "&$top=500");
                                    return [4 /*yield*/, fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } })];
                                case 1:
                                    res = _b.sent();
                                    if (!res.ok)
                                        return [2 /*return*/, "continue"];
                                    return [4 /*yield*/, res.json()];
                                case 2:
                                    json = (_b.sent());
                                    arr = json.value || [];
                                    if (arr.some(function (it) { return readParentValue(it, field) !== null; })) {
                                        rawItems = arr;
                                        usedField_1 = field;
                                        return [2 /*return*/, "break"];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, expandCandidates_1 = expandCandidates_2;
                    _a.label = 2;
                case 2:
                    if (!(_i < expandCandidates_1.length)) return [3 /*break*/, 5];
                    field = expandCandidates_1[_i];
                    return [5 /*yield**/, _loop_1(field)];
                case 3:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 5];
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    if (!(rawItems.length === 0)) return [3 /*break*/, 11];
                    return [4 /*yield*/, fetch("".concat(base, "?$select=*&$top=500"), {
                            headers: { Accept: 'application/json;odata=nometadata' }
                        })];
                case 6:
                    res = _a.sent();
                    if (!res.ok) return [3 /*break*/, 8];
                    return [4 /*yield*/, res.json()];
                case 7:
                    rawItems = (_a.sent()).value || [];
                    return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, fetch("".concat(base, "?$select=Title,LienUrl,Position,EstActif&$top=500"), {
                        headers: { Accept: 'application/json;odata=nometadata' }
                    })];
                case 9:
                    res2 = _a.sent();
                    if (!res2.ok)
                        throw new Error("HTTP ".concat(res2.status));
                    return [4 /*yield*/, res2.json()];
                case 10:
                    rawItems = (_a.sent()).value || [];
                    _a.label = 11;
                case 11:
                    mapped = rawItems
                        .filter(function (it) { return isActive(it.EstActif); })
                        .map(function (it) {
                        var ref = readParentValue(it, usedField_1);
                        return {
                            id: asNumber(it.Id),
                            title: asString(it.Title),
                            menuUrl: normalizeMenuUrl(asString(it.LienUrl) || '#'),
                            position: asNumber(it.Position),
                            parentId: ref && ref.id ? ref.id : undefined,
                            parentTitle: ref && ref.title ? ref.title : undefined
                        };
                    })
                        .filter(function (m) { return m.title !== ''; })
                        .sort(function (a, b) { return a.position - b.position; });
                    nodes_1 = mapped.map(function (m) { return ({ Title: m.title, MenuUrl: m.menuUrl }); });
                    byId_1 = new Map();
                    byTitle_1 = new Map();
                    mapped.forEach(function (m, i) {
                        if (m.id > 0)
                            byId_1.set(m.id, nodes_1[i]);
                        byTitle_1.set(m.title.toLowerCase(), nodes_1[i]);
                    });
                    roots_1 = [];
                    mapped.forEach(function (m, i) {
                        var node = nodes_1[i];
                        var parent = m.parentId !== undefined ? byId_1.get(m.parentId) : undefined;
                        if (!parent && m.parentTitle) {
                            parent = byTitle_1.get(m.parentTitle.toLowerCase());
                        }
                        if (parent) {
                            if (!parent.children)
                                parent.children = [];
                            parent.children.push(node);
                        }
                        else {
                            roots_1.push(node);
                        }
                    });
                    order_1 = new Map();
                    mapped.forEach(function (m) { return order_1.set(m.title.toLowerCase(), m.position); });
                    sortByPosition_1 = function (list) {
                        return list.sort(function (a, b) { var _a, _b; return ((_a = order_1.get(a.Title.toLowerCase())) !== null && _a !== void 0 ? _a : 0) - ((_b = order_1.get(b.Title.toLowerCase())) !== null && _b !== void 0 ? _b : 0); });
                    };
                    roots_1.forEach(function (root) {
                        if (root.children)
                            root.children = sortByPosition_1(root.children);
                    });
                    return [2 /*return*/, sortByPosition_1(roots_1)];
                case 12:
                    err_1 = _a.sent();
                    console.error('[headerMenu] Erreur de chargement du menu :', err_1);
                    return [2 /*return*/, []];
                case 13: return [2 /*return*/];
            }
        });
    });
}


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3e0d2eaa7e7b7ec4da23")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=ika-intranet-web-part.f8d15455493914832801.hot-update.js.map