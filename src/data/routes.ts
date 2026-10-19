import { Photo, PHOTOS } from './photos';
import { LodgingStatus } from '../types/trip';

// What the Map tab draws. Every scenario (the home weeks, Thanksgiving and
// December) is a list of stops plus the legs driven or sailed on each day.
// Day numbers match the itinerary, so the map and the day-by-day agree.
//
// Road geometry is generated from these legs by scripts/build-route-geometry.mjs
// (OpenStreetMap roads via OSRM) into routeGeometry.json. Re-run it after
// changing a drive leg's from/via/to.

type Txt = [es: string, en: string];

export type PointKind = 'home' | 'airport' | 'town' | 'nature' | 'border' | 'water';

export interface MapPoint {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number]; // [lng, lat]
  emoji: string;
  kind: PointKind;
  /** Rich card (description, highlights, places) lives on the destination. */
  destinationId?: string;
  photo?: Photo;
  blurb?: Txt;
  /** Put the map label beside the pin when a neighbor would hide it. */
  labelSide?: 'below' | 'left';
  /** Shorter text for the map label when the full name is long. */
  mapLabel?: Txt;
}

export type StopRole = 'home' | 'stay' | 'visit' | 'border';

export interface ScenarioStop {
  pointId: string;
  role: StopRole;
  days: number[];
  nights?: number;
  lodging?: string;
  lodgingStatus?: LodgingStatus;
  note?: Txt;
}

export interface RouteLeg {
  day: number;
  from: string;
  to: string;
  via?: string[];
  mode: 'drive' | 'boat';
  hours: number; // one way
  roundTrip?: boolean;
  note?: Txt;
}

export type ScenarioId = 'base' | 'thanksgiving' | 'december';

export interface MapScenario {
  id: ScenarioId;
  color: string;
  stops: ScenarioStop[];
  legs: RouteLeg[];
}

export const legKey = (leg: Pick<RouteLeg, 'mode' | 'from' | 'to' | 'via'>) =>
  `${leg.mode}:${[leg.from, ...(leg.via ?? []), leg.to].join('>')}`;

