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
        page === 'accueil' && React.createElement(Accueil, { siteUrl: siteUrl }),
        page === 'detail-evenement' && React.createElement(DetailEvenement, { siteUrl: siteUrl }),
        page === 'tous-evenements' && React.createElement(TousEvenements, { siteUrl: siteUrl }),
        page === 'detail-actualite' && React.createElement(DetailActualite, { siteUrl: siteUrl }),
        page === 'toutes-actualites' && React.createElement(ToutesActualites, { siteUrl: siteUrl }),
        page === 'detail-agenda' && React.createElement(DetailAgenda, { siteUrl: siteUrl }),
        page === 'toutes-agenda' && React.createElement(ToutesAgenda, { siteUrl: siteUrl }),
        page === 'detail-membre' && React.createElement(DetailMembre, { siteUrl: siteUrl }),
        page === 'toute-equipe' && React.createElement(TouteEquipe, { siteUrl: siteUrl }),
        page === 'detail-projet' && React.createElement(DetailProjet, { siteUrl: siteUrl }),
        page === 'tous-projets' && React.createElement(TousProjets, { siteUrl: siteUrl }),
        page === 'detail-produit' && React.createElement(DetailProduit, { siteUrl: siteUrl }),
        page === 'tous-produits' && React.createElement(TousProduits, { siteUrl: siteUrl }),
        page === 'detail-annonce' && React.createElement(DetailAnnonce, { siteUrl: siteUrl }),
        page === 'toutes-annonces' && React.createElement(ToutesAnnonces, { siteUrl: siteUrl }),
        page === 'detail-employe-mois' && React.createElement(DetailEmployeMois, { siteUrl: siteUrl }),
        page === 'tous-employes-mois' && React.createElement(TousEmployesMois, { siteUrl: siteUrl }),
        page === 'tous-bilans' && React.createElement(TousBilans, { siteUrl: siteUrl }),
        page === 'toute-documentation' && React.createElement(TouteDocumentation, null),
        page === 'toute-galerie' && React.createElement(TouteGalerie, { siteUrl: siteUrl }),
        page === 'workflow-liste-conge' && React.createElement(ListeConge, { siteUrl: siteUrl }),
        page === 'workflow-ajouter-conge' && React.createElement(AjouterConge, { mode: "ajouter", siteUrl: siteUrl }),
        page === 'workflow-modifier-conge' && React.createElement(AjouterConge, { mode: "modifier", id: getIdFromHash(), siteUrl: siteUrl }),
        page === 'workflow-detail-conge' && React.createElement(DetailConge, { siteUrl: siteUrl }),
        page === 'workflow-liste-vacances' && React.createElement(ListeVacances, { siteUrl: siteUrl }),
        page === 'workflow-ajouter-vacances' && React.createElement(AjouterVacances, { mode: "ajouter", siteUrl: siteUrl }),
        page === 'workflow-modifier-vacances' && React.createElement(AjouterVacances, { mode: "modifier", id: getIdFromHash(), siteUrl: siteUrl }),
        page === 'workflow-detail-vacances' && React.createElement(DetailVacances, { siteUrl: siteUrl }),
        page === 'workflow-liste-absence' && React.createElement(ListeAbsence, { siteUrl: siteUrl }),
        page === 'workflow-ajouter-absence' && React.createElement(AjouterAbsence, { mode: "ajouter", siteUrl: siteUrl }),
        page === 'workflow-modifier-absence' && React.createElement(AjouterAbsence, { mode: "modifier", id: getIdFromHash(), siteUrl: siteUrl }),
        page === 'workflow-detail-absence' && React.createElement(DetailAbsence, { siteUrl: siteUrl }),
        page === 'workflow-liste-besoin' && React.createElement(ListeBesoin, { siteUrl: siteUrl }),
        page === 'workflow-ajouter-besoin' && React.createElement(AjouterBesoin, { mode: "ajouter", siteUrl: siteUrl }),
        page === 'workflow-modifier-besoin' && React.createElement(AjouterBesoin, { mode: "modifier", id: getIdFromHash(), siteUrl: siteUrl }),
        page === 'workflow-detail-besoin' && React.createElement(DetailBesoin, { siteUrl: siteUrl }),
        page !== 'accueil' && page !== 'detail-evenement' && page !== 'tous-evenements' && page !== 'detail-actualite' && page !== 'toutes-actualites' && page !== 'detail-agenda' && page !== 'toutes-agenda' && page !== 'detail-membre' && page !== 'toute-equipe' && page !== 'detail-projet' && page !== 'tous-projets' && page !== 'detail-produit' && page !== 'tous-produits' && page !== 'detail-annonce' && page !== 'toutes-annonces' && page !== 'detail-employe-mois' && page !== 'tous-employes-mois' && page !== 'tous-bilans' && page !== 'toute-documentation' && page !== 'toute-galerie' && page !== 'workflow-liste-conge' && page !== 'workflow-ajouter-conge' && page !== 'workflow-modifier-conge' && page !== 'workflow-detail-conge' && page !== 'workflow-liste-vacances' && page !== 'workflow-ajouter-vacances' && page !== 'workflow-modifier-vacances' && page !== 'workflow-detail-vacances' && page !== 'workflow-liste-absence' && page !== 'workflow-ajouter-absence' && page !== 'workflow-modifier-absence' && page !== 'workflow-detail-absence' && page !== 'workflow-liste-besoin' && page !== 'workflow-ajouter-besoin' && page !== 'workflow-modifier-besoin' && page !== 'workflow-detail-besoin' && React.createElement(Page404, null),
        React.createElement(Footer, { columns: footerColumns })));
};
export default App;
//# sourceMappingURL=App.js.map