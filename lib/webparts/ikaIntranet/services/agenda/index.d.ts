export interface IAgendaItem {
    id: number;
    month: string;
    day: string;
    bg: string;
    title: string;
    time: string;
    location: string;
    category: string;
    organizer: string;
    text: string;
    start?: string;
    end?: string;
}
export declare function loadAgendas(siteUrl: string): Promise<IAgendaItem[]>;
//# sourceMappingURL=index.d.ts.map