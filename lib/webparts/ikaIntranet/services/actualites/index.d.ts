import { IComment } from '../shared/index';
export interface IActualite {
    id: number;
    img: string;
    title: string;
    text: string;
    longText: string;
    category: string;
    time: string;
    author: string;
    likedBy: string[];
    comments: IComment[];
}
export declare function loadActualites(siteUrl: string): Promise<IActualite[]>;
export declare function updateActualiteLikedBy(siteUrl: string, itemId: number, likedBy: string[]): Promise<boolean>;
export declare function updateActualiteComments(siteUrl: string, itemId: number, comments: IComment[]): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map