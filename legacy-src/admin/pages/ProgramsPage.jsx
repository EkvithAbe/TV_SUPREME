import React, { useState } from 'react';
import { PROGRAMS } from '../adminData';

const CATEGORIES = ['All', 'Dramas', 'Infotainment', 'Religious', 'Lifestyle', 'Entertainment', 'News', 'Sports', 'Business'];

function getCatBadge(cat) {
  const map = {
    Dramas: 'badge-pink',
    Infotainment: 'badge-blue',
    Religious: 'badge-gold',
    Lifestyle: 'badge-green',
    Entertainment: 'badge-cat',
    News: 'badge-breaking',
    Sports: 'badge-green',
    Business: 'badge-gold',
  };
  return map[cat] || 'badge-cat';
}

export default function ProgramsPage() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? PROGRAMS : PROGRAMS.filter(p => p.category === filter);

  const counts = CATEGORIES.slice(1).reduce((acc, cat) => {
    acc[cat] = PROGRAMS.filter(p => p.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">List of Programs</div>
          <div className="a-page-sub">Manage all TV Supreme programs and shows</div>
        </div>
        <button className="btn btn-primary">+ Add Program</button>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', marginBottom: 20 }}>
        <div className="a-stat-card green">
          <div className="a-stat-value">15</div>
          <div className="a-stat-label">Total Programs</div>
        </div>
        {Object.entries(counts).filter(([, v]) => v > 0).map(([cat, count]) => (
          <div className="a-stat-card purple" key={cat} style={{ cursor: 'pointer' }} onClick={() => setFilter(cat)}>
            <div className="a-stat-value">{count}</div>
            <div className="a-stat-label">{cat}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>{filtered.length} programs</span>
      </div>

      {/* Program Cards Grid */}
      <div className="prog-grid">
        {filtered.map(prog => (
          <div className="prog-card" key={prog.id}>
            <div className="prog-thumb">{prog.thumbnail}</div>
            <div className="prog-info">
              <div className="prog-title">{prog.title}</div>
              <div className="prog-meta">
                <span className={`badge ${getCatBadge(prog.category)}`}>{prog.category}</span>
                <span className={`badge ${prog.status === 'Active' ? 'badge-published' : 'badge-draft'}`}>{prog.status}</span>
              </div>
              <div className="prog-time">🕐 {prog.airTime}</div>
            </div>
            <div className="prog-actions">
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Edit</button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>View</button>
              <button className="btn btn-danger btn-sm">🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* Table view toggle */}
      <div className="a-card" style={{ marginTop: 24 }}>
        <div className="a-card-header">
          <span className="a-card-title">Programs — Table View</span>
          <button className="btn btn-ghost btn-sm">+ Add Program</button>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Icon</th>
                <th>Title</th>
                <th>Category</th>
                <th>Air Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((prog, i) => (
                <tr key={prog.id}>
                  <td className="muted">{i + 1}</td>
                  <td style={{ fontSize: 22 }}>{prog.thumbnail}</td>
                  <td style={{ fontWeight: 600 }}>{prog.title}</td>
                  <td><span className={`badge ${getCatBadge(prog.category)}`}>{prog.category}</span></td>
                  <td className="muted">{prog.airTime}</td>
                  <td><span className="badge badge-published">{prog.status}</span></td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm">Episodes</button>
                      <button className="btn btn-danger btn-sm">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
