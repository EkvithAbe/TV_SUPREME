import { useState, useEffect } from 'react';
import { X, Phone, MapPin, Calendar, Globe, LogOut, Trophy, Bell, Tv, Clock, Star, Bookmark } from 'lucide-react';
import { useMember } from '../context/MemberContext';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const COUNTRIES = {
  LK: 'Sri Lanka 🇱🇰', GB: 'United Kingdom 🇬🇧', AU: 'Australia 🇦🇺',
  CA: 'Canada 🇨🇦', US: 'United States 🇺🇸', AE: 'UAE 🇦🇪',
  DE: 'Germany 🇩🇪', FR: 'France 🇫🇷', IT: 'Italy 🇮🇹',
  QA: 'Qatar 🇶🇦', KW: 'Kuwait 🇰🇼', SA: 'Saudi Arabia 🇸🇦',
  MY: 'Malaysia 🇲🇾', SG: 'Singapore 🇸🇬', NZ: 'New Zealand 🇳🇿',
  NL: 'Netherlands 🇳🇱', CH: 'Switzerland 🇨🇭', NO: 'Norway 🇳🇴',
  JP: 'Japan 🇯🇵', KR: 'South Korea 🇰🇷', OTHER: 'Other Country',
};

const INTEREST_CATEGORIES = [
  { key: 'news',          label: 'News',          emoji: '📰' },
  { key: 'sports',        label: 'Sports',         emoji: '🏏' },
  { key: 'entertainment', label: 'Entertainment',  emoji: '🎬' },
  { key: 'politics',      label: 'Politics',       emoji: '🏛️' },
  { key: 'business',      label: 'Business',       emoji: '💼' },
  { key: 'world',         label: 'World',          emoji: '🌍' },
  { key: 'lifestyle',     label: 'Lifestyle',      emoji: '✨' },
  { key: 'dramas',        label: 'Dramas',         emoji: '🎭' },
];

