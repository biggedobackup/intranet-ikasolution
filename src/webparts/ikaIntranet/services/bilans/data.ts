export interface IBilan {
  id: number;
  period: string;
  file: string;
  size: string;
  summary: string;
  highlights: string[];
}

export const BILANS: IBilan[] = [
  {
    id: 1,
    period: 'Du 07 au 13 Juillet 2026',
    file: 'Bilan_hebdo_07-13.pdf',
    size: '2.4 Mo - PDF',
    summary: "Activités de la semaine : suivi des projets en cours, ateliers de formation et clôture des jalons intermédiaires.",
    highlights: ['Jalon IKAR validé', 'Atelier formation SPFx', 'Point direction hebdomadaire']
  },
  {
    id: 2,
    period: 'Du 13 au 20 Juillet 2026',
    file: 'Bilan_hebdo_13-20.pdf',
    size: '2.1 Mo - PDF',
    summary: "Semaine axée sur le déploiement des livrables clients et la préparation des démonstrations.",
    highlights: ['Démo client IKAVISITE', 'Déploiement cloud', 'Réunion de cadrage RH']
  },
  {
    id: 3,
    period: 'Du 20 au 27 Juillet 2026',
    file: 'Bilan_hebdo_20-27.pdf',
    size: '1.8 Mo - PDF',
    summary: "Clôture de la période : revue des indicateurs, bilan des projets et planification de la rentrée.",
    highlights: ['Revue des indicateurs', 'Clôture budgétaire', 'Planification rentrée']
  }
];
