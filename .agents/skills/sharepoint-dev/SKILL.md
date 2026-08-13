---
name: sharepoint-dev
description: >
  Skill complet et autonome pour créer un projet intranet SharePoint SPFx
  de type IKASOLUTION / Coris Holding depuis zéro. Déclenché lorsque
  l'utilisateur demande de créer ou modifier un projet intranet SharePoint,
  une page, un service, un composant, une fonctionnalité sociale
  (likes/commentaires), une galerie, un organigramme, un menu dynamique,
  un footer dynamique ou tout élément suivant cette architecture :
  SPFx 1.23 + TypeScript + Heft (sans Gulp) + Bootstrap 5 + Swiper +
  jQuery + Bootstrap Icons, rendu DOM pur innerHTML, routing SPA hash,
  cache intelligent (sessionStorage + Modified/ItemCount), REST API SharePoint.
---

# Skill SPFx Intranet IKASOLUTION — Création Complète Depuis Zéro

> **Ce skill est autonome.** Il permet à un agent de prendre la description
> d'un intranet et de livrer un projet SPFx complet :
> installation, configuration, tous les fichiers de code.
> Architecture identique au projet Coris Holding.

---

## RÈGLE FONDAMENTALE — PAS DE REACT

React est déclaré dans `package.json` uniquement parce que SPFx le requiert.
**Tout le rendu se fait via `domElement.innerHTML` et des template literals
TypeScript.** Pas de composants React, pas de JSX, pas de hooks.

---

## 1. Stack Technologique Complète

| Technologie | Version | Rôle |
|---|---|---|
| **SPFx** | 1.23.0 | Framework SharePoint |
| **TypeScript** | ~5.8.0 | Langage unique |
| **Node.js** | >=22.14.0 <23 | Runtime OBLIGATOIRE |
| **Heft** | 1.2.17 | Build tool (remplace Gulp) |
| **Bootstrap CSS** | 5.3.3 | Grid, UI, modals (bundled en assets) |
| **Bootstrap JS** | 5.3.3 | Modals JS (chargé dynamiquement via script tag) |
| **Bootstrap Icons** | bundled | Icônes `bi bi-*` |
| **Swiper** | 12.x | Sliders / carrousels (bundled) |
| **jQuery** | 3.7.1 | Tabs, helpers (bundled) |
| **OrgChart Plugin** | jquery.orgchart | Organigrammes hiérarchiques |
| **react / react-dom** | 17.0.1 | Déclaré MAIS PAS utilisé pour le rendu |

---

## 2. package.json Complet

```json
{
  "name": "<nom-du-projet>",
  "version": "0.0.1",
  "private": true,
  "engines": { "node": ">=22.14.0 < 23.0.0" },
  "scripts": {
    "build": "heft test --clean --production && heft package-solution --production",
    "clean": "heft clean",
    "start": "heft start --clean"
  },
  "dependencies": {
    "@fluentui/react": "^8.106.4",
    "@microsoft/sp-component-base": "1.23.0",
    "@microsoft/sp-core-library": "1.23.0",
    "@microsoft/sp-lodash-subset": "1.23.0",
    "@microsoft/sp-office-ui-fabric-core": "1.23.0",
    "@microsoft/sp-property-pane": "1.23.0",
    "@microsoft/sp-webpart-base": "1.23.0",
    "bootstrap": "^5.3.3",
    "react": "17.0.1",
    "react-dom": "17.0.1",
    "react-icons": "^4.12.0",
    "react-router": "^5.3.4",
    "react-router-dom": "^5.3.4",
    "swiper": "^12.2.0",
    "tslib": "2.3.1"
  },
  "devDependencies": {
    "@microsoft/eslint-config-spfx": "1.23.0",
    "@microsoft/eslint-plugin-spfx": "1.23.0",
    "@microsoft/sp-module-interfaces": "1.23.0",
    "@microsoft/spfx-heft-plugins": "1.23.0",
    "@microsoft/spfx-web-build-rig": "1.23.0",
    "@rushstack/heft": "1.2.17",
    "@types/jest": "30.0.0",
    "@types/react": "17.0.45",
    "@types/react-dom": "17.0.17",
    "@types/react-router-dom": "^5.3.3",
    "@types/webpack-env": "~1.15.2",
    "concurrently": "^10.0.3",
    "css-loader": "~7.1.2",
    "eslint": "9.37.0",
    "eslint-plugin-react-hooks": "5.2.0",
    "postcss-loader": "^8.2.1",
    "style-loader": "^4.0.0",
    "typescript": "~5.8.0"
  },
  "overrides": { "@rushstack/heft": "1.2.17" },
  "resolutions": { "@types/react": "17.0.45" }
}
```

---

## 3. Installation Pas à Pas

```powershell
# 1. Vérifier la version Node OBLIGATOIRE
node --version   # Doit être >=22.14.0 <23

# 2. Installer les outils globaux
npm install -g @microsoft/generator-sharepoint
npm install -g yo

# 3. Scaffolder le projet
yo @microsoft/sharepoint
# Répondre : WebPart, React template, nom du webpart, SPO environment

# 4. Installer les dépendances supplémentaires
npm install bootstrap@^5.3.3 swiper@^12.2.0 react-icons@^4.12.0

# 5. Commandes de développement
npm start       # Workbench local -> https://localhost:4321/temp/workbench.html
npm run build   # Build production + genere release/*.sppkg
npm run clean   # Nettoyage
```

---

## 4. Structure Complète du Projet

