import { useEffect, useState } from 'react';
import { Play, Clock, Tag } from 'lucide-react';

const CATEGORY_COLORS = {
  Dramas:        { bg: 'bg-supreme-vivid/10 dark:bg-supreme-vivid/20', badge: 'bg-supreme-vivid text-white' },
  Infotainment:  { bg: 'bg-blue-50 dark:bg-blue-900/20',               badge: 'bg-blue-600 text-white' },
  News:          { bg: 'bg-purple-50 dark:bg-purple-900/20',            badge: 'bg-purple-700 text-white' },
  Religious:     { bg: 'bg-amber-50 dark:bg-amber-900/20',              badge: 'bg-amber-600 text-white' },
  Lifestyle:     { bg: 'bg-rose-50 dark:bg-rose-900/20',                badge: 'bg-rose-500 text-white' },
  Entertainment: { bg: 'bg-pink-50 dark:bg-pink-900/20',                badge: 'bg-pink-500 text-white' },
  Sports:        { bg: 'bg-emerald-50 dark:bg-emerald-900/20',          badge: 'bg-emerald-600 text-white' },
  Business:      { bg: 'bg-blue-50 dark:bg-blue-900/20',                badge: 'bg-blue-700 text-white' },
};

const PROGRAMS = [
  { id: 1,  title: 'Samanmaliya',              category: 'Dramas',        img: '/images/samanmaliya.jpeg',           airtime: 'Mon–Fri 22:00', desc: 'A gripping primetime drama exploring family, love and social change in modern Sri Lanka.' },
  { id: 2,  title: 'Yowun Wasanthe',           category: 'Dramas',        img: '/images/yowun-wasanthaye.jpeg',      airtime: 'Daily 14:00',  desc: 'A heartfelt afternoon drama following the journeys of young Sri Lankans chasing their dreams.' },
  { id: 3,  title: 'Global Pulse',             category: 'Infotainment',  img: '/images/global-pulse.jpeg',          airtime: 'Mon–Fri 13:00',desc: 'International news and analysis brought closer to home — the world through a Sri Lankan lens.' },
  { id: 4,  title: 'ජනනිදි (Janahada)',       category: 'Infotainment',  img: '/images/janahada.jpeg',              airtime: 'Daily 20:00', desc: 'Prime-time talk show tackling the most pressing issues facing Sri Lankan society today.' },
  { id: 5,  title: 'ව්‍යාරාමය',              category: 'Religious',     img: '/images/news-cover.jpeg',            airtime: 'Daily 05:00',  desc: 'A sacred morning programme of pirith chanting and Buddhist teachings for a mindful start.' },
  { id: 6,  title: 'Saddharmalankaraya',       category: 'Religious',     img: '/images/every-morning.jpeg',         airtime: 'Daily 06:00',  desc: 'Dharma discourses and spiritual guidance from renowned Buddhist scholars across Sri Lanka.' },
  { id: 7,  title: 'Every Morning',            category: 'Lifestyle',     img: '/images/every-morning.jpeg',         airtime: 'Daily 08:00',  desc: 'Start your day right with health, wellness, cooking, beauty tips and morning motivation.' },
  { id: 8,  title: 'Ithin Ithin Kohomada',    category: 'Entertainment', img: '/images/ithin-ithin-kohomada.jpeg',  airtime: 'Daily 09:30',  desc: 'Sri Lanka\'s most entertaining morning variety show — games, celebrities and plenty of laughs.' },
  { id: 9,  title: 'CNA on TV Supreme',        category: 'News',          img: '/images/news-cover.jpeg',            airtime: 'Daily 04:50 & 07:00', desc: 'Award-winning Asia-Pacific news coverage from Channel NewsAsia, now on TV Supreme.' },
  { id: 10, title: 'PJFM',                     category: 'Religious',     img: '/images/every-morning.jpeg',         airtime: 'Daily 07:30',  desc: 'Morning religious music and devotional programmes to uplift and inspire your spirit.' },
  { id: 11, title: 'Hathara Wate',             category: 'News',          img: '/images/news-cover.jpeg',            airtime: 'Daily 06:30',  desc: 'Comprehensive morning news roundup covering local and international headlines in depth.' },
  { id: 12, title: 'Sports Supreme',           category: 'Sports',        img: '/images/cricket.jpeg',               airtime: 'Daily 21:00',  desc: 'Cricket, rugby, athletics and all the sporting action from Sri Lanka and around the globe.' },
  { id: 13, title: 'Biz Digest',               category: 'Business',      img: '/images/global-pulse.jpeg',          airtime: 'Weekdays 13:00',desc: 'Colombo Stock Exchange updates, economic analysis and business news for decision-makers.' },
  { id: 14, title: 'Road to Weekend',          category: 'Entertainment', img: '/images/ithin-ithin-kohomada.jpeg',  airtime: 'Fridays 20:00', desc: 'Kick off the weekend with celebrity interviews, music, movie reviews and lifestyle specials.' },
  { id: 15, title: 'Kavi Naduwa',              category: 'Entertainment', img: '/images/samanmaliya.jpeg',           airtime: 'Saturdays 19:00',desc: 'Sri Lanka\'s premier Saturday night poetry and musical performance showcase.' },
];

const TABS = ['All', 'Dramas', 'Infotainment', 'News', 'Religious', 'Lifestyle', 'Entertainment', 'Sports', 'Business'];

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    document.title = 'Programs | TV Supreme — All Shows & Schedules';
  }, []);

  const filtered = activeTab === 'All' ? PROGRAMS : PROGRAMS.filter(p => p.category === activeTab);

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Page Header */}
      <section className="bg-gradient-to-b from-supreme-deep to-supreme-dark py-14 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-3">TV Programs</h1>
          <p className="text-supreme-pink text-lg">Discover all 15 shows across genres — dramas, news, sports, lifestyle and more</p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="bg-white dark:bg-supreme-deep border-b border-gray-200 dark:border-supreme-primary sticky top-0 z-10 shadow-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-supreme-vivid text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-supreme-primary/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Showing <span className="font-bold text-supreme-vivid">{filtered.length}</span> program{filtered.length !== 1 ? 's' : ''}
          {activeTab !== 'All' && <> in <span className="font-bold">{activeTab}</span></>}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(program => {
            const colors = CATEGORY_COLORS[program.category] ?? CATEGORY_COLORS.Entertainment;
            return (
              <div
                key={program.id}
                className={`rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 ${colors.bg} border border-white/60 dark:border-white/5`}
              >
                {/* Thumbnail */}
                <div className="relative h-36 overflow-hidden">
                  <img src={program.img} alt={program.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg font-heading text-supreme-dark dark:text-white leading-tight">{program.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                      {program.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-black/20 px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {program.airtime}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">{program.desc}</p>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-supreme-vivid hover:bg-supreme-bright text-white font-semibold text-sm transition-colors">
                    <Play className="w-4 h-4 fill-white" />
                    Watch Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-semibold">No programs found for this category.</p>
          </div>
        )}
      </section>

    </main>
  );
}
