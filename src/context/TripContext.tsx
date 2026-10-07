import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TripDataState, TripDestination, DayPlan, PlaceItem, IntermediateStop } from '../types/trip';
import { initialTripState, initialDestinations } from '../data/initialData';

interface TripContextType {
  state: TripDataState;
  activeDestinationId: string | null;
  setActiveDestinationId: (id: string | null) => void;
  selectedThanksgivingOptionId: string;
  setSelectedThanksgivingOptionId: (id: string) => void;
  selectedDecemberOptionId: string;
  setSelectedDecemberOptionId: (id: string) => void;
  voteForOption: (optionId: string) => void;
  togglePackingItem: (id: string) => void;
  resetPackingItems: () => void;
  markAllPackingItems: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  updateDestination: (destination: TripDestination) => void;
  addPlaceToVisit: (destinationId: string, place: PlaceItem) => void;
  deletePlaceToVisit: (destinationId: string, placeId: string) => void;
  addIntermediateStop: (destinationId: string, stop: IntermediateStop) => void;
  deleteIntermediateStop: (destinationId: string, stopId: string) => void;
  updateDayPlan: (day: DayPlan) => void;
  exportStateJson: () => string;
  importStateJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'ixhuatan_trip_data_v11';

const sanitizeSantaMaria = (data: TripDataState): TripDataState => {
  const jsonStr = JSON.stringify(data);
  const fixedStr = jsonStr
    .replace(/San Juan Ixhuat/g, 'Santa María Ixhuat')
    .replace(/San\+Juan\+Ixhuatan/g, 'Santa+Maria+Ixhuatan');
  const sanitized = JSON.parse(fixedStr) as TripDataState;
  
  // Guarantee base destination always has Santa María Ixhuatán and sync coordinates for Los Amates
  if (sanitized.destinations) {
    sanitized.destinations = sanitized.destinations.map(d => {
      const initialD = initialDestinations.find(init => init.id === d.id);
      if (initialD) {
        if (!d.placesToVisit || d.placesToVisit.length === 0) {
          d.placesToVisit = initialD.placesToVisit;
        }
        if (!d.intermediateStops || d.intermediateStops.length === 0) {
          d.intermediateStops = initialD.intermediateStops;
        }
      }
      if (d.id === 'ixhuatan') {
        return {
          ...d,
          name: 'Santa María Ixhuatán (Base)',
          nameEn: 'Santa María Ixhuatán (Home Base)',
          googleMapsUrl: 'https://maps.google.com/?q=Santa+Maria+Ixhuatan+Santa+Rosa+Guatemala',
          wazeUrl: 'https://waze.com/ul?q=Santa+Maria+Ixhuatan'
        };
      }
      if (d.id === 'los-amates') {
        const initialAmates = initialDestinations.find(init => init.id === 'los-amates');
        if (initialAmates) {
          return {
            ...d,
            coordinates: initialAmates.coordinates,
            googleMapsUrl: initialAmates.googleMapsUrl,
            wazeUrl: initialAmates.wazeUrl,
            roadQuality: initialAmates.roadQuality,
            region: initialAmates.region,
            regionEn: initialAmates.regionEn,
          };
        }
      }
      return d;
    });
  }

  // Guarantee options have crewSummary, destinations & all latest options merged
  if (sanitized.options) {
    const existingIds = new Set(sanitized.options.map(o => o.id));
    initialTripState.options.forEach(initOpt => {
      if (!existingIds.has(initOpt.id)) {
        sanitized.options.push(initOpt);
      }
    });

    sanitized.options = sanitized.options.map(opt => {
      const initOpt = initialTripState.options.find(o => o.id === opt.id);
      if (initOpt) {
        return {
          ...opt,
          crewSummary: initOpt.crewSummary,
          crewSummaryEn: initOpt.crewSummaryEn,
          seniorNotes: initOpt.seniorNotes,
          seniorNotesEn: initOpt.seniorNotesEn,
          title: initOpt.title,
          titleEn: initOpt.titleEn,
          tagline: initOpt.tagline,
          taglineEn: initOpt.taglineEn,
          pros: initOpt.pros,
          prosEn: initOpt.prosEn,
          considerations: initOpt.considerations,
          considerationsEn: initOpt.considerationsEn,
          destinations: initOpt.destinations,
        };
      }
      return opt;
    });
  }

  // Guarantee days reflect latest activities for days 19 and 23
  if (sanitized.days) {
    sanitized.days = sanitized.days.map(d => {
      const initD = initialTripState.days.find(initDay => initDay.id === d.id);
      if (initD && (d.id === 'day-19' || d.id === 'day-23')) {
        return {
          ...d,
          activities: initD.activities
        };
      }
      return d;
    });
  }

  return sanitized;
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TripDataState>(() => {
    try {
      // Purge all legacy localStorage keys to eradicate old cached strings
      ['ixhuatan_trip_data_v1', 'ixhuatan_trip_data_v2', 'ixhuatan_trip_data_v3', 'ixhuatan_trip_data_v4', 'ixhuatan_trip_data_v5', 'ixhuatan_trip_data_v6', 'ixhuatan_trip_data_v7', 'ixhuatan_trip_data_v8', 'ixhuatan_trip_data_v9', 'ixhuatan_trip_data_v10'].forEach(key => {
        try { localStorage.removeItem(key); } catch {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return sanitizeSantaMaria(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to parse saved trip state, using initial', e);
    }
    return sanitizeSantaMaria(initialTripState);
  });

  const [activeDestinationId, setActiveDestinationId] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save trip state to localStorage', e);
    }
  }, [state]);

  const setSelectedThanksgivingOptionId = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedThanksgivingOptionId: id
    }));
  };

  const setSelectedDecemberOptionId = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedDecemberOptionId: id
    }));
  };

  const voteForOption = (optionId: string) => {
    const hasVoted = !!state.userVotes[optionId];
    
    // Trigger celebratory confetti when voting
    if (!hasVoted) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if confetti blocked
      }
    }

    setState(prev => {
      const newVotes = { ...prev.userVotes, [optionId]: !hasVoted };
      const newOptions = prev.options.map(opt => {
        if (opt.id === optionId) {
          return {
            ...opt,
            votes: hasVoted ? Math.max(0, opt.votes - 1) : opt.votes + 1
          };
        }
        return opt;
      });
      return {
        ...prev,
        options: newOptions,
        userVotes: newVotes
      };
    });
  };

  const togglePackingItem = (id: string) => {
    setState(prev => ({
      ...prev,
      packingItems: prev.packingItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const resetPackingItems = () => {
    setState(prev => ({
      ...prev,
      packingItems: prev.packingItems.map(item => ({ ...item, checked: false }))
    }));
  };

  const markAllPackingItems = () => {
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
    setState(prev => ({
      ...prev,
      packingItems: prev.packingItems.map(item => ({ ...item, checked: true }))
    }));
  };

  const updateDestination = (destination: TripDestination) => {
    setState(prev => ({
      ...prev,
      destinations: prev.destinations.map(d => (d.id === destination.id ? destination : d))
    }));
  };

  const addPlaceToVisit = (destinationId: string, place: PlaceItem) => {
    setState(prev => ({
      ...prev,
      destinations: prev.destinations.map(d => {
        if (d.id === destinationId) {
          return {
            ...d,
            placesToVisit: [...(d.placesToVisit || []), place]
          };
        }
        return d;
      })
    }));
  };

  const deletePlaceToVisit = (destinationId: string, placeId: string) => {
    setState(prev => ({
      ...prev,
      destinations: prev.destinations.map(d => {
        if (d.id === destinationId) {
          return {
            ...d,
            placesToVisit: (d.placesToVisit || []).filter(p => p.id !== placeId)
          };
        }
        return d;
      })
    }));
  };

  const addIntermediateStop = (destinationId: string, stop: IntermediateStop) => {
    setState(prev => ({
      ...prev,
      destinations: prev.destinations.map(d => {
        if (d.id === destinationId) {
          return {
            ...d,
            intermediateStops: [...(d.intermediateStops || []), stop]
          };
        }
        return d;
      })
    }));
  };

  const deleteIntermediateStop = (destinationId: string, stopId: string) => {
    setState(prev => ({
      ...prev,
      destinations: prev.destinations.map(d => {
        if (d.id === destinationId) {
          return {
            ...d,
            intermediateStops: (d.intermediateStops || []).filter(s => s.id !== stopId)
          };
        }
        return d;
      })
    }));
  };

  const updateDayPlan = (day: DayPlan) => {
    setState(prev => ({
      ...prev,
      days: prev.days.map(d => (d.id === day.id ? day : d))
    }));
  };

  const exportStateJson = (): string => {
    return JSON.stringify(state, null, 2);
  };

  const importStateJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString) as TripDataState;
      if (parsed.destinations && parsed.days && parsed.options) {
        setState(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON imported', e);
    }
    return false;
  };

  const resetToDefaults = () => {
    setState(initialTripState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <TripContext.Provider
      value={{
        state,
        activeDestinationId,
        setActiveDestinationId,
        selectedThanksgivingOptionId: state.selectedThanksgivingOptionId,
        setSelectedThanksgivingOptionId,
        selectedDecemberOptionId: state.selectedDecemberOptionId,
        setSelectedDecemberOptionId,
        voteForOption,
        togglePackingItem,
        resetPackingItems,
        markAllPackingItems,
        isAdminMode,
        setIsAdminMode,
        updateDestination,
        addPlaceToVisit,
        deletePlaceToVisit,
        addIntermediateStop,
        deleteIntermediateStop,
        updateDayPlan,
        exportStateJson,
        importStateJson,
        resetToDefaults
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
