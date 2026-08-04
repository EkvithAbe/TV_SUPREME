import React from 'react';

const COURSES = [
  {
    icon: '📰',
    title: 'Media Training Fundamentals',
    desc: 'Introduction to broadcast journalism, storytelling, and media ethics for aspiring journalists.',
    duration: '8 Weeks',
    seats: 25,
    enrolled: 22,
    status: 'Active',
  },
  {
    icon: '🎤',
    title: 'Journalism & Reporting',
    desc: 'Advanced journalism training covering investigative reporting, interview techniques, and field reporting.',
    duration: '12 Weeks',
    seats: 20,
    enrolled: 18,
    status: 'Active',
  },
  {
    icon: '🤖',
    title: 'AI & Media Training',
    desc: 'Explore AI tools in modern journalism — automated reporting, content optimization, and digital workflows.',
    duration: '6 Weeks',
    seats: 30,
    enrolled: 12,
    status: 'Active',
  },
  {
    icon: '📱',
    title: 'Digital Marketing for Media',
    desc: 'Social media strategy, content creation, SEO, and analytics for media professionals and brands.',
    duration: '6 Weeks',
    seats: 35,
    enrolled: 29,
    status: 'Active',
  },
  {
    icon: '🎭',
    title: 'TV Presenting & Anchoring',
    desc: 'Professional TV presenter training covering on-camera presence, voice, scripting, and live broadcast skills.',
    duration: '4 Weeks',
    seats: 15,
    enrolled: 15,
    status: 'Active',
  },
  {
    icon: '🎬',
    title: 'Video Production Masterclass',
    desc: 'End-to-end video production from pre-production planning to final delivery, including camera, lighting, and editing.',
    duration: '10 Weeks',
    seats: 20,
    enrolled: 0,
    status: 'Upcoming',
  },
];

const WORKSHOPS = [
  { title: 'Breaking News Journalism Bootcamp', date: '2026-06-20', seats: 40, registrations: 32 },
  { title: 'Social Media Live Video Workshop', date: '2026-06-28', seats: 25, registrations: 19 },
  { title: 'AI Tools for Journalists — Half-Day', date: '2026-07-05', seats: 50, registrations: 41 },
  { title: 'Corporate Video Production Seminar', date: '2026-07-12', seats: 30, registrations: 12 },
];

export default function AcademyPage() {
  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Digital Academy</div>
          <div className="a-page-sub">TV Supreme's media training and digital education programs</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">View Public Page</button>
          <button className="btn btn-primary">+ Add Course</button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="a-stat-card purple">
          <div className="a-stat-value">6</div>
          <div className="a-stat-label">Active Courses</div>
        </div>
        <div className="a-stat-card green">
          <div className="a-stat-value">96</div>
          <div className="a-stat-label">Total Enrolled</div>
          <div className="a-stat-trend up">↑ 14 new this month</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-value">4</div>
          <div className="a-stat-label">Upcoming Workshops</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-value">247</div>
          <div className="a-stat-label">Certificates Issued</div>
        </div>
      </div>

      {/* Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {COURSES.map(course => (
          <div className="course-card" key={course.title}>
            <div className="course-icon">{course.icon}</div>
            <div className="course-title">{course.title}</div>
            <div className="course-meta">{course.duration} · {course.enrolled}/{course.seats} seats filled</div>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>{course.desc}</p>
            <div className="progress-wrap">
              <div
                className={`progress-fill ${course.status === 'Active' ? 'purple' : 'blue'}`}
                style={{ width: `${course.seats > 0 ? (course.enrolled / course.seats) * 100 : 0}%` }}
              />
            </div>
            <div style={{ marginTop: 8, marginBottom: 12, fontSize: 11, color: 'var(--muted)' }}>
              {course.seats > 0 ? Math.round((course.enrolled / course.seats) * 100) : 0}% enrolled
            </div>
            <div className="course-footer">
              <span className={`badge ${course.status === 'Active' ? 'badge-published' : 'badge-upcoming'}`}>
                {course.status}
              </span>
              <button className="btn btn-ghost btn-sm">Manage</button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Workshops */}
      <div className="a-card" style={{ marginBottom: 20 }}>
        <div className="a-card-header">
          <span className="a-card-title">Upcoming Workshops & Seminars</span>
          <button className="btn btn-ghost btn-sm">+ Schedule Workshop</button>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Workshop Title</th>
                <th>Date</th>
                <th>Seats</th>
                <th>Registrations</th>
                <th>Fill Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {WORKSHOPS.map(w => (
                <tr key={w.title}>
                  <td style={{ fontWeight: 600 }}>{w.title}</td>
                  <td className="muted">{w.date}</td>
                  <td>{w.seats}</td>
                  <td style={{ fontWeight: 600 }}>{w.registrations}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: 'var(--surface2)', borderRadius: 3, overflow: 'hidden', minWidth: 60 }}>
                        <div style={{
                          height: '100%', background: 'var(--purple)', borderRadius: 3,
                          width: `${(w.registrations / w.seats) * 100}%`
                        }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--muted)', width: 32 }}>
                        {Math.round((w.registrations / w.seats) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm">Registrants</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certifications */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Certifications</span>
        </div>
        <div className="a-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { title: 'Media Professional Certificate', issued: 124 },
              { title: 'Journalism Excellence Award', issued: 67 },
              { title: 'Digital Media Specialist', issued: 56 },
            ].map(cert => (
              <div key={cert.title} style={{
                background: 'var(--surface2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: 14, display: 'flex', alignItems: 'center', gap: 12
              }}>
                <div style={{ fontSize: 28 }}>🏆</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{cert.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{cert.issued} certificates issued</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
