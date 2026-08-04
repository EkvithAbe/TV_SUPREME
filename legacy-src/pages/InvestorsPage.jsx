import { useEffect } from 'react';
import { TrendingUp, Users, Globe, Monitor, Download, Mail, ChevronRight } from 'lucide-react';

const KEY_METRICS = [
  { icon: TrendingUp, value: '+28%',  label: 'Revenue Growth YoY',     color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: Users,      value: '87K',   label: 'Digital Subscribers',    color: 'text-supreme-vivid', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { icon: Globe,      value: '2.1M',  label: 'Monthly Reach',          color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: Monitor,    value: '4',     label: 'Active Platforms',        color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
];

const PARTNERS = [
  { initials: 'MNA', name: 'MediaNet Asia',       color: 'bg-blue-600' },
  { initials: 'DLG', name: 'Dialog Axiata',       color: 'bg-red-600' },
  { initials: 'SLT', name: 'Sri Lanka Tourism',   color: 'bg-emerald-600' },
  { initials: 'BOC', name: 'Bank of Ceylon',      color: 'bg-yellow-600' },
  { initials: 'SLB', name: 'SLB Media Group',     color: 'bg-purple-600' },
  { initials: 'IFC', name: 'IFC Asia Pacific',    color: 'bg-indigo-600' },
  { initials: 'HNB', name: 'Hatton Natl Bank',    color: 'bg-orange-600' },
  { initials: 'UOC', name: 'Univ. of Colombo',    color: 'bg-cyan-700' },
];

const PERFORMANCE = [
  { label: 'Audience Growth',  pct: 75, color: 'bg-supreme-vivid' },
  { label: 'Revenue Growth',   pct: 68, color: 'bg-emerald-500' },
  { label: 'Digital Reach',    pct: 82, color: 'bg-blue-500' },
];

const REPORTS = [
  { year: '2025', size: '4.2 MB',  desc: 'Full annual report including financial statements, operational highlights and digital growth metrics.' },
  { year: '2024', size: '3.8 MB',  desc: 'Annual report covering our first year of major digital expansion and multi-platform launch.' },
  { year: '2023', size: '2.9 MB',  desc: 'Foundation year report documenting our journey from streaming startup to broadcast network.' },
];

const UPDATES = [
  {
    date: 'Jun 2026',
    title: 'Q1 2026 Digital Subscribers Cross 90K Milestone',
    desc: 'TV Supreme digital subscriber base crossed 90,000, representing a 32% year-on-year growth driven by our drama and news content.',
  },
  {
    date: 'Apr 2026',
    title: 'Strategic Partnership with MediaNet Asia Announced',
    desc: 'New distribution agreement with MediaNet Asia expands TV Supreme reach to Malaysia, Singapore and Australia-based diaspora audiences.',
  },
  {
    date: 'Feb 2026',
    title: '2025 Annual Report Released — Record Revenue Growth',
    desc: 'FY2025 saw 28% revenue growth with advertising revenue up 35% and production services contributing 18% of total revenue.',
  },
];

const PARTNERSHIP_TYPES = [
  {
    icon: Monitor, title: 'Media Partnership',
    desc: 'Content syndication, co-production agreements and cross-platform distribution partnerships.',
    color: 'text-supreme-vivid',
  },
  {
    icon: TrendingUp, title: 'Advertising Partnership',
    desc: 'Brand integration, sponsored segments, digital advertising packages and campaign management.',
    color: 'text-emerald-500',
  },
  {
    icon: Globe, title: 'Technology Partnership',
    desc: 'Broadcast technology, streaming infrastructure, AI tools and digital platform development.',
    color: 'text-blue-500',
  },
];

export default function InvestorsPage() {
  useEffect(() => {
    document.title = 'Investors | TV Supreme — Strategic Partners & Annual Reports';
  }, []);

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-b from-supreme-deep to-supreme-dark py-14 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-3">Investors & Strategic Partners</h1>
          <p className="text-supreme-pink text-lg max-w-lg mx-auto">
            TV Supreme is Sri Lanka's fastest-growing digital media network — join us as we scale
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Key Performance Metrics</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {KEY_METRICS.map(({ icon: Icon, value, label, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl p-6 shadow-card border border-white/60 dark:border-white/5 text-center`}>
              <Icon className={`w-7 h-7 ${color} mx-auto mb-3`} />
              <p className={`text-3xl font-extrabold font-heading ${color}`}>{value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Strategic Partners</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {PARTNERS.map(({ initials, name, color }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-white font-extrabold text-base shadow-card`}>
                  {initials}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Highlights */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Performance Highlights</h2>
        </div>
        <div className="bg-white dark:bg-supreme-deep rounded-2xl p-8 shadow-card max-w-2xl">
          <div className="space-y-6">
            {PERFORMANCE.map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">{label}</span>
                  <span className="font-extrabold text-gray-800 dark:text-white">{pct}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-supreme-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Annual Reports</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {REPORTS.map(({ year, size, desc }) => (
              <div key={year} className="bg-supreme-light dark:bg-supreme-dark rounded-2xl p-5 border border-gray-100 dark:border-supreme-primary/20 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-extrabold font-heading text-supreme-primary dark:text-supreme-pink">{year}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-supreme-deep px-2 py-0.5 rounded-md">{size}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{desc}</p>
                <button className="flex items-center gap-2 text-sm font-semibold text-supreme-vivid dark:text-supreme-pink hover:underline">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Latest Investor Updates</h2>
        </div>
        <div className="space-y-4">
          {UPDATES.map((u, i) => (
            <div key={i} className="bg-white dark:bg-supreme-deep rounded-2xl p-5 shadow-card flex gap-5 items-start">
              <div className="shrink-0 text-xs font-bold text-supreme-vivid dark:text-supreme-pink bg-supreme-primary/10 dark:bg-supreme-vivid/10 px-3 py-2 rounded-xl min-w-[70px] text-center">
                {u.date}
              </div>
              <div>
                <h3 className="font-bold font-heading text-supreme-dark dark:text-white mb-1">{u.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Partnership Opportunities</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {PARTNERSHIP_TYPES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-supreme-light dark:bg-supreme-dark rounded-2xl p-5 shadow-card">
                <Icon className={`w-7 h-7 ${color} mb-3`} />
                <h3 className="font-bold font-heading text-supreme-dark dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-supreme-vivid to-supreme-bright rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold font-heading mb-2">Ready to Partner with TV Supreme?</h3>
            <p className="text-white/80 mb-6">Let's discuss how we can grow together across Sri Lanka's digital media landscape.</p>
            <button className="flex items-center gap-2 mx-auto bg-white text-supreme-vivid font-bold px-6 py-3 rounded-xl hover:bg-supreme-light transition-colors">
              <Mail className="w-4 h-4" />
              Contact Our Partnerships Team
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
