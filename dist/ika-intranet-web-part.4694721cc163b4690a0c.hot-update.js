"use strict";
self["webpackHotUpdate_75e4b5d4_d962_489b_a3d6_4d96675cb3b4_0_0_1"]("ika-intranet-web-part",{

/***/ 545
/*!*****************************************!*\
  !*** ./lib/webparts/ikaIntranet/App.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Header */ 4086);
/* harmony import */ var _services_headerMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/headerMenu */ 1397);
/* harmony import */ var _services_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/footer */ 659);
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Footer */ 8072);
/* harmony import */ var _components_ScrollToTop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ScrollToTop */ 1000);
/* harmony import */ var _pages_Accueil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/Accueil */ 5123);
/* harmony import */ var _pages_page_404__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/page-404 */ 5451);
/* harmony import */ var _pages_evenements_detail_evenement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/evenements/detail-evenement */ 2647);
/* harmony import */ var _pages_evenements_tous_evenements__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/evenements/tous-evenements */ 3006);
/* harmony import */ var _pages_actualites_detail_actualite__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/actualites/detail-actualite */ 3399);
/* harmony import */ var _pages_actualites_toutes_les_actualites__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/actualites/toutes-les-actualites */ 8342);
/* harmony import */ var _pages_agenda_detail_agenda__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/agenda/detail-agenda */ 8962);
/* harmony import */ var _pages_agenda_toutes_agenda__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/agenda/toutes-agenda */ 9901);
/* harmony import */ var _pages_equipe_detail_membre__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/equipe/detail-membre */ 4997);
/* harmony import */ var _pages_equipe_toute_equipe__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/equipe/toute-equipe */ 7544);
/* harmony import */ var _pages_projets_detail_projet__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/projets/detail-projet */ 9463);
/* harmony import */ var _pages_projets_tous_projets__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/projets/tous-projets */ 3086);
/* harmony import */ var _pages_produits_detail_produit__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pages/produits/detail-produit */ 6127);
/* harmony import */ var _pages_produits_tous_produits__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pages/produits/tous-produits */ 2758);
/* harmony import */ var _pages_annonces_detail_annonce__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pages/annonces/detail-annonce */ 2807);
/* harmony import */ var _pages_annonces_toutes_annonces__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pages/annonces/toutes-annonces */ 4565);
/* harmony import */ var _pages_employes_mois_detail_employe_mois__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pages/employes-mois/detail-employe-mois */ 3703);
/* harmony import */ var _pages_employes_mois_tous_employes_mois__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pages/employes-mois/tous-employes-mois */ 8042);
/* harmony import */ var _pages_bilans_detail_bilan__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./pages/bilans/detail-bilan */ 7339);
/* harmony import */ var _pages_bilans_tous_bilans__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./pages/bilans/tous-bilans */ 2882);
/* harmony import */ var _pages_documentation_toute_documentation__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pages/documentation/toute-documentation */ 3932);
/* harmony import */ var _pages_galerie_toute_galerie__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./pages/galerie/toute-galerie */ 3848);
/* harmony import */ var _pages_workflow_conges_ListeConge__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./pages/workflow/conges/ListeConge */ 8676);
/* harmony import */ var _pages_workflow_conges_AjouterConge__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./pages/workflow/conges/AjouterConge */ 3075);
/* harmony import */ var _pages_workflow_conges_DetailConge__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./pages/workflow/conges/DetailConge */ 2238);
/* harmony import */ var _pages_workflow_vacances_ListeVacances__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./pages/workflow/vacances/ListeVacances */ 8343);
/* harmony import */ var _pages_workflow_vacances_AjouterVacances__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./pages/workflow/vacances/AjouterVacances */ 1646);
/* harmony import */ var _pages_workflow_vacances_DetailVacances__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./pages/workflow/vacances/DetailVacances */ 5903);
/* harmony import */ var _pages_workflow_absences_ListeAbsence__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./pages/workflow/absences/ListeAbsence */ 3656);
/* harmony import */ var _pages_workflow_absences_AjouterAbsence__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./pages/workflow/absences/AjouterAbsence */ 171);
/* harmony import */ var _pages_workflow_absences_DetailAbsence__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./pages/workflow/absences/DetailAbsence */ 1776);
/* harmony import */ var _pages_workflow_besoins_ListeBesoin__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./pages/workflow/besoins/ListeBesoin */ 2814);
/* harmony import */ var _pages_workflow_besoins_AjouterBesoin__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./pages/workflow/besoins/AjouterBesoin */ 2131);
/* harmony import */ var _pages_workflow_besoins_DetailBesoin__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./pages/workflow/besoins/DetailBesoin */ 9348);








































var getPageFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    if (hash.startsWith('page-')) {
        return normalizePage(hash.replace('page-', '').split('&')[0]);
    }
    return 'accueil';
};
var normalizePage = function (name) {
    if (/^(liste|ajouter|modifier|detail)-(conge|vacances|absence|besoin)$/.test(name)) {
        return "workflow-".concat(name);
    }
    return name;
};
var getIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var App = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = react__WEBPACK_IMPORTED_MODULE_0__.useState(getPageFromHash), page = _b[0], setPage = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_0__.useState(window.location.hash), hash = _c[0], setHash = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_0__.useState([]), menuItems = _d[0], setMenuItems = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_0__.useState([]), footerColumns = _e[0], setFooterColumns = _e[1];
    var rootRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        var onHashChange = function () {
            setPage(getPageFromHash());
            setHash(window.location.hash);
        };
        window.addEventListener('hashchange', onHashChange);
        return function () { return window.removeEventListener('hashchange', onHashChange); };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        if (!siteUrl)
            return;
        (0,_services_headerMenu__WEBPACK_IMPORTED_MODULE_2__.loadHeaderMenu)(siteUrl)
            .then(setMenuItems)
            .catch(function (err) { return console.error('[App] Menu :', err); });
        (0,_services_footer__WEBPACK_IMPORTED_MODULE_3__.loadFooter)(siteUrl)
            .then(setFooterColumns)
            .catch(function (err) { return console.error('[App] Footer :', err); });
    }, [siteUrl]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { ref: rootRef, className: "min-h-screen flex flex-col bg-slate-100 text-ikaInk antialiased" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_1__.Header, { menuItems: menuItems }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ScrollToTop__WEBPACK_IMPORTED_MODULE_5__.ScrollToTop, { hash: hash, rootRef: rootRef }),
        page === 'accueil' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_Accueil__WEBPACK_IMPORTED_MODULE_6__.Accueil, null),
        page === 'detail-evenement' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_evenements_detail_evenement__WEBPACK_IMPORTED_MODULE_8__.DetailEvenement, null),
        page === 'tous-evenements' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_evenements_tous_evenements__WEBPACK_IMPORTED_MODULE_9__.TousEvenements, null),
        page === 'detail-actualite' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_actualites_detail_actualite__WEBPACK_IMPORTED_MODULE_10__.DetailActualite, null),
        page === 'toutes-actualites' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_actualites_toutes_les_actualites__WEBPACK_IMPORTED_MODULE_11__.ToutesActualites, null),
        page === 'detail-agenda' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_agenda_detail_agenda__WEBPACK_IMPORTED_MODULE_12__.DetailAgenda, null),
        page === 'toutes-agenda' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_agenda_toutes_agenda__WEBPACK_IMPORTED_MODULE_13__.ToutesAgenda, null),
        page === 'detail-membre' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_equipe_detail_membre__WEBPACK_IMPORTED_MODULE_14__.DetailMembre, null),
        page === 'toute-equipe' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_equipe_toute_equipe__WEBPACK_IMPORTED_MODULE_15__.TouteEquipe, null),
        page === 'detail-projet' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_projets_detail_projet__WEBPACK_IMPORTED_MODULE_16__.DetailProjet, null),
        page === 'tous-projets' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_projets_tous_projets__WEBPACK_IMPORTED_MODULE_17__.TousProjets, null),
        page === 'detail-produit' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_produits_detail_produit__WEBPACK_IMPORTED_MODULE_18__.DetailProduit, null),
        page === 'tous-produits' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_produits_tous_produits__WEBPACK_IMPORTED_MODULE_19__.TousProduits, null),
        page === 'detail-annonce' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_annonces_detail_annonce__WEBPACK_IMPORTED_MODULE_20__.DetailAnnonce, null),
        page === 'toutes-annonces' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_annonces_toutes_annonces__WEBPACK_IMPORTED_MODULE_21__.ToutesAnnonces, null),
        page === 'detail-employe-mois' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_employes_mois_detail_employe_mois__WEBPACK_IMPORTED_MODULE_22__.DetailEmployeMois, null),
        page === 'tous-employes-mois' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_employes_mois_tous_employes_mois__WEBPACK_IMPORTED_MODULE_23__.TousEmployesMois, null),
        page === 'detail-bilan' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_bilans_detail_bilan__WEBPACK_IMPORTED_MODULE_24__.DetailBilan, null),
        page === 'tous-bilans' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_bilans_tous_bilans__WEBPACK_IMPORTED_MODULE_25__.TousBilans, null),
        page === 'toute-documentation' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_documentation_toute_documentation__WEBPACK_IMPORTED_MODULE_26__.TouteDocumentation, null),
        page === 'toute-galerie' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_galerie_toute_galerie__WEBPACK_IMPORTED_MODULE_27__.TouteGalerie, null),
        page === 'workflow-liste-conge' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_conges_ListeConge__WEBPACK_IMPORTED_MODULE_28__.ListeConge, null),
        page === 'workflow-ajouter-conge' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_conges_AjouterConge__WEBPACK_IMPORTED_MODULE_29__.AjouterConge, { mode: "ajouter" }),
        page === 'workflow-modifier-conge' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_conges_AjouterConge__WEBPACK_IMPORTED_MODULE_29__.AjouterConge, { mode: "modifier", id: getIdFromHash() }),
        page === 'workflow-detail-conge' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_conges_DetailConge__WEBPACK_IMPORTED_MODULE_30__.DetailConge, null),
        page === 'workflow-liste-vacances' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_vacances_ListeVacances__WEBPACK_IMPORTED_MODULE_31__.ListeVacances, null),
        page === 'workflow-ajouter-vacances' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_vacances_AjouterVacances__WEBPACK_IMPORTED_MODULE_32__.AjouterVacances, { mode: "ajouter" }),
        page === 'workflow-modifier-vacances' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_vacances_AjouterVacances__WEBPACK_IMPORTED_MODULE_32__.AjouterVacances, { mode: "modifier", id: getIdFromHash() }),
        page === 'workflow-detail-vacances' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_vacances_DetailVacances__WEBPACK_IMPORTED_MODULE_33__.DetailVacances, null),
        page === 'workflow-liste-absence' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_absences_ListeAbsence__WEBPACK_IMPORTED_MODULE_34__.ListeAbsence, null),
        page === 'workflow-ajouter-absence' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_absences_AjouterAbsence__WEBPACK_IMPORTED_MODULE_35__.AjouterAbsence, { mode: "ajouter" }),
        page === 'workflow-modifier-absence' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_absences_AjouterAbsence__WEBPACK_IMPORTED_MODULE_35__.AjouterAbsence, { mode: "modifier", id: getIdFromHash() }),
        page === 'workflow-detail-absence' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_absences_DetailAbsence__WEBPACK_IMPORTED_MODULE_36__.DetailAbsence, null),
        page === 'workflow-liste-besoin' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_besoins_ListeBesoin__WEBPACK_IMPORTED_MODULE_37__.ListeBesoin, null),
        page === 'workflow-ajouter-besoin' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_besoins_AjouterBesoin__WEBPACK_IMPORTED_MODULE_38__.AjouterBesoin, { mode: "ajouter" }),
        page === 'workflow-modifier-besoin' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_besoins_AjouterBesoin__WEBPACK_IMPORTED_MODULE_38__.AjouterBesoin, { mode: "modifier", id: getIdFromHash() }),
        page === 'workflow-detail-besoin' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_workflow_besoins_DetailBesoin__WEBPACK_IMPORTED_MODULE_39__.DetailBesoin, null),
        page !== 'accueil' && page !== 'detail-evenement' && page !== 'tous-evenements' && page !== 'detail-actualite' && page !== 'toutes-actualites' && page !== 'detail-agenda' && page !== 'toutes-agenda' && page !== 'detail-membre' && page !== 'toute-equipe' && page !== 'detail-projet' && page !== 'tous-projets' && page !== 'detail-produit' && page !== 'tous-produits' && page !== 'detail-annonce' && page !== 'toutes-annonces' && page !== 'detail-employe-mois' && page !== 'tous-employes-mois' && page !== 'detail-bilan' && page !== 'tous-bilans' && page !== 'toute-documentation' && page !== 'toute-galerie' && page !== 'workflow-liste-conge' && page !== 'workflow-ajouter-conge' && page !== 'workflow-modifier-conge' && page !== 'workflow-detail-conge' && page !== 'workflow-liste-vacances' && page !== 'workflow-ajouter-vacances' && page !== 'workflow-modifier-vacances' && page !== 'workflow-detail-vacances' && page !== 'workflow-liste-absence' && page !== 'workflow-ajouter-absence' && page !== 'workflow-modifier-absence' && page !== 'workflow-detail-absence' && page !== 'workflow-liste-besoin' && page !== 'workflow-ajouter-besoin' && page !== 'workflow-modifier-besoin' && page !== 'workflow-detail-besoin' && react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_page_404__WEBPACK_IMPORTED_MODULE_7__.Page404, null),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Footer__WEBPACK_IMPORTED_MODULE_4__.Footer, null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);


/***/ },

/***/ 659
/*!*****************************************************!*\
  !*** ./lib/webparts/ikaIntranet/services/footer.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadFooter: () => (/* binding */ loadFooter)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);

var LIST_NAME = 'FooterMenu';
function isActive(value) {
    return value === true || value === 1;
}
function asString(value) {
    return value === null || value === undefined ? '' : String(value).trim();
}
function loadFooter(siteUrl) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var res, items, grouped_1, columns_1, err_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
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


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d8acfef12658c00e37f4")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=ika-intranet-web-part.4694721cc163b4690a0c.hot-update.js.map