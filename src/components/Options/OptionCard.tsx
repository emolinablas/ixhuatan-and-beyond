import React from 'react';
import confetti from 'canvas-confetti';
import { AlertCircle, Baby, CalendarDays, Check, Heart, Map as MapIcon, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripOption } from '../../types/trip';
import { travelerById, travelersOn } from '../../data/travelers';
import { optionShareText, openWhatsApp } from '../../lib/share';
import { costSummary, usd } from '../../lib/money';
import { WhatsAppButton } from '../ui/bits';
import { CostBreakdown } from './CostBreakdown';

interface OptionCardProps {
  option: TripOption;
  label: string;
  onShowDays: (option: TripOption) => void;
  onShowRoute: (option: TripOption) => void;
}

const Section: React.FC<{ summary: React.ReactNode; children: React.ReactNode }> = ({ summary, children }) => (
  <details className="group rounded-2xl border border-slate-200 bg-white">
    <summary className="flex items-center justify-between gap-2 px-3 min-h-[48px] cursor-pointer text-sm font-bold text-slate-900 list-none">
      <span>{summary}</span>
      <span className="text-slate-500 group-open:rotate-180 transition-transform" aria-hidden>▾</span>
    </summary>
    <div className="px-3 pb-3">{children}</div>
  </details>
);

