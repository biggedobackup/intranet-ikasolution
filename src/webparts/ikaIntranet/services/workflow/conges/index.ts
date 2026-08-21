import { getFieldMap, getVal, getCurrentUser, getCurrentUserEmail, isSiteAdmin, ensureUser, createListItem, updateListItemFields, deleteListItem, sendEmail, escapeHtml, getAppPageUrl, getAttachments, addAttachment, deleteAttachment, IAttachment } from '../../shared/index';

export type CongeStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type TypeConge = 'Congé annuel' | 'Congé exceptionnel' | 'Congé de maladie' | 'Congé de maternité' | 'Congé de paternité';

export const CONGE_TYPES: TypeConge[] = ['Congé annuel', 'Congé exceptionnel', 'Congé de maladie', 'Congé de maternité', 'Congé de paternité'];
export const CONGE_STATUTS: CongeStatus[] = ['En attente', 'Approuvé', 'Refusé', 'Annulé'];

export interface IConge {
  id: number;
  titre: string;
  demandeurId?: number;
  demandeur: string;
  demandeurEmail: string;
  type: TypeConge;
  dateDebut: string;
  dateFin: string;
  jours: number;
  motif: string;
  validateurId?: number;
  validateur: string;
  validateurEmail: string;
  statut: CongeStatus;
  commentaireDecision: string;
  dateDecision: string;
  createdAt: string;
  active: boolean;
}

export interface ICongePayload {
  titre: string;
  type: TypeConge;
  dateDebut: string;
  dateFin: string;
  jours: number;
  motif: string;
  validateurEmail: string;
}

const LIST_NAME = 'Demandes Congé';
const CACHE_TTL = 60 * 1000;

let cache: { data: IConge[]; ts: number } | null = null;

function invalidateCache(): void {
  cache = null;
}

function readCache(): IConge[] | undefined {
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
  typeKey: string;
  dateDebutKey: string;
  dateFinKey: string;
  joursKey: string;
  motifKey: string;
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
    typeKey: fieldMap['type congé'] || 'TypeConge',
    dateDebutKey: fieldMap['date début'] || 'DateDebut',
    dateFinKey: fieldMap['date fin'] || 'DateFin',
    joursKey: fieldMap['jours'] || 'Jours',
    motifKey: fieldMap['motif'] || 'Motif',
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

function mapItem(it: Record<string, unknown>, keys: IKeys): IConge {
  const demandeurRaw = it[keys.demandeurKey];
  const validateurRaw = it[keys.validateurKey];
  return {
    id: Number(getVal(it, keys.fieldMap, 'Id', ['Id']) || 0),
    titre: asString(getVal(it, keys.fieldMap, 'Titre', ['Title'])),
    demandeurId: personId(it, keys.demandeurKey),
    demandeur: personName(demandeurRaw),
    demandeurEmail: personEmail(demandeurRaw),
    type: asString(getVal(it, keys.fieldMap, 'Type Congé', ['TypeConge'])) as TypeConge,
    dateDebut: toIsoDate(getVal(it, keys.fieldMap, 'Date Début', ['DateDebut'])),
    dateFin: toIsoDate(getVal(it, keys.fieldMap, 'Date Fin', ['DateFin'])),
    jours: Number(getVal(it, keys.fieldMap, 'Jours', ['Jours']) || 0),
    motif: asString(getVal(it, keys.fieldMap, 'Motif', ['Motif'])),
    validateurId: personId(it, keys.validateurKey),
    validateur: personName(validateurRaw),
    validateurEmail: personEmail(validateurRaw),
    statut: (asString(getVal(it, keys.fieldMap, 'Statut', ['Statut'])) || 'En attente') as CongeStatus,
    commentaireDecision: asString(getVal(it, keys.fieldMap, 'Commentaire Décision', ['CommentaireDecision'])),
    dateDecision: toIsoDate(getVal(it, keys.fieldMap, 'Date Décision', ['DateDecision'])),
    createdAt: toIsoDate(getVal(it, keys.fieldMap, 'Créé', ['Created'])),
    active: isActive(getVal(it, keys.fieldMap, 'Active', ['Active']))
  };
}

async function fetchAllConges(siteUrl: string, force?: boolean): Promise<IConge[]> {
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
    const conges = items
      .map((it) => mapItem(it, keys))
      .filter((c) => c.active && c.titre !== '');
    cache = { data: conges, ts: Date.now() };
    return conges;
  } catch (err) {
    console.error('[conges] Erreur de chargement :', err);
    return [];
  }
}

function canSee(item: IConge, email: string): boolean {
  const e = email.toLowerCase();
  return item.demandeurEmail.toLowerCase() === e || item.validateurEmail.toLowerCase() === e;
}

