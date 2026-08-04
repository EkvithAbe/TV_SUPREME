import React, { useState, useEffect } from 'react';
import './admin.css';
import {
  LayoutDashboard, Tv, Newspaper, Monitor, Calendar, PlayCircle,
  Users, BarChart2, MessageSquare, DollarSign, Film, Briefcase,
  Building2, GraduationCap, Heart, TrendingUp, Inbox,
  Settings, Image, Radio, Share2, Globe, Bell, Sliders,
  Search, Sun, Moon, LogOut, Menu, X,
  CheckCircle, Mail, Youtube, AlertCircle, Eye,
} from 'lucide-react';

import DashboardPage       from './pages/DashboardPage';
import LiveTVPage          from './pages/LiveTVPage';
import NewsPage            from './pages/NewsPage';
import ProgramsPage        from './pages/ProgramsPage';
import SchedulePage        from './pages/SchedulePage';
import VideosPage          from './pages/VideosPage';
import MembersPage         from './pages/MembersPage';
import AnalyticsPage       from './pages/AnalyticsPage';
import CommentsPage        from './pages/CommentsPage';
import AdsPage             from './pages/AdsPage';
import ProductionPage      from './pages/ProductionPage';
import CareersPage         from './pages/CareersPage';
import AboutPage           from './pages/AboutPage';
import AcademyPage         from './pages/AcademyPage';
import CSRPage             from './pages/CSRPage';
import InvestorsPage       from './pages/InvestorsPage';
import ContactsPage        from './pages/ContactsPage';
import SettingsPage        from './pages/SettingsPage';
import MediaPage           from './pages/MediaPage';
import RadioPage           from './pages/RadioPage';
import SocialConnectorsPage from './pages/SocialConnectorsPage';
import LanguageManagerPage from './pages/LanguageManagerPage';
import AlertsPage          from './pages/AlertsPage';
import WidgetSettingsPage  from './pages/WidgetSettingsPage';

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', Icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'live',      Icon: Tv,              label: 'Live TV',        badge: 'LIVE', badgeColor: 'green' },
      { id: 'news',      Icon: Newspaper,       label: 'News',           badge: '12' },
      { id: 'programs',  Icon: Monitor,         label: 'Programs' },
      { id: 'schedule',  Icon: Calendar,        label: 'TV Schedule' },
      { id: 'videos',    Icon: PlayCircle,      label: 'Videos / VOD' },
    ],
  },
  {
    label: 'Audience',
    items: [
      { id: 'members',   Icon: Users,           label: 'Members',        badge: '3', badgeColor: 'green' },
      { id: 'analytics', Icon: BarChart2,       label: 'Analytics' },
      { id: 'comments',  Icon: MessageSquare,   label: 'Comments',       badge: '1' },
    ],
  },
  {
    label: 'Business',
    items: [
      { id: 'ads',        Icon: DollarSign,     label: 'Advertisements' },
      { id: 'production', Icon: Film,           label: 'Production Services' },
      { id: 'careers',    Icon: Briefcase,      label: 'Careers' },
    ],
  },
  {
    label: 'Corporate',
    items: [
      { id: 'about',     Icon: Building2,       label: 'About TV Supreme' },
      { id: 'academy',   Icon: GraduationCap,   label: 'Digital Academy' },
      { id: 'csr',       Icon: Heart,           label: 'Community & CSR' },
      { id: 'investors', Icon: TrendingUp,      label: 'Investors & Partners' },
      { id: 'contacts',  Icon: Inbox,           label: 'Contact Centre',  badge: '7', badgeColor: 'gold' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { id: 'radio',    Icon: Radio,            label: 'Radio Station',   badge: 'LIVE', badgeColor: 'green' },
      { id: 'social',   Icon: Share2,           label: 'Social Connectors' },
      { id: 'language', Icon: Globe,            label: 'Language Manager' },
      { id: 'alerts',   Icon: Bell,             label: 'Alerts & Tickers', badge: '2', badgeColor: 'red' },
      { id: 'widgets',  Icon: Sliders,          label: 'Widget Settings' },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'media',    Icon: Image,            label: 'Media Library' },
      { id: 'settings', Icon: Settings,         label: 'Settings' },
    ],
  },
];

