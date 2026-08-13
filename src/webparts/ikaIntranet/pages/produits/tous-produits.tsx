import * as React from 'react';
import {
  FaCubes,
  FaCloud,
  FaChartLine,
  FaMobileScreenButton,
  FaHeadset,
  FaGraduationCap,
  FaMagnifyingGlass
} from 'react-icons/fa6';
import { PRODUITS } from '../../services/produits/data';

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

export const TousProduits: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');

  const categories = ['all', ...Array.from(new Set(PRODUITS.map((p) => p.category)))];

  const filtered = PRODUITS.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchesCat = category === 'all' || p.category === category;
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
              <span className="text-ikaBlue">Produits & Services</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Produits & Services</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Découvrez l&apos;ensemble des produits et services proposés par IKA SOLUTION.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un service..."
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
              <span className="text-[11px] font-semibold text-slate-400">{filtered.length} service(s)</span>
            </div>
          </div>
        </div>

        {/* Grille des services */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun service ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <a
                key={p.id}
                href={`#page-detail-produit&id=${p.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg transition block"
              >
                <div className="flex items-center justify-between">
                  <span className={`w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:bg-ikaSoft group-hover:border-ikaBlue transition ${p.iconCls}`}>
                    {produitIcon(p.icon)}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{p.category}</span>
                </div>
                <h3 className="mt-3 text-sm font-black text-slate-900 group-hover:text-ikaBlue transition">{p.name}</h3>
                <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{p.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default TousProduits;
