export type VacanceStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export interface IVacance {
    id: number;
    titre: string;
    demandeur: string;
    destination: string;
    dateDebut: string;
    dateFin: string;
    jours: number;
    motif: string;
    validateur?: string;
    statut: VacanceStatus;
    createdAt: string;
    decisionComment?: string;
    decisionDate?: string;
}
export declare const VACANCE_VALIDATEURS: string[];
export declare const VACANCES: IVacance[];
//# sourceMappingURL=data.d.ts.map