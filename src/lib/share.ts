import { Ballot, DayPlan, Language, TripOption, VotePhase } from '../types/trip';
import { travelerById, votersFor } from '../data/travelers';
import { voteLink } from './voteLinks';

// Text builders for WhatsApp. WhatsApp renders *bold* and _italic_, and the
// family group is where every decision actually gets discussed.

export const openWhatsApp = (text: string) => {
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
};

export const appLink = (hash = '') => `${window.location.origin}${window.location.pathname}${hash}`;

const L = (lang: Language, es: string, en: string) => (lang === 'es' ? es : en);

const PHASE_LABEL: Record<VotePhase, [string, string]> = {
  thanksgiving: ['🦃 Thanksgiving (25–30 Nov)', '🦃 Thanksgiving (Nov 25–30)'],
  december: ['🎄 Escapada de diciembre (3–7 Dic)', '🎄 December getaway (Dec 3–7)'],
};

export const dayShareText = (day: DayPlan, lang: Language): string => {
  const lines = [
    `*📅 ${L(lang, 'Día', 'Day')} ${day.dayNumber} · ${lang === 'es' ? day.dateFormatted : day.dateFormattedEn}*`,
    `*${lang === 'es' ? day.title : day.titleEn}*`,
    `📍 ${day.locationName}`,
    '',
    ...day.activities.map(a => {
      const time = a.timeLabel ? `${a.timeLabel} — ` : '';
      return `• ${time}${lang === 'es' ? a.title : a.titleEn}`;
    }),
  ];
  if (day.lodgingName) lines.push('', `🛏️ ${day.lodgingName}`);
  lines.push('', appLink(`#itinerario?dia=${day.dayNumber}`));
  return lines.join('\n');
};

export const optionShareText = (option: TripOption, lang: Language): string => {
  const m = option.metrics;
  return [
    `*${lang === 'es' ? option.title : option.titleEn}*`,
    `_${lang === 'es' ? option.tagline : option.taglineEn}_`,
    '',
    `🚗 ${L(lang, 'Manejo total', 'Total driving')}: ~${m.totalDriveHours} h · ${L(lang, 'tramo más largo', 'longest leg')} ${m.longestLegHours} h`,
    `🏨 ${m.lodgings} ${L(lang, m.lodgings === 1 ? 'hotel' : 'hoteles', m.lodgings === 1 ? 'hotel' : 'hotels')}`,
    `🛂 ${m.passportsRequired ? L(lang, 'Requiere pasaportes', 'Passports required') : L(lang, 'Sin pasaportes', 'No passports needed')}`,
    `👶 ${L(lang, 'Bebé', 'Baby')} ${'●'.repeat(m.babyScore)}${'○'.repeat(5 - m.babyScore)}   👵 ${L(lang, 'Abuelos', 'Seniors')} ${'●'.repeat(m.seniorScore)}${'○'.repeat(5 - m.seniorScore)}`,
    '',
    appLink('#opciones'),
  ].join('\n');
};

const ballotLines = (ballots: Record<string, Ballot>, options: TripOption[], lang: Language, phase: VotePhase) => {
  const phaseOptions = options.filter(o => o.phase === phase);
  const lines = [`*${PHASE_LABEL[phase][lang === 'es' ? 0 : 1]}*`];
  for (const option of phaseOptions) {
    const names = Object.entries(ballots)
      .filter(([, b]) => b[phase] === option.id)
      .map(([id]) => travelerById(id)?.name ?? id);
    lines.push(`${names.length ? '🟢' : '⚪'} ${lang === 'es' ? option.shortTitle : option.shortTitleEn}: ${names.length}${names.length ? ` (${names.join(', ')})` : ''}`);
  }
  const missing = votersFor(phase).filter(t => !ballots[t.id]?.[phase]).map(t => t.name);
  if (missing.length) lines.push(`⏳ ${L(lang, 'Faltan', 'Waiting on')}: ${missing.join(', ')}`);
  return lines;
};

export const myVoteShareText = (travelerId: string, ballot: Ballot, options: TripOption[], lang: Language): string => {
  const name = travelerById(travelerId)?.name ?? travelerId;
  const pick = (phase: VotePhase) => {
    const option = options.find(o => o.id === ballot[phase]);
    return option ? (lang === 'es' ? option.shortTitle : option.shortTitleEn) : null;
  };
  const lines = [`🗳️ *${L(lang, `${name} votó`, `${name} voted`)}*`];
  const tg = pick('thanksgiving');
  const dec = pick('december');
  if (tg) lines.push(`${PHASE_LABEL.thanksgiving[lang === 'es' ? 0 : 1]}: *${tg}*`);
  if (dec) lines.push(`${PHASE_LABEL.december[lang === 'es' ? 0 : 1]}: *${dec}*`);
  lines.push('', L(lang, '👉 Abre este enlace para sumar mi voto en tu teléfono:', '👉 Open this link to add my vote on your phone:'));
  lines.push(voteLink({ [travelerId]: ballot }, options));
  return lines.join('\n');
};

export const resultsShareText = (ballots: Record<string, Ballot>, options: TripOption[], lang: Language): string =>
  [
    `📊 *${L(lang, 'Resultados de la votación', 'Vote results')}*`,
    '',
    ...ballotLines(ballots, options, lang, 'thanksgiving'),
    '',
    ...ballotLines(ballots, options, lang, 'december'),
    '',
    L(lang, '👉 Abre para ver y sumar los votos:', '👉 Open to see and merge the votes:'),
    voteLink(ballots, options),
  ].join('\n');
