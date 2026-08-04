import React, { useState } from 'react';

function Toggle({ defaultChecked, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => { setChecked(e.target.checked); onChange && onChange(e.target.checked); }}
      />
      <span className="toggle-slider" />
    </label>
  );
}

const SITE_SETTINGS = [
  { name: 'Maintenance Mode', desc: 'Put the public website in maintenance mode (shows a holding page)', on: false },
  { name: 'Dark Mode Default', desc: 'Default all new visitors to dark mode theme', on: true },
  { name: 'Sinhala as Default Language', desc: 'Show Sinhala content as the default language for homepage', on: true },
  { name: 'Analytics Tracking', desc: 'Enable Google Analytics and Facebook Pixel tracking across the site', on: true },
  { name: 'Cookie Consent Banner', desc: 'Show GDPR-compliant cookie consent banner to EU visitors', on: false },
];

const CONTENT_SETTINGS = [
  { name: 'Auto-publish News', desc: 'Automatically publish approved news articles at scheduled time', on: false },
  { name: 'YouTube Auto-sync', desc: 'Automatically sync new YouTube videos every 6 hours via API', on: true },
  { name: 'Comment Moderation', desc: 'Require admin approval before comments appear on articles', on: true },
  { name: 'Breaking News Alert', desc: 'Enable push notifications for breaking news articles', on: true },
  { name: 'Related Content Suggestions', desc: 'Show AI-powered related article suggestions at bottom of posts', on: false },
];

const NOTIF_SETTINGS = [
  { name: 'Email Alerts', desc: 'Send email notifications for new comments, contacts, and system events', on: true },
  { name: 'Push Notifications', desc: 'Browser push notifications for admin events', on: false },
  { name: 'SMS Alerts', desc: 'SMS notifications for critical system alerts (Dialog SMS gateway)', on: false },
  { name: 'Weekly Digest', desc: 'Send weekly performance digest email every Monday at 9 AM', on: true },
];

const SEC_SETTINGS = [
  { name: 'Two-Factor Authentication', desc: 'Require 2FA for all admin logins', on: true },
  { name: 'Force SSL / HTTPS', desc: 'Redirect all HTTP requests to HTTPS automatically', on: true },
  { name: 'XML-RPC Disabled', desc: 'Disable WordPress XML-RPC endpoint to prevent brute-force attacks', on: true, note: 'SECURITY: XML-RPC should remain disabled — it was identified as a vulnerability on the current site.' },
  { name: 'Login Attempt Limiting', desc: 'Lock out IPs after 5 failed login attempts within 15 minutes', on: true },
  { name: 'Activity Logging', desc: 'Log all admin actions to the security audit trail', on: true },
];

function SettingGroup({ title, settings }) {
  return (
    <div className="setting-group">
      <div className="setting-group-title">{title}</div>
      {settings.map(s => (
        <div className="setting-row" key={s.name}>
          <div className="setting-info">
            <div className="setting-name">{s.name}</div>
            <div className="setting-desc">{s.desc}</div>
            {s.note && (
              <div style={{ marginTop: 4, fontSize: 11, color: 'var(--red)', fontWeight: 600 }}>
                ⚠ {s.note}
              </div>
            )}
          </div>
          <Toggle defaultChecked={s.on} />
        </div>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">System Settings</div>
          <div className="a-page-sub">Configure site, content, notifications, and security settings</div>
        </div>
        <button
          className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
          onClick={handleSave}
        >
          {saved ? '✓ Settings Saved!' : 'Save Settings'}
        </button>
      </div>

      <div className="two-col">
        <div>
          <div className="a-card">
            <div className="a-card-body">
              <SettingGroup title="Site Settings" settings={SITE_SETTINGS} />
              <SettingGroup title="Content Settings" settings={CONTENT_SETTINGS} />
            </div>
          </div>
        </div>
        <div>
          <div className="a-card" style={{ marginBottom: 20 }}>
            <div className="a-card-body">
              <SettingGroup title="Notifications" settings={NOTIF_SETTINGS} />
              <SettingGroup title="Security" settings={SEC_SETTINGS} />
            </div>
          </div>

          {/* API Keys */}
          <div className="a-card">
            <div className="a-card-header">
              <span className="a-card-title">API Keys & Integrations</span>
            </div>
            <div className="a-card-body">
              <div className="form-group">
                <label className="form-label">YouTube Data API Key</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" type="password" defaultValue="AIzaSy••••••••••••••••••••••••••••••" style={{ flex: 1 }} />
                  <button className="btn btn-ghost btn-sm">Reveal</button>
                </div>
                <div className="form-hint">Used for YouTube Data API v3 video sync</div>
              </div>
              <div className="form-group">
                <label className="form-label">Facebook Pixel ID</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" type="password" defaultValue="12345••••••••••" style={{ flex: 1 }} />
                  <button className="btn btn-ghost btn-sm">Reveal</button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Google Analytics Measurement ID</label>
                <input className="form-input" defaultValue="G-XXXXXXXXXXXX" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Rank Math SEO Key</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" type="password" defaultValue="rm_••••••••••••••••••" style={{ flex: 1 }} />
                  <button className="btn btn-ghost btn-sm">Reveal</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="a-card" style={{ marginTop: 20, borderColor: 'rgba(239,68,68,0.3)' }}>
        <div className="a-card-header" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
          <span className="a-card-title" style={{ color: 'var(--red)' }}>⚠ Danger Zone</span>
        </div>
        <div className="a-card-body">
          {[
            { name: 'Clear Cache', desc: 'Clear all site caches including CDN, page cache, and object cache', btn: 'Clear Cache', style: 'btn-warning' },
            { name: 'Export All Data', desc: 'Export all site content, members, and settings as a JSON/XML backup', btn: 'Export', style: 'btn-ghost' },
            { name: 'Reset Settings to Default', desc: 'Reset all settings to factory defaults. This cannot be undone.', btn: 'Reset Settings', style: 'btn-danger' },
          ].map(item => (
            <div className="setting-row" key={item.name}>
              <div className="setting-info">
                <div className="setting-name">{item.name}</div>
                <div className="setting-desc">{item.desc}</div>
              </div>
              <button className={`btn btn-sm ${item.style}`}>{item.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