```
<nom-projet>/
├── package.json
├── tsconfig.json
├── .yo-rc.json
├── eslint.config.js
├── config/
│   ├── config.json               <- bundles + localizedResources
│   ├── package-solution.json     <- id solution, skipFeatureDeployment
│   ├── rig.json
│   ├── sass.json
│   ├── serve.json
│   ├── typescript.json
│   └── write-manifests.json
└── src/
    └── webparts/
        └── <NomWebPart>/
            ├── <NomWebPart>WebPart.ts     <- FICHIER PRINCIPAL
            ├── <NomWebPart>WebPart.manifest.json
            ├── typings.d.ts
            ├── loc/
            │   ├── en-us.js
            │   └── mystrings.d.ts
            ├── assets/
            │   ├── css/
            │   │   ├── bootstrap.min.css
            │   │   ├── swiper-bundle.min.css
            │   │   ├── style.css
            │   │   └── style2.css          <- CSS principal intranet
            │   ├── bootstrap-icons/
            │   │   └── bootstrap-icons.css <- + dossier fonts/
            │   ├── js/
            │   │   ├── jquery-3.7.1.min.js
            │   │   ├── bootstrap.bundle.min.js
            │   │   ├── bootstrap.bundle.min.js.map
            │   │   ├── swiper-bundle.min.js
            │   │   ├── swiper-bundle.min.js.map
            │   │   ├── main.js             <- JS custom intranet
            │   │   ├── Orgchart.js         <- Logique organigramme custom
            │   │   ├── jquery.orgchart.min.js
            │   │   └── jquery.orgchart.css.js
            │   └── imges/                  <- Logo, fallbacks, images statiques
            ├── components/
            │   ├── Header.ts               <- HTML header (template literal)
            │   ├── Sidebar.ts              <- HTML sidebar (template literal)
            │   └── Footer.ts               <- HTML footer fallback
            ├── pages/                      <- Templates HTML de chaque page
            │   ├── Accueil.ts
            │   ├── Vision.ts
            │   ├── Mission.ts
            │   ├── Valeurs.ts
            │   ├── Directions.ts
            │   ├── Organigramme.ts
            │   ├── Trombinoscope.ts
            │   ├── detail-actualite.ts
            │   ├── toutes-les-actualites.ts
            │   └── page-404.ts
            └── services/
                ├── cache.ts               <- Cache 2 niveaux (Map + sessionStorage)
                ├── utils.ts               <- resolveImage (AttachmentFiles)
                ├── headerMenu.ts          <- Menu dynamique SharePoint
                ├── footer.ts              <- Footer dynamique SharePoint
                ├── headerVideo.ts         <- Video YouTube en-tete
                ├── social.ts              <- Likes + Commentaires
                ├── accueil.ts
                ├── actualites.ts
                ├── agenda.ts
                ├── annonces.ts
                ├── evenements.ts
                ├── produits.ts
                ├── collaborateur.ts
                ├── direction.ts
                ├── employes-du-mois.ts
                ├── mission.ts
                ├── valeur.ts
                ├── vision.ts
                ├── organigramme.ts
                └── survey.ts
```

---

## 5. Fichiers de Configuration

### config/package-solution.json
```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json",
  "solution": {
    "name": "<nom>-client-side-solution",
    "id": "<GUID-solution-unique>",
    "version": "1.0.0.0",
    "includeClientSideAssets": true,
    "skipFeatureDeployment": true,
    "isDomainIsolated": false,
    "developer": { "name": "", "websiteUrl": "", "privacyUrl": "", "termsOfUseUrl": "", "mpnId": "Undefined-1.23.0" },
    "features": [{
      "title": "<nom> Feature",
      "description": "Feature de la solution.",
      "id": "<GUID-feature-unique>",
      "version": "1.0.0.0"
    }]
  },
  "paths": { "zippedPackage": "solution/<nom>.sppkg" }
}
```

### config/config.json
```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/config.2.0.schema.json",
  "version": "2.0",
  "bundles": {
    "<nom>-web-part": {
      "components": [{
        "entrypoint": "./lib/webparts/<nomWebPart>/<NomWebPart>WebPart.js",
        "manifest": "./src/webparts/<nomWebPart>/<NomWebPart>WebPart.manifest.json"
      }]
    }
  },
  "externals": {},
  "localizedResources": {
    "<NomWebPart>WebPartStrings": "lib/webparts/<nomWebPart>/loc/{locale}.js"
  }
}
```

### Manifest WebPart — CRITIQUE
```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json",
  "id": "<GUID-webpart-unique>",
  "alias": "<NomWebPart>",
  "componentType": "WebPart",
  "version": "*",
  "manifestVersion": 2,
  "requiresCustomScript": false,
  "supportedHosts": ["SharePointWebPart", "TeamsPersonalApp", "TeamsTab", "SharePointFullPage"],
  "supportsThemeVariants": true,
  "supportsFullBleed": true,
  "preconfiguredEntries": [{
    "groupId": "5c03119e-3074-46fd-976b-c60198311f70",
    "group": { "default": "Advanced" },
    "title": { "default": "Mon Intranet" },
    "description": { "default": "Intranet complet" },
    "officeFabricIconFontName": "Page",
    "properties": { "description": "Mon Intranet" }
  }]
}
```

> **OBLIGATOIRE** : `"supportsFullBleed": true` pour le mode plein ecran.

---

## 6. WebPart Principal — Imports et Declarations

