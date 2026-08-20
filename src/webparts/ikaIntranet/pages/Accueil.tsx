import * as React from 'react';
import { loadAgendas, IAgendaItem } from '../services/agenda/index';
import { loadActualites, IActualite } from '../services/actualites/index';
import { loadEvenements, IEvenement } from '../services/evenements/index';
import { loadMembres, IMembre, DEPT_COLORS } from '../services/equipe/index';
import { loadProjets, IProjet } from '../services/projets/index';
import { loadProduits, IProduit } from '../services/produits/index';
import { loadAnnonces, updateAnnonceLikedBy, updateAnnonceComments, IAnnonce } from '../services/annonces/index';
import { loadEmployesMois, updateEmployeMoisLikedBy, updateEmployeMoisComments, IEmployeMois } from '../services/employes-mois/index';
import { loadBilans, IBilan } from '../services/bilans/index';
import { loadGalerieFolders, loadGalerieImages, getGalerieRootFolder, IGalerieFolder, IGalerieImage } from '../services/galerie/index';
import { getCurrentUserEmail, getCurrentUserName, IComment } from '../services/shared/index';
import {
  FaBullhorn,
  FaCalendarDays,
  FaLocationDot,
  FaNewspaper,
  FaUsers,
  FaMagnifyingGlass,
  FaDiagramProject,
  FaCubes,
  FaChartColumn,
  FaTrophy,
  FaCrown,
  FaHeart,
  FaComment,
  FaCalendarDay,
  FaFilePdf,
  FaImages,
  FaFolder,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaArrowRight,
  FaArrowLeft,
  FaXmark,
  FaPaperPlane,
  FaMobileScreen,
  FaPhone,
  FaEnvelope,
  FaEye
} from 'react-icons/fa6';

/* ============================== DONNÉES ============================== */

const IMG = {
  seminar: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  workshop: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
  teambuilding: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  news1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  news2: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
  news3: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
  news4: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&q=80',
  avatarEmpMonth: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  avatar2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  avatar3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  avatar4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  avatar5: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
  avatarKadiatou: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
  avatarMamadou: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
};

/* ============================== SOUS-COMPOSANTS ============================== */

function SectionHeader(props: { iconCls: string; icon: React.ReactNode; title: string; link?: string }): React.ReactElement {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
      <div className="flex items-center gap-2">
        <span className={`p-1.5 rounded-lg ${props.iconCls}`}>{props.icon}</span>
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">{props.title}</h2>
      </div>
      {props.link && <a href={props.link} className="text-[11px] font-bold text-ikaBlue hover:underline">Voir tout</a>}
    </div>
  );
}

/* ============================== COMPOSANT ACCUEIL ============================== */

