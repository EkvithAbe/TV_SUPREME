import { useEffect, useState } from 'react';
import { Radio, Clock, ChevronRight, Play } from 'lucide-react';

const CATEGORY_BADGE = {
  News:          'bg-purple-700 text-white',
  Religious:     'bg-amber-600 text-white',
  Lifestyle:     'bg-rose-500 text-white',
  Entertainment: 'bg-pink-500 text-white',
  Infotainment:  'bg-blue-600 text-white',
  Sports:        'bg-emerald-600 text-white',
  Dramas:        'bg-supreme-vivid text-white',
};

const BASE_SCHEDULE = [
  { time: '04:50', program: 'CNA on TV Supreme',                  category: 'News' },
  { time: '05:00', program: 'Asiri Diri Piritha',                 category: 'Religious' },
  { time: '06:00', program: 'Saddharmalankaraya',                 category: 'Religious' },
  { time: '06:30', program: 'Hathara Wate',                       category: 'News' },
  { time: '07:00', program: 'CNA on TV Supreme',                  category: 'News' },
  { time: '07:30', program: 'PJFM',                               category: 'Religious' },
  { time: '08:00', program: 'Every Morning – Taru Udesana',       category: 'Lifestyle' },
  { time: '08:30', program: 'Every Morning – Heda Weda Udesana',  category: 'Lifestyle' },
  { time: '09:30', program: 'Ithin Ithin Kohomada',               category: 'Entertainment' },
  { time: '12:00', program: 'News Bulletin',                      category: 'News' },
  { time: '13:00', program: 'Global Pulse',                       category: 'Infotainment' },
  { time: '14:00', program: 'Yowun Wasanthe',                     category: 'Dramas' },
  { time: '19:30', program: 'News Bulletin',                      category: 'News' },
  { time: '20:00', program: 'Janahada',                           category: 'Infotainment' },
  { time: '21:00', program: 'Sports Supreme',                     category: 'Sports' },
  { time: '22:00', program: 'Samanmaliya',                        category: 'Dramas' },
];

const DAY_OVERRIDES = {
  Tuesday:   [{ idx: 13, program: 'Biz Digest Special', category: 'Business' }],
  Wednesday: [{ idx: 9,  program: 'Midweek News Review', category: 'News' }],
  Thursday:  [{ idx: 14, program: 'Janahada — Discussion Panel', category: 'Infotainment' }],
  Friday:    [{ idx: 15, program: 'Road to Weekend', category: 'Entertainment' }],
  Saturday:  [
    { idx: 9, program: 'Weekend Live Show', category: 'Entertainment' },
    { idx: 15, program: 'Kavi Naduwa', category: 'Entertainment' },
  ],
  Sunday: [
    { idx: 5, program: 'PJFM – Sunday Special', category: 'Religious' },
    { idx: 11, program: 'Yowun Wasanthe – Weekend Edition', category: 'Dramas' },
  ],
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function buildSchedule(day) {
  const sched = BASE_SCHEDULE.map(s => ({ ...s }));
  const overrides = DAY_OVERRIDES[day] || [];
  overrides.forEach(({ idx, program, category }) => {
    if (sched[idx]) { sched[idx] = { ...sched[idx], program, category }; }
  });
  return sched;
}

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function getCurrentAndNext(schedule) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let currentIdx = -1;
  for (let i = schedule.length - 1; i >= 0; i--) {
    if (timeToMinutes(schedule[i].time) <= currentMinutes) {
      currentIdx = i;
      break;
    }
  }
  if (currentIdx === -1) currentIdx = schedule.length - 1;
  const next = schedule[currentIdx + 1] || schedule[0];
  return { current: schedule[currentIdx], next };
}

