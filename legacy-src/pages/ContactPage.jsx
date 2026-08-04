import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Youtube, Facebook, MessageCircle, Send } from 'lucide-react';

const CONTACT_CARDS = [
  {
    icon: Mail,   color: 'text-red-500',     bg: 'bg-red-50 dark:bg-red-900/20',
    title: 'News Tips',
    lines: ['newstips@tvsupreme.lk', 'WhatsApp: +94 77 123 4567'],
  },
  {
    icon: Phone,  color: 'text-blue-500',    bg: 'bg-blue-50 dark:bg-blue-900/20',
    title: 'Advertising',
    lines: ['ads@tvsupreme.lk', '+94 11 234 5678'],
  },
  {
    icon: Mail,   color: 'text-supreme-vivid', bg: 'bg-purple-50 dark:bg-purple-900/20',
    title: 'General Inquiries',
    lines: ['info@tvsupreme.lk', '+94 11 234 5679'],
  },
  {
    icon: Phone,  color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    title: 'Technical Support',
    lines: ['tech@tvsupreme.lk'],
  },
  {
    icon: MapPin, color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-900/20',
    title: 'Main Office',
    lines: ['No. 45, Wijerama Mawatha', 'Colombo 07, Sri Lanka'],
  },
  {
    icon: Clock,  color: 'text-gray-500',    bg: 'bg-gray-50 dark:bg-gray-800/30',
    title: 'Opening Hours',
    lines: ['Monday – Friday', '8:00 am – 6:00 pm'],
  },
];

const SOCIAL = [
  { label: 'YouTube',   icon: Youtube,        href: '#', color: 'bg-red-600 hover:bg-red-700' },
  { label: 'Facebook',  icon: Facebook,       href: '#', color: 'bg-blue-700 hover:bg-blue-800' },
  { label: 'TikTok',    icon: MessageCircle,  href: '#', color: 'bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600' },
  { label: 'WhatsApp',  icon: Phone,          href: '#', color: 'bg-emerald-600 hover:bg-emerald-700' },
];

const REGIONAL = [
  { city: 'Kandy',  address: 'No. 12, Dalada Veediya, Kandy 20000',   phone: '+94 81 234 5678' },
  { city: 'Galle',  address: 'No. 8, Church Street, Galle Fort 80000', phone: '+94 91 234 5678' },
  { city: 'Jaffna', address: 'No. 22, Hospital Road, Jaffna 40000',    phone: '+94 21 234 5678' },
];

const INQUIRY_TYPES = [
  'General Inquiry', 'News Tip', 'Advertising', 'Technical Support', 'Complaint', 'Feedback',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });

  useEffect(() => {
    document.title = 'Contact | TV Supreme — Get in Touch';
  }, []);

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Page Header */}
      <section className="bg-gradient-to-b from-supreme-deep to-supreme-dark py-14 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-3">Contact TV Supreme</h1>
          <p className="text-supreme-pink">We'd love to hear from you — news tips, advertising, or just saying hello</p>
        </div>
      </section>

      {/* Main Two-Column */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left — Contact Info */}
          <div>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
              <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Get In Touch</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {CONTACT_CARDS.map(({ icon: Icon, color, bg, title, lines }) => (
                <div key={title} className={`${bg} rounded-2xl p-5 border border-white/60 dark:border-white/5`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <h3 className="font-bold text-sm text-supreme-dark dark:text-white font-heading">{title}</h3>
                  </div>
                  {lines.map(line => (
                    <p key={line} className="text-sm text-gray-600 dark:text-gray-400">{line}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {SOCIAL.map(({ label, icon: Icon, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold ${color} transition-colors`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
              <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Send a Message</h2>
            </div>
            <div className="bg-white dark:bg-supreme-deep rounded-2xl p-8 shadow-card space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="Nuwan Silva"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="nuwan@example.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Inquiry Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm"
                >
                  <option value="">Select inquiry type…</option>
                  {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message here…"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-supreme-primary/40 bg-gray-50 dark:bg-supreme-dark text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-supreme-vivid text-sm resize-none"
                />
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-supreme-vivid hover:bg-supreme-bright text-white font-bold py-3 rounded-xl transition-colors">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Regional Offices</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {REGIONAL.map(({ city, address, phone }) => (
              <div key={city} className="bg-supreme-light dark:bg-supreme-dark/50 rounded-2xl p-5 border border-gray-100 dark:border-supreme-primary/20 shadow-card">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-supreme-primary/20 dark:bg-supreme-vivid/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-supreme-primary dark:text-supreme-pink" />
                  </div>
                  <h3 className="font-bold font-heading text-supreme-dark dark:text-white">{city} Office</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{address}</p>
                <p className="text-sm text-supreme-primary dark:text-supreme-pink font-medium">{phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
