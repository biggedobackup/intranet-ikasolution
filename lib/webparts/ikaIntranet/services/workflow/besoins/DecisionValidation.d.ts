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
export declare const BESOIN_DECISION_CONFIG: IBesoinDecisionConfig;
//# sourceMappingURL=DecisionValidation.d.ts.map