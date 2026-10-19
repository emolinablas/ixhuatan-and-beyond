import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  CostLine, DayPlan, IntermediateStop, PackingItem, PlaceItem,
  TripDestination, TripPhase, TripPlan, UserState,
} from '../types/trip';
import { destinations as destinationSeeds } from '../data/destinations';
import { tripPlans } from '../data/plans';
import { baseDays } from '../data/baseDays';
import { planDays } from '../data/planDays';
import { packingItems as packingSeeds } from '../data/packing';

export type PackingItemView = PackingItem & { checked: boolean };
export type CostLineView = CostLine & { unitUsdEffective: number; edited: boolean };

interface TripContextType {
  destinations: TripDestination[];
  plans: TripPlan[];
  /** All 27 days in order. */
  days: DayPlan[];
  packingItems: PackingItemView[];

  togglePackingItem: (id: string) => void;
  resetPackingItems: () => void;
  markAllPackingItems: () => void;

  addPlaceToVisit: (destinationId: string, place: PlaceItem) => void;
  deletePlaceToVisit: (destinationId: string, placeId: string) => void;
  addIntermediateStop: (destinationId: string, stop: IntermediateStop) => void;
  deleteIntermediateStop: (destinationId: string, stopId: string) => void;

  costLines: (plan: TripPlan) => CostLineView[];
  setCostOverride: (planId: string, lineId: string, unitUsd: number | null) => void;

  activeDestinationId: string | null;
  setActiveDestinationId: (id: string | null) => void;
  /** Which trip the Map tab should open on, when another tab sends people there. */
  mapFocus: TripPhase | null;
  setMapFocus: (phase: TripPhase | null) => void;

  exportStateJson: () => string;
  importStateJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const USER_STATE_KEY = 'ixhuatan_user_state_v1';
const LEGACY_KEY_PATTERN = /^ixhuatan_trip_data_v\d+$/;
// Keys from the voting era (October 2026); the plans are decided now.
const RETIRED_KEYS = ['ixhuatan_me'];

const ALL_DAYS = [...baseDays, ...planDays].sort((a, b) => a.dayNumber - b.dayNumber);

const defaultUserState = (): UserState => ({
  version: 1,
  packedIds: packingSeeds.filter(p => p.initiallyChecked).map(p => p.id),
  customPlaces: {},
  customStops: {},
  hiddenSeedIds: [],
  costOverrides: {},
});

const isObject = (v: unknown): v is Record<string, any> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Accepts a v1 user state (or anything close) and fills gaps with defaults. */
const normalizeUserState = (raw: Record<string, any>): UserState => {
  const base = defaultUserState();
  return {
    version: 1,
    packedIds: Array.isArray(raw.packedIds) ? raw.packedIds : base.packedIds,
    customPlaces: isObject(raw.customPlaces) ? raw.customPlaces : {},
    customStops: isObject(raw.customStops) ? raw.customStops : {},
    hiddenSeedIds: Array.isArray(raw.hiddenSeedIds) ? raw.hiddenSeedIds : [],
    // Quotes typed in while the options were being compared were keyed by option id;
    // only keep the ones that belong to a decided plan.
    costOverrides: isObject(raw.costOverrides)
      ? Object.fromEntries(Object.entries(raw.costOverrides).filter(([key]) => tripPlans.some(p => key.startsWith(`${p.id}:`))))
      : {},
  };
};

/**
 * The pre-v1 app persisted the whole trip (content included) under
 * ixhuatan_trip_data_vN. Keep only what the family actually did: packing
 * checks and places they added.
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

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>(loadUserState);
  const [activeDestinationId, setActiveDestinationId] = useState<string | null>(null);
  const [mapFocus, setMapFocus] = useState<TripPhase | null>(null);

  useEffect(() => {
    safeSet(USER_STATE_KEY, JSON.stringify(user));
  }, [user]);

  // The current state is saved under the new key above, so old copies can go.
  useEffect(() => {
    [...legacyKeys(), ...RETIRED_KEYS].forEach(key => safeSet(key, null));
  }, []);

  const destinations = useMemo(() => {
    const hidden = new Set(user.hiddenSeedIds);
    return destinationSeeds.map(d => ({
      ...d,
      placesToVisit: [...(d.placesToVisit ?? []).filter(p => !hidden.has(p.id)), ...(user.customPlaces[d.id] ?? [])],
      intermediateStops: [...(d.intermediateStops ?? []).filter(s => !hidden.has(s.id)), ...(user.customStops[d.id] ?? [])],
    }));
  }, [user.customPlaces, user.customStops, user.hiddenSeedIds]);

  const packingItems = useMemo(() => {
    const packed = new Set(user.packedIds);
    return packingSeeds.map(p => ({ ...p, checked: packed.has(p.id) }));
  }, [user.packedIds]);

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

  const costLines = useCallback((plan: TripPlan): CostLineView[] =>
    plan.costs.map(line => {
      const override = user.costOverrides[`${plan.id}:${line.id}`];
      return { ...line, unitUsdEffective: override ?? line.unitUsd, edited: override !== undefined };
    }), [user.costOverrides]);

  const setCostOverride = useCallback((planId: string, lineId: string, unitUsd: number | null) => {
    setUser(prev => {
      const costOverrides = { ...prev.costOverrides };
      const key = `${planId}:${lineId}`;
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
    plans: tripPlans,
    days: ALL_DAYS,
    packingItems,
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
    mapFocus,
    setMapFocus,
    exportStateJson,
    importStateJson,
    resetToDefaults,
  }), [
    destinations, packingItems, togglePackingItem, resetPackingItems, markAllPackingItems,
    addPlaceToVisit, deletePlaceToVisit, addIntermediateStop, deleteIntermediateStop, costLines, setCostOverride,
    activeDestinationId, mapFocus, exportStateJson, importStateJson, resetToDefaults,
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
