import { IComment, parseLikedBy, parseComments, patchField } from '../shared/index';

export interface IEvenement {
  id: number;
  img: string;
  title: string;
  dateIcon: string;
  date: string;
  locationIcon: string;
  location: string;
  category: string;
  text: string;
  longText: string;
  speaker: string;
  seats: string;
  likedBy: string[];
  comments: IComment[];
}

const LIST_NAME = 'Evenement';
const LIST_NAME_ALT = 'Evenements';
const CACHE_TTL = 5 * 60 * 1000;

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='22' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3EIKA SOLUTION%3C/text%3E%3C/svg%3E";

const ICON_COLORS = ['text-amber-400', 'text-emerald-400', 'text-purple-400', 'text-rose-400', 'text-blue-400'];

let cache: { data: IEvenement[]; ts: number } | null = null;

function readCache(): IEvenement[] | undefined {
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

  console.warn('[evenements] Image introuvable item', itemId, ':', fileName);
  return '';
}

function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start) return '';
  const sameDay = end && start.toDateString() === end.toDateString();
  if (sameDay) {
    return start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  if (end) {
    return `${start.getDate()} - ${end.getDate()} ${end.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
  }
  return start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function loadEvenements(siteUrl: string): Promise<IEvenement[]> {
  const cached = readCache();
  if (cached) return cached;
  try {
    const fieldMap = await getFieldMap(siteUrl, LIST_NAME);
    const listName = fieldMap && Object.keys(fieldMap).length > 0 ? LIST_NAME : LIST_NAME_ALT;
    const fieldMapFinal = Object.keys(fieldMap).length > 0 ? fieldMap : await getFieldMap(siteUrl, LIST_NAME_ALT);
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=*,Author/Title&$expand=Author/Title&$top=500`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const items = ((await res.json()).value || []) as Array<Record<string, unknown>>;
    const missingImages: Array<{ id: number; fileName: string }> = [];
    const evenements: IEvenement[] = items
      .filter((it) => isActive(getVal(it, fieldMapFinal, 'Active', ['Active'])))
      .map((it, i) => {
        const title = asString(getVal(it, fieldMapFinal, 'Titre', ['Title']));
        const longText = asString(getVal(it, fieldMapFinal, 'Description', ['Description']));
        const rawImg = getVal(it, fieldMapFinal, 'Image', ['Image', 'Images']);
        const id = Number(getVal(it, fieldMapFinal, 'Id', ['Id']) ?? 0);
        const images = parseImages(rawImg, siteUrl);
        if (!images.length) {
          const fileName = getImageFileName(rawImg);
          if (fileName) missingImages.push({ id, fileName });
        }
        const startRaw = getVal(it, fieldMapFinal, 'Date et heure de début', ['DateDebut', 'StartTime', 'EventDate', 'StartDateTime']);
        const endRaw = getVal(it, fieldMapFinal, 'Date et heure de fin', ['DateFin', 'EndTime', 'EndDate', 'EndDateTime']);
        const start = startRaw ? new Date(String(startRaw)) : null;
        const end = endRaw ? new Date(String(endRaw)) : null;
        const color = ICON_COLORS[i % ICON_COLORS.length];

        return {
          id,
          img: images[0] || PLACEHOLDER_IMG,
          title,
          dateIcon: color,
          date: formatDateRange(start, end),
          locationIcon: color,
          location: asString(getVal(it, fieldMapFinal, 'Localisation', ['Localisation', 'Location', 'Lieu'])),
          category: asString(getVal(it, fieldMapFinal, 'Catégorie', ['Categorie', 'Category'])),
          text: longText.slice(0, 140),
          longText,
          speaker: getAuthor(it, fieldMapFinal),
          seats: '',
          likedBy: parseLikedBy(getVal(it, fieldMapFinal, 'AimerPar', ['AimerPar'])),
          comments: parseComments(getVal(it, fieldMapFinal, 'CommenterPar', ['CommenterPar']))
        };
      })
      .filter((e) => e.title !== '');

    if (missingImages.length) {
      const rootFolder = await getListRootFolder(siteUrl, listName);
      await Promise.all(
        missingImages.map(async ({ id, fileName }) => {
          const url = await resolveImageUrl(siteUrl, listName, LIST_NAME_ALT, rootFolder, id, fileName);
          const target = evenements.find((e) => e.id === id);
          if (target && url) target.img = url;
        })
      );
    }

    if (evenements.length > 0) {
      cache = { data: evenements, ts: Date.now() };
    }
    return evenements;
  } catch (err) {
    console.error('[evenements] Erreur de chargement :', err);
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

export async function updateEvenementLikedBy(siteUrl: string, itemId: number, likedBy: string[]): Promise<boolean> {
  const listName = await resolveListName(siteUrl);
  const ok = await patchField(siteUrl, listName, itemId, 'AimerPar', likedBy);
  if (ok) invalidateCache();
  return ok;
}

export async function updateEvenementComments(siteUrl: string, itemId: number, comments: IComment[]): Promise<boolean> {
  const listName = await resolveListName(siteUrl);
  const ok = await patchField(siteUrl, listName, itemId, 'CommenterPar', comments);
  if (ok) invalidateCache();
  return ok;
}