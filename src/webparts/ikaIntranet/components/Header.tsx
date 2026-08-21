import * as React from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import logoUrl from '../assets/imges/logo.png';

export interface IMenuItem {
  Title: string;
  MenuUrl: string;
  children?: IMenuItem[];
}

export interface IHeaderProps {
  menuItems?: IMenuItem[];
  logoUrl?: string;
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const items = props.menuItems || [];
  const logoSrc = props.logoUrl || logoUrl;

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-md backdrop-blur">
      {/* Main Navigation Bar */}
      <nav className="mx-auto flex h-20 max-w-[1650px] items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <a href="#page-accueil" className="flex items-center gap-3 justify-self-start" aria-label="IKA SOLUTION Intranet">
          <img className="h-14 w-auto object-contain" src={logoSrc} alt="IKA SOLUTION" />
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden items-center gap-3 xl:gap-4 text-sm font-bold text-slate-700 justify-self-center lg:flex">
          {items.map((item) => {
            if (item.children && item.children.length > 0) {
              return (
                <div key={item.Title} className="relative group">
                  <a
                    href={item.MenuUrl}
                    className="flex items-center gap-1.5 transition hover:text-ikaBlue px-3 py-1.5 rounded-lg hover:bg-slate-100/80 focus:outline-none"
                  >
                    <span>{item.Title}</span>
                    <FaChevronDown className="text-[10px] text-slate-400 transition-transform duration-200 group-hover:rotate-180" />
                  </a>
                  <div className="absolute left-0 top-full hidden w-56 rounded-xl border border-slate-200 bg-white p-2 pt-3 shadow-premium group-hover:block transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <a
                        key={child.Title}
                        href={child.MenuUrl}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-ikaSoft hover:text-ikaBlue transition"
                      >
                        <span>{child.Title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <a
                key={item.Title}
                href={item.MenuUrl}
                className="transition hover:text-ikaBlue px-3 py-1.5 rounded-lg hover:bg-slate-100/80"
              >
                {item.Title}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="menuButton"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-ikaBlue justify-self-end lg:hidden"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div id="mobileMenu" className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-[1600px] gap-2 text-sm font-semibold text-slate-700">
            {items.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <div key={item.Title} className="rounded-xl bg-slate-50 p-2 space-y-1">
                    <div className="px-2 py-1 text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      {item.Title}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                      {item.children.map((child) => (
                        <a
                          key={child.Title}
                          href={child.MenuUrl}
                          className="rounded-lg px-2.5 py-1.5 hover:bg-white text-xs font-medium text-slate-700 flex items-center gap-2"
                        >
                          {child.Title}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <a key={item.Title} className="rounded-xl px-3 py-2.5 hover:bg-ikaSoft" href={item.MenuUrl}>
                  {item.Title}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
