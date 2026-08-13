export interface IHeaderMenuItem {
  Title: string;
  MenuUrl: string;
  children?: IHeaderMenuItem[];
}

interface IRawItem extends Record<string, unknown> {
  Title?: unknown;
  LienUrl?: unknown;
  Position?: unknown;
  EstActif?: unknown;
  Id?: unknown;
}

interface IMappedItem {
  id: number;
  title: string;
  menuUrl: string;
  position: number;
  parentId?: number;
  parentTitle?: string;
}

const LIST_NAME = 'HeaderMenu';
const PARENT_FIELD_CANDIDATES = ['MenuParent', 'Menu_x0020_parent', 'MenuPrincipale', 'Menu_x0020_principale', 'Menu'];

function isActive(value: unknown): boolean {
  return value === true || value === 1;
}

function asString(value: unknown): string {
  return value === null || value === undefined ? '' : String(value).trim();
}

function asNumber(value: unknown): number {
  const n = Number(value ?? 0);
  return Number.isNaN(n) ? 0 : n;
}

function normalizeMenuUrl(value: string): string {
  const url = value === '#' ? '#' : value;
  if (url === '#top') return '#page-accueil';
  if (/^#page-(liste|ajouter|modifier|detail)-(conge|vacances|absence|besoin)$/.test(url)) {
    return url.replace(/^#page-/, '#page-workflow-');
  }
  return url;
}

interface IParentRef {
  id?: number;
  title?: string;
}

function readParentValue(item: IRawItem, field?: string): IParentRef | null {
  const fields: string[] = [];
  if (field) fields.push(field);
  fields.push(...PARENT_FIELD_CANDIDATES.filter((c) => fields.indexOf(c) === -1));

  for (const f of fields) {
    const value = item[f];
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      const id = asNumber(obj.Id);
      const title = asString(obj.Title);
      if (id > 0 || title) return { id: id > 0 ? id : undefined, title: title || undefined };
    } else if (typeof value === 'string' && asString(value)) {
      return { title: asString(value) };
    }
    const idValue = asNumber(item[`${f}Id`]);
    if (idValue > 0) return { id: idValue };
  }
  return null;
}

async function findParentField(siteUrl: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/fields?$select=Title,InternalName,TypeAsString,ReadOnlyField&$top=500`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return null;
    const fields = (await res.json()).value as Array<{
      Title?: string;
      InternalName?: string;
      TypeAsString?: string;
      ReadOnlyField?: boolean;
    }> | undefined;
    if (!fields) return null;

    const lookups = fields.filter(
      (f) => asString(f.TypeAsString).toLowerCase() === 'lookup' && !f.ReadOnlyField
    );

    const match =
      lookups.find((f) => asString(f.Title).toLowerCase() === 'menu parent') ||
      lookups.find((f) => asString(f.Title).toLowerCase() === 'menu principale') ||
      lookups.find((f) => asString(f.Title).toLowerCase().indexOf('parent') !== -1) ||
      lookups.find((f) => asString(f.Title).toLowerCase().indexOf('principale') !== -1) ||
      lookups.find((f) => asString(f.InternalName).toLowerCase().indexOf('menu') !== -1);
    return match ? asString(match.InternalName) || null : null;
  } catch {
    return null;
  }
}

export async function loadHeaderMenu(siteUrl: string): Promise<IHeaderMenuItem[]> {
  try {
    const base = `${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/items`;
    const resolvedField = await findParentField(siteUrl);

    const expandCandidates: string[] = [];
    if (resolvedField) expandCandidates.push(resolvedField);
    expandCandidates.push(...PARENT_FIELD_CANDIDATES.filter((c) => expandCandidates.indexOf(c) === -1));

    let rawItems: IRawItem[] = [];
    let usedField: string | undefined;

    for (const field of expandCandidates) {
      const url = resolvedField
        ? `${base}?$select=Id,Title,LienUrl,Position,EstActif,${field}/Title,${field}Id&$expand=${field}&$top=500`
        : `${base}?$select=*&$expand=${field}&$top=500`;
      const res = await fetch(url, { headers: { Accept: 'application/json;odata=nometadata' } });
      if (!res.ok) continue;
      const json = (await res.json()) as { value?: IRawItem[] };
      const arr = json.value || [];
      if (arr.some((it) => readParentValue(it, field) !== null)) {
        rawItems = arr;
        usedField = field;
        break;
      }
    }

    if (rawItems.length === 0) {
      const res = await fetch(`${base}?$select=*&$top=500`, {
        headers: { Accept: 'application/json;odata=nometadata' }
      });
      if (res.ok) {
        rawItems = ((await res.json()) as { value?: IRawItem[] }).value || [];
      } else {
        const res2 = await fetch(`${base}?$select=Title,LienUrl,Position,EstActif&$top=500`, {
          headers: { Accept: 'application/json;odata=nometadata' }
        });
        if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
        rawItems = ((await res2.json()) as { value?: IRawItem[] }).value || [];
      }
    }

    const mapped: IMappedItem[] = rawItems
      .filter((it) => isActive(it.EstActif))
      .map((it) => {
        const ref = readParentValue(it, usedField);
        return {
          id: asNumber(it.Id),
          title: asString(it.Title),
          menuUrl: normalizeMenuUrl(asString(it.LienUrl) || '#'),
          position: asNumber(it.Position),
          parentId: ref && ref.id ? ref.id : undefined,
          parentTitle: ref && ref.title ? ref.title : undefined
        };
      })
      .filter((m) => m.title !== '')
      .sort((a, b) => a.position - b.position);

    const nodes: IHeaderMenuItem[] = mapped.map((m) => ({ Title: m.title, MenuUrl: m.menuUrl }));
    const byId = new Map<number, IHeaderMenuItem>();
    const byTitle = new Map<string, IHeaderMenuItem>();
    mapped.forEach((m, i) => {
      if (m.id > 0) byId.set(m.id, nodes[i]);
      byTitle.set(m.title.toLowerCase(), nodes[i]);
    });

    const roots: IHeaderMenuItem[] = [];
    mapped.forEach((m, i) => {
      const node = nodes[i];
      let parent = m.parentId !== undefined ? byId.get(m.parentId) : undefined;
      if (!parent && m.parentTitle) {
        parent = byTitle.get(m.parentTitle.toLowerCase());
      }
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    });

    const order = new Map<string, number>();
    mapped.forEach((m) => order.set(m.title.toLowerCase(), m.position));

    const sortByPosition = (list: IHeaderMenuItem[]): IHeaderMenuItem[] =>
      list.sort((a, b) => (order.get(a.Title.toLowerCase()) ?? 0) - (order.get(b.Title.toLowerCase()) ?? 0));

    roots.forEach((root) => {
      if (root.children) root.children = sortByPosition(root.children);
    });

    return sortByPosition(roots);
  } catch (err) {
    console.error('[headerMenu] Erreur de chargement du menu :', err);
    return [];
  }
}
