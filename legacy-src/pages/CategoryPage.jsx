import { useParams } from 'react-router-dom';
import {
  Clock, User, ArrowRight, ExternalLink,
  Eye, ThumbsUp, Heart, Share2, MessageCircle, Users, Play, TrendingUp,
} from 'lucide-react';
import { useMeta } from '../hooks/useMeta';
import { PLATFORM_CONTENT, PLATFORM_META } from '../data/platformData';
import { SECTION_VIDEOS } from '../data/videoData';

// ─── Article data ─────────────────────────────────────────────────────────────
const ARTICLES = {
  sports: [
    { id: 1, title: 'Nissanka Century Seals T20 Series — Sri Lanka Win 2-1 Against India', excerpt: 'Pathum Nissanka\'s brilliant 112* off 68 balls powered Sri Lanka to a clinical 8-wicket victory in the final T20 in Colombo.', time: '1 hr ago', read: '4 min', author: 'Dilshan Perera', img: '/images/cricket.jpeg', tag: 'Cricket' },
    { id: 2, title: 'IPL 2025: RCB vs MI Super Over Thriller Leaves Fans Stunned', excerpt: 'An extraordinary Super Over drama at Wankhede ended with RCB clinching victory off the final ball in front of 50,000 fans.', time: '3 hrs ago', read: '3 min', author: 'Kasun Silva', img: '/images/cricket.jpeg', tag: 'IPL' },
    { id: 3, title: 'National Kabaddi Championship Final: Colombo Giants Beat Kandy Warriors', excerpt: 'In a tense finale, Colombo Giants defended their title with a 38-32 victory over Kandy Warriors at Sugathadasa Indoor Stadium.', time: '5 hrs ago', read: '3 min', author: 'Nimal Fernando', img: '/images/cricket.jpeg', tag: 'Kabaddi' },
    { id: 4, title: 'Mahela Jayawardena Named Head Coach of Sri Lanka Under-19 Team', excerpt: 'The legendary batsman will mentor the next generation of Sri Lankan cricketers in a new national role announced today by SLC.', time: '8 hrs ago', read: '2 min', author: 'Priya Bandara', img: '/images/cricket.jpeg', tag: 'Cricket' },
    { id: 5, title: 'Rugby 7s: Sri Lanka Qualify for Asia Championship Quarter-Finals', excerpt: '', time: '10 hrs ago', read: '2 min', author: 'Rohan Cooray', img: '/images/cricket.jpeg', tag: 'Rugby' },
    { id: 6, title: 'Colombo Marathon 2026 Registration Now Open — Record 18,000 Entries Expected', excerpt: '', time: '12 hrs ago', read: '2 min', author: 'Amaya Dissanayake', img: '/images/cricket.jpeg', tag: 'Athletics' },
  ],
  politics: [
    { id: 1, title: 'President Calls Emergency Parliamentary Session Over IMF Recovery Blueprint', excerpt: 'Finance Minister expected to present a Rs. 480 billion infrastructure package during the emergency sitting tonight.', time: '14 min ago', read: '4 min', author: 'Kasun Perera', img: '/images/janahada.jpeg', tag: 'Parliament' },
    { id: 2, title: 'Budget 2026 Final Reading Scheduled Thursday — Full Vote Expected by Evening', excerpt: 'Government confirms the third and final reading of the Appropriation Bill will proceed despite opposition calls for delay.', time: '2 hrs ago', read: '5 min', author: 'Samanthi Wijeratne', img: '/images/news-cover.jpeg', tag: 'Budget' },
    { id: 3, title: 'Provincial Council Elections Confirmed for September — EC Issues Official Gazette', excerpt: 'The Elections Commission has officially gazetted September 14 as the date for all nine provincial council elections.', time: '4 hrs ago', read: '3 min', author: 'Nuwan Dias', img: '/images/janahada.jpeg', tag: 'Elections' },
    { id: 4, title: 'Opposition Tables No-Confidence Motion Over Power Crisis Handling', excerpt: '', time: '6 hrs ago', read: '4 min', author: 'Kamala Seneviratne', img: '/images/news-cover.jpeg', tag: 'Parliament' },
    { id: 5, title: 'Cabinet Reshuffle: Three Ministers Reassigned as Coalition Agreement Takes Effect', excerpt: '', time: '9 hrs ago', read: '3 min', author: 'Roshan Gunasekara', img: '/images/janahada.jpeg', tag: 'Cabinet' },
    { id: 6, title: 'Local Government Amendments Bill Passes Second Reading with 118 Votes', excerpt: '', time: '1 day ago', read: '5 min', author: 'Pradeep Weeraratne', img: '/images/news-cover.jpeg', tag: 'Legislation' },
  ],
  entertainment: [
    { id: 1, title: 'Sanda Eliya Season 3 Confirmed — Fan-Favourite Cast Returns This August on Supreme TV', excerpt: 'The network confirms all six original leads return for the third season, with two surprise additions to the ensemble cast.', time: '2 hrs ago', read: '3 min', author: 'Nimali Abeysekara', img: '/images/samanmaliya.jpeg', tag: 'Teledramas' },
    { id: 2, title: 'Derana Film Awards 2026: Mahesh Anil Takes Best Director for "Neth Kantha"', excerpt: 'Debut director Mahesh Anil swept three awards at last night\'s ceremony, with "Neth Kantha" named best film of the year.', time: '5 hrs ago', read: '4 min', author: 'Dulani Rathnayake', img: '/images/yowun-wasanthaye.jpeg', tag: 'Film' },
    { id: 3, title: 'Colombo Fashion Week 2026 Opens with Tribute to Sri Lankan Batik Tradition', excerpt: 'Twenty-two designers showcased collections at CGR Headquarters, headlined by a Batik fusion show that drew standing ovations.', time: '7 hrs ago', read: '3 min', author: 'Sachini Fernando', img: '/images/ithin-ithin-kohomada.jpeg', tag: 'Fashion' },
    { id: 4, title: 'Sinhala Pop Artist Yohani Announces World Tour Dates — Colombo Finale in December', excerpt: '', time: '10 hrs ago', read: '2 min', author: 'Dilki Perera', img: '/images/samanmaliya.jpeg', tag: 'Music' },
    { id: 5, title: 'Box Office: Tamil Film "Viduthalai 2" Breaks Opening Weekend Records in Sri Lanka', excerpt: '', time: '12 hrs ago', read: '2 min', author: 'Ravi Chandran', img: '/images/yowun-wasanthaye.jpeg', tag: 'Film' },
    { id: 6, title: 'Supreme TV\'s "Ithin Ithin Kohomada" Passes 200 Episode Milestone', excerpt: '', time: '1 day ago', read: '2 min', author: 'Amali Cooray', img: '/images/ithin-ithin-kohomada.jpeg', tag: 'TV' },
  ],
  business: [
    { id: 1, title: 'Colombo Stock Exchange Hits 3-Year High — ASPI Crosses 14,000 Mark', excerpt: 'Investor confidence soared on the back of positive IMF signals, with telecom and banking stocks leading the rally.', time: '3 hrs ago', read: '4 min', author: 'Manuka Senanayake', img: '/images/global-pulse.jpeg', tag: 'Markets' },
    { id: 2, title: 'Dialog Axiata Rolls Out 5G Coverage to Kandy and Galle — Jaffna by Q3', excerpt: 'Sri Lanka\'s largest telco expands its 5G footprint to three more cities as competition with Mobitel intensifies.', time: '5 hrs ago', read: '3 min', author: 'Sujeewa Perera', img: '/images/news-cover.jpeg', tag: 'Technology' },
    { id: 3, title: 'Central Bank Signals Further Interest Rate Cuts — Announces 25bps Reduction', excerpt: 'The Monetary Board cut the Standing Deposit Facility Rate to 8.25%, citing declining inflation and improving reserves.', time: '8 hrs ago', read: '4 min', author: 'Kasun Jayawardena', img: '/images/global-pulse.jpeg', tag: 'Banking' },
    { id: 4, title: 'Port of Colombo Records $2.8 Billion in Cargo Value for Q1 2026 — Best Ever Quarter', excerpt: '', time: '1 day ago', read: '3 min', author: 'Priya Amaratunga', img: '/images/news-cover.jpeg', tag: 'Trade' },
    { id: 5, title: 'Tourism Revenue Surpasses Pre-Pandemic Levels for First Time Since 2018', excerpt: '', time: '1 day ago', read: '3 min', author: 'Nadeeka Silva', img: '/images/global-pulse.jpeg', tag: 'Tourism' },
    { id: 6, title: 'Local EV Startup "VoltLK" Secures $12M Series A From Singapore Venture Fund', excerpt: '', time: '2 days ago', read: '2 min', author: 'Chamara Wickramasinghe', img: '/images/news-cover.jpeg', tag: 'Startups' },
  ],
  world: [
    { id: 1, title: 'G7 Summit Concludes with Landmark AI Regulation Framework — 47 Nations Sign On', excerpt: 'World leaders agreed on binding guidelines for AI development and deployment, with compliance deadlines set for 2028.', time: '4 hrs ago', read: '5 min', author: 'Foreign Desk', img: '/images/global-pulse.jpeg', tag: 'Tech Policy' },
    { id: 2, title: 'India-Pakistan Peace Talks Resume in Dubai After 4-Year Hiatus', excerpt: 'Senior diplomats from both nations convened for preliminary talks mediated by UAE foreign ministry officials.', time: '6 hrs ago', read: '4 min', author: 'Foreign Desk', img: '/images/news-cover.jpeg', tag: 'Diplomacy' },
    { id: 3, title: 'Global Oil Prices Fall to 18-Month Low as OPEC+ Increases Production Quota', excerpt: 'Brent crude dipped below $74/barrel after OPEC+ members agreed to raise combined output by 1.2 million barrels per day.', time: '8 hrs ago', read: '3 min', author: 'Foreign Desk', img: '/images/global-pulse.jpeg', tag: 'Economy' },
    { id: 4, title: 'WHO Declares End to Mpox Health Emergency as Cases Fall 94% Globally', excerpt: '', time: '10 hrs ago', read: '3 min', author: 'Foreign Desk', img: '/images/news-cover.jpeg', tag: 'Health' },
    { id: 5, title: 'Elon Musk\'s Starship Completes First Commercial Payload Mission to Lunar Orbit', excerpt: '', time: '12 hrs ago', read: '4 min', author: 'Foreign Desk', img: '/images/global-pulse.jpeg', tag: 'Space' },
    { id: 6, title: 'EU Parliament Passes Sweeping Digital Services Reform — Big Tech Faces New Obligations', excerpt: '', time: '1 day ago', read: '4 min', author: 'Foreign Desk', img: '/images/news-cover.jpeg', tag: 'Tech Policy' },
  ],
  news: [
    { id: 1, title: 'President Calls Emergency Parliamentary Session as Cabinet Unveils Economic Blueprint', excerpt: 'President Dissanayake has convened an emergency sitting of Parliament following breakthrough negotiations with IMF delegates.', time: '14 min ago', read: '4 min', author: 'Kasun Perera', img: '/images/news-cover.jpeg', tag: 'Breaking' },
    { id: 2, title: 'Heavy Rains Forecast for Southern Province and Sabaragamuwa This Weekend', excerpt: 'The Department of Meteorology issued an amber warning for six districts, advising residents to avoid low-lying areas.', time: '1 hr ago', read: '2 min', author: 'Weather Desk', img: '/images/news-cover.jpeg', tag: 'Weather' },
    { id: 3, title: 'Ministry Launches Free Cancer Screening Camps Across 25 Districts Starting Monday', excerpt: 'The Health Ministry will deploy 84 mobile screening units to provide free early detection services island-wide.', time: '3 hrs ago', read: '3 min', author: 'Health Desk', img: '/images/news-cover.jpeg', tag: 'Health' },
    { id: 4, title: 'Sinharaja Buffer Zone Declared Protected — New Regulations in Force Today', excerpt: '', time: '5 hrs ago', read: '3 min', author: 'Rohan Jayasuriya', img: '/images/news-cover.jpeg', tag: 'Environment' },
    { id: 5, title: 'Police Crack Down on Fuel Adulteration Racket — 14 Arrested in Colombo Operation', excerpt: '', time: '7 hrs ago', read: '2 min', author: 'Crime Desk', img: '/images/janahada.jpeg', tag: 'Crime' },
    { id: 6, title: 'University Admissions 2026 Results Released — Engineering and Medicine Most Competitive', excerpt: '', time: '9 hrs ago', read: '3 min', author: 'Education Desk', img: '/images/news-cover.jpeg', tag: 'Education' },
  ],
  lifestyle: [
    { id: 1, title: 'Colombo\'s Best New Restaurants of 2026 — Our Food Critics\' Annual List', excerpt: 'From Jaffna-inspired fusion at Pettah\'s newest hotspot to a rooftop omakase in Colombo 7, here are 12 must-visit openings.', time: '2 hrs ago', read: '5 min', author: 'Dilini Perera', img: '/images/every-morning.jpeg', tag: 'Food' },
    { id: 2, title: 'Wellness Retreats: Five Ayurvedic Resorts in Sri Lanka Worth Every Rupee', excerpt: 'From coastal retreats in Unawatuna to hill-country sanctuaries in Kandy, we reviewed the island\'s top healing escapes.', time: '4 hrs ago', read: '6 min', author: 'Sachini Herath', img: '/images/every-morning.jpeg', tag: 'Wellness' },
    { id: 3, title: 'Gardening Revolution: Sri Lankan Urban Rooftop Farms Are Changing Colombo\'s Food Scene', excerpt: 'A growing movement of city residents are transforming rooftops into productive vegetable gardens.', time: '6 hrs ago', read: '4 min', author: 'Ayasha Fernando', img: '/images/every-morning.jpeg', tag: 'Home & Garden' },
    { id: 4, title: 'Gen Z Style: How Sri Lankan Youth Are Reinventing Traditional Kandyan Fashion', excerpt: '', time: '8 hrs ago', read: '4 min', author: 'Malsha Wickrama', img: '/images/samanmaliya.jpeg', tag: 'Fashion' },
    { id: 5, title: 'Mental Health Matters: Free Counselling Services Now Available Across 120 Schools', excerpt: '', time: '10 hrs ago', read: '3 min', author: 'Nirosha Jayasena', img: '/images/every-morning.jpeg', tag: 'Health' },
    { id: 6, title: 'Road Trip Essentials: The Ultimate Guide to Driving Sri Lanka\'s Coastal Highway', excerpt: '', time: '1 day ago', read: '7 min', author: 'Dilan Gunathilake', img: '/images/every-morning.jpeg', tag: 'Travel' },
  ],
};

