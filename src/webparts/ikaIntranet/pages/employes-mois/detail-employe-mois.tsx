import * as React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCrown,
  FaHeart,
  FaComment,
  FaTrophy,
  FaCalendarDays
} from 'react-icons/fa6';
import { EMPLOYES_MOIS } from '../../services/employes-mois/data';

const getEmployeMoisIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

export const DetailEmployeMois: React.FC = () => {
  const [employeId, setEmployeId] = React.useState<number>(getEmployeMoisIdFromHash);

  React.useEffect(() => {
    const onHash = (): void => setEmployeId(getEmployeMoisIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  const employe = EMPLOYES_MOIS.find((e) => e.id === employeId) || EMPLOYES_MOIS[0];
  const idx = EMPLOYES_MOIS.findIndex((e) => e.id === employe.id);
  const prev = EMPLOYES_MOIS[(idx - 1 + EMPLOYES_MOIS.length) % EMPLOYES_MOIS.length];
  const next = EMPLOYES_MOIS[(idx + 1) % EMPLOYES_MOIS.length];

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-tous-employes-mois" className="hover:text-ikaBlue transition">Employés du mois</a>
          <span>/</span>
          <span className="text-amber-600">{employe.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-r from-amber-500 to-amber-400 flex flex-col items-center justify-center text-white p-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center">
                <FaTrophy className="text-3xl" />
              </div>
              <h1 className="mt-3 text-xl sm:text-2xl font-black">{employe.name}</h1>
              <span className="mt-2 px-3 py-1 rounded-full bg-white/90 text-[10px] font-black uppercase tracking-wide text-amber-700 flex items-center gap-1.5">
                <FaCrown className="text-[10px]" /> Employé du mois — {employe.month} {employe.year}
              </span>
            </div>
            <div className="p-6 sm:p-8 text-center">
              <img src={employe.photo} alt={employe.name} className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-amber-400 shadow-md" />
              <h2 className="mt-4 text-lg font-black text-ikaBlueDark">{employe.name}</h2>
              <p className="text-sm font-bold text-ikaBlue mt-0.5">{employe.role} — {employe.dept}</p>

              <div className="mt-5 mx-auto max-w-lg">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">Pourquoi lui / elle ?</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 italic border-l-2 border-amber-400 pl-3 text-left">
                  « {employe.quote} »
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="px-4 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs flex items-center gap-1.5">
                  <FaHeart /> {employe.likeCount}
                </span>
                <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs flex items-center gap-1.5">
                  <FaComment /> {employe.commentCount}
                </span>
              </div>

              <div className="mt-8">
                <a href="#page-tous-employes-mois" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir tous les employés du mois
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres lauréats */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaTrophy className="text-amber-500 text-[11px]" /> Autres lauréats
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {EMPLOYES_MOIS.filter((e) => e.id !== employe.id).map((e) => (
                  <a
                    key={e.id}
                    href={`#page-detail-employe-mois&id=${e.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition group"
                  >
                    <img src={e.photo} alt={e.name} className="w-11 h-11 rounded-full object-cover border border-amber-300 shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition">{e.name}</h3>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <FaCalendarDays className="text-[9px]" /> {e.month} {e.year}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-employe-mois&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2">{prev.name}</p>
              </a>
              <a href={`#page-detail-employe-mois&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2">{next.name}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-amber-600 ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-tous-employes-mois" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition">
              <FaArrowRight /> Voir tous les employés du mois
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailEmployeMois;
