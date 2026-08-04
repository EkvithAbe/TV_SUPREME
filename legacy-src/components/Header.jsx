import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown, Tv } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import logo from '../assets/logo.jpeg';

const NAV_ITEMS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Programs', href: '/programs' },
  {
    label: 'Services',
    children: [
      { label: 'Production',      href: '/production' },
      { label: 'Digital Academy', href: '/academy' },
      { label: 'CSR & Community', href: '/csr' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'Investors', href: '/investors' },
      { label: 'Careers',   href: '/careers' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const { dark, setDark }   = useTheme();
  const { lang, setLang }   = useLanguage();
  const location            = useLocation();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu]     = useState(null);
  const [langOpen, setLangOpen]     = useState(false);
  const closeTimer  = useRef(null);
  const langTimer   = useRef(null);
  const isPreview   = sessionStorage.getItem('adminPreview') === '1';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [location.pathname]);

  const isActive = href =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const isParentActive = children => children.some(c => isActive(c.href));

  const openDropdown  = label => { clearTimeout(closeTimer.current); setOpenMenu(label); };
  const scheduleClose = ()    => { closeTimer.current = setTimeout(() => setOpenMenu(null), 180); };

  return (
    <div
      className={`sticky z-50 bg-white dark:bg-supreme-deep border-b border-slate-100 dark:border-supreme-primary/20 transition-shadow duration-300 ${scrolled ? 'shadow-nav' : ''}`}
      style={{ top: isPreview ? 36 : 0 }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[68px] gap-6">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="TV Supreme" className="h-10 w-auto object-contain" style={{ maxWidth: 140 }} />
            <div className="hidden xl:flex flex-col leading-tight">
              <span className="font-heading font-800 text-sm text-supreme-dark dark:text-white tracking-wide">TV Supreme</span>
              <span className="font-body text-[9px] text-supreme-mid tracking-[0.18em] uppercase">ඔබ සතුටින්</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-stretch h-[68px] flex-1 px-2">
            <ul className="flex items-stretch gap-0">
              {NAV_ITEMS.map(item => (
                <li
                  key={item.label}
                  className="relative flex items-stretch"
                  onMouseEnter={() => item.children && openDropdown(item.label)}
                  onMouseLeave={() => item.children && scheduleClose()}
                >
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 text-[13px] font-heading font-700 border-b-2 transition-colors whitespace-nowrap ${
                        isActive(item.href)
                          ? 'text-supreme-vivid dark:text-supreme-bright border-supreme-vivid'
                          : 'text-supreme-dark/65 dark:text-supreme-light/65 border-transparent hover:text-supreme-vivid dark:hover:text-supreme-bright hover:border-supreme-vivid/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 px-4 text-[13px] font-heading font-700 border-b-2 transition-colors whitespace-nowrap ${
                        openMenu === item.label || isParentActive(item.children)
                          ? 'text-supreme-vivid dark:text-supreme-bright border-supreme-vivid'
                          : 'text-supreme-dark/65 dark:text-supreme-light/65 border-transparent hover:text-supreme-vivid dark:hover:text-supreme-bright hover:border-supreme-vivid/30'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${openMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}

                  {item.children && openMenu === item.label && (
                    <div
                      className="absolute top-full left-0 z-50 min-w-[190px] bg-white dark:bg-supreme-deep border border-slate-200 dark:border-supreme-primary/30 rounded-xl shadow-xl overflow-hidden py-1.5"
                      onMouseEnter={() => clearTimeout(closeTimer.current)}
                      onMouseLeave={scheduleClose}
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`flex items-center px-4 py-2.5 text-[13px] transition-colors ${
                            isActive(child.href)
                              ? 'bg-supreme-vivid/10 text-supreme-vivid font-heading font-700'
                              : 'font-body text-supreme-dark/75 dark:text-supreme-light/75 hover:bg-supreme-vivid/8 hover:text-supreme-vivid'
                          }`}
                        >
                          {isActive(child.href) && (
                            <span className="w-1 h-1 rounded-full bg-supreme-vivid mr-2 flex-shrink-0" />
                          )}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Language */}
            <div
              className="hidden sm:flex relative items-center"
              onMouseEnter={() => { clearTimeout(langTimer.current); setLangOpen(true); }}
              onMouseLeave={() => { langTimer.current = setTimeout(() => setLangOpen(false), 180); }}
            >
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-heading font-700 bg-slate-100 dark:bg-supreme-primary/20 text-supreme-dark dark:text-supreme-light hover:bg-supreme-vivid/10 hover:text-supreme-vivid transition-all whitespace-nowrap">
                {LANGUAGES.find(l => l.code === lang)?.label ?? 'EN'}
                <ChevronDown size={10} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div
                  className="absolute top-full right-0 z-50 mt-1 min-w-[110px] bg-white dark:bg-supreme-deep border border-slate-200 dark:border-supreme-primary/30 rounded-xl shadow-xl overflow-hidden py-1"
                  onMouseEnter={() => clearTimeout(langTimer.current)}
                  onMouseLeave={() => { langTimer.current = setTimeout(() => setLangOpen(false), 180); }}
                >
                  {LANGUAGES.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        lang === code
                          ? 'bg-supreme-vivid/10 text-supreme-vivid font-heading font-700'
                          : 'font-body text-supreme-dark/75 dark:text-supreme-light/75 hover:bg-supreme-vivid/10 hover:text-supreme-vivid'
                      }`}
                    >
                      {lang === code && <span className="w-1 h-1 rounded-full bg-supreme-vivid flex-shrink-0" />}
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Watch Live */}
            <Link
              to="/live"
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-heading font-700 uppercase tracking-wider px-4 py-2 rounded-full transition-all hover:shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse flex-shrink-0" />
              <Tv size={12} />
              <span className="hidden sm:inline">Watch Live</span>
            </Link>

            {/* Dark mode */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full text-supreme-mid hover:text-supreme-vivid hover:bg-slate-100 dark:hover:bg-supreme-primary/20 transition-all"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-supreme-mid hover:text-supreme-vivid hover:bg-slate-100 dark:hover:bg-supreme-primary/20 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-supreme-primary/20 bg-white dark:bg-supreme-deep">
          <nav className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
            {NAV_ITEMS.map(item => (
              item.href ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-heading font-700 transition-colors ${
                    isActive(item.href)
                      ? 'bg-supreme-vivid/10 text-supreme-vivid'
                      : 'text-supreme-dark dark:text-supreme-light hover:bg-slate-50 dark:hover:bg-supreme-primary/20'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <div key={item.label}>
                  <p className="text-[10px] font-heading font-700 uppercase tracking-widest text-supreme-mid px-4 pt-3 pb-1">
                    {item.label}
                  </p>
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      to={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-2 rounded-xl text-sm font-body text-supreme-dark/75 dark:text-supreme-light/75 hover:bg-slate-50 dark:hover:bg-supreme-primary/20 hover:text-supreme-vivid transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )
            ))}

            <div className="pt-4 border-t border-slate-100 dark:border-supreme-primary/20 flex items-center gap-3 flex-wrap mt-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-heading font-700 uppercase tracking-widest text-supreme-mid">Lang</span>
                {LANGUAGES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-heading font-700 transition-all ${
                      lang === code ? 'bg-supreme-vivid text-white' : 'bg-slate-100 dark:bg-supreme-primary/20 text-supreme-mid'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Link
                to="/live"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full text-sm font-heading font-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                Watch Live
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
