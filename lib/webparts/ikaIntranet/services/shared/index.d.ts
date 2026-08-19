export declare function isBlank(value: string): boolean;
export declare function isValidEmail(value: string): boolean;
export declare function escapeHtml(value: string): string;
export declare function getAppPageUrl(): string;
export declare function sendEmail(siteUrl: string, to: string[], subject: string, body: string): Promise<boolean>;
export declare function computeJoursInclusive(dateDebut: string, dateFin: string): number | undefined;
export interface IComment {
    user: string;
    email: string;
    text: string;
    date: string;
}
export declare function getCurrentUserEmail(siteUrl: string): Promise<string>;
export declare function getCurrentUserName(siteUrl: string): Promise<string>;
export interface ISpUser {
    id: number;
    title: string;
    email: string;
    loginName: string;
}
export declare function getCurrentUser(siteUrl: string): Promise<ISpUser | undefined>;
export declare function ensureUser(siteUrl: string, logonName: string): Promise<ISpUser | undefined>;
export interface ISearchUser {
    displayName: string;
    email: string;
    loginName: string;
}
export declare function searchUsers(siteUrl: string, query: string): Promise<ISearchUser[]>;
export declare function getFieldMap(siteUrl: string, listName: string): Promise<Record<string, string>>;
export declare function getVal(item: Record<string, unknown>, map: Record<string, string>, display: string, fallbacks?: string[]): unknown;
export declare function getListEntityTypeFullName(siteUrl: string, listName: string): Promise<string>;
export declare function createListItem(siteUrl: string, listName: string, fields: Record<string, unknown>): Promise<number | undefined>;
export declare function updateListItemFields(siteUrl: string, listName: string, itemId: number, fields: Record<string, unknown>): Promise<boolean>;
export declare function deleteListItem(siteUrl: string, listName: string, itemId: number): Promise<boolean>;
export interface IAttachment {
    fileName: string;
    url: string;
}
export declare function getAttachments(siteUrl: string, listName: string, itemId: number): Promise<IAttachment[]>;
export declare function addAttachment(siteUrl: string, listName: string, itemId: number, file: File): Promise<boolean>;
export declare function deleteAttachment(siteUrl: string, listName: string, itemId: number, fileName: string): Promise<boolean>;
export declare function parseLikedBy(value: unknown): string[];
export declare function parseComments(value: unknown): IComment[];
export declare function getRequestDigest(siteUrl: string): Promise<string>;
export declare function patchField(siteUrl: string, listName: string, itemId: number, fieldName: string, value: unknown): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map