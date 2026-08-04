import React, { useState } from 'react';
import { NEWS_ITEMS } from '../adminData';

const CATEGORIES = ['All', 'Breaking News', 'News Bulletin', 'Business News', 'Sports News', 'Foreign News', 'Latest Reports'];

function getCatColor(cat) {
  const map = {
    'Breaking News': 'badge-breaking',
    'News Bulletin': 'badge-blue',
    'Business News': 'badge-gold',
    'Sports News': 'badge-green',
    'Foreign News': 'badge-pink',
    'Latest Reports': 'badge-cat',
  };
  return map[cat] || 'badge-cat';
}

export default function NewsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const filtered = NEWS_ITEMS.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || item.category === category;
    const matchStatus = status === 'All' || item.status === status;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">News Management</div>
          <div className="a-page-sub">Manage all news articles and breaking news alerts</div>
        </div>
        <button className="btn btn-primary">+ Add News Article</button>
      </div>

      {/* Stats Row */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        <div className="a-stat-card purple">
          <div className="a-stat-value">2,467</div>
          <div className="a-stat-label">Total Articles</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-value">2,456</div>
          <div className="a-stat-label">Published</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-value">11</div>
          <div className="a-stat-label">Drafts</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search news articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)}>
          <option>All</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select className="filter-select">
          <option>All Dates</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
        <button className="btn btn-ghost btn-sm">Export CSV</button>
      </div>

      {/* Table */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Articles ({filtered.length})</span>
          <div className="flex gap-8">
            <button className="btn btn-ghost btn-sm">Bulk Edit</button>
            <button className="btn btn-danger btn-sm">Delete Selected</button>
          </div>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 32 }}><input type="checkbox" /></th>
                <th>Thumbnail</th>
                <th style={{ minWidth: 260 }}>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>SEO</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div style={{
                      width: 44, height: 44, borderRadius: 6,
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, color: 'var(--purple)', fontSize: 16
                    }}>
                      {item.title.charAt(0)}
                    </div>
                  </td>
                  <td style={{ maxWidth: 280 }}>
                    <div style={{ fontWeight: 600, marginBottom: 2, whiteSpace: 'normal', lineHeight: 1.4, fontSize: 13 }}>
                      {item.title}
                    </div>
                  </td>
                  <td><span className={`badge ${getCatColor(item.category)}`}>{item.category}</span></td>
                  <td className="muted">{item.author}</td>
                  <td className="muted">{item.date}</td>
                  <td>
                    <span className="badge badge-draft" style={{ fontSize: 10 }}>N/A</span>
                  </td>
                  <td>
                    <span className={`badge ${item.status === 'Published' ? 'badge-published' : 'badge-draft'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm">View</button>
                      <button className="btn btn-danger btn-sm">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Showing {filtered.length} of 2,467 articles</span>
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
