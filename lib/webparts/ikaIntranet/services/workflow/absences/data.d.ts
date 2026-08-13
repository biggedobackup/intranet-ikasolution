export type AbsenceStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type TypeAbsence = 'Maladie' | 'Autorisée' | 'Imprévue' | 'Rendez-vous';
export interface IAbsence {
    id: number;
    titre: string;
    demandeur: string;
    type: TypeAbsence;
    dateDebut: string;
    dateFin: string;
    motif: string;
    validateur?: string;
    statut: AbsenceStatus;
    createdAt: string;
    decisionComment?: string;
    decisionDate?: string;
}
export declare const ABSENCE_VALIDATEURS: string[];
export declare const ABSENCES: IAbsence[];
//# sourceMappingURL=data.d.ts.map