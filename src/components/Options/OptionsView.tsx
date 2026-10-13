import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripOption, VotePhase } from '../../types/trip';
import { travelersOn } from '../../data/travelers';
import { costSummary, usd } from '../../lib/money';
import { ComparisonMatrix } from './ComparisonMatrix';
import { OptionCard } from './OptionCard';
import { VotePanel, WhoAmI } from './VotePanel';

interface OptionsViewProps {
  onShowDays: (option: TripOption) => void;
  onShowRoute: (option: TripOption) => void;
}

export const OptionsView: React.FC<OptionsViewProps> = ({ onShowDays, onShowRoute }) => {
  const { language, tr } = useLanguage();
  const { options, costLines } = useTrip();
  const [phase, setPhase] = useState<VotePhase>('thanksgiving');

  const phaseOptions = options.filter(o => o.phase === phase);
  const labelFor = (o: TripOption) => {
    const idx = phaseOptions.indexOf(o);
    return phase === 'thanksgiving' ? tr(`Opción ${idx + 1}`, `Option ${idx + 1}`) : tr(`Opción ${'ABC'[idx]}`, `Option ${'ABC'[idx]}`);
  };
  const name = (o: TripOption) => (language === 'es' ? o.shortTitle : o.shortTitleEn);

  // Plain facts pulled from the matrix, so the headline can't disagree with it.
  const leastDriving = [...phaseOptions].sort((a, b) => a.metrics.totalDriveHours - b.metrics.totalDriveHours)[0];
  const cost = (o: TripOption) => costSummary(costLines(o), travelersOn(o.phase).length).total;
  const cheapest = [...phaseOptions].sort((a, b) => cost(a) - cost(b))[0];
  const noPassports = phaseOptions.filter(o => !o.metrics.passportsRequired);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5 pb-28 md:pb-12">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{tr('Comparar y votar', 'Compare & vote')}</h2>
        <p className="text-sm text-slate-700 mt-1">
          {tr('Dos decisiones: el viaje de Thanksgiving y la escapada de diciembre.', 'Two decisions: the Thanksgiving trip and the December getaway.')}
        </p>
      </div>

      <div role="tablist" aria-label={tr('Viaje', 'Trip')} className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-200/70 max-w-xl">
        {(['thanksgiving', 'december'] as VotePhase[]).map(p => (
          <button
            key={p}
            role="tab"
            aria-selected={phase === p}
            onClick={() => setPhase(p)}
            className={`min-h-[48px] rounded-xl text-sm sm:text-base font-extrabold transition-colors ${
              phase === p ? 'bg-white text-slate-900 shadow' : 'text-slate-700'
            }`}
          >
            {p === 'thanksgiving' ? tr('🦃 Thanksgiving · 25–30 Nov', '🦃 Thanksgiving · Nov 25–30') : tr('🎄 Diciembre · 3–7 Dic', '🎄 December · Dec 3–7')}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-800 rounded-2xl bg-white border border-slate-200 p-3 leading-relaxed">
        <span className="font-bold">{tr('En números:', 'By the numbers:')}</span>{' '}
        {tr(`menos manejo → ${name(leastDriving)} (~${leastDriving.metrics.totalDriveHours} h)`, `least driving → ${name(leastDriving)} (~${leastDriving.metrics.totalDriveHours} h)`)}
        {' · '}
        {tr(`más económica → ${name(cheapest)} (~${usd(cost(cheapest))})`, `lowest cost → ${name(cheapest)} (~${usd(cost(cheapest))})`)}
        {phase === 'thanksgiving' && noPassports.length > 0 && (
          <>{' · '}{tr(`sin pasaportes → ${noPassports.map(name).join(', ')}`, `no passports → ${noPassports.map(name).join(', ')}`)}</>
        )}
      </p>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 items-start">
        <ComparisonMatrix options={phaseOptions} labelFor={labelFor} />
        <div className="space-y-4">
          <WhoAmI />
          <VotePanel phase={phase} options={phaseOptions} labelFor={labelFor} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">
          {tr('Las opciones en detalle', 'The options in detail')}
          <span className="lg:hidden text-sm font-semibold text-slate-600"> · {tr('desliza →', 'swipe →')}</span>
        </h3>
        <div className="-mx-4 px-4 lg:mx-0 lg:px-0 flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-2">
          {phaseOptions.map(option => (
            <div key={option.id} className="w-[88%] sm:w-[60%] lg:w-auto shrink-0 snap-center flex">
              <OptionCard option={option} label={labelFor(option)} onShowDays={onShowDays} onShowRoute={onShowRoute} />
            </div>
          ))}
        </div>
      </div>

      <figure className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        <figcaption className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">
          🇺🇸 {tr('Mensaje de Bruce & Norma', 'A note from Bruce & Norma')}
        </figcaption>
        <blockquote className="text-base sm:text-lg italic font-medium text-slate-100 leading-relaxed max-w-3xl">
          “{tr(
            'El viaje a Río Dulce con tu familia extendida nos parece genial. ¡A tu familia le encantará! Y El Salvador también está bien... Sobre Atitlán vs. Semuc: nos inclinamos un poco por Atitlán porque no es un viaje tan largo y podría ser más fácil para Cori y la bebé Emily. Es como intentar decidir entre tus dos helados favoritos... imposible. Así que decídelo tú también.',
            'The trip to Rio Dulce with your extended family is fine with us. Your family would love this trip! And El Salvador is also fine... On Coban/Semuc vs Lago de Atitlán: we lean a bit toward Atitlán because it is not as long of a drive and it might be easier for Cori and Emily. It’s like trying to decide between your 2 favorite ice creams... impossible. So you can decide this as well.',
          )}”
        </blockquote>
        <div className="absolute -right-6 -bottom-8 text-9xl opacity-10 select-none pointer-events-none" aria-hidden>🍦</div>
      </figure>
    </div>
  );
};
