export interface IBilan {
    id: number;
    period: string;
    summary: string;
    file: string;
    fileUrl: string;
    size: string;
}
export declare function loadBilans(siteUrl: string): Promise<IBilan[]>;
//# sourceMappingURL=index.d.ts.map