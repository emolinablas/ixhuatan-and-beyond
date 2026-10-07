import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { 
  ExternalLink, Navigation as NavIcon, Compass, Layers, Baby, Heart, 
  MapPin, Plus, Trash2, Check, Route, Info, Clock, AlertTriangle, X, ChevronRight, Sparkles, ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripDestination, PlaceItem, IntermediateStop } from '../../types/trip';

const MAP_STYLES = {
  streets: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  positron: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};

// Route geometries connecting key points with realistic intermediate highway bends
export interface RouteDefinition {
  id: string;
  name: string;
  nameEn: string;
  phase: 'pacific' | 'thanksgiving' | 'december' | 'all';
  color: string;
  lineCoordinates: [number, number][];
  totalTime: string;
  totalDistance: string;
  roadQuality: string;
  roadQualityEn: string;
  stopIds: string[];
  segments: {
    from: string;
    to: string;
    time: string;
    distance: string;
    notes: string;
    notesEn: string;
    coordinates: [number, number]; // midpoint for popup
  }[];
}

const ROUTE_DEFINITIONS: RouteDefinition[] = [
  {
    id: 'route-base-pacific',
    name: 'Escapada del Pacífico & Cascadas',
    nameEn: 'Pacific Coast & Waterfalls Route',
    phase: 'pacific',
    color: '#059669', // Emerald
    lineCoordinates: [
      [-90.2708, 14.1906], // Santa María Ixhuatán
      [-90.3800, 14.1000],
      [-90.4833, 13.8833], // Monterrico
      [-90.3800, 14.1000],
      [-90.2708, 14.1906], // Ixhuatán
      [-90.2450, 14.1200], // Descenso rural hacia Río Margaritas
      [-90.2135, 14.0515], // Cataratas Los Amates (El Salto)
      [-90.2708, 14.1906]  // Retorno Ixhuatán
    ],
    totalTime: '1h 50m a playa • 1h a cascadas',
    totalDistance: '92 km',
    roadQuality: 'Carretera asfaltada hacia playa; terracería 4x4 hacia cataratas',
    roadQualityEn: 'Paved highway toward coast; unpaved 4x4 trail to waterfall',
    stopIds: ['ixhuatan', 'monterrico', 'los-amates'],
    segments: [
      {
        from: 'Santa María Ixhuatán',
        to: 'Monterrico & El Chapetón',
        time: '1h 50m',
        distance: '92 km',
        notes: 'Descenso suave hacia el litoral del Pacífico. Vistas a cañaverales y manglares.',
        notesEn: 'Gentle descent toward Pacific coast. Views of sugarcane fields & mangroves.',
        coordinates: [-90.39, 14.02]
      },
      {
        from: 'Santa María Ixhuatán',
        to: 'Cataratas Los Amates (El Salto)',
        time: '1h 00m (4x4)',
        distance: '22 km',
        notes: 'Descenso hacia el cañón del Río Margaritas. Tramo final de terracería y cruces de río que requiere vehículo 4x4.',
        notesEn: 'Descent toward Río Margaritas canyon. Final dirt road and river crossings requiring 4x4 vehicle.',
        coordinates: [-90.23, 14.10]
      }
    ]
  },
  {
    id: 'opt-thanksgiving-elsalvador',
    name: 'Thanksgiving: Opción 1 (El Salvador)',
    nameEn: 'Thanksgiving: Option 1 (El Salvador)',
    phase: 'thanksgiving',
    color: '#ea580c', // Bright Orange
    lineCoordinates: [
      [-90.2708, 14.1906], // Santa María Ixhuatán
      [-90.1200, 14.1400], // Cuilapa / El Molino
      [-89.9800, 14.0200], // Frontera Valle Nuevo
      [-89.8486, 13.8703], // Concepción de Ataco & Termales Santa Teresa
      [-89.7000, 13.8800], // Juayúa / Apaneca
      [-89.5539, 13.8697], // Lago de Coatepeque
      [-89.7500, 13.9500],
      [-89.9800, 14.0200], // Retorno Frontera
      [-90.2708, 14.1906]  // Retorno Ixhuatán
    ],
    totalTime: '2h 15m a Ataco',
    totalDistance: '110 km',
    roadQuality: 'Carretera internacional CA-8 asfaltada y señalizada',
    roadQualityEn: 'Paved international highway CA-8 with clear signs',
    stopIds: ['ixhuatan', 'ruta-flores', 'coatepeque'],
    segments: [
      {
        from: 'Santa María Ixhuatán',
        to: 'Frontera Valle Nuevo (Las Chinamas)',
        time: '1h 30m',
        distance: '75 km',
        notes: 'Paso fronterizo ágil sobre el Río Paz. Trámite migratorio con pasaporte o DPI.',
        notesEn: 'Fast border checkpoint over Paz River. Passports or DPI national IDs required.',
        coordinates: [-90.05, 14.08]
      },
      {
        from: 'Frontera Valle Nuevo',
        to: 'Concepción de Ataco (Ruta de las Flores)',
        time: '45m',
        distance: '35 km',
        notes: 'Ascenso a la cordillera volcánica Apaneca-Ilamatepec. Clima fresco y calles con murales.',
        notesEn: 'Ascent into Apaneca volcanic range. Cool mountain breeze & colorful murals.',
        coordinates: [-89.91, 13.92]
      },
      {
        from: 'Ataco',
        to: 'Lago de Coatepeque',
        time: '50m',
        distance: '42 km',
        notes: 'Carretera escénica hacia el cráter del lago turquesa para la cena de Acción de Gracias.',
        notesEn: 'Scenic drive to volcanic crater lake for Thanksgiving celebration feast.',
        coordinates: [-89.65, 13.87]
      }
    ]
  },
  {
    id: 'opt-thanksgiving-riodulce',
    name: 'Thanksgiving: Opción 2 (Río Dulce & Chiquimula)',
    nameEn: 'Thanksgiving: Option 2 (Río Dulce & Chiquimula)',
    phase: 'thanksgiving',
    color: '#0891b2', // Cyan / Ocean
    lineCoordinates: [
      [-90.2708, 14.1906], // Santa María Ixhuatán
      [-90.0500, 14.2800],
      [-89.8000, 14.4500],
      [-89.5458, 14.7981], // Chiquimula (Grand Caporal)
      [-89.3500, 15.1500], // Zacapa / El Rancho / Los Amates
      [-89.0028, 15.6547], // Río Dulce / Hacienda Tijax
      [-88.7500, 15.8286], // Livingston (por agua)
      [-89.0028, 15.6547], // Retorno Río Dulce
      [-90.2708, 14.1906]  // Retorno Ixhuatán
    ],
    totalTime: '3.5h a Chiquimula + 2.8h a Río Dulce',
    totalDistance: '315 km',
    roadQuality: 'Carretera al Atlántico CA-9 Norte asfaltada',
    roadQualityEn: 'Atlantic Highway CA-9 North, fully paved',
    stopIds: ['ixhuatan', 'chiquimula', 'rio-dulce'],
    segments: [
      {
        from: 'Santa María Ixhuatán',
        to: 'Chiquimula (Hotel Grand Caporal)',
        time: '3h 30m',
        distance: '175 km',
        notes: 'Noche de descanso estratégico dividiendo el viaje con piscina y restaurante de carnes.',
        notesEn: 'Strategic overnight rest stop with pool, tropical gardens, and steakhouse.',
        coordinates: [-89.75, 14.62]
      },
      {
        from: 'Chiquimula',
        to: 'Río Dulce & Hacienda Tijax',
        time: '2h 45m',
        distance: '140 km',
        notes: 'Carretera hacia el Caribe pasando por el puente sobre el Río Dulce.',
        notesEn: 'Drive toward the Caribbean, crossing the towering Rio Dulce bridge into lush jungle.',
        coordinates: [-89.25, 15.40]
      },
      {
        from: 'Hacienda Tijax',
        to: 'Livingston & Cañón de Río Dulce',
        time: '1h 15m (Lancha)',
        distance: '32 km acuáticos',
        notes: 'Travesía en lancha privada entre acantilados de selva tropical virgen.',
        notesEn: 'Private boat excursion through vertical rainforest canyon gorges to the sea.',
        coordinates: [-88.88, 15.74]
      }
    ]
  },
  {
    id: 'opt-thanksgiving-hibrido',
    name: 'Thanksgiving: Opción 3 (Ruta Combinada)',
    nameEn: 'Thanksgiving: Option 3 (Hybrid Route)',
    phase: 'thanksgiving',
    color: '#8b5cf6', // Violet
    lineCoordinates: [
      [-90.2708, 14.1906],
      [-89.8486, 13.8703], // Ataco
      [-89.4500, 14.3000], // Metapán / Anguiatú
      [-89.5458, 14.7981], // Chiquimula
      [-89.0028, 15.6547], // Río Dulce
      [-90.2708, 14.1906]
    ],
    totalTime: '8h 30m acumuladas',
    totalDistance: '420 km',
    roadQuality: 'Ruta circular con mayor tiempo en carretera',
    roadQualityEn: 'Circuit route with more driving hours',
    stopIds: ['ixhuatan', 'ruta-flores', 'chiquimula', 'rio-dulce'],
    segments: [
      {
        from: 'Santa María Ixhuatán',
        to: 'Ataco ➔ Chiquimula ➔ Río Dulce',
        time: 'Múltiples tramos',
        distance: '420 km',
        notes: 'Permite conocer El Salvador y luego subir hacia el Caribe.',
        notesEn: 'Combines El Salvador mountain towns and Caribbean river waterways.',
        coordinates: [-89.65, 14.35]
      }
    ]
  },
  {
    id: 'opt-december-atitlan-antigua',
    name: 'Diciembre: Opción A (Atitlán & Antigua - Recomendada)',
    nameEn: 'December: Option A (Atitlán & Antigua - Recommended)',
    phase: 'december',
    color: '#2563eb', // Royal Blue
    lineCoordinates: [
      [-90.2708, 14.1906], // Santa María Ixhuatán
      [-90.4500, 14.3500],
      [-90.7333, 14.5586], // Antigua Guatemala
      [-90.9500, 14.6500], // Chimaltenango / Tecpán
      [-91.1000, 14.7500], // Mirador Godínez
      [-91.2000, 14.7333], // Panajachel & Lago de Atitlán
      [-91.2800, 14.6900], // San Juan La Laguna (Lancha)
      [-91.2000, 14.7333], // Retorno Panajachel
      [-90.2708, 14.1906]  // Retorno Ixhuatán
    ],
    totalTime: '2h 20m a Antigua + 2h a Atitlán',
    totalDistance: '190 km',
    roadQuality: '100% Carretera asfaltada de cuatro y dos carriles',
    roadQualityEn: '100% Paved highway, smooth and comfortable',
    stopIds: ['ixhuatan', 'antigua', 'atitlan'],
    segments: [
      {
        from: 'Santa María Ixhuatán',
        to: 'Antigua Guatemala',
        time: '2h 20m',
        distance: '108 km',
        notes: 'Ruta directa vía RN-14 evitando la congestión de la capital. Jardines de Casa Santo Domingo y Cerro de la Cruz con rampas.',
        notesEn: 'Direct scenic bypass via RN-14 avoiding city traffic. Accessible Santo Domingo & Cerro de la Cruz ramp lookouts.',
        coordinates: [-90.58, 14.44]
      },
      {
        from: 'Antigua Guatemala',
        to: 'Panajachel (Lago de Atitlán)',
        time: '2h 00m',
        distance: '82 km',
        notes: 'Paso por Tecpán y descenso panorámico por Godínez con vista a los tres volcanes.',
        notesEn: 'Pass through Tecpán and panoramic Godínez descent overlooking the 3 majestic volcanoes.',
        coordinates: [-90.98, 14.66]
      },
      {
        from: 'Panajachel',
        to: 'San Juan La Laguna (Por Lancha)',
        time: '25m (Lancha)',
        distance: '12 km acuáticos',
        notes: 'Paseo en lancha privada matutina por aguas en calma. Cooperativas de tejedoras y chocolate.',
        notesEn: 'Calm morning private boat ride. Mayan women weaving cooperative & artisanal cacao.',
        coordinates: [-91.24, 14.71]
      }
    ]
  },
  {
    id: 'opt-december-semuc-antigua',
    name: 'Diciembre: Opción B (Semuc Champey & Cobán)',
    nameEn: 'December: Option B (Semuc Champey & Cobán)',
    phase: 'december',
    color: '#dc2626', // Red
    lineCoordinates: [
      [-90.2708, 14.1906], // Santa María Ixhuatán
      [-90.3800, 14.3500], // Cuilapa / Barberena
      [-90.3500, 14.6500], // Bypass CA-9 Norte Atlántico (sin entrar a Ciudad de Guatemala / Aeropuerto)
      [-90.0500, 14.9000], // El Rancho / Guastatoya
      [-90.2500, 15.2500], // Sierra de las Minas / Purulhá
      [-90.3708, 15.4708], // Cobán
      [-89.9622, 15.5342], // Semuc Champey & Lanquín
      [-90.3708, 15.4708], // Retorno Cobán
      [-90.0500, 14.9000], // Retorno El Rancho
      [-90.3500, 14.6500],
      [-90.2708, 14.1906]  // Retorno Santa María Ixhuatán
    ],
    totalTime: '7h 30m de trayecto',
    totalDistance: '340 km',
    roadQuality: 'Carretera con muchas curvas y tramo final de terracería en pick-up 4x4',
    roadQualityEn: 'Winding mountain curves & rough unpaved 4x4 pickup final stretch',
    stopIds: ['ixhuatan', 'semuc'],
    segments: [
      {
        from: 'Santa María Ixhuatán',
        to: 'Cobán (Alta Verapaz)',
        time: '5h 30m',
        distance: '240 km',
        notes: 'Carretera al Atlántico subiendo a través de la Sierra de las Minas y el bosque nuboso.',
        notesEn: 'Highway climbing into Sierra de las Minas and high altitude cloud forest.',
        coordinates: [-90.30, 15.15]
      },
      {
        from: 'Cobán',
        to: 'Semuc Champey & Lanquín',
        time: '2h 00m',
        distance: '65 km (4x4)',
        notes: 'Tramo de curvas pronunciadas y terracería empinada en pick-up 4x4 hasta las pozas turquesas.',
        notesEn: 'Steep gravel road with bumpy 4x4 ride down into the limestone river valley.',
        coordinates: [-90.15, 15.50]
      }
    ]
  },
  {
    id: 'opt-december-hibrido',
    name: 'Diciembre: Opción C (Híbrido: Atitlán & Semuc Champey)',
    nameEn: 'December: Option C (Hybrid: Atitlán & Semuc Champey)',
    phase: 'december',
    color: '#9333ea', // Purple
    lineCoordinates: [
      [-90.2708, 14.1906], // Santa María Ixhuatán
      [-90.4500, 14.3500],
      [-90.7333, 14.5586], // Antigua Guatemala
      [-90.9500, 14.6500], // Tecpán / Chimaltenango
      [-91.2000, 14.7333], // Panajachel / Lago de Atitlán
      [-90.9500, 14.6500], // Retorno Chimaltenango
      [-90.3500, 14.6500], // CA-9 Norte Atlántico bypass
      [-90.0500, 14.9000], // El Rancho
      [-90.2500, 15.2500], // Purulhá
      [-90.3708, 15.4708], // Cobán
      [-89.9622, 15.5342], // Semuc Champey & Lanquín
      [-90.3708, 15.4708], // Retorno Cobán
      [-90.0500, 14.9000], // El Rancho
      [-90.3500, 14.6500],
      [-90.2708, 14.1906]  // Retorno Santa María Ixhuatán
    ],
    totalTime: '13h 30m acumuladas de carretera',
    totalDistance: '620 km',
    roadQuality: 'Combinación de autopistas asfaltadas, curvas de montaña y terracería 4x4',
    roadQualityEn: 'Mix of smooth highways, winding mountain curves, and bumpy 4x4 dirt trails',
    stopIds: ['ixhuatan', 'antigua', 'atitlan', 'semuc'],
    segments: [
      {
        from: 'Santa María Ixhuatán',
        to: 'Antigua Guatemala & Lago de Atitlán',
        time: '4h 15m',
        distance: '190 km',
        notes: 'Paso por Antigua Guatemala y ascenso panorámico al Lago de Atitlán con vistas a los volcanes.',
        notesEn: 'Pass through colonial Antigua and scenic ascent to Lake Atitlán volcano views.',
        coordinates: [-90.85, 14.60]
      },
      {
        from: 'Lago de Atitlán',
        to: 'Cobán (Alta Verapaz)',
        time: '5h 30m',
        distance: '240 km',
        notes: 'Travesía transversal cruzando hacia el norte por El Rancho y los bosques nubosos de Purulhá.',
        notesEn: 'Cross-country journey heading north via El Rancho and Purulhá cloud forests.',
        coordinates: [-90.50, 15.05]
      },
      {
        from: 'Cobán',
        to: 'Semuc Champey & Lanquín',
        time: '2h 00m',
        distance: '65 km (4x4)',
        notes: 'Descenso en pick-up 4x4 por camino empinado de terracería hacia las pozas turquesas.',
        notesEn: 'Bumpy 4x4 pickup ride down steep gravel road to limestone turquoise pools.',
        coordinates: [-90.15, 15.50]
      },
      {
        from: 'Semuc Champey',
        to: 'Santa María Ixhuatán (Retorno)',
        time: '6h 45m',
        distance: '335 km',
        notes: 'Retorno seguro hacia el sur por la Carretera al Atlántico CA-9 Norte hacia Santa Rosa.',
        notesEn: 'Direct return drive south via CA-9 North highway back down to Santa Rosa.',
        coordinates: [-90.20, 14.80]
      }
    ]
  }
];

