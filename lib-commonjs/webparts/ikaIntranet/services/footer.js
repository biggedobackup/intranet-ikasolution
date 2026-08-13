"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFooter = loadFooter;
var tslib_1 = require("tslib");
var LIST_NAME = 'FooterMenu';
function isActive(value) {
    return value === true || value === 1;
}
function asString(value) {
    return value === null || value === undefined ? '' : String(value).trim();
}
function loadFooter(siteUrl) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, items, grouped_1, columns_1, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(LIST_NAME, "')/items?$select=Title,LienUrl,Categorie,EstActif&$top=200"), { headers: { Accept: 'application/json;odata=nometadata' } })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 2:
                    items = ((_a.sent()).value || []);
                    grouped_1 = new Map();
                    items
                        .filter(function (item) { return isActive(item.EstActif); })
                        .forEach(function (item) {
                        var title = asString(item.Title);
                        if (!title)
                            return;
                        var category = asString(item.Categorie) || 'Autres';
                        var link = { Title: title, URL: asString(item.LienUrl) || '#' };
                        var links = grouped_1.get(category) || [];
                        links.push(link);
                        grouped_1.set(category, links);
                    });
                    columns_1 = [];
                    grouped_1.forEach(function (links, category) { return columns_1.push({ Category: category, links: links }); });
                    return [2 /*return*/, columns_1];
                case 3:
                    err_1 = _a.sent();
                    console.error('[footer] Erreur de chargement du footer :', err_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=footer.js.map