```typescript
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from '<NomWebPart>WebPartStrings';

// CSS imports (bundles par webpack)
import './assets/css/bootstrap.min.css';
import './assets/css/swiper-bundle.min.css';
import './assets/bootstrap-icons/bootstrap-icons.css';
import './assets/css/style2.css';

// Page templates
import { ACCUEIL_HTML }  from './pages/Accueil';
import { HEADER_HTML }   from './components/Header';
import { PAGE_404_HTML } from './pages/page-404';
// Importer toutes les pages...

// Services
import { loadHeaderMenu }            from './services/headerMenu';
import { loadFooter }                from './services/footer';
import { cacheInvalidate, cacheGet } from './services/cache';
// Importer tous les services...

// Assets webpack — OBLIGATOIRE pour copier les fichiers dans dist/
const _assetRefs: Record<string, string> = {
  'assets/imges/logo.png': new URL('./assets/imges/logo.png', import.meta.url).toString(),
  // Ajouter TOUTES les images utilisees dans les templates HTML
};

// URLs des scripts JS (charges dynamiquement)
const _SCRIPT_JQUERY         = new URL('./assets/js/jquery-3.7.1.min.js',    import.meta.url).toString();
const _SCRIPT_BOOTSTRAP      = new URL('./assets/js/bootstrap.bundle.min.js', import.meta.url).toString();
const _SCRIPT_SWIPER         = new URL('./assets/js/swiper-bundle.min.js',   import.meta.url).toString();
const _SCRIPT_MAIN           = new URL('./assets/js/main.js',                import.meta.url).toString();
// Optionnel OrgChart:
const _SCRIPT_ORGCHARTCSS    = new URL('./assets/js/jquery.orgchart.css.js',  import.meta.url).toString();
const _SCRIPT_ORGCHARTPLUGIN = new URL('./assets/js/jquery.orgchart.min.js',  import.meta.url).toString();
const _SCRIPT_ORGCHART       = new URL('./assets/js/Orgchart.js',             import.meta.url).toString();

function setContent(id: string, html: string): void {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

export interface I<NomWebPart>Props { description: string; }

export default class <NomWebPart>WebPart extends BaseClientSideWebPart<I<NomWebPart>Props> {
  private _observer: MutationObserver | null = null;
  private _currentPage: string = '';
  private _scriptsPromise: Promise<void> | null = null;
  private _routerBound = false;
  private _boundHashChange: (() => void) | null = null;
  private _shellInitialized = false;
  private _videoUrl: string = '';
  private _socialModalBound = false;
  private _socialModalContext: { siteUrl: string; listName: string; itemId: number; userEmail: string; userDisplayName: string; prefix: string; } | null = null;
  private _galleryImages: any[] = [];
  private _galleryIndex: number = 0;
  private _collabItems: Array<Record<string, unknown>> = [];
  private _trombinoscopeItems: Array<Record<string, unknown>> = [];
  private _groupNewsSwiperInitialized = false;
```

---

## 7. onInit() — Lifecycle

```typescript
protected onInit(): Promise<void> {
  // Quitter le mode edition SharePoint automatiquement
  const url = new URL(window.location.href);
  if (url.searchParams.get('Mode')?.toLowerCase() === 'edit') {
    url.searchParams.delete('Mode');
    window.location.replace(url.toString());
    return Promise.resolve();
  }

  // CSS global pour masquer toolbars SPFx
  const styleId = '<nom>-global-fullscreen-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
      [data-automation-id="webpartToolbar"], [data-automation-id="WebPartToolbar"],
      .sp-webpart-toolbar, [class*="webpartToolbar"], [class*="toolbarContainer_"],
      [class*="editMenuButton_"] { display: none !important; pointer-events: none !important; }`;
    document.head.appendChild(style);
  }

  // Observer mutations pour re-appliquer contraintes SP
  if (!this._observer) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    this._observer = new MutationObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this._removeSharePointConstraints();
        this._hideSharePointCanvasBelow();
        this._hideSpEditToolbars();
      }, 150);
    });
    this._observer.observe(document.body, { childList: true, subtree: true, attributes: false });
  }
  return Promise.resolve();
}
```

---

## 8. render() et _renderPage()

```typescript
public render(): void {
  if (!this._shellInitialized) {
    this._shellInitialized = true;
    // Shell persistant : header fixe + zone contenu + footer
    const resolvedHeaderHtml = this._resolveAssets(HEADER_HTML);
    this.domElement.innerHTML = `
      <div id="main-header">${resolvedHeaderHtml}</div>
      <div id="page-content"></div>
      <div id="footer-container" style="display:none;"></div>
    `;
    this._removeSharePointConstraints();
    if (!this._observer) {
      this._observer = new MutationObserver(() => this._removeSharePointConstraints());
      const targetNode = document.getElementById('spPageCanvasContent') || document.body;
      this._observer.observe(targetNode, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
    }
    this._initHeader();
    void this._loadHeaderMenuData(this.context.pageContext.web.absoluteUrl);
    void this._loadHeaderVideo(this.context.pageContext.web.absoluteUrl);
    loadFooter(this.context.pageContext.web.absoluteUrl)
      .then((footerHtml) => setContent('footer-container', footerHtml))
      .catch((e) => console.error('[WebPart] Footer:', e));
    if (!this._scriptsPromise) this._scriptsPromise = this._loadScripts();
  }
  this._initRouter();
  const hash = window.location.hash.replace('#', '');
  const startPage = hash.startsWith('page-') ? hash.replace('page-', '') : 'accueil';
  this._currentPage = '';
  void this._renderPage(startPage);
}

private async _renderPage(page: string): Promise<void> {
  this._currentPage = page;
  window.scrollTo(0, 0);
  this.domElement.scrollTop = 0;
  document.body.style.overflow = '';
  this._socialModalBound = false;
  this._socialModalContext = null;
  this._groupNewsSwiperInitialized = false;

  // 1. Injecter template HTML avec spinners
  let html = this._getTemplate(page);
  html = this._resolveAssets(html);
  const contentEl = document.getElementById('page-content');
  if (contentEl) contentEl.innerHTML = html;

  // 2. Pre-remplir depuis cache synchrone (evite flash "Chargement...")
  this._prefillFromCache(page);

  // 3. Attendre les scripts JS avant les donnees
  await this._scriptsPromise;

  // 4. Charger les donnees SharePoint
  await this._loadPageData(page);

  // 5. Afficher footer
  const footerEl = document.getElementById('footer-container');
  if (footerEl) footerEl.style.display = '';

  // 6. Initialiser plugins
  this._initSwiper();
  this._initTabs();
  this._initDirectionAccordion();
  this._initAllSocialEvents(this.context.pageContext.web.absoluteUrl);
}
```

---

## 9. Router SPA Hash

```typescript
private _initRouter(): void {
  if (this._routerBound) return;
  this._routerBound = true;

  this.domElement.addEventListener('click', (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest('a[href^="#page-"]') as HTMLAnchorElement | null;
    if (!link) return;
    e.preventDefault();
    const page = link.getAttribute('href')?.replace('#page-', '') || '';
    if (page) window.location.hash = `page-${page}`;
  });

  this._boundHashChange = (): void => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('page-')) {
      const page = hash.replace('page-', '');
      if (page && page !== this._currentPage) void this._renderPage(page);
    }
  };
  window.addEventListener('hashchange', this._boundHashChange);
}
```

Format des URLs hash :
```
#page-accueil
#page-vision
#page-detail-actualite&id=42
#page-agenda-personnel
```

Liens dans les templates HTML :
```html
<a href="#page-vision">Notre Vision</a>
<a href="#page-detail-actualite&id=${item.Id}">Lire la suite</a>
```

---

## 10. Chargement Scripts JS — Fix AMD

```typescript
private _loadScripts(): Promise<void> {
  const win = window as any;
  const originalDefine = win.define;
  let currentDefine = originalDefine;
  if (originalDefine) {
    Object.defineProperty(win, 'define', {
      get: () => {
        const customDefine = (...args: any[]) => {
          if (args.length > 0 && typeof args[0] !== 'string') return;
          return currentDefine.apply(win, args);
        };
        (customDefine as any).amd = originalDefine.amd;
        return customDefine;
      },
      set: (val) => { currentDefine = val; },
      configurable: true,
    });
  }

  return this._loadScript(_SCRIPT_JQUERY)
    .then(() => this._loadScript(_SCRIPT_BOOTSTRAP))
    .then(() => this._loadScript(_SCRIPT_SWIPER))
    .then(() => this._loadScript(_SCRIPT_MAIN))
    .then(() => this._loadScript(_SCRIPT_ORGCHARTCSS))
    .then(() => this._loadScript(_SCRIPT_ORGCHARTPLUGIN))
    .then(() => this._loadScript(_SCRIPT_ORGCHART))
    .then(() => {
      if (originalDefine) Object.defineProperty(win, 'define', { value: currentDefine, writable: true, configurable: true });
    })
    .catch((err) => {
      if (originalDefine) Object.defineProperty(win, 'define', { value: currentDefine, writable: true, configurable: true });
      throw err;
    });
}

