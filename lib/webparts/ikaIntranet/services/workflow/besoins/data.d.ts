export type BesoinStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type TypeBesoin = 'Matériel informatique' | 'Formation' | 'Logiciel' | 'Autre';
export type PrioriteBesoin = 'Basse' | 'Moyenne' | 'Haute';
export interface IBesoin {
    id: number;
    titre: string;
    demandeur: string;
    type: TypeBesoin;
    priorite: PrioriteBesoin;
    dateSouhaitee: string;
    description: string;
    validateur?: string;
    statut: BesoinStatus;
    createdAt: string;
    decisionComment?: string;
    decisionDate?: string;
}
export declare const BESOIN_VALIDATEURS: string[];
export declare const BESOINS: IBesoin[];
//# sourceMappingURL=data.d.ts.map