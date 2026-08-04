import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Eye, ArrowLeft, X } from 'lucide-react';

export const PREVIEW_BAR_HEIGHT = 36;

export default function AdminPreviewBar() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem('adminPreview') === '1');
  const location = useLocation();

  if (!visible) return null;

  function backToAdmin() {
    sessionStorage.removeItem('adminPreview');
    window.location.href = '/admin';
  }

  function dismiss() {
    sessionStorage.removeItem('adminPreview');
    setVisible(false);
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999,
      height: PREVIEW_BAR_HEIGHT,
      background: 'linear-gradient(90deg, #2A0E2B 0%, #3D1F3E 100%)',
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 12,
      borderBottom: '1px solid rgba(106,62,107,0.6)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    }}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
        <Eye size={13} style={{ color: '#E9A7C7' }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#E9A7C7', letterSpacing: '0.04em' }}>
          ADMIN PREVIEW
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 16, background: 'rgba(163,122,164,0.35)', flexShrink: 0 }} />

      {/* Current path */}
      <span style={{ fontSize: 11, color: 'rgba(245,239,239,0.55)', fontFamily: 'monospace', flexShrink: 0 }}>
        {location.pathname}
      </span>

      {/* Page label */}
      <span style={{ fontSize: 11, color: 'rgba(245,239,239,0.35)' }}>
        — viewing as visitor
      </span>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Back to admin */}
      <button
        onClick={backToAdmin}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 6,
          background: 'rgba(124,58,237,0.85)', color: '#fff',
          border: '1px solid rgba(124,58,237,0.6)',
          cursor: 'pointer', fontSize: 12, fontWeight: 700,
          transition: 'background 0.15s',
          flexShrink: 0,
        }}
        onMouseOver={e  => e.currentTarget.style.background = '#7C3AED'}
        onMouseOut={e   => e.currentTarget.style.background = 'rgba(124,58,237,0.85)'}
      >
        <ArrowLeft size={13} />
        Back to Admin
      </button>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        title="Exit preview mode"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 24, height: 24, borderRadius: 5,
          background: 'transparent', border: 'none',
          color: 'rgba(245,239,239,0.4)', cursor: 'pointer',
          transition: 'color 0.15s',
          flexShrink: 0,
        }}
        onMouseOver={e => e.currentTarget.style.color = '#fff'}
        onMouseOut={e  => e.currentTarget.style.color = 'rgba(245,239,239,0.4)'}
      >
        <X size={13} />
      </button>
    </div>
  );
}
