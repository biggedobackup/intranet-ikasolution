import * as React from 'react';
export interface IDecisionModalProps {
    title: string;
    message: string;
    actionLabel: string;
    action: 'valider' | 'rejeter';
    onConfirm: (comment: string, date: string) => void;
    onCancel: () => void;
}
export declare const DecisionModal: React.FC<IDecisionModalProps>;
export default DecisionModal;
//# sourceMappingURL=DecisionModal.d.ts.map