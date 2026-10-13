import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarCheck, Printer } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { DayPhase, DayPlan, VotePhase } from '../../types/trip';
import { shortWeekday, tripDayNumber, TRIP_DAYS } from '../../lib/dates';
import { DayCard } from './DayCard';
import { PhaseHeader } from './PhaseHeader';

type Filter = 'all' | 'milestones' | 'rest' | 'thanksgiving' | 'december' | 'beach';

interface ItineraryViewProps {
  onOpenMap: (destinationId: string) => void;
  onGoToVote: () => void;
  onPrint: () => void;
}

const SECTIONS: { phase: DayPhase; es: string; en: string; vote?: VotePhase }[] = [
  { phase: 'initial_base', es: '🛬 Llegada y semana en casa', en: '🛬 Arrival & first week at home' },
  { phase: 'thanksgiving', es: '', en: '', vote: 'thanksgiving' },
  { phase: 'post_thanksgiving_base', es: '🏡 Descanso en Ixhuatán', en: '🏡 Rest in Ixhuatán' },
  { phase: 'december', es: '', en: '', vote: 'december' },
  { phase: 'farewell_base', es: '👋 Últimos días y despedida', en: '👋 Last days & farewell' },
];

const scrollToDay = (n: number, behavior: ScrollBehavior = 'smooth') =>
  document.getElementById(`day-${n}`)?.scrollIntoView({ behavior, block: 'start' });

export const ItineraryView: React.FC<ItineraryViewProps> = ({ onOpenMap, onGoToVote, onPrint }) => {
  const { language, tr } = useLanguage();
  const { days, destinations, options, selectedOptionIds, setActiveDestinationId } = useTrip();
  const [filter, setFilter] = useState<Filter>('all');
  const [visibleDay, setVisibleDay] = useState<number>(1);
  const stripRef = useRef<HTMLDivElement>(null);
  const today = tripDayNumber();

  const accentFor = (day: DayPlan) =>
    day.optionId ? options.find(o => o.id === day.optionId)?.color : undefined;

  const filteredDays = days.filter(day => {
    if (filter === 'milestones') return day.isKeyMilestone;
    if (filter === 'rest') return day.isRestDay;
    if (filter === 'thanksgiving') return day.phase === 'thanksgiving';
    if (filter === 'december') return day.phase === 'december';
    if (filter === 'beach') return day.locationId === 'monterrico';
    return true;
  });

  const restCount = days.filter(d => d.isRestDay).length;
  const roadHours = days.reduce((sum, d) => sum + (d.driveHours ?? 0), 0);

  // Deep link (#itinerario?dia=12) or, during the trip, jump straight to today.
  useEffect(() => {
    const match = window.location.hash.match(/dia=(\d+)/);
    const target = match ? Number(match[1]) : today;
    if (target) requestAnimationFrame(() => scrollToDay(target, 'auto'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Highlight the day chip for the card in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const hit = entries.find(e => e.isIntersecting);
        if (hit) setVisibleDay(Number((hit.target as HTMLElement).dataset.day));
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    document.querySelectorAll('[data-day]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredDays.length, selectedOptionIds]);

  useEffect(() => {
    stripRef.current
      ?.querySelector<HTMLElement>(`[data-chip="${visibleDay}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [visibleDay]);

  const filters: { id: Filter; label: string }[] = useMemo(() => [
    { id: 'all', label: tr(`Todo (${TRIP_DAYS})`, `All (${TRIP_DAYS})`) },
    { id: 'milestones', label: tr('Días clave', 'Key days') },
    { id: 'thanksgiving', label: '🦃 Thanksgiving' },
    { id: 'december', label: tr('🎄 Diciembre', '🎄 December') },
    { id: 'beach', label: tr('🏖️ Playa', '🏖️ Beach') },
    { id: 'rest', label: tr('🏡 Descanso', '🏡 Rest') },
  ], [tr]);

  const openMap = (destinationId: string) => {
    setActiveDestinationId(destinationId);
    onOpenMap(destinationId);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5 pb-28 md:pb-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{tr('Itinerario día a día', 'Day-by-day itinerary')}</h2>
          <p className="text-sm text-slate-700 mt-1">
            {tr(
              `${TRIP_DAYS} días · ${restCount} de descanso en casa · ~${Math.round(roadHours)} h de carretera con las opciones elegidas`,
              `${TRIP_DAYS} days · ${restCount} rest days at home · ~${Math.round(roadHours)} h on the road with the chosen options`,
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {today && (
            <button
              onClick={() => { setFilter('all'); requestAnimationFrame(() => scrollToDay(today)); }}
              className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold"
            >
              <CalendarCheck className="w-4 h-4" aria-hidden />
              {tr('Hoy', 'Today')}
            </button>
          )}
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-bold"
          >
            <Printer className="w-4 h-4" aria-hidden />
            {tr('Imprimir / PDF', 'Print / PDF')}
          </button>
        </div>
      </div>

      {/* Day strip: one tap to any day */}
      <div className="sticky top-16 sm:top-20 md:top-[8.5rem] z-20 -mx-4 sm:mx-0 bg-slate-50/95 backdrop-blur py-2 px-4 sm:px-0 space-y-2">
        <div ref={stripRef} className="flex gap-1.5 overflow-x-auto no-scrollbar" aria-label={tr('Ir a un día', 'Jump to a day')}>
          {days.map(day => {
            const isVisible = visibleDay === day.dayNumber;
            const accent = accentFor(day);
            return (
              <button
                key={day.id}
                data-chip={day.dayNumber}
                onClick={() => { setFilter('all'); requestAnimationFrame(() => scrollToDay(day.dayNumber)); }}
                aria-label={`${tr('Día', 'Day')} ${day.dayNumber}`}
                aria-current={isVisible ? 'true' : undefined}
                className={`relative shrink-0 w-11 h-12 rounded-xl flex flex-col items-center justify-center border-2 text-xs font-bold transition-colors ${
                  isVisible ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
                style={!isVisible && accent ? { borderColor: accent } : undefined}
              >
                <span className="text-[0.625rem] font-semibold opacity-80 leading-none">{shortWeekday(day.date, language)}</span>
                <span className="text-base leading-tight">{day.dayNumber}</span>
                {today === day.dayNumber && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white" />}
              </button>
            );
          })}
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar" role="group" aria-label={tr('Filtrar días', 'Filter days')}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`whitespace-nowrap px-3.5 h-9 rounded-full text-sm font-bold transition-colors ${
                filter === f.id ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {SECTIONS.map(section => {
        const sectionDays = filteredDays.filter(d => d.phase === section.phase);
        if (!sectionDays.length) return null;
        return (
          <section key={section.phase} className="space-y-4">
            {section.vote ? (
              <PhaseHeader phase={section.vote} onGoToVote={onGoToVote} />
            ) : (
              <h3 className="text-lg font-extrabold text-slate-800 pt-2">{language === 'es' ? section.es : section.en}</h3>
            )}
            {sectionDays.map(day => (
              <DayCard
                key={day.id}
                day={day}
                destination={destinations.find(d => d.id === day.locationId)}
                isToday={today === day.dayNumber}
                accentColor={accentFor(day)}
                onOpenMap={openMap}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
};
