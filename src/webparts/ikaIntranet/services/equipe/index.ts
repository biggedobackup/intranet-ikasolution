export interface IMembre {
  id: number;
  name: string;
  role: string;
  dept: string;
  phone: string;
  email: string;
  avatar: string;
  bio: string;
}

const LIST_NAME = 'Equipes';
const LIST_NAME_ALT = 'Equipe';
const CACHE_TTL = 5 * 60 * 1000;

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='40' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3EIKA%3C/text%3E%3C/svg%3E";

export const DEPT_COLORS: Record<string, string> = {
  Direction: 'bg-blue-50 text-ikaBlue',
  'Gestion de projet': 'bg-purple-50 text-purple-700',
  Développement: 'bg-emerald-50 text-emerald-700',
  Comptabilité: 'bg-rose-50 text-rose-700',
  Système: 'bg-amber-50 text-amber-700'
};

let cache: { data: IMembre[]; ts: number } | null = null;

function readCache(): IMembre[] | undefined {
  if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data;
  return undefined;
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

async function getFieldMap(siteUrl: string, listName: string): Promise<Record<string, string>> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/fields?$select=Title,InternalName&$top=500`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return {};
    const fields = (await res.json()).value as Array<{ Title?: string; InternalName?: string }> | undefined;
    const map: Record<string, string> = {};
    (fields || []).forEach((f) => {
      if (f.Title && f.InternalName) map[String(f.Title).toLowerCase()] = f.InternalName;
    });
    return map;
  } catch {
    return {};
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

  const seen: Record<string, boolean> = {};
  for (const c of candidates) {
    if (seen[c]) continue;
    seen[c] = true;
    try {
      const r = await fetch(c, { method: 'HEAD' });
      const ct = (r.headers.get('content-type') || '').toLowerCase();
      if (r.status === 200 && (ct.startsWith('image/') || ct.indexOf('octet-stream') !== -1)) {
        console.log('[equipe] Photo item', itemId, '→', c);
        return c;
      }
    } catch {
      // candidat suivant
    }
  }

  console.warn('[equipe] Photo introuvable item', itemId, ':', fileName);
  return '';
}

export async function loadMembres(siteUrl: string): Promise<IMembre[]> {
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
    const membres: IMembre[] = items
      .filter((it) => isActive(getVal(it, fieldMapFinal, 'Active', ['Active'])))
      .map((it) => {
        const name = asString(getVal(it, fieldMapFinal, 'Titre', ['Title']));
        const bio = asString(getVal(it, fieldMapFinal, 'Bio', ['Bio', 'Description']));
        const rawImg = getVal(it, fieldMapFinal, 'Photo', ['Photo', 'Image', 'Images']);
        const id = Number(getVal(it, fieldMapFinal, 'Id', ['Id']) ?? 0);
        const images = parseImages(rawImg, siteUrl);
        if (!images.length) {
          const fileName = getImageFileName(rawImg);
          if (fileName) missingImages.push({ id, fileName });
        }
        const phone = asString(getVal(it, fieldMapFinal, 'Téléphone Mobile', ['TelephoneMobile', 'Telephone', 'Phone']));

        return {
          id,
          name,
          role: asString(getVal(it, fieldMapFinal, 'Poste', ['Poste', 'Role'])),
          dept: asString(getVal(it, fieldMapFinal, 'Département', ['Departement', 'Department', 'Dept'])),
          phone,
          email: asString(getVal(it, fieldMapFinal, 'Email', ['Email', 'Courriel'])),
          avatar: images[0] || PLACEHOLDER_IMG,
          bio
        };
      })
      .filter((m) => m.name !== '');

    if (missingImages.length) {
      const rootFolder = await getListRootFolder(siteUrl, listName);
      await Promise.all(
        missingImages.map(async ({ id, fileName }) => {
          const url = await resolveImageUrl(siteUrl, listName, LIST_NAME_ALT, rootFolder, id, fileName);
          const target = membres.find((m) => m.id === id);
          if (target && url) target.avatar = url;
        })
      );
    }

    if (membres.length > 0) {
      cache = { data: membres, ts: Date.now() };
    }
    return membres;
  } catch (err) {
    console.error('[equipe] Erreur de chargement :', err);
    return [];
  }
}
