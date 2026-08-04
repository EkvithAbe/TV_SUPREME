import React, { useState } from 'react';

const SERVICES = [
  {
    icon: '🎬',
    title: 'Studio Rental',
    desc: 'Professional broadcast-grade studio with full lighting rig, green screen, and teleprompter. Available in half-day or full-day slots.',
    price: 'LKR 45,000 – 85,000 / day',
    bookings: 3,
  },
  {
    icon: '🚐',
    title: 'OB Van Services',
    desc: 'Outside broadcast van with satellite uplink, multi-camera setup, and live switching capability for events across Sri Lanka.',
    price: 'LKR 120,000 – 250,000 / event',
    bookings: 2,
  },
  {
    icon: '📡',
    title: 'Live Streaming',
    desc: 'Full-scale live streaming production for corporate events, concerts, and conferences with professional camera operators.',
    price: 'LKR 35,000 – 90,000 / event',
    bookings: 5,
  },
  {
    icon: '🎥',
    title: 'Video Production',
    desc: 'End-to-end video production including scripting, shooting, editing, and post-production for commercials and corporate films.',
    price: 'LKR 75,000 – 500,000',
    bookings: 4,
  },
  {
    icon: '📸',
    title: 'Event Coverage',
    desc: 'Professional event coverage with dedicated camera team, same-day editing, and broadcast-ready footage delivery.',
    price: 'LKR 50,000 – 150,000',
    bookings: 6,
  },
  {
    icon: '🏢',
    title: 'Corporate Communications',
    desc: 'Comprehensive corporate communications packages including internal videos, training films, and CEO message production.',
    price: 'LKR 100,000 – 400,000',
    bookings: 2,
  },
];

const BOOKINGS = [
  { id: 1, client: 'Dialog Axiata', service: 'Studio Rental', date: '2026-06-15', duration: 'Full Day', status: 'Confirmed' },
  { id: 2, client: 'Colombo Fashion Week', service: 'Live Streaming', date: '2026-06-18', duration: '6 hours', status: 'Confirmed' },
  { id: 3, client: 'Bank of Ceylon', service: 'Video Production', date: '2026-06-22', duration: '3 days', status: 'Pending' },
  { id: 4, client: 'University of Moratuwa', service: 'Event Coverage', date: '2026-06-28', duration: '1 day', status: 'Confirmed' },
  { id: 5, client: 'Sri Lanka Tourism', service: 'OB Van Services', date: '2026-07-04', duration: '2 days', status: 'Pending' },
];

export default function ProductionPage() {
  const [showBook, setShowBook] = useState(null);

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Production Services</div>
          <div className="a-page-sub">Manage studio bookings, OB van, and production service requests</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Download Rate Card</button>
          <button className="btn btn-primary">+ New Booking</button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="a-stat-card purple">
          <div className="a-stat-value">6</div>
          <div className="a-stat-label">Service Packages</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-value">22</div>
          <div className="a-stat-label">Total Bookings</div>
          <div className="a-stat-trend up">↑ 4 this month</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-value">3</div>
          <div className="a-stat-label">Pending Confirm</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-value">LKR 1.2M</div>
          <div className="a-stat-label">Revenue YTD</div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="three-col" style={{ marginBottom: 24 }}>
        {SERVICES.map(s => (
          <div className="service-card" key={s.title}>
            <div className="service-icon">{s.icon}</div>
            <div className="service-title">{s.title}</div>
            <div className="service-desc">{s.desc}</div>
            <div className="service-price">{s.price}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{s.bookings} bookings this month</span>
              <button className="btn btn-primary btn-sm" onClick={() => setShowBook(s.title)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Recent Bookings</span>
          <button className="btn btn-ghost btn-sm">View All Bookings</button>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Service</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map(b => (
                <tr key={b.id}>
                  <td className="muted">{b.id}</td>
                  <td style={{ fontWeight: 600 }}>{b.client}</td>
                  <td className="muted">{b.service}</td>
                  <td className="muted">{b.date}</td>
                  <td className="muted">{b.duration}</td>
                  <td>
                    <span className={`badge ${b.status === 'Confirmed' ? 'badge-published' : 'badge-pending'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      {b.status === 'Pending' && <button className="btn btn-success btn-sm">Confirm</button>}
                      <button className="btn btn-danger btn-sm">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Modal */}
      {showBook && (
        <div className="a-modal-overlay" onClick={() => setShowBook(null)}>
          <div className="a-modal" onClick={e => e.stopPropagation()}>
            <div className="a-modal-header">
              <span className="a-modal-title">Book: {showBook}</span>
              <button className="a-modal-close" onClick={() => setShowBook(null)}>×</button>
            </div>
            <div className="a-modal-body">
              <div className="form-group">
                <label className="form-label">Client / Company Name</label>
                <input className="form-input" placeholder="Company name" />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Person</label>
                <input className="form-input" placeholder="Full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="contact@company.lk" />
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Date</label>
                <input className="form-input" type="date" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Additional Requirements</label>
                <textarea className="form-input form-textarea" placeholder="Any special requirements..." />
              </div>
            </div>
            <div className="a-modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowBook(null)}>Cancel</button>
              <button className="btn btn-primary">Submit Booking Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
