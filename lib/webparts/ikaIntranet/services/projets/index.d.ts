export interface IProjet {
    id: number;
    name: string;
    start: string;
    end: string;
    status: string;
    cls: string;
    client: string;
    description: string;
    members: string;
}
export declare function loadProjets(siteUrl: string): Promise<IProjet[]>;
//# sourceMappingURL=index.d.ts.map