"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var Header_1 = require("./components/Header");
var headerMenu_1 = require("./services/headerMenu");
var footer_1 = require("./services/footer");
var Footer_1 = require("./components/Footer");
var ScrollToTop_1 = require("./components/ScrollToTop");
var Accueil_1 = require("./pages/Accueil");
var page_404_1 = require("./pages/page-404");
var detail_evenement_1 = require("./pages/evenements/detail-evenement");
var tous_evenements_1 = require("./pages/evenements/tous-evenements");
var detail_actualite_1 = require("./pages/actualites/detail-actualite");
var toutes_les_actualites_1 = require("./pages/actualites/toutes-les-actualites");
var detail_agenda_1 = require("./pages/agenda/detail-agenda");
var toutes_agenda_1 = require("./pages/agenda/toutes-agenda");
var detail_membre_1 = require("./pages/equipe/detail-membre");
var toute_equipe_1 = require("./pages/equipe/toute-equipe");
var detail_projet_1 = require("./pages/projets/detail-projet");
var tous_projets_1 = require("./pages/projets/tous-projets");
var detail_produit_1 = require("./pages/produits/detail-produit");
var tous_produits_1 = require("./pages/produits/tous-produits");
var detail_annonce_1 = require("./pages/annonces/detail-annonce");
var toutes_annonces_1 = require("./pages/annonces/toutes-annonces");
var detail_employe_mois_1 = require("./pages/employes-mois/detail-employe-mois");
var tous_employes_mois_1 = require("./pages/employes-mois/tous-employes-mois");
var tous_bilans_1 = require("./pages/bilans/tous-bilans");
var toute_documentation_1 = require("./pages/documentation/toute-documentation");
var toute_galerie_1 = require("./pages/galerie/toute-galerie");
var ListeConge_1 = require("./pages/workflow/conges/ListeConge");
var AjouterConge_1 = require("./pages/workflow/conges/AjouterConge");
var DetailConge_1 = require("./pages/workflow/conges/DetailConge");
var ListeVacances_1 = require("./pages/workflow/vacances/ListeVacances");
var AjouterVacances_1 = require("./pages/workflow/vacances/AjouterVacances");
var DetailVacances_1 = require("./pages/workflow/vacances/DetailVacances");
var ListeAbsence_1 = require("./pages/workflow/absences/ListeAbsence");
var AjouterAbsence_1 = require("./pages/workflow/absences/AjouterAbsence");
var DetailAbsence_1 = require("./pages/workflow/absences/DetailAbsence");
var ListeBesoin_1 = require("./pages/workflow/besoins/ListeBesoin");
var AjouterBesoin_1 = require("./pages/workflow/besoins/AjouterBesoin");
var DetailBesoin_1 = require("./pages/workflow/besoins/DetailBesoin");
var normalizePage = function (name) {
    if (/^(liste|ajouter|modifier|detail)-(conge|vacances|absence|besoin)$/.test(name)) {
        return "workflow-".concat(name);
    }
    return name;
};
var getPageFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    if (hash.startsWith('page-')) {
        return normalizePage(hash.replace('page-', '').split('&')[0]);
    }
    return 'accueil';
};
var getIdFromHash = function () {
    var hash = window.location.hash.replace('#', '');
    var params = hash.split('&');
    var idParam = params.find(function (p) { return p.startsWith('id='); });
    return idParam ? Number(idParam.split('=')[1]) : 1;
};
var App = function (_a) {
    var siteUrl = _a.siteUrl, msGraphClientFactory = _a.msGraphClientFactory;
    var _b = React.useState(getPageFromHash), page = _b[0], setPage = _b[1];
    var _c = React.useState(window.location.hash), hash = _c[0], setHash = _c[1];
    var _d = React.useState([]), menuItems = _d[0], setMenuItems = _d[1];
    var _e = React.useState([]), footerColumns = _e[0], setFooterColumns = _e[1];
    var rootRef = React.useRef(null);
    React.useEffect(function () {
        var onHashChange = function () {
            setPage(getPageFromHash());
            setHash(window.location.hash);
        };
        window.addEventListener('hashchange', onHashChange);
        return function () { return window.removeEventListener('hashchange', onHashChange); };
    }, []);
    React.useEffect(function () {
        if (!siteUrl)
            return;
        (0, headerMenu_1.loadHeaderMenu)(siteUrl)
            .then(setMenuItems)
            .catch(function (err) { return console.error('[App] Menu :', err); });
        (0, footer_1.loadFooter)(siteUrl)
            .then(setFooterColumns)
            .catch(function (err) { return console.error('[App] Footer :', err); });
    }, [siteUrl]);
    return (React.createElement("div", { ref: rootRef, className: "min-h-screen flex flex-col bg-slate-100 text-ikaInk antialiased" },
        React.createElement(Header_1.Header, { menuItems: menuItems }),
        React.createElement(ScrollToTop_1.ScrollToTop, { hash: hash, rootRef: rootRef }),
        page === 'accueil' && React.createElement(Accueil_1.Accueil, { siteUrl: siteUrl }),
        page === 'detail-evenement' && React.createElement(detail_evenement_1.DetailEvenement, { siteUrl: siteUrl }),
        page === 'tous-evenements' && React.createElement(tous_evenements_1.TousEvenements, { siteUrl: siteUrl }),
        page === 'detail-actualite' && React.createElement(detail_actualite_1.DetailActualite, { siteUrl: siteUrl }),
        page === 'toutes-actualites' && React.createElement(toutes_les_actualites_1.ToutesActualites, { siteUrl: siteUrl }),
        page === 'detail-agenda' && React.createElement(detail_agenda_1.DetailAgenda, { siteUrl: siteUrl }),
        page === 'toutes-agenda' && React.createElement(toutes_agenda_1.ToutesAgenda, { siteUrl: siteUrl }),
        page === 'detail-membre' && React.createElement(detail_membre_1.DetailMembre, { siteUrl: siteUrl }),
        page === 'toute-equipe' && React.createElement(toute_equipe_1.TouteEquipe, { siteUrl: siteUrl, msGraphClientFactory: msGraphClientFactory }),
        page === 'detail-projet' && React.createElement(detail_projet_1.DetailProjet, { siteUrl: siteUrl }),
        page === 'tous-projets' && React.createElement(tous_projets_1.TousProjets, { siteUrl: siteUrl }),
        page === 'detail-produit' && React.createElement(detail_produit_1.DetailProduit, { siteUrl: siteUrl }),
        page === 'tous-produits' && React.createElement(tous_produits_1.TousProduits, { siteUrl: siteUrl }),
        page === 'detail-annonce' && React.createElement(detail_annonce_1.DetailAnnonce, { siteUrl: siteUrl }),
        page === 'toutes-annonces' && React.createElement(toutes_annonces_1.ToutesAnnonces, { siteUrl: siteUrl }),
        page === 'detail-employe-mois' && React.createElement(detail_employe_mois_1.DetailEmployeMois, { siteUrl: siteUrl }),
        page === 'tous-employes-mois' && React.createElement(tous_employes_mois_1.TousEmployesMois, { siteUrl: siteUrl }),
        page === 'tous-bilans' && React.createElement(tous_bilans_1.TousBilans, { siteUrl: siteUrl }),
        page === 'toute-documentation' && React.createElement(toute_documentation_1.TouteDocumentation, null),
        page === 'toute-galerie' && React.createElement(toute_galerie_1.TouteGalerie, { siteUrl: siteUrl }),
        page === 'workflow-liste-conge' && React.createElement(ListeConge_1.ListeConge, { siteUrl: siteUrl }),
        page === 'workflow-ajouter-conge' && React.createElement(AjouterConge_1.AjouterConge, { mode: "ajouter", siteUrl: siteUrl }),
        page === 'workflow-modifier-conge' && React.createElement(AjouterConge_1.AjouterConge, { mode: "modifier", id: getIdFromHash(), siteUrl: siteUrl }),
        page === 'workflow-detail-conge' && React.createElement(DetailConge_1.DetailConge, { siteUrl: siteUrl }),
        page === 'workflow-liste-vacances' && React.createElement(ListeVacances_1.ListeVacances, { siteUrl: siteUrl }),
        page === 'workflow-ajouter-vacances' && React.createElement(AjouterVacances_1.AjouterVacances, { mode: "ajouter", siteUrl: siteUrl }),
        page === 'workflow-modifier-vacances' && React.createElement(AjouterVacances_1.AjouterVacances, { mode: "modifier", id: getIdFromHash(), siteUrl: siteUrl }),
        page === 'workflow-detail-vacances' && React.createElement(DetailVacances_1.DetailVacances, { siteUrl: siteUrl }),
        page === 'workflow-liste-absence' && React.createElement(ListeAbsence_1.ListeAbsence, { siteUrl: siteUrl }),
        page === 'workflow-ajouter-absence' && React.createElement(AjouterAbsence_1.AjouterAbsence, { mode: "ajouter", siteUrl: siteUrl }),
        page === 'workflow-modifier-absence' && React.createElement(AjouterAbsence_1.AjouterAbsence, { mode: "modifier", id: getIdFromHash(), siteUrl: siteUrl }),
        page === 'workflow-detail-absence' && React.createElement(DetailAbsence_1.DetailAbsence, { siteUrl: siteUrl }),
        page === 'workflow-liste-besoin' && React.createElement(ListeBesoin_1.ListeBesoin, { siteUrl: siteUrl }),
        page === 'workflow-ajouter-besoin' && React.createElement(AjouterBesoin_1.AjouterBesoin, { mode: "ajouter", siteUrl: siteUrl }),
        page === 'workflow-modifier-besoin' && React.createElement(AjouterBesoin_1.AjouterBesoin, { mode: "modifier", id: getIdFromHash(), siteUrl: siteUrl }),
        page === 'workflow-detail-besoin' && React.createElement(DetailBesoin_1.DetailBesoin, { siteUrl: siteUrl }),
        page !== 'accueil' && page !== 'detail-evenement' && page !== 'tous-evenements' && page !== 'detail-actualite' && page !== 'toutes-actualites' && page !== 'detail-agenda' && page !== 'toutes-agenda' && page !== 'detail-membre' && page !== 'toute-equipe' && page !== 'detail-projet' && page !== 'tous-projets' && page !== 'detail-produit' && page !== 'tous-produits' && page !== 'detail-annonce' && page !== 'toutes-annonces' && page !== 'detail-employe-mois' && page !== 'tous-employes-mois' && page !== 'tous-bilans' && page !== 'toute-documentation' && page !== 'toute-galerie' && page !== 'workflow-liste-conge' && page !== 'workflow-ajouter-conge' && page !== 'workflow-modifier-conge' && page !== 'workflow-detail-conge' && page !== 'workflow-liste-vacances' && page !== 'workflow-ajouter-vacances' && page !== 'workflow-modifier-vacances' && page !== 'workflow-detail-vacances' && page !== 'workflow-liste-absence' && page !== 'workflow-ajouter-absence' && page !== 'workflow-modifier-absence' && page !== 'workflow-detail-absence' && page !== 'workflow-liste-besoin' && page !== 'workflow-ajouter-besoin' && page !== 'workflow-modifier-besoin' && page !== 'workflow-detail-besoin' && React.createElement(page_404_1.Page404, null),
        React.createElement(Footer_1.Footer, { columns: footerColumns })));
};
exports.App = App;
exports.default = exports.App;
//# sourceMappingURL=App.js.map