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
export declare function loadMembres(siteUrl: string): Promise<IMembre[]>;
//# sourceMappingURL=index.d.ts.map