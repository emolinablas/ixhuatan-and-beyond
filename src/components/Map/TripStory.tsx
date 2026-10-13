import React, { useEffect, useRef } from 'react';
import { Bed, Home, Ship, Car } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DayPlan } from '../../types/trip';
import { photoThumb } from '../../data/photos';
import { formatHours, LegView, ScenarioView, sleepStopFor, StopView, storyDays } from './mapModel';
import { useTrip } from '../../context/TripContext';

interface TripStoryProps {
  view: ScenarioView;
  itinerary: DayPlan[];
  activeDay: number | null;
  onDayClick: (day: number) => void;
  onStopClick: (pointId: string) => void;
  scrollContainer: React.RefObject<HTMLDivElement>;
}

const ROLE_LABEL: Record<StopView['role'], [string, string]> = {
  home: ['Casa', 'Home'],
  stay: ['Duermen aquí', 'Overnight'],
  visit: ['Visita', 'Visit'],
  border: ['Frontera', 'Border'],
};

export const pointName = (stop: StopView, es: boolean) => (es ? stop.point.name : stop.point.nameEn);

export const LegLine: React.FC<{ leg: LegView; view: ScenarioView }> = ({ leg, view }) => {
  const { language, tr } = useLanguage();
  const es = language === 'es';
  const name = (id: string) => {
    const stop = view.stops.find(s => s.pointId === id);
    return stop ? pointName(stop, es) : id;
  };
  const Icon = leg.mode === 'boat' ? Ship : Car;
  return (
    <div className="flex gap-2.5 rounded-2xl bg-slate-50 border border-slate-100 p-2.5">
      <span className="mt-0.5 w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: leg.mode === 'boat' ? '#0369a1' : leg.color }}>
        <Icon className="w-4 h-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 leading-snug">
          {name(leg.from)} → {name(leg.to)}
        </p>
        <p className="text-xs font-semibold text-slate-600">
          {leg.mode === 'boat' ? tr('En lancha', 'By boat') : tr('En carro', 'By car')} · {formatHours(leg.hours)} · {leg.km} km
          {leg.roundTrip && ` · ${tr('ida y vuelta', 'round trip')}`}
        </p>
        {leg.note && <p className="text-xs text-slate-700 mt-0.5">{es ? leg.note[0] : leg.note[1]}</p>}
      </div>
    </div>
  );
};

