import * as React from 'react';
import { FaImages, FaExpand, FaXmark, FaChevronLeft, FaChevronRight, FaFolder, FaArrowLeft } from 'react-icons/fa6';
import { loadGalerieFolders, loadGalerieImages, getGalerieRootFolder, IGalerieFolder, IGalerieImage } from '../../services/galerie/index';

export const TouteGalerie: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [folders, setFolders] = React.useState<IGalerieFolder[]>([]);
  const [loadingFolders, setLoadingFolders] = React.useState(true);
  const [currentFolder, setCurrentFolder] = React.useState<IGalerieFolder | null>(null);
  const [images, setImages] = React.useState<IGalerieImage[]>([]);
  const [loadingImages, setLoadingImages] = React.useState(false);
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!siteUrl) {
      setLoadingFolders(false);
      return;
    }
    getGalerieRootFolder(siteUrl)
      .then((rootUrl) => loadGalerieFolders(siteUrl, rootUrl))
      .then((f) => {
        setFolders(f);
        setLoadingFolders(false);
      })
      .catch((err) => {
        console.error('[TouteGalerie] Dossiers :', err);
        setLoadingFolders(false);
      });
  }, [siteUrl]);

  const openFolder = (folder: IGalerieFolder): void => {
    if (!siteUrl) return;
    setCurrentFolder(folder);
    setLoadingImages(true);
    setImages([]);
    loadGalerieImages(siteUrl, folder.serverRelativeUrl)
      .then((imgs) => {
        setImages(imgs);
        setLoadingImages(false);
      })
      .catch((err) => {
        console.error('[TouteGalerie] Images :', err);
        setLoadingImages(false);
      });
  };

  const goBack = (): void => {
    setCurrentFolder(null);
    setImages([]);
    setLightbox(null);
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (lightbox === null) return;
      if (e.key === 'ArrowLeft') setLightbox((lightbox + images.length - 1) % images.length);
      if (e.key === 'ArrowRight') setLightbox((lightbox + 1) % images.length);
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return (): void => window.removeEventListener('keydown', onKey);
  }, [lightbox, images.length]);

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
              {currentFolder
                ? `Images du dossier « ${currentFolder.name} ». Cliquez sur une photo pour l&apos;afficher.`
                : 'Tous les moments forts de la vie d&apos;IKA SOLUTION en images. Ouvrez un dossier pour découvrir ses photos.'}
            </p>

            {/* Fil d'ariane / compteur */}
            {!loadingFolders && !currentFolder && (
              <span className="inline-block mt-4 text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                {folders.length} dossier(s)
              </span>
            )}
          </div>
        </div>

        {/* Contenu : liste des dossiers */}
        {!currentFolder && (
          loadingFolders ? (
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
              <p className="text-sm text-slate-400 font-semibold">Chargement...</p>
            </div>
          ) : folders.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
              <p className="text-sm text-slate-500 font-semibold">Aucun dossier pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {folders.map((f) => (
                <button
                  key={f.serverRelativeUrl}
                  onClick={() => openFolder(f)}
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg transition flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                    <FaFolder />
                  </div>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-purple-600 text-center line-clamp-2">{f.name}</span>
                  {f.itemCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">{f.itemCount}</span>
                  )}
                </button>
              ))}
            </div>
          )
        )}

        {/* Contenu : images du dossier */}
        {currentFolder && (
          <>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={goBack}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition text-xs font-bold flex items-center gap-1.5"
              >
                <FaArrowLeft className="text-[10px]" /> Tous les dossiers
              </button>
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <FaFolder className="text-purple-500" /> {currentFolder.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">{images.length} photo(s)</span>
            </div>

            {loadingImages ? (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
                <p className="text-sm text-slate-400 font-semibold">Chargement des images...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
                <p className="text-sm text-slate-500 font-semibold">Aucune image dans ce dossier.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {images.map((g, i) => (
                  <button
                    key={g.id}
                    onClick={() => setLightbox(i)}
                    className="group relative rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer shadow"
                  >
                    <img src={g.url} alt={g.title} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-white">{g.title}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <span className="bg-white/20 backdrop-blur-sm rounded-full p-2"><FaExpand className="text-white text-sm" /></span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
        >
          <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-6 z-10">
            <span className="text-white/70 text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full">{lightbox + 1} / {images.length}</span>
            <button onClick={() => setLightbox(null)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20">
              <FaXmark />
            </button>
          </div>
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            <button onClick={() => setLightbox((lightbox + images.length - 1) % images.length)} className="absolute left-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition -translate-x-2">
              <FaChevronLeft />
            </button>
            <img src={images[lightbox].url} alt="" className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" />
            <button onClick={() => setLightbox((lightbox + 1) % images.length)} className="absolute right-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition translate-x-2">
              <FaChevronRight />
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-white font-bold text-sm">{images[lightbox].title}</p>
            {images[lightbox].description && (
              <p className="text-white/60 text-xs mt-1 max-w-xl">{images[lightbox].description}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default TouteGalerie;