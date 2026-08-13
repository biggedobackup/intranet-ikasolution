import { IAbsence } from './data';

export type DecisionAction = 'valider' | 'rejeter';

export interface IAbsenceDecisionConfig {
  modalTitle: (action: DecisionAction) => string;
  modalMessage: (item: IAbsence, action: DecisionAction) => string;
  validateLabel: string;
  rejectLabel: string;
  validateVerb: string;
  rejectVerb: string;
  decisionSectionTitle: string;
}

export const ABSENCE_DECISION_CONFIG: IAbsenceDecisionConfig = {
  modalTitle: (action) =>
    action === 'valider' ? 'Valider le signalement d&apos;absence' : 'Rejeter le signalement d&apos;absence',
  modalMessage: (item, action) =>
    action === 'valider'
      ? `Vous allez approuver le signalement d'absence « ${item.titre} » de ${item.demandeur}.`
      : `Vous allez rejeter le signalement d'absence « ${item.titre} » de ${item.demandeur}. Cette action est irréversible.`,
  validateLabel: 'Valider le signalement',
  rejectLabel: 'Rejeter le signalement',
  validateVerb: 'Validé',
  rejectVerb: 'Rejeté',
  decisionSectionTitle: 'Décision de validation'
};

export function applyAbsenceDecision(item: IAbsence, action: DecisionAction, comment: string, date: string): IAbsence {
  return {
    ...item,
    statut: action === 'valider' ? 'Approuvé' : 'Refusé',
    decisionComment: comment,
    decisionDate: date
  };
}