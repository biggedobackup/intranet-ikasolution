export interface IComment {
    user: string;
    email: string;
    text: string;
    date: string;
}
export declare function getCurrentUserEmail(siteUrl: string): Promise<string>;
export declare function getCurrentUserName(siteUrl: string): Promise<string>;
export declare function parseLikedBy(value: unknown): string[];
export declare function parseComments(value: unknown): IComment[];
export declare function getRequestDigest(siteUrl: string): Promise<string>;
export declare function patchField(siteUrl: string, listName: string, itemId: number, fieldName: string, value: unknown): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map