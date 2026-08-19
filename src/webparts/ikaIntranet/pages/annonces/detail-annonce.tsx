import * as React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCakeCandles,
  FaComment,
  FaHeart,
  FaPaperPlane,
  FaPlaneDeparture,
  FaUsers,
  FaBullhorn,
  FaXmark
} from 'react-icons/fa6';
import { loadAnnonces, updateAnnonceLikedBy, updateAnnonceComments, IAnnonce } from '../../services/annonces/index';
import { getCurrentUserEmail, getCurrentUserName, IComment } from '../../services/shared/index';

const getAnnonceIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

const typeIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'anniversaire': return <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><FaCakeCandles className="text-sm" /></span>;
    case 'mariage': return <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"><FaHeart className="text-sm" /></span>;
    case 'absence': return <span className="w-10 h-10 rounded-xl bg-blue-100 text-ikaBlue flex items-center justify-center shrink-0"><FaPlaneDeparture className="text-sm" /></span>;
    default: return <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><FaBullhorn className="text-sm" /></span>;
  }
};

export const DetailAnnonce: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [annonceId, setAnnonceId] = React.useState<number>(getAnnonceIdFromHash);
  const [items, setItems] = React.useState<IAnnonce[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [likedBy, setLikedBy] = React.useState<string[]>([]);
  const [itemComments, setItemComments] = React.useState<IComment[]>([]);
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [commentModal, setCommentModal] = React.useState(false);
  const [commentInput, setCommentInput] = React.useState('');

  React.useEffect(() => {
    const onHash = (): void => setAnnonceId(getAnnonceIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    if (!siteUrl) {
      setLoading(false);
      return;
    }
    loadAnnonces(siteUrl)
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
        console.error('[DetailAnnonce] Email courant :', err);
      });
    getCurrentUserName(siteUrl)
      .then(setUserName)
      .catch((err) => {
        console.error('[DetailAnnonce] Nom courant :', err);
      });
  }, [siteUrl]);

  const annonce = items.find((a) => a.id === annonceId) || items[0];

  React.useEffect(() => {
    if (annonce) {
      setLikedBy(annonce.likedBy || []);
      setItemComments(annonce.comments || []);
    }
  }, [annonce]);

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="spinner-border text-amber-600" role="status" />
          <p className="mt-3 text-sm text-slate-500">Chargement de l&apos;annonce...</p>
        </div>
      </main>
    );
  }

  if (!annonce) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 text-center py-16">
          <p className="text-sm text-slate-500 font-semibold">Annonce introuvable.</p>
          <a href="#page-toutes-annonces" className="inline-block mt-4 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
            Voir toutes les annonces
          </a>
        </div>
      </main>
    );
  }

  const idx = items.findIndex((a) => a.id === annonce.id);
  const prev = items[(idx - 1 + items.length) % items.length];
  const next = items[(idx + 1) % items.length];
  const isLiked = userEmail !== '' && likedBy.indexOf(userEmail) !== -1;

  const toggleLike = async (): Promise<void> => {
    if (!siteUrl || !userEmail) return;
    const newLikedBy = isLiked
      ? likedBy.filter((e) => e !== userEmail)
      : [...likedBy, userEmail];
    setLikedBy(newLikedBy);
    await updateAnnonceLikedBy(siteUrl, annonce.id, newLikedBy);
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
    await updateAnnonceComments(siteUrl, annonce.id, newComments);
  };

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-toutes-annonces" className="hover:text-ikaBlue transition">Annonces</a>
          <span>/</span>
          <span className="text-amber-600">{annonce.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4">
                {annonce.avatar ? (
                  <img src={annonce.avatar} alt="" className={`w-14 h-14 rounded-full object-cover ${annonce.badge}`} />
                ) : typeIcon(annonce.type)}
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-ikaBlueDark">{annonce.title}</h1>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{annonce.time}</p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Message</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{annonce.text}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Catégorie</h2>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FaBullhorn className="text-amber-600 text-xs" /> {annonce.type}
                </p>
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

              <div className="mt-8">
                <a href="#page-toutes-annonces" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir toutes les annonces
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres annonces */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaUsers className="text-amber-600 text-[11px]" /> Autres annonces
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {items.filter((a) => a.id !== annonce.id).map((a) => (
                  <a
                    key={a.id}
                    href={`#page-detail-annonce&id=${a.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition group"
                  >
                    {a.avatar ? <img src={a.avatar} alt="" className={`w-9 h-9 rounded-full object-cover ${a.badge} shrink-0`} />
                      : typeIcon(a.type)}
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition">{a.title}</h3>
                      <p className="text-[10px] text-slate-400">{a.time}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`#page-detail-annonce&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group">
                <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2">{prev.title}</p>
              </a>
              <a href={`#page-detail-annonce&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2">{next.title}</p>
                <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-amber-600 ml-auto mt-1" />
              </a>
            </div>

            <a href="#page-toutes-annonces" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition">
              <FaArrowRight /> Voir toutes les annonces
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
              <span className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-base"><FaBullhorn /></span>
              <div>
                <h3 className="font-black text-slate-900 text-sm">Commenter</h3>
                <p className="text-xs text-slate-500">Laissez votre avis sur {annonce.title.toLowerCase()}</p>
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

export default DetailAnnonce;