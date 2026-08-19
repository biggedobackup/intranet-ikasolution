import { IComment } from '../shared/index';
export interface IEmployeMois {
    id: number;
    name: string;
    role: string;
    dept: string;
    photo: string;
    month: string;
    year: string;
    quote: string;
    likedBy: string[];
    comments: IComment[];
}
export declare function loadEmployesMois(siteUrl: string): Promise<IEmployeMois[]>;
export declare function updateEmployeMoisLikedBy(siteUrl: string, itemId: number, likedBy: string[]): Promise<boolean>;
export declare function updateEmployeMoisComments(siteUrl: string, itemId: number, comments: IComment[]): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map