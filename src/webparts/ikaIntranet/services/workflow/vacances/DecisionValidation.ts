import { IVacance } from './data';

export type DecisionAction = 'valider' | 'rejeter';

export interface IVacanceDecisionConfig {
  modalTitle: (action: DecisionAction) => string;
  modalMessage: (item: IVacance, action: DecisionAction) => string;
  validateLabel: string;
  rejectLabel: string;
  validateVerb: string;
  rejectVerb: string;
  decisionSectionTitle: string;
}

export const VACANCE_DECISION_CONFIG: IVacanceDecisionConfig = {
  modalTitle: (action) =>
    action === 'valider' ? 'Valider la demande de vacances' : 'Rejeter la demande de vacances',
  modalMessage: (item, action) =>
    action === 'valider'
      ? `Vous allez approuver la demande de vacances « ${item.titre} » de ${item.demandeur}.`
      : `Vous allez rejeter la demande de vacances « ${item.titre} » de ${item.demandeur}. Cette action est irréversible.`,
  validateLabel: 'Valider la demande',
  rejectLabel: 'Rejeter la demande',
  validateVerb: 'Validée',
  rejectVerb: 'Rejetée',
  decisionSectionTitle: 'Décision de validation'
};

export function applyVacanceDecision(item: IVacance, action: DecisionAction, comment: string, date: string): IVacance {
  return {
    ...item,
    statut: action === 'valider' ? 'Approuvé' : 'Refusé',
    decisionComment: comment,
    decisionDate: date
  };
}