private _loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed: ' + url));
    document.head.appendChild(script);
  });
}
```

---

## 11. Contraintes SharePoint — Plein Ecran

```typescript
private _removeSharePointConstraints(): void {
  const el = this.domElement;
  if (!el) return;
  const suiteBar = document.getElementById('suiteBarDelta');
  const suiteBarHeight = (suiteBar && suiteBar.offsetHeight > 0) ? suiteBar.offsetHeight : 48;

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
    if (node) { node.style.setProperty('display', 'none', 'important'); node.style.setProperty('height', '0', 'important'); }
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

private _hideSharePointCanvasBelow(): void {
  const el = this.domElement;
  if (!el) return;
  const hide = (node: Element | null | undefined): void => {
    if (!node || node === el || el.contains(node) || node.contains(el)) return;
    (node as HTMLElement).style.setProperty('display', 'none', 'important');
  };
  const section = el.closest('[data-automation-id="CanvasSection"], .CanvasSection') as HTMLElement | null;
  if (section) {
    let sibling = section.nextElementSibling;
    while (sibling) { const next = sibling.nextElementSibling; hide(sibling); sibling = next; }
  }
  document.querySelectorAll(
    '[data-automation-id="CanvasZone-SectionToolbar"],[data-automation-id="insertZone"],' +
    '[data-automation-id="pageFooter"],#CommentsWrapper,#footer,.sp-pageLayout-spacer'
  ).forEach(hide);
}

private _hideSpEditToolbars(): void {
  const selectors = [
    '[data-automation-id="CanvasZone-SectionToolbar"]', '[data-automation-id="webpartToolbar"]',
    '.sp-webpart-toolbar', '#CommentsWrapper', '#footer',
  ];
  const classPatterns = ['sectionToolbar', 'addSection', 'insertZone', 'addWebPart',
    'pageFooter', 'canvasFooter', 'webpartToolbar', 'toolbarContainer', 'editMenuButton'];
  document.querySelectorAll(selectors.join(',')).forEach((e) => (e as HTMLElement).style.setProperty('display', 'none', 'important'));
  classPatterns.forEach((p) => document.querySelectorAll(`[class*="${p}_"]`).forEach((e) => (e as HTMLElement).style.setProperty('display', 'none', 'important')));
}
```

---

## 12. Plugins — Swiper, Tabs jQuery, Accordion

```typescript
private _initSwiper(): void {
  const Swiper: any = (window as any).Swiper;
  if (!Swiper) return;

  if (!this._groupNewsSwiperInitialized) {
    new Swiper('.group-news', {
      slidesPerView: 4, spaceBetween: 16,
      autoplay: { delay: 2500, disableOnInteraction: false },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 0: { slidesPerView: 1 }, 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 }, 1200: { slidesPerView: 4 } },
    });
    this._groupNewsSwiperInitialized = true;
  }
  new Swiper('.VisionSwiper', { loop: true, autoplay: { delay: 4000, disableOnInteraction: false } });
  new Swiper('.verticalSwiper', { direction: 'vertical', loop: true, autoplay: { delay: 3000 }, slidesPerView: 2, spaceBetween: 10 });
}

private _initTabs(): void {
  const $: any = (window as any).$;
  if (!$) return;
  $('.agencies-box.annonces, .annonces').each(function (this: HTMLElement) {
    const $box = $(this);
    $box.find('ul.tabs li').on('click', function (this: HTMLElement) {
      const tabId = $(this).attr('data-tab');
      $box.find('ul.tabs li').removeClass('current');
      $box.find('.tab-content').removeClass('current');
      $(this).addClass('current');
      $box.find('#' + tabId).addClass('current');
    });
  });
}

