import * as React from 'react';
import { FaUserCheck, FaSpinner, FaXmark } from 'react-icons/fa6';
import { searchUsers, ISearchUser } from '../services/shared/index';

export interface IUserPickerProps {
  siteUrl?: string;
  value: string;
  onChange: (email: string) => void;
  placeholder?: string;
  className?: string;
}

export const UserPicker: React.FC<IUserPickerProps> = (props) => {
  const { siteUrl, value, onChange, placeholder, className } = props;
  const [query, setQuery] = React.useState<string>(value || '');
  const [results, setResults] = React.useState<ISearchUser[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const debounceRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => { setQuery(value || ''); }, [value]);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent): void {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleInputChange = (text: string): void => {
    setQuery(text);
    onChange(text);
    setOpen(true);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    const trimmed = text.trim();
    if (!siteUrl || trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = window.setTimeout(() => {
      searchUsers(siteUrl, trimmed)
        .then((users) => { setResults(users); setLoading(false); })
        .catch(() => { setResults([]); setLoading(false); });
    }, 300);
  };

  const handleSelect = (user: ISearchUser): void => {
    setQuery(user.email);
    onChange(user.email);
    setResults([]);
    setOpen(false);
  };

  const handleClear = (): void => {
    setQuery('');
    onChange('');
    setResults([]);
  };

  const inputCls = className || 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm';

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder || 'Rechercher un collaborateur...'}
          className={`${inputCls} pr-8`}
          autoComplete="off"
        />
        {query ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Effacer"
          >
            <FaXmark className="text-xs" />
          </button>
        ) : null}
      </div>
      {open && (loading || results.length > 0) ? (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-xl border border-slate-200 shadow-lg max-h-56 overflow-y-auto">
          {loading ? (
            <div className="px-3.5 py-2.5 text-xs text-slate-400 flex items-center gap-2">
              <FaSpinner className="animate-spin" /> Recherche...
            </div>
          ) : (
            results.map((u) => (
              <button
                type="button"
                key={u.loginName || u.email}
                onClick={() => handleSelect(u)}
                className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 border-b border-slate-50 last:border-0"
              >
                <span className="w-7 h-7 rounded-full bg-ikaBlue/10 text-ikaBlue flex items-center justify-center shrink-0">
                  <FaUserCheck className="text-[10px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-slate-700 truncate">{u.displayName}</span>
                  <span className="block text-[11px] text-slate-400 truncate">{u.email}</span>
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserPicker;
