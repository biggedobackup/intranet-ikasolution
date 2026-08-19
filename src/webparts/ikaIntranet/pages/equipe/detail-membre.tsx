import * as React from 'react';
import {
  FaArrowLeft,
  FaMobileScreen,
  FaPhone,
  FaEnvelope,
  FaUsers,
  FaBriefcase
} from 'react-icons/fa6';
import { loadMembres, IMembre, DEPT_COLORS } from '../../services/equipe/index';

const getMembreIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

export const DetailMembre: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [membreId, setMembreId] = React.useState<number>(getMembreIdFromHash);
  const [membres, setMembres] = React.useState<IMembre[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const onHash = (): void => setMembreId(getMembreIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    if (!siteUrl) {
      setLoading(false);
      return;
    }
    loadMembres(siteUrl)
      .then((data) => {
        setMembres(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteUrl]);

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-ikaBlue" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement de la fiche membre...</p>
        </div>
      </main>
    );
  }

  const membre = membres.find((m) => m.id === membreId) || membres[0];
  if (!membre) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <p className="text-sm text-slate-500 font-semibold">Membre introuvable.</p>
          <a href="#page-toute-equipe" className="inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
            Voir toute l&apos;équipe
          </a>
        </div>
      </main>
    );
  }
  const colleagues = membres.filter((m) => m.id !== membre.id && m.dept === membre.dept);

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-toute-equipe" className="hover:text-ikaBlue transition">Notre équipe</a>
          <span>/</span>
          <span className="text-ikaBlue">{membre.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-ikaBlueDark to-ikaBlue relative">
              <div className="absolute -bottom-12 left-6 sm:left-8">
                <img src={membre.avatar} alt={membre.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg" />
              </div>
            </div>
            <div className="pt-16 px-6 sm:px-8 pb-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">{membre.name}</h1>
                  <p className="text-sm font-bold text-ikaBlue mt-0.5 flex items-center gap-1.5">
                    <FaBriefcase className="text-xs" /> {membre.role}
                  </p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${DEPT_COLORS[membre.dept] || 'bg-slate-100 text-slate-700'}`}>
                    {membre.dept}
                  </span>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${membre.phone.replace(/\s/g, '')}`} className="py-2 px-3 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center gap-1.5 shadow">
                    <FaPhone /> Appeler
                  </a>
                  <a href={`mailto:${membre.email}`} className="py-2 px-3 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 transition flex items-center gap-1.5 shadow">
                    <FaEnvelope /> E-mail
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Biographie</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{membre.bio}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0"><FaMobileScreen className="text-sm" /></span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Téléphone Mobile</p>
                    <a href={`tel:${membre.phone.replace(/\s/g, '')}`} className="font-bold text-slate-800 hover:text-ikaBlue transition">{membre.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0"><FaEnvelope className="text-sm" /></span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Email</p>
                    <span className="font-semibold text-slate-700">{membre.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a href="#page-toute-equipe" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir toute l&apos;équipe
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : collègues du département */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaUsers className="text-ikaBlue text-[11px]" /> Collègues — {membre.dept}
              </h2>
              {colleagues.length === 0 ? (
                <p className="text-xs text-slate-400 font-semibold">Aucun collègue dans ce département.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {colleagues.map((c) => (
                    <a
                      key={c.id}
                      href={`#page-detail-membre&id=${c.id}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-ikaBlue hover:bg-slate-50 transition group"
                    >
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-slate-300 shrink-0" />
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition truncate">{c.name}</h3>
                        <p className="text-[11px] text-slate-500 truncate">{c.role}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailMembre;