private _initDirectionAccordion(): void {
  const accordion = document.getElementById('accordionDirections');
  if (!accordion) return;
  accordion.addEventListener('click', (e: MouseEvent) => {
    const btn = (e.target as HTMLElement).closest('button[data-bs-target]') as HTMLButtonElement | null;
    if (!btn) return;
    const targetId = btn.getAttribute('data-bs-target');
    if (!targetId) return;
    const target = document.getElementById(targetId.substring(1));
    if (!target) return;
    const isOpen = target.classList.contains('show');
    accordion.querySelectorAll('.accordion-collapse.show').forEach((el) => {
      el.classList.remove('show');
      const otherBtn = accordion.querySelector('[data-bs-target="#' + el.id + '"]') as HTMLButtonElement | null;
      if (otherBtn) { otherBtn.classList.add('collapsed'); otherBtn.setAttribute('aria-expanded', 'false'); }
    });
    if (!isOpen) { target.classList.add('show'); btn.classList.remove('collapsed'); btn.setAttribute('aria-expanded', 'true'); }
  });
}
```

---

## 13. services/cache.ts — COPIER TEL QUEL

```typescript
interface CacheEntry<T> { data: T; timestamp: number; modified?: string; itemCount?: number; }
const STORE_KEY = '<nom-projet>-cache';
const store = new Map<string, CacheEntry<unknown>>();

function persistStore(): void {
  try { const e: Record<string, CacheEntry<unknown>> = {}; store.forEach((v, k) => { e[k] = v; }); sessionStorage.setItem(STORE_KEY, JSON.stringify(e)); } catch { }
}
function restoreStore(): void {
  try { const raw = sessionStorage.getItem(STORE_KEY); if (!raw) return; const e = JSON.parse(raw) as Record<string, CacheEntry<unknown>>; Object.keys(e).forEach((k) => store.set(k, e[k])); } catch { }
}
restoreStore();

export function cacheInvalidate(key: string): void { store.delete(key); persistStore(); }
export function cacheClear(): void { store.clear(); persistStore(); }
export function cacheGet<T>(key: string): T | undefined {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  return entry ? entry.data : undefined;
}

export async function cacheFetchSmart<T>(
  key: string, siteUrl: string, listName: string,
  fetcher: () => Promise<T>, ttl = 5 * 60 * 1000
): Promise<T> {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  const now = Date.now();
  if (entry && now - entry.timestamp < ttl) {
    const [latestModified, latestCount] = await Promise.all([_getLatestModified(siteUrl, listName), _getItemCount(siteUrl, listName)]);
    if (latestModified === null || latestCount === null) return entry.data;
    if (entry.modified && latestModified === entry.modified && entry.itemCount !== undefined && latestCount === entry.itemCount) return entry.data;
  }
  const [data, modified, itemCount] = await Promise.all([fetcher(), _getLatestModified(siteUrl, listName), _getItemCount(siteUrl, listName)]);
  store.set(key, { data, timestamp: Date.now(), modified: modified ?? undefined, itemCount: itemCount ?? undefined });
  persistStore();
  return data;
}

export async function cacheFetchSmartItem<T>(
  key: string, siteUrl: string, listName: string, itemId: number,
  fetcher: () => Promise<T>, ttl = 5 * 60 * 1000
): Promise<T> {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  const now = Date.now();
  if (entry && now - entry.timestamp < ttl) {
    const latestModified = await _getItemModified(siteUrl, listName, itemId);
    if (latestModified === null || (entry.modified && latestModified === entry.modified)) return entry.data;
  }
  const [data, modified] = await Promise.all([fetcher(), _getItemModified(siteUrl, listName, itemId)]);
  store.set(key, { data, timestamp: Date.now(), modified: modified ?? undefined });
  persistStore();
  return data;
}

async function _getLatestModified(siteUrl: string, listName: string): Promise<string | null> {
  try {
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Modified&$top=1&$orderby=Modified desc`, { headers: { Accept: 'application/json;odata=nometadata' } });
    if (!res.ok) return null;
    return (await res.json()).value?.[0]?.Modified ?? null;
  } catch { return null; }
}
async function _getItemCount(siteUrl: string, listName: string): Promise<number | null> {
  try {
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')?$select=ItemCount`, { headers: { Accept: 'application/json;odata=nometadata' } });
    if (!res.ok) return null;
    return (await res.json()).ItemCount ?? null;
  } catch { return null; }
}
async function _getItemModified(siteUrl: string, listName: string, itemId: number): Promise<string | null> {
  try {
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})?$select=Modified`, { headers: { Accept: 'application/json;odata=nometadata' } });
    if (!res.ok) return null;
    return (await res.json()).Modified ?? null;
  } catch { return null; }
}
```

---

## 14. services/utils.ts — COPIER TEL QUEL

```typescript
export function resolveImage(
  siteUrl: string, listName: string, item: Record<string, unknown>,
  fallbackImg: string, fieldName = 'Image'
): Promise<string> {
  const img = item[fieldName];
  if (!img) return Promise.resolve(fallbackImg);
  try {
    const imgData = typeof img === 'string' ? JSON.parse(img) : img;
    if (!imgData.fileName) return Promise.resolve(fallbackImg);
    const itemId = Number(item.Id || item.ID);
    const attachUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles`;
    return fetch(attachUrl, { headers: { Accept: 'application/json;odata=nometadata' } })
      .then((r) => r.json())
      .then((d) => {
        const files: Array<{ FileName: string; ServerRelativeUrl: string }> = d.value || [];
        const match = files.find((f) => f.FileName === imgData.fileName);
        return match ? match.ServerRelativeUrl : fallbackImg;
      })
      .catch(() => fallbackImg);
  } catch { return Promise.resolve(fallbackImg); }
}
```

---

## 15. Pattern Service Générique

```typescript
// services/monService.ts
import { cacheFetchSmart, cacheFetchSmartItem } from './cache';
import { resolveImage } from './utils';

const CACHE_TTL = 5 * 60 * 1000;

