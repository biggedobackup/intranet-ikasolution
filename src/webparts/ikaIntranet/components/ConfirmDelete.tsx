import * as React from 'react';
import { FaTriangleExclamation, FaTrashCan } from 'react-icons/fa6';

export interface IConfirmDeleteProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDelete: React.FC<IConfirmDeleteProps> = (props) => {
  const { title, message, onConfirm, onCancel } = props;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <FaTrashCan className="text-sm" />
          </span>
          <h3 className="font-black text-slate-900 text-sm">{title}</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
            Annuler
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 shadow transition flex items-center gap-1.5">
            <FaTriangleExclamation className="text-[10px]" /> Confirmer la suppression
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;