const TAG_COLORS = {
  Breaking:      'bg-supreme-vivid text-white',
  Cricket:       'bg-emerald-600 text-white',
  IPL:           'bg-blue-600 text-white',
  Parliament:    'bg-violet-700 text-white',
  Budget:        'bg-amber-600 text-white',
  Elections:     'bg-red-600 text-white',
  Cabinet:       'bg-violet-500 text-white',
  Legislation:   'bg-slate-600 text-white',
  Teledramas:    'bg-supreme-primary text-white',
  Film:          'bg-rose-600 text-white',
  Music:         'bg-pink-500 text-white',
  Fashion:       'bg-fuchsia-600 text-white',
  TV:            'bg-indigo-500 text-white',
  Markets:       'bg-green-600 text-white',
  Technology:    'bg-indigo-600 text-white',
  Banking:       'bg-blue-700 text-white',
  Trade:         'bg-teal-600 text-white',
  Tourism:       'bg-sky-500 text-white',
  Startups:      'bg-orange-500 text-white',
  'Tech Policy': 'bg-slate-600 text-white',
  Diplomacy:     'bg-teal-600 text-white',
  Economy:       'bg-yellow-600 text-white',
  Health:        'bg-red-500 text-white',
  Space:         'bg-purple-700 text-white',
  Weather:       'bg-sky-600 text-white',
  Environment:   'bg-green-700 text-white',
  Crime:         'bg-gray-700 text-white',
  Education:     'bg-blue-500 text-white',
  Kabaddi:       'bg-orange-600 text-white',
  Athletics:     'bg-lime-600 text-white',
  Rugby:         'bg-red-700 text-white',
  Food:          'bg-orange-500 text-white',
  Wellness:      'bg-teal-500 text-white',
  'Home & Garden':'bg-green-500 text-white',
  Travel:        'bg-sky-600 text-white',
};

