import * as React from 'react';
import {
  FaMagnifyingGlass,
  FaPlus,
  FaPen,
  FaCalendarDays,
  FaUser,
  FaCircleCheck,
  FaCircleXmark,
  FaHourglassHalf,
  FaEye,
  FaTrashCan
} from 'react-icons/fa6';
import { VacanceStatus, IVacance, loadVacances, deleteVacance, formatDateFR } from '../../../services/workflow/vacances/index';
import { Pagination } from '../../../components/Pagination';
import { ConfirmDelete } from '../../../components/ConfirmDelete';

export interface IListeVacancesProps {
  siteUrl?: string;
}

const statusBadge = (status: VacanceStatus): React.ReactElement => {
  switch (status) {
    case 'Approuvé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1"><FaCircleCheck /> Approuvé</span>;
    case 'Refusé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 flex items-center gap-1"><FaCircleXmark /> Refusé</span>;
    case 'Annulé': return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 flex items-center gap-1"><FaCircleXmark /> Annulé</span>;
    default: return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1"><FaHourglassHalf /> En attente</span>;
  }
};

export const ListeVacances: React.FC<IListeVacancesProps> = (props) => {
  const { siteUrl } = props;
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<IVacance[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  const [deleteItem, setDeleteItem] = React.useState<IVacance | null>(null);
  const [deleting, setDeleting] = React.useState<boolean>(false);

  const fetchItems = React.useCallback((force?: boolean): void => {
    if (!siteUrl) { setLoading(false); return; }
    setLoading(true);
    loadVacances(siteUrl, force)
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => { setError('Impossible de charger les demandes de vacances.'); setLoading(false); });
  }, [siteUrl]);

  React.useEffect(() => { fetchItems(); }, [fetchItems]);

  const statuses = ['all'].concat(Array.from(new Set(items.map((i) => i.statut))));

  const filtered = items.filter((i) => {
    const q = search.toLowerCase();
    const matchesSearch = i.titre.toLowerCase().indexOf(q) !== -1 || i.demandeur.toLowerCase().indexOf(q) !== -1 || i.destination.toLowerCase().indexOf(q) !== -1;
    const matchesStatus = status === 'all' || i.statut === status;
    return matchesSearch && matchesStatus;
  });

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleConfirmDelete = (): void => {
    if (!siteUrl || !deleteItem) return;
    setDeleting(true);
    deleteVacance(siteUrl, deleteItem.id)
      .then((ok) => {
        setDeleting(false);
        if (ok) {
          setItems((prev) => prev.filter((x) => x.id !== deleteItem.id));
          setDeleteItem(null);
          setPage(1);
        } else {
          setError('La suppression a échoué. Réessayez.');
          setDeleteItem(null);
        }
      })
      .catch(() => { setDeleting(false); setDeleteItem(null); setError('La suppression a échoué. Réessayez.'); });
  };

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-ikaSoft rounded-full opacity-70" />
          <div className="relative">
            <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
              <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
              <span>/</span>
              <span className="text-ikaBlue">Vacances</span>
            </nav>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-ikaBlueDark">Vacances</h1>
                <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                  Consultez, ajoutez ou modifiez les demandes de vacances.
                </p>
              </div>
              <a
                href="#page-workflow-ajouter-vacances"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition shrink-0"
              >
                <FaPlus /> Nouvelle demande de vacances
              </a>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Rechercher..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
                />
                <FaMagnifyingGlass className="absolute left-3 top-3.5 text-slate-400 text-xs" />
              </div>
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s === 'all' ? 'Tous les statuts' : s}</option>
                ))}
              </select>
              <span className="text-[11px] font-semibold text-slate-400">{filtered.length} demande(s)</span>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">{error}</div>
        ) : null}

        {loading ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Chargement des demandes...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucune demande ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">Demande</th>
                    <th className="py-3 px-4">Demandeur</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Période</th>
                    <th className="py-3 px-4">Jours</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {paginated.map((i) => (
                    <tr key={i.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-black text-slate-900">{i.titre}</td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1.5 text-slate-500"><FaUser className="text-[10px]" /> {i.demandeur || '—'}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{i.destination}</td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1.5 text-slate-500"><FaCalendarDays className="text-[10px]" /> {formatDateFR(i.dateDebut)} → {formatDateFR(i.dateFin)}</span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">{i.jours} j</td>
                      <td className="py-3 px-4">{statusBadge(i.statut)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`#page-workflow-detail-vacances&id=${i.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-ikaBlue font-bold text-[10px] hover:bg-blue-100 transition"
                          >
                            <FaEye className="text-[9px]" /> Détail
                          </a>
                          <a
                            href={`#page-workflow-modifier-vacances&id=${i.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-ikaBlue font-bold text-[10px] hover:bg-ikaSoft transition"
                          >
                            <FaPen className="text-[9px]" /> Modifier
                          </a>
                          <button
                            onClick={() => setDeleteItem(i)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 font-bold text-[10px] hover:bg-rose-100 transition"
                          >
                            <FaTrashCan className="text-[9px]" /> Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4">
              <Pagination total={filtered.length} page={safePage} pageSize={pageSize} labelSingular="demande" labelPlural="demandes" onPageChange={setPage} />
            </div>
          </div>
        )}
      </div>

      {deleteItem ? (
        <ConfirmDelete
          title="Supprimer la demande"
          message={`Voulez-vous vraiment supprimer la demande de vacances « ${deleteItem.titre} » de ${deleteItem.demandeur} ? Cette action est irréversible.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => !deleting && setDeleteItem(null)}
        />
      ) : null}
    </main>
  );
};

export default ListeVacances;
