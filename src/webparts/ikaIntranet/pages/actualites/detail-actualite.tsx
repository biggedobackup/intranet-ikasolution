import * as React from 'react';
import {
  FaClock,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaTag,
  FaNewspaper,
  FaHeart,
  FaComment,
  FaPaperPlane,
  FaXmark
} from 'react-icons/fa6';
import { loadActualites, updateActualiteLikedBy, updateActualiteComments, IActualite } from '../../services/actualites/index';
import { getCurrentUserEmail, getCurrentUserName, IComment } from '../../services/shared/index';

const getActualiteIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

const ActualiteCard = (props: { actualite: IActualite }): React.ReactElement => {
  const { actualite } = props;
  return (
    <a
      href={`#page-detail-actualite&id=${actualite.id}`}
      className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition block"
    >
      <div className="relative h-36 overflow-hidden">
        <img src={actualite.img} alt={actualite.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" loading="lazy" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[10px] font-black uppercase tracking-wide text-ikaRed backdrop-blur-sm">
          {actualite.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-ikaBlue transition line-clamp-2">{actualite.title}</h3>
        <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-slate-400">
          <FaClock className="text-[10px]" /> {actualite.time}
        </div>
      </div>
    </a>
  );
};

export const DetailActualite: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [actualiteId, setActualiteId] = React.useState<number>(getActualiteIdFromHash);
  const [items, setItems] = React.useState<IActualite[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [likedBy, setLikedBy] = React.useState<string[]>([]);
  const [itemComments, setItemComments] = React.useState<IComment[]>([]);
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [commentModal, setCommentModal] = React.useState(false);
  const [commentInput, setCommentInput] = React.useState('');

  React.useEffect(() => {
    const onHash = (): void => setActualiteId(getActualiteIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    if (!siteUrl) return;
    loadActualites(siteUrl)
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteUrl]);

  React.useEffect(() => {
    if (!siteUrl) return;
    getCurrentUserEmail(siteUrl)
      .then(setUserEmail)
      .catch((err) => {
        console.error('[DetailActualite] Email courant :', err);
      });
    getCurrentUserName(siteUrl)
      .then(setUserName)
      .catch((err) => {
        console.error('[DetailActualite] Nom courant :', err);
      });
  }, [siteUrl]);

  const actualite = items.find((a) => a.id === actualiteId) || items[0];

  React.useEffect(() => {
    if (actualite) {
      setLikedBy(actualite.likedBy || []);
      setItemComments(actualite.comments || []);
    }
  }, [actualite]);

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-ikaRed" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement des actualités...</p>
        </div>
      </main>
    );
  }

  if (!actualite) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <p className="text-sm text-slate-500 font-semibold">Aucune actualité trouvée.</p>
          <a href="#page-toutes-actualites" className="inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
            Voir toutes les actualités
          </a>
        </div>
      </main>
    );
  }

  const idx = items.findIndex((a) => a.id === actualite.id);
  const prev = items[(idx - 1 + items.length) % items.length];
  const next = items[(idx + 1) % items.length];
  const isLiked = userEmail !== '' && likedBy.indexOf(userEmail) !== -1;

  const toggleLike = async (): Promise<void> => {
    if (!siteUrl || !userEmail) return;
    const newLikedBy = isLiked
      ? likedBy.filter((e) => e !== userEmail)
      : [...likedBy, userEmail];
    setLikedBy(newLikedBy);
    await updateActualiteLikedBy(siteUrl, actualite.id, newLikedBy);
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
    await updateActualiteComments(siteUrl, actualite.id, newComments);
  };

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-toutes-actualites" className="hover:text-ikaBlue transition">Toutes les actualités</a>
          <span>/</span>
          <span className="text-ikaRed">{actualite.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
              <img src={actualite.img} alt={actualite.title} className="w-full h-full object-cover object-top" loading="lazy" />
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-black uppercase tracking-wide text-ikaRed backdrop-blur-sm flex items-center gap-1.5">
                <FaTag className="text-[10px]" /> {actualite.category}
              </span>
            </div>
            <div className="p-5 sm:p-8">
              <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark leading-snug">{actualite.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaClock className="text-ikaRed" /> {actualite.time}
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <FaUser className="text-ikaBlue" /> {actualite.author}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-sm leading-relaxed text-slate-600">{actualite.longText}</p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button
                  onClick={toggleLike}
                  className={`px-4 py-2 rounded-full border font-bold text-xs transition flex items-center gap-1.5 ${isLiked ? 'bg-rose-500 text-white border-rose-500 shadow-sm' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
                >
                  <FaHeart className={isLiked ? '' : 'text-xs'} /> {likedBy.length} J&apos;aime
                </button>
                <button
                  onClick={() => setCommentModal(true)}
                  className="px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs hover:bg-blue-100 transition flex items-center gap-1.5"
                >
                  <FaComment className="text-xs" /> {itemComments.length} Commentaires
                </button>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a href="#page-toutes-actualites" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir toutes les actualités
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres actualités */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaNewspaper className="text-ikaRed text-[11px]" /> Autres actualités
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {items.filter((a) => a.id !== actualite.id).map((a) => (
                  <ActualiteCard key={a.id} actualite={a} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-actualite&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaRed transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaRed line-clamp-2">{prev.title}</p>
              </a>
              <a href={`#page-detail-actualite&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-ikaRed transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-ikaRed line-clamp-2">{next.title}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-ikaRed ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-toutes-actualites" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-ikaRed bg-red-50 text-ikaRed font-bold text-xs hover:bg-ikaRed hover:text-white transition">
              <FaArrowRight /> Voir toutes les actualités
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
              <span className="w-12 h-12 rounded-full bg-ikaRed bg-opacity-10 text-ikaRed flex items-center justify-center text-base"><FaNewspaper /></span>
              <div>
                <h3 className="font-black text-slate-900 text-sm">Commenter</h3>
                <p className="text-xs text-slate-500">Laissez votre avis sur {actualite.title.toLowerCase()}</p>
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

export default DetailActualite;
