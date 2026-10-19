import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, CalendarDays, Pause, Play, SkipForward, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripPhase } from '../../types/trip';
import { pointById, scenarioById, ScenarioId, SCENARIOS } from '../../data/routes';
import { planFor } from '../../data/plans';
import { photoThumb } from '../../data/photos';
import { boundsOf, buildScenarioView, formatHours, ScenarioView } from './mapModel';
import { DrawnLeg, MarkerSpec, RouteMap, RouteMapHandle } from './RouteMap';
import { MapSheet, SheetSnap } from './MapSheet';
import { TripStory } from './TripStory';
import { PlaceDetail, StopContext } from './PlaceDetail';
import { OverviewSummary } from './MapSummaries';
import { tourStepsFor, useTour } from './useTour';

type MapTab = 'overview' | ScenarioId;

interface MapExplorerProps {
  onOpenItineraryDay: (day: number) => void;
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

/** Fills the space between the header and the phone's bottom tab bar. */
const useAvailableHeight = (ref: React.RefObject<HTMLElement>) => {
  const [height, setHeight] = useState(600);
  useLayoutEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      const nav = document.querySelector<HTMLElement>('[data-bottom-nav]');
      const navHeight = nav && getComputedStyle(nav).display !== 'none' ? nav.offsetHeight : 0;
      setHeight(Math.max(420, window.innerHeight - top - navHeight));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [ref]);
  return height;
};

