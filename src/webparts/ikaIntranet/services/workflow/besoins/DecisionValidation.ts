import { IBesoin } from './index';

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
    action === 'valider' ? "Valider l'expression de besoin" : "Rejeter l'expression de besoin",
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
