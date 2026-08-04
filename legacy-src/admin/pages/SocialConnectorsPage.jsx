import { useState } from 'react';
import {
  Youtube, Facebook, Music2, Instagram, Twitter, MessageCircle,
  Plus, Trash2, Eye, EyeOff, RefreshCw, Link2, CheckCircle,
  XCircle, GripVertical, ExternalLink, Zap, FileText,
  Layers, ChevronDown, ChevronUp, MessageSquare, Wand2,
  PenLine, RotateCcw,
} from 'lucide-react';

/* ─── Platform meta ─────────────────────────────────────────────────────────── */
const PM = {
  youtube:   { label: 'YouTube',  short: 'YT', Icon: Youtube,       color: '#FF0000', bg: 'rgba(255,0,0,0.12)' },
  facebook:  { label: 'Facebook', short: 'FB', Icon: Facebook,      color: '#1877F2', bg: 'rgba(24,119,242,0.12)' },
  tiktok:    { label: 'TikTok',   short: 'TT', Icon: Music2,        color: '#69C9D0', bg: 'rgba(105,201,208,0.12)' },
  instagram: { label: 'Instagram',short: 'IG', Icon: Instagram,     color: '#E1306C', bg: 'rgba(225,48,108,0.12)' },
  whatsapp:  { label: 'WhatsApp', short: 'WA', Icon: MessageCircle, color: '#25D366', bg: 'rgba(37,211,102,0.12)' },
  twitter:   { label: 'Twitter',  short: 'X',  Icon: Twitter,       color: '#1DA1F2', bg: 'rgba(29,161,242,0.12)' },
};

/* ─── Connection data ───────────────────────────────────────────────────────── */
const CONNECTIONS_INIT = [
  { id: 'youtube',   connected: true,  handle: 'TV Supreme',          stat: '359K', statLabel: 'subscribers',         keyLabel: 'API Key',      keyMasked: '••••••••AIzaSyK', lastSync: '2 hours ago' },
  { id: 'facebook',  connected: true,  handle: 'TV Supreme',          stat: '241K', statLabel: 'followers',           keyLabel: 'Access Token', keyMasked: '••••••••EAAGm',   lastSync: '30 mins ago' },
  { id: 'tiktok',    connected: true,  handle: '@tvsupreme.lk',       stat: '89K',  statLabel: 'followers',           keyLabel: 'API Key',      keyMasked: '••••••••ttk_9x',  lastSync: '1 hour ago' },
  { id: 'whatsapp',  connected: true,  handle: 'TV Supreme Official', stat: '45K',  statLabel: 'channel subscribers', keyLabel: 'Business API', keyMasked: '••••••••WA_lk7',  lastSync: '15 mins ago' },
  { id: 'instagram', connected: false, handle: null, stat: null, statLabel: null, keyLabel: null, keyMasked: null, lastSync: null },
  { id: 'twitter',   connected: false, handle: null, stat: null, statLabel: null, keyLabel: null, keyMasked: null, lastSync: null },
];

