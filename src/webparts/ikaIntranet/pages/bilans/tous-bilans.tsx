import * as React from 'react';
import { FaCalendarDay, FaFilePdf, FaMagnifyingGlass } from 'react-icons/fa6';
import { BILANS } from '../../services/bilans/data';

export const TousBilans: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const filtered = BILANS.filter((b) => {
    const q = search.toLowerCase();
    return b.period.toLowerCase().includes(q) || b.file.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q);
  });

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* En-tête de page */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" />
          <div className="relative">
            <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
              <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
              <span>/</span>
              <span className="text-ikaBlue">Bilans hebdomadaires</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Bilans hebdomadaires</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Retrouvez ici l&apos;ensemble des bilans d&apos;activité hebdomadaires d&apos;IKA SOLUTION.
            </p>

            {/* Recherche */}
            <div className="mt-6 relative max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un bilan..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
              />
              <FaMagnifyingGlass className="absolute left-3 top-3.5 text-slate-400 text-xs" />
            </div>
          </div>
        </div>

        {/* Liste des bilans */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun bilan ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((b) => (
              <a
                key={b.id}
                href={`#page-detail-bilan&id=${b.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg transition block"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                  <FaCalendarDay className="text-ikaBlue shrink-0" />
                  <span className="flex-1 group-hover:text-ikaBlue transition">{b.period}</span>
                </div>
                <div className="mt-3 flex items-center gap-2.5 border-t border-slate-100 pt-3">
                  <FaFilePdf className="text-rose-600 text-xl shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-ikaBlue transition">{b.file}</h3>
                    <p className="text-[10px] text-slate-400">{b.size}</p>
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

export default TousBilans;
