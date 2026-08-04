import React, { useState } from 'react';
import { COMMENTS } from '../adminData';

const TABS = [
  { label: 'All', count: 5 },
  { label: 'Pending', count: 1 },
  { label: 'Approved', count: 3 },
  { label: 'Spam', count: 1 },
  { label: 'Trash', count: 0 },
];

export default function CommentsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? COMMENTS
    : COMMENTS.filter(c => c.status === activeTab);

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Comment Moderation</div>
          <div className="a-page-sub">Review and moderate user comments across all articles</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Bulk Approve</button>
          <button className="btn btn-danger btn-sm">Empty Trash</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="a-tabs">
        {TABS.map(tab => (
          <button
            key={tab.label}
            className={`a-tab ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="a-card">
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 32 }}><input type="checkbox" /></th>
                <th>Author</th>
                <th style={{ minWidth: 300 }}>Comment</th>
                <th>In Response To</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, minWidth: 160 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'var(--purple)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, flexShrink: 0
                      }}>
                        {c.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{c.author}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{c.email}</div>
                        <div style={{ fontSize: 11, color: 'var(--border)' }}>{c.ip}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: 300 }}>
                    <div style={{ fontSize: 13, color: 'var(--text)', whiteSpace: 'normal', lineHeight: 1.5 }}>
                      "{c.comment}"
                    </div>
                  </td>
                  <td>
                    <a href="#" style={{ fontSize: 12, color: 'var(--purple)', textDecoration: 'none' }}>
                      {c.post}
                    </a>
                  </td>
                  <td className="muted" style={{ fontSize: 12 }}>{c.date}</td>
                  <td>
                    <span className={`badge ${
                      c.status === 'Approved' ? 'badge-published' :
                      c.status === 'Pending' ? 'badge-pending' :
                      c.status === 'Spam' ? 'badge-breaking' :
                      'badge-draft'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {c.status !== 'Approved' && (
                        <button className="btn btn-success btn-sm" style={{ fontSize: 11 }}>✓ Approve</button>
                      )}
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>↩ Reply</button>
                      <button className="btn btn-danger btn-sm" style={{ fontSize: 11 }}>Spam</button>
                      <button className="btn btn-danger btn-sm" style={{ fontSize: 11 }}>🗑 Trash</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: 'var(--muted)', padding: 32 }}>
                    No comments in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settings note */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Comment Settings</span>
        </div>
        <div className="a-card-body">
          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-name">Comment Moderation</div>
              <div className="setting-desc">Require manual approval before comments appear publicly</div>
            </div>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider" />
            </label>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-name">Email Notification on New Comment</div>
              <div className="setting-desc">Get notified at admin@tvsupreme.lk when a new comment is submitted</div>
            </div>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider" />
            </label>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-name">Auto-close Comments</div>
              <div className="setting-desc">Automatically close comments on articles older than 30 days</div>
            </div>
            <label className="toggle">
              <input type="checkbox" />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
