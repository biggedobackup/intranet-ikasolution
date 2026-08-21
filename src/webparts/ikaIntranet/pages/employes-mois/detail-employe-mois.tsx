import * as React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCrown,
  FaHeart,
  FaComment,
  FaTrophy,
  FaCalendarDays,
  FaPaperPlane,
  FaXmark
} from 'react-icons/fa6';
import { loadEmployesMois, updateEmployeMoisLikedBy, updateEmployeMoisComments, IEmployeMois } from '../../services/employes-mois/index';
import { getCurrentUserEmail, getCurrentUserName, IComment } from '../../services/shared/index';

const getEmployeMoisIdFromHash = (): number => {
  const hash = window.location.hash.replace('#', '');
  const params = hash.split('&');
  const idParam = params.find((p) => p.startsWith('id='));
  return idParam ? Number(idParam.split('=')[1]) : 1;
};

export const DetailEmployeMois: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [employeId, setEmployeId] = React.useState<number>(getEmployeMoisIdFromHash);
  const [employes, setEmployes] = React.useState<IEmployeMois[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [likedBy, setLikedBy] = React.useState<string[]>([]);
  const [itemComments, setItemComments] = React.useState<IComment[]>([]);
  const [commentModal, setCommentModal] = React.useState(false);
  const [commentInput, setCommentInput] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    const onHash = (): void => setEmployeId(getEmployeMoisIdFromHash());
    window.addEventListener('hashchange', onHash);
    return (): void => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    if (!siteUrl) {
      setLoading(false);
      return;
    }
    loadEmployesMois(siteUrl)
      .then((data) => {
        setEmployes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[DetailEmployeMois] Erreur :', err);
        setLoading(false);
      });
    getCurrentUserEmail(siteUrl)
      .then(setUserEmail)
      .catch((err) => {
        console.error('[DetailEmployeMois] Email courant :', err);
      });
    getCurrentUserName(siteUrl)
      .then(setUserName)
      .catch((err) => {
        console.error('[DetailEmployeMois] Nom courant :', err);
      });
  }, [siteUrl]);

  const employe = employes.find((e) => e.id === employeId) || employes[0];

  React.useEffect(() => {
    if (!employe) return;
    setLikedBy(employe.likedBy || []);
    setItemComments(employe.comments || []);
  }, [employe]);

  if (loading) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-400 font-semibold">Chargement...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!employe) {
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun lauréat trouvé.</p>
            <a href="#page-tous-employes-mois" className="mt-4 inline-block px-5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition">
              Voir tous les employés du mois
            </a>
          </div>
        </div>
      </main>
    );
  }

  const isLiked = userEmail !== '' && likedBy.indexOf(userEmail) !== -1;

  const idx = employes.findIndex((e) => e.id === employe.id);
  const prev = employes[(idx - 1 + employes.length) % employes.length];
  const next = employes[(idx + 1) % employes.length];

  const toggleLike = (): void => {
    if (!siteUrl || !userEmail) return;
    const isLiked = likedBy.indexOf(userEmail) !== -1;
    const newLikedBy = isLiked ? likedBy.filter((e) => e !== userEmail) : [...likedBy, userEmail];
    setLikedBy(newLikedBy);
    updateEmployeMoisLikedBy(siteUrl, employe.id, newLikedBy).catch((err) => {
      console.error('[DetailEmployeMois] Like :', err);
    });
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
    await updateEmployeMoisComments(siteUrl, employe.id, newComments);
  };

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
          <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
          <span>/</span>
          <a href="#page-tous-employes-mois" className="hover:text-ikaBlue transition">Employés du mois</a>
          <span>/</span>
          <span className="text-amber-600">{employe.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Colonne principale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-r from-amber-500 to-amber-400 flex flex-col items-center justify-center text-white p-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center">
                <FaTrophy className="text-3xl" />
              </div>
              <h1 className="mt-3 text-xl sm:text-2xl font-black">{employe.name}</h1>
              <span className="mt-2 px-3 py-1 rounded-full bg-white/90 text-[10px] font-black uppercase tracking-wide text-amber-700 flex items-center gap-1.5">
                <FaCrown className="text-[10px]" /> Employé du mois — {employe.month} {employe.year}
              </span>
            </div>
            <div className="p-6 sm:p-8 text-center">
              <img src={employe.photo} alt={employe.name} className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-amber-400 shadow-md" loading="lazy" />
              <h2 className="mt-4 text-lg font-black text-ikaBlueDark">{employe.name}</h2>
              <p className="text-sm font-bold text-ikaBlue mt-0.5">{employe.role} — {employe.dept}</p>

              <div className="mt-5 mx-auto max-w-lg">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">Pourquoi lui / elle ?</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 italic border-l-2 border-amber-400 pl-3 text-left">
                  « {employe.quote} »
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={toggleLike}
                  className={`px-4 py-1.5 rounded-full border font-bold text-xs flex items-center gap-1.5 transition ${isLiked ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
                >
                  <FaHeart /> {likedBy.length}
                </button>
                <button
                  onClick={() => setCommentModal(true)}
                  className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs flex items-center gap-1.5 hover:bg-blue-100 transition"
                >
                  <FaComment /> {itemComments.length}
                </button>
              </div>

              <div className="mt-8">
                <a href="#page-tous-employes-mois" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
                  <FaArrowLeft /> Voir tous les employés du mois
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar : autres lauréats */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 mb-4 flex items-center gap-1.5">
                <FaTrophy className="text-amber-500 text-[11px]" /> Autres lauréats
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {employes.filter((e) => e.id !== employe.id).map((e) => (
                  <a
                    key={e.id}
                    href={`#page-detail-employe-mois&id=${e.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition group"
                  >
                    <img src={e.photo} alt={e.name} className="w-11 h-11 rounded-full object-cover border border-amber-300 shrink-0" loading="lazy" />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition">{e.name}</h3>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <FaCalendarDays className="text-[9px]" /> {e.month} {e.year}
                      </p>
                    </div>
                  </a>
                ))}
                {employes.length <= 1 && <p className="text-[11px] text-slate-400">Aucun autre lauréat.</p>}
              </div>
            </div>

            {employes.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                <a href={`#page-detail-employe-mois&id=${prev.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Précédent</span>
                  <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2">{prev.name}</p>
                </a>
                <a href={`#page-detail-employe-mois&id=${next.id}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition group text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Suivant</span>
                  <p className="mt-1 text-[11px] font-bold text-slate-700 group-hover:text-amber-600 line-clamp-2">{next.name}</p>
                  <FaArrowRight className="text-[10px] text-slate-300 group-hover:text-amber-600 ml-auto mt-1" />
                </a>
              </div>
            )}

            <a href="#page-tous-employes-mois" className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-600 hover:text-white transition">
              <FaArrowRight /> Voir tous les employés du mois
            </a>
          </aside>
        </div>
      </div>

      {/* Modale commentaires */}
      {commentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative">
            <button onClick={() => setCommentModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">
              <FaXmark />
            </button>
            <div className="flex items-center gap-3">
              <img src={employe.photo} className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" alt="" loading="lazy" />
              <div>
                <h3 className="font-black text-slate-900 text-sm">Féliciter {employe.name}</h3>
                <p className="text-xs text-slate-500">Laissez un message d&apos;encouragement</p>
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs">
              {itemComments.map((c, i) => (
                <div key={i} className={`p-2 rounded-lg border ${c.email === userEmail ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                  <span className="font-bold text-slate-900">{c.user} :</span>
                  <span className="text-slate-600"> {c.text}</span>
                </div>
              ))}
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

export default DetailEmployeMois;