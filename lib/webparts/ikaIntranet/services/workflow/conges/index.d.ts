import { IAttachment } from '../../shared/index';
export type CongeStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type TypeConge = 'Congé annuel' | 'Congé exceptionnel' | 'Congé de maladie' | 'Congé de maternité' | 'Congé de paternité';
export declare const CONGE_TYPES: TypeConge[];
export declare const CONGE_STATUTS: CongeStatus[];
export interface IConge {
    id: number;
    titre: string;
    demandeurId?: number;
    demandeur: string;
    demandeurEmail: string;
    type: TypeConge;
    dateDebut: string;
    dateFin: string;
    jours: number;
    motif: string;
    validateurId?: number;
    validateur: string;
    validateurEmail: string;
    statut: CongeStatus;
    commentaireDecision: string;
    dateDecision: string;
    createdAt: string;
    active: boolean;
}
export interface ICongePayload {
    titre: string;
    type: TypeConge;
    dateDebut: string;
    dateFin: string;
    jours: number;
    motif: string;
    validateurEmail: string;
}
export declare function formatDateFR(iso: string): string;
export declare function loadConges(siteUrl: string, force?: boolean): Promise<IConge[]>;
export declare function loadConge(siteUrl: string, id: number): Promise<IConge | undefined>;
export declare function createConge(siteUrl: string, payload: ICongePayload): Promise<number | undefined>;
export declare function updateConge(siteUrl: string, id: number, payload: ICongePayload): Promise<boolean>;
export declare function deleteConge(siteUrl: string, id: number): Promise<boolean>;
export declare function loadCongeAttachment(siteUrl: string, id: number): Promise<IAttachment | undefined>;
export declare function uploadCongeAttachment(siteUrl: string, id: number, file: File): Promise<boolean>;
export declare function removeCongeAttachment(siteUrl: string, id: number, fileName: string): Promise<boolean>;
export type DecisionAction = 'valider' | 'rejeter';
export declare function applyCongeDecision(siteUrl: string, conge: IConge, action: DecisionAction, comment: string, date: string): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map