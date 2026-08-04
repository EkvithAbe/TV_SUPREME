import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl text-sm font-heading font-700 max-w-[300px] animate-slide-in-up pointer-events-auto ${
              t.type === 'reminder'
                ? 'bg-supreme-vivid text-white'
                : t.type === 'remove'
                ? 'bg-gray-700 text-white'
                : 'bg-supreme-dark text-white'
            }`}
          >
            <span className="text-base leading-none flex-shrink-0">
              {t.type === 'reminder' ? '🔔' : t.type === 'remove' ? '✕' : '✓'}
            </span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