export function loadMonContenu(siteUrl: string): Promise<string> {
  return cacheFetchSmart('mon-contenu', siteUrl, 'NomDeLaListe', async () => {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('NomDeLaListe')/items?$select=*&$orderby=Created desc&$top=10`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = (await res.json()).value?.filter((item: Record<string, unknown>) => {
      const a = item.Active;
      return a === true || a === 1 || a === 'Yes' || a === 'Oui';
    }) || [];

    if (items.length === 0) return '<p class="text-center text-muted p-3">Aucun contenu</p>';

    const htmls = await Promise.all(items.map(async (item: Record<string, unknown>) => {
      const img = await resolveImage(siteUrl, 'NomDeLaListe', item, 'assets/imges/fallback.jpg');
      const title = String(item.Title || '');
      const date = item.Created ? new Date(String(item.Created)).toLocaleDateString('fr-FR') : '';
      return `
        <div class="card mb-3">
          <img src="${img}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="text-muted">${date}</p>
            <a href="#page-detail-mon-contenu&id=${item.Id}" class="btn btn-primary btn-sm">En savoir plus</a>
          </div>
        </div>`;
    }));
    return htmls.join('');
  }, CACHE_TTL).catch((err) => {
    console.error('[WebPart] loadMonContenu:', err);
    return '<p class="text-center text-muted p-3">Erreur de chargement</p>';
  });
}

export function loadMonContenuDetail(siteUrl: string, itemId: number): Promise<string> {
  return cacheFetchSmartItem(`mon-contenu-detail-${itemId}`, siteUrl, 'NomDeLaListe', itemId, async () => {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('NomDeLaListe')/items(${itemId})?$select=*`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const item = await res.json();
    return `
      <div class="article-detail">
        <h1>${String(item.Title || '')}</h1>
        <div class="content">${String(item.Description || '')}</div>
        <a href="#page-mon-contenu" class="btn btn-outline-primary mt-3">
          <i class="bi bi-arrow-left"></i> Retour
        </a>
      </div>`;
  }).catch((err) => {
    console.error('[WebPart] detail:', err);
    return '<p class="text-center text-muted p-3">Erreur de chargement</p>';
  });
}
```

---

## 16. services/headerMenu.ts — COPIER TEL QUEL

```typescript
import { cacheFetchSmart } from './cache';

export interface IMenuItem {
  Title: string; MenuUrl: string; Position: number;
  IsActive: boolean; ParentMenu: string | null; children?: IMenuItem[];
}

export async function loadHeaderMenu(siteUrl: string): Promise<string> {
  return cacheFetchSmart('header-menu-items', siteUrl, 'HeaderDetail', async () => {
    let url = `${siteUrl}/_api/web/lists/getbytitle('HeaderDetail')/items?$select=Title,MenuUrl,Position,IsActive,ParentMenu/Title&$expand=ParentMenu&$top=200`;
    let res = await fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } });
    if (!res.ok) { url = `${siteUrl}/_api/web/lists/getbytitle('HeaderDetail')/items?$select=Title,MenuUrl,Position,IsActive,ParentMenu&$top=200`; res = await fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } }); }
    if (!res.ok) { url = `${siteUrl}/_api/web/lists/getbytitle('HeaderDetail')/items?$select=Title,MenuUrl,Position,IsActive,field_1&$top=200`; res = await fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } }); }
    if (!res.ok) { url = `${siteUrl}/_api/web/lists/getbytitle('HeaderDetail')/items?$select=Title,MenuUrl,Position,IsActive&$top=200`; res = await fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } }); }
    if (!res.ok) throw new Error(await res.text());

    const rawItems: Array<Record<string, any>> = (await res.json()).value || [];
    const items: IMenuItem[] = rawItems
      .filter((i) => i.IsActive === true || i.IsActive === 'Oui' || i.IsActive === 'Yes' || i.IsActive === 1)
      .map((i) => {
        const parentVal = i.ParentMenu !== undefined ? i.ParentMenu : i.field_1;
        const parent = parentVal ? (typeof parentVal === 'object' ? (parentVal.Title ? String(parentVal.Title).trim() : null) : String(parentVal).trim()) : null;
        return { Title: String(i.Title || ''), MenuUrl: String(i.MenuUrl || '#'), Position: Number(i.Position ?? 0), IsActive: true, ParentMenu: parent };
      }).sort((a, b) => a.Position - b.Position);

    const map = new Map<string, IMenuItem>();
    const roots: IMenuItem[] = [];
    items.forEach((item) => { item.children = []; map.set(item.Title.trim().toLowerCase(), item); });
    items.forEach((item) => {
      const pName = item.ParentMenu?.trim().toLowerCase() || '';
      if (pName) { const p = map.get(pName); if (p) { p.children!.push(item); } else { roots.push(item); } }
      else { roots.push(item); }
    });

    function render(item: IMenuItem, level: number): string {
      if (item.children && item.children.length > 0) {
        if (level === 1) return `<li class="dropdown"><a href="${item.MenuUrl}"><span>${item.Title}</span> <i class="bi bi-chevron-down"></i></a><ul>${item.children.map((c) => render(c, level + 1)).join('')}</ul></li>`;
        return `<li class="dropdown"><a href="${item.MenuUrl}">${item.Title} <span class="submenu-arrow">&#8250;</span></a><ul>${item.children.map((c) => render(c, level + 1)).join('')}</ul></li>`;
      }
      return `<li><a href="${item.MenuUrl}">${item.Title}</a></li>`;
    }
    return roots.map((r) => render(r, 1)).join('');
  }, 15 * 60 * 1000);
}
```

---

## 17. services/footer.ts — COPIER TEL QUEL

```typescript
import { cacheFetchSmart } from './cache';

