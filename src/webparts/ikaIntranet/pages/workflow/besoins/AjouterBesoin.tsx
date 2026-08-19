import * as React from 'react';
import {
  FaArrowLeft,
  FaCalendarDays,
  FaUser,
  FaUserCheck,
  FaPaperPlane,
  FaRotate,
  FaCircleCheck,
  FaTriangleExclamation,
  FaPaperclip
} from 'react-icons/fa6';
import {
  IBesoin, IBesoinPayload, BESOIN_PRIORITES, PrioriteBesoin, loadBesoin, createBesoin, updateBesoin,
  loadBesoinAttachment, uploadBesoinAttachment, removeBesoinAttachment
} from '../../../services/workflow/besoins/index';
import { getCurrentUserName, getCurrentUserEmail, isBlank, isValidEmail, IAttachment } from '../../../services/shared/index';
import { UserPicker } from '../../../components/UserPicker';
import { FileAttachmentField } from '../../../components/FileAttachmentField';

export interface IAjouterBesoinProps {
  mode: 'ajouter' | 'modifier';
  id?: number;
  siteUrl?: string;
}

interface IFormState {
  titre: string;
  priorite: PrioriteBesoin;
  dateSouhaitee: string;
  description: string;
  validateurEmail: string;
}

const emptyForm: IFormState = { titre: '', priorite: 'Moyenne', dateSouhaitee: '', description: '', validateurEmail: '' };

function formFromExisting(existing: IBesoin): IFormState {
  return {
    titre: existing.titre,
    priorite: existing.priorite || 'Moyenne',
    dateSouhaitee: existing.dateSouhaitee,
    description: existing.description,
    validateurEmail: existing.validateurEmail
  };
}

type IFormErrors = Partial<Record<keyof IFormState, string>>;

function validateForm(form: IFormState, demandeurEmail: string): IFormErrors {
  const errors: IFormErrors = {};
  if (isBlank(form.titre)) errors.titre = 'Le titre est obligatoire.';
  if (isBlank(form.validateurEmail)) {
    errors.validateurEmail = 'Veuillez sélectionner un validateur.';
  } else if (!isValidEmail(form.validateurEmail)) {
    errors.validateurEmail = 'Sélectionnez un validateur dans la liste proposée.';
  } else if (demandeurEmail && form.validateurEmail.trim().toLowerCase() === demandeurEmail.trim().toLowerCase()) {
    errors.validateurEmail = 'Le validateur ne peut pas être le demandeur lui-même.';
  }
  if (!form.dateSouhaitee) errors.dateSouhaitee = 'La date souhaitée est obligatoire.';
  if (isBlank(form.description)) errors.description = 'La description est obligatoire.';
  else if (form.description.trim().length < 5) errors.description = 'La description doit contenir au moins 5 caractères.';
  return errors;
}

