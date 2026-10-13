import { Language } from '../types/trip';

export const TRIP_START = '2026-11-15';
export const TRIP_DAYS = 27;
export const ARRIVAL_TIME = '2026-11-15T14:30:00';

const WEEKDAYS: Record<Language, string[]> = {
  es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
const MONTHS: Record<Language, string[]> = {
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

// Dates are handled as UTC calendar days so a phone's timezone can't shift them.
const parseIso = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

export const dateForDay = (dayNumber: number): string => {
  const d = parseIso(TRIP_START);
  d.setUTCDate(d.getUTCDate() + dayNumber - 1);
  return d.toISOString().slice(0, 10);
};

export const formatIsoDate = (iso: string, lang: Language): string => {
  const d = parseIso(iso);
  const wd = WEEKDAYS[lang][d.getUTCDay()];
  const day = String(d.getUTCDate()).padStart(2, '0');
  const mon = MONTHS[lang][d.getUTCMonth()];
  return lang === 'es' ? `${wd}, ${day} ${mon}` : `${wd}, ${mon} ${day}`;
};

export const shortWeekday = (iso: string, lang: Language): string =>
  WEEKDAYS[lang][parseIso(iso).getUTCDay()];

/** Local calendar date on this phone, as YYYY-MM-DD. */
export const todayIso = (now = new Date()): string => {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/** 1–27 while the trip is happening, otherwise null. */
export const tripDayNumber = (now = new Date()): number | null => {
  const diff = Math.round((parseIso(todayIso(now)).getTime() - parseIso(TRIP_START).getTime()) / 86_400_000);
  const n = diff + 1;
  return n >= 1 && n <= TRIP_DAYS ? n : null;
};

export const daysUntilTrip = (now = new Date()): number =>
  Math.ceil((new Date(ARRIVAL_TIME).getTime() - now.getTime()) / 86_400_000);
