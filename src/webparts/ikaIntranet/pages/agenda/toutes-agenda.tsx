import * as React from 'react';
import { FaClock, FaLocationDot, FaMagnifyingGlass } from 'react-icons/fa6';
import { loadAgendas, IAgendaItem } from '../../services/agenda/index';

export const ToutesAgenda: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [items, setItems] = React.useState<IAgendaItem[]>([]);

  React.useEffect(() => {
    if (!siteUrl) return;
    loadAgendas(siteUrl)
      .then((data) => {
        setItems(data);
      })
      .catch(() => undefined);
  }, [siteUrl]);

  const categories = ['all', ...Array.from(new Set(items.map((a) => a.category)))];

  const filtered = items.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch = a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q) || a.text.toLowerCase().includes(q);
    const matchesCat = category === 'all' || a.category === category;
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
              <span className="text-ikaBlue">Agenda</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Agenda complet</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Retrouvez ici tous les rendez-vous, réunions, formations et échéances importantes d&apos;IKA SOLUTION.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un rendez-vous..."
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
              <span className="text-[11px] font-semibold text-slate-400">{filtered.length} rendez-vous</span>
            </div>
          </div>
        </div>

        {/* Liste des rendez-vous */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun rendez-vous ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((a) => (
              <a
                key={a.id}
                href={`#page-detail-agenda&id=${a.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
              >
                <div className="p-5 flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-xl ${a.bg} text-white flex flex-col items-center justify-center shrink-0 shadow-sm`}>
                    <span className="text-[10px] font-black uppercase">{a.month}</span>
                    <span className="text-xl font-black leading-none">{a.day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">{a.category}</span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2">{a.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5"><FaClock className="text-[10px]" /> {a.time}</span>
                      <span className="flex items-center gap-1.5"><FaLocationDot className="text-[10px]" /> {a.location}</span>
                    </div>
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

export default ToutesAgenda;