export const AjouterBesoin: React.FC<IAjouterBesoinProps> = (props) => {
  const { mode, id, siteUrl } = props;
  const isEdit = mode === 'modifier';

  const [loading, setLoading] = React.useState<boolean>(isEdit);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [notFound, setNotFound] = React.useState<boolean>(false);
  const [demandeurNom, setDemandeurNom] = React.useState<string>('');
  const [demandeurEmail, setDemandeurEmail] = React.useState<string>('');
  const [original, setOriginal] = React.useState<IBesoin | undefined>(undefined);
  const [form, setForm] = React.useState<IFormState>(emptyForm);
  const [errors, setErrors] = React.useState<IFormErrors>({});
  const [newId, setNewId] = React.useState<number | undefined>(undefined);
  const [submitted, setSubmitted] = React.useState(false);
  const [existingAttachment, setExistingAttachment] = React.useState<IAttachment | undefined>(undefined);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [attachmentWarning, setAttachmentWarning] = React.useState<string>('');

  React.useEffect(() => {
    if (!siteUrl) return undefined;
    let cancelled = false;
    if (isEdit && id) {
      setLoading(true);
      loadBesoin(siteUrl, id)
        .then((existing) => {
          if (cancelled) return;
          if (!existing) { setNotFound(true); setLoading(false); return; }
          setOriginal(existing);
          setForm(formFromExisting(existing));
          setDemandeurNom(existing.demandeur);
          setDemandeurEmail(existing.demandeurEmail);
          setLoading(false);
          loadBesoinAttachment(siteUrl, id).then((att) => { if (!cancelled) setExistingAttachment(att); }).catch(() => undefined);
        })
        .catch(() => { if (!cancelled) { setLoading(false); setNotFound(true); } });
    } else {
      getCurrentUserName(siteUrl).then((name) => { if (!cancelled) setDemandeurNom(name); }).catch(() => undefined);
      getCurrentUserEmail(siteUrl).then((email) => { if (!cancelled) setDemandeurEmail(email); }).catch(() => undefined);
    }
    return () => { cancelled = true; };
  }, [siteUrl, isEdit, id]);

  const setField = <K extends keyof IFormState>(key: K, value: IFormState[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleRemoveAttachment = (): void => {
    if (!siteUrl || !id || !existingAttachment) return;
    removeBesoinAttachment(siteUrl, id, existingAttachment.fileName)
      .then((ok) => { if (ok) setExistingAttachment(undefined); })
      .catch(() => undefined);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!siteUrl) { setError('Impossible de contacter SharePoint (site introuvable).'); return; }
    const validationErrors = validateForm(form, demandeurEmail);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setError('Veuillez corriger les champs indiqués avant de continuer.');
      return;
    }
    setError('');
    setSaving(true);

    const payload: IBesoinPayload = {
      titre: form.titre,
      priorite: form.priorite,
      dateSouhaitee: form.dateSouhaitee,
      description: form.description,
      validateurEmail: form.validateurEmail
    };

    const finish = (ok: boolean, createdId?: number): void => {
      setSaving(false);
      if (ok) {
        if (createdId) setNewId(createdId);
        setSubmitted(true);
      } else {
        setError("Une erreur est survenue lors de l'enregistrement. Vérifiez les champs (notamment l'email du validateur) et réessayez.");
      }
    };

    const afterSave = (ok: boolean, targetId?: number): void => {
      if (ok && targetId && file) {
        uploadBesoinAttachment(siteUrl, targetId, file)
          .then((uploaded) => { if (!uploaded) setAttachmentWarning("La demande a été enregistrée mais l'envoi de la pièce jointe a échoué."); finish(ok, targetId); })
          .catch(() => { setAttachmentWarning("La demande a été enregistrée mais l'envoi de la pièce jointe a échoué."); finish(ok, targetId); });
        return;
      }
      finish(ok, targetId);
    };

    if (isEdit && id) {
      updateBesoin(siteUrl, id, payload).then((ok) => afterSave(ok, id)).catch(() => finish(false));
    } else {
      createBesoin(siteUrl, payload).then((createdId) => afterSave(!!createdId, createdId)).catch(() => finish(false));
    }
  };

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm';

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center text-sm text-slate-500 font-semibold">
            Chargement du besoin...
          </div>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Expression de besoin introuvable.</p>
            <a href="#page-workflow-liste-besoin" className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
              <FaArrowLeft /> Retour à la liste
            </a>
          </div>
        </div>
      </main>
    );
  }

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
            {attachmentWarning ? (
              <p className="mt-2 text-xs font-semibold text-amber-600">{attachmentWarning}</p>
            ) : null}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              {newId ? (
                <a href={`#page-workflow-detail-besoin&id=${newId}`} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                  Voir l&apos;expression
                </a>
              ) : null}
              <a href="#page-workflow-liste-besoin" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                <FaArrowLeft /> Retour à la liste
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
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-workflow-liste-besoin" className="hover:text-ikaBlue transition">Expressions de besoin</a>
          <span>/</span>
          <span className="text-ikaBlue">{isEdit ? `Modifier : ${form.titre || ''}` : 'Nouvelle expression de besoin'}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100">
            <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">
              {isEdit ? "Modifier l'expression de besoin" : 'Nouvelle expression de besoin'}
            </h1>
            <p className="mt-1 text-xs text-slate-500">Le besoin sera transmis au validateur indiqué.</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {error ? (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
                <FaTriangleExclamation className="mt-0.5 shrink-0" /> <span>{error}</span>
              </div>
            ) : null}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Titre</label>
              <input type="text" value={form.titre} onChange={(e) => setField('titre', e.target.value)} required placeholder="Titre du besoin" className={`${inputCls} ${errors.titre ? 'border-rose-300' : ''}`} />
              {errors.titre ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{errors.titre}</p> : null}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaUser className="text-ikaBlue text-[10px]" /> Demandeur</label>
              <input type="text" value={demandeurNom} disabled readOnly placeholder="Chargement..." className={`${inputCls} bg-slate-50 text-slate-500 cursor-not-allowed`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaUserCheck className="text-ikaBlue text-[10px]" /> Validateur</label>
              <UserPicker siteUrl={siteUrl} value={form.validateurEmail} onChange={(email) => setField('validateurEmail', email)} placeholder="Rechercher un collaborateur..." className={`${inputCls} ${errors.validateurEmail ? 'border-rose-300' : ''}`} />
              {errors.validateurEmail ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{errors.validateurEmail}</p> : null}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Priorité</label>
                <select value={form.priorite} onChange={(e) => setField('priorite', e.target.value as PrioriteBesoin)} className={inputCls}>
                  {BESOIN_PRIORITES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaCalendarDays className="text-ikaBlue text-[10px]" /> Date souhaitée</label>
                <input type="date" value={form.dateSouhaitee} onChange={(e) => setField('dateSouhaitee', e.target.value)} required className={`${inputCls} ${errors.dateSouhaitee ? 'border-rose-300' : ''}`} />
                {errors.dateSouhaitee ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{errors.dateSouhaitee}</p> : null}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Description</label>
              <textarea value={form.description} onChange={(e) => setField('description', e.target.value)} required rows={4} placeholder="Décrivez votre besoin..." className={`${inputCls} ${errors.description ? 'border-rose-300' : ''}`} />
              {errors.description ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{errors.description}</p> : null}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaPaperclip className="text-ikaBlue text-[10px]" /> Pièce jointe (optionnel)</label>
              <FileAttachmentField existing={existingAttachment} onRemoveExisting={handleRemoveAttachment} file={file} onFileChange={setFile} className={inputCls} />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition disabled:opacity-60 disabled:cursor-not-allowed">
                <FaPaperPlane /> {saving ? 'Enregistrement...' : (isEdit ? 'Enregistrer les modifications' : "Envoyer l'expression")}
              </button>
              <a
                href={isEdit ? `#page-workflow-modifier-besoin&id=${id}` : '#page-workflow-ajouter-besoin'}
                onClick={(e) => { e.preventDefault(); setForm(original ? formFromExisting(original) : emptyForm); setError(''); setFile(undefined); setErrors({}); }}
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
