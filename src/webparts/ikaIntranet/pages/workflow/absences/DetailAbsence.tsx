import * as React from 'react';
import {
  FaArrowLeft,
  FaCalendarDays,
  FaUser,
  FaPen,
  FaCircleCheck,
  FaCircleXmark,
  FaHourglassHalf,
  FaBriefcase,
  FaGavel,
  FaTrashCan,
  FaPaperclip
} from 'react-icons/fa6';
import { IAbsence, loadAbsence, applyAbsenceDecision, deleteAbsence, loadAbsenceAttachment, formatDateFR, DecisionAction } from '../../../services/workflow/absences/index';
import { ABSENCE_DECISION_CONFIG } from '../../../services/workflow/absences/DecisionValidation';
import { getCurrentUserEmail, IAttachment } from '../../../services/shared/index';
import { DecisionModal } from '../../../components/DecisionModal';
import { ConfirmDelete } from '../../../components/ConfirmDelete';

export interface IDetailAbsenceProps {
  siteUrl?: string;
}

const getAbsenceIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 0;
};

const statusBadge = (status: IAbsence['statut']): React.ReactElement => {
  switch (status) {
    case 'Approuvé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1"><FaCircleCheck /> Approuvé</span>;
    case 'Refusé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 flex items-center gap-1"><FaCircleXmark /> Refusé</span>;
    case 'Annulé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 flex items-center gap-1"><FaCircleXmark /> Annulé</span>;
    default: return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1"><FaHourglassHalf /> En attente</span>;
  }
};

