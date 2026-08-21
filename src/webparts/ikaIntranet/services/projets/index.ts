export interface IProjet {
  id: number;
  name: string;
  start: string;
  end: string;
  status: string;
  cls: string;
  client: string;
  description: string;
  responsable: string;
}

const LIST_NAME = 'Projets';
const CACHE_TTL = 5 * 60 * 1000;

let cache: { data: IProjet[]; ts: number } | null = null;

function readCache(): IProjet[] | undefined {
  if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data;
  return undefined;
}

function asString(value: unknown): string {
  return value === null || value === undefined ? '' : String(value).trim();
}

function formatDateFR(value: unknown): string {
  const d = new Date(String(value));
  if (isNaN(d.getTime())) return '';
  const dd = ('0' + d.getDate()).slice(-2);
  const mm = ('0' + (d.getMonth() + 1)).slice(-2);
  return `${dd}/${mm}/${d.getFullYear()}`;
}

function statusCls(status: string): string {
  const s = status.toLowerCase();
  if (s.indexOf('termin') !== -1) return 'bg-emerald-100 text-emerald-700';
  if (s.indexOf('retard') !== -1) return 'bg-rose-100 text-rose-700';
  if (s.indexOf('plan') !== -1 || s.indexOf('a venir') !== -1 || s.indexOf('avenir') !== -1) return 'bg-slate-100 text-slate-700';
  return 'bg-blue-100 text-blue-700';
}

function isActive(value: unknown): boolean {
  return value !== false && value !== 0;
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

export async function loadProjets(siteUrl: string): Promise<IProjet[]> {
  const cached = readCache();
  if (cached) return cached;
  try {
    const fieldMap = await getFieldMap(siteUrl, LIST_NAME);
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/items?$select=*,Author/Title&$expand=Author/Title&$top=500`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const items = ((await res.json()).value || []) as Array<Record<string, unknown>>;
    const projets: IProjet[] = items
      .filter((it) => isActive(getVal(it, fieldMap, 'Active', ['Active'])))
      .map((it) => {
        const status = asString(getVal(it, fieldMap, 'Statut', ['Statut', 'Status']));
        return {
          id: Number(getVal(it, fieldMap, 'Id', ['Id']) ?? 0),
          name: asString(getVal(it, fieldMap, 'Titre', ['Title'])),
          start: formatDateFR(getVal(it, fieldMap, 'Date de début', ['DateDebut', 'StartDate', 'Debut'])),
          end: formatDateFR(getVal(it, fieldMap, 'Date de fin', ['DateFin', 'EndDate', 'Fin'])),
          status,
          cls: statusCls(status),
          client: asString(getVal(it, fieldMap, 'Client', ['Client'])),
          description: asString(getVal(it, fieldMap, 'Description', ['Description'])),
          responsable: getAuthor(it, fieldMap)
        };
      })
      .filter((p) => p.name !== '');

    if (projets.length > 0) {
      cache = { data: projets, ts: Date.now() };
    }
    return projets;
  } catch (err) {
    console.error('[projets] Erreur de chargement :', err);
    return [];
  }
}
