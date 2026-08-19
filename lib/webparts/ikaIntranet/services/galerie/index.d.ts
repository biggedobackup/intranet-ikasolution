export interface IGalerieFolder {
    name: string;
    serverRelativeUrl: string;
    itemCount: number;
}
export interface IGalerieImage {
    id: string;
    name: string;
    title: string;
    description: string;
    url: string;
}
export declare function isImageFile(fileName: string): boolean;
export declare function getGalerieRootFolder(siteUrl: string): Promise<string>;
export declare function loadGalerieFolders(siteUrl: string, rootUrl: string): Promise<IGalerieFolder[]>;
export declare function loadGalerieImages(siteUrl: string, folderUrl: string): Promise<IGalerieImage[]>;
//# sourceMappingURL=index.d.ts.map