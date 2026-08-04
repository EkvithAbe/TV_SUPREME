import { useState } from 'react';
import {
  Globe, BarChart2, Settings, AlertTriangle, CheckCircle,
  XCircle, Edit3, Save, ChevronDown, ChevronUp,
  Search, RotateCcw, BookOpen, ArrowRight, Trash2, Bot, PenLine,
} from 'lucide-react';

/* ─── Languages ─────────────────────────────────────────────────────────────── */
const LANGS = [
  { id: 'si', name: 'Sinhala', native: 'සිංහල', flag: '🇱🇰', font: '"Noto Sans Sinhala", serif', primary: true,  active: true,  color: 'purple', articles: 2467 },
  { id: 'en', name: 'English', native: 'English', flag: '🇬🇧', font: 'inherit',                  primary: false, active: true,  color: 'blue',   articles: 2108 },
  { id: 'ta', name: 'Tamil',   native: 'தமிழ்',  flag: '🇮🇳', font: '"Noto Sans Tamil", serif',  primary: false, active: false, color: 'gold',   articles: 12   },
];
const LANG_MAP = Object.fromEntries(LANGS.map(l => [l.id, l]));

/* ─── Article data
     Each translation has:
       auto   — Google Translate output (reference, read-only in editor)
       manual — Admin's typed override (empty = website falls back to auto)
       flagged — auto output has known character/font issue
─────────────────────────────────────────────────────────────────────────────── */
const ARTICLES_INIT = [
  {
    id: 'a1', type: 'news', category: 'politics', source: 'si',
    sourceTitle:   'පාර්ලිමේන්තුව 2026 අයවැය සම්මත කරයි — ආර්ථිකය නැවත හොඳ මාර්ගයේ',
    sourceExcerpt: 'ශ්‍රී ලංකා පාර්ලිමේන්තුව අද 2026 ජාතික අයවැය ඡන්ද 147ක් සමඟ සම්මත කළේය.',
    published: '2026-06-12',
    translations: {
      en: {
        auto:   { title: 'Parliament Passes 2026 Budget — Economy Back on Track', excerpt: 'Sri Lanka Parliament today passed the 2026 National Budget with 147 votes.' },
        manual: { title: '', excerpt: '' },
        flagged: false,
      },
      ta: {
        auto:   { title: 'பார்லிமென்ட் 2026 பட்ஜெட்டை நிறைவேற்றியது', excerpt: '' },
        manual: { title: '', excerpt: '' },
        flagged: true,
      },
    },
  },
  {
    id: 'a2', type: 'sports', category: 'sports', source: 'si',
    sourceTitle:   'නිශාන්ක 112* — ශ්‍රී ලංකාව ඉන්දියාවට එරෙහිව ගෙදර T20 ජය ගනී',
    sourceExcerpt: 'පාත්‍රිකා නිශාන්ක 112 ස්ථිර නොවූ ලකුණු රැස් කිරීමෙන් ශ්‍රී ලංකාව ප්‍රථම T20 ජය ගත්තේය.',
    published: '2026-06-11',
    translations: {
      en: {
        auto:   { title: 'Nissanka 112* — Sri Lanka Win Home T20 Against India', excerpt: 'Pathum Nissanka\'s unbeaten 112 guided Sri Lanka to a comfortable first T20 win.' },
        manual: { title: 'Nissanka Stars With 112* as Sri Lanka Beat India in First T20', excerpt: 'A brilliant unbeaten century from Pathum Nissanka sealed Sri Lanka\'s first T20 victory against India at home.' },
        flagged: false,
      },
      ta: {
        auto:   { title: '', excerpt: '' },
        manual: { title: '', excerpt: '' },
        flagged: false,
      },
    },
  },
  {
    id: 'a3', type: 'entertainment', category: 'entertainment', source: 'si',
    sourceTitle:   'සඳ ඇළිය 3 කතාමාලාව — නව කොටස අද රාත්‍රී 8ට',
    sourceExcerpt: 'TV Supreme හී ජනප්‍රිය නාට්‍යයේ 3 වන සෘතුව අද රාත්‍රී 8.00 ට ආරම්භ වේ.',
    published: '2026-06-12',
    translations: {
      en: {
        auto:   { title: 'Sanda Eliya Season 3 — New Episode Tonight at 8PM', excerpt: 'The third season of TV Supreme\'s popular drama starts tonight at 8:00 PM.' },
        manual: { title: '', excerpt: '' },
        flagged: false,
      },
      ta: {
        auto:   { title: 'சந்த ஏலியா சீசன் 3 — இன்று இரவு 8 மணிக்கு', excerpt: 'TV Supreme இல் பிரபலமான நாடகத்தின் மூன்றாவது சீசன் இன்று இரவு தொடங்குகிறது.' },
        manual: { title: '', excerpt: '' },
        flagged: true,
      },
    },
  },
  {
    id: 'a4', type: 'business', category: 'business', source: 'si',
    sourceTitle:   'කොළඹ කොටස් වෙළඳපළ වසර 3ක ඉහළ මට්ටමකට ළඟා වේ',
    sourceExcerpt: 'CSE ප්‍රධාන දර්ශකය අද 8,420 ලකුණු ඉක්මවා ගොස් වසර 3ක ඉහළ මට්ටමකට ළඟා විය.',
    published: '2026-06-11',
    translations: {
      en: {
        auto:   { title: 'Colombo Stock Exchange Hits 3-Year High', excerpt: 'The CSE main index surpassed 8,420 points today, reaching a 3-year high.' },
        manual: { title: '', excerpt: '' },
        flagged: false,
      },
      ta: {
        auto:   { title: '', excerpt: '' },
        manual: { title: '', excerpt: '' },
        flagged: false,
      },
    },
  },
  {
    id: 'a5', type: 'lifestyle', category: 'lifestyle', source: 'en',
    sourceTitle:   'Digital Skills Training Programme Launches for Rural Youth',
    sourceExcerpt: 'A nationwide initiative to bring coding and digital literacy to rural schools has launched today.',
    published: '2026-06-09',
    translations: {
      si: {
        auto:   { title: 'ග්‍රාමීය තරුණයන් සඳහා ඩිජිටල් දිවු පුහුණු වැඩසටහන ආරම්භ වේ', excerpt: 'ග්‍රාමීය පාසල් සඳහා කේතනය සහ ඩිජිටල් සාක්‍ෂරතාව ගෙනයාමට ජාතික මුලපිරීමක් අද ආරම්භ විය.' },
        manual: { title: '', excerpt: '' },
        flagged: true,
      },
      ta: {
        auto:   { title: 'கிராமப்புற இளைஞர்களுக்கான டிஜிட்டல் திறன் பயிற்சி', excerpt: '' },
        manual: { title: '', excerpt: '' },
        flagged: true,
      },
    },
  },
];

