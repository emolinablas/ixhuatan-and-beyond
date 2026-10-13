import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripOption } from '../../types/trip';
import { travelersOn } from '../../data/travelers';
import { costSummary, gtq, GTQ_PER_USD, usd } from '../../lib/money';

export const CostBreakdown: React.FC<{ option: TripOption }> = ({ option }) => {
  const { language, tr } = useLanguage();
  const { costLines, setCostOverride } = useTrip();
  const lines = costLines(option);
  const people = travelersOn(option.phase).length;
  const summary = costSummary(lines, people);

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-700 leading-relaxed">
        {tr(
          'Cifras preliminares para comparar opciones, no cotizaciones. Cambia el precio unitario cuando tengas una cotización real; queda marcado como ✓ cotizado.',
          'Rough figures for comparing options, not quotes. Change a unit price when you get a real quote; it gets marked ✓ quoted.',
        )}
      </p>
      <ul className="divide-y divide-slate-100">
        {lines.map(line => (
          <li key={line.id} className="py-2 flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 leading-snug">{language === 'es' ? line.label : line.labelEn}</p>
              <p className="text-xs text-slate-600">
                {line.edited
                  ? <span className="font-bold text-emerald-800">✓ {tr('cotizado', 'quoted')}</span>
                  : (language === 'es' ? line.note : line.noteEn) ?? tr('estimado', 'estimate')}
                {' · '}{line.quantity} × {usd(line.unitUsdEffective)} = <span className="font-bold">{usd(line.quantity * line.unitUsdEffective)}</span>
              </p>
            </div>
            <label className="sr-only" htmlFor={`${option.id}-${line.id}`}>
              {tr('Precio unitario en dólares', 'Unit price in dollars')}
            </label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-slate-600" aria-hidden>$</span>
              <input
                id={`${option.id}-${line.id}`}
                type="number"
                inputMode="decimal"
                min={0}
                value={line.unitUsdEffective}
                onChange={e => setCostOverride(option.id, line.id, e.target.value === '' ? null : Number(e.target.value))}
                className="w-20 h-10 px-2 rounded-lg border border-slate-300 text-sm font-semibold text-right"
              />
              {line.edited && (
                <button
                  onClick={() => setCostOverride(option.id, line.id, null)}
                  className="h-10 w-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
                  aria-label={tr('Volver al estimado', 'Back to estimate')}
                >
                  <RotateCcw className="w-4 h-4" aria-hidden />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <dl className="rounded-2xl bg-slate-50 border border-slate-200 p-3 text-sm space-y-1">
        <div className="flex justify-between"><dt className="text-slate-700">{tr('Subtotal', 'Subtotal')}</dt><dd className="font-semibold">{usd(summary.subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-slate-700">{tr('Imprevistos (10%)', 'Contingency (10%)')}</dt><dd className="font-semibold">{usd(summary.contingency)}</dd></div>
        <div className="flex justify-between text-base pt-1 border-t border-slate-200">
          <dt className="font-extrabold text-slate-900">{tr('Total estimado', 'Estimated total')}</dt>
          <dd className="font-extrabold text-slate-900">{usd(summary.total)} <span className="text-sm font-semibold text-slate-600">({gtq(summary.total)})</span></dd>
        </div>
        <div className="flex justify-between"><dt className="text-slate-700">{tr(`Por persona (${people})`, `Per person (${people})`)}</dt><dd className="font-semibold">{usd(summary.perPerson)}</dd></div>
        <p className="text-[0.6875rem] text-slate-600 pt-1">{tr(`Tipo de cambio aprox. Q${GTQ_PER_USD} por dólar.`, `Approx. rate Q${GTQ_PER_USD} per dollar.`)}</p>
      </dl>
    </div>
  );
};
