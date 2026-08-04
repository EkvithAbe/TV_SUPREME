import { Users, Bell, Gamepad2, Star, Trophy, Youtube, Facebook, Instagram } from 'lucide-react';
import { useMember } from '../context/MemberContext';

const SOCIAL_LINKS = [
  {
    label: 'YouTube',
    sub: '359K subscribers',
    bg: 'bg-red-600 hover:bg-red-500',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    sub: 'Follow for live updates',
    bg: 'bg-blue-600 hover:bg-blue-500',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    sub: 'Stories & reels daily',
    bg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-500 hover:via-pink-400 hover:to-orange-300',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    sub: 'Short clips & reels',
    bg: 'bg-black hover:bg-zinc-800',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function MemberBanner() {
  const { member, setShowModal } = useMember();

  if (member) {
    return (
      <div
        className="py-6 px-4"
        style={{ background: 'linear-gradient(135deg, #1a0a1b 0%, #6A3E6B 60%, #7C3AED 100%)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-5">
          {/* Welcome */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-heading font-800 text-white text-base select-none">
              {member.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-white font-heading font-800 text-sm">
                Welcome back, {member.name.split(' ')[0]}!
              </p>
              <p className="text-white/50 text-[10px] font-body flex items-center gap-1.5">
                <Trophy size={9} /> {member.points} pts · {member.id}
              </p>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-white/15" />

          {/* Social follow */}
          <div className="flex-1 flex flex-col gap-1.5">
            <p className="text-white/50 text-[10px] font-heading font-700 uppercase tracking-widest">
              Grow with us — Follow Supreme TV:
            </p>
            <div className="flex gap-2 flex-wrap">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className={`flex items-center gap-1.5 ${s.bg} text-white text-[10px] font-heading font-700 px-3 py-1.5 rounded-full transition-all`}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-[11px] font-heading font-700 px-4 py-2 rounded-full transition-colors">
              <Bell size={11} /> My Alerts
            </button>
            <button className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-400 text-white text-[11px] font-heading font-800 px-4 py-2 rounded-full transition-colors">
              <Gamepad2 size={11} /> Play
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden py-10 px-4"
      style={{ background: 'linear-gradient(135deg, #1a0a1b 0%, #6A3E6B 60%, #7C3AED 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              <span className="text-white text-[10px] font-heading font-800 uppercase tracking-widest">Free Membership</span>
            </div>
            <h2 className="font-heading font-800 text-white text-3xl lg:text-4xl mb-3">
              Join the Supreme Family
            </h2>
            <p className="text-white/60 text-sm font-body mb-5 max-w-md mx-auto lg:mx-0">
              Program reminders, breaking news alerts, daily games & connect with Sri Lankan diaspora worldwide. Completely free.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={() => setShowModal(true)}
                className="bg-pink-500 hover:bg-pink-400 text-white font-heading font-800 text-sm px-8 py-3 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Join Free — 30 seconds 🎉
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-white/15 hover:bg-white/25 text-white font-heading font-700 text-sm px-6 py-3 rounded-full transition-colors"
              >
                Learn More
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-5 flex items-center justify-center lg:justify-start gap-5 text-white/40 text-[11px] font-body">
              <span className="flex items-center gap-1.5"><Users size={11} /> 12,400+ members worldwide</span>
              <span className="flex items-center gap-1.5"><Star size={11} /> 4.9/5 community rating</span>
            </div>
          </div>

          {/* Right: feature pills */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {[
              { icon: Bell,     text: 'News Alerts',   sub: 'Breaking & programs' },
              { icon: Gamepad2, text: 'Daily Games',   sub: 'Quiz, puzzles & polls' },
              { icon: Users,    text: 'Community',     sub: 'Global diaspora' },
              { icon: Star,     text: 'Gossip Hub',    sub: 'Exclusive content' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="bg-white/10 rounded-2xl p-4 text-center">
                <Icon size={20} className="text-pink-300 mx-auto mb-1.5" />
                <p className="text-white font-heading font-700 text-xs">{text}</p>
                <p className="text-white/40 text-[10px] font-body">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
