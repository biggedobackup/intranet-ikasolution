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
  FaGavel
} from 'react-icons/fa6';
import { ABSENCES, IAbsence } from '../../../services/workflow/absences/data';
import { ABSENCE_DECISION_CONFIG, applyAbsenceDecision, DecisionAction } from '../../../services/workflow/absences/DecisionValidation';
import { DecisionModal } from '../../../components/DecisionModal';

const getAbsenceIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

const statusBadge = (status: IAbsence['statut']): React.ReactElement => {
  switch (status) {
    case 'Approuvé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1"><FaCircleCheck /> Approuvé</span>;
    case 'Refusé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 flex items-center gap-1"><FaCircleXmark /> Refusé</span>;
    case 'Annulé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 flex items-center gap-1"><FaCircleXmark /> Annulé</span>;
    default: return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1"><FaHourglassHalf /> En attente</span>;
  }
};

export const DetailAbsence: React.FC = () => {
  const [absence, setAbsence] = React.useState<IAbsence>(() => ABSENCES.find((a) => a.id === getAbsenceIdFromHash()) || ABSENCES[0]);
  const [decision, setDecision] = React.useState<DecisionAction | null>(null);

  React.useEffect(() => {
    const onHash = (): void => {
      const id = getAbsenceIdFromHash();
      setAbsence(ABSENCES.find((a) => a.id === id) || ABSENCES[0]);
      setDecision(null);
    };
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  const isEnAttente = absence.statut === 'En attente';

  const handleDecision = (comment: string, date: string): void => {
    if (!decision) return;
    setAbsence((prev) => applyAbsenceDecision(prev, decision, comment, date));
    setDecision(null);
  };

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-workflow-liste-absence" className="hover:text-ikaBlue transition">Signalements d&apos;absence</a>
          <span>/</span>
          <span className="text-ikaBlue">{absence.titre}</span>
        </nav>

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
                <p className="mt-1.5 text-sm font-bold text-slate-800">{absence.demandeur}</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><FaBriefcase className="text-ikaBlue" /> Type d&apos;absence</span>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{absence.type}</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4 bg-slate-50/60">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><FaCalendarDays className="text-ikaBlue" /> Période</span>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{absence.dateDebut} → {absence.dateFin}</p>
              </div>
            </div>

            <section>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Motif</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{absence.motif}</p>
            </section>

            {/* Décision */}
            {isEnAttente ? (
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
            ) : absence.decisionComment ? (
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
                  {absence.decisionDate && <span className="text-slate-400 font-normal"> — le {absence.decisionDate}</span>}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">{absence.decisionComment}</p>
              </div>
            ) : null}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>Créé le {absence.createdAt}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`#page-workflow-modifier-absence&id=${absence.id}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition"
              >
                <FaPen /> Modifier le signalement
              </a>
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

      {decision && (
        <DecisionModal
          title={ABSENCE_DECISION_CONFIG.modalTitle(decision)}
          message={ABSENCE_DECISION_CONFIG.modalMessage(absence, decision)}
          actionLabel={decision === 'valider' ? ABSENCE_DECISION_CONFIG.validateLabel : ABSENCE_DECISION_CONFIG.rejectLabel}
          action={decision}
          onConfirm={handleDecision}
          onCancel={() => setDecision(null)}
        />
      )}
    </main>
  );
};

export default DetailAbsence;
