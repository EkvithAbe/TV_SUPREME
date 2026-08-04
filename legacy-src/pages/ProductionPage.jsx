import { useEffect, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const SERVICES = [
  {
    emoji: '🎬',
    title: 'Studio Rental',
    desc: 'Professional broadcast studio with full 3-point lighting rig, cyclorama wall, green screen, and state-of-the-art sound booth.',
    price: 'from LKR 15,000/hr',
    features: ['4K camera setup', 'Sound booth', 'Green screen', 'Makeup room'],
  },
  {
    emoji: '📡',
    title: 'OB Van Services',
    desc: 'Mobile broadcast unit for live event coverage anywhere in Sri Lanka — sports, concerts, conferences and government events.',
    price: 'from LKR 50,000/day',
    features: ['Live switching', 'Satellite uplink', '3 cameras', 'Audio mixing'],
  },
  {
    emoji: '🔴',
    title: 'Live Streaming',
    desc: 'Multi-platform live streaming for events up to 100,000 concurrent viewers — YouTube, Facebook, custom RTMP endpoints.',
    price: 'from LKR 25,000/event',
    features: ['Multi-platform', 'Up to 100K viewers', 'Graphics overlay', 'Recording included'],
  },
  {
    emoji: '🎥',
    title: 'Video Production',
    desc: 'Full-service production from concept to delivery — TV commercials, documentaries, corporate films and social media content.',
    price: 'from LKR 80,000/project',
    features: ['Concept to delivery', 'Scriptwriting', 'Professional grading', 'Motion graphics'],
  },
  {
    emoji: '🏆',
    title: 'Event Coverage',
    desc: 'Full crew event coverage — multiple cameras, professional sound, lighting design, same-day editing and delivery.',
    price: 'from LKR 40,000/event',
    features: ['Multi-camera', 'Same-day edit', 'Live or recorded', 'Drone available'],
  },
  {
    emoji: '💼',
    title: 'Corporate Communications',
    desc: 'Press conferences, CEO messages, board meeting recordings, investor presentations and crisis communications support.',
    price: 'from LKR 20,000/session',
    features: ['Press conf.', 'CEO messaging', 'Board meetings', 'Script coaching'],
  },
];

const CLIENTS = [
  { initials: 'DLG', name: 'Dialog Axiata',     color: 'bg-red-500' },
  { initials: 'SLT', name: 'Sri Lanka Telecom', color: 'bg-blue-600' },
  { initials: 'BOC', name: 'Bank of Ceylon',    color: 'bg-yellow-600' },
  { initials: 'SLT', name: 'Sri Lanka Tourism', color: 'bg-emerald-600' },
  { initials: 'MAS', name: 'MAS Holdings',      color: 'bg-purple-600' },
  { initials: 'HNB', name: 'Hatton Natl Bank',  color: 'bg-orange-600' },
];

const SERVICE_OPTIONS = SERVICES.map(s => s.title);

export default function ProductionPage() {
  const [form, setForm] = useState({ name: '', company: '', service: '', date: '', budget: '', message: '' });

  useEffect(() => {
    document.title = 'Production Services | TV Supreme — Professional Broadcast Services';
  }, []);

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-supreme-dark via-supreme-deep to-supreme-primary py-20 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #E9A7C7 0%, transparent 55%), radial-gradient(circle at 80% 20%, #7C3AED 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-supreme-pink/20 border border-supreme-pink/40 text-supreme-pink px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Production Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-4">
            TV Supreme Production Services
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Professional broadcast-grade services for your business — from studio hire to full OB coverage
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/70">
            {['Broadcast-Grade Equipment', 'Experienced Crew', 'Same-Day Delivery', 'Island-Wide Coverage'].map(f => (
              <span key={f} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-supreme-pink" />{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Our Services</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(service => (
            <div key={service.title} className="bg-white dark:bg-supreme-deep rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
              <div className="text-5xl mb-4 select-none">{service.emoji}</div>
              <h3 className="font-bold text-xl font-heading text-supreme-dark dark:text-white mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">{service.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.features.map(f => (
                  <span key={f} className="text-xs bg-supreme-primary/10 dark:bg-supreme-vivid/10 text-supreme-primary dark:text-supreme-pink px-2 py-0.5 rounded-md font-medium">{f}</span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-supreme-primary/20">
                <span className="text-sm font-bold text-supreme-vivid dark:text-supreme-pink">{service.price}</span>
                <button className="bg-supreme-vivid hover:bg-supreme-bright text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients / Portfolio */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Trusted By</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {CLIENTS.map(({ initials, name, color }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white font-extrabold text-lg shadow-card`}>
                  {initials}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Request a Quote</h2>
        </div>
        <div className="max-w-2xl">
          <div className="bg-white dark:bg-supreme-deep rounded-2xl p-8 shadow-card space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
                <input
                  type="text" placeholder="Samantha De Silva"
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Company / Organisation</label>
                <input
                  type="text" placeholder="Acme Corp (Pvt) Ltd"
                  value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Service Required</label>
                <select
                  value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                >
                  <option value="">Select a service…</option>
                  {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Preferred Date</label>
                <input
                  type="date"
                  value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Approximate Budget (LKR)</label>
              <input
                type="text" placeholder="e.g. 50,000 – 100,000"
                value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Project Details</label>
              <textarea
                rows={4} placeholder="Describe your project, requirements and any special considerations…"
                value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm resize-none"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-supreme-vivid hover:bg-supreme-bright text-white font-bold py-3 rounded-xl transition-colors">
              <Send className="w-4 h-4" />
              Request Quote
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
