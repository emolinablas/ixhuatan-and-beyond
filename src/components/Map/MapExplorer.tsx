import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, CalendarDays, Pause, Play, SkipForward, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { VotePhase } from '../../types/trip';
import { pointById, scenarioById, SCENARIOS } from '../../data/routes';
import { photoThumb } from '../../data/photos';
import { boundsOf, buildScenarioView, formatHours, ScenarioView } from './mapModel';
import { DrawnLeg, MarkerSpec, RouteMap, RouteMapHandle } from './RouteMap';
import { MapSheet, SheetSnap } from './MapSheet';
import { TripStory } from './TripStory';
import { PlaceDetail, StopContext } from './PlaceDetail';
import { CompareSummary, OverviewSummary, optionLabel } from './MapSummaries';
import { tourStepsFor, useTour } from './useTour';

type MapTab = 'overview' | 'base' | VotePhase;

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
  const {
    options, selectedOptionIds, selectOption, days, daysForOption, destinations, votersByOption,
    activeDestinationId, setActiveDestinationId, mapRouteFocusId, setMapRouteFocusId,
  } = useTrip();
  const es = language === 'es';

  const rootRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<RouteMapHandle>(null);
  const sheetScrollRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const height = useAvailableHeight(rootRef);

  const [tab, setTab] = useState<MapTab>('thanksgiving');
  const [compare, setCompare] = useState(false);
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

  const phaseOptions = useCallback((phase: VotePhase) => options.filter(o => o.phase === phase), [options]);

  const scenarioIds = useMemo(() => {
    if (tab === 'overview') return ['base', selectedOptionIds.thanksgiving, selectedOptionIds.december];
    if (tab === 'base') return ['base'];
    return compare ? phaseOptions(tab).map(o => o.id) : [selectedOptionIds[tab]];
  }, [tab, compare, selectedOptionIds, phaseOptions]);
  const scenarioKey = scenarioIds.join('|');

  const views = useMemo(() => scenarioIds.map(id => buildScenarioView(scenarioById(id)!)), [scenarioKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const single: ScenarioView | null = views.length === 1 ? views[0] : null;
  const allBounds = useMemo(() => boundsOf(views.flatMap(v => v.bounds)), [views]);

  const itineraryFor = useCallback(
    (scenarioId: string) => (scenarioId === 'base' ? days.filter(d => !d.optionId) : daysForOption(scenarioId)),
    [days, daysForOption],
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
  const drawnLegs: DrawnLeg[] = useMemo(() => views.flatMap((view, i) => view.legs.map(leg => ({
    key: `${view.scenario.id}|${leg.key}|${leg.day}`,
    coords: leg.coords,
    color: view.scenario.color,
    mode: leg.mode,
    offset: compare ? (i - (views.length - 1) / 2) * 5 : 0,
    arrows: !compare,
  }))), [views, compare]);

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
          label: variant === 'home' ? tr('Casa', 'Home') : (es ? p.name : p.nameEn).split(' · ')[0],
          emoji: p.emoji,
          photo: variant === 'stay' && photo ? photoThumb(photo) : undefined,
          nights: single && stop.role === 'stay' ? stop.nights : undefined,
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
    setCompare(false);
    setTab(next);
  };

  const pickOption = (phase: VotePhase, optionId: string) => {
    setSelectedPointId(null);
    setCompare(false);
    selectOption(phase, optionId);
  };

  // "See route" from the Options tab.
  useEffect(() => {
    if (!mapRouteFocusId) return;
    const option = options.find(o => o.id === mapRouteFocusId);
    if (option) {
      setTab(option.phase);
      setCompare(false);
      selectOption(option.phase, option.id);
    }
    setMapRouteFocusId(null);
  }, [mapRouteFocusId, options, selectOption, setMapRouteFocusId]);

  // Location chip in the itinerary: open that place on a route that includes it.
  useEffect(() => {
    if (!activeDestinationId || !mapReady) return;
    const point = SCENARIOS.flatMap(s => s.stops.map(st => pointById(st.pointId)!)).find(p => p.destinationId === activeDestinationId);
    setActiveDestinationId(null);
    if (!point) return;
    const preferred = ['base', selectedOptionIds.thanksgiving, selectedOptionIds.december];
    const scenario = [...preferred.map(id => scenarioById(id)!), ...SCENARIOS].find(s => s.stops.some(st => st.pointId === point.id));
    if (scenario) {
      const option = options.find(o => o.id === scenario.id);
      setCompare(false);
      if (option) {
        setTab(option.phase);
        selectOption(option.phase, option.id);
      } else {
        setTab('base');
      }
    }
    window.setTimeout(() => openPoint(point.id), 350);
  }, [activeDestinationId, mapReady]); // eslint-disable-line react-hooks/exhaustive-deps

  const onLegClick = (key: string) => {
    const [scenarioId, , day] = key.split('|');
    if (compare) {
      const option = options.find(o => o.id === scenarioId);
      if (option) pickOption(option.phase, option.id);
      return;
    }
    setSelectedPointId(null);
    focusDay(Number(day));
    if (!isDesktop) setSnap(s => (s === 'peek' ? 'half' : s));
  };

  // ── Sheet content ──────────────────────────────────────────────
  const selectedPoint = selectedPointId ? pointById(selectedPointId) : null;
  const scenarioTitle = (scenarioId: string) => {
    if (scenarioId === 'base') return tr('Llegada, semana en casa y despedida', 'Arrival, home week & farewell');
    const option = options.find(o => o.id === scenarioId)!;
    const phase = option.phase === 'thanksgiving' ? 'Thanksgiving' : tr('Diciembre', 'December');
    return `${phase} · ${optionLabel(option, options, es)} · ${es ? option.shortTitle : option.shortTitleEn}`;
  };
  const contexts: StopContext[] = selectedPoint
    ? views.flatMap(v => v.stops.filter(s => s.pointId === selectedPoint.id).map(stop => ({
      stop, scenarioLabel: scenarioTitle(v.scenario.id), itinerary: itineraryFor(v.scenario.id),
    })))
    : [];

  const singleOption = single ? options.find(o => o.id === single.scenario.id) : undefined;

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
          {singleOption ? `${singleOption.phase === 'thanksgiving' ? 'Thanksgiving' : tr('Diciembre', 'December')} · ${optionLabel(singleOption, options, es)}` : tr('En casa', 'At home')}
        </p>
        <h3 className="text-lg font-black text-slate-900 leading-tight">
          {singleOption ? (es ? singleOption.shortTitle : singleOption.shortTitleEn) : tr('Llegada, playa, cataratas y despedida', 'Arrival, beach, waterfalls & farewell')}
        </h3>
      </div>
      <div className="flex gap-1.5 text-xs font-bold overflow-x-auto no-scrollbar -mx-4 px-4 whitespace-nowrap">
        {singleOption ? (
          <>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">📅 {singleOption.durationDays} {tr('días', 'days')}</span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🚗 ~{singleOption.metrics.totalDriveHours} h · {single.totalKm} km</span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🏨 {singleOption.metrics.lodgings} {singleOption.metrics.lodgings === 1 ? 'hotel' : tr('hoteles', 'hotels')}</span>
            <span className={`px-2 py-1 rounded-lg ${singleOption.metrics.passportsRequired ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
              🛂 {singleOption.metrics.passportsRequired ? tr('Pasaportes', 'Passports') : tr('Sin pasaportes', 'No passports')}
            </span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">🗳️ {votersByOption(singleOption.id).length}</span>
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
  ) : compare ? (
    <div className="px-4 pb-3">
      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-600">{tr('Comparar', 'Compare')}</p>
      <h3 className="text-lg font-black text-slate-900 leading-tight">
        {tab === 'thanksgiving' ? tr('Las 3 rutas de Thanksgiving', 'The 3 Thanksgiving routes') : tr('Las 3 rutas de diciembre', 'The 3 December routes')}
      </h3>
      <div className="flex flex-wrap gap-1.5 mt-1.5">
        {views.map(v => {
          const o = options.find(x => x.id === v.scenario.id)!;
          return (
            <span key={o.id} className="inline-flex items-center gap-1 text-xs font-bold text-slate-800">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: o.color }} aria-hidden />
              {es ? o.shortTitle : o.shortTitleEn}
            </span>
          );
        })}
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
  ) : compare ? (
    <CompareSummary views={views} onPick={id => pickOption(tab as VotePhase, id)} />
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
          ) : (tab === 'thanksgiving' || tab === 'december') && (
            <div className="pointer-events-auto grid grid-cols-4 gap-1 p-1 rounded-2xl bg-white/95 backdrop-blur shadow-lg border border-slate-200" role="group" aria-label={tr('Opciones', 'Options')}>
              {phaseOptions(tab).map(o => {
                const active = !compare && selectedOptionIds[tab] === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => pickOption(tab, o.id)}
                    aria-pressed={active}
                    className={`flex flex-col items-center justify-center min-h-[52px] rounded-xl px-1 leading-tight border-2 transition-colors ${
                      active ? 'text-white' : 'bg-white text-slate-900'
                    }`}
                    style={{ borderColor: active ? o.color : 'transparent', backgroundColor: active ? o.color : undefined }}
                  >
                    <span className="flex items-center gap-1 text-xs font-extrabold">
                      {!active && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: o.color }} aria-hidden />}
                      {optionLabel(o, options, es)}
                    </span>
                    <span className="text-[0.6875rem] font-semibold text-center line-clamp-2">{es ? o.shortTitle : o.shortTitleEn}</span>
                  </button>
                );
              })}
              <button
                onClick={() => { setSelectedPointId(null); setCompare(c => !c); }}
                aria-pressed={compare}
                className={`flex flex-col items-center justify-center min-h-[52px] rounded-xl px-1 leading-tight transition-colors ${
                  compare ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'
                }`}
              >
                <span className="text-base font-black" aria-hidden>⇄</span>
                <span className="text-[0.6875rem] font-bold">{tr('Comparar', 'Compare')}</span>
              </button>
            </div>
          )}
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
