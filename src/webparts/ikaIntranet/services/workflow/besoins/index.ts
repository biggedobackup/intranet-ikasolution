import { getFieldMap, getVal, getCurrentUser, ensureUser, createListItem, updateListItemFields, deleteListItem, sendEmail, escapeHtml, getAppPageUrl, getAttachments, addAttachment, deleteAttachment, IAttachment } from '../../shared/index';

export type BesoinStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type PrioriteBesoin = 'Basse' | 'Moyenne' | 'Haute';

export const BESOIN_PRIORITES: PrioriteBesoin[] = ['Basse', 'Moyenne', 'Haute'];
export const BESOIN_STATUTS: BesoinStatus[] = ['En attente', 'Approuvé', 'Refusé', 'Annulé'];

export interface IBesoin {
  id: number;
  titre: string;
  demandeurId?: number;
  demandeur: string;
  demandeurEmail: string;
  priorite: PrioriteBesoin;
  dateSouhaitee: string;
  description: string;
  validateurId?: number;
  validateur: string;
  validateurEmail: string;
  statut: BesoinStatus;
  commentaireDecision: string;
  dateDecision: string;
  createdAt: string;
  active: boolean;
}

export interface IBesoinPayload {
  titre: string;
  priorite: PrioriteBesoin;
  dateSouhaitee: string;
  description: string;
  validateurEmail: string;
}

const LIST_NAME = 'Expressions Besoin';
const CACHE_TTL = 60 * 1000;

let cache: { data: IBesoin[]; ts: number } | null = null;

function invalidateCache(): void {
  cache = null;
}

function readCache(): IBesoin[] | undefined {
  if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data;
  return undefined;
}

function asString(value: unknown): string {
  return value === null || value === undefined ? '' : String(value).replace(/^\s+|\s+$/g, '');
}

function isActive(value: unknown): boolean {
  return value !== false && value !== 0;
}

function pad2(n: number): string {
  return n < 10 ? '0' + String(n) : String(n);
}

