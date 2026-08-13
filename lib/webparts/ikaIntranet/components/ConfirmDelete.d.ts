import * as React from 'react';
export interface IConfirmDeleteProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
export declare const ConfirmDelete: React.FC<IConfirmDeleteProps>;
export default ConfirmDelete;
//# sourceMappingURL=ConfirmDelete.d.ts.map