"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANNONCES = void 0;
var IMG = {
    avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    avatar2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    avatar5: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    avatarKadiatou: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
    avatarMamadou: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
};
exports.ANNONCES = [
    {
        id: 1,
        type: 'anniversaire',
        title: 'Anniversaire',
        time: "Aujourd'hui",
        text: 'Kadiatou OUEDRAOGO fête son anniversaire !',
        avatar: IMG.avatarKadiatou,
        avatars: [],
        badge: 'border-2 border-amber-400'
    },
    {
        id: 2,
        type: 'mariage',
        title: 'Mariage',
        time: 'Hier',
        text: 'Félicitations à Issa et Aïcha pour leur mariage.',
        avatar: '',
        avatars: [IMG.avatar5, IMG.avatar2],
        badge: 'border border-slate-300'
    },
    {
        id: 3,
        type: 'absence',
        title: 'Absence',
        time: '2 jours',
        text: 'Mamadou sera en congé du 21 au 25 juillet.',
        avatar: IMG.avatarMamadou,
        avatars: [],
        badge: 'border border-slate-300'
    },
    {
        id: 4,
        type: 'mariage',
        title: 'Naissance',
        time: '1 semaine',
        text: 'Bienvenue au petit dernier de la famille TRAORÉ !',
        avatar: IMG.avatar1,
        avatars: [],
        badge: 'border-2 border-emerald-400'
    }
];
//# sourceMappingURL=data.js.map