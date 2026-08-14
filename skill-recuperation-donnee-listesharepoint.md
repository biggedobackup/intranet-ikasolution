# Skill : Récupération dynamique des données d'une liste SharePoint

Instructions à donner à l'IA pour rendre une section (ou des pages) du projet
**ikaIntranet** dynamique à partir d'une liste SharePoint, en suivant le même
pattern que les services existants `agenda` et `actualites`.

## 1. Objectif
Remplacer les données en dur (`const XXX = [...]`) par des données chargées
depuis la liste SharePoint via REST, avec cache mémoire (TTL 5 min), résolution
automatique des noms internes de colonnes (accents/espaces), filtre `Active` et
états de chargement/vide dans les pages.

## 2. Référence à imiter (toujours copier ce pattern)
- `src/webparts/ikaIntranet/services/agenda/index.ts`
- `src/webparts/ikaIntranet/services/actualites/index.ts`
- `src/webparts/ikaIntranet/services/evenements/index.ts`
- Exemple de connexion : `pages/Accueil.tsx` (état + `React.useEffect`), `App.tsx` (prop `siteUrl`).

## 3. Étapes à suivre
1. **Décrire la liste** (nom, URL, colonnes avec leurs types) comme référence.
2. **Créer** `services/<module>/index.ts` :
   - `export interface I<Item> { ... }` (champs utilisés par les pages).
   - `const LIST_NAME = '...'` = nom exact de la liste dans SharePoint.
   - `load<Items>(siteUrl: string): Promise<I<Item>[]>` (voir §4).
3. **Mettre à jour chaque page** qui utilisait les données en dur :
   - importer `load<Items>` depuis `../services/<module>/index` ;
   - accepter la prop `siteUrl?: string` ;
   - `const [items, setItems] = useState<I<Item>[]>([])` + `loading` ;
   - `useEffect(() => { if (!siteUrl) return; load<Items>(siteUrl).then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); }, [siteUrl])` ;
   - remplacer les références aux données en dur par `items` ;
   - gérer l'état de chargement (spinner) et l'état vide.
4. **Dans `App.tsx`** : passer `siteUrl={siteUrl}` à chaque page modifiée.
5. **Supprimer** l'ancien fichier de données en dur (ex : `data.ts`) une fois plus référencé.
6. **Vérifier** : `npx tsc --noEmit -p tsconfig.json` → 0 erreur.

## 4. Pattern du service (`loadXxx`)
```ts
const LIST_NAME = '...';
const CACHE_TTL = 5 * 60 * 1000;
let cache: { data: IItem[]; ts: number } | null = null;

// 1) mapper "titre affiché" -> "nom interne" (accents/espaces)
async function getFieldMap(siteUrl, listName): Promise<Record<string,string>> {
  const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/fields?$select=Title,InternalName&$top=500`,
    { headers: { Accept: 'application/json;odata=nometadata' } });
  ...
}

// 2) lire une valeur : map par titre affiché, sinon fallbacks
function getVal(item, map, display, fallbacks = []) { ... }

// 3) fetch des items
fetch(`${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/items?$select=*&$top=500`)
```

## 5. Règles obligatoires
- **Noms de colonnes** : résoudre via `getFieldMap` (titre affiché → nom interne), car les colonnes accentuées/espacées ont des noms internes imprévisibles. Toujours prévoir des `fallbacks` (ex : `'Titre'` → `['Title']`).
- **Filtre actif** : `Active` → garder si `value === true || value === 1`.
- **Titre** : `'Titre'` → `['Title']` ; **Description** → `['Description']`.
- **Dates** : `new Date(String(value))`, vérifier `isNaN`, format FR (`toLocaleTimeString('fr-FR')` / `MONTHS_FR`).
- **Temps relatif** : affichage type « Il y a 2 heures » calculé depuis `Créé`/`Modified`.
- **Images** : essayer `JSON.parse` (tableau d'objets : `serverRelativeUrl`/`url`/`src`/`imageUrl`/`nativeFile.url`/`thumbnailUrl`), préfixer les URLs relatives par `siteUrl`, sinon split par sauts de ligne. **Colonne `Image` moderne (Miniature, image uploadée)** : la valeur est `{"fileName":"Reserved_ImageAttachment_...","originalImageName":"..."}` SANS URL → récupérer l'URL réelle via `items(<id>)/AttachmentFiles?$select=ServerRelativeUrl` (champ `ServerRelativeUrl`), sinon construire `<siteUrl>/Lists/<Liste>/Attachments/<id>/<fileName>`. Prévoir une image de repli (SVG inline, jamais d'URL externe codée en dur).
- **Champ personne** (`Créé par`) : `$expand=Author/Title` puis lire `.Title` de l'objet.
- **REST** : `Accept: application/json;odata=nometadata`, `$select=*`, `$top=500`, `getbytitle('<nom>')` avec le nom exact de la liste.
- **Interdits** : `Promise.finally` (target ES5 → TS2550), `Array.prototype.includes` (→ utiliser `indexOf`). Utiliser `String.includes` seulement.
- **Cache** : `if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data;` puis `cache = { data, ts: Date.now() };`. `catch` → `console.error(...)` et `return []`.
- **Hooks** : ne jamais appeler de hook après un `if (loading) return` conditionnel sur le hook — charger dans `useEffect`, l'état `items` reste vide tant que le chargement n'est pas fini.
- **Ne rien casser** : garder les URLs de routing (`#page-<slug>&id=<id>`), les interfaces exportées, le design existant (mêmes classes Tailwind).

## 6. Vérification finale
- `npx tsc --noEmit -p tsconfig.json` → **0 erreur**.
- Aucune référence résiduelle aux données en dur (`grep -rn "XXX" src/webparts/ikaIntranet`).
- Les `id` des liens doivent être ceux réels des items (`a.id`), pas des indices de tableau.