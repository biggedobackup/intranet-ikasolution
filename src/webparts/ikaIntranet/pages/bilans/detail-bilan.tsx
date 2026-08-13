import * as React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaFilePdf,
  FaCalendarDay,
  FaCircleCheck,
  FaDownload,
  FaEye
} from 'react-icons/fa6';
import { BILANS } from '../../services/bilans/data';

const getBilanIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

export const DetailBilan: React.FC = () => {
  const [bilanId, setBilanId] = React.useState<number>(getBilanIdFromHash);

  React.useEffect(() => {
    const onHash = (): void => setBilanId(getBilanIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  const bilan = BILANS.find((b) => b.id === bilanId) || BILANS[0];
  const idx = BILANS.findIndex((b) => b.id === bilan.id);
  const prev = BILANS[(idx - 1 + BILANS.length) % BILANS.length];
  const next = BILANS[(idx + 1) % BILANS.length];

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-tous-bilans" className="hover:text-ikaBlue transition">Bilans hebdomadaires</a>
          <span>/</span>
          <span className="text-ikaBlue">{bilan.period}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-36 sm:h-40 overflow-hidden bg-gradient-to-r from-ikaBlueDark to-ikaBlue flex flex-col items-center justify-center text-white p-6">
              <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                <FaFilePdf className="text-3xl" />
              </div>
              <h1 className="mt-3 text-lg sm:text-xl font-black">Bilan hebdomadaire</h1>
              <span className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark">
                <FaCalendarDay className="text-[10px]" /> {bilan.period}
              </span>
            </div>
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaFilePdf className="text-rose-600 text-sm" /> {bilan.file}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400">{bilan.size}</span>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Résumé de la semaine</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{bilan.summary}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Points clés</h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {bilan.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <FaCircleCheck className="text-emerald-500 text-sm shrink-0" />
                      <span className="text-xs font-semibold text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a href="#pdf" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                  <FaDownload /> Télécharger le PDF
                </a>
                <a href="#pdf" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaEye /> Consulter en ligne
                </a>
                <a href="#page-tous-bilans" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Tous les bilans
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres bilans */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4">Autres bilans</h2>
              <div className="grid grid-cols-1 gap-3">
                {BILANS.filter((b) => b.id !== bilan.id).map((b) => (
                  <a
                    key={b.id}
                    href={`#page-detail-bilan&id=${b.id}`}
                    className="p-3 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group block"
                  >
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                      <FaCalendarDay className="text-ikaBlue shrink-0" />
                      <span className="flex-1 group-hover:text-ikaBlue transition">{b.period}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-400">
                      <FaFilePdf className="text-rose-500 text-xs shrink-0" />
                      <span className="truncate">{b.file}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-bilan&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{prev.period}</p>
              </a>
              <a href={`#page-detail-bilan&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{next.period}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-tous-bilans" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition">
              <FaArrowRight /> Voir tous les bilans
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailBilan;
