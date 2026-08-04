import { useEffect } from 'react';

const CATEGORY_META = {
  home: {
    title: 'Supreme TV | ඔබ සතුටින් — Sri Lanka\'s Premier News & Entertainment',
    description: 'Breaking news, live TV, sports, entertainment and more from Supreme TV — Sri Lanka\'s premier broadcast network.',
    image: '/images/news-cover.jpeg',
  },
  news: {
    title: 'News | Supreme TV — Sri Lanka\'s Latest Breaking News',
    description: 'Breaking news and top stories from Sri Lanka — politics, health, environment, and more from Supreme TV.',
    image: '/images/news-cover.jpeg',
  },
  politics: {
    title: 'Politics | Supreme TV — Sri Lanka Parliament & Government News',
    description: 'Sri Lanka politics — Parliament sessions, elections, cabinet updates, and government news from Supreme TV.',
    image: '/images/janahada.jpeg',
  },
  sports: {
    title: 'Sports | Supreme TV — Cricket, Rugby & More',
    description: 'Live cricket scores, match highlights, rugby, athletics and all sports news from Sri Lanka and beyond.',
    image: '/images/cricket.jpeg',
  },
  entertainment: {
    title: 'Entertainment | Supreme TV — Teledramas, Film & Music',
    description: 'Supreme TV teledramas, Sinhala films, music, Colombo Fashion Week, and all entertainment from Sri Lanka.',
    image: '/images/samanmaliya.jpeg',
  },
  business: {
    title: 'Business | Supreme TV — Colombo Stock Exchange & Economy',
    description: 'Colombo Stock Exchange updates, Central Bank news, trade, technology, and Sri Lanka business coverage.',
    image: '/images/global-pulse.jpeg',
  },
  world: {
    title: 'World News | Supreme TV — International Affairs',
    description: 'International news, diplomacy, global economy, and world affairs reported by Supreme TV Sri Lanka.',
    image: '/images/global-pulse.jpeg',
  },
  lifestyle: {
    title: 'Lifestyle | Supreme TV — Food, Travel, Wellness & Fashion',
    description: 'Best restaurants, Ayurvedic retreats, fashion trends, travel guides and lifestyle stories from Supreme TV.',
    image: '/images/every-morning.jpeg',
  },
};

function setMeta(selector, attr, content) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [key, val] = attr;
    el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useMeta(categoryKey = 'home') {
  useEffect(() => {
    const meta = CATEGORY_META[categoryKey] ?? CATEGORY_META.home;
    const url = window.location.href;

    document.title = meta.title;

    setMeta('meta[name="description"]',          ['name', 'description'],        meta.description);

    setMeta('meta[property="og:title"]',         ['property', 'og:title'],       meta.title);
    setMeta('meta[property="og:description"]',   ['property', 'og:description'], meta.description);
    setMeta('meta[property="og:image"]',         ['property', 'og:image'],       meta.image);
    setMeta('meta[property="og:url"]',           ['property', 'og:url'],         url);
    setMeta('meta[property="og:type"]',          ['property', 'og:type'],        'website');
    setMeta('meta[property="og:site_name"]',     ['property', 'og:site_name'],   'Supreme TV');

    setMeta('meta[name="twitter:card"]',         ['name', 'twitter:card'],       'summary_large_image');
    setMeta('meta[name="twitter:title"]',        ['name', 'twitter:title'],      meta.title);
    setMeta('meta[name="twitter:description"]',  ['name', 'twitter:description'],meta.description);
    setMeta('meta[name="twitter:image"]',        ['name', 'twitter:image'],      meta.image);
    setMeta('meta[name="twitter:site"]',         ['name', 'twitter:site'],       '@SupremeTVLK');
  }, [categoryKey]);
}
