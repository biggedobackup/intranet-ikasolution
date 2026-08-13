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
import { BESOINS, IBesoin, TypeBesoin, PrioriteBesoin, BESOIN_VALIDATEURS } from '../../../services/workflow/besoins/data';

const BESOIN_TYPES: TypeBesoin[] = ['Matériel informatique', 'Formation', 'Logiciel', 'Autre'];
const PRIORITES: PrioriteBesoin[] = ['Basse', 'Moyenne', 'Haute'];

export interface IAjouterBesoinProps {
  mode: 'ajouter' | 'modifier';
  id?: number;
}

export const AjouterBesoin: React.FC<IAjouterBesoinProps> = (props) => {
  const { mode, id } = props;

  const existing: IBesoin | undefined = (mode === 'modifier' && id) ? BESOINS.find((i) => i.id === id) : undefined;

  const [titre, setTitre] = React.useState<string>(existing?.titre || '');
  const [demandeur, setDemandeur] = React.useState<string>(existing?.demandeur || '');
  const [type, setType] = React.useState<TypeBesoin>(existing?.type || 'Matériel informatique');
  const [priorite, setPriorite] = React.useState<PrioriteBesoin>(existing?.priorite || 'Moyenne');
  const [dateSouhaitee, setDateSouhaitee] = React.useState<string>(existing?.dateSouhaitee || '');
  const [description, setDescription] = React.useState<string>(existing?.description || '');
  const [validateur, setValidateur] = React.useState<string>(existing?.validateur || BESOIN_VALIDATEURS[0]);
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
            <h1 className="mt-4 text-xl font-black text-ikaBlueDark">{isEdit ? 'Expression modifiée' : 'Expression envoyée'}</h1>
            <p className="mt-2 text-sm text-slate-500">
              Votre expression de besoin a bien été {isEdit ? 'modifiée' : 'enregistrée'}.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#page-workflow-liste-besoin" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                <FaArrowLeft /> Retour à la liste
              </a>
              <a href="#page-workflow-ajouter-besoin" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                Nouvelle expression
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
          <a href="#page-workflow-liste-besoin" className="hover:text-ikaBlue transition">Expressions de besoin</a>
          <span>/</span>
          <span className="text-ikaBlue">{isEdit ? `Modifier : ${existing?.titre || ''}` : 'Nouvelle expression de besoin'}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100">
            <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">
              {isEdit ? 'Modifier l\'expression de besoin' : 'Nouvelle expression de besoin'}
            </h1>
            <p className="mt-1 text-xs text-slate-500">Le besoin sera transmis au validateur sélectionné.</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Titre</label>
              <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required placeholder="Titre du besoin" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaUser className="text-ikaBlue text-[10px]" /> Demandeur</label>
              <input type="text" value={demandeur} onChange={(e) => setDemandeur(e.target.value)} required placeholder="Nom du demandeur" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaUserCheck className="text-ikaBlue text-[10px]" /> Validateur</label>
              <select value={validateur} onChange={(e) => setValidateur(e.target.value)} className={inputCls}>
                {BESOIN_VALIDATEURS.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Type de besoin</label>
                <select value={type} onChange={(e) => setType(e.target.value as TypeBesoin)} className={inputCls}>
                  {BESOIN_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Priorité</label>
                <select value={priorite} onChange={(e) => setPriorite(e.target.value as PrioriteBesoin)} className={inputCls}>
                  {PRIORITES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaCalendarDays className="text-ikaBlue text-[10px]" /> Date souhaitée</label>
              <input type="date" value={dateSouhaitee} onChange={(e) => setDateSouhaitee(e.target.value)} required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} placeholder="Décrivez votre besoin..." className={inputCls} />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button type="submit" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                <FaPaperPlane /> {isEdit ? 'Enregistrer les modifications' : 'Envoyer l\'expression'}
              </button>
              <a
                href={isEdit ? `#page-workflow-modifier-besoin&id=${id}` : '#page-workflow-ajouter-besoin'}
                onClick={(e) => { e.preventDefault(); setTitre(existing?.titre || ''); setDemandeur(existing?.demandeur || ''); setType(existing?.type || 'Matériel informatique'); setPriorite(existing?.priorite || 'Moyenne'); setDateSouhaitee(existing?.dateSouhaitee || ''); setDescription(existing?.description || ''); setValidateur(existing?.validateur || BESOIN_VALIDATEURS[0]); }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                <FaRotate /> Réinitialiser
              </a>
              <a href="#page-workflow-liste-besoin" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                <FaArrowLeft /> Annuler
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AjouterBesoin;
