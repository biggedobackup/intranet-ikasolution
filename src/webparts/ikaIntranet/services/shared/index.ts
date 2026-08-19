export function isBlank(value: string): boolean {
  return !value || !value.replace(/^\s+|\s+$/g, '');
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.replace(/^\s+|\s+$/g, ''));
}

export function escapeHtml(value: string): string {
  return (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getAppPageUrl(): string {
  try {
    return window.location.href.split('#')[0];
  } catch {
    return '';
  }
}

export async function sendEmail(siteUrl: string, to: string[], subject: string, body: string): Promise<boolean> {
  const recipients = (to || []).map((e) => (e || '').replace(/^\s+|\s+$/g, '')).filter(Boolean);
  if (!recipients.length) return false;
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) return false;
    const res = await fetch(`${siteUrl}/_api/SP.Utilities.Utility.SendEmail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': digest
      },
      body: JSON.stringify({
        properties: {
          __metadata: { type: 'SP.Utilities.EmailProperties' },
          To: { results: recipients },
          Subject: subject,
          Body: body
        }
      })
    });
    if (!res.ok) {
      let text = '';
      try { text = await res.text(); } catch { text = ''; }
      console.error('[sendEmail] Échec HTTP', res.status, recipients, text);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[sendEmail] Erreur', err);
    return false;
  }
}

export function computeJoursInclusive(dateDebut: string, dateFin: string): number | undefined {
  if (!dateDebut || !dateFin) return undefined;
  const start = new Date(dateDebut);
  const end = new Date(dateFin);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end.getTime() < start.getTime()) return undefined;
  return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
}

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

export interface ISpUser {
  id: number;
  title: string;
  email: string;
  loginName: string;
}

export async function getCurrentUser(siteUrl: string): Promise<ISpUser | undefined> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/currentuser?$select=Id,Title,Email,LoginName`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    if (data.Id === undefined || data.Id === null) return undefined;
    return { id: Number(data.Id), title: data.Title || '', email: data.Email || '', loginName: data.LoginName || '' };
  } catch {
    return undefined;
  }
}

export async function ensureUser(siteUrl: string, logonName: string): Promise<ISpUser | undefined> {
  const trimmed = (logonName || '').replace(/^\s+|\s+$/g, '');
  if (!trimmed) return undefined;
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) return undefined;
    const res = await fetch(`${siteUrl}/_api/web/ensureuser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;odata=nometadata',
        'Content-Type': 'application/json;odata=nometadata',
        'X-RequestDigest': digest
      },
      body: JSON.stringify({ logonName: trimmed })
    });
    if (!res.ok) {
      console.error('[ensureUser] Échec HTTP', res.status, trimmed);
      return undefined;
    }
    const data = await res.json();
    if (data.Id === undefined || data.Id === null) return undefined;
    return { id: Number(data.Id), title: data.Title || trimmed, email: data.Email || trimmed, loginName: data.LoginName || '' };
  } catch (err) {
    console.error('[ensureUser] Erreur', err);
    return undefined;
  }
}

export interface ISearchUser {
  displayName: string;
  email: string;
  loginName: string;
}

interface IPeoplePickerEntity {
  Key?: string;
  DisplayText?: string;
  EntityData?: { Email?: string };
}

export async function searchUsers(siteUrl: string, query: string): Promise<ISearchUser[]> {
  const trimmed = (query || '').replace(/^\s+|\s+$/g, '');
  if (trimmed.length < 2) return [];
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) return [];
    const queryParams = {
      AllowEmailAddresses: true,
      AllowMultipleEntities: false,
      MaximumEntitySuggestions: 15,
      PrincipalSource: 15,
      PrincipalType: 1,
      QueryString: trimmed
    };
    const res = await fetch(
      `${siteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json;odata=nometadata',
          'Content-Type': 'application/json;odata=nometadata',
          'X-RequestDigest': digest
        },
        body: JSON.stringify({ queryParams })
      }
    );
    if (!res.ok) {
      console.error('[searchUsers] Échec HTTP', res.status, trimmed);
      return [];
    }
    const data = await res.json();
    const raw: unknown = data.value !== undefined ? data.value : data;
    let entities: IPeoplePickerEntity[] = [];
    if (typeof raw === 'string') {
      try { entities = JSON.parse(raw) as IPeoplePickerEntity[]; } catch { entities = []; }
    } else if (Array.isArray(raw)) {
      entities = raw as IPeoplePickerEntity[];
    }
    return entities
      .map((entry) => {
        const email = entry.EntityData?.Email || (entry.Key && entry.Key.indexOf('@') !== -1 ? entry.Key : '');
        return { displayName: entry.DisplayText || email || '', email: email || '', loginName: entry.Key || '' };
      })
      .filter((u) => !!u.email);
  } catch (err) {
    console.error('[searchUsers] Erreur', err);
    return [];
  }
}

