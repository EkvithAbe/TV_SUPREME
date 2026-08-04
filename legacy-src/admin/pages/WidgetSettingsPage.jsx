import { useState } from 'react';

const TICKER_SWATCHES = [
  { label: 'Red', value: '#EF4444' },
  { label: 'Purple', value: '#7C3AED' },
  { label: 'Dark', value: '#0f0a14' },
  { label: 'Navy', value: '#1e3a5f' },
  { label: 'Green', value: '#10B981' },
];

const EMBED_CODES = [
  {
    id: 'live-tv',
    title: '📺 Live TV Player Embed',
    code: `<iframe
  src="https://tvsupreme.lk/live-embed"
  width="640" height="360"
  frameborder="0"
  allowfullscreen
  allow="autoplay; encrypted-media">
</iframe>`,
  },
  {
    id: 'news-ticker',
    title: '📢 News Ticker Embed',
    code: `<script src="https://widgets.tvsupreme.lk/ticker.js"
  data-channel="tvsupreme"
  data-theme="dark"
  data-speed="normal">
</script>`,
  },
  {
    id: 'schedule',
    title: '📅 Schedule Widget Embed',
    code: `<iframe
  src="https://tvsupreme.lk/widget/schedule"
  width="400" height="600"
  frameborder="0"
  scrolling="no">
</iframe>`,
  },
];

