import * as React from 'react';
import { FaMagnifyingGlass, FaFolder, FaFilePdf, FaFileWord, FaFileExcel, FaDownload } from 'react-icons/fa6';
import { DOCUMENTS, DOC_FOLDERS } from '../../services/documentation/data';

const fileIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'PDF': return <span className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"><FaFilePdf /></span>;
    case 'DOCX': return <span className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><FaFileWord /></span>;
    case 'XLSX': return <span className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><FaFileExcel /></span>;
    default: return <span className="w-10 h-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0"><FaFileWord /></span>;
  }
};

export const TouteDocumentation: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [folder, setFolder] = React.useState('all');

  const folders = ['all', ...DOC_FOLDERS.map((f) => f.name)];

  const filtered = React.useMemo(
    () =>
      DOCUMENTS.filter((d) => {
        const q = search.toLowerCase();
        const matchesSearch = d.name.toLowerCase().includes(q) || d.folder.toLowerCase().includes(q);
        const matchesFolder = folder === 'all' || d.folder === folder;
        return matchesSearch && matchesFolder;
      }),
    [search, folder]
  );

  return (
    <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8 space-y-4">
        {/* En-tête de page */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-50 rounded-full opacity-70" />
          <div className="relative">
            <nav className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
              <a href="#page-accueil" className="hover:text-ikaBlue transition">Accueil</a>
              <span>/</span>
              <span className="text-ikaBlue">Documentation</span>
            </nav>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-ikaBlueDark">Documentation & Dossiers partagés</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">
              Retrouvez l&apos;ensemble de la documentation et des dossiers partagés d&apos;IKA SOLUTION.
            </p>

            {/* Filtres */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un document..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
                />
                <FaMagnifyingGlass className="absolute left-3 top-3.5 text-slate-400 text-xs" />
              </div>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold focus:outline-none focus:border-ikaBlue bg-white shadow-sm"
              >
                {folders.map((f) => (
                  <option key={f} value={f}>{f === 'all' ? 'Tous les dossiers' : f}</option>
                ))}
              </select>
              <span className="text-[11px] font-semibold text-slate-400">{filtered.length} document(s)</span>
            </div>
          </div>
        </div>

        {/* Dossiers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {DOC_FOLDERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFolder(f.name)}
              className={`p-3 rounded-xl border transition text-center group ${folder === f.name ? 'border-amber-300 bg-amber-50 shadow-sm' : 'border-slate-100 bg-white hover:bg-white hover:border-amber-300 hover:shadow-sm'}`}
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center text-xl font-bold mx-auto mb-1">
                <FaFolder />
              </div>
              <h3 className="text-xs font-black text-slate-900 group-hover:text-ikaBlue transition">{f.name}</h3>
              <p className="text-[10px] text-slate-400">{f.desc}</p>
            </button>
          ))}
        </div>

        {/* Liste des documents */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-semibold">Aucun document ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 hover:shadow-lg transition block">
                <div className="flex items-center gap-3">
                  {fileIcon(d.type)}
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold uppercase text-slate-400">{d.folder}</span>
                    <h3 className="text-xs font-bold text-slate-900 truncate">{d.name}</h3>
                    <p className="text-[10px] text-slate-500">{d.size} · {d.updated}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{d.desc}</span>
                  <a href="#pdf" className="px-2.5 py-1 rounded-lg bg-ikaBlue text-white font-bold text-[10px] hover:bg-blue-600 transition flex items-center gap-1">
                    <FaDownload className="text-[9px]" /> Télécharger
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default TouteDocumentation;