export const StopRow: React.FC<{ stop: StopView; onClick: () => void; compact?: boolean }> = ({ stop, onClick, compact }) => {
  const { language, tr } = useLanguage();
  const { destinations } = useTrip();
  const es = language === 'es';
  const photo = stop.point.photo ?? destinations.find(d => d.id === stop.point.destinationId)?.photo;
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 hover:border-slate-400 active:scale-[0.99] transition"
    >
      <span className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden flex items-center justify-center text-2xl" style={{ backgroundColor: `${stop.color}22` }}>
        {photo ? <img src={photoThumb(photo)} alt="" className="w-full h-full object-cover" loading="lazy" /> : <span aria-hidden>{stop.point.emoji}</span>}
        {stop.order && (
          <span className="absolute top-0.5 left-0.5 min-w-[1.25rem] h-5 px-1 rounded-full text-[0.6875rem] font-extrabold text-white flex items-center justify-center border-2 border-white" style={{ backgroundColor: stop.color }}>
            {stop.order}
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold text-slate-900 leading-tight">{pointName(stop, es)}</span>
        <span className="block text-xs font-semibold text-slate-600 mt-0.5">
          {stop.role === 'stay' && stop.nights
            ? tr(`🛏 ${stop.nights} ${stop.nights === 1 ? 'noche' : 'noches'}`, `🛏 ${stop.nights} ${stop.nights === 1 ? 'night' : 'nights'}`)
            : `${stop.point.emoji} ${es ? ROLE_LABEL[stop.role][0] : ROLE_LABEL[stop.role][1]}`}
          {stop.lodging && ` · ${stop.lodging}`}
        </span>
        {!compact && stop.note && <span className="block text-xs text-slate-700 mt-0.5">{es ? stop.note[0] : stop.note[1]}</span>}
      </span>
      <span className="text-slate-400 text-lg shrink-0" aria-hidden>›</span>
    </button>
  );
};

/** Day-by-day story of one route: what you drive, where you stop, where you sleep. */
export const TripStory: React.FC<TripStoryProps> = ({ view, itinerary, activeDay, onDayClick, onStopClick, scrollContainer }) => {
  const { language, tr } = useLanguage();
  const es = language === 'es';
  const dayRefs = useRef<Record<number, HTMLLIElement | null>>({});
  const isBase = view.scenario.id === 'base';
  const days = storyDays(view, isBase ? [] : itinerary.map(d => d.dayNumber));

  useEffect(() => {
    if (activeDay === null) return;
    const el = dayRefs.current[activeDay];
    const container = scrollContainer.current;
    if (el && container) container.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' });
  }, [activeDay, scrollContainer]);

  return (
    <ol className="relative px-4 py-3 space-y-4">
      {days.map((dayNumber, idx) => {
        const plan = itinerary.find(d => d.dayNumber === dayNumber);
        const legs = view.legs.filter(l => l.day === dayNumber);
        const arrivals = view.stops.filter(s => s.role !== 'home' && (Math.min(...s.days) === dayNumber || (s.role !== 'stay' && s.days.includes(dayNumber))));
        const sleep = sleepStopFor(view, dayNumber);
        const isActive = activeDay === dayNumber;
        const isLast = idx === days.length - 1;
        return (
          <li key={dayNumber} ref={el => { dayRefs.current[dayNumber] = el; }} className="relative flex gap-3">
            {/* Rail */}
            <div className="flex flex-col items-center shrink-0">
              <button
                type="button"
                onClick={() => onDayClick(dayNumber)}
                aria-label={tr(`Ver el día ${dayNumber} en el mapa`, `Show day ${dayNumber} on the map`)}
                className={`w-11 h-11 rounded-full flex flex-col items-center justify-center text-white font-black leading-none shadow ${isActive ? 'ring-4 ring-yellow-300' : ''}`}
                style={{ backgroundColor: view.scenario.color }}
              >
                <span className="text-[0.5625rem] font-bold uppercase opacity-90">{tr('Día', 'Day')}</span>
                <span className="text-base">{dayNumber}</span>
              </button>
              {!isLast && <span className="flex-1 w-1 rounded-full mt-1" style={{ backgroundColor: `${view.scenario.color}40` }} aria-hidden />}
            </div>

            <div className={`flex-1 min-w-0 pb-1 space-y-2 rounded-2xl ${isActive ? 'bg-yellow-50 -m-1.5 p-1.5' : ''}`}>
              <button type="button" onClick={() => onDayClick(dayNumber)} className="text-left w-full">
                <span className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  {plan ? (es ? plan.dateFormatted : plan.dateFormattedEn) : ''}
                </span>
                <span className="block text-base font-extrabold text-slate-900 leading-snug">
                  {plan ? (es ? plan.title : plan.titleEn) : tr(`Día ${dayNumber}`, `Day ${dayNumber}`)}
                </span>
              </button>

              {legs.map(leg => <LegLine key={leg.key + leg.day} leg={leg} view={view} />)}
              {arrivals.map(stop => <StopRow key={stop.pointId} stop={stop} onClick={() => onStopClick(stop.pointId)} />)}

              {!isBase && (
                <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  {sleep ? <Bed className="w-4 h-4 text-slate-500" aria-hidden /> : <Home className="w-4 h-4 text-slate-500" aria-hidden />}
                  {sleep
                    ? tr(`Duermen en ${sleep.lodging ?? pointName(sleep, true)}`, `Sleep at ${sleep.lodging ?? pointName(sleep, false)}`)
                    : tr('Duermen en casa, en Ixhuatán', 'Sleep at home in Ixhuatán')}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
