import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Ballot, CostLine, DayPlan, IntermediateStop, PackingItem, PlaceItem,
  TripDestination, TripOption, UserState, VotePhase,
} from '../types/trip';
import { destinations as destinationSeeds } from '../data/destinations';
import { tripOptions } from '../data/options';
import { baseDays } from '../data/baseDays';
import { optionItineraries } from '../data/optionItineraries';
import { packingItems as packingSeeds } from '../data/packing';
import { travelerById } from '../data/travelers';

export type PackingItemView = PackingItem & { checked: boolean };
export type CostLineView = CostLine & { unitUsdEffective: number; edited: boolean };

interface TripContextType {
  destinations: TripDestination[];
  options: TripOption[];
  /** The 27 days, with option days swapped in for the currently selected options. */
  days: DayPlan[];
  daysForOption: (optionId: string) => DayPlan[];
  packingItems: PackingItemView[];

  selectedOptionIds: Record<VotePhase, string>;
  selectOption: (phase: VotePhase, optionId: string) => void;

  ballots: Record<string, Ballot>;
  me: string | null;
  setMe: (travelerId: string | null) => void;
  castVote: (travelerId: string, phase: VotePhase, optionId: string) => void;
  /** Merges ballots from a shared link; returns the names that were added or changed. */
  mergeBallots: (incoming: Record<string, Ballot>) => string[];
  votersByOption: (optionId: string) => string[];

  togglePackingItem: (id: string) => void;
  resetPackingItems: () => void;
  markAllPackingItems: () => void;

  addPlaceToVisit: (destinationId: string, place: PlaceItem) => void;
  deletePlaceToVisit: (destinationId: string, placeId: string) => void;
  addIntermediateStop: (destinationId: string, stop: IntermediateStop) => void;
  deleteIntermediateStop: (destinationId: string, stopId: string) => void;

  costLines: (option: TripOption) => CostLineView[];
  setCostOverride: (optionId: string, lineId: string, unitUsd: number | null) => void;

  activeDestinationId: string | null;
  setActiveDestinationId: (id: string | null) => void;
  mapRouteFocusId: string | null;
  setMapRouteFocusId: (id: string | null) => void;

