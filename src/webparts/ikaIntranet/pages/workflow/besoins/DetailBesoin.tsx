import * as React from 'react';
import {
  FaArrowLeft,
  FaCalendarDays,
  FaUser,
  FaPen,
  FaCircleCheck,
  FaCircleXmark,
  FaHourglassHalf,
  FaGavel,
  FaTrashCan,
  FaPaperclip
} from 'react-icons/fa6';
import { IBesoin, loadBesoin, applyBesoinDecision, deleteBesoin, loadBesoinAttachment, formatDateFR, DecisionAction } from '../../../services/workflow/besoins/index';
import { BESOIN_DECISION_CONFIG } from '../../../services/workflow/besoins/DecisionValidation';
import { getCurrentUserEmail, IAttachment } from '../../../services/shared/index';
import { DecisionModal } from '../../../components/DecisionModal';
import { ConfirmDelete } from '../../../components/ConfirmDelete';

export interface IDetailBesoinProps {
  siteUrl?: string;
}

const getBesoinIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 0;
};

const statusBadge = (status: IBesoin['statut']): React.ReactElement => {
  switch (status) {
    case 'Approuvé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1"><FaCircleCheck /> Approuvé</span>;
    case 'Refusé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 flex items-center gap-1"><FaCircleXmark /> Refusé</span>;
    case 'Annulé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 flex items-center gap-1"><FaCircleXmark /> Annulé</span>;
    default: return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1"><FaHourglassHalf /> En attente</span>;
  }
};

const prioriteBadge = (priorite: IBesoin['priorite']): React.ReactElement => {
  switch (priorite) {
    case 'Haute': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600">{priorite}</span>;
    case 'Basse': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">{priorite}</span>;
    default: return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">{priorite}</span>;
  }
};

export const DetailBesoin: React.FC<IDetailBesoinProps> = (props) => {
  const { siteUrl } = props;
  const [besoin, setBesoin] = React.useState<IBesoin | undefined>(undefined);
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

  const fetchBesoin = React.useCallback((): void => {
    if (!siteUrl) return;
    setLoading(true);
    const id = getBesoinIdFromHash();
    loadBesoin(siteUrl, id)
      .then((item) => {
        setBesoin(item);
        setLoading(false);
        if (item) loadBesoinAttachment(siteUrl, item.id).then(setAttachment).catch(() => undefined);
      })
      .catch(() => { setError('Impossible de charger l’expression de besoin.'); setLoading(false); });
  }, [siteUrl]);

  React.useEffect(() => {
    fetchBesoin();
    const onHash = (): void => { setDecision(null); fetchBesoin(); };
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, [fetchBesoin]);

  const isEnAttente = besoin && besoin.statut === 'En attente';
  const isValidateur = !!currentUserEmail && !!besoin?.validateurEmail && currentUserEmail.toLowerCase() === besoin.validateurEmail.toLowerCase();
  const isDemandeur = !!currentUserEmail && !!besoin?.demandeurEmail && currentUserEmail.toLowerCase() === besoin.demandeurEmail.toLowerCase();

  const handleDecision = (comment: string, date: string): void => {
    if (!decision || !siteUrl || !besoin) return;
    setDeciding(true);
    applyBesoinDecision(siteUrl, besoin, decision, comment, date)
      .then((ok) => {
        setDeciding(false);
        setDecision(null);
        fetchBesoin();
        if (!ok) setError('La décision n’a pas pu être enregistrée : la demande a peut-être déjà été traitée entre-temps, ou vous n’êtes plus autorisé à le faire.');
      })
      .catch(() => {
        setDeciding(false);
        setDecision(null);
        fetchBesoin();
        setError('La décision n’a pas pu être enregistrée. Réessayez.');
      });
  };

  const handleDelete = (): void => {
    if (!siteUrl || !besoin) return;
    setDeleting(true);
    deleteBesoin(siteUrl, besoin.id)
      .then((ok) => {
        setDeleting(false);
        setConfirmDelete(false);
        if (ok) window.location.hash = '#page-workflow-liste-besoin';
        else { fetchBesoin(); setError('La suppression a échoué : la demande a peut-être déjà été traitée entre-temps, ou vous n’êtes plus autorisé à le faire.'); }
      })
      .catch(() => { setDeleting(false); setConfirmDelete(false); fetchBesoin(); setError('La suppression a échoué. Réessayez.'); });
  };

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

  if (!besoin) {
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

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4">
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-workflow-liste-besoin" className="hover:text-ikaBlue transition">Expressions de besoin</a>
          <span>/</span>
          <span className="text-ikaBlue">{besoin.titre}</span>
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
                  <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">{besoin.titre}</h1>
                  <p className="mt-1 text-xs text-slate-500">Expression de besoin #{besoin.id}</p>
                </div>
                {statusBadge(besoin.statut)}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><FaUser className="text-ikaBlue" /> Demandeur</span>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{besoin.demandeur || '—'}</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><FaCalendarDays className="text-ikaBlue" /> Date souhaitée</span>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{formatDateFR(besoin.dateSouhaitee)}</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Priorité</span>
                <div className="mt-1.5">{prioriteBadge(besoin.priorite)}</div>
              </div>
            </div>

            <section>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Description</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{besoin.description}</p>
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
                  Cette expression de besoin est en attente. Vous pouvez la valider ou la rejeter avec un commentaire.
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
                  Cette expression de besoin est en attente de validation par {besoin.validateur || 'le validateur désigné'}.
                </p>
              </div>
            ) : besoin.commentaireDecision ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-2">
                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-900">
                  <FaGavel className="text-xs text-ikaBlue" /> Décision
                </h2>
                <p className="text-xs font-semibold text-slate-700">
                  {besoin.statut === 'Approuvé' ? (
                    <span className="flex items-center gap-1.5 text-emerald-700"><FaCircleCheck /> {BESOIN_DECISION_CONFIG.validateVerb}</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-rose-600"><FaCircleXmark /> {BESOIN_DECISION_CONFIG.rejectVerb}</span>
                  )}
                  {besoin.dateDecision ? <span className="text-slate-400 font-normal"> — le {formatDateFR(besoin.dateDecision)}</span> : null}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">{besoin.commentaireDecision}</p>
              </div>
            ) : null}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>Créée le {formatDateFR(besoin.createdAt)}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {isDemandeur && isEnAttente ? (
                <a
                  href={`#page-workflow-modifier-besoin&id=${besoin.id}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition"
                >
                  <FaPen /> Modifier le besoin
                </a>
              ) : null}
              {isDemandeur ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition"
                >
                  <FaTrashCan /> Supprimer
                </button>
              ) : null}
              <a
                href="#page-workflow-liste-besoin"
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
          title={BESOIN_DECISION_CONFIG.modalTitle(decision)}
          message={BESOIN_DECISION_CONFIG.modalMessage(besoin, decision)}
          actionLabel={deciding ? 'Enregistrement...' : (decision === 'valider' ? BESOIN_DECISION_CONFIG.validateLabel : BESOIN_DECISION_CONFIG.rejectLabel)}
          action={decision}
          onConfirm={handleDecision}
          onCancel={() => setDecision(null)}
        />
      ) : null}

      {confirmDelete ? (
        <ConfirmDelete
          title="Supprimer l'expression"
          message={`Voulez-vous vraiment supprimer l'expression de besoin « ${besoin.titre} » de ${besoin.demandeur} ? Cette action est irréversible.`}
          onConfirm={handleDelete}
          onCancel={() => !deleting && setConfirmDelete(false)}
        />
      ) : null}
    </main>
  );
};

export default DetailBesoin;
