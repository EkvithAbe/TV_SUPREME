import { useState } from 'react';
import { Trophy, Flame, MessageCircle, Heart, Lock } from 'lucide-react';
import { useMember } from '../context/MemberContext';
import { quizData, pollData } from '../data/mockData';

// ─── Static data ──────────────────────────────────────────────────────────────

const GOSSIP = [
  { id: 1, category: 'Music', headline: 'Yohani Confirms World Tour — 14 Cities, Colombo Grand Finale in December', img: '/images/ithin-ithin-kohomada.jpeg', likes: '18.2K', comments: '2.3K', time: '2 hrs ago', hot: true },
  { id: 2, category: 'TV Drama', headline: 'Sanda Eliya Cast Spotted Together at Colombo 7 — Reunion Confirmed?', img: '/images/samanmaliya.jpeg', likes: '12.4K', comments: '1.8K', time: '4 hrs ago', hot: true },
  { id: 3, category: 'Viral', headline: 'Behind the Scenes: What Really Happened on Mal Mithuru Set Last Week', img: '/images/yowun-wasanthaye.jpeg', likes: '9.7K', comments: '3.2K', time: '6 hrs ago', hot: false },
  { id: 4, category: 'Film', headline: 'Top Sri Lankan Actress Signs International Deal — Identity Revealed Soon?', img: '/images/samanmaliya.jpeg', likes: '34.1K', comments: '8.9K', time: '8 hrs ago', hot: true },
  { id: 5, category: 'Gossip', headline: "Popular TV Host's Surprise Wedding Goes Viral — First Photos Surface", img: '/images/ithin-ithin-kohomada.jpeg', likes: '28.6K', comments: '5.4K', time: '12 hrs ago', hot: true },
  { id: 6, category: 'Fashion', headline: 'Colombo Fashion Week Drama: Designer Publicly Calls Out Copy Controversy', img: '/images/yowun-wasanthaye.jpeg', likes: '7.2K', comments: '1.1K', time: '1 day ago', hot: false },
  { id: 7, category: 'Entertainment', headline: 'Supreme TV Star Signs Rs.50M Brand Deal — Biggest in Sri Lanka History', img: '/images/samanmaliya.jpeg', likes: '22.8K', comments: '4.7K', time: '1 day ago', hot: true },
];

const SCRAMBLES = [
  { word: 'COLOMBO',  scrambled: 'BOLMOCO', hint: "Sri Lanka's commercial capital" },
  { word: 'SIGIRIYA', scrambled: 'IISGYRAA', hint: 'Ancient rock fortress' },
  { word: 'KANDY',    scrambled: 'DNAYK', hint: 'City of the Tooth Relic' },
  { word: 'GALLE',    scrambled: 'ELLAG', hint: 'Famous for its Dutch fort' },
  { word: 'JAFFNA',   scrambled: 'NFJFAA', hint: "Sri Lanka's northern city" },
  { word: 'MIRISSA',  scrambled: 'ISRAMI', hint: 'Whale-watching beach town' },
];

const ALERT_OPTIONS = [
  { key: 'breaking',      label: 'Breaking News',       sub: 'Urgent news as it happens',          emoji: '⚡' },
  { key: 'programs',      label: 'Program Reminders',   sub: '15 min before your favourite shows', emoji: '📺' },
  { key: 'sports',        label: 'Sports Scores',       sub: 'Live match updates & results',       emoji: '🏏' },
  { key: 'dramas',        label: 'Drama Updates',       sub: 'New episode alerts for your shows',  emoji: '🎭' },
  { key: 'entertainment', label: 'Entertainment',       sub: 'Gossip, events & celebrity news',    emoji: '🌟' },
  { key: 'morning',       label: 'Morning Digest',      sub: 'Daily news roundup at 7AM',          emoji: '☀️' },
];

const TABS = [
  { id: 'games',  emoji: '🎮', label: 'Games'  },
  { id: 'polls',  emoji: '📊', label: 'Polls'  },
  { id: 'gossip', emoji: '🌟', label: 'Gossip' },
  { id: 'alerts', emoji: '🔔', label: 'Alerts' },
];

// ─── Games Tab ────────────────────────────────────────────────────────────────

