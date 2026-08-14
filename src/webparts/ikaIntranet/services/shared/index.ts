export interface IComment {
  user: string;
  email: string;
  text: string;
  date: string;
}

export async function getCurrentUserEmail(siteUrl: string): Promise<string> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/currentuser?$select=Email,Title`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return '';
    const data = await res.json();
    return data.Email || '';
  } catch {
    return '';
  }
}

export async function getCurrentUserName(siteUrl: string): Promise<string> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/currentuser?$select=Title`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return '';
    const data = await res.json();
    return data.Title || '';
  } catch {
    return '';
  }
}

function parseJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function parseLikedBy(value: unknown): string[] {
  return parseJsonArray(value).filter((x): x is string => typeof x === 'string');
}

export function parseComments(value: unknown): IComment[] {
  return parseJsonArray(value).filter(
    (c): c is IComment => typeof c === 'object' && c !== null && 'text' in c
  );
}

let digestCache: { value: string; ts: number } | null = null;

function digestFromPage(): string {
  try {
    const el = document.getElementById('__REQUESTDIGEST') as HTMLInputElement | null;
    if (el && el.value) return el.value;
    const el2 = document.querySelector('input[name="__REQUESTDIGEST"]') as HTMLInputElement | null;
    if (el2 && el2.value) return el2.value;
  } catch {
    // ignore
  }
  return '';
}

export async function getRequestDigest(siteUrl: string): Promise<string> {
  if (digestCache && Date.now() - digestCache.ts < 20 * 60 * 1000) return digestCache.value;

  const pageDigest = digestFromPage();
  if (pageDigest) {
    digestCache = { value: pageDigest, ts: Date.now() };
    return pageDigest;
  }

  const attempts: Array<{ accept: string; body: string }> = [
    { accept: 'application/json;odata=nometadata', body: '{}' },
    { accept: 'application/json;odata=verbose', body: '{}' },
    { accept: 'application/json;odata=nometadata', body: '' }
  ];

  for (const attempt of attempts) {
    try {
      const res = await fetch(`${siteUrl}/_api/contextinfo`, {
        method: 'POST',
        headers: {
          Accept: attempt.accept,
          'Content-Type': attempt.accept
        },
        body: attempt.body
      });
      if (!res.ok) {
        console.error('[getRequestDigest] contextinfo HTTP', res.status, 'accept=', attempt.accept);
        continue;
      }
      const data = await res.json();
      let digest = '';
      if (data && data.GetContextWebInformation) {
        digest = data.GetContextWebInformation.FormDigestValue || '';
      } else if (data && data.d && data.d.GetContextWebInformation) {
        digest = data.d.GetContextWebInformation.FormDigestValue || '';
      }
      if (digest) {
        digestCache = { value: digest, ts: Date.now() };
        return digest;
      }
    } catch (err) {
      console.error('[getRequestDigest] Erreur contextinfo (accept=', attempt.accept, ') :', err);
    }
  }

  console.error('[getRequestDigest] Aucun digest obtenu');
  return '';
}

export async function patchField(
  siteUrl: string,
  listName: string,
  itemId: number,
  fieldName: string,
  value: unknown
): Promise<boolean> {
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) {
      console.error('[patchField] Impossible d’obtenir le digest pour', listName, itemId, fieldName);
      return false;
    }
    const body: Record<string, unknown> = {};
    body[fieldName] = typeof value === 'string' ? value : JSON.stringify(value);
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json;odata=nometadata',
          'Content-Type': 'application/json;odata=nometadata',
          'X-HTTP-Method': 'MERGE',
          'IF-MATCH': '*',
          'X-RequestDigest': digest
        },
        body: JSON.stringify(body)
      }
    );
    if (!res.ok) {
      console.error('[patchField] Échec HTTP', res.status, listName, itemId, fieldName);
    }
    return res.ok;
  } catch (err) {
    console.error('[patchField] Erreur', err);
    return false;
  }
}