export default function MemberProfile() {
  const {
    member, showProfile, setShowProfile, logout,
    watchLater, toggleWatchLater,
    reminders, removeReminder,
  } = useMember();
  const { lang, setLang } = useLanguage();

  const defaultInterests = { news: true, sports: true, entertainment: true, dramas: false, politics: false, business: false, world: false, lifestyle: false };
  const [interests, setInterests] = useState(() => {
    try { return JSON.parse(localStorage.getItem('stv_interests') || 'null') ?? defaultInterests; }
    catch { return defaultInterests; }
  });

  useEffect(() => {
    if (!showProfile) return;
    const onKey = (e) => { if (e.key === 'Escape') setShowProfile(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showProfile, setShowProfile]);

  useEffect(() => {
    document.body.style.overflow = showProfile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showProfile]);

  const toggleInterest = (key) => {
    setInterests(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('stv_interests', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLogout = () => {
    logout();
    setShowProfile(false);
  };

  if (!member) return null;

  const joinDate = member.joinedAt
    ? new Date(member.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const preferredLang = LANGUAGES.find(l => l.code === (member.lang || lang));

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          showProfile ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowProfile(false)}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-sm bg-white dark:bg-supreme-deep shadow-2xl flex flex-col transition-transform duration-300 ${
          showProfile ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1a0a1b 0%, #6A3E6B 100%)' }}
        >
          <span className="text-white font-heading font-800 text-sm">My Profile</span>
          <button
            onClick={() => setShowProfile(false)}
            className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Member card */}
          <div
            className="px-5 pt-5 pb-6 text-center"
            style={{ background: 'linear-gradient(135deg, #1a0a1b 0%, #6A3E6B 100%)' }}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center font-heading font-800 text-white text-2xl mx-auto mb-3 ring-2 ring-white/30">
              {member.name[0].toUpperCase()}
            </div>
            <p className="text-white font-heading font-800 text-base">{member.name}</p>
            <p className="text-white/50 text-[11px] font-body mt-0.5">{COUNTRIES[member.country] ?? member.country}</p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="text-center">
                <p className="text-pink-300 font-heading font-800 text-lg">⭐ {member.points}</p>
                <p className="text-white/40 text-[9px] font-body uppercase tracking-widest">Points</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-pink-300 font-heading font-800 text-sm">{member.id}</p>
                <p className="text-white/40 text-[9px] font-body uppercase tracking-widest">Member ID</p>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 space-y-6">
            {/* Details */}
            <section>
              <h3 className="text-[10px] font-heading font-800 uppercase tracking-widest text-supreme-mid mb-3">
                My Details
              </h3>
              <div className="space-y-2.5">
                <Row icon={<Phone size={13} />} label="Phone" value={member.phone} />
                <Row icon={<MapPin size={13} />} label="Country" value={COUNTRIES[member.country] ?? member.country} />
                <Row icon={<Calendar size={13} />} label="Age" value={`${member.age} years old`} />
                <Row icon={<Globe size={13} />} label="Language" value={preferredLang?.full ?? 'English'} />
                <Row icon={<Trophy size={13} />} label="Joined" value={joinDate} />
              </div>
            </section>

            {/* Language quick-switch */}
            <section>
              <h3 className="text-[10px] font-heading font-800 uppercase tracking-widest text-supreme-mid mb-3">
                Reading Language
              </h3>
              <div className="flex gap-2">
                {LANGUAGES.map(({ code, label, full }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`flex-1 py-2 rounded-xl text-xs font-heading font-700 border-2 transition-all ${
                      lang === code
                        ? 'bg-supreme-vivid border-supreme-vivid text-white'
                        : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-supreme-vivid/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-supreme-mid font-body mt-2">
                News headlines and content will switch language instantly.
              </p>
            </section>

            {/* Interests */}
            <section>
              <h3 className="text-[10px] font-heading font-800 uppercase tracking-widest text-supreme-mid mb-3">
                My Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {INTEREST_CATEGORIES.map(({ key, label, emoji }) => (
                  <button
                    key={key}
                    onClick={() => toggleInterest(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-700 border transition-all ${
                      interests[key]
                        ? 'bg-supreme-vivid border-supreme-vivid text-white'
                        : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-supreme-vivid/40'
                    }`}
                  >
                    {emoji} {label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-supreme-mid font-body mt-2">
                Your feed will be personalised based on these interests.
              </p>
            </section>

            {/* Watch Later */}
            <section>
              <h3 className="text-[10px] font-heading font-800 uppercase tracking-widest text-supreme-mid mb-3 flex items-center gap-2">
                Watch Later
                {watchLater.length > 0 && (
                  <span className="bg-supreme-vivid text-white text-[9px] font-heading font-800 px-1.5 py-0.5 rounded-full">
                    {watchLater.length}
                  </span>
                )}
              </h3>
              {watchLater.length === 0 ? (
                <div className="flex items-center gap-2.5 text-supreme-mid text-[11px] font-body italic py-1">
                  <Bookmark size={13} className="flex-shrink-0 opacity-40" />
                  No items saved yet. Tap the bookmark icon on any video or program.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {watchLater.slice(0, 6).map(item => (
                    <div key={item.id} className="flex items-center gap-3 group">
                      <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumb}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-heading font-700 text-supreme-dark dark:text-supreme-light group-hover:text-supreme-vivid transition-colors line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[10px] font-body text-supreme-mid flex items-center gap-1 mt-0.5">
                          <Clock size={9} /> {item.meta}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleWatchLater(item)}
                        className="w-6 h-6 rounded-full bg-slate-100 dark:bg-supreme-primary/20 flex items-center justify-center text-supreme-mid hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
                        aria-label="Remove"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  {watchLater.length > 6 && (
                    <p className="text-[10px] text-supreme-mid font-body text-center pt-1">
                      +{watchLater.length - 6} more saved
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Reminders */}
            <section>
              <h3 className="text-[10px] font-heading font-800 uppercase tracking-widest text-supreme-mid mb-3 flex items-center gap-2">
                Reminders
                {reminders.length > 0 && (
                  <span className="bg-supreme-vivid text-white text-[9px] font-heading font-800 px-1.5 py-0.5 rounded-full">
                    {reminders.length}
                  </span>
                )}
              </h3>
              {reminders.length === 0 ? (
                <div className="flex items-center gap-2.5 text-supreme-mid text-[11px] font-body italic py-1">
                  <Bell size={13} className="flex-shrink-0 opacity-40" />
                  No reminders set. Tap "Remind me" on any upcoming program.
                </div>
              ) : (
                <div className="space-y-2">
                  {reminders.map(r => (
                    <div
                      key={`${r.day}|${r.time}`}
                      className="flex items-center gap-3 bg-supreme-vivid/8 dark:bg-supreme-vivid/10 rounded-xl px-3 py-2.5"
                    >
                      <Bell size={13} className="text-supreme-vivid flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-heading font-700 text-supreme-dark dark:text-supreme-light line-clamp-1">
                          {r.program}
                        </p>
                        <p className="text-[10px] font-body text-supreme-mid mt-0.5">
                          {r.day} at {r.time}
                        </p>
                      </div>
                      <button
                        onClick={() => removeReminder(r.day, r.time)}
                        className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex-shrink-0"
                        aria-label="Remove reminder"
                      >
                        <X size={9} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Notification alerts info */}
            <section className="bg-supreme-vivid/10 rounded-2xl p-4 flex items-start gap-3">
              <Bell size={16} className="text-supreme-vivid mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-supreme-dark dark:text-supreme-light text-xs font-heading font-700">Notification Alerts</p>
                <p className="text-supreme-mid text-[10px] font-body mt-0.5">Configure which alerts you receive from the Community Hub.</p>
              </div>
            </section>

            {/* Sign out */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-200 dark:border-red-900/40 text-red-500 text-sm font-heading font-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={15} /> Sign Out
            </button>

            <div className="h-4" />
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-supreme-primary/20 flex items-center justify-center text-supreme-mid flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-heading font-700 uppercase tracking-widest text-supreme-mid">{label}</p>
        <p className="text-sm font-body text-supreme-dark dark:text-supreme-light truncate">{value}</p>
      </div>
    </div>
  );
}