// ─── Platform SVG icon ────────────────────────────────────────────────────────
function PIcon({ platform, size = 8 }) {
  const meta = PLATFORM_META[platform];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d={meta.path} />
    </svg>
  );
}

// ─── Left column: vertical thumbnail card ─────────────────────────────────────
function LeftCard({ article }) {
  const tagClass = TAG_COLORS[article.tag] ?? 'bg-supreme-primary text-white';
  return (
    <article className="group cursor-pointer">
      <div className="overflow-hidden rounded-xl mb-2.5">
        <img
          src={article.img}
          alt={article.title}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`cat-pill font-heading text-[10px] ${tagClass}`}>{article.tag}</span>
        <span className="text-supreme-mid text-[11px] font-body flex items-center gap-1">
          <Clock size={10} /> {article.time}
        </span>
      </div>
      <h3 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-sm leading-snug group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors">
        {article.title}
      </h3>
      <p className="text-supreme-mid text-[11px] font-body mt-1 flex items-center gap-1">
        <User size={9} /> {article.author} · {article.read}
      </p>
    </article>
  );
}

// ─── Center: large featured article ──────────────────────────────────────────
function FeaturedCenter({ article }) {
  const tagClass = TAG_COLORS[article.tag] ?? 'bg-supreme-primary text-white';
  const isBreaking = article.tag === 'Breaking';
  return (
    <article className="group cursor-pointer">
      <div className="overflow-hidden rounded-2xl mb-4">
        <img
          src={article.img}
          alt={article.title}
          className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-2 mb-2.5">
        <span className={`cat-pill font-heading text-[10px] ${tagClass}`}>{article.tag}</span>
        {isBreaking && (
          <span className="flex items-center gap-1 text-red-500 text-[10px] font-heading font-700 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-live-pulse" /> Live Updates
          </span>
        )}
        <span className="ml-auto text-supreme-mid text-xs font-body flex items-center gap-1">
          <Clock size={10} /> {article.time}
        </span>
      </div>
      <h2 className="font-heading font-800 text-supreme-dark dark:text-supreme-light text-2xl lg:text-3xl leading-tight mb-3 text-balance">
        {article.title}
      </h2>
      {article.excerpt && (
        <p className="font-body text-supreme-mid text-sm leading-relaxed mb-3">
          {article.excerpt}
        </p>
      )}
      <div className="flex items-center justify-between text-xs font-body text-supreme-mid border-t border-supreme-mid/10 pt-3">
        <span className="flex items-center gap-1.5">
          <User size={10} /> {article.author} · {article.read}
        </span>
        <button className="flex items-center gap-1 text-supreme-vivid dark:text-supreme-bright font-heading font-700 hover:gap-2 transition-all">
          Read more <ArrowRight size={11} />
        </button>
      </div>
    </article>
  );
}

