import { useState, useEffect } from 'react';
import { X, Bell, Gamepad2, Globe, Star, Tv, Trophy } from 'lucide-react';
import { useMember } from '../context/MemberContext';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const COUNTRIES = [
  { code: 'LK', name: 'Sri Lanka 🇱🇰' },
  { code: 'GB', name: 'United Kingdom 🇬🇧' },
  { code: 'AU', name: 'Australia 🇦🇺' },
  { code: 'CA', name: 'Canada 🇨🇦' },
  { code: 'US', name: 'United States 🇺🇸' },
  { code: 'AE', name: 'UAE 🇦🇪' },
  { code: 'DE', name: 'Germany 🇩🇪' },
  { code: 'FR', name: 'France 🇫🇷' },
  { code: 'IT', name: 'Italy 🇮🇹' },
  { code: 'QA', name: 'Qatar 🇶🇦' },
  { code: 'KW', name: 'Kuwait 🇰🇼' },
  { code: 'SA', name: 'Saudi Arabia 🇸🇦' },
  { code: 'MY', name: 'Malaysia 🇲🇾' },
  { code: 'SG', name: 'Singapore 🇸🇬' },
  { code: 'NZ', name: 'New Zealand 🇳🇿' },
  { code: 'NL', name: 'Netherlands 🇳🇱' },
  { code: 'CH', name: 'Switzerland 🇨🇭' },
  { code: 'NO', name: 'Norway 🇳🇴' },
  { code: 'JP', name: 'Japan 🇯🇵' },
  { code: 'KR', name: 'South Korea 🇰🇷' },
  { code: 'OTHER', name: 'Other Country' },
];

const BENEFITS = [
  { icon: Bell,     text: 'Breaking news alerts & program reminders' },
  { icon: Gamepad2, text: 'Daily quizzes, polls & earn points' },
  { icon: Globe,    text: 'Connect with Sri Lankan diaspora worldwide' },
  { icon: Star,     text: 'Exclusive gossip & behind-the-scenes content' },
  { icon: Tv,       text: 'Never miss your favourite show' },
];

