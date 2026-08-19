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
export declare const ABSENCE_DECISION_CONFIG: IAbsenceDecisionConfig;
//# sourceMappingURL=DecisionValidation.d.ts.map