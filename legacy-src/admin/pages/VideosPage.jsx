import React, { useState } from 'react';
import { YT_VIDEOS } from '../adminData';

export default function VideosPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const filtered = YT_VIDEOS.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.videoId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === 'All' || v.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">YouTube Videos / VOD</div>
          <div className="a-page-sub">Manage all YouTube video content and Video on Demand</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">🔄 Sync YouTube</button>
          <button className="btn btn-primary">+ Add Video</button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="a-stat-card purple">
          <div className="a-stat-value">873</div>
          <div className="a-stat-label">Total Videos</div>
          <div className="a-stat-trend up">↑ 5 this week</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-value">871</div>
          <div className="a-stat-label">Published</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-value">2</div>
          <div className="a-stat-label">Drafts</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-value">44</div>
          <div className="a-stat-label">Pages</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search videos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select">
          <option>TV Supreme</option>
          <option>All Channels</option>
        </select>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)}>
          <option>All</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select className="filter-select">
          <option>All Dates</option>
          <option>This Month</option>
          <option>Last Month</option>
        </select>
        <button className="btn btn-ghost btn-sm">Export</button>
      </div>

      {/* Table */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Videos ({filtered.length} of 873)</span>
          <div className="flex gap-8">
            <button className="btn btn-ghost btn-sm">Bulk Edit</button>
            <button className="btn btn-success btn-sm">🔄 Sync from YT</button>
          </div>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 32 }}><input type="checkbox" /></th>
                <th style={{ minWidth: 280 }}>Title</th>
                <th>Channel</th>
                <th>Video ID</th>
                <th>Publish Date</th>
                <th>Status</th>
                <th>SEO</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 56, height: 36, borderRadius: 4,
                        background: 'linear-gradient(135deg, #1a0a2e, #0f0a14)',
                        border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, flexShrink: 0, color: 'var(--red)'
                      }}>▶</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.4 }}>{v.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="muted">{v.channel}</td>
                  <td>
                    <code style={{ fontSize: 11, background: 'var(--surface2)', padding: '2px 6px', borderRadius: 4, color: 'var(--muted)' }}>
                      {v.videoId}
                    </code>
                  </td>
                  <td className="muted">{v.publishDate}</td>
                  <td><span className={`badge ${v.status === 'Published' ? 'badge-published' : 'badge-draft'}`}>{v.status}</span></td>
                  <td><span className="badge badge-draft" style={{ fontSize: 10 }}>N/A</span></td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm">▶ Play</button>
                      <button className="btn btn-danger btn-sm">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Showing {filtered.length} of 873 videos · Page 1 of 44</span>
          <div className="flex gap-8">
            <button className="btn btn-ghost btn-sm">← Previous</button>
            <button className="btn btn-ghost btn-sm" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }}>1</button>
            <button className="btn btn-ghost btn-sm">2</button>
            <button className="btn btn-ghost btn-sm">3</button>
            <span style={{ color: 'var(--muted)', alignSelf: 'center', fontSize: 13 }}>… 44</span>
            <button className="btn btn-ghost btn-sm">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
