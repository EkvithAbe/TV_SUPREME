import React, { useState } from 'react';
import { CONTACTS } from '../adminData';

const TABS = ['All', 'News Tips', 'Advertise', 'General', 'Complaints', 'Technical'];

function getTypeBadge(type) {
  const map = {
    'News Tip': 'badge-breaking',
    'Advertise': 'badge-gold',
    'General': 'badge-blue',
    'Complaint': 'badge-pink',
    'Technical': 'badge-cat',
  };
  return map[type] || 'badge-cat';
}

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [showReply, setShowReply] = useState(null);

  const filtered = activeTab === 'All'
    ? CONTACTS
    : CONTACTS.filter(c => {
        if (activeTab === 'News Tips') return c.type === 'News Tip';
        if (activeTab === 'Complaints') return c.type === 'Complaint';
        return c.type === activeTab;
      });

  const open = CONTACTS.filter(c => c.status === 'Open').length;
  const resolved = CONTACTS.filter(c => c.status === 'Resolved').length;
  const newsTips = CONTACTS.filter(c => c.type === 'News Tip').length;
  const advertise = CONTACTS.filter(c => c.type === 'Advertise').length;

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Contact Centre</div>
          <div className="a-page-sub">Manage all inbound inquiries, news tips, and advertising requests</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Export Inquiries</button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="a-stat-card blue">
          <div className="a-stat-value">{CONTACTS.length + 117}</div>
          <div className="a-stat-label">Total Inquiries</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-icon">⚡</div>
          <div className="a-stat-value">{open}</div>
          <div className="a-stat-label">Pending / Open</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-value">{resolved + 109}</div>
          <div className="a-stat-label">Resolved</div>
        </div>
        <div className="a-stat-card purple">
          <div className="a-stat-value">{newsTips + 21}</div>
          <div className="a-stat-label">News Tips</div>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex gap-8 flex-wrap mb-16">
        {[
          { label: 'Advertise Inquiries', count: advertise + 18, color: 'gold' },
          { label: 'Complaints', count: 2 + 8, color: 'pink' },
          { label: 'Technical Issues', count: 1 + 4, color: 'blue' },
          { label: 'General', count: 2 + 62, color: 'green' },
        ].map(chip => (
          <div key={chip.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8
          }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: `var(--${chip.color})` }}>{chip.count}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{chip.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="a-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`a-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Inquiries ({filtered.length} shown)</span>
          <div className="flex gap-8">
            <select className="filter-select">
              <option>All Status</option>
              <option>Open</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Contact</th>
                <th>Type</th>
                <th>Email</th>
                <th style={{ minWidth: 240 }}>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td><span className={`badge ${getTypeBadge(c.type)}`}>{c.type}</span></td>
                  <td className="muted" style={{ fontSize: 12 }}>{c.email}</td>
                  <td style={{ maxWidth: 280 }}>
                    <div style={{
                      fontSize: 12.5, color: 'var(--muted)', whiteSpace: 'normal',
                      lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {c.message}
                    </div>
                  </td>
                  <td className="muted" style={{ fontSize: 12 }}>{c.date}</td>
                  <td>
                    <span className={`badge ${c.status === 'Open' ? 'badge-open' : 'badge-resolved'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <button className="btn btn-primary btn-sm" style={{ fontSize: 11 }} onClick={() => setShowReply(c)}>
                        Reply
                      </button>
                      {c.status === 'Open' && (
                        <button className="btn btn-success btn-sm" style={{ fontSize: 11 }}>
                          ✓ Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {showReply && (
        <div className="a-modal-overlay" onClick={() => setShowReply(null)}>
          <div className="a-modal" onClick={e => e.stopPropagation()}>
            <div className="a-modal-header">
              <span className="a-modal-title">Reply to {showReply.name}</span>
              <button className="a-modal-close" onClick={() => setShowReply(null)}>×</button>
            </div>
            <div className="a-modal-body">
              <div style={{
                background: 'var(--surface2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6
              }}>
                <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 4 }}>Original message:</strong>
                {showReply.message}
              </div>
              <div className="form-group">
                <label className="form-label">Reply To</label>
                <input className="form-input" value={showReply.email} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" defaultValue={`Re: Your inquiry — TV Supreme`} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Message</label>
                <textarea className="form-input form-textarea" style={{ minHeight: 120 }}
                  placeholder="Type your response here..." />
              </div>
            </div>
            <div className="a-modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowReply(null)}>Cancel</button>
              <button className="btn btn-success">Mark as Resolved</button>
              <button className="btn btn-primary">Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
