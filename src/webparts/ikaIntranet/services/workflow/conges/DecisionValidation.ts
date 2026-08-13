import { IConge } from './data';

export type DecisionAction = 'valider' | 'rejeter';

export interface ICongeDecisionConfig {
  modalTitle: (action: DecisionAction) => string;
  modalMessage: (item: IConge, action: DecisionAction) => string;
  validateLabel: string;
  rejectLabel: string;
  validateVerb: string;
  rejectVerb: string;
  decisionSectionTitle: string;
}

export const CONGE_DECISION_CONFIG: ICongeDecisionConfig = {
  modalTitle: (action) =>
    action === 'valider' ? 'Valider la demande de congé' : 'Rejeter la demande de congé',
  modalMessage: (item, action) =>
    action === 'valider'
      ? `Vous allez approuver la demande de congé « ${item.titre} » de ${item.demandeur}.`
      : `Vous allez rejeter la demande de congé « ${item.titre} » de ${item.demandeur}. Cette action est irréversible.`,
  validateLabel: 'Valider la demande',
  rejectLabel: 'Rejeter la demande',
  validateVerb: 'Validée',
  rejectVerb: 'Rejetée',
  decisionSectionTitle: 'Décision de validation'
};

export function applyCongeDecision(item: IConge, action: DecisionAction, comment: string, date: string): IConge {
  return {
    ...item,
    statut: action === 'valider' ? 'Approuvé' : 'Refusé',
    decisionComment: comment,
    decisionDate: date
  };
}