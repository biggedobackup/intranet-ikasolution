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
  IConge, ICongePayload, CONGE_TYPES, TypeConge, loadConge, createConge, updateConge,
  loadCongeAttachment, uploadCongeAttachment, removeCongeAttachment
} from '../../../services/workflow/conges/index';
import { getCurrentUserName, getCurrentUserEmail, isBlank, isValidEmail, computeJoursInclusive, IAttachment } from '../../../services/shared/index';
import { UserPicker } from '../../../components/UserPicker';
import { FileAttachmentField } from '../../../components/FileAttachmentField';

export interface IAjouterCongeProps {
  mode: 'ajouter' | 'modifier';
  id?: number;
  siteUrl?: string;
}

interface IFormState {
  titre: string;
  type: TypeConge;
  dateDebut: string;
  dateFin: string;
  jours: string;
  motif: string;
  validateurEmail: string;
}

const emptyForm: IFormState = {
  titre: '',
  type: CONGE_TYPES[0],
  dateDebut: '',
  dateFin: '',
  jours: '',
  motif: '',
  validateurEmail: ''
};

function formFromExisting(existing: IConge): IFormState {
  return {
    titre: existing.titre,
    type: existing.type || CONGE_TYPES[0],
    dateDebut: existing.dateDebut,
    dateFin: existing.dateFin,
    jours: String(existing.jours || ''),
    motif: existing.motif,
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
  if (!form.dateDebut) errors.dateDebut = 'La date de début est obligatoire.';
  if (!form.dateFin) errors.dateFin = 'La date de fin est obligatoire.';
  if (form.dateDebut && form.dateFin && form.dateFin < form.dateDebut) {
    errors.dateFin = 'La date de fin doit être postérieure ou égale à la date de début.';
  } else if (form.dateDebut && form.dateFin && (!form.jours || Number(form.jours) <= 0)) {
    errors.dateFin = 'Impossible de calculer le nombre de jours pour ces dates.';
  }
  if (isBlank(form.motif)) errors.motif = 'Le motif est obligatoire.';
  else if (form.motif.trim().length < 5) errors.motif = 'Le motif doit contenir au moins 5 caractères.';
  return errors;
}

export const AjouterConge: React.FC<IAjouterCongeProps> = (props) => {
  const { mode, id, siteUrl } = props;
  const isEdit = mode === 'modifier';

  const [loading, setLoading] = React.useState<boolean>(isEdit);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [notFound, setNotFound] = React.useState<boolean>(false);
  const [demandeurNom, setDemandeurNom] = React.useState<string>('');
  const [demandeurEmail, setDemandeurEmail] = React.useState<string>('');
  const [original, setOriginal] = React.useState<IConge | undefined>(undefined);
  const [form, setForm] = React.useState<IFormState>(emptyForm);
  const [errors, setErrors] = React.useState<IFormErrors>({});
  const [newId, setNewId] = React.useState<number | undefined>(undefined);
  const [submitted, setSubmitted] = React.useState(false);
  const [existingAttachment, setExistingAttachment] = React.useState<IAttachment | undefined>(undefined);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [attachmentWarning, setAttachmentWarning] = React.useState<string>('');

  React.useEffect(() => {
    setForm((prev) => {
      const computed = computeJoursInclusive(prev.dateDebut, prev.dateFin);
      const next = computed !== undefined ? String(computed) : '';
      return next === prev.jours ? prev : { ...prev, jours: next };
    });
  }, [form.dateDebut, form.dateFin]);

  React.useEffect(() => {
    if (!siteUrl) return undefined;
    let cancelled = false;
    if (isEdit && id) {
      setLoading(true);
      loadConge(siteUrl, id)
        .then((existing) => {
          if (cancelled) return;
          if (!existing) { setNotFound(true); setLoading(false); return; }
          setOriginal(existing);
          setForm(formFromExisting(existing));
          setDemandeurNom(existing.demandeur);
          setDemandeurEmail(existing.demandeurEmail);
          setLoading(false);
          loadCongeAttachment(siteUrl, id).then((att) => { if (!cancelled) setExistingAttachment(att); }).catch(() => undefined);
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
    removeCongeAttachment(siteUrl, id, existingAttachment.fileName)
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

    const payload: ICongePayload = {
      titre: form.titre,
      type: form.type,
      dateDebut: form.dateDebut,
      dateFin: form.dateFin,
      jours: Number(form.jours) || 0,
      motif: form.motif,
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
        uploadCongeAttachment(siteUrl, targetId, file)
          .then((uploaded) => { if (!uploaded) setAttachmentWarning("La demande a été enregistrée mais l'envoi de la pièce jointe a échoué."); finish(ok, targetId); })
          .catch(() => { setAttachmentWarning("La demande a été enregistrée mais l'envoi de la pièce jointe a échoué."); finish(ok, targetId); });
        return;
      }
      finish(ok, targetId);
    };

    if (isEdit && id) {
      updateConge(siteUrl, id, payload).then((ok) => afterSave(ok, id)).catch(() => finish(false));
    } else {
      createConge(siteUrl, payload).then((createdId) => afterSave(!!createdId, createdId)).catch(() => finish(false));
    }
  };

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm';

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center text-sm text-slate-500 font-semibold">
            Chargement de la demande...
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
            <p className="text-sm text-slate-500 font-semibold">Demande introuvable.</p>
            <a href="#page-workflow-liste-conge" className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
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
            <h1 className="mt-4 text-xl font-black text-ikaBlueDark">{isEdit ? 'Demande modifiée' : 'Demande envoyée'}</h1>
            <p className="mt-2 text-sm text-slate-500">
              Votre demande de congé a bien été {isEdit ? 'modifiée' : 'enregistrée'}.
            </p>
            {attachmentWarning ? (
              <p className="mt-2 text-xs font-semibold text-amber-600">{attachmentWarning}</p>
            ) : null}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              {newId ? (
                <a href={`#page-workflow-detail-conge&id=${newId}`} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                  Voir la demande
                </a>
              ) : null}
              <a href="#page-workflow-liste-conge" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
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
          <a href="#page-workflow-liste-conge" className="hover:text-ikaBlue transition">Demandes de Congé</a>
          <span>/</span>
          <span className="text-ikaBlue">{isEdit ? `Modifier : ${form.titre || ''}` : 'Nouvelle demande de congé'}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100">
            <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">
              {isEdit ? 'Modifier la demande de congé' : 'Nouvelle demande de congé'}
            </h1>
            <p className="mt-1 text-xs text-slate-500">La demande sera transmise au validateur indiqué.</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {error ? (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
                <FaTriangleExclamation className="mt-0.5 shrink-0" /> <span>{error}</span>
              </div>
            ) : null}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Titre</label>
              <input type="text" value={form.titre} onChange={(e) => setField('titre', e.target.value)} required placeholder="Titre de la demande" className={`${inputCls} ${errors.titre ? 'border-rose-300' : ''}`} />
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
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Type de congé</label>
              <select value={form.type} onChange={(e) => setField('type', e.target.value as TypeConge)} className={inputCls}>
                {CONGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaCalendarDays className="text-ikaBlue text-[10px]" /> Date de début</label>
                <input type="date" value={form.dateDebut} onChange={(e) => setField('dateDebut', e.target.value)} required className={`${inputCls} ${errors.dateDebut ? 'border-rose-300' : ''}`} />
                {errors.dateDebut ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{errors.dateDebut}</p> : null}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaCalendarDays className="text-ikaBlue text-[10px]" /> Date de fin</label>
                <input type="date" value={form.dateFin} onChange={(e) => setField('dateFin', e.target.value)} required className={`${inputCls} ${errors.dateFin ? 'border-rose-300' : ''}`} />
                {errors.dateFin ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{errors.dateFin}</p> : null}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nombre de jours</label>
                <input type="text" value={form.jours ? `${form.jours} jour(s)` : ''} disabled readOnly placeholder="Sélectionnez les dates" className={`${inputCls} bg-slate-50 text-slate-500 cursor-not-allowed`} />
                <p className="mt-1 text-[11px] text-slate-400">Calculé automatiquement selon les dates.</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Motif</label>
              <textarea value={form.motif} onChange={(e) => setField('motif', e.target.value)} required rows={4} placeholder="Décrivez le motif de votre demande..." className={`${inputCls} ${errors.motif ? 'border-rose-300' : ''}`} />
              {errors.motif ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{errors.motif}</p> : null}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"><FaPaperclip className="text-ikaBlue text-[10px]" /> Pièce jointe (optionnel)</label>
              <FileAttachmentField existing={existingAttachment} onRemoveExisting={handleRemoveAttachment} file={file} onFileChange={setFile} className={inputCls} />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition disabled:opacity-60 disabled:cursor-not-allowed">
                <FaPaperPlane /> {saving ? 'Enregistrement...' : (isEdit ? 'Enregistrer les modifications' : 'Envoyer la demande')}
              </button>
              <a
                href={isEdit ? `#page-workflow-modifier-conge&id=${id}` : '#page-workflow-ajouter-conge'}
                onClick={(e) => { e.preventDefault(); setForm(original ? formFromExisting(original) : emptyForm); setError(''); setFile(undefined); setErrors({}); }}
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
