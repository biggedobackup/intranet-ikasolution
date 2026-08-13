import * as React from 'react';
import {
  FaCubes,
  FaCloud,
  FaChartLine,
  FaMobileScreenButton,
  FaHeadset,
  FaGraduationCap,
  FaArrowLeft,
  FaArrowRight,
  FaCircleCheck,
  FaTag,
  FaLayerGroup
} from 'react-icons/fa6';
import { PRODUITS } from '../../services/produits/data';

const getProduitIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

const produitIcon = (name: string): React.ReactNode => {
  switch (name) {
    case 'cubes': return <FaCubes />;
    case 'cloud': return <FaCloud />;
    case 'chart-line': return <FaChartLine />;
    case 'mobile-screen-button': return <FaMobileScreenButton />;
    case 'headset': return <FaHeadset />;
    case 'graduation-cap': return <FaGraduationCap />;
    default: return <FaCubes />;
  }
};

export const DetailProduit: React.FC = () => {
  const [produitId, setProduitId] = React.useState<number>(getProduitIdFromHash);

  React.useEffect(() => {
    const onHash = (): void => setProduitId(getProduitIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  const produit = PRODUITS.find((p) => p.id === produitId) || PRODUITS[0];
  const idx = PRODUITS.findIndex((p) => p.id === produit.id);
  const prev = PRODUITS[(idx - 1 + PRODUITS.length) % PRODUITS.length];
  const next = PRODUITS[(idx + 1) % PRODUITS.length];

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
              <div className="w-20 h-20 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-3xl">
                <span className={produit.iconCls}>{produitIcon(produit.icon)}</span>
              </div>
              <h1 className="mt-3 text-xl sm:text-2xl font-black">{produit.name}</h1>
              <span className="mt-2 px-3 py-1 rounded-full bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark flex items-center gap-1.5">
                <FaTag className="text-[10px]" /> {produit.category}
              </span>
            </div>
            <div className="p-5 sm:p-8">
              <div className="mt-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Présentation</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{produit.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Points forts</h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {produit.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <FaCircleCheck className="text-emerald-500 text-sm shrink-0" />
                      <span className="text-xs font-semibold text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <a href="#page-tous-produits" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir tous les services
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres services */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaLayerGroup className="text-ikaBlue text-[11px]" /> Autres services
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {PRODUITS.filter((p) => p.id !== produit.id).map((p) => (
                  <a
                    key={p.id}
                    href={`#page-detail-produit&id=${p.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group"
                  >
                    <span className={`w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center ${p.iconCls}`}>
                      {produitIcon(p.icon)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition">{p.name}</h3>
                      <p className="text-[10px] text-slate-400">{p.category}</p>
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
              <FaArrowRight /> Voir tous les services
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailProduit;
