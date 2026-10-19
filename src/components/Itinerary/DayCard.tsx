import React from 'react';
import { Bed, Car, ExternalLink, MapPin, Moon, Sparkles, Sun, Sunset } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ActivityBlock, DayPlan, TripDestination } from '../../types/trip';
import { dayShareText, openWhatsApp } from '../../lib/share';
import { WhatsAppButton } from '../ui/bits';

const TAGS: Record<NonNullable<ActivityBlock['tag']>, { es: string; en: string; color: string }> = {
  logistics: { es: 'Logística', en: 'Logistics', color: 'bg-blue-100 text-blue-900' },
  beach: { es: 'Playa', en: 'Beach', color: 'bg-cyan-100 text-cyan-900' },
  relaxation: { es: 'Descanso', en: 'Rest', color: 'bg-emerald-100 text-emerald-900' },
  adventure: { es: 'Paseo', en: 'Outing', color: 'bg-amber-100 text-amber-900' },
  thanksgiving: { es: 'Thanksgiving', en: 'Thanksgiving', color: 'bg-orange-100 text-orange-900' },
  food: { es: 'Comida', en: 'Food', color: 'bg-rose-100 text-rose-900' },
  family: { es: 'Familia', en: 'Family', color: 'bg-purple-100 text-purple-900' },
};

const TimeIcon: React.FC<{ timeOfDay: ActivityBlock['timeOfDay'] }> = ({ timeOfDay }) => {
  if (timeOfDay === 'morning') return <Sun className="w-4 h-4 text-amber-600" aria-hidden />;
  if (timeOfDay === 'afternoon') return <Sunset className="w-4 h-4 text-orange-600" aria-hidden />;
  return <Moon className="w-4 h-4 text-indigo-500" aria-hidden />;
};

/** Hours on the road → how hard the day is on Emily and the grandparents. */
export const driveLoadClasses = (hours: number) =>
  hours >= 5 ? 'bg-rose-100 text-rose-900' : hours >= 3 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900';

interface DayCardProps {
  day: DayPlan;
  destination?: TripDestination;
  isToday: boolean;
  accentColor?: string;
  onOpenMap: (destinationId: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, destination, isToday, accentColor, onOpenMap }) => {
  const { language, t, tr } = useLanguage();

  return (
    <article
      id={`day-${day.dayNumber}`}
      data-day={day.dayNumber}
      aria-labelledby={`day-${day.dayNumber}-title`}
      className={`scroll-mt-44 md:scroll-mt-48 relative bg-white rounded-3xl p-4 sm:p-6 border-2 shadow-sm ${
        isToday ? 'border-emerald-600 ring-4 ring-emerald-100' : day.isKeyMilestone ? 'border-emerald-300' : 'border-slate-200'
      }`}
    >
      <header className="flex items-start gap-3 pb-3 border-b border-slate-100">
        <div
          className="flex flex-col items-center justify-center w-14 h-14 shrink-0 rounded-2xl text-white font-black shadow-sm"
          style={{ backgroundColor: accentColor ?? '#047857' }}
        >
          <span className="text-[0.6875rem] uppercase font-bold tracking-wide leading-none">{tr('Día', 'Day')}</span>
          <span className="text-xl leading-none mt-0.5">{day.dayNumber}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              {language === 'es' ? day.dateFormatted : day.dateFormattedEn}
            </span>
            {isToday && (
              <span className="px-2 py-0.5 rounded-md text-[0.6875rem] font-extrabold bg-emerald-700 text-white">{tr('HOY', 'TODAY')}</span>
            )}
            {day.isRestDay && (
              <span className="px-2 py-0.5 rounded-md text-[0.6875rem] font-bold bg-slate-100 text-slate-700">🏡 {tr('Descanso', 'Rest day')}</span>
            )}
          </div>
          <h3 id={`day-${day.dayNumber}-title`} className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mt-0.5">
            {language === 'es' ? day.title : day.titleEn}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {day.milestoneBadge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden />
                {language === 'es' ? day.milestoneBadge : day.milestoneBadgeEn}
              </span>
            )}
            {!!day.driveHours && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${driveLoadClasses(day.driveHours)}`}>
                <Car className="w-3.5 h-3.5" aria-hidden />
                {tr(`~${day.driveHours} h en carretera`, `~${day.driveHours} h driving`)}
              </span>
            )}
            {destination && (
              <button
                onClick={() => onOpenMap(destination.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 min-h-[32px]"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-700" aria-hidden />
                {language === 'es' ? destination.name : destination.nameEn}
              </button>
            )}
          </div>
        </div>
      </header>

      <ol className="mt-3 space-y-2.5">
        {day.activities.map(act => {
          const tag = act.tag ? TAGS[act.tag] : null;
          return (
            <li key={act.id} className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex flex-col items-center gap-1 w-12 shrink-0 pt-0.5">
                <TimeIcon timeOfDay={act.timeOfDay} />
                <span className="text-xs font-extrabold text-slate-700 tabular-nums">
                  {act.timeLabel ?? t[act.timeOfDay]}
                </span>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">{language === 'es' ? act.title : act.titleEn}</span>
                  {tag && (
                    <span className={`text-[0.6875rem] font-bold px-1.5 py-0.5 rounded-md ${tag.color}`}>
                      {language === 'es' ? tag.es : tag.en}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {language === 'es' ? act.description : act.descriptionEn}
                </p>
                {act.googleMapsUrl && (
                  <a
                    href={act.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 underline underline-offset-2 py-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                    {tr('Abrir en Google Maps', 'Open in Google Maps')}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-slate-700 min-w-0">
          {day.lodgingName && (
            <>
              <span className="flex items-start gap-2">
                <Bed className="w-4 h-4 mt-0.5 text-emerald-700 shrink-0" aria-hidden />
                <span>{day.lodgingName}</span>
              </span>
              {day.lodgingStatus && (
                <span className={`px-2 py-0.5 rounded-md text-xs font-extrabold ${day.lodgingStatus === 'confirmed' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
                  {day.lodgingStatus === 'confirmed' ? tr('✅ Confirmado', '✅ Confirmed') : tr('⏳ Por confirmar', '⏳ Tentative')}
                </span>
              )}
              {day.lodgingUrl && (
                <a href={day.lodgingUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-800 underline font-bold shrink-0">
                  {t.viewLodging}
                </a>
              )}
            </>
          )}
        </div>
        <WhatsAppButton size="sm" label={tr('Compartir día', 'Share day')} onClick={() => openWhatsApp(dayShareText(day, language))} />
      </footer>
    </article>
  );
};
