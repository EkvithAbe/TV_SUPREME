import React, { useState } from 'react';
import { SCHEDULE } from '../adminData';

export default function LiveTVPage() {
  const [isLive, setIsLive] = useState(true);
  const [streamUrl, setStreamUrl] = useState('rtmp://live.tvsupreme.lk/stream/main');

  const todaySlots = SCHEDULE.Monday.slice(0, 6);

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Live TV Control</div>
          <div className="a-page-sub">Manage the live broadcast stream for TV Supreme</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Stream History</button>
          <button className="btn btn-primary btn-sm">Full Settings</button>
        </div>
      </div>

      {/* Live Status Card */}
      <div className="live-status-card">
        <div className="live-indicator">
          <div className="live-badge-big">LIVE</div>
          <div className="a-live-dot" style={{ width: 10, height: 10 }} />
          <span className="live-viewers-count">1,203 viewers watching now</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>On air since 04:50 AST</span>
        </div>

        <div className="form-group">
          <label className="form-label">Stream URL (RTMP)</label>
          <input
            className="form-input"
            value={streamUrl}
            onChange={e => setStreamUrl(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Embed Code</label>
          <textarea
            className="form-input form-textarea"
            style={{ fontFamily: 'monospace', fontSize: 12 }}
            defaultValue={`<iframe src="https://www.youtube.com/embed/live_stream?channel=UCsupreme" allowfullscreen></iframe>`}
          />
        </div>

        <div className="stream-info-grid">
          <div className="stream-info-item">
            <div className="stream-info-label">Channel</div>
            <div className="stream-info-value">TV Supreme</div>
          </div>
          <div className="stream-info-item">
            <div className="stream-info-label">Resolution</div>
            <div className="stream-info-value">1080p HD</div>
          </div>
          <div className="stream-info-item">
            <div className="stream-info-label">Bitrate</div>
            <div className="stream-info-value">3,500 kbps</div>
          </div>
          <div className="stream-info-item">
            <div className="stream-info-label">Live Viewers</div>
            <div className="stream-info-value" style={{ color: 'var(--red)' }}>1,203</div>
          </div>
        </div>
      </div>

      {/* Quick Controls */}
      <div className="quick-controls">
        <div className="control-card" onClick={() => setIsLive(true)}>
          <div className="control-icon">🔴</div>
          <div className="control-label">Go Live</div>
          <div className="control-desc">Start broadcast</div>
        </div>
        <div className="control-card" onClick={() => setIsLive(false)}>
          <div className="control-icon">⏹️</div>
          <div className="control-label">End Stream</div>
          <div className="control-desc">Stop broadcast</div>
        </div>
        <div className="control-card">
          <div className="control-icon">🧪</div>
          <div className="control-label">Test Stream</div>
          <div className="control-desc">Run health check</div>
        </div>
        <div className="control-card">
          <div className="control-icon">⚙️</div>
          <div className="control-label">Stream Settings</div>
          <div className="control-desc">Configure encoder</div>
        </div>
      </div>

      <div className="two-col">
        {/* Today's Schedule */}
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">Today's Upcoming Programs</span>
            <span className="badge badge-live">Live Schedule</span>
          </div>
          <div className="a-card-body">
            {SCHEDULE.Monday.map((slot, i) => {
              const [h, m] = slot.time.split(':').map(Number);
              const slotMin = h * 60 + m;
              const isCurrent = slotMin <= nowMin && (i === SCHEDULE.Monday.length - 1 || nowMin < (parseInt(SCHEDULE.Monday[i + 1].time) * 60));
              return (
                <div className="sched-row" key={i}>
                  <div className="sched-time">{slot.time}</div>
                  <div className="sched-prog">{slot.program}</div>
                  <span className="badge badge-cat">{slot.category}</span>
                  {i === 7 && <span className="badge badge-live">NOW</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stream Stats */}
        <div>
          <div className="a-card" style={{ marginBottom: 16 }}>
            <div className="a-card-header">
              <span className="a-card-title">Viewer Analytics (Live)</span>
            </div>
            <div className="a-card-body">
              <div className="chart-bar-wrap">
                <div className="chart-bar-row">
                  <div className="chart-bar-label">Peak viewers</div>
                  <div className="chart-bar-track"><div className="chart-bar-fill purple" style={{ width: '78%' }} /></div>
                  <div className="chart-bar-val">1,847</div>
                </div>
                <div className="chart-bar-row">
                  <div className="chart-bar-label">Current viewers</div>
                  <div className="chart-bar-track"><div className="chart-bar-fill green" style={{ width: '65%' }} /></div>
                  <div className="chart-bar-val">1,203</div>
                </div>
                <div className="chart-bar-row">
                  <div className="chart-bar-label">Average viewers</div>
                  <div className="chart-bar-track"><div className="chart-bar-fill blue" style={{ width: '55%' }} /></div>
                  <div className="chart-bar-val">987</div>
                </div>
                <div className="chart-bar-row">
                  <div className="chart-bar-label">YouTube live</div>
                  <div className="chart-bar-track"><div className="chart-bar-fill pink" style={{ width: '40%' }} /></div>
                  <div className="chart-bar-val">748</div>
                </div>
                <div className="chart-bar-row">
                  <div className="chart-bar-label">Website embed</div>
                  <div className="chart-bar-track"><div className="chart-bar-fill gold" style={{ width: '25%' }} /></div>
                  <div className="chart-bar-val">455</div>
                </div>
              </div>
            </div>
          </div>

          <div className="a-card">
            <div className="a-card-header">
              <span className="a-card-title">Stream Health</span>
            </div>
            <div className="a-card-body">
              {[
                { label: 'Video Quality', value: 'Excellent', color: 'var(--green)' },
                { label: 'Audio Quality', value: 'Good', color: 'var(--green)' },
                { label: 'Dropped Frames', value: '0.02%', color: 'var(--green)' },
                { label: 'Latency', value: '4.2s', color: 'var(--gold)' },
                { label: 'CDN Status', value: 'Operational', color: 'var(--green)' },
              ].map(item => (
                <div className="setting-row" key={item.label}>
                  <span className="setting-name">{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 700, fontSize: 13 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
