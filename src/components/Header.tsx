import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { daysUntilTrip, tripDayNumber, TRIP_DAYS } from '../lib/dates';
import { applyTextSize, getStoredTextSize, TEXT_SIZES, TextSize } from '../lib/textSize';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const { language, toggleLanguage, t, tr } = useLanguage();
  const [textSize, setTextSize] = useState<TextSize>(getStoredTextSize);

  const today = tripDayNumber();
  const daysLeft = daysUntilTrip();
  const countdown = today
    ? tr(`Día ${today} de ${TRIP_DAYS}`, `Day ${today} of ${TRIP_DAYS}`)
    : daysLeft > 0
      ? tr(`Faltan ${daysLeft} días`, `${daysLeft} days to go`)
      : tr('¡Gracias por venir!', 'Thanks for coming!');

  const cycleTextSize = () => {
    const next = TEXT_SIZES[(TEXT_SIZES.indexOf(textSize) + 1) % TEXT_SIZES.length];
    setTextSize(next);
    applyTextSize(next);
  };

  const sizeLabel = { normal: tr('normal', 'normal'), large: tr('grande', 'large'), xlarge: tr('muy grande', 'extra large') }[textSize];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="hidden min-[400px]:flex w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-600 text-white items-center justify-center shadow-md text-xl" aria-hidden>
              🇬🇹
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight truncate">
                Ixhuatán &amp; Beyond
              </h1>
              <p className="text-xs sm:text-sm text-emerald-800 font-bold truncate">
                {countdown}
                <span className="hidden sm:inline text-slate-500 font-medium"> • {t.tripDates}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={cycleTextSize}
              className="flex items-center justify-center h-11 min-w-[2.75rem] px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200"
              aria-label={tr(`Tamaño de texto: ${sizeLabel}. Toca para cambiar`, `Text size: ${sizeLabel}. Tap to change`)}
              title={tr('Tamaño de texto', 'Text size')}
            >
              <span aria-hidden>{textSize === 'normal' ? 'Aa' : textSize === 'large' ? 'Aa+' : 'Aa++'}</span>
            </button>

            <button
              onClick={toggleLanguage}
              lang={language === 'es' ? 'en' : 'es'}
              className="h-11 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200"
            >
              {language === 'es' ? 'English' : 'Español'}
            </button>

            <button
              onClick={onOpenAdmin}
              className="h-11 w-11 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              aria-label={tr('Ajustes y respaldo de datos', 'Settings & data backup')}
              title={t.adminMode}
            >
              <Settings className="w-5 h-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
