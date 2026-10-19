import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScenarioId } from '../../data/routes';
import { planFor } from '../../data/plans';

interface Segment {
  days: string;
  title: string;
  color: string;
  target?: ScenarioId;
}

/** The whole month in five blocks; tapping one opens that route. */
export const OverviewSummary: React.FC<{ onOpen: (target: ScenarioId) => void }> = ({ onOpen }) => {
  const { language, tr } = useLanguage();
  const es = language === 'es';
  const tg = planFor('thanksgiving');
  const dec = planFor('december');

  const segments: Segment[] = [
    { days: '1–10', title: tr('🛬 Llegada, playa y cataratas', '🛬 Arrival, beach & waterfalls'), color: '#047857', target: 'base' },
    { days: '11–16', title: `🦃 ${es ? tg.title : tg.titleEn}`, color: tg.color, target: 'thanksgiving' },
    { days: '17–18', title: tr('🏡 Descanso en casa', '🏡 Rest at home'), color: '#94a3b8' },
    { days: '19–23', title: `🎄 ${es ? dec.title : dec.titleEn}`, color: dec.color, target: 'december' },
    { days: '24–27', title: tr('👋 Últimos días y vuelo de regreso', '👋 Last days & flight home'), color: '#047857', target: 'base' },
  ];

  return (
    <div className="p-4">
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
    </div>
  );
};