function toIsoDate(value: unknown): string {
  const s = asString(value);
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return '';
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

export function formatDateFR(iso: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function personName(raw: unknown): string {
  if (raw && typeof raw === 'object') return asString((raw as { Title?: string }).Title);
  return '';
}

function personEmail(raw: unknown): string {
  if (raw && typeof raw === 'object') return asString((raw as { EMail?: string }).EMail);
  return '';
}

function personId(item: Record<string, unknown>, key: string): number | undefined {
  const raw = item[`${key}Id`];
  if (raw === undefined || raw === null || raw === '') return undefined;
  const n = Number(raw);
  return isNaN(n) ? undefined : n;
}

interface IKeys {
  fieldMap: Record<string, string>;
  demandeurKey: string;
  validateurKey: string;
  prioriteKey: string;
  dateSouhaiteeKey: string;
  descriptionKey: string;
  statutKey: string;
  commentaireKey: string;
  dateDecisionKey: string;
  activeKey: string;
}

async function resolveKeys(siteUrl: string): Promise<IKeys> {
  const fieldMap = await getFieldMap(siteUrl, LIST_NAME);
  return {
    fieldMap,
    demandeurKey: fieldMap['demandeur'] || 'Demandeur',
    validateurKey: fieldMap['validateur'] || 'Validateur',
    prioriteKey: fieldMap['priorité'] || 'Priorite',
    dateSouhaiteeKey: fieldMap['date souhaitée'] || 'DateSouhaitee',
    descriptionKey: fieldMap['description'] || 'Description',
    statutKey: fieldMap['statut'] || 'Statut',
    commentaireKey: fieldMap['commentaire décision'] || 'CommentaireDecision',
    dateDecisionKey: fieldMap['date décision'] || 'DateDecision',
    activeKey: fieldMap['active'] || 'Active'
  };
}

function expandClause(keys: IKeys): string {
  return [
    `${keys.demandeurKey}/Title`, `${keys.demandeurKey}/EMail`,
    `${keys.validateurKey}/Title`, `${keys.validateurKey}/EMail`
  ].join(',');
}

function mapItem(it: Record<string, unknown>, keys: IKeys): IBesoin {
  const demandeurRaw = it[keys.demandeurKey];
  const validateurRaw = it[keys.validateurKey];
  return {
    id: Number(getVal(it, keys.fieldMap, 'Id', ['Id']) || 0),
    titre: asString(getVal(it, keys.fieldMap, 'Titre', ['Title'])),
    demandeurId: personId(it, keys.demandeurKey),
    demandeur: personName(demandeurRaw),
    demandeurEmail: personEmail(demandeurRaw),
    priorite: (asString(getVal(it, keys.fieldMap, 'Priorité', ['Priorite'])) || 'Moyenne') as PrioriteBesoin,
    dateSouhaitee: toIsoDate(getVal(it, keys.fieldMap, 'Date Souhaitée', ['DateSouhaitee'])),
    description: asString(getVal(it, keys.fieldMap, 'description', ['Description'])),
    validateurId: personId(it, keys.validateurKey),
    validateur: personName(validateurRaw),
    validateurEmail: personEmail(validateurRaw),
    statut: (asString(getVal(it, keys.fieldMap, 'Statut', ['Statut'])) || 'En attente') as BesoinStatus,
    commentaireDecision: asString(getVal(it, keys.fieldMap, 'Commentaire Décision', ['CommentaireDecision'])),
    dateDecision: toIsoDate(getVal(it, keys.fieldMap, 'Date Décision', ['DateDecision'])),
    createdAt: toIsoDate(getVal(it, keys.fieldMap, 'Créé', ['Created'])),
    active: isActive(getVal(it, keys.fieldMap, 'Active', ['Active']))
  };
}

export async function loadBesoins(siteUrl: string, force?: boolean): Promise<IBesoin[]> {
  if (!force) {
    const cached = readCache();
    if (cached) return cached;
  }
  try {
    const keys = await resolveKeys(siteUrl);
    const expand = expandClause(keys);
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/items?$select=*,${expand}&$expand=${expand}&$top=500&$orderby=Id desc`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = ((await res.json()).value || []) as Array<Record<string, unknown>>;
    const besoins = items
      .map((it) => mapItem(it, keys))
      .filter((b) => b.active && b.titre !== '');
    cache = { data: besoins, ts: Date.now() };
    return besoins;
  } catch (err) {
    console.error('[besoins] Erreur de chargement :', err);
    return [];
  }
}

export async function loadBesoin(siteUrl: string, id: number): Promise<IBesoin | undefined> {
  try {
    const keys = await resolveKeys(siteUrl);
    const expand = expandClause(keys);
    const res = await fetch(
      `${siteUrl}/_api/web/lists/getbytitle('${LIST_NAME}')/items(${id})?$select=*,${expand}&$expand=${expand}`,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    if (!res.ok) return undefined;
    const it = (await res.json()) as Record<string, unknown>;
    return mapItem(it, keys);
  } catch (err) {
    console.error('[besoins] Erreur de chargement item :', err);
    return undefined;
  }
}

export async function createBesoin(siteUrl: string, payload: IBesoinPayload): Promise<number | undefined> {
  try {
    const keys = await resolveKeys(siteUrl);
    const currentUser = await getCurrentUser(siteUrl);
    if (!currentUser) {
      console.error('[besoins] Utilisateur courant introuvable');
      return undefined;
    }
    const fields: Record<string, unknown> = {
      Title: payload.titre,
      [keys.prioriteKey]: payload.priorite,
      [keys.dateSouhaiteeKey]: payload.dateSouhaitee ? new Date(payload.dateSouhaitee).toISOString() : null,
      [keys.descriptionKey]: payload.description,
      [keys.statutKey]: 'En attente',
      [keys.activeKey]: true,
      [`${keys.demandeurKey}Id`]: currentUser.id
    };

    if (payload.validateurEmail) {
      const validateur = await ensureUser(siteUrl, payload.validateurEmail);
      if (validateur) fields[`${keys.validateurKey}Id`] = validateur.id;
    }

    const id = await createListItem(siteUrl, LIST_NAME, fields);
    invalidateCache();

    if (id && payload.validateurEmail) {
      const link = `${getAppPageUrl()}#page-workflow-detail-besoin&id=${id}`;
      const subject = `Nouvelle expression de besoin à valider : ${payload.titre}`;
      const body = `<p>Bonjour,</p>
<p><strong>${escapeHtml(currentUser.title)}</strong> a soumis une nouvelle expression de besoin : <strong>${escapeHtml(payload.titre)}</strong>.</p>
<p>Priorité : ${escapeHtml(payload.priorite)}<br/>Date souhaitée : ${formatDateFR(payload.dateSouhaitee)}</p>
<p>Description : ${escapeHtml(payload.description)}</p>
<p><a href="${link}">Consulter et traiter la demande</a></p>`;
      sendEmail(siteUrl, [payload.validateurEmail], subject, body).catch(() => undefined);
    }

    return id;
  } catch (err) {
    console.error('[besoins] Erreur de création :', err);
    return undefined;
  }
}

export async function updateBesoin(siteUrl: string, id: number, payload: IBesoinPayload): Promise<boolean> {
  try {
    const keys = await resolveKeys(siteUrl);
    const fields: Record<string, unknown> = {
      Title: payload.titre,
      [keys.prioriteKey]: payload.priorite,
      [keys.dateSouhaiteeKey]: payload.dateSouhaitee ? new Date(payload.dateSouhaitee).toISOString() : null,
      [keys.descriptionKey]: payload.description
    };

    if (payload.validateurEmail) {
      const validateur = await ensureUser(siteUrl, payload.validateurEmail);
      if (validateur) fields[`${keys.validateurKey}Id`] = validateur.id;
    }

    const ok = await updateListItemFields(siteUrl, LIST_NAME, id, fields);
    if (ok) invalidateCache();
    return ok;
  } catch (err) {
    console.error('[besoins] Erreur de mise à jour :', err);
    return false;
  }
}

export async function deleteBesoin(siteUrl: string, id: number): Promise<boolean> {
  const ok = await deleteListItem(siteUrl, LIST_NAME, id);
  if (ok) invalidateCache();
  return ok;
}

export async function loadBesoinAttachment(siteUrl: string, id: number): Promise<IAttachment | undefined> {
  const files = await getAttachments(siteUrl, LIST_NAME, id);
  return files[0];
}

export async function uploadBesoinAttachment(siteUrl: string, id: number, file: File): Promise<boolean> {
  return addAttachment(siteUrl, LIST_NAME, id, file);
}

export async function removeBesoinAttachment(siteUrl: string, id: number, fileName: string): Promise<boolean> {
  return deleteAttachment(siteUrl, LIST_NAME, id, fileName);
}

export type DecisionAction = 'valider' | 'rejeter';

export async function applyBesoinDecision(siteUrl: string, besoin: IBesoin, action: DecisionAction, comment: string, date: string): Promise<boolean> {
  try {
    const keys = await resolveKeys(siteUrl);
    const fields: Record<string, unknown> = {
      [keys.statutKey]: action === 'valider' ? 'Approuvé' : 'Refusé',
      [keys.commentaireKey]: comment,
      [keys.dateDecisionKey]: date ? new Date(date).toISOString() : new Date().toISOString()
    };
    const ok = await updateListItemFields(siteUrl, LIST_NAME, besoin.id, fields);
    if (ok) {
      invalidateCache();
      if (besoin.demandeurEmail) {
        const approved = action === 'valider';
        const link = `${getAppPageUrl()}#page-workflow-detail-besoin&id=${besoin.id}`;
        const subject = approved ? `Votre expression de besoin a été approuvée` : `Votre expression de besoin a été refusée`;
        const body = `<p>Bonjour ${escapeHtml(besoin.demandeur)},</p>
<p>Votre expression de besoin <strong>${escapeHtml(besoin.titre)}</strong> a été ${approved ? 'approuvée' : 'refusée'}.</p>
${comment ? `<p>Commentaire : ${escapeHtml(comment)}</p>` : ''}
<p><a href="${link}">Voir la demande</a></p>`;
        sendEmail(siteUrl, [besoin.demandeurEmail], subject, body).catch(() => undefined);
      }
    }
    return ok;
  } catch (err) {
    console.error('[besoins] Erreur de décision :', err);
    return false;
  }
}