const STATUS_ROWS = [
  { type: 'News',          total: 2467, si: 100, en: 85, ta: 0  },
  { type: 'Sports',        total: 344,  si: 100, en: 78, ta: 0  },
  { type: 'Entertainment', total: 189,  si: 100, en: 92, ta: 18 },
  { type: 'Programs',      total: 48,   si: 100, en: 100,ta: 25 },
  { type: 'Business',      total: 198,  si: 100, en: 70, ta: 0  },
  { type: 'Lifestyle',     total: 122,  si: 65,  en: 100,ta: 0  },
];

const DISPLAY_SETTINGS = [
  { id: 'ls1', label: 'Show language switcher in header',      desc: 'Display language toggle in the public website header',                defaultOn: true  },
  { id: 'ls2', label: 'Auto-detect browser language',          desc: 'Automatically show content in the visitor\'s browser language',      defaultOn: true  },
  { id: 'ls3', label: 'Fall back to auto if no manual entry',  desc: 'Use Google Translate output when no manual translation is entered',  defaultOn: true  },
  { id: 'ls4', label: 'Show "Machine translated" label',       desc: 'Display a small label on articles using auto-only translation',      defaultOn: false },
  { id: 'ls5', label: 'RTL support for Tamil',                 desc: 'Enable right-to-left layout for Tamil script rendering',             defaultOn: false },
];

