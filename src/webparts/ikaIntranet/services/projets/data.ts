export interface IProjet {
  id: number;
  name: string;
  start: string;
  end: string;
  status: string;
  cls: string;
  client: string;
  description: string;
  members: string;
}

export const PROJETS: IProjet[] = [
  {
    id: 1,
    name: 'IKAR',
    start: '01/06/2026',
    end: '30/09/2026',
    status: 'En cours',
    cls: 'bg-blue-100 text-blue-700',
    client: 'Client interne IKA',
    description: "Projet stratégique de refonte des outils métiers d'IKA SOLUTION : gestion documentaire, suivi d'activité et tableaux de bord de performance.",
    members: 'Mouhamed TRAORÉ, Aïcha KABORÉ, Mamadou COMPAORÉ'
  },
  {
    id: 2,
    name: 'IKAVISITE',
    start: '15/04/2026',
    end: '15/08/2026',
    status: 'En cours',
    cls: 'bg-blue-100 text-blue-700',
    client: 'Client externe',
    description: "Développement d'une plateforme de gestion des visites clients avec prise de rendez-vous, suivi en temps réel et reporting automatisé.",
    members: 'Mamadou COMPAORÉ, Awa NIANG'
  },
  {
    id: 3,
    name: 'IKA CLOUD',
    start: '01/03/2026',
    end: '01/07/2026',
    status: 'Terminé',
    cls: 'bg-emerald-100 text-emerald-700',
    client: 'Client externe',
    description: "Migration et hébergement de l'infrastructure applicative vers le cloud, conteneurisation des services et mise en place de la supervision continue.",
    members: 'Awa NIANG, Issa ZONGO'
  },
  {
    id: 4,
    name: 'PORTAIL RH',
    start: '10/05/2026',
    end: '10/07/2026',
    status: 'En retard',
    cls: 'bg-rose-100 text-rose-700',
    client: 'Client externe',
    description: "Conception du portail ressources humaines : gestion des congés, des absences, des fiches de paie et des annonces internes.",
    members: 'Kadiatou OUEDRAOGO, Mouhamed TRAORÉ, Salifou SAWADOGO'
  }
];
