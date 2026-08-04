import { createContext, useContext, useState, useCallback } from 'react';

const MemberContext = createContext(null);

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback; }
  catch { return fallback; }
}

function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function MemberProvider({ children }) {
  const [member,     setMember]     = useState(() => load('stv_member', null));
  const [watchLater, setWatchLater] = useState(() => load('stv_watchlater', []));
  const [reminders,  setReminders]  = useState(() => load('stv_reminders', []));
  const [showModal,   setShowModal]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const join = (data) => {
    const m = {
      ...data,
      joinedAt: Date.now(),
      points: 10,
      id: 'STV' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    };
    save('stv_member', m);
    setMember(m);
  };

  const addPoints = (n) => {
    setMember(prev => {
      if (!prev) return prev;
      const updated = { ...prev, points: (prev.points || 0) + n };
      save('stv_member', updated);
      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem('stv_member');
    setMember(null);
  };

  // Watch Later
  const toggleWatchLater = useCallback((item) => {
    setWatchLater(prev => {
      const exists = prev.some(i => i.id === item.id);
      const next = exists ? prev.filter(i => i.id !== item.id) : [...prev, item];
      save('stv_watchlater', next);
      return next;
    });
  }, []);

  const isWatchLater = useCallback((id) => watchLater.some(i => i.id === id), [watchLater]);

  // Reminders — unique per day + time
  const addReminder = useCallback((slot) => {
    setReminders(prev => {
      if (prev.some(r => r.day === slot.day && r.time === slot.time)) return prev;
      const next = [...prev, slot];
      save('stv_reminders', next);
      return next;
    });
  }, []);

  const removeReminder = useCallback((day, time) => {
    setReminders(prev => {
      const next = prev.filter(r => !(r.day === day && r.time === time));
      save('stv_reminders', next);
      return next;
    });
  }, []);

  const hasReminder = useCallback((day, time) =>
    reminders.some(r => r.day === day && r.time === time), [reminders]);

  return (
    <MemberContext.Provider value={{
      member, showModal, setShowModal, showProfile, setShowProfile,
      join, addPoints, logout,
      watchLater, toggleWatchLater, isWatchLater,
      reminders, addReminder, removeReminder, hasReminder,
    }}>
      {children}
    </MemberContext.Provider>
  );
}

export const useMember = () => useContext(MemberContext);