export default function MemberModal() {
  const { showModal, setShowModal, join, member } = useMember();
  const { lang, setLang }                         = useLanguage();
  const [step, setStep]   = useState('form');
  const [form, setForm]   = useState({ name: '', phone: '', country: '', age: '', lang: lang });
  const [errors, setErrors] = useState({});

  useEffect(() => { if (showModal) { setStep('form'); setForm(f => ({ ...f, lang })); } }, [showModal, lang]);

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e) => { if (e.key === 'Escape') setShowModal(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal, setShowModal]);

  if (!showModal) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.country) e.country = 'Required';
    const age = parseInt(form.age, 10);
    if (!form.age || isNaN(age) || age < 5 || age > 110) e.age = 'Enter a valid age';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLang(form.lang); // apply language preference immediately
    join(form);
    setStep('welcome');
  };

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const inputCls = (field) =>
    `w-full text-sm rounded-xl px-4 py-2.5 outline-none border transition-all bg-slate-100 dark:bg-supreme-dark ${
      errors[field]
        ? 'border-red-400 focus:ring-2 focus:ring-red-300'
        : 'border-transparent focus:ring-2 focus:ring-supreme-vivid/40'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl overflow-hidden shadow-2xl">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <X size={15} />
        </button>

        {step === 'form' ? (
          <div className="flex flex-col md:flex-row">
            {/* Left brand panel */}
            <div
              className="md:w-5/12 p-8 flex flex-col justify-center"
              style={{ background: 'linear-gradient(135deg, #1a0a1b 0%, #6A3E6B 60%, #7C3AED 100%)' }}
            >
              <div className="mb-6">
                <span className="text-[10px] font-heading font-800 uppercase tracking-widest text-pink-300 block mb-1">
                  Free Membership
                </span>
                <h2 className="font-heading font-800 text-white text-2xl leading-tight">
                  Join the Supreme Family
                </h2>
                <p className="text-white/60 text-xs font-body mt-2">
                  Sri Lanka's biggest TV community — wherever you are in the world.
                </p>
              </div>
              <ul className="space-y-3.5">
                {BENEFITS.map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/15 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Icon size={12} className="text-pink-300" />
                    </div>
                    <p className="text-white/80 text-[11px] font-body leading-snug">{text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-7 inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5 w-fit">
                <Trophy size={11} className="text-pink-300" />
                <span className="text-white text-[10px] font-heading font-700">100% Free — Always</span>
              </div>
            </div>

            {/* Right: simplified form */}
            <div className="md:w-7/12 bg-white dark:bg-supreme-deep p-8">
              <h3 className="font-heading font-800 text-supreme-dark dark:text-supreme-light text-lg mb-0.5">
                Create your account
              </h3>
              <p className="text-slate-500 text-xs font-body mb-5">
                Takes 30 seconds · No password needed
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-[11px] font-heading font-700 text-slate-600 dark:text-slate-300 mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Kasun Perera"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    className={inputCls('name')}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[11px] font-heading font-700 text-slate-600 dark:text-slate-300 mb-1 block">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    placeholder="+94 77 000 0000"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    className={inputCls('phone')}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                </div>

                {/* Country + Age */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-heading font-700 text-slate-600 dark:text-slate-300 mb-1 block">Country *</label>
                    <select
                      value={form.country}
                      onChange={(e) => set('country', e.target.value)}
                      className={inputCls('country')}
                    >
                      <option value="">Select…</option>
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </select>
                    {errors.country && <p className="text-red-500 text-[10px] mt-1">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="text-[11px] font-heading font-700 text-slate-600 dark:text-slate-300 mb-1 block">Age *</label>
                    <input
                      type="number"
                      min="5" max="110"
                      placeholder="e.g. 28"
                      value={form.age}
                      onChange={(e) => set('age', e.target.value)}
                      className={inputCls('age')}
                    />
                    {errors.age && <p className="text-red-500 text-[10px] mt-1">{errors.age}</p>}
                  </div>
                </div>

                {/* Language preference */}
                <div>
                  <label className="text-[11px] font-heading font-700 text-slate-600 dark:text-slate-300 mb-2 block">
                    Preferred Language
                  </label>
                  <div className="flex gap-2">
                    {LANGUAGES.map(({ code, label, full }) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => set('lang', code)}
                        className={`flex-1 py-2 rounded-xl text-sm font-heading font-700 border-2 transition-all ${
                          form.lang === code
                            ? 'bg-supreme-vivid border-supreme-vivid text-white'
                            : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-supreme-vivid/40'
                        }`}
                      >
                        {label} <span className="text-[9px] font-normal hidden sm:inline">· {full}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-supreme-vivid hover:bg-purple-600 text-white font-heading font-800 text-sm py-3 rounded-xl transition-all hover:shadow-lg"
                >
                  Join Free — It's Free! 🎉
                </button>

                <p className="text-center text-[10px] font-body text-slate-400">
                  We never share your details. You can leave anytime.
                </p>
              </form>
            </div>
          </div>
        ) : (
          <WelcomeStep member={member} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}

function WelcomeStep({ member, onClose }) {
  const countryName = COUNTRIES.find(c => c.code === member?.country)?.name ?? member?.country ?? '';
  const joinDate = member?.joinedAt
    ? new Date(member.joinedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : '';

  return (
    <div
      className="p-10 text-center"
      style={{ background: 'linear-gradient(135deg, #1a0a1b 0%, #6A3E6B 60%, #7C3AED 100%)' }}
    >
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="font-heading font-800 text-white text-2xl mb-1">
        Welcome to the family, {member?.name?.split(' ')[0]}!
      </h2>
      <p className="text-white/60 text-sm font-body mb-7">
        You're now part of Sri Lanka's biggest TV community.
      </p>

      {/* Member card */}
      <div className="max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl mb-8">
        <div className="px-5 py-2.5 flex items-center justify-between" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <span className="text-[9px] font-heading font-800 uppercase tracking-widest text-pink-300">
            Supreme TV · Member
          </span>
          <Tv size={12} className="text-pink-300" />
        </div>
        <div className="bg-white/10 backdrop-blur-sm px-5 py-4 text-left space-y-3">
          <div>
            <p className="text-white font-heading font-800 text-lg leading-tight">{member?.name}</p>
            <p className="text-white/50 text-[10px] font-body mt-0.5">{countryName}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <p className="text-white/40 uppercase tracking-widest text-[8px]">Member ID</p>
              <p className="text-pink-300 font-heading font-700">{member?.id}</p>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-widest text-[8px]">Points</p>
              <p className="text-pink-300 font-heading font-700">⭐ {member?.points ?? 10}</p>
            </div>
            <div className="col-span-2">
              <p className="text-white/40 uppercase tracking-widest text-[8px]">Member since</p>
              <p className="text-white/70 font-body">{joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={onClose}
          className="bg-white text-supreme-vivid font-heading font-800 text-sm px-8 py-2.5 rounded-full hover:shadow-lg transition-all"
        >
          Start Exploring
        </button>
        <button
          onClick={onClose}
          className="bg-white/15 hover:bg-white/25 text-white font-heading font-700 text-sm px-6 py-2.5 rounded-full transition-colors"
        >
          Set My Alerts
        </button>
      </div>
    </div>
  );
}