export async function getFieldMap(siteUrl: string, listName: string): Promise<Record<string, string>> {
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

export function getVal(item: Record<string, unknown>, map: Record<string, string>, display: string, fallbacks: string[] = []): unknown {
  const key = map[display.toLowerCase()];
  if (key && item[key] !== undefined) return item[key];
  for (const f of fallbacks) {
    if (item[f] !== undefined) return item[f];
  }
  return undefined;
}

export async function getListEntityTypeFullName(siteUrl: string, listName: string): Promise<string> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')?$select=ListItemEntityTypeFullName`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return '';
    const data = await res.json();
    return data.ListItemEntityTypeFullName || '';
  } catch {
    return '';
  }
}

export async function createListItem(siteUrl: string, listName: string, fields: Record<string, unknown>): Promise<number | undefined> {
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) {
      console.error('[createListItem] Impossible d’obtenir le digest pour', listName);
      return undefined;
    }
    const body: Record<string, unknown> = {};
    Object.keys(fields).forEach((k) => { body[k] = fields[k]; });
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;odata=nometadata',
        'Content-Type': 'application/json;odata=nometadata',
        'X-RequestDigest': digest
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      let text = '';
      try { text = await res.text(); } catch { text = ''; }
      console.error('[createListItem] Échec HTTP', res.status, listName, text);
      return undefined;
    }
    const data = await res.json();
    const id = data.Id !== undefined ? data.Id : data.ID;
    return id !== undefined ? Number(id) : undefined;
  } catch (err) {
    console.error('[createListItem] Erreur', err);
    return undefined;
  }
}

export async function updateListItemFields(siteUrl: string, listName: string, itemId: number, fields: Record<string, unknown>): Promise<boolean> {
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) {
      console.error('[updateListItemFields] Impossible d’obtenir le digest pour', listName, itemId);
      return false;
    }
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;odata=nometadata',
        'Content-Type': 'application/json;odata=nometadata',
        'X-HTTP-Method': 'MERGE',
        'IF-MATCH': '*',
        'X-RequestDigest': digest
      },
      body: JSON.stringify(fields)
    });
    if (!res.ok) {
      let text = '';
      try { text = await res.text(); } catch { text = ''; }
      console.error('[updateListItemFields] Échec HTTP', res.status, listName, itemId, text);
    }
    return res.ok;
  } catch (err) {
    console.error('[updateListItemFields] Erreur', err);
    return false;
  }
}

export async function deleteListItem(siteUrl: string, listName: string, itemId: number): Promise<boolean> {
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) {
      console.error('[deleteListItem] Impossible d’obtenir le digest pour', listName, itemId);
      return false;
    }
    const res = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;odata=nometadata',
        'X-HTTP-Method': 'DELETE',
        'IF-MATCH': '*',
        'X-RequestDigest': digest
      }
    });
    if (!res.ok) {
      let text = '';
      try { text = await res.text(); } catch { text = ''; }
      console.error('[deleteListItem] Échec HTTP', res.status, listName, itemId, text);
    }
    return res.ok;
  } catch (err) {
    console.error('[deleteListItem] Erreur', err);
    return false;
  }
}

export interface IAttachment {
  fileName: string;
  url: string;
}

export async function getAttachments(siteUrl: string, listName: string, itemId: number): Promise<IAttachment[]> {
  try {
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles?$select=FileName,ServerRelativeUrl`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return [];
    const files = ((await res.json()).value || []) as Array<{ FileName?: string; ServerRelativeUrl?: string }>;
    const origin = new URL(siteUrl).origin;
    return files
      .filter((f) => !!f.FileName && !!f.ServerRelativeUrl)
      .map((f) => ({ fileName: String(f.FileName), url: `${origin}${f.ServerRelativeUrl}` }));
  } catch (err) {
    console.error('[getAttachments] Erreur', err);
    return [];
  }
}

export async function addAttachment(siteUrl: string, listName: string, itemId: number, file: File): Promise<boolean> {
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) {
      console.error('[addAttachment] Impossible d’obtenir le digest pour', listName, itemId);
      return false;
    }
    const buffer = await file.arrayBuffer();
    const safeName = file.name.replace(/'/g, "''");
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles/add(FileName='${encodeURIComponent(safeName)}')`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json;odata=nometadata',
          'X-RequestDigest': digest
        },
        body: buffer
      }
    );
    if (!res.ok) {
      let text = '';
      try { text = await res.text(); } catch { text = ''; }
      console.error('[addAttachment] Échec HTTP', res.status, listName, itemId, file.name, text);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[addAttachment] Erreur', err);
    return false;
  }
}

export async function deleteAttachment(siteUrl: string, listName: string, itemId: number, fileName: string): Promise<boolean> {
  try {
    const digest = await getRequestDigest(siteUrl);
    if (!digest) {
      console.error('[deleteAttachment] Impossible d’obtenir le digest pour', listName, itemId, fileName);
      return false;
    }
    const safeName = fileName.replace(/'/g, "''");
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles/getByFileName('${encodeURIComponent(safeName)}')`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json;odata=nometadata',
          'X-HTTP-Method': 'DELETE',
          'IF-MATCH': '*',
          'X-RequestDigest': digest
        }
      }
    );
    if (!res.ok) {
      console.error('[deleteAttachment] Échec HTTP', res.status, listName, itemId, fileName);
    }
    return res.ok;
  } catch (err) {
    console.error('[deleteAttachment] Erreur', err);
    return false;
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
