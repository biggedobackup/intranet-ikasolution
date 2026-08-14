import { IComment } from '../shared/index';
export interface IEvenement {
    id: number;
    img: string;
    title: string;
    dateIcon: string;
    date: string;
    locationIcon: string;
    location: string;
    category: string;
    text: string;
    longText: string;
    speaker: string;
    seats: string;
    likedBy: string[];
    comments: IComment[];
}
export declare function loadEvenements(siteUrl: string): Promise<IEvenement[]>;
export declare function updateEvenementLikedBy(siteUrl: string, itemId: number, likedBy: string[]): Promise<boolean>;
export declare function updateEvenementComments(siteUrl: string, itemId: number, comments: IComment[]): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map