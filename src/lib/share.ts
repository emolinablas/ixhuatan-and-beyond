import { DayPlan, Language } from '../types/trip';

// Text builders for WhatsApp. WhatsApp renders *bold* and _italic_, and the
// family group is where the plans get shared.

export const openWhatsApp = (text: string) => {
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
};

export const appLink = (hash = '') => `${window.location.origin}${window.location.pathname}${hash}`;

const L = (lang: Language, es: string, en: string) => (lang === 'es' ? es : en);

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
