export interface IBilan {
  id: number;
  period: string;
  summary: string;
  file: string;
  fileUrl: string;
  size: string;
}

const LIST_NAME = 'Bilans';
const CACHE_TTL = 5 * 60 * 1000;

let cache: { data: IBilan[]; ts: number } | null = null;

function readCache(): IBilan[] | undefined {
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

function formatSize(bytes: number): string {
  if (!bytes || isNaN(bytes) || bytes <= 0) return 'PDF';
  if (bytes < 1024) return `${bytes} o - PDF`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko - PDF`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo - PDF`;
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

export async function loadBilans(siteUrl: string): Promise<IBilan[]> {
  const cached = readCache();
  if (cached) return cached;
  try {
    const fieldMap = await getFieldMap(siteUrl, LIST_NAME);
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/items?$select=*,AttachmentFiles/ServerRelativeUrl,AttachmentFiles/FileName,AttachmentFiles/Length&$expand=AttachmentFiles&$top=500`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const items = ((await res.json()).value || []) as Array<Record<string, unknown>>;
    const bilans: IBilan[] = items
      .filter((it) => isActive(getVal(it, fieldMap, 'Active', ['Active'])))
      .map((it) => {
        const id = Number(getVal(it, fieldMap, 'Id', ['Id']) ?? 0);
        const attachments = (it.AttachmentFiles as Array<{ ServerRelativeUrl?: string; FileName?: string; Length?: number }> | undefined) || [];
        const att = attachments[0];
        const period = asString(getVal(it, fieldMap, 'Titre', ['Title']));

        return {
          id,
          period,
          summary: asString(getVal(it, fieldMap, 'Résumé', ['Resume', 'Summary', 'Description'])),
          file: (att && (att.FileName || '')) || `${period || 'Bilan'}.pdf`,
          fileUrl: att && att.ServerRelativeUrl ? normalizeUrl(att.ServerRelativeUrl, siteUrl) : '',
          size: att ? formatSize(att.Length || 0) : 'PDF'
        };
      })
      .filter((b) => b.period !== '');

    if (bilans.length > 0) {
      cache = { data: bilans, ts: Date.now() };
    }
    return bilans;
  } catch (err) {
    console.error('[bilans] Erreur de chargement :', err);
    return [];
  }
}
