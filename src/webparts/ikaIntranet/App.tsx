import * as React from 'react';
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import { loadHeaderMenu, IHeaderMenuItem } from './services/headerMenu';
import { loadFooter } from './services/footer';
import { IFooterColumn } from './components/Footer';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Accueil } from './pages/Accueil';

// Chargées à la demande (code-splitting) : seule la page réellement visitée
// est téléchargée, au lieu d'embarquer les 30 pages dans le bundle initial.
// Accueil reste en import statique ci-dessus car c'est la page vue par
// quasiment toutes les visites.
const Page404 = React.lazy(() => import(/* webpackChunkName: 'page-404' */ './pages/page-404'));
const DetailEvenement = React.lazy(() => import(/* webpackChunkName: 'detail-evenement' */ './pages/evenements/detail-evenement'));
const TousEvenements = React.lazy(() => import(/* webpackChunkName: 'tous-evenements' */ './pages/evenements/tous-evenements'));
const DetailActualite = React.lazy(() => import(/* webpackChunkName: 'detail-actualite' */ './pages/actualites/detail-actualite'));
const ToutesActualites = React.lazy(() => import(/* webpackChunkName: 'toutes-actualites' */ './pages/actualites/toutes-les-actualites'));
const DetailAgenda = React.lazy(() => import(/* webpackChunkName: 'detail-agenda' */ './pages/agenda/detail-agenda'));
const ToutesAgenda = React.lazy(() => import(/* webpackChunkName: 'toutes-agenda' */ './pages/agenda/toutes-agenda'));
const DetailMembre = React.lazy(() => import(/* webpackChunkName: 'detail-membre' */ './pages/equipe/detail-membre'));
const TouteEquipe = React.lazy(() => import(/* webpackChunkName: 'toute-equipe' */ './pages/equipe/toute-equipe'));
const DetailProjet = React.lazy(() => import(/* webpackChunkName: 'detail-projet' */ './pages/projets/detail-projet'));
const TousProjets = React.lazy(() => import(/* webpackChunkName: 'tous-projets' */ './pages/projets/tous-projets'));
const DetailProduit = React.lazy(() => import(/* webpackChunkName: 'detail-produit' */ './pages/produits/detail-produit'));
const TousProduits = React.lazy(() => import(/* webpackChunkName: 'tous-produits' */ './pages/produits/tous-produits'));
const DetailAnnonce = React.lazy(() => import(/* webpackChunkName: 'detail-annonce' */ './pages/annonces/detail-annonce'));
const ToutesAnnonces = React.lazy(() => import(/* webpackChunkName: 'toutes-annonces' */ './pages/annonces/toutes-annonces'));
const DetailEmployeMois = React.lazy(() => import(/* webpackChunkName: 'detail-employe-mois' */ './pages/employes-mois/detail-employe-mois'));
const TousEmployesMois = React.lazy(() => import(/* webpackChunkName: 'tous-employes-mois' */ './pages/employes-mois/tous-employes-mois'));
const TousBilans = React.lazy(() => import(/* webpackChunkName: 'tous-bilans' */ './pages/bilans/tous-bilans'));
const TouteDocumentation = React.lazy(() => import(/* webpackChunkName: 'toute-documentation' */ './pages/documentation/toute-documentation'));
const TouteGalerie = React.lazy(() => import(/* webpackChunkName: 'toute-galerie' */ './pages/galerie/toute-galerie'));
const ListeConge = React.lazy(() => import(/* webpackChunkName: 'workflow-conge' */ './pages/workflow/conges/ListeConge'));
const AjouterConge = React.lazy(() => import(/* webpackChunkName: 'workflow-conge' */ './pages/workflow/conges/AjouterConge'));
const DetailConge = React.lazy(() => import(/* webpackChunkName: 'workflow-conge' */ './pages/workflow/conges/DetailConge'));
const ListeVacances = React.lazy(() => import(/* webpackChunkName: 'workflow-vacances' */ './pages/workflow/vacances/ListeVacances'));
const AjouterVacances = React.lazy(() => import(/* webpackChunkName: 'workflow-vacances' */ './pages/workflow/vacances/AjouterVacances'));
const DetailVacances = React.lazy(() => import(/* webpackChunkName: 'workflow-vacances' */ './pages/workflow/vacances/DetailVacances'));
const ListeAbsence = React.lazy(() => import(/* webpackChunkName: 'workflow-absence' */ './pages/workflow/absences/ListeAbsence'));
const AjouterAbsence = React.lazy(() => import(/* webpackChunkName: 'workflow-absence' */ './pages/workflow/absences/AjouterAbsence'));
const DetailAbsence = React.lazy(() => import(/* webpackChunkName: 'workflow-absence' */ './pages/workflow/absences/DetailAbsence'));
const ListeBesoin = React.lazy(() => import(/* webpackChunkName: 'workflow-besoin' */ './pages/workflow/besoins/ListeBesoin'));
const AjouterBesoin = React.lazy(() => import(/* webpackChunkName: 'workflow-besoin' */ './pages/workflow/besoins/AjouterBesoin'));
const DetailBesoin = React.lazy(() => import(/* webpackChunkName: 'workflow-besoin' */ './pages/workflow/besoins/DetailBesoin'));