const TABS = [
  { id: 'articles',  label: 'Article Translations', Icon: BookOpen },
  { id: 'languages', label: 'Languages',             Icon: Globe },
  { id: 'status',    label: 'Coverage',              Icon: BarChart2 },
  { id: 'settings',  label: 'Settings',              Icon: Settings },
];

const TYPE_COLORS = {
  news:          { bg: 'rgba(59,130,246,0.12)',  color: '#3B82F6' },
  sports:        { bg: 'rgba(16,185,129,0.12)',  color: '#10B981' },
  entertainment: { bg: 'rgba(124,58,237,0.12)', color: '#7C3AED' },
  business:      { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  lifestyle:     { bg: 'rgba(232,121,163,0.12)',color: '#E879A3' },
};

/* ─── helpers ───────────────────────────────────────────────────────────────── */
function hasManual(t) { return t?.manual?.title?.trim() || t?.manual?.excerpt?.trim(); }
function hasAuto(t)   { return t?.auto?.title?.trim()   || t?.auto?.excerpt?.trim();   }

function LangStatus({ t }) {
  if (!t) return <span style={pill('var(--red)')}>Missing</span>;
  const manual = hasManual(t);
  const auto   = hasAuto(t);
  if (!manual && !auto) return <span style={pill('var(--red)')}>Missing</span>;
  if (manual)           return <span style={pill('var(--green)', true)}>Manual</span>;
  if (t.flagged)        return <span style={{ ...pill('var(--gold)'), display: 'inline-flex', alignItems: 'center', gap: 3 }}><AlertTriangle size={9} /> Auto – Review</span>;
  return                       <span style={pill('var(--blue)')}>Auto</span>;
}

function pill(color, border) {
  return {
    fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 999,
    background: color + '20', color,
    ...(border ? { border: `1px solid ${color}50` } : {}),
  };
}

/* ─── Per-language translation panel ────────────────────────────────────────── */
function LangPanel({ lang, t, onChange }) {
  const hasMnl = hasManual(t);
  const hasAut = hasAuto(t);
  const flagged = t?.flagged && !hasMnl;

  function copyAutoToManual() {
    onChange({ manual: { title: t.auto?.title || '', excerpt: t.auto?.excerpt || '' } });
  }
  function clearManual() {
    onChange({ manual: { title: '', excerpt: '' } });
  }

  return (
    <div style={{
      border: `1px solid ${flagged ? 'rgba(245,158,11,0.45)' : 'var(--border)'}`,
      borderRadius: 10, overflow: 'hidden', marginBottom: 12,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px',
        borderBottom: '1px solid var(--border)', background: 'var(--surface)',
      }}>
        <span style={{ fontSize: 15 }}>{lang.flag}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{lang.name}</span>
        <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: lang.font }}>{lang.native}</span>
        <LangStatus t={t} />
        {flagged && (
          <span style={{ fontSize: 11, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <AlertTriangle size={11} /> Auto may have incorrect characters
          </span>
        )}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)' }}>
          Website uses: <strong style={{ color: hasMnl ? 'var(--green)' : hasAut ? 'var(--blue)' : 'var(--red)' }}>
            {hasMnl ? 'Manual' : hasAut ? 'Auto (Google Translate)' : 'Nothing — missing'}
          </strong>
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0 }}>

        {/* ── Left: Google Translate (auto) ── */}
        <div style={{ padding: 14, borderRight: '1px solid var(--border)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10,
            fontSize: 11, fontWeight: 700, color: 'var(--muted)',
          }}>
            <Bot size={12} style={{ color: 'var(--blue)' }} />
            Google Translate
            {t?.flagged && (
              <span style={{ ...pill('var(--gold)'), display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <AlertTriangle size={8} /> Check characters
              </span>
            )}
          </div>

          {/* Auto title */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3 }}>TITLE</div>
            <div style={{
              fontSize: 12, fontFamily: lang.font, color: t?.auto?.title ? 'var(--text)' : 'var(--muted)',
              background: 'var(--surface2)', borderRadius: 7, padding: '7px 10px',
              fontStyle: t?.auto?.title ? 'normal' : 'italic', lineHeight: 1.45, minHeight: 34,
            }}>
              {t?.auto?.title || 'No auto-translation yet'}
            </div>
          </div>

          {/* Auto excerpt */}
          <div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3 }}>EXCERPT</div>
            <div style={{
              fontSize: 12, fontFamily: lang.font, color: t?.auto?.excerpt ? 'var(--text)' : 'var(--muted)',
              background: 'var(--surface2)', borderRadius: 7, padding: '7px 10px',
              fontStyle: t?.auto?.excerpt ? 'normal' : 'italic', lineHeight: 1.55, minHeight: 56,
            }}>
              {t?.auto?.excerpt || 'No auto-translation yet'}
            </div>
          </div>
        </div>

        {/* ── Centre: Copy arrow ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '0 10px', gap: 10,
        }}>
          <button
            onClick={copyAutoToManual}
            disabled={!hasAut}
            title="Copy Google Translate to manual"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '8px 6px', borderRadius: 8, border: '1px solid var(--border)',
              background: hasAut ? 'var(--surface2)' : 'transparent',
              color: hasAut ? 'var(--text)' : 'var(--muted)',
              cursor: hasAut ? 'pointer' : 'not-allowed',
              fontSize: 9, fontWeight: 600,
            }}
          >
            <ArrowRight size={14} />
            Copy
          </button>
          {hasMnl && (
            <button
              onClick={clearManual}
              title="Clear manual override"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '8px 6px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--surface2)', color: 'var(--muted)',
                cursor: 'pointer', fontSize: 9, fontWeight: 600,
              }}
            >
              <Trash2 size={13} />
              Clear
            </button>
          )}
        </div>

        {/* ── Right: Manual override ── */}
        <div style={{ padding: 14 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10,
            fontSize: 11, fontWeight: 700, color: 'var(--muted)',
          }}>
            <PenLine size={12} style={{ color: hasMnl ? 'var(--purple)' : 'var(--muted)' }} />
            Manual Override
            {hasMnl
              ? <span style={pill('var(--purple)')}>Active</span>
              : <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 400 }}>— leave blank to use Google Translate</span>
            }
          </div>

          {/* Manual title */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3 }}>TITLE</div>
            <input
              type="text"
              value={t?.manual?.title || ''}
              onChange={e => onChange({ manual: { ...t?.manual, title: e.target.value } })}
              placeholder="Type your translation (optional)…"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '7px 10px', borderRadius: 7, fontSize: 12, lineHeight: 1.45,
                fontFamily: lang.font, color: 'var(--text)',
                background: 'var(--surface)',
                border: `1px solid ${t?.manual?.title ? 'var(--purple)' : 'var(--border)'}`,
                outline: 'none',
              }}
            />
          </div>

          {/* Manual excerpt */}
          <div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3 }}>EXCERPT</div>
            <textarea
              value={t?.manual?.excerpt || ''}
              onChange={e => onChange({ manual: { ...t?.manual, excerpt: e.target.value } })}
              placeholder="Type your translation (optional)…"
              rows={3}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '7px 10px', borderRadius: 7, fontSize: 12, lineHeight: 1.55,
                fontFamily: lang.font, color: 'var(--text)',
                background: 'var(--surface)',
                border: `1px solid ${t?.manual?.excerpt ? 'var(--purple)' : 'var(--border)'}`,
                outline: 'none', resize: 'vertical',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Inline article editor ──────────────────────────────────────────────────── */
