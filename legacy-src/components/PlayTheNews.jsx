import { useState } from 'react';
import { HelpCircle, BarChart2, CheckCircle, XCircle, Users } from 'lucide-react';
import { quizData, pollData } from '../data/mockData';

function NewsQuiz() {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed]  = useState(false);

  function pick(index) {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  }

  function reset() {
    setSelected(null);
    setRevealed(false);
  }

  const isCorrect = selected === quizData.correctIndex;

  return (
    <div className="bg-white dark:bg-supreme-deep rounded-2xl shadow-card p-6 lg:p-8 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 rounded-lg bg-supreme-vivid/10">
          <HelpCircle size={16} className="text-supreme-vivid dark:text-supreme-bright" />
        </div>
        <span className="text-[11px] font-heading font-800 uppercase tracking-widest text-supreme-vivid dark:text-supreme-bright">
          Daily News Quiz
        </span>
      </div>

      <h3 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-lg leading-snug mt-3 mb-5 text-balance">
        {quizData.question}
      </h3>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
        {quizData.options.map((option, i) => {
          const letter = String.fromCharCode(65 + i);
          let stateClass = 'border-supreme-mid/25 hover:border-supreme-vivid/50 hover:bg-supreme-vivid/5 dark:hover:border-supreme-bright/50 cursor-pointer';

          if (revealed) {
            if (i === quizData.correctIndex) {
              stateClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 cursor-default';
            } else if (i === selected) {
              stateClass = 'border-red-400 bg-red-50 dark:bg-red-900/20 cursor-default';
            } else {
              stateClass = 'border-supreme-mid/15 opacity-50 cursor-default';
            }
          }

          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={revealed}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-200 text-left ${stateClass}`}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-supreme-vivid/10 dark:bg-supreme-bright/10 flex items-center justify-center text-xs font-heading font-800 text-supreme-vivid dark:text-supreme-bright">
                {letter}
              </span>
              <span className="font-body text-sm text-supreme-dark dark:text-supreme-light leading-snug flex-1">
                {option}
              </span>
              {revealed && i === quizData.correctIndex && (
                <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
              )}
              {revealed && i === selected && i !== quizData.correctIndex && (
                <XCircle size={16} className="text-red-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Result message */}
      {revealed && (
        <div className={`mt-4 p-3 rounded-xl text-sm font-body animate-fade-up ${
          isCorrect
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
            : 'bg-supreme-vivid/8 dark:bg-supreme-bright/10 text-supreme-dark dark:text-supreme-light'
        }`}>
          {isCorrect
            ? '✓ Correct! Well done.'
            : `The correct answer is "${quizData.options[quizData.correctIndex]}". `}
          <span className="text-supreme-mid">{quizData.explanation}</span>
          <button
            onClick={reset}
            className="block mt-2 text-supreme-vivid dark:text-supreme-bright font-heading font-700 text-xs uppercase tracking-wide hover:underline"
          >
            Try tomorrow's quiz →
          </button>
        </div>
      )}
    </div>
  );
}

function QuickPoll() {
  const [voted, setVoted]   = useState(null);
  const [counts, setCounts] = useState(pollData.options.map(o => o.votes));

  function vote(index) {
    if (voted !== null) return;
    setVoted(index);
    setCounts(prev => prev.map((v, i) => (i === index ? v + 1 : v)));
  }

  const total = counts.reduce((s, v) => s + v, 0);

  return (
    <div className="bg-white dark:bg-supreme-deep rounded-2xl shadow-card p-6 lg:p-8 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 rounded-lg bg-supreme-pink/20 dark:bg-supreme-pink/10">
          <BarChart2 size={16} className="text-supreme-primary dark:text-supreme-pink" />
        </div>
        <span className="text-[11px] font-heading font-800 uppercase tracking-widest text-supreme-primary dark:text-supreme-pink">
          Quick Poll
        </span>
      </div>

      <h3 className="font-heading font-700 text-supreme-dark dark:text-supreme-light text-lg leading-snug mt-3 mb-5 text-balance">
        {pollData.question}
      </h3>

      {/* Options */}
      <div className="flex flex-col gap-4 flex-1">
        {pollData.options.map((option, i) => {
          const pct = Math.round((counts[i] / total) * 100);
          const isVoted = voted === i;

          return (
            <button
              key={i}
              onClick={() => vote(i)}
              disabled={voted !== null}
              className={`group relative w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                voted === null
                  ? 'border-supreme-mid/20 hover:border-supreme-primary/50 cursor-pointer'
                  : isVoted
                  ? 'border-supreme-vivid cursor-default'
                  : 'border-supreme-mid/15 opacity-70 cursor-default'
              }`}
            >
              {/* Animated fill bar — shown after voting */}
              {voted !== null && (
                <div
                  className="absolute inset-0 rounded-[10px] transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: isVoted
                      ? 'linear-gradient(90deg, #7C3AED22, #7C3AED18)'
                      : 'linear-gradient(90deg, #A37AA415, #A37AA410)',
                  }}
                />
              )}

              <div className="relative flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isVoted
                      ? 'border-supreme-vivid bg-supreme-vivid'
                      : 'border-supreme-mid/40 group-hover:border-supreme-primary'
                  }`}>
                    {isVoted && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-body text-sm text-supreme-dark dark:text-supreme-light">
                    {option.label}
                  </span>
                </div>

                {voted !== null && (
                  <span className={`font-heading font-800 text-sm animate-fade-in ${
                    isVoted
                      ? 'text-supreme-vivid dark:text-supreme-bright'
                      : 'text-supreme-mid'
                  }`}>
                    {pct}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Vote count */}
      <div className="mt-5 flex items-center gap-1.5 text-supreme-mid text-xs font-body">
        <Users size={12} />
        <span>
          {voted !== null
            ? `${(total).toLocaleString()} votes · Thank you for participating`
            : `${(total - 1).toLocaleString()} votes so far — cast yours`}
        </span>
      </div>
    </div>
  );
}

export default function PlayTheNews() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full bg-supreme-primary" />
        <span className="text-xs font-heading font-800 uppercase tracking-widest text-supreme-primary dark:text-supreme-pink">
          Play The News
        </span>
        <div className="flex-1 h-px bg-supreme-mid/20" />
        <span className="text-xs font-body text-supreme-mid">Refresh daily</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
          <NewsQuiz />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
          <QuickPoll />
        </div>
      </div>
    </section>
  );
}
