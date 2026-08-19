import { IConge } from './index';
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
export declare const CONGE_DECISION_CONFIG: ICongeDecisionConfig;
//# sourceMappingURL=DecisionValidation.d.ts.map