export default function SchedulePage() {
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const [activeDay, setActiveDay] = useState(todayName);

  useEffect(() => {
    document.title = 'Schedule | TV Supreme — Daily Broadcast Schedule';
  }, []);

  const schedule = buildSchedule(activeDay);
  const { current, next } = getCurrentAndNext(schedule);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const dateStr = now.toLocaleDateString('en-LK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="bg-supreme-light dark:bg-supreme-dark min-h-screen">

      {/* Page Header */}
      <section className="bg-gradient-to-b from-supreme-deep to-supreme-dark py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">Broadcast Schedule</h1>
            <p className="text-supreme-pink mt-1">{dateStr}</p>
          </div>
          <div className="flex items-center gap-2 bg-red-600/90 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white inline-block" />
            LIVE NOW
          </div>
        </div>
      </section>

      {/* Currently On Air Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-1 pt-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-supreme-vivid rounded-2xl p-5 text-white shadow-card-hover flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-0.5">Currently On Air</p>
              <p className="text-xl font-bold font-heading">{current?.program}</p>
              <p className="text-sm text-white/80">Started at {current?.time} · {current?.category}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-supreme-deep rounded-2xl p-5 shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-supreme-primary/20 flex items-center justify-center shrink-0">
              <ChevronRight className="w-6 h-6 text-supreme-primary dark:text-supreme-pink" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Up Next</p>
              <p className="text-xl font-bold font-heading text-supreme-dark dark:text-white">{next?.program}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">At {next?.time} · {next?.category}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Day Selector */}
      <section className="bg-white dark:bg-supreme-deep border-b border-gray-200 dark:border-supreme-primary sticky top-0 z-10 shadow-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap ${
                  activeDay === day
                    ? 'bg-supreme-vivid text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-supreme-primary/30'
                }${day === todayName ? ' ring-2 ring-supreme-pink ring-offset-1 dark:ring-offset-supreme-deep' : ''}`}
              >
                {day.slice(0, 3)}
                {day === todayName && <span className="ml-1 text-[10px] font-bold opacity-70">TODAY</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
          <h2 className="text-xl font-bold font-heading text-supreme-dark dark:text-white">{activeDay}'s Schedule</h2>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-card border border-gray-100 dark:border-supreme-primary/30">
          <table className="w-full">
            <thead className="bg-supreme-deep text-white text-sm">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Time</th>
                <th className="text-left px-5 py-3 font-semibold">Program</th>
                <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">Category</th>
                <th className="text-right px-5 py-3 font-semibold hidden md:table-cell">Watch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-supreme-primary/20">
              {schedule.map((item, i) => {
                const mins = timeToMinutes(item.time);
                const nextMins = schedule[i + 1] ? timeToMinutes(schedule[i + 1].time) : 24 * 60;
                const isOnAir = activeDay === todayName && currentMinutes >= mins && currentMinutes < nextMins;
                const badgeCls = CATEGORY_BADGE[item.category] ?? 'bg-gray-200 text-gray-700';
                return (
                  <tr
                    key={`${item.time}-${i}`}
                    className={`transition-colors ${
                      isOnAir
                        ? 'bg-supreme-vivid/10 dark:bg-supreme-vivid/20 border-l-4 border-supreme-vivid'
                        : 'bg-white dark:bg-supreme-deep hover:bg-gray-50 dark:hover:bg-supreme-primary/10'
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {isOnAir && <span className="w-2 h-2 rounded-full bg-red-500 animate-live-pulse shrink-0" />}
                        <span className={`font-mono font-bold text-sm ${isOnAir ? 'text-supreme-vivid dark:text-supreme-pink' : 'text-gray-700 dark:text-gray-300'}`}>
                          {item.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className={`font-semibold font-heading text-sm ${isOnAir ? 'text-supreme-dark dark:text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                        {item.program}
                        {isOnAir && <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">LIVE</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeCls}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right hidden md:table-cell">
                      <button className="flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-lg bg-supreme-primary/10 hover:bg-supreme-vivid hover:text-white text-supreme-primary dark:text-supreme-pink text-xs font-semibold transition-colors">
                        <Play className="w-3 h-3 fill-current" />
                        Watch
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}
