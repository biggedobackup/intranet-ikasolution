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
export declare const CONGE_DECISION_CONFIG: ICongeDecisionConfig;
export declare function applyCongeDecision(item: IConge, action: DecisionAction, comment: string, date: string): IConge;
//# sourceMappingURL=DecisionValidation.d.ts.map