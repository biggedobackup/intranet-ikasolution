import * as React from 'react';
export interface IFooterLink {
    Title: string;
    URL: string;
}
export interface IFooterColumn {
    Category: string;
    links: IFooterLink[];
}
export interface IFooterProps {
    columns?: IFooterColumn[];
    siteName?: string;
    logoUrl?: string;
}
export declare const Footer: React.FC<IFooterProps>;
export default Footer;
//# sourceMappingURL=Footer.d.ts.map