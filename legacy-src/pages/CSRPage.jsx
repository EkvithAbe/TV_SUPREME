import { useEffect } from 'react';
import { Users, Heart, Globe, BookOpen, Leaf, School } from 'lucide-react';

const IMPACT_STATS = [
  { value: '50,000+',  label: 'People Reached' },
  { value: '12',       label: 'Active Projects' },
  { value: '25',       label: 'Community Partners' },
  { value: 'LKR 5M',  label: 'Total Invested' },
];

const INITIATIVES = [
  {
    emoji: '📚',
    icon: BookOpen,
    title: 'Media Literacy Programs',
    desc: 'Educating students across 50 schools in digital media literacy — helping the next generation navigate fake news, social media and responsible content creation.',
    progress: 85,
    beneficiaries: '15,000 students',
    color: 'from-blue-500 to-blue-700',
    barColor: 'bg-blue-500',
  },
  {
    emoji: '🎤',
    icon: Users,
    title: 'Youth Journalism Initiative',
    desc: 'Training 200 young reporters from rural communities across Sri Lanka in digital storytelling, news writing and video journalism — giving rural voices a platform.',
    progress: 60,
    beneficiaries: '200 youth reporters',
    color: 'from-supreme-vivid to-supreme-bright',
    barColor: 'bg-supreme-vivid',
  },
  {
    emoji: '🌿',
    icon: Leaf,
    title: 'Environmental Awareness',
    desc: 'Climate change awareness campaigns and environmental documentaries reaching 1M+ viewers — partnering with universities and the Ministry of Environment.',
    progress: 90,
    beneficiaries: '1M+ viewers',
    color: 'from-emerald-500 to-green-700',
    barColor: 'bg-emerald-500',
  },
  {
    emoji: '🏫',
    icon: School,
    title: 'Education for All',
    desc: 'Scholarships and broadcast equipment donations to 12 underprivileged schools — enabling media studies curricula where resources were previously unavailable.',
    progress: 70,
    beneficiaries: '12 schools',
    color: 'from-amber-500 to-orange-600',
    barColor: 'bg-amber-500',
  },
];

const TIMELINE = [
  {
    date: 'May 2026',
    title: 'Rural Media Literacy Tour — Northern Province',
    desc: 'TV Supreme educators visited 8 schools in Vavuniya, Kilinochchi and Mannar conducting 2-day media literacy workshops for 1,200 students.',
  },
  {
    date: 'April 2026',
    title: 'Annual Sustainability Report Launch',
    desc: 'Released our 2025 CSR Impact Report at a press conference attended by 40+ community partners and government officials.',
  },
  {
    date: 'March 2026',
    title: 'Youth Journalism Awards Ceremony',
    desc: '45 young reporters from our Youth Journalism Initiative were recognised at a ceremony broadcast live on TV Supreme.',
  },
  {
    date: 'Feb 2026',
    title: 'Equipment Donation — Matara Schools',
    desc: 'Donated broadcast cameras, microphones and editing workstations to 3 secondary schools in the Southern Province.',
  },
  {
    date: 'Jan 2026',
    title: 'Climate Documentary Series Launch',
    desc: 'Premiered "Our Island, Our Future" — a 6-part climate awareness documentary series produced in partnership with UNDP Sri Lanka.',
  },
];

const PARTNERS = [
  { name: 'UNDP Sri Lanka',          color: 'bg-blue-700' },
  { name: 'Ministry of Education',   color: 'bg-emerald-700' },
  { name: 'University of Colombo',   color: 'bg-purple-700' },
  { name: 'Sarvodaya Shramadana',    color: 'bg-amber-700' },
];

export default function CSRPage() {
  useEffect(() => {
    document.title = 'CSR | TV Supreme — Community & Social Responsibility';
  }, []);

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-supreme-dark to-supreme-deep py-20 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, #10B981 0%, transparent 55%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Corporate Social Responsibility
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-4">
            Community & Social Responsibility
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Building a better Sri Lanka through media — one community at a time
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-white dark:bg-supreme-deep border-b border-gray-100 dark:border-supreme-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {IMPACT_STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold font-heading text-emerald-600 dark:text-emerald-400">{value}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-6 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Active Initiatives</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {INITIATIVES.map(initiative => (
            <div key={initiative.title} className="bg-white dark:bg-supreme-deep rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
              <div className={`bg-gradient-to-r ${initiative.color} p-6 text-white flex items-center gap-4`}>
                <span className="text-4xl select-none">{initiative.emoji}</span>
                <h3 className="font-bold text-xl font-heading">{initiative.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{initiative.desc}</p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="font-bold text-gray-800 dark:text-white">{initiative.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-supreme-dark rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full ${initiative.barColor}`}
                    style={{ width: `${initiative.progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Beneficiaries: <span className="font-semibold text-gray-700 dark:text-gray-200">{initiative.beneficiaries}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-6 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Recent Activities</h2>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-supreme-primary/30" />
            <div className="space-y-8">
              {TIMELINE.map((event, i) => (
                <div key={i} className="relative pl-14">
                  <div className="absolute left-3 top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-supreme-deep shadow" />
                  <div className="bg-supreme-light dark:bg-supreme-dark rounded-2xl p-5 shadow-card">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full mb-2 inline-block">
                      {event.date}
                    </span>
                    <h3 className="font-bold font-heading text-supreme-dark dark:text-white mt-2 mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Community Partners</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {PARTNERS.map(({ name, color }) => (
            <div key={name} className="flex items-center gap-3 bg-white dark:bg-supreme-deep px-5 py-3 rounded-2xl shadow-card">
              <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center shrink-0`}>
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">{name}</span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