const PAGE_TITLES = {
  dashboard: 'Dashboard',    live: 'Live TV Control',       news: 'News Management',
  programs: 'Programs',      schedule: 'TV Schedule',        videos: 'Videos / VOD',
  members: 'Members',        analytics: 'Analytics',         comments: 'Comments',
  ads: 'Advertisements',     production: 'Production Services', careers: 'Careers',
  about: 'About TV Supreme', academy: 'Digital Academy',    csr: 'Community & CSR',
  investors: 'Investors',    contacts: 'Contact Centre',    settings: 'Settings',
  media: 'Media Library',    radio: 'Radio Station',        social: 'Social Connectors',
  language: 'Language Manager', alerts: 'Alerts & Tickers', widgets: 'Widget Settings',
};

function renderPage(page) {
  switch (page) {
    case 'dashboard':  return <DashboardPage />;
    case 'live':       return <LiveTVPage />;
    case 'news':       return <NewsPage />;
    case 'programs':   return <ProgramsPage />;
    case 'schedule':   return <SchedulePage />;
    case 'videos':     return <VideosPage />;
    case 'members':    return <MembersPage />;
    case 'analytics':  return <AnalyticsPage />;
    case 'comments':   return <CommentsPage />;
    case 'ads':        return <AdsPage />;
    case 'production': return <ProductionPage />;
    case 'careers':    return <CareersPage />;
    case 'about':      return <AboutPage />;
    case 'academy':    return <AcademyPage />;
    case 'csr':        return <CSRPage />;
    case 'investors':  return <InvestorsPage />;
    case 'contacts':   return <ContactsPage />;
    case 'settings':   return <SettingsPage />;
    case 'media':      return <MediaPage />;
    case 'radio':      return <RadioPage />;
    case 'social':     return <SocialConnectorsPage />;
    case 'language':   return <LanguageManagerPage />;
    case 'alerts':     return <AlertsPage />;
    case 'widgets':    return <WidgetSettingsPage />;
    default:           return <DashboardPage />;
  }
}

const NOTIFICATIONS = [
  { Icon: Newspaper,    text: 'New article pending review',            time: '2 min ago',  dot: 'var(--purple)' },
  { Icon: MessageSquare,text: 'New comment on the T20I article',       time: '34 min ago', dot: 'var(--green)' },
  { Icon: Mail,         text: '3 new contact inquiries received',      time: '1 hr ago',   dot: 'var(--gold)' },
  { Icon: Youtube,      text: 'YouTube sync done — 2 new videos',      time: '2 hrs ago',  dot: 'var(--pink)' },
  { Icon: CheckCircle,  text: 'Live stream health: Excellent',         time: '3 hrs ago',  dot: 'var(--green)' },
];

