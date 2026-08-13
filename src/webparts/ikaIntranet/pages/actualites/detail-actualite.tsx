import * as React from 'react';
import {
  FaClock,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaTag,
  FaNewspaper
} from 'react-icons/fa6';
import { ACTUALITES, IActualite } from '../../services/actualites/data';

const getActualiteIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

const ActualiteCard = (props: { actualite: IActualite }): React.ReactElement => {
  const { actualite } = props;
  return (
    <a
      href={`#page-detail-actualite&id=${actualite.id}`}
      className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
    >
      <div className="relative h-36 overflow-hidden">
        <img src={actualite.img} alt={actualite.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaRed backdrop-blur-sm">
          {actualite.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2">{actualite.title}</h3>
        <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-slate-400">
          <FaClock className="text-[10px]" /> {actualite.time}
        </div>
      </div>
    </a>
  );
};

export const DetailActualite: React.FC = () => {
  const [actualiteId, setActualiteId] = React.useState<number>(getActualiteIdFromHash);

  React.useEffect(() => {
    const onHash = (): void => setActualiteId(getActualiteIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  const actualite = ACTUALITES.find((a) => a.id === actualiteId) || ACTUALITES[0];
  const idx = ACTUALITES.findIndex((a) => a.id === actualite.id);
  const prev = ACTUALITES[(idx - 1 + ACTUALITES.length) % ACTUALITES.length];
  const next = ACTUALITES[(idx + 1) % ACTUALITES.length];

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-toutes-actualites" className="hover:text-ikaBlue transition">Toutes les actualités</a>
          <span>/</span>
          <span className="text-ikaRed">{actualite.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
              <img src={actualite.img} alt={actualite.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-black uppercase tracking-wide text-ikaRed backdrop-blur-sm flex items-center gap-1.5">
                <FaTag className="text-[10px]" /> {actualite.category}
              </span>
            </div>
            <div className="p-5 sm:p-8">
              <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark leading-snug">{actualite.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaClock className="text-ikaRed" /> {actualite.time}
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaUser className="text-ikaBlue" /> {actualite.author}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-sm leading-relaxed text-slate-600">{actualite.longText}</p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a href="#page-toutes-actualites" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir toutes les actualités
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres actualités */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaNewspaper className="text-ikaRed text-[11px]" /> Autres actualités
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {ACTUALITES.filter((a) => a.id !== actualite.id).map((a) => (
                  <ActualiteCard key={a.id} actualite={a} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-actualite&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaRed transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaRed line-clamp-2">{prev.title}</p>
              </a>
              <a href={`#page-detail-actualite&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaRed transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaRed line-clamp-2">{next.title}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-ikaRed ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-toutes-actualites" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaRed bg-red-50 text-ikaRed font-bold text-xs hover:bg-ikaRed hover:text-white transition">
              <FaArrowRight /> Voir toutes les actualités
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailActualite;
