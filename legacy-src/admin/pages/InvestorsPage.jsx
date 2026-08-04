import React from 'react';

const PARTNERS = [
  { name: 'Channel NewsAsia (CNA)', type: 'Content' },
  { name: 'Dialog Axiata PLC', type: 'Technology' },
  { name: 'Bank of Ceylon', type: 'Financial' },
  { name: 'Sri Lanka Telecom', type: 'Distribution' },
  { name: 'Colombo Stock Exchange', type: 'Financial' },
  { name: 'University of Kelaniya', type: 'Academic' },
  { name: 'SLRC (Rupavahini)', type: 'Media' },
  { name: 'Lanka Business Online', type: 'Digital' },
];

const REPORTS = [
  { year: 2025, title: 'Annual Report 2025', size: '4.2 MB', highlight: 'Revenue up 22% YoY' },
  { year: 2024, title: 'Annual Report 2024', size: '3.8 MB', highlight: 'Digital audience grew 340%' },
  { year: 2023, title: 'Annual Report 2023', size: '3.1 MB', highlight: 'Launched YouTube channel' },
];

const UPDATES = [
  { title: 'Q1 2026 Performance Update', date: '2026-04-15', type: 'Quarterly Report' },
  { title: 'Digital Transformation Roadmap Announced', date: '2026-03-01', type: 'Strategic Update' },
  { title: 'New Studio Complex Groundbreaking', date: '2026-01-20', type: 'Capital Update' },
  { title: 'FY2025 Full Year Results', date: '2026-02-28', type: 'Annual Results' },
];

const HIGHLIGHTS = [
  { label: 'Revenue Growth', val: '+22%', pct: 88, color: 'green' },
  { label: 'YouTube Subscribers', val: '359K', pct: 72, color: 'purple' },
  { label: 'Digital Revenue Share', val: '34%', pct: 68, color: 'blue' },
  { label: 'Ad Inventory Fill Rate', val: '87%', pct: 87, color: 'gold' },
];

export default function InvestorsPage() {
  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Investors & Partners</div>
          <div className="a-page-sub">Manage investor relations, strategic partnerships, and annual reports</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Add Partner</button>
          <button className="btn btn-primary">Post Investor Update</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="a-stat-card green">
          <div className="a-stat-value">+22%</div>
          <div className="a-stat-label">Revenue Growth YoY</div>
        </div>
        <div className="a-stat-card purple">
          <div className="a-stat-value">359K</div>
          <div className="a-stat-label">YouTube Subscribers</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-value">8</div>
          <div className="a-stat-label">Strategic Partners</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-value">LKR 48M</div>
          <div className="a-stat-label">Est. Revenue 2026</div>
        </div>
      </div>

      {/* Partner Logos */}
      <div className="a-card" style={{ marginBottom: 20 }}>
        <div className="a-card-header">
          <span className="a-card-title">Strategic Partners</span>
          <button className="btn btn-ghost btn-sm">+ Add Partner</button>
        </div>
        <div className="a-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {PARTNERS.map(p => (
              <div className="investor-partner-box" key={p.name}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--border)' }}>{p.type} Partner</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two column */}
      <div className="two-col" style={{ marginBottom: 20 }}>
        {/* Annual Reports */}
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">Annual Reports</span>
            <button className="btn btn-ghost btn-sm">+ Upload</button>
          </div>
          <div className="a-card-body">
            {REPORTS.map(r => (
              <div className="report-item" key={r.year}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, background: 'var(--surface2)', border: '1px solid var(--border)',
                    borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                  }}>📊</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.size} · {r.highlight}</div>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm">⬇ Download</button>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Updates */}
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">Investor Updates</span>
            <button className="btn btn-primary btn-sm">+ New Update</button>
          </div>
          <div className="a-card-body">
            {UPDATES.map(u => (
              <div className="report-item" key={u.title}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 3 }}>{u.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{u.date} · <span className="badge badge-cat" style={{ fontSize: 10 }}>{u.type}</span></div>
                </div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost btn-sm">Edit</button>
                  <button className="btn btn-ghost btn-sm">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Highlights */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Performance Highlights — 2026</span>
        </div>
        <div className="a-card-body">
          <div className="chart-bar-wrap">
            {HIGHLIGHTS.map(h => (
              <div className="chart-bar-row" key={h.label}>
                <div className="chart-bar-label">{h.label}</div>
                <div className="chart-bar-track">
                  <div className={`chart-bar-fill ${h.color}`} style={{ width: `${h.pct}%` }} />
                </div>
                <div className="chart-bar-val" style={{ color: 'var(--text)' }}>{h.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
