import { IAttachment } from '../../shared/index';
export type VacanceStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export declare const VACANCE_STATUTS: VacanceStatus[];
export interface IVacance {
    id: number;
    titre: string;
    demandeurId?: number;
    demandeur: string;
    demandeurEmail: string;
    destination: string;
    dateDebut: string;
    dateFin: string;
    jours: number;
    motif: string;
    validateurId?: number;
    validateur: string;
    validateurEmail: string;
    statut: VacanceStatus;
    commentaireDecision: string;
    dateDecision: string;
    createdAt: string;
    active: boolean;
}
export interface IVacancePayload {
    titre: string;
    destination: string;
    dateDebut: string;
    dateFin: string;
    jours: number;
    motif: string;
    validateurEmail: string;
}
export declare function formatDateFR(iso: string): string;
export declare function loadVacances(siteUrl: string, force?: boolean): Promise<IVacance[]>;
export declare function loadVacance(siteUrl: string, id: number): Promise<IVacance | undefined>;
export declare function createVacance(siteUrl: string, payload: IVacancePayload): Promise<number | undefined>;
export declare function updateVacance(siteUrl: string, id: number, payload: IVacancePayload): Promise<boolean>;
export declare function deleteVacance(siteUrl: string, id: number): Promise<boolean>;
export declare function loadVacanceAttachment(siteUrl: string, id: number): Promise<IAttachment | undefined>;
export declare function uploadVacanceAttachment(siteUrl: string, id: number, file: File): Promise<boolean>;
export declare function removeVacanceAttachment(siteUrl: string, id: number, fileName: string): Promise<boolean>;
export type DecisionAction = 'valider' | 'rejeter';
export declare function applyVacanceDecision(siteUrl: string, vacance: IVacance, action: DecisionAction, comment: string, date: string): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map