import { TrendingUp } from 'lucide-react';
import { tickerItems } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const CATEGORY_COLORS = {
  Politics:      'bg-violet-700 text-white',
  Sports:        'bg-emerald-600 text-white',
  Economy:       'bg-blue-700 text-white',
  World:         'bg-slate-600 text-white',
  Weather:       'bg-sky-600 text-white',
  Entertainment: 'bg-supreme-primary text-white',
  Health:        'bg-rose-600 text-white',
  Tech:          'bg-indigo-600 text-white',
  Business:      'bg-amber-600 text-white',
  Environment:   'bg-teal-600 text-white',
};

function TickerItem({ item }) {
  const { t } = useLanguage();
  const category = t(item.categorySi
    ? { en: item.category, si: item.categorySi, ta: item.categorySi }
    : item.category);
  const text = t(item.textSi
    ? { en: item.text, si: item.textSi, ta: item.textSi }
    : item.text);
  const colorClass = CATEGORY_COLORS[item.category] || 'bg-supreme-primary text-white';

  return (
    <span className="inline-flex items-center gap-3 mx-8 whitespace-nowrap">
      <span className={`cat-pill font-heading text-[10px] ${colorClass}`}>{category}</span>
      <span className="text-sm font-body text-white/85">{text}</span>
      <span className="text-supreme-mid text-xl leading-none select-none">·</span>
    </span>
  );
}

export default function TrendingMarquee() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="bg-supreme-dark overflow-hidden py-3 select-none">
      <div className="max-w-7xl mx-auto px-0 flex items-center">
        <div className="flex-shrink-0 flex items-center gap-2 bg-supreme-vivid px-5 py-3 self-stretch z-10">
          <TrendingUp size={14} className="text-white" />
          <span className="text-white text-[11px] font-heading font-800 uppercase tracking-[0.18em] whitespace-nowrap">
            Trending
          </span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-marquee">
            {doubled.map((item, i) => (
              <TickerItem key={`${item.id}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
