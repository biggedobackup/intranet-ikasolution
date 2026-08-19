export interface IAgendaItem {
  id: number;
  month: string;
  day: string;
  bg: string;
  title: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  text: string;
  start?: string;
  end?: string;
}

const LIST_NAME = 'Agendas';
const CACHE_TTL = 5 * 60 * 1000;

const MONTHS_FR = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
const BG_CLASSES = ['bg-ikaBlueDark', 'bg-ikaRed', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600', 'bg-rose-600'];

let cache: { data: IAgendaItem[]; ts: number } | null = null;

function isActive(value: unknown): boolean {
  return value !== false && value !== 0;
}

function asString(value: unknown): string {
  return value === null || value === undefined ? '' : String(value).trim();
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

function formatTime(date: Date | null): string {
  return date && !isNaN(date.getTime())
    ? date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : '';
}

function readCache(): IAgendaItem[] | undefined {
  if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data;
  return undefined;
}

export async function loadAgendas(siteUrl: string): Promise<IAgendaItem[]> {
  const cached = readCache();
  if (cached) return cached;
  try {
    const fieldMap = await getFieldMap(siteUrl, LIST_NAME);
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/items?$select=*&$top=500`, {
      headers: { Accept: 'application/json;odata=nometadata' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const items = ((await res.json()).value || []) as Array<Record<string, unknown>>;
    const agenda: IAgendaItem[] = items
      .filter((it) => isActive(getVal(it, fieldMap, 'Active', ['Active'])))
      .map((it, i) => {
        const startRaw = getVal(it, fieldMap, 'Date et heure de début', ['DateDebut', 'StartTime', 'EventDate', 'StartDateTime']);
        const endRaw = getVal(it, fieldMap, 'Date et heure de fin', ['DateFin', 'EndTime', 'EndDate', 'EndDateTime']);
        const start = startRaw ? new Date(String(startRaw)) : null;
        const end = endRaw ? new Date(String(endRaw)) : null;
        const startTime = formatTime(start);
        const endTime = formatTime(end);
        const time = start && end ? `${startTime} - ${endTime}` : startTime || 'Toute la journée';

        return {
          id: Number(getVal(it, fieldMap, 'Id', ['Id']) ?? i + 1),
          month: start && !isNaN(start.getTime()) ? MONTHS_FR[start.getMonth()] : '',
          day: start && !isNaN(start.getTime()) ? String(start.getDate()) : '',
          bg: BG_CLASSES[i % BG_CLASSES.length],
          title: asString(getVal(it, fieldMap, 'Titre', ['Title'])),
          time,
          location: asString(getVal(it, fieldMap, 'Localisation', ['Localisation', 'Location', 'Lieu'])),
          category: asString(getVal(it, fieldMap, 'Catégorie', ['Categorie', 'Category'])),
          organizer: asString(getVal(it, fieldMap, 'Organisateur', ['Organisateur', 'Organizer'])),
          text: asString(getVal(it, fieldMap, 'Description', ['Description'])),
          start: start && !isNaN(start.getTime()) ? start.toISOString() : undefined,
          end: end && !isNaN(end.getTime()) ? end.toISOString() : undefined
        };
      })
      .filter((a) => a.title !== '');

    if (agenda.length > 0) {
      cache = { data: agenda, ts: Date.now() };
    }
    return agenda;
  } catch (err) {
    console.error('[agenda] Erreur de chargement :', err);
    return [];
  }
}