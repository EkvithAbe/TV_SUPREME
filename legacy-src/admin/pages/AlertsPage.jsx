import { useState } from 'react';

const TICKER_ITEMS = [
  { id: 1, text: 'BREAKING: T20 World Cup 2026 Sri Lanka Squad Announced', lang: 'EN', priority: 'Breaking', expires: '2026-06-12 20:00' },
  { id: 2, text: 'ශ්‍රී ලංකා කණ්ඩායම නිවේදනය කෙරේ', lang: 'SI', priority: 'Breaking', expires: '2026-06-12 20:00' },
  { id: 3, text: 'Economy grows 3.2% in Q1 2026 — Central Bank report', lang: 'EN', priority: 'Normal', expires: '2026-06-13 08:00' },
  { id: 4, text: 'நாடாளுமன்ற கூட்டம் நாளை நடைபெறும்', lang: 'TA', priority: 'Normal', expires: '2026-06-13 10:00' },
  { id: 5, text: 'TV Supreme 24/7 Live Stream Now Available on YouTube', lang: 'EN', priority: 'Normal', expires: '2026-06-15 00:00' },
];

const PUSH_NOTIFS = [
  { ts: '2026-06-12 14:00', title: 'Sri Lanka vs India T20', msg: 'Live match starts in 30 mins!', target: 'Sports', sent: 12450, opens: 4234 },
  { ts: '2026-06-12 10:30', title: 'Budget 2026 Live Coverage', msg: 'Watch live on TV Supreme now', target: 'All', sent: 12450, opens: 3890 },
  { ts: '2026-06-11 19:00', title: 'Evening News at 7PM', msg: 'Top stories from today', target: 'News', sent: 8200, opens: 2100 },
  { ts: '2026-06-11 14:00', title: 'New Drama Series Tonight', msg: 'Premiere at 8:30 PM', target: 'All', sent: 12450, opens: 5670 },
  { ts: '2026-06-10 08:00', title: 'Good Morning Sri Lanka', msg: 'Morning news roundup', target: 'News', sent: 7300, opens: 1890 },
];

const SMS_RECENT = [
  { ts: '2026-06-12 14:00', recipient: 'All VIP', message: 'Exclusive match coverage starts now!', status: 'Sent', count: 1240 },
  { ts: '2026-06-12 09:30', recipient: 'Breaking List', message: 'Budget 2026 highlights — watch now', status: 'Sent', count: 890 },
  { ts: '2026-06-11 18:00', recipient: 'All', message: 'Evening news at 7PM', status: 'Sent', count: 2100 },
  { ts: '2026-06-10 07:00', recipient: 'All', message: 'Good morning! Today\'s top stories', status: 'Sent', count: 1980 },
];

const EMAIL_CAMPAIGNS = [
  { ts: '2026-06-10', subject: 'Weekly Highlights — June 2026', sent: 8934, opens: 3456, openRate: '38.7%', clicks: 890, clickRate: '9.9%', status: 'Sent' },
  { ts: '2026-06-03', subject: 'May Wrap-up & June Schedule', sent: 8800, opens: 3120, openRate: '35.5%', clicks: 720, clickRate: '8.2%', status: 'Sent' },
  { ts: '2026-05-27', subject: 'Special: Budget Coverage Guide', sent: 8650, opens: 4230, openRate: '48.9%', clicks: 1450, clickRate: '16.8%', status: 'Sent' },
  { ts: '2026-05-20', subject: 'Sports Season Kickoff 2026', sent: 8500, opens: 2890, openRate: '34.0%', clicks: 670, clickRate: '7.9%', status: 'Sent' },
  { ts: '2026-05-13', subject: 'New Drama Premieres This Week', sent: 8400, opens: 3670, openRate: '43.7%', clicks: 1230, clickRate: '14.6%', status: 'Sent' },
];

