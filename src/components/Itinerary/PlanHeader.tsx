import React from 'react';
import { AlertCircle, Baby, Check, Heart, Map as MapIcon, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripPhase } from '../../types/trip';
import { planFor } from '../../data/plans';
import { travelersOn } from '../../data/travelers';
import { costSummary, usd } from '../../lib/money';
import { CostBreakdown } from './CostBreakdown';

const Fold: React.FC<{ summary: React.ReactNode; children: React.ReactNode }> = ({ summary, children }) => (
  <details className="group rounded-2xl border border-slate-200 bg-white">
    <summary className="flex items-center justify-between gap-2 px-3 min-h-[44px] cursor-pointer text-sm font-bold text-slate-900 list-none">
      <span>{summary}</span>
      <span className="text-slate-500 group-open:rotate-180 transition-transform" aria-hidden>▾</span>
    </summary>
    <div className="px-3 pb-3">{children}</div>
  </details>
);

interface PlanHeaderProps {
  phase: TripPhase;
  onShowOnMap: (phase: TripPhase) => void;
}

/** Sits above the Thanksgiving / December days: the decided plan at a glance. */
export const PlanHeader: React.FC<PlanHeaderProps> = ({ phase, onShowOnMap }) => {
  const { language, tr } = useLanguage();
  const { costLines } = useTrip();
  const es = language === 'es';
  const plan = planFor(phase);
  const crew = travelersOn(phase);
  const m = plan.metrics;
  const total = costSummary(costLines(plan), crew.length).total;

  return (
    <div className="rounded-3xl border-2 p-4 sm:p-5 bg-white space-y-3" style={{ borderColor: plan.color }}>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: plan.color }}>
          {phase === 'thanksgiving' ? '🦃 Thanksgiving' : tr('🎄 Escapada de diciembre', '🎄 December getaway')} · {es ? plan.dateRange : plan.dateRangeEn}
        </p>
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">{es ? plan.title : plan.titleEn}</h3>
        <p className="text-sm text-slate-700 mt-0.5">{es ? plan.tagline : plan.taglineEn}</p>
        <p className="text-sm text-slate-700 flex items-start gap-1.5 mt-1.5">
          <Users className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden />
          <span>{es ? plan.crewSummary : plan.crewSummaryEn}</span>
        </p>
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
        <div className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
          <dt className="sr-only">{tr('Clima', 'Weather')}</dt>
          <dd>🌡️ {es ? m.climate : m.climateEn}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => onShowOnMap(phase)}
        className="w-full inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl text-white text-sm font-extrabold"
        style={{ backgroundColor: plan.color }}
      >
        <MapIcon className="w-4 h-4" aria-hidden /> {tr('Ver la ruta en el mapa', 'See the route on the map')}
      </button>

      <div className="space-y-2">
        <Fold summary={<>✨ {tr('Lo mejor del viaje', 'Trip highlights')}</>}>
          <ul className="space-y-1.5">
            {(es ? plan.highlights : plan.highlightsEn).map((h, i) => (
              <li key={i} className="text-sm text-slate-800 flex gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden /><span>{h}</span></li>
            ))}
          </ul>
        </Fold>
        <Fold summary={<>⚠️ {tr('Antes de salir', 'Before you go')}</>}>
          <ul className="space-y-1.5">
            {(es ? plan.considerations : plan.considerationsEn).map((c, i) => (
              <li key={i} className="text-sm text-slate-800 flex gap-2"><AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden /><span>{c}</span></li>
            ))}
          </ul>
        </Fold>
        <Fold summary={<>👶 Emily · 👵 {tr('Abuelos', 'Seniors')} · 🚗 {tr('Carretera', 'Roads')}</>}>
          <div className="space-y-2.5 text-sm leading-relaxed text-slate-800">
            <p className="flex gap-2"><Baby className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden /><span>{es ? plan.babyNotes : plan.babyNotesEn}</span></p>
            <p className="flex gap-2"><Heart className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" aria-hidden /><span>{es ? plan.seniorNotes : plan.seniorNotesEn}</span></p>
            <p>🚗 {es ? plan.driveSummary : plan.driveSummaryEn}</p>
            <p>🏥 {tr('Hospital más cercano:', 'Nearest hospital:')} {es ? m.nearestHospital : m.nearestHospitalEn}</p>
          </div>
        </Fold>
        <Fold summary={<>💰 {tr('Presupuesto estimado', 'Estimated budget')}: {usd(total)}</>}>
          <CostBreakdown plan={plan} />
        </Fold>
      </div>
    </div>
  );
};
