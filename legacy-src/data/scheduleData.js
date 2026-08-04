export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

const WEEKDAY = [
  { time: '05:00', program: 'Asiri Diri Piritha',       category: 'Religious' },
  { time: '05:30', program: 'Subha Arana Morning Show', category: 'Lifestyle' },
  { time: '07:00', program: 'Supreme Morning News',     category: 'News' },
  { time: '07:30', program: 'Sithijaya',                category: 'News' },
  { time: '08:00', program: 'Samanmaliya',              category: 'Drama' },
  { time: '08:30', program: 'Mal Mithuru',              category: 'Drama' },
  { time: '09:00', program: 'CNA on Supreme TV',        category: 'News' },
  { time: '09:30', program: 'Dawasa Wiriya',            category: 'Lifestyle' },
  { time: '10:00', program: 'Ithin Ithin Kohomada',     category: 'Entertainment' },
  { time: '11:00', program: 'Supreme Midday News',      category: 'News' },
  { time: '11:30', program: 'Hiranya',                  category: 'Drama' },
  { time: '12:00', program: 'Supreme Noon News',        category: 'News' },
  { time: '12:30', program: 'Thanha Mal',               category: 'Drama' },
  { time: '13:00', program: 'Global Pulse',             category: 'News' },
  { time: '14:00', program: 'Colombo Kitchen',          category: 'Lifestyle' },
  { time: '15:00', program: 'Supreme Afternoon News',   category: 'News' },
  { time: '15:30', program: 'Yowun Wasanthe',           category: 'Drama' },
  { time: '16:00', program: 'Sanda Eliya',              category: 'Drama' },
  { time: '17:00', program: 'Adarei Man Adarei',        category: 'Drama' },
  { time: '18:00', program: 'Supreme Evening News',     category: 'News' },
  { time: '19:00', program: 'Supreme Prime Time News',  category: 'News' },
  { time: '20:00', program: 'Sanda Eliya',              category: 'Drama' },
  { time: '20:30', program: 'Sihina Genalla',           category: 'Drama' },
  { time: '21:00', program: 'Mal Mithuru',              category: 'Drama' },
  { time: '21:30', program: 'Yowun Wasanthe',           category: 'Drama' },
  { time: '22:00', program: 'Supreme Night News',       category: 'News' },
  { time: '22:30', program: 'Global Pulse',             category: 'News' },
  { time: '23:00', program: 'Supreme Late Show',        category: 'Entertainment' },
];

const SATURDAY = [
  { time: '05:00', program: 'Asiri Diri Piritha',           category: 'Religious' },
  { time: '05:30', program: 'Saddharmalankaraya',           category: 'Religious' },
  { time: '06:30', program: 'CNA on Supreme TV',            category: 'News' },
  { time: '07:30', program: 'Subha Arana Special',          category: 'Lifestyle' },
  { time: '09:00', program: 'Ithin Ithin Kohomada Special', category: 'Entertainment' },
  { time: '10:30', program: 'Colombo Kitchen Weekend',      category: 'Lifestyle' },
  { time: '11:00', program: 'Supreme Weekend News',         category: 'News' },
  { time: '12:00', program: 'Movie: Yowun Hetak',           category: 'Film' },
  { time: '14:00', program: 'Global Pulse Weekend',         category: 'News' },
  { time: '15:00', program: 'Samanmaliya Best Of',          category: 'Drama' },
  { time: '16:00', program: 'Mal Mithuru',                  category: 'Drama' },
  { time: '17:00', program: 'Sports Hour',                  category: 'Sports' },
  { time: '18:00', program: 'Supreme Evening News',         category: 'News' },
  { time: '19:00', program: 'Supreme Prime Time News',      category: 'News' },
  { time: '20:00', program: 'Sanda Eliya',                  category: 'Drama' },
  { time: '20:30', program: 'Sihina Genalla',               category: 'Drama' },
  { time: '22:00', program: 'Movie: Weekend Cinema',        category: 'Film' },
  { time: '23:30', program: 'Supreme Night News',           category: 'News' },
];

