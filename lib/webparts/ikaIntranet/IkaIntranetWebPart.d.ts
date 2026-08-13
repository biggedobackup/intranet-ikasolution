import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import './assets/css/tailwind.css';
import './assets/css/style.css';
export interface IIkaIntranetWebPartProps {
    description: string;
}
export default class IkaIntranetWebPart extends BaseClientSideWebPart<IIkaIntranetWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    private _injectHideStyles;
    private _removeSharePointConstraints;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=IkaIntranetWebPart.d.ts.map