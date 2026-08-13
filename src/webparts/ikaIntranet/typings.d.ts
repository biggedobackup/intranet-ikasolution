declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'IkaIntranetWebPartStrings' {
  const strings: {
    PropertyPaneDescription: string;
    BasicGroupName: string;
    DescriptionFieldLabel: string;
    AppLocalEnvironmentSharePoint: string;
    AppSharePointEnvironment: string;
    AppLocalEnvironmentTeams: string;
    AppTeamsTabEnvironment: string;
    AppLocalEnvironmentOffice: string;
    AppOfficeEnvironment: string;
    AppLocalEnvironmentOutlook: string;
    AppOutlookEnvironment: string;
    UnknownEnvironment: string;
  };
  export = strings;
}
