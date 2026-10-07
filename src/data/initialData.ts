import { TripDestination, TripOption, DayPlan, PackingItem, TripDataState } from '../types/trip';

export const initialDestinations: TripDestination[] = [
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
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
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
    coordinates: [-90.4833, 13.8833],
    stayDuration: '2 Noches (19 - 21 Nov)',
    stayDurationEn: '2 Nights (Nov 19 - 21)',
    description: 'Playa de arena volcánica negra, brisa marina cálida, paseos en lancha por los manglares del canal de Chiquimulilla y temporada de liberación de tortuguitas marinas al atardecer.',
    descriptionEn: 'Volcanic black sand beaches, warm Pacific ocean breeze, peaceful mangrove boat rides along Chiquimulilla canal, and sunset sea turtle hatchling releases.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
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
    coordinates: [-89.8486, 13.8703],
    stayDuration: 'Parte de Opción El Salvador (25 - 30 Nov)',
    stayDurationEn: 'Part of El Salvador Option (Nov 25 - 30)',
    description: 'Pueblos coloniales coloridos, murales vibrantes, clima fresco de montaña, plantaciones de café y casonas históricas llanas. Hospedaje estelar en Casa Degraciela: 100% en planta baja sin gradas, ideal para los 10.',
    descriptionEn: 'Charming colonial mountain towns, vibrant murals, crisp highland air, coffee estates, and gentle ground-floor historic manors. Stellar stay at Casa Degraciela: 100% single-level with zero stairs, ideal for all 10.',
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
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
    coordinates: [-89.5539, 13.8697],
    stayDuration: 'Paseo & Almuerzo Panorámico',
    stayDurationEn: 'Scenic Cruise & Lakeside Dining',
    description: 'Espectacular lago en el cráter de un volcán con aguas azul turquesa. Cardedeu Bistro y La Pampa ofrecen terrazas superiores con vistas increíbles para la cena de Acción de Gracias.',
    descriptionEn: 'Stunning volcanic crater lake with turquoise-blue waters. Cardedeu Bistro and La Pampa offer upper deck lakefront panoramas ideal for Thanksgiving feast.',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
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
    coordinates: [-89.0028, 15.6547],
    stayDuration: '3 Noches en Paraíso Ecológico',
    stayDurationEn: '3 Nights Eco-Paradise Stay',
    description: 'Selva tropical exuberante, canales navegables y Castillo de San Felipe. Nana Juana Marina ofrece caminerías 100% planas de concreto ideales para carriola y abuelos, suites con A/C potente y piscina tipo laguna. (Alternativa rústica: Hacienda Tijax con senderos de madera sobre humedales).',
    descriptionEn: 'Lush tropical jungle, calm winding waterways, and San Felipe fortress. Nana Juana Marina offers 100% flat concrete walkways ideal for strollers and seniors, robust A/C, and lagoon pool. (Rustic alternative: Hacienda Tijax eco-lodges with raised boardwalks).',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
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
    coordinates: [-90.7333, 14.5586],
    stayDuration: '1 - 2 Noches / Escapada',
    stayDurationEn: '1 - 2 Nights / Getaway',
    description: 'Joya colonial Patrimonio de la Humanidad UNESCO. Calles empedradas, iglesias barrocas y vistas a volcanes. Conexión rápida desde Ixhuatán vía autopista VAS (~2h 15m) y Hotel Casa Santo Domingo con rampas suaves 100% accesibles.',
    descriptionEn: 'UNESCO World Heritage colonial jewel. Cobblestone avenues, baroque ruins, and volcano views. Quick night drive from Ixhuatán via VAS bypass (~2h 15m) and Hotel Casa Santo Domingo with 100% gentle ramp accessibility.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
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
    coordinates: [-91.2000, 14.7333],
    stayDuration: '2 - 3 Noches',
    stayDurationEn: '2 - 3 Nights',
    description: 'Considerado el lago más bello del mundo. Rodeado por 3 volcanes majestuosos. Hotel Atitlán ofrece jardines botánicos planos y piscina climatizada al aire libre (esencial ante los vientos frescos del Xocomil de diciembre).',
    descriptionEn: 'Revered as the most beautiful lake on Earth. Framed by 3 majestic volcanoes. Hotel Atitlán features flat botanical gardens and a heated outdoor pool (vital against brisk December Xocomil winds).',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
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
    coordinates: [-89.9622, 15.5342],
    stayDuration: 'Opción de Aventura (Cobán)',
    stayDurationEn: 'Adventure Option (Cobán)',
    description: 'Monumento natural con pozas de agua turquesa sobre el río Cahabón subterráneo. ACTUALIZACIÓN DE RUTA: La carretera Lanquín-Semuc (~12 km) fue pavimentada recientemente con concreto hidráulico (ya no es terracería de piedras), aunque conserva pendientes empinadas (+20%) y curvas estrechas. Dentro del parque, el mirador tiene más de 450 gradas y la roca caliza mojada es muy resbaladiza. Atención médica: hospital de Cobán a 3.5 - 4 horas.',
    descriptionEn: 'Natural limestone bridge with cascading turquoise pools. ROUTE UPDATE: The 12 km Lanquín-Semuc road was recently paved with hydraulic concrete (no longer rough gravel), but features steep 20%+ mountain gradients and narrow turns. Inside the reserve, the overlook has 450+ stairs and wet limestone is extremely slippery. Nearest hospital in Cobán is 3.5 - 4h away.',
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=800&q=80',
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

export const initialOptions: TripOption[] = [
  // THANKSGIVING OPTIONS (Nov 25 - 30)
  {
    id: 'opt-thanksgiving-elsalvador',
    phase: 'thanksgiving',
    title: 'Opción 1: El Salvador (Ruta de las Flores & Coatepeque)',
    titleEn: 'Option 1: El Salvador (Ruta de las Flores & Lake Coatepeque)',
    tagline: 'Casona histórica 100% plana en Ataco, termales suaves y banquete frente al lago volcánico',
    taglineEn: 'Historic zero-stair manor in Ataco, thermal springs & scenic volcanic lake feast',
    dateRange: '25 Nov (tarde) – 30 Nov (6 días / 5 noches)',
    dateRangeEn: 'Nov 25 (afternoon) – Nov 30 (6 days / 5 nights)',
    durationDays: 6,
    destinations: ['ruta-flores', 'coatepeque'],
    isRecommendedForFamily: true,
    crewSummary: 'Grupo familiar completo (10 personas): Ever, Cori, Isabella, Emily (7 meses), Jonchito, Lidia, Doña Isabel, Nely, Bruce y Norma.',
    crewSummaryEn: 'Full family crew (10 people): Ever, Cori, Isabella, Emily (7 months), Jonchito, Lidia, Isabel, Nely, Bruce & Norma.',
    pros: [
      'Trayecto más corto y cómodo desde Ixhuatán (solo 2h 15m a 2.5h hasta Ataco en carretera CA-8 asfaltada).',
      'Hospedaje ideal en Casa Degraciela (Ataco): casona de 150 años, 100% en planta baja sin gradas, jardines llanos y total privacidad para la familia.',
      'Cena de Acción de Gracias inolvidable en Cardedeu Bistro (Lago Coatepeque), utilizando la terraza superior contigua al estacionamiento (sin escaleras al lago).',
      'Aguas termales en Santa Teresa con acceso vehicular directo hasta las piscinas para los abuelos y la bebé.',
      'Clima primaveral fresco de montaña (18°C - 24°C) sin calor sofocante ni humedad pesada.'
    ],
    prosEn: [
      'Shortest and easiest drive from Ixhuatán (only 2h 15m to 2.5h to Ataco on smooth CA-8 highway).',
      'Ideal boutique lodging at Casa Degraciela (Ataco): 150-year-old manor, 100% ground floor with 0 stairs, flat lawns and total privacy.',
      'Memorable Thanksgiving dinner at Cardedeu Bistro (Lake Coatepeque) on upper terrace next to parking (avoiding steep lake staircases).',
      'Thermal mineral springs at Santa Teresa with direct vehicular drop-off at pools for seniors and baby.',
      'Pleasant highland spring weather (64°F - 75°F) with no sweltering heat or heavy humidity.'
    ],
    considerations: [
      '⚠️ TRÁMITE URGENTE: Emily (7 meses) requiere tramitar su primer pasaporte e Isabella renovación inmediata en IGM Guatemala.',
      'Bruce y Norma deben pagar $12 USD en efectivo exacto en ventanilla salvadoreña por la Tarjeta de Turismo.',
      'Moneda oficial en El Salvador es el Dólar Estadounidense ($ USD en billetes limpios).'
    ],
    considerationsEn: [
      '⚠️ URGENT PASSPORTS: Emily (7 months) needs her first passport and Isabella needs renewal at IGM Guatemala.',
      'Bruce & Norma must pay $12 USD in exact cash at El Salvador immigration for the Tourist Card.',
      'Official currency in El Salvador is the US Dollar ($ USD, crisp bills recommended).'
    ],
    driveSummary: 'Aprox. 2h 15m a 2.5h desde Ixhuatán. Carretera internacional CA-8 100% asfaltada.',
    driveSummaryEn: 'Approx. 2h 15m to 2.5h from Ixhuatán. 100% smooth paved international CA-8 highway.',
    babyNotes: 'Excelente para Emily (7 meses): viaje corto en auto, clima fresco templado, hospedaje 100% en una sola planta con cunas y paseos planos en carriola.',
    babyNotesEn: 'Superb for 7-month Emily: short drive, mild temperate weather, 100% single-story lodging with cribs, and flat stroller walks.',
    seniorNotes: 'Insuperable para Bruce, Norma, Jonchito, Lidia e Isabel: sin escaleras en Casa Degraciela, termales con acceso en auto y terrazas planas con vista al lago.',
    seniorNotesEn: 'Unbeatable comfort for Bruce, Norma, Jonchito, Lidia & Isabel: zero stairs at Casa Degraciela, drive-up thermal pools, and flat lakeview decks.',
    votes: 0
  },
  {
    id: 'opt-thanksgiving-riodulce',
    phase: 'thanksgiving',
    title: 'Opción 2: Río Dulce & Chiquimula (Nana Juana Marina)',
    titleEn: 'Option 2: Río Dulce & Chiquimula (Nana Juana Marina)',
    tagline: 'Respaldo nacional 100% sin pasaportes, descanso en Grand Caporal, lancha por el cañón y marina plana',
    taglineEn: '100% domestic backup requiring NO passports, Grand Caporal stopover, canyon boat cruise & flat marina',
    dateRange: '25 Nov (tarde) – 30 Nov (6 días / 5 noches)',
    dateRangeEn: 'Nov 25 (afternoon) – Nov 30 (6 days / 5 nights)',
    durationDays: 6,
    destinations: ['chiquimula', 'rio-dulce'],
    isRecommendedForFamily: true,
    crewSummary: 'Grupo familiar completo (10 personas): Ever, Cori, Isabella, Emily (7 meses), Jonchito, Lidia, Doña Isabel, Nely, Bruce y Norma.',
    crewSummaryEn: 'Full family crew (10 people): Ever, Cori, Isabella, Emily (7 months), Jonchito, Lidia, Isabel, Nely, Bruce & Norma.',
    pros: [
      '¡VENTAJA NACIONAL INMEDIATA: No requiere pasaportes ni trámites de frontera! Si los pasaportes de las niñas se retrasan, este viaje se realiza sin contratiempos.',
      'Hospedaje de alta accesibilidad en Nana Juana Marina: caminerías de concreto liso para carriola y abuelos, A/C potente y piscina tipo laguna.',
      'Noche intermedia en Chiquimula (Grand Caporal) divide el trayecto perfectamente con piscina y restaurante de carnes.',
      'Paseo privado en lancha techada por el Cañón de Río Dulce hacia Livingston es un espectáculo natural irrepetible.',
      'Bruce y Norma confirmaron gran entusiasmo por conocer el Caribe y los ríos tropicales de Guatemala.'
    ],
    prosEn: [
      'ZERO-PASSPORT DOMESTIC ADVANTAGE: 100% within Guatemala with no border lines! If girls\' passports encounter delays, this trip runs stress-free.',
      'High-accessibility lodging at Nana Juana Marina: flat concrete walkways for stroller & seniors, strong A/C, and lagoon pool.',
      'Strategic overnight in Chiquimula (Grand Caporal) breaks up the drive comfortably with refreshing pools and steakhouse.',
      'Private covered boat tour through Río Dulce Gorge to Livingston is an awe-inspiring tropical experience.',
      'Bruce & Norma expressed great excitement for the family to experience Río Dulce and Izabal.'
    ],
    considerations: [
      'Carretera más larga: 7.5 a 8 horas de manejo acumulado (tráfico pesado de furgones en autopista CA-9 Norte).',
      'Clima tropical caluroso y húmedo (~32°C - 35°C) con zancudos: indispensable repelente y mosquitero para la carriola de Emily.',
      'Evitar senderos elevados rústicos de madera mojada sobre humedales (Hacienda Tijax) para personas mayores por riesgo de resbalones.'
    ],
    considerationsEn: [
      'Longer driving time: 7.5 to 8 total hours on the road (heavy commercial container truck traffic on CA-9 North).',
      'Tropical hot and humid climate (~90°F - 95°F) with mosquitoes: repellent and stroller netting for Emily are mandatory.',
      'Avoid wet wooden boardwalks over wetlands (Hacienda Tijax) for seniors due to slip hazards; stay on Nana Juana concrete.'
    ],
    driveSummary: 'Día 1: 3.5 hrs a Chiquimula. Día 2: 3.5 hrs a Río Dulce. Carretera al Atlántico CA-9 Norte.',
    driveSummaryEn: 'Day 1: 3.5 hrs to Chiquimula. Day 2: 3.5 hrs to Río Dulce on Atlantic highway CA-9 North.',
    babyNotes: 'La escala en Chiquimula ayuda a descansar. En Río Dulce se requiere aire acondicionado en la habitación y mosquitero en la carriola.',
    babyNotesEn: 'Overnight in Chiquimula helps baby rest. In Río Dulce, strong room A/C and stroller mosquito netting are indispensable.',
    seniorNotes: 'Muy cómodo en Nana Juana Marina gracias a sus caminerías planas de concreto. Paseos en lancha techada con asientos cómodos.',
    seniorNotesEn: 'Very comfortable at Nana Juana Marina thanks to flat concrete walkways. Covered boat tours with comfortable seating.',
    votes: 0
  },
  {
    id: 'opt-thanksgiving-hibrido',
    phase: 'thanksgiving',
    title: 'Opción 3: Ruta Combinada o Plan B Pacífico (Monterrico)',
    titleEn: 'Option 3: Hybrid Blend or Pacific Plan B (Monterrico)',
    tagline: 'Ruta extendida oriente o alternativa de emergencia sin estrés en la playa a 1h 25m',
    taglineEn: 'Extended eastern circuit or emergency zero-stress Pacific beach Plan B (1h 25m drive)',
    dateRange: '25 Nov – 30 Nov (6 días)',
    dateRangeEn: 'Nov 25 – Nov 30 (6 days)',
    durationDays: 6,
    destinations: ['ruta-flores', 'chiquimula', 'rio-dulce'],
    crewSummary: 'Grupo familiar completo (10 personas): Ever, Cori, Isabella, Emily (7 meses), Jonchito, Lidia, Doña Isabel, Nely, Bruce y Norma.',
    crewSummaryEn: 'Full family crew (10 people): Ever, Cori, Isabella, Emily (7 months), Jonchito, Lidia, Isabel, Nely, Bruce & Norma.',
    pros: [
      'Permite combinar la montaña salvadoreña y la selva caribeña de Izabal si se busca máxima variedad.',
      'PLAN B PACÍFICO: Si se descarta El Salvador por pasaportes y Río Dulce por distancia, la costa de Monterrico / Las Lisas está a solo 1h 25m de carretera plana sin esfuerzo.'
    ],
    prosEn: [
      'Allows experiencing both Salvadoran mountain towns and Izabal’s Caribbean jungle if maximum variety is desired.',
      'PACIFIC PLAN B: If El Salvador is ruled out due to passports and Río Dulce due to distance, Monterrico / Las Lisas is just 1h 25m on flat highway.'
    ],
    considerations: [
      'El circuito híbrido El Salvador + Río Dulce suma más de 12 horas acumuladas en carretera, excesivo para Emily y abuelos.',
      'Empacar y desempacar continuamente en 3 o 4 hoteles diferentes.'
    ],
    considerationsEn: [
      'Hybrid El Salvador + Río Dulce circuit accumulates 12+ hours driving, excessive for baby Emily and seniors.',
      'Continuous packing and unpacking across 3 to 4 different hotels.'
    ],
    driveSummary: 'Circuito amplio con más de 12 horas en carretera, o solo 1h 25m si se opta por Plan B de playa.',
    driveSummaryEn: 'Wide circuit with 12+ driving hours, or just 1h 25m if pivoting to Pacific beach Plan B.',
    babyNotes: 'La ruta híbrida completa es muy agotadora para Emily; el Plan B de playa en cambio es sumamente amigable.',
    babyNotesEn: 'Full hybrid route is exhausting for Emily; conversely, Pacific beach Plan B is exceptionally gentle.',
    seniorNotes: 'Alta demanda física por cambios continuos de vehículo y hoteles en la ruta combinada.',
    seniorNotesEn: 'High physical demand due to frequent transitions in vehicle and hotels on the combined route.',
    votes: 0
  },

  // DECEMBER OPTIONS (Dec 3 night - Dec 7)
  {
    id: 'opt-december-atitlan-antigua',
    phase: 'december',
    title: 'Opción A: Lago de Atitlán & Antigua Guatemala',
    titleEn: 'Option A: Lake Atitlán & Antigua Guatemala',
    tagline: 'Salida nocturna vía VAS (~2h 15m), jardines y piscina climatizada en Atitlán, rampas en Santo Domingo',
    taglineEn: 'Night drive via VAS (~2h 15m), heated pool & gardens at Atitlán, gentle ramps at Santo Domingo',
    dateRange: '3 Dic (noche) – 7 Dic (4 noches / 4 días)',
    dateRangeEn: 'Dec 3 (evening) – Dec 7 (4 nights / 4 days)',
    durationDays: 4,
    destinations: ['atitlan', 'antigua'],
    isRecommendedForFamily: true,
    crewSummary: 'Grupo de 6 personas: Ever, Cori, Isabella, bebé Emily (7 meses), Bruce y Norma.',
    crewSummaryEn: 'Core crew of 6: Ever, Cori, Isabella, baby Emily (7 months), Bruce & Norma.',
    pros: [
      'Manejo nocturno el 3 de Dic de Ixhuatán a Antigua por autopista VAS toma solo ~2h 15m, esquivando por completo el tráfico capitalino.',
      'Carreteras 100% asfaltadas de primer nivel en todo el recorrido.',
      'Hotel Atitlán en Panajachel cuenta con amplios jardines botánicos planos y piscina exterior climatizada (crucial para los vientos frescos del Xocomil en diciembre).',
      'Paseo privado en lancha a San Juan La Laguna con servicio de tuc-tuc al pie del muelle (Q5-Q10) para subir a los talleres textiles sin cansancio.',
      'Hotel Museo Casa Santo Domingo en Antigua cuenta con rampas suaves 100% accesibles para carriola y abuelos.',
      'Opción predilecta confirmada por Bruce y Norma ("much easier for Cori and Emily").'
    ],
    prosEn: [
      'Evening drive on Dec 3 from Ixhuatán to Antigua via VAS highway takes only ~2h 15m, totally bypassing city gridlock.',
      '100% top-grade paved highways throughout the entire itinerary.',
      'Hotel Atitlán in Panajachel features flat botanical gardens and a heated outdoor pool (vital against brisk December Xocomil winds).',
      'Private boat cruise to San Juan La Laguna with dockside tuc-tucs (Q5-Q10) to reach weaving cooperatives without uphill walking.',
      'Hotel Museo Casa Santo Domingo in Antigua features 100% gentle ramps certified for strollers and seniors.',
      'Top preferred option endorsed by Bruce & Norma ("much easier for Cori and Emily").'
    ],
    considerations: [
      'Noches y madrugadas frescas en el Altiplano y Antigua (11°C - 14°C): indispensable llevar chumpas livianas y ropa abrigada para la bebé.',
      'En calles empedradas de Antigua, utilizar portabebé ergonómico en lugar de carriola con ruedas pequeñas.'
    ],
    considerationsEn: [
      'Chilly evenings and early mornings in highlands and Antigua (52°F - 58°F): bring light jackets and warm baby layers.',
      'On Antigua cobblestones, use an ergonomic baby carrier instead of small-wheeled strollers.'
    ],
    driveSummary: 'Ixhuatán -> Antigua (2h 15m vía VAS) -> Panajachel (2h). Rutas rápidas, seguras y cómodas.',
    driveSummaryEn: 'Ixhuatán -> Antigua (2h 15m via VAS) -> Panajachel (2h). Fast, safe, and scenic paved roads.',
    babyNotes: 'La mejor opción para Emily (7 meses): distancias moderadas en auto, piscina climatizada, sin calor sofocante y atención médica de primera en Antigua.',
    babyNotesEn: 'Best option for 7-month Emily: gentle driving times, heated pool, no sweltering heat, and top-tier medical facilities in Antigua.',
    seniorNotes: 'Especialmente diseñada para Bruce y Norma (en sus 70s): cero subidas extenuantes, rampas suaves en Casa Santo Domingo, tuc-tucs en el muelle de San Juan y vistas panorámicas espectaculares.',
    seniorNotesEn: 'Tailored for Bruce & Norma (in their 70s): zero steep climbs, gentle ramps at Casa Santo Domingo, dock tuc-tucs in San Juan, and splendid lake panoramas.',
    votes: 0
  },
  {
    id: 'opt-december-semuc-antigua',
    phase: 'december',
    title: 'Opción B: Semuc Champey & Cobán (Alta Verapaz)',
    titleEn: 'Option B: Semuc Champey & Cobán (Alta Verapaz)',
    tagline: 'Pozas turquesas virgenes en la selva (carretera recién pavimentada con concreto pero pendientes >20%)',
    taglineEn: 'Untouched turquoise jungle pools (road recently concrete-paved, but steep >20% grades)',
    dateRange: '3 Dic (noche) – 7 Dic (4 noches / 4 días)',
    dateRangeEn: 'Dec 3 (evening) – Dec 7 (4 nights / 4 days)',
    durationDays: 4,
    destinations: ['semuc'],
    crewSummary: 'Grupo de 6 personas: Ever, Cori, Isabella, bebé Emily (7 meses), Bruce y Norma.',
    crewSummaryEn: 'Core crew of 6: Ever, Cori, Isabella, baby Emily (7 months), Bruce & Norma.',
    pros: [
      'Uno de los monumentos naturales más asombrosos del mundo con piscinas naturales de caliza y agua turquesa templada.',
      'ACTUALIZACIÓN VERIFICADA: El tramo de 12 km entre Lanquín y Semuc Champey ya cuenta con pavimento de concreto hidráulico (se eliminó la terracería con piedras sueltas).'
    ],
    prosEn: [
      'One of the world\'s most breathtaking natural monuments with tiered limestone pools and warm turquoise waters.',
      'VERIFIED ROAD UPDATE: The 12 km stretch between Lanquín and Semuc is now paved with hydraulic concrete (no more rough gravel track).'
    ],
    considerations: [
      'Aunque pavimentada, la carretera Lanquín-Semuc tiene pendientes extremas (+20%) y pasos estrechos de montaña.',
      'Dentro del parque de Semuc: el mirador exige subir más de 450 gradas empinadas y la roca caliza mojada en las pozas es sumamente resbaladiza (riesgo de caídas para abuelos).',
      'Hostales famosos como Zephyr Lodge son party hostels exclusivos para adultos (prohibidos niños); la estancia familiar obliga a pernoctar en Cobán o Guayaha.',
      'Seguridad médica: el hospital regional de Cobán está a 3.5 - 4 horas de distancia por carretera montañosa ante cualquier emergencia infantil.',
      'Trayecto largo de 7.5+ horas desde el sur de Guatemala.'
    ],
    considerationsEn: [
      'Even though paved, the Lanquín-Semuc road features extreme grades (+20%) and narrow single-lane mountain passes.',
      'Inside Semuc reserve: iconic overlook requires 450+ steep stairs, and wet limestone around pools is slick with no handrails (fall hazard for seniors).',
      'Hostels like Zephyr Lodge are strictly 18+ party venues; family lodging requires staying in Cobán or Guayaha.',
      'Medical emergency safety: Cobán regional hospital is 3.5 to 4 hours away on mountain roads if infant care is needed.',
      'Long drive of 7.5+ hours from southern Guatemala.'
    ],
    driveSummary: '7.5+ hrs de manejo con curvas de montaña y fuertes pendientes.',
    driveSummaryEn: '7.5+ hours driving with winding mountain switchbacks and steep grades.',
    babyNotes: 'Complicado para la bebé Emily (7 meses) por las 7.5 horas de curvas y la lejanía de centros hospitalarios pediátricos.',
    babyNotesEn: 'Challenging for 7-month Emily due to 7.5 hours of mountain curves and distance to pediatric emergency hospitals.',
    seniorNotes: 'Exigencia física alta para Bruce y Norma: trayecto largo en curvas, escaleras demandantes y roca caliza húmeda muy resbaladiza.',
    seniorNotesEn: 'High physical toll for Bruce & Norma: long curvy mountain drive, demanding stairs, and slick wet limestone surfaces.',
    votes: 0
  },
  {
    id: 'opt-december-hibrido',
    phase: 'december',
    title: 'Opción C: Gran Ruta Híbrida (Atitlán, Antigua & Semuc Champey)',
    titleEn: 'Option C: Grand Hybrid Circuit (Atitlán, Antigua & Semuc Champey)',
    tagline: 'Lo mejor de dos mundos: la magia volcánica del lago y las pozas turquesas en la selva',
    taglineEn: 'The best of both worlds: volcanic lake vistas and pristine turquoise jungle pools',
    dateRange: '3 Dic (noche) – 7 Dic (4 noches / 4 días)',
    dateRangeEn: 'Dec 3 (evening) – Dec 7 (4 nights / 4 days)',
    durationDays: 4,
    destinations: ['atitlan', 'antigua', 'semuc'],
    crewSummary: 'Grupo de 6 personas: Ever, Cori, Isabella, bebé Emily (7 meses), Bruce y Norma.',
    crewSummaryEn: 'Core crew of 6: Ever, Cori, Isabella, baby Emily (7 months), Bruce & Norma.',
    pros: [
      'Permite experimentar la diversidad geográfica total de Guatemala: altiplano volcánico y selva kárstica de las Verapaces.',
      'Paseo escénico en lancha en Lago de Atitlán más baño en las pozas de Semuc Champey en un solo viaje.'
    ],
    prosEn: [
      'Experience Guatemala’s entire natural spectrum: volcanic highlands and lush Verapaces rainforest.',
      'Private scenic boat cruise on Lake Atitlán plus swimming in Semuc’s tiered pools in one journey.'
    ],
    considerations: [
      'Itinerario extenuante: más de 13.5 horas acumuladas de manejo en solo 4 días.',
      'Cambios continuos de hotel cada noche sin tiempo de relajarse.',
      'Exposición a contrastes térmicos bruscos (frío en Atitlán vs. calor húmedo en Semuc).'
    ],
    considerationsEn: [
      'Exhausting itinerary: over 13.5 cumulative hours in the vehicle across only 4 days.',
      'Moving hotels every single night with virtually zero downtime.',
      'Sharp temperature swings (cool highland lake vs. muggy tropical jungle).'
    ],
    driveSummary: 'Circuito amplio: Ixhuatán ➔ Antigua/Atitlán (4h) ➔ Cobán (5.5h) ➔ Semuc (2h) ➔ Ixhuatán (7h).',
    driveSummaryEn: 'Extensive circuit: Ixhuatán ➔ Antigua/Atitlán (4h) ➔ Cobán (5.5h) ➔ Semuc (2h) ➔ Ixhuatán (7h).',
    babyNotes: 'No recomendable para la bebé Emily: demasiadas horas en silla de auto y cambios constantes de ambiente.',
    babyNotesEn: 'Not recommended for baby Emily: excessive car-seat confinement and continuous environmental changes.',
    seniorNotes: 'Muy fatigoso para Bruce y Norma (en sus 70s): más de 13 horas en carretera y caminatas complejas.',
    seniorNotesEn: 'Extremely tiring for Bruce & Norma (in their 70s): 13+ hours on the road and demanding surfaces.',
    votes: 0
  }
];

export const initialDays: DayPlan[] = [
  // WEEK 1: ARRIVAL & BASE
  {
    id: 'day-1',
    dayNumber: 1,
    date: '2026-11-15',
    dateFormatted: 'Dom, 15 Nov',
    dateFormattedEn: 'Sun, Nov 15',
    title: '¡Bienvenidos a Guatemala! Llegada y Almuerzo con Karla',
    titleEn: 'Welcome to Guatemala! Arrival & Welcome Meal with Karla',
    locationId: 'aeropuerto',
    locationName: 'Aeropuerto La Aurora ➔ Portal del Ángel / Pradera Concepción ➔ Ixhuatán',
    isKeyMilestone: true,
    milestoneBadge: '🛬 Llegada 2:30 PM & Almuerzo con Karla',
    milestoneBadgeEn: '🛬 Arrival 2:30 PM & Lunch with Karla',
    phase: 'initial_base',
    activities: [
      {
        id: 'act-1-1',
        timeOfDay: 'afternoon',
        timeLabel: '14:30',
        title: 'Recoger a Bruce y Norma en Aeropuerto La Aurora (GUA)',
        titleEn: 'Pick up Bruce & Norma at La Aurora Airport (GUA)',
        description: 'Vuelo aterriza. Recibimiento cálido familiar con letreros, abrazos y agua fresca mientras se acomoda el equipaje de forma segura en los vehículos.',
        descriptionEn: 'Flight touches down. Warm family greeting with welcome signs, big hugs, and loading luggage securely into vehicles.',
        tag: 'logistics',
        googleMapsUrl: 'https://maps.google.com/?q=La+Aurora+International+Airport+Guatemala'
      },
      {
        id: 'act-1-2',
        timeOfDay: 'afternoon',
        timeLabel: '15:45',
        title: 'Almuerzo de bienvenida & reencuentro con Karla (2 Opciones en CAES)',
        titleEn: 'Welcome lunch & reunion with Karla (2 Options on CAES highway)',
        description: 'Celebración y reencuentro con Karla para dar la bienvenida a Bruce y Norma, eligiendo entre dos opciones estratégicas sobre Carretera a El Salvador:\n• Opción A (Panorámica): Restaurante Portal del Ángel (Km 11.2) — Cortes de carne premium y terraza con vista espectacular a la Ciudad de Guatemala.\n• Opción B (Comodidad & Seguridad de Parqueo): Pradera Concepción (Km 15.5) — Centro comercial con parqueo techado ultra seguro (máxima tranquilidad para maletas en los baúles), elevadores para carriola y amplia variedad gastronómica (San Martín, Tre Fratelli, Saúl Bistro, Los Ranchos).',
        descriptionEn: 'Celebratory reunion with Bruce\'s friend Karla to welcome Bruce & Norma, choosing between two strategic venues along Carretera a El Salvador:\n• Option A (Scenic Overlook): Portal del Ángel (Km 11.2) — Premium steaks and terrace with sweeping panoramic views of Guatemala City.\n• Option B (Convenience & Parking Security): Pradera Concepción (Km 15.5) — Modern shopping center with multi-level covered parking (complete peace of mind for luggage in vehicles), elevators for strollers, and top family dining (San Martín, Tre Fratelli, Saúl Bistro, Los Ranchos).',
        tag: 'food',
        locationName: 'Portal del Ángel (Km 11.2) o Pradera Concepción (Km 15.5)',
        googleMapsUrl: 'https://maps.google.com/?q=Pradera+Concepcion+Carretera+a+El+Salvador'
      },
      {
        id: 'act-1-3',
        timeOfDay: 'evening',
        timeLabel: '17:45',
        title: 'Despedida de Karla y trayecto hacia Santa María Ixhuatán',
        titleEn: 'Farewell to Karla & scenic drive to Santa María Ixhuatán',
        description: 'Salida directa por la Carretera a El Salvador (CA-1 Oriente) rumbo a Santa Rosa pasando por Barberena y Cuilapa, aprovechando que ya se está sobre la ruta de salida de la ciudad.',
        descriptionEn: 'Direct highway cruise along CA-1 Oriente toward Santa Rosa passing Barberena and Cuilapa, already perfectly positioned on the outbound route.',
        tag: 'logistics'
      },
      {
        id: 'act-1-4',
        timeOfDay: 'evening',
        timeLabel: '19:30',
        title: 'Llegada a casa en Santa María Ixhuatán y descanso',
        titleEn: 'Arrival home in Santa María Ixhuatán & restful evening',
        description: 'Llegada a casa de Ever y Cori, bienvenida con la familia local, acomodación de Bruce y Norma en su habitación y descanso reparador tras el viaje internacional.',
        descriptionEn: 'Arrival at Ever & Cori’s home, welcoming with local family, settling Bruce & Norma into their cozy bedroom, and restful sleep after international travel.',
        tag: 'family'
      }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: '2026-11-16',
    dateFormatted: 'Lun, 16 Nov',
    dateFormattedEn: 'Mon, Nov 16',
    title: 'Aclimatación y mañana tranquila en Ixhuatán',
    titleEn: 'Acclimatization & gentle morning in Ixhuatán',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'initial_base',
    activities: [
      {
        id: 'act-2-1',
        timeOfDay: 'morning',
        title: 'Desayuno típico chapín con café recién tostado',
        titleEn: 'Traditional Guatemalan breakfast & fresh local coffee',
        description: 'Huevos al gusto, frijoles volteados, plátanos fritos, queso fresco de la región y tortillas calientes.',
        descriptionEn: 'Farm eggs, black refried beans, sweet plantains, fresh artisanal cheese, and handmade tortillas.',
        tag: 'food'
      },
      {
        id: 'act-2-2',
        timeOfDay: 'afternoon',
        title: 'Paseo relajado por el pueblo de Ixhuatán',
        titleEn: 'Relaxed walk through Ixhuatán town center',
        description: 'Conocer el parque central, la iglesia del pueblo y saludar a vecinos y amigos locales.',
        descriptionEn: 'Discovering town square, local church, and greeting community friends.',
        tag: 'relaxation'
      }
    ]
  },
  {
    id: 'day-3',
    dayNumber: 3,
    date: '2026-11-17',
    dateFormatted: 'Mar, 17 Nov',
    dateFormattedEn: 'Tue, Nov 17',
    title: 'Mirador La Cruz y atardecer en las colinas',
    titleEn: 'La Cruz Viewpoint & scenic sunset hills',
    locationId: 'ixhuatan',
    locationName: 'Mirador La Cruz, Ixhuatán',
    phase: 'initial_base',
    activities: [
      {
        id: 'act-3-1',
        timeOfDay: 'afternoon',
        timeLabel: '16:00',
        title: 'Subida al Mirador La Cruz',
        titleEn: 'Excursion up to Mirador La Cruz',
        description: 'Vista panorámica de 360 grados de todo el valle de Santa Rosa y volcanes lejanos al caer la tarde.',
        descriptionEn: '360-degree panoramic view of Santa Rosa valley and distant volcanic silhouettes at golden hour.',
        tag: 'adventure'
      },
      {
        id: 'act-3-2',
        timeOfDay: 'evening',
        title: 'Reunión y café con amigos de la comunidad',
        titleEn: 'Evening gathering & coffee with local friends',
        description: 'Compartir anécdotas con amigos de Ever que vienen a saludar a los visitantes.',
        descriptionEn: 'Heartwarming get-together with Ever’s childhood friends visiting to welcome Bruce & Norma.',
        tag: 'family'
      }
    ]
  },
  {
    id: 'day-4',
    dayNumber: 4,
    date: '2026-11-18',
    dateFormatted: 'Mié, 18 Nov',
    dateFormattedEn: 'Wed, Nov 18',
    title: 'Día en familia y preparación de maletas para la playa',
    titleEn: 'Family day & beach packing preparation',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'initial_base',
    activities: [
      {
        id: 'act-4-1',
        timeOfDay: 'morning',
        title: 'Juegos con Isabella y cuidados para la bebé Emily',
        titleEn: 'Playtime with Isabella & baby Emily bonding',
        description: 'Mañana en el patio de la casa, fotos familiares en las hamacas.',
        descriptionEn: 'Gentle morning in the courtyard, hammock photos, and quality multi-generation bonding.',
        tag: 'family'
      },
      {
        id: 'act-4-2',
        timeOfDay: 'afternoon',
        title: 'Preparación de equipaje playero',
        titleEn: 'Packing beach gear for Pacific getaway',
        description: 'Revisar bloqueador solar, toallas, sombreros y ropa fresca para Monterrico/Chapetón.',
        descriptionEn: 'Reviewing sunblock, hats, beach towels, and breezy outfits for Monterrico/El Chapetón.',
        tag: 'logistics'
      }
    ]
  },

  // PACIFIC BEACH ESCAPE (Nov 19 - 21)
  {
    id: 'day-5',
    dayNumber: 5,
    date: '2026-11-19',
    dateFormatted: 'Jue, 19 Nov',
    dateFormattedEn: 'Thu, Nov 19',
    title: 'Hacia la Costa del Pacífico: Monterrico y El Chapetón',
    titleEn: 'Depart to the Pacific Coast: Monterrico & El Chapetón',
    locationId: 'monterrico',
    locationName: 'Monterrico, Costa del Pacífico',
    lodgingName: 'Casa/Hotel frente al mar (2 noches)',
    phase: 'initial_base',
    activities: [
      {
        id: 'act-5-1',
        timeOfDay: 'morning',
        timeLabel: '09:00',
        title: 'Salida hacia Monterrico y El Chapetón',
        titleEn: 'Morning departure to Monterrico & El Chapetón',
        description: 'Trayecto de ~1.8 horas descendiendo hacia la costa cálida del Océano Pacífico.',
        descriptionEn: 'Pleasant 1.8-hour descent toward the warm Pacific coastline.',
        tag: 'logistics'
      },
      {
        id: 'act-5-2',
        timeOfDay: 'afternoon',
        timeLabel: '13:00',
        title: 'Almuerzo con ceviche fresco y descanso frente al mar',
        titleEn: 'Fresh seafood lunch & oceanfront relaxation',
        description: 'Check-in en el hotel/casa con piscina. Ceviches y mariscos frente a las olas.',
        descriptionEn: 'Check-in at beachfront hotel/villa with pool. Fresh ceviche and tropical drinks by the waves.',
        tag: 'beach'
      },
      {
        id: 'act-5-3',
        timeOfDay: 'evening',
        timeLabel: '17:30',
        title: 'Liberación de tortuguitas marinas al atardecer',
        titleEn: 'Sunset sea turtle hatchling release',
        description: 'En el Tortugario local: ayudar a guiar crías de tortuga parlama hacia el mar. ¡Mágico para Isabella y toda la familia!',
        descriptionEn: 'At the local conservation sanctuary: guiding newborn sea turtle hatchlings to the surf. Magical memory!',
        tag: 'adventure'
      }
    ]
  },
  {
    id: 'day-6',
    dayNumber: 6,
    date: '2026-11-20',
    dateFormatted: 'Vie, 20 Nov',
    dateFormattedEn: 'Fri, Nov 20',
    title: 'Manglares del Canal de Chiquimulilla & Relax de Playa',
    titleEn: 'Chiquimulilla Mangrove Safari & Beach Day',
    locationId: 'monterrico',
    locationName: 'Monterrico & El Chapetón',
    phase: 'initial_base',
    activities: [
      {
        id: 'act-6-1',
        timeOfDay: 'morning',
        timeLabel: '06:30',
        title: 'Tour en lancha por los manglares al amanecer',
        titleEn: 'Sunrise boat cruise through mangrove tunnels',
        description: 'Aguas calmas, avistamiento de aves acuáticas, garzas y lirios flotantes.',
        descriptionEn: 'Calm glassy waters, observing tropical birds, herons, and blooming water lilies.',
        tag: 'adventure'
      },
      {
        id: 'act-6-2',
        timeOfDay: 'afternoon',
        title: 'Piscina y descanso bajo las palmeras',
        titleEn: 'Poolside lounging under the coconut palms',
        description: 'Disfrute seguro en la piscina para Emily y los abuelos, protegiéndose del sol.',
        descriptionEn: 'Safe shaded poolside relaxation for baby Emily and the grandparents.',
        tag: 'relaxation'
      }
    ]
  },
  {
    id: 'day-7',
    dayNumber: 7,
    date: '2026-11-21',
    dateFormatted: 'Sáb, 21 Nov',
    dateFormattedEn: 'Sat, Nov 21',
    title: 'Regreso a casa en Ixhuatán y descanso',
    titleEn: 'Return home to Ixhuatán & rest',
    locationId: 'ixhuatan',
    locationName: 'Monterrico -> Ixhuatán',
    isRestDay: true,
    phase: 'initial_base',
    activities: [
      {
        id: 'act-7-1',
        timeOfDay: 'morning',
        timeLabel: '10:00',
        title: 'Desayuno playero y viaje de vuelta a Ixhuatán',
        titleEn: 'Beachside breakfast & scenic drive back to Ixhuatán',
        description: 'Regreso tranquilo antes del calor del mediodía para llegar a descansar a casa.',
        descriptionEn: 'Leisurely drive back before midday heat, arriving home to unpack and unwind.',
        tag: 'logistics'
      },
      {
        id: 'act-7-2',
        timeOfDay: 'afternoon',
        title: 'Tarde de siesta y preparar excursión de mañana',
        titleEn: 'Afternoon nap & prepping for tomorrow’s waterfall',
        description: 'Descanso en hamacas tras el viaje a la costa.',
        descriptionEn: 'Resting in hammocks and gearing up for Sunday waterfall excursion.',
        tag: 'relaxation'
      }
    ]
  },
  {
    id: 'day-8',
    dayNumber: 8,
    date: '2026-11-22',
    dateFormatted: 'Dom, 22 Nov',
    dateFormattedEn: 'Sun, Nov 22',
    title: 'Excursión a las Cataratas Los Amates en Ixhuatán',
    titleEn: 'Excursion to Los Amates Waterfalls in Ixhuatán',
    locationId: 'los-amates',
    locationName: 'Cataratas Los Amates, Santa Rosa',
    phase: 'initial_base',
    activities: [
      {
        id: 'act-8-1',
        timeOfDay: 'morning',
        timeLabel: '09:00',
        title: 'Salida hacia las Cataratas Los Amates',
        titleEn: 'Departure to Los Amates Waterfalls',
        description: 'Una de las cascadas más espectaculares de Centroamérica, orgullo de Ixhuatán.',
        descriptionEn: 'One of Central America’s most stunning waterfall amphitheaters, pride of Ixhuatán.',
        tag: 'adventure'
      },
      {
        id: 'act-8-2',
        timeOfDay: 'afternoon',
        title: 'Almuerzo campestre junto al río y pozas cristalinas',
        titleEn: 'Riverside country picnic by crystalline natural pools',
        description: 'Comida familiar con música y sombra natural entre los cañones de roca.',
        descriptionEn: 'Picnic lunch with fresh mountain breeze under natural canyon shade.',
        tag: 'food'
      }
    ]
  },
  {
    id: 'day-9',
    dayNumber: 9,
    date: '2026-11-23',
    dateFormatted: 'Lun, 23 Nov',
    dateFormattedEn: 'Mon, Nov 23',
    title: 'Día de descanso en casa: cocina en familia con suegros',
    titleEn: 'Homestead rest day: family cooking with in-laws',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'initial_base',
    activities: [
      {
        id: 'act-9-1',
        timeOfDay: 'morning',
        title: 'Cocinar recetas tradicionales con Jonchito y Lidia',
        titleEn: 'Cooking traditional recipes with Jonchito & Lidia',
        description: 'Preparar tamalitos, caldos tradicionales y postres con ingredientes de la huerta.',
        descriptionEn: 'Baking artisanal treats and slow-cooked local recipes with fresh garden produce.',
        tag: 'family'
      }
    ]
  },
  {
    id: 'day-10',
    dayNumber: 10,
    date: '2026-11-24',
    dateFormatted: 'Mar, 24 Nov',
    dateFormattedEn: 'Tue, Nov 24',
    title: 'Últimos preparativos para el Gran Viaje de Thanksgiving',
    titleEn: 'Final prep for Thanksgiving Big Road Trip',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'initial_base',
    activities: [
      {
        id: 'act-10-1',
        timeOfDay: 'afternoon',
        title: 'Revisión del vehículo y maletas según opción elegida',
        titleEn: 'Vehicle check & packing according to chosen route',
        description: 'Verificar pasaportes (si es El Salvador) o equipaje de selva (si es Río Dulce).',
        descriptionEn: 'Check travel documents (if El Salvador) or river clothes (if Río Dulce).',
        tag: 'logistics'
      }
    ]
  },

  // THANKSGIVING BIG TRIP (Nov 25 - 30)
  {
    id: 'day-11',
    dayNumber: 11,
    date: '2026-11-25',
    dateFormatted: 'Mié, 25 Nov',
    dateFormattedEn: 'Wed, Nov 25',
    title: '¡Comienza el Gran Viaje! Salida después de mediodía',
    titleEn: 'The Big Trip Begins! Departure after midday',
    locationId: 'ruta-flores',
    locationName: 'Rumbo al destino elegido',
    isKeyMilestone: true,
    milestoneBadge: '🚗 Salida 1:00 PM',
    milestoneBadgeEn: '🚗 Departure 1:00 PM',
    phase: 'thanksgiving',
    activities: [
      {
        id: 'act-11-1',
        timeOfDay: 'afternoon',
        timeLabel: '13:00',
        title: 'Ever sale de permiso laboral: partida del grupo',
        titleEn: 'Ever concludes work permit: group departs',
        description: 'Toda la familia a bordo. Si es El Salvador: hacia la frontera Valle Nuevo / Chinamas. Si es Río Dulce: hacia Chiquimula.',
        descriptionEn: 'Entire family on board. If El Salvador: toward border. If Río Dulce: highway to Chiquimula.',
        tag: 'logistics'
      },
      {
        id: 'act-11-2',
        timeOfDay: 'evening',
        title: 'Llegada, check-in y cena relajada de primera noche',
        titleEn: 'Arrival, check-in & relaxing first evening dinner',
        description: 'Desempacar con calma y cenar temprano para descansar.',
        descriptionEn: 'Gentle check-in and early dinner so everyone gets a restorative night of rest.',
        tag: 'food'
      }
    ]
  },
  {
    id: 'day-12',
    dayNumber: 12,
    date: '2026-11-26',
    dateFormatted: 'Jue, 26 Nov',
    dateFormattedEn: 'Thu, Nov 26',
    title: '🦃 Día de Acción de Gracias (Thanksgiving) & Día Libre de Ever',
    titleEn: '🦃 Thanksgiving Celebration & Ever’s Holiday',
    locationId: 'coatepeque',
    locationName: 'Destino de Thanksgiving',
    isKeyMilestone: true,
    milestoneBadge: '🦃 Cena Especial Thanksgiving',
    milestoneBadgeEn: '🦃 Special Thanksgiving Feast',
    phase: 'thanksgiving',
    activities: [
      {
        id: 'act-12-1',
        timeOfDay: 'morning',
        title: 'Paseo escénico matutino (Lago o Río)',
        titleEn: 'Scenic morning stroll (Lake or River)',
        description: 'Vistas panorámicas espectaculares compartiendo reflexiones de gratitud con Bruce y Norma.',
        descriptionEn: 'Glorious panoramas sharing reflections of gratitude and friendship with Bruce & Norma.',
        tag: 'thanksgiving'
      },
      {
        id: 'act-12-2',
        timeOfDay: 'evening',
        timeLabel: '18:00',
        title: 'Cena festiva de Acción de Gracias (Thanksgiving Dinner)',
        titleEn: 'Festive Thanksgiving Dinner Gathering',
        description: 'Brindis especial de las tres generaciones: agradeciendo la salud, la amistad y este reencuentro inolvidable.',
        descriptionEn: 'Multi-generational holiday toast: celebrating health, lifelong friendship, and this dream trip.',
        tag: 'thanksgiving'
      }
    ]
  },
  {
    id: 'day-13',
    dayNumber: 13,
    date: '2026-11-27',
    dateFormatted: 'Vie, 27 Nov',
    dateFormattedEn: 'Fri, Nov 27',
    title: 'Día de Exploración & Relax (Día libre de Ever)',
    titleEn: 'Exploration & Relaxation Day (Ever’s holiday)',
    locationId: 'ruta-flores',
    locationName: 'Pueblos coloniales o Selva de Izabal',
    phase: 'thanksgiving',
    activities: [
      {
        id: 'act-13-1',
        timeOfDay: 'morning',
        title: 'Actividad principal: Termales o Paseo en lancha',
        titleEn: 'Main excursion: Hot springs or Canyon boat safari',
        description: 'Aguas termales en El Salvador o Cañón de Río Dulce navegando entre paredes de roca verde.',
        descriptionEn: 'Thermal waters in El Salvador or navigating the majestic green gorges of Río Dulce.',
        tag: 'adventure'
      },
      {
        id: 'act-13-2',
        timeOfDay: 'afternoon',
        title: 'Tarde de café y compras de artesanías',
        titleEn: 'Afternoon coffee tasting & artisanal crafts',
        description: 'Degustar café galardonado y recuerdos locales.',
        descriptionEn: 'Award-winning coffee tasting and handcrafted souvenirs.',
        tag: 'food'
      }
    ]
  },
  {
    id: 'day-14',
    dayNumber: 14,
    date: '2026-11-28',
    dateFormatted: 'Sáb, 28 Nov',
    dateFormattedEn: 'Sat, Nov 28',
    title: 'Aventuras locales y tiempo en familia',
    titleEn: 'Local adventures & family downtime',
    locationId: 'rio-dulce',
    locationName: 'Destino activo',
    phase: 'thanksgiving',
    activities: [
      {
        id: 'act-14-1',
        timeOfDay: 'morning',
        title: 'Caminata botánica suave o paseo cultural',
        titleEn: 'Gentle botanical walk or cultural tour',
        description: 'Paseo con sombra apto para carriola y personas mayores.',
        descriptionEn: 'Shaded walk suitable for stroller and senior travelers.',
        tag: 'relaxation'
      }
    ]
  },
  {
    id: 'day-15',
    dayNumber: 15,
    date: '2026-11-29',
    dateFormatted: 'Dom, 29 Nov',
    dateFormattedEn: 'Sun, Nov 29',
    title: 'Día de descanso antes del retorno',
    titleEn: 'Rest day ahead of homeward journey',
    locationId: 'chiquimula',
    locationName: 'En ruta / Base de viaje',
    phase: 'thanksgiving',
    activities: [
      {
        id: 'act-15-1',
        timeOfDay: 'afternoon',
        title: 'Piscina del hotel y sobremesa familiar',
        titleEn: 'Hotel pool lounging & extended family chat',
        description: 'Tarde tranquila y siesta para la bebé Emily.',
        descriptionEn: 'Quiet afternoon by the water with sweet naps for baby Emily.',
        tag: 'relaxation'
      }
    ]
  },
  {
    id: 'day-16',
    dayNumber: 16,
    date: '2026-11-30',
    dateFormatted: 'Lun, 30 Nov',
    dateFormattedEn: 'Mon, Nov 30',
    title: 'Viaje de regreso a casa en Ixhuatán (Permiso de Ever)',
    titleEn: 'Return drive home to Ixhuatán (Ever’s permit day)',
    locationId: 'ixhuatan',
    locationName: 'Retorno a Ixhuatán',
    isKeyMilestone: true,
    milestoneBadge: '🏡 Regreso al Hogar',
    milestoneBadgeEn: '🏡 Back Home',
    phase: 'thanksgiving',
    activities: [
      {
        id: 'act-16-1',
        timeOfDay: 'morning',
        title: 'Viaje de vuelta seguro y cómodo hacia Ixhuatán',
        titleEn: 'Safe and comfortable return drive to Ixhuatán',
        description: 'Paradas estratégicas para estirar las piernas y tomar refrigerios.',
        descriptionEn: 'Strategic scenic stops to stretch legs and enjoy road snacks.',
        tag: 'logistics'
      },
      {
        id: 'act-16-2',
        timeOfDay: 'evening',
        title: 'Llegada a casa: cena reconfortante y descanso',
        titleEn: 'Arrival home: comforting dinner and deep rest',
        description: 'Dormir en la tranquilidad del hogar en Ixhuatán.',
        descriptionEn: 'Sleeping soundly in the familiar tranquility of home.',
        tag: 'family'
      }
    ]
  },

  // POST-THANKSGIVING RECHARGE (Dec 1 - 2)
  {
    id: 'day-17',
    dayNumber: 17,
    date: '2026-12-01',
    dateFormatted: 'Mar, 01 Dic',
    dateFormattedEn: 'Tue, Dec 01',
    title: 'Descanso total en Ixhuatán y restaurantes del pueblo',
    titleEn: 'Total rest in Ixhuatán & local town eateries',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'post_thanksgiving_base',
    activities: [
      {
        id: 'act-17-1',
        timeOfDay: 'afternoon',
        title: 'Almuerzo en restaurante típico de Ixhuatán',
        titleEn: 'Lunch at a beloved local Ixhuatán restaurant',
        description: 'Probar carnes asadas y platillos auténticos de la región.',
        descriptionEn: 'Tasting authentic Santa Rosa grilled cuts and regional specialties.',
        tag: 'food'
      }
    ]
  },
  {
    id: 'day-18',
    dayNumber: 18,
    date: '2026-12-02',
    dateFormatted: 'Mié, 02 Dic',
    dateFormattedEn: 'Wed, Dec 02',
    title: 'Día de hogar, juegos con Isabella y descanso',
    titleEn: 'Home sweet home: games with Isabella & downtime',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'post_thanksgiving_base',
    activities: [
      {
        id: 'act-18-1',
        timeOfDay: 'morning',
        title: 'Mañana de cuentos y hamacas en el corredor',
        titleEn: 'Morning storybooks & porch hammocks',
        description: 'Bruce y Norma pasando tiempo de calidad con Isabella y la pequeña Emily.',
        descriptionEn: 'Bruce & Norma spending heartwarming quality time reading with Isabella and cuddling baby Emily.',
        tag: 'family'
      }
    ]
  },

  // DECEMBER GETAWAY (Dec 3 night - Dec 7)
  {
    id: 'day-19',
    dayNumber: 19,
    date: '2026-12-03',
    dateFormatted: 'Jue, 03 Dic',
    dateFormattedEn: 'Thu, Dec 03',
    title: 'Salida por la noche hacia la Escapada de Diciembre (Grupo de 6)',
    titleEn: 'Evening departure for December Getaway (Core Crew of 6)',
    locationId: 'antigua',
    locationName: 'Ixhuatán -> Antigua / Destino',
    phase: 'december',
    activities: [
      {
        id: 'act-19-1',
        timeOfDay: 'evening',
        timeLabel: '18:30',
        title: 'Salida nocturna para evitar tráfico',
        titleEn: 'Evening drive avoiding city traffic',
        description: 'Viaje fresco y tranquilo hacia Antigua Guatemala para pasar la primera noche. Grupo de viaje (6 personas): Ever, Cori, Isabella, bebé Emily, Bruce y Norma.',
        descriptionEn: 'Cool, pleasant night drive up into the highlands to overnight in colonial Antigua. Travel crew (6 people): Ever, Cori, Isabella, baby Emily, Bruce, and Norma.',
        tag: 'logistics'
      }
    ]
  },
  {
    id: 'day-20',
    dayNumber: 20,
    date: '2026-12-04',
    dateFormatted: 'Vie, 04 Dic',
    dateFormattedEn: 'Fri, Dec 04',
    title: 'Antigua Colonial: Arco de Santa Catalina & Casa Santo Domingo',
    titleEn: 'Colonial Antigua: Santa Catalina Arch & Santo Domingo',
    locationId: 'antigua',
    locationName: 'Antigua Guatemala',
    phase: 'december',
    activities: [
      {
        id: 'act-20-1',
        timeOfDay: 'morning',
        title: 'Paseo matutino por el Arco y Parque Central',
        titleEn: 'Morning walk past the Yellow Arch & Central Plaza',
        description: 'Fotos inolvidables con el volcán de fondo, calles coloniales y carruajes de caballos.',
        descriptionEn: 'Unforgettable photos with volcano backdrop, colonial cobblestones, and ornate fountains.',
        tag: 'adventure'
      },
      {
        id: 'act-20-2',
        timeOfDay: 'afternoon',
        title: 'Visita al Hotel Museo Casa Santo Domingo',
        titleEn: 'Exploration of Casa Santo Domingo Museum & Grounds',
        description: 'Senderos planos ideales para carriola y personas mayores, jardines con guacamayas y criptas históricas.',
        descriptionEn: 'Flat paved paths ideal for strollers and seniors, blooming gardens with scarlet macaws, and historic crypts.',
        tag: 'relaxation'
      }
    ]
  },
  {
    id: 'day-21',
    dayNumber: 21,
    date: '2026-12-05',
    dateFormatted: 'Sáb, 05 Dic',
    dateFormattedEn: 'Sat, Dec 05',
    title: 'Mágico Lago de Atitlán: Llegada a Panajachel',
    titleEn: 'Magical Lake Atitlán: Arrival in Panajachel',
    locationId: 'atitlan',
    locationName: 'Panajachel, Lago de Atitlán',
    lodgingName: 'Hotel Atitlán / Porta Hotel del Lago',
    phase: 'december',
    activities: [
      {
        id: 'act-21-1',
        timeOfDay: 'morning',
        timeLabel: '09:00',
        title: 'Viaje panorámico hacia el Lago de Atitlán',
        titleEn: 'Scenic mountain drive toward Lake Atitlán',
        description: 'Primeras vistas del lago desde el mirador de Godínez. ¡El lago más hermoso del mundo!',
        descriptionEn: 'First jaw-dropping glimpse of the blue lake from Godínez overlook. The world’s prettiest lake!',
        tag: 'adventure'
      },
      {
        id: 'act-21-2',
        timeOfDay: 'afternoon',
        title: 'Jardines botánicos del Hotel Atitlán',
        titleEn: 'Botanical gardens & lakeside sunset at Hotel Atitlán',
        description: 'Jardines llenos de rosas, hortensias y aves exóticas junto a la orilla del lago.',
        descriptionEn: 'Lush rose and hydrangea gardens with exotic birds directly at the lake shore.',
        tag: 'relaxation'
      }
    ]
  },
  {
    id: 'day-22',
    dayNumber: 22,
    date: '2026-12-06',
    dateFormatted: 'Dom, 06 Dic',
    dateFormattedEn: 'Sun, Dec 06',
    title: 'Lancha privada a San Juan La Laguna: Arte y Tradición',
    titleEn: 'Private boat to San Juan La Laguna: Art & Tradition',
    locationId: 'atitlan',
    locationName: 'San Juan La Laguna, Sololá',
    phase: 'december',
    activities: [
      {
        id: 'act-22-1',
        timeOfDay: 'morning',
        timeLabel: '09:30',
        title: 'Paseo en lancha privada sin oleaje',
        titleEn: 'Calm morning private boat ride across lake',
        description: 'Cruzar las aguas calmas de la mañana hacia San Juan La Laguna.',
        descriptionEn: 'Cruising calm glassy morning waters across the lake directly to San Juan La Laguna.',
        tag: 'adventure'
      },
      {
        id: 'act-22-2',
        timeOfDay: 'afternoon',
        title: 'Cooperativa de tejedoras mayas y taller de chocolate',
        titleEn: 'Mayan women weaving cooperative & artisanal cacao',
        description: 'Demostración de teñido natural con plantas y degustación de chocolate artesanal.',
        descriptionEn: 'Natural plant dye demonstrations by master weavers and delicious artisanal chocolate tasting.',
        tag: 'family'
      }
    ]
  },
  {
    id: 'day-23',
    dayNumber: 23,
    date: '2026-12-07',
    dateFormatted: 'Lun, 07 Dic',
    dateFormattedEn: 'Mon, Dec 07',
    title: 'Despedida del Altiplano y regreso a Santa María Ixhuatán',
    titleEn: 'Farewell to Highlands & return home to Santa María Ixhuatán',
    locationId: 'ixhuatan',
    locationName: 'Atitlán -> Santa María Ixhuatán',
    isKeyMilestone: true,
    milestoneBadge: '🏡 Regreso a Base',
    milestoneBadgeEn: '🏡 Back to Base',
    phase: 'december',
    activities: [
      {
        id: 'act-23-1',
        timeOfDay: 'morning',
        timeLabel: '10:30',
        title: 'Desayuno frente al lago y viaje de regreso a Santa Rosa',
        titleEn: 'Lakefront breakfast & return journey to Santa Rosa',
        description: 'Retorno seguro y cómodo hacia Santa María Ixhuatán para los días finales de descanso y convivencia.',
        descriptionEn: 'Safe, smooth drive back down to Santa María Ixhuatán for the final restful days together.',
        tag: 'logistics'
      }
    ]
  },

  // FINAL RECHARGE & FAREWELL (Dec 8 - 11)
  {
    id: 'day-24',
    dayNumber: 24,
    date: '2026-12-08',
    dateFormatted: 'Mar, 08 Dic',
    dateFormattedEn: 'Tue, Dec 08',
    title: 'Día de descanso, café casero y fotos del viaje',
    titleEn: 'Rest day, home coffee & trip photo sharing',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'farewell_base',
    activities: [
      {
        id: 'act-24-1',
        timeOfDay: 'afternoon',
        title: 'Tarde de revisión de fotos y anécdotas en el patio',
        titleEn: 'Afternoon photo sharing & storytelling on the porch',
        description: 'Ver juntos las fotos de la playa, las cascadas, Thanksgiving y Atitlán.',
        descriptionEn: 'Viewing hundreds of precious trip photos from the beach, waterfalls, Thanksgiving, and the lake.',
        tag: 'family'
      }
    ]
  },
  {
    id: 'day-25',
    dayNumber: 25,
    date: '2026-12-09',
    dateFormatted: 'Mié, 09 Dic',
    dateFormattedEn: 'Wed, Dec 09',
    title: 'Visita de despedida a amistades de Ixhuatán',
    titleEn: 'Farewell visits with local Ixhuatán friends',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'farewell_base',
    activities: [
      {
        id: 'act-25-1',
        timeOfDay: 'evening',
        title: 'Cena especial con amigos del pueblo',
        titleEn: 'Special farewell dinner with town friends',
        description: 'Compartir comida típica con amigos de la infancia de Ever que vinieron a despedirse.',
        descriptionEn: 'Sharing delicious local food with Ever’s friends wishing Bruce & Norma safe travels.',
        tag: 'family'
      }
    ]
  },
  {
    id: 'day-26',
    dayNumber: 26,
    date: '2026-12-10',
    dateFormatted: 'Jue, 10 Dic',
    dateFormattedEn: 'Thu, Dec 10',
    title: 'Gran almuerzo familiar de despedida y preparación de maletas',
    titleEn: 'Grand family farewell feast & luggage packing',
    locationId: 'ixhuatan',
    locationName: 'Ixhuatán, Santa Rosa',
    isRestDay: true,
    phase: 'farewell_base',
    activities: [
      {
        id: 'act-26-1',
        timeOfDay: 'afternoon',
        title: 'Gran comida de despedida con toda la familia Molina',
        titleEn: 'Grand celebration feast with the entire Molina family',
        description: 'Jonchito, Lidia, Isabel, Nely, Cori, Ever, Isabella y Emily despidiendo a Bruce y Norma con mucho cariño.',
        descriptionEn: 'Jonchito, Lidia, Isabel, Nely, Cori, Ever, Isabella and Emily sending off Bruce & Norma with heartfelt warmth.',
        tag: 'family'
      },
      {
        id: 'act-26-2',
        timeOfDay: 'evening',
        title: 'Chequeo de maletas, pasaportes y pases de abordar',
        titleEn: 'Luggage weigh-in, passports & boarding pass check',
        description: 'Organizar café de regalo, artesanías y documentos para el vuelo de mañana.',
        descriptionEn: 'Packing gift coffee, artisanal crafts, and double-checking passports for tomorrow’s departure.',
        tag: 'logistics'
      }
    ]
  },
  {
    id: 'day-27',
    dayNumber: 27,
    date: '2026-12-11',
    dateFormatted: 'Vie, 11 Dic',
    dateFormattedEn: 'Fri, Dec 11',
    title: 'Traslado al Aeropuerto La Aurora y vuelo de regreso a EE.UU.',
    titleEn: 'Transfer to La Aurora Airport & flight back home to USA',
    locationId: 'aeropuerto',
    locationName: 'Ixhuatán -> Aeropuerto La Aurora (GUA)',
    isKeyMilestone: true,
    milestoneBadge: '🛫 Retorno al Aeropuerto (Mañana)',
    milestoneBadgeEn: '🛫 Airport Return (Morning)',
    phase: 'farewell_base',
    activities: [
      {
        id: 'act-27-1',
        timeOfDay: 'morning',
        timeLabel: '07:30',
        title: 'Salida matutina hacia el Aeropuerto La Aurora',
        titleEn: 'Morning departure drive to La Aurora Airport',
        description: 'Traslado con tiempo suficiente previendo el tráfico matutino de la capital.',
        descriptionEn: 'Early scenic transfer allowing plenty of buffer time for capital city morning traffic.',
        tag: 'logistics',
        googleMapsUrl: 'https://maps.google.com/?q=La+Aurora+International+Airport+Guatemala'
      },
      {
        id: 'act-27-2',
        timeOfDay: 'morning',
        timeLabel: '10:30',
        title: 'Check-in en aerolínea y abrazo de despedida',
        titleEn: 'Airline counter check-in & fond farewell hugs',
        description: 'Despedida en la terminal internacional con recuerdos para toda la vida.',
        descriptionEn: 'Heartwarming farewell at the international departures gate with memories that will last a lifetime!',
        tag: 'logistics'
      }
    ]
  }
];

export const initialPackingItems: PackingItem[] = [
  // MASTER ESSENTIALS
  {
    id: 'pack-m-passports-kids',
    category: 'master',
    title: '⚠️ URGENTE: Pasaporte de Emily (nuevo) e Isabella (renovación)',
    titleEn: '⚠️ URGENT: Passports for Emily (new) & Isabella (renewal)',
    description: 'Requisito migratorio obligatorio para menores de edad si se viaja a El Salvador. Agendar cita en IGM Guatemala inmediatamente (pago Banrural $50 USD, certificados RENAP con QR y ambos padres con DPI).',
    descriptionEn: 'Mandatory immigration requirement for minors entering El Salvador. Schedule appointment at IGM Guatemala right away ($50 fee at Banrural, recent RENAP birth certificates with QR, both parents present with DPI).',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-m-tourist-card-cash',
    category: 'master',
    title: 'Efectivo para Tarjeta de Turismo de Bruce & Norma ($12 USD c/u)',
    titleEn: 'Cash for Bruce & Norma Tourist Card ($12 USD each)',
    description: 'Migración de El Salvador cobra $12 USD exactos en efectivo por persona a ciudadanos estadounidenses al ingresar.',
    descriptionEn: 'El Salvador Immigration collects exactly $12 USD in cash per person for US passport holders upon entry.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-m-1',
    category: 'master',
    title: 'Pasaportes vigentes (mínimo 6 meses de vigencia)',
    titleEn: 'Valid Passports (at least 6 months validity)',
    description: 'Imprescindible para Bruce & Norma y para cruzar a El Salvador si eligen esa opción.',
    descriptionEn: 'Crucial for Bruce & Norma and for El Salvador border crossing if chosen.',
    checked: true,
    isEssential: true
  },
  {
    id: 'pack-m-2',
    category: 'master',
    title: 'Documentos de Identificación (DPI) de la familia guatemalteca',
    titleEn: 'Guatemalan Family IDs (DPI cards)',
    description: 'DPIs vigentes para Jonchito, Lidia, Isabel, Nely, Cori y Ever.',
    descriptionEn: 'Current national IDs for local border crossings and hotel check-ins.',
    checked: true,
    isEssential: true
  },
  {
    id: 'pack-m-3',
    category: 'master',
    title: 'Seguro médico de viaje internacional',
    titleEn: 'International Travel Health Insurance',
    description: 'Para Bruce y Norma, guardando números de asistencia en el teléfono.',
    descriptionEn: 'Coverage policy details and 24/7 hotline saved in phones for Bruce & Norma.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-m-4',
    category: 'master',
    title: 'Dólares en efectivo ($ USD) y Quetzales (Q GTQ)',
    titleEn: 'Cash in US Dollars ($ USD) & Quetzales (Q GTQ)',
    description: 'Billetes limpios sin roturas. Dólares se usan en El Salvador; Quetzales en Guatemala.',
    descriptionEn: 'Crisp unmarked bills. US Dollars used in El Salvador; Quetzales across Guatemala.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-m-5',
    category: 'master',
    title: 'Cargadores, baterías externas (Power Banks) y cables',
    titleEn: 'Phone chargers, portable power banks & USB cables',
    description: 'Enchufe en Guatemala y El Salvador es el mismo estándar que en EE.UU. (Tipo A/B, 110V).',
    descriptionEn: 'Plugs in Guatemala and El Salvador are the exact same standard as the US (Type A/B 110V).',
    checked: false,
    isEssential: false
  },

  // PACIFIC BEACH PACK
  {
    id: 'pack-b-1',
    category: 'beach',
    title: 'Protector solar biodegradable / reef-safe (FPS 50+)',
    titleEn: 'Biodegradable Reef-Safe Sunscreen (SPF 50+)',
    description: 'El sol del Pacífico en Monterrico y El Chapetón es intenso.',
    descriptionEn: 'Pacific sun at Monterrico & El Chapetón is strong; protects ocean life.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-b-2',
    category: 'beach',
    title: 'Sandalias / chanclas gruesas (la arena volcánica negra se calienta)',
    titleEn: 'Thick beach sandals (black volcanic sand gets very hot)',
    description: 'Indispensable para caminar de la casa/hotel a la orilla del mar.',
    descriptionEn: 'Essential for walking from the hotel patio across dark sand to the waves.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-b-3',
    category: 'beach',
    title: 'Sombreros de ala ancha y lentes de sol con filtro UV',
    titleEn: 'Wide-brim sun hats & UV protective sunglasses',
    description: 'Para proteger a los abuelos y a los niños del reflejo del agua.',
    descriptionEn: 'Shields seniors and children from direct tropical glare.',
    checked: false,
    isEssential: false
  },
  {
    id: 'pack-b-4',
    category: 'beach',
    title: 'Repelente de mosquitos amigable para la piel',
    titleEn: 'Gentle mosquito repellent spray / lotion',
    description: 'Para el paseo en lancha en los manglares de Chiquimulilla.',
    descriptionEn: 'Crucial for morning mangrove canal boat cruise.',
    checked: false,
    isEssential: true
  },

  // HIGHLAND COOL (Antigua / Atitlán / Ataco)
  {
    id: 'pack-h-1',
    category: 'highland',
    title: 'Chumpa / chaqueta ligera o fleece para las noches (12°C - 15°C)',
    titleEn: 'Light jacket or cozy fleece for highland evenings (54°F - 60°F)',
    description: 'En Antigua y Lago de Atitlán refresca bastante al ponerse el sol.',
    descriptionEn: 'Evenings in Antigua and Lake Atitlán get crisp once the sun sets.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-h-2',
    category: 'highland',
    title: 'Zapatos cómodos con suela antideslizante para empedrado',
    titleEn: 'Sturdy, comfortable walking shoes with grip for cobblestones',
    description: 'Las calles de Antigua y Ataco son de piedra colonial; evitar suelas lisas o tacones.',
    descriptionEn: 'Antigua and Ataco streets are historical cobblestones; avoid smooth soles.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-h-3',
    category: 'highland',
    title: 'Pashmina, bufanda liviana o suéter abrigador',
    titleEn: 'Light scarf, wrap or cardigan for breezy boat rides',
    description: 'El viento en la lancha en el Lago de Atitlán puede ser frío.',
    descriptionEn: 'The breeze across Lake Atitlán during boat crossings can feel cool.',
    checked: false,
    isEssential: false
  },

  // JUNGLE & RÍO DULCE
  {
    id: 'pack-j-1',
    category: 'jungle',
    title: 'Repelente de mosquitos extra fuerte (DEET o Lemon Eucalyptus)',
    titleEn: 'High-efficacy mosquito repellent (DEET or Picaridin)',
    description: 'Indispensable para Río Dulce, Livingston y senderos de selva.',
    descriptionEn: 'Indispensable for Río Dulce, Livingston, and jungle trails.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-j-2',
    category: 'jungle',
    title: 'Ropa de secado rápido y manga larga fresca transpirable',
    titleEn: 'Quick-dry breathable long-sleeve shirts (sun/bug protection)',
    description: 'Protege del sol y de picaduras mientras mantiene el cuerpo fresco.',
    descriptionEn: 'Keeps you cool while shielding arms from tropical sun and insects.',
    checked: false,
    isEssential: false
  },
  {
    id: 'pack-j-3',
    category: 'jungle',
    title: 'Capa impermeable liviana o poncho para lluvia tropical',
    titleEn: 'Lightweight packable rain poncho / windbreaker',
    description: 'En el caribe guatemalteco puede haber chubascos repentinos y refrescantes.',
    descriptionEn: 'Caribbean Guatemala can have sudden, refreshing tropical showers.',
    checked: false,
    isEssential: false
  },

  // BABY EMILY SPECIAL KIT (7 MONTHS)
  {
    id: 'pack-baby-1',
    category: 'baby',
    title: 'Portabebé ergonómico de tela (Baby Carrier / Fular)',
    titleEn: 'Ergonomic Baby Carrier (Manduca/Ergobaby/Wrap)',
    description: '¡CRUCIAL! En calles empedradas de Antigua y senderos de Atitlán la carriola no rueda bien.',
    descriptionEn: 'CRITICAL! Strollers struggle on cobblestone streets and boat docks; carrier is a lifesaver.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-baby-2',
    category: 'baby',
    title: 'Fórmula infantil suficiente, biberones y agua purificada sellada',
    titleEn: 'Baby formula, sanitized bottles & sealed purified nursery water',
    description: 'Llevar marca habitual para evitar cambios en su digestión.',
    descriptionEn: 'Bring habitual formula brand to prevent digestive changes on the road.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-baby-3',
    category: 'baby',
    title: 'Repelente y protector solar formulado especialmente para bebés de 6+ meses',
    titleEn: 'Mineral baby-safe sunscreen & gentle baby insect lotion (6m+)',
    description: 'Fórmulas minerales de óxido de zinc recomendadas por pediatra.',
    descriptionEn: 'Pediatrician-approved zinc mineral formula safe for sensitive infant skin.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-baby-4',
    category: 'baby',
    title: 'Mosquitero elástico para carriola y cuna portátil',
    titleEn: 'Elastic mosquito netting for stroller & travel pack-and-play',
    description: 'Protege a Emily de zancudos durante siestas en la playa y en Río Dulce.',
    descriptionEn: 'Keeps Emily protected during shaded naps by the beach or river.',
    checked: false,
    isEssential: true
  },
  {
    id: 'pack-baby-5',
    category: 'baby',
    title: 'Pañales para agua (Swim Diapers) y trajecito con filtro UV',
    titleEn: 'Swim diapers & UPF 50+ rashguard baby swimwear',
    description: 'Para chapotear con seguridad en la piscina de Monterrico y Chiquimula.',
    descriptionEn: 'For happy splashing in the swimming pools in Monterrico and Chiquimula.',
    checked: false,
    isEssential: false
  },
  {
    id: 'pack-baby-6',
    category: 'baby',
    title: 'Botiquín de bebé: termómetro, acetaminofén pediátrico y suero oral',
    titleEn: 'Baby first-aid: digital thermometer, infant acetaminophen & oral electrolytes',
    description: 'Recomendaciones básicas de botiquín infantil para tranquilidad de Cori y Ever.',
    descriptionEn: 'Basic pediatrician-guided travel kit for complete peace of mind.',
    checked: false,
    isEssential: true
  },

  // SENIORS COMFORT KIT (60s - 70s)
  {
    id: 'pack-sen-1',
    category: 'seniors',
    title: 'Medicamentos personales para 35 días + copia física de recetas',
    titleEn: 'Personal prescription medications (35-day supply) + prescription copy',
    description: 'Para Jonchito, Lidia, Isabel, Bruce y Norma con margen adicional de días.',
    descriptionEn: 'For Jonchito, Lidia, Isabel, Bruce & Norma with buffer days included.',
    checked: true,
    isEssential: true
  },
  {
    id: 'pack-sen-2',
    category: 'seniors',
    title: 'Almohadilla de viaje ergonómica / soporte lumbar para el auto',
    titleEn: 'Ergonomic neck pillow / lumbar cushion for vehicle rides',
    description: 'Mayor confort en los trayectos hacia la playa y el Altiplano.',
    descriptionEn: 'Extra comfort and lower back support during scenic drives.',
    checked: false,
    isEssential: false
  },
  {
    id: 'pack-sen-3',
    category: 'seniors',
    title: 'Bastón plegable liviano de apoyo (opcional)',
    titleEn: 'Lightweight folding walking cane (optional)',
    description: 'Brinda firmeza al caminar sobre empedrados antiguos o escalones de miradores.',
    descriptionEn: 'Provides extra stability on historical cobblestones or dock ramps.',
    checked: false,
    isEssential: false
  },
  {
    id: 'pack-sen-4',
    category: 'seniors',
    title: 'Calzado ortopédico acolchonado con buen soporte de tobillo',
    titleEn: 'Cushioned walking shoes with solid arch & ankle support',
    description: 'Previene cansancio en piernas durante los recorridos por Ataco, Antigua y Panajachel.',
    descriptionEn: 'Prevents leg fatigue during relaxed strolls in Ataco, Antigua, and Panajachel.',
    checked: false,
    isEssential: true
  }
];

export const initialTripState: TripDataState = {
  tripTitle: 'Ixhuatán & Beyond',
  tripTitleEn: 'Ixhuatán & Beyond',
  startDate: '2026-11-15',
  endDate: '2026-12-11',
  selectedThanksgivingOptionId: 'opt-thanksgiving-elsalvador',
  selectedDecemberOptionId: 'opt-december-atitlan-antigua',
  destinations: initialDestinations,
  options: initialOptions,
  days: initialDays,
  packingItems: initialPackingItems,
  userVotes: {}
};