export async function loadFooter(siteUrl: string): Promise<string> {
  return cacheFetchSmart('footer-html', siteUrl, 'FooterDetails', async () => {
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('FooterDetails')/items?$select=*&$top=100`, { headers: { Accept: 'application/json;odata=nometadata' } });
    if (!res.ok) return `<div class="footer"><div class="container"><p class="copyright text-center">Copyright &copy; ${new Date().getFullYear()}.</p></div></div>`;

    const items = (await res.json()).value?.filter((i: any) => {
      const a = i.Active;
      return a === true || a === 1 || (typeof a === 'string' && ['oui', 'yes'].includes(a.toLowerCase()));
    }) || [];

    if (items.length === 0) return `<div class="footer"><div class="container"><p class="copyright text-center">Copyright &copy; ${new Date().getFullYear()}.</p></div></div>`;

    const socialDomains = ['twitter.com', 'x.com', 'linkedin.com', 'facebook.com', 'youtube.com'];
    const groups: Record<string, Array<{ titre: string; url: string }>> = {};
    for (const item of items) {
      const cat = String(item.Category || 'Autres');
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push({ titre: String(item.Title || ''), url: String(item.URL || '') });
    }

    const socialLinks: Array<{ titre: string; url: string }> = [];
    const catGroups: Record<string, Array<{ titre: string; url: string }>> = {};
    Object.keys(groups).forEach((cat) => {
      const nonSocial = groups[cat].filter((i) => {
        const isSocial = socialDomains.some((d) => i.url.toLowerCase().includes(d));
        if (isSocial) socialLinks.push(i);
        return !isSocial;
      });
      if (nonSocial.length > 0) catGroups[cat] = nonSocial;
    });

    const catKeys = Object.keys(catGroups);
    let html = '<div class="footer"><div class="container"><div class="row">';
    catKeys.forEach((cat, idx) => {
      html += `<div class="col-lg-4 col-md-6"><div class="single_footer"><h4>${cat}</h4><ul>`;
      catGroups[cat].forEach((i) => { html += i.url ? `<li><a href="${i.url}" target="_blank">${i.titre}</a></li>` : `<li>${i.titre}</li>`; });
      html += '</ul>';
      if (socialLinks.length > 0 && idx === catKeys.length - 1) {
        html += '<div class="social_profile"><ul>';
        socialLinks.forEach((i) => { html += `<li><a href="${i.url}" target="_blank">${i.titre}</a></li>`; });
        html += '</ul></div>';
      }
      html += '</div></div>';
    });
    html += `</div></div><div class="container-fluid"><p class="copyright text-center">Copyright &copy; ${new Date().getFullYear()} <a href="#">MON INTRANET</a>.</p></div></div>`;
    return html;
  }, 30 * 60 * 1000);
}
```

---

## 18. services/headerVideo.ts

```typescript
import { cacheFetchSmart } from './cache';

export async function loadHeaderVideo(siteUrl: string): Promise<string> {
  return cacheFetchSmart('header-video', siteUrl, 'HeaderVideo', async () => {
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('HeaderVideo')/items?$select=*&$top=1&$orderby=Created desc`, { headers: { Accept: 'application/json;odata=nometadata' } });
    if (!res.ok) return '';
    return String((await res.json()).value?.[0]?.VideoUrl || '');
  }, 15 * 60 * 1000).catch(() => '');
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}
```

---

## 19. Listes SharePoint Requises

| Liste | Colonnes clés | Usage |
|---|---|---|
| **HeaderDetail** | Title, MenuUrl, Position (Nbr), IsActive (Oui/Non), ParentMenu (Lookup) | Menu navigation |
| **FooterDetails** | Title, URL, Category, Active | Footer |
| **HeaderVideo** | VideoUrl (URL YouTube) | Miniature header |
| **actualites** | Title, Description, Image, Active | Actualites |
| **Agenda** | Title, StartDateTime, EndDateTime, Location | Agenda |
| **Evenements** | Title, Description, Image, StartDate, EndDate, Active | Evenements |
| **annonces** | Title, Type, LikedBy (JSON), Comments (JSON) | Annonces sociales |
| **Produits** | Title, Description, Image, Active | Produits |
| **EmployeDuMois** | Title, Month, Year, Photo, LikedBy (JSON), Comments (JSON) | Employe du mois |
| **Direction** | Title, Poste, Photo, Ordre | Directions |
| **Vision** | Title, Content, Image | Page vision |
| **Mission** | Title, Content, Image | Page mission |
| **Valeurs** | Title, Content, Image, Ordre | Page valeurs |
| **Outils** | Title, URL, Icon, Active | Outils sidebar |
| **Devises** | Title, Rate, Type (transfert/cash), Active | Cours devises |
| **Survey** | Title, Question, Options (JSON), Active | Sondages |

> Social : LikedBy et Comments sont des colonnes Texte multiligne
> contenant des tableaux JSON :
> - LikedBy : ["user1@mail.com","user2@mail.com"]
> - Comments : [{"user":"Nom","email":"...","text":"...","date":"..."}]

---

## 20. Patterns OData REST API

```typescript
const headers = { Accept: 'application/json;odata=nometadata', 'Content-Type': 'application/json;odata=nometadata' };

// Liste
const url = `${siteUrl}/_api/web/lists/getbytitle('MaListe')/items?$select=*&$top=100`;

// Tri + filtre
const url = `${siteUrl}/_api/web/lists/getbytitle('MaListe')/items?$select=Id,Title&$orderby=Created desc&$top=6`;

// Item unique
const url = `${siteUrl}/_api/web/lists/getbytitle('MaListe')/items(${itemId})?$select=*`;

// Lookup $expand
const url = `${siteUrl}/_api/web/lists/getbytitle('MaListe')/items?$select=Title,Parent/Title&$expand=Parent&$top=200`;

// AttachmentFiles (images)
const url = `${siteUrl}/_api/web/lists/getbytitle('MaListe')/items(${itemId})/AttachmentFiles`;

// Request Digest pour PATCH
const digestRes = await fetch(`${siteUrl}/_api/contextinfo`, { method: 'POST', headers });
const digest = (await digestRes.json()).FormDigestValue;

// PATCH (mise a jour)
await fetch(`${siteUrl}/_api/web/lists/getbytitle('MaListe')/items(${itemId})`, {
  method: 'POST',
  headers: { ...headers, 'X-RequestDigest': digest, 'X-HTTP-Method': 'MERGE', 'IF-MATCH': '*' },
  body: JSON.stringify({ Title: 'Nouveau titre' }),
});