export const InteractiveMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ [id: string]: maplibregl.Marker }>({});

  const { language, t } = useLanguage();
  const { 
    state, 
    activeDestinationId, 
    setActiveDestinationId,
    addPlaceToVisit,
    deletePlaceToVisit,
    addIntermediateStop,
    deleteIntermediateStop
  } = useTrip();

  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedDest, setSelectedDest] = useState<TripDestination>(() => {
    return state.destinations.find(d => d.id === 'ixhuatan') || state.destinations[0];
  });
  const [currentStyle, setCurrentStyle] = useState<'streets' | 'positron'>('streets');
  
  // Selected Route Filter (Requirement 1: Filter by route options)
  const [activeRouteFilter, setActiveRouteFilter] = useState<string>('all');
  const activeRouteDef = ROUTE_DEFINITIONS.find(r => r.id === activeRouteFilter);
  
  // Dual-mode panel: 'route_overview' (shows sequence of stops for route) vs 'destination_detail' (shows single destination)
  const [panelViewMode, setPanelViewMode] = useState<'route_overview' | 'destination_detail'>('route_overview');

  // Active clicked route segment bubble (Requirement 2: Route info bubbles)
  const [activeSegmentBubble, setActiveSegmentBubble] = useState<{
    from: string;
    to: string;
    time: string;
    distance: string;
    notes: string;
    notesEn: string;
    roadQuality: string;
    roadQualityEn: string;
  } | null>(null);

  // Side Drawer Tabs: 'places' | 'intermediates' | 'info' (Requirement 3: Places & intermediates)
  const [sideTab, setSideTab] = useState<'places' | 'intermediates' | 'info'>('places');

  // Form states for adding custom places/stops directly from the map
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceDesc, setNewPlaceDesc] = useState('');
  const [newPlaceUrl, setNewPlaceUrl] = useState('');

  const [showAddStopModal, setShowAddStopModal] = useState(false);
  const [newStopName, setNewStopName] = useState('');
  const [newStopBadge, setNewStopBadge] = useState('');
  const [newStopDesc, setNewStopDesc] = useState('');
  const [newStopUrl, setNewStopUrl] = useState('');

  // Keep selectedDest in sync with state updates
  useEffect(() => {
    if (selectedDest) {
      const updated = state.destinations.find(d => d.id === selectedDest.id);
      if (updated) setSelectedDest(updated);
    }
  }, [state.destinations]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initializedMap = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLES[currentStyle],
      center: [-90.2708, 14.1906], // Santa María Ixhuatán base
      zoom: 8.5,
      pitch: 30,
      bearing: 0,
      attributionControl: false
    });

    initializedMap.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    initializedMap.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    initializedMap.on('load', () => {
      setMapLoaded(true);
    });

    map.current = initializedMap;

    return () => {
      initializedMap.remove();
      map.current = null;
    };
  }, []);

  // Update Markers on map
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Determine which destinations should be shown or emphasized
    const activeRouteDef = ROUTE_DEFINITIONS.find(r => r.id === activeRouteFilter);

    state.destinations.forEach(dest => {
      const isBase = dest.id === 'ixhuatan';
      const isAirport = dest.id === 'aeropuerto';

      // Check if this destination belongs to current active filter
      let isDimmed = false;
      if (activeRouteDef && activeRouteFilter !== 'all') {
        if (activeRouteFilter === 'opt-thanksgiving-elsalvador') {
          isDimmed = !['ixhuatan', 'ruta-flores', 'coatepeque'].includes(dest.id);
        } else if (activeRouteFilter === 'opt-thanksgiving-riodulce') {
          isDimmed = !['ixhuatan', 'chiquimula', 'rio-dulce'].includes(dest.id);
        } else if (activeRouteFilter === 'opt-thanksgiving-hibrido') {
          isDimmed = !['ixhuatan', 'ruta-flores', 'chiquimula', 'rio-dulce'].includes(dest.id);
        } else if (activeRouteFilter === 'opt-december-atitlan-antigua') {
          isDimmed = !['ixhuatan', 'antigua', 'atitlan'].includes(dest.id);
        } else if (activeRouteFilter === 'opt-december-semuc-antigua') {
          isDimmed = !['ixhuatan', 'semuc'].includes(dest.id);
        } else if (activeRouteFilter === 'opt-december-hibrido') {
          isDimmed = !['ixhuatan', 'antigua', 'atitlan', 'semuc'].includes(dest.id);
        } else if (activeRouteFilter === 'route-base-pacific') {
          isDimmed = !['ixhuatan', 'monterrico', 'los-amates', 'aeropuerto'].includes(dest.id);
        }
      }

      // Custom marker element
      const el = document.createElement('div');
      el.className = `group cursor-pointer transition-all duration-300 ${isDimmed ? 'opacity-40 scale-75' : 'opacity-100 scale-100'}`;
      
      const pin = document.createElement('div');
      pin.className = `flex items-center justify-center rounded-2xl shadow-xl transition-all duration-300 transform group-hover:scale-125 ${
        isBase
          ? 'w-12 h-12 bg-emerald-600 text-white ring-4 ring-emerald-300 marker-pulse'
          : isAirport
          ? 'w-10 h-10 bg-amber-500 text-white ring-4 ring-amber-200'
          : 'w-10 h-10 bg-teal-800 text-white ring-2 ring-white hover:bg-emerald-600'
      }`;

      // Marker Icon
      let icon = '📍';
      if (isBase) icon = '🏡';
      else if (isAirport) icon = '✈️';
      else if (dest.climate === 'tropical_beach') icon = '🏖️';
      else if (dest.id === 'los-amates') icon = '💦';
      else if (dest.id === 'atitlan') icon = '🌋';
      else if (dest.id === 'antigua') icon = '🏛️';
      else if (dest.id === 'rio-dulce') icon = '🚤';
      else if (dest.id === 'coatepeque') icon = '🌊';
      else if (dest.id === 'ruta-flores') icon = '🌺';
      else if (dest.id === 'chiquimula') icon = '🥩';
      else if (dest.id === 'semuc') icon = '🌿';

      pin.innerHTML = `<span style="font-size: 18px;">${icon}</span>`;
      el.appendChild(pin);

      // Marker Label tooltip
      const label = document.createElement('div');
      label.className = 'absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-[11px] font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20';
      label.innerText = language === 'es' ? dest.name : dest.nameEn;
      el.appendChild(label);

      el.addEventListener('click', () => {
        setSelectedDest(dest);
        setActiveDestinationId(dest.id);
        setPanelViewMode('destination_detail');
        flyToDestination(dest);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(dest.coordinates)
        .addTo(map.current!);

      markersRef.current[dest.id] = marker;
    });
  }, [mapLoaded, state.destinations, language, activeRouteFilter]);

  // Update Route Polyline Layers on Map (Requirement 2: Colored route lines & bubbles)
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Filter routes to display
    const routesToDisplay = activeRouteFilter === 'all'
      ? ROUTE_DEFINITIONS
      : ROUTE_DEFINITIONS.filter(r => r.id === activeRouteFilter);

    const geojsonData: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
      type: 'FeatureCollection',
      features: routesToDisplay.map(route => ({
        type: 'Feature',
        properties: {
          id: route.id,
          name: route.name,
          color: route.color,
          totalTime: route.totalTime,
          totalDistance: route.totalDistance,
          roadQuality: route.roadQuality,
          roadQualityEn: route.roadQualityEn,
        },
        geometry: {
          type: 'LineString',
          coordinates: route.lineCoordinates
        }
      }))
    };

    if (map.current.getSource('routes-source')) {
      (map.current.getSource('routes-source') as maplibregl.GeoJSONSource).setData(geojsonData);
    } else {
      map.current.addSource('routes-source', {
        type: 'geojson',
        data: geojsonData
      });

      // White outline glow
      map.current.addLayer({
        id: 'routes-casing',
        type: 'line',
        source: 'routes-source',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#ffffff',
          'line-width': 8,
          'line-opacity': 0.85
        }
      });

      // Vibrant colored line
      map.current.addLayer({
        id: 'routes-line',
        type: 'line',
        source: 'routes-source',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 4.5,
          'line-opacity': 0.95
        }
      });

      // Click on route line to show info bubble
      map.current.on('click', 'routes-line', (e) => {
        if (!e.features || !e.features[0]) return;
        const feat = e.features[0];
        const routeId = feat.properties.id;
        const routeDef = ROUTE_DEFINITIONS.find(r => r.id === routeId);
        if (routeDef && routeDef.segments.length > 0) {
          const firstSeg = routeDef.segments[0];
          setActiveSegmentBubble({
            from: firstSeg.from,
            to: firstSeg.to,
            time: routeDef.totalTime,
            distance: routeDef.totalDistance,
            notes: firstSeg.notes,
            notesEn: firstSeg.notesEn,
            roadQuality: routeDef.roadQuality,
            roadQualityEn: routeDef.roadQualityEn
          });
        }
      });

      map.current.on('mouseenter', 'routes-line', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'routes-line', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    }

    // Auto fit map view if a specific route is selected
    if (activeRouteFilter !== 'all' && routesToDisplay.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      routesToDisplay[0].lineCoordinates.forEach(coord => bounds.extend(coord));
      map.current.fitBounds(bounds, { padding: 80, maxZoom: 10, pitch: 35, speed: 1.2 });
    }
  }, [mapLoaded, activeRouteFilter]);

  // When activeDestinationId changes from outside
  useEffect(() => {
    if (!activeDestinationId) return;
    const found = state.destinations.find(d => d.id === activeDestinationId);
    if (found) {
      setSelectedDest(found);
      setPanelViewMode('destination_detail');
      flyToDestination(found);
    }
  }, [activeDestinationId]);

  const flyToDestination = (dest: TripDestination) => {
    if (!map.current) return;
    map.current.flyTo({
      center: dest.coordinates,
      zoom: 11.5,
      pitch: 45,
      speed: 1.1,
      curve: 1.3,
      essential: true
    });
  };

  const handleSelectRouteFilter = (filterId: string) => {
    setActiveRouteFilter(filterId);
    setPanelViewMode('route_overview');
    setActiveSegmentBubble(null);

    // Sync selectedDest to first stop in the route for coherence
    const routeDef = ROUTE_DEFINITIONS.find(r => r.id === filterId);
    if (routeDef && routeDef.stopIds.length > 0) {
      const candidateStopId = routeDef.stopIds[1] || routeDef.stopIds[0];
      const candidateStop = state.destinations.find(d => d.id === candidateStopId);
      if (candidateStop) {
        setSelectedDest(candidateStop);
      }
    }
  };

  const handleOpenDestinationDetail = (dest: TripDestination) => {
    setSelectedDest(dest);
    setActiveDestinationId(dest.id);
    setPanelViewMode('destination_detail');
    flyToDestination(dest);
  };

  const fitAllBounds = () => {
    if (!map.current || state.destinations.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    state.destinations.forEach(dest => bounds.extend(dest.coordinates));
    map.current.fitBounds(bounds, { padding: 60, maxZoom: 10, pitch: 20 });
    setActiveRouteFilter('all');
    setPanelViewMode('route_overview');
    setActiveSegmentBubble(null);
  };

  const centerOnIxhuatan = () => {
    const ixhuatan = state.destinations.find(d => d.id === 'ixhuatan');
    if (ixhuatan) {
      setSelectedDest(ixhuatan);
      setPanelViewMode('destination_detail');
      flyToDestination(ixhuatan);
    }
  };

  const toggleStyle = () => {
    const next = currentStyle === 'streets' ? 'positron' : 'streets';
    setCurrentStyle(next);
    if (map.current) {
      map.current.setStyle(MAP_STYLES[next]);
      // re-trigger line source reload on style change
      setMapLoaded(false);
      setTimeout(() => setMapLoaded(true), 300);
    }
  };

  // Add Place to Visit handler
  const handleSavePlace = () => {
    if (!newPlaceName.trim() || !selectedDest) return;
    const newPlace: PlaceItem = {
      id: `custom-p-${Date.now()}`,
      name: newPlaceName.trim(),
      nameEn: newPlaceName.trim(),
      description: newPlaceDesc.trim() || (language === 'es' ? 'Lugar agregado por la familia.' : 'Place added by family.'),
      descriptionEn: newPlaceDesc.trim() || 'Place added by family.',
      googleMapsUrl: newPlaceUrl.trim() || undefined
    };
    addPlaceToVisit(selectedDest.id, newPlace);
    setNewPlaceName('');
    setNewPlaceDesc('');
    setNewPlaceUrl('');
    setShowAddPlaceModal(false);
  };

  // Add Intermediate Stop handler
  const handleSaveIntermediateStop = () => {
    if (!newStopName.trim() || !selectedDest) return;
    const newStop: IntermediateStop = {
      id: `custom-s-${Date.now()}`,
      name: newStopName.trim(),
      nameEn: newStopName.trim(),
      driveTimeBadge: newStopBadge.trim() || '⏱️ En ruta',
      description: newStopDesc.trim() || (language === 'es' ? 'Parada técnica o mirador en el camino.' : 'Rest stop on the way.'),
      descriptionEn: newStopDesc.trim() || 'Rest stop on the way.',
      googleMapsUrl: newStopUrl.trim() || undefined
    };
    addIntermediateStop(selectedDest.id, newStop);
    setNewStopName('');
    setNewStopBadge('');
    setNewStopDesc('');
    setNewStopUrl('');
    setShowAddStopModal(false);
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] min-h-[600px] bg-slate-100 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Map Canvas */}
      <div className="relative flex-1 h-full w-full">
        <div ref={mapContainer} className="w-full h-full" />

        {/* 1. TOP OVERLAY: ROUTE FILTER SELECTOR (Requirement 1) */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-col gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
            
            {/* Quick General Tools */}
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-lg border border-slate-200">
              <button
                onClick={fitAllBounds}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
                title={language === 'es' ? 'Ver toda la Ruta' : 'Full Route View'}
              >
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">{language === 'es' ? 'Toda Guate' : 'Full Map'}</span>
              </button>

              <button
                onClick={centerOnIxhuatan}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
                title="Santa María Ixhuatán"
              >
                <span>🏡</span>
                <span className="hidden sm:inline">Ixhuatán</span>
              </button>

              <button
                onClick={toggleStyle}
                className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                title={language === 'es' ? 'Cambiar estilo de mapa' : 'Toggle map style'}
              >
                <Layers className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            {/* ROUTE FILTER PILLS (Thanksgiving & December options) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200">
              <div className="text-[11px] font-extrabold text-slate-400 px-2 flex items-center gap-1">
                <Route className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">{language === 'es' ? 'Filtrar Ruta:' : 'Filter:'}</span>
              </div>

              {/* All Routes */}
              <button
                onClick={() => handleSelectRouteFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRouteFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                🌟 {language === 'es' ? 'Todas' : 'All'}
              </button>

              {/* Pacific & Waterfalls */}
              <button
                onClick={() => handleSelectRouteFilter('route-base-pacific')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRouteFilter === 'route-base-pacific'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                🏖️ {language === 'es' ? 'Playa & Cascadas' : 'Beach & Falls'}
              </button>

              {/* Thanksgiving: Option 1 El Salvador */}
              <button
                onClick={() => handleSelectRouteFilter('opt-thanksgiving-elsalvador')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRouteFilter === 'opt-thanksgiving-elsalvador'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-orange-50'
                }`}
              >
                🇸🇻 {language === 'es' ? 'Thanksgiving: El Salvador' : 'Thanksgiving: El Salvador'}
              </button>

              {/* Thanksgiving: Option 2 Río Dulce */}
              <button
                onClick={() => handleSelectRouteFilter('opt-thanksgiving-riodulce')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRouteFilter === 'opt-thanksgiving-riodulce'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-cyan-50'
                }`}
              >
                🚤 {language === 'es' ? 'Thanksgiving: Río Dulce' : 'Thanksgiving: Río Dulce'}
              </button>

              {/* Thanksgiving: Option 3 Híbrido */}
              <button
                onClick={() => handleSelectRouteFilter('opt-thanksgiving-hibrido')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRouteFilter === 'opt-thanksgiving-hibrido'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-violet-50'
                }`}
              >
                🔀 {language === 'es' ? 'Thanksgiving: Híbrido' : 'Thanksgiving: Hybrid'}
              </button>

              {/* December: Option A Atitlán & Antigua */}
              <button
                onClick={() => handleSelectRouteFilter('opt-december-atitlan-antigua')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRouteFilter === 'opt-december-atitlan-antigua'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-blue-50'
                }`}
              >
                🌋 {language === 'es' ? 'Dic: Atitlán & Antigua' : 'Dec: Atitlán & Antigua'}
              </button>

              {/* December: Option B Semuc Champey */}
              <button
                onClick={() => handleSelectRouteFilter('opt-december-semuc-antigua')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRouteFilter === 'opt-december-semuc-antigua'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-rose-50'
                }`}
              >
                🌿 {language === 'es' ? 'Dic: Semuc Champey' : 'Dec: Semuc Champey'}
              </button>

              {/* December: Option C Híbrido Atitlán & Semuc */}
              <button
                onClick={() => handleSelectRouteFilter('opt-december-hibrido')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRouteFilter === 'opt-december-hibrido'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-purple-50'
                }`}
              >
                ✨ {language === 'es' ? 'Dic: Híbrido (Atitlán + Semuc)' : 'Dec: Hybrid (Atitlán + Semuc)'}
              </button>
            </div>

          </div>
        </div>

        {/* 2. ROUTE INFORMATION BUBBLE (Requirement 2) */}
        {activeSegmentBubble && (
          <div className="absolute bottom-5 left-4 right-4 sm:left-6 sm:max-w-md z-20 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-5 shadow-2xl border border-slate-700/80">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Route className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                      {language === 'es' ? 'Detalles del Trayecto' : 'Road Segment Details'}
                    </span>
                    <h4 className="text-sm font-extrabold text-white">
                      {activeSegmentBubble.from} ➔ {activeSegmentBubble.to}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSegmentBubble(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">⏱️ {language === 'es' ? 'Tiempo estimado' : 'Drive Time'}</span>
                  <span className="font-extrabold text-emerald-300">{activeSegmentBubble.time}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">📍 {language === 'es' ? 'Distancia aprox.' : 'Distance'}</span>
                  <span className="font-extrabold text-emerald-300">{activeSegmentBubble.distance}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'es' ? activeSegmentBubble.notes : activeSegmentBubble.notesEn}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>🛣️ {language === 'es' ? activeSegmentBubble.roadQuality : activeSegmentBubble.roadQualityEn}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. SIDE PANEL: DUAL MODE (Route Sequence Overview vs Destination Details) */}
      <div className="w-full lg:w-[420px] h-[50vh] lg:h-full bg-white border-t lg:border-t-0 lg:border-l border-slate-200 shadow-2xl flex flex-col overflow-hidden z-20">
        {panelViewMode === 'route_overview' ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
            {/* Header: Active Route Summary */}
            <div className="p-4 bg-white border-b border-slate-200 shrink-0 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: activeRouteDef ? activeRouteDef.color : '#059669' }}
                  />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    {activeRouteFilter === 'all' 
                      ? (language === 'es' ? 'Itinerario Completo' : 'Complete Itinerary')
                      : (language === 'es' ? 'Opción de Ruta Activa' : 'Selected Route Option')}
                  </span>
                </div>
                {activeRouteDef && (
                  <span 
                    className="px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-sm"
                    style={{ backgroundColor: activeRouteDef.color }}
                  >
                    {activeRouteDef.phase === 'thanksgiving' 
                      ? 'Thanksgiving' 
                      : activeRouteDef.phase === 'december' 
                      ? (language === 'es' ? 'Diciembre' : 'December')
                      : (language === 'es' ? 'Costa Sur' : 'Pacific')}
                  </span>
                )}
              </div>

              <h2 className="text-base font-black text-slate-900 leading-snug">
                {activeRouteDef 
                  ? (language === 'es' ? activeRouteDef.name : activeRouteDef.nameEn)
                  : (language === 'es' ? 'Todos los Puntos del Viaje' : 'All Trip Destinations')}
              </h2>

              {activeRouteDef ? (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 font-semibold block">⏱️ {language === 'es' ? 'Tiempo total' : 'Total Time'}</span>
                    <span className="font-extrabold text-slate-800">{activeRouteDef.totalTime}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 font-semibold block">📍 {language === 'es' ? 'Distancia aprox.' : 'Approx Distance'}</span>
                    <span className="font-extrabold text-slate-800">{activeRouteDef.totalDistance}</span>
                  </div>
                  <div className="col-span-2 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/70 text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
                    <span>🛣️</span>
                    <span className="truncate">{language === 'es' ? activeRouteDef.roadQuality : activeRouteDef.roadQualityEn}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-600">
                  {language === 'es' 
                    ? '27 días en familia del 15 nov al 11 dic. Toca cualquier parada o punto en el mapa para ver sus atracciones y paradas en el camino.'
                    : '27-day family journey Nov 15 to Dec 11. Tap any stop or map pin to see attractions & road stops.'}
                </p>
              )}

              <div className="text-[11px] text-emerald-800 bg-emerald-50/90 px-3 py-1.5 rounded-xl border border-emerald-200/70 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  {language === 'es' 
                    ? 'Selecciona una parada abajo o en el mapa para ver su detalle:'
                    : 'Select a stop below or on the map to see its details:'}
                </span>
              </div>
            </div>

            {/* List of Stops and Connecting Segments */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeRouteDef ? (
                activeRouteDef.stopIds.map((stopId, idx) => {
                  const dest = state.destinations.find(d => d.id === stopId);
                  if (!dest) return null;
                  const segment = activeRouteDef.segments[idx];
                  const isBase = dest.id === 'ixhuatan';

                  return (
                    <React.Fragment key={dest.id}>
                      {/* Stop Card */}
                      <div
                        onClick={() => handleOpenDestinationDetail(dest)}
                        className="group bg-white rounded-2xl p-3 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex gap-3 items-center active:scale-[0.99]"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 shadow-sm">
                          <img 
                            src={dest.imageUrl} 
                            alt={dest.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90"
                          />
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/75 text-white text-[9px] font-black">
                            {isBase ? '🏡 BASE' : `#${idx + 1}`}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {language === 'es' ? dest.region : dest.regionEn}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                            {language === 'es' ? dest.name : dest.nameEn}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            ⏱️ {language === 'es' ? dest.stayDuration : dest.stayDurationEn}
                          </p>

                          {/* Quick Counters */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            {(dest.placesToVisit?.length || 0) > 0 && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                                📍 {dest.placesToVisit?.length} {language === 'es' ? 'lugares' : 'places'}
                              </span>
                            )}
                            {(dest.intermediateStops?.length || 0) > 0 && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                                🛣️ {dest.intermediateStops?.length} {language === 'es' ? 'en camino' : 'on way'}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Road connector badge between stops */}
                      {segment && idx < activeRouteDef.stopIds.length - 1 && (
                        <div className="px-3 py-1.5 flex items-center justify-between gap-2 text-xs bg-slate-100/90 hover:bg-slate-200/70 rounded-xl border border-slate-200/80 my-1 transition-colors">
                          <div className="flex items-center gap-1.5 text-slate-600 font-bold text-[11px]">
                            <span>🛣️</span>
                            <span>{segment.time}</span>
                            <span className="text-slate-400">•</span>
                            <span>{segment.distance}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSegmentBubble({
                                ...segment,
                                roadQuality: activeRouteDef.roadQuality,
                                roadQualityEn: activeRouteDef.roadQualityEn
                              });
                              if (map.current) {
                                map.current.flyTo({ center: segment.coordinates, zoom: 11, pitch: 35 });
                              }
                            }}
                            className="text-[10px] font-bold text-emerald-700 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-0.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <span>{language === 'es' ? 'Ver tramo' : 'View road'}</span>
                            <Route className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                /* All trip destinations overview */
                state.destinations.map((dest, idx) => {
                  const isBase = dest.id === 'ixhuatan';
                  return (
                    <div
                      key={dest.id}
                      onClick={() => handleOpenDestinationDetail(dest)}
                      className="group bg-white rounded-2xl p-3 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex gap-3 items-center active:scale-[0.99]"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 shadow-sm">
                        <img 
                          src={dest.imageUrl} 
                          alt={dest.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90"
                        />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/75 text-white text-[9px] font-black">
                          {isBase ? '🏡 BASE' : `#${idx + 1}`}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {language === 'es' ? dest.region : dest.regionEn}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                          {language === 'es' ? dest.name : dest.nameEn}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          ⏱️ {language === 'es' ? dest.stayDuration : dest.stayDurationEn}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          {(dest.placesToVisit?.length || 0) > 0 && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                              📍 {dest.placesToVisit?.length} {language === 'es' ? 'lugares' : 'places'}
                            </span>
                          )}
                          {(dest.intermediateStops?.length || 0) > 0 && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                              🛣️ {dest.intermediateStops?.length} {language === 'es' ? 'en camino' : 'on way'}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Top Back-To-Route bar */}
            <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <button
                onClick={() => setPanelViewMode('route_overview')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-100 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'es' ? '← Volver al listado de la ruta' : '← Back to route list'}</span>
              </button>
              <span className="text-[11px] font-bold text-emerald-400 truncate max-w-[170px]">
                {activeRouteDef 
                  ? (language === 'es' ? activeRouteDef.name : activeRouteDef.nameEn)
                  : (language === 'es' ? 'Itinerario general' : 'Full itinerary')}
              </span>
            </div>

            {/* Selected Destination Top Banner */}
            <div className="relative h-44 w-full shrink-0 overflow-hidden bg-slate-900">
              <img
                src={selectedDest.imageUrl}
                alt={selectedDest.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-emerald-600 text-white uppercase tracking-wider">
                  {language === 'es' ? selectedDest.region : selectedDest.regionEn}
                </span>
                <h2 className="text-xl font-black leading-snug mt-1">
                  {language === 'es' ? selectedDest.name : selectedDest.nameEn}
                </h2>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  ⏱️ {selectedDest.driveHoursFromIxhuatan > 0 ? `${selectedDest.driveHoursFromIxhuatan}h de carretera` : 'Base familiar'} • {language === 'es' ? selectedDest.stayDuration : selectedDest.stayDurationEn}
                </p>
              </div>
            </div>

            {/* Sub-Navigation Tabs in Drawer */}
            <div className="flex border-b border-slate-200 bg-slate-50/80 px-2 shrink-0">
              <button
                onClick={() => setSideTab('places')}
                className={`flex-1 py-3 px-2 text-center text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  sideTab === 'places'
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Lugares a Visitar' : 'Places to Visit'} ({selectedDest.placesToVisit?.length || 0})</span>
              </button>

              <button
                onClick={() => setSideTab('intermediates')}
                className={`flex-1 py-3 px-2 text-center text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  sideTab === 'intermediates'
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Route className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'En el Camino' : 'On the Way'} ({selectedDest.intermediateStops?.length || 0})</span>
              </button>

              <button
                onClick={() => setSideTab('info')}
                className={`py-3 px-3 text-center text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1 ${
                  sideTab === 'info'
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'es' ? 'Detalles' : 'Info'}</span>
              </button>
            </div>

            {/* Tab Content Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* TAB 1: PLACES TO VISIT AT THIS DESTINATION */}
              {sideTab === 'places' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                        📍 {language === 'es' ? 'Lugares a Visitar en este Punto' : 'Places to Visit Here'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {language === 'es' ? 'Atracciones, vistas y experiencias seleccionadas' : 'Attractions & curated experiences'}
                      </p>
                    </div>
                    
                    {/* Button to Add New Place */}
                    <button
                      onClick={() => setShowAddPlaceModal(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'es' ? 'Agregar Lugar' : 'Add Place'}</span>
                    </button>
                  </div>

                  {/* Places List */}
                  <div className="space-y-2.5">
                    {(selectedDest.placesToVisit || []).map(place => (
                      <div
                        key={place.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-sm font-extrabold text-slate-900 leading-snug">
                            {language === 'es' ? place.name : (place.nameEn || place.name)}
                          </h5>
                          <div className="flex items-center gap-1 shrink-0">
                            {place.googleMapsUrl && (
                              <a
                                href={place.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-colors"
                                title={t.viewOnGoogleMaps}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => deletePlaceToVisit(selectedDest.id, place.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Eliminar lugar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {language === 'es' ? place.description : (place.descriptionEn || place.description)}
                        </p>
                      </div>
                    ))}

                    {(!selectedDest.placesToVisit || selectedDest.placesToVisit.length === 0) && (
                      <div className="p-6 text-center text-xs text-slate-400 rounded-2xl border border-dashed border-slate-200">
                        {language === 'es' ? 'Aún no hay lugares agregados. ¡Haz clic en "+ Agregar Lugar" para sumar ideas!' : 'No places added yet. Click "+ Add Place" to add ideas!'}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: INTERMEDIATE STOPS ON THE WAY */}
              {sideTab === 'intermediates' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                        🛣️ {language === 'es' ? 'Paradas e Intermedios en Ruta' : 'Intermediate Stops On The Way'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {language === 'es' ? 'Restaurantes, miradores y desvíos recomendados' : 'Rest stops, scenic overlooks & food detours'}
                      </p>
                    </div>

                    {/* Button to Add New Intermediate Stop */}
                    <button
                      onClick={() => setShowAddStopModal(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'es' ? 'Agregar Parada' : 'Add Stop'}</span>
                    </button>
                  </div>

                  {/* Intermediate Stops List */}
                  <div className="space-y-2.5">
                    {(selectedDest.intermediateStops || []).map(stop => (
                      <div
                        key={stop.id}
                        className="p-3.5 rounded-2xl bg-teal-50/50 border border-teal-200/70 hover:border-teal-400 transition-all space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                                {stop.driveTimeBadge || '⏱️ En ruta'}
                              </span>
                            </div>
                            <h5 className="text-sm font-extrabold text-slate-900 mt-1 leading-snug">
                              {language === 'es' ? stop.name : (stop.nameEn || stop.name)}
                            </h5>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {stop.googleMapsUrl && (
                              <a
                                href={stop.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-teal-100 text-teal-800 hover:bg-teal-700 hover:text-white transition-colors"
                                title={t.viewOnGoogleMaps}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => deleteIntermediateStop(selectedDest.id, stop.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Eliminar parada"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {language === 'es' ? stop.description : (stop.descriptionEn || stop.description)}
                        </p>
                      </div>
                    ))}

                    {(!selectedDest.intermediateStops || selectedDest.intermediateStops.length === 0) && (
                      <div className="p-6 text-center text-xs text-slate-400 rounded-2xl border border-dashed border-slate-200">
                        {language === 'es' ? 'No hay paradas intermedias registradas. ¡Agrega una con "+ Agregar Parada"!' : 'No intermediate stops recorded. Add one with "+ Add Stop"!'}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: GENERAL INFO & COMFORT METRICS */}
              {sideTab === 'info' && (
                <div className="space-y-4">
                  
                  {/* Senior & Baby Comfort Indicators */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <Baby className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.babyScore}</span>
                      </span>
                      <div className="flex gap-0.5 text-amber-500 font-bold">
                        {'★'.repeat(selectedDest.babyFriendlyScore)}{'☆'.repeat(5 - selectedDest.babyFriendlyScore)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <Heart className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.seniorScore}</span>
                      </span>
                      <div className="flex gap-0.5 text-amber-500 font-bold">
                        {'★'.repeat(selectedDest.seniorFriendlyScore)}{'☆'.repeat(5 - selectedDest.seniorFriendlyScore)}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-slate-600">
                    {language === 'es' ? selectedDest.description : selectedDest.descriptionEn}
                  </p>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      ✨ {language === 'es' ? 'Imperdibles del lugar' : 'Key Highlights'}
                    </h4>
                    <ul className="space-y-1.5">
                      {(language === 'es' ? selectedDest.highlights : selectedDest.highlightsEn).map((h, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Links */}
                  <div className="pt-2 space-y-2">
                    <a
                      href={selectedDest.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{t.viewOnGoogleMaps}</span>
                    </a>

                    {selectedDest.wazeUrl && (
                      <a
                        href={selectedDest.wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <NavIcon className="w-4 h-4" />
                        <span>{t.openWaze}</span>
                      </a>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD PLACE TO VISIT */}
      {showAddPlaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                <span>📍</span>
                <span>{language === 'es' ? 'Agregar Lugar a Visitar' : 'Add Place to Visit'}</span>
              </h3>
              <button
                onClick={() => setShowAddPlaceModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              {language === 'es' 
                ? `Se agregará a ${selectedDest.name}.`
                : `Adding to ${selectedDest.nameEn}.`}
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'es' ? 'Nombre del lugar *' : 'Place Name *'}
                </label>
                <input
                  type="text"
                  value={newPlaceName}
                  onChange={e => setNewPlaceName(e.target.value)}
                  placeholder={language === 'es' ? 'ej. Restaurante Mirador El Volcán' : 'e.g. Volcano View Cafe'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'es' ? 'Descripción o qué hacer' : 'Description / Activity'}
                </label>
                <textarea
                  value={newPlaceDesc}
                  onChange={e => setNewPlaceDesc(e.target.value)}
                  rows={3}
                  placeholder={language === 'es' ? 'ej. Excelente café y comida con vista panorámica' : 'e.g. Great coffee and panoramic view'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'es' ? 'Enlace de Google Maps (Opcional)' : 'Google Maps Link (Optional)'}
                </label>
                <input
                  type="text"
                  value={newPlaceUrl}
                  onChange={e => setNewPlaceUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddPlaceModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                {language === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={handleSavePlace}
                disabled={!newPlaceName.trim()}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs shadow-md transition-all"
              >
                {language === 'es' ? 'Guardar Lugar' : 'Save Place'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD INTERMEDIATE STOP */}
      {showAddStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                <span>🛣️</span>
                <span>{language === 'es' ? 'Agregar Parada Intermedia en Ruta' : 'Add Intermediate Stop on Way'}</span>
              </h3>
              <button
                onClick={() => setShowAddStopModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              {language === 'es' 
                ? `Parada en el trayecto hacia ${selectedDest.name}.`
                : `Rest stop on route toward ${selectedDest.nameEn}.`}
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'es' ? 'Nombre de la parada / lugar *' : 'Stop Name *'}
                </label>
                <input
                  type="text"
                  value={newStopName}
                  onChange={e => setNewStopName(e.target.value)}
                  placeholder={language === 'es' ? 'ej. Restaurante El Rancho (Almuerzo)' : 'e.g. Scenic Mountain Diner'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'es' ? 'Distancia / Tiempo aproximado' : 'Approx Time / Distance'}
                </label>
                <input
                  type="text"
                  value={newStopBadge}
                  onChange={e => setNewStopBadge(e.target.value)}
                  placeholder={language === 'es' ? 'ej. ⏱️ 1h 15m en ruta' : 'e.g. ⏱️ 1h 15m on route'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'es' ? 'Descripción o qué hacer' : 'Description / Advice'}
                </label>
                <textarea
                  value={newStopDesc}
                  onChange={e => setNewStopDesc(e.target.value)}
                  rows={3}
                  placeholder={language === 'es' ? 'ej. Parada para estirar las piernas y tomar refrigerio' : 'e.g. Good stop to stretch legs and get snacks'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'es' ? 'Enlace de Google Maps (Opcional)' : 'Google Maps Link (Optional)'}
                </label>
                <input
                  type="text"
                  value={newStopUrl}
                  onChange={e => setNewStopUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddStopModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                {language === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveIntermediateStop}
                disabled={!newStopName.trim()}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs shadow-md transition-all"
              >
                {language === 'es' ? 'Guardar Parada' : 'Save Stop'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
