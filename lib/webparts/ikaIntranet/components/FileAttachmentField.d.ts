import * as React from 'react';
export interface IExistingAttachment {
    fileName: string;
    url: string;
}
export interface IFileAttachmentFieldProps {
    existing?: IExistingAttachment;
    onRemoveExisting: () => void;
    file: File | undefined;
    onFileChange: (file: File | undefined) => void;
    maxSizeMB?: number;
    className?: string;
}
export declare const FileAttachmentField: React.FC<IFileAttachmentFieldProps>;
export default FileAttachmentField;
//# sourceMappingURL=FileAttachmentField.d.ts.map