/* ─── Video library ─────────────────────────────────────────────────────────── */
const ALL_VIDEOS = [
  // YouTube
  { id: 'yt1', platform: 'youtube',   url: 'https://youtube.com/watch?v=abc001', title: 'Parliament Live: Budget Debate — Day 3',       thumb: '/images/janahada.jpeg',           views: '9.8K',  dur: '2:34:00', tags: ['news','politics'] },
  { id: 'yt2', platform: 'youtube',   url: 'https://youtube.com/watch?v=abc002', title: 'Nissanka 112* — SL vs India Full Highlights',   thumb: '/images/cricket.jpeg',            views: '312K',  dur: '18:42',   tags: ['sports'] },
  { id: 'yt3', platform: 'youtube',   url: 'https://youtube.com/watch?v=abc003', title: 'Sanda Eliya Season 3 — Official Trailer',       thumb: '/images/samanmaliya.jpeg',        views: '198K',  dur: '2:15',    tags: ['entertainment'] },
  { id: 'yt4', platform: 'youtube',   url: 'https://youtube.com/watch?v=abc004', title: 'Prime Time News Bulletin — 7PM Full',          thumb: '/images/live.jpeg',               views: '54K',   dur: '28:00',   tags: ['news'] },
  { id: 'yt5', platform: 'youtube',   url: 'https://youtube.com/watch?v=abc005', title: 'CSE Hits 3-Year High — Market Analysis',       thumb: '/images/global-pulse.jpeg',       views: '21K',   dur: '12:30',   tags: ['business'] },
  { id: 'yt6', platform: 'youtube',   url: 'https://youtube.com/watch?v=abc006', title: 'G7 AI Regulation Summit — Full Coverage',      thumb: '/images/global-pulse.jpeg',       views: '44K',   dur: '45:10',   tags: ['world'] },
  // Facebook
  { id: 'fb1', platform: 'facebook',  url: 'https://facebook.com/tvsupreme/videos/111', title: 'LIVE: President Press Conference — IMF', thumb: '/images/news-cover.jpeg',        views: '14.2K', dur: 'LIVE',    tags: ['news','politics'] },
  { id: 'fb2', platform: 'facebook',  url: 'https://facebook.com/tvsupreme/videos/222', title: 'Colombo Stock Exchange Q1 Report',       thumb: '/images/global-pulse.jpeg',      views: '8.4K',  dur: '12:30',   tags: ['business'] },
  { id: 'fb3', platform: 'facebook',  url: 'https://facebook.com/tvsupreme/videos/333', title: 'Behind the Scenes — Morning Show',       thumb: '/images/every-morning.jpeg',     views: '3.1K',  dur: '5:20',    tags: ['entertainment'] },
  { id: 'fb4', platform: 'facebook',  url: 'https://facebook.com/tvsupreme/videos/444', title: 'Kabaddi Championship Final Replay',      thumb: '/images/cricket.jpeg',           views: '19K',   dur: '45:00',   tags: ['sports'] },
  // TikTok
  { id: 'tt1', platform: 'tiktok',    url: 'https://tiktok.com/@tvsupreme.lk/video/1', title: 'Breaking: Budget 2026 Key Highlights',   thumb: '/images/janahada.jpeg',          views: '142K',  dur: '0:45',    tags: ['news','politics'] },
  { id: 'tt2', platform: 'tiktok',    url: 'https://tiktok.com/@tvsupreme.lk/video/2', title: 'Nissanka Best 6 Shots Compilation',      thumb: '/images/cricket.jpeg',           views: '89K',   dur: '0:58',    tags: ['sports'] },
  { id: 'tt3', platform: 'tiktok',    url: 'https://tiktok.com/@tvsupreme.lk/video/3', title: 'Sanda Eliya Season 3 Teaser Reel',       thumb: '/images/samanmaliya.jpeg',       views: '22K',   dur: '0:30',    tags: ['entertainment'] },
  { id: 'tt4', platform: 'tiktok',    url: 'https://tiktok.com/@tvsupreme.lk/video/4', title: 'Top Business Stories This Week',         thumb: '/images/global-pulse.jpeg',      views: '31K',   dur: '1:00',    tags: ['business'] },
  // Instagram
  { id: 'ig1', platform: 'instagram', url: 'https://instagram.com/reel/abc1', title: 'Morning Show Highlights Reel',                   thumb: '/images/every-morning.jpeg',     views: '18K',   dur: '0:30',    tags: ['entertainment'] },
  { id: 'ig2', platform: 'instagram', url: 'https://instagram.com/reel/abc2', title: 'Today\'s Sports Round-Up Reel',                  thumb: '/images/cricket.jpeg',           views: '12K',   dur: '0:45',    tags: ['sports'] },
];

/* ─── Website sections ──────────────────────────────────────────────────────── */
const WEBSITE_SECTIONS = [
  { id: 'sports',        label: 'Sports',         tag: 'sports',        icon: '🏏' },
  { id: 'news',          label: 'Breaking News',   tag: 'news',          icon: '📢' },
  { id: 'politics',      label: 'Politics',        tag: 'politics',      icon: '🏛' },
  { id: 'entertainment', label: 'Entertainment',   tag: 'entertainment', icon: '🎬' },
  { id: 'business',      label: 'Business',        tag: 'business',      icon: '📈' },
  { id: 'world',         label: 'World',           tag: 'world',         icon: '🌐' },
  { id: 'lifestyle',     label: 'Lifestyle',       tag: 'lifestyle',     icon: '☀' },
  { id: 'live',          label: 'Live Page',       tag: 'news',          icon: '🔴' },
  { id: 'programs',      label: 'Programs Page',   tag: 'entertainment', icon: '📺' },
];

