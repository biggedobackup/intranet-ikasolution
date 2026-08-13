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
import { CONGES, IConge, TypeConge, CONGE_VALIDATEURS } from '../../../services/workflow/conges/data';

const CONGE_TYPES: TypeConge[] = ['Congé annuel', 'Congé exceptionnel', 'Congé de maladie', 'Congé de maternité', 'Congé de paternité'];

export interface IAjouterCongeProps {
  mode: 'ajouter' | 'modifier';
  id?: number;
}

export const AjouterConge: React.FC<IAjouterCongeProps> = (props) => {
  const { mode, id } = props;

  const existing: IConge | undefined = (mode === 'modifier' && id) ? CONGES.find((i) => i.id === id) : undefined;

  const [titre, setTitre] = React.useState<string>(existing?.titre || '');
  const [demandeur, setDemandeur] = React.useState<string>(existing?.demandeur || '');
  const [type, setType] = React.useState<TypeConge>(existing?.type || 'Congé annuel');
  const [dateDebut, setDateDebut] = React.useState<string>(existing?.dateDebut || '');
  const [dateFin, setDateFin] = React.useState<string>(existing?.dateFin || '');
  const [jours, setJours] = React.useState<string>(existing ? String(existing.jours) : '');
  const [motif, setMotif] = React.useState<string>(existing?.motif || '');
  const [validateur, setValidateur] = React.useState<string>(existing?.validateur || CONGE_VALIDATEURS[0]);
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
            <h1 className="mt-4 text-xl font-black text-ikaBlueDark">{isEdit ? 'Demande modifiée' : 'Demande envoyée'}</h1>
            <p className="mt-2 text-sm text-slate-500">
              Votre demande de congé a bien été {isEdit ? 'modifiée' : 'enregistrée'}.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#page-workflow-liste-conge" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                <FaArrowLeft /> Retour à la liste
              </a>
              <a href="#page-workflow-ajouter-conge" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                Nouvelle demande
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
          <a href="#page-workflow-liste-conge" className="hover:text-ikaBlue transition">Demandes de Congé</a>
          <span>/</span>
          <span className="text-ikaBlue">{isEdit ? `Modifier : ${existing?.titre || ''}` : 'Nouvelle demande de congé'}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100">
            <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">
              {isEdit ? 'Modifier la demande de congé' : 'Nouvelle demande de congé'}
            </h1>
            <p className="mt-1 text-xs text-slate-500">La demande sera transmise au validateur sélectionné.</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Titre</label>
              <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required placeholder="Titre de la demande" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaUser className="text-ikaBlue text-[10px]" /> Demandeur</label>
              <input type="text" value={demandeur} onChange={(e) => setDemandeur(e.target.value)} required placeholder="Nom du demandeur" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaUserCheck className="text-ikaBlue text-[10px]" /> Validateur</label>
              <select value={validateur} onChange={(e) => setValidateur(e.target.value)} className={inputCls}>
                {CONGE_VALIDATEURS.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Type de congé</label>
              <select value={type} onChange={(e) => setType(e.target.value as TypeConge)} className={inputCls}>
                {CONGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaCalendarDays className="text-ikaBlue text-[10px]" /> Date de début</label>
                <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaCalendarDays className="text-ikaBlue text-[10px]" /> Date de fin</label>
                <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nombre de jours</label>
                <input type="number" min={1} value={jours} onChange={(e) => setJours(e.target.value)} required placeholder="0" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Motif</label>
              <textarea value={motif} onChange={(e) => setMotif(e.target.value)} required rows={4} placeholder="Décrivez le motif de votre demande..." className={inputCls} />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button type="submit" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                <FaPaperPlane /> {isEdit ? 'Enregistrer les modifications' : 'Envoyer la demande'}
              </button>
              <a
                href={isEdit ? `#page-workflow-modifier-conge&id=${id}` : '#page-workflow-ajouter-conge'}
                onClick={(e) => { e.preventDefault(); setTitre(existing?.titre || ''); setDemandeur(existing?.demandeur || ''); setType(existing?.type || 'Congé annuel'); setDateDebut(existing?.dateDebut || ''); setDateFin(existing?.dateFin || ''); setJours(existing ? String(existing.jours) : ''); setMotif(existing?.motif || ''); setValidateur(existing?.validateur || CONGE_VALIDATEURS[0]); }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                <FaRotate /> Réinitialiser
              </a>
              <a href="#page-workflow-liste-conge" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                <FaArrowLeft /> Annuler
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AjouterConge;
