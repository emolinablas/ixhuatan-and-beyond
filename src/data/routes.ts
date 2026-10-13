import { Photo, PHOTOS } from './photos';

// What the Map tab draws. Every scenario (the home weeks, and each voting
// option) is a list of stops plus the legs driven or sailed on each day.
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
}

export type StopRole = 'home' | 'stay' | 'visit' | 'border';

export interface ScenarioStop {
  pointId: string;
  role: StopRole;
  days: number[];
  nights?: number;
  lodging?: string;
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

export interface MapScenario {
  id: string; // 'base' or a TripOption id
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
  { id: 'monterrico', name: 'Monterrico', nameEn: 'Monterrico', coordinates: [-90.4814, 13.8911], emoji: '🏖️', kind: 'water', destinationId: 'monterrico' },
  { id: 'los-amates', name: 'Cataratas Los Amates', nameEn: 'Los Amates Falls', coordinates: [-90.2135, 14.0515], emoji: '💦', kind: 'nature', destinationId: 'los-amates' },

  // El Salvador
  { id: 'border-chinamas', name: 'Frontera Valle Nuevo – Las Chinamas', nameEn: 'Valle Nuevo – Las Chinamas border', coordinates: [-89.8790, 14.0060], emoji: '🛂', kind: 'border',
    blurb: ['Migración y aduana (30–60 min). Bruce y Norma pagan $12 c/u en efectivo; los carros necesitan permiso temporal.', 'Immigration and customs (30–60 min). Bruce & Norma pay $12 each in cash; the cars need a temporary permit.'] },
  { id: 'ataco', name: 'Concepción de Ataco', nameEn: 'Concepción de Ataco', coordinates: [-89.8509, 13.8704], emoji: '🌺', kind: 'town', destinationId: 'ruta-flores' },
  { id: 'santa-teresa', name: 'Termales de Santa Teresa', nameEn: 'Santa Teresa hot springs', coordinates: [-89.8187, 13.9018], emoji: '♨️', kind: 'nature',
    blurb: ['Piscinas de agua termal con parqueo junto a las pozas: ideal para Doña Isabel.', 'Thermal pools with parking right next to them: ideal for Doña Isabel.'] },
  { id: 'juayua', name: 'Juayúa', nameEn: 'Juayúa', coordinates: [-89.7465, 13.8432], emoji: '🍲', kind: 'town', photo: PHOTOS.juayua,
    blurb: ['Pueblo de la feria gastronómica de fin de semana, alrededor de un parque plano.', 'Town of the weekend food fair, around a flat central square.'] },
  { id: 'coatepeque', name: 'Lago de Coatepeque', nameEn: 'Lake Coatepeque', coordinates: [-89.5473, 13.8633], emoji: '🦃', kind: 'water', destinationId: 'coatepeque' },
  { id: 'border-anguiatu', name: 'Frontera Anguiatú', nameEn: 'Anguiatú border', coordinates: [-89.4551, 14.4237], emoji: '🛂', kind: 'border',
    blurb: ['Frontera pequeña y tranquila para volver a Guatemala por Metapán.', 'Small, quiet border back into Guatemala via Metapán.'] },

  // Oriente y Caribe
  { id: 'chiquimula', name: 'Chiquimula', nameEn: 'Chiquimula', coordinates: [-89.5458, 14.7981], emoji: '🥩', kind: 'town', destinationId: 'chiquimula' },
  { id: 'rio-dulce', name: 'Río Dulce', nameEn: 'Río Dulce', coordinates: [-88.9913, 15.6583], emoji: '🚤', kind: 'water', destinationId: 'rio-dulce' },
  { id: 'castillo', name: 'Castillo de San Felipe', nameEn: 'San Felipe fortress', coordinates: [-88.9941, 15.6371], emoji: '🏰', kind: 'town', photo: PHOTOS.castilloSanFelipe,
    blurb: ['Fuerte español del siglo XVII a la entrada del lago Izabal. Jardines planos afuera.', '17th-century Spanish fort at the mouth of Lake Izabal. Flat lawns outside.'] },
  { id: 'golfete', name: 'El Golfete', nameEn: 'El Golfete', coordinates: [-88.905, 15.745], emoji: '🛶', kind: 'water', photo: PHOTOS.golfete,
    blurb: ['Ensanchamiento del río con selva a los lados, de camino al cañón.', 'Wide stretch of the river lined with jungle, on the way to the canyon.'] },
  { id: 'livingston', name: 'Livingston', nameEn: 'Livingston', coordinates: [-88.7508, 15.827], emoji: '🌴', kind: 'water', photo: PHOTOS.livingston,
    blurb: ['Pueblo garífuna al que solo se llega en lancha. Calles en subida desde el muelle.', 'Garifuna town reachable only by boat. Streets climb up from the dock.'] },