/**
 * Liste des demandes de congé visibles par l'utilisateur courant : les
 * siennes en tant que demandeur, celles qu'il doit valider, ou tout si
 * administrateur du site. Ce filtrage empêche un utilisateur standard de
 * voir les motifs de congé (données RH sensibles) de collègues qui ne le
 * concernent pas.
 */
export async function loadConges(siteUrl: string, force?: boolean): Promise<IConge[]> {
  const [all, currentEmail, admin] = await Promise.all([
    fetchAllConges(siteUrl, force),
    getCurrentUserEmail(siteUrl),
    isSiteAdmin(siteUrl)
  ]);
  if (admin) return all;
  if (!currentEmail) return [];
  return all.filter((c) => canSee(c, currentEmail));
}

async function fetchCongeRaw(siteUrl: string, id: number): Promise<IConge | undefined> {
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
    console.error('[conges] Erreur de chargement item :', err);
    return undefined;
  }
}

/**
 * Chargement d'une demande pour affichage : renvoie undefined si
 * l'utilisateur courant n'est ni le demandeur, ni le validateur désigné, ni
 * administrateur du site — empêche la consultation d'une demande d'un tiers
 * en changeant simplement l'id dans l'URL.
 */
export async function loadConge(siteUrl: string, id: number): Promise<IConge | undefined> {
  const [item, currentEmail, admin] = await Promise.all([
    fetchCongeRaw(siteUrl, id),
    getCurrentUserEmail(siteUrl),
    isSiteAdmin(siteUrl)
  ]);
  if (!item) return undefined;
  if (admin || (currentEmail && canSee(item, currentEmail))) return item;
  return undefined;
}

export async function createConge(siteUrl: string, payload: ICongePayload): Promise<number | undefined> {
  try {
    const keys = await resolveKeys(siteUrl);
    const currentUser = await getCurrentUser(siteUrl);
    if (!currentUser) {
      console.error('[conges] Utilisateur courant introuvable');
      return undefined;
    }
    if (payload.validateurEmail && currentUser.email && payload.validateurEmail.toLowerCase() === currentUser.email.toLowerCase()) {
      console.error('[conges] Création refusée : le validateur ne peut pas être le demandeur');
      return undefined;
    }
    const fields: Record<string, unknown> = {
      Title: payload.titre,
      [keys.typeKey]: payload.type,
      [keys.dateDebutKey]: payload.dateDebut ? new Date(payload.dateDebut).toISOString() : null,
      [keys.dateFinKey]: payload.dateFin ? new Date(payload.dateFin).toISOString() : null,
      [keys.joursKey]: payload.jours,
      [keys.motifKey]: payload.motif,
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
      const link = `${getAppPageUrl()}#page-workflow-detail-conge&id=${id}`;
      const subject = `Nouvelle demande de congé à valider : ${payload.titre}`;
      const body = `<p>Bonjour,</p>
<p><strong>${escapeHtml(currentUser.title)}</strong> a soumis une nouvelle demande de congé : <strong>${escapeHtml(payload.titre)}</strong>.</p>
<p>Type : ${escapeHtml(payload.type)}<br/>Période : du ${formatDateFR(payload.dateDebut)} au ${formatDateFR(payload.dateFin)} (${payload.jours} jour(s))</p>
<p>Motif : ${escapeHtml(payload.motif)}</p>
<p><a href="${link}">Consulter et traiter la demande</a></p>`;
      sendEmail(siteUrl, [payload.validateurEmail], subject, body).catch(() => undefined);
    }

    return id;
  } catch (err) {
    console.error('[conges] Erreur de création :', err);
    return undefined;
  }
}

