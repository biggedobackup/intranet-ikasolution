import { IBesoin } from './data';

export type DecisionAction = 'valider' | 'rejeter';

export interface IBesoinDecisionConfig {
  modalTitle: (action: DecisionAction) => string;
  modalMessage: (item: IBesoin, action: DecisionAction) => string;
  validateLabel: string;
  rejectLabel: string;
  validateVerb: string;
  rejectVerb: string;
  decisionSectionTitle: string;
}

export const BESOIN_DECISION_CONFIG: IBesoinDecisionConfig = {
  modalTitle: (action) =>
    action === 'valider' ? 'Valider l&apos;expression de besoin' : 'Rejeter l&apos;expression de besoin',
  modalMessage: (item, action) =>
    action === 'valider'
      ? `Vous allez approuver l'expression de besoin « ${item.titre} » de ${item.demandeur}.`
      : `Vous allez rejeter l'expression de besoin « ${item.titre} » de ${item.demandeur}. Cette action est irréversible.`,
  validateLabel: 'Valider le besoin',
  rejectLabel: 'Rejeter le besoin',
  validateVerb: 'Validée',
  rejectVerb: 'Rejetée',
  decisionSectionTitle: 'Décision de validation'
};

export function applyBesoinDecision(item: IBesoin, action: DecisionAction, comment: string, date: string): IBesoin {
  return {
    ...item,
    statut: action === 'valider' ? 'Approuvé' : 'Refusé',
    decisionComment: comment,
    decisionDate: date
  };
}