import { useEffect } from 'react';
import { Download, Youtube, Facebook, Users, BookOpen, Star, Heart, Lightbulb, Globe, Award } from 'lucide-react';

const STATS = [
  { label: 'YouTube Subscribers', value: '359K' },
  { label: 'Facebook Followers', value: '241K' },
  { label: 'TikTok Followers', value: '89K' },
  { label: 'News Articles', value: '2,467' },
  { label: 'Programs', value: '15' },
  { label: 'Founded', value: '2018' },
];

const VALUES = [
  { icon: Heart, label: 'Integrity', desc: 'We uphold truth, accuracy and ethical reporting in every story we tell.', color: 'text-rose-500' },
  { icon: Lightbulb, label: 'Innovation', desc: 'Constantly embracing new technology and formats to reach more Sri Lankans.', color: 'text-amber-500' },
  { icon: Globe, label: 'Community', desc: 'Our content reflects and serves every corner of Sri Lankan society.', color: 'text-emerald-500' },
  { icon: Award, label: 'Excellence', desc: 'Broadcast-grade quality and professional standards in everything we produce.', color: 'text-supreme-vivid' },
];

const LEADERSHIP = [
  {
    title: 'Board of Directors',
    members: ['Chaminda Jayasinghe', 'Priyani Wickramaratne', 'Roshan Perera'],
  },
  {
    title: 'Executive Management',
    members: ['Dilrukshi Fernando — CEO', 'Nuwan Bandara — COO', 'Shanika Rajapaksa — CFO'],
  },
  {
    title: 'Division Heads',
    members: ['Kasun Alwis — News', 'Malini Silva — Production', 'Thilanka Dias — Digital'],
  },
];

const MEDIA_KIT = [
  { label: 'Company Profile PDF', icon: Download, ext: 'PDF' },
  { label: 'Brand Guidelines PDF', icon: Download, ext: 'PDF' },
  { label: 'Logo Package ZIP', icon: Download, ext: 'ZIP' },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | TV Supreme — Sri Lanka\'s Premier Digital Media Network';
  }, []);

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-supreme-dark via-supreme-deep to-supreme-primary py-24 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #E9A7C7 0%, transparent 60%), radial-gradient(circle at 80% 20%, #7C3AED 0%, transparent 55%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Logo placeholder */}
          <div className="mx-auto mb-6 w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl font-bold text-white">TS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4 tracking-tight">
            About TV Supreme
          </h1>
          <p className="text-xl sm:text-2xl text-supreme-pink font-medium mb-2">
            Sri Lanka's Premier Digital Media Network
          </p>
          <p className="text-lg text-white/70 font-heading">ඔබ සතුටින්</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Our Story</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-4">
              TV Supreme was founded in 2018 with a bold vision: to build a digital-first media network that speaks
              to every Sri Lankan. What began as a small streaming operation has grown into a multi-platform powerhouse
              reaching over 600,000 followers across YouTube, Facebook, and TikTok.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              Today, TV Supreme delivers breaking news, compelling dramas, religious programming, lifestyle content,
              and live sports to viewers across Sri Lanka and the global diaspora — 24 hours a day, seven days a week.
              Our 15 flagship programs and 2,467 published news articles reflect our commitment to quality journalism
              and culturally resonant storytelling.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['2018 Founded', 'Digital-First', 'Multi-Platform', '24/7 Broadcast'].map((item) => (
              <div key={item} className="bg-white dark:bg-supreme-deep rounded-xl p-5 shadow-card text-center">
                <span className="font-semibold text-supreme-primary dark:text-supreme-pink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Vision & Mission</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-supreme-vivid to-supreme-bright p-8 text-white shadow-card-hover">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-xl font-bold mb-3 font-heading">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                To be Sri Lanka's most trusted and innovative digital media network — connecting communities,
                informing citizens, and inspiring a generation of media consumers and creators.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-supreme-primary to-supreme-mid p-8 text-white shadow-card-hover">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 font-heading">Our Mission</h3>
              <p className="text-white/90 leading-relaxed">
                Delivering news, entertainment and education that empowers Sri Lankans — through honest reporting,
                creative production, and platforms that meet audiences wherever they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="bg-white dark:bg-supreme-deep rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow group">
              <Icon className={`w-8 h-8 ${color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="font-bold text-lg font-heading text-supreme-dark dark:text-white mb-2">{label}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Leadership Team</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {LEADERSHIP.map(({ title, members }) => (
              <div key={title} className="bg-supreme-light dark:bg-supreme-primary/20 rounded-2xl p-6 shadow-card">
                <h3 className="font-bold text-supreme-primary dark:text-supreme-pink font-heading mb-5 text-center">{title}</h3>
                <div className="space-y-3">
                  {members.map((name) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-supreme-primary/20 dark:bg-supreme-vivid/30 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-supreme-primary dark:text-supreme-pink" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-200">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="py-12 bg-gradient-to-r from-supreme-dark to-supreme-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-white">
            {STATS.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold font-heading text-supreme-pink">{value}</span>
                <span className="text-xs text-white/70 mt-1 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Media Kit</h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Download official TV Supreme brand assets for press and partner use.
        </p>
        <div className="flex flex-wrap gap-4">
          {MEDIA_KIT.map(({ label, icon: Icon, ext }) => (
            <button
              key={label}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-supreme-primary text-supreme-primary dark:border-supreme-pink dark:text-supreme-pink hover:bg-supreme-primary hover:text-white dark:hover:bg-supreme-pink dark:hover:text-supreme-dark transition-colors font-semibold text-sm"
            >
              <Icon className="w-4 h-4" />
              {label}
              <span className="ml-1 text-xs bg-current/10 px-2 py-0.5 rounded-full opacity-60">{ext}</span>
            </button>
          ))}
        </div>
      </section>

    </main>
  );
}
