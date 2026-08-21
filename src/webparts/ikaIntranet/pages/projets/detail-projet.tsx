import * as React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarDays,
  FaUser,
  FaUsers,
  FaDiagramProject
} from 'react-icons/fa6';
import { loadProjets, IProjet } from '../../services/projets/index';

const getProjetIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

export const DetailProjet: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [projetId, setProjetId] = React.useState<number>(getProjetIdFromHash);
  const [projets, setProjets] = React.useState<IProjet[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const onHash = (): void => setProjetId(getProjetIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

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

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-ikaBlue" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement du projet...</p>
        </div>
      </main>
    );
  }

  const projet = projets.find((p) => p.id === projetId) || projets[0];
  if (!projet) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <p className="text-sm text-slate-500 font-semibold">Projet introuvable.</p>
          <a href="#page-tous-projets" className="inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
            Voir tous les projets
          </a>
        </div>
      </main>
    );
  }
  const idx = projets.findIndex((p) => p.id === projet.id);
  const prev = projets[(idx - 1 + projets.length) % projets.length];
  const next = projets[(idx + 1) % projets.length];

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-tous-projets" className="hover:text-ikaBlue transition">Tous les projets</a>
          <span>/</span>
          <span className="text-ikaBlue">{projet.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-r from-ikaBlueDark to-ikaBlue flex flex-col items-center justify-center text-white p-6">
              <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                <FaDiagramProject className="text-3xl text-white/90" />
              </div>
              <h1 className="mt-3 text-xl sm:text-2xl font-black">{projet.name}</h1>
              <span className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold ${projet.cls}`}>{projet.status}</span>
            </div>
            <div className="p-5 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaCalendarDays className="text-ikaBlue" /> Début : {projet.start}
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaCalendarDays className="text-ikaBlue" /> Fin : {projet.end}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <section>
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Description du projet</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{projet.description}</p>
                </section>
                <section>
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Client</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FaUser className="text-ikaBlue text-xs" /> {projet.client}
                  </p>
                </section>
                <section>
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Responsable</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FaUsers className="text-emerald-600 text-xs" /> {projet.responsable}
                  </p>
                </section>
              </div>

              <div className="mt-8">
                <a href="#page-tous-projets" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir tous les projets
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres projets */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaDiagramProject className="text-ikaBlue text-[11px]" /> Autres projets
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {projets.filter((p) => p.id !== projet.id).map((p) => (
                  <a
                    key={p.id}
                    href={`#page-detail-projet&id=${p.id}`}
                    className="p-3 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group block"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition">{p.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${p.cls}`}>{p.status}</span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500">{p.start} → {p.end}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-projet&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{prev.name}</p>
              </a>
              <a href={`#page-detail-projet&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{next.name}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-tous-projets" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition">
              <FaArrowRight /> Voir tous les projets
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailProjet;
