import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { EMERGENCY_CONTACTS } from '../../data/contacts';

/**
 * Paper version for the suitcase: only rendered while printing, in the
 * current language, with the options currently selected in the itinerary.
 */
export const PrintItinerary: React.FC = () => {
  const { language, tr } = useLanguage();
  const { days, options, selectedOptionIds } = useTrip();
  const es = language === 'es';
  const chosen = [selectedOptionIds.thanksgiving, selectedOptionIds.december]
    .map(id => options.find(o => o.id === id))
    .filter(Boolean);

  return (
    <div className="hidden print:block text-black bg-white text-[11pt] leading-snug">
      <header className="border-b-2 border-black pb-2 mb-3">
        <h1 className="text-[20pt] font-extrabold">Ixhuatán &amp; Beyond — {tr('Itinerario', 'Itinerary')}</h1>
        <p className="font-semibold">{tr('15 de noviembre – 11 de diciembre de 2026 · Base: Santa María Ixhuatán, Santa Rosa', 'November 15 – December 11, 2026 · Home base: Santa María Ixhuatán, Santa Rosa')}</p>
        <p className="mt-1">
          {tr('Opciones en este itinerario: ', 'Options in this itinerary: ')}
          {chosen.map(o => (es ? o!.title : o!.titleEn)).join(' · ')}
        </p>
      </header>

      <section className="mb-4 break-inside-avoid">
        <h2 className="text-[13pt] font-extrabold mb-1">{tr('Números de emergencia', 'Emergency numbers')}</h2>
        <ul className="grid grid-cols-2 gap-x-6">
          {EMERGENCY_CONTACTS.map(c => (
            <li key={c.number + c.country}>
              <strong>{c.number}</strong> — {es ? c.label : c.labelEn} ({c.country})
            </li>
          ))}
        </ul>
      </section>

      {days.map(day => (
        <section key={day.id} className="break-inside-avoid border-t border-gray-400 py-2">
          <h2 className="text-[12.5pt] font-extrabold">
            {tr('Día', 'Day')} {day.dayNumber} · {es ? day.dateFormatted : day.dateFormattedEn} — {es ? day.title : day.titleEn}
          </h2>
          <p className="text-[10pt]">
            📍 {day.locationName}
            {day.lodgingName && <> · 🛏 {day.lodgingName}</>}
            {!!day.driveHours && <> · 🚗 ~{day.driveHours} h</>}
          </p>
          <ul className="mt-1 space-y-0.5">
            {day.activities.map(a => (
              <li key={a.id} className="flex gap-2">
                <span className="w-12 shrink-0 font-bold tabular-nums">{a.timeLabel ?? ''}</span>
                <span className="whitespace-pre-line">
                  <strong>{es ? a.title : a.titleEn}.</strong> {es ? a.description : a.descriptionEn}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
