import React from 'react';

const INITIATIVES = [
  {
    icon: '📚',
    title: 'Media Literacy Programs',
    desc: 'Free workshops in schools and universities to promote critical media consumption and digital citizenship among young Sri Lankans.',
    progress: 72,
    beneficiaries: '4,200',
    status: 'Active',
    color: 'purple',
  },
  {
    icon: '🌱',
    title: 'Youth Development',
    desc: 'Internship and mentorship programs providing hands-on broadcasting experience to university students and young graduates.',
    progress: 60,
    beneficiaries: '840',
    status: 'Active',
    color: 'green',
  },
  {
    icon: '🏫',
    title: 'Education Projects',
    desc: 'Partnering with rural schools to provide educational content, free access to TV Supreme\'s learning programs, and infrastructure support.',
    progress: 45,
    beneficiaries: '12,000',
    status: 'Active',
    color: 'blue',
  },
  {
    icon: '🌿',
    title: 'Environmental Initiatives',
    desc: 'Green studio operations, zero-plastic events policy, and collaboration with environmental NGOs on climate awareness campaigns.',
    progress: 30,
    beneficiaries: 'Island-wide',
    status: 'Active',
    color: 'green',
  },
];

const TIMELINE = [
  { icon: '📺', title: 'Launched "Media for All" Campaign', desc: 'Free media literacy screening at 12 schools in Gampaha district', time: '2 days ago' },
  { icon: '🎓', title: 'Batch 3 Internship Program Completed', desc: '24 students completed 3-month internship at TV Supreme', time: '1 week ago' },
  { icon: '🌿', title: 'Solar Panels Installed at Studio A', desc: 'Reduced studio carbon footprint by an estimated 40%', time: '2 weeks ago' },
  { icon: '🤝', title: 'MoU Signed with University of Kelaniya', desc: 'Journalism partnership for research and training programs', time: '1 month ago' },
  { icon: '📚', title: 'Library Equipment Donated to 5 Rural Schools', desc: 'TV screens and content access for 2,000 students in Hambantota', time: '1 month ago' },
];

export default function CSRPage() {
  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Community & CSR</div>
          <div className="a-page-sub">Corporate Social Responsibility initiatives and community impact</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">Download CSR Report</button>
          <button className="btn btn-primary">+ Add Initiative</button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="a-stat-card purple">
          <div className="a-stat-value">4</div>
          <div className="a-stat-label">Active Initiatives</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-value">17,040+</div>
          <div className="a-stat-label">Lives Impacted</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-value">LKR 4.2M</div>
          <div className="a-stat-label">CSR Budget 2026</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-value">23</div>
          <div className="a-stat-label">Partner Organizations</div>
        </div>
      </div>

      {/* Initiative Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
        {INITIATIVES.map(init => (
          <div className="a-card" key={init.title} style={{ margin: 0 }}>
            <div className="a-card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: `rgba(124,58,237,0.15)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0
                }}>
                  {init.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{init.title}</div>
                  <span className="badge badge-published">{init.status}</span>
                </div>
                <button className="btn btn-ghost btn-sm">Edit</button>
              </div>

              <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>{init.desc}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>Progress</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{init.progress}%</span>
              </div>
              <div className="progress-wrap">
                <div className={`progress-fill ${init.color}`} style={{ width: `${init.progress}%` }} />
              </div>

              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  Beneficiaries: <strong style={{ color: 'var(--text)' }}>{init.beneficiaries}</strong>
                </span>
                <button className="btn btn-ghost btn-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Recent CSR Activity</span>
          <button className="btn btn-ghost btn-sm">View All</button>
        </div>
        <div className="a-card-body">
          <div style={{ padding: '8px 0' }}>
            {TIMELINE.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot">{item.icon}</div>
                <div className="timeline-body">
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-desc">{item.desc}</div>
                  <div style={{ fontSize: 11, color: 'var(--border)', marginTop: 4 }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
