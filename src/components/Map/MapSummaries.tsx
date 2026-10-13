import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripOption, VotePhase } from '../../types/trip';
import { ScenarioView } from './mapModel';
import { ScoreDots } from '../ui/bits';

export const optionLabel = (option: TripOption, options: TripOption[], es: boolean) => {
  const idx = options.filter(o => o.phase === option.phase).indexOf(option);
  const mark = option.phase === 'thanksgiving' ? String(idx + 1) : 'ABC'[idx];
  return `${es ? 'Opción' : 'Option'} ${mark}`;
};

/** "Ixhuatán → Ataco (5 n) → Ixhuatán": the shape of an option in one line. */
const RouteChain: React.FC<{ view: ScenarioView }> = ({ view }) => {
  const { language, tr } = useLanguage();
  const es = language === 'es';
  const stays = view.stops.filter(s => s.role === 'stay');
  return (
    <p className="text-sm text-slate-800 leading-relaxed">
      🏡 {stays.map(s => (
        <span key={s.pointId}>
          {' → '}<strong>{(es ? s.point.name : s.point.nameEn).split(' · ')[0]}</strong>
          <span className="text-slate-600"> ({s.nights} {tr('n', 'n')})</span>
        </span>
      ))} → 🏡
    </p>
  );
};

export const CompareSummary: React.FC<{ views: ScenarioView[]; onPick: (optionId: string) => void }> = ({ views, onPick }) => {
  const { language, tr } = useLanguage();
  const { options, votersByOption } = useTrip();
  const es = language === 'es';

  return (
    <ul className="p-4 space-y-3">
      {views.map(view => {
        const option = options.find(o => o.id === view.scenario.id)!;
        const m = option.metrics;
        const votes = votersByOption(option.id).length;
        return (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => onPick(option.id)}
              className="w-full text-left rounded-2xl border-2 bg-white p-3 space-y-2 hover:shadow-md active:scale-[0.99] transition"
              style={{ borderColor: option.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 min-w-0">
                  <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: option.color }} aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-xs font-extrabold uppercase" style={{ color: option.color }}>{optionLabel(option, options, es)}</span>
                    <span className="block text-base font-extrabold text-slate-900 leading-tight">{es ? option.shortTitle : option.shortTitleEn}</span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-0.5 text-sm font-bold text-slate-700 shrink-0">
                  {tr('Ver ruta', 'See route')} <ChevronRight className="w-4 h-4" aria-hidden />
                </span>
              </div>
              <RouteChain view={view} />
              <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🚗 ~{m.totalDriveHours} h · {view.totalKm} km</span>
                <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🏨 {m.lodgings} {m.lodgings === 1 ? 'hotel' : tr('hoteles', 'hotels')}</span>
                <span className={`px-2 py-1 rounded-lg ${m.passportsRequired ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
                  🛂 {m.passportsRequired ? tr('Pasaportes', 'Passports') : tr('Sin pasaportes', 'No passports')}
                </span>
                <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🗳️ {votes}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">👶 <ScoreDots score={m.babyScore} label={tr('Para Emily', 'For Emily')} /></span>
                <span className="flex items-center gap-1.5">👵 <ScoreDots score={m.seniorScore} label={tr('Para abuelos', 'For seniors')} /></span>
              </div>
            </button>
          </li>
        );
      })}
      <li className="text-xs text-slate-600 px-1">
        {tr('Las líneas van paralelas donde las opciones comparten carretera.', 'Lines run side by side where options share a road.')}
      </li>
    </ul>
  );
};

interface Segment {
  days: string;
  title: string;
  color: string;
  target?: 'base' | VotePhase;
}

export const OverviewSummary: React.FC<{ onOpen: (target: 'base' | VotePhase) => void }> = ({ onOpen }) => {
  const { language, tr } = useLanguage();
  const { options, selectedOptionIds } = useTrip();
  const es = language === 'es';
  const tg = options.find(o => o.id === selectedOptionIds.thanksgiving)!;
  const dec = options.find(o => o.id === selectedOptionIds.december)!;

  const segments: Segment[] = [
    { days: '1–10', title: tr('🛬 Llegada, playa y cataratas', '🛬 Arrival, beach & waterfalls'), color: '#047857', target: 'base' },
    { days: '11–16', title: `🦃 Thanksgiving · ${optionLabel(tg, options, es)}: ${es ? tg.shortTitle : tg.shortTitleEn}`, color: tg.color, target: 'thanksgiving' },
    { days: '17–18', title: tr('🏡 Descanso en casa', '🏡 Rest at home'), color: '#94a3b8' },
    { days: '19–23', title: `🎄 ${tr('Diciembre', 'December')} · ${optionLabel(dec, options, es)}: ${es ? dec.shortTitle : dec.shortTitleEn}`, color: dec.color, target: 'december' },
    { days: '24–27', title: tr('👋 Últimos días y vuelo de regreso', '👋 Last days & flight home'), color: '#047857', target: 'base' },
  ];

  return (
    <div className="p-4 space-y-3">
      <ol className="space-y-2">
        {segments.map(seg => {
          const content = (
            <>
              <span className="w-1.5 self-stretch rounded-full shrink-0" style={{ backgroundColor: seg.color }} aria-hidden />
              <span className="flex-1 min-w-0">
                <span className="block text-xs font-bold text-slate-600">{tr('Días', 'Days')} {seg.days}</span>
                <span className="block text-sm font-extrabold text-slate-900 leading-snug">{seg.title}</span>
              </span>
              {seg.target && <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" aria-hidden />}
            </>
          );
          return (
            <li key={seg.days}>
              {seg.target ? (
                <button type="button" onClick={() => onOpen(seg.target!)} className="w-full text-left flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 hover:border-slate-400">
                  {content}
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3">{content}</div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-xs text-slate-600">
        {tr(
          'Se muestran las opciones elegidas en el itinerario. Para ver otra, entra a Thanksgiving o Diciembre.',
          'Showing the options chosen in the itinerary. To see another, open Thanksgiving or December.',
        )}
      </p>
    </div>
  );
};
