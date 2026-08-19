import { getFieldMap, getVal, getCurrentUser, ensureUser, createListItem, updateListItemFields, deleteListItem, sendEmail, escapeHtml, getAppPageUrl, getAttachments, addAttachment, deleteAttachment, IAttachment } from '../../shared/index';

export type AbsenceStatus = 'En attente' | 'Approuvé' | 'Refusé' | 'Annulé';
export type TypeAbsence = 'Maladie' | 'Autorisée' | 'Imprévue' | 'Rendez-vous';

export const ABSENCE_TYPES: TypeAbsence[] = ['Maladie', 'Autorisée', 'Imprévue', 'Rendez-vous'];
export const ABSENCE_STATUTS: AbsenceStatus[] = ['En attente', 'Approuvé', 'Refusé', 'Annulé'];

export interface IAbsence {
  id: number;
  titre: string;
  demandeurId?: number;
  demandeur: string;
  demandeurEmail: string;
  type: TypeAbsence;
  dateDebut: string;
  dateFin: string;
  jours: number;
  motif: string;
  validateurId?: number;
  validateur: string;
  validateurEmail: string;
  statut: AbsenceStatus;
  commentaireDecision: string;
  dateDecision: string;
  createdAt: string;
  active: boolean;
}

export interface IAbsencePayload {
  titre: string;
  type: TypeAbsence;
  dateDebut: string;
  dateFin: string;
  jours: number;
  motif: string;
  validateurEmail: string;
}

const LIST_NAME = 'Signalements Absence';
const CACHE_TTL = 60 * 1000;

let cache: { data: IAbsence[]; ts: number } | null = null;

function invalidateCache(): void {
  cache = null;
}

function readCache(): IAbsence[] | undefined {
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
    typeKey: fieldMap['type absence'] || 'TypeAbsence',
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

function mapItem(it: Record<string, unknown>, keys: IKeys): IAbsence {
  const demandeurRaw = it[keys.demandeurKey];
  const validateurRaw = it[keys.validateurKey];
  return {
    id: Number(getVal(it, keys.fieldMap, 'Id', ['Id']) || 0),
    titre: asString(getVal(it, keys.fieldMap, 'Titre', ['Title'])),
    demandeurId: personId(it, keys.demandeurKey),
    demandeur: personName(demandeurRaw),
    demandeurEmail: personEmail(demandeurRaw),
    type: asString(getVal(it, keys.fieldMap, 'Type Absence', ['TypeAbsence'])) as TypeAbsence,
    dateDebut: toIsoDate(getVal(it, keys.fieldMap, 'Date Début', ['DateDebut'])),
    dateFin: toIsoDate(getVal(it, keys.fieldMap, 'Date Fin', ['DateFin'])),
    jours: Number(getVal(it, keys.fieldMap, 'Jours', ['Jours']) || 0),
    motif: asString(getVal(it, keys.fieldMap, 'Motif', ['Motif'])),
    validateurId: personId(it, keys.validateurKey),
    validateur: personName(validateurRaw),
    validateurEmail: personEmail(validateurRaw),
    statut: (asString(getVal(it, keys.fieldMap, 'Statut', ['Statut'])) || 'En attente') as AbsenceStatus,
    commentaireDecision: asString(getVal(it, keys.fieldMap, 'Commentaire Décision', ['CommentaireDecision'])),
    dateDecision: toIsoDate(getVal(it, keys.fieldMap, 'Date Décision', ['DateDecision'])),
    createdAt: toIsoDate(getVal(it, keys.fieldMap, 'Créé', ['Created'])),
    active: isActive(getVal(it, keys.fieldMap, 'Active', ['Active']))
  };
}

export async function loadAbsences(siteUrl: string, force?: boolean): Promise<IAbsence[]> {
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
    const absences = items
      .map((it) => mapItem(it, keys))
      .filter((a) => a.active && a.titre !== '');
    cache = { data: absences, ts: Date.now() };
    return absences;
  } catch (err) {
    console.error('[absences] Erreur de chargement :', err);
    return [];
  }
}

