import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import AdminPreviewBar from './components/AdminPreviewBar';
import IntroScreen from './components/IntroScreen';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import SchedulePage from './pages/SchedulePage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import ProductionPage from './pages/ProductionPage';
import AcademyPage from './pages/AcademyPage';
import CSRPage from './pages/CSRPage';
import InvestorsPage from './pages/InvestorsPage';
import LivePage from './pages/LivePage';
import AdminApp from './admin/AdminApp';

const FOOTER_COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',   href: '/about' },
      { label: 'Investors',  href: '/investors' },
      { label: 'Careers',    href: '/careers' },
      { label: 'CSR',        href: '/csr' },
      { label: 'Contact',    href: '/contact' },
    ],
  },
  {
    heading: 'Content',
    links: [
      { label: 'Programs',   href: '/programs' },
      { label: 'TV Schedule', href: '/schedule' },
      { label: 'Watch Live', href: '/live' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Production House', href: '/production' },
      { label: 'Digital Academy',  href: '/academy' },
      { label: 'Advertise With Us', href: '/production' },
    ],
  },
];

function Footer() {
  return (
    <footer style={{ background: '#080210' }} className="text-supreme-mid pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="grid md:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-5 h-px bg-supreme-vivid" />
              <span className="text-white font-heading font-800 text-base tracking-wide">TV Supreme</span>
            </div>
            <p className="text-supreme-mid/70 text-sm leading-relaxed font-body mb-6 max-w-[200px]">
              Sri Lanka's boldest screen — on air 24/7 since 2010.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px]">
              {[
                { l: 'YouTube',   n: '359K' },
                { l: 'Facebook',  n: '241K' },
                { l: 'TikTok',    n: '89K' },
                { l: 'WhatsApp',  n: '45K' },
              ].map(s => (
                <span key={s.l} className="text-supreme-mid/60">
                  {s.l} <span className="text-white font-heading font-700">{s.n}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.heading}>
              <h4 className="text-white font-heading font-700 mb-4 text-[11px] uppercase tracking-[0.2em]">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-supreme-mid/70 hover:text-supreme-pink transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-supreme-mid/50">
          <p>© 2026 TV Supreme (Pvt) Ltd. All rights reserved. ඔබ සතුටින්</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-supreme-pink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-supreme-pink transition-colors">Terms of Use</a>
            <Link to="/admin" className="hover:text-supreme-pink transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function KeyedCategory() {
  const { pathname } = useLocation();
  return <CategoryPage key={pathname} />;
}

function PublicSite() {
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem('introSeen') === '1'
  );

  function handleIntroComplete() {
    sessionStorage.setItem('introSeen', '1');
    setIntroDone(true);
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          {!introDone && <IntroScreen onComplete={handleIntroComplete} />}
          <div className="min-h-screen bg-white dark:bg-supreme-dark text-supreme-dark dark:text-supreme-light transition-colors duration-300">
            <AdminPreviewBar />
            <Header />
            <main>
              <Routes>
                <Route path="/"           element={<HomePage />} />
                <Route path="/about"      element={<AboutPage />} />
                <Route path="/programs"   element={<ProgramsPage />} />
                <Route path="/schedule"   element={<SchedulePage />} />
                <Route path="/careers"    element={<CareersPage />} />
                <Route path="/contact"    element={<ContactPage />} />
                <Route path="/production" element={<ProductionPage />} />
                <Route path="/academy"    element={<AcademyPage />} />
                <Route path="/csr"        element={<CSRPage />} />
                <Route path="/investors"  element={<InvestorsPage />} />
                <Route path="/live"       element={<LivePage />} />
                <Route path="/:category"  element={<KeyedCategory />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  );
}
