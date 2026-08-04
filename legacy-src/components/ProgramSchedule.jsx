import { useState } from 'react';
import { ArrowRight, Bell } from 'lucide-react';
import { DAYS, WEEKLY_SCHEDULE, CATEGORY_COLORS, getCurrentAndNext } from '../data/scheduleData';
import { useMember } from '../context/MemberContext';
import { useToast } from '../context/ToastContext';

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function getTodayName() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 'Sunday' : DAYS[jsDay - 1];
}

export default function ProgramSchedule() {
  const todayName = getTodayName();
  const [activeDay, setActiveDay] = useState(todayName);

  const { member, hasReminder, addReminder, removeReminder, setShowModal } = useMember();
  const { showToast } = useToast();

  const schedule = WEEKLY_SCHEDULE[activeDay] ?? [];
  const { current } = getCurrentAndNext();

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const handleReminder = (e, slot) => {
    e.stopPropagation();
    if (!member) {
      setShowModal(true);
      return;
    }
    const set = hasReminder(activeDay, slot.time);
    if (set) {
      removeReminder(activeDay, slot.time);
      showToast('Reminder removed', 'remove');
    } else {
      addReminder({ day: activeDay, time: slot.time, program: slot.program });
      showToast(`Reminder set for ${slot.program} (${slot.time})`, 'success');
    }
  };

  return (
    <section className="py-10 bg-white dark:bg-supreme-deep border-t border-supreme-mid/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
            <div>
              <span className="text-[10px] font-heading font-800 uppercase tracking-widest text-supreme-vivid dark:text-supreme-bright block">
                Program Guide
              </span>
              <h2 className="font-heading font-800 text-supreme-dark dark:text-supreme-light text-xl leading-tight">
                Today's Schedule
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-body text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            On Air Now: <span className="font-heading font-700">{current.program}</span>
          </div>
        </div>

        {/* Day tabs */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto scrollbar-hide pb-1">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-heading font-700 uppercase tracking-wider transition-all duration-200 ${
                activeDay === day
                  ? 'bg-supreme-vivid text-white shadow-md'
                  : `bg-supreme-mid/10 dark:bg-supreme-primary/20 text-supreme-mid hover:text-supreme-vivid hover:bg-supreme-vivid/10 ${
                      day === todayName ? 'ring-1 ring-supreme-vivid/40' : ''
                    }`
              }`}
            >
              {day.slice(0, 3)}
              {day === todayName && (
                <span className={`ml-1 text-[8px] ${activeDay === day ? 'text-white/70' : 'text-supreme-vivid'}`}>
                  ●
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Schedule cards — horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3">
          {schedule.map((slot, i) => {
            const slotMin = timeToMinutes(slot.time);
            const nextMin = i + 1 < schedule.length ? timeToMinutes(schedule[i + 1].time) : 24 * 60;
            const isNow = activeDay === todayName && slotMin <= nowMinutes && nowMinutes < nextMin;
            const isPast = activeDay === todayName && !isNow && slotMin < nowMinutes;
            const catColor = CATEGORY_COLORS[slot.category] ?? 'bg-supreme-primary text-white';
            const reminderSet = hasReminder(activeDay, slot.time);
            const canRemind = !isPast && !isNow;

            return (
              <div
                key={i}
                className={`flex-shrink-0 w-44 rounded-2xl p-4 border transition-all duration-200 cursor-pointer group ${
                  isNow
                    ? 'bg-supreme-vivid border-supreme-vivid shadow-lg text-white scale-[1.03]'
                    : isPast
                    ? 'bg-supreme-light dark:bg-supreme-dark/40 border-supreme-mid/10 opacity-45'
                    : 'bg-supreme-light dark:bg-supreme-dark/40 border-supreme-mid/15 hover:border-supreme-vivid/40 hover:shadow-card'
                }`}
              >
                {/* Time */}
                <p className={`text-xl font-heading font-800 mb-1 tabular-nums ${isNow ? 'text-white' : 'text-supreme-dark dark:text-supreme-light'}`}>
                  {slot.time}
                </p>

                {/* Live indicator */}
                {isNow && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                    <span className="text-[9px] font-heading font-800 uppercase tracking-widest text-white/80">
                      On Air Now
                    </span>
                  </div>
                )}

                {/* Program name */}
                <p className={`text-xs font-heading font-700 leading-snug mb-2.5 line-clamp-2 ${
                  isNow ? 'text-white' : 'text-supreme-dark dark:text-supreme-light group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors'
                }`}>
                  {slot.program}
                </p>

                {/* Category badge */}
                <span className={`text-[9px] font-heading font-700 uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isNow ? 'bg-white/20 text-white' : catColor
                }`}>
                  {slot.category}
                </span>

                {/* Reminder button — only for upcoming slots */}
                {canRemind && (
                  <button
                    onClick={(e) => handleReminder(e, slot)}
                    className={`mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-heading font-700 border transition-all duration-200 ${
                      reminderSet
                        ? 'bg-supreme-vivid border-supreme-vivid text-white'
                        : 'border-supreme-mid/30 text-supreme-mid hover:border-supreme-vivid hover:text-supreme-vivid dark:hover:text-supreme-bright bg-transparent'
                    }`}
                    aria-label={reminderSet ? 'Remove reminder' : 'Set reminder'}
                  >
                    <Bell size={11} fill={reminderSet ? 'currentColor' : 'none'} />
                    {reminderSet ? 'Reminder set' : 'Remind me'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-[10px] font-body text-supreme-mid">
            * All times Sri Lanka Standard Time (GMT+5:30). Schedule subject to change.
          </p>
          <a href="#" className="text-xs font-heading font-700 text-supreme-vivid dark:text-supreme-bright hover:underline flex items-center gap-1">
            Full Program Chart <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}
