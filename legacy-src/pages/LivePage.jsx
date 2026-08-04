import { useEffect, useState } from 'react';
import { Play, Share2, Maximize2, ChevronRight, MessageCircle, ThumbsUp, Users } from 'lucide-react';

const SCHEDULE_TODAY = [
  { time: '04:50', program: 'CNA on TV Supreme',                  category: 'News',          current: false },
  { time: '05:00', program: 'Asiri Diri Piritha',                 category: 'Religious',     current: false },
  { time: '06:00', program: 'Saddharmalankaraya',                 category: 'Religious',     current: false },
  { time: '06:30', program: 'Hathara Wate',                       category: 'News',          current: false },
  { time: '07:00', program: 'CNA on TV Supreme',                  category: 'News',          current: true  },
  { time: '07:30', program: 'PJFM',                               category: 'Religious',     current: false },
  { time: '08:00', program: 'Every Morning – Taru Udesana',       category: 'Lifestyle',     current: false },
  { time: '08:30', program: 'Every Morning – Heda Weda Udesana',  category: 'Lifestyle',     current: false },
  { time: '09:30', program: 'Ithin Ithin Kohomada',               category: 'Entertainment', current: false },
  { time: '12:00', program: 'News Bulletin',                      category: 'News',          current: false },
  { time: '13:00', program: 'Global Pulse',                       category: 'Infotainment',  current: false },
  { time: '14:00', program: 'Yowun Wasanthe',                     category: 'Dramas',        current: false },
  { time: '19:30', program: 'News Bulletin',                      category: 'News',          current: false },
  { time: '20:00', program: 'Janahada',                           category: 'Infotainment',  current: false },
  { time: '21:00', program: 'Sports Supreme',                     category: 'Sports',        current: false },
  { time: '22:00', program: 'Samanmaliya',                        category: 'Dramas',        current: false },
];

const RELATED_VIDEOS = [
  { title: 'Sri Lanka Parliament Debate Highlights — June 2026', views: '48K', ago: '2 days ago', thumb: '/images/janahada.jpeg' },
  { title: 'Samanmaliya Episode 312 — Full Episode', views: '125K', ago: '1 day ago', thumb: '/images/samanmaliya.jpeg' },
  { title: 'Sports Supreme — Cricket World Cup Preview', views: '67K', ago: '3 hours ago', thumb: '/images/cricket.jpeg' },
];

