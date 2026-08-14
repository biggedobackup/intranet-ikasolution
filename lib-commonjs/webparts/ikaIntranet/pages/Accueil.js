"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accueil = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var index_1 = require("../services/agenda/index");
var index_2 = require("../services/actualites/index");
var index_3 = require("../services/evenements/index");
var fa6_1 = require("react-icons/fa6");
/* ============================== DONNÉES ============================== */
var IMG = {
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
    avatarMamadou: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    gal1: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
    gal2: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80',
    gal3: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
    gal4: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    gal5: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80',
    gal6: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'
};
var DEPT_COLORS = {
    Direction: 'bg-blue-50 text-ikaBlue',
    'Gestion de projet': 'bg-purple-50 text-purple-700',
    Développement: 'bg-emerald-50 text-emerald-700',
    Comptabilité: 'bg-rose-50 text-rose-700',
    Système: 'bg-amber-50 text-amber-700'
};
var TEAM = [
    {
        name: 'Jean OUEDRAOGO',
        role: 'Administrateur',
        dept: 'Direction',
        phone: '+226 70 20 11 01',
        ip: '1001',
        email: 'jean.ouedraogo@ika.bf',
        avatar: IMG.avatar1,
        bio: "Administrateur général et Directeur d'IKA SOLUTION LTD, supervisant l'ensemble des projets d'innovation et les opérations techniques au Burkina Faso."
    },
    {
        name: 'Aïcha KABORÉ',
        role: 'Chef de projet',
        dept: 'Gestion de projet',
        phone: '+226 76 15 22 02',
        ip: '1002',
        email: 'aicha.kabore@ika.bf',
        avatar: IMG.avatar2,
        bio: 'Chef de projet certifiée PMP, responsable de la coordination des équipes agiles et du suivi du portefeuille de projets clients d\'IKA SOLUTION.'
    },
    {
        name: 'Mouhamed TRAORÉ',
        role: 'Développeur Senior',
        dept: 'Développement',
        phone: '+226 78 88 33 03',
        ip: '1003',
        email: 'mouhamed.traore@ika.bf',
        avatar: IMG.avatar3,
        bio: "Expert Fullstack et SPFx, spécialisé dans les architectures cloud et le développement d'applications sur-mesure pour les entreprises."
    },
    {
        name: 'Fatou BATIONO',
        role: 'Comptable',
        dept: 'Comptabilité',
        phone: '+226 71 44 55 04',
        ip: '1004',
        email: 'fatou.bationo@ika.bf',
        avatar: IMG.avatar4,
        bio: "Responsable de la comptabilité générale, du suivi budgétaire et des états financiers d'IKA SOLUTION LTD."
    },
    {
        name: 'Issa ZONGO',
        role: 'Technicien Système',
        dept: 'Système',
        phone: '+226 75 99 66 05',
        ip: '1005',
        email: 'issa.zongo@ika.bf',
        avatar: IMG.avatar5,
        bio: "Administrateur système et réseaux, responsable de la sécurité informatique, de la gestion des postes IP et du parc serveur d'IKA SOLUTION."
    },
    {
        name: 'Kadiatou OUEDRAOGO',
        role: 'Chargée RH',
        dept: 'Direction',
        phone: '+226 70 12 34 06',
        ip: '1006',
        email: 'kadiatou.ouedraogo@ika.bf',
        avatar: IMG.avatarKadiatou,
        bio: "Chargée des ressources humaines, responsable de la gestion administrative du personnel, des recrutements et de la vie sociale de l'entreprise."
    },
    {
        name: 'Mamadou COMPAORÉ',
        role: 'Développeur Front-End',
        dept: 'Développement',
        phone: '+226 76 55 44 07',
        ip: '1007',
        email: 'mamadou.compaore@ika.bf',
        avatar: IMG.avatarMamadou,
        bio: "Développeur Front-End spécialisé React et SPFx, en charge des interfaces utilisateur du portail intranet et des applications métiers."
    },
    {
        name: 'Salifou SAWADOGO',
        role: 'Assistant Comptable',
        dept: 'Comptabilité',
        phone: '+226 71 23 45 08',
        ip: '1008',
        email: 'salifou.sawadogo@ika.bf',
        avatar: IMG.avatar4,
        bio: "Assistant comptable, en charge de la facturation, du suivi des règlements clients et de l'appui aux clôtures périodiques."
    },
    {
        name: 'Awa NIANG',
        role: 'Ingénieur Cloud',
        dept: 'Système',
        phone: '+226 74 56 78 09',
        ip: '1009',
        email: 'awa.niang@ika.bf',
        avatar: IMG.avatar2,
        bio: "Ingénieure Cloud, responsable de la plateforme cloud IKA, de l'infrastructure VPS, de la conteneurisation et de la supervision des services hébergés."
    }
];
var BILANS = [
    { period: 'Du 07 au 13 Juillet 2026', file: 'Bilan_hebdo_07-13.pdf', size: '2.4 Mo - PDF' },
    { period: 'Du 13 au 20 Juillet 2026', file: 'Bilan_hebdo_13-20.pdf', size: '2.1 Mo - PDF' },
    { period: 'Du 20 au 27 Juillet 2026', file: 'Bilan_hebdo_20-27.pdf', size: '1.8 Mo - PDF' }
];
var PROJECTS = [
    { name: 'IKAR', start: '01/06/2026', end: '30/09/2026', status: 'En cours', cls: 'bg-blue-100 text-blue-700' },
    { name: 'IKAVISITE', start: '15/04/2026', end: '15/08/2026', status: 'En cours', cls: 'bg-blue-100 text-blue-700' },
    { name: 'IKA CLOUD', start: '01/03/2026', end: '01/07/2026', status: 'Terminé', cls: 'bg-emerald-100 text-emerald-700' },
    { name: 'PORTAIL RH', start: '10/05/2026', end: '10/07/2026', status: 'En retard', cls: 'bg-rose-100 text-rose-700' }
];
var SERVICES = [
    { icon: React.createElement(fa6_1.FaCubes, { className: "text-ikaBlue text-sm" }), title: 'Dev Logiciel' },
    { icon: React.createElement(fa6_1.FaCloud, { className: "text-emerald-600 text-sm" }), title: 'Cloud & VPS' },
    { icon: React.createElement(fa6_1.FaChartLine, { className: "text-purple-600 text-sm" }), title: 'Gestion ERP' },
    { icon: React.createElement(fa6_1.FaMobileScreenButton, { className: "text-rose-600 text-sm" }), title: 'App Mobiles' },
    { icon: React.createElement(fa6_1.FaHeadset, { className: "text-amber-600 text-sm" }), title: 'Infogérance' },
    { icon: React.createElement(fa6_1.FaGraduationCap, { className: "text-indigo-600 text-sm" }), title: 'Formation' }
];
var ANNONCES = [
    { type: 'anniversaire', avatar: IMG.avatarKadiatou, badge: 'border-2 border-amber-400', title: 'Anniversaire', time: "Aujourd'hui", text: 'Kadiatou OUEDRAOGO fête son anniversaire !' },
    { type: 'mariage', avatars: [IMG.avatar5, IMG.avatar2], title: 'Mariage', time: 'Hier', text: 'Félicitations à Issa et Aïcha pour leur mariage.' },
    { type: 'absence', avatar: IMG.avatarMamadou, badge: 'border border-slate-300', title: 'Absence', time: '2 jours', text: 'Mamadou sera en congé du 21 au 25 juillet.' }
];
var GALLERY = [
    { src: IMG.gal1, caption: 'Séminaire 2026' },
    { src: IMG.gal2, caption: 'Team Building' },
    { src: IMG.gal3, caption: 'Afterwork' },
    { src: IMG.gal4, caption: 'Remise de prix' },
    { src: IMG.gal5, caption: 'Atelier Tech' },
    { src: IMG.gal6, caption: 'Brainstorming' }
];
var DOC_FOLDERS = [
    { id: 'ikar', name: 'IKAR', desc: 'Dossier partagé' },
    { id: 'dev', name: 'DEV', desc: 'Espace dev' },
    { id: 'sp', name: 'SP', desc: 'Service Prod' },
    { id: 'compta', name: 'COMPTA', desc: 'Finances' },
    { id: 'gcibtc', name: 'GCIBTC', desc: 'Projet GCIBTC' }
];
/* ============================== SOUS-COMPOSANTS ============================== */
function SectionHeader(props) {
    return (React.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-100 mb-4" },
        React.createElement("div", { className: "flex items-center gap-2" },
            React.createElement("span", { className: "p-1.5 rounded-lg ".concat(props.iconCls) }, props.icon),
            React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900" }, props.title)),
        props.link && React.createElement("a", { href: props.link, className: "text-[11px] font-bold text-ikaBlue hover:underline" }, "Voir tout")));
}
/* ============================== COMPOSANT ACCUEIL ============================== */
var Accueil = function (_a) {
    var siteUrl = _a.siteUrl;
    var _b = React.useState(0), eventIndex = _b[0], setEventIndex = _b[1];
    var _c = React.useState([]), agendas = _c[0], setAgendas = _c[1];
    var _d = React.useState([]), actualites = _d[0], setActualites = _d[1];
    var _e = React.useState([]), evenements = _e[0], setEvenements = _e[1];
    var _f = React.useState(true), agendaLoading = _f[0], setAgendaLoading = _f[1];
    var _g = React.useState(true), actualitesLoading = _g[0], setActualitesLoading = _g[1];
    var _h = React.useState(true), evenementsLoading = _h[0], setEvenementsLoading = _h[1];
    var _j = React.useState(''), teamSearch = _j[0], setTeamSearch = _j[1];
    var _k = React.useState('all'), teamDept = _k[0], setTeamDept = _k[1];
    var _l = React.useState('all'), annFilter = _l[0], setAnnFilter = _l[1];
    var _m = React.useState(false), liked = _m[0], setLiked = _m[1];
    var _o = React.useState(42), likeCount = _o[0], setLikeCount = _o[1];
    var _p = React.useState(false), commentModal = _p[0], setCommentModal = _p[1];
    var _q = React.useState([
        { user: 'Aïcha KABORÉ :', text: ' Bravo Mouhamed pour la livraison du projet SPFx ! 🎉' },
        { user: 'Jean OUEDRAOGO :', text: ' Travail remarquable, félicitations ! 👏' }
    ]), comments = _q[0], setComments = _q[1];
    var _r = React.useState(''), commentInput = _r[0], setCommentInput = _r[1];
    var _s = React.useState(8), commentCount = _s[0], setCommentCount = _s[1];
    var _t = React.useState({
        1: { liked: false, count: 12 },
        2: { liked: false, count: 8 },
        3: { liked: false, count: 5 }
    }), annLikes = _t[0], setAnnLikes = _t[1];
    var _u = React.useState({
        1: [
            { user: 'Aïcha KABORÉ :', text: ' Bonne fête Kadiatou ! 🎉' },
            { user: 'Jean OUEDRAOGO :', text: ' Tous mes vœux ! 👏' }
        ]
    }), annComments = _u[0], setAnnComments = _u[1];
    var _v = React.useState({ 1: 12, 2: 7, 3: 4 }), annCommentCounts = _v[0], setAnnCommentCounts = _v[1];
    var _w = React.useState(null), annonceCommentId = _w[0], setAnnonceCommentId = _w[1];
    var _x = React.useState(''), annonceCommentInput = _x[0], setAnnonceCommentInput = _x[1];
    var _y = React.useState(null), memberModal = _y[0], setMemberModal = _y[1];
    var _z = React.useState(null), galleryModal = _z[0], setGalleryModal = _z[1];
    var _0 = React.useState(0), galleryIndex = _0[0], setGalleryIndex = _0[1];
    React.useEffect(function () {
        if (!siteUrl) {
            setAgendaLoading(false);
            setActualitesLoading(false);
            setEvenementsLoading(false);
            return;
        }
        (0, index_1.loadAgendas)(siteUrl)
            .then(function (data) {
            setAgendas(data);
            setAgendaLoading(false);
        })
            .catch(function (err) {
            console.error('[Accueil] Agenda :', err);
            setAgendaLoading(false);
        });
        (0, index_2.loadActualites)(siteUrl)
            .then(function (data) {
            setActualites(data);
            setActualitesLoading(false);
        })
            .catch(function (err) {
            console.error('[Accueil] Actualités :', err);
            setActualitesLoading(false);
        });
        (0, index_3.loadEvenements)(siteUrl)
            .then(function (data) {
            setEvenements(data);
            setEvenementsLoading(false);
        })
            .catch(function (err) {
            console.error('[Accueil] Événements :', err);
            setEvenementsLoading(false);
        });
    }, [siteUrl]);
    React.useEffect(function () {
        if (evenements.length < 2)
            return undefined;
        var timer = setInterval(function () {
            setEventIndex(function (prev) { return (prev + 1) % evenements.length; });
        }, 6000);
        return function () { return clearInterval(timer); };
    }, [evenements.length]);
    React.useEffect(function () {
        var onKey = function (e) {
            if (galleryModal !== null) {
                if (e.key === 'ArrowLeft')
                    setGalleryIndex((galleryModal + GALLERY.length - 1) % GALLERY.length);
                if (e.key === 'ArrowRight')
                    setGalleryIndex((galleryModal + 1) % GALLERY.length);
                if (e.key === 'Escape')
                    setGalleryModal(null);
            }
            if (memberModal) {
                if (e.key === 'Escape')
                    setMemberModal(null);
            }
        };
        window.addEventListener('keydown', onKey);
        return function () { return window.removeEventListener('keydown', onKey); };
    }, [galleryModal, memberModal]);
    React.useEffect(function () {
        if (galleryModal !== null)
            setGalleryIndex(galleryModal);
    }, [galleryModal]);
    React.useEffect(function () {
        document.body.style.overflow = commentModal || memberModal !== null || galleryModal !== null ? 'hidden' : '';
        return function () { document.body.style.overflow = ''; };
    }, [commentModal, memberModal, galleryModal]);
    var filteredTeam = TEAM.filter(function (m) {
        var q = teamSearch.toLowerCase();
        var matchesSearch = m.name.toLowerCase().includes(q) || m.phone.toLowerCase().includes(q) || m.ip.includes(q);
        var matchesDept = teamDept === 'all' || m.dept === teamDept;
        return matchesSearch && matchesDept;
    });
    var filteredAnn = ANNONCES.filter(function (a) { return annFilter === 'all' || a.type === annFilter; });
    var toggleLike = function () {
        setLiked(!liked);
        setLikeCount(function (c) { return (liked ? c - 1 : c + 1); });
    };
    var addComment = function (e) {
        e.preventDefault();
        var val = commentInput.trim();
        if (!val)
            return;
        setComments(tslib_1.__spreadArray(tslib_1.__spreadArray([], comments, true), [{ user: 'Vous :', text: " ".concat(val), mine: true }], false));
        setCommentCount(function (c) { return c + 1; });
        setCommentInput('');
        setCommentModal(false);
    };
    var toggleAnnLike = function (id) {
        setAnnLikes(function (prev) {
            var _a;
            var cur = prev[id] || { liked: false, count: 0 };
            return tslib_1.__assign(tslib_1.__assign({}, prev), (_a = {}, _a[id] = { liked: !cur.liked, count: cur.liked ? cur.count - 1 : cur.count + 1 }, _a));
        });
    };
    var addAnnonceComment = function (e) {
        e.preventDefault();
        var val = annonceCommentInput.trim();
        if (!val)
            return;
        var id = annonceCommentId;
        if (id === null)
            return;
        setAnnComments(function (prev) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, prev), (_a = {}, _a[id] = tslib_1.__spreadArray(tslib_1.__spreadArray([], (prev[id] || []), true), [{ user: 'Vous :', text: " ".concat(val), mine: true }], false), _a)));
        });
        setAnnCommentCounts(function (prev) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, prev), (_a = {}, _a[id] = (prev[id] || 0) + 1, _a)));
        });
        setAnnonceCommentInput('');
        setAnnonceCommentId(null);
    };
    var event = evenements.length ? evenements[eventIndex % evenements.length] : null;
    return (React.createElement("main", { id: "page-accueil", className: "pt-4 sm:pt-5 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-[1900px] px-3 sm:px-5 lg:px-6 space-y-3" },
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch" },
                React.createElement("section", { id: "evenements", className: "lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden" },
                    React.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-100 mb-4" },
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement("span", { className: "p-1.5 rounded-lg bg-blue-100 text-ikaBlue" },
                                React.createElement(fa6_1.FaCalendarDays, { className: "text-xs" })),
                            React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900" }, "\u00C9v\u00E9nements")),
                        React.createElement("a", { href: "#page-tous-evenements", className: "text-[11px] font-bold text-ikaBlue hover:underline" }, "Voir tout")),
                    React.createElement("div", { className: "relative flex-1 min-h-[320px] sm:min-h-[350px] rounded-xl overflow-hidden bg-slate-950 text-white flex flex-col justify-end p-5 sm:p-7" },
                        React.createElement("div", { className: "absolute top-1/2 right-3 z-30 flex -translate-y-1/2 flex-col items-center gap-2 bg-slate-950/75 backdrop-blur-md px-2 py-2 rounded-full border border-white/15 shadow-xl" },
                            React.createElement("div", { className: "flex flex-col items-center gap-1.5" }, evenements.map(function (e, i) { return (React.createElement("button", { key: i, onClick: function () { return setEventIndex(i); }, className: "w-2 h-2 rounded-full transition-all ".concat(i === eventIndex ? 'bg-white' : 'bg-white/40 hover:bg-white'), "aria-label": "Slide ".concat(i + 1) })); })),
                            React.createElement("div", { className: "w-4 h-px bg-white/20" }),
                            React.createElement("div", { className: "flex flex-col items-center gap-1" },
                                React.createElement("button", { onClick: function () { return setEventIndex((eventIndex + evenements.length - 1) % evenements.length); }, className: "p-1 rounded-full hover:bg-white/20 text-white transition flex items-center justify-center w-5 h-5", "aria-label": "Pr\u00E9c\u00E9dent" },
                                    React.createElement(fa6_1.FaChevronUp, { className: "text-[10px]" })),
                                React.createElement("button", { onClick: function () { return setEventIndex((eventIndex + 1) % evenements.length); }, className: "p-1 rounded-full hover:bg-white/20 text-white transition flex items-center justify-center w-5 h-5", "aria-label": "Suivant" },
                                    React.createElement(fa6_1.FaChevronDown, { className: "text-[10px]" })))),
                        event ? (React.createElement("div", { className: "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-5 sm:p-7 pb-5 z-10" },
                            React.createElement("img", { src: event.img, alt: event.title, className: "absolute inset-0 w-full h-full object-cover object-top opacity-50 mix-blend-overlay -z-10" }),
                            React.createElement("div", { className: "max-w-xl mt-auto pr-10" },
                                React.createElement("h2", { className: "text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-md" }, event.title),
                                React.createElement("div", { className: "flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-100 mt-2" },
                                    React.createElement("span", { className: "flex items-center gap-1.5 bg-slate-950/70 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm" },
                                        React.createElement(fa6_1.FaCalendarDays, { className: event.dateIcon }),
                                        " ",
                                        event.date),
                                    React.createElement("span", { className: "flex items-center gap-1.5 bg-slate-950/70 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm" },
                                        React.createElement(fa6_1.FaLocationDot, { className: event.locationIcon }),
                                        " ",
                                        event.location)),
                                React.createElement("p", { className: "mt-2 text-xs text-slate-200 line-clamp-2 leading-relaxed" }, event.text),
                                React.createElement("div", { className: "mt-3" },
                                    React.createElement("a", { href: "#page-detail-evenement&id=".concat(event.id), className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold text-[11px] bg-white text-ikaBlueDark shadow transition hover:bg-slate-100" },
                                        React.createElement("span", null, "En savoir plus"),
                                        React.createElement(fa6_1.FaArrowRight, null)))))) : (React.createElement("div", { className: "absolute inset-0 flex items-center justify-center z-10" },
                            React.createElement("p", { className: "text-xs text-slate-300 font-semibold" }, evenementsLoading ? 'Chargement des événements...' : 'Aucun événement à venir.'))))),
                React.createElement("section", { id: "actualites", className: "lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-red-100 text-ikaRed", icon: React.createElement(fa6_1.FaNewspaper, { className: "text-xs" }), title: "Actualit\u00E9s" }),
                        React.createElement("div", { className: "space-y-3.5" }, actualitesLoading ? (React.createElement("p", { className: "text-[11px] text-slate-400 font-semibold text-center py-4" }, "Chargement...")) : actualites.length === 0 ? (React.createElement("p", { className: "text-[11px] text-slate-400 font-semibold text-center py-4" }, "Aucune actualit\u00E9 pour le moment.")) : (actualites.slice(0, 4).map(function (n) { return (React.createElement("a", { key: n.id, href: "#page-detail-actualite&id=".concat(n.id), className: "flex gap-3 group" },
                            React.createElement("img", { src: n.img, alt: n.title, className: "w-16 h-14 rounded-lg object-cover shrink-0 border border-slate-200" }),
                            React.createElement("div", null,
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition leading-snug" }, n.title),
                                React.createElement("p", { className: "text-[11px] text-slate-500 line-clamp-1 mt-0.5" }, n.text),
                                React.createElement("span", { className: "text-[10px] text-slate-400 font-medium" }, n.time)))); })))),
                    React.createElement("a", { href: "#page-toutes-actualites", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir toutes les actualit\u00E9s")),
                React.createElement("section", { id: "agenda", className: "lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-blue-100 text-ikaBlue", icon: React.createElement(fa6_1.FaCalendarDays, { className: "text-xs" }), title: "Agenda" }),
                        React.createElement("div", { className: "space-y-3" }, agendaLoading ? (React.createElement("p", { className: "text-[11px] text-slate-400 font-semibold text-center py-4" }, "Chargement...")) : agendas.length === 0 ? (React.createElement("p", { className: "text-[11px] text-slate-400 font-semibold text-center py-4" }, "Aucun rendez-vous \u00E0 venir.")) : (agendas.slice(0, 6).map(function (a) { return (React.createElement("a", { key: a.id, href: "#page-detail-agenda&id=".concat(a.id), className: "flex items-center gap-3 group" },
                            React.createElement("div", { className: "w-12 h-12 rounded-xl ".concat(a.bg, " text-white flex flex-col items-center justify-center shrink-0 shadow-sm") },
                                React.createElement("span", { className: "text-[9px] font-black uppercase" }, a.month),
                                React.createElement("span", { className: "text-sm font-bold leading-none" }, a.day)),
                            React.createElement("div", null,
                                React.createElement("h3", { className: "text-xs font-bold text-slate-900 group-hover:text-ikaBlue transition" }, a.title),
                                React.createElement("p", { className: "text-[11px] text-slate-500" }, a.time)))); })))),
                    React.createElement("a", { href: "#page-toutes-agenda", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir l'agenda complet"))),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch" },
                React.createElement("section", { id: "equipe", className: "lg:col-span-7 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4" },
                            React.createElement("div", { className: "flex items-center gap-2 shrink-0" },
                                React.createElement("span", { className: "p-1.5 rounded-lg bg-blue-100 text-ikaBlue" },
                                    React.createElement(fa6_1.FaUsers, { className: "text-xs" })),
                                React.createElement("h2", { className: "text-xs font-black uppercase tracking-wider text-slate-900" }, "Notre \u00C9quipe")),
                            React.createElement("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 max-w-md" },
                                React.createElement("div", { className: "relative flex-1" },
                                    React.createElement("input", { type: "text", value: teamSearch, onChange: function (e) { return setTeamSearch(e.target.value); }, placeholder: "Nom, T\u00E9l\u00E9phone ou IP...", className: "w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue" }),
                                    React.createElement(fa6_1.FaMagnifyingGlass, { className: "absolute left-2.5 top-2.5 text-slate-400 text-xs" })),
                                React.createElement("select", { value: teamDept, onChange: function (e) { return setTeamDept(e.target.value); }, className: "py-1.5 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-ikaBlue bg-slate-50" },
                                    React.createElement("option", { value: "all" }, "Tous les d\u00E9partements"),
                                    Object.keys(DEPT_COLORS).map(function (d) { return React.createElement("option", { key: d, value: d }, d); })))),
                        React.createElement("div", { className: "overflow-x-auto max-h-[300px] overflow-y-auto" },
                            React.createElement("table", { className: "w-full text-left text-xs min-w-[620px]" },
                                React.createElement("thead", null,
                                    React.createElement("tr", { className: "border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]" },
                                        React.createElement("th", { className: "py-2 px-2" }, "Employ\u00E9"),
                                        React.createElement("th", { className: "py-2 px-2" }, "Poste"),
                                        React.createElement("th", { className: "py-2 px-2" }, "D\u00E9partement"),
                                        React.createElement("th", { className: "py-2 px-2" }, "T\u00E9l\u00E9phone Mobile"),
                                        React.createElement("th", { className: "py-2 px-2" }, "Poste IP"),
                                        React.createElement("th", { className: "py-2 px-2" }, "Email"))),
                                React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, filteredTeam.map(function (m) { return (React.createElement("tr", { key: m.name, onClick: function () { return setMemberModal(m); }, className: "cursor-pointer hover:bg-slate-50 transition" },
                                    "                        ",
                                    React.createElement("td", { className: "py-2 px-2 flex items-center gap-2 font-bold text-slate-900" },
                                        React.createElement("img", { src: m.avatar, className: "w-7 h-7 rounded-full object-cover border border-slate-300", alt: m.name }),
                                        React.createElement("span", null, m.name)),
                                    React.createElement("td", { className: "py-2 px-2" }, m.role),
                                    React.createElement("td", { className: "py-2 px-2" },
                                        React.createElement("span", { className: "px-2 py-0.5 rounded font-semibold text-[10px] ".concat(DEPT_COLORS[m.dept] || 'bg-slate-100 text-slate-700') }, m.dept)),
                                    React.createElement("td", { className: "py-2 px-2 font-semibold text-slate-800" },
                                        React.createElement("a", { href: "tel:".concat(m.phone.replace(/\s/g, '')), onClick: function (e) { return e.stopPropagation(); }, className: "hover:text-ikaBlue" }, m.phone)),
                                    React.createElement("td", { className: "py-2 px-2" },
                                        React.createElement("span", { className: "px-2 py-0.5 rounded bg-slate-100 text-ikaBlue font-mono font-bold text-[11px] border border-slate-200" }, m.ip)),
                                    React.createElement("td", { className: "py-2 px-2 text-slate-500" }, m.email))); }))))),
                    React.createElement("a", { href: "#page-toute-equipe", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir toute l'\u00E9quipe")),
                React.createElement("section", { id: "projets", className: "lg:col-span-5 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-blue-100 text-ikaBlue", icon: React.createElement(fa6_1.FaDiagramProject, { className: "text-xs" }), title: "Projets en cours" }),
                        React.createElement("div", { className: "overflow-x-auto" },
                            React.createElement("table", { className: "w-full text-left text-xs min-w-[360px]" },
                                React.createElement("thead", null,
                                    React.createElement("tr", { className: "border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]" },
                                        React.createElement("th", { className: "py-2.5 px-2" }, "Projet"),
                                        React.createElement("th", { className: "py-2.5 px-2" }, "D\u00E9but"),
                                        React.createElement("th", { className: "py-2.5 px-2" }, "Fin"),
                                        React.createElement("th", { className: "py-2.5 px-2 text-right" }, "Statut"))),
                                React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, PROJECTS.map(function (p, i) { return (React.createElement("tr", { key: i, className: "hover:bg-slate-50 transition cursor-pointer" },
                                    React.createElement("td", { className: "py-2.5 px-2" },
                                        React.createElement("a", { href: "#page-detail-projet&id=".concat(i + 1), className: "font-black text-slate-900 hover:text-ikaBlue transition" }, p.name)),
                                    React.createElement("td", { className: "py-2.5 px-2 text-slate-500" }, p.start),
                                    React.createElement("td", { className: "py-2.5 px-2 text-slate-500" }, p.end),
                                    React.createElement("td", { className: "py-2.5 px-2 text-right" },
                                        React.createElement("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold ".concat(p.cls) }, p.status)))); }))))),
                    React.createElement("a", { href: "#page-tous-projets", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir tous les projets"))),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-stretch" },
                React.createElement("section", { id: "services", className: "lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-red-100 text-ikaRed", icon: React.createElement(fa6_1.FaCubes, { className: "text-xs" }), title: "Produits & Services" }),
                        React.createElement("div", { className: "grid grid-cols-2 gap-2" }, SERVICES.map(function (s, i) { return (React.createElement("a", { key: i, href: "#page-detail-produit&id=".concat(i + 1), className: "p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 transition block cursor-pointer" },
                            s.icon,
                            React.createElement("h3", { className: "text-[11px] font-bold text-slate-900 mt-1" }, s.title))); }))),
                    React.createElement("a", { href: "#page-tous-produits", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir tous les services")),
                React.createElement("section", { id: "annonces", className: "lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-amber-100 text-amber-600", icon: React.createElement(fa6_1.FaBullhorn, { className: "text-xs" }), title: "Annonces" }),
                        React.createElement("div", { className: "flex flex-wrap items-center gap-1 mb-3 text-[11px] font-bold" }, [['all', 'Tous'], ['anniversaire', 'Anniv.'], ['mariage', 'Mariage'], ['absence', 'Absence']].map(function (_a) {
                            var type = _a[0], label = _a[1];
                            return (React.createElement("button", { key: type, onClick: function () { return setAnnFilter(type); }, className: "px-2.5 py-1 rounded-full transition ".concat(annFilter === type ? 'bg-ikaBlue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200') }, label));
                        })),
                        React.createElement("div", { className: "space-y-2" }, filteredAnn.map(function (a, i) {
                            var annId = i + 1;
                            var like = annLikes[annId] || { liked: false, count: 0 };
                            return (React.createElement("div", { key: i, className: "rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition p-2" },
                                React.createElement("a", { href: "#page-detail-annonce&id=".concat(annId), className: "flex items-start gap-2.5 block cursor-pointer" },
                                    'avatars' in a ? (React.createElement("div", { className: "flex -space-x-2 shrink-0" }, a.avatars.map(function (av, j) { return (React.createElement("img", { key: j, src: av, className: "w-7 h-7 rounded-full object-cover border border-white", alt: "" })); }))) : (React.createElement("img", { src: a.avatar, alt: "", className: "w-8 h-8 rounded-full object-cover ".concat(a.badge, " shrink-0") })),
                                    React.createElement("div", { className: "flex-1 min-w-0" },
                                        React.createElement("div", { className: "flex items-center justify-between text-xs" },
                                            React.createElement("h3", { className: "font-bold text-slate-900" }, a.title),
                                            React.createElement("span", { className: "text-slate-400 font-normal" }, a.time)),
                                        React.createElement("p", { className: "text-xs text-slate-600 mt-0.5 line-clamp-1" }, a.text))),
                                React.createElement("div", { className: "flex items-center gap-2 mt-1.5 pl-10" },
                                    React.createElement("button", { onClick: function () { return toggleAnnLike(annId); }, className: "px-2.5 py-0.5 rounded-full border font-bold text-[11px] transition flex items-center gap-1 ".concat(like.liked ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100') },
                                        React.createElement(fa6_1.FaHeart, { className: "text-[10px]" }),
                                        " ",
                                        like.count),
                                    React.createElement("button", { onClick: function () { return setAnnonceCommentId(annId); }, className: "px-2.5 py-0.5 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-[11px] hover:bg-blue-100 transition flex items-center gap-1" },
                                        React.createElement(fa6_1.FaComment, { className: "text-[10px]" }),
                                        " ",
                                        annCommentCounts[annId] || 0))));
                        }))),
                    React.createElement("a", { href: "#page-toutes-annonces", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-sm text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir toutes les annonces")),
                React.createElement("section", { id: "employe-mois", className: "lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-amber-100 text-amber-600", icon: React.createElement(fa6_1.FaTrophy, { className: "text-xs" }), title: "Employ\u00E9 du mois" }),
                        React.createElement("div", { className: "text-center py-2" },
                            React.createElement("div", { className: "relative inline-block" },
                                React.createElement("img", { src: IMG.avatarEmpMonth, alt: "Mouhamed TRAOR\u00C9", className: "w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto border-4 border-amber-400 shadow-md" }),
                                React.createElement("span", { className: "absolute bottom-0 right-0 p-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow", title: "Troph\u00E9e Ao\u00FBt" },
                                    React.createElement(fa6_1.FaCrown, null))),
                            React.createElement("h3", { className: "text-sm sm:text-base font-black text-slate-900 mt-2.5" }, "Mouhamed TRAOR\u00C9"),
                            React.createElement("p", { className: "text-xs font-bold text-ikaBlue" }, "D\u00E9veloppeur Senior"),
                            React.createElement("p", { className: "text-[11px] text-slate-500 italic mt-1.5 px-1 leading-snug" }, "\"Pour son engagement exceptionnel et ses contributions remarquables ce mois-ci.\""),
                            React.createElement("div", { className: "flex items-center justify-center gap-3 mt-3 pt-3 border-t border-slate-100" },
                                React.createElement("button", { onClick: toggleLike, className: "px-3 py-1 rounded-full border font-bold text-xs transition flex items-center gap-1.5 ".concat(liked ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100') },
                                    React.createElement(fa6_1.FaHeart, null),
                                    " ",
                                    React.createElement("span", null, likeCount)),
                                React.createElement("button", { onClick: function () { return setCommentModal(true); }, className: "px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-xs hover:bg-blue-100 transition flex items-center gap-1.5" },
                                    React.createElement(fa6_1.FaComment, null),
                                    " ",
                                    React.createElement("span", null, commentCount))))),
                    React.createElement("a", { href: "#page-detail-employe-mois&id=1", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir son profil")),
                React.createElement("section", { id: "bilan", className: "lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-blue-100 text-ikaBlue", icon: React.createElement(fa6_1.FaChartColumn, { className: "text-xs" }), title: "Bilan Hebdomadaire" }),
                        React.createElement("div", { className: "space-y-2" }, BILANS.map(function (b, i) { return (React.createElement("a", { key: i, href: "#page-detail-bilan&id=".concat(i + 1), className: "rounded-xl border border-slate-200 bg-slate-50 p-2.5 hover:bg-white hover:border-blue-200 transition block" },
                            React.createElement("div", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-700" },
                                React.createElement(fa6_1.FaCalendarDay, { className: "text-ikaBlue shrink-0" }),
                                React.createElement("span", { className: "flex-1" }, b.period),
                                React.createElement(fa6_1.FaCalendarDays, { className: "text-slate-400 shrink-0" })),
                            React.createElement("div", { className: "mt-2 flex items-center justify-between gap-2 border-t border-slate-200 pt-2" },
                                React.createElement("div", { className: "flex items-center gap-2 min-w-0" },
                                    React.createElement(fa6_1.FaFilePdf, { className: "text-rose-600 text-lg shrink-0" }),
                                    React.createElement("div", { className: "min-w-0" },
                                        React.createElement("h3", { className: "text-[11px] font-bold text-slate-900 truncate" }, b.file),
                                        React.createElement("p", { className: "text-[9px] text-slate-500" }, b.size))),
                                React.createElement("span", { className: "px-2.5 py-1 rounded-lg border border-slate-300 text-ikaBlue font-bold text-[10px] shrink-0 flex items-center gap-1" },
                                    React.createElement("span", null, "Voir"),
                                    React.createElement(fa6_1.FaEye, { className: "text-[9px]" }))))); }))),
                    React.createElement("a", { href: "#page-tous-bilans", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir les bilans"))),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch" },
                React.createElement("section", { id: "galerie", className: "lg:col-span-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-purple-100 text-purple-600", icon: React.createElement(fa6_1.FaImages, { className: "text-xs" }), title: "Galerie Moments d'\u00C9quipe" }),
                        React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3" }, GALLERY.map(function (g, i) { return (React.createElement("div", { key: i, onClick: function () { return setGalleryModal(i); }, className: "group relative rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer shadow" },
                            React.createElement("img", { src: g.src, alt: g.caption, className: "w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-500" }),
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end" },
                                React.createElement("span", { className: "text-[10px] font-bold text-white" }, g.caption)),
                            React.createElement("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" },
                                React.createElement("span", { className: "bg-white/20 backdrop-blur-sm rounded-full p-2" },
                                    React.createElement(fa6_1.FaExpand, { className: "text-white text-sm" }))))); }))),
                    React.createElement("a", { href: "#page-toute-galerie", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir toute la galerie")),
                React.createElement("section", { id: "documentation", className: "lg:col-span-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between" },
                    React.createElement("div", null,
                        React.createElement(SectionHeader, { iconCls: "bg-blue-100 text-ikaBlue", icon: React.createElement(fa6_1.FaFolder, { className: "text-xs" }), title: "Documentation & Dossiers Partag\u00E9s" }),
                        React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" }, DOC_FOLDERS.map(function (f) { return (React.createElement("a", { key: f.id, href: "#".concat(f.id), className: "p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-amber-300 hover:shadow-sm transition text-center group" },
                            React.createElement("div", { className: "w-10 h-10 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center text-xl font-bold mx-auto mb-1" },
                                React.createElement(fa6_1.FaFolder, null)),
                            React.createElement("h3", { className: "text-xs font-black text-slate-900 group-hover:text-ikaBlue transition" }, f.name),
                            React.createElement("p", { className: "text-[10px] text-slate-400" }, f.desc))); }))),
                    React.createElement("a", { href: "#page-toute-documentation", className: "mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-ikaBlue transition block shadow-sm" }, "Voir toute la documentation")))),
        annonceCommentId !== null && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative" },
                React.createElement("button", { onClick: function () { return setAnnonceCommentId(null); }, className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg" },
                    React.createElement(fa6_1.FaXmark, null)),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("span", { className: "w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-base" },
                        React.createElement(fa6_1.FaBullhorn, null)),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-slate-900 text-sm" }, "Commenter l'annonce"),
                        React.createElement("p", { className: "text-xs text-slate-500" },
                            "Laissez votre avis sur ",
                            ANNONCES[annonceCommentId - 1] ? ANNONCES[annonceCommentId - 1].title.toLowerCase() : 'cette annonce'))),
                React.createElement("div", { className: "max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs" }, (annComments[annonceCommentId] || []).map(function (c, i) { return (React.createElement("div", { key: i, className: "p-2 rounded-lg border ".concat(c.mine ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100') },
                    React.createElement("span", { className: "font-bold text-slate-900" }, c.user),
                    React.createElement("span", { className: "text-slate-600" }, c.text))); })),
                React.createElement("form", { onSubmit: addAnnonceComment, className: "space-y-3" },
                    React.createElement("textarea", { value: annonceCommentInput, onChange: function (e) { return setAnnonceCommentInput(e.target.value); }, required: true, rows: 3, placeholder: "\u00C9crivez votre commentaire ici...", className: "w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue" }),
                    React.createElement("div", { className: "flex items-center justify-end gap-2" },
                        React.createElement("button", { type: "button", onClick: function () { return setAnnonceCommentId(null); }, className: "px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50" }, "Annuler"),
                        React.createElement("button", { type: "submit", className: "px-4 py-2 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 shadow transition flex items-center gap-1.5" },
                            React.createElement("span", null, "Envoyer"),
                            React.createElement(fa6_1.FaPaperPlane, { className: "text-xs" }))))))),
        commentModal && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" },
            React.createElement("div", { className: "bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative" },
                React.createElement("button", { onClick: function () { return setCommentModal(false); }, className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg" },
                    React.createElement(fa6_1.FaXmark, null)),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("img", { src: IMG.avatarEmpMonth, className: "w-12 h-12 rounded-full object-cover border-2 border-amber-400", alt: "" }),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-black text-slate-900 text-sm" }, "F\u00E9liciter Mouhamed TRAOR\u00C9"),
                        React.createElement("p", { className: "text-xs text-slate-500" }, "Laissez un message d'encouragement"))),
                React.createElement("div", { className: "max-h-40 overflow-y-auto space-y-2 border-y border-slate-100 py-3 text-xs" }, comments.map(function (c, i) { return (React.createElement("div", { key: i, className: "p-2 rounded-lg border ".concat(c.mine ? 'bg-blue-50 border-blue-100 text-slate-800' : 'bg-slate-50 border-slate-100') },
                    React.createElement("span", { className: "font-bold text-slate-900" }, c.user),
                    React.createElement("span", { className: "text-slate-600" }, c.text))); })),
                React.createElement("form", { onSubmit: addComment, className: "space-y-3" },
                    React.createElement("textarea", { value: commentInput, onChange: function (e) { return setCommentInput(e.target.value); }, required: true, rows: 3, placeholder: "\u00C9crivez votre commentaire ici...", className: "w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-ikaBlue" }),
                    React.createElement("div", { className: "flex items-center justify-end gap-2" },
                        React.createElement("button", { type: "button", onClick: function () { return setCommentModal(false); }, className: "px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50" }, "Annuler"),
                        React.createElement("button", { type: "submit", className: "px-4 py-2 rounded-xl bg-ikaBlue text-white text-xs font-bold hover:bg-blue-600 shadow transition flex items-center gap-1.5" },
                            React.createElement("span", null, "Envoyer"),
                            React.createElement(fa6_1.FaPaperPlane, { className: "text-xs" }))))))),
        memberModal && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4", onClick: function (e) { if (e.target === e.currentTarget)
                setMemberModal(null); } },
            React.createElement("div", { className: "bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative" },
                React.createElement("div", { className: "h-24 bg-gradient-to-r from-ikaBlueDark to-ikaBlue relative" },
                    React.createElement("button", { onClick: function () { return setMemberModal(null); }, className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition" },
                        React.createElement(fa6_1.FaXmark, { className: "text-sm" })),
                    React.createElement("div", { className: "absolute -bottom-10 left-6" },
                        React.createElement("img", { src: memberModal.avatar, alt: memberModal.name, className: "w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg" }))),
                React.createElement("div", { className: "pt-14 px-6 pb-6 space-y-4" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-lg font-black text-slate-900" }, memberModal.name),
                        React.createElement("p", { className: "text-sm font-bold text-ikaBlue mt-0.5" }, memberModal.role),
                        React.createElement("span", { className: "inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ".concat(DEPT_COLORS[memberModal.dept] || 'bg-slate-100 text-slate-700') }, memberModal.dept)),
                    React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed italic border-l-2 border-ikaBlue/30 pl-3" }, memberModal.bio),
                    React.createElement("div", { className: "grid grid-cols-1 gap-2 text-xs" },
                        React.createElement("div", { className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                            React.createElement("span", { className: "w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0" },
                                React.createElement(fa6_1.FaMobileScreen, { className: "text-xs" })),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[10px] text-slate-400 font-semibold uppercase tracking-wide" }, "T\u00E9l\u00E9phone Mobile"),
                                React.createElement("a", { href: "tel:".concat(memberModal.phone.replace(/\s/g, '')), className: "font-bold text-slate-800 hover:text-ikaBlue transition" }, memberModal.phone))),
                        React.createElement("div", { className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                            React.createElement("span", { className: "w-7 h-7 rounded-lg bg-blue-100 text-ikaBlue flex items-center justify-center shrink-0" },
                                React.createElement(fa6_1.FaPhone, { className: "text-xs" })),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[10px] text-slate-400 font-semibold uppercase tracking-wide" }, "Poste IP"),
                                React.createElement("span", { className: "font-mono font-bold text-ikaBlue" }, memberModal.ip))),
                        React.createElement("div", { className: "flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100" },
                            React.createElement("span", { className: "w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0" },
                                React.createElement(fa6_1.FaEnvelope, { className: "text-xs" })),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-[10px] text-slate-400 font-semibold uppercase tracking-wide" }, "Email"),
                                React.createElement("a", { href: "mailto:".concat(memberModal.email), className: "font-semibold text-slate-700 hover:text-ikaBlue transition truncate block" }, memberModal.email)))),
                    React.createElement("div", { className: "flex gap-2 pt-1" },
                        React.createElement("a", { href: "tel:".concat(memberModal.phone.replace(/\s/g, '')), className: "flex-1 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold text-center hover:bg-emerald-600 transition flex items-center justify-center gap-1.5 shadow" },
                            React.createElement(fa6_1.FaPhone, null),
                            " Appeler"),
                        React.createElement("a", { href: "mailto:".concat(memberModal.email), className: "flex-1 py-2 rounded-xl bg-ikaBlue text-white text-xs font-bold text-center hover:bg-blue-600 transition flex items-center justify-center gap-1.5 shadow" },
                            React.createElement(fa6_1.FaEnvelope, null),
                            " Envoyer un e-mail")))))),
        galleryModal !== null && (React.createElement("div", { className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4", onClick: function (e) { if (e.target === e.currentTarget)
                setGalleryModal(null); } },
            React.createElement("div", { className: "absolute top-4 left-0 right-0 flex items-center justify-between px-6 z-10" },
                React.createElement("span", { className: "text-white/70 text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full" },
                    galleryIndex + 1,
                    " / ",
                    GALLERY.length),
                React.createElement("button", { onClick: function () { return setGalleryModal(null); }, className: "w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20" },
                    React.createElement(fa6_1.FaXmark, null))),
            React.createElement("div", { className: "relative w-full max-w-4xl flex items-center justify-center" },
                React.createElement("button", { onClick: function () { return setGalleryIndex((galleryIndex + GALLERY.length - 1) % GALLERY.length); }, className: "absolute left-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition -translate-x-2" },
                    React.createElement(fa6_1.FaChevronLeft, null)),
                React.createElement("img", { src: GALLERY[galleryIndex].src, alt: "", className: "max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" }),
                React.createElement("button", { onClick: function () { return setGalleryIndex((galleryIndex + 1) % GALLERY.length); }, className: "absolute right-0 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition translate-x-2" },
                    React.createElement(fa6_1.FaChevronRight, null))),
            React.createElement("div", { className: "mt-4 text-center" },
                React.createElement("p", { className: "text-white font-bold text-sm" }, GALLERY[galleryIndex].caption))))));
};
exports.Accueil = Accueil;
exports.default = exports.Accueil;
//# sourceMappingURL=Accueil.js.map