export const MapExplorer: React.FC<MapExplorerProps> = ({ onOpenItineraryDay }) => {
  const { language, tr } = useLanguage();
  const { days, destinations, activeDestinationId, setActiveDestinationId, mapFocus, setMapFocus } = useTrip();
  const es = language === 'es';

  const rootRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<RouteMapHandle>(null);
  const sheetScrollRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const height = useAvailableHeight(rootRef);

  const [tab, setTab] = useState<MapTab>(() => mapFocus ?? 'thanksgiving');
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [snap, setSnap] = useState<SheetSnap>('peek');
  const [cover, setCover] = useState(200);
  const [topInset, setTopInset] = useState(110);
  const [mapReady, setMapReady] = useState(false);

  useLayoutEffect(() => {
    if (!topBarRef.current) return;
    const ro = new ResizeObserver(([entry]) => setTopInset(Math.ceil(entry.target.getBoundingClientRect().height) + 8));
    ro.observe(topBarRef.current);
    return () => ro.disconnect();
  }, []);

  const scenarioIds: ScenarioId[] = useMemo(
    () => (tab === 'overview' ? ['base', 'thanksgiving', 'december'] : [tab]),
    [tab],
  );
  const scenarioKey = scenarioIds.join('|');

  const views = useMemo(() => scenarioIds.map(id => buildScenarioView(scenarioById(id))), [scenarioIds]);
  const single: ScenarioView | null = views.length === 1 ? views[0] : null;
  const allBounds = useMemo(() => boundsOf(views.flatMap(v => v.bounds)), [views]);

  // Itinerary days behind each route: the two trips by phase, everything else is "home".
  const itineraryFor = useCallback(
    (scenarioId: ScenarioId) => days.filter(d => (scenarioId === 'base'
      ? d.phase !== 'thanksgiving' && d.phase !== 'december'
      : d.phase === scenarioId)),
    [days],
  );

  // Area of the map hidden behind the floating tabs and the sheet.
  // Extra room because photo pins rise above their point and labels hang below.
  const padding = useMemo(() => ({
    top: topInset + 20,
    bottom: (isDesktop ? 0 : cover) + 36,
    left: 24,
    right: isDesktop ? 24 : 60, // zoom buttons sit on the right edge on phones
  }), [topInset, cover, isDesktop]);

  // ── Map content ────────────────────────────────────────────────
  const drawnLegs: DrawnLeg[] = useMemo(() => views.flatMap(view => view.legs.map(leg => ({
    key: `${view.scenario.id}|${leg.key}|${leg.day}`,
    coords: leg.coords,
    color: view.scenario.color,
    mode: leg.mode,
  }))), [views]);

  const highlightKeys = useMemo(() => (single && activeDay !== null
    ? single.legs.filter(l => l.day === activeDay).map(l => `${single.scenario.id}|${l.key}|${l.day}`)
    : []), [single, activeDay]);

  const markers: MarkerSpec[] = useMemo(() => {
    const seen = new Map<string, MarkerSpec>();
    for (const view of views) {
      for (const stop of view.stops) {
        const p = stop.point;
        // With several routes on screen, only show where people sleep.
        if (!single && !(stop.role === 'stay' || stop.role === 'home' || p.kind === 'airport')) continue;
        if (seen.has(p.id)) continue;
        const photo = p.photo ?? destinations.find(d => d.id === p.destinationId)?.photo;
        const variant = stop.role === 'home' ? 'home' : p.kind === 'airport' ? 'airport' : stop.role === 'stay' ? 'stay' : stop.role === 'border' ? 'border' : 'visit';
        seen.set(p.id, {
          id: p.id,
          coordinates: p.coordinates,
          variant,
          color: view.scenario.color,
          order: single ? stop.order : null,
          label: variant === 'home' ? tr('Casa', 'Home') : p.mapLabel ? (es ? p.mapLabel[0] : p.mapLabel[1]) : (es ? p.name : p.nameEn).split(' · ')[0],
          emoji: p.emoji,
          photo: variant === 'stay' && photo ? photoThumb(photo) : undefined,
          nights: single && stop.role === 'stay' ? stop.nights : undefined,
          labelSide: p.labelSide,
        });
      }
    }
    return [...seen.values()];
  }, [views, single, destinations, es, tr]);

  // ── Tour ───────────────────────────────────────────────────────
  const steps = useMemo(() => (single ? tourStepsFor(single.legs) : []), [single]);
  const tour = useTour(mapRef, steps, single?.bounds ?? allBounds);

  useEffect(() => {
    if (tour.step) setActiveDay(tour.step.day);
  }, [tour.step]);

  // New route on screen: stop any tour, clear focus, lower the sheet, frame everything.
  useEffect(() => {
    tour.stop();
    setActiveDay(null);
    setSnap('peek');
    if (mapReady) mapRef.current?.fitBounds(allBounds, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioKey, mapReady]);

  // The visible part of the map changed (sheet moved, tour caption appeared):
  // re-frame whatever is in focus so it isn't hidden behind them.
  useEffect(() => {
    if (!mapReady) return;
    const map = mapRef.current;
    if (tour.running && tour.step) map?.fitBounds(tour.step.bounds, 600);
    else if (selectedPointId) map?.flyTo(pointById(selectedPointId)!.coordinates, 11.5);
    else if (activeDay !== null && single) {
      const coords = single.legs.filter(l => l.day === activeDay).flatMap(l => l.coords);
      map?.fitBounds(coords.length ? boundsOf(coords) : allBounds, 400);
    } else map?.fitBounds(allBounds, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cover, topInset, isDesktop]);

  // ── Navigation helpers ─────────────────────────────────────────
  const openPoint = useCallback((pointId: string) => {
    const point = pointById(pointId);
    if (!point) return;
    tour.stop();
    setActiveDay(null);
    setSelectedPointId(pointId);
    if (!isDesktop) setSnap(s => (s === 'peek' ? 'half' : s));
    sheetScrollRef.current?.scrollTo({ top: 0 });
    window.setTimeout(() => mapRef.current?.flyTo(point.coordinates, 11.5), 60);
  }, [isDesktop, tour]);

  const focusDay = useCallback((day: number) => {
    if (!single) return;
    setActiveDay(day);
    const legs = single.legs.filter(l => l.day === day);
    const coords = legs.length
      ? legs.flatMap(l => l.coords)
      : single.stops.filter(s => s.days.includes(day) && s.role !== 'home').map(s => s.point.coordinates);
    if (coords.length) mapRef.current?.fitBounds(boundsOf(coords));
  }, [single]);

  const showTab = (next: MapTab) => {
    setSelectedPointId(null);
    setTab(next);
  };

  // "See the route on the map" from a trip in the itinerary.
  useEffect(() => {
    if (!mapFocus) return;
    showTab(mapFocus);
    setMapFocus(null);
  }, [mapFocus, setMapFocus]);

  // Location chip in the itinerary: open that place on the route that includes it.
  useEffect(() => {
    if (!activeDestinationId || !mapReady) return;
    setActiveDestinationId(null);
    const scenario = SCENARIOS.find(s => s.stops.some(st => pointById(st.pointId)?.destinationId === activeDestinationId));
    const point = scenario?.stops.map(st => pointById(st.pointId)!).find(p => p.destinationId === activeDestinationId);
    if (!scenario || !point) return;
    setTab(scenario.id);
    window.setTimeout(() => openPoint(point.id), 350);
  }, [activeDestinationId, mapReady]); // eslint-disable-line react-hooks/exhaustive-deps

  const onLegClick = (key: string) => {
    const [scenarioId, , day] = key.split('|');
    // On the whole-trip view, tapping a line opens that part of the trip.
    if (!single) {
      showTab(scenarioId as ScenarioId);
      return;
    }
    setSelectedPointId(null);
    focusDay(Number(day));
    if (!isDesktop) setSnap(s => (s === 'peek' ? 'half' : s));
  };

  // ── Sheet content ──────────────────────────────────────────────
  const selectedPoint = selectedPointId ? pointById(selectedPointId) : null;
  const scenarioTitle = (scenarioId: ScenarioId) => {
    if (scenarioId === 'base') return tr('Llegada, semana en casa y despedida', 'Arrival, home week & farewell');
    const plan = planFor(scenarioId);
    return es ? plan.title : plan.titleEn;
  };
  const contexts: StopContext[] = selectedPoint
    ? views.flatMap(v => v.stops.filter(s => s.pointId === selectedPoint.id).map(stop => ({
      stop, scenarioLabel: scenarioTitle(v.scenario.id), itinerary: itineraryFor(v.scenario.id),
    })))
    : [];

  const singlePlan = single && single.scenario.id !== 'base' ? planFor(single.scenario.id as TripPhase) : undefined;

  const header = selectedPoint ? (
    <div className="px-3 pb-2.5 flex items-center gap-2">
      <button
        type="button"
        onClick={() => setSelectedPointId(null)}
        className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-bold shrink-0"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden /> {tr('Ruta', 'Route')}
      </button>
      <p className="text-base font-extrabold text-slate-900 truncate">{selectedPoint.emoji} {es ? selectedPoint.name : selectedPoint.nameEn}</p>
    </div>
  ) : single ? (
    <div className="px-4 pb-3 space-y-2">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: single.scenario.color }}>
          {singlePlan
            ? `${singlePlan.id === 'thanksgiving' ? 'Thanksgiving' : tr('Diciembre', 'December')} · ${es ? singlePlan.dateRange : singlePlan.dateRangeEn}`
            : tr('En casa', 'At home')}
        </p>
        <h3 className="text-lg font-black text-slate-900 leading-tight">
          {singlePlan ? (es ? singlePlan.title : singlePlan.titleEn).split(': ')[1] ?? (es ? singlePlan.title : singlePlan.titleEn) : tr('Llegada, playa, cataratas y despedida', 'Arrival, beach, waterfalls & farewell')}
        </h3>
      </div>
      <div className="flex gap-1.5 text-xs font-bold overflow-x-auto no-scrollbar -mx-4 px-4 whitespace-nowrap">
        {singlePlan ? (
          <>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">📅 {singlePlan.durationDays} {tr('días', 'days')}</span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🚗 ~{singlePlan.metrics.totalDriveHours} h · {single.totalKm} km</span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🏨 {singlePlan.metrics.lodgings} {singlePlan.metrics.lodgings === 1 ? 'hotel' : tr('hoteles', 'hotels')}</span>
            <span className={`px-2 py-1 rounded-lg ${singlePlan.metrics.passportsRequired ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
              🛂 {singlePlan.metrics.passportsRequired ? tr('Pasaportes', 'Passports') : tr('Sin pasaportes', 'No passports')}
            </span>
          </>
        ) : (
          <>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🚗 {single.legs.length} {tr('salidas', 'outings')} · ~{Math.round(single.driveHours)} h</span>
            {single.stops.filter(s => s.role === 'stay').map(s => (
              <span key={s.pointId} className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">
                {s.point.emoji} {es ? s.point.name : s.point.nameEn} · {s.nights} {tr('noches', 'nights')}
              </span>
            ))}
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => { setSelectedPointId(null); if (!isDesktop) setSnap('peek'); tour.start(); }}
          className="inline-flex items-center justify-center gap-1.5 h-11 rounded-xl text-white text-sm font-extrabold shadow"
          style={{ backgroundColor: single.scenario.color }}
        >
          <Play className="w-4 h-4" aria-hidden /> {tr('Recorrer el viaje', 'Play the trip')}
        </button>
        <button
          type="button"
          onClick={() => onOpenItineraryDay(single.legs[0]?.day ?? 1)}
          className="inline-flex items-center justify-center gap-1.5 h-11 rounded-xl border-2 border-slate-200 text-slate-900 text-sm font-bold hover:border-slate-400"
        >
          <CalendarDays className="w-4 h-4" aria-hidden /> {tr('Itinerario', 'Itinerary')}
        </button>
      </div>
    </div>
  ) : (
    <div className="px-4 pb-3">
      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-600">{tr('Todo el viaje · 27 días', 'The whole trip · 27 days')}</p>
      <h3 className="text-lg font-black text-slate-900 leading-tight">{tr('Así se ve el mes completo', 'Here’s the whole month')}</h3>
      <p className="text-xs font-bold text-slate-700 mt-1">
        🚗 ~{Math.round(views.reduce((sum, v) => sum + v.driveHours, 0))} h {tr('de carretera en total', 'of driving in total')} · {views.reduce((sum, v) => sum + v.totalKm, 0).toLocaleString()} km
      </p>
    </div>
  );

  const body = selectedPoint ? (
    <PlaceDetail point={selectedPoint} contexts={contexts} onOpenDay={onOpenItineraryDay} />
  ) : single ? (
    <TripStory
      view={single}
      itinerary={itineraryFor(single.scenario.id)}
      activeDay={activeDay}
      onDayClick={day => { focusDay(day); }}
      onStopClick={openPoint}
      scrollContainer={sheetScrollRef}
    />
  ) : (
    <OverviewSummary onOpen={target => showTab(target)} />
  );

  // ── Top bar ────────────────────────────────────────────────────
  const tabs: { id: MapTab; emoji: string; label: string }[] = [
    { id: 'overview', emoji: '🗺️', label: tr('Todo el viaje', 'Whole trip') },
    { id: 'base', emoji: '🏡', label: tr('En casa', 'At home') },
    { id: 'thanksgiving', emoji: '🦃', label: 'Thanksgiving' },
    { id: 'december', emoji: '🎄', label: tr('Diciembre', 'December') },
  ];

  const tourStep = tour.step;
  const tourDayPlan = tourStep && single ? itineraryFor(single.scenario.id).find(d => d.dayNumber === tourStep.day) : undefined;
  const legName = (id: string) => {
    const p = pointById(id);
    return p ? (es ? p.name : p.nameEn).split(' · ')[0] : id;
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full flex overflow-hidden bg-slate-200"
      style={{ height, ['--rm-top' as string]: `${topInset}px`, ['--rm-bottom' as string]: `${isDesktop ? 0 : cover}px` }}
    >
      <div className="relative flex-1 h-full rm-root">
        <RouteMap
          ref={mapRef}
          legs={drawnLegs}
          highlightKeys={highlightKeys}
          markers={markers}
          selectedMarkerId={selectedPointId}
          padding={padding}
          onMarkerClick={openPoint}
          onLegClick={onLegClick}
          onReady={() => setMapReady(true)}
          ariaLabel={tr('Mapa de la ruta', 'Route map')}
        />

        <div ref={topBarRef} className="absolute top-2 inset-x-2 z-10 space-y-1.5 pointer-events-none max-w-xl">
          <div role="tablist" aria-label={tr('¿Qué parte del viaje?', 'Which part of the trip?')} className="pointer-events-auto grid grid-cols-4 gap-1 p-1 rounded-2xl bg-white/95 backdrop-blur shadow-lg border border-slate-200">
            {tabs.map(t => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => showTab(t.id)}
                className={`flex flex-col items-center justify-center min-h-[48px] rounded-xl px-1 leading-tight transition-colors ${
                  tab === t.id ? 'bg-slate-900 text-white' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span className="text-base" aria-hidden>{t.emoji}</span>
                <span className="text-[0.6875rem] font-bold">{t.label}</span>
              </button>
            ))}
          </div>

          {tourStep ? (
            <div className="pointer-events-auto rounded-2xl bg-slate-900/95 text-white p-3 shadow-xl" role="status" aria-live="polite">
              <p className="text-xs font-extrabold text-yellow-300">
                {tr('Día', 'Day')} {tourStep.day}{tourDayPlan ? ` · ${es ? tourDayPlan.dateFormatted : tourDayPlan.dateFormattedEn}` : ''} · {tour.index + 1}/{tour.total}
              </p>
              <p className="text-base font-extrabold leading-snug">{tourDayPlan ? (es ? tourDayPlan.title : tourDayPlan.titleEn) : ''}</p>
              {tourStep.legs.map(leg => (
                <p key={leg.key} className="text-sm text-slate-200">
                  {leg.mode === 'boat' ? '🚤' : '🚗'} {legName(leg.from)} → {legName(leg.to)} · {formatHours(leg.hours)} · {leg.km} km
                </p>
              ))}
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={tour.togglePause} className="inline-flex items-center gap-1 h-9 px-3 rounded-lg bg-white/15 text-sm font-bold">
                  {tour.paused ? <Play className="w-4 h-4" aria-hidden /> : <Pause className="w-4 h-4" aria-hidden />}
                  {tour.paused ? tr('Seguir', 'Resume') : tr('Pausa', 'Pause')}
                </button>
                <button type="button" onClick={tour.next} className="inline-flex items-center gap-1 h-9 px-3 rounded-lg bg-white/15 text-sm font-bold">
                  <SkipForward className="w-4 h-4" aria-hidden /> {tr('Siguiente', 'Next')}
                </button>
                <button type="button" onClick={() => { tour.stop(); mapRef.current?.fitBounds(allBounds); }} className="ml-auto inline-flex items-center gap-1 h-9 px-3 rounded-lg bg-white/15 text-sm font-bold">
                  <X className="w-4 h-4" aria-hidden /> {tr('Salir', 'Exit')}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <MapSheet
        isDesktop={isDesktop}
        snap={snap}
        onSnapChange={setSnap}
        containerHeight={height}
        topInset={topInset}
        header={header}
        onCoverChange={setCover}
        scrollRef={sheetScrollRef}
      >
        {body}
      </MapSheet>
    </div>
  );
};

export default MapExplorer;
