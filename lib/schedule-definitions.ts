export type ScheduleDefinition = {
  title: string;
  dayOfWeek: number;
  startMinutes: number;
  endMinutes: number;
  isLiveWindow: boolean;
  notes: string | null;
  programSlug?: string | null;
};

const NEXT_DAY = 24 * 60;

export const scheduleDefinitions: ScheduleDefinition[] = [
  {
    title: "Supreme Prime Time News",
    programSlug: "supreme-prime-time-news",
    dayOfWeek: 1,
    startMinutes: 19 * 60,
    endMinutes: 19 * 60 + 30,
    isLiveWindow: true,
    notes: "Primary nightly bulletin window"
  },
  {
    title: "Janahada",
    programSlug: "janahada",
    dayOfWeek: 1,
    startMinutes: 20 * 60,
    endMinutes: 21 * 60,
    isLiveWindow: false,
    notes: "Current affairs discussion"
  },
  {
    title: "CNA on TV Supreme",
    dayOfWeek: 2,
    startMinutes: 4 * 60 + 50,
    endMinutes: 5 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Asiri Diri Piritha",
    dayOfWeek: 2,
    startMinutes: 5 * 60,
    endMinutes: 6 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Saddharmalankaraya",
    dayOfWeek: 2,
    startMinutes: 6 * 60,
    endMinutes: 6 * 60 + 30,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Hathara Wate",
    dayOfWeek: 2,
    startMinutes: 6 * 60 + 30,
    endMinutes: 7 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "CNA on TV Supreme",
    dayOfWeek: 2,
    startMinutes: 7 * 60,
    endMinutes: 7 * 60 + 30,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "PJFM",
    dayOfWeek: 2,
    startMinutes: 7 * 60 + 30,
    endMinutes: 8 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Every Morning - Taru Udesana",
    programSlug: "every-morning",
    dayOfWeek: 2,
    startMinutes: 8 * 60,
    endMinutes: 8 * 60 + 30,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Every Morning - Heda Weda Udesana",
    programSlug: "every-morning",
    dayOfWeek: 2,
    startMinutes: 8 * 60 + 30,
    endMinutes: 9 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Every Morning - Suwethi Udesana",
    programSlug: "every-morning",
    dayOfWeek: 2,
    startMinutes: 9 * 60,
    endMinutes: 9 * 60 + 30,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Every Morning - Shilpa Udesana",
    programSlug: "every-morning",
    dayOfWeek: 2,
    startMinutes: 9 * 60 + 30,
    endMinutes: 10 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Every Morning",
    programSlug: "every-morning",
    dayOfWeek: 2,
    startMinutes: 10 * 60,
    endMinutes: 10 * 60 + 30,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "CNA on TV Supreme",
    dayOfWeek: 2,
    startMinutes: 10 * 60 + 30,
    endMinutes: 11 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "CNA on TV Supreme - Asia Now",
    dayOfWeek: 2,
    startMinutes: 11 * 60,
    endMinutes: 11 * 60 + 25,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "TV Supreme News - Midday Live",
    programSlug: "supreme-prime-time-news",
    dayOfWeek: 2,
    startMinutes: 11 * 60 + 25,
    endMinutes: 12 * 60,
    isLiveWindow: true,
    notes: null
  },
  {
    title: "Rhythm Cafe | Live",
    dayOfWeek: 2,
    startMinutes: 12 * 60,
    endMinutes: 13 * 60,
    isLiveWindow: true,
    notes: null
  },
  {
    title: "Supreme Home Theatre - Cobra",
    dayOfWeek: 2,
    startMinutes: 13 * 60,
    endMinutes: 16 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "CNA on TV Supreme",
    dayOfWeek: 2,
    startMinutes: 16 * 60,
    endMinutes: 18 * 60,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Vishwa Serisara",
    dayOfWeek: 2,
    startMinutes: 18 * 60,
    endMinutes: 18 * 60 + 25,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "TV Supreme News - Prime Time Live",
    programSlug: "supreme-prime-time-news",
    dayOfWeek: 2,
    startMinutes: 18 * 60 + 25,
    endMinutes: 19 * 60,
    isLiveWindow: true,
    notes: null
  },
  {
    title: "38th Match | Highlights",
    programSlug: "sports-supreme",
    dayOfWeek: 2,
    startMinutes: 19 * 60,
    endMinutes: 19 * 60 + 30,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "IPL 2026 | 40th Match | Punjab Kings Vs Rajasthan Royals | Live",
    programSlug: "sports-supreme",
    dayOfWeek: 2,
    startMinutes: 19 * 60 + 30,
    endMinutes: 23 * 60 + 30,
    isLiveWindow: true,
    notes: null
  },
  {
    title: "TV Supreme News - Night Time",
    programSlug: "supreme-prime-time-news",
    dayOfWeek: 2,
    startMinutes: 23 * 60 + 30,
    endMinutes: NEXT_DAY,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "CNA on TV Supreme",
    dayOfWeek: 2,
    startMinutes: NEXT_DAY,
    endMinutes: NEXT_DAY + 4 * 60 + 50,
    isLiveWindow: false,
    notes: null
  },
  {
    title: "Yowun Wasanthe",
    programSlug: "yowun-wasanthe",
    dayOfWeek: 3,
    startMinutes: 14 * 60,
    endMinutes: 14 * 60 + 30,
    isLiveWindow: false,
    notes: "Afternoon youth drama"
  },
  {
    title: "Every Morning",
    programSlug: "every-morning",
    dayOfWeek: 4,
    startMinutes: 8 * 60,
    endMinutes: 9 * 60 + 30,
    isLiveWindow: false,
    notes: "Daily lifestyle block"
  },
  {
    title: "Sports Supreme",
    programSlug: "sports-supreme",
    dayOfWeek: 5,
    startMinutes: 21 * 60,
    endMinutes: 21 * 60 + 30,
    isLiveWindow: false,
    notes: "Daily sports wrap"
  }
];