export const OptionCard: React.FC<OptionCardProps> = ({ option, label, onShowDays, onShowRoute }) => {
  const { language, t, tr } = useLanguage();
  const { me, ballots, castVote, votersByOption, daysForOption, costLines } = useTrip();
  const es = language === 'es';

  const meTraveler = me ? travelerById(me) : undefined;
  const canVoteHere = !!meTraveler && meTraveler.trips.includes(option.phase);
  const isMyVote = !!me && ballots[me]?.[option.phase] === option.id;
  const voterIds = votersByOption(option.id);
  const days = daysForOption(option.id);
  const total = costSummary(costLines(option), travelersOn(option.phase).length).total;

  const handleVote = () => {
    if (!me) {
      document.getElementById('who-am-i')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!isMyVote) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, disableForReducedMotion: true });
    }
    castVote(me, option.phase, option.id);
  };

  return (
    <article
      className={`flex flex-col bg-white rounded-3xl border-2 shadow-sm overflow-hidden ${isMyVote ? 'ring-4 ring-emerald-200' : ''}`}
      style={{ borderColor: isMyVote ? '#047857' : '#e2e8f0' }}
      aria-labelledby={`${option.id}-title`}
    >
      <div className="h-2" style={{ backgroundColor: option.color }} aria-hidden />
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-extrabold uppercase tracking-wide text-white px-2 py-0.5 rounded-md" style={{ backgroundColor: option.color }}>
            {label}
          </span>
          {option.isRecommendedForFamily && (
            <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md">⭐ {t.recommended}</span>
          )}
          <span className="text-xs font-semibold text-slate-600">{es ? option.dateRange : option.dateRangeEn}</span>
        </div>

        <div>
          <h3 id={`${option.id}-title`} className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
            {es ? option.title : option.titleEn}
          </h3>
          <p className="text-sm text-slate-700 mt-1">{es ? option.tagline : option.taglineEn}</p>
        </div>

        {/* Vote */}
        <div className="space-y-1.5">
          <button
            onClick={handleVote}
            aria-pressed={isMyVote}
            disabled={!!me && !canVoteHere}
            className={`w-full flex items-center justify-center gap-2 min-h-[52px] px-4 rounded-2xl font-extrabold text-base transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${
              isMyVote ? 'bg-emerald-700 text-white' : 'bg-slate-900 hover:bg-black text-white'
            }`}
          >
            {isMyVote ? <Check className="w-5 h-5" aria-hidden /> : <ThumbsUp className="w-5 h-5" aria-hidden />}
            {!me
              ? tr('Elige tu nombre para votar', 'Pick your name to vote')
              : !canVoteHere
                ? tr(`${meTraveler?.name} no viaja en esta fecha`, `${meTraveler?.name} isn’t on this trip`)
                : isMyVote
                  ? tr(`Voto de ${meTraveler?.name} ✓ (toca para quitar)`, `${meTraveler?.name}’s vote ✓ (tap to undo)`)
                  : tr(`Votar como ${meTraveler?.name}`, `Vote as ${meTraveler?.name}`)}
          </button>
          <p className="text-sm text-slate-700 min-h-[1.25rem]">
            {voterIds.length
              ? `🗳️ ${voterIds.map(id => travelerById(id)?.name ?? id).join(', ')}`
              : tr('Sin votos todavía', 'No votes yet')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onShowDays(option)}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-xl border-2 border-slate-200 text-sm font-bold text-slate-800 hover:border-slate-400"
          >
            <CalendarDays className="w-4 h-4" aria-hidden />
            {tr('Ver día a día', 'Day by day')}
          </button>
          <button
            onClick={() => onShowRoute(option)}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-xl border-2 border-slate-200 text-sm font-bold text-slate-800 hover:border-slate-400"
          >
            <MapIcon className="w-4 h-4" aria-hidden />
            {tr('Ver ruta', 'See route')}
          </button>
        </div>

        <ol className="rounded-2xl bg-slate-50 border border-slate-100 p-3 space-y-1.5">
          {days.map(d => (
            <li key={d.id} className="flex gap-2 text-sm">
              <span className="font-bold text-slate-600 w-14 shrink-0 tabular-nums">{(es ? d.dateFormatted : d.dateFormattedEn).replace(',', '')}</span>
              <span className="text-slate-900 leading-snug">
                {es ? d.title : d.titleEn}
                {!!d.driveHours && <span className="text-slate-600"> · 🚗 {d.driveHours} h</span>}
              </span>
            </li>
          ))}
        </ol>

        <Section summary={<>✅ {t.pros} · ⚠️ {t.considerations}</>}>
          <ul className="space-y-1.5 mb-3">
            {(es ? option.pros : option.prosEn).map((pro, i) => (
              <li key={i} className="text-sm text-slate-800 flex gap-2"><Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden /><span>{pro}</span></li>
            ))}
          </ul>
          <ul className="space-y-1.5">
            {(es ? option.considerations : option.considerationsEn).map((con, i) => (
              <li key={i} className="text-sm text-slate-700 flex gap-2"><AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden /><span>{con}</span></li>
            ))}
          </ul>
        </Section>

        <Section summary={<>👶 Emily · 👵 {tr('Abuelos', 'Seniors')} · 🚗 {tr('Carretera', 'Roads')}</>}>
          <div className="space-y-2.5 text-sm leading-relaxed">
            <p className="flex gap-2 text-slate-800"><Baby className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden /><span>{es ? option.babyNotes : option.babyNotesEn}</span></p>
            <p className="flex gap-2 text-slate-800"><Heart className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" aria-hidden /><span>{es ? option.seniorNotes : option.seniorNotesEn}</span></p>
            <p className="text-slate-800">🚗 {es ? option.driveSummary : option.driveSummaryEn}</p>
            <p className="text-slate-800">🏥 {tr('Hospital más cercano:', 'Nearest hospital:')} {es ? option.metrics.nearestHospital : option.metrics.nearestHospitalEn}</p>
            {option.crewSummary && <p className="text-slate-700">👥 {es ? option.crewSummary : option.crewSummaryEn}</p>}
          </div>
        </Section>

        <Section summary={<>💰 {tr('Presupuesto estimado', 'Estimated budget')}: {usd(total)}</>}>
          <CostBreakdown option={option} />
        </Section>

        <WhatsAppButton
          size="sm"
          label={tr('Compartir esta opción', 'Share this option')}
          onClick={() => openWhatsApp(optionShareText(option, language))}
          className="mt-auto"
        />
      </div>
    </article>
  );
};
