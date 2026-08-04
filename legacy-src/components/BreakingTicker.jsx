import { useState } from 'react';
import { X } from 'lucide-react';

const ITEMS = [
  'ජනාධිපතිවරයා හදිසි ශ්‍රේෂ්ඨාරුද සභා සැසිය කැඳවයි — Rs.480 බිලියන් ආර්ථික ප්‍රකෘති සැලැස්ම ප්‍රකාශ',
  'T20 World Cup 2026: Sri Lanka vs India — Colombo Match Tickets SOLD OUT',
  'Central Bank announces 25bps interest rate cut — effective Monday',
  'Cabinet reshuffle confirmed — 3 new ministers appointed by President Dissanayake',
  'Flash flood warning issued for Sabaragamuwa and Southern Province this weekend',
  'ශ්‍රී ලංකා vs ඉන්දියා: නිශ්ශංක ශතකය — කොළඹ ටිකට් අලෙවිය දැනටමත් අවසන්',
];

export default function BreakingTicker() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="flex items-stretch overflow-hidden select-none" style={{ background: '#b91c1c' }}>
      {/* Label */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 font-heading font-800 uppercase tracking-widest text-white text-[11px] whitespace-nowrap"
        style={{ background: '#991b1b' }}
      >
        <span className="w-2 h-2 rounded-full bg-white animate-live-pulse" />
        Breaking
      </div>

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden flex items-center py-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center text-white text-xs font-body mx-8">
              {item}
              <span className="ml-8 opacity-40 text-lg leading-none">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 px-3 flex items-center text-white/70 hover:text-white hover:bg-red-800 transition-colors"
        aria-label="Dismiss breaking ticker"
      >
        <X size={13} />
      </button>
    </div>
  );
}
