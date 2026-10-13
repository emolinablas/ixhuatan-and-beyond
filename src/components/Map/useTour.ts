import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Bounds, boundsOf, LegView, pointAlong } from './mapModel';
import { RouteMapHandle } from './RouteMap';

export interface TourStep {
  day: number;
  legs: LegView[];
  bounds: Bounds;
}

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const wait = (ms: number, token: { cancelled: boolean }) =>
  new Promise<void>(resolve => {
    const id = window.setTimeout(resolve, ms);
    if (token.cancelled) { window.clearTimeout(id); resolve(); }
  });

export const tourStepsFor = (legs: LegView[]): TourStep[] => {
  const days = [...new Set(legs.map(l => l.day))].sort((a, b) => a - b);
  return days.map(day => {
    const dayLegs = legs.filter(l => l.day === day);
    return { day, legs: dayLegs, bounds: boundsOf(dayLegs.flatMap(l => l.coords)) };
  });
};

/**
 * Plays a route day by day: frame the day's legs, drive a little car (or
 * boat) along them, pause, move on. Pausing or closing cancels mid-step.
 */
export const useTour = (mapRef: RefObject<RouteMapHandle>, steps: TourStep[], wholeRoute: Bounds) => {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const token = useRef({ cancelled: false });

  const stop = useCallback(() => {
    token.current.cancelled = true;
    setRunning(false);
    setPaused(false);
    mapRef.current?.setVehicle(null);
  }, [mapRef]);

  const start = useCallback(() => {
    token.current.cancelled = true;
    setIndex(0);
    setPaused(false);
    setRunning(true);
  }, []);

  const next = useCallback(() => {
    token.current.cancelled = true;
    setIndex(i => i + 1);
  }, []);

  useEffect(() => {
    if (!running || paused) return;
    const map = mapRef.current;
    if (!map) return;
    if (index >= steps.length) {
      map.setVehicle(null);
      map.fitBounds(wholeRoute, 1200);
      setRunning(false);
      return;
    }
    const current = { cancelled: false };
    token.current = current;
    const step = steps[index];
    const still = reducedMotion();

    (async () => {
      map.fitBounds(step.bounds, 1100);
      await wait(still ? 300 : 1200, current);
      for (const leg of step.legs) {
        if (current.cancelled) return;
        const emoji = leg.mode === 'boat' ? '🚤' : '🚗';
        if (still) {
          map.setVehicle(leg.coords[leg.coords.length - 1], emoji);
          continue;
        }
        const duration = Math.min(4200, 1600 + leg.km * 9);
        await new Promise<void>(resolve => {
          const t0 = performance.now();
          const frame = (now: number) => {
            if (current.cancelled) return resolve();
            const t = Math.min(1, (now - t0) / duration);
            const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
            map.setVehicle(pointAlong(leg.coords, eased), emoji);
            if (t < 1) requestAnimationFrame(frame);
            else resolve();
          };
          requestAnimationFrame(frame);
        });
      }
      await wait(still ? 2600 : 1400, current);
      if (!current.cancelled) setIndex(i => i + 1);
    })();

    return () => { current.cancelled = true; };
  }, [running, paused, index, steps, wholeRoute, mapRef]);

  useEffect(() => () => { token.current.cancelled = true; }, []);

  return {
    running,
    paused,
    step: running ? steps[Math.min(index, steps.length - 1)] : null,
    index,
    total: steps.length,
    start,
    stop,
    next,
    togglePause: () => setPaused(p => !p),
  };
};
