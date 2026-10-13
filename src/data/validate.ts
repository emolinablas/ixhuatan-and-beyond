import { TRIP_DAYS } from '../lib/dates';
import { baseDays } from './baseDays';
import { optionItineraries } from './optionItineraries';
import { tripOptions } from './options';
import { destinations } from './destinations';
import { legKey, pointById, SCENARIOS, BOAT_PATHS } from './routes';
import geometry from './routeGeometry.json';

/**
 * Dev-only content checks. Editing trip data by hand makes it easy to drop or
 * duplicate a day; this shouts in the console instead of shipping a gap.
 */
export const validateTripData = (): string[] => {
  const problems: string[] = [];
  const thanksgiving = tripOptions.filter(o => o.phase === 'thanksgiving');
  const december = tripOptions.filter(o => o.phase === 'december');
  const destinationIds = new Set(destinations.map(d => d.id));

  for (const tg of thanksgiving) {
    for (const dec of december) {
      const numbers = [...baseDays, ...(optionItineraries[tg.id] ?? []), ...(optionItineraries[dec.id] ?? [])]
        .map(d => d.dayNumber)
        .sort((a, b) => a - b);
      const expected = Array.from({ length: TRIP_DAYS }, (_, i) => i + 1);
      if (numbers.join() !== expected.join()) {
        problems.push(`${tg.code}+${dec.code}: days are [${numbers.join(', ')}], expected 1–${TRIP_DAYS} once each`);
      }
    }
  }

  for (const option of tripOptions) {
    if (!optionItineraries[option.id]?.length) problems.push(`${option.id}: no day-by-day itinerary`);
  }

  for (const day of [...baseDays, ...Object.values(optionItineraries).flat()]) {
    if (!destinationIds.has(day.locationId)) problems.push(`${day.id}: unknown locationId "${day.locationId}"`);
  }

  // Map routes must exist for every option, use known points, have road
  // geometry (npm run build:routes) and only use days of that option.
  for (const option of tripOptions) {
    if (!SCENARIOS.some(sc => sc.id === option.id)) problems.push(`${option.id}: no map route in routes.ts`);
  }
  for (const scenario of SCENARIOS) {
    const optionDays = new Set((optionItineraries[scenario.id] ?? baseDays).map(d => d.dayNumber));
    for (const stop of scenario.stops) {
      if (!pointById(stop.pointId)) problems.push(`${scenario.id}: unknown map point "${stop.pointId}"`);
    }
    for (const leg of scenario.legs) {
      const key = legKey(leg);
      [leg.from, leg.to, ...(leg.via ?? [])].forEach(id => { if (!pointById(id)) problems.push(`${scenario.id}: unknown map point "${id}"`); });
      if (leg.mode === 'drive' && !(key in geometry)) problems.push(`${key}: missing road geometry — run npm run build:routes`);
      if (leg.mode === 'boat' && !BOAT_PATHS[key]) problems.push(`${key}: missing boat path`);
      if (!optionDays.has(leg.day)) problems.push(`${scenario.id}: leg on day ${leg.day}, which isn't in its itinerary`);
    }
  }

  const codes = tripOptions.map(o => o.code);
  if (new Set(codes).size !== codes.length) problems.push('Option codes must be unique (they are used in vote links)');

  return problems;
};
