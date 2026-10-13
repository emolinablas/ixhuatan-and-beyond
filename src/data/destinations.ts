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
    name: 'Monterrico & El Chapetón',
    nameEn: 'Monterrico & El Chapetón Beach',
    region: 'Costa del Pacífico, Santa Rosa',
    regionEn: 'Pacific Coast, Santa Rosa',
    coordinates: [-90.4814, 13.8911],
    stayDuration: '2 Noches (19 - 21 Nov)',
    stayDurationEn: '2 Nights (Nov 19 - 21)',
    description: 'Playa de arena volcánica negra, brisa marina cálida, paseos en lancha por los manglares del canal de Chiquimulilla y temporada de liberación de tortuguitas marinas al atardecer.',
    descriptionEn: 'Volcanic black sand beaches, warm Pacific ocean breeze, peaceful mangrove boat rides along Chiquimulilla canal, and sunset sea turtle hatchling releases.',
    photo: PHOTOS.monterrico,
    googleMapsUrl: 'https://maps.google.com/?q=Monterrico+Santa+Rosa+Guatemala',
    wazeUrl: 'https://waze.com/ul?q=Monterrico+Guatemala',
    lodgingName: 'Hotel / Casa frente a la playa',
    climate: 'tropical_beach',
    driveHoursFromIxhuatan: 1.8,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 4,
    seniorFriendlyScore: 4,
    highlights: ['Liberación de tortugas al atardecer', 'Paseo en manglares', 'Cocos frescos y mariscos'],
    highlightsEn: ['Sunset baby turtle release', 'Mangrove canal boat safari', 'Fresh coconuts & seafood'],
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
    id: 'ruta-flores',
    name: 'Ruta de las Flores & Ataco',
    nameEn: 'Ruta de las Flores & Ataco',
    region: 'Ahuachapán, El Salvador',
    regionEn: 'Ahuachapán, El Salvador',
    coordinates: [-89.8509, 13.8704],
    stayDuration: 'Parte de Opción El Salvador (25 - 30 Nov)',
    stayDurationEn: 'Part of El Salvador Option (Nov 25 - 30)',
    description: 'Pueblos coloniales coloridos, murales vibrantes, clima fresco de montaña, plantaciones de café y casonas históricas llanas. Hospedaje estelar en Casa Degraciela: 100% en planta baja sin gradas, ideal para los 10.',
    descriptionEn: 'Charming colonial mountain towns, vibrant murals, crisp highland air, coffee estates, and gentle ground-floor historic manors. Stellar stay at Casa Degraciela: 100% single-level with zero stairs, ideal for all 10.',
    photo: PHOTOS.ataco,
    googleMapsUrl: 'https://maps.google.com/?q=Concepcion+de+Ataco+El+Salvador',
    wazeUrl: 'https://waze.com/ul?q=Concepcion+de+Ataco',
    lodgingName: 'Casa Degraciela Hotel Boutique (Ataco)',
    lodgingUrl: 'https://maps.google.com/?q=Casa+Degraciela+Concepcion+de+Ataco',
    climate: 'highland_cool',
    driveHoursFromIxhuatan: 3.2,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 5,
    seniorFriendlyScore: 5,
    highlights: ['Casa Degraciela 100% en planta baja', 'Murales artísticos de Ataco', 'Termales de Santa Teresa (36-38°C)'],
    highlightsEn: ['Casa Degraciela 100% single floor', 'Artistic murals of Ataco', 'Santa Teresa thermal pools (36-38°C)'],
    placesToVisit: [
      { id: 'p-ataco-degraciela', name: 'Casa Degraciela Hotel Boutique', nameEn: 'Casa Degraciela Boutique Hotel', description: 'Casona colonial histórica de 150 años, 100% en planta baja sin gradas, jardines llanos y privacidad total para 10 personas.', googleMapsUrl: 'https://maps.google.com/?q=Casa+Degraciela+Concepcion+de+Ataco' },
      { id: 'p-ataco-1', name: 'Termales de Santa Teresa (Ahuachapán)', nameEn: 'Santa Teresa Geothermal Hot Springs', description: 'Aguas termales minerales tibias con acceso vehicular directo hasta las piscinas principales y pasamanos seguros.', googleMapsUrl: 'https://maps.google.com/?q=Termales+de+Santa+Teresa+Ahuachapan' },
      { id: 'p-ataco-2', name: 'Pueblo Colonial de Concepción de Ataco', nameEn: 'Concepción de Ataco Historic Center', description: 'Caminar por calles con murales pintados a mano, tiendas de telares en telar de palanca y cafeterías.', googleMapsUrl: 'https://maps.google.com/?q=Concepcion+de+Ataco+El+Salvador' },
      { id: 'p-ataco-3', name: 'Laberinto de Albania (Apaneca)', nameEn: 'Albania Cypress Labyrinth', description: 'El laberinto vegetal más grande de Centroamérica, miradores y columpio panorámico.', googleMapsUrl: 'https://maps.google.com/?q=Cafe+Albania+Apaneca' },
      { id: 'p-ataco-4', name: 'Finca El Carmen Estate (Ataco)', nameEn: 'El Carmen Coffee Estate', description: 'Beneficio tradicional de café con patios de secado completamente planos y degustación de café con vista panorámica.' }
    ],
    intermediateStops: [
      { id: 'i-ataco-1', name: 'Paso Fronterizo Valle Nuevo / Las Chinamas', nameEn: 'Valle Nuevo Border Crossing', description: 'Trámite migratorio: Bruce y Norma pagan $12 USD en efectivo (Tarjeta de Turismo). Emily e Isabella requieren pasaporte vigente. Alternativa ágil: Frontera San Cristóbal.', driveTimeBadge: '⏱️ 1h 45m desde Ixhuatán' },
      { id: 'i-ataco-2', name: 'Ahuachapán (Mirador y Parque)', nameEn: 'Ahuachapán Town Square', description: 'Parada para cambio de moneda si se requiere o probar pupusas salvadoreñas.' }
    ]
  },
  {
    id: 'coatepeque',
    name: 'Lago de Coatepeque',
    nameEn: 'Lake Coatepeque',
    region: 'Santa Ana, El Salvador',
    regionEn: 'Santa Ana, El Salvador',
    coordinates: [-89.5473, 13.8633],
    stayDuration: 'Paseo & Almuerzo Panorámico',
    stayDurationEn: 'Scenic Cruise & Lakeside Dining',
    description: 'Espectacular lago en el cráter de un volcán con aguas azul turquesa. Cardedeu Bistro y La Pampa ofrecen terrazas superiores con vistas increíbles para la cena de Acción de Gracias.',
    descriptionEn: 'Stunning volcanic crater lake with turquoise-blue waters. Cardedeu Bistro and La Pampa offer upper deck lakefront panoramas ideal for Thanksgiving feast.',
    photo: PHOTOS.coatepeque,
    googleMapsUrl: 'https://maps.google.com/?q=Lago+de+Coatepeque+El+Salvador',
    lodgingName: 'Cardedeu Residence / Villas del Lago',
    climate: 'temperate',
    driveHoursFromIxhuatan: 3.5,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 5,
    seniorFriendlyScore: 5,
    highlights: ['Cena de Acción de Gracias frente al volcán', 'Terrazas superiores junto al parqueo', 'Paseo suave en pontón techado'],
    highlightsEn: ['Thanksgiving feast with volcano views', 'Upper decks adjacent to parking', 'Gentle covered pontoon cruise'],
    placesToVisit: [
      { id: 'p-coat-1', name: 'Cardedeu Bistro / La Pampa Coatepeque', nameEn: 'Cardedeu Bistro / La Pampa Lakeside Dining', description: 'Terrazas techadas en el nivel superior contiguas al parqueo (evitando escalinatas hacia el agua). Vista panorámica insuperable al volcán para la cena festiva.', googleMapsUrl: 'https://maps.google.com/?q=Cardedeu+Residence+Lago+Coatepeque' },
      { id: 'p-coat-2', name: 'Paseo en Pontón Privado Techado', nameEn: 'Private Covered Pontoon Cruise', description: 'Paseo suave, plano y sentado alrededor de la isla Teopán por aguas calmas de color turquesa.' },
      { id: 'p-coat-3', name: 'Mirador de la Carretera Panorámica', nameEn: 'Crater Rim Scenic Overlook', description: 'Punto alto para fotos de toda la caldera volcánica.' }
    ],
    intermediateStops: [
      { id: 'i-coat-1', name: 'Parque Nacional Cerro Verde', nameEn: 'Cerro Verde National Park', description: 'Miradores directos al Volcán de Izalco y Volcán de Santa Ana con senderos planos.', driveTimeBadge: '⏱️ 35 min desde el lago' }
    ]
  },
  {
    id: 'chiquimula',
    name: 'Chiquimula (Grand Caporal)',
    nameEn: 'Chiquimula (Grand Caporal Hotel)',
    region: 'Chiquimula, Guatemala',
    regionEn: 'Chiquimula, Guatemala',
    coordinates: [-89.5458, 14.7981],
    stayDuration: '1 Noche de Descanso Estratégico',
    stayDurationEn: '1 Night Strategic Rest Stop',
    description: 'Parada perfecta para dividir el viaje hacia Izabal. Hotel Grand Caporal con piscinas, amplios jardines, excelente restaurante de cortes de carne y cómodas habitaciones.',
    descriptionEn: 'Ideal stop to break up the drive toward Izabal. Grand Caporal Hotel features swimming pools, spacious grounds, great steakhouse, and plush rooms.',
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
    stayDuration: '3 Noches en Paraíso Ecológico',
    stayDurationEn: '3 Nights Eco-Paradise Stay',
    description: 'Selva tropical exuberante, canales navegables y Castillo de San Felipe. Nana Juana Marina ofrece caminerías 100% planas de concreto ideales para carriola y abuelos, suites con A/C potente y piscina tipo laguna. (Alternativa rústica: Hacienda Tijax con senderos de madera sobre humedales).',
    descriptionEn: 'Lush tropical jungle, calm winding waterways, and San Felipe fortress. Nana Juana Marina offers 100% flat concrete walkways ideal for strollers and seniors, robust A/C, and lagoon pool. (Rustic alternative: Hacienda Tijax eco-lodges with raised boardwalks).',
    photo: PHOTOS.rioDulce,
    googleMapsUrl: 'https://maps.google.com/?q=Nana+Juana+Marina+Hotel+Rio+Dulce',
    lodgingName: 'Nana Juana Marina & Resort (o Hacienda Tijax)',
    lodgingUrl: 'https://maps.google.com/?q=Nana+Juana+Marina+Hotel+Rio+Dulce',
    climate: 'jungle_hot',
    driveHoursFromIxhuatan: 7.5,
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
    id: 'antigua',
    name: 'Antigua Guatemala',
    nameEn: 'Antigua Guatemala',
    region: 'Sacatepéquez, Guatemala',
    regionEn: 'Sacatepéquez, Guatemala',
    coordinates: [-90.7337, 14.5568],
    stayDuration: '1 - 2 Noches / Escapada',
    stayDurationEn: '1 - 2 Nights / Getaway',
    description: 'Joya colonial Patrimonio de la Humanidad UNESCO. Calles empedradas, iglesias barrocas y vistas a volcanes. Conexión rápida desde Ixhuatán vía autopista VAS (~2h 15m) y Hotel Casa Santo Domingo con rampas suaves 100% accesibles.',
    descriptionEn: 'UNESCO World Heritage colonial jewel. Cobblestone avenues, baroque ruins, and volcano views. Quick night drive from Ixhuatán via VAS bypass (~2h 15m) and Hotel Casa Santo Domingo with 100% gentle ramp accessibility.',
    photo: PHOTOS.antigua,
    googleMapsUrl: 'https://maps.google.com/?q=Antigua+Guatemala',
    wazeUrl: 'https://waze.com/ul?q=Antigua+Guatemala',
    lodgingName: 'Hotel Museo Casa Santo Domingo',
    lodgingUrl: 'https://maps.google.com/?q=Hotel+Museo+Casa+Santo+Domingo',
    climate: 'highland_cool',
    driveHoursFromIxhuatan: 2.25,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 4,
    seniorFriendlyScore: 5,
    highlights: ['Arco de Santa Catalina', 'Cerro de la Cruz accesible', 'Casa Santo Domingo con rampas suaves'],
    highlightsEn: ['Santa Catalina Arch', 'Accessible Cerro de la Cruz viewpoint', 'Casa Santo Domingo gentle ramps'],
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
    name: 'Lago de Atitlán (Panajachel & San Juan)',
    nameEn: 'Lake Atitlán (Panajachel & San Juan)',
    region: 'Sololá, Guatemala',
    regionEn: 'Sololá, Guatemala',
    coordinates: [-91.156, 14.7422],
    stayDuration: '2 - 3 Noches',
    stayDurationEn: '2 - 3 Nights',
    description: 'Considerado el lago más bello del mundo. Rodeado por 3 volcanes majestuosos. Hotel Atitlán ofrece jardines botánicos planos y piscina climatizada al aire libre (esencial ante los vientos frescos del Xocomil de diciembre).',
    descriptionEn: 'Revered as the most beautiful lake on Earth. Framed by 3 majestic volcanoes. Hotel Atitlán features flat botanical gardens and a heated outdoor pool (vital against brisk December Xocomil winds).',
    photo: PHOTOS.atitlan,
    googleMapsUrl: 'https://maps.google.com/?q=Panajachel+Lake+Atitlan+Guatemala',
    wazeUrl: 'https://waze.com/ul?q=Panajachel+Guatemala',
    lodgingName: 'Hotel Atitlán (Jardines & Piscina Climatizada)',
    lodgingUrl: 'https://maps.google.com/?q=Hotel+Atitlan+Panajachel',
    climate: 'highland_cool',
    driveHoursFromIxhuatan: 4.0,
    roadQuality: 'paved_smooth',
    babyFriendlyScore: 5,
    seniorFriendlyScore: 5,
    highlights: ['Jardines botánicos y piscina climatizada', 'Lancha privada a San Juan La Laguna', 'Tuc-tuc en muelle para cero esfuerzo'],
    highlightsEn: ['Botanical gardens & heated pool', 'Private scenic boat to San Juan', 'Tuc-tuc at dock for effortless access'],
    placesToVisit: [
      { id: 'p-atit-1', name: 'Jardines Botánicos & Piscina Climatizada (Hotel Atitlán)', nameEn: 'Hotel Atitlán Botanical Gardens & Heated Pool', description: 'Jardines de rosas, orquídeas y pavos reales con caminerías planas junto al lago y piscina climatizada exterior.', googleMapsUrl: 'https://maps.google.com/?q=Hotel+Atitlan+Panajachel' },
      { id: 'p-atit-2', name: 'San Juan La Laguna (Cooperativa de Tejedoras)', nameEn: 'San Juan Mayan Weaving Cooperative', description: 'Demostración de hilado y tintes orgánicos. Tip clave: tomar tuc-tuc en el muelle (Q5-Q10) para subir cómodamente a la cooperativa sin subir la cuesta a pie.', googleMapsUrl: 'https://maps.google.com/?q=San+Juan+La+Laguna' },
      { id: 'p-atit-3', name: 'Taller de Chocolate y Miel Maya de Abeja Melipona', nameEn: 'Artisanal Cacao & Melipona Honey Tour', description: 'Degustación de chocolate ceremonial y propiedades medicinales de la miel maya sin aguijón.' },
      { id: 'p-atit-4', name: 'Santa Catarina Palopó (Casas Azules)', nameEn: 'Santa Catarina Palopó Painted Village', description: 'Pueblo pintoresco donde las familias decoraron sus fachadas con motivos de güipiles tradicionales.' }
    ],
    intermediateStops: [
      { id: 'i-atit-1', name: 'Mirador de Godínez', nameEn: 'Godínez Lake Panoramic Overlook', description: 'El punto más alto de la carretera con vista completa a los 3 volcanes y el espejo de agua.', driveTimeBadge: '⏱️ 20 min antes de Panajachel' },
      { id: 'i-atit-2', name: 'Tecpán (Restaurante Katok / Rincón Suizo)', nameEn: 'Tecpán Country Grill Stop', description: 'Parada clásica para comer carnes asadas, frijoles negros y queso con chimenea de leña.', googleMapsUrl: 'https://maps.google.com/?q=Restaurante+Katok+Tecpan' }
    ]
  },
  {
    id: 'semuc',
    name: 'Semuc Champey & Lanquín',
    nameEn: 'Semuc Champey & Lanquín',
    region: 'Alta Verapaz, Guatemala',
    regionEn: 'Alta Verapaz, Guatemala',
    coordinates: [-89.9581, 15.5338],
    stayDuration: 'Opción de Aventura (Cobán)',
    stayDurationEn: 'Adventure Option (Cobán)',
    description: 'Monumento natural con pozas de agua turquesa sobre el río Cahabón subterráneo. ACTUALIZACIÓN DE RUTA: La carretera Lanquín-Semuc (~12 km) fue pavimentada recientemente con concreto hidráulico (ya no es terracería de piedras), aunque conserva pendientes empinadas (+20%) y curvas estrechas. Dentro del parque, el mirador tiene más de 450 gradas y la roca caliza mojada es muy resbaladiza. Atención médica: hospital de Cobán a 3.5 - 4 horas.',
    descriptionEn: 'Natural limestone bridge with cascading turquoise pools. ROUTE UPDATE: The 12 km Lanquín-Semuc road was recently paved with hydraulic concrete (no longer rough gravel), but features steep 20%+ mountain gradients and narrow turns. Inside the reserve, the overlook has 450+ stairs and wet limestone is extremely slippery. Nearest hospital in Cobán is 3.5 - 4h away.',
    photo: PHOTOS.semuc,
    googleMapsUrl: 'https://maps.google.com/?q=Semuc+Champey+Lanquin+Guatemala',
    lodgingName: 'Hotel Park Cobán / Guayaha Lanquín (Familiar)',
    climate: 'jungle_hot',
    driveHoursFromIxhuatan: 7.5,
    roadQuality: 'mixed_curves',
    babyFriendlyScore: 2,
    seniorFriendlyScore: 2,
    highlights: ['Pozas turquesas naturales', 'Carretera Lanquín-Semuc pavimentada con concreto', 'Aviso: caliza resbaladiza y 4h a hospital'],
    highlightsEn: ['Natural turquoise pools', 'Lanquín-Semuc road paved with concrete', 'Caution: slippery limestone & 4h to hospital'],
    placesToVisit: [
      { id: 'p-sem-1', name: 'Pozas Turquesas Naturales de Semuc Champey', nameEn: 'Semuc Champey Turquoise Cascades', description: 'Terrazas naturales de piedra caliza con agua tibia cristalina que se escalonan en piscinas naturales.', googleMapsUrl: 'https://maps.google.com/?q=Semuc+Champey' },
      { id: 'p-sem-2', name: 'Grutas Sagradas de Lanquín', nameEn: 'Lanquín Sacred Bat Caverns', description: 'Caverna iluminada por donde emerge un río subterráneo sagrado maya.', googleMapsUrl: 'https://maps.google.com/?q=Grutas+de+Lanquin' },
      { id: 'p-sem-3', name: 'El Sumidero del Río Cahabón', nameEn: 'Cahabón Underground River Sinkhole', description: 'Punto donde el furioso río se sumerge bajo el puente de roca caliza.' }
    ],
    intermediateStops: [
      { id: 'i-sem-1', name: 'Cobán (Vivero de Orquídeas Verapaz)', nameEn: 'Cobán Botanical Orchid Nursery', description: 'Colección de más de 1,000 especies incluyendo la Monja Blanca, flor nacional de Guatemala.', driveTimeBadge: '⏱️ A mitad de camino' },
      { id: 'i-sem-2', name: 'Biotopo del Quetzal (Purulhá)', nameEn: 'Quetzal Cloud Forest Sanctuary', description: 'Reserva natural de helechos gigantes y bosque nuboso con senderos frescos.' }
    ]
  }
];