export const MAP_POINTS: MapPoint[] = [
  { id: 'ixhuatan', name: 'Santa María Ixhuatán', nameEn: 'Santa María Ixhuatán', coordinates: [-90.2708, 14.1906], emoji: '🏡', kind: 'home', destinationId: 'ixhuatan' },
  { id: 'aeropuerto', name: 'Aeropuerto La Aurora', nameEn: 'La Aurora Airport', coordinates: [-90.5281, 14.5833], emoji: '✈️', kind: 'airport', destinationId: 'aeropuerto' },
  { id: 'pradera', name: 'Carretera a El Salvador', nameEn: 'Carretera a El Salvador', coordinates: [-90.4528, 14.5523], emoji: '🍽️', kind: 'town',
    blurb: ['Almuerzo de bienvenida con Karla: Portal del Ángel (km 11.2) o Pradera Concepción (km 15.5).', 'Welcome lunch with Karla: Portal del Ángel (km 11.2) or Pradera Concepción (km 15.5).'] },
  // El Chapetón beach is at aldea San José Buena Vista (Chiquimulilla); pin on its shoreline.
  { id: 'monterrico', name: 'El Chapetón', nameEn: 'El Chapetón', coordinates: [-90.3325, 13.8312], emoji: '🏖️', kind: 'water', destinationId: 'monterrico' },
  { id: 'los-amates', name: 'Cataratas Los Amates', nameEn: 'Los Amates Falls', coordinates: [-90.2135, 14.0515], emoji: '💦', kind: 'nature', destinationId: 'los-amates' },

  // Thanksgiving: El Salvador and back through the east
  { id: 'anda-mira', name: 'Cueva de Andá Mirá', nameEn: 'Andá Mirá cave', coordinates: [-89.9412, 14.0585], emoji: '♨️', kind: 'nature',
    blurb: ['Balneario de aguas azufradas en Jalpatagua (km 115 de la CA-8), con pozas y una cueva de unos 12 m con poca luz. Q15 adultos, Q10 niños, parqueo Q15.', 'Sulfur-water bathing spot in Jalpatagua (km 115 on CA-8), with pools and a ~12 m dimly lit cave. Q15 adults, Q10 children, Q15 parking.'] },
  { id: 'border-chinamas', name: 'Frontera Valle Nuevo – Las Chinamas', nameEn: 'Valle Nuevo – Las Chinamas border', coordinates: [-89.8790, 14.0060], emoji: '🛂', kind: 'border',
    blurb: ['Migración y aduana (30–60 min). Bruce y Norma pagan $12 c/u en efectivo; los carros necesitan permiso temporal.', 'Immigration and customs (30–60 min). Bruce & Norma pay $12 each in cash; the cars need a temporary permit.'] },
  { id: 'ahuachapan', name: 'Ahuachapán', nameEn: 'Ahuachapán', coordinates: [-89.8463, 13.924], emoji: '🫓', kind: 'town', photo: PHOTOS.pupusas,
    blurb: ['Primera ciudad salvadoreña después de la frontera. Pupuserías alrededor del Parque Menéndez.', 'First Salvadoran city past the border. Pupuserías around Parque Menéndez.'] },
  { id: 'coatepeque', name: 'Lago de Coatepeque', nameEn: 'Lake Coatepeque', coordinates: [-89.5347, 13.8913], emoji: '🦃', kind: 'water', destinationId: 'coatepeque' },
  { id: 'border-anguiatu', name: 'Frontera Anguiatú', nameEn: 'Anguiatú border', coordinates: [-89.4551, 14.4237], emoji: '🛂', kind: 'border',
    blurb: ['Frontera pequeña y tranquila para volver a Guatemala por Metapán. Cruzarla con luz de día.', 'Small, quiet border back into Guatemala via Metapán. Cross in daylight.'] },
  { id: 'chiquimula', name: 'Chiquimula · Grand Caporal', nameEn: 'Chiquimula · Grand Caporal', coordinates: [-89.5248, 14.7678], emoji: '🏊', kind: 'town', destinationId: 'chiquimula' },
  { id: 'rio-dulce', name: 'Río Dulce', nameEn: 'Río Dulce', coordinates: [-88.9913, 15.6583], emoji: '🚤', kind: 'water', destinationId: 'rio-dulce' },
  { id: 'castillo', name: 'Castillo de San Felipe', nameEn: 'San Felipe fortress', coordinates: [-88.9941, 15.6371], emoji: '🏰', kind: 'town', photo: PHOTOS.castilloSanFelipe,
    blurb: ['Fuerte español del siglo XVII a la entrada del lago Izabal. Jardines planos afuera.', '17th-century Spanish fort at the mouth of Lake Izabal. Flat lawns outside.'] },
  { id: 'livingston', name: 'Livingston', nameEn: 'Livingston', coordinates: [-88.7508, 15.827], emoji: '🌴', kind: 'water', photo: PHOTOS.livingston,
    blurb: ['Pueblo garífuna al que solo se llega en lancha. Calles en subida desde el muelle.', 'Garifuna town reachable only by boat. Streets climb up from the dock.'] },
  { id: 'paragliding', name: 'Paragliding Chiquimula', nameEn: 'Paragliding Chiquimula', coordinates: [-89.5859, 14.7232], emoji: '🪂', kind: 'nature', destinationId: 'paragliding', labelSide: 'left', mapLabel: ['Parapente', 'Paragliding'] },

  // December: highlands
  { id: 'antigua', name: 'Antigua Guatemala', nameEn: 'Antigua Guatemala', coordinates: [-90.7337, 14.5568], emoji: '🏛️', kind: 'town', destinationId: 'antigua' },
  { id: 'godinez', name: 'Mirador de Godínez', nameEn: 'Godínez lookout', coordinates: [-91.0991, 14.7045], emoji: '📸', kind: 'nature', photo: PHOTOS.godinez,
    blurb: ['Primera vista del lago y sus tres volcanes desde lo alto.', 'First view of the lake and its three volcanoes from above.'] },
  { id: 'panajachel', name: 'Panajachel', nameEn: 'Panajachel', coordinates: [-91.1584, 14.7418], emoji: '⛴️', kind: 'water',
    blurb: ['Aquí se deja el carro en un parqueo vigilado y se toma la lancha a Santa Cruz La Laguna (~20 min).', 'Leave the car in a guarded lot here and take the boat to Santa Cruz La Laguna (~20 min).'] },
  { id: 'santa-cruz', name: 'Santa Cruz La Laguna · Lago de Atitlán', nameEn: 'Santa Cruz La Laguna · Lake Atitlán', coordinates: [-91.2135, 14.7412], emoji: '🌋', kind: 'water', destinationId: 'atitlan' },
  { id: 'san-juan', name: 'San Juan La Laguna', nameEn: 'San Juan La Laguna', coordinates: [-91.2856, 14.6945], emoji: '🧶', kind: 'town', photo: PHOTOS.sanJuan,
    blurb: ['Pueblo de cooperativas de tejedoras y chocolate; tuc-tucs desde el muelle.', 'Village of weaving co-ops and chocolate; tuk-tuks from the dock.'] },
];

export const pointById = (id: string) => MAP_POINTS.find(p => p.id === id);

