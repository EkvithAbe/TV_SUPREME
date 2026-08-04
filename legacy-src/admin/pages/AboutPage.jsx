import React, { useState } from 'react';

const LEADERSHIP = [
  {
    group: 'Board of Directors',
    icon: '🏛️',
    members: ['Chairperson — Mr. W.A.D. Perera', 'Director — Mrs. S. Jayawardena', 'Independent Director — Mr. R. Fernando', 'Director — Mr. N. Wickramasinghe'],
  },
  {
    group: 'Executive Management',
    icon: '👔',
    members: ['CEO — Ms. P. Rathnayake', 'COO — Mr. K. Silva', 'CFO — Mr. D. Bandara', 'CMO — Ms. A. Wijesekara'],
  },
  {
    group: 'Division Heads',
    icon: '📺',
    members: ['News Director — Mr. C. Perera', 'Head of Production — Ms. N. Senanayake', 'Digital Head — Mr. M. Fernando', 'Head of Sales — Ms. Y. Ranasinghe'],
  },
];

export default function AboutPage() {
  const [editOverview, setEditOverview] = useState(false);
  const [overview, setOverview] = useState(
    'TV Supreme (tvsupreme.lk) is Sri Lanka\'s premier private broadcast network, delivering trusted news, compelling entertainment, and insightful current affairs content to audiences across the island and globally via digital platforms. Established with the mission to inform, educate, and entertain, TV Supreme operates 24 hours a day with a diverse portfolio of programs spanning news, dramas, lifestyle, religious, sports, and infotainment content. With over 359,000 YouTube subscribers and a growing digital footprint, TV Supreme is at the forefront of Sri Lanka\'s media evolution.'
  );

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">About TV Supreme</div>
          <div className="a-page-sub">Manage corporate information, leadership, and brand assets</div>
        </div>
        <button className="btn btn-primary">Save All Changes</button>
      </div>

      {/* Company Overview */}
      <div className="a-card" style={{ marginBottom: 20 }}>
        <div className="a-card-header">
          <span className="a-card-title">Company Overview</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setEditOverview(!editOverview)}>
            {editOverview ? '✓ Save' : 'Edit'}
          </button>
        </div>
        <div className="a-card-body">
          {editOverview ? (
            <textarea
              className="form-input form-textarea"
              style={{ minHeight: 120 }}
              value={overview}
              onChange={e => setOverview(e.target.value)}
            />
          ) : (
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 14 }}>{overview}</p>
          )}
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="two-col" style={{ marginBottom: 20 }}>
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">🎯 Vision</span>
            <button className="btn btn-ghost btn-sm">Edit</button>
          </div>
          <div className="a-card-body">
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 14 }}>
              To be Sri Lanka's most trusted and innovative media network — delivering accurate, unbiased news and premium entertainment that enriches the lives of all Sri Lankans, both at home and abroad.
            </p>
          </div>
        </div>
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">🚀 Mission</span>
            <button className="btn btn-ghost btn-sm">Edit</button>
          </div>
          <div className="a-card-body">
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 14 }}>
              To inform, educate, and entertain our diverse audience through high-quality broadcasting and digital content, while upholding the highest standards of journalistic integrity, cultural sensitivity, and creative excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="a-card" style={{ marginBottom: 20 }}>
        <div className="a-card-header">
          <span className="a-card-title">Leadership Team</span>
          <button className="btn btn-ghost btn-sm">Edit Team</button>
        </div>
        <div className="a-card-body">
          <div className="three-col">
            {LEADERSHIP.map(group => (
              <div key={group.group} style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: 16,
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{group.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 12 }}>{group.group}</div>
                {group.members.map((m, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--muted)', padding: '4px 0', borderBottom: i < group.members.length - 1 ? '1px solid rgba(46,31,69,0.5)' : 'none' }}>
                    {m}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kit */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Media Kit & Brand Assets</span>
          <button className="btn btn-primary btn-sm">+ Upload Asset</button>
        </div>
        <div className="a-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { icon: '📄', title: 'Company Profile 2026', size: '3.2 MB', type: 'PDF' },
              { icon: '🎨', title: 'Brand Guidelines v3', size: '8.7 MB', type: 'PDF' },
              { icon: '🖼️', title: 'Logo Package (All Formats)', size: '12.4 MB', type: 'ZIP' },
              { icon: '📊', title: 'Audience Media Data', size: '1.8 MB', type: 'PDF' },
              { icon: '📸', title: 'Press Photos Pack', size: '45 MB', type: 'ZIP' },
              { icon: '📋', title: 'Rate Card 2026', size: '2.1 MB', type: 'PDF' },
            ].map(asset => (
              <div key={asset.title} style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <div style={{ fontSize: 28 }}>{asset.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{asset.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{asset.type} · {asset.size}</div>
                </div>
                <button className="btn btn-ghost btn-sm">⬇</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
