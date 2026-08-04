import { useState } from 'react';

const SCHEDULE_DATA = {
  Mon: [
    { time: '05:00', program: 'Morning Devotional' },
    { time: '06:00', program: 'Sinhala Baila Mix' },
    { time: '07:00', program: 'Sinhala Pop Hour' },
    { time: '08:00', program: 'News Radio' },
    { time: '09:00', program: 'Morning Talk Show' },
    { time: '11:00', program: 'Classic Sinhala Hits' },
    { time: '13:00', program: 'Midday News' },
    { time: '14:00', program: 'Request Hour' },
    { time: '17:00', program: 'Drive Time' },
    { time: '19:00', program: 'Evening News' },
    { time: '20:00', program: 'Tamil Melodies' },
    { time: '22:00', program: 'Night Lounge' },
  ],
  Tue: [
    { time: '05:00', program: 'Morning Devotional' },
    { time: '07:00', program: 'Sinhala Pop Hour' },
    { time: '08:00', program: 'News Radio' },
    { time: '10:00', program: 'Live Interview' },
    { time: '13:00', program: 'Midday News' },
    { time: '14:00', program: 'Classic Sinhala Hits' },
    { time: '17:00', program: 'Drive Time' },
    { time: '19:00', program: 'Evening News' },
    { time: '22:00', program: 'Night Lounge' },
  ],
  Wed: [
    { time: '05:00', program: 'Morning Devotional' },
    { time: '07:00', program: 'Sinhala Pop Hour' },
    { time: '08:00', program: 'News Radio' },
    { time: '12:00', program: 'Midday Mixes' },
    { time: '13:00', program: 'Midday News' },
    { time: '17:00', program: 'Drive Time' },
    { time: '19:00', program: 'Evening News' },
    { time: '21:00', program: 'Devotional Music Night' },
  ],
  Thu: [
    { time: '05:00', program: 'Morning Devotional' },
    { time: '07:00', program: 'Sinhala Pop Hour' },
    { time: '08:00', program: 'News Radio' },
    { time: '13:00', program: 'Midday News' },
    { time: '15:00', program: 'Youth Radio Hour' },
    { time: '17:00', program: 'Drive Time' },
    { time: '19:00', program: 'Evening News' },
    { time: '22:00', program: 'Night Lounge' },
  ],
  Fri: [
    { time: '05:00', program: 'Morning Devotional' },
    { time: '07:00', program: 'Sinhala Pop Hour' },
    { time: '08:00', program: 'News Radio' },
    { time: '13:00', program: 'Midday News' },
    { time: '17:00', program: 'TGIF Mix' },
    { time: '19:00', program: 'Evening News' },
    { time: '20:00', program: 'Weekend Kickoff' },
    { time: '22:00', program: 'Night Lounge' },
  ],
  Sat: [
    { time: '06:00', program: 'Weekend Morning Show' },
    { time: '08:00', program: 'Kids Radio Hour' },
    { time: '10:00', program: 'Sinhala Classics Mix' },
    { time: '13:00', program: 'Midday Request Show' },
    { time: '16:00', program: 'Sports Radio' },
    { time: '19:00', program: 'Saturday Specials' },
    { time: '22:00', program: 'Late Night Mix' },
  ],
  Sun: [
    { time: '06:00', program: 'Sunday Devotional' },
    { time: '08:00', program: 'Religious Programs' },
    { time: '10:00', program: 'Family Music Hour' },
    { time: '13:00', program: 'Sunday Lunch Mix' },
    { time: '16:00', program: 'Sinhala Drama Readings' },
    { time: '19:00', program: 'Evening Devotional' },
    { time: '21:00', program: 'Sunday Night Lounge' },
  ],
};

const PLAYLISTS = [
  { id: 1, name: 'Sinhala Classics', icon: '🎵', songs: 142, duration: '8h 34m', color: 'purple' },
  { id: 2, name: 'Pop Hits', icon: '🎤', songs: 98, duration: '5h 12m', color: 'pink' },
  { id: 3, name: 'Devotional Music', icon: '🙏', songs: 76, duration: '4h 20m', color: 'gold' },
];