function GamesTab() {
  const { member, addPoints } = useMember();
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [scrambleIdx, setScrambleIdx] = useState(0);
  const [scrambleInput, setScrambleInput] = useState('');
  const [scrambleResult, setScrambleResult] = useState(null); // null | 'correct' | 'wrong'

  const current = SCRAMBLES[scrambleIdx];

  const handleQuizAnswer = (i) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(i);
    if (i === quizData.correctIndex) addPoints(5);
  };

  const checkScramble = () => {
    const correct = scrambleInput.trim().toUpperCase() === current.word;
    setScrambleResult(correct ? 'correct' : 'wrong');
    if (correct) addPoints(10);
  };

  const nextScramble = () => {
    setScrambleIdx(i => (i + 1) % SCRAMBLES.length);
    setScrambleInput('');
    setScrambleResult(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Daily Quiz */}
      <div className="bg-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-heading font-800 uppercase tracking-widest text-pink-400">Daily Quiz</span>
          {member && <span className="text-[10px] font-body text-white/35">+5 pts correct</span>}
        </div>
        <p className="font-heading font-700 text-white text-sm leading-snug mb-4">{quizData.question}</p>
        <div className="grid grid-cols-2 gap-2">
          {quizData.options.map((opt, i) => {
            let cls = 'bg-white/10 text-white hover:bg-white/20';
            if (quizAnswer !== null) {
              if (i === quizData.correctIndex) cls = 'bg-green-500 text-white';
              else if (quizAnswer === i) cls = 'bg-red-500/80 text-white';
              else cls = 'bg-white/5 text-white/30';
            }
            return (
              <button
                key={i}
                onClick={() => handleQuizAnswer(i)}
                className={`px-3 py-2.5 rounded-xl text-xs font-heading font-700 text-left transition-all ${cls}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {quizAnswer !== null && (
          <div className={`mt-3 p-3 rounded-xl text-xs font-body leading-snug ${
            quizAnswer === quizData.correctIndex ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {quizAnswer === quizData.correctIndex ? '✓ Correct! ' : '✗ Not quite. '}
            {quizData.explanation}
          </div>
        )}
        {!member && (
          <p className="mt-3 text-white/30 text-[10px] font-body">Join free to earn points for correct answers</p>
        )}
      </div>

      {/* Word Scramble */}
      <div className="bg-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-heading font-800 uppercase tracking-widest text-pink-400">Word Scramble</span>
          {member && <span className="text-[10px] font-body text-white/35">+10 pts correct</span>}
        </div>
        <p className="text-white/50 text-[11px] font-body mb-3">Hint: {current.hint}</p>
        <div className="text-3xl font-heading font-800 text-white tracking-[0.3em] text-center py-5 bg-white/5 rounded-xl mb-4">
          {current.scrambled}
        </div>
        {scrambleResult === null ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={scrambleInput}
              onChange={(e) => setScrambleInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && scrambleInput && checkScramble()}
              placeholder="Type your answer…"
              className="flex-1 bg-white/10 text-white placeholder-white/30 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-supreme-vivid/50"
            />
            <button
              onClick={checkScramble}
              disabled={!scrambleInput}
              className="bg-supreme-vivid hover:bg-purple-500 disabled:opacity-40 text-white text-sm font-heading font-700 px-4 py-2.5 rounded-xl transition-colors"
            >
              Check
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className={`p-3 rounded-xl text-xs font-body ${
              scrambleResult === 'correct' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}>
              {scrambleResult === 'correct' ? `✓ Correct! It's ${current.word}!` : `✗ The answer was ${current.word}`}
            </div>
            <button onClick={nextScramble} className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-700 py-2.5 rounded-xl transition-colors">
              Next Word →
            </button>
          </div>
        )}
        {!member && (
          <p className="mt-3 text-white/30 text-[10px] font-body">Join free to earn points for correct answers</p>
        )}
      </div>
    </div>
  );
}

// ─── Polls Tab ────────────────────────────────────────────────────────────────

function PollsTab() {
  const { member, setShowModal } = useMember();

  const [hasVoted] = useState(() => {
    try { return localStorage.getItem('stv_poll_voted') !== null; }
    catch { return false; }
  });
  const [votedIndex, setVotedIndex] = useState(() => {
    try { return JSON.parse(localStorage.getItem('stv_poll_voted') ?? 'null'); }
    catch { return null; }
  });
  const [votes, setVotes] = useState(() => pollData.options.map(o => o.votes));

  const total = votes.reduce((a, b) => a + b, 0);

  const castVote = (i) => {
    if (votedIndex !== null) return;
    if (!member) { setShowModal(true); return; }
    const updated = votes.map((v, j) => j === i ? v + 1 : v);
    setVotes(updated);
    setVotedIndex(i);
    localStorage.setItem('stv_poll_voted', JSON.stringify(i));
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-heading font-800 uppercase tracking-widest text-pink-400">Community Poll</span>
          <span className="text-[10px] font-body text-white/40">{total.toLocaleString()} votes</span>
        </div>
        <p className="font-heading font-800 text-white text-base leading-snug mb-5">{pollData.question}</p>

        <div className="space-y-3">
          {pollData.options.map((opt, i) => {
            const pct = Math.round((votes[i] / total) * 100);
            const isMyVote = votedIndex === i;
            return (
              <button
                key={i}
                onClick={() => castVote(i)}
                disabled={votedIndex !== null}
                className={`w-full text-left rounded-xl overflow-hidden transition-all ${
                  votedIndex === null ? 'hover:scale-[1.01] cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="relative bg-white/10 px-4 py-3">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-xl transition-all duration-700 ${isMyVote ? 'bg-supreme-vivid' : 'bg-white/20'}`}
                    style={{ width: votedIndex !== null ? `${pct}%` : '0%' }}
                  />
                  <div className="relative flex items-center justify-between gap-2">
                    <span className="text-sm font-body text-white">{opt.label}</span>
                    {votedIndex !== null && (
                      <span className="text-sm font-heading font-700 text-white/80 shrink-0">{pct}%</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-center text-[11px] font-body">
          {votedIndex === null ? (
            member
              ? <span className="text-white/40">Tap an option to vote</span>
              : <button onClick={() => setShowModal(true)} className="text-pink-400 hover:text-pink-300 transition-colors">Join free to vote →</button>
          ) : (
            <span className="text-green-400">✓ Your vote was recorded — thanks!</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Gossip Tab ───────────────────────────────────────────────────────────────

function GossipTab() {
  return (
    <div>
      <p className="text-white/40 text-xs font-body mb-4">
        Sri Lanka's hottest entertainment stories — updated daily
      </p>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {GOSSIP.map(item => (
          <div key={item.id} className="group cursor-pointer flex-shrink-0 w-60">
            <div className="relative overflow-hidden rounded-2xl mb-2.5 aspect-video">
              <img
                src={item.img}
                alt={item.headline}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              {item.hot && (
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white text-[9px] font-heading font-800 uppercase px-2 py-0.5 rounded-full">
                  <Flame size={8} /> HOT
                </div>
              )}
              <span className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded-full font-body">
                {item.category}
              </span>
              <div className="absolute bottom-2 left-2 flex items-center gap-3 text-white/80 text-[10px] font-body">
                <span className="flex items-center gap-0.5"><Heart size={9} /> {item.likes}</span>
                <span className="flex items-center gap-0.5"><MessageCircle size={9} /> {item.comments}</span>
              </div>
            </div>
            <h4 className="font-heading font-700 text-white text-xs leading-snug line-clamp-2 group-hover:text-pink-400 transition-colors">
              {item.headline}
            </h4>
            <p className="text-white/35 text-[10px] font-body mt-1">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Alerts Tab ───────────────────────────────────────────────────────────────

function AlertsTab() {
  const { member, setShowModal } = useMember();

  const defaultPrefs = { breaking: true, sports: true, dramas: true, entertainment: false, morning: true, programs: true };
  const [prefs, setPrefs] = useState(() => {
    try {
      const stored = localStorage.getItem('stv_alert_prefs');
      return stored ? JSON.parse(stored) : defaultPrefs;
    } catch { return defaultPrefs; }
  });

  const toggle = (key) => {
    if (!member) { setShowModal(true); return; }
    setPrefs(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('stv_alert_prefs', JSON.stringify(updated));
      return updated;
    });
  };

  if (!member) {
    return (
      <div className="text-center py-10">
        <Lock size={32} className="text-white/20 mx-auto mb-3" />
        <p className="text-white font-heading font-700 text-sm mb-1">Members Only</p>
        <p className="text-white/40 text-xs font-body mb-5">
          Sign up free to set your notification preferences
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-supreme-vivid hover:bg-purple-500 text-white font-heading font-800 text-sm px-6 py-2.5 rounded-full transition-colors"
        >
          Join Free →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <p className="text-white/50 text-xs font-body mb-4">
        Alerts sent to your registered phone · Toggle any category anytime
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ALERT_OPTIONS.map(({ key, label, sub, emoji }) => (
          <div
            key={key}
            onClick={() => toggle(key)}
            className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all select-none ${
              prefs[key]
                ? 'bg-supreme-vivid/25 border border-supreme-vivid/50'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="text-xl">{emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-heading font-700">{label}</p>
              <p className="text-white/40 text-[10px] font-body leading-snug">{sub}</p>
            </div>
            {/* Toggle pill */}
            <div className={`w-9 h-5 rounded-full relative flex-shrink-0 transition-colors ${prefs[key] ? 'bg-supreme-vivid' : 'bg-white/20'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${prefs[key] ? 'left-[18px]' : 'left-0.5'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function EngagementHub() {
  const [activeTab, setActiveTab] = useState('games');
  const { member, setShowModal } = useMember();

  return (
    <section className="bg-supreme-dark py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-pink-500" />
            <div>
              <span className="text-[10px] font-heading font-800 uppercase tracking-widest text-pink-400 block">
                Community Hub
              </span>
              <h2 className="font-heading font-800 text-white text-2xl leading-tight">Engage &amp; Win</h2>
            </div>
          </div>

          {member ? (
            <div className="ml-auto flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
              <Trophy size={12} className="text-pink-400" />
              <span className="text-white text-xs font-heading font-700">{member.points} pts</span>
              <span className="text-white/35 text-[10px] font-body">· {member.name.split(' ')[0]}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="ml-auto hidden sm:flex items-center gap-1.5 bg-pink-500 hover:bg-pink-400 text-white font-heading font-800 text-[11px] px-4 py-2 rounded-full transition-colors"
            >
              Join to Earn Points →
            </button>
          )}
        </div>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-700 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/15'
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === 'games'  && <GamesTab />}
          {activeTab === 'polls'  && <PollsTab />}
          {activeTab === 'gossip' && <GossipTab />}
          {activeTab === 'alerts' && <AlertsTab />}
        </div>
      </div>
    </section>
  );
}