export const Accueil: React.FC<{ siteUrl?: string }> = ({ siteUrl }) => {
  const [eventIndex, setEventIndex] = React.useState(0);
  const [agendas, setAgendas] = React.useState<IAgendaItem[]>([]);
  const [actualites, setActualites] = React.useState<IActualite[]>([]);
  const [evenements, setEvenements] = React.useState<IEvenement[]>([]);
  const [agendaLoading, setAgendaLoading] = React.useState(true);
  const [actualitesLoading, setActualitesLoading] = React.useState(true);
  const [evenementsLoading, setEvenementsLoading] = React.useState(true);
  const [membres, setMembres] = React.useState<IMembre[]>([]);
  const [teamLoading, setTeamLoading] = React.useState(true);
  const [projets, setProjets] = React.useState<IProjet[]>([]);
  const [projetsLoading, setProjetsLoading] = React.useState(true);
  const [produits, setProduits] = React.useState<IProduit[]>([]);
  const [produitsLoading, setProduitsLoading] = React.useState(true);
  const [annonces, setAnnonces] = React.useState<IAnnonce[]>([]);
  const [annoncesLoading, setAnnoncesLoading] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [teamSearch, setTeamSearch] = React.useState('');
  const [teamDept, setTeamDept] = React.useState('all');
  const [annFilter, setAnnFilter] = React.useState('all');
  const [employesMois, setEmployesMois] = React.useState<IEmployeMois[]>([]);
  const [employesMoisLoading, setEmployesMoisLoading] = React.useState(true);
  const [bilans, setBilans] = React.useState<IBilan[]>([]);
  const [bilansLoading, setBilansLoading] = React.useState(true);
  const [galerieFolders, setGalerieFolders] = React.useState<IGalerieFolder[]>([]);
  const [galerieLoading, setGalerieLoading] = React.useState(true);
  const [galerieFolderImages, setGalerieFolderImages] = React.useState<IGalerieImage[]>([]);
  const [galerieActiveFolder, setGalerieActiveFolder] = React.useState<IGalerieFolder | null>(null);
  const [empMoisLikes, setEmpMoisLikes] = React.useState<Record<number, string[]>>({});
  const [empMoisComments, setEmpMoisComments] = React.useState<Record<number, IComment[]>>({});
  const [commentModal, setCommentModal] = React.useState(false);
  const [commentInput, setCommentInput] = React.useState('');
  const [annLikes, setAnnLikes] = React.useState<Record<number, string[]>>({});
  const [annComments, setAnnComments] = React.useState<Record<number, IComment[]>>({});
  const [annonceCommentId, setAnnonceCommentId] = React.useState<number | null>(null);
  const [annonceCommentInput, setAnnonceCommentInput] = React.useState('');
  const [memberModal, setMemberModal] = React.useState<IMembre | null>(null);
  const [galleryModal, setGalleryModal] = React.useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = React.useState(0);

  React.useEffect(() => {
    if (!siteUrl) {
      setAgendaLoading(false);
      setActualitesLoading(false);
      setEvenementsLoading(false);
      setTeamLoading(false);
      setProjetsLoading(false);
      setProduitsLoading(false);
      setAnnoncesLoading(false);
      setEmployesMoisLoading(false);
      setBilansLoading(false);
      setGalerieLoading(false);
      return;
    }
    loadAgendas(siteUrl)
      .then((data) => {
        setAgendas(data);
        setAgendaLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Agenda :', err);
        setAgendaLoading(false);
      });
    loadActualites(siteUrl)
      .then((data) => {
        setActualites(data);
        setActualitesLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Actualités :', err);
        setActualitesLoading(false);
      });
    loadEvenements(siteUrl)
      .then((data) => {
        setEvenements(data);
        setEvenementsLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Événements :', err);
        setEvenementsLoading(false);
      });
    loadMembres(siteUrl)
      .then((data) => {
        setMembres(data);
        setTeamLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Équipe :', err);
        setTeamLoading(false);
      });
    loadProjets(siteUrl)
      .then((data) => {
        setProjets(data);
        setProjetsLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Projets :', err);
        setProjetsLoading(false);
      });
    loadProduits(siteUrl)
      .then((data) => {
        setProduits(data);
        setProduitsLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Produits :', err);
        setProduitsLoading(false);
      });
    loadAnnonces(siteUrl)
      .then((data) => {
        setAnnonces(data);
        setAnnoncesLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Annonces :', err);
        setAnnoncesLoading(false);
      });
    loadEmployesMois(siteUrl)
      .then((data) => {
        setEmployesMois(data);
        setEmployesMoisLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Employés du mois :', err);
        setEmployesMoisLoading(false);
      });
    loadBilans(siteUrl)
      .then((data) => {
        setBilans(data);
        setBilansLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Bilans :', err);
        setBilansLoading(false);
      });
    getGalerieRootFolder(siteUrl)
      .then((root) => loadGalerieFolders(siteUrl, root))
      .then((folders) => {
        setGalerieFolders(folders);
        setGalerieLoading(false);
      })
      .catch((err) => {
        console.error('[Accueil] Galerie dossiers :', err);
        setGalerieLoading(false);
      });
    getCurrentUserEmail(siteUrl)
      .then(setUserEmail)
      .catch((err) => {
        console.error('[Accueil] Email courant :', err);
      });
    getCurrentUserName(siteUrl)
      .then(setUserName)
      .catch((err) => {
        console.error('[Accueil] Nom courant :', err);
      });
  }, [siteUrl]);

  const openGalerieFolder = (folder: IGalerieFolder): void => {
    if (!siteUrl) return;
    loadGalerieImages(siteUrl, folder.serverRelativeUrl)
      .then((images) => {
        setGalerieFolderImages(images);
        setGalerieActiveFolder(folder);
      })
      .catch((err) => {
        console.error('[Accueil] Galerie images :', err);
      });
  };

  React.useEffect(() => {
    if (evenements.length < 2) return undefined;
    const timer = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % evenements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [evenements.length]);

  React.useEffect(() => {
    const likes: Record<number, string[]> = {};
    const comments: Record<number, IComment[]> = {};
    annonces.forEach((a) => {
      likes[a.id] = a.likedBy || [];
      comments[a.id] = a.comments || [];
    });
    setAnnLikes(likes);
    setAnnComments(comments);
  }, [annonces]);

  React.useEffect(() => {
    const likes: Record<number, string[]> = {};
    const comments: Record<number, IComment[]> = {};
    employesMois.forEach((e) => {
      likes[e.id] = e.likedBy || [];
      comments[e.id] = e.comments || [];
    });
    setEmpMoisLikes(likes);
    setEmpMoisComments(comments);
  }, [employesMois]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (galleryModal !== null) {
        if (e.key === 'ArrowLeft') setGalleryIndex((galleryModal + galerieFolderImages.length - 1) % galerieFolderImages.length);
        if (e.key === 'ArrowRight') setGalleryIndex((galleryModal + 1) % galerieFolderImages.length);
        if (e.key === 'Escape') setGalleryModal(null);
      }
      if (memberModal) {
        if (e.key === 'Escape') setMemberModal(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [galleryModal, memberModal]);

  React.useEffect(() => {
    if (galleryModal !== null) setGalleryIndex(galleryModal);
  }, [galleryModal]);

  React.useEffect(() => {
    document.body.style.overflow = commentModal || memberModal !== null || galleryModal !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [commentModal, memberModal, galleryModal]);

  const filteredTeam = membres.filter((m) => {
    const q = teamSearch.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(q) || m.phone.toLowerCase().includes(q);
    const matchesDept = teamDept === 'all' || m.dept === teamDept;
    return matchesSearch && matchesDept;
  });

  const filteredAnn = annonces.filter((a) => annFilter === 'all' || a.type === annFilter);

  const toggleLike = (): void => {
    if (!siteUrl || !userEmail || employesMois.length === 0) return;
    const id = employesMois[0].id;
    const current = empMoisLikes[id] || [];
    const isLiked = current.indexOf(userEmail) !== -1;
    const newLikedBy = isLiked ? current.filter((e) => e !== userEmail) : [...current, userEmail];
    setEmpMoisLikes((prev) => ({ ...prev, [id]: newLikedBy }));
    updateEmployeMoisLikedBy(siteUrl, id, newLikedBy).catch((err) => {
      console.error('[Accueil] Like employé :', err);
    });
  };

  const addComment = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const val = commentInput.trim();
    if (!val || !siteUrl || !userEmail || employesMois.length === 0) return;
    const id = employesMois[0].id;
    const newComment: IComment = {
      user: userName || 'Utilisateur',
      email: userEmail,
      text: val,
      date: new Date().toISOString()
    };
    const newComments = [...(empMoisComments[id] || []), newComment];
    setEmpMoisComments((prev) => ({ ...prev, [id]: newComments }));
    setCommentInput('');
    setCommentModal(false);
    await updateEmployeMoisComments(siteUrl, id, newComments);
  };

  const toggleAnnLike = (id: number): void => {
    if (!siteUrl || !userEmail) return;
    const current = annLikes[id] || [];
    const isLiked = current.indexOf(userEmail) !== -1;
    const newLikedBy = isLiked ? current.filter((e) => e !== userEmail) : [...current, userEmail];
    setAnnLikes((prev) => ({ ...prev, [id]: newLikedBy }));
    updateAnnonceLikedBy(siteUrl, id, newLikedBy).catch((err) => {
      console.error('[Accueil] Like annonce :', err);
    });
  };

  const addAnnonceComment = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const val = annonceCommentInput.trim();
    if (!val || !siteUrl || !userEmail) return;
    const id = annonceCommentId;
    if (id === null) return;
    const newComment: IComment = {
      user: userName || 'Utilisateur',
      email: userEmail,
      text: val,
      date: new Date().toISOString()
    };
    const newComments = [...(annComments[id] || []), newComment];
    setAnnComments((prev) => ({ ...prev, [id]: newComments }));
    setAnnonceCommentInput('');
    setAnnonceCommentId(null);
    await updateAnnonceComments(siteUrl, id, newComments);
  };

  const event = evenements.length ? evenements[eventIndex % evenements.length] : null;
  const derniersEvenements = [...evenements].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <main id="page-accueil" className="pt-4 sm:pt-5 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1900px] px-3 sm:px-5 lg:px-6 space-y-3">

        {/* ========== ROW 1: ÉVÉNEMENTS | ACTUALITÉ | AGENDA ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          {/* SECTION 1: ÉVÉNEMENTS (SLIDER 6 COLS) */}
          <section id="evenements" className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-100 text-ikaBlue"><FaCalendarDays className="text-xs" /></span>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Événements</h2>
              </div>
              <a href="#page-tous-evenements" className="text-[11px] font-bold text-ikaBlue hover:underline">Voir tout</a>
            </div>
            <div className="relative flex-1 min-h-[320px] sm:min-h-[350px] rounded-xl overflow-hidden bg-slate-950 text-white flex flex-col justify-end p-5 sm:p-7">
              <div className="absolute top-1/2 right-3 z-30 flex -translate-y-1/2 flex-col items-center gap-2 bg-slate-950/75 backdrop-blur-md px-2 py-2 rounded-full border border-white/15 shadow-xl">
                <div className="flex flex-col items-center gap-1.5">
                  {evenements.map((e, i) => (
                    <button
                      key={i}
                      onClick={() => setEventIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === eventIndex ? 'bg-white' : 'bg-white/40 hover:bg-white'}`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="w-4 h-px bg-white/20" />
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => setEventIndex((eventIndex + evenements.length - 1) % evenements.length)}
                    className="p-1 rounded-full hover:bg-white/20 text-white transition flex items-center justify-center w-5 h-5"
                    aria-label="Précédent"
                  >
                    <FaChevronUp className="text-[10px]" />
                  </button>
                  <button
                    onClick={() => setEventIndex((eventIndex + 1) % evenements.length)}
                    className="p-1 rounded-full hover:bg-white/20 text-white transition flex items-center justify-center w-5 h-5"
                    aria-label="Suivant"
                  >
                    <FaChevronDown className="text-[10px]" />
                  </button>
                </div>
              </div>

              {event ? (
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-5 sm:p-7 pb-5 z-10">
                  <img src={event.img} alt={event.title} className="absolute inset-0 w-full h-full object-cover object-top opacity-50 mix-blend-overlay -z-10" />
                  <div className="max-w-xl mt-auto pr-10">
                    <h2 className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-md">{event.title}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-100 mt-2">
                      <span className="flex items-center gap-1.5 bg-slate-950/70 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">
                        <FaCalendarDays className={event.dateIcon} /> {event.date}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-950/70 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">
                        <FaLocationDot className={event.locationIcon} /> {event.location}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200 line-clamp-2 leading-relaxed">{event.text}</p>
                    <div className="mt-3">
                      <a href={`#page-detail-evenement&id=${event.id}`} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold text-[11px] bg-white text-ikaBlueDark shadow transition hover:bg-slate-100">
                        <span>En savoir plus</span>
                        <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <p className="text-xs text-slate-300 font-semibold">
                    {evenementsLoading ? 'Chargement des événements...' : 'Aucun événement à venir.'}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: ACTUALITÉ (3 COLS) */}
          <section id="actualites" className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-red-100 text-ikaRed" icon={<FaNewspaper className="text-xs" />} title="Actualités" />
              <div className="space-y-3.5">
                {actualitesLoading ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Chargement...</p>
                ) : actualites.length === 0 ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Aucune actualité pour le moment.</p>
                ) : (
                  actualites.slice(0, 4).map((n) => (
                    <a key={n.id} href={`#page-detail-actualite&id=${n.id}`} className="flex gap-3 group">
                      <img src={n.img} alt={n.title} className="w-16 h-14 rounded-lg object-cover shrink-0 border border-slate-200" />
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition leading-snug">{n.title}</h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{n.text}</p>
                        <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
            <a href="#page-toutes-actualites" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir toutes les actualités
            </a>
          </section>

          {/* SECTION 3: AGENDA (3 COLS) */}
          <section id="agenda" className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-blue-100 text-ikaBlue" icon={<FaCalendarDays className="text-xs" />} title="Agenda" />
              <div className="space-y-3">
                {agendaLoading ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Chargement...</p>
                ) : agendas.length === 0 ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Aucun rendez-vous à venir.</p>
                ) : (
                  agendas.slice(0, 6).map((a) => (
                    <a key={a.id} href={`#page-detail-agenda&id=${a.id}`} className="flex items-center gap-3 group">
                      <div className={`w-12 h-12 rounded-xl ${a.bg} text-white flex flex-col items-center justify-center shrink-0 shadow-sm`}>
                        <span className="text-[9px] font-black uppercase">{a.month}</span>
                        <span className="text-sm font-bold leading-none">{a.day}</span>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition">{a.title}</h3>
                        <p className="text-[11px] text-slate-500">{a.time}</p>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
            <a href="#page-toutes-agenda" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir l&apos;agenda complet
            </a>
          </section>
        </div>

        {/* ========== ROW 2: NOTRE ÉQUIPE | PROJETS EN COURS ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          {/* SECTION 6: NOTRE ÉQUIPE (7 COLS) */}
          <section id="equipe" className="lg:col-span-7 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="p-1.5 rounded-lg bg-blue-100 text-ikaBlue"><FaUsers className="text-xs" /></span>
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Notre Équipe</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={teamSearch}
                      onChange={(e) => setTeamSearch(e.target.value)}
                      placeholder="Nom ou Téléphone..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue"
                    />
                    <FaMagnifyingGlass className="absolute left-2.5 top-2.5 text-slate-400 text-xs" />
                  </div>
                  <select
                    value={teamDept}
                    onChange={(e) => setTeamDept(e.target.value)}
                    className="py-1.5 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-ikaBlue bg-slate-50"
                  >
                    <option value="all">Tous les départements</option>
                    {Array.from(new Set(membres.map((m) => m.dept))).map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                <table className="w-full text-left text-xs min-w-[620px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2 px-2">Employé</th>
                      <th className="py-2 px-2">Poste</th>
                      <th className="py-2 px-2">Département</th>
                      <th className="py-2 px-2">Téléphone Mobile</th>
                      <th className="py-2 px-2">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {teamLoading && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-xs text-slate-500">Chargement de l&apos;équipe...</td>
                      </tr>
                    )}
                    {!teamLoading && filteredTeam.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-xs text-slate-500">Aucun membre trouvé.</td>
                      </tr>
                    )}
                    {!teamLoading && filteredTeam.map((m) => (
                      <tr key={m.id} onClick={() => setMemberModal(m)} className="cursor-pointer hover:bg-slate-50 transition">                        <td className="py-2 px-2 flex items-center gap-2 font-bold text-slate-900">
                          <img src={m.avatar} className="w-7 h-7 rounded-full object-cover border border-slate-300" alt={m.name} />
                          <span>{m.name}</span>
                        </td>
                        <td className="py-2 px-2">{m.role}</td>
                        <td className="py-2 px-2">
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${DEPT_COLORS[m.dept] || 'bg-slate-100 text-slate-700'}`}>{m.dept}</span>
                        </td>
                        <td className="py-2 px-2 font-semibold text-slate-800">
                          <a href={`tel:${m.phone.replace(/\s/g, '')}`} onClick={(e) => e.stopPropagation()} className="hover:text-ikaBlue">{m.phone}</a>
                        </td>
                        <td className="py-2 px-2 text-slate-500">{m.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <a href="#page-toute-equipe" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir toute l&apos;équipe
            </a>
          </section>

          {/* SECTION 9: PROJETS EN COURS (5 COLS) */}
          <section id="projets" className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-blue-100 text-ikaBlue" icon={<FaDiagramProject className="text-xs" />} title="Projets en cours" />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[360px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-2">Projet</th>
                      <th className="py-2.5 px-2">Début</th>
                      <th className="py-2.5 px-2">Fin</th>
                      <th className="py-2.5 px-2 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {projetsLoading && (
                      <tr>
                        <td colSpan={4} className="py-5 text-center text-xs text-slate-500">Chargement des projets...</td>
                      </tr>
                    )}
                    {!projetsLoading && projets.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-5 text-center text-xs text-slate-500">Aucun projet en cours.</td>
                      </tr>
                    )}
                    {!projetsLoading && projets.slice(0, 5).map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition cursor-pointer">
                        <td className="py-2.5 px-2"><a href={`#page-detail-projet&id=${p.id}`} className="font-black text-slate-900 hover:text-ikaBlue transition">{p.name}</a></td>
                        <td className="py-2.5 px-2 text-slate-500">{p.start}</td>
                        <td className="py-2.5 px-2 text-slate-500">{p.end}</td>
                        <td className="py-2.5 px-2 text-right">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.cls}`}>{p.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <a href="#page-tous-projets" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir tous les projets
            </a>
          </section>
        </div>

        {/* ========== ROW 3: PRODUITS | ANNONCES | EMPLOYÉ DU MOIS | BILAN ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-stretch">
          {/* 1. PRODUITS & SERVICES */}
          <section id="services" className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-red-100 text-ikaRed" icon={<FaCubes className="text-xs" />} title="Produits & Services" />
              <div className="grid grid-cols-2 gap-2">
                {produitsLoading && (
                  <div className="col-span-2 text-center text-[11px] text-slate-400 font-semibold py-3">Chargement...</div>
                )}
                {!produitsLoading && produits.length === 0 && (
                  <div className="col-span-2 text-center text-[11px] text-slate-400 font-semibold py-3">Aucun produit disponible.</div>
                )}
                {!produitsLoading && produits.slice(0, 6).map((p) => (
                  <a key={p.id} href={`#page-detail-produit&id=${p.id}`} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 transition block cursor-pointer flex items-center gap-2.5">
                    <img src={p.logo} alt="" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0" />
                    <h3 className="text-[11px] font-bold text-slate-900 leading-snug">{p.name}</h3>
                  </a>
                ))}
              </div>
            </div>
            <a href="#page-tous-produits" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir tous les services
            </a>
          </section>

          {/* 2. ANNONCES */}
          <section id="annonces" className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-amber-100 text-amber-600" icon={<FaBullhorn className="text-xs" />} title="Annonces" />
              <div className="flex flex-wrap items-center gap-1 mb-3 text-[11px] font-bold">
                {[['all', 'Tous']].concat(
                  Array.from(new Set(annonces.map((a) => a.type))).filter((t) => t !== '').map((t) => [t, t.charAt(0).toUpperCase() + t.slice(1)] as [string, string])
                ).map(([type, label]) => (
                  <button
                    key={type}
                    onClick={() => setAnnFilter(type)}
                    className={`px-2.5 py-1 rounded-full transition ${annFilter === type ? 'bg-ikaBlue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {annoncesLoading ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Chargement...</p>
                ) : filteredAnn.length === 0 ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Aucune annonce.</p>
                ) : (
                  filteredAnn.map((a) => {
                    const likedBy = annLikes[a.id] || [];
                    const commentsList = annComments[a.id] || [];
                    const isLiked = userEmail !== '' && likedBy.indexOf(userEmail) !== -1;
                    return (
                      <div key={a.id} className="rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition p-2">
                        <a href={`#page-detail-annonce&id=${a.id}`} className="flex items-start gap-2.5 block cursor-pointer">
                          <img src={a.avatar} alt="" className={`w-8 h-8 rounded-full object-cover ${a.badge} shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-xs">
                              <h3 className="font-bold text-slate-900">{a.title}</h3>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{a.text}</p>
                          </div>
                        </a>
                        <div className="flex items-center gap-2 mt-1.5 pl-10">
                          <button
                            onClick={() => toggleAnnLike(a.id)}
                            className={`px-2.5 py-0.5 rounded-full border font-bold text-[11px] transition flex items-center gap-1 ${isLiked ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
                          >
                            <FaHeart className="text-[10px]" /> {likedBy.length}
                          </button>
                          <button
                            onClick={() => setAnnonceCommentId(a.id)}
                            className="px-2.5 py-0.5 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-[11px] hover:bg-blue-100 transition flex items-center gap-1"
                          >
                            <FaComment className="text-[10px]" /> {commentsList.length}
                          </button>
                          <span className="text-[10px] text-slate-400 font-medium ml-auto">{a.time}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <a href="#page-toutes-annonces" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-sm text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir toutes les annonces
            </a>
          </section>

          {/* 3. EMPLOYÉ DU MOIS */}
          <section id="employe-mois" className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-amber-100 text-amber-600" icon={<FaTrophy className="text-xs" />} title="Employé du mois" />
              <div className="text-center py-2">
                {employesMoisLoading ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Chargement...</p>
                ) : employesMois.length === 0 ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Aucun employé du mois pour le moment.</p>
                ) : (
                  (() => {
                    const em = employesMois[0];
                    const empLikedBy = empMoisLikes[em.id] || [];
                    const empCommentsList = empMoisComments[em.id] || [];
                    const empIsLiked = userEmail !== '' && empLikedBy.indexOf(userEmail) !== -1;
                    return (
                      <React.Fragment>
                        <div className="relative inline-block">
                          <img src={em.photo} alt={em.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto border-4 border-amber-400 shadow-md" />
                          <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow" title={`Trophée ${em.month} ${em.year}`}>
                            <FaCrown />
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 mt-2.5">{em.name}</h3>
                        <p className="text-xs font-bold text-ikaBlue">{em.role} — {em.dept}</p>
                        <p className="text-[11px] text-slate-500 italic mt-1.5 px-1 leading-snug line-clamp-4">
                          &quot;{em.quote}&quot;
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-slate-100">
                          <button
                            onClick={toggleLike}
                            className={`px-3 py-1 rounded-full border font-bold text-xs transition flex items-center gap-1.5 ${empIsLiked ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
                          >
                            <FaHeart /> <span>{empLikedBy.length}</span>
                          </button>
                          <button onClick={() => setCommentModal(true)} className="px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs hover:bg-blue-100 transition flex items-center gap-1.5">
                            <FaComment /> <span>{empCommentsList.length}</span>
                          </button>
                        </div>
                      </React.Fragment>
                    );
                  })()
                )}
              </div>
            </div>
            <a href={employesMois.length > 0 ? `#page-detail-employe-mois&id=${employesMois[0].id}` : '#page-tous-employes-mois'} className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              {employesMois.length > 0 ? 'Voir son profil' : 'Voir tous les employés du mois'}
            </a>
          </section>

          {/* 4. BILAN HEBDOMADAIRE */}
          <section id="bilan" className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-blue-100 text-ikaBlue" icon={<FaChartColumn className="text-xs" />} title="Bilan Hebdomadaire" />
              <div className="space-y-2">
                {bilansLoading ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Chargement...</p>
                ) : bilans.length === 0 ? (
                  <p className="text-[11px] text-slate-400 font-semibold text-center py-4">Aucun bilan disponible.</p>
                ) : (
                  bilans.slice(0, 4).map((b) => (
                    <a
                      key={b.id}
                      href={b.fileUrl || '#'}
                      target={b.fileUrl ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 hover:bg-white hover:border-blue-200 transition block"
                    >
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                        <FaCalendarDay className="text-ikaBlue shrink-0" />
                        <span className="flex-1">{b.period}</span>
                        <FaCalendarDays className="text-slate-400 shrink-0" />
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-200 pt-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FaFilePdf className="text-rose-600 text-lg shrink-0" />
                          <div className="min-w-0">
                            <h3 className="text-[11px] font-bold text-slate-900 truncate">{b.file}</h3>
                            <p className="text-[9px] text-slate-500">{b.size}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg border border-slate-300 text-ikaBlue font-bold text-[10px] shrink-0 flex items-center gap-1">
                          <span>Voir</span>
                          <FaEye className="text-[9px]" />
                        </span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
            <a href="#page-tous-bilans" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir les bilans
            </a>
          </section>
        </div>

        {/* ========== ROW 4: GALERIE | DOCUMENTATION ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          {/* SECTION 5: GALERIE (6 COLS) */}
          <section id="galerie" className="lg:col-span-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-purple-100 text-purple-600" icon={<FaImages className="text-xs" />} title="Galerie Moments d'Équipe" />
              {galerieActiveFolder && (
                <button
                  onClick={() => {
                    setGalerieActiveFolder(null);
                    setGalerieFolderImages([]);
                    setGalleryModal(null);
                  }}
                  className="mb-2 px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition text-[10px] font-bold flex items-center gap-1.5"
                >
                  <FaArrowLeft className="text-[9px]" /> Tous les dossiers
                </button>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {galerieLoading ? (
                  <div className="col-span-2 sm:col-span-3 text-center text-[11px] text-slate-400 font-semibold py-4">Chargement...</div>
                ) : galerieActiveFolder ? (
                  galerieFolderImages.length === 0 ? (
                    <div className="col-span-2 sm:col-span-3 text-center text-[11px] text-slate-400 font-semibold py-4">Aucune image dans ce dossier.</div>
                  ) : (
                    galerieFolderImages.slice(0, 6).map((g, i) => (
                      <div
                        key={g.id}
                        onClick={() => setGalleryModal(i)}
                        className="group relative rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer shadow"
                      >
                        <img src={g.url} alt={g.title} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end">
                          <span className="text-[10px] font-bold text-white">{g.title}</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <span className="bg-white/20 backdrop-blur-sm rounded-full p-2"><FaExpand className="text-white text-sm" /></span>
                        </div>
                      </div>
                    ))
                  )
                ) : galerieFolders.length === 0 ? (
                  <div className="col-span-2 sm:col-span-3 text-center text-[11px] text-slate-400 font-semibold py-4">Aucun dossier dans la galerie.</div>
                ) : (
                  galerieFolders.slice(0, 6).map((f) => (
                    <button
                      key={f.serverRelativeUrl}
                      onClick={() => openGalerieFolder(f)}
                      className="group p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-purple-300 hover:bg-white hover:shadow-sm transition flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
                        <FaFolder />
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 group-hover:text-purple-600 text-center line-clamp-2">{f.name}</span>
                      {f.itemCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[9px] font-bold text-slate-500">{f.itemCount}</span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
            <a href="#page-toute-galerie" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir toute la galerie
            </a>
          </section>

          {/* SECTION 8: DERNIERS ÉVÉNEMENTS (6 COLS) */}
          <section id="derniers-evenements" className="lg:col-span-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <SectionHeader iconCls="bg-blue-100 text-ikaBlue" icon={<FaCalendarDays className="text-xs" />} title="Derniers Événements" />
              <div className="grid grid-cols-3 gap-3">
                {evenementsLoading ? (
                  <p className="col-span-3 text-[11px] text-slate-400 font-semibold text-center py-4">Chargement...</p>
                ) : derniersEvenements.length === 0 ? (
                  <p className="col-span-3 text-[11px] text-slate-400 font-semibold text-center py-4">Aucun événement pour le moment.</p>
                ) : (
                  derniersEvenements.map((e) => (
                    <a
                      key={e.id}
                      href={`#page-detail-evenement&id=${e.id}`}
                      className="group relative block rounded-xl overflow-hidden aspect-square bg-slate-900 shadow"
                    >
                      <img src={e.img} alt={e.title} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent flex flex-col justify-end p-2.5">
                        <span className="text-[11px] font-bold text-white leading-snug line-clamp-2">{e.title}</span>
                        <span className="text-[10px] text-white/70 font-medium mt-0.5">{e.date}</span>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
            <a href="#page-tous-evenements" className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm">
              Voir tous les événements
            </a>
          </section>
        </div>

      </div>

      {/* ========== MODAL COMMENTAIRE ANNONCE ========== */}
      {annonceCommentId !== null && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative">
            <button onClick={() => setAnnonceCommentId(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">
              <FaXmark />
            </button>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-base"><FaBullhorn /></span>
              <div>
                <h3 className="font-black text-slate-900 text-sm">Commenter l&apos;annonce</h3>
                <p className="text-xs text-slate-500">Laissez votre avis sur {(() => { const x = annonces.find((it) => it.id === annonceCommentId); return x ? x.title.toLowerCase() : 'cette annonce'; })()}</p>
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs">
              {(annComments[annonceCommentId] || []).map((c, i) => {
                const isMe = c.email === userEmail;
                return (
                  <div key={i} className={`p-2 rounded-lg border ${isMe ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <span className="font-bold text-slate-900">{c.user} :</span>
                    <span className="text-slate-600"> {c.text}</span>
                  </div>
                );
              })}
              {(annComments[annonceCommentId] || []).length === 0 && <p className="text-slate-400 text-center">Aucun commentaire pour le moment.</p>}
            </div>
            <form onSubmit={addAnnonceComment} className="space-y-3">
              <textarea
                value={annonceCommentInput}
                onChange={(e) => setAnnonceCommentInput(e.target.value)}
                required
                rows={3}
                placeholder="Écrivez votre commentaire ici..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue"
              />
              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={() => setAnnonceCommentId(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
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

      {/* ========== MODAL COMMENTAIRE ========== */}
      {commentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative">
            <button onClick={() => setCommentModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">
              <FaXmark />
            </button>
            <div className="flex items-center gap-3">
              {employesMois.length > 0 ? (
                <img src={employesMois[0].photo} className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" alt="" />
              ) : (
                <img src={IMG.avatarEmpMonth} className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" alt="" />
              )}
              <div>
                <h3 className="font-black text-slate-900 text-sm">Féliciter {employesMois.length > 0 ? employesMois[0].name : 'notre lauréat'}</h3>
                <p className="text-xs text-slate-500">Laissez un message d&apos;encouragement</p>
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs">
              {employesMois.length > 0 ? (
                (empMoisComments[employesMois[0].id] || []).map((c, i) => (
                  <div key={i} className={`p-2 rounded-lg border ${c.email === userEmail ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <span className="font-bold text-slate-900">{c.user} :</span>
                    <span className="text-slate-600"> {c.text}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center">Aucun commentaire pour le moment.</p>
              )}
              {employesMois.length > 0 && (empMoisComments[employesMois[0].id] || []).length === 0 && (
                <p className="text-slate-400 text-center">Aucun commentaire pour le moment.</p>
              )}
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

      {/* ========== MODAL FICHE MEMBRE ========== */}
      {memberModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setMemberModal(null); }}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="h-24 bg-gradient-to-r from-ikaBlueDark to-ikaBlue relative">
              <button onClick={() => setMemberModal(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition">
                <FaXmark className="text-sm" />
              </button>
              <div className="absolute -bottom-10 left-6">
                <img src={memberModal.avatar} alt={memberModal.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg" />
              </div>
            </div>
            <div className="pt-14 px-6 pb-6 space-y-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">{memberModal.name}</h3>
                <p className="text-sm font-bold text-ikaBlue mt-0.5">{memberModal.role}</p>
                <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${DEPT_COLORS[memberModal.dept] || 'bg-slate-100 text-slate-700'}`}>
                  {memberModal.dept}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-ikaBlue/30 pl-3">{memberModal.bio}</p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0"><FaMobileScreen className="text-xs" /></span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Téléphone Mobile</p>
                    <a href={`tel:${memberModal.phone.replace(/\s/g, '')}`} className="font-bold text-slate-800 hover:text-ikaBlue transition">{memberModal.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0"><FaEnvelope className="text-xs" /></span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Email</p>
                    <a href={`mailto:${memberModal.email}`} className="font-semibold text-slate-700 hover:text-ikaBlue transition truncate block">{memberModal.email}</a>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <a href={`tel:${memberModal.phone.replace(/\s/g, '')}`} className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold text-center hover:bg-emerald-600 transition flex items-center justify-center gap-1.5 shadow">
                  <FaPhone /> Appeler
                </a>
                <a href={`mailto:${memberModal.email}`} className="flex-1 py-2 rounded-xl bg-ikaBlue text-white text-xs font-bold text-center hover:bg-blue-600 transition flex items-center justify-center gap-1.5 shadow">
                  <FaEnvelope /> Envoyer un e-mail
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL LIGHTBOX GALERIE ========== */}
      {galleryModal !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setGalleryModal(null); }}
        >
          <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-6 z-10">
            <span className="text-white/70 text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full">{galleryIndex + 1} / {galerieFolderImages.length}</span>
            <button onClick={() => setGalleryModal(null)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20">
              <FaXmark />
            </button>
          </div>
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            <button onClick={() => setGalleryIndex((galleryIndex + galerieFolderImages.length - 1) % galerieFolderImages.length)} className="absolute left-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition -translate-x-2">
              <FaChevronLeft />
            </button>
            {galerieFolderImages[galleryIndex] && <img src={galerieFolderImages[galleryIndex].url} alt="" className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" />}
            <button onClick={() => setGalleryIndex((galleryIndex + 1) % galerieFolderImages.length)} className="absolute right-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition translate-x-2">
              <FaChevronRight />
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-white font-bold text-sm">{galerieFolderImages[galleryIndex] ? galerieFolderImages[galleryIndex].title : ''}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Accueil;
