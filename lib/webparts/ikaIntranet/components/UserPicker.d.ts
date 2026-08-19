import * as React from 'react';
export interface IUserPickerProps {
    siteUrl?: string;
    value: string;
    onChange: (email: string) => void;
    placeholder?: string;
    className?: string;
}
export declare const UserPicker: React.FC<IUserPickerProps>;
export default UserPicker;
//# sourceMappingURL=UserPicker.d.ts.map