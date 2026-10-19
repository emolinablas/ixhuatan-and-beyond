import { TRIP_DAYS } from '../lib/dates';
import { baseDays } from './baseDays';
import { planDays } from './planDays';
import { destinations } from './destinations';
import { legKey, pointById, SCENARIOS, BOAT_PATHS } from './routes';
import geometry from './routeGeometry.json';

/**
 * Dev-only content checks. Editing trip data by hand makes it easy to drop or
 * duplicate a day; this shouts in the console instead of shipping a gap.
 */
export const validateTripData = (): string[] => {
  const problems: string[] = [];
  const allDays = [...baseDays, ...planDays];
  const destinationIds = new Set(destinations.map(d => d.id));

  const numbers = allDays.map(d => d.dayNumber).sort((a, b) => a - b);
  const expected = Array.from({ length: TRIP_DAYS }, (_, i) => i + 1);
  if (numbers.join() !== expected.join()) {
    problems.push(`Days are [${numbers.join(', ')}], expected 1–${TRIP_DAYS} once each`);
  }

  for (const day of allDays) {
    if (!destinationIds.has(day.locationId)) problems.push(`${day.id}: unknown locationId "${day.locationId}"`);
  }

  // Map routes must use known points, have road geometry (npm run build:routes)
  // and only use days that belong to that part of the trip.
  for (const scenario of SCENARIOS) {
    const scenarioDays = new Set(allDays
      .filter(d => (scenario.id === 'base' ? d.phase !== 'thanksgiving' && d.phase !== 'december' : d.phase === scenario.id))
      .map(d => d.dayNumber));
    for (const stop of scenario.stops) {
      const point = pointById(stop.pointId);
      if (!point) problems.push(`${scenario.id}: unknown map point "${stop.pointId}"`);
      else if (point.destinationId && !destinationIds.has(point.destinationId)) problems.push(`${point.id}: unknown destination "${point.destinationId}"`);
    }
    for (const leg of scenario.legs) {
      const key = legKey(leg);
      [leg.from, leg.to, ...(leg.via ?? [])].forEach(id => { if (!pointById(id)) problems.push(`${scenario.id}: unknown map point "${id}"`); });
      if (leg.mode === 'drive' && !(key in geometry)) problems.push(`${key}: missing road geometry — run npm run build:routes`);
      if (leg.mode === 'boat' && !BOAT_PATHS[key]) problems.push(`${key}: missing boat path`);
      if (!scenarioDays.has(leg.day)) problems.push(`${scenario.id}: leg on day ${leg.day}, which belongs to another part of the trip`);
    }
  }

  return problems;
};
