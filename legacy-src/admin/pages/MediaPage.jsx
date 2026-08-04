import React, { useState } from 'react';

const MEDIA_ITEMS = [
  { id: 1, icon: '🖼️', name: 'samanmaliya-ep182.jpg', type: 'image', size: '284 KB' },
  { id: 2, icon: '🖼️', name: 'sports-supreme-thumb.jpg', type: 'image', size: '198 KB' },
  { id: 3, icon: '🎥', name: 'jana-handa-060126.mp4', type: 'video', size: '124 MB' },
  { id: 4, icon: '🖼️', name: 'every-morning-banner.jpg', type: 'image', size: '412 KB' },
  { id: 5, icon: '🖼️', name: 'tvsupreme-logo-dark.png', type: 'image', size: '67 KB' },
  { id: 6, icon: '📄', name: 'rate-card-2026.pdf', type: 'document', size: '2.1 MB' },
  { id: 7, icon: '🖼️', name: 'studio-a-photo.jpg', type: 'image', size: '876 KB' },
  { id: 8, icon: '🎥', name: 'hathara-wate-061226.mp4', type: 'video', size: '87 MB' },
  { id: 9, icon: '🖼️', name: 'global-pulse-cover.jpg', type: 'image', size: '321 KB' },
  { id: 10, icon: '🖼️', name: 'yowun-wasanthe-bg.jpg', type: 'image', size: '543 KB' },
  { id: 11, icon: '📄', name: 'brand-guidelines-v3.pdf', type: 'document', size: '8.7 MB' },
  { id: 12, icon: '🖼️', name: 'ob-van-photo.jpg', type: 'image', size: '1.2 MB' },
  { id: 13, icon: '🎵', name: 'tv-supreme-jingle.mp3', type: 'audio', size: '3.4 MB' },
  { id: 14, icon: '🖼️', name: 'kavi-naduwa-performers.jpg', type: 'image', size: '756 KB' },
  { id: 15, icon: '🖼️', name: 'cna-on-supreme-logo.png', type: 'image', size: '89 KB' },
  { id: 16, icon: '🎥', name: 'vyaaramaya-intro.mp4', type: 'video', size: '45 MB' },
  { id: 17, icon: '🖼️', name: 'news-anchor-desk.jpg', type: 'image', size: '934 KB' },
  { id: 18, icon: '📄', name: 'company-profile-2026.pdf', type: 'document', size: '4.2 MB' },
  { id: 19, icon: '🖼️', name: 'ithin-ithin-thumbnail.jpg', type: 'image', size: '267 KB' },
  { id: 20, icon: '🖼️', name: 'breaking-news-bg.jpg', type: 'image', size: '445 KB' },
  { id: 21, icon: '🎵', name: 'news-bulletin-theme.mp3', type: 'audio', size: '2.8 MB' },
  { id: 22, icon: '🖼️', name: 'biz-digest-header.jpg', type: 'image', size: '312 KB' },
  { id: 23, icon: '🖼️', name: 'academy-promo.jpg', type: 'image', size: '587 KB' },
  { id: 24, icon: '🎥', name: 'sports-highlights-reel.mp4', type: 'video', size: '203 MB' },
];

const FILTER_OPTIONS = ['All Media', 'Images', 'Videos', 'Documents', 'Audio'];

const TYPE_COLORS = {
  image: 'var(--purple)',
  video: 'var(--red)',
  document: 'var(--blue)',
  audio: 'var(--green)',
};

export default function MediaPage() {
  const [filter, setFilter] = useState('All Media');
  const [search, setSearch] = useState('');

  const filtered = MEDIA_ITEMS.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'All Media' ||
      (filter === 'Images' && m.type === 'image') ||
      (filter === 'Videos' && m.type === 'video') ||
      (filter === 'Documents' && m.type === 'document') ||
      (filter === 'Audio' && m.type === 'audio');
    return matchSearch && matchFilter;
  });

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Media Library</div>
          <div className="a-page-sub">Manage all uploaded images, videos, and documents</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Select All</button>
          <button className="btn btn-primary">+ Upload Files</button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: 20 }}>
        <div className="a-stat-card purple">
          <div className="a-stat-value">1,247</div>
          <div className="a-stat-label">Total Files</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-value">912</div>
          <div className="a-stat-label">Images</div>
        </div>
        <div className="a-stat-card red">
          <div className="a-stat-value">218</div>
          <div className="a-stat-label">Videos</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-value">117</div>
          <div className="a-stat-label">Documents & Audio</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-value">2.3 GB</div>
          <div className="a-stat-label">Storage Used</div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="upload-zone">
        <div className="upload-zone-icon">☁️</div>
        <div className="upload-zone-title">Drag & Drop files here</div>
        <div className="upload-zone-sub">or click to browse — supports JPG, PNG, MP4, PDF, MP3 · Max 500 MB per file</div>
        <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>Browse Files</button>
      </div>

      {/* Filters */}
      <div className="filter-bar" style={{ marginBottom: 16 }}>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search files..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt}
            className={`btn btn-sm ${filter === opt ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter(opt)}
          >
            {opt}
          </button>
        ))}
        <select className="filter-select" style={{ marginLeft: 'auto' }}>
          <option>Sort: Newest</option>
          <option>Sort: Oldest</option>
          <option>Sort: Size</option>
          <option>Sort: A-Z</option>
        </select>
      </div>

      {/* Media Grid */}
      <div className="media-grid">
        {filtered.map(m => (
          <div className="media-item" key={m.id}>
            <div className="media-thumb" style={{ background: `linear-gradient(135deg, rgba(124,58,237,0.1), var(--bg))` }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <span style={{
                  fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5,
                  color: TYPE_COLORS[m.type] || 'var(--muted)'
                }}>
                  {m.type}
                </span>
              </div>
            </div>
            <div className="media-meta">
              <div className="media-name" title={m.name}>{m.name}</div>
              <div className="media-size">{m.size}</div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--muted)' }}>
          No files match your search.
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          Showing {filtered.length} of 1,247 files
        </span>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">← Previous</button>
          <button className="btn btn-ghost btn-sm" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }}>1</button>
          <button className="btn btn-ghost btn-sm">2</button>
          <button className="btn btn-ghost btn-sm">3</button>
          <button className="btn btn-ghost btn-sm">Next →</button>
        </div>
      </div>
    </div>
  );
}
