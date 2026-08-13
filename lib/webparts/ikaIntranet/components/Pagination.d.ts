import * as React from 'react';
export interface IPaginationProps {
    total: number;
    page: number;
    pageSize?: number;
    labelSingular?: string;
    labelPlural?: string;
    onPageChange: (page: number) => void;
}
export declare const Pagination: React.FC<IPaginationProps>;
export default Pagination;
//# sourceMappingURL=Pagination.d.ts.map