export async function updateConge(siteUrl: string, id: number, payload: ICongePayload): Promise<boolean> {
  try {
    const [currentEmail, fresh, admin] = await Promise.all([
      getCurrentUserEmail(siteUrl),
      fetchCongeRaw(siteUrl, id),
      isSiteAdmin(siteUrl)
    ]);
    if (!fresh || (!admin && fresh.statut !== 'En attente')) {
      console.error('[conges] Modification refusée : demande introuvable ou déjà traitée', id);
      return false;
    }
    if (!admin && (!currentEmail || currentEmail.toLowerCase() !== fresh.demandeurEmail.toLowerCase())) {
      console.error('[conges] Modification refusée : utilisateur non autorisé', id);
      return false;
    }
    if (payload.validateurEmail && fresh.demandeurEmail && payload.validateurEmail.toLowerCase() === fresh.demandeurEmail.toLowerCase()) {
      console.error('[conges] Modification refusée : le validateur ne peut pas être le demandeur', id);
      return false;
    }
    const keys = await resolveKeys(siteUrl);
    const fields: Record<string, unknown> = {
      Title: payload.titre,
      [keys.typeKey]: payload.type,
      [keys.dateDebutKey]: payload.dateDebut ? new Date(payload.dateDebut).toISOString() : null,
      [keys.dateFinKey]: payload.dateFin ? new Date(payload.dateFin).toISOString() : null,
      [keys.joursKey]: payload.jours,
      [keys.motifKey]: payload.motif
    };

    if (payload.validateurEmail) {
      const validateur = await ensureUser(siteUrl, payload.validateurEmail);
      if (validateur) fields[`${keys.validateurKey}Id`] = validateur.id;
    }

    const ok = await updateListItemFields(siteUrl, LIST_NAME, id, fields);
    if (ok) invalidateCache();
    return ok;
  } catch (err) {
    console.error('[conges] Erreur de mise à jour :', err);
    return false;
  }
}

export async function deleteConge(siteUrl: string, id: number): Promise<boolean> {
  const [currentEmail, fresh, admin] = await Promise.all([
    getCurrentUserEmail(siteUrl),
    fetchCongeRaw(siteUrl, id),
    isSiteAdmin(siteUrl)
  ]);
  if (!fresh) return false;
  if (!admin && (!currentEmail || currentEmail.toLowerCase() !== fresh.demandeurEmail.toLowerCase())) {
    console.error('[conges] Suppression refusée : utilisateur non autorisé', id);
    return false;
  }
  if (!admin && fresh.statut !== 'En attente') {
    console.error('[conges] Suppression refusée : demande déjà traitée', id);
    return false;
  }
  const ok = await deleteListItem(siteUrl, LIST_NAME, id);
  if (ok) invalidateCache();
  return ok;
}

export async function loadCongeAttachment(siteUrl: string, id: number): Promise<IAttachment | undefined> {
  const files = await getAttachments(siteUrl, LIST_NAME, id);
  return files[0];
}

export async function uploadCongeAttachment(siteUrl: string, id: number, file: File): Promise<boolean> {
  return addAttachment(siteUrl, LIST_NAME, id, file);
}

export async function removeCongeAttachment(siteUrl: string, id: number, fileName: string): Promise<boolean> {
  return deleteAttachment(siteUrl, LIST_NAME, id, fileName);
}

export type DecisionAction = 'valider' | 'rejeter';

export async function applyCongeDecision(siteUrl: string, conge: IConge, action: DecisionAction, comment: string, date: string): Promise<boolean> {
  try {
    const [currentEmail, fresh, admin] = await Promise.all([
      getCurrentUserEmail(siteUrl),
      fetchCongeRaw(siteUrl, conge.id),
      isSiteAdmin(siteUrl)
    ]);
    if (!fresh || (!admin && fresh.statut !== 'En attente')) {
      console.error('[conges] Décision refusée : demande introuvable ou déjà traitée', conge.id);
      return false;
    }
    if (!admin && (!currentEmail || currentEmail.toLowerCase() !== fresh.validateurEmail.toLowerCase())) {
      console.error('[conges] Décision refusée : utilisateur non autorisé', conge.id);
      return false;
    }
    const keys = await resolveKeys(siteUrl);
    const fields: Record<string, unknown> = {
      [keys.statutKey]: action === 'valider' ? 'Approuvé' : 'Refusé',
      [keys.commentaireKey]: comment,
      [keys.dateDecisionKey]: date ? new Date(date).toISOString() : new Date().toISOString()
    };
    const ok = await updateListItemFields(siteUrl, LIST_NAME, fresh.id, fields);
    if (ok) {
      invalidateCache();
      if (fresh.demandeurEmail) {
        const approved = action === 'valider';
        const link = `${getAppPageUrl()}#page-workflow-detail-conge&id=${fresh.id}`;
        const subject = approved ? `Votre demande de congé a été approuvée` : `Votre demande de congé a été refusée`;
        const body = `<p>Bonjour ${escapeHtml(fresh.demandeur)},</p>
<p>Votre demande de congé <strong>${escapeHtml(fresh.titre)}</strong> a été ${approved ? 'approuvée' : 'refusée'}.</p>
${comment ? `<p>Commentaire : ${escapeHtml(comment)}</p>` : ''}
<p><a href="${link}">Voir la demande</a></p>`;
        sendEmail(siteUrl, [fresh.demandeurEmail], subject, body).catch(() => undefined);
      }
    }
    return ok;
  } catch (err) {
    console.error('[conges] Erreur de décision :', err);
    return false;
  }
}
