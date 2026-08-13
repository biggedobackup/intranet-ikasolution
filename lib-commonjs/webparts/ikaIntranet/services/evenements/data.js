"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENEMENTS = void 0;
var IMG = {
    seminar: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    workshop: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    teambuilding: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
};
exports.EVENEMENTS = [
    {
        id: 1,
        img: IMG.seminar,
        title: 'Séminaire Innovation & Transformation Digitale',
        dateIcon: 'text-amber-400',
        date: '25 - 27 Juillet 2026',
        locationIcon: 'text-amber-400',
        location: 'Ouagadougou, Burkina Faso',
        category: 'Séminaire',
        text: "3 jours d'échanges et d'ateliers autour de l'innovation, des architectures Cloud et de la transformation digitale des entreprises.",
        longText: "Le Séminaire Innovation & Transformation Digitale réunit chaque année les collaborateurs, partenaires et experts du numérique autour des grands enjeux de la transformation digitale. Au programme : conférences plénières, ateliers pratiques, démonstrations de solutions Cloud et retours d'expérience clients. Une occasion unique de découvrir les nouvelles tendances technologiques et de contribuer à la feuille de route digitale d'IKA SOLUTION.",
        speaker: 'Jean OUEDRAOGO — Directeur Général',
        seats: '120 places'
    },
    {
        id: 2,
        img: IMG.workshop,
        title: 'Workshop SharePoint Framework (SPFx)',
        dateIcon: 'text-emerald-400',
        date: '12 Août 2026',
        locationIcon: 'text-emerald-400',
        location: 'Lab DEV IKA SOLUTION',
        category: 'Workshop',
        text: "Montée en compétences sur la création des composants WebPart sur-mesure et l'intégration API pour le portail intranet.",
        longText: "Session de formation technique dédiée à l'équipe développement sur SharePoint Framework (SPFx) version 1.23. Les participants apprendront à scaffolder un projet, créer des WebParts sur-mesure, exploiter les API REST SharePoint, gérer le cache intelligent et déployer la solution dans le catalogue d'applications. La formation alterne théorie et pratique sur des cas concrets du portail intranet.",
        speaker: 'Mouhamed TRAORÉ — Développeur Senior',
        seats: '20 places'
    },
    {
        id: 3,
        img: IMG.teambuilding,
        title: 'Afterwork de rentrée & Tech Outdoor Challenge',
        dateIcon: 'text-purple-400',
        date: '05 Septembre 2026',
        locationIcon: 'text-purple-400',
        location: 'Espace Plein Air — Bangr Weogo',
        category: 'Team Building',
        text: "Un moment de partage, d'activités de cohésion et de détente apprécié par l'ensemble des équipes d'IKA SOLUTION.",
        longText: "L'Afterwork de rentrée est l'événement social phare de la rentrée. Au programme : activités de team building en plein air, challenges sportifs et techniques, repas convivial et remise des trophées. C'est l'occasion parfaite de renforcer les liens entre collaborateurs des différents départements dans un cadre détendu et festif.",
        speaker: 'Kadiatou OUEDRAOGO — Chargée RH',
        seats: '80 places'
    }
];
//# sourceMappingURL=data.js.map