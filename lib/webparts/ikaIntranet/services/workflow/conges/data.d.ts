export type CongeStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type TypeConge = 'Congé annuel' | 'Congé exceptionnel' | 'Congé de maladie' | 'Congé de maternité' | 'Congé de paternité';
export interface IConge {
    id: number;
    titre: string;
    demandeur: string;
    type: TypeConge;
    dateDebut: string;
    dateFin: string;
    jours: number;
    motif: string;
    validateur?: string;
    statut: CongeStatus;
    createdAt: string;
    decisionComment?: string;
    decisionDate?: string;
}
export declare const CONGE_VALIDATEURS: string[];
export declare const CONGES: IConge[];
//# sourceMappingURL=data.d.ts.map