// Filtrer les actifs
const actifs = items.filter((i) => {
  const a = i.Active;
  return a === true || a === 1 || a === 'Yes' || a === 'Oui';
});
```

---

## 21. Template Page Standard

```typescript
// pages/MaPage.ts
export const MA_PAGE_HTML = `
<div class="main-wrapper">
  <main id="main" class="main">
    <section class="breadcrumbs">
      <div class="container">
        <ol>
          <li><a href="#page-accueil">Accueil</a></li>
          <li>Ma Page</li>
        </ol>
        <h2>Ma Page</h2>
      </div>
    </section>
    <section class="inner-page py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <!-- OBLIGATOIRE : spinner par defaut dans chaque zone dynamique -->
            <div id="ma-page-content">
              <div class="text-center p-4">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted">Chargement...</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4"><!-- Sidebar --></div>
        </div>
      </div>
    </section>
  </main>
</div>`;
```

---

## 22. Composant Header

```typescript
// components/Header.ts
export const HEADER_HTML = `
<div class="">
  <header id="header" class="d-flex align-items-center">
    <div class="container-fluid d-flex align-items-center">
      <h1 class="logo"><a href="#page-accueil"><img src="assets/imges/logo.png" alt="Logo"></a></h1>
      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul id="navbar-menu-list"><!-- Menu charge dynamiquement --></ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <div class="header-right d-flex align-items-center">
        <div class="sidebar ms-4">
          <div class="sidebar-item search-form">
            <form action="#"><input type="text"><button type="submit"><i class="bi bi-search"></i></button></form>
          </div>
        </div>
        <a href="#" class="header-video-thumb">
          <img id="header-video-thumb" src="" alt="Video">
          <span class="header-video-overlay"><i class="bi bi-play-circle-fill"></i></span>
        </a>
      </div>
    </div>
  </header>
</div>
<div id="headerVideoOverlay" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:99999;align-items:center;justify-content:center;">
  <button id="headerVideoClose" style="position:absolute;top:20px;right:30px;background:none;border:none;color:#fff;font-size:40px;cursor:pointer;">&times;</button>
  <div style="width:90%;max-width:1000px;">
    <div style="position:relative;padding-bottom:56.25%;height:0;">
      <iframe id="header-video-player" src="" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
    </div>
  </div>
</div>`;
```

---

## 23. Lifecycle — onDispose

```typescript
public onDispose(): void {
  if (this._observer) { this._observer.disconnect(); this._observer = null; }
  if (this._boundHashChange) { window.removeEventListener('hashchange', this._boundHashChange); this._boundHashChange = null; }
  this._routerBound = false;
}

protected get dataVersion(): Version { return Version.parse('1.0'); }

protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [{
      header: { description: strings.PropertyPaneDescription },
      groups: [{ groupName: strings.BasicGroupName, groupFields: [PropertyPaneTextField('description', { label: strings.DescriptionFieldLabel })] }],
    }],
  };
}
```

---

## 24. Build et Deploiement

```powershell
# Dev local
npm start
# -> https://localhost:4321/temp/workbench.html

# Build production
npm run build
# -> dist/ + release/<nom>.sppkg

# Deploiement SharePoint
# 1. https://<tenant>.sharepoint.com/sites/appcatalog/_layouts/15/tenantAppCatalog.aspx
# 2. Uploader le .sppkg
# 3. Cocher "Make available to all sites"
# 4. Ajouter le webpart sur une page SharePoint

npm run clean
```

---

## 25. Problemes Courants et Solutions

| Probleme | Cause | Solution |
|---|---|---|
| Images non affichees en prod | Asset pas dans _assetRefs | `new URL('./assets/imges/img.jpg', import.meta.url)` |
| Scripts JS non charges | _loadScripts() non attendu | `await this._scriptsPromise` avant usage |
| Modal ne s'ouvre pas | BS JS pas encore charge | Fallback vanilla JS |
| Erreur 403 sur /_api/ | Permissions manquantes | webApiPermissionRequests dans package-solution.json |
| Cache perime | Same Modified + ItemCount | `cacheInvalidate('ma-cle')` ou `cacheClear()` |
| Swiper non initialise | Appele avant innerHTML | Appeler _initSwiper() APRES injection HTML |
| Pas de plein ecran | supportsFullBleed absent | `"supportsFullBleed": true` dans manifest |
| Conflit AMD define | jQuery/Bootstrap vs SPFx | Gestion AMD dans _loadScripts() |
| Menu non rechargé | Events perdus apres innerHTML | Reappeler _initHeader() apres setContent |
| Mode edition bloquant | SharePoint force Mode=edit | Redirection auto dans onInit() |

---

## 26. Checklist Nouveau Projet

- [ ] Node.js >=22.14.0 <23 installe
- [ ] yo @microsoft/sharepoint scaffolde
- [ ] Assets copies dans assets/ (Bootstrap CSS/JS, Swiper, Bootstrap Icons, jQuery, OrgChart)
- [ ] npm install bootstrap@^5.3.3 swiper@^12.2.0 react-icons@^4.12.0
- [ ] overrides et resolutions dans package.json
- [ ] "supportsFullBleed": true dans le manifest
- [ ] services/cache.ts et services/utils.ts crees (copie exacte)
- [ ] services/headerMenu.ts et services/footer.ts crees (copie exacte)
- [ ] components/Header.ts avec id="navbar-menu-list" vide
- [ ] pages/page-404.ts cree
- [ ] Pages avec spinners par defaut dans toutes les zones dynamiques
- [ ] Un service par liste SharePoint
- [ ] _assetRefs avec TOUTES les images statiques
- [ ] _getTemplate() avec tous les case
- [ ] _loadPageData() avec tous les case
- [ ] _removeSharePointConstraints() implemente
- [ ] _initRouter() avec hashchange
- [ ] _loadScripts() avec gestion AMD
- [ ] Listes SharePoint creees avec les bonnes colonnes
- [ ] npm start -> test local OK
- [ ] npm run build -> .sppkg genere
- [ ] Deploiement dans le catalogue SharePoint
