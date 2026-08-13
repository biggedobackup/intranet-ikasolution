import * as React from 'react';
import { Header } from './components/Header';
import { loadHeaderMenu, IHeaderMenuItem } from './services/headerMenu';
import { loadFooter } from './services/footer';
import { IFooterColumn } from './components/Footer';
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

export interface IAppProps {
  siteUrl?: string;
}

const getPageFromHash = (): string => {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('page-')) {
    return normalizePage(hash.replace('page-', '').split('&')[0]);
  }
  return 'accueil';
};

const normalizePage = (name: string): string => {
  if (/^(liste|ajouter|modifier|detail)-(conge|vacances|absence|besoin)$/.test(name)) {
    return `workflow-${name}`;
  }
  return name;
};

const getIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

export const App: React.FC<IAppProps> = ({ siteUrl }) => {
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
      {page === 'accueil' && <Accueil />}
      {page === 'detail-evenement' && <DetailEvenement />}
      {page === 'tous-evenements' && <TousEvenements />}
      {page === 'detail-actualite' && <DetailActualite />}
      {page === 'toutes-actualites' && <ToutesActualites />}
      {page === 'detail-agenda' && <DetailAgenda />}
      {page === 'toutes-agenda' && <ToutesAgenda />}
      {page === 'detail-membre' && <DetailMembre />}
      {page === 'toute-equipe' && <TouteEquipe />}
      {page === 'detail-projet' && <DetailProjet />}
      {page === 'tous-projets' && <TousProjets />}
      {page === 'detail-produit' && <DetailProduit />}
      {page === 'tous-produits' && <TousProduits />}
      {page === 'detail-annonce' && <DetailAnnonce />}
      {page === 'toutes-annonces' && <ToutesAnnonces />}
      {page === 'detail-employe-mois' && <DetailEmployeMois />}
      {page === 'tous-employes-mois' && <TousEmployesMois />}
      {page === 'detail-bilan' && <DetailBilan />}
      {page === 'tous-bilans' && <TousBilans />}
      {page === 'toute-documentation' && <TouteDocumentation />}
      {page === 'toute-galerie' && <TouteGalerie />}
      {page === 'workflow-liste-conge' && <ListeConge />}
      {page === 'workflow-ajouter-conge' && <AjouterConge mode="ajouter" />}
      {page === 'workflow-modifier-conge' && <AjouterConge mode="modifier" id={getIdFromHash()} />}
      {page === 'workflow-detail-conge' && <DetailConge />}
      {page === 'workflow-liste-vacances' && <ListeVacances />}
      {page === 'workflow-ajouter-vacances' && <AjouterVacances mode="ajouter" />}
      {page === 'workflow-modifier-vacances' && <AjouterVacances mode="modifier" id={getIdFromHash()} />}
      {page === 'workflow-detail-vacances' && <DetailVacances />}
      {page === 'workflow-liste-absence' && <ListeAbsence />}
      {page === 'workflow-ajouter-absence' && <AjouterAbsence mode="ajouter" />}
      {page === 'workflow-modifier-absence' && <AjouterAbsence mode="modifier" id={getIdFromHash()} />}
      {page === 'workflow-detail-absence' && <DetailAbsence />}
      {page === 'workflow-liste-besoin' && <ListeBesoin />}
      {page === 'workflow-ajouter-besoin' && <AjouterBesoin mode="ajouter" />}
      {page === 'workflow-modifier-besoin' && <AjouterBesoin mode="modifier" id={getIdFromHash()} />}
      {page === 'workflow-detail-besoin' && <DetailBesoin />}
      {page !== 'accueil' && page !== 'detail-evenement' && page !== 'tous-evenements' && page !== 'detail-actualite' && page !== 'toutes-actualites' && page !== 'detail-agenda' && page !== 'toutes-agenda' && page !== 'detail-membre' && page !== 'toute-equipe' && page !== 'detail-projet' && page !== 'tous-projets' && page !== 'detail-produit' && page !== 'tous-produits' && page !== 'detail-annonce' && page !== 'toutes-annonces' && page !== 'detail-employe-mois' && page !== 'tous-employes-mois' && page !== 'detail-bilan' && page !== 'tous-bilans' && page !== 'toute-documentation' && page !== 'toute-galerie' && page !== 'workflow-liste-conge' && page !== 'workflow-ajouter-conge' && page !== 'workflow-modifier-conge' && page !== 'workflow-detail-conge' && page !== 'workflow-liste-vacances' && page !== 'workflow-ajouter-vacances' && page !== 'workflow-modifier-vacances' && page !== 'workflow-detail-vacances' && page !== 'workflow-liste-absence' && page !== 'workflow-ajouter-absence' && page !== 'workflow-modifier-absence' && page !== 'workflow-detail-absence' && page !== 'workflow-liste-besoin' && page !== 'workflow-ajouter-besoin' && page !== 'workflow-modifier-besoin' && page !== 'workflow-detail-besoin' && <Page404 />}
      <Footer columns={footerColumns} />
    </div>
  );
};

export default App;