const PEAK_HOURS = [
  { hour: '06:00', listeners: 85 },
  { hour: '07:00', listeners: 210 },
  { hour: '08:00', listeners: 342 },
  { hour: '09:00', listeners: 280 },
  { hour: '10:00', listeners: 190 },
  { hour: '11:00', listeners: 160 },
  { hour: '12:00', listeners: 220 },
  { hour: '13:00', listeners: 175 },
  { hour: '14:00', listeners: 140 },
  { hour: '17:00', listeners: 290 },
  { hour: '18:00', listeners: 310 },
  { hour: '19:00', listeners: 265 },
  { hour: '20:00', listeners: 195 },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function RadioPage() {
  const [isOnAir, setIsOnAir] = useState(true);
  const [activeDay, setActiveDay] = useState('Mon');
  const [bitrate, setBitrate] = useState('256kbps');
  const [streamUrl, setStreamUrl] = useState('https://stream.tvsupreme.lk/radio/live');

  const maxListeners = Math.max(...PEAK_HOURS.map(h => h.listeners));

  return (
    <div className="a-page">
      {/* Header Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))' }}>
        <div className={`a-stat-card ${isOnAir ? 'red' : 'purple'}`}>
          <div className="a-stat-icon">📻</div>
          <div className="a-stat-value">{isOnAir ? 'LIVE' : 'OFF'}</div>
          <div className="a-stat-label">TV Supreme Radio</div>
          <div className={`a-stat-trend ${isOnAir ? 'up' : 'down'}`}>{isOnAir ? '● On Air' : '○ Off Air'}</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-icon">🎧</div>
          <div className="a-stat-value">342</div>
          <div className="a-stat-label">Current Listeners</div>
          <div className="a-stat-trend up">+18 from last hour</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-icon">📈</div>
          <div className="a-stat-value">1,247</div>
          <div className="a-stat-label">Total Streams Today</div>
          <div className="a-stat-trend up">+12% vs yesterday</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-icon">⏱️</div>
          <div className="a-stat-value">18:32</div>
          <div className="a-stat-label">Avg. Listen Duration</div>
          <div className="a-stat-trend up">+2 min from last week</div>
        </div>
      </div>

      <div className="two-col">
        {/* Live Control Card */}
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">🎙️ Live Control</span>
            <span className={`radio-onair ${isOnAir ? 'on' : 'off'}`}>
              {isOnAir ? '● ON AIR' : '○ OFF AIR'}
            </span>
          </div>
          <div className="a-card-body">
            {/* Big Toggle */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px 0',
              gap: 12,
              marginBottom: 20,
              background: isOnAir
                ? 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(139,127,160,0.06) 0%, transparent 70%)',
              borderRadius: 12,
              border: `1px solid ${isOnAir ? 'rgba(239,68,68,0.25)' : 'var(--border)'}`,
            }}>
              {isOnAir && (
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'var(--red)',
                  animation: 'pulse 1.4s ease-in-out infinite',
                  boxShadow: '0 0 12px rgba(239,68,68,0.6)',
                }} />
              )}
              <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>
                {isOnAir ? 'Stream is active' : 'Stream is stopped'}
              </div>
              <button
                className={`btn ${isOnAir ? 'btn-danger' : 'btn-success'}`}
                style={{ fontSize: 14, padding: '10px 32px', fontWeight: 700 }}
                onClick={() => setIsOnAir(!isOnAir)}
              >
                {isOnAir ? '⏹ Go OFF AIR' : '▶ Go ON AIR'}
              </button>
            </div>

            {/* Stream URL */}
            <div className="form-group">
              <label className="form-label">Stream URL</label>
              <input
                className="form-input"
                value={streamUrl}
                onChange={e => setStreamUrl(e.target.value)}
              />
            </div>

            {/* Bitrate */}
            <div className="form-group">
              <label className="form-label">Bitrate</label>
              <select
                className="filter-select"
                style={{ width: '100%' }}
                value={bitrate}
                onChange={e => setBitrate(e.target.value)}
              >
                <option>128kbps</option>
                <option>256kbps</option>
                <option>320kbps</option>
              </select>
            </div>

            {/* Now Playing */}
            <div style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--purple), var(--pink))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>🎵</div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>NOW PLAYING</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Sinhala Classics Mix</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Playlist • 142 songs</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                {isOnAir && (
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'var(--green)',
                    animation: 'pulse 1.4s ease-in-out infinite',
                  }} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Manager */}
        <div className="a-card">
          <div className="a-card-header">
            <span className="a-card-title">📂 Playlist Manager</span>
            <button className="btn btn-primary btn-sm">+ New Playlist</button>
          </div>
          <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PLAYLISTS.map(pl => (
              <div key={pl.id} style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <div style={{
                  width: 44, height: 44,
                  background: `rgba(var(--${pl.color}-rgb, 124,58,237), 0.15)`,
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                  border: '1px solid var(--border)',
                }}>{pl.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{pl.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{pl.songs} songs • {pl.duration}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-ghost btn-sm">✏️ Edit</button>
                  <button className="btn btn-success btn-sm">▶ Play</button>
                </div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
              + Import Playlist
            </button>
          </div>
        </div>
      </div>

      {/* Radio Schedule */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">📅 Radio Schedule</span>
          <button className="btn btn-primary btn-sm">+ Add Slot</button>
        </div>
        <div className="a-card-body">
          <div className="day-tabs">
            {DAYS.map(d => (
              <button
                key={d}
                className={`day-tab ${activeDay === d ? 'active' : ''}`}
                onClick={() => setActiveDay(d)}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="a-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Program</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE_DATA[activeDay].map((row, i) => {
                  const nextTime = SCHEDULE_DATA[activeDay][i + 1]?.time;
                  const [h1, m1] = row.time.split(':').map(Number);
                  const dur = nextTime
                    ? (() => {
                        const [h2, m2] = nextTime.split(':').map(Number);
                        const mins = (h2 * 60 + m2) - (h1 * 60 + m1);
                        return mins >= 60 ? `${mins / 60}h` : `${mins}m`;
                      })()
                    : '60m';
                  return (
                    <tr key={i}>
                      <td><span className="sched-time">{row.time}</span></td>
                      <td style={{ fontWeight: 600 }}>{row.program}</td>
                      <td className="muted">{dur}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm">Edit</button>
                          <button className="btn btn-danger btn-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Peak Listeners Chart */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">📊 Listener Analytics — Peak Hours Today</span>
        </div>
        <div className="a-card-body">
          <div className="chart-bar-wrap">
            {PEAK_HOURS.map(h => (
              <div key={h.hour} className="chart-bar-row">
                <span className="chart-bar-label">{h.hour}</span>
                <div className="chart-bar-track">
                  <div
                    className="chart-bar-fill purple"
                    style={{ width: `${Math.round((h.listeners / maxListeners) * 100)}%` }}
                  />
                </div>
                <span className="chart-bar-val">{h.listeners}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
