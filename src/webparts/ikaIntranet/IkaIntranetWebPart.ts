import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import '@microsoft/sp-http';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'IkaIntranetWebPartStrings';

import './assets/css/tailwind.css';
import './assets/css/style.css';

import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

export interface IIkaIntranetWebPartProps {
  description: string;
}

export default class IkaIntranetWebPart extends BaseClientSideWebPart<IIkaIntranetWebPartProps> {
  protected onInit(): Promise<void> {
    const fontId = 'ika-intranet-fonts';
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
      document.head.appendChild(link);
    }
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement = React.createElement(
      ErrorBoundary,
      null,
      React.createElement(App, {
        siteUrl: this.context.pageContext.web.absoluteUrl,
        msGraphClientFactory: this.context.msGraphClientFactory
      })
    );

    ReactDOM.render(element, this.domElement);
    this._removeSharePointConstraints();
    this._injectHideStyles();
  }

  private _injectHideStyles(): void {
    const styleId = 'ika-intranet-hide-nav';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = [
      '[dir=ltr] .s_Yo8kY_SIvUI, [dir=ltr] .s_fH4eG_SIvUI {',
      '  display: none !important;',
      '}',
      '#spLeftNav, #sideNavBox {',
      '  display: none !important;',
      '}',
      '.CanvasZone, .ControlZone {',
      '  max-width: none !important;',
      '}',
      '.spAppAndPropertyPanelContainer .sp-appBar.sp-appBar-ngsp {',
      '  display: none !important;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  private _removeSharePointConstraints(): void {
    const el = this.domElement;
    if (!el) return;
    const suiteBar = document.getElementById('suiteBarDelta');
    const suiteBarHeight = suiteBar && suiteBar.offsetHeight > 0 ? suiteBar.offsetHeight : 48;

    el.style.setProperty('position', 'fixed', 'important');
    el.style.setProperty('top', suiteBarHeight + 'px', 'important');
    el.style.setProperty('left', '0', 'important');
    el.style.setProperty('width', '100vw', 'important');
    el.style.setProperty('height', `calc(100vh - ${suiteBarHeight}px)`, 'important');
    el.style.setProperty('max-width', '100vw', 'important');
    el.style.setProperty('margin', '0', 'important');
    el.style.setProperty('padding', '0', 'important');
    el.style.setProperty('z-index', '1', 'important');
    el.style.setProperty('overflow-y', 'auto', 'important');
    el.style.setProperty('overflow-x', 'hidden', 'important');
    el.style.setProperty('background', '#fff', 'important');

    ['sideNavBox', 'footer', 'globalNavBox', 'DeltaTopNavigation', 'DeltaSuiteNavigation', 'workbench-page'].forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        node.style.setProperty('display', 'none', 'important');
        node.style.setProperty('height', '0', 'important');
      }
    });

    let parent = el.parentElement;
    while (parent && parent !== document.body) {
      parent.style.setProperty('max-width', 'none', 'important');
      parent.style.setProperty('width', '100%', 'important');
      parent.style.setProperty('padding', '0', 'important');
      parent.style.setProperty('margin', '0', 'important');
      parent = parent.parentElement;
    }
  }

  protected onDispose(): void {
    ReactDOM.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', { label: strings.DescriptionFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