const TABS = ['Breaking Ticker', 'Push Notifications', 'SMS Alerts', 'Email Broadcasts'];

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('Breaking Ticker');
  const [tickerActive, setTickerActive] = useState(true);
  const [tickers, setTickers] = useState(TICKER_ITEMS);
  const [newTicker, setNewTicker] = useState({ text: '', lang: 'EN', priority: 'Normal', duration: '24' });

  function addTicker() {
    if (!newTicker.text.trim()) return;
    const now = new Date();
    now.setHours(now.getHours() + parseInt(newTicker.duration));
    const expStr = now.toISOString().slice(0, 16).replace('T', ' ');
    setTickers(prev => [...prev, {
      id: Date.now(),
      text: newTicker.text,
      lang: newTicker.lang,
      priority: newTicker.priority,
      expires: expStr,
    }]);
    setNewTicker({ text: '', lang: 'EN', priority: 'Normal', duration: '24' });
  }

  function deleteTicker(id) {
    setTickers(prev => prev.filter(t => t.id !== id));
  }

  const tickerMarquee = tickers.map(t => t.text).join('  ●  ');

  return (
    <div className="a-page">
      {/* Tabs */}
      <div className="a-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`a-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'Breaking Ticker' && '📢 '}
            {tab === 'Push Notifications' && '🔔 '}
            {tab === 'SMS Alerts' && '📱 '}
            {tab === 'Email Broadcasts' && '📧 '}
            {tab}
          </button>
        ))}
      </div>

      {/* ===== BREAKING TICKER ===== */}
      {activeTab === 'Breaking Ticker' && (
        <>
          {/* Live Preview */}
          <div className="a-card">
            <div className="a-card-header">
              <span className="a-card-title">📢 Live Ticker Preview</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>Ticker Active</span>
                <label className="toggle">
                  <input type="checkbox" checked={tickerActive} onChange={() => setTickerActive(!tickerActive)} />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>
            <div className="a-card-body" style={{ padding: 0 }}>
              <div className="ticker-preview">
                <span className="ticker-label">BREAKING</span>
                {tickerActive ? (
                  <div className="ticker-scroll-wrap">
                    <div className="ticker-scroll-inner">
                      {tickerMarquee} &nbsp;&nbsp;&nbsp; {tickerMarquee}
                    </div>
                  </div>
                ) : (
                  <span style={{ fontSize: 12, color: 'var(--muted)', padding: '0 16px' }}>
                    Ticker is disabled
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Add Ticker Form */}
          <div className="a-card">
            <div className="a-card-header">
              <span className="a-card-title">➕ Add Ticker Item</span>
            </div>
            <div className="a-card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: 10, alignItems: 'end' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Ticker Text</label>
                  <input
                    className="form-input"
                    placeholder="Enter breaking news text..."
                    value={newTicker.text}
                    onChange={e => setNewTicker(prev => ({ ...prev, text: e.target.value }))}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Language</label>
                  <select className="filter-select" value={newTicker.lang}
                    onChange={e => setNewTicker(prev => ({ ...prev, lang: e.target.value }))}>
                    <option value="EN">English</option>
                    <option value="SI">Sinhala</option>
                    <option value="TA">Tamil</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Priority</label>
                  <select className="filter-select" value={newTicker.priority}
                    onChange={e => setNewTicker(prev => ({ ...prev, priority: e.target.value }))}>
                    <option>Breaking</option>
                    <option>Normal</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Duration (hrs)</label>
                  <select className="filter-select" value={newTicker.duration}
                    onChange={e => setNewTicker(prev => ({ ...prev, duration: e.target.value }))}>
                    <option value="1">1 hr</option>
                    <option value="6">6 hrs</option>
                    <option value="12">12 hrs</option>
                    <option value="24">24 hrs</option>
                    <option value="48">48 hrs</option>
                  </select>
                </div>
                <button className="btn btn-primary" onClick={addTicker}>Add</button>
              </div>
            </div>
          </div>

          {/* Active Tickers Table */}
          <div className="a-card">
            <div className="a-card-header">
              <span className="a-card-title">📋 Active Tickers</span>
              <span className="badge badge-cat">{tickers.length} items</span>
            </div>
            <div className="a-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Text</th>
                    <th>Language</th>
                    <th>Priority</th>
                    <th>Expires</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tickers.map(t => (
                    <tr key={t.id}>
                      <td style={{ maxWidth: 300 }}>
                        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 280 }}>
                          {t.text}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${t.lang === 'EN' ? 'badge-blue' : t.lang === 'SI' ? 'badge-cat' : 'badge-gold'}`}>
                          {t.lang}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${t.priority === 'Breaking' ? 'badge-breaking' : 'badge-inactive'}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="muted" style={{ fontSize: 12 }}>{t.expires}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTicker(t.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ===== PUSH NOTIFICATIONS ===== */}
      {activeTab === 'Push Notifications' && (
        <>
          <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
            <div className="a-stat-card blue">
              <div className="a-stat-icon">📲</div>
              <div className="a-stat-value">12,450</div>
              <div className="a-stat-label">Push Subscribers</div>
            </div>
            <div className="a-stat-card green">
              <div className="a-stat-icon">📤</div>
              <div className="a-stat-value">3</div>
              <div className="a-stat-label">Sent Today</div>
            </div>
            <div className="a-stat-card purple">
              <div className="a-stat-icon">👁️</div>
              <div className="a-stat-value">34%</div>
              <div className="a-stat-label">Avg. Open Rate</div>
            </div>
          </div>

          <div className="two-col">
            <div className="a-card">
              <div className="a-card-header">
                <span className="a-card-title">📤 Send Notification</span>
              </div>
              <div className="a-card-body">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input className="form-input" placeholder="Notification title..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea" placeholder="Notification body..." />
                </div>
                <div className="two-col" style={{ gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Target Audience</label>
                    <select className="filter-select" style={{ width: '100%' }}>
                      <option>All Subscribers</option>
                      <option>News Subscribers</option>
                      <option>Sports</option>
                      <option>Religion</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Schedule</label>
                    <select className="filter-select" style={{ width: '100%' }}>
                      <option>Send Now</option>
                      <option>Schedule Later</option>
                    </select>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  🔔 Send Notification
                </button>
              </div>
            </div>

            <div className="a-card">
              <div className="a-card-header">
                <span className="a-card-title">📋 Recent Notifications</span>
              </div>
              <div className="a-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Target</th>
                      <th>Opens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PUSH_NOTIFS.map((n, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: 12 }}>{n.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{n.ts}</div>
                        </td>
                        <td><span className="badge badge-cat">{n.target}</span></td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--green)' }}>
                            {((n.opens / n.sent) * 100).toFixed(0)}%
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{n.opens.toLocaleString()}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== SMS ALERTS ===== */}
      {activeTab === 'SMS Alerts' && (
        <>
          <div style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}>
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>● Connected</span>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>SMS Gateway: Dialog Axiata / Mobitel</span>
          </div>

          <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
            <div className="a-stat-card green">
              <div className="a-stat-icon">💳</div>
              <div className="a-stat-value">4,230</div>
              <div className="a-stat-label">Credits Remaining</div>
            </div>
            <div className="a-stat-card blue">
              <div className="a-stat-icon">📱</div>
              <div className="a-stat-value">891</div>
              <div className="a-stat-label">Sent This Month</div>
            </div>
            <div className="a-stat-card gold">
              <div className="a-stat-icon">✅</div>
              <div className="a-stat-value">98.4%</div>
              <div className="a-stat-label">Delivery Rate</div>
            </div>
          </div>

          <div className="two-col">
            <div className="a-card">
              <div className="a-card-header">
                <span className="a-card-title">📱 Quick Send SMS</span>
              </div>
              <div className="a-card-body">
                <div className="form-group">
                  <label className="form-label">Recipient Group</label>
                  <select className="filter-select" style={{ width: '100%' }}>
                    <option>All Subscribers</option>
                    <option>VIP Members</option>
                    <option>Breaking News List</option>
                    <option>Single Number</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message (160 chars)</label>
                  <textarea className="form-input form-textarea" placeholder="Enter SMS message..." maxLength={160} />
                  <span className="form-hint">Max 160 characters per SMS</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  📱 Send SMS
                </button>
              </div>
            </div>

            <div className="a-card">
              <div className="a-card-header">
                <span className="a-card-title">📋 Recent SMS</span>
              </div>
              <div className="a-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Message</th>
                      <th>Count</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SMS_RECENT.map((s, i) => (
                      <tr key={i}>
                        <td className="muted" style={{ fontSize: 11 }}>{s.ts}</td>
                        <td style={{ maxWidth: 180 }}>
                          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180, fontSize: 12 }}>
                            {s.message}
                          </span>
                        </td>
                        <td style={{ fontWeight: 700 }}>{s.count.toLocaleString()}</td>
                        <td><span className="badge badge-published">{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== EMAIL BROADCASTS ===== */}
      {activeTab === 'Email Broadcasts' && (
        <>
          <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
            <div className="a-stat-card purple">
              <div className="a-stat-icon">📧</div>
              <div className="a-stat-value">8,934</div>
              <div className="a-stat-label">Email Subscribers</div>
            </div>
            <div className="a-stat-card green">
              <div className="a-stat-icon">📬</div>
              <div className="a-stat-value">38.7%</div>
              <div className="a-stat-label">Avg. Open Rate</div>
            </div>
            <div className="a-stat-card blue">
              <div className="a-stat-icon">🖱️</div>
              <div className="a-stat-value">9.9%</div>
              <div className="a-stat-label">Avg. Click Rate</div>
            </div>
            <div className="a-stat-card gold">
              <div className="a-stat-icon">📤</div>
              <div className="a-stat-value">5</div>
              <div className="a-stat-label">Campaigns (30d)</div>
            </div>
          </div>

          <div className="a-card">
            <div className="a-card-header">
              <span className="a-card-title">📧 Campaign History</span>
              <button className="btn btn-primary btn-sm">+ New Campaign</button>
            </div>
            <div className="a-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Sent</th>
                    <th>Open Rate</th>
                    <th>Click Rate</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {EMAIL_CAMPAIGNS.map((c, i) => (
                    <tr key={i}>
                      <td className="muted">{c.ts}</td>
                      <td style={{ fontWeight: 600 }}>{c.subject}</td>
                      <td>{c.sent.toLocaleString()}</td>
                      <td style={{ color: 'var(--green)', fontWeight: 700 }}>{c.openRate}</td>
                      <td style={{ color: 'var(--blue)', fontWeight: 700 }}>{c.clickRate}</td>
                      <td><span className="badge badge-published">{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
