import { IAttachment } from '../../shared/index';
export type BesoinStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type PrioriteBesoin = 'Basse' | 'Moyenne' | 'Haute';
export declare const BESOIN_PRIORITES: PrioriteBesoin[];
export declare const BESOIN_STATUTS: BesoinStatus[];
export interface IBesoin {
    id: number;
    titre: string;
    demandeurId?: number;
    demandeur: string;
    demandeurEmail: string;
    priorite: PrioriteBesoin;
    dateSouhaitee: string;
    description: string;
    validateurId?: number;
    validateur: string;
    validateurEmail: string;
    statut: BesoinStatus;
    commentaireDecision: string;
    dateDecision: string;
    createdAt: string;
    active: boolean;
}
export interface IBesoinPayload {
    titre: string;
    priorite: PrioriteBesoin;
    dateSouhaitee: string;
    description: string;
    validateurEmail: string;
}
export declare function formatDateFR(iso: string): string;
export declare function loadBesoins(siteUrl: string, force?: boolean): Promise<IBesoin[]>;
export declare function loadBesoin(siteUrl: string, id: number): Promise<IBesoin | undefined>;
export declare function createBesoin(siteUrl: string, payload: IBesoinPayload): Promise<number | undefined>;
export declare function updateBesoin(siteUrl: string, id: number, payload: IBesoinPayload): Promise<boolean>;
export declare function deleteBesoin(siteUrl: string, id: number): Promise<boolean>;
export declare function loadBesoinAttachment(siteUrl: string, id: number): Promise<IAttachment | undefined>;
export declare function uploadBesoinAttachment(siteUrl: string, id: number, file: File): Promise<boolean>;
export declare function removeBesoinAttachment(siteUrl: string, id: number, fileName: string): Promise<boolean>;
export type DecisionAction = 'valider' | 'rejeter';
export declare function applyBesoinDecision(siteUrl: string, besoin: IBesoin, action: DecisionAction, comment: string, date: string): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map