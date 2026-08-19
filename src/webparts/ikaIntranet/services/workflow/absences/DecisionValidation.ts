import { IAbsence } from './index';

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
    action === 'valider' ? "Valider le signalement d'absence" : "Rejeter le signalement d'absence",
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
