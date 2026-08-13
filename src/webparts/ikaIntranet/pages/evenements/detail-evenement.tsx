import * as React from 'react';
import {
  FaCalendarDays,
  FaLocationDot,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaChair,
  FaTag,
  FaRegCalendarPlus
} from 'react-icons/fa6';
import { EVENEMENTS, IEvenement } from '../../services/evenements/data';

const getEventIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

const EventCard = (props: { event: IEvenement }): React.ReactElement => {
  const { event } = props;
  return (
    <a
      href={`#page-detail-evenement&id=${event.id}`}
      className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaBlueDark backdrop-blur-sm">
          {event.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2">{event.title}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] font-semibold text-slate-500">
          <span className="flex items-center gap-1.5"><FaCalendarDays className={event.dateIcon} /> {event.date}</span>
          <span className="flex items-center gap-1.5"><FaLocationDot className={event.locationIcon} /> {event.location}</span>
        </div>
      </div>
    </a>
  );
};

export const DetailEvenement: React.FC = () => {
  const [eventId, setEventId] = React.useState<number>(getEventIdFromHash);

  React.useEffect(() => {
    const onHash = (): void => setEventId(getEventIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  const event = EVENEMENTS.find((e) => e.id === eventId) || EVENEMENTS[0];
  const idx = EVENEMENTS.findIndex((e) => e.id === event.id);
  const prev = EVENEMENTS[(idx - 1 + EVENEMENTS.length) % EVENEMENTS.length];
  const next = EVENEMENTS[(idx + 1) % EVENEMENTS.length];

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-tous-evenements" className="hover:text-ikaBlue transition">Tous les événements</a>
          <span>/</span>
          <span className="text-ikaBlue">{event.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
              <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-black uppercase tracking-wide text-ikaBlueDark backdrop-blur-sm flex items-center gap-1.5">
                <FaTag className="text-[10px]" /> {event.category}
              </span>
            </div>
            <div className="p-5 sm:p-8">
              <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark leading-snug">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaCalendarDays className={event.dateIcon} /> {event.date}
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaLocationDot className={event.locationIcon} /> {event.location}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <section>
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">À propos de l&apos;événement</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{event.longText}</p>
                </section>
                <section>
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Intervenant</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FaUser className="text-ikaBlue text-xs" /> {event.speaker}
                  </p>
                </section>
                <section>
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Capacité</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FaChair className="text-emerald-600 text-xs" /> {event.seats}
                  </p>
                </section>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition">
                  <FaRegCalendarPlus /> S&apos;inscrire à l&apos;événement
                </button>
                <a href="#page-tous-evenements" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir tous les événements
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres événements */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4">Autres événements</h2>
              <div className="grid grid-cols-1 gap-4">
                {EVENEMENTS.filter((e) => e.id !== event.id).map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-evenement&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{prev.title}</p>
              </a>
              <a href={`#page-detail-evenement&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaBlue transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaBlue line-clamp-2">{next.title}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-ikaBlue ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-tous-evenements" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaBlue bg-ikaSoft text-ikaBlue font-bold text-xs hover:bg-ikaBlue hover:text-white transition">
              <FaArrowRight /> Voir tous les événements
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailEvenement;
