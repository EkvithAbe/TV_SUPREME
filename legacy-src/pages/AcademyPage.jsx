import { useEffect } from 'react';
import { Users, BookOpen, Award, TrendingUp, Clock, Calendar, CheckCircle } from 'lucide-react';

const STATS = [
  { icon: Users,      value: '500+',  label: 'Graduates' },
  { icon: BookOpen,   value: '12',    label: 'Courses' },
  { icon: Award,      value: '6',     label: 'Trainers' },
  { icon: TrendingUp, value: '92%',   label: 'Job Placement' },
];

const COURSES = [
  {
    emoji: '🎙️',
    title: 'TV & Radio Journalism',
    duration: '3 months',
    price: 'LKR 35,000',
    batch: 'Aug 2026',
    seats: 24,
    color: 'from-purple-500 to-supreme-vivid',
    desc: 'Master on-camera presenting, news writing, editorial ethics and field reporting techniques used by TV Supreme journalists.',
  },
  {
    emoji: '🎬',
    title: 'Digital Video Production',
    duration: '2 months',
    price: 'LKR 28,000',
    batch: 'Jul 2026',
    seats: 12,
    color: 'from-blue-500 to-blue-700',
    desc: 'Hands-on training in camera operation, lighting, audio recording, Adobe Premiere Pro and DaVinci Resolve colour grading.',
  },
  {
    emoji: '🤖',
    title: 'AI & Media Technology',
    duration: '6 weeks',
    price: 'LKR 22,000',
    batch: 'Jul 2026',
    seats: 18,
    color: 'from-emerald-500 to-teal-700',
    desc: 'Explore AI tools transforming journalism — automated captions, AI news writing, deepfake detection and data journalism.',
  },
  {
    emoji: '📱',
    title: 'Digital Marketing for Media',
    duration: '8 weeks',
    price: 'LKR 18,000',
    batch: 'Aug 2026',
    seats: 20,
    color: 'from-pink-500 to-rose-700',
    desc: 'Social media strategy, YouTube SEO, Meta ads, analytics dashboards and content calendar planning for media brands.',
  },
  {
    emoji: '📺',
    title: 'News Anchoring & Presenting',
    duration: '4 weeks',
    price: 'LKR 15,000',
    batch: 'Sep 2026',
    seats: 10,
    color: 'from-amber-500 to-orange-700',
    desc: 'Voice coaching, teleprompter reading, on-camera confidence, interview techniques and live broadcast presentation skills.',
  },
  {
    emoji: '📊',
    title: 'Social Media Strategy',
    duration: '4 weeks',
    price: 'LKR 12,000',
    batch: 'Jul 2026',
    seats: 15,
    color: 'from-cyan-500 to-blue-600',
    desc: 'Build and execute social strategies for media organisations — TikTok, Instagram Reels, YouTube Shorts and community management.',
  },
];

const WORKSHOPS = [
  { title: 'Podcast Production Masterclass',     date: 'Jul 12, 2026', price: 'LKR 3,500',  desc: 'One-day intensive covering equipment, editing and distribution for aspiring podcasters.' },
  { title: 'Drone Videography for Journalists',  date: 'Aug 2, 2026',  price: 'LKR 4,500',  desc: 'CAA-compliant drone operations for news coverage, aerial photography and corporate video.' },
  { title: 'Breaking News Live Production',       date: 'Aug 23, 2026', price: 'LKR 3,000',  desc: 'Real-time newsroom simulation — editorial decisions, live production and on-air delivery.' },
];

const CERTS = [
  'TV Supreme Diploma in Broadcast Journalism',
  'TV Supreme Certificate in Digital Media Production',
  'Asia-Pacific Media Institute Recognition',
  'National Institute of Communication Affiliation',
];

export default function AcademyPage() {
  useEffect(() => {
    document.title = 'TV Supreme Digital Academy — Learn Media & Journalism';
  }, []);

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-supreme-dark via-supreme-deep to-supreme-primary py-20 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, #E9A7C7 0%, transparent 55%), radial-gradient(circle at 85% 20%, #7C3AED 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Now Enrolling — Batch July 2026
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-4">
            TV Supreme Digital Academy
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Learn from Sri Lanka's leading media professionals — inside an actual broadcast facility
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="bg-white dark:bg-supreme-deep border-b border-gray-100 dark:border-supreme-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <Icon className="w-6 h-6 text-supreme-vivid mb-2" />
                <span className="text-3xl font-extrabold font-heading text-supreme-dark dark:text-white">{value}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">All Courses</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map(course => (
            <div key={course.title} className="bg-white dark:bg-supreme-deep rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
              {/* Course header */}
              <div className={`bg-gradient-to-br ${course.color} p-6 text-white`}>
                <div className="text-5xl mb-3 select-none">{course.emoji}</div>
                <h3 className="font-bold text-xl font-heading leading-tight">{course.title}</h3>
              </div>
              {/* Course body */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1">{course.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-supreme-dark text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" />{course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-supreme-dark text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                    <Calendar className="w-3 h-3" />Next: {course.batch}
                  </span>
                  <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-supreme-dark text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                    <Users className="w-3 h-3" />{course.seats} seats left
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-supreme-primary/20 mt-auto">
                  <span className="font-extrabold text-supreme-vivid dark:text-supreme-pink">{course.price}</span>
                  <button className="bg-supreme-vivid hover:bg-supreme-bright text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-12 bg-white dark:bg-supreme-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Upcoming Workshops</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {WORKSHOPS.map(ws => (
              <div key={ws.title} className="bg-supreme-light dark:bg-supreme-dark rounded-2xl p-5 border border-gray-100 dark:border-supreme-primary/20 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2.5 py-1 rounded-full">
                    {ws.date}
                  </span>
                  <span className="text-xs font-bold text-supreme-vivid dark:text-supreme-pink">{ws.price}</span>
                </div>
                <h3 className="font-bold font-heading text-supreme-dark dark:text-white mb-2">{ws.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{ws.desc}</p>
                <button className="mt-4 w-full py-2 rounded-xl border border-supreme-primary dark:border-supreme-pink text-supreme-primary dark:text-supreme-pink text-sm font-semibold hover:bg-supreme-primary hover:text-white dark:hover:bg-supreme-pink dark:hover:text-supreme-dark transition-colors">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-2xl font-bold font-heading text-supreme-dark dark:text-white">Recognised Certifications</h2>
        </div>
        <div className="bg-gradient-to-r from-supreme-primary/10 to-supreme-vivid/10 dark:from-supreme-primary/20 dark:to-supreme-vivid/20 rounded-2xl p-8 border border-supreme-primary/20">
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            TV Supreme Academy certificates are recognised by leading media organisations across Sri Lanka and the Asia-Pacific region.
            Our curriculum is designed in partnership with industry practitioners ensuring graduates are job-ready from day one.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {CERTS.map(cert => (
              <div key={cert} className="flex items-center gap-3 bg-white dark:bg-supreme-dark rounded-xl p-3.5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