const SUNDAY = [
  { time: '04:50', program: 'CNA on Supreme TV',        category: 'News' },
  { time: '05:00', program: 'Asiri Diri Piritha',       category: 'Religious' },
  { time: '06:00', program: 'Saddharmalankaraya',       category: 'Religious' },
  { time: '06:30', program: 'CNA on Supreme TV',        category: 'News' },
  { time: '07:30', program: 'PJFM',                    category: 'Entertainment' },
  { time: '08:00', program: 'Subha Arana Special',      category: 'Lifestyle' },
  { time: '10:00', program: 'Ithin Ithin Kohomada',     category: 'Entertainment' },
  { time: '11:00', program: 'Supreme Sunday News',      category: 'News' },
  { time: '11:30', program: 'Colombo Kitchen Special',  category: 'Lifestyle' },
  { time: '12:00', program: 'Movie: Neth Kantha',       category: 'Film' },
  { time: '14:00', program: 'Global Pulse Weekend',     category: 'News' },
  { time: '15:00', program: 'Samanmaliya',              category: 'Drama' },
  { time: '16:00', program: 'Sanda Eliya Best Of',      category: 'Drama' },
  { time: '17:00', program: 'Sports Hour',              category: 'Sports' },
  { time: '18:00', program: 'Supreme Evening News',     category: 'News' },
  { time: '19:00', program: 'Supreme Prime Time News',  category: 'News' },
  { time: '20:00', program: 'Sanda Eliya',              category: 'Drama' },
  { time: '20:30', program: 'Sihina Genalla Finale',    category: 'Drama' },
  { time: '22:00', program: 'Yowun Wasanthe',           category: 'Drama' },
  { time: '23:00', program: 'Supreme Night News',       category: 'News' },
  { time: '23:30', program: 'Late Night Global Pulse',  category: 'News' },
];

export const WEEKLY_SCHEDULE = {
  Monday: WEEKDAY, Tuesday: WEEKDAY, Wednesday: WEEKDAY,
  Thursday: WEEKDAY, Friday: WEEKDAY,
  Saturday: SATURDAY, Sunday: SUNDAY,
};

export const CATEGORY_COLORS = {
  News:          'bg-blue-500 text-white',
  Drama:         'bg-supreme-primary text-white',
  Entertainment: 'bg-pink-500 text-white',
  Lifestyle:     'bg-green-500 text-white',
  Religious:     'bg-amber-600 text-white',
  Sports:        'bg-emerald-500 text-white',
  Film:          'bg-rose-600 text-white',
};

export const TRENDING_PROGRAMS = [
  { id: 1, title: 'Yowun Wasanthe',       category: 'Drama',         thumb: '/images/yowun-wasanthaye.jpeg',       time: '9:30 PM',  badge: 'PRIME TIME' },
  { id: 2, title: 'Samanmaliya',          category: 'Drama',         thumb: '/images/samanmaliya.jpeg',            time: '8:00 PM',  badge: 'NEW EPISODE' },
  { id: 3, title: 'Ithin Ithin Kohomada', category: 'Entertainment', thumb: '/images/ithin-ithin-kohomada.jpeg',   time: '10:00 AM', badge: 'TODAY' },
  { id: 4, title: 'Global Pulse',         category: 'News',          thumb: '/images/global-pulse.jpeg',           time: '1:00 PM',  badge: 'DAILY' },
  { id: 5, title: 'Sanda Eliya',          category: 'Drama',         thumb: '/images/samanmaliya.jpeg',            time: '8:00 PM',  badge: 'TRENDING' },
  { id: 6, title: 'Mal Mithuru',          category: 'Drama',         thumb: '/images/yowun-wasanthaye.jpeg',       time: '9:00 PM',  badge: 'POPULAR' },
  { id: 7, title: 'Supreme News 7PM',     category: 'News',          thumb: '/images/news-cover.jpeg',             time: '7:00 PM',  badge: 'LIVE' },
  { id: 8, title: 'Sihina Genalla',       category: 'Drama',         thumb: '/images/janahada.jpeg',               time: '8:30 PM',  badge: 'POPULAR' },
  { id: 9, title: 'Subha Arana',          category: 'Lifestyle',     thumb: '/images/every-morning.jpeg',          time: '5:30 AM',  badge: 'MORNING' },
];

// Returns the currently-airing and next program based on real clock
export function getCurrentAndNext() {
  const now = new Date();
  const jsDay = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const dayName = jsDay === 0 ? 'Sunday' : DAYS[jsDay - 1];
  const schedule = WEEKLY_SCHEDULE[dayName] ?? WEEKLY_SCHEDULE.Monday;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < schedule.length; i++) {
    const start = timeToMinutes(schedule[i].time);
    const nextStart = i + 1 < schedule.length
      ? timeToMinutes(schedule[i + 1].time)
      : 24 * 60;
    if (currentMinutes >= start && currentMinutes < nextStart) {
      return { current: schedule[i], next: schedule[i + 1] ?? schedule[0], dayName };
    }
  }
  return { current: schedule[0], next: schedule[1], dayName };
}
