import * as React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa6';
import logoUrl from '../assets/imges/logo.png';

export interface IFooterLink {
  Title: string;
  URL: string;
}

export interface IFooterColumn {
  Category: string;
  links: IFooterLink[];
}

export interface IFooterProps {
  columns?: IFooterColumn[];
  siteName?: string;
  logoUrl?: string;
}

export const Footer: React.FC<IFooterProps> = (props) => {
  const columns = props.columns || [];
  const year = new Date().getFullYear();
  const logoSrc = props.logoUrl || logoUrl;

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white mt-auto">
      <div className="mx-auto grid max-w-[1650px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img className="h-14 w-auto bg-white p-1 rounded-xl shadow-md object-contain" src={logoSrc} alt="IKA SOLUTION" loading="lazy" />
            <div>
              <h4 className="font-black text-white text-base">IKA INTRANET</h4>
              <p className="text-xs text-slate-400">Plateforme Interne</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Espace réservé aux collaborateurs d&apos;IKA SOLUTION. Centralisation de la documentation, de l&apos;agenda,
            des bilans et du suivi de projets.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.Category}>
            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-white">{col.Category}</h3>
            <div className="mt-4 grid gap-2 text-xs font-semibold text-slate-300">
              {col.links.map((link) => {
                const isTel = link.URL.toLowerCase().startsWith('tel:');
                const isMail = link.URL.toLowerCase().startsWith('mailto:');
                const hasUrl = !!link.URL && link.URL !== '#';
                const cls = 'hover:text-ikaBlue transition flex items-center gap-2';
                const icon = isTel ? (
                  <span className="w-4 h-4 text-emerald-400 flex items-center justify-center"><FaPhone /></span>
                ) : isMail ? (
                  <span className="w-4 h-4 text-ikaBlue flex items-center justify-center"><FaEnvelope /></span>
                ) : null;
                return hasUrl ? (
                  <a key={link.Title} className={cls} href={link.URL}>
                    {icon}
                    {link.Title}
                  </a>
                ) : (
                  <p key={link.Title} className="text-slate-400 flex items-center gap-2">
                    {icon}
                    {link.Title}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 border-t border-slate-800">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {year} IKA SOLUTION LTD. Intranet d&apos;entreprise confidentiel.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
