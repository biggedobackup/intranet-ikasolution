import * as React from 'react';
import { FaCrown, FaTrophy, FaHeart, FaComment } from 'react-icons/fa6';
import { loadEmployesMois, IEmployeMois } from '../../services/employes-mois/index';

export const TousEmployesMois: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [employes, setEmployes] = React.useState<IEmployeMois[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!siteUrl) {
      setLoading(false);
      return;
    }
    loadEmployesMois(siteUrl)
      .then((data) => {
        setEmployes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[TousEmployesMois] Erreur :', err);
        setLoading(false);
      });
  }, [siteUrl]);

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* En-tête de page */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-50 rounded-full opacity-70" />
          <div className="relative">
            <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
              <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
              <span>/</span>
              <span className="text-amber-600">Employés du mois</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark flex items-center gap-2">
              <FaTrophy className="text-amber-500 text-2xl" /> Employés du mois
            </h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Les collaborateurs d&apos;IKA SOLUTION distingués chaque mois pour leur engagement et leurs contributions.
            </p>
          </div>
        </div>

        {/* Grille des lauréats */}
        {loading ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-400 font-semibold">Chargement...</p>
          </div>
        ) : employes.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun lauréat pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {employes.map((e) => (
              <a
                key={e.id}
                href={`#page-detail-employe-mois&id=${e.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
              >
                <div className="relative h-14 bg-gradient-to-r from-amber-500 to-amber-400">
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/90 text-[9px] font-black uppercase tracking-wide text-amber-700 flex items-center gap-1">
                    <FaCrown className="text-[9px]" /> {e.month} {e.year}
                  </span>
                  <img src={e.photo} alt={e.name} className="absolute -bottom-9 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full object-cover border-4 border-white shadow" />
                </div>
                <div className="pt-12 px-4 pb-4 text-center">
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-600 transition">{e.name}</h3>
                  <p className="text-[11px] font-bold text-ikaBlue mt-0.5">{e.role} — {e.dept}</p>
                  <p className="mt-2 text-[11px] text-slate-500 italic line-clamp-4 leading-snug">« {e.quote} »</p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] font-bold">
                    <span className="px-2.5 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-600 flex items-center gap-1"><FaHeart className="text-[10px]" /> {(e.likedBy || []).length}</span>
                    <span className="px-2.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue flex items-center gap-1"><FaComment className="text-[10px]" /> {(e.comments || []).length}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default TousEmployesMois;
