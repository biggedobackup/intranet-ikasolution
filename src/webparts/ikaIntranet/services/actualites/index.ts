import { IComment, parseLikedBy, parseComments, patchField } from '../shared/index';

export interface IActualite {
  id: number;
  img: string;
  title: string;
  text: string;
  longText: string;
  category: string;
  time: string;
  author: string;
  likedBy: string[];
  comments: IComment[];
}

const LIST_NAME = 'Actualites';
const LIST_NAME_ALT = 'Actualite';
const CACHE_TTL = 5 * 60 * 1000;

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='22' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3EIKA SOLUTION%3C/text%3E%3C/svg%3E";

let cache: { data: IActualite[]; ts: number } | null = null;

function readCache(): IActualite[] | undefined {
  if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data;
  return undefined;
}

function invalidateCache(): void {
  cache = null;
}

function isActive(value: unknown): boolean {
  return value !== false && value !== 0;
}

function asString(value: unknown): string {
  return value === null || value === undefined ? '' : String(value).trim();
}

const fieldMapCache: Record<string, { value: Record<string, string>; ts: number }> = {};
const FIELD_MAP_CACHE_TTL = 20 * 60 * 1000;

function setCachedFieldMap(cacheKey: string, value: Record<string, string>): void {
  fieldMapCache[cacheKey] = { value, ts: Date.now() };
}

async function getFieldMap(siteUrl: string, listName: string): Promise<Record<string, string>> {
  const cacheKey = `${siteUrl}::${listName}`;
  const cached = fieldMapCache[cacheKey];
  if (cached && Date.now() - cached.ts < FIELD_MAP_CACHE_TTL) return cached.value;
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/fields?$select=Title,InternalName&$top=500`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return cached ? cached.value : {};
    const fields = (await res.json()).value as Array<{ Title?: string; InternalName?: string }> | undefined;
    const map: Record<string, string> = {};
    (fields || []).forEach((f) => {
      if (f.Title && f.InternalName) map[String(f.Title).toLowerCase()] = f.InternalName;
    });
    setCachedFieldMap(cacheKey, map);
    return map;
  } catch {
    return cached ? cached.value : {};
  }
}

function getVal(item: Record<string, unknown>, map: Record<string, string>, display: string, fallbacks: string[] = []): unknown {
  const key = map[display.toLowerCase()];
  if (key && item[key] !== undefined) return item[key];
  for (const f of fallbacks) {
    if (item[f] !== undefined) return item[f];
  }
  return undefined;
}

function getAuthor(item: Record<string, unknown>, map: Record<string, string>): string {
  const raw = getVal(item, map, 'Créé par', ['Author', 'CreatedBy', 'Editor']);
  if (raw && typeof raw === 'object') {
    const title = (raw as { Title?: string }).Title;
    if (title) return title;
  }
  return asString(raw);
}

function sitePathOf(siteUrl: string): string {
  try {
    return new URL(siteUrl).pathname;
  } catch {
    return '';
  }
}

function toSiteRelative(siteUrl: string, path: string): string {
  const sp = sitePathOf(siteUrl);
  if (sp && path.startsWith(sp)) return path.slice(sp.length) || '/';
  return path;
}

function normalizeUrl(value: unknown, siteUrl: string): string {
  const s = asString(value);
  if (!s) return '';
  if (s.startsWith('http')) return s;
  const rel = toSiteRelative(siteUrl, s);
  return rel.startsWith('/') ? `${siteUrl}${rel}` : s;
}

function parseImages(value: unknown, siteUrl: string): string[] {
  const candidates: string[] = [];

  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    ['serverRelativeUrl', 'Url', 'url', 'src', 'imageUrl', 'thumbnailUrl', 'fileName'].forEach((k) => {
      if (o[k]) candidates.push(String(o[k]));
    });
    if (!candidates.length) {
      const str = JSON.stringify(o);
      const m = str.match(/https?:\/\/[^"'\s]+/);
      if (m) candidates.push(m[0].trim());
    }
  } else {
    const raw = asString(value);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      arr.forEach((o) => {
        if (o && typeof o === 'object') {
          if (o.nativeFile && o.nativeFile.url) candidates.push(o.nativeFile.url);
          if (o.serverRelativeUrl) candidates.push(o.serverRelativeUrl);
          if (o.Url) candidates.push(o.Url);
          if (o.url) candidates.push(o.url);
          if (o.src) candidates.push(o.src);
          if (o.imageUrl) candidates.push(o.imageUrl);
          if (o.thumbnailUrl) candidates.push(o.thumbnailUrl);
        } else if (typeof o === 'string') {
          candidates.push(o);
        }
      });
    } catch {
      // pas du JSON : on traite comme du texte
    }

    if (!candidates.length) {
      raw.split(/[\n,;]+/).forEach((s) => {
        const t = s.trim();
        if (t) candidates.push(t);
      });
    }
  }

  return candidates
    .map((c) => normalizeUrl(c, siteUrl))
    .filter((c) => c.startsWith('http') || c.startsWith('data:image'));
}

function getImageFileName(value: unknown): string {
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    return asString(o.fileName) || asString(o.originalImageName);
  }
  const s = asString(value);
  if (!s) return '';
  try {
    const p = JSON.parse(s);
    if (p && typeof p === 'object') return asString(p.fileName) || asString(p.originalImageName);
  } catch {
    // pas du JSON
  }
  return '';
}

async function getListRootFolder(siteUrl: string, listName: string): Promise<string> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')?$select=RootFolder/ServerRelativeUrl&$expand=RootFolder`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return '';
    const data = (await res.json()) as { RootFolder?: { ServerRelativeUrl?: string } };
    const sr = (data.RootFolder && data.RootFolder.ServerRelativeUrl) || '';
    return toSiteRelative(siteUrl, sr);
  } catch {
    return '';
  }
}

