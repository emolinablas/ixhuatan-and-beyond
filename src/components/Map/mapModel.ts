import geometry from '../../data/routeGeometry.json';
import { BOAT_PATHS, legKey, MapPoint, MapScenario, pointById, RouteLeg, ScenarioStop } from '../../data/routes';

export type LngLat = [number, number];
export type Bounds = [LngLat, LngLat];

export interface LegView extends RouteLeg {
  key: string;
  coords: LngLat[];
  km: number;
  color: string;
}

export interface StopView extends ScenarioStop {
  point: MapPoint;
  /** 1, 2, 3… in visiting order; null for home and borders. */
  order: number | null;
  color: string;
}

export interface ScenarioView {
  scenario: MapScenario;
  legs: LegView[];
  stops: StopView[];
  bounds: Bounds;
  totalKm: number;
  driveHours: number;
}

// Generated JSON widens tuples to number[][]; the build script always writes [lng, lat] pairs.
const GEOMETRY = geometry as unknown as Record<string, { km: number; coords: LngLat[] }>;

// Rough great-circle-free distance; plenty for boat legs and animation pacing.
const segmentKm = (a: LngLat, b: LngLat) => {
  const kx = 111.32 * Math.cos(((a[1] + b[1]) / 2) * (Math.PI / 180));
  return Math.hypot((b[0] - a[0]) * kx, (b[1] - a[1]) * 110.57);
};

export const lineKm = (coords: LngLat[]) =>
  coords.slice(1).reduce((sum, c, i) => sum + segmentKm(coords[i], c), 0);

const legCoords = (leg: RouteLeg): { coords: LngLat[]; km: number } => {
  const key = legKey(leg);
  if (leg.mode === 'drive' && GEOMETRY[key]) return GEOMETRY[key];
  const coords = BOAT_PATHS[key]
    ?? [leg.from, ...(leg.via ?? []), leg.to].map(id => pointById(id)!.coordinates);
  return { coords, km: Math.round(lineKm(coords)) };
};

export const boundsOf = (coords: LngLat[]): Bounds => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of coords) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return [[minX, minY], [maxX, maxY]];
};

const firstDay = (s: ScenarioStop) => Math.min(...s.days);

export const buildScenarioView = (scenario: MapScenario): ScenarioView => {
  const legs: LegView[] = scenario.legs.map(leg => ({
    ...leg,
    key: legKey(leg),
    ...legCoords(leg),
    color: scenario.color,
  }));

  let order = 0;
  const stops: StopView[] = [...scenario.stops]
    .sort((a, b) => firstDay(a) - firstDay(b))
    .map(stop => ({
      ...stop,
      point: pointById(stop.pointId)!,
      order: stop.role === 'home' || stop.role === 'border' ? null : ++order,
      color: scenario.color,
    }));

  const allCoords = [...legs.flatMap(l => l.coords), ...stops.map(s => s.point.coordinates)];
  return {
    scenario,
    legs,
    stops,
    bounds: boundsOf(allCoords),
    totalKm: legs.reduce((sum, l) => sum + l.km * (l.roundTrip ? 2 : 1), 0),
    driveHours: legs.filter(l => l.mode === 'drive').reduce((sum, l) => sum + l.hours * (l.roundTrip ? 2 : 1), 0),
  };
};

/** Where everyone sleeps on a given night of this scenario. */
export const sleepStopFor = (view: ScenarioView, day: number): StopView | undefined =>
  view.stops.find(s => s.role === 'stay' && s.days.includes(day) && day < Math.max(...s.days));

/** Days worth a row in the trip story. */
export const storyDays = (view: ScenarioView, itineraryDays: number[]): number[] => {
  const fromData = [
    ...view.legs.map(l => l.day),
    ...view.stops.filter(s => s.role !== 'home').flatMap(s => s.days),
  ];
  return [...new Set([...itineraryDays, ...fromData])].sort((a, b) => a - b);
};

/** Point at fraction t (0–1) along a line, for the moving car in the tour. */
export const pointAlong = (coords: LngLat[], t: number): LngLat => {
  if (coords.length < 2) return coords[0];
  const lengths = coords.slice(1).map((c, i) => segmentKm(coords[i], c));
  const total = lengths.reduce((a, b) => a + b, 0);
  let target = total * Math.min(Math.max(t, 0), 1);
  for (let i = 0; i < lengths.length; i++) {
    if (target <= lengths[i] || i === lengths.length - 1) {
      const f = lengths[i] ? target / lengths[i] : 0;
      const [a, b] = [coords[i], coords[i + 1]];
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    }
    target -= lengths[i];
  }
  return coords[coords.length - 1];
};

/** 2.25 → "2 h 15 min"; minutes rounded to 5 so estimates don't look falsely exact. */
export const formatHours = (h: number) => {
  const total = Math.max(5, Math.round((h * 60) / 5) * 5);
  const whole = Math.floor(total / 60);
  const mins = total % 60;
  if (!whole) return `${mins} min`;
  return mins ? `${whole} h ${mins} min` : `${whole} h`;
};

export const googleMapsUrl = ([lng, lat]: LngLat) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
export const wazeUrl = ([lng, lat]: LngLat) => `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