export default function WidgetSettingsPage() {
  const [weather, setWeather] = useState({ active: true, city: 'Colombo', provider: 'OpenWeatherMap', unit: 'C', showHeader: true });
  const [liveTV, setLiveTV] = useState({ streamUrl: 'https://stream.tvsupreme.lk/live', hlsUrl: 'https://stream.tvsupreme.lk/hls/live.m3u8', theme: 'Dark', autoplay: false, mute: true });
  const [socialFeed, setSocialFeed] = useState({ youtube: true, facebook: true, tiktok: true, instagram: false, interval: '15min', maxItems: 12 });
  const [ticker, setTicker] = useState({ speed: 'Normal', bgColor: '#EF4444', textColor: '#FFFFFF', separator: '●' });
  const [schedule, setSchedule] = useState({ defaultView: 'Daily', timeFormat: '24hr', highlightCurrent: true });
  const [cookie, setCookie] = useState({ active: true, message: 'We use cookies to improve your experience on TV Supreme. By continuing to browse, you agree to our cookie policy.', btnText: 'Accept', privacyLink: 'https://tvsupreme.lk/privacy' });
  const [copied, setCopied] = useState(null);

  function copyCode(id, code) {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const liveTVEmbedCode = `<iframe
  src="${liveTV.streamUrl}/embed"
  width="640" height="360"
  frameborder="0"
  ${liveTV.autoplay ? 'allow="autoplay; encrypted-media"' : ''}
  allowfullscreen>
</iframe>`;

  return (
    <div className="a-page">
      <div className="two-col" style={{ gap: 20 }}>

        {/* Weather Widget */}
        <div className="widget-section-card">
          <div className="widget-section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>🌤️</span>
              <span className="a-card-title">Weather Widget</span>
            </div>
            <label className="toggle">
              <input type="checkbox" checked={weather.active} onChange={() => setWeather(p => ({ ...p, active: !p.active }))} />
              <span className="toggle-slider" />
            </label>
          </div>
          <div className="widget-section-body">
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" value={weather.city} onChange={e => setWeather(p => ({ ...p, city: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">API Provider</label>
              <select className="filter-select" style={{ width: '100%' }} value={weather.provider}
                onChange={e => setWeather(p => ({ ...p, provider: e.target.value }))}>
                <option>OpenWeatherMap</option>
                <option>WeatherAPI.com</option>
                <option>AccuWeather</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">API Key</label>
              <input className="form-input" type="password" defaultValue="owm_api_key_xxxxx" />
            </div>
            <div className="form-group">
              <label className="form-label">Temperature Unit</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {['C', 'F'].map(u => (
                  <label key={u} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input type="radio" name="tempUnit" value={u} checked={weather.unit === u}
                      onChange={() => setWeather(p => ({ ...p, unit: u }))}
                      style={{ accentColor: 'var(--purple)' }} />
                    <span style={{ fontSize: 13, color: 'var(--text)' }}>°{u}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="setting-row" style={{ paddingTop: 8 }}>
              <span className="setting-name" style={{ fontSize: 13 }}>Show in header</span>
              <label className="toggle">
                <input type="checkbox" checked={weather.showHeader} onChange={() => setWeather(p => ({ ...p, showHeader: !p.showHeader }))} />
                <span className="toggle-slider" />
              </label>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}>
              💾 Save Weather Widget
            </button>
          </div>
        </div>

        {/* Live TV Embed */}
        <div className="widget-section-card">
          <div className="widget-section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📺</span>
              <span className="a-card-title">Live TV Embed</span>
            </div>
            <span className="badge badge-live">LIVE</span>
          </div>
          <div className="widget-section-body">
            <div className="form-group">
              <label className="form-label">Stream Embed URL</label>
              <input className="form-input" value={liveTV.streamUrl} onChange={e => setLiveTV(p => ({ ...p, streamUrl: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">HLS Stream URL (.m3u8)</label>
              <input className="form-input" value={liveTV.hlsUrl} onChange={e => setLiveTV(p => ({ ...p, hlsUrl: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Auto-Generated Embed Code</label>
              <textarea className="form-input form-textarea" readOnly value={liveTVEmbedCode} style={{ fontFamily: 'monospace', fontSize: 11 }} />
            </div>
            <div className="form-group">
              <label className="form-label">Player Theme</label>
              <select className="filter-select" style={{ width: '100%' }} value={liveTV.theme}
                onChange={e => setLiveTV(p => ({ ...p, theme: e.target.value }))}>
                <option>Dark</option>
                <option>Light</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div className="setting-row" style={{ flex: 1, paddingTop: 4 }}>
                <span className="setting-name" style={{ fontSize: 12 }}>Autoplay</span>
                <label className="toggle">
                  <input type="checkbox" checked={liveTV.autoplay} onChange={() => setLiveTV(p => ({ ...p, autoplay: !p.autoplay }))} />
                  <span className="toggle-slider" />
                </label>
              </div>
              <div className="setting-row" style={{ flex: 1, paddingTop: 4 }}>
                <span className="setting-name" style={{ fontSize: 12 }}>Mute on Start</span>
                <label className="toggle">
                  <input type="checkbox" checked={liveTV.mute} onChange={() => setLiveTV(p => ({ ...p, mute: !p.mute }))} />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}>
              💾 Save Live TV Embed
            </button>
          </div>
        </div>

        {/* Social Media Feed Widget */}
        <div className="widget-section-card">
          <div className="widget-section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📱</span>
              <span className="a-card-title">Social Media Feed Widget</span>
            </div>
          </div>
          <div className="widget-section-body">
            <div className="form-group">
              <label className="form-label">Platforms to Display</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                {[
                  { key: 'youtube', label: '▶️ YouTube' },
                  { key: 'facebook', label: 'f Facebook' },
                  { key: 'tiktok', label: '♪ TikTok' },
                  { key: 'instagram', label: '📸 Instagram' },
                ].map(pl => (
                  <label key={pl.key} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={socialFeed[pl.key]}
                      onChange={() => setSocialFeed(p => ({ ...p, [pl.key]: !p[pl.key] }))}
                      style={{ accentColor: 'var(--purple)', width: 14, height: 14 }}
                    />
                    <span style={{ fontSize: 13, color: 'var(--text)' }}>{pl.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Feed Refresh Interval</label>
              <select className="filter-select" style={{ width: '100%' }} value={socialFeed.interval}
                onChange={e => setSocialFeed(p => ({ ...p, interval: e.target.value }))}>
                <option value="15min">Every 15 minutes</option>
                <option value="30min">Every 30 minutes</option>
                <option value="1hr">Every 1 hour</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Max Items to Show: {socialFeed.maxItems}</label>
              <input
                type="range" min="4" max="24" step="4"
                value={socialFeed.maxItems}
                onChange={e => setSocialFeed(p => ({ ...p, maxItems: parseInt(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--purple)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                <span>4</span><span>8</span><span>12</span><span>16</span><span>20</span><span>24</span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
              💾 Save Social Feed Widget
            </button>
          </div>
        </div>

        {/* Breaking News Ticker Widget */}
        <div className="widget-section-card">
          <div className="widget-section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📢</span>
              <span className="a-card-title">Breaking News Ticker</span>
            </div>
          </div>
          <div className="widget-section-body">
            <div className="form-group">
              <label className="form-label">Scroll Speed</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Slow', 'Normal', 'Fast'].map(s => (
                  <button
                    key={s}
                    className={`btn btn-sm ${ticker.speed === s ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setTicker(p => ({ ...p, speed: s }))}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Background Color</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                {TICKER_SWATCHES.map(sw => (
                  <button
                    key={sw.value}
                    title={sw.label}
                    onClick={() => setTicker(p => ({ ...p, bgColor: sw.value }))}
                    style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: sw.value, border: ticker.bgColor === sw.value ? '2px solid var(--purple)' : '2px solid transparent',
                      cursor: 'pointer', flexShrink: 0,
                    }}
                  />
                ))}
                <input
                  type="color"
                  value={ticker.bgColor}
                  onChange={e => setTicker(p => ({ ...p, bgColor: e.target.value }))}
                  style={{ width: 28, height: 28, borderRadius: 6, border: 'none', padding: 0, cursor: 'pointer', background: 'transparent' }}
                  title="Custom color"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Text Color</label>
              <input type="color" value={ticker.textColor}
                onChange={e => setTicker(p => ({ ...p, textColor: e.target.value }))}
                style={{ width: 40, height: 30, borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--surface2)' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Separator Character</label>
              <input className="form-input" value={ticker.separator}
                onChange={e => setTicker(p => ({ ...p, separator: e.target.value }))}
                style={{ maxWidth: 80 }}
              />
            </div>
            {/* Preview */}
            <div style={{
              background: ticker.bgColor, color: ticker.textColor,
              padding: '8px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600,
              overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: 12,
            }}>
              BREAKING {ticker.separator} Sample ticker text {ticker.separator} Another headline
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              💾 Save Ticker Settings
            </button>
          </div>
        </div>

        {/* Program Schedule Widget */}
        <div className="widget-section-card">
          <div className="widget-section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📅</span>
              <span className="a-card-title">Program Schedule Widget</span>
            </div>
          </div>
          <div className="widget-section-body">
            <div className="form-group">
              <label className="form-label">Default View</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Daily', 'Weekly'].map(v => (
                  <button
                    key={v}
                    className={`btn btn-sm ${schedule.defaultView === v ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setSchedule(p => ({ ...p, defaultView: v }))}
                  >{v}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Time Format</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['12hr', '24hr'].map(f => (
                  <button
                    key={f}
                    className={`btn btn-sm ${schedule.timeFormat === f ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setSchedule(p => ({ ...p, timeFormat: f }))}
                  >{f}</button>
                ))}
              </div>
            </div>
            <div className="setting-row">
              <div className="setting-info">
                <div className="setting-name">Highlight Current Program</div>
                <div className="setting-desc">Bold and mark the currently airing program</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={schedule.highlightCurrent}
                  onChange={() => setSchedule(p => ({ ...p, highlightCurrent: !p.highlightCurrent }))} />
                <span className="toggle-slider" />
              </label>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}>
              💾 Save Schedule Widget
            </button>
          </div>
        </div>

        {/* Cookie Consent Banner */}
        <div className="widget-section-card">
          <div className="widget-section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>🍪</span>
              <span className="a-card-title">Cookie Consent Banner</span>
            </div>
            <label className="toggle">
              <input type="checkbox" checked={cookie.active} onChange={() => setCookie(p => ({ ...p, active: !p.active }))} />
              <span className="toggle-slider" />
            </label>
          </div>
          <div className="widget-section-body">
            <div className="form-group">
              <label className="form-label">Banner Message</label>
              <textarea className="form-input form-textarea" value={cookie.message}
                onChange={e => setCookie(p => ({ ...p, message: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Accept Button Text</label>
              <input className="form-input" value={cookie.btnText}
                onChange={e => setCookie(p => ({ ...p, btnText: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Privacy Policy Link</label>
              <input className="form-input" value={cookie.privacyLink}
                onChange={e => setCookie(p => ({ ...p, privacyLink: e.target.value }))} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              💾 Save Cookie Banner
            </button>
          </div>
        </div>
      </div>

      {/* Embed Codes Section */}
      <div className="a-card" style={{ marginTop: 4 }}>
        <div className="a-card-header">
          <span className="a-card-title">{'</>'} Widget Embed Codes</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Copy & paste into any website</span>
        </div>
        <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {EMBED_CODES.map(ec => (
            <div key={ec.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{ec.title}</span>
                <button
                  className={`btn btn-sm ${copied === ec.id ? 'btn-success' : 'btn-ghost'}`}
                  onClick={() => copyCode(ec.id, ec.code)}
                >
                  {copied === ec.id ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="code-box">{ec.code}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
