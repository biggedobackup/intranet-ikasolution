import * as React from 'react';
import {
  FaCalendarDays,
  FaLocationDot,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaChair,
  FaTag,
  FaRegCalendarPlus,
  FaCircleCheck,
  FaComment,
  FaPaperPlane,
  FaXmark
} from 'react-icons/fa6';
import { loadEvenements, updateEvenementLikedBy, updateEvenementComments, IEvenement } from '../../services/evenements/index';
import { getCurrentUserEmail, getCurrentUserName, IComment } from '../../services/shared/index';

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
        <img src={event.img} alt={event.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />
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

export const DetailEvenement: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [eventId, setEventId] = React.useState<number>(getEventIdFromHash);
  const [items, setItems] = React.useState<IEvenement[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [likedBy, setLikedBy] = React.useState<string[]>([]);
  const [itemComments, setItemComments] = React.useState<IComment[]>([]);
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [commentModal, setCommentModal] = React.useState(false);
  const [commentInput, setCommentInput] = React.useState('');

  React.useEffect(() => {
    const onHash = (): void => setEventId(getEventIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    if (!siteUrl) return;
    loadEvenements(siteUrl)
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteUrl]);

  React.useEffect(() => {
    if (!siteUrl) return;
    getCurrentUserEmail(siteUrl).then(setUserEmail);
    getCurrentUserName(siteUrl).then(setUserName);
  }, [siteUrl]);

  const event = items.find((e) => e.id === eventId) || items[0];

  React.useEffect(() => {
    if (event) {
      setLikedBy(event.likedBy || []);
      setItemComments(event.comments || []);
    }
  }, [event]);

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-ikaBlue" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement des événements...</p>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <p className="text-sm text-slate-500 font-semibold">Aucun événement trouvé.</p>
          <a href="#page-tous-evenements" className="inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
            Voir tous les événements
          </a>
        </div>
      </main>
    );
  }

  const idx = items.findIndex((e) => e.id === event.id);
  const prev = items[(idx - 1 + items.length) % items.length];
  const next = items[(idx + 1) % items.length];
  const isJoined = userEmail !== '' && likedBy.indexOf(userEmail) !== -1;

  const toggleJoin = async (): Promise<void> => {
    if (!siteUrl || !userEmail) return;
    const newLikedBy = isJoined
      ? likedBy.filter((e) => e !== userEmail)
      : [...likedBy, userEmail];
    setLikedBy(newLikedBy);
    await updateEvenementLikedBy(siteUrl, event.id, newLikedBy);
  };

  const addComment = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const val = commentInput.trim();
    if (!val || !siteUrl || !userEmail) return;
    const newComment: IComment = {
      user: userName || 'Utilisateur',
      email: userEmail,
      text: val,
      date: new Date().toISOString()
    };
    const newComments = [...itemComments, newComment];
    setItemComments(newComments);
    setCommentInput('');
    setCommentModal(false);
    await updateEvenementComments(siteUrl, event.id, newComments);
  };

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
              <img src={event.img} alt={event.title} className="w-full h-full object-cover object-top" />
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

              <div className="mt-6 flex items-center gap-2">
                <button
                  onClick={toggleJoin}
                  className={`px-4 py-2 rounded-full border font-bold text-xs transition flex items-center gap-1.5 ${isJoined ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                >
                  <FaCircleCheck className={isJoined ? '' : 'text-xs'} /> Je participe ({likedBy.length})
                </button>
                <button
                  onClick={() => setCommentModal(true)}
                  className="px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs hover:bg-blue-100 transition flex items-center gap-1.5"
                >
                  <FaComment className="text-xs" /> {itemComments.length} Commentaires
                </button>
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
                {items.filter((e) => e.id !== event.id).map((e) => (
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

      {commentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative">
            <button onClick={() => setCommentModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">
              <FaXmark />
            </button>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-ikaBlue bg-opacity-10 text-ikaBlue flex items-center justify-center text-base"><FaCalendarDays /></span>
              <div>
                <h3 className="font-black text-slate-900 text-sm">Commenter</h3>
                <p className="text-xs text-slate-500">Laissez votre avis sur {event.title.toLowerCase()}</p>
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs">
              {itemComments.map((c, i) => {
                const isMe = c.email === userEmail;
                return (
                  <div key={i} className={`p-2 rounded-lg border ${isMe ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <span className="font-bold text-slate-900">{c.user} :</span>
                    <span className="text-slate-600"> {c.text}</span>
                  </div>
                );
              })}
              {itemComments.length === 0 && <p className="text-slate-400 text-center">Aucun commentaire pour le moment.</p>}
            </div>
            <form onSubmit={addComment} className="space-y-3">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                required
                rows={3}
                placeholder="Écrivez votre commentaire ici..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue"
              />
              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={() => setCommentModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 shadow transition flex items-center gap-1.5">
                  <span>Envoyer</span>
                  <FaPaperPlane className="text-xs" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default DetailEvenement;
