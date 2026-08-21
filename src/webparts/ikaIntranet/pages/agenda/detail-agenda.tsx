import * as React from 'react';
import {
  FaClock,
  FaLocationDot,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaTag,
  FaCalendarDays
} from 'react-icons/fa6';
import { loadAgendas, IAgendaItem } from '../../services/agenda/index';

const getAgendaIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

const AgendaCard = (props: { item: IAgendaItem }): React.ReactElement => {
  const { item } = props;
  return (
    <a
      href={`#page-detail-agenda&id=${item.id}`}
      className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
    >
      <div className="p-4 flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl ${item.bg} text-white flex flex-col items-center justify-center shrink-0 shadow-sm`}>
          <span className="text-[9px] font-black uppercase">{item.month}</span>
          <span className="text-sm font-bold leading-none">{item.day}</span>
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase text-slate-400">{item.category}</span>
          <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2">{item.title}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-slate-500">
            <FaClock className="text-[10px]" /> {item.time}
          </div>
        </div>
      </div>
    </a>
  );
};

export const DetailAgenda: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [agendaId, setAgendaId] = React.useState<number>(getAgendaIdFromHash);
  const [items, setItems] = React.useState<IAgendaItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const onHash = (): void => setAgendaId(getAgendaIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    if (!siteUrl) return;
    loadAgendas(siteUrl)
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteUrl]);

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement de l&apos;agenda...</p>
        </div>
      </main>
    );
  }

  const item = items.find((a) => a.id === agendaId) || items[0];
  if (!item) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <p className="text-sm text-slate-500 font-semibold">Aucun rendez-vous trouvé.</p>
          <a href="#page-toutes-agenda" className="inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
            Voir l&apos;agenda complet
          </a>
        </div>
      </main>
    );
  }
  const idx = items.findIndex((a) => a.id === item.id);
  const prev = items[(idx - 1 + items.length) % items.length];
  const next = items[(idx + 1) % items.length];

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-toutes-agenda" className="hover:text-ikaBlue transition">Agenda complet</a>
          <span>/</span>
          <span className="text-ikaBlue">{item.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-48 sm:h-56 overflow-hidden bg-ikaBlueDark flex flex-col items-center justify-center text-white">
              <div className={`w-20 h-20 rounded-2xl ${item.bg} text-white flex flex-col items-center justify-center shadow-lg`}>
                <span className="text-sm font-black uppercase">{item.month}</span>
                <span className="text-3xl font-black leading-none">{item.day}</span>
              </div>
              <span className="mt-4 px-3 py-1 rounded-lg bg-white/90 text-[11px] font-black uppercase tracking-wide text-ikaBlueDark flex items-center gap-1.5">
                <FaTag className="text-[10px]" /> {item.category}
              </span>
            </div>
            <div className="p-5 sm:p-8">
              <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark leading-snug">{item.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaCalendarDays className="text-ikaBlue" /> {item.month} {item.day}
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaClock className="text-ikaBlue" /> {item.time}
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaLocationDot className="text-ikaBlue" /> {item.location}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <section>
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">À propos de cet événement</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </section>
                <section>
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Organisateur</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FaUser className="text-ikaBlue text-xs" /> {item.organizer}
                  </p>
                </section>
              </div>

              <div className="mt-8">
                <a href="#page-toutes-agenda" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir l&apos;agenda complet
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres entrées agenda */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaCalendarDays className="text-ikaBlue text-[11px]" /> Prochains rendez-vous
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {items.filter((a) => a.id !== item.id).slice(0, 4).map((a) => (
                  <AgendaCard key={a.id} item={a} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-agenda&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{prev.title}</p>
              </a>
              <a href={`#page-detail-agenda&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{next.title}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-toutes-agenda" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition">
              <FaArrowRight /> Voir l&apos;agenda complet
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailAgenda;
