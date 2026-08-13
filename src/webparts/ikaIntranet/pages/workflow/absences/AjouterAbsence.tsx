import * as React from 'react';
import {
  FaArrowLeft,
  FaCalendarDays,
  FaUser,
  FaUserCheck,
  FaPaperPlane,
  FaRotate,
  FaCircleCheck
} from 'react-icons/fa6';
import { ABSENCES, IAbsence, TypeAbsence, ABSENCE_VALIDATEURS } from '../../../services/workflow/absences/data';

const ABSENCE_TYPES: TypeAbsence[] = ['Maladie', 'Autorisée', 'Imprévue', 'Rendez-vous'];

export interface IAjouterAbsenceProps {
  mode: 'ajouter' | 'modifier';
  id?: number;
}

export const AjouterAbsence: React.FC<IAjouterAbsenceProps> = (props) => {
  const { mode, id } = props;

  const existing: IAbsence | undefined = (mode === 'modifier' && id) ? ABSENCES.find((i) => i.id === id) : undefined;

  const [titre, setTitre] = React.useState<string>(existing?.titre || '');
  const [demandeur, setDemandeur] = React.useState<string>(existing?.demandeur || '');
  const [type, setType] = React.useState<TypeAbsence>(existing?.type || 'Autorisée');
  const [dateDebut, setDateDebut] = React.useState<string>(existing?.dateDebut || '');
  const [dateFin, setDateFin] = React.useState<string>(existing?.dateFin || '');
  const [motif, setMotif] = React.useState<string>(existing?.motif || '');
  const [validateur, setValidateur] = React.useState<string>(existing?.validateur || ABSENCE_VALIDATEURS[0]);
  const [submitted, setSubmitted] = React.useState(false);

  const isEdit = mode === 'modifier';

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm";

  if (submitted) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <div className="flex justify-center">
              <span className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><FaCircleCheck className="text-3xl" /></span>
            </div>
            <h1 className="mt-4 text-xl font-black text-ikaBlueDark">{isEdit ? 'Signalement modifié' : 'Signalement envoyé'}</h1>
            <p className="mt-2 text-sm text-slate-500">
              Votre signalement d&apos;absence a bien été {isEdit ? 'modifié' : 'enregistré'}.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#page-workflow-liste-absence" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                <FaArrowLeft /> Retour à la liste
              </a>
              <a href="#page-workflow-ajouter-absence" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                Nouveau signalement
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-workflow-liste-absence" className="hover:text-ikaBlue transition">Signalements d&apos;Absence</a>
          <span>/</span>
          <span className="text-ikaBlue">{isEdit ? `Modifier : ${existing?.titre || ''}` : 'Nouveau signalement d\'absence'}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100">
            <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">
              {isEdit ? 'Modifier le signalement d\'absence' : 'Nouveau signalement d\'absence'}
            </h1>
            <p className="mt-1 text-xs text-slate-500">Le signalement sera transmis au validateur sélectionné.</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Titre</label>
              <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required placeholder="Titre du signalement" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaUser className="text-ikaBlue text-[10px]" /> Demandeur</label>
              <input type="text" value={demandeur} onChange={(e) => setDemandeur(e.target.value)} required placeholder="Nom du demandeur" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaUserCheck className="text-ikaBlue text-[10px]" /> Validateur</label>
              <select value={validateur} onChange={(e) => setValidateur(e.target.value)} className={inputCls}>
                {ABSENCE_VALIDATEURS.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Type d&apos;absence</label>
              <select value={type} onChange={(e) => setType(e.target.value as TypeAbsence)} className={inputCls}>
                {ABSENCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaCalendarDays className="text-ikaBlue text-[10px]" /> Date de début</label>
                <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaCalendarDays className="text-ikaBlue text-[10px]" /> Date de fin</label>
                <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Motif</label>
              <textarea value={motif} onChange={(e) => setMotif(e.target.value)} required rows={4} placeholder="Décrivez le motif de votre absence..." className={inputCls} />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button type="submit" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                <FaPaperPlane /> {isEdit ? 'Enregistrer les modifications' : 'Envoyer le signalement'}
              </button>
              <a
                href={isEdit ? `#page-workflow-modifier-absence&id=${id}` : '#page-workflow-ajouter-absence'}
                onClick={(e) => { e.preventDefault(); setTitre(existing?.titre || ''); setDemandeur(existing?.demandeur || ''); setType(existing?.type || 'Autorisée'); setDateDebut(existing?.dateDebut || ''); setDateFin(existing?.dateFin || ''); setMotif(existing?.motif || ''); setValidateur(existing?.validateur || ABSENCE_VALIDATEURS[0]); }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                <FaRotate /> Réinitialiser
              </a>
              <a href="#page-workflow-liste-absence" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                <FaArrowLeft /> Annuler
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AjouterAbsence;