function autoPickVideo(tag) {
  return ALL_VIDEOS.find(v => v.tags.includes(tag)) || ALL_VIDEOS[0];
}

const SECTION_STATE_INIT = Object.fromEntries(
  WEBSITE_SECTIONS.map(s => [
    s.id,
    { mode: 'auto', video: autoPickVideo(s.tag), showComments: true, activePicker: false },
  ])
);

/* ─── Auto-publish rules ────────────────────────────────────────────────────── */
const AUTO_PUBLISH = [
  { id: 'ap1', label: 'Auto-post news articles to Facebook',       desc: 'New articles published to Facebook page automatically',   defaultOn: true  },
  { id: 'ap2', label: 'Auto-sync video descriptions to YouTube',   desc: 'Push new video titles and thumbnails to YouTube',         defaultOn: true  },
  { id: 'ap3', label: 'Send breaking news to WhatsApp channel',    desc: 'Push breaking alerts to WhatsApp Business channel',       defaultOn: true  },
  { id: 'ap4', label: 'Cross-post clips to TikTok',               desc: 'Short video clips shared to TikTok automatically',        defaultOn: false },
  { id: 'ap5', label: 'Auto-tweet news headlines',                 desc: 'Tweet headlines and live alerts via Twitter / X',         defaultOn: false },
];

const WEBHOOK_LOGS = [
  { ts: '2026-06-12 14:32', platform: 'YouTube',  action: 'Video sync',          status: 'Success' },
  { ts: '2026-06-12 14:15', platform: 'Facebook', action: 'News post published', status: 'Success' },
  { ts: '2026-06-12 13:58', platform: 'WhatsApp', action: 'Breaking alert sent', status: 'Success' },
  { ts: '2026-06-12 12:30', platform: 'TikTok',   action: 'API auth refresh',    status: 'Failed'  },
  { ts: '2026-06-12 11:05', platform: 'Facebook', action: 'Page insights sync',  status: 'Success' },
];

/* ─── Page tabs ─────────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'sections',    label: 'Section Content',    Icon: Layers },
  { id: 'connections', label: 'Connections',         Icon: Link2 },
  { id: 'library',     label: 'Video Library',       Icon: Youtube },
  { id: 'autopublish', label: 'Auto-Publish',        Icon: Zap },
  { id: 'logs',        label: 'Logs',                Icon: FileText },
];

/* ─── Small helpers ─────────────────────────────────────────────────────────── */
function PlatformBadge({ platform, small }) {
  const m = PM[platform];
  if (!m) return null;
  const { Icon } = m;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: small ? 10 : 11, fontWeight: 700,
      padding: small ? '1px 6px' : '2px 8px', borderRadius: 999,
      background: m.bg, color: m.color, whiteSpace: 'nowrap',
    }}>
      <Icon size={small ? 9 : 11} /> {small ? m.short : m.label}
    </span>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────────── */
