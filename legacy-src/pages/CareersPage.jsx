import { useEffect, useState } from 'react';
import { Briefcase, Clock, Calendar, Users, TrendingUp, Star, DollarSign, Palette, ChevronRight, Send } from 'lucide-react';

const WHY_JOIN = [
  { icon: Palette,     label: 'Creative Environment',  desc: 'Work alongside award-winning journalists, producers and digital creators in a fully equipped broadcast facility.',  color: 'text-supreme-vivid' },
  { icon: TrendingUp,  label: 'Growth Opportunities',  desc: 'Fast-track your media career with mentorship, training and the TV Supreme Digital Academy right at your doorstep.', color: 'text-blue-500' },
  { icon: Star,        label: 'Inclusive Culture',      desc: 'We celebrate diversity across ethnicity, language and background — Tamil, Sinhala and English content teams work together.', color: 'text-amber-500' },
  { icon: DollarSign,  label: 'Competitive Benefits',  desc: 'Industry-leading salaries, flexible hours, health insurance, annual bonuses and free access to our Academy courses.', color: 'text-emerald-500' },
];

const JOBS = [
  {
    id: 1, title: 'Senior News Anchor',        dept: 'News Department',  type: 'Full-time', deadline: '2026-07-15', apps: 12,
    desc: 'On-camera presenter for prime-time news bulletins. Requires 5+ years broadcast experience and strong Sinhala/English bilingual skills.',
  },
  {
    id: 2, title: 'Digital Content Producer',  dept: 'Digital Media',    type: 'Full-time', deadline: '2026-07-20', apps: 8,
    desc: 'Produce compelling digital-first content for YouTube, Facebook and TikTok. Expert in short-form video editing and audience analytics.',
  },
  {
    id: 3, title: 'Video Editor',               dept: 'Production',       type: 'Full-time', deadline: '2026-07-10', apps: 23,
    desc: 'Edit broadcast-quality news packages, drama episodes and promotional content using Adobe Premiere Pro and After Effects.',
  },
  {
    id: 4, title: 'Social Media Manager',       dept: 'Marketing',        type: 'Full-time', deadline: '2026-07-25', apps: 15,
    desc: 'Manage and grow TV Supreme\'s presence across all social platforms. Drive engagement, run campaigns and report on KPIs.',
  },
  {
    id: 5, title: 'Camera Operator',            dept: 'Production',       type: 'Contract',  deadline: '2026-07-12', apps: 7,
    desc: 'Operate studio and OB cameras for live broadcasts and location shoots. Sony and Blackmagic camera system experience preferred.',
  },
  {
    id: 6, title: 'Junior Reporter',            dept: 'News Department',  type: 'Full-time', deadline: '2026-08-01', apps: 5,
    desc: 'Cover breaking news stories, conduct interviews and file written + video reports across political, social and economic beats.',
  },
];

const DEPT_COLORS = {
  'News Department': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'Digital Media':   'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Production':      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  'Marketing':       'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
};

const TYPE_COLORS = {
  'Full-time': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Contract':  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

export default function CareersPage() {
  const [formData, setFormData] = useState({ name: '', email: '', position: '', message: '' });

  useEffect(() => {
    document.title = 'Careers | TV Supreme — Join Our Team';
  }, []);

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-supreme-dark via-supreme-deep to-supreme-primary py-20 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 75% 40%, #7C3AED 0%, transparent 55%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-supreme-vivid/30 border border-supreme-pink/30 text-supreme-pink px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            We're Hiring!
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-3">
            Join Our Team
          </h1>
          <p className="text-xl text-supreme-pink font-heading mb-2">ශ්‍රේෂ්ඨ කණ්ඩායමට එකතු වන්න</p>
          <p className="text-white/70 max-w-xl mx-auto mt-4 leading-relaxed">
            Be part of Sri Lanka's most dynamic digital media network. Shape the stories that matter.
          </p>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-supreme-pink">50+</p>
              <p className="text-xs text-white/60 mt-1">Employees</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-supreme-pink">6</p>
              <p className="text-xs text-white/60 mt-1">Open Positions</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-supreme-pink">2018</p>
              <p className="text-xs text-white/60 mt-1">Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Why Join TV Supreme</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_JOIN.map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="bg-white dark:bg-supreme-deep rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <Icon className={`w-8 h-8 ${color} mb-4`} />
              <h3 className="font-bold text-base font-heading text-supreme-dark dark:text-white mb-2">{label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-4 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Current Openings</h2>
          <span className="ml-2 bg-supreme-vivid text-white text-xs font-bold px-2.5 py-1 rounded-full">6 Positions</span>
        </div>
        <div className="space-y-4">
          {JOBS.map(job => (
            <div key={job.id} className="bg-white dark:bg-supreme-deep rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold font-heading text-supreme-dark dark:text-white">{job.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DEPT_COLORS[job.dept] ?? 'bg-gray-100 text-gray-700'}`}>
                      {job.dept}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[job.type]}`}>
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{job.desc}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Deadline: {job.deadline}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {job.apps} applicants</span>
                  </div>
                </div>
                <button className="shrink-0 flex items-center gap-2 bg-supreme-vivid hover:bg-supreme-bright text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
                  Apply Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internship Programs */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Internship Programs</h2>
          </div>
          <div className="bg-gradient-to-r from-supreme-primary/10 to-supreme-vivid/10 dark:from-supreme-primary/20 dark:to-supreme-vivid/20 rounded-2xl p-8 border border-supreme-primary/20">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold font-heading text-supreme-dark dark:text-white mb-2">TV Supreme Graduate Internship</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We offer 3-month paid internship placements for final-year undergraduates in Journalism, Media Studies,
                  IT and Business. Interns work alongside experienced professionals on live broadcasts and digital campaigns.
                  Applications open every January and July.
                </p>
                <div className="flex flex-wrap gap-3 mt-4 text-sm">
                  <span className="bg-white dark:bg-supreme-dark px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 shadow-sm">3-Month Duration</span>
                  <span className="bg-white dark:bg-supreme-dark px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 shadow-sm">Paid Stipend</span>
                  <span className="bg-white dark:bg-supreme-dark px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 shadow-sm">Certificate Provided</span>
                  <span className="bg-white dark:bg-supreme-dark px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 shadow-sm">Mentorship</span>
                </div>
              </div>
              <button className="shrink-0 bg-supreme-vivid hover:bg-supreme-bright text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">General Application</h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Don't see a suitable role? Submit a general application and we'll reach out when a matching position opens.
          </p>
          <div className="bg-white dark:bg-supreme-deep rounded-2xl p-8 shadow-card space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Kasun Perera"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="kasun@example.com"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Applying For</label>
              <input
                type="text"
                placeholder="e.g. Video Editor, News Reporter..."
                value={formData.position}
                onChange={e => setFormData(p => ({ ...p, position: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Cover Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself, your experience and why you want to join TV Supreme..."
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm resize-none"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-supreme-vivid hover:bg-supreme-bright text-white font-bold py-3 rounded-xl transition-colors">
              <Send className="w-4 h-4" />
              Submit Application
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
