import React, { useState } from 'react';
import { SCHEDULE } from '../adminData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CATEGORIES = ['News', 'Religious', 'Lifestyle', 'Entertainment', 'Dramas', 'Infotainment', 'Sports', 'Business'];

function getCatBadge(cat) {
  const map = {
    News: 'badge-breaking',
    Religious: 'badge-gold',
    Lifestyle: 'badge-green',
    Entertainment: 'badge-cat',
    Dramas: 'badge-pink',
    Infotainment: 'badge-blue',
    Sports: 'badge-green',
    Business: 'badge-gold',
  };
  return map[cat] || 'badge-cat';
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState('Monday');
  const [scheduleData, setScheduleData] = useState(SCHEDULE);
  const [saved, setSaved] = useState(false);

  const slots = scheduleData[activeDay] || [];

  function addSlot() {
    setScheduleData(prev => ({
      ...prev,
      [activeDay]: [...prev[activeDay], { time: '00:00', program: 'New Program', category: 'News' }],
    }));
  }

  function removeSlot(i) {
    setScheduleData(prev => ({
      ...prev,
      [activeDay]: prev[activeDay].filter((_, idx) => idx !== i),
    }));
  }

  function updateSlot(i, field, value) {
    setScheduleData(prev => ({
      ...prev,
      [activeDay]: prev[activeDay].map((s, idx) => idx === i ? { ...s, [field]: value } : s),
    }));
  }

  function saveSchedule() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">TV Schedule Manager</div>
          <div className="a-page-sub">Manage daily broadcast schedule for all 7 days</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Import CSV</button>
          <button className="btn btn-ghost btn-sm">Export</button>
          <button
            className={`btn btn-sm ${saved ? 'btn-success' : 'btn-primary'}`}
            onClick={saveSchedule}
          >
            {saved ? '✓ Saved!' : 'Save Schedule'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 20 }}>
        {DAYS.map((day, i) => (
          <div
            className={`a-stat-card ${activeDay === day ? 'purple' : ''}`}
            key={day}
            style={{ cursor: 'pointer', textAlign: 'center' }}
            onClick={() => setActiveDay(day)}
          >
            <div className="a-stat-value" style={{ fontSize: 18 }}>{(scheduleData[day] || []).length}</div>
            <div className="a-stat-label">{DAY_SHORT[i]}</div>
          </div>
        ))}
      </div>

      {/* Day tabs */}
      <div className="day-tabs">
        {DAYS.map((day, i) => (
          <button
            key={day}
            className={`day-tab ${activeDay === day ? 'active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            {DAY_SHORT[i]}
          </button>
        ))}
      </div>

      {/* Schedule Editor */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">{activeDay} Schedule</span>
          <div className="flex gap-8 items-center">
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{slots.length} time slots</span>
            <button className="btn btn-ghost btn-sm" onClick={addSlot}>+ Add Slot</button>
          </div>
        </div>
        <div className="a-card-body">
          {slots.map((slot, i) => (
            <div className="sched-row" key={i} style={{ gap: 12, alignItems: 'center' }}>
              <input
                type="time"
                className="form-input"
                style={{ width: 110, padding: '6px 10px' }}
                value={slot.time}
                onChange={e => updateSlot(i, 'time', e.target.value)}
              />
              <input
                className="form-input"
                style={{ flex: 1 }}
                value={slot.program}
                onChange={e => updateSlot(i, 'program', e.target.value)}
              />
              <select
                className="filter-select"
                style={{ width: 140 }}
                value={slot.category}
                onChange={e => updateSlot(i, 'category', e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <span className={`badge ${getCatBadge(slot.category)}`} style={{ width: 90, justifyContent: 'center' }}>
                {slot.category}
              </span>
              <button className="btn btn-danger btn-sm" onClick={() => removeSlot(i)}>Remove</button>
            </div>
          ))}

          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" onClick={addSlot}>+ Add Time Slot</button>
            <button
              className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
              onClick={saveSchedule}
            >
              {saved ? '✓ Schedule Saved!' : 'Save Schedule'}
            </button>
          </div>
        </div>
      </div>

      {/* Read-only preview */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Preview — {activeDay}</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Read-only view</span>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Program</th>
                <th>Category</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, i) => {
                const next = slots[i + 1];
                let duration = '—';
                if (next) {
                  const [h1, m1] = slot.time.split(':').map(Number);
                  const [h2, m2] = next.time.split(':').map(Number);
                  const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
                  if (diff > 0) duration = `${diff} min`;
                }
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: 'var(--purple)' }}>{slot.time}</td>
                    <td style={{ fontWeight: 600 }}>{slot.program}</td>
                    <td><span className={`badge ${getCatBadge(slot.category)}`}>{slot.category}</span></td>
                    <td className="muted">{duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
