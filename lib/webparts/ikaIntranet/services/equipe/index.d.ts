import { MSGraphClientV3 } from '@microsoft/sp-http';
export interface IMembre {
    id: number;
    name: string;
    role: string;
    dept: string;
    phone: string;
    email: string;
    avatar: string;
    bio: string;
}
export declare const DEPT_COLORS: Record<string, string>;
export declare function loadMembres(siteUrl: string, force?: boolean): Promise<IMembre[]>;
export interface IAadUser {
    displayName: string;
    email: string;
    jobTitle: string;
    department: string;
    phone: string;
}
export declare function fetchAadUsers(graphClient: MSGraphClientV3): Promise<IAadUser[]>;
export interface IImportAadResult {
    created: number;
    updated: number;
    errors: number;
    total: number;
}
export declare function importMembresFromAad(siteUrl: string, graphClient: MSGraphClientV3): Promise<IImportAadResult>;
//# sourceMappingURL=index.d.ts.map