import React from 'react';
import { ChevronRight, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { VotePhase } from '../../types/trip';
import { travelersOn } from '../../data/travelers';

interface PhaseHeaderProps {
  phase: VotePhase;
  onGoToVote: () => void;
}

/** Sits above Thanksgiving / December days and swaps which option's days are shown. */
export const PhaseHeader: React.FC<PhaseHeaderProps> = ({ phase, onGoToVote }) => {
  const { language, tr } = useLanguage();
  const { options, selectedOptionIds, selectOption, votersByOption } = useTrip();

  const phaseOptions = options.filter(o => o.phase === phase);
  const selected = phaseOptions.find(o => o.id === selectedOptionIds[phase]) ?? phaseOptions[0];
  const crew = travelersOn(phase);
  const m = selected.metrics;

  return (
    <div className="rounded-3xl border-2 p-4 sm:p-5 bg-white space-y-3" style={{ borderColor: selected.color }}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {phase === 'thanksgiving'
              ? tr('🦃 Viaje de Thanksgiving · 25–30 Nov', '🦃 Thanksgiving trip · Nov 25–30')
              : tr('🎄 Escapada de diciembre · 3–7 Dic', '🎄 December getaway · Dec 3–7')}
          </h3>
          <p className="text-sm text-slate-700 flex items-center gap-1.5 mt-0.5">
            <Users className="w-4 h-4 text-slate-500 shrink-0" aria-hidden />
            {phase === 'thanksgiving'
              ? tr(`Viajan los ${crew.length}`, `All ${crew.length} travel`)
              : tr(`Viajan ${crew.length}: `, `${crew.length} travel: `) + crew.map(c => c.name).join(', ')}
          </p>
        </div>
        <button
          onClick={onGoToVote}
          className="inline-flex items-center gap-0.5 text-sm font-bold text-emerald-800 hover:underline min-h-[40px]"
        >
          {tr('Comparar y votar', 'Compare & vote')}
          <ChevronRight className="w-4 h-4" aria-hidden />
        </button>
      </div>

      <div>
        <p id={`${phase}-switch-label`} className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
          {tr('Ver el día a día de:', 'Show day-by-day for:')}
        </p>
        <div role="radiogroup" aria-labelledby={`${phase}-switch-label`} className="grid grid-cols-3 gap-1.5">
          {phaseOptions.map((option, idx) => {
            const isSelected = option.id === selected.id;
            const votes = votersByOption(option.id).length;
            return (
              <button
                key={option.id}
                role="radio"
                aria-checked={isSelected}
                onClick={() => selectOption(phase, option.id)}
                className={`rounded-2xl px-2 py-2 text-left border-2 min-h-[64px] transition-colors ${
                  isSelected ? 'text-white' : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                }`}
                style={isSelected ? { backgroundColor: option.color, borderColor: option.color } : undefined}
              >
                <span className="block text-[0.6875rem] font-bold uppercase opacity-90">
                  {phase === 'thanksgiving' ? tr(`Opción ${idx + 1}`, `Option ${idx + 1}`) : tr(`Opción ${'ABC'[idx]}`, `Option ${'ABC'[idx]}`)}
                </span>
                <span className="block text-sm font-extrabold leading-tight">
                  {language === 'es' ? option.shortTitle : option.shortTitleEn}
                </span>
                <span className="block text-[0.6875rem] font-semibold opacity-90 mt-0.5">
                  🗳️ {votes}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <dl className="flex flex-wrap gap-1.5 text-xs font-bold">
        <div className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
          <dt className="sr-only">{tr('Manejo total', 'Total driving')}</dt>
          <dd>🚗 ~{m.totalDriveHours} h {tr('de manejo', 'driving')}</dd>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
          <dt className="sr-only">{tr('Hoteles', 'Hotels')}</dt>
          <dd>🏨 {m.lodgings} {m.lodgings === 1 ? 'hotel' : tr('hoteles', 'hotels')}</dd>
        </div>
        <div className={`px-2.5 py-1 rounded-lg ${m.passportsRequired ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
          <dt className="sr-only">{tr('Pasaportes', 'Passports')}</dt>
          <dd>🛂 {m.passportsRequired ? tr('Pasaportes de las niñas', 'Girls need passports') : tr('Sin pasaportes', 'No passports')}</dd>
        </div>
      </dl>
    </div>
  );
};