async function resolveImageUrl(
  siteUrl: string,
  listName: string,
  listNameAlt: string,
  rootFolder: string,
  itemId: number,
  fileName: string
): Promise<string> {
  const candidates: string[] = [];

  try {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles?$select=ServerRelativeUrl&$top=10`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (res.ok) {
      const files = ((await res.json()).value || []) as Array<{ ServerRelativeUrl?: string }>;
      const f = files[0];
      if (f && f.ServerRelativeUrl) candidates.push(normalizeUrl(f.ServerRelativeUrl, siteUrl));
    }
  } catch {
    // on tente les chemins directs
  }

  if (fileName) {
    const encoded = encodeURIComponent(fileName);
    const folders = [rootFolder || `/Lists/${listName}`, `/Lists/${listName}`, `/Lists/${listNameAlt}`];
    folders.forEach((f) => candidates.push(`${siteUrl}${f}/Attachments/${itemId}/${encoded}`));
  }

  const uniqueCandidates = Array.from(new Set(candidates));
  const checks = await Promise.all(
    uniqueCandidates.map(async (c) => {
      try {
        const r = await fetch(c, { method: 'HEAD' });
        const ct = (r.headers.get('content-type') || '').toLowerCase();
        return r.status === 200 && (ct.startsWith('image/') || ct.indexOf('octet-stream') !== -1) ? c : undefined;
      } catch {
        return undefined;
      }
    })
  );
  const found = checks.find((c) => !!c);
  if (found) return found;

  console.warn('[actualites] Image introuvable item', itemId, ':', fileName);
  return '';
}

function relativeTime(value: unknown): string {
  const iso = asString(value);
  if (!iso) return '';
  const date = new Date(iso);
  if (isNaN(date.getTime())) return '';
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function loadActualites(siteUrl: string): Promise<IActualite[]> {
  const cached = readCache();
  if (cached) return cached;
  try {
    const fieldMap = await getFieldMap(siteUrl, LIST_NAME);
    const listName = fieldMap && Object.keys(fieldMap).length > 0 ? LIST_NAME : LIST_NAME_ALT;
    const fieldMapFinal = Object.keys(fieldMap).length > 0 ? fieldMap : await getFieldMap(siteUrl, LIST_NAME_ALT);
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=*,Author/Title&$expand=Author/Title&$top=2000&$orderby=Id desc`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const items = ((await res.json()).value || []) as Array<Record<string, unknown>>;
    const missingImages: Array<{ id: number; fileName: string }> = [];
    const actualites: IActualite[] = items
      .filter((it) => isActive(getVal(it, fieldMapFinal, 'Active', ['Active'])))
      .map((it) => {
        const title = asString(getVal(it, fieldMapFinal, 'Titre', ['Title']));
        const longText = asString(getVal(it, fieldMapFinal, 'Description', ['Description']));
        const rawImg = getVal(it, fieldMapFinal, 'Image', ['Image', 'Images']);
        const id = Number(getVal(it, fieldMapFinal, 'Id', ['Id']) ?? 0);
        const images = parseImages(rawImg, siteUrl);
        if (!images.length) {
          const fileName = getImageFileName(rawImg);
          if (fileName) missingImages.push({ id, fileName });
        }
        const category = asString(getVal(it, fieldMapFinal, 'Catégorie', ['Categorie', 'Category']));
        const created = getVal(it, fieldMapFinal, 'Créé', ['Created']);

        return {
          id,
          img: images[0] || PLACEHOLDER_IMG,
          title,
          text: longText.slice(0, 140),
          longText,
          category,
          time: relativeTime(created),
          author: getAuthor(it, fieldMapFinal),
          likedBy: parseLikedBy(getVal(it, fieldMapFinal, 'AimerPar', ['AimerPar'])),
          comments: parseComments(getVal(it, fieldMapFinal, 'CommenterPar', ['CommenterPar']))
        };
      })
      .filter((a) => a.title !== '');

    if (missingImages.length) {
      const rootFolder = await getListRootFolder(siteUrl, listName);
      await Promise.all(
        missingImages.map(async ({ id, fileName }) => {
          const url = await resolveImageUrl(siteUrl, listName, LIST_NAME_ALT, rootFolder, id, fileName);
          const target = actualites.find((a) => a.id === id);
          if (target && url) target.img = url;
        })
      );
    }

    if (actualites.length > 0) {
      cache = { data: actualites, ts: Date.now() };
    }
    return actualites;
  } catch (err) {
    console.error('[actualites] Erreur de chargement :', err);
    return [];
  }
}

