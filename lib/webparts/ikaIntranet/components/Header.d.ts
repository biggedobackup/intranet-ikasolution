import * as React from 'react';
export interface IMenuItem {
    Title: string;
    MenuUrl: string;
    children?: IMenuItem[];
}
export interface IHeaderProps {
    menuItems?: IMenuItem[];
    logoUrl?: string;
}
export declare const Header: React.FC<IHeaderProps>;
export default Header;
//# sourceMappingURL=Header.d.ts.map