  exportStateJson: () => string;
  importStateJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const USER_STATE_KEY = 'ixhuatan_user_state_v1';
const ME_KEY = 'ixhuatan_me';
const LEGACY_KEY_PATTERN = /^ixhuatan_trip_data_v\d+$/;

const DEFAULT_SELECTION: Record<VotePhase, string> = {
  thanksgiving: 'opt-thanksgiving-elsalvador',
  december: 'opt-december-atitlan-antigua',
};

const defaultUserState = (): UserState => ({
  version: 1,
  ballots: {},
  selectedOptionIds: { ...DEFAULT_SELECTION },
  packedIds: packingSeeds.filter(p => p.initiallyChecked).map(p => p.id),
  customPlaces: {},
  customStops: {},
  hiddenSeedIds: [],
  costOverrides: {},
});

const isObject = (v: unknown): v is Record<string, any> => typeof v === 'object' && v !== null && !Array.isArray(v);
const optionExists = (phase: VotePhase, id: unknown) =>
  typeof id === 'string' && tripOptions.some(o => o.id === id && o.phase === phase);

/** Accepts a v1 user state (or anything close) and fills gaps with defaults. */
const normalizeUserState = (raw: Record<string, any>): UserState => {
  const base = defaultUserState();
  const sel = isObject(raw.selectedOptionIds) ? raw.selectedOptionIds : {};
  return {
    version: 1,
    ballots: isObject(raw.ballots) ? raw.ballots : base.ballots,
    selectedOptionIds: {
      thanksgiving: optionExists('thanksgiving', sel.thanksgiving) ? sel.thanksgiving : base.selectedOptionIds.thanksgiving,
      december: optionExists('december', sel.december) ? sel.december : base.selectedOptionIds.december,
    },
    packedIds: Array.isArray(raw.packedIds) ? raw.packedIds : base.packedIds,
    customPlaces: isObject(raw.customPlaces) ? raw.customPlaces : {},
    customStops: isObject(raw.customStops) ? raw.customStops : {},
    hiddenSeedIds: Array.isArray(raw.hiddenSeedIds) ? raw.hiddenSeedIds : [],
    costOverrides: isObject(raw.costOverrides) ? raw.costOverrides : {},
  };
};

/**
 * The pre-v1 app persisted the whole trip (content included) under
 * ixhuatan_trip_data_vN. Keep only what the family actually did: packing
 * checks, places they added and their selections. Anonymous per-phone votes
 * can't be attributed to a person, so they are dropped.
 */
const migrateLegacyState = (legacy: Record<string, any>): UserState => {
  const state = defaultUserState();
  if (Array.isArray(legacy.packingItems)) {
    state.packedIds = legacy.packingItems.filter((p: any) => p?.checked).map((p: any) => p.id);
  }
  if (Array.isArray(legacy.destinations)) {
    for (const d of legacy.destinations) {
      const places = (d?.placesToVisit ?? []).filter((p: any) => String(p?.id).startsWith('custom-'));
      const stops = (d?.intermediateStops ?? []).filter((s: any) => String(s?.id).startsWith('custom-'));
      if (places.length) state.customPlaces[d.id] = places;
      if (stops.length) state.customStops[d.id] = stops;
    }
  }
  if (optionExists('thanksgiving', legacy.selectedThanksgivingOptionId)) {
    state.selectedOptionIds.thanksgiving = legacy.selectedThanksgivingOptionId;
  }
  if (optionExists('december', legacy.selectedDecemberOptionId)) {
    state.selectedOptionIds.december = legacy.selectedDecemberOptionId;
  }
  return state;
};

const parseAnyState = (raw: unknown): UserState | null => {
  if (!isObject(raw)) return null;
  if (raw.version === 1) return normalizeUserState(raw);
  if (Array.isArray(raw.days) || Array.isArray(raw.packingItems)) return migrateLegacyState(raw);
  return null;
};

const safeGet = (key: string): string | null => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const safeSet = (key: string, value: string | null) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* private mode or full storage: the app still works for this visit */ }
};

const legacyKeys = (): string[] => {
  try {
    return Object.keys(localStorage)
      .filter(k => LEGACY_KEY_PATTERN.test(k))
      // Newest legacy version first.
      .sort((a, b) => Number(b.split('_v')[1]) - Number(a.split('_v')[1]));
  } catch {
    return [];
  }
};

/** Read-only (React may call state initializers twice); legacy keys are purged after the first save. */
const loadUserState = (): UserState => {
  const saved = safeGet(USER_STATE_KEY);
  if (saved) {
    try {
      const parsed = parseAnyState(JSON.parse(saved));
      if (parsed) return parsed;
    } catch { /* fall through to legacy / defaults */ }
  }
  for (const key of legacyKeys()) {
    try {
      const migrated = parseAnyState(JSON.parse(safeGet(key) ?? 'null'));
      if (migrated) return migrated;
    } catch { /* try the next one */ }
  }
  return defaultUserState();
};