export async function loadAbsence(siteUrl: string, id: number): Promise<IAbsence | undefined> {
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
    console.error('[absences] Erreur de chargement item :', err);
    return undefined;
  }
}

export async function createAbsence(siteUrl: string, payload: IAbsencePayload): Promise<number | undefined> {
  try {
    const keys = await resolveKeys(siteUrl);
    const currentUser = await getCurrentUser(siteUrl);
    if (!currentUser) {
      console.error('[absences] Utilisateur courant introuvable');
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
      const link = `${getAppPageUrl()}#page-workflow-detail-absence&id=${id}`;
      const subject = `Nouveau signalement d'absence à valider : ${payload.titre}`;
      const body = `<p>Bonjour,</p>
<p><strong>${escapeHtml(currentUser.title)}</strong> a soumis un nouveau signalement d'absence : <strong>${escapeHtml(payload.titre)}</strong>.</p>
<p>Type : ${escapeHtml(payload.type)}<br/>Période : du ${formatDateFR(payload.dateDebut)} au ${formatDateFR(payload.dateFin)} (${payload.jours} jour(s))</p>
<p>Motif : ${escapeHtml(payload.motif)}</p>
<p><a href="${link}">Consulter et traiter le signalement</a></p>`;
      sendEmail(siteUrl, [payload.validateurEmail], subject, body).catch(() => undefined);
    }

    return id;
  } catch (err) {
    console.error('[absences] Erreur de création :', err);
    return undefined;
  }
}

export async function updateAbsence(siteUrl: string, id: number, payload: IAbsencePayload): Promise<boolean> {
  try {
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
    console.error('[absences] Erreur de mise à jour :', err);
    return false;
  }
}

export async function deleteAbsence(siteUrl: string, id: number): Promise<boolean> {
  const ok = await deleteListItem(siteUrl, LIST_NAME, id);
  if (ok) invalidateCache();
  return ok;
}

export async function loadAbsenceAttachment(siteUrl: string, id: number): Promise<IAttachment | undefined> {
  const files = await getAttachments(siteUrl, LIST_NAME, id);
  return files[0];
}

export async function uploadAbsenceAttachment(siteUrl: string, id: number, file: File): Promise<boolean> {
  return addAttachment(siteUrl, LIST_NAME, id, file);
}

export async function removeAbsenceAttachment(siteUrl: string, id: number, fileName: string): Promise<boolean> {
  return deleteAttachment(siteUrl, LIST_NAME, id, fileName);
}

export type DecisionAction = 'valider' | 'rejeter';

export async function applyAbsenceDecision(siteUrl: string, absence: IAbsence, action: DecisionAction, comment: string, date: string): Promise<boolean> {
  try {
    const keys = await resolveKeys(siteUrl);
    const fields: Record<string, unknown> = {
      [keys.statutKey]: action === 'valider' ? 'Approuvé' : 'Refusé',
      [keys.commentaireKey]: comment,
      [keys.dateDecisionKey]: date ? new Date(date).toISOString() : new Date().toISOString()
    };
    const ok = await updateListItemFields(siteUrl, LIST_NAME, absence.id, fields);
    if (ok) {
      invalidateCache();
      if (absence.demandeurEmail) {
        const approved = action === 'valider';
        const link = `${getAppPageUrl()}#page-workflow-detail-absence&id=${absence.id}`;
        const subject = approved ? `Votre signalement d'absence a été approuvé` : `Votre signalement d'absence a été refusé`;
        const body = `<p>Bonjour ${escapeHtml(absence.demandeur)},</p>
<p>Votre signalement d'absence <strong>${escapeHtml(absence.titre)}</strong> a été ${approved ? 'approuvé' : 'refusé'}.</p>
${comment ? `<p>Commentaire : ${escapeHtml(comment)}</p>` : ''}
<p><a href="${link}">Voir le signalement</a></p>`;
        sendEmail(siteUrl, [absence.demandeurEmail], subject, body).catch(() => undefined);
      }
    }
    return ok;
  } catch (err) {
    console.error('[absences] Erreur de décision :', err);
    return false;
  }
}
