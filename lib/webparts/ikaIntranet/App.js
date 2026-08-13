import * as React from 'react';
import { Header } from './components/Header';
import { loadHeaderMenu } from './services/headerMenu';
import { loadFooter } from './services/footer';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Accueil } from './pages/Accueil';
import { Page404 } from './pages/page-404';
import { DetailEvenement } from './pages/evenements/detail-evenement';
import { TousEvenements } from './pages/evenements/tous-evenements';
import { DetailActualite } from './pages/actualites/detail-actualite';
import { ToutesActualites } from './pages/actualites/toutes-les-actualites';
import { DetailAgenda } from './pages/agenda/detail-agenda';
import { ToutesAgenda } from './pages/agenda/toutes-agenda';
import { DetailMembre } from './pages/equipe/detail-membre';
import { TouteEquipe } from './pages/equipe/toute-equipe';
import { DetailProjet } from './pages/projets/detail-projet';
import { TousProjets } from './pages/projets/tous-projets';
import { DetailProduit } from './pages/produits/detail-produit';
import { TousProduits } from './pages/produits/tous-produits';
import { DetailAnnonce } from './pages/annonces/detail-annonce';
import { ToutesAnnonces } from './pages/annonces/toutes-annonces';
import { DetailEmployeMois } from './pages/employes-mois/detail-employe-mois';
import { TousEmployesMois } from './pages/employes-mois/tous-employes-mois';
import { DetailBilan } from './pages/bilans/detail-bilan';
import { TousBilans } from './pages/bilans/tous-bilans';
import { TouteDocumentation } from './pages/documentation/toute-documentation';
import { TouteGalerie } from './pages/galerie/toute-galerie';
import { ListeConge } from './pages/workflow/conges/ListeConge';
import { AjouterConge } from './pages/workflow/conges/AjouterConge';
import { DetailConge } from './pages/workflow/conges/DetailConge';
import { ListeVacances } from './pages/workflow/vacances/ListeVacances';
import { AjouterVacances } from './pages/workflow/vacances/AjouterVacances';
import { DetailVacances } from './pages/workflow/vacances/DetailVacances';
import { ListeAbsence } from './pages/workflow/absences/ListeAbsence';
import { AjouterAbsence } from './pages/workflow/absences/AjouterAbsence';
import { DetailAbsence } from './pages/workflow/absences/DetailAbsence';
import { ListeBesoin } from './pages/workflow/besoins/ListeBesoin';
import { AjouterBesoin } from './pages/workflow/besoins/AjouterBesoin';
import { DetailBesoin } from './pages/workflow/besoins/DetailBesoin';
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
export var App = function (_a) {
    var siteUrl = _a.siteUrl;
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
        loadHeaderMenu(siteUrl)
            .then(setMenuItems)
            .catch(function (err) { return console.error('[App] Menu :', err); });
        loadFooter(siteUrl)
            .then(setFooterColumns)
            .catch(function (err) { return console.error('[App] Footer :', err); });
    }, [siteUrl]);
    return (React.createElement("div", { ref: rootRef, className: "min-h-screen flex flex-col bg-slate-100 text-ikaInk antialiased" },
        React.createElement(Header, { menuItems: menuItems }),
        React.createElement(ScrollToTop, { hash: hash, rootRef: rootRef }),
        page === 'accueil' && React.createElement(Accueil, null),
        page === 'detail-evenement' && React.createElement(DetailEvenement, null),
        page === 'tous-evenements' && React.createElement(TousEvenements, null),
        page === 'detail-actualite' && React.createElement(DetailActualite, null),
        page === 'toutes-actualites' && React.createElement(ToutesActualites, null),
        page === 'detail-agenda' && React.createElement(DetailAgenda, null),
        page === 'toutes-agenda' && React.createElement(ToutesAgenda, null),
        page === 'detail-membre' && React.createElement(DetailMembre, null),
        page === 'toute-equipe' && React.createElement(TouteEquipe, null),
        page === 'detail-projet' && React.createElement(DetailProjet, null),
        page === 'tous-projets' && React.createElement(TousProjets, null),
        page === 'detail-produit' && React.createElement(DetailProduit, null),
        page === 'tous-produits' && React.createElement(TousProduits, null),
        page === 'detail-annonce' && React.createElement(DetailAnnonce, null),
        page === 'toutes-annonces' && React.createElement(ToutesAnnonces, null),
        page === 'detail-employe-mois' && React.createElement(DetailEmployeMois, null),
        page === 'tous-employes-mois' && React.createElement(TousEmployesMois, null),
        page === 'detail-bilan' && React.createElement(DetailBilan, null),
        page === 'tous-bilans' && React.createElement(TousBilans, null),
        page === 'toute-documentation' && React.createElement(TouteDocumentation, null),
        page === 'toute-galerie' && React.createElement(TouteGalerie, null),
        page === 'workflow-liste-conge' && React.createElement(ListeConge, null),
        page === 'workflow-ajouter-conge' && React.createElement(AjouterConge, { mode: "ajouter" }),
        page === 'workflow-modifier-conge' && React.createElement(AjouterConge, { mode: "modifier", id: getIdFromHash() }),
        page === 'workflow-detail-conge' && React.createElement(DetailConge, null),
        page === 'workflow-liste-vacances' && React.createElement(ListeVacances, null),
        page === 'workflow-ajouter-vacances' && React.createElement(AjouterVacances, { mode: "ajouter" }),
        page === 'workflow-modifier-vacances' && React.createElement(AjouterVacances, { mode: "modifier", id: getIdFromHash() }),
        page === 'workflow-detail-vacances' && React.createElement(DetailVacances, null),
        page === 'workflow-liste-absence' && React.createElement(ListeAbsence, null),
        page === 'workflow-ajouter-absence' && React.createElement(AjouterAbsence, { mode: "ajouter" }),
        page === 'workflow-modifier-absence' && React.createElement(AjouterAbsence, { mode: "modifier", id: getIdFromHash() }),
        page === 'workflow-detail-absence' && React.createElement(DetailAbsence, null),
        page === 'workflow-liste-besoin' && React.createElement(ListeBesoin, null),
        page === 'workflow-ajouter-besoin' && React.createElement(AjouterBesoin, { mode: "ajouter" }),
        page === 'workflow-modifier-besoin' && React.createElement(AjouterBesoin, { mode: "modifier", id: getIdFromHash() }),
        page === 'workflow-detail-besoin' && React.createElement(DetailBesoin, null),
        page !== 'accueil' && page !== 'detail-evenement' && page !== 'tous-evenements' && page !== 'detail-actualite' && page !== 'toutes-actualites' && page !== 'detail-agenda' && page !== 'toutes-agenda' && page !== 'detail-membre' && page !== 'toute-equipe' && page !== 'detail-projet' && page !== 'tous-projets' && page !== 'detail-produit' && page !== 'tous-produits' && page !== 'detail-annonce' && page !== 'toutes-annonces' && page !== 'detail-employe-mois' && page !== 'tous-employes-mois' && page !== 'detail-bilan' && page !== 'tous-bilans' && page !== 'toute-documentation' && page !== 'toute-galerie' && page !== 'workflow-liste-conge' && page !== 'workflow-ajouter-conge' && page !== 'workflow-modifier-conge' && page !== 'workflow-detail-conge' && page !== 'workflow-liste-vacances' && page !== 'workflow-ajouter-vacances' && page !== 'workflow-modifier-vacances' && page !== 'workflow-detail-vacances' && page !== 'workflow-liste-absence' && page !== 'workflow-ajouter-absence' && page !== 'workflow-modifier-absence' && page !== 'workflow-detail-absence' && page !== 'workflow-liste-besoin' && page !== 'workflow-ajouter-besoin' && page !== 'workflow-modifier-besoin' && page !== 'workflow-detail-besoin' && React.createElement(Page404, null),
        React.createElement(Footer, { columns: footerColumns })));
};
export default App;
//# sourceMappingURL=App.js.map