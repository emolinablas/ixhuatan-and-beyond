import React, { useState, useEffect } from 'react';
import { Calendar, Globe2, Sliders } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTrip } from '../context/TripContext';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { state } = useTrip();

  // Calculate days until Nov 15, 2026
  const [countdownText, setCountdownText] = useState<string>('');

  useEffect(() => {
    const targetDate = new Date('2026-11-15T14:30:00');
    const updateCountdown = () => {
      const now = new Date();
      const diffMs = targetDate.getTime() - now.getTime();
      if (diffMs <= 0) {
        setCountdownText(language === 'es' ? '¡El viaje ha comenzado!' : 'Trip has started!');
      } else {
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        setCountdownText(
          language === 'es'
            ? `Faltan ${diffDays} días para el viaje`
            : `${diffDays} days until departure`
        );
      }
    };
    updateCountdown();
  }, [language]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Trip Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 text-xl font-bold">
              🇬🇹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {language === 'es' ? state.tripTitle : state.tripTitleEn}
                </h1>
                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  2026
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium hidden sm:block">
                {t.appSubtitle} • <span className="text-emerald-700 font-semibold">{t.tripDates}</span>
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Countdown Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 text-slate-700 text-xs font-semibold border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>{countdownText}</span>
            </div>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs sm:text-sm transition-all border border-slate-200 shadow-sm"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'es' ? '🇺🇸 EN' : '🇬🇹 ES'}</span>
            </button>

            {/* Admin / Data Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20"
              title={t.adminMode}
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline">{t.adminMode}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
