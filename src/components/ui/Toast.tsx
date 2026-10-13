import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number>();

  const showToast = useCallback((next: string) => {
    window.clearTimeout(timer.current);
    setMessage(next);
    timer.current = window.setTimeout(() => setMessage(null), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="fixed left-1/2 -translate-x-1/2 bottom-24 md:bottom-8 z-[60] w-[calc(100%-2rem)] max-w-md pointer-events-none print:hidden"
      >
        {message && (
          <div className="rounded-2xl bg-slate-900 text-white text-sm font-semibold px-4 py-3 shadow-2xl text-center">
            {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