  // Altiplano
  { id: 'antigua', name: 'Antigua Guatemala', nameEn: 'Antigua Guatemala', coordinates: [-90.7337, 14.5568], emoji: '🏛️', kind: 'town', destinationId: 'antigua' },
  { id: 'godinez', name: 'Mirador de Godínez', nameEn: 'Godínez lookout', coordinates: [-91.0991, 14.7045], emoji: '📸', kind: 'nature', photo: PHOTOS.godinez,
    blurb: ['Primera vista del lago y sus tres volcanes desde lo alto.', 'First view of the lake and its three volcanoes from above.'] },
  { id: 'panajachel', name: 'Panajachel · Lago de Atitlán', nameEn: 'Panajachel · Lake Atitlán', coordinates: [-91.156, 14.7422], emoji: '🌋', kind: 'water', destinationId: 'atitlan' },
  { id: 'san-juan', name: 'San Juan La Laguna', nameEn: 'San Juan La Laguna', coordinates: [-91.2856, 14.6945], emoji: '🧶', kind: 'town', photo: PHOTOS.sanJuan,
    blurb: ['Pueblo de cooperativas de tejedoras y chocolate; tuc-tucs desde el muelle.', 'Village of weaving co-ops and chocolate; tuk-tuks from the dock.'] },

