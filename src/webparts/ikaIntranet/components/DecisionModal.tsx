import * as React from 'react';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

export interface IDecisionModalProps {
  title: string;
  message: string;
  actionLabel: string;
  action: 'valider' | 'rejeter';
  onConfirm: (comment: string, date: string) => void;
  onCancel: () => void;
}

export const DecisionModal: React.FC<IDecisionModalProps> = (props) => {
  const { title, message, actionLabel, action, onConfirm, onCancel } = props;
  const [comment, setComment] = React.useState<string>('');
  const [date, setDate] = React.useState<string>(new Date().toISOString().slice(0, 10));

  const isValider = action === 'valider';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${isValider ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {isValider ? <FaCircleCheck className="text-sm" /> : <FaCircleXmark className="text-sm" />}
          </span>
          <h3 className="font-black text-slate-900 text-sm">{title}</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Commentaire</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Ajoutez un commentaire sur votre décision..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Date de décision</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
          />
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
            Annuler
          </button>
          <button
            onClick={() => onConfirm(comment, date)}
            className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow transition flex items-center gap-1.5 ${isValider ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-500 hover:bg-rose-600'}`}
          >
            {isValider ? <FaCircleCheck className="text-[10px]" /> : <FaCircleXmark className="text-[10px]" />}
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionModal;
