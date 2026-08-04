import React, { useState } from 'react';

const AD_SLOTS = [
  { id: 1, position: 'Homepage Banner', advertiser: 'Dialog Axiata', type: 'Banner', start: '2026-06-01', end: '2026-06-30', impressions: 124800, status: 'Active' },
  { id: 2, position: 'News Sidebar', advertiser: 'Sampath Bank', type: 'Banner', start: '2026-05-15', end: '2026-07-15', impressions: 89200, status: 'Active' },
  { id: 3, position: 'Video Pre-roll', advertiser: 'SLT-Mobitel', type: 'Video', start: '2026-06-01', end: '2026-08-31', impressions: 203400, status: 'Active' },
  { id: 4, position: 'Program Sponsor', advertiser: 'Commercial Bank', type: 'Sponsored', start: '2026-06-10', end: '2026-09-10', impressions: 67300, status: 'Active' },
  { id: 5, position: 'Breaking News Bar', advertiser: 'Cargills Food City', type: 'Banner', start: '2026-06-15', end: '2026-07-14', impressions: 0, status: 'Pending' },
  { id: 6, position: 'Footer Banner', advertiser: 'Nawaloka Hospital', type: 'Banner', start: '2026-07-01', end: '2026-09-30', impressions: 0, status: 'Pending' },
  { id: 7, position: 'Mobile Interstitial', advertiser: 'Sinopec Lanka', type: 'Banner', start: '2026-05-01', end: '2026-05-31', impressions: 54100, status: 'Expired' },
  { id: 8, position: 'Newsletter Header', advertiser: 'John Keells Holdings', type: 'Banner', start: '2026-04-01', end: '2026-04-30', impressions: 32800, status: 'Expired' },
];

export default function AdsPage() {
  const [showModal, setShowModal] = useState(false);

  const active = AD_SLOTS.filter(a => a.status === 'Active').length;
  const pending = AD_SLOTS.filter(a => a.status === 'Pending').length;

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Advertisements & Business</div>
          <div className="a-page-sub">Manage ad inventory, advertisers, and revenue tracking</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(true)}>Request Proposal</button>
          <button className="btn btn-primary">+ New Ad Slot</button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="a-stat-card green">
          <div className="a-stat-icon">✅</div>
          <div className="a-stat-value">{active}</div>
          <div className="a-stat-label">Active Ads</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-icon">⏳</div>
          <div className="a-stat-value">{pending}</div>
          <div className="a-stat-label">Pending</div>
        </div>
        <div className="a-stat-card purple">
          <div className="a-stat-icon">💰</div>
          <div className="a-stat-value">LKR 245K</div>
          <div className="a-stat-label">Revenue This Month</div>
          <div className="a-stat-trend up">↑ 18% vs last month</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-icon">👁️</div>
          <div className="a-stat-value">484K</div>
          <div className="a-stat-label">Total Impressions</div>
        </div>
      </div>

      {/* Revenue chart */}
      <div className="a-card" style={{ marginBottom: 20 }}>
        <div className="a-card-header">
          <span className="a-card-title">Monthly Revenue — 2026</span>
        </div>
        <div className="a-card-body">
          <div className="chart-bar-wrap">
            {[
              { label: 'Jan', val: 180, pct: 73 },
              { label: 'Feb', val: 195, pct: 79 },
              { label: 'Mar', val: 210, pct: 85 },
              { label: 'Apr', val: 188, pct: 76 },
              { label: 'May', val: 220, pct: 89 },
              { label: 'Jun', val: 245, pct: 100 },
            ].map(m => (
              <div className="chart-bar-row" key={m.label}>
                <div className="chart-bar-label">{m.label} 2026</div>
                <div className="chart-bar-track">
                  <div className="chart-bar-fill gold" style={{ width: `${m.pct}%` }} />
                </div>
                <div className="chart-bar-val">LKR {m.val}K</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ad Slots Table */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Ad Inventory ({AD_SLOTS.length} slots)</span>
          <div className="flex gap-8">
            <select className="filter-select">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Expired</option>
            </select>
          </div>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Advertiser</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Impressions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {AD_SLOTS.map(ad => (
                <tr key={ad.id}>
                  <td style={{ fontWeight: 600 }}>{ad.position}</td>
                  <td className="muted">{ad.advertiser}</td>
                  <td>
                    <span className={`badge ${
                      ad.type === 'Video' ? 'badge-pink' :
                      ad.type === 'Sponsored' ? 'badge-gold' : 'badge-blue'
                    }`}>{ad.type}</span>
                  </td>
                  <td className="muted">{ad.start}</td>
                  <td className="muted">{ad.end}</td>
                  <td style={{ fontWeight: 600 }}>{ad.impressions > 0 ? ad.impressions.toLocaleString() : '—'}</td>
                  <td>
                    <span className={`badge ${
                      ad.status === 'Active' ? 'badge-published' :
                      ad.status === 'Pending' ? 'badge-pending' : 'badge-draft'
                    }`}>{ad.status}</span>
                  </td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm">Stats</button>
                      <button className="btn btn-danger btn-sm">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proposal Modal */}
      {showModal && (
        <div className="a-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="a-modal" onClick={e => e.stopPropagation()}>
            <div className="a-modal-header">
              <span className="a-modal-title">Request Advertising Proposal</span>
              <button className="a-modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="a-modal-body">
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input className="form-input" placeholder="e.g. Dialog Axiata PLC" />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Email</label>
                <input className="form-input" type="email" placeholder="media@company.lk" />
              </div>
              <div className="form-group">
                <label className="form-label">Ad Type</label>
                <select className="form-input">
                  <option>Banner Ad</option>
                  <option>Video Pre-roll</option>
                  <option>Program Sponsorship</option>
                  <option>Breaking News Ticker</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Budget Range (LKR)</label>
                <select className="form-input">
                  <option>50K – 100K</option>
                  <option>100K – 250K</option>
                  <option>250K – 500K</option>
                  <option>500K+</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Message</label>
                <textarea className="form-input form-textarea" placeholder="Tell us about your campaign goals..." />
              </div>
            </div>
            <div className="a-modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Send Proposal Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