const sortByDay = (days: DayPlan[]) => [...days].sort((a, b) => a.dayNumber - b.dayNumber);

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>(loadUserState);
  const [me, setMeState] = useState<string | null>(() => {
    const saved = safeGet(ME_KEY);
    return saved && travelerById(saved) ? saved : null;
  });
  const [activeDestinationId, setActiveDestinationId] = useState<string | null>(null);
  const [mapRouteFocusId, setMapRouteFocusId] = useState<string | null>(null);

  // Lets mergeBallots report what changed while staying a stable callback.
  const ballotsRef = useRef(user.ballots);
  ballotsRef.current = user.ballots;

  useEffect(() => {
    safeSet(USER_STATE_KEY, JSON.stringify(user));
  }, [user]);

  // The migrated state is saved under the new key above, so old copies can go.
  useEffect(() => {
    legacyKeys().forEach(key => safeSet(key, null));
  }, []);

  const setMe = useCallback((travelerId: string | null) => {
    setMeState(travelerId);
    safeSet(ME_KEY, travelerId);
  }, []);

  const destinations = useMemo(() => {
    const hidden = new Set(user.hiddenSeedIds);
    return destinationSeeds.map(d => ({
      ...d,
      placesToVisit: [...(d.placesToVisit ?? []).filter(p => !hidden.has(p.id)), ...(user.customPlaces[d.id] ?? [])],
      intermediateStops: [...(d.intermediateStops ?? []).filter(s => !hidden.has(s.id)), ...(user.customStops[d.id] ?? [])],
    }));
  }, [user.customPlaces, user.customStops, user.hiddenSeedIds]);

  const days = useMemo(
    () => sortByDay([
      ...baseDays,
      ...(optionItineraries[user.selectedOptionIds.thanksgiving] ?? []),
      ...(optionItineraries[user.selectedOptionIds.december] ?? []),
    ]),
    [user.selectedOptionIds],
  );

  const daysForOption = useCallback((optionId: string) => optionItineraries[optionId] ?? [], []);

  const packingItems = useMemo(() => {
    const packed = new Set(user.packedIds);
    return packingSeeds.map(p => ({ ...p, checked: packed.has(p.id) }));
  }, [user.packedIds]);

  const selectOption = useCallback((phase: VotePhase, optionId: string) => {
    setUser(prev => ({ ...prev, selectedOptionIds: { ...prev.selectedOptionIds, [phase]: optionId } }));
  }, []);

  const castVote = useCallback((travelerId: string, phase: VotePhase, optionId: string) => {
    setUser(prev => {
      const current = prev.ballots[travelerId] ?? {};
      const next: Ballot = { ...current };
      if (current[phase] === optionId) delete next[phase];
      else next[phase] = optionId;
      return { ...prev, ballots: { ...prev.ballots, [travelerId]: next } };
    });
  }, []);

  const mergeBallots = useCallback((incoming: Record<string, Ballot>) => {
    const current = ballotsRef.current;
    const changed = Object.entries(incoming)
      .filter(([id, ballot]) => JSON.stringify({ ...current[id], ...ballot }) !== JSON.stringify(current[id] ?? {}))
      .map(([id]) => travelerById(id)?.name ?? id);
    setUser(prev => {
      const ballots = { ...prev.ballots };
      for (const [id, ballot] of Object.entries(incoming)) {
        ballots[id] = { ...ballots[id], ...ballot };
      }
      return { ...prev, ballots };
    });
    return changed;
  }, []);

  const votersByOption = useCallback((optionId: string) => {
    const option = tripOptions.find(o => o.id === optionId);
    if (!option) return [];
    return Object.entries(user.ballots)
      .filter(([, b]) => b[option.phase] === optionId)
      .map(([id]) => id);
  }, [user.ballots]);

  const togglePackingItem = useCallback((id: string) => {
    setUser(prev => ({
      ...prev,
      packedIds: prev.packedIds.includes(id) ? prev.packedIds.filter(p => p !== id) : [...prev.packedIds, id],
    }));
  }, []);

  const resetPackingItems = useCallback(() => setUser(prev => ({ ...prev, packedIds: [] })), []);
  const markAllPackingItems = useCallback(() => setUser(prev => ({ ...prev, packedIds: packingSeeds.map(p => p.id) })), []);

  const isSeeded = (destinationId: string, itemId: string, key: 'placesToVisit' | 'intermediateStops') =>
    !!destinationSeeds.find(d => d.id === destinationId)?.[key]?.some(i => i.id === itemId);

  const addPlaceToVisit = useCallback((destinationId: string, place: PlaceItem) => {
    setUser(prev => ({
      ...prev,
      customPlaces: { ...prev.customPlaces, [destinationId]: [...(prev.customPlaces[destinationId] ?? []), place] },
    }));
  }, []);

  const deletePlaceToVisit = useCallback((destinationId: string, placeId: string) => {
    setUser(prev => isSeeded(destinationId, placeId, 'placesToVisit')
      ? { ...prev, hiddenSeedIds: [...prev.hiddenSeedIds, placeId] }
      : { ...prev, customPlaces: { ...prev.customPlaces, [destinationId]: (prev.customPlaces[destinationId] ?? []).filter(p => p.id !== placeId) } });
  }, []);

  const addIntermediateStop = useCallback((destinationId: string, stop: IntermediateStop) => {
    setUser(prev => ({
      ...prev,
      customStops: { ...prev.customStops, [destinationId]: [...(prev.customStops[destinationId] ?? []), stop] },
    }));
  }, []);

  const deleteIntermediateStop = useCallback((destinationId: string, stopId: string) => {
    setUser(prev => isSeeded(destinationId, stopId, 'intermediateStops')
      ? { ...prev, hiddenSeedIds: [...prev.hiddenSeedIds, stopId] }
      : { ...prev, customStops: { ...prev.customStops, [destinationId]: (prev.customStops[destinationId] ?? []).filter(s => s.id !== stopId) } });
  }, []);

  const costLines = useCallback((option: TripOption): CostLineView[] =>
    option.costs.map(line => {
      const override = user.costOverrides[`${option.id}:${line.id}`];
      return { ...line, unitUsdEffective: override ?? line.unitUsd, edited: override !== undefined };
    }), [user.costOverrides]);

  const setCostOverride = useCallback((optionId: string, lineId: string, unitUsd: number | null) => {
    setUser(prev => {
      const costOverrides = { ...prev.costOverrides };
      const key = `${optionId}:${lineId}`;
      if (unitUsd === null || Number.isNaN(unitUsd)) delete costOverrides[key];
      else costOverrides[key] = unitUsd;
      return { ...prev, costOverrides };
    });
  }, []);

  const exportStateJson = useCallback(() => JSON.stringify(user, null, 2), [user]);

  const importStateJson = useCallback((jsonString: string): boolean => {
    try {
      const parsed = parseAnyState(JSON.parse(jsonString));
      if (!parsed) return false;
      setUser(parsed);
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetToDefaults = useCallback(() => setUser(defaultUserState()), []);

  const value = useMemo<TripContextType>(() => ({
    destinations,
    options: tripOptions,
    days,
    daysForOption,
    packingItems,
    selectedOptionIds: user.selectedOptionIds,
    selectOption,
    ballots: user.ballots,
    me,
    setMe,
    castVote,
    mergeBallots,
    votersByOption,
    togglePackingItem,
    resetPackingItems,
    markAllPackingItems,
    addPlaceToVisit,
    deletePlaceToVisit,
    addIntermediateStop,
    deleteIntermediateStop,
    costLines,
    setCostOverride,
    activeDestinationId,
    setActiveDestinationId,
    mapRouteFocusId,
    setMapRouteFocusId,
    exportStateJson,
    importStateJson,
    resetToDefaults,
  }), [
    destinations, days, daysForOption, packingItems, user.selectedOptionIds, selectOption, user.ballots, me, setMe,
    castVote, mergeBallots, votersByOption, togglePackingItem, resetPackingItems, markAllPackingItems,
    addPlaceToVisit, deletePlaceToVisit, addIntermediateStop, deleteIntermediateStop, costLines, setCostOverride,
    activeDestinationId, mapRouteFocusId, exportStateJson, importStateJson, resetToDefaults,
  ]);

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
