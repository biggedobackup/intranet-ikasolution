import * as React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { loadProjets, IProjet } from '../../services/projets/index';

export const TousProjets: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('all');
  const [projets, setProjets] = React.useState<IProjet[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!siteUrl) {
      setLoading(false);
      return;
    }
    loadProjets(siteUrl)
      .then((data) => {
        setProjets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteUrl]);

  const statuses = ['all', ...Array.from(new Set(projets.map((p) => p.status)))];

  const filtered = projets.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchesStatus = status === 'all' || p.status === status;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-ikaBlue" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement des projets...</p>
        </div>
      </main>
    );
  }

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
              <span className="text-ikaBlue">Projets</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Tous les projets</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Suivez l&apos;avancement des projets menés par IKA SOLUTION pour ses clients et en interne.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un projet..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
                />
                <FaMagnifyingGlass className="absolute left-3 top-3.5 text-slate-400 text-xs" />
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s === 'all' ? 'Tous les statuts' : s}</option>
                ))}
              </select>
              <span className="text-[11px] font-semibold text-slate-400">{filtered.length} projet(s)</span>
            </div>
          </div>
        </div>

        {/* Tableau des projets */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun projet ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">Projet</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Début</th>
                    <th className="py-3 px-4">Fin</th>
                    <th className="py-3 px-4">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition cursor-pointer">
                      <td className="py-3 px-4">
                        <a href={`#page-detail-projet&id=${p.id}`} className="font-black text-slate-900 hover:text-ikaBlue transition">
                          {p.name}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{p.client}</td>
                      <td className="py-3 px-4 text-slate-500">{p.start}</td>
                      <td className="py-3 px-4 text-slate-500">{p.end}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.cls}`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TousProjets;
