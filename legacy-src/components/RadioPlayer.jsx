import { useState } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, ChevronUp, ChevronDown } from 'lucide-react';
import { useRadio } from '../context/RadioContext';

const SCHEDULE = [
  { time: '05:00', show: 'Morning Devotional',  host: 'Rev. Sumananda' },
  { time: '07:00', show: 'Sinhala Pop Hour',     host: 'DJ Nuwan' },
  { time: '08:00', show: 'News Radio',           host: 'Tharanga Dissanayake' },
  { time: '10:00', show: 'Morning Talk',         host: 'Kasun & Nirmali' },
  { time: '12:00', show: 'Midday Mix',           host: 'DJ Priya' },
  { time: '14:00', show: 'Sinhala Classics',     host: 'Malini Fonseka Hour' },
  { time: '18:00', show: 'Drive Time Radio',     host: 'Asanka Priyamantha' },
  { time: '20:00', show: 'Night Live',           host: 'Chamara & Sachini' },
];

export default function RadioPlayer() {
  const { radioOpen, setRadioOpen, isPlaying, setIsPlaying } = useRadio();
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(80);

  if (!radioOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-supreme-dark border-t-2 border-supreme-vivid/40 shadow-2xl">

      {/* Schedule panel */}
      {expanded && (
        <div className="max-w-7xl mx-auto px-4 py-4 border-b border-supreme-primary/20">
          <p className="text-xs font-heading font-700 uppercase tracking-widest text-supreme-mid mb-3">
            Today's Radio Schedule
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SCHEDULE.map(slot => (
              <div key={slot.time} className="bg-supreme-deep/80 border border-supreme-primary/20 rounded-xl px-3 py-2">
                <span className="text-supreme-vivid font-heading font-700 text-xs">{slot.time}</span>
                <p className="text-white text-xs font-body mt-0.5 leading-snug">{slot.show}</p>
                <p className="text-supreme-mid text-[10px] font-body">{slot.host}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Player bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Station info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-supreme-vivid to-supreme-pink flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-sm">📻</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-heading font-700 leading-tight truncate">
              Sinhala Classics Mix
            </p>
            <p className="text-supreme-mid text-[10px] font-body">
              TV Supreme Radio · Sinhala Classics
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="hidden sm:flex flex-1 max-w-xs items-center gap-2">
          <span className="text-supreme-mid text-[10px] font-body flex-shrink-0">14:23</span>
          <div className="flex-1 h-1 bg-supreme-primary/40 rounded-full overflow-hidden">
            <div className="h-full bg-supreme-vivid rounded-full" style={{ width: '42%' }} />
          </div>
          <span className="text-supreme-mid text-[10px] font-body flex-shrink-0">LIVE</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button className="hidden sm:flex p-2 text-supreme-mid hover:text-white transition-colors rounded-full hover:bg-supreme-primary/20">
            <SkipBack size={15} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-supreme-vivid hover:bg-supreme-bright flex items-center justify-center text-white transition-colors shadow-lg"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} fill="white" />}
          </button>
          <button className="hidden sm:flex p-2 text-supreme-mid hover:text-white transition-colors rounded-full hover:bg-supreme-primary/20">
            <SkipForward size={15} />
          </button>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Volume2 size={14} className="text-supreme-mid" />
          <input
            type="range" min="0" max="100" value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="w-20 accent-[#7C3AED] h-1 cursor-pointer"
          />
        </div>

        {/* Schedule toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="hidden sm:flex items-center gap-1 text-[10px] font-heading font-700 text-supreme-mid hover:text-supreme-bright transition-colors flex-shrink-0"
        >
          Schedule
          {expanded ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
        </button>

        {/* Close */}
        <button
          onClick={() => { setRadioOpen(false); setIsPlaying(false); setExpanded(false); }}
          className="p-2 rounded-full text-supreme-mid hover:text-white hover:bg-supreme-primary/40 transition-colors flex-shrink-0"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
