import React from 'react';
import { STATS, NEWS_ITEMS, PLATFORM_STATS } from '../adminData';

const ACTIVITY = [
  { text: 'New news article published: "T20 World Cup Squad"', time: '2 min ago', color: 'var(--green)' },
  { text: 'TV Schedule updated for Wednesday', time: '18 min ago', color: 'var(--purple)' },
  { text: 'New member registered: sanduni_perera', time: '34 min ago', color: 'var(--blue)' },
  { text: 'YouTube video synced: ජනනිදි Episode 24', time: '1 hr ago', color: 'var(--pink)' },
  { text: 'Comment approved on Pakistan T20I article', time: '1 hr ago', color: 'var(--green)' },
  { text: 'Breaking news alert sent: Economy Report Q1', time: '2 hrs ago', color: 'var(--red)' },
  { text: 'New contact inquiry from Lanka Advertisers Pvt Ltd', time: '3 hrs ago', color: 'var(--gold)' },
  { text: 'Program card updated: Samanmaliya Episode 182', time: '4 hrs ago', color: 'var(--purple)' },
  { text: 'Rank Math SEO score improved to 87 for 3 articles', time: '5 hrs ago', color: 'var(--green)' },
  { text: 'Daily analytics report generated — 48,230 views', time: '6 hrs ago', color: 'var(--blue)' },
];

export default function DashboardPage() {
  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Dashboard</div>
          <div className="a-page-sub">Welcome back, Admin — Thursday, 12 June 2026</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Export Report</button>
          <button className="btn btn-primary btn-sm">+ Add News</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="btn btn-primary">+ Add News</button>
        <button className="btn btn-ghost">+ Add Program</button>
        <button className="btn btn-ghost">Update Schedule</button>
        <button className="btn btn-ghost">View Analytics</button>
      </div>

      {/* Stats Grid */}
      <div className="a-stats-grid">
        <div className="a-stat-card purple">
          <div className="a-stat-icon">📰</div>
          <div className="a-stat-value">{STATS.totalNews.toLocaleString()}</div>
          <div className="a-stat-label">Total News</div>
          <div className="a-stat-trend up">↑ 12 today</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-icon">📺</div>
          <div className="a-stat-value">{STATS.programs}</div>
          <div className="a-stat-label">Programs</div>
          <div className="a-stat-trend up">↑ All active</div>
        </div>
        <div className="a-stat-card pink">
          <div className="a-stat-icon">▶️</div>
          <div className="a-stat-value">{STATS.ytVideos}</div>
          <div className="a-stat-label">YouTube Videos</div>
          <div className="a-stat-trend up">↑ 5 this week</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-icon">🔴</div>
          <div className="a-stat-value">{STATS.liveViewers.toLocaleString()}</div>
          <div className="a-stat-label">Live Viewers</div>
          <div className="a-stat-trend up">↑ Live now</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-icon">👁️</div>
          <div className="a-stat-value">{STATS.dailyViews.toLocaleString()}</div>
          <div className="a-stat-label">Daily Views</div>
          <div className="a-stat-trend up">↑ 8% vs yesterday</div>
        </div>
        <div className="a-stat-card purple">
          <div className="a-stat-icon">👥</div>
          <div className="a-stat-value">{STATS.members.toLocaleString()}</div>
          <div className="a-stat-label">Members</div>
          <div className="a-stat-trend up">↑ 89 new this month</div>
        </div>
      </div>

      {/* Two-column middle row */}
      <div className="two-col mb-20">
        {/* Recent News */}
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">Recent News</span>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div className="a-card-body" style={{ padding: '12px 18px' }}>
            {NEWS_ITEMS.slice(0, 5).map(item => (
              <div className="news-list-item" key={item.id}>
                <div className="news-list-thumb">{item.title.charAt(0)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="news-list-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                  <div className="news-list-meta">
                    <span className="badge badge-cat" style={{ marginRight: 6 }}>{item.category}</span>
                    {item.author} · {item.date}
                  </div>
                </div>
                <span className={`badge ${item.status === 'Published' ? 'badge-published' : 'badge-draft'}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">Activity Feed</span>
            <button className="btn btn-ghost btn-sm">Clear All</button>
          </div>
          <div className="a-card-body" style={{ padding: '8px 18px' }}>
            <div className="activity-feed">
              {ACTIVITY.map((a, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-dot" style={{ background: a.color }} />
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Quick Stats */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Platform Performance</span>
          <button className="btn btn-ghost btn-sm">Full Analytics</button>
        </div>
        <div className="a-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
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
              <div className="platform-growth">{PLATFORM_STATS.youtube.growth} this month</div>
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
              <div className="platform-growth">{PLATFORM_STATS.facebook.growth} this month</div>
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
              <div className="platform-growth">{PLATFORM_STATS.tiktok.growth} this month</div>
            </div>
            <div className="platform-card">
              <div className="platform-card-header">
                <div className="platform-icon wa">💬</div>
                <div>
                  <div className="platform-name">WhatsApp</div>
                  <div className="platform-handle">Broadcast</div>
                </div>
              </div>
              <div className="platform-stat-big">{PLATFORM_STATS.whatsapp.subscribers}</div>
              <div className="platform-stat-label">Subscribers</div>
              <div className="platform-growth">{PLATFORM_STATS.whatsapp.growth} this month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
