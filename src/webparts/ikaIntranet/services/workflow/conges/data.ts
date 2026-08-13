export type CongeStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';

export type TypeConge = 'Congé annuel' | 'Congé exceptionnel' | 'Congé de maladie' | 'Congé de maternité' | 'Congé de paternité';

export interface IConge {
  id: number;
  titre: string;
  demandeur: string;
  type: TypeConge;
  dateDebut: string;
  dateFin: string;
  jours: number;
  motif: string;
  validateur?: string;
  statut: CongeStatus;
  createdAt: string;
  decisionComment?: string;
  decisionDate?: string;
}

export const CONGE_VALIDATEURS: string[] = [
  'Jean OUEDRAOGO',
  'Kadiatou OUEDRAOGO',
  'Salifou SAWADOGO',
  'Fatou BATIONO'
];

export const CONGES: IConge[] = [
  { id: 1, titre: 'Congé annuel', demandeur: 'Jean OUEDRAOGO', type: 'Congé annuel', dateDebut: '10/08/2026', dateFin: '14/08/2026', jours: 5, motif: 'Congé annuel', statut: 'Approuvé', createdAt: '05/08/2026', decisionComment: 'Validé par la direction des ressources humaines.', decisionDate: '06/08/2026' },
  { id: 2, titre: 'Congé annuel', demandeur: 'Aïcha KABORÉ', type: 'Congé annuel', dateDebut: '20/08/2026', dateFin: '24/08/2026', jours: 5, motif: 'Congé annuel', statut: 'En attente', createdAt: '06/08/2026' },
  { id: 3, titre: 'Congé exceptionnel', demandeur: 'Mamadou COMPAORÉ', type: 'Congé exceptionnel', dateDebut: '01/09/2026', dateFin: '03/09/2026', jours: 3, motif: 'Raisons personnelles', statut: 'Refusé', createdAt: '07/08/2026', decisionComment: 'Congé exceptionnel refusé : effectif insuffisant sur la période.', decisionDate: '08/08/2026' },
  { id: 4, titre: 'Congé de maladie', demandeur: 'Fatou BATIONO', type: 'Congé de maladie', dateDebut: '15/08/2026', dateFin: '16/08/2026', jours: 2, motif: 'Arrêt maladie', statut: 'Approuvé', createdAt: '08/08/2026' },
  { id: 5, titre: 'Congé annuel', demandeur: 'Issa ZONGO', type: 'Congé annuel', dateDebut: '25/08/2026', dateFin: '27/08/2026', jours: 3, motif: 'Congé annuel', statut: 'En attente', createdAt: '09/08/2026' },
  { id: 6, titre: 'Congé de maternité', demandeur: 'Kadiatou OUEDRAOGO', type: 'Congé de maternité', dateDebut: '01/09/2026', dateFin: '30/11/2026', jours: 90, motif: 'Congé de maternité', statut: 'Approuvé', createdAt: '10/08/2026' },
  { id: 7, titre: 'Congé exceptionnel', demandeur: 'Salifou SAWADOGO', type: 'Congé exceptionnel', dateDebut: '18/08/2026', dateFin: '18/08/2026', jours: 1, motif: 'Cérémonie familiale', statut: 'Annulé', createdAt: '11/08/2026' },
  { id: 8, titre: 'Congé annuel', demandeur: 'Awa NIANG', type: 'Congé annuel', dateDebut: '05/09/2026', dateFin: '19/09/2026', jours: 15, motif: 'Congé annuel', statut: 'En attente', createdAt: '12/08/2026' },
  { id: 9, titre: 'Congé de maladie', demandeur: 'Mamadou COMPAORÉ', type: 'Congé de maladie', dateDebut: '22/08/2026', dateFin: '23/08/2026', jours: 2, motif: 'Soins dentaires', statut: 'Refusé', createdAt: '13/08/2026' },
  { id: 10, titre: 'Congé exceptionnel', demandeur: 'Jean OUEDRAOGO', type: 'Congé exceptionnel', dateDebut: '01/10/2026', dateFin: '02/10/2026', jours: 2, motif: 'Déplacement professionnel', statut: 'En attente', createdAt: '14/08/2026' },
  { id: 11, titre: 'Congé annuel', demandeur: 'Aïcha KABORÉ', type: 'Congé annuel', dateDebut: '10/10/2026', dateFin: '20/10/2026', jours: 11, motif: 'Congé annuel', statut: 'Approuvé', createdAt: '15/08/2026' },
  { id: 12, titre: 'Congé de paternité', demandeur: 'Issa ZONGO', type: 'Congé de paternité', dateDebut: '01/11/2026', dateFin: '10/11/2026', jours: 10, motif: 'Congé de paternité', statut: 'En attente', createdAt: '16/08/2026' },
  { id: 13, titre: 'Congé annuel', demandeur: 'Fatou BATIONO', type: 'Congé annuel', dateDebut: '15/11/2026', dateFin: '29/11/2026', jours: 15, motif: 'Congé annuel', statut: 'En attente', createdAt: '17/08/2026' },
  { id: 14, titre: 'Congé exceptionnel', demandeur: 'Awa NIANG', type: 'Congé exceptionnel', dateDebut: '20/12/2026', dateFin: '24/12/2026', jours: 5, motif: 'Vacances de fin d\'année', statut: 'En attente', createdAt: '18/08/2026' },
  { id: 15, titre: 'Congé annuel', demandeur: 'Mouhamed TRAORÉ', type: 'Congé annuel', dateDebut: '27/12/2026', dateFin: '31/12/2026', jours: 5, motif: 'Fin d\'année', statut: 'Approuvé', createdAt: '19/08/2026' }
];