// Water routes are drawn by hand (no roads to follow).
export const BOAT_PATHS: Record<string, [number, number][]> = {
  'boat:rio-dulce>livingston': [
    [-88.9913, 15.6583], [-88.975, 15.682], [-88.952, 15.712], [-88.93, 15.73], [-88.905, 15.745],
    [-88.87, 15.757], [-88.84, 15.768], [-88.815, 15.782], [-88.795, 15.8], [-88.775, 15.815], [-88.7508, 15.827],
  ],
  'boat:panajachel>santa-cruz': [
    [-91.1584, 14.7418], [-91.168, 14.738], [-91.183, 14.736], [-91.198, 14.738], [-91.2135, 14.7412],
  ],
  'boat:santa-cruz>san-juan': [
    [-91.2135, 14.7412], [-91.226, 14.728], [-91.245, 14.713], [-91.265, 14.701], [-91.2856, 14.6945],
  ],
  'boat:santa-cruz>panajachel': [
    [-91.2135, 14.7412], [-91.198, 14.738], [-91.183, 14.736], [-91.168, 14.738], [-91.1584, 14.7418],
  ],
};

export const SCENARIOS: MapScenario[] = [
  {
    id: 'base',
    color: '#047857',
    stops: [
      { pointId: 'aeropuerto', role: 'visit', days: [1, 27], note: ['Llegada 14:30 el 15 Nov · vuelo de regreso el 11 Dic', 'Land 2:30 PM Nov 15 · flight home Dec 11'] },
      { pointId: 'pradera', role: 'visit', days: [1], note: ['Almuerzo con Karla', 'Lunch with Karla'] },
      { pointId: 'ixhuatan', role: 'home', days: [1, 2, 3, 4, 5, 8, 9, 10, 17, 18, 24, 25, 26] },
      { pointId: 'los-amates', role: 'visit', days: [5], note: ['Aventura 4x4 a las cataratas', '4x4 adventure to the falls'] },
      { pointId: 'monterrico', role: 'stay', days: [6, 7, 8], nights: 2, lodging: 'Oceanfront Beach House (Airbnb)', lodgingStatus: 'confirmed', note: ['Casa frente al mar con piscina infinita', 'Oceanfront house with an infinity pool'] },
    ],
    legs: [
      { day: 1, from: 'aeropuerto', via: ['pradera'], to: 'ixhuatan', mode: 'drive', hours: 2.25, note: ['Almuerzo en la Carretera a El Salvador y a casa', 'Lunch on Carretera a El Salvador, then home'] },
      { day: 5, from: 'ixhuatan', to: 'los-amates', mode: 'drive', hours: 1, roundTrip: true, note: ['Último tramo de terracería en 4x4', 'Last stretch on a 4x4 dirt road'] },
      { day: 6, from: 'ixhuatan', to: 'monterrico', mode: 'drive', hours: 2, note: ['Por Chiquimulilla y la carretera San José Buena Vista – Las Lisas', 'Via Chiquimulilla and the San José Buena Vista – Las Lisas road'] },
      { day: 8, from: 'monterrico', to: 'ixhuatan', mode: 'drive', hours: 2 },
      { day: 27, from: 'ixhuatan', to: 'aeropuerto', mode: 'drive', hours: 2.2 },
    ],
  },
  {
    id: 'thanksgiving',
    color: '#c2410c',
    stops: [
      { pointId: 'ixhuatan', role: 'home', days: [11, 16] },
      { pointId: 'anda-mira', role: 'visit', days: [11], note: ['Pozas de agua azufrada y cueva', 'Sulfur-water pools and a cave'] },
      { pointId: 'border-chinamas', role: 'border', days: [11] },
      { pointId: 'ahuachapan', role: 'visit', days: [11], note: ['Almuerzo de pupusas', 'Pupusa lunch'] },
      { pointId: 'coatepeque', role: 'stay', days: [11, 12], nights: 1, lodging: 'Casa frente al lago (Airbnb)', lodgingStatus: 'tentative', note: ['🦃 Comida de Thanksgiving en La Pampa', '🦃 Thanksgiving meal at La Pampa'] },
      { pointId: 'border-anguiatu', role: 'border', days: [12] },
      { pointId: 'chiquimula', role: 'stay', days: [12, 13], nights: 1, lodging: 'Hotel Grand Caporal', note: ['Piscinas entre jardines', 'Pools among gardens'] },
      { pointId: 'rio-dulce', role: 'stay', days: [13, 14, 15], nights: 2, lodging: 'Nana Juana Marina & Resort' },
      { pointId: 'castillo', role: 'visit', days: [13], note: ['Fuerte español', 'Spanish fort'] },
      { pointId: 'livingston', role: 'visit', days: [14], note: ['Lancha por el cañón y almuerzo garífuna', 'Canyon boat ride & Garifuna lunch'] },
      { pointId: 'paragliding', role: 'stay', days: [15, 16], nights: 1, lodging: 'Cabañas Paragliding Chiquimula', note: ['Parapente, canopy y piscina climatizada', 'Paragliding, zip line & heated pool'] },
    ],
    legs: [
      { day: 11, from: 'ixhuatan', to: 'anda-mira', mode: 'drive', hours: 1, note: ['Por la CA-8 hacia Jalpatagua', 'Along CA-8 toward Jalpatagua'] },
      { day: 11, from: 'anda-mira', via: ['border-chinamas'], to: 'ahuachapan', mode: 'drive', hours: 0.5, note: ['Cruza el Río Paz en la frontera de Valle Nuevo', 'Crosses the Paz River at the Valle Nuevo border'] },
      { day: 11, from: 'ahuachapan', to: 'coatepeque', mode: 'drive', hours: 1, note: ['Por Santa Ana y la bajada al cráter', 'Via Santa Ana and down into the crater'] },
      { day: 12, from: 'coatepeque', to: 'border-anguiatu', mode: 'drive', hours: 2, note: ['Salir a más tardar 13:30 para cruzar con luz', 'Leave by 1:30 PM to cross in daylight'] },
      { day: 12, from: 'border-anguiatu', to: 'chiquimula', mode: 'drive', hours: 0.75 },
      { day: 13, from: 'chiquimula', to: 'rio-dulce', mode: 'drive', hours: 3.5, note: ['Hacia el Caribe, cruzando el gran puente del Río Dulce', 'Toward the Caribbean, over the big Río Dulce bridge'] },
      { day: 13, from: 'rio-dulce', to: 'castillo', mode: 'drive', hours: 0.15, roundTrip: true },
      { day: 14, from: 'rio-dulce', to: 'livingston', mode: 'boat', hours: 1.25, roundTrip: true, note: ['Lancha privada techada por el cañón', 'Private covered boat through the canyon'] },
      { day: 15, from: 'rio-dulce', to: 'paragliding', mode: 'drive', hours: 3.75, note: ['Salir a las 12:30: el último tramo sube a la montaña', 'Leave at 12:30: the last stretch climbs the mountain'] },
      { day: 16, from: 'paragliding', to: 'ixhuatan', mode: 'drive', hours: 2.3, note: ['Por Ipala y Jutiapa', 'Via Ipala and Jutiapa'] },
    ],
  },
  {
    id: 'december',
    color: '#2563eb',
    stops: [
      { pointId: 'ixhuatan', role: 'home', days: [19, 23] },
      { pointId: 'antigua', role: 'stay', days: [19, 20, 21], nights: 2, lodging: 'Casa con vista a los volcanes (Airbnb)', lodgingStatus: 'confirmed' },
      { pointId: 'godinez', role: 'visit', days: [21], note: ['Primera vista del lago', 'First view of the lake'] },
      { pointId: 'panajachel', role: 'visit', days: [21, 23], note: ['Parqueo para el carro y lancha', 'Car park and boat'] },
      { pointId: 'santa-cruz', role: 'stay', days: [21, 22, 23], nights: 2, lodging: 'Rustic Charm Cliffside Retreat (Airbnb)', lodgingStatus: 'confirmed', note: ['Solo se llega en lancha', 'Reachable only by boat'] },
      { pointId: 'san-juan', role: 'visit', days: [22], note: ['Lancha temprano, antes del viento Xocomil', 'Early boat, before the Xocomil wind'] },
    ],
    legs: [
      { day: 19, from: 'ixhuatan', to: 'antigua', mode: 'drive', hours: 2.25, note: ['Salida 18:30', 'Leave 6:30 PM'] },
      { day: 21, from: 'antigua', via: ['godinez'], to: 'panajachel', mode: 'drive', hours: 2, note: ['Por Tecpán y la bajada de Godínez, con los tres volcanes de frente', 'Via Tecpán and the Godínez descent, facing the three volcanoes'] },
      { day: 21, from: 'panajachel', to: 'santa-cruz', mode: 'boat', hours: 0.35, note: ['Cruzar antes del mediodía, con el lago en calma', 'Cross before noon, while the lake is calm'] },
      { day: 22, from: 'santa-cruz', to: 'san-juan', mode: 'boat', hours: 0.35, roundTrip: true },
      { day: 23, from: 'santa-cruz', to: 'panajachel', mode: 'boat', hours: 0.35 },
      { day: 23, from: 'panajachel', to: 'ixhuatan', mode: 'drive', hours: 4, note: ['Llegar antes de la Quema del Diablo (18:00)', 'Be home before the Burning of the Devil (6 PM)'] },
    ],
  },
];

export const scenarioById = (id: ScenarioId) => SCENARIOS.find(s => s.id === id)!;