export interface IAppProps {
  siteUrl?: string;
  msGraphClientFactory?: MSGraphClientFactory;
}

const normalizePage = (name: string): string => {
  if (/^(liste|ajouter|modifier|detail)-(conge|vacances|absence|besoin)$/.test(name)) {
    return `workflow-${name}`;
  }
  return name;
};

const getPageFromHash = (): string => {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('page-')) {
    return normalizePage(hash.replace('page-', '').split('&')[0]);
  }
  return 'accueil';
};

const getIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

export const App: React.FC<IAppProps> = ({ siteUrl, msGraphClientFactory }) => {
  const [page, setPage] = React.useState<string>(getPageFromHash);
  const [hash, setHash] = React.useState<string>(window.location.hash);
  const [menuItems, setMenuItems] = React.useState<IHeaderMenuItem[]>([]);
  const [footerColumns, setFooterColumns] = React.useState<IFooterColumn[]>([]);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onHashChange = (): void => {
      setPage(getPageFromHash());
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return (): void => window.removeEventListener('hashchange', onHashChange);
  }, []);

  React.useEffect(() => {
    if (!siteUrl) return;
    loadHeaderMenu(siteUrl)
      .then(setMenuItems)
      .catch((err) => console.error('[App] Menu :', err));
    loadFooter(siteUrl)
      .then(setFooterColumns)
      .catch((err) => console.error('[App] Footer :', err));
  }, [siteUrl]);

  return (
    <div ref={rootRef} className="min-h-screen flex flex-col bg-slate-100 text-ikaInk antialiased">
      <Header menuItems={menuItems} />
      <ScrollToTop hash={hash} rootRef={rootRef} />
      <ErrorBoundary resetKey={hash}>
      <React.Suspense fallback={<div className="py-24 text-center text-sm font-semibold text-slate-400">Chargement...</div>}>
      {page === 'accueil' && <Accueil siteUrl={siteUrl} />}
      {page === 'detail-evenement' && <DetailEvenement siteUrl={siteUrl} />}
      {page === 'tous-evenements' && <TousEvenements siteUrl={siteUrl} />}
      {page === 'detail-actualite' && <DetailActualite siteUrl={siteUrl} />}
      {page === 'toutes-actualites' && <ToutesActualites siteUrl={siteUrl} />}
      {page === 'detail-agenda' && <DetailAgenda siteUrl={siteUrl} />}
      {page === 'toutes-agenda' && <ToutesAgenda siteUrl={siteUrl} />}
      {page === 'detail-membre' && <DetailMembre siteUrl={siteUrl} />}
      {page === 'toute-equipe' && <TouteEquipe siteUrl={siteUrl} msGraphClientFactory={msGraphClientFactory} />}
      {page === 'detail-projet' && <DetailProjet siteUrl={siteUrl} />}
      {page === 'tous-projets' && <TousProjets siteUrl={siteUrl} />}
      {page === 'detail-produit' && <DetailProduit siteUrl={siteUrl} />}
      {page === 'tous-produits' && <TousProduits siteUrl={siteUrl} />}
      {page === 'detail-annonce' && <DetailAnnonce siteUrl={siteUrl} />}
      {page === 'toutes-annonces' && <ToutesAnnonces siteUrl={siteUrl} />}
      {page === 'detail-employe-mois' && <DetailEmployeMois siteUrl={siteUrl} />}
      {page === 'tous-employes-mois' && <TousEmployesMois siteUrl={siteUrl} />}
      {page === 'tous-bilans' && <TousBilans siteUrl={siteUrl} />}
      {page === 'toute-documentation' && <TouteDocumentation />}
      {page === 'toute-galerie' && <TouteGalerie siteUrl={siteUrl} />}
      {page === 'workflow-liste-conge' && <ListeConge siteUrl={siteUrl} />}
      {page === 'workflow-ajouter-conge' && <AjouterConge mode="ajouter" siteUrl={siteUrl} />}
      {page === 'workflow-modifier-conge' && <AjouterConge mode="modifier" id={getIdFromHash()} siteUrl={siteUrl} />}
      {page === 'workflow-detail-conge' && <DetailConge siteUrl={siteUrl} />}
      {page === 'workflow-liste-vacances' && <ListeVacances siteUrl={siteUrl} />}
      {page === 'workflow-ajouter-vacances' && <AjouterVacances mode="ajouter" siteUrl={siteUrl} />}
      {page === 'workflow-modifier-vacances' && <AjouterVacances mode="modifier" id={getIdFromHash()} siteUrl={siteUrl} />}
      {page === 'workflow-detail-vacances' && <DetailVacances siteUrl={siteUrl} />}
      {page === 'workflow-liste-absence' && <ListeAbsence siteUrl={siteUrl} />}
      {page === 'workflow-ajouter-absence' && <AjouterAbsence mode="ajouter" siteUrl={siteUrl} />}
      {page === 'workflow-modifier-absence' && <AjouterAbsence mode="modifier" id={getIdFromHash()} siteUrl={siteUrl} />}
      {page === 'workflow-detail-absence' && <DetailAbsence siteUrl={siteUrl} />}
      {page === 'workflow-liste-besoin' && <ListeBesoin siteUrl={siteUrl} />}
      {page === 'workflow-ajouter-besoin' && <AjouterBesoin mode="ajouter" siteUrl={siteUrl} />}
      {page === 'workflow-modifier-besoin' && <AjouterBesoin mode="modifier" id={getIdFromHash()} siteUrl={siteUrl} />}
      {page === 'workflow-detail-besoin' && <DetailBesoin siteUrl={siteUrl} />}
      {page !== 'accueil' && page !== 'detail-evenement' && page !== 'tous-evenements' && page !== 'detail-actualite' && page !== 'toutes-actualites' && page !== 'detail-agenda' && page !== 'toutes-agenda' && page !== 'detail-membre' && page !== 'toute-equipe' && page !== 'detail-projet' && page !== 'tous-projets' && page !== 'detail-produit' && page !== 'tous-produits' && page !== 'detail-annonce' && page !== 'toutes-annonces' && page !== 'detail-employe-mois' && page !== 'tous-employes-mois' && page !== 'tous-bilans' && page !== 'toute-documentation' && page !== 'toute-galerie' && page !== 'workflow-liste-conge' && page !== 'workflow-ajouter-conge' && page !== 'workflow-modifier-conge' && page !== 'workflow-detail-conge' && page !== 'workflow-liste-vacances' && page !== 'workflow-ajouter-vacances' && page !== 'workflow-modifier-vacances' && page !== 'workflow-detail-vacances' && page !== 'workflow-liste-absence' && page !== 'workflow-ajouter-absence' && page !== 'workflow-modifier-absence' && page !== 'workflow-detail-absence' && page !== 'workflow-liste-besoin' && page !== 'workflow-ajouter-besoin' && page !== 'workflow-modifier-besoin' && page !== 'workflow-detail-besoin' && <Page404 />}
      </React.Suspense>
      </ErrorBoundary>
      <Footer columns={footerColumns} />
    </div>
  );
};

export default App;
