import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripOption } from '../../types/trip';
import { travelersOn } from '../../data/travelers';
import { costSummary, usd } from '../../lib/money';
import { ScoreDots, toneClasses } from '../ui/bits';

type Tone = 'good' | 'ok' | 'hard' | 'none';

interface Row {
  label: string;
  hint?: string;
  cell: (o: TripOption) => { content: React.ReactNode; tone: Tone };
}

const toneFor = (value: number, good: number, ok: number): Tone =>
  value <= good ? 'good' : value <= ok ? 'ok' : 'hard';

/** One screen, every option side by side, colored like a traffic light. */
export const ComparisonMatrix: React.FC<{ options: TripOption[]; labelFor: (o: TripOption) => string }> = ({ options, labelFor }) => {
  const { language, tr } = useLanguage();
  const { costLines, votersByOption } = useTrip();

  const rows: Row[] = [
    {
      label: tr('🚗 Manejo total', '🚗 Total driving'),
      cell: o => ({ content: `~${o.metrics.totalDriveHours} h`, tone: toneFor(o.metrics.totalDriveHours, 10, 14) }),
    },
    {
      label: tr('⏱️ Día más largo', '⏱️ Longest day'),
      hint: tr('en el carro', 'in the car'),
      cell: o => ({ content: `${o.metrics.longestLegHours} h`, tone: toneFor(o.metrics.longestLegHours, 3, 5) }),
    },
    {
      label: tr('🧳 Hoteles', '🧳 Hotels'),
      hint: tr('veces que se empaca', 'times you pack up'),
      cell: o => ({ content: String(o.metrics.lodgings), tone: toneFor(o.metrics.lodgings, 1, 2) }),
    },
    {
      label: tr('🛂 Pasaportes', '🛂 Passports'),
      hint: tr('de las niñas', 'for the girls'),
      cell: o => ({ content: o.metrics.passportsRequired ? tr('Sí', 'Yes') : 'No', tone: o.metrics.passportsRequired ? 'ok' : 'good' }),
    },
    {
      label: tr('👶 Para Emily', '👶 For Emily'),
      cell: o => ({ content: <ScoreDots score={o.metrics.babyScore} label={tr('Facilidad para la bebé', 'Ease for the baby')} />, tone: 'none' }),
    },
    {
      label: tr('👵 Para abuelos', '👵 For seniors'),
      cell: o => ({ content: <ScoreDots score={o.metrics.seniorScore} label={tr('Facilidad para abuelos', 'Ease for seniors')} />, tone: 'none' }),
    },
    {
      label: tr('🌡️ Clima', '🌡️ Weather'),
      cell: o => ({ content: language === 'es' ? o.metrics.climate : o.metrics.climateEn, tone: 'none' }),
    },
    {
      label: tr('💰 Costo est.', '💰 Est. cost'),
      hint: tr('total del grupo', 'whole group'),
      cell: o => {
        const total = costSummary(costLines(o), travelersOn(o.phase).length).total;
        const cheapest = Math.min(...options.map(x => costSummary(costLines(x), travelersOn(x.phase).length).total));
        return { content: usd(total), tone: total === cheapest ? 'good' : total <= cheapest * 1.25 ? 'ok' : 'hard' };
      },
    },
    {
      label: tr('🗳️ Votos', '🗳️ Votes'),
      cell: o => ({ content: votersByOption(o.id).length, tone: 'none' }),
    },
  ];

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full table-fixed text-sm">
        <caption className="sr-only">{tr('Comparación de opciones', 'Option comparison')}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[30%] p-2 text-left text-xs font-bold text-slate-600 align-bottom">
              {tr('De un vistazo', 'At a glance')}
            </th>
            {options.map(o => (
              <th key={o.id} scope="col" className="p-2 text-left align-bottom" style={{ borderTop: `5px solid ${o.color}` }}>
                <span className="block text-[0.6875rem] font-bold uppercase text-slate-600">{labelFor(o)}</span>
                <span className="block text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  {language === 'es' ? o.shortTitle : o.shortTitleEn}
                </span>
                {o.isRecommendedForFamily && <span className="block text-[0.6875rem] font-bold text-emerald-800">⭐ {tr('Recomendada', 'Recommended')}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.label} className="border-t border-slate-100">
              <th scope="row" className="p-2 text-left align-top">
                <span className="block text-xs sm:text-sm font-bold text-slate-800 leading-tight">{row.label}</span>
                {row.hint && <span className="block text-[0.6875rem] text-slate-600 leading-tight">{row.hint}</span>}
              </th>
              {options.map(o => {
                const { content, tone } = row.cell(o);
                return (
                  <td key={o.id} className="p-1.5 align-top">
                    <span className={`block rounded-lg px-1.5 py-1 text-xs sm:text-sm font-bold leading-snug ${tone === 'none' ? 'text-slate-800' : `border ${toneClasses(tone)}`}`}>
                      {content}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
