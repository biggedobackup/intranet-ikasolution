import * as React from 'react';
import {
  FaCakeCandles,
  FaHeart,
  FaPlaneDeparture,
  FaBullhorn
} from 'react-icons/fa6';
import { loadAnnonces, IAnnonce } from '../../services/annonces/index';

const typeBadge = (type: string): React.ReactElement => {
  switch (type) {
    case 'anniversaire': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase"><FaCakeCandles className="text-[10px]" /> Anniversaire</span>;
    case 'mariage': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold uppercase"><FaHeart className="text-[10px]" /> Mariage</span>;
    case 'absence': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-ikaBlue text-[10px] font-bold uppercase"><FaPlaneDeparture className="text-[10px]" /> Absence</span>;
    default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase"><FaBullhorn className="text-[10px]" /> Annonce</span>;
  }
};

export const ToutesAnnonces: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [filter, setFilter] = React.useState('all');
  const [annonces, setAnnonces] = React.useState<IAnnonce[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!siteUrl) {
      setLoading(false);
      return;
    }
    loadAnnonces(siteUrl)
      .then((data) => {
        setAnnonces(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteUrl]);

  const KNOWN_TYPES = ['anniversaire', 'mariage', 'naissance', 'absence'];
  const typeFilters: Array<[string, string]> = React.useMemo(() => {
    const result: Array<[string, string]> = [['all', 'Tous']];
    Array.from(new Set([...KNOWN_TYPES, ...annonces.map((a) => a.type)])).forEach((t) => {
      if (t) result.push([t, t.charAt(0).toUpperCase() + t.slice(1)]);
    });
    return result;
  }, [annonces]);

  const filtered = React.useMemo(
    () => annonces.filter((a) => filter === 'all' || a.type === filter),
    [annonces, filter]
  );

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-amber-600" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement des annonces...</p>
        </div>
      </main>
    );
  }

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
              <span className="text-amber-600">Annonces</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Annonces</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Toutes les annonces de la vie d&apos;équipe : anniversaires, mariages, naissances et absences.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-bold">
              {typeFilters.map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 rounded-full transition ${filter === type ? 'bg-ikaBlue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {label}
                </button>
              ))}
              <span className="text-[11px] font-semibold text-slate-400 ml-2">{filtered.length} annonce(s)</span>
            </div>
          </div>
        </div>

        {/* Liste des annonces */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucune annonce dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((a) => (
              <a
                key={a.id}
                href={`#page-detail-annonce&id=${a.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg transition block"
              >
                <div className="flex items-center justify-between">
                  {a.avatar ? <img src={a.avatar} alt="" className={`w-10 h-10 rounded-full object-cover ${a.badge}`} loading="lazy" />
                    : <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><FaBullhorn /></span>}
                  {typeBadge(a.type)}
                </div>
                <h3 className="mt-3 text-sm font-black text-slate-900 group-hover:text-amber-600 transition">{a.title}</h3>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{a.time}</p>
                <p className="mt-2 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{a.text}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ToutesAnnonces;
