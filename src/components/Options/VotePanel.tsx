import React from 'react';
import { Share2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripOption, VotePhase } from '../../types/trip';
import { travelerById, travelers, votersFor } from '../../data/travelers';
import { myVoteShareText, openWhatsApp, resultsShareText } from '../../lib/share';
import { WhatsAppButton } from '../ui/bits';

interface VotePanelProps {
  phase: VotePhase;
  options: TripOption[];
  labelFor: (o: TripOption) => string;
}

export const WhoAmI: React.FC = () => {
  const { tr } = useLanguage();
  const { me, setMe } = useTrip();
  const voters = travelers.filter(t => t.canVote);

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-4 space-y-2.5" id="who-am-i">
      <p id="who-am-i-label" className="text-base font-extrabold text-slate-900">
        {me
          ? tr(`Votando como ${travelerById(me)?.name}`, `Voting as ${travelerById(me)?.name}`)
          : tr('¿Quién eres? Toca tu nombre para votar', 'Who are you? Tap your name to vote')}
      </p>
      <div role="radiogroup" aria-labelledby="who-am-i-label" className="flex flex-wrap gap-1.5">
        {voters.map(t => (
          <button
            key={t.id}
            role="radio"
            aria-checked={me === t.id}
            onClick={() => setMe(t.id)}
            className={`inline-flex items-center gap-1.5 h-11 px-3 rounded-full border-2 text-sm font-bold transition-colors ${
              me === t.id ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400'
            }`}
          >
            <span aria-hidden>{t.emoji}</span>
            {t.name}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">
        {tr(
          'Si alguien vota desde tu teléfono (por ejemplo los abuelos), toca su nombre primero.',
          'If someone votes from your phone (say, the grandparents), tap their name first.',
        )}
      </p>
    </div>
  );
};

/** "Who voted for what", plus the WhatsApp loop that gathers votes from every phone. */
export const VotePanel: React.FC<VotePanelProps> = ({ phase, options, labelFor }) => {
  const { language, tr } = useLanguage();
  // Vote links carry both trips, so sharing uses every option, not just this phase's.
  const { ballots, me, votersByOption, options: allOptions } = useTrip();
  const voters = votersFor(phase);
  const votedCount = voters.filter(v => ballots[v.id]?.[phase]).length;
  const missing = voters.filter(v => !ballots[v.id]?.[phase]);
  const myBallot = me ? ballots[me] : undefined;

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-4 space-y-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-extrabold text-slate-900">{tr('¿Quién votó por qué?', 'Who voted for what?')}</h3>
        <span className="text-sm font-bold text-slate-700">{votedCount}/{voters.length}</span>
      </div>

      <ul className="space-y-3">
        {options.map(o => {
          const ids = votersByOption(o.id);
          const pct = voters.length ? Math.round((ids.length / voters.length) * 100) : 0;
          return (
            <li key={o.id}>
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>{labelFor(o)} · {language === 'es' ? o.shortTitle : o.shortTitleEn}</span>
                <span>{ids.length}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden mt-1" aria-hidden>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: o.color }} />
              </div>
              {ids.length > 0 && (
                <p className="text-sm text-slate-700 mt-1">
                  {ids.map(id => `${travelerById(id)?.emoji ?? ''} ${travelerById(id)?.name ?? id}`).join(' · ')}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {missing.length > 0 && (
        <p className="text-sm text-slate-700">
          <span className="font-bold">⏳ {tr('Faltan:', 'Still to vote:')}</span> {missing.map(m => m.name).join(', ')}
        </p>
      )}

      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-950 leading-relaxed">
        <p className="font-bold mb-1">{tr('¿Cómo se juntan los votos de todos?', 'How do everyone’s votes come together?')}</p>
        <p>
          {tr(
            'Cada voto se guarda en el teléfono donde se hizo. Después de votar, envía tu voto al grupo de WhatsApp. Quien abra ese enlace suma tu voto en su teléfono. Ever puede reenviar los resultados completos al final.',
            'Each vote is saved on the phone where it was cast. After voting, send it to the WhatsApp group. Whoever opens that link adds your vote on their phone. Ever can share the full results at the end.',
          )}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        {me && myBallot && Object.keys(myBallot).length > 0 && (
          <WhatsAppButton
            label={tr(`Enviar voto de ${travelerById(me)?.name}`, `Send ${travelerById(me)?.name}’s vote`)}
            onClick={() => openWhatsApp(myVoteShareText(me, myBallot, allOptions, language))}
          />
        )}
        <button
          onClick={() => openWhatsApp(resultsShareText(ballots, allOptions, language))}
          className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-4 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-sm font-bold hover:bg-slate-50"
        >
          <Share2 className="w-4 h-4" aria-hidden />
          {tr('Compartir resultados', 'Share results')}
        </button>
      </div>
    </div>
  );
};
