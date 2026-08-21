import * as React from 'react';
import { FaCalendarDays, FaLocationDot, FaMagnifyingGlass } from 'react-icons/fa6';
import { loadEvenements, IEvenement } from '../../services/evenements/index';

export const TousEvenements: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [items, setItems] = React.useState<IEvenement[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!siteUrl) return;
    loadEvenements(siteUrl)
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteUrl]);

  const categories = ['all', ...Array.from(new Set(items.map((e) => e.category)))];

  const filtered = items.filter((e) => {
    const q = search.toLowerCase();
    const matchesSearch = e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.text.toLowerCase().includes(q);
    const matchesCat = category === 'all' || e.category === category;
    return matchesSearch && matchesCat;
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
              <span className="text-ikaBlue">Événements</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Tous les événements</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Retrouvez ici l&apos;ensemble des événements, séminaires, ateliers et moments de cohésion organisés par IKA SOLUTION.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un événement..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
                />
                <FaMagnifyingGlass className="absolute left-3 top-3.5 text-slate-400 text-xs" />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'all' ? 'Toutes les catégories' : c}</option>
                ))}
              </select>
              <span className="text-[11px] font-semibold text-slate-400">{filtered.length} événement(s)</span>
            </div>
          </div>
        </div>

        {/* Grille d'événements */}
        {loading ? (
          <div className="bg-white rounded-2xl p-16 shadow-sm border border-slate-200 text-center">
            <div className="spinner-border text-ikaBlue" role="status" />
            <p className="mt-3 text-sm text-slate-500">Chargement des événements...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun événement ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((e) => (
              <a
                key={e.id}
                href={`#page-detail-evenement&id=${e.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={e.img} alt={e.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark backdrop-blur-sm">
                    {e.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2">{e.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><FaCalendarDays className={e.dateIcon} /> {e.date}</span>
                    <span className="flex items-center gap-1.5"><FaLocationDot className={e.locationIcon} /> {e.location}</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{e.text}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default TousEvenements;
