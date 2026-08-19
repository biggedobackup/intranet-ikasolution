import * as React from 'react';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileLines, FaTrashCan, FaXmark } from 'react-icons/fa6';

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

function fileIcon(fileName: string): React.ReactElement {
  const ext = (fileName.split('.').pop() || '').toLowerCase();
  if (ext === 'pdf') return <FaFilePdf className="text-rose-500" />;
  if (ext === 'doc' || ext === 'docx') return <FaFileWord className="text-ikaBlue" />;
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].indexOf(ext) !== -1) return <FaFileImage className="text-emerald-500" />;
  return <FaFileLines className="text-slate-400" />;
}

export const FileAttachmentField: React.FC<IFileAttachmentFieldProps> = (props) => {
  const { existing, onRemoveExisting, file, onFileChange, maxSizeMB, className } = props;
  const [localError, setLocalError] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const limitMB = maxSizeMB || 10;

  const inputCls = className || 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const picked = e.target.files && e.target.files[0] ? e.target.files[0] : undefined;
    if (picked && picked.size > limitMB * 1024 * 1024) {
      setLocalError(`Le fichier dépasse la taille maximale autorisée (${limitMB} Mo).`);
      onFileChange(undefined);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setLocalError('');
    onFileChange(picked);
  };

  const clearSelection = (): void => {
    setLocalError('');
    onFileChange(undefined);
    if (inputRef.current) inputRef.current.value = '';
  };

  if (existing) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
        <a href={existing.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-semibold text-ikaBlue hover:underline truncate min-w-0">
          {fileIcon(existing.fileName)} <span className="truncate">{existing.fileName}</span>
        </a>
        <button type="button" onClick={onRemoveExisting} className="text-rose-500 hover:text-rose-600 shrink-0" aria-label="Supprimer la pièce jointe">
          <FaTrashCan className="text-xs" />
        </button>
      </div>
    );
  }

  return (
    <div>
      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-700 truncate min-w-0">
            {fileIcon(file.name)} <span className="truncate">{file.name}</span>
          </span>
          <button type="button" onClick={clearSelection} className="text-slate-400 hover:text-slate-600 shrink-0" aria-label="Retirer le fichier">
            <FaXmark className="text-xs" />
          </button>
        </div>
      ) : (
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          onChange={handleChange}
          className={inputCls}
        />
      )}
      {localError ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{localError}</p> : null}
    </div>
  );
};

export default FileAttachmentField;
