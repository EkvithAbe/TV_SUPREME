import React, { useState } from 'react';

const MEMBERS = [
  { id: 1, name: 'Kasun Perera', email: 'kasun.p@gmail.com', joined: '2026-01-15', plan: 'Premium', status: 'Active', avatar: 'KP' },
  { id: 2, name: 'Dilani Silva', email: 'dilani.s@yahoo.com', joined: '2026-02-08', plan: 'Free', status: 'Active', avatar: 'DS' },
  { id: 3, name: 'Ruwan Fernando', email: 'ruwan.f@outlook.com', joined: '2026-03-20', plan: 'Premium', status: 'Active', avatar: 'RF' },
  { id: 4, name: 'Amara Jayawardena', email: 'amara.j@gmail.com', joined: '2026-04-02', plan: 'Free', status: 'Active', avatar: 'AJ' },
  { id: 5, name: 'Nimal Bandara', email: 'nimal.b@gmail.com', joined: '2026-04-18', plan: 'Free', status: 'Inactive', avatar: 'NB' },
  { id: 6, name: 'Sanduni Wickramasinghe', email: 'sanduni.w@hotmail.com', joined: '2026-05-01', plan: 'Premium', status: 'Active', avatar: 'SW' },
  { id: 7, name: 'Pasindu Sanjula', email: 'pasindusanjula200404211619@gmail.com', joined: '2026-02-14', plan: 'Free', status: 'Active', avatar: 'PS' },
  { id: 8, name: 'Chamari Rathnayake', email: 'chamari.r@gmail.com', joined: '2026-05-22', plan: 'Premium', status: 'Active', avatar: 'CR' },
  { id: 9, name: 'Malith Senanayake', email: 'malith.s@gmail.com', joined: '2026-06-01', plan: 'Free', status: 'Active', avatar: 'MS' },
  { id: 10, name: 'Yasara Wijesekara', email: 'yasara.w@hotmail.com', joined: '2026-06-10', plan: 'Free', status: 'Active', avatar: 'YW' },
];

const COLORS = [
  'var(--purple)', 'var(--pink)', 'var(--blue)', 'var(--green)', 'var(--gold)',
  'var(--red)', '#8B5CF6', '#06B6D4', '#F97316', '#14B8A6',
];

export default function MembersPage() {
  const [search, setSearch] = useState('');
  const [plan, setPlan] = useState('All');
  const [status, setStatus] = useState('All');

  const filtered = MEMBERS.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = plan === 'All' || m.plan === plan;
    const matchStatus = status === 'All' || m.status === status;
    return matchSearch && matchPlan && matchStatus;
  });

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Members</div>
          <div className="a-page-sub">Manage registered members and subscriptions</div>
        </div>
        <button className="btn btn-primary">+ Add Member</button>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="a-stat-card purple">
          <div className="a-stat-value">1,247</div>
          <div className="a-stat-label">Total Members</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-value">89</div>
          <div className="a-stat-label">New This Month</div>
          <div className="a-stat-trend up">↑ 12% vs last month</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-value">43</div>
          <div className="a-stat-label">Premium Members</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-value">3</div>
          <div className="a-stat-label">Pending Approval</div>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search members..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={plan} onChange={e => setPlan(e.target.value)}>
          <option>All</option>
          <option>Free</option>
          <option>Premium</option>
        </select>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)}>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <select className="filter-select">
          <option>Sort: Newest First</option>
          <option>Sort: Oldest First</option>
          <option>Sort: A-Z</option>
        </select>
        <button className="btn btn-ghost btn-sm">Export CSV</button>
      </div>

      {/* Table */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Members ({filtered.length})</span>
          <div className="flex gap-8">
            <button className="btn btn-ghost btn-sm">Bulk Email</button>
            <button className="btn btn-danger btn-sm">Delete Selected</button>
          </div>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 32 }}><input type="checkbox" /></th>
                <th>Member</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%',
                        background: COLORS[i % COLORS.length],
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0
                      }}>
                        {m.avatar}
                      </div>
                      <span style={{ fontWeight: 600 }}>{m.name}</span>
                    </div>
                  </td>
                  <td className="muted">{m.email}</td>
                  <td className="muted">{m.joined}</td>
                  <td>
                    <span className={`badge ${m.plan === 'Premium' ? 'badge-gold' : 'badge-draft'}`}>{m.plan}</span>
                  </td>
                  <td>
                    <span className={`badge ${m.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>{m.status}</span>
                  </td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm">Profile</button>
                      <button className="btn btn-danger btn-sm">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Showing {filtered.length} of 1,247 members</span>
          <div className="flex gap-8">
            <button className="btn btn-ghost btn-sm">← Previous</button>
            <button className="btn btn-ghost btn-sm" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }}>1</button>
            <button className="btn btn-ghost btn-sm">2</button>
            <button className="btn btn-ghost btn-sm">3</button>
            <button className="btn btn-ghost btn-sm">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
