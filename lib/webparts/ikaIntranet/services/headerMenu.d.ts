export interface IHeaderMenuItem {
    Title: string;
    MenuUrl: string;
    children?: IHeaderMenuItem[];
}
export declare function loadHeaderMenu(siteUrl: string): Promise<IHeaderMenuItem[]>;
//# sourceMappingURL=headerMenu.d.ts.map