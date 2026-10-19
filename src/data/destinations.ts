import { TripDestination } from '../types/trip';
import { PHOTOS } from './photos';

export const destinations: TripDestination[] = [
  {
    id: 'ixhuatan',
    name: 'Santa María Ixhuatán (Base)',
    nameEn: 'Santa María Ixhuatán (Home Base)',
    region: 'Santa Rosa, Guatemala',
    regionEn: 'Santa Rosa, Guatemala',
    coordinates: [-90.2708, 14.1906],
    stayDuration: 'Base Principal (Varios días)',
    stayDurationEn: 'Main Base (Multiple stays)',
    description: 'El cálido hogar de Ever y Cori en Santa María Ixhuatán. Punto de reunión familiar, descanso en hamacas, vistas a las montañas verdes de Santa Rosa y deliciosas comidas caseras.',
    descriptionEn: 'Ever & Cori’s welcoming home in Santa María Ixhuatán. Central family gathering point, hammock relaxing, green Santa Rosa mountain vistas, and hearty home-cooked meals.',
    photo: PHOTOS.ixhuatan,
    googleMapsUrl: 'https://maps.google.com/?q=Santa+Maria+Ixhuatan+Santa+Rosa+Guatemala',
    wazeUrl: 'https://waze.com/ul?q=Santa+Maria+Ixhuatan',
    climate: 'temperate',
    driveHoursFromIxhuatan: 0,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 5,
    seniorFriendlyScore: 5,
    highlights: ['Casa familiar acogedora', 'Mirador La Cruz', 'Comida local y café de altura'],
    highlightsEn: ['Cozy family home', 'La Cruz Viewpoint', 'Local cuisine & highland coffee'],
    placesToVisit: [
      { id: 'p-ixh-1', name: 'Mirador La Cruz', nameEn: 'La Cruz Viewpoint', description: 'Vista panorámica de 360 grados del valle de Santa Rosa y volcanes al atardecer.', googleMapsUrl: 'https://maps.google.com/?q=Mirador+La+Cruz+Santa+Maria+Ixhuatan' },
      { id: 'p-ixh-2', name: 'Cataratas Los Amates', nameEn: 'Los Amates Waterfalls', description: 'Monumento natural de cascada de 35 metros con pozas de agua fresca cristalina.', googleMapsUrl: 'https://maps.google.com/?q=Cataratas+Los+Amates+Santa+Rosa' },
      { id: 'p-ixh-3', name: 'Parque Central e Iglesia', nameEn: 'Town Plaza & Church', description: 'Plaza histórica de Santa María Ixhuatán para pasear y saludar a vecinos.', googleMapsUrl: 'https://maps.google.com/?q=Parque+Central+Santa+Maria+Ixhuatan' },
      { id: 'p-ixh-4', name: 'Tour de Café Local en Finca', nameEn: 'Local Coffee Farm Tour', description: 'Recorrido por cafetales de altura y degustación de café recién tostado.' }
    ],
    intermediateStops: [
      { id: 'i-ixh-1', name: 'Cuilapa (Parada técnica)', nameEn: 'Cuilapa Rest Stop', description: 'Cabecera departamental, estación de combustible y venta de quesadillas y pan dulce tradicional.', driveTimeBadge: '⏱️ 30 min desde casa', googleMapsUrl: 'https://maps.google.com/?q=Cuilapa+Santa+Rosa' }
    ]
  },
  {
    id: 'aeropuerto',
    name: 'Aeropuerto Int. La Aurora (GUA)',
    nameEn: 'La Aurora Int. Airport (GUA)',
    region: 'Ciudad de Guatemala',
    regionEn: 'Guatemala City',
    coordinates: [-90.5281, 14.5833],
    stayDuration: 'Puntos de conexión (15 Nov & 11 Dic)',
    stayDurationEn: 'Connection Hub (Nov 15 & Dec 11)',
    description: 'Puerta de entrada y salida de Guatemala para Bruce y Norma. Punto de encuentro el 15 de Nov a las 2:30 PM.',
    descriptionEn: 'Guatemala’s international gateway for Bruce & Norma. Pickup point on Nov 15 at 2:30 PM.',
    photo: PHOTOS.aeropuerto,
    googleMapsUrl: 'https://maps.google.com/?q=La+Aurora+International+Airport+Guatemala',
    wazeUrl: 'https://waze.com/ul?q=Aeropuerto+Internacional+La+Aurora',
    climate: 'temperate',
    driveHoursFromIxhuatan: 2.2,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 4,
    seniorFriendlyScore: 4,
    highlights: ['Llegada de Bruce y Norma', 'Vuelo de regreso', 'Carretera principal hacia Santa Rosa'],
    highlightsEn: ['Bruce & Norma arrival', 'Return flight', 'Direct highway to Santa Rosa'],
    placesToVisit: [
      { id: 'p-aero-1', name: 'Terminal Internacional de Llegadas', nameEn: 'Arrivals Gate', description: 'Puerta de bienvenida para recibir a Bruce y Norma a las 2:30 PM.' },
      { id: 'p-aero-2', name: 'Plaza El Obelisco / Zona 10', nameEn: 'El Obelisco Plaza', description: 'Paseo escénico por la zona viva de la Ciudad de Guatemala.' }
    ],
    intermediateStops: [
      { id: 'i-aero-1', name: 'Carretera a El Salvador (Km 25)', nameEn: 'Carretera a El Salvador Overlook', description: 'Miradores hacia el Valle de la Ciudad y cafeterías de paso.', driveTimeBadge: '⏱️ 1h desde aeropuerto' }
    ]
  },
  {
    id: 'monterrico',
    name: 'El Chapetón (playa)',
    nameEn: 'El Chapetón (beach)',
    region: 'San José Buena Vista, Chiquimulilla · Costa del Pacífico',
    regionEn: 'San José Buena Vista, Chiquimulilla · Pacific Coast',
    coordinates: [-90.3325, 13.8312], // shoreline at aldea San José Buena Vista
    stayDuration: '2 noches (20–22 Nov) · ✅ confirmado',
    stayDurationEn: '2 nights (Nov 20–22) · ✅ confirmed',
    description: 'Casa frente al mar en El Chapetón, aldea San José Buena Vista, entre Monterrico y Las Lisas (Airbnb confirmado): piscina infinita privada, acceso directo a la playa, hasta 12 personas, 2 habitaciones (A/C solo en la de arriba), 3 baños y duchas al aire libre. Playa de arena volcánica negra, brisa marina cálida, paseos en lancha por los manglares del canal de Chiquimulilla y temporada de liberación de tortuguitas marinas al atardecer.',
    descriptionEn: 'Oceanfront house in El Chapetón, San José Buena Vista village, between Monterrico and Las Lisas (confirmed Airbnb): private infinity pool, direct beach access, up to 12 guests, 2 bedrooms (A/C only upstairs), 3 baths and outdoor showers. Volcanic black sand beaches, warm Pacific ocean breeze, peaceful mangrove boat rides along Chiquimulilla canal, and sunset sea turtle hatchling releases.',
    photo: PHOTOS.monterrico,
    googleMapsUrl: 'https://maps.google.com/?q=San+Jose+Buena+Vista+Chiquimulilla+Santa+Rosa',
    wazeUrl: 'https://waze.com/ul?q=San+Jose+Buena+Vista+Chiquimulilla',
    lodgingName: 'Oceanfront Beach House · El Chapetón (Airbnb) ✅',
    lodgingUrl: 'https://www.airbnb.com/rooms/1639448933834380058',
    climate: 'tropical_beach',
    driveHoursFromIxhuatan: 2,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 4,
    seniorFriendlyScore: 4,
    highlights: ['Casa frente al mar con piscina infinita', 'Liberación de tortugas al atardecer', 'Paseo en manglares'],
    highlightsEn: ['Oceanfront house with an infinity pool', 'Sunset baby turtle release', 'Mangrove canal boat safari'],
    placesToVisit: [
      { id: 'p-mont-1', name: 'Tortugario Monterrico & El Chapetón', nameEn: 'Sea Turtle Hatchery Sanctuary', description: 'Liberación de crías de tortuga parlama al caer el sol. ¡Inolvidable para niños y abuelos!', googleMapsUrl: 'https://maps.google.com/?q=Tortugario+Monterrico' },
      { id: 'p-mont-2', name: 'Canal de Chiquimulilla (Lancha en Manglares)', nameEn: 'Chiquimulilla Mangrove Safari', description: 'Paseo en lancha techada al amanecer observando garzas, lirios acuáticos y naturaleza virgen.', googleMapsUrl: 'https://maps.google.com/?q=Canal+de+Chiquimulilla+Monterrico' },
      { id: 'p-mont-3', name: 'Playa El Paredón (Opcional)', nameEn: 'El Paredón Surf Beach', description: 'Famoso pueblo costero bohemio con cafeterías frente al mar y cocoteros.' }
    ],
    intermediateStops: [
      { id: 'i-mont-1', name: 'Ferry y Puente de Iztapa', nameEn: 'Iztapa Canal Bridge', description: 'Cruce del canal con vistas a botes pesqueros artesanales.', driveTimeBadge: '⏱️ 1h 15m en ruta' },
      { id: 'i-mont-2', name: 'Cevicherías de Chiquimulilla', nameEn: 'Local Seafood Shacks', description: 'Parada para disfrutar de cocos helados y mariscos recién preparados.' }
    ]
  },
  {
    id: 'los-amates',
    name: 'Cataratas Los Amates (El Salto)',
    nameEn: 'Los Amates Waterfalls (El Salto)',
    region: 'San Juan Tecuaco / Santa Rosa',
    regionEn: 'San Juan Tecuaco / Santa Rosa',
    coordinates: [-90.2135, 14.0515], // Coordenada real OpenStreetMap: 14.0515389° N, -90.2135500° W (Río Margaritas)
    stayDuration: 'Excursión de día (22 Nov)',
    stayDurationEn: 'Day Excursion (Nov 22)',
    description: 'Impresionante caída de agua natural de más de 35 a 50 metros sobre el cañón del Río Margaritas, rodeada de cañones de piedra y pozas de agua cristalina.',
    descriptionEn: 'Monumental 115-to-160 foot natural cascading waterfalls over the Río Margaritas river canyon, with pristine freshwater pools.',
    googleMapsUrl: 'https://maps.google.com/?q=14.051539,-90.213550',
    wazeUrl: 'https://waze.com/ul?ll=14.051539,-90.213550&navigate=yes',
    climate: 'temperate',
    driveHoursFromIxhuatan: 1.0,
    roadQuality: 'rough_4x4',
    babyFriendlyScore: 3,
    seniorFriendlyScore: 3,
    highlights: ['El Niágara de Guatemala (35-50m)', 'Pozas naturales de agua fresca', 'Cañón del Río Margaritas en 4x4'],
    highlightsEn: ['Guatemala’s Niagara (115-160ft)', 'Refreshing natural river pools', 'Río Margaritas canyon 4x4 adventure'],
    placesToVisit: [
      { id: 'p-amat-1', name: 'Anfiteatro de la Catarata Principal', nameEn: 'Main Waterfall Basin', description: 'La majestuosa cortina de agua de más de 35 metros con brisa refrescante.' },
      { id: 'p-amat-2', name: 'Pozas de Baño Naturales', nameEn: 'Natural River Pools', description: 'Pozas de agua cristalina ideales para refrescarse rodeadas de cañones de roca.' },
      { id: 'p-amat-3', name: 'Área de Picnic Campestre', nameEn: 'Riverside Country Picnic Area', description: 'Sombra natural perfecta para almorzar en familia a la orilla del río.' }
    ],
    intermediateStops: [
      { id: 'i-amat-1', name: 'Ruta 4x4 y cruces de río hacia El Salto', nameEn: '4x4 Trail & River Crossings to Falls', description: 'Descenso rural por terracería hacia la Aldea El Zapote y cañón del río.', driveTimeBadge: '⏱️ 45 min en 4x4' }
    ]
  },
  {
    id: 'coatepeque',
    name: 'Lago de Coatepeque',
    nameEn: 'Lake Coatepeque',
    region: 'Santa Ana, El Salvador',
    regionEn: 'Santa Ana, El Salvador',
    coordinates: [-89.5347, 13.8913],
    stayDuration: '1 noche (25 Nov) · ⏳ por confirmar',
    stayDurationEn: '1 night (Nov 25) · ⏳ tentative',
    description: 'Lago de agua turquesa dentro del cráter de un volcán, con la isla Teopán al centro. Hospedaje tentativo: casa familiar frente al lago en El Congo (Airbnb, 4.8★): 6 habitaciones con baño propio, piscina, muelle privado, A/C y asador; tarifa base para 8 personas (+$20 por persona extra). Alternativa: Cardedeu Hotel Coatepeque, en el ala frente al lago: varias piscinas, lancha, kayak y minigolf, y el restaurante La Pampa en el mismo complejo para la comida de Thanksgiving sin manejar. Los terrenos del lago bajan en pendiente: pedir habitaciones sin gradas cerca del parqueo.',
    descriptionEn: 'Turquoise lake inside a volcanic crater, with Teopán island in the middle. Tentative stay: a lakefront family house in El Congo (Airbnb, 4.8★): 6 bedrooms each with its own bathroom, a pool, private dock, A/C and a grill; base rate covers 8 people (+$20 per extra guest). Alternative: Cardedeu Hotel Coatepeque, lakefront wing: several pools, boats, kayaks and mini golf, plus La Pampa restaurant in the same complex for a Thanksgiving meal with no driving. Lakeside grounds slope down: ask for step-free rooms near the parking.',
    photo: PHOTOS.coatepeque,
    googleMapsUrl: 'https://maps.google.com/?q=La+Pampa+Coatepeque',
    lodgingName: 'Spacious Lakefront Family House (Airbnb) ⏳',
    lodgingUrl: 'https://www.airbnb.com/rooms/1040600020839502103',
    climate: 'temperate',
    driveHoursFromIxhuatan: 2.5,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 4,
    seniorFriendlyScore: 3,
    highlights: ['Noche frente al lago del cráter', 'Comida de Thanksgiving en La Pampa', 'Lancha y kayak con el agua calma de la mañana'],
    highlightsEn: ['A night on the crater lake', 'Thanksgiving meal at La Pampa', 'Boat and kayak on calm morning water'],
    placesToVisit: [
      { id: 'p-coat-0', name: 'Casa familiar frente al lago (Airbnb, por confirmar)', nameEn: 'Lakefront family house (Airbnb, tentative)', description: '6 habitaciones con baño propio, piscina, muelle privado, A/C y asador. Preguntar al anfitrión si hay habitaciones sin gradas para Doña Isabel.', descriptionEn: '6 bedrooms each with a bathroom, a pool, private dock, A/C and a grill. Ask the host about step-free rooms for Doña Isabel.', googleMapsUrl: 'https://www.airbnb.com/rooms/1040600020839502103' },
      { id: 'p-coat-1', name: 'Cardedeu Hotel Coatepeque', nameEn: 'Cardedeu Hotel Coatepeque', description: 'Ala frente al lago (habitaciones triples y cuádruples) y ala con vista; varias piscinas, lancha, kayak, jet ski y minigolf. Reservas por WhatsApp +503 7856 6504.', descriptionEn: 'Lakefront wing (triple and quad rooms) and a lake-view wing; several pools, boats, kayaks, jet skis and mini golf. Book on WhatsApp +503 7856 6504.', googleMapsUrl: 'https://www.cardedeuhotels.com/cardedeu-hotel-coatepeque' },
      { id: 'p-coat-2', name: 'La Pampa Coatepeque', nameEn: 'La Pampa Coatepeque', description: 'Parrilla argentina abierta al público dentro del complejo Cardedeu. Reservas por WhatsApp +503 7349 4582.', descriptionEn: 'Argentine grill open to the public inside the Cardedeu complex. Bookings on WhatsApp +503 7349 4582.', googleMapsUrl: 'https://maps.google.com/?q=La+Pampa+Coatepeque' },
      { id: 'p-coat-3', name: 'Paseo en lancha a la isla Teopán', nameEn: 'Boat ride to Teopán island', description: 'Paseo sentado por agua calma, mejor temprano.', descriptionEn: 'Seated ride on calm water, best early.' },
      { id: 'p-coat-4', name: 'Casa Azul (alternativa: casa entera)', nameEn: 'Casa Azul (alternative: whole house)', description: 'Casa en El Congo frente al lago con piscina y muelle privados; hasta 9 huéspedes, 3 habitaciones y 2 baños (4.9★ en Airbnb).', descriptionEn: 'Lakefront house in El Congo with private pool and dock; up to 9 guests, 3 bedrooms and 2 baths (4.9★ on Airbnb).', googleMapsUrl: 'https://www.airbnb.com/rooms/44807937' }
    ],
    intermediateStops: [
      { id: 'i-coat-1', name: 'Cueva de Andá Mirá (Jalpatagua)', nameEn: 'Andá Mirá cave (Jalpatagua)', description: 'Balneario de aguas azufradas y cueva de ~12 m, km 115 de la CA-8. Q15 adultos, Q10 niños, parqueo Q15.', descriptionEn: 'Sulfur-water pools and a ~12 m cave, km 115 on CA-8. Q15 adults, Q10 children, Q15 parking.', driveTimeBadge: '⏱️ 1 h desde Ixhuatán', googleMapsUrl: 'https://maps.google.com/?q=Cueva+Anda+Mira+Jalpatagua' },
      { id: 'i-coat-2', name: 'Frontera Valle Nuevo – Las Chinamas', nameEn: 'Valle Nuevo – Las Chinamas border', description: 'Migración y aduana. $12 en efectivo por persona para Bruce y Norma.', descriptionEn: 'Immigration and customs. $12 cash each for Bruce & Norma.', driveTimeBadge: '⏱️ 15 min desde la cueva' },
      { id: 'i-coat-3', name: 'Pupusas en Ahuachapán', nameEn: 'Pupusas in Ahuachapán', description: 'Pupuserías alrededor del Parque Menéndez, a 15 min de la frontera.', descriptionEn: 'Pupuserías around Parque Menéndez, 15 min past the border.', driveTimeBadge: '⏱️ 1 h antes del lago', googleMapsUrl: 'https://maps.google.com/?q=Parque+Menendez+Ahuachapan' }
    ]
  },
  {
    id: 'chiquimula',
    name: 'Chiquimula (Grand Caporal)',
    nameEn: 'Chiquimula (Grand Caporal Hotel)',
    region: 'Chiquimula, Guatemala',
    regionEn: 'Chiquimula, Guatemala',
    coordinates: [-89.5248, 14.7678],
    stayDuration: '1 noche (26 Nov)',
    stayDurationEn: '1 night (Nov 26)',
    description: 'Primera noche de vuelta en Guatemala, después de Thanksgiving en el lago. Hotel Grand Caporal con piscinas, amplios jardines, excelente restaurante de cortes de carne y cómodas habitaciones.',
    descriptionEn: 'First night back in Guatemala, after Thanksgiving at the lake. Grand Caporal Hotel features swimming pools, spacious grounds, great steakhouse, and plush rooms.',
    photo: PHOTOS.chiquimula,
    googleMapsUrl: 'https://maps.google.com/?q=Hotel+Grand+Caporal+Chiquimula',
    lodgingName: 'Hotel Grand Caporal',
    lodgingUrl: 'https://maps.google.com/?q=Hotel+Grand+Caporal+Chiquimula',
    climate: 'temperate',
    driveHoursFromIxhuatan: 3.5,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 5,
    seniorFriendlyScore: 5,
    highlights: ['Piscina refrescante para niños', 'Cortes de carne y cocina oriental', 'Evita trayectos largos en auto'],
    highlightsEn: ['Refreshing pool for kids', 'Famous steak restaurant', 'Splits long driving hours nicely'],
    placesToVisit: [
      { id: 'p-chiq-1', name: 'Hotel & Restaurante Grand Caporal', nameEn: 'Grand Caporal Grounds & Steakhouse', description: 'Piscina para la familia, jardines cuidados y su famoso restaurante de carnes.', googleMapsUrl: 'https://maps.google.com/?q=Hotel+Grand+Caporal+Chiquimula' },
      { id: 'p-chiq-2', name: 'Parque Central y Parroquia de Chiquimula', nameEn: 'Chiquimula Central Square', description: 'Plaza histórica con kiosco colonial y ambiente de oriente.' }
    ],
    intermediateStops: [
      { id: 'i-chiq-0', name: 'Frontera Anguiatú (desde Metapán)', nameEn: 'Anguiatú border (from Metapán)', description: 'Frontera pequeña y tranquila de regreso a Guatemala. Cruzarla con luz de día.', descriptionEn: 'Small, quiet border back into Guatemala. Cross in daylight.', driveTimeBadge: '⏱️ 2 h desde el lago', googleMapsUrl: 'https://maps.google.com/?q=Frontera+Anguiatu' },
      { id: 'i-chiq-1', name: 'Museo de Paleontología en Estanzuela (Zacapa)', nameEn: 'Estanzuela Paleontology Museum', description: 'Esqueletos reales de mastodontes y perezosos gigantes prehistóricos. ¡Gran sorpresa educativa para Isabella y la familia!', driveTimeBadge: '⏱️ Parada de 45 min en ruta', googleMapsUrl: 'https://maps.google.com/?q=Museo+de+Paleontologia+Estanzuela' },
      { id: 'i-chiq-2', name: 'Basílica del Señor de Esquipulas (Opcional)', nameEn: 'Esquipulas Basilica (Optional detour)', description: 'Monumento católico más visitado de Centroamérica, a 45 min al sur de Chiquimula.', googleMapsUrl: 'https://maps.google.com/?q=Basilica+de+Esquipulas' }
    ]
  },
  {
    id: 'rio-dulce',
    name: 'Río Dulce & Nana Juana Marina',
    nameEn: 'Río Dulce & Nana Juana Marina',
    region: 'Izabal, Guatemala',
    regionEn: 'Izabal, Guatemala',
    coordinates: [-88.9913, 15.6583],
    stayDuration: '2 noches (27–28 Nov)',
    stayDurationEn: '2 nights (Nov 27–28)',
    description: 'Selva tropical exuberante, canales navegables y Castillo de San Felipe. Nana Juana Marina ofrece caminerías 100% planas de concreto ideales para carriola y abuelos, suites con A/C potente y piscina tipo laguna. (Alternativa rústica: Hacienda Tijax con senderos de madera sobre humedales).',
    descriptionEn: 'Lush tropical jungle, calm winding waterways, and San Felipe fortress. Nana Juana Marina offers 100% flat concrete walkways ideal for strollers and seniors, robust A/C, and lagoon pool. (Rustic alternative: Hacienda Tijax eco-lodges with raised boardwalks).',
    photo: PHOTOS.rioDulce,
    googleMapsUrl: 'https://maps.google.com/?q=Nana+Juana+Marina+Hotel+Rio+Dulce',
    lodgingName: 'Nana Juana Marina & Resort',
    lodgingUrl: 'https://maps.google.com/?q=Nana+Juana+Marina+Hotel+Rio+Dulce',
    climate: 'jungle_hot',
    driveHoursFromIxhuatan: 6,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 4,
    seniorFriendlyScore: 4,
    highlights: ['Caminerías planas y A/C en Nana Juana', 'Paseo privado en lancha por el Cañón', 'Castillo colonial de San Felipe de Lara'],
    highlightsEn: ['Flat concrete paths & A/C at Nana Juana', 'Private boat cruise through the canyon', 'San Felipe historic Spanish fort'],
    placesToVisit: [
      { id: 'p-rio-1', name: 'Nana Juana Marina & Resort', nameEn: 'Nana Juana Marina & Resort', description: 'Caminerías planas de concreto, suites con excelente A/C, piscina tipo laguna y marina privada. Máxima comodidad para carriola y abuelos.', googleMapsUrl: 'https://maps.google.com/?q=Nana+Juana+Marina+Hotel+Rio+Dulce' },
      { id: 'p-rio-1b', name: 'Hacienda Tijax Ecolodge (Visita / Almuerzo)', nameEn: 'Hacienda Tijax Nature Reserve & Dining', description: 'Senderos de pasarelas de madera sobre humedales, avistamiento de aves y almuerzo rústico selvático.', googleMapsUrl: 'https://maps.google.com/?q=Hacienda+Tijax+Eco+Lodge+Marina+Rio+Dulce' },
      { id: 'p-rio-2', name: 'Castillo de San Felipe de Lara', nameEn: 'San Felipe Spanish Fortress (1651)', description: 'Fortaleza histórica con cañones españoles protegiendo la entrada del Lago de Izabal contra piratas.', googleMapsUrl: 'https://maps.google.com/?q=Castillo+de+San+Felipe+de+Lara' },
      { id: 'p-rio-3', name: 'Cañón de Río Dulce en Lancha Techada', nameEn: 'Río Dulce Canyon Private Boat Tour', description: 'Navegar entre acantilados de roca kárstica de 100m cubiertos de bromelias y enredaderas gigantes.' },
      { id: 'p-rio-4', name: 'Livingston & Cultura Garífuna', nameEn: 'Livingston Garifuna Coastal Village', description: 'Pueblo afrocaribeño accesible solo por agua. Probar el delicioso Tapado y pan de coco.', googleMapsUrl: 'https://maps.google.com/?q=Livingston+Izabal' },
      { id: 'p-rio-5', name: 'Finca El Paraíso (Cascada de Aguas Termales)', nameEn: 'Finca El Paraíso Hot Spring Waterfall', description: 'Impresionante cascada de agua caliente natural que se vierte sobre un río fresco.', googleMapsUrl: 'https://maps.google.com/?q=Finca+El+Paraiso+Rio+Dulce' }
    ],
    intermediateStops: [
      { id: 'i-rio-1', name: 'Puente de Río Dulce', nameEn: 'Río Dulce Bridge Viewpoint', description: 'Uno de los puentes más altos de Centroamérica con vista impresionante al río y veleros.' },
      { id: 'i-rio-2', name: 'Parque Arqueológico Quiriguá', nameEn: 'Quiriguá Mayan Monumental Stelae', description: 'Las estelas mayas talladas en bloque único más altas del mundo (Patrimonio UNESCO).', googleMapsUrl: 'https://maps.google.com/?q=Quirigua+Archaeological+Park' }
    ]
  },
  {
    id: 'paragliding',
    name: 'Paragliding Chiquimula',
    nameEn: 'Paragliding Chiquimula',
    region: 'Saspán, San José La Arada, Chiquimula',
    regionEn: 'Saspán, San José La Arada, Chiquimula',
    coordinates: [-89.5859, 14.7232],
    stayDuration: '1 noche (29 Nov)',
    stayDurationEn: '1 night (Nov 29)',
    description: 'Parque de aventuras en la cima de un cerro, a unos 30 min de Chiquimula: parapente en tándem, canopy, trampolines, paseo en camello, senderos, piscina climatizada, restaurante y cabañas entre pinos (para 2 y 4 personas). El pin del mapa es aproximado: el parque está en la montaña sobre San José La Arada.',
    descriptionEn: 'Hilltop adventure park about 30 min from Chiquimula: tandem paragliding, zip line, trampolines, camel rides, trails, heated pool, restaurant and cabins among pine trees (for 2 and 4 people). The map pin is approximate: the park sits on the mountain above San José La Arada.',
    googleMapsUrl: 'https://parqueaventuraslodgingnv.com/',
    lodgingName: 'Cabañas Paragliding Chiquimula',
    lodgingUrl: 'https://parqueaventuraslodgingnv.com/',
    climate: 'temperate',
    driveHoursFromIxhuatan: 2.3,
    roadQuality: 'mixed_curves',
    babyFriendlyScore: 3,
    seniorFriendlyScore: 3,
    highlights: ['Vuelo en parapente en tándem', 'Piscina climatizada', 'Cabañas entre pinos con vista'],
    highlightsEn: ['Tandem paragliding flight', 'Heated pool', 'Cabins among pine trees with a view'],
    placesToVisit: [
      { id: 'p-para-1', name: 'Vuelo en parapente', nameEn: 'Paragliding flight', description: 'En tándem con piloto certificado. ≈Q750 en 2022: confirmar precio, peso máximo y horario. WhatsApp +502 4995 5081.', descriptionEn: 'Tandem with a certified pilot. ≈Q750 in 2022: confirm price, weight limit and times. WhatsApp +502 4995 5081.' },
      { id: 'p-para-2', name: 'Canopy, trampolines y camellos', nameEn: 'Zip line, trampolines & camels', description: 'Para Isabella y los más aventureros.', descriptionEn: 'For Isabella and the adventurous.' },
      { id: 'p-para-3', name: 'Piscina climatizada y jacuzzi', nameEn: 'Heated pool & jacuzzi', description: 'Para la mañana de descanso antes de volver a casa.', descriptionEn: 'For a relaxed morning before heading home.' }
    ],
    intermediateStops: []
  },
  {
    id: 'antigua',
    name: 'Antigua Guatemala',
    nameEn: 'Antigua Guatemala',
    region: 'Sacatepéquez, Guatemala',
    regionEn: 'Sacatepéquez, Guatemala',
    coordinates: [-90.7337, 14.5568],
    stayDuration: '2 noches (3–5 Dic) · ✅ confirmado',
    stayDurationEn: '2 nights (Dec 3–5) · ✅ confirmed',
    description: 'Hospedaje confirmado: casa de dos pisos en un condominio cerrado, a 10 min a pie del centro, con terraza y vista a los volcanes de Agua, Fuego y Acatenango, cocina completa y parqueo para 2 carros (Airbnb, 4.94★). Joya colonial Patrimonio de la Humanidad UNESCO. Calles empedradas, iglesias barrocas y vistas a volcanes. Conexión rápida desde Ixhuatán vía autopista VAS (~2h 15m) y Hotel Casa Santo Domingo con rampas suaves 100% accesibles.',
    descriptionEn: 'Confirmed stay: two-story house in a gated community, a 10-minute walk from the center, with a terrace facing the Agua, Fuego and Acatenango volcanoes, a full kitchen and parking for 2 cars (Airbnb, 4.94★). UNESCO World Heritage colonial jewel. Cobblestone avenues, baroque ruins, and volcano views. Quick night drive from Ixhuatán via VAS bypass (~2h 15m) and Hotel Casa Santo Domingo with 100% gentle ramp accessibility.',
    photo: PHOTOS.antigua,
    googleMapsUrl: 'https://maps.google.com/?q=Antigua+Guatemala',
    wazeUrl: 'https://waze.com/ul?q=Antigua+Guatemala',
    lodgingName: 'Casa con vista a los volcanes (Airbnb) ✅',
    lodgingUrl: 'https://www.airbnb.com/rooms/1715345514155837311',
    climate: 'highland_cool',
    driveHoursFromIxhuatan: 2.25,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 4,
    seniorFriendlyScore: 5,
    highlights: ['Terraza con vista a tres volcanes', 'Arco de Santa Catalina', 'Casa Santo Domingo con rampas suaves'],
    highlightsEn: ['Terrace facing three volcanoes', 'Santa Catalina Arch', 'Casa Santo Domingo gentle ramps'],
    placesToVisit: [
      { id: 'p-ant-1', name: 'Calle del Arco & Arco de Santa Catalina', nameEn: 'Santa Catalina Arch Landmark', description: 'La postal icónica de Guatemala con el Volcán de Agua al fondo y carruajes coloniales.', googleMapsUrl: 'https://maps.google.com/?q=Santa+Catalina+Arch+Antigua' },
      { id: 'p-ant-2', name: 'Cerro de la Cruz (Mirador Remodelado)', nameEn: 'Cerro de la Cruz Accessible Viewpoint', description: 'Nuevo paseo con rampas amplias de madera 100% accesibles para carriola de bebé y personas mayores.', googleMapsUrl: 'https://maps.google.com/?q=Cerro+de+la+Cruz+Antigua+Guatemala' },
      { id: 'p-ant-3', name: 'Hotel Museo Casa Santo Domingo', nameEn: 'Casa Santo Domingo Museum & Gardens', description: 'Antiguo convento dominico convertido en museo de arte colonial, jardines con guacamayas y 100% rampas accesibles para carriola y abuelos.', googleMapsUrl: 'https://maps.google.com/?q=Hotel+Museo+Casa+Santo+Domingo' },
      { id: 'p-ant-4', name: 'Parque Central & Fuente de las Sirenas', nameEn: 'Central Plaza & Mermaid Fountain', description: 'Corazón de la ciudad colonial rodeado de palacios y sombra fresca de árboles centenarios.' }
    ],
    intermediateStops: [
      { id: 'i-ant-1', name: 'San Lucas Sacatepéquez (Mercado Típico)', nameEn: 'San Lucas Crafts & Candy Market', description: 'Dulces tradicionales de camote, higo y mazapán, más venta de artesanías.', driveTimeBadge: '⏱️ 20 min antes de entrar a Antigua' },
      { id: 'i-ant-2', name: 'Ciudad Vieja', nameEn: 'Ciudad Vieja Historical Valley', description: 'Primera sede colonial española del valle de Almolonga.' }
    ]
  },
  {
    id: 'atitlan',
    name: 'Lago de Atitlán (Santa Cruz La Laguna)',
    nameEn: 'Lake Atitlán (Santa Cruz La Laguna)',
    region: 'Sololá, Guatemala',
    regionEn: 'Sololá, Guatemala',
    coordinates: [-91.2135, 14.7412],
    stayDuration: '2 noches (5–7 Dic) · ✅ confirmado',
    stayDurationEn: '2 nights (Dec 5–7) · ✅ confirmed',
    description: 'Considerado el lago más bello del mundo, rodeado por 3 volcanes. Hospedaje confirmado: casa en el acantilado entre Santa Cruz La Laguna y Jaibalito, a unos 37 m sobre el agua, con muelle privado, kayaks y vista a los volcanes (Airbnb, 4.97★). Solo se llega en lancha: el carro se deja en Panajachel. Los anfitriones, Jenny y Clemens, viven en la propiedad.',
    descriptionEn: 'Revered as the most beautiful lake on Earth, framed by 3 volcanoes. Confirmed stay: a cliffside house between Santa Cruz La Laguna and Jaibalito, about 120 ft above the water, with a private dock, kayaks and volcano views (Airbnb, 4.97★). Reachable only by boat: the car stays in Panajachel. Hosts Jenny and Clemens live on the property.',
    photo: PHOTOS.atitlan,
    googleMapsUrl: 'https://maps.google.com/?q=Santa+Cruz+La+Laguna+Solola',
    wazeUrl: 'https://waze.com/ul?q=Panajachel+Guatemala',
    lodgingName: 'Rustic Charm Cliffside Retreat (Airbnb) ✅',
    lodgingUrl: 'https://www.airbnb.com/rooms/53875229',
    climate: 'highland_cool',
    driveHoursFromIxhuatan: 4.0,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 3,
    seniorFriendlyScore: 3,
    highlights: ['Casa sobre el lago con muelle privado y kayaks', 'Lancha a San Juan La Laguna', 'Tuc-tuc en el muelle de San Juan'],
    highlightsEn: ['Lakeside house with private dock and kayaks', 'Boat to San Juan La Laguna', 'Tuk-tuk at the San Juan dock'],
    placesToVisit: [
      { id: 'p-atit-1', name: 'La casa del acantilado (Airbnb)', nameEn: 'The cliffside house (Airbnb)', description: 'Muelle privado, kayaks, terraza con vista y lanchas públicas que pasan cada ~15 min. Confirmar con los anfitriones cuántas gradas hay del muelle a la casa.', descriptionEn: 'Private dock, kayaks, a view terrace and public boats every ~15 min. Ask the hosts how many steps there are from the dock to the house.', googleMapsUrl: 'https://www.airbnb.com/rooms/53875229' },
      { id: 'p-atit-1b', name: 'Parqueo en Panajachel', nameEn: 'Parking in Panajachel', description: 'Dejar el carro 2 noches en un parqueo vigilado cerca del muelle (Calle Santander) y tomar la lancha a Santa Cruz.', descriptionEn: 'Leave the car for 2 nights in a guarded lot near the dock (Calle Santander) and take the boat to Santa Cruz.', googleMapsUrl: 'https://maps.google.com/?q=Calle+Santander+Panajachel' },
      { id: 'p-atit-2', name: 'San Juan La Laguna (Cooperativa de Tejedoras)', nameEn: 'San Juan Mayan Weaving Cooperative', description: 'Demostración de hilado y tintes orgánicos. Tip clave: tomar tuc-tuc en el muelle (Q5-Q10) para subir cómodamente a la cooperativa sin subir la cuesta a pie.', googleMapsUrl: 'https://maps.google.com/?q=San+Juan+La+Laguna' },
      { id: 'p-atit-3', name: 'Taller de Chocolate y Miel Maya de Abeja Melipona', nameEn: 'Artisanal Cacao & Melipona Honey Tour', description: 'Degustación de chocolate ceremonial y propiedades medicinales de la miel maya sin aguijón.' },
      { id: 'p-atit-4', name: 'Santa Catarina Palopó (Casas Azules)', nameEn: 'Santa Catarina Palopó Painted Village', description: 'Pueblo pintoresco donde las familias decoraron sus fachadas con motivos de güipiles tradicionales.' }
    ],
    intermediateStops: [
      { id: 'i-atit-1', name: 'Mirador de Godínez', nameEn: 'Godínez Lake Panoramic Overlook', description: 'El punto más alto de la carretera con vista completa a los 3 volcanes y el espejo de agua.', driveTimeBadge: '⏱️ 20 min antes de Panajachel' },
      { id: 'i-atit-2', name: 'Tecpán (Restaurante Katok / Rincón Suizo)', nameEn: 'Tecpán Country Grill Stop', description: 'Parada clásica para comer carnes asadas, frijoles negros y queso con chimenea de leña.', googleMapsUrl: 'https://maps.google.com/?q=Restaurante+Katok+Tecpan' }
    ]
  }
];