function ArticleEditor({ article, onSave }) {
  const srcLang    = LANG_MAP[article.source];
  const editLangs  = LANGS.filter(l => l.id !== article.source);

  const [fields, setFields] = useState(() => {
    const init = {};
    editLangs.forEach(l => {
      const t = article.translations[l.id] || { auto: { title: '', excerpt: '' }, manual: { title: '', excerpt: '' }, flagged: false };
      init[l.id] = { ...t };
    });
    return init;
  });
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(langId, patch) {
    setFields(prev => ({ ...prev, [langId]: { ...prev[langId], ...patch } }));
    setDirty(true);
    setSaved(false);
  }

  function save() {
    onSave(article.id, fields);
    setDirty(false);
    setSaved(true);
  }

  return (
    <div style={{ padding: '0 18px 18px' }}>
      {/* Source */}
      <div style={{
        marginBottom: 14, background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: 10, padding: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span>{srcLang.flag}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{srcLang.name} — Source (read only)</span>
          <span style={{ ...pill('var(--purple)'), border: '1px solid var(--purple)50' }}>Primary</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 5, fontFamily: srcLang.font }}>{article.sourceTitle}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, fontFamily: srcLang.font }}>{article.sourceExcerpt}</div>
      </div>

      {editLangs.map(lang => (
        <LangPanel
          key={lang.id}
          lang={lang}
          t={fields[lang.id]}
          onChange={patch => handleChange(lang.id, patch)}
        />
      ))}

      {/* Save bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
        {saved && !dirty && (
          <span style={{ fontSize: 12, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <CheckCircle size={13} /> Saved
          </span>
        )}
        <button onClick={save} disabled={!dirty} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 18px', borderRadius: 8,
          background: dirty ? 'var(--purple)' : 'var(--surface2)',
          color: dirty ? '#fff' : 'var(--muted)',
          border: 'none', cursor: dirty ? 'pointer' : 'not-allowed',
          fontSize: 13, fontWeight: 700, transition: 'all 0.15s',
        }}>
          <Save size={14} /> Save
        </button>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────────────── */
export default function LanguageManagerPage() {
  const [activeTab,    setActiveTab]    = useState('articles');
  const [articles,     setArticles]     = useState(ARTICLES_INIT);
  const [expanded,     setExpanded]     = useState(null);
  const [search,       setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [langs,        setLangs]        = useState(LANGS);
  const [defaultLang,  setDefaultLang]  = useState('si');
  const [dispSettings, setDispSettings] = useState(
    () => Object.fromEntries(DISPLAY_SETTINGS.map(s => [s.id, s.defaultOn]))
  );

  const reviewCount = articles.reduce((n, a) =>
    n + Object.values(a.translations).filter(t => t.flagged && !hasManual(t)).length, 0
  );

  function saveTranslations(articleId, fields) {
    setArticles(prev => prev.map(a => {
      if (a.id !== articleId) return a;
      return { ...a, translations: { ...a.translations, ...fields } };
    }));
  }

  const filtered = articles.filter(a => {
    if (search && !a.sourceTitle.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus === 'flagged') return Object.values(a.translations).some(t => t.flagged && !hasManual(t));
    if (filterStatus === 'missing') return Object.values(a.translations).some(t => !hasAuto(t) && !hasManual(t));
    if (filterStatus === 'manual')  return Object.values(a.translations).some(t => hasManual(t));
    return true;
  });

  return (
    <div className="a-page">

      {/* Flagged alert */}
      {reviewCount > 0 && (
        <div style={{
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.35)',
          borderRadius: 10, padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        }}>
          <AlertTriangle size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: 13, color: 'var(--text)' }}>
            <strong style={{ color: 'var(--gold)' }}>{reviewCount} auto-translations</strong> may have incorrect Sinhala or Tamil characters.
            <span style={{ color: 'var(--muted)', marginLeft: 6, fontSize: 12 }}>
              Enter a manual override — the website will use it instead of Google Translate.
            </span>
          </div>
          <button className="btn btn-warning btn-sm"
            onClick={() => { setActiveTab('articles'); setFilterStatus('flagged'); }}>
            Review Now
          </button>
        </div>
      )}

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 2, borderBottom: '1px solid var(--border)', overflowX: 'auto',
        padding: '0 20px', background: 'var(--surface)', borderRadius: 12, marginBottom: 20,
      }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
            border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13,
            fontWeight: activeTab === tab.id ? 700 : 500,
            color: activeTab === tab.id ? 'var(--purple)' : 'var(--muted)',
            borderBottom: activeTab === tab.id ? '2px solid var(--purple)' : '2px solid transparent',
            marginBottom: -1, transition: 'all 0.15s', whiteSpace: 'nowrap',
          }}>
            <tab.Icon size={14} />
            {tab.label}
            {tab.id === 'articles' && reviewCount > 0 && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 999,
                background: 'rgba(245,158,11,0.2)', color: 'var(--gold)' }}>
                {reviewCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── ARTICLE TRANSLATIONS ── */}
      {activeTab === 'articles' && (
        <div className="a-card">
          <div className="a-card-header" style={{ flexWrap: 'wrap', gap: 10 }}>
            <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={15} style={{ color: 'var(--purple)' }} />
              Article Translations
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginLeft: 'auto' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px',
              }}>
                <Search size={13} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles…"
                  style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 12, color: 'var(--text)', width: 160 }} />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8,
                  padding: '6px 10px', fontSize: 12, color: 'var(--text)', outline: 'none', cursor: 'pointer' }}>
                <option value="all">All Status</option>
                <option value="flagged">Needs Review</option>
                <option value="missing">Missing Translation</option>
                <option value="manual">Has Manual Entry</option>
              </select>
            </div>
          </div>

          {/* Legend */}
          <div style={{ padding: '8px 18px', borderBottom: '1px solid var(--border)',
            display: 'flex', gap: 16, flexWrap: 'wrap', background: 'var(--surface2)' }}>
            {[
              { color: 'var(--blue)',  Icon: Bot,           label: 'Google Translate — auto' },
              { color: 'var(--green)', Icon: PenLine,        label: 'Manual override — website uses this' },
              { color: 'var(--gold)',  Icon: AlertTriangle, label: 'Auto — may have wrong characters, needs manual' },
              { color: 'var(--red)',   Icon: XCircle,       label: 'Missing' },
            ].map(({ color, Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--muted)' }}>
                <Icon size={11} style={{ color }} /> {label}
              </div>
            ))}
          </div>

          {/* List */}
          {filtered.length === 0 && (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No articles match your filters.
            </div>
          )}

          {filtered.map((article, idx) => {
            const isOpen  = expanded === article.id;
            const tc      = TYPE_COLORS[article.type] || TYPE_COLORS.news;
            const srcLang = LANG_MAP[article.source];
            const editLangs = LANGS.filter(l => l.id !== article.source);

            return (
              <div key={article.id} style={{ borderBottom: idx < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : article.id)}
                  style={{
                    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center',
                    gap: 12, padding: '13px 18px', background: 'transparent', border: 'none',
                    cursor: 'pointer', transition: 'background 0.12s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseOut={e  => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                    background: tc.bg, color: tc.color, flexShrink: 0, textTransform: 'capitalize' }}>
                    {article.type}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: srcLang.font }}>
                      {article.sourceTitle}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      {srcLang.flag} {srcLang.name} · {article.published}
                    </div>
                  </div>
                  {/* Per-language status dots */}
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
                    {editLangs.map(lang => {
                      const t = article.translations[lang.id];
                      const mn = hasManual(t);
                      const au = hasAuto(t);
                      const Icon = mn ? PenLine : au ? (t?.flagged ? AlertTriangle : Bot) : XCircle;
                      const col = mn ? 'var(--green)' : au ? (t?.flagged ? 'var(--gold)' : 'var(--blue)') : 'var(--red)';
                      return (
                        <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <span style={{ fontSize: 12 }}>{lang.flag}</span>
                          <Icon size={11} style={{ color: col }} />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ color: 'var(--muted)', flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <ArticleEditor key={article.id} article={article} onSave={saveTranslations} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── LANGUAGES ── */}
      {activeTab === 'languages' && (
        <div className="a-card">
          <div className="a-card-header">
            <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Globe size={15} style={{ color: 'var(--purple)' }} /> Language Configuration
            </div>
            <button className="btn btn-primary btn-sm">+ Add Language</button>
          </div>
          <div className="a-card-body">
            <div className="three-col" style={{ gap: 16, marginBottom: 20 }}>
              {langs.map(lang => (
                <div key={lang.id} className="lang-card">
                  {lang.primary && <span className="lang-primary-badge">Primary</span>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{lang.flag}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{lang.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: lang.font }}>{lang.native}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: `var(--${lang.color})`, marginBottom: 2 }}>
                    {lang.articles.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>articles translated</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>
                    Script font: <span style={{ fontFamily: lang.font, color: 'var(--text)' }}>
                      {lang.font.split(',')[0].replace(/"/g, '')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={`badge ${lang.active ? 'badge-active' : 'badge-inactive'}`}>
                      {lang.active ? 'Active' : 'Inactive'}
                    </span>
                    {!lang.primary && (
                      <label className="toggle">
                        <input type="checkbox" checked={lang.active}
                          onChange={() => setLangs(prev => prev.map(l => l.id === lang.id ? { ...l, active: !l.active } : l))} />
                        <span className="toggle-slider" />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: 'var(--text)' }}>Default Language</div>
              <div style={{ display: 'flex', gap: 20 }}>
                {langs.map(lang => (
                  <label key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="radio" name="defaultLang" value={lang.id} checked={defaultLang === lang.id}
                      onChange={() => setDefaultLang(lang.id)} style={{ accentColor: 'var(--purple)' }} />
                    <span style={{ fontSize: 13, color: 'var(--text)' }}>{lang.flag} {lang.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COVERAGE ── */}
      {activeTab === 'status' && (
        <div className="a-card">
          <div className="a-card-header">
            <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BarChart2 size={15} style={{ color: 'var(--purple)' }} /> Translation Coverage
            </div>
          </div>
          <div className="a-table-wrap">
            <table>
              <thead>
                <tr><th>Section</th><th>Total</th><th>🇱🇰 Sinhala</th><th>🇬🇧 English</th><th>🇮🇳 Tamil</th><th>Action</th></tr>
              </thead>
              <tbody>
                {STATUS_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{row.type}</td>
                    <td>{row.total.toLocaleString()}</td>
                    {[row.si, row.en, row.ta].map((pct, j) => (
                      <td key={j}>
                        {pct === 100
                          ? <span style={{ color: 'var(--green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={12} /> 100%</span>
                          : pct === 0
                            ? <span style={{ color: 'var(--red)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><XCircle size={12} /> 0%</span>
                            : <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{pct}%</span>}
                      </td>
                    ))}
                    <td><button className="btn btn-primary btn-sm">Translate Missing</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── SETTINGS ── */}
      {activeTab === 'settings' && (
        <div className="a-card">
          <div className="a-card-header">
            <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Settings size={15} style={{ color: 'var(--purple)' }} /> Language Display Settings
            </div>
          </div>
          <div className="a-card-body">
            {DISPLAY_SETTINGS.map(s => (
              <div key={s.id} className="setting-row">
                <div className="setting-info">
                  <div className="setting-name">{s.label}</div>
                  <div className="setting-desc">{s.desc}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={dispSettings[s.id]}
                    onChange={() => setDispSettings(prev => ({ ...prev, [s.id]: !prev[s.id] }))} />
                  <span className="toggle-slider" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