export const DetailAbsence: React.FC<IDetailAbsenceProps> = (props) => {
  const { siteUrl } = props;
  const [absence, setAbsence] = React.useState<IAbsence | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  const [decision, setDecision] = React.useState<DecisionAction | null>(null);
  const [deciding, setDeciding] = React.useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const [currentUserEmail, setCurrentUserEmail] = React.useState<string>('');
  const [attachment, setAttachment] = React.useState<IAttachment | undefined>(undefined);

  React.useEffect(() => {
    if (!siteUrl) return;
    getCurrentUserEmail(siteUrl).then(setCurrentUserEmail).catch(() => undefined);
  }, [siteUrl]);

  const fetchAbsence = React.useCallback((): void => {
    if (!siteUrl) return;
    setLoading(true);
    const id = getAbsenceIdFromHash();
    loadAbsence(siteUrl, id)
      .then((item) => {
        setAbsence(item);
        setLoading(false);
        if (item) loadAbsenceAttachment(siteUrl, item.id).then(setAttachment).catch(() => undefined);
      })
      .catch(() => { setError('Impossible de charger le signalement.'); setLoading(false); });
  }, [siteUrl]);

  React.useEffect(() => {
    fetchAbsence();
    const onHash = (): void => { setDecision(null); fetchAbsence(); };
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, [fetchAbsence]);

  const isEnAttente = absence && absence.statut === 'En attente';
  const isValidateur = !!currentUserEmail && !!absence?.validateurEmail && currentUserEmail.toLowerCase() === absence.validateurEmail.toLowerCase();

  const handleDecision = (comment: string, date: string): void => {
    if (!decision || !siteUrl || !absence) return;
    setDeciding(true);
    applyAbsenceDecision(siteUrl, absence, decision, comment, date)
      .then((ok) => {
        setDeciding(false);
        if (ok) { setDecision(null); fetchAbsence(); }
        else setError('La décision n’a pas pu être enregistrée. Réessayez.');
      })
      .catch(() => { setDeciding(false); setError('La décision n’a pas pu être enregistrée. Réessayez.'); });
  };

  const handleDelete = (): void => {
    if (!siteUrl || !absence) return;
    setDeleting(true);
    deleteAbsence(siteUrl, absence.id)
      .then((ok) => {
        setDeleting(false);
        if (ok) window.location.hash = '#page-workflow-liste-absence';
        else { setConfirmDelete(false); setError('La suppression a échoué. Réessayez.'); }
      })
      .catch(() => { setDeleting(false); setConfirmDelete(false); setError('La suppression a échoué. Réessayez.'); });
  };

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center text-sm text-slate-500 font-semibold">
            Chargement du signalement...
          </div>
        </div>
      </main>
    );
  }

  if (!absence) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Signalement introuvable.</p>
            <a href="#page-workflow-liste-absence" className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
              <FaArrowLeft /> Retour à la liste
            </a>
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
          <a href="#page-workflow-liste-absence" className="hover:text-ikaBlue transition">Signalements d&apos;absence</a>
          <span>/</span>
          <span className="text-ikaBlue">{absence.titre}</span>
        </nav>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">{error}</div>
        ) : null}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="relative px-6 sm:px-8 py-7 border-b border-slate-100 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-ikaSoft rounded-full opacity-70" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">{absence.titre}</h1>
                  <p className="mt-1 text-xs text-slate-500">Signalement d&apos;absence #{absence.id}</p>
                </div>
                {statusBadge(absence.statut)}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><FaUser className="text-ikaBlue" /> Demandeur</span>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{absence.demandeur || '—'}</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><FaBriefcase className="text-ikaBlue" /> Type d&apos;absence</span>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{absence.type}</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><FaCalendarDays className="text-ikaBlue" /> Période</span>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{formatDateFR(absence.dateDebut)} → {formatDateFR(absence.dateFin)}</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><FaCalendarDays className="text-ikaBlue" /> Jours</span>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{absence.jours} jour(s)</p>
              </div>
            </div>

            <section>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Motif</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{absence.motif}</p>
            </section>

            {attachment ? (
              <a
                href={attachment.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-ikaBlue hover:underline w-fit max-w-full"
              >
                <FaPaperclip className="text-ikaBlue shrink-0" /> <span className="truncate">{attachment.fileName}</span>
              </a>
            ) : null}

            {isEnAttente && isValidateur ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-800">
                  <FaGavel className="text-xs" /> Décision de validation
                </h2>
                <p className="text-xs text-amber-700/80 leading-relaxed">
                  Ce signalement est en attente. Vous pouvez le valider ou le rejeter avec un commentaire.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => setDecision('valider')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow transition"
                  >
                    <FaCircleCheck /> Valider
                  </button>
                  <button
                    onClick={() => setDecision('rejeter')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow transition"
                  >
                    <FaCircleXmark /> Rejeter
                  </button>
                </div>
              </div>
            ) : isEnAttente ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2">
                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900">
                  <FaHourglassHalf className="text-xs text-amber-500" /> En attente de validation
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ce signalement est en attente de validation par {absence.validateur || 'le validateur désigné'}.
                </p>
              </div>
            ) : absence.commentaireDecision ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2">
                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900">
                  <FaGavel className="text-xs text-ikaBlue" /> Décision
                </h2>
                <p className="text-xs font-semibold text-slate-700">
                  {absence.statut === 'Approuvé' ? (
                    <span className="flex items-center gap-1.5 text-emerald-700"><FaCircleCheck /> {ABSENCE_DECISION_CONFIG.validateVerb}</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-rose-600"><FaCircleXmark /> {ABSENCE_DECISION_CONFIG.rejectVerb}</span>
                  )}
                  {absence.dateDecision ? <span className="text-slate-400 font-normal"> — le {formatDateFR(absence.dateDecision)}</span> : null}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">{absence.commentaireDecision}</p>
              </div>
            ) : null}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>Créé le {formatDateFR(absence.createdAt)}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`#page-workflow-modifier-absence&id=${absence.id}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition"
              >
                <FaPen /> Modifier le signalement
              </a>
              <button
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition"
              >
                <FaTrashCan /> Supprimer
              </button>
              <a
                href="#page-workflow-liste-absence"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                <FaArrowLeft /> Retour à la liste
              </a>
            </div>
          </div>
        </div>
      </div>

      {decision ? (
        <DecisionModal
          title={ABSENCE_DECISION_CONFIG.modalTitle(decision)}
          message={ABSENCE_DECISION_CONFIG.modalMessage(absence, decision)}
          actionLabel={deciding ? 'Enregistrement...' : (decision === 'valider' ? ABSENCE_DECISION_CONFIG.validateLabel : ABSENCE_DECISION_CONFIG.rejectLabel)}
          action={decision}
          onConfirm={handleDecision}
          onCancel={() => setDecision(null)}
        />
      ) : null}

      {confirmDelete ? (
        <ConfirmDelete
          title="Supprimer le signalement"
          message={`Voulez-vous vraiment supprimer le signalement « ${absence.titre} » de ${absence.demandeur} ? Cette action est irréversible.`}
          onConfirm={handleDelete}
          onCancel={() => !deleting && setConfirmDelete(false)}
        />
      ) : null}
    </main>
  );
};

export default DetailAbsence;
