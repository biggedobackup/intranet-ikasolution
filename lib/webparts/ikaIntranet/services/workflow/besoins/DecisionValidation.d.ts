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
export declare const BESOIN_DECISION_CONFIG: IBesoinDecisionConfig;
export declare function applyBesoinDecision(item: IBesoin, action: DecisionAction, comment: string, date: string): IBesoin;
//# sourceMappingURL=DecisionValidation.d.ts.map