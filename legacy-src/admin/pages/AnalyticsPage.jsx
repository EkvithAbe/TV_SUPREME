import React from 'react';
import { PLATFORM_STATS } from '../adminData';

const NEWS_CATS = [
  { label: 'Breaking News', value: 847, pct: 92 },
  { label: 'Sports News', value: 612, pct: 70 },
  { label: 'Foreign News', value: 389, pct: 44 },
  { label: 'Business News', value: 287, pct: 33 },
  { label: 'News Bulletin', value: 201, pct: 23 },
  { label: 'Latest Reports', value: 131, pct: 15 },
];

const TOP_PROGRAMS = [
  { label: 'Samanmaliya', value: 18400, pct: 85 },
  { label: 'Sports Supreme', value: 14200, pct: 65 },
  { label: 'Every Morning', value: 11800, pct: 54 },
  { label: 'Global Pulse', value: 8900, pct: 41 },
  { label: 'Yowun Wasanthe', value: 7300, pct: 33 },
  { label: 'Ithin Ithin Kohomada', value: 5800, pct: 27 },
];

const PLATFORM_GROWTH = [
  { label: 'TikTok', value: '+34%', pct: 85, color: 'pink' },
  { label: 'WhatsApp', value: '+21%', pct: 65, color: 'green' },
  { label: 'YouTube', value: '+12%', pct: 42, color: 'purple' },
  { label: 'Facebook', value: '+8%', pct: 28, color: 'blue' },
];

export default function AnalyticsPage() {
  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Analytics</div>
          <div className="a-page-sub">Platform performance and audience insights — June 2026</div>
        </div>
        <div className="flex gap-8">
          <select className="filter-select">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Year</option>
          </select>
          <button className="btn btn-ghost btn-sm">Export Report</button>
        </div>
      </div>

      {/* Website stats */}
      <div className="a-stats-grid" style={{ marginBottom: 24 }}>
        <div className="a-stat-card blue">
          <div className="a-stat-icon">👁️</div>
          <div className="a-stat-value">48,230</div>
          <div className="a-stat-label">Daily Views</div>
          <div className="a-stat-trend up">↑ 8%</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-icon">👤</div>
          <div className="a-stat-value">12.4K</div>
          <div className="a-stat-label">Unique Visitors</div>
          <div className="a-stat-trend up">↑ 5%</div>
        </div>
        <div className="a-stat-card purple">
          <div className="a-stat-icon">⏱️</div>
          <div className="a-stat-value">3:24</div>
          <div className="a-stat-label">Avg Session</div>
          <div className="a-stat-trend up">↑ 0:18</div>
        </div>
        <div className="a-stat-card pink">
          <div className="a-stat-icon">📱</div>
          <div className="a-stat-value">45%</div>
          <div className="a-stat-label">Mobile Traffic</div>
          <div className="a-stat-trend up">↑ 3%</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-icon">🔁</div>
          <div className="a-stat-value">62%</div>
          <div className="a-stat-label">Return Visitors</div>
          <div className="a-stat-trend up">↑ 4%</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-icon">📄</div>
          <div className="a-stat-value">2.8</div>
          <div className="a-stat-label">Pages/Session</div>
        </div>
      </div>

      {/* Platform cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <div className="platform-card">
          <div className="platform-card-header">
            <div className="platform-icon yt">▶️</div>
            <div>
              <div className="platform-name">YouTube</div>
              <div className="platform-handle">@TVSupremeLK</div>
            </div>
          </div>
          <div className="platform-stat-big">{PLATFORM_STATS.youtube.subscribers}</div>
          <div className="platform-stat-label">Subscribers</div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
            {PLATFORM_STATS.youtube.videos} videos · {PLATFORM_STATS.youtube.views} total views
          </div>
          <div className="platform-growth">{PLATFORM_STATS.youtube.growth} growth</div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, width: '100%' }}>YouTube Studio →</button>
        </div>
        <div className="platform-card">
          <div className="platform-card-header">
            <div className="platform-icon fb">📘</div>
            <div>
              <div className="platform-name">Facebook</div>
              <div className="platform-handle">TV Supreme</div>
            </div>
          </div>
          <div className="platform-stat-big">{PLATFORM_STATS.facebook.followers}</div>
          <div className="platform-stat-label">Followers</div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
            Reach: {PLATFORM_STATS.facebook.reach} · Engagement: {PLATFORM_STATS.facebook.engagement}
          </div>
          <div className="platform-growth">{PLATFORM_STATS.facebook.growth} growth</div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, width: '100%' }}>Meta Insights →</button>
        </div>
        <div className="platform-card">
          <div className="platform-card-header">
            <div className="platform-icon tt">🎵</div>
            <div>
              <div className="platform-name">TikTok</div>
              <div className="platform-handle">@tvsupreme</div>
            </div>
          </div>
          <div className="platform-stat-big">{PLATFORM_STATS.tiktok.followers}</div>
          <div className="platform-stat-label">Followers</div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
            Views: {PLATFORM_STATS.tiktok.views} · Avg: {PLATFORM_STATS.tiktok.avgViews}
          </div>
          <div className="platform-growth">{PLATFORM_STATS.tiktok.growth} growth</div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, width: '100%' }}>TikTok Studio →</button>
        </div>
        <div className="platform-card">
          <div className="platform-card-header">
            <div className="platform-icon wa">💬</div>
            <div>
              <div className="platform-name">WhatsApp</div>
              <div className="platform-handle">Broadcast Channel</div>
            </div>
          </div>
          <div className="platform-stat-big">{PLATFORM_STATS.whatsapp.subscribers}</div>
          <div className="platform-stat-label">Subscribers</div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
            {PLATFORM_STATS.whatsapp.messages} messages sent
          </div>
          <div className="platform-growth">{PLATFORM_STATS.whatsapp.growth} growth</div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, width: '100%' }}>WA Manager →</button>
        </div>
      </div>

      {/* Charts row */}
      <div className="two-col">
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">News by Category — Views This Month</span>
          </div>
          <div className="a-card-body">
            <div className="chart-bar-wrap">
              {NEWS_CATS.map(item => (
                <div className="chart-bar-row" key={item.label}>
                  <div className="chart-bar-label">{item.label}</div>
                  <div className="chart-bar-track">
                    <div className="chart-bar-fill purple" style={{ width: `${item.pct}%` }} />
                  </div>
                  <div className="chart-bar-val">{item.value.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">Top Programs by Views</span>
          </div>
          <div className="a-card-body">
            <div className="chart-bar-wrap">
              {TOP_PROGRAMS.map(item => (
                <div className="chart-bar-row" key={item.label}>
                  <div className="chart-bar-label">{item.label}</div>
                  <div className="chart-bar-track">
                    <div className="chart-bar-fill pink" style={{ width: `${item.pct}%` }} />
                  </div>
                  <div className="chart-bar-val">{(item.value / 1000).toFixed(1)}K</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform growth */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Platform Growth — Month over Month</span>
        </div>
        <div className="a-card-body">
          <div className="chart-bar-wrap">
            {PLATFORM_GROWTH.map(item => (
              <div className="chart-bar-row" key={item.label}>
                <div className="chart-bar-label">{item.label}</div>
                <div className="chart-bar-track">
                  <div className={`chart-bar-fill ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
                <div className="chart-bar-val" style={{ color: 'var(--green)' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
