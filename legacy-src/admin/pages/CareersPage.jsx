import React, { useState } from 'react';
import { CAREERS } from '../adminData';

export default function CareersPage() {
  const [showModal, setShowModal] = useState(false);

  const totalApps = CAREERS.reduce((sum, j) => sum + j.applications, 0);

  return (
    <div className="a-page">
      <div className="a-page-header">
        <div>
          <div className="a-page-title">Careers Management</div>
          <div className="a-page-sub">Manage job postings and track applicants</div>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm">View Public Page</button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Post New Job</button>
        </div>
      </div>

      {/* Stats */}
      <div className="a-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="a-stat-card green">
          <div className="a-stat-icon">💼</div>
          <div className="a-stat-value">{CAREERS.length}</div>
          <div className="a-stat-label">Open Positions</div>
        </div>
        <div className="a-stat-card blue">
          <div className="a-stat-icon">📋</div>
          <div className="a-stat-value">{totalApps}</div>
          <div className="a-stat-label">Total Applications</div>
        </div>
        <div className="a-stat-card gold">
          <div className="a-stat-icon">🔍</div>
          <div className="a-stat-value">8</div>
          <div className="a-stat-label">Under Review</div>
        </div>
        <div className="a-stat-card purple">
          <div className="a-stat-icon">✅</div>
          <div className="a-stat-value">3</div>
          <div className="a-stat-label">Interviews Scheduled</div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Open Positions ({CAREERS.length})</span>
          <div className="flex gap-8">
            <select className="filter-select">
              <option>All Departments</option>
              <option>News & Current Affairs</option>
              <option>Production</option>
              <option>Digital</option>
              <option>Marketing</option>
            </select>
          </div>
        </div>
        <div className="a-table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Position</th>
                <th>Department</th>
                <th>Type</th>
                <th>Deadline</th>
                <th>Applications</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {CAREERS.map((job, i) => (
                <tr key={job.id}>
                  <td className="muted">{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{job.title}</td>
                  <td className="muted">{job.department}</td>
                  <td>
                    <span className={`badge ${job.type === 'Full-time' ? 'badge-published' : 'badge-gold'}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="muted">{job.deadline}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700 }}>{job.applications}</span>
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 10, padding: '3px 7px' }}>View</button>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-published">{job.status}</span>
                  </td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm">Applicants</button>
                      <button className="btn btn-danger btn-sm">Close</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications by Department */}
      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Applications by Department</span>
        </div>
        <div className="a-card-body">
          <div className="chart-bar-wrap">
            {[
              { label: 'Digital', val: 29, pct: 80 },
              { label: 'Marketing', val: 21, pct: 58 },
              { label: 'News & Affairs', val: 14, pct: 39 },
              { label: 'Production', val: 15, pct: 42 },
            ].map(d => (
              <div className="chart-bar-row" key={d.label}>
                <div className="chart-bar-label">{d.label}</div>
                <div className="chart-bar-track">
                  <div className="chart-bar-fill purple" style={{ width: `${d.pct}%` }} />
                </div>
                <div className="chart-bar-val">{d.val} apps</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Job Modal */}
      {showModal && (
        <div className="a-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="a-modal" onClick={e => e.stopPropagation()}>
            <div className="a-modal-header">
              <span className="a-modal-title">Post New Job</span>
              <button className="a-modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="a-modal-body">
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input className="form-input" placeholder="e.g. Senior News Reporter" />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select className="form-input">
                  <option>News & Current Affairs</option>
                  <option>Production</option>
                  <option>Digital</option>
                  <option>Marketing</option>
                  <option>Management</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Employment Type</label>
                <select className="form-input">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Application Deadline</label>
                <input className="form-input" type="date" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Job Description</label>
                <textarea className="form-input form-textarea" style={{ minHeight: 100 }} placeholder="Describe the role, responsibilities, and requirements..." />
              </div>
            </div>
            <div className="a-modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary">Post Job</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
