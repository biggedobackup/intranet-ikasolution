import * as React from 'react';
import { FaClock, FaMagnifyingGlass } from 'react-icons/fa6';
import { ACTUALITES } from '../../services/actualites/data';

export const ToutesActualites: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');

  const categories = ['all', ...Array.from(new Set(ACTUALITES.map((a) => a.category)))];

  const filtered = ACTUALITES.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch = a.title.toLowerCase().includes(q) || a.text.toLowerCase().includes(q);
    const matchesCat = category === 'all' || a.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* En-tête de page */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-red-50 rounded-full opacity-70" />
          <div className="relative">
            <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
              <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
              <span>/</span>
              <span className="text-ikaRed">Actualités</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Toutes les actualités</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Retrouvez ici toute l&apos;actualité de la vie d&apos;IKA SOLUTION : projets, événements, nouveautés et vie de l&apos;équipe.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher une actualité..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaRed bg-white shadow-sm"
                />
                <FaMagnifyingGlass className="absolute left-3 top-3.5 text-slate-400 text-xs" />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaRed bg-white shadow-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'all' ? 'Toutes les catégories' : c}</option>
                ))}
              </select>
              <span className="text-[11px] font-semibold text-slate-400">{filtered.length} actualité(s)</span>
            </div>
          </div>
        </div>

        {/* Grille d'actualités */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucune actualité ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((a) => (
              <a
                key={a.id}
                href={`#page-detail-actualite&id=${a.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaRed backdrop-blur-sm">
                    {a.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2">{a.title}</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-slate-400">
                    <FaClock className="text-[10px]" /> {a.time}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{a.text}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ToutesActualites;
