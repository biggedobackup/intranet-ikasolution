import { IAttachment } from '../../shared/index';
export type AbsenceStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type TypeAbsence = 'Maladie' | 'Autorisée' | 'Imprévue' | 'Rendez-vous';
export declare const ABSENCE_TYPES: TypeAbsence[];
export declare const ABSENCE_STATUTS: AbsenceStatus[];
export interface IAbsence {
    id: number;
    titre: string;
    demandeurId?: number;
    demandeur: string;
    demandeurEmail: string;
    type: TypeAbsence;
    dateDebut: string;
    dateFin: string;
    jours: number;
    motif: string;
    validateurId?: number;
    validateur: string;
    validateurEmail: string;
    statut: AbsenceStatus;
    commentaireDecision: string;
    dateDecision: string;
    createdAt: string;
    active: boolean;
}
export interface IAbsencePayload {
    titre: string;
    type: TypeAbsence;
    dateDebut: string;
    dateFin: string;
    jours: number;
    motif: string;
    validateurEmail: string;
}
export declare function formatDateFR(iso: string): string;
export declare function loadAbsences(siteUrl: string, force?: boolean): Promise<IAbsence[]>;
export declare function loadAbsence(siteUrl: string, id: number): Promise<IAbsence | undefined>;
export declare function createAbsence(siteUrl: string, payload: IAbsencePayload): Promise<number | undefined>;
export declare function updateAbsence(siteUrl: string, id: number, payload: IAbsencePayload): Promise<boolean>;
export declare function deleteAbsence(siteUrl: string, id: number): Promise<boolean>;
export declare function loadAbsenceAttachment(siteUrl: string, id: number): Promise<IAttachment | undefined>;
export declare function uploadAbsenceAttachment(siteUrl: string, id: number, file: File): Promise<boolean>;
export declare function removeAbsenceAttachment(siteUrl: string, id: number, fileName: string): Promise<boolean>;
export type DecisionAction = 'valider' | 'rejeter';
export declare function applyAbsenceDecision(siteUrl: string, absence: IAbsence, action: DecisionAction, comment: string, date: string): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map