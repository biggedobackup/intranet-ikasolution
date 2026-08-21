import * as React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaLayerGroup
} from 'react-icons/fa6';
import { loadProduits, IProduit } from '../../services/produits/index';

const getProduitIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

export const DetailProduit: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [produitId, setProduitId] = React.useState<number>(getProduitIdFromHash);
  const [produits, setProduits] = React.useState<IProduit[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const onHash = (): void => setProduitId(getProduitIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    if (!siteUrl) {
      setLoading(false);
      return;
    }
    loadProduits(siteUrl)
      .then((data) => {
        setProduits(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteUrl]);

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-ikaBlue" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement du produit...</p>
        </div>
      </main>
    );
  }

  const produit = produits.find((p) => p.id === produitId) || produits[0];
  if (!produit) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <p className="text-sm text-slate-500 font-semibold">Produit introuvable.</p>
          <a href="#page-tous-produits" className="inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
            Voir tous les produits
          </a>
        </div>
      </main>
    );
  }
  const idx = produits.findIndex((p) => p.id === produit.id);
  const prev = produits[(idx - 1 + produits.length) % produits.length];
  const next = produits[(idx + 1) % produits.length];

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-tous-produits" className="hover:text-ikaBlue transition">Produits & Services</a>
          <span>/</span>
          <span className="text-ikaBlue">{produit.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-r from-ikaBlueDark to-ikaBlue flex flex-col items-center justify-center text-white p-6">
              <div className="w-20 h-20 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center overflow-hidden">
                <img src={produit.logo} alt={produit.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h1 className="mt-3 text-xl sm:text-2xl font-black">{produit.name}</h1>
            </div>
            <div className="p-5 sm:p-8">
              <div className="mt-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Présentation</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{produit.description}</p>
              </div>

              <div className="mt-8">
                <a href="#page-tous-produits" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir tous les produits
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres services */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaLayerGroup className="text-ikaBlue text-[11px]" /> Autres produits
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {produits.filter((p) => p.id !== produit.id).map((p) => (
                  <a
                    key={p.id}
                    href={`#page-detail-produit&id=${p.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={p.logo} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition">{p.name}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-produit&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{prev.name}</p>
              </a>
              <a href={`#page-detail-produit&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{next.name}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-tous-produits" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition">
              <FaArrowRight /> Voir tous les produits
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailProduit;
