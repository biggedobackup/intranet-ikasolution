import { IVacance } from './index';
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
export declare const VACANCE_DECISION_CONFIG: IVacanceDecisionConfig;
//# sourceMappingURL=DecisionValidation.d.ts.map