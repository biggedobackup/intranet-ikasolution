import { IComment } from '../shared/index';
export interface IAnnonce {
    id: number;
    type: string;
    title: string;
    time: string;
    text: string;
    avatar: string;
    badge: string;
    likedBy: string[];
    comments: IComment[];
}
export declare function loadAnnonces(siteUrl: string): Promise<IAnnonce[]>;
export declare function updateAnnonceLikedBy(siteUrl: string, itemId: number, likedBy: string[]): Promise<boolean>;
export declare function updateAnnonceComments(siteUrl: string, itemId: number, comments: IComment[]): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map