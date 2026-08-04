import { useState, useEffect } from 'react';
import logo from '../assets/logo.jpeg';

export default function IntroScreen({ onComplete }) {
  // phase 0 = blank  1 = line shoots  2 = logo in  3 = tagline  4 = swipe up
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 420),
      setTimeout(() => setPhase(3), 1050),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => onComplete(), 3150),
    ];
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(140deg, #060110 0%, #0f0618 50%, #1e0a20 100%)',
        transform: phase === 4 ? 'translateY(-100%)' : 'translateY(0)',
        transition: phase === 4
          ? 'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)'
          : 'none',
      }}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: 0.04,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
      }} />

      {/* Purple glow orb */}
      <div style={{
        position: 'absolute',
        top: '38%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 700,
        borderRadius: '50%',
        background: '#7C3AED',
        opacity: phase >= 2 ? 0.09 : 0,
        filter: 'blur(90px)',
        transition: 'opacity 1s ease',
        pointerEvents: 'none',
      }} />

      {/* Pink glow orb — lower */}
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '20%',
        width: 400, height: 400,
        borderRadius: '50%',
        background: '#E9A7C7',
        opacity: phase >= 3 ? 0.05 : 0,
        filter: 'blur(80px)',
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none',
      }} />

      {/* Horizontal sweep line */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        height: 1,
        width: phase >= 1 ? '100%' : '0%',
        background: 'linear-gradient(90deg, transparent, #7C3AED 30%, #E9A7C7 70%, transparent)',
        opacity: phase >= 2 ? 0 : 1,
        transition: phase >= 1
          ? 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease 0.35s'
          : 'none',
        pointerEvents: 'none',
      }} />

      {/* ── Center content ── */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 18,
        textAlign: 'center', padding: '0 32px',
        position: 'relative', zIndex: 2,
      }}>

        {/* Logo */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'scale(1) translateY(0)' : 'scale(0.82) translateY(24px)',
          transition: 'opacity 0.65s cubic-bezier(0.34,1.2,0.64,1), transform 0.65s cubic-bezier(0.34,1.2,0.64,1)',
        }}>
          <img
            src={logo}
            alt="TV Supreme"
            style={{
              height: 88, width: 'auto', objectFit: 'contain',
              filter: 'brightness(1.08) drop-shadow(0 0 24px rgba(124,58,237,0.4))',
            }}
          />
        </div>

        {/* Brand name */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.55s ease 0.12s, transform 0.55s ease 0.12s',
        }}>
          <span style={{
            display: 'block',
            fontFamily: '"Sora", system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff',
            letterSpacing: '0.06em',
            lineHeight: 1.1,
          }}>
            TV Supreme
          </span>
        </div>

        {/* Divider line */}
        <div style={{
          width: phase >= 3 ? 80 : 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)',
          transition: 'width 0.5s ease',
        }} />

        {/* Tagline */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <span style={{
            display: 'block',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 500,
            fontSize: 11,
            color: 'rgba(163, 122, 164, 0.75)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
          }}>
            Sri Lanka's Boldest Screen
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 52, left: '50%',
        transform: 'translateX(-50%)',
        width: 180, height: 1,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 999, overflow: 'hidden',
        opacity: phase >= 3 ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          height: '100%',
          width: phase >= 3 ? '100%' : '0%',
          background: 'linear-gradient(90deg, #7C3AED, #E9A7C7)',
          borderRadius: 999,
          transition: 'width 1.35s ease-out',
        }} />
      </div>

      {/* Skip button */}
      <button
        onClick={() => { setPhase(4); setTimeout(onComplete, 650); }}
        style={{
          position: 'absolute',
          bottom: 40, right: 36,
          background: 'none', border: 'none',
          color: 'rgba(163,122,164,0.4)',
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: 11, fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.4s ease, color 0.2s ease',
          padding: '8px 0',
        }}
        onMouseOver={e => e.currentTarget.style.color = 'rgba(163,122,164,0.9)'}
        onMouseOut={e  => e.currentTarget.style.color = 'rgba(163,122,164,0.4)'}
      >
        Skip
      </button>
    </div>
  );
}