export default function SocialConnectorsPage() {
  const [activeTab, setActiveTab]       = useState('sections');
  const [connections, setConnections]   = useState(CONNECTIONS_INIT);
  const [sectionState, setSectionState] = useState(SECTION_STATE_INIT);
  const [toggles, setToggles]           = useState(() =>
    Object.fromEntries(AUTO_PUBLISH.map(ap => [ap.id, ap.defaultOn]))
  );

  /* Library state */
  const [libTab, setLibTab]         = useState('youtube');
  const [addOpen, setAddOpen]       = useState(false);
  const [newUrl, setNewUrl]         = useState('');
  const [newTitle, setNewTitle]     = useState('');
  const [newPlatform, setNewPlatform] = useState('youtube');
  const [library, setLibrary]       = useState(ALL_VIDEOS);

  /* ── Section content helpers ── */
  function setSectionVideo(secId, video) {
    setSectionState(prev => ({
      ...prev,
      [secId]: { ...prev[secId], video, mode: 'manual', activePicker: false },
    }));
  }

  function resetToAuto(secId) {
    const sec = WEBSITE_SECTIONS.find(s => s.id === secId);
    setSectionState(prev => ({
      ...prev,
      [secId]: { ...prev[secId], video: autoPickVideo(sec.tag), mode: 'auto', activePicker: false },
    }));
  }

  function togglePicker(secId) {
    setSectionState(prev => ({
      ...prev,
      [secId]: { ...prev[secId], activePicker: !prev[secId].activePicker },
    }));
  }

  function toggleComments(secId) {
    setSectionState(prev => ({
      ...prev,
      [secId]: { ...prev[secId], showComments: !prev[secId].showComments },
    }));
  }

  /* ── Connection helpers ── */
  function disconnect(id) {
    setConnections(prev => prev.map(p => p.id === id ? { ...p, connected: false, handle: null, stat: null } : p));
  }

  /* ── Library helpers ── */
  function addVideo() {
    if (!newUrl.trim() || !newTitle.trim()) return;
    const entry = {
      id: `custom_${Date.now()}`, platform: newPlatform, url: newUrl.trim(),
      title: newTitle.trim(), thumb: '/images/news-cover.jpeg',
      views: '—', dur: '—', tags: [],
    };
    setLibrary(prev => [entry, ...prev]);
    setNewUrl(''); setNewTitle(''); setAddOpen(false);
  }

  /* ── Shared styles ── */
  const tabBarStyle = {
    display: 'flex', gap: 2, borderBottom: '1px solid var(--border)',
    overflowX: 'auto', padding: '0 20px', background: 'var(--surface)',
    borderRadius: '12px 12px 0 0', flexShrink: 0,
  };

  /* ── Render ── */
  return (
    <div className="a-page">

      {/* Page tab bar */}
      <div style={{ ...tabBarStyle, borderRadius: 12, marginBottom: 20 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 16px', border: 'none', background: 'transparent',
              cursor: 'pointer', fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? 'var(--purple)' : 'var(--muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--purple)' : '2px solid transparent',
              marginBottom: -1, transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}
          >
            <tab.Icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1 — SECTION CONTENT MANAGER
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'sections' && (
        <div className="a-card">
          <div className="a-card-header">
            <div>
              <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={15} style={{ color: 'var(--purple)' }} />
                Section Content Manager
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>
                Each website section auto-shows today's best matching clip. Override any section manually.
              </div>
            </div>
          </div>
          <div className="a-card-body" style={{ padding: 0 }}>

            {WEBSITE_SECTIONS.map((sec, idx) => {
              const state    = sectionState[sec.id];
              const { video, mode, showComments, activePicker } = state;
              const pmeta    = PM[video?.platform] || PM.youtube;

              return (
                <div key={sec.id} style={{ borderBottom: idx < WEBSITE_SECTIONS.length - 1 ? '1px solid var(--border)' : 'none' }}>

                  {/* Section row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', flexWrap: 'wrap' }}>

                    {/* Section label */}
                    <div style={{ minWidth: 130, flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                        {sec.label}
                      </div>
                      <div style={{ marginTop: 3 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '1px 7px',
                          borderRadius: 999, border: '1px solid var(--border)', color: 'var(--muted)',
                        }}>
                          /{sec.id}
                        </span>
                      </div>
                    </div>

                    {/* Current video preview */}
                    {video ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                        <div style={{
                          width: 72, height: 42, borderRadius: 6, overflow: 'hidden',
                          flexShrink: 0, background: 'var(--border)', position: 'relative',
                        }}>
                          <img src={video.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{
                            position: 'absolute', bottom: 2, right: 2,
                            background: 'rgba(0,0,0,0.7)', color: '#fff',
                            fontSize: 9, padding: '1px 4px', borderRadius: 3,
                          }}>
                            {video.dur}
                          </div>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontSize: 12, fontWeight: 600, color: 'var(--text)',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            maxWidth: 260,
                          }}>
                            {video.title}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
                            <PlatformBadge platform={video.platform} small />
                            <span style={{ fontSize: 10, color: 'var(--muted)' }}>{video.views} views</span>
                            {mode === 'auto' && (
                              <span style={{
                                fontSize: 10, fontWeight: 600, padding: '1px 6px',
                                borderRadius: 999, background: 'rgba(245,158,11,0.12)', color: 'var(--gold)',
                              }}>
                                Auto-matched
                              </span>
                            )}
                            {mode === 'manual' && (
                              <span style={{
                                fontSize: 10, fontWeight: 600, padding: '1px 6px',
                                borderRadius: 999, background: 'rgba(124,58,237,0.12)', color: 'var(--purple)',
                              }}>
                                Manual
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ flex: 1, fontSize: 12, color: 'var(--muted)' }}>No content assigned</div>
                    )}

                    {/* Action buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>

                      {/* Comments toggle */}
                      <button
                        onClick={() => toggleComments(sec.id)}
                        title={showComments ? 'Hide comments on this section' : 'Show comments on this section'}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          padding: '5px 10px', borderRadius: 7, border: '1px solid var(--border)',
                          background: showComments ? 'rgba(16,185,129,0.1)' : 'var(--surface2)',
                          color: showComments ? 'var(--green)' : 'var(--muted)',
                          cursor: 'pointer', fontSize: 11, fontWeight: 600, transition: 'all 0.15s',
                        }}
                      >
                        <MessageSquare size={12} />
                        {showComments ? 'Comments On' : 'Comments Off'}
                      </button>

                      {/* Reset to auto */}
                      {mode === 'manual' && (
                        <button
                          onClick={() => resetToAuto(sec.id)}
                          title="Reset to auto-match"
                          style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            padding: '5px 10px', borderRadius: 7, border: '1px solid var(--border)',
                            background: 'var(--surface2)', color: 'var(--muted)',
                            cursor: 'pointer', fontSize: 11, fontWeight: 600, transition: 'all 0.15s',
                          }}
                        >
                          <RotateCcw size={12} /> Auto
                        </button>
                      )}

                      {/* Change video */}
                      <button
                        onClick={() => togglePicker(sec.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          padding: '5px 10px', borderRadius: 7,
                          border: activePicker ? '1px solid var(--purple)' : '1px solid var(--border)',
                          background: activePicker ? 'rgba(124,58,237,0.12)' : 'var(--surface2)',
                          color: activePicker ? 'var(--purple)' : 'var(--text)',
                          cursor: 'pointer', fontSize: 11, fontWeight: 600, transition: 'all 0.15s',
                        }}
                      >
                        <PenLine size={12} />
                        Change
                        {activePicker ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      </button>
                    </div>
                  </div>

                  {/* Inline video picker */}
                  {activePicker && (
                    <div style={{
                      margin: '0 18px 16px',
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: 10, overflow: 'hidden',
                    }}>
                      {/* Picker header */}
                      <div style={{
                        padding: '10px 14px', borderBottom: '1px solid var(--border)',
                        fontSize: 12, fontWeight: 600, color: 'var(--text)',
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        <Wand2 size={13} style={{ color: 'var(--purple)' }} />
                        Pick a video or reel for <strong>{sec.label}</strong>
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)', fontWeight: 400 }}>
                          Click any video to assign it
                        </span>
                      </div>

                      {/* Video grid with built-in platform filter */}
                      <PickerGrid
                        sectionTag={sec.tag}
                        library={library}
                        current={video}
                        onSelect={v => setSectionVideo(sec.id, v)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2 — CONNECTIONS
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'connections' && (
        <div className="a-card">
          <div className="a-card-header">
            <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link2 size={15} style={{ color: 'var(--purple)' }} />
              Platform Connections
            </div>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              {connections.filter(p => p.connected).length} / {connections.length} connected
            </span>
          </div>
          <div className="a-card-body">
            <div className="two-col" style={{ gap: 14 }}>
              {connections.map(p => {
                const meta = PM[p.id];
                const { Icon } = meta;
                return (
                  <div key={p.id} className="platform-conn-card">
                    <div className="platform-conn-badge-wrap">
                      <span className={`badge ${p.connected ? 'badge-published' : 'badge-draft'}`}
                        style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {p.connected ? <><CheckCircle size={10} /> Connected</> : <><XCircle size={10} /> Not connected</>}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{
                        background: meta.bg, color: meta.color, width: 36, height: 36,
                        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="platform-name">{meta.label}</div>
                        {p.handle && <div className="platform-handle">{p.handle}</div>}
                      </div>
                    </div>
                    {p.connected ? (
                      <>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div>
                            <div className="platform-stat-big">{p.stat}</div>
                            <div className="platform-stat-label">{p.statLabel}</div>
                          </div>
                          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 14 }}>
                            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>{p.keyLabel}</div>
                            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text)', letterSpacing: 1 }}>{p.keyMasked}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>
                          Last sync: <span style={{ color: 'var(--green)' }}>{p.lastSync}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-danger btn-sm" onClick={() => disconnect(p.id)}>Disconnect</button>
                          <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <RefreshCw size={12} /> Sync
                          </button>
                        </div>
                      </>
                    ) : (
                      <div style={{ paddingTop: 6 }}>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>Not connected. Click to authenticate.</div>
                        <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Plus size={12} /> Connect {meta.label}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3 — VIDEO LIBRARY
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'library' && (
        <div className="a-card">
          <div className="a-card-header">
            <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Youtube size={15} style={{ color: 'var(--red)' }} />
              Video Library
            </div>
            <button
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => setAddOpen(!addOpen)}
            >
              <Plus size={13} /> Add Video
            </button>
          </div>

          {addOpen && (
            <div style={{ margin: '0 18px 16px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Add video to library</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Platform</label>
                    <select value={newPlatform} onChange={e => setNewPlatform(e.target.value)}
                      style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 7, padding: '8px 12px', color: 'var(--text)', fontSize: 13, outline: 'none' }}>
                      {Object.entries(PM).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Video URL</label>
                    <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Paste video URL…"
                      style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 7, padding: '8px 12px', color: 'var(--text)', fontSize: 13, outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Title</label>
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Video title…"
                    style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 7, padding: '8px 12px', color: 'var(--text)', fontSize: 13, outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setAddOpen(false)}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={addVideo}>Add to Library</button>
                </div>
              </div>
            </div>
          )}

          {/* Platform tab filter */}
          <LibraryView library={library} onRemove={id => setLibrary(prev => prev.filter(v => v.id !== id))} />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 4 — AUTO-PUBLISH
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'autopublish' && (
        <div className="a-card">
          <div className="a-card-header">
            <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={15} style={{ color: 'var(--gold)' }} /> Auto-Publish Settings
            </div>
          </div>
          <div className="a-card-body">
            {AUTO_PUBLISH.map(ap => (
              <div key={ap.id} className="setting-row">
                <div className="setting-info">
                  <div className="setting-name">{ap.label}</div>
                  <div className="setting-desc">{ap.desc}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={toggles[ap.id]} onChange={() => setToggles(prev => ({ ...prev, [ap.id]: !prev[ap.id] }))} />
                  <span className="toggle-slider" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 5 — LOGS
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === 'logs' && (
        <div className="a-card">
          <div className="a-card-header">
            <div className="a-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={15} style={{ color: 'var(--blue)' }} /> Webhook Logs
            </div>
            <button className="btn btn-ghost btn-sm">Export</button>
          </div>
          <div className="a-table-wrap">
            <table>
              <thead><tr><th>Timestamp</th><th>Platform</th><th>Action</th><th>Status</th></tr></thead>
              <tbody>
                {WEBHOOK_LOGS.map((log, i) => (
                  <tr key={i}>
                    <td className="muted" style={{ fontFamily: 'monospace', fontSize: 12 }}>{log.ts}</td>
                    <td style={{ fontWeight: 600 }}>{log.platform}</td>
                    <td>{log.action}</td>
                    <td><span className={`badge ${log.status === 'Success' ? 'badge-published' : 'badge-breaking'}`}>{log.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Picker grid sub-component ─────────────────────────────────────────────── */
function PickerGrid({ sectionTag, library, current, onSelect }) {
  const [filterPlatform, setFilterPlatform] = useState('all');

  const sorted = [...library].sort((a, b) => {
    const aMatch = a.tags.includes(sectionTag) ? -1 : 1;
    const bMatch = b.tags.includes(sectionTag) ? -1 : 1;
    return aMatch - bMatch;
  });

  const filtered = filterPlatform === 'all'
    ? sorted
    : sorted.filter(v => v.platform === filterPlatform);

  return (
    <>
      {/* Platform filter */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 14px 0', overflowX: 'auto' }}>
        {['all', 'youtube', 'facebook', 'tiktok', 'instagram'].map(p => {
          const isAll = p === 'all';
          const m = !isAll ? PM[p] : null;
          const isActive = filterPlatform === p;
          return (
            <button
              key={p}
              onClick={() => setFilterPlatform(p)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', border: '1px solid var(--border)', borderRadius: 999,
                background: isActive ? (isAll ? 'rgba(124,58,237,0.12)' : m.bg) : 'var(--surface)',
                color: isActive ? (isAll ? 'var(--purple)' : m.color) : 'var(--muted)',
                cursor: 'pointer', fontSize: 11, fontWeight: 600, transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {!isAll && <m.Icon size={11} />}
              {isAll ? 'All' : m.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ padding: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, maxHeight: 320, overflowY: 'auto' }}>
        {filtered.map(v => {
          const m = PM[v.platform];
          const isSelected = current?.id === v.id;
          const isTikTok = v.platform === 'tiktok' || v.platform === 'instagram';
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v)}
              style={{
                textAlign: 'left', cursor: 'pointer', borderRadius: 8, overflow: 'hidden',
                border: isSelected ? `2px solid var(--purple)` : '2px solid var(--border)',
                background: isSelected ? 'rgba(124,58,237,0.06)' : 'var(--surface)',
                padding: 0, transition: 'all 0.15s',
              }}
            >
              <div style={{ position: 'relative', height: isTikTok ? 120 : 90 }}>
                <img src={v.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {isSelected && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(124,58,237,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircle size={24} color="#fff" />
                  </div>
                )}
                <div style={{
                  position: 'absolute', bottom: 4, right: 4,
                  background: 'rgba(0,0,0,0.72)', color: '#fff',
                  fontSize: 9, padding: '1px 5px', borderRadius: 3,
                }}>
                  {v.dur}
                </div>
              </div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: 'var(--text)',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  marginBottom: 5, lineHeight: 1.35,
                }}>
                  {v.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    fontSize: 9, fontWeight: 700, padding: '1px 5px',
                    borderRadius: 999, background: m.bg, color: m.color,
                  }}>
                    <m.Icon size={8} /> {m.short}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>{v.views}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ─── Library view sub-component ────────────────────────────────────────────── */
function LibraryView({ library, onRemove }) {
  const [tab, setTab] = useState('youtube');
  const filtered = library.filter(v => v.platform === tab);

  return (
    <>
      <div style={{ display: 'flex', gap: 2, padding: '0 18px', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
        {['youtube', 'facebook', 'tiktok', 'instagram'].map(p => {
          const m = PM[p];
          const count = library.filter(v => v.platform === p).length;
          const isActive = tab === p;
          return (
            <button key={p} onClick={() => setTab(p)} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px',
              border: 'none', background: 'transparent', cursor: 'pointer',
              fontSize: 13, fontWeight: isActive ? 700 : 500,
              color: isActive ? m.color : 'var(--muted)',
              borderBottom: isActive ? `2px solid ${m.color}` : '2px solid transparent',
              marginBottom: -1, transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}>
              <m.Icon size={14} /> {m.label}
              <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 999, background: m.bg, color: m.color }}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="a-card-body">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--muted)', fontSize: 13 }}>
            No videos in library for {PM[tab].label}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(video => {
              const m = PM[video.platform];
              return (
                <div key={video.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--surface2)', borderRadius: 10, padding: '10px 12px',
                  border: '1px solid var(--border)',
                }}>
                  <GripVertical size={14} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                  <div style={{ width: 72, height: 42, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={video.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
                      {video.title}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: m.bg, color: m.color, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <m.Icon size={9} /> {m.label}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>{video.views} views · {video.dur}</span>
                    </div>
                  </div>
                  <a href={video.url} target="_blank" rel="noreferrer" style={{
                    background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6,
                    width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--muted)', textDecoration: 'none', flexShrink: 0,
                  }}>
                    <ExternalLink size={12} />
                  </a>
                  <button onClick={() => onRemove(video.id)} style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6,
                    width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--red)', flexShrink: 0,
                  }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