// ─── Center: headline link row ────────────────────────────────────────────────
function HeadlineLink({ article }) {
  const tagClass = TAG_COLORS[article.tag] ?? 'bg-supreme-primary text-white';
  return (
    <a
      href="#"
      className="group flex items-start gap-3 py-3 hover:bg-supreme-light dark:hover:bg-supreme-primary/10 rounded-lg px-2 -mx-2 transition-colors"
    >
      <span className={`cat-pill font-heading text-[10px] flex-shrink-0 mt-0.5 ${tagClass}`}>
        {article.tag}
      </span>
      <span className="font-body text-sm text-supreme-dark dark:text-supreme-light group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors leading-snug">
        {article.title}
      </span>
    </a>
  );
}

// ─── Right sidebar: compact YouTube card ─────────────────────────────────────
function YTSideCard({ data }) {
  const isLive = data.duration === 'LIVE';
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-2">
        <img
          src={data.thumb}
          alt={data.title}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg">
            <Play size={14} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-1.5 right-1.5">
          {isLive ? (
            <span className="flex items-center gap-1 bg-[#FF0000] text-white text-[9px] font-heading font-800 uppercase px-1.5 py-0.5 rounded-full">
              <span className="w-1 h-1 rounded-full bg-white animate-live-pulse" /> Live
            </span>
          ) : (
            <span className="bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded font-body">
              {data.duration}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="inline-flex items-center gap-1 text-[10px] font-heading font-800 uppercase px-2 py-0.5 rounded-full bg-[#FF0000] text-white">
          <PIcon platform="youtube" /> YouTube
        </span>
        <span className="text-[10px] text-supreme-mid font-body">{data.postedAt}</span>
      </div>
      <h4 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-xs leading-snug line-clamp-2 group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors">
        {data.title}
      </h4>
      <p className="text-[10px] font-body text-supreme-mid mt-1 flex items-center gap-2">
        <span className="flex items-center gap-0.5"><Eye size={9} /> {data.views}</span>
        <span className="flex items-center gap-0.5"><ThumbsUp size={9} /> {data.likes}</span>
      </p>
    </div>
  );
}

// ─── Right sidebar: compact Facebook card ─────────────────────────────────────
function FBSideCard({ data }) {
  const total = data.reactions.like + data.reactions.love + data.reactions.wow;
  return (
    <div className="group cursor-pointer">
      {data.thumb && (
        <div className="overflow-hidden rounded-xl mb-2">
          <img
            src={data.thumb}
            alt="Facebook"
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="inline-flex items-center gap-1 text-[10px] font-heading font-800 uppercase px-2 py-0.5 rounded-full bg-[#1877F2] text-white">
          <PIcon platform="facebook" /> Facebook
        </span>
        <span className="text-[10px] text-supreme-mid font-body">{data.postedAt}</span>
      </div>
      <p className="font-body text-xs text-supreme-dark dark:text-supreme-light/80 leading-snug line-clamp-2">
        {data.caption}
      </p>
      <p className="text-[10px] font-body text-supreme-mid mt-1 flex items-center gap-2">
        <span>👍❤️😲 {total.toLocaleString()}</span>
        <span className="flex items-center gap-0.5"><MessageCircle size={9} /> {data.comments.toLocaleString()}</span>
        <span className="flex items-center gap-0.5"><Share2 size={9} /> {data.shares.toLocaleString()}</span>
      </p>
    </div>
  );
}

// ─── Right sidebar: compact TikTok card (vertical 9:16 portrait) ──────────────
function TTSideCard({ data }) {
  return (
    <div className="group cursor-pointer">
      {/* True portrait reel frame */}
      <div className="relative overflow-hidden rounded-xl mb-2" style={{ aspectRatio: '9/16' }}>
        <img
          src={data.thumb}
          alt="TikTok"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Play size={16} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
        {/* Stats pinned to right side like real TikTok */}
        <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center text-white">
            <Heart size={18} fill="white" />
            <span className="text-[9px] font-body">{data.likes}</span>
          </div>
          <div className="flex flex-col items-center text-white">
            <Share2 size={18} />
            <span className="text-[9px] font-body">{data.shares}</span>
          </div>
          <div className="flex flex-col items-center text-white">
            <Eye size={18} />
            <span className="text-[9px] font-body">{data.views}</span>
          </div>
        </div>
        <p className="absolute bottom-3 left-3 right-12 text-white text-[10px] font-body leading-snug line-clamp-2">
          {data.caption}
        </p>
      </div>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="inline-flex items-center gap-1 text-[10px] font-heading font-800 uppercase px-2 py-0.5 rounded-full bg-black text-white">
          <PIcon platform="tiktok" /> TikTok
        </span>
        <span className="text-[10px] text-supreme-mid font-body">{data.postedAt}</span>
      </div>
      <a href={data.url} className="text-[10px] font-heading font-700 text-supreme-dark dark:text-white hover:underline flex items-center gap-0.5">
        Watch on TikTok <ExternalLink size={9} />
      </a>
    </div>
  );
}

// ─── Right sidebar: compact WhatsApp card ─────────────────────────────────────
function WASideCard({ data }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#25D366]/30 bg-white dark:bg-supreme-deep">
      <div className="bg-[#25D366] px-3 py-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <PIcon platform="whatsapp" size={12} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white text-[11px] font-heading font-700 leading-tight truncate">{data.channelName}</p>
          <p className="text-white/70 text-[9px] font-body flex items-center gap-0.5">
            <Users size={7} /> {data.members} members
          </p>
        </div>
        <span className="text-white/60 text-[9px] font-body flex-shrink-0">{data.postedAt}</span>
      </div>
      <div className="p-2 flex flex-col gap-1.5">
        {data.highlights.slice(0, 3).map((item, i) => (
          <div key={i} className="flex items-start gap-2 bg-supreme-light dark:bg-supreme-dark/40 rounded-lg px-2.5 py-1.5">
            <p className="text-[10px] font-body text-supreme-dark dark:text-supreme-light leading-snug flex-1">{item.text}</p>
            <span className="text-[9px] font-body text-supreme-mid whitespace-nowrap">{item.reactions}</span>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-[#25D366]/20">
        <a
          href={data.url}
          className="w-full flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-[10px] font-heading font-700 py-1.5 rounded-lg transition-colors"
        >
          <PIcon platform="whatsapp" size={9} />
          Join Channel <ExternalLink size={9} />
        </a>
      </div>
    </div>
  );
}

// ─── Right sidebar wrapper ─────────────────────────────────────────────────────
function SocialSidebar({ categoryKey }) {
  const content = PLATFORM_CONTENT[categoryKey] ?? PLATFORM_CONTENT.sports;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 rounded-full bg-supreme-vivid" />
        <span className="text-[10px] font-heading font-800 uppercase tracking-widest text-supreme-mid">On Social</span>
        <div className="flex-1 h-px bg-supreme-mid/15" />
      </div>

      <YTSideCard data={content.youtube} />
      <div className="h-px bg-supreme-mid/10" />
      <FBSideCard data={content.facebook} />
      <div className="h-px bg-supreme-mid/10" />
      <TTSideCard data={content.tiktok} />
      <div className="h-px bg-supreme-mid/10" />
      <WASideCard data={content.whatsapp} />
    </div>
  );
}

// ─── Bottom: horizontal video card (16:9) ────────────────────────────────────
function VideoCard({ video }) {
  const isLive = video.duration === 'LIVE';
  return (
    <div className="group cursor-pointer flex-shrink-0 w-60">
      <div className="relative overflow-hidden rounded-xl mb-2">
        <img
          src={video.thumb}
          alt={video.title}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
            <Play size={16} fill="#2A0E2B" className="ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          {isLive ? (
            <span className="flex items-center gap-1 bg-red-600 text-white text-[9px] font-heading font-800 uppercase px-2 py-0.5 rounded-full">
              <span className="w-1 h-1 rounded-full bg-white animate-live-pulse" /> LIVE
            </span>
          ) : (
            <span className="bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded font-body">{video.duration}</span>
          )}
        </div>
      </div>
      <h4 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-xs leading-snug line-clamp-2 group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors mb-1">
        {video.title}
      </h4>
      <p className="text-[10px] font-body text-supreme-mid">
        {video.channel} · {video.views}{!isLive ? ' views' : ''} · {video.postedAt}
      </p>
    </div>
  );
}

// ─── Bottom: vertical reel card (9:16) ───────────────────────────────────────
function ReelCard({ video }) {
  return (
    <div className="group cursor-pointer flex-shrink-0 w-36">
      <div className="relative overflow-hidden rounded-xl mb-2" style={{ aspectRatio: '9/16' }}>
        <img
          src={video.thumb}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Play size={16} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
        <span className="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-body">
          {video.duration}
        </span>
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 text-white text-[9px] font-body">
          <Eye size={9} /> {video.views}
        </div>
      </div>
      <h4 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-[11px] leading-snug line-clamp-2 group-hover:text-supreme-vivid dark:group-hover:text-supreme-bright transition-colors">
        {video.title}
      </h4>
    </div>
  );
}

// ─── Bottom: scrollable video/reel row ───────────────────────────────────────
function VideoRow({ section }) {
  const isReel = section.type === 'reel';
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-5 rounded-full bg-supreme-vivid" />
        <h2 className="font-heading font-800 text-supreme-dark dark:text-supreme-light text-lg">{section.title}</h2>
        {isReel && (
          <span className="text-[10px] font-heading font-700 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-pink-500 text-white">
            Reels
          </span>
        )}
        <div className="flex-1 h-px bg-supreme-mid/15" />
        <a href="#" className="flex-shrink-0 text-xs font-heading font-700 text-supreme-vivid dark:text-supreme-bright hover:underline flex items-center gap-1">
          View all <ArrowRight size={11} />
        </a>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {section.videos.map(video =>
          isReel
            ? <ReelCard key={video.id} video={video} />
            : <VideoCard key={video.id} video={video} />
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CategoryPage() {
  const { category } = useParams();
  const key = category?.toLowerCase() ?? 'news';
  const articles = ARTICLES[key] ?? ARTICLES.news;
  useMeta(key);

  const label = key.charAt(0).toUpperCase() + key.slice(1);
  const [featured, ...rest] = articles;
  const socialKey = ['sports', 'politics', 'entertainment', 'business'].includes(key) ? key : 'sports';
  const videoSections = SECTION_VIDEOS[key] ?? [];

  return (
    <div className="min-h-screen">

      {/* Section hero bar */}
      <div className="bg-supreme-dark py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-4 rounded-full bg-supreme-vivid" />
              <span className="text-supreme-mid text-[10px] font-heading font-700 uppercase tracking-widest">Section</span>
            </div>
            <h1 className="font-heading font-800 text-white text-3xl">{label}</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-supreme-mid text-xs font-body">
            <TrendingUp size={13} />
            {articles.length} stories today
          </div>
        </div>
      </div>

      {/* 3-column grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT — side articles */}
          <aside className="col-span-12 lg:col-span-3 order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex-1 h-px bg-supreme-mid/15" />
              <span className="text-[10px] font-heading font-700 uppercase tracking-widest text-supreme-mid whitespace-nowrap">
                More Stories
              </span>
              <div className="flex-1 h-px bg-supreme-mid/15" />
            </div>
            <div className="flex flex-col gap-6">
              {rest.slice(0, 3).map(article => (
                <LeftCard key={article.id} article={article} />
              ))}
            </div>
          </aside>

          {/* CENTER — featured + headline links */}
          <main className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <FeaturedCenter article={featured} />
            {rest.slice(3).length > 0 && (
              <div className="mt-5 border-t border-supreme-mid/10">
                <p className="text-[10px] font-heading font-700 uppercase tracking-widest text-supreme-mid pt-3 mb-1">
                  More in {label}
                </p>
                <div className="divide-y divide-supreme-mid/10">
                  {rest.slice(3).map(article => (
                    <HeadlineLink key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* RIGHT — social media sidebar */}
          <aside className="col-span-12 lg:col-span-3 order-3">
            <div className="lg:sticky lg:top-20">
              <SocialSidebar categoryKey={socialKey} />
            </div>
          </aside>

        </div>
      </div>

      {/* Bottom video & reel sections */}
      {videoSections.length > 0 && (
        <div className="border-t border-supreme-mid/10 mt-4 pt-10 pb-12 bg-white dark:bg-supreme-deep">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
            {videoSections.map(section => (
              <VideoRow key={section.id} section={section} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
