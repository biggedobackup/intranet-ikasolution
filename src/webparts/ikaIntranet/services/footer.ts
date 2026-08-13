import { IFooterColumn, IFooterLink } from '../components/Footer';

const LIST_NAME = 'FooterMenu';

function isActive(value: unknown): boolean {
  return value === true || value === 1;
}

function asString(value: unknown): string {
  return value === null || value === undefined ? '' : String(value).trim();
}

export async function loadFooter(siteUrl: string): Promise<IFooterColumn[]> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/items?$select=Title,LienUrl,Categorie,EstActif&$top=200`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const items = ((await res.json()).value || []) as Array<Record<string, unknown>>;
    const grouped = new Map<string, IFooterLink[]>();

    items
      .filter((item) => isActive(item.EstActif))
      .forEach((item) => {
        const title = asString(item.Title);
        if (!title) return;
        const category = asString(item.Categorie) || 'Autres';
        const link: IFooterLink = { Title: title, URL: asString(item.LienUrl) || '#' };
        const links = grouped.get(category) || [];
        links.push(link);
        grouped.set(category, links);
      });

    const columns: IFooterColumn[] = [];
    grouped.forEach((links, category) => columns.push({ Category: category, links }));
    return columns;
  } catch (err) {
    console.error('[footer] Erreur de chargement du footer :', err);
    return [];
  }
}