let resolvedListName: string | null = null;

function readResolvedListName(): string | null {
  return resolvedListName;
}

async function resolveListName(siteUrl: string): Promise<string> {
  const cached = readResolvedListName();
  if (cached) return cached;
  const fieldMap = await getFieldMap(siteUrl, LIST_NAME);
  let resolved = fieldMap && Object.keys(fieldMap).length > 0 ? LIST_NAME : LIST_NAME_ALT;
  if (resolved === LIST_NAME_ALT) {
    const fieldMapAlt = await getFieldMap(siteUrl, LIST_NAME_ALT);
    if (!fieldMapAlt || Object.keys(fieldMapAlt).length === 0) resolved = LIST_NAME;
  }
  resolvedListName = resolved;
  return resolved;
}

export async function updateActualiteLikedBy(siteUrl: string, itemId: number, likedBy: string[]): Promise<boolean> {
  const listName = await resolveListName(siteUrl);
  const ok = await patchField(siteUrl, listName, itemId, 'AimerPar', likedBy);
  if (ok) invalidateCache();
  return ok;
}

export async function updateActualiteComments(siteUrl: string, itemId: number, comments: IComment[]): Promise<boolean> {
  const listName = await resolveListName(siteUrl);
  const ok = await patchField(siteUrl, listName, itemId, 'CommenterPar', comments);
  if (ok) invalidateCache();
  return ok;
}