export default function AdminApp() {
  const [activePage, setActivePage]   = useState('dashboard');
  const [toast, setToast]             = useState(null);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode]       = useState(() => {
    const saved = localStorage.getItem('admin-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function navigate(id) {
    setActivePage(id);
    setSidebarOpen(false);
  }

  const pageTitle = PAGE_TITLES[activePage] || 'Dashboard';

  return (
    <div className={`admin-root${darkMode ? '' : ' admin-light'}`}>

      {/* ====== SIDEBAR ====== */}
      <aside className={`a-sidebar${sidebarOpen ? ' a-sidebar-open' : ''}`}>
        {/* Logo */}
        <div className="a-sidebar-logo">
          <div className="a-logo-icon">
            <Tv size={18} color="#fff" />
          </div>
          <div>
            <span>TV Supreme</span>
            <small>Admin Portal</small>
          </div>
        </div>

        {/* Navigation */}
        {NAV_GROUPS.map(group => (
          <div className="a-nav-group" key={group.label}>
            <div className="a-nav-label">{group.label}</div>
            {group.items.map(({ id, Icon, label, badge, badgeColor }) => (
              <button
                key={id}
                className={`a-nav-item ${activePage === id ? 'active' : ''}`}
                onClick={() => navigate(id)}
              >
                <span className="nav-icon"><Icon size={15} /></span>
                <span className="nav-label">{label}</span>
                {badge && (
                  <span className={`a-nav-badge ${badgeColor || ''}`}>{badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}

        {/* Footer */}
        <div className="a-sidebar-footer">
          <div className="avatar">A</div>
          <div className="user-info">
            <div className="user-name">Admin</div>
            <div className="user-role">Super Admin</div>
          </div>
          <button
            className="logout-btn"
            title="Logout"
            onClick={() => showToast('Logged out successfully')}
          >
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      {/* ====== MAIN ====== */}
      <div className="a-main">
        {/* Topbar */}
        <header className="a-topbar">
          {/* Mobile sidebar toggle */}
          <button
            className="a-topbar-icon-btn"
            style={{ display: 'none' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Menu"
          >
            {sidebarOpen ? <X size={17} /> : <Menu size={17} />}
          </button>

          <div className="a-topbar-title">{pageTitle}</div>

          <div className="a-topbar-actions">
            <button
              className="a-topbar-icon-btn"
              title="View public site"
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 10px', fontSize: 12, fontWeight: 600, width: 'auto' }}
              onClick={() => { sessionStorage.setItem('adminPreview', '1'); window.location.href = '/'; }}
            >
              <Eye size={15} />
              <span style={{ display: 'none' }} className="view-site-label">View Site</span>
            </button>

            <button className="a-topbar-icon-btn" title="Search">
              <Search size={16} />
            </button>

            <button
              className="a-topbar-icon-btn"
              title="Notifications"
              onClick={() => setNotifOpen(!notifOpen)}
              style={{ position: 'relative' }}
            >
              <Bell size={16} />
              <span style={{
                position: 'absolute', top: 5, right: 5,
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--red)', border: '2px solid var(--surface)',
              }} />
            </button>

            <button
              className="a-theme-btn"
              title={darkMode ? 'Light mode' : 'Dark mode'}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div className="a-live-pill">
              <div className="a-live-dot" />
              LIVE
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="a-content" key={activePage}>
          {renderPage(activePage)}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`a-toast ${toast.type === 'error' ? 'error' : ''}`}>
          {toast.type === 'error'
            ? <AlertCircle size={14} />
            : <CheckCircle size={14} />
          }
          {toast.msg}
        </div>
      )}

      {/* Notifications panel */}
      {notifOpen && (
        <div
          style={{
            position: 'fixed', top: 56, right: 16, width: 320,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, zIndex: 10001, boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
              Notifications
            </span>
            <button
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex' }}
              onClick={() => setNotifOpen(false)}
            >
              <X size={15} />
            </button>
          </div>

          {NOTIFICATIONS.map(({ Icon, text, time, dot }, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 16px',
                borderBottom: i < NOTIFICATIONS.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseOver={e  => e.currentTarget.style.background = 'var(--surface2)'}
              onMouseOut={e   => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: 'var(--surface2)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={13} style={{ color: dot }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.4 }}>{text}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{time}</div>
              </div>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: dot, flexShrink: 0, marginTop: 6,
              }} />
            </div>
          ))}

          <div style={{ padding: '10px 16px', textAlign: 'center' }}>
            <button
              style={{
                background: 'none', border: 'none', color: 'var(--purple)',
                cursor: 'pointer', fontSize: 12, fontWeight: 600,
              }}
              onClick={() => setNotifOpen(false)}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