const CHAT = [
  { user: 'Nuwan M.',       msg: 'සජීව මාධ්‍ය ඉතාමත් හොඳයි 🙌', time: '07:02', color: 'bg-purple-100 dark:bg-purple-900/30' },
  { user: 'Dilrukshi F.',   msg: 'Watching from Kandy! Great coverage', time: '07:04', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { user: 'Kasun A.',       msg: 'CNA news update is very informative today 📺', time: '07:06', color: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { user: 'Shanika R.',     msg: 'ස්තූතියි TV Supreme!', time: '07:08', color: 'bg-amber-100 dark:bg-amber-900/30' },
  { user: 'Thilanka D.',    msg: 'Great broadcast quality as always 👍', time: '07:09', color: 'bg-pink-100 dark:bg-pink-900/30' },
];

const CATEGORY_BADGE = {
  News:          'bg-purple-700 text-white',
  Religious:     'bg-amber-600 text-white',
  Lifestyle:     'bg-rose-500 text-white',
  Entertainment: 'bg-pink-500 text-white',
  Infotainment:  'bg-blue-600 text-white',
  Sports:        'bg-emerald-600 text-white',
  Dramas:        'bg-supreme-vivid text-white',
};

const CURRENT_PROGRAM = SCHEDULE_TODAY.find(s => s.current) ?? SCHEDULE_TODAY[0];
const NEXT_PROGRAM = SCHEDULE_TODAY[SCHEDULE_TODAY.findIndex(s => s.current) + 1] ?? SCHEDULE_TODAY[0];

export default function LivePage() {
  const [viewers, setViewers] = useState(1203);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    document.title = 'Watch Live | TV Supreme';
    const interval = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-supreme-dark min-h-screen">

      {/* Video Player Area */}
      <section className="w-full bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            {/* Live video bg */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/images/live.jpeg" alt="Live TV" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              {/* Play Button */}
              <button className="relative z-10 w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 transition-all hover:scale-110">
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </button>
            </div>

            {/* LIVE badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-red-600/95 text-white px-3 py-1.5 rounded-lg text-sm font-extrabold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-live-pulse" />
              LIVE
            </div>

            {/* Viewer count */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm">
              <Users className="w-3.5 h-3.5" />
              {viewers.toLocaleString()} watching
            </div>

            {/* Program name overlay */}
            <div className="absolute bottom-4 left-4 z-20 bg-black/60 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-xs text-white/70 mb-0.5">NOW PLAYING</p>
              <p className="font-bold text-sm">{CURRENT_PROGRAM.program}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Info Bar */}
      <section className="bg-supreme-deep border-b border-supreme-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-bold text-lg font-heading">{CURRENT_PROGRAM.program}</h2>
            <div className="flex items-center gap-3 mt-1 text-sm text-white/60">
              <span>Started {CURRENT_PROGRAM.time}</span>
              <span>·</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_BADGE[CURRENT_PROGRAM.category] ?? 'bg-gray-600 text-white'}`}>
                {CURRENT_PROGRAM.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(l => !l)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                liked ? 'bg-supreme-vivid text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
              Like
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors">
              <Maximize2 className="w-4 h-4" />
              Fullscreen
            </button>
          </div>
        </div>
      </section>

      {/* Up Next Banner */}
      <section className="bg-supreme-primary/20 border-b border-supreme-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 text-sm">
          <ChevronRight className="w-4 h-4 text-supreme-pink" />
          <span className="text-white/60">Up Next:</span>
          <span className="text-white font-semibold">{NEXT_PROGRAM.program}</span>
          <span className="text-white/40">at {NEXT_PROGRAM.time}</span>
          <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_BADGE[NEXT_PROGRAM.category] ?? 'bg-gray-600 text-white'}`}>
            {NEXT_PROGRAM.category}
          </span>
        </div>
      </section>

      {/* Lower Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Today's Schedule */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
              <h3 className="text-white font-bold font-heading text-lg">Today's Schedule</h3>
            </div>
            <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
              {SCHEDULE_TODAY.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    item.current
                      ? 'bg-supreme-vivid text-white'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  {item.current && <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse shrink-0" />}
                  <span className="font-mono text-xs font-bold w-10 shrink-0">{item.time}</span>
                  <span className="text-sm truncate flex-1">{item.program}</span>
                  {item.current && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded-md shrink-0">LIVE</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Related Videos */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
              <h3 className="text-white font-bold font-heading text-lg">Related Videos</h3>
            </div>
            <div className="space-y-4">
              {RELATED_VIDEOS.map(video => (
                <div key={video.title} className="flex gap-3 group cursor-pointer">
                  <div className="relative w-28 h-16 rounded-xl shrink-0 overflow-hidden">
                    <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white/90 fill-white/90 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold leading-tight line-clamp-2 group-hover:text-supreme-pink transition-colors">{video.title}</p>
                    <p className="text-white/50 text-xs mt-1">{video.views} views · {video.ago}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
              <h3 className="text-white font-bold font-heading text-lg">Live Chat</h3>
            </div>
            <div className="bg-supreme-deep rounded-2xl overflow-hidden border border-supreme-primary/30" style={{ height: '340px' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-supreme-primary/30">
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Join the conversation</span>
                </div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="p-3 space-y-2 overflow-y-auto" style={{ height: '240px' }}>
                {CHAT.map((msg, i) => (
                  <div key={i} className={`${msg.color} rounded-xl px-3 py-2`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{msg.user}</span>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{msg.msg}</p>
                  </div>
                ))}
              </div>
              <div className="px-3 pb-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Say something…"
                    className="flex-1 bg-black/30 border border-supreme-primary/40 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-supreme-vivid"
                  />
                  <button className="px-3 py-2 bg-supreme-vivid hover:bg-supreme-bright rounded-xl transition-colors">
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

function Send({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}
