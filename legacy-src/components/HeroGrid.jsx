import { Clock, User, ArrowRight } from 'lucide-react';
import { heroStory, sideStories } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

function BreakingBadge() {
  return (
    <span className="breaking-badge inline-flex items-center gap-1.5 bg-supreme-vivid text-white text-[10px] font-heading font-800 uppercase tracking-[0.15em] px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
      Breaking
    </span>
  );
}

function MainHeroCard({ story }) {
  const { t } = useLanguage();
  return (
    <article className="relative group rounded-2xl overflow-hidden shadow-card min-h-[420px] lg:min-h-[520px] flex flex-col justify-end cursor-pointer">
      <img
        src={story.image}
        alt={t(story.headline)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="eager"
      />
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative z-10 p-6 lg:p-8 animate-fade-up">
        <div className="flex items-center gap-2 mb-3">
          {story.isBreaking && <BreakingBadge />}
          <span className="text-white/60 text-xs font-body flex items-center gap-1">
            <Clock size={11} />
            {t(story.timestamp)}
          </span>
        </div>
        <h1 className="font-heading font-800 text-white text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3 text-balance">
          {t(story.headline)}
        </h1>
        <p className="text-white/75 font-body text-sm lg:text-base leading-relaxed mb-4 line-clamp-2 hidden sm:block">
          {t(story.excerpt)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/55 text-xs font-body">
            <span className="flex items-center gap-1"><User size={11} />{story.author}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{story.readTime}</span>
          </div>
          <button className="flex items-center gap-1 text-supreme-pink text-sm font-heading font-700 hover:gap-2.5 transition-all duration-200">
            Read Full Story <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function SideCard({ story }) {
  const { t } = useLanguage();
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden shadow-card bg-white dark:bg-supreme-deep card-lift cursor-pointer flex-1">
      <div className="img-zoom aspect-video w-full overflow-hidden">
        <img src={story.image} alt={t(story.headline)} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <span className={`cat-pill font-heading ${story.categoryColor}`}>{t(story.category)}</span>
          <span className="text-supreme-mid text-xs font-body flex items-center gap-1">
            <Clock size={11} />{t(story.timestamp)}
          </span>
        </div>
        <h2 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-base leading-snug text-balance group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors duration-200">
          {t(story.headline)}
        </h2>
        <button className="mt-auto self-start flex items-center gap-1 text-supreme-vivid dark:text-supreme-bright text-xs font-heading font-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:gap-2">
          Read more <ArrowRight size={12} />
        </button>
      </div>
    </article>
  );
}

export default function HeroGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full bg-supreme-vivid" />
        <span className="text-xs font-heading font-700 uppercase tracking-widest text-supreme-vivid dark:text-supreme-bright">
          Top Stories
        </span>
        <div className="flex-1 h-px bg-supreme-mid/20" />
        <a href="#" className="text-xs font-body text-supreme-mid hover:text-supreme-vivid transition-colors flex items-center gap-1">
          All news <ArrowRight size={12} />
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '0ms' }}>
          <MainHeroCard story={heroStory} />
        </div>
        <div className="flex flex-col gap-5">
          {sideStories.map((story, i) => (
            <div key={story.id} className="animate-fade-up flex-1" style={{ animationDelay: `${(i + 1) * 80}ms` }}>
              <SideCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
