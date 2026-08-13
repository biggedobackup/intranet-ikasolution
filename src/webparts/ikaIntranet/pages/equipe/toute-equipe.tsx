import * as React from 'react';
import { FaMagnifyingGlass, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { MEMBRES, DEPT_COLORS } from '../../services/equipe/data';

export const TouteEquipe: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [dept, setDept] = React.useState('all');

  const departments = ['all', ...Array.from(new Set(MEMBRES.map((m) => m.dept)))];

  const filtered = MEMBRES.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(q) || m.phone.toLowerCase().includes(q) || m.ip.includes(q);
    const matchesDept = dept === 'all' || m.dept === dept;
    return matchesSearch && matchesDept;
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
              <span className="text-ikaBlue">Notre équipe</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Notre Équipe</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Découvrez les collaborateurs d&apos;IKA SOLUTION, répartis par département.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nom, Téléphone ou IP..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
                />
                <FaMagnifyingGlass className="absolute left-3 top-3.5 text-slate-400 text-xs" />
              </div>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d === 'all' ? 'Tous les départements' : d}</option>
                ))}
              </select>
              <span className="text-[11px] font-semibold text-slate-400">{filtered.length} collaborateur(s)</span>
            </div>
          </div>
        </div>

        {/* Grille des collaborateurs */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun collaborateur ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((m) => (
              <a
                key={m.id}
                href={`#page-detail-membre&id=${m.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
              >
                <div className="h-16 bg-gradient-to-r from-ikaBlueDark to-ikaBlue relative">
                  <img src={m.avatar} alt={m.name} className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl object-cover border-4 border-white shadow" />
                </div>
                <div className="pt-11 px-4 pb-4 text-center">
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-ikaBlue transition">{m.name}</h3>
                  <p className="text-[11px] font-bold text-ikaBlue mt-0.5">{m.role}</p>
                  <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${DEPT_COLORS[m.dept] || 'bg-slate-100 text-slate-700'}`}>
                    {m.dept}
                  </span>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><FaPhone className="text-emerald-500 text-[10px]" /> {m.phone}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                    <FaEnvelope className="text-[9px]" /> <span className="truncate">{m.email}</span>
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

export default TouteEquipe;