  // Verapaces
  { id: 'gua-city', name: 'Ciudad de Guatemala', nameEn: 'Guatemala City', coordinates: [-90.449, 14.6633], emoji: '🏙️', kind: 'town',
    blurb: ['Noche en la zona 17/18, junto a la salida a la Carretera al Atlántico.', 'Night in zones 17/18, right by the Atlantic Highway exit.'] },
  { id: 'biotopo', name: 'Biotopo del Quetzal', nameEn: 'Quetzal Biotope', coordinates: [-90.2183, 15.2133], emoji: '🦜', kind: 'nature', photo: PHOTOS.biotopo,
    blurb: ['Bosque nuboso donde vive el quetzal. Centro de visitantes junto a la carretera.', 'Cloud forest home of the quetzal. Visitor center right by the road.'] },
  { id: 'coban', name: 'Cobán', nameEn: 'Cobán', coordinates: [-90.3735, 15.4702], emoji: '☕', kind: 'town', photo: PHOTOS.coban,
    blurb: ['Ciudad del café y el kak’ik, con el hospital regional más cercano a Semuc.', 'City of coffee and kak’ik, with the regional hospital closest to Semuc.'] },
  { id: 'lanquin', name: 'Lanquín', nameEn: 'Lanquín', coordinates: [-89.9808, 15.575], emoji: '🦇', kind: 'town', photo: PHOTOS.lanquin,
    blurb: ['Pueblo de montaña junto a las Grutas de Lanquín, a 30 min de Semuc.', 'Mountain village by the Lanquín caves, 30 min from Semuc.'] },
  { id: 'semuc', name: 'Semuc Champey', nameEn: 'Semuc Champey', coordinates: [-89.9581, 15.5338], emoji: '🌿', kind: 'nature', destinationId: 'semuc' },
];

export const pointById = (id: string) => MAP_POINTS.find(p => p.id === id);

const DEGRACIELA = 'Casa Degraciela Hotel Boutique';
const CAPORAL = 'Hotel Grand Caporal';
const NANA_JUANA = 'Nana Juana Marina & Resort';

// Water routes are drawn by hand (no roads to follow).
export const BOAT_PATHS: Record<string, [number, number][]> = {
  'boat:rio-dulce>livingston': [
    [-88.9913, 15.6583], [-88.975, 15.682], [-88.952, 15.712], [-88.93, 15.73], [-88.905, 15.745],
    [-88.87, 15.757], [-88.84, 15.768], [-88.815, 15.782], [-88.795, 15.8], [-88.775, 15.815], [-88.7508, 15.827],
  ],
  'boat:rio-dulce>golfete': [
    [-88.9913, 15.6583], [-88.975, 15.682], [-88.952, 15.712], [-88.93, 15.73], [-88.905, 15.745],
  ],
  'boat:panajachel>san-juan': [
    [-91.156, 14.7422], [-91.175, 14.73], [-91.205, 14.716], [-91.24, 14.705], [-91.268, 14.698], [-91.2856, 14.6945],
  ],
};

export const SCENARIOS: MapScenario[] = [
  {
    id: 'base',
    color: '#047857',
    stops: [
      { pointId: 'aeropuerto', role: 'visit', days: [1, 27], note: ['Llegada 14:30 el 15 Nov · vuelo de regreso el 11 Dic', 'Land 2:30 PM Nov 15 · flight home Dec 11'] },
      { pointId: 'pradera', role: 'visit', days: [1], note: ['Almuerzo con Karla', 'Lunch with Karla'] },
      { pointId: 'ixhuatan', role: 'home', days: [1, 2, 3, 4, 7, 8, 9, 10, 17, 18, 24, 25, 26] },
      { pointId: 'monterrico', role: 'stay', days: [5, 6, 7], nights: 2, lodging: 'Casa/Hotel frente al mar', note: ['Tortugas, manglares y playa', 'Turtles, mangroves and beach'] },
      { pointId: 'los-amates', role: 'visit', days: [8], note: ['Aventura 4x4 a las cataratas', '4x4 adventure to the falls'] },
    ],
    legs: [
      { day: 1, from: 'aeropuerto', via: ['pradera'], to: 'ixhuatan', mode: 'drive', hours: 2.25, note: ['Almuerzo en la Carretera a El Salvador y a casa', 'Lunch on Carretera a El Salvador, then home'] },
      { day: 5, from: 'ixhuatan', to: 'monterrico', mode: 'drive', hours: 1.8 },
      { day: 7, from: 'monterrico', to: 'ixhuatan', mode: 'drive', hours: 1.8 },
      { day: 8, from: 'ixhuatan', to: 'los-amates', mode: 'drive', hours: 1, roundTrip: true, note: ['Último tramo de terracería en 4x4', 'Last stretch on a 4x4 dirt road'] },
      { day: 27, from: 'ixhuatan', to: 'aeropuerto', mode: 'drive', hours: 2.2 },
    ],
  },
  {
    id: 'opt-thanksgiving-elsalvador',
    color: '#c2410c',
    stops: [
      { pointId: 'ixhuatan', role: 'home', days: [11, 16] },
      { pointId: 'border-chinamas', role: 'border', days: [11, 16] },
      { pointId: 'ataco', role: 'stay', days: [11, 12, 13, 14, 15, 16], nights: 5, lodging: DEGRACIELA, note: ['Un solo hotel toda la semana', 'One hotel all week'] },
      { pointId: 'coatepeque', role: 'visit', days: [12], note: ['🦃 Comida de Thanksgiving', '🦃 Thanksgiving meal'] },
      { pointId: 'santa-teresa', role: 'visit', days: [13], note: ['Aguas termales', 'Hot springs'] },
      { pointId: 'juayua', role: 'visit', days: [14], note: ['Feria gastronómica', 'Food fair'] },
    ],
    legs: [
      { day: 11, from: 'ixhuatan', via: ['border-chinamas'], to: 'ataco', mode: 'drive', hours: 2.5, note: ['Cruza el Río Paz y sube a la cordillera de Apaneca: aire fresco y pueblos con murales', 'Crosses the Paz River and climbs into the Apaneca range: cool air and mural towns'] },
      { day: 12, from: 'ataco', to: 'coatepeque', mode: 'drive', hours: 1.25, roundTrip: true, note: ['Carretera escénica hasta el borde del cráter', 'Scenic road to the crater rim'] },
      { day: 13, from: 'ataco', to: 'santa-teresa', mode: 'drive', hours: 0.4, roundTrip: true },
      { day: 14, from: 'ataco', to: 'juayua', mode: 'drive', hours: 0.5, roundTrip: true },
      { day: 16, from: 'ataco', via: ['border-chinamas'], to: 'ixhuatan', mode: 'drive', hours: 2.5 },
    ],
  },
  {
    id: 'opt-thanksgiving-riodulce',
    color: '#0e7490',
    stops: [
      { pointId: 'ixhuatan', role: 'home', days: [11, 16] },
      { pointId: 'chiquimula', role: 'stay', days: [11, 12], nights: 1, lodging: CAPORAL, note: ['Noche para partir el viaje', 'Overnight to split the drive'] },
      { pointId: 'rio-dulce', role: 'stay', days: [12, 13, 14, 15, 16], nights: 4, lodging: NANA_JUANA, note: ['🦃 Cena de Thanksgiving frente al río', '🦃 Riverside Thanksgiving dinner'] },
      { pointId: 'castillo', role: 'visit', days: [14], note: ['Fuerte español', 'Spanish fort'] },
      { pointId: 'golfete', role: 'visit', days: [13], note: ['En lancha', 'By boat'] },
      { pointId: 'livingston', role: 'visit', days: [13], note: ['Lancha por el cañón y almuerzo garífuna', 'Canyon boat ride & Garifuna lunch'] },
    ],
    legs: [
      { day: 11, from: 'ixhuatan', to: 'chiquimula', mode: 'drive', hours: 3.5 },
      { day: 12, from: 'chiquimula', to: 'rio-dulce', mode: 'drive', hours: 3, note: ['Hacia el Caribe, cruzando el gran puente del Río Dulce', 'Toward the Caribbean, over the big Río Dulce bridge'] },
      { day: 13, from: 'rio-dulce', to: 'livingston', mode: 'boat', hours: 1.25, roundTrip: true, note: ['Lancha privada techada por el cañón', 'Private covered boat through the canyon'] },
      { day: 14, from: 'rio-dulce', to: 'castillo', mode: 'drive', hours: 0.15, roundTrip: true },
      { day: 16, from: 'rio-dulce', to: 'ixhuatan', mode: 'drive', hours: 6, note: ['El día más largo en carro', 'Longest day in the car'] },
    ],
  },
  {
    id: 'opt-thanksgiving-hibrido',
    color: '#7c3aed',
    stops: [
      { pointId: 'ixhuatan', role: 'home', days: [11, 16] },
      { pointId: 'border-chinamas', role: 'border', days: [11] },
      { pointId: 'ataco', role: 'stay', days: [11, 12, 13, 14], nights: 3, lodging: DEGRACIELA },
      { pointId: 'coatepeque', role: 'visit', days: [12], note: ['🦃 Comida de Thanksgiving', '🦃 Thanksgiving meal'] },
      { pointId: 'santa-teresa', role: 'visit', days: [13], note: ['Aguas termales', 'Hot springs'] },
      { pointId: 'border-anguiatu', role: 'border', days: [14] },
      { pointId: 'chiquimula', role: 'stay', days: [14, 15], nights: 1, lodging: CAPORAL },
      { pointId: 'rio-dulce', role: 'stay', days: [15, 16], nights: 1, lodging: NANA_JUANA },
      { pointId: 'golfete', role: 'visit', days: [15], note: ['Lancha corta por el río', 'Short river boat ride'] },
    ],
    legs: [
      { day: 11, from: 'ixhuatan', via: ['border-chinamas'], to: 'ataco', mode: 'drive', hours: 2.5, note: ['Cruza el Río Paz y sube a la cordillera de Apaneca: aire fresco y pueblos con murales', 'Crosses the Paz River and climbs into the Apaneca range: cool air and mural towns'] },
      { day: 12, from: 'ataco', to: 'coatepeque', mode: 'drive', hours: 1.25, roundTrip: true, note: ['Carretera escénica hasta el borde del cráter', 'Scenic road to the crater rim'] },
      { day: 13, from: 'ataco', to: 'santa-teresa', mode: 'drive', hours: 0.4, roundTrip: true },
      { day: 14, from: 'ataco', via: ['border-anguiatu'], to: 'chiquimula', mode: 'drive', hours: 3.5, note: ['Cambio de país y de hotel', 'Change of country and hotel'] },
      { day: 15, from: 'chiquimula', to: 'rio-dulce', mode: 'drive', hours: 3 },
      { day: 15, from: 'rio-dulce', to: 'golfete', mode: 'boat', hours: 1, roundTrip: true },
      { day: 16, from: 'rio-dulce', to: 'ixhuatan', mode: 'drive', hours: 6, note: ['El día más largo en carro', 'Longest day in the car'] },
    ],
  },
  {
    id: 'opt-december-atitlan-antigua',
    color: '#2563eb',
    stops: [
      { pointId: 'ixhuatan', role: 'home', days: [19, 23] },
      { pointId: 'antigua', role: 'stay', days: [19, 20, 21], nights: 2, lodging: 'Hotel Museo Casa Santo Domingo' },
      { pointId: 'godinez', role: 'visit', days: [21], note: ['Primera vista del lago', 'First view of the lake'] },
      { pointId: 'panajachel', role: 'stay', days: [21, 22, 23], nights: 2, lodging: 'Hotel Atitlán' },
      { pointId: 'san-juan', role: 'visit', days: [22], note: ['Lancha temprano, antes del viento Xocomil', 'Early boat, before the Xocomil wind'] },
    ],
    legs: [
      { day: 19, from: 'ixhuatan', to: 'antigua', mode: 'drive', hours: 2.25, note: ['Salida 18:30', 'Leave 6:30 PM'] },
      { day: 21, from: 'antigua', via: ['godinez'], to: 'panajachel', mode: 'drive', hours: 2, note: ['Por Tecpán y la bajada de Godínez, con los tres volcanes de frente', 'Via Tecpán and the Godínez descent, facing the three volcanoes'] },
      { day: 22, from: 'panajachel', to: 'san-juan', mode: 'boat', hours: 0.5, roundTrip: true },
      { day: 23, from: 'panajachel', to: 'ixhuatan', mode: 'drive', hours: 4, note: ['Llegar antes de la Quema del Diablo (18:00)', 'Be home before the Burning of the Devil (6 PM)'] },
    ],
  },
  {
    id: 'opt-december-semuc-antigua',
    color: '#dc2626',
    stops: [
      { pointId: 'ixhuatan', role: 'home', days: [19, 23] },
      { pointId: 'gua-city', role: 'stay', days: [19, 20], nights: 1, lodging: 'Hotel zona 17/18' },
      { pointId: 'biotopo', role: 'visit', days: [20], note: ['Parada en el bosque nuboso', 'Cloud forest stop'] },
      { pointId: 'coban', role: 'stay', days: [20, 21, 22, 23], nights: 2, lodging: 'Hotel Park Cobán' },
      { pointId: 'semuc', role: 'visit', days: [21], note: ['Pozas turquesas', 'Turquoise pools'] },
      { pointId: 'lanquin', role: 'stay', days: [21, 22], nights: 1, lodging: 'Guayaha Lanquín', note: ['Grutas de Lanquín (opcional)', 'Lanquín caves (optional)'] },
    ],
    legs: [
      { day: 19, from: 'ixhuatan', to: 'gua-city', mode: 'drive', hours: 1.5, note: ['Evita manejar 7.5 h de noche', 'Avoids a 7.5 h night drive'] },
      { day: 20, from: 'gua-city', via: ['biotopo'], to: 'coban', mode: 'drive', hours: 4.5, note: ['Sube por la Sierra de las Minas al bosque nuboso', 'Climbs the Sierra de las Minas into cloud forest'] },
      { day: 21, from: 'coban', via: ['lanquin'], to: 'semuc', mode: 'drive', hours: 2.5, note: ['Pendientes de más de 20%', 'Grades over 20%'] },
      { day: 22, from: 'lanquin', to: 'coban', mode: 'drive', hours: 2 },
      { day: 23, from: 'coban', to: 'ixhuatan', mode: 'drive', hours: 6, note: ['Llegar antes de la Quema del Diablo (18:00)', 'Be home before the Burning of the Devil (6 PM)'] },
    ],
  },
  {
    id: 'opt-december-hibrido',
    color: '#9333ea',
    stops: [
      { pointId: 'ixhuatan', role: 'home', days: [19, 23] },
      { pointId: 'antigua', role: 'stay', days: [19, 20], nights: 1, lodging: 'Antigua' },
      { pointId: 'godinez', role: 'visit', days: [20] },
      { pointId: 'panajachel', role: 'stay', days: [20, 21], nights: 1, lodging: 'Panajachel' },
      { pointId: 'coban', role: 'stay', days: [21, 22], nights: 1, lodging: 'Cobán' },
      { pointId: 'semuc', role: 'visit', days: [22], note: ['Pozas turquesas', 'Turquoise pools'] },
      { pointId: 'lanquin', role: 'stay', days: [22, 23], nights: 1, lodging: 'Lanquín' },
    ],
    legs: [
      { day: 19, from: 'ixhuatan', to: 'antigua', mode: 'drive', hours: 2.25 },
      { day: 20, from: 'antigua', via: ['godinez'], to: 'panajachel', mode: 'drive', hours: 2 },
      { day: 21, from: 'panajachel', via: ['gua-city'], to: 'coban', mode: 'drive', hours: 5.5, note: ['Cruza la capital un sábado', 'Crosses the capital on a Saturday'] },
      { day: 22, from: 'coban', via: ['lanquin'], to: 'semuc', mode: 'drive', hours: 2.5 },
      { day: 23, from: 'lanquin', to: 'ixhuatan', mode: 'drive', hours: 7.5, note: ['El día más pesado del viaje', 'The heaviest day of the trip'] },
    ],
  },
];

export const scenarioById = (id: string) => SCENARIOS.find(s => s.id === id);
