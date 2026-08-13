import * as React from 'react';
import { FaImages, FaExpand, FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { GALERIE } from '../../services/galerie/data';

export const TouteGalerie: React.FC = () => {
  const [category, setCategory] = React.useState('all');
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  const categories = ['all', ...Array.from(new Set(GALERIE.map((g) => g.category)))];

  const filtered = GALERIE.filter((g) => category === 'all' || g.category === category);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (lightbox === null) return;
      if (e.key === 'ArrowLeft') setLightbox((lightbox + filtered.length - 1) % filtered.length);
      if (e.key === 'ArrowRight') setLightbox((lightbox + 1) % filtered.length);
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return (): void => window.removeEventListener('keydown', onKey);
  }, [lightbox, filtered.length]);

  React.useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return (): void => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* En-tête de page */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-purple-50 rounded-full opacity-70" />
          <div className="relative">
            <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
              <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
              <span>/</span>
              <span className="text-purple-600">Galerie</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark flex items-center gap-2">
              <FaImages className="text-purple-500 text-2xl" /> Galerie Moments d&apos;Équipe
            </h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Tous les moments forts de la vie d&apos;IKA SOLUTION en images.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-bold">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full transition ${category === c ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {c === 'all' ? 'Toutes' : c}
                </button>
              ))}
              <span className="text-[11px] font-semibold text-slate-400 ml-2">{filtered.length} photo(s)</span>
            </div>
          </div>
        </div>

        {/* Grille de photos */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucune photo dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((g, i) => (
              <button
                key={g.id}
                onClick={() => setLightbox(i)}
                className="group relative rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer shadow"
              >
                <img src={g.src} alt={g.caption} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-white">{g.caption}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="bg-white/20 backdrop-blur-sm rounded-full p-2"><FaExpand className="text-white text-sm" /></span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
        >
          <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-6 z-10">
            <span className="text-white/70 text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full">{lightbox + 1} / {filtered.length}</span>
            <button onClick={() => setLightbox(null)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20">
              <FaXmark />
            </button>
          </div>
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            <button onClick={() => setLightbox((lightbox + filtered.length - 1) % filtered.length)} className="absolute left-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition -translate-x-2">
              <FaChevronLeft />
            </button>
            <img src={filtered[lightbox].src} alt="" className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" />
            <button onClick={() => setLightbox((lightbox + 1) % filtered.length)} className="absolute right-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition translate-x-2">
              <FaChevronRight />
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-white font-bold text-sm">{filtered[lightbox].caption}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default TouteGalerie;