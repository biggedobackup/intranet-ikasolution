export interface IGalerieFolder {
  name: string;
  serverRelativeUrl: string;
  itemCount: number;
}

export interface IGalerieImage {
  id: string;
  name: string;
  title: string;
  description: string;
  url: string;
}

const LIBRARY_NAME = 'Galerie';
const CACHE_TTL = 5 * 60 * 1000;

const folderCache: Record<string, { data: IGalerieFolder[]; ts: number }> = {};
const imagesCache: Record<string, { data: IGalerieImage[]; ts: number }> = {};

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

function encodeODataString(value: string): string {
  return value.replace(/'/g, "''");
}

export function isImageFile(fileName: string): boolean {
  return /\.(apng|avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(fileName);
}

async function getListRootUrl(siteUrl: string, listName: string): Promise<string> {
  const res = await fetch(
    `${siteUrl}/_api/web/lists/getbytitle('${listName}')/RootFolder?$select=ServerRelativeUrl`,
    { headers: { Accept: 'application/json;odata=nometadata' } }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as { ServerRelativeUrl?: string };
  const sr = data.ServerRelativeUrl || '';
  if (!sr) throw new Error('RootFolder vide');
  return sr;
}

export async function getGalerieRootFolder(siteUrl: string): Promise<string> {
  try {
    return await getListRootUrl(siteUrl, LIBRARY_NAME);
  } catch {
    // tentatives avec variantes de casse
    try {
      return await getListRootUrl(siteUrl, 'galerie');
    } catch {
      const sp = sitePathOf(siteUrl);
      return sp ? `${sp}/${LIBRARY_NAME}` : `/${LIBRARY_NAME}`;
    }
  }
}

function readFolderCache(rootUrl: string): IGalerieFolder[] | undefined {
  const cached = folderCache[rootUrl];
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  return undefined;
}

function readImagesCache(folderUrl: string): IGalerieImage[] | undefined {
  const cached = imagesCache[folderUrl];
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  return undefined;
}

export async function loadGalerieFolders(siteUrl: string, rootUrl: string): Promise<IGalerieFolder[]> {
  const cachedFolder = readFolderCache(rootUrl);
  if (cachedFolder) return cachedFolder;
  try {
    const url = `${siteUrl}/_api/web/GetFolderByServerRelativeUrl('${encodeODataString(rootUrl)}')/Folders?$select=Name,ServerRelativeUrl,ItemCount&$orderby=Name asc`;
    const res = await fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as { value?: Array<{ Name?: string; ServerRelativeUrl?: string; ItemCount?: number }> };
    const folders = (data.value || [])
      .filter((f) => {
        const name = asString(f.Name);
        return name !== '' && name !== 'Forms' && !name.startsWith('_');
      })
      .map((f) => ({
        name: asString(f.Name),
        serverRelativeUrl: asString(f.ServerRelativeUrl),
        itemCount: Number(f.ItemCount || 0)
      }));

    if (folders.length > 0) {
      folderCache[rootUrl] = { data: folders, ts: Date.now() };
    }
    return folders;
  } catch (err) {
    console.error('[galerie] Erreur de chargement des dossiers :', err);
    return [];
  }
}

export async function loadGalerieImages(siteUrl: string, folderUrl: string): Promise<IGalerieImage[]> {
  const cachedImages = readImagesCache(folderUrl);
  if (cachedImages) return cachedImages;
  try {
    const url = `${siteUrl}/_api/web/GetFolderByServerRelativeUrl('${encodeODataString(folderUrl)}')/Files?$select=Name,ServerRelativeUrl,ListItemAllFields/Title,ListItemAllFields/Description&$expand=ListItemAllFields&$top=5000`;
    const res = await fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as {
      value?: Array<{
        Name?: string;
        ServerRelativeUrl?: string;
        ListItemAllFields?: { Title?: string; Description?: string };
      }>;
    };

    const images = (data.value || [])
      .filter((file) => isImageFile(asString(file.Name)))
      .map((file) => {
        const fields = file.ListItemAllFields || {};
        const name = asString(file.Name);
        return {
          id: asString(file.ServerRelativeUrl) || name,
          name,
          title: asString(fields.Title) || name.replace(/\.[^.]+$/, ''),
          description: asString(fields.Description),
          url: normalizeUrl(file.ServerRelativeUrl, siteUrl)
        };
      });

    if (images.length > 0) {
      imagesCache[folderUrl] = { data: images, ts: Date.now() };
    }
    return images;
  } catch (err) {
    console.error('[galerie] Erreur de chargement des images :', err);
    return [];
  }
}