import { TripOption } from '../types/trip';

export const tripOptions: TripOption[] = [
  // THANKSGIVING OPTIONS (Nov 25 - 30)
  {
    id: 'opt-thanksgiving-elsalvador',
    code: 't1',
    phase: 'thanksgiving',
    title: 'Opción 1: El Salvador (Ruta de las Flores & Coatepeque)',
    titleEn: 'Option 1: El Salvador (Ruta de las Flores & Lake Coatepeque)',
    shortTitle: 'El Salvador',
    shortTitleEn: 'El Salvador',
    color: '#c2410c',
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
      'Moneda oficial en El Salvador es el Dólar Estadounidense ($ USD en billetes limpios).',
      '🚗 Vehículos: llevar tarjeta de circulación y título de propiedad; si el carro no está a nombre del conductor, carta poder autenticada por notario (confirmar con la aduana de Valle Nuevo).'
    ],
    considerationsEn: [
      '⚠️ URGENT PASSPORTS: Emily (7 months) needs her first passport and Isabella needs renewal at IGM Guatemala.',
      'Bruce & Norma must pay $12 USD in exact cash at El Salvador immigration for the Tourist Card.',
      'Official currency in El Salvador is the US Dollar ($ USD, crisp bills recommended).',
      '🚗 Vehicles: bring registration card and title; if the car is not in the driver’s name, a notarized authorization letter (confirm with Valle Nuevo customs).'
    ],
    driveSummary: 'Aprox. 2h 15m a 2.5h desde Ixhuatán. Carretera internacional CA-8 100% asfaltada.',
    driveSummaryEn: 'Approx. 2h 15m to 2.5h from Ixhuatán. 100% smooth paved international CA-8 highway.',
    babyNotes: 'Excelente para Emily (7 meses): viaje corto en auto, clima fresco templado, hospedaje 100% en una sola planta con cunas y paseos planos en carriola.',
    babyNotesEn: 'Superb for 7-month Emily: short drive, mild temperate weather, 100% single-story lodging with cribs, and flat stroller walks.',
    seniorNotes: 'Insuperable para Bruce, Norma, Jonchito, Lidia e Isabel: sin escaleras en Casa Degraciela, termales con acceso en auto y terrazas planas con vista al lago.',
    seniorNotesEn: 'Unbeatable comfort for Bruce, Norma, Jonchito, Lidia & Isabel: zero stairs at Casa Degraciela, drive-up thermal pools, and flat lakeview decks.',
    metrics: {
      totalDriveHours: 9,
      longestLegHours: 2.5,
      lodgings: 1,
      passportsRequired: true,
      babyScore: 5,
      seniorScore: 5,
      climate: '18–24 °C, fresco de montaña',
      climateEn: '64–75 °F, cool mountain air',
      nearestHospital: '20–40 min (Ahuachapán / Santa Ana)',
      nearestHospitalEn: '20–40 min (Ahuachapán / Santa Ana)'
    },
    // Rough pre-quote estimates in USD — edit in the app once real quotes arrive.
    costs: [
      { id: 'lodging-ataco', label: 'Casa Degraciela (5 habitaciones × 5 noches)', labelEn: 'Casa Degraciela (5 rooms × 5 nights)', quantity: 25, unitUsd: 85, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'meals', label: 'Comidas (10 personas × 6 días)', labelEn: 'Meals (10 people × 6 days)', quantity: 60, unitUsd: 18 },
      { id: 'thanksgiving', label: 'Cena de Thanksgiving en Coatepeque', labelEn: 'Thanksgiving dinner at Coatepeque', quantity: 9, unitUsd: 35 },
      { id: 'hot-springs', label: 'Termales de Santa Teresa', labelEn: 'Santa Teresa hot springs', quantity: 9, unitUsd: 12, note: 'Verificar tarifa', noteEn: 'Verify price' },
      { id: 'fuel', label: 'Combustible (2 carros, ~9 h)', labelEn: 'Fuel (2 cars, ~9 h)', quantity: 2, unitUsd: 70 },
      { id: 'tourist-card', label: 'Tarjeta de turismo Bruce & Norma', labelEn: 'Tourist card Bruce & Norma', quantity: 2, unitUsd: 12, note: 'Efectivo exacto en frontera', noteEn: 'Exact cash at the border' }
    ]
  },
  {
    id: 'opt-thanksgiving-riodulce',
    code: 't2',
    phase: 'thanksgiving',
    title: 'Opción 2: Río Dulce & Chiquimula (Nana Juana Marina)',
    titleEn: 'Option 2: Río Dulce & Chiquimula (Nana Juana Marina)',
    shortTitle: 'Río Dulce',
    shortTitleEn: 'Río Dulce',
    color: '#0e7490',
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
      'Carretera más larga: ~7 h solo de ida en dos etapas y ~6 h de regreso en un solo día (~12.5 h en total, con tráfico pesado de furgones en la CA-9 Norte).',
      'Clima tropical caluroso y húmedo (~32°C - 35°C) con zancudos: indispensable repelente y mosquitero para la carriola de Emily.',
      'Evitar senderos elevados rústicos de madera mojada sobre humedales (Hacienda Tijax) para personas mayores por riesgo de resbalones.'
    ],
    considerationsEn: [
      'Longer driving time: ~7 h one way in two stages plus a ~6 h single-day return (~12.5 h total, with heavy container truck traffic on CA-9 North).',
      'Tropical hot and humid climate (~90°F - 95°F) with mosquitoes: repellent and stroller netting for Emily are mandatory.',
      'Avoid wet wooden boardwalks over wetlands (Hacienda Tijax) for seniors due to slip hazards; stay on Nana Juana concrete.'
    ],
    driveSummary: 'Día 1: 3.5 hrs a Chiquimula. Día 2: 3.5 hrs a Río Dulce. Carretera al Atlántico CA-9 Norte.',
    driveSummaryEn: 'Day 1: 3.5 hrs to Chiquimula. Day 2: 3.5 hrs to Río Dulce on Atlantic highway CA-9 North.',
    babyNotes: 'La escala en Chiquimula ayuda a descansar. En Río Dulce se requiere aire acondicionado en la habitación y mosquitero en la carriola.',
    babyNotesEn: 'Overnight in Chiquimula helps baby rest. In Río Dulce, strong room A/C and stroller mosquito netting are indispensable.',
    seniorNotes: 'Muy cómodo en Nana Juana Marina gracias a sus caminerías planas de concreto. Paseos en lancha techada con asientos cómodos.',
    seniorNotesEn: 'Very comfortable at Nana Juana Marina thanks to flat concrete walkways. Covered boat tours with comfortable seating.',
    metrics: {
      totalDriveHours: 12.5,
      longestLegHours: 6,
      lodgings: 2,
      passportsRequired: false,
      babyScore: 3,
      seniorScore: 4,
      climate: '32–35 °C, húmedo',
      climateEn: '90–95 °F, humid',
      nearestHospital: '45–60 min (Morales / Puerto Barrios)',
      nearestHospitalEn: '45–60 min (Morales / Puerto Barrios)'
    },
    // Rough pre-quote estimates in USD — edit in the app once real quotes arrive.
    costs: [
      { id: 'lodging-chiquimula', label: 'Grand Caporal (5 habitaciones × 1 noche)', labelEn: 'Grand Caporal (5 rooms × 1 night)', quantity: 5, unitUsd: 60, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'lodging-riodulce', label: 'Nana Juana Marina (5 habitaciones × 4 noches)', labelEn: 'Nana Juana Marina (5 rooms × 4 nights)', quantity: 20, unitUsd: 110, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'meals', label: 'Comidas (10 personas × 6 días)', labelEn: 'Meals (10 people × 6 days)', quantity: 60, unitUsd: 18 },
      { id: 'thanksgiving', label: 'Cena de Thanksgiving en Río Dulce', labelEn: 'Thanksgiving dinner in Río Dulce', quantity: 9, unitUsd: 30 },
      { id: 'boat', label: 'Lancha privada techada a Livingston', labelEn: 'Private covered boat to Livingston', quantity: 1, unitUsd: 320, note: 'Lancha para 10–12 personas', noteEn: 'Boat for 10–12 people' },
      { id: 'entries', label: 'Castillo de San Felipe y propinas', labelEn: 'San Felipe fortress & tips', quantity: 1, unitUsd: 80 },
      { id: 'fuel', label: 'Combustible (2 carros, ~12.5 h)', labelEn: 'Fuel (2 cars, ~12.5 h)', quantity: 2, unitUsd: 110 }
    ]
  },
  {
    id: 'opt-thanksgiving-hibrido',
    code: 't3',
    phase: 'thanksgiving',
    title: 'Opción 3: Gran Circuito Combinado (Ruta de las Flores + Chiquimula & Río Dulce)',
    titleEn: 'Option 3: Grand Combined Circuit (Ruta de las Flores + Chiquimula & Río Dulce)',
    shortTitle: 'Circuito combinado',
    shortTitleEn: 'Combined circuit',
    color: '#7c3aed',
    tagline: 'El itinerario más completo: montaña y termales en Ataco + banquete en Coatepeque + piscinas en Grand Caporal y lancha en Río Dulce',
    taglineEn: 'The ultimate all-inclusive circuit: mountain hot springs in Ataco + Coatepeque lake dining + Grand Caporal pools & Río Dulce boat cruise',
    dateRange: '25 Nov – 30 Nov (6 días / 5 noches)',
    dateRangeEn: 'Nov 25 – Nov 30 (6 days / 5 nights)',
    durationDays: 6,
    destinations: ['ruta-flores', 'coatepeque', 'chiquimula', 'rio-dulce'],
    crewSummary: 'Grupo familiar completo (10 personas): Ever, Cori, Isabella, Emily (7 meses), Jonchito, Lidia, Doña Isabel, Nely, Bruce y Norma.',
    crewSummaryEn: 'Full family crew (10 people): Ever, Cori, Isabella, Emily (7 months), Jonchito, Lidia, Isabel, Nely, Bruce & Norma.',
    pros: [
      'Itinerario total "lo mejor de dos mundos": Combina en un solo viaje el clima fresco de montaña y aguas termales de El Salvador con la exuberante selva tropical y canales caribeños de Río Dulce.',
      'Días 1 a 3 en El Salvador: Hospedaje en Casa Degraciela (Ataco, 100% en planta baja sin gradas), relajación en Termales de Santa Teresa y cena/almuerzo de Thanksgiving en la terraza de Cardedeu frente al Lago de Coatepeque.',
      'Cruce fronterizo circular eficiente: Salida por Valle Nuevo y reingreso a Guatemala por la frontera de Anguiatú (Metapán ➔ Chiquimula) para avanzar hacia el oriente sin repetir caminos.',
      'Días 4 a 6 en Oriente y Caribe: Noche de descanso en Hotel Grand Caporal (Chiquimula) con cortes de carne y piscinas, seguido de suites con A/C en Nana Juana Marina y navegación privada en lancha techada por el Cañón de Río Dulce hacia Livingston.',
      'Máxima diversidad fotográfica y cultural: Pueblos coloniales con murales de café, gastronomía salvadoreña, cultura garífuna caribeña y fortaleza colonial de San Felipe del siglo XVII.'
    ],
    prosEn: [
      'Ultimate "best of both worlds" journey: Combines in a single vacation the cool mountain breezes and volcanic hot springs of El Salvador with the lush rainforest and Caribbean waters of Río Dulce.',
      'Days 1 to 3 in El Salvador: Boutique stay at Casa Degraciela (Ataco, 100% ground floor), soothing thermal pools at Santa Teresa, and Thanksgiving feast on Cardedeu\'s upper deck overlooking Lake Coatepeque.',
      'Efficient circular border routing: Cross into El Salvador via Valle Nuevo and re-enter Guatemala via Anguiatú border (Metapán ➔ Chiquimula), cutting north without backtracking.',
      'Days 4 to 6 in Eastern Guatemala & Caribbean: Refreshing rest stop at Hotel Grand Caporal (Chiquimula) with steaks and pools, followed by A/C marina suites at Nana Juana and private boat cruise through Río Dulce Gorge to Livingston.',
      'Peak visual and cultural variety: Colonial painted coffee towns, pupusas, Garifuna coastal culture, and 17th-century Spanish fortress.'
    ],
    considerations: [
      'Alta demanda de manejo: los tramos suman ~15 h de carretera en 4 etapas (~17.5 h si la cena de Thanksgiving es en Coatepeque, a 1h15 de Ataco). El último día son ~6 h seguidas de Río Dulce a Ixhuatán.',
      'Múltiples cambios de hotel: Requiere empacar y registrarse en 3 hospedajes diferentes (Ataco, Chiquimula y Río Dulce).',
      'Requisito obligatorio de pasaportes: Al entrar a El Salvador, Emily (7 meses) e Isabella requieren pasaportes vigentes y Bruce y Norma $12 USD en efectivo para la tarjeta de turismo.',
      '🚗 Vehículos: llevar tarjeta de circulación y título de propiedad; si el carro no está a nombre del conductor, carta poder autenticada por notario (confirmar con la aduana de Valle Nuevo).',
      '💡 Alternativa de contingencia (Plan B Opcional): Si antes de viajar los pasaportes presentan retrasos o la familia prefiere evitar tantas horas de carretera, este circuito puede pivotar opcionalmente a un plan 100% relajado en la playa del Pacífico (Monterrico / Las Lisas a solo 1h 25m de carretera plana sin fronteras).'
    ],
    considerationsEn: [
      'Substantial driving commitment: the legs add up to ~15 road hours in 4 stages (~17.5 h if Thanksgiving dinner is at Coatepeque, 1h15 from Ataco). The last day is a ~6 h straight drive from Río Dulce to Ixhuatán.',
      'Multiple hotel check-ins: Requires packing and unpacking across 3 distinct lodges (Ataco, Chiquimula, and Río Dulce).',
      'Mandatory passports for El Salvador: Emily (7 months) and Isabella require valid passports, plus $12 USD cash each for Bruce & Norma.',
      '🚗 Vehicles: bring registration card and title; if the car is not in the driver’s name, a notarized authorization letter (confirm with Valle Nuevo customs).',
      '💡 Optional Contingency (Plan B): If passports face unexpected delays or the family prefers zero road fatigue, this circuit can effortlessly pivot to a relaxing Pacific beach stay (Monterrico / Las Lisas at just 1h 25m flat highway with no border requirements).'
    ],
    driveSummary: 'Circuito circular amplio (~15 h acumuladas): Ixhuatán ➔ Ataco (2.5h) ➔ Chiquimula vía Anguiatú (3.5h) ➔ Río Dulce (3h) ➔ Ixhuatán (6h).',
    driveSummaryEn: 'Comprehensive circular circuit (~15 cumulative driving hrs): Ixhuatán ➔ Ataco (2.5h) ➔ Chiquimula via Anguiatú (3.5h) ➔ Río Dulce (3h) ➔ Ixhuatán (6h).',
    babyNotes: 'Exigente para la bebé Emily (7 meses) por los 3 cambios de hotel y tiempos prolongados en silla de auto. Se sugieren paradas de descanso cada 1.5 a 2 horas.',
    babyNotesEn: 'Demanding for 7-month Emily due to 3 hotel transitions and extended car-seat time. Rest stops every 1.5 to 2 hours are strongly recommended.',
    seniorNotes: 'Para Bruce, Norma, Jonchito, Lidia e Isabel: Es la aventura más completa e impactante, pero requiere buena energía para los traslados y empacar ligero entre hoteles.',
    seniorNotesEn: 'For Bruce, Norma, Jonchito, Lidia & Isabel: The most comprehensive and rewarding adventure, but requires solid stamina for road stages and light packing between hotels.',
    metrics: {
      totalDriveHours: 17.5,
      longestLegHours: 6,
      lodgings: 3,
      passportsRequired: true,
      babyScore: 2,
      seniorScore: 3,
      climate: 'De 18 °C a 35 °C (cambia mucho)',
      climateEn: '64 °F to 95 °F (big swings)',
      nearestHospital: 'Varía por tramo',
      nearestHospitalEn: 'Varies by leg'
    },
    // Rough pre-quote estimates in USD — edit in the app once real quotes arrive.
    costs: [
      { id: 'lodging-ataco', label: 'Casa Degraciela (5 habitaciones × 3 noches)', labelEn: 'Casa Degraciela (5 rooms × 3 nights)', quantity: 15, unitUsd: 85, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'lodging-chiquimula', label: 'Grand Caporal (5 habitaciones × 1 noche)', labelEn: 'Grand Caporal (5 rooms × 1 night)', quantity: 5, unitUsd: 60, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'lodging-riodulce', label: 'Nana Juana Marina (5 habitaciones × 1 noche)', labelEn: 'Nana Juana Marina (5 rooms × 1 night)', quantity: 5, unitUsd: 110, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'meals', label: 'Comidas (10 personas × 6 días)', labelEn: 'Meals (10 people × 6 days)', quantity: 60, unitUsd: 18 },
      { id: 'thanksgiving', label: 'Cena de Thanksgiving en Coatepeque', labelEn: 'Thanksgiving dinner at Coatepeque', quantity: 9, unitUsd: 35 },
      { id: 'hot-springs', label: 'Termales de Santa Teresa', labelEn: 'Santa Teresa hot springs', quantity: 9, unitUsd: 12, note: 'Verificar tarifa', noteEn: 'Verify price' },
      { id: 'boat', label: 'Paseo corto en lancha por el cañón', labelEn: 'Short canyon boat ride', quantity: 1, unitUsd: 200 },
      { id: 'fuel', label: 'Combustible (2 carros, ~17.5 h)', labelEn: 'Fuel (2 cars, ~17.5 h)', quantity: 2, unitUsd: 140 },
      { id: 'tourist-card', label: 'Tarjeta de turismo Bruce & Norma', labelEn: 'Tourist card Bruce & Norma', quantity: 2, unitUsd: 12, note: 'Efectivo exacto en frontera', noteEn: 'Exact cash at the border' }
    ]
  },

  // DECEMBER OPTIONS (Dec 3 night - Dec 7)
  {
    id: 'opt-december-atitlan-antigua',
    code: 'da',
    phase: 'december',
    title: 'Opción A: Lago de Atitlán & Antigua Guatemala',
    titleEn: 'Option A: Lake Atitlán & Antigua Guatemala',
    shortTitle: 'Atitlán + Antigua',
    shortTitleEn: 'Atitlán + Antigua',
    color: '#2563eb',
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
      'En calles empedradas de Antigua, utilizar portabebé ergonómico en lugar de carriola con ruedas pequeñas.',
      '🔥 Lunes 7 Dic a las 18:00 es la Quema del Diablo en todo el país: planear llegar a Ixhuatán antes de las 17:00 (humo, cohetes y tráfico; cuidar los oídos y pulmones de Emily).'
    ],
    considerationsEn: [
      'Chilly evenings and early mornings in highlands and Antigua (52°F - 58°F): bring light jackets and warm baby layers.',
      'On Antigua cobblestones, use an ergonomic baby carrier instead of small-wheeled strollers.',
      '🔥 Monday Dec 7 at 6:00 PM is the nationwide Burning of the Devil: plan to be home in Ixhuatán by 5:00 PM (smoke, firecrackers and traffic; protect Emily’s ears and lungs).'
    ],
    driveSummary: 'Ixhuatán -> Antigua (2h 15m vía VAS) -> Panajachel (2h). Rutas rápidas, seguras y cómodas.',
    driveSummaryEn: 'Ixhuatán -> Antigua (2h 15m via VAS) -> Panajachel (2h). Fast, safe, and scenic paved roads.',
    babyNotes: 'La mejor opción para Emily (7 meses): distancias moderadas en auto, piscina climatizada, sin calor sofocante y atención médica de primera en Antigua.',
    babyNotesEn: 'Best option for 7-month Emily: gentle driving times, heated pool, no sweltering heat, and top-tier medical facilities in Antigua.',
    seniorNotes: 'Especialmente diseñada para Bruce y Norma (en sus 70s): cero subidas extenuantes, rampas suaves en Casa Santo Domingo, tuc-tucs en el muelle de San Juan y vistas panorámicas espectaculares.',
    seniorNotesEn: 'Tailored for Bruce & Norma (in their 70s): zero steep climbs, gentle ramps at Casa Santo Domingo, dock tuc-tucs in San Juan, and splendid lake panoramas.',
    metrics: {
      totalDriveHours: 8.5,
      longestLegHours: 4,
      lodgings: 2,
      passportsRequired: false,
      babyScore: 5,
      seniorScore: 5,
      climate: '11–24 °C, noches frías',
      climateEn: '52–75 °F, chilly nights',
      nearestHospital: '10–15 min (Antigua)',
      nearestHospitalEn: '10–15 min (Antigua)'
    },
    // Rough pre-quote estimates in USD — edit in the app once real quotes arrive.
    costs: [
      { id: 'lodging-antigua', label: 'Casa Santo Domingo (2 habitaciones × 2 noches)', labelEn: 'Casa Santo Domingo (2 rooms × 2 nights)', quantity: 4, unitUsd: 210, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'lodging-atitlan', label: 'Hotel Atitlán (2 habitaciones × 2 noches)', labelEn: 'Hotel Atitlán (2 rooms × 2 nights)', quantity: 4, unitUsd: 170, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'meals', label: 'Comidas (6 personas × 4.5 días)', labelEn: 'Meals (6 people × 4.5 days)', quantity: 27, unitUsd: 20 },
      { id: 'boat', label: 'Lancha privada a San Juan La Laguna', labelEn: 'Private boat to San Juan La Laguna', quantity: 1, unitUsd: 90 },
      { id: 'tuctuc', label: 'Tuc-tucs, cooperativas y propinas', labelEn: 'Tuk-tuks, co-ops & tips', quantity: 1, unitUsd: 40 },
      { id: 'fuel', label: 'Combustible (1 carro, ~8.5 h)', labelEn: 'Fuel (1 car, ~8.5 h)', quantity: 1, unitUsd: 70 }
    ]
  },
  {
    id: 'opt-december-semuc-antigua',
    code: 'db',
    phase: 'december',
    title: 'Opción B: Semuc Champey & Cobán (Alta Verapaz)',
    titleEn: 'Option B: Semuc Champey & Cobán (Alta Verapaz)',
    shortTitle: 'Semuc + Cobán',
    shortTitleEn: 'Semuc + Cobán',
    color: '#dc2626',
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
      'Trayecto largo de 7.5+ horas desde el sur de Guatemala.',
      '🔥 Lunes 7 Dic a las 18:00 es la Quema del Diablo en todo el país: planear llegar a Ixhuatán antes de las 17:00 (humo, cohetes y tráfico; cuidar los oídos y pulmones de Emily).'
    ],
    considerationsEn: [
      'Even though paved, the Lanquín-Semuc road features extreme grades (+20%) and narrow single-lane mountain passes.',
      'Inside Semuc reserve: iconic overlook requires 450+ steep stairs, and wet limestone around pools is slick with no handrails (fall hazard for seniors).',
      'Hostels like Zephyr Lodge are strictly 18+ party venues; family lodging requires staying in Cobán or Guayaha.',
      'Medical emergency safety: Cobán regional hospital is 3.5 to 4 hours away on mountain roads if infant care is needed.',
      'Long drive of 7.5+ hours from southern Guatemala.',
      '🔥 Monday Dec 7 at 6:00 PM is the nationwide Burning of the Devil: plan to be home in Ixhuatán by 5:00 PM (smoke, firecrackers and traffic; protect Emily’s ears and lungs).'
    ],
    driveSummary: '7.5+ hrs de manejo con curvas de montaña y fuertes pendientes.',
    driveSummaryEn: '7.5+ hours driving with winding mountain switchbacks and steep grades.',
    babyNotes: 'Complicado para la bebé Emily (7 meses) por las 7.5 horas de curvas y la lejanía de centros hospitalarios pediátricos.',
    babyNotesEn: 'Challenging for 7-month Emily due to 7.5 hours of mountain curves and distance to pediatric emergency hospitals.',
    seniorNotes: 'Exigencia física alta para Bruce y Norma: trayecto largo en curvas, escaleras demandantes y roca caliza húmeda muy resbaladiza.',
    seniorNotesEn: 'High physical toll for Bruce & Norma: long curvy mountain drive, demanding stairs, and slick wet limestone surfaces.',
    metrics: {
      totalDriveHours: 15,
      longestLegHours: 6,
      lodgings: 3,
      passportsRequired: false,
      babyScore: 2,
      seniorScore: 2,
      climate: '18–30 °C, húmedo y lluvioso',
      climateEn: '64–86 °F, humid & rainy',
      nearestHospital: '3.5–4 h desde Semuc (Cobán)',
      nearestHospitalEn: '3.5–4 h from Semuc (Cobán)'
    },
    // Rough pre-quote estimates in USD — edit in the app once real quotes arrive.
    costs: [
      { id: 'lodging-gua', label: 'Hotel en Ciudad de Guatemala (2 habitaciones × 1 noche)', labelEn: 'Guatemala City hotel (2 rooms × 1 night)', quantity: 2, unitUsd: 80, note: 'Evita manejar 7.5 h de noche', noteEn: 'Avoids a 7.5 h night drive' },
      { id: 'lodging-coban', label: 'Hotel Park Cobán (2 habitaciones × 2 noches)', labelEn: 'Hotel Park Cobán (2 rooms × 2 nights)', quantity: 4, unitUsd: 70, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'lodging-lanquin', label: 'Guayaha Lanquín (2 habitaciones × 1 noche)', labelEn: 'Guayaha Lanquín (2 rooms × 1 night)', quantity: 2, unitUsd: 60, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'meals', label: 'Comidas (6 personas × 4.5 días)', labelEn: 'Meals (6 people × 4.5 days)', quantity: 27, unitUsd: 18 },
      { id: 'entries', label: 'Entradas Semuc + Grutas de Lanquín', labelEn: 'Semuc + Lanquín caves entry', quantity: 1, unitUsd: 50 },
      { id: 'pickup', label: 'Pick-up local Lanquín–Semuc', labelEn: 'Local pickup Lanquín–Semuc', quantity: 1, unitUsd: 40, note: 'Opcional', noteEn: 'Optional' },
      { id: 'fuel', label: 'Combustible (1 carro, ~15 h)', labelEn: 'Fuel (1 car, ~15 h)', quantity: 1, unitUsd: 120 }
    ]
  },
  {
    id: 'opt-december-hibrido',
    code: 'dc',
    phase: 'december',
    title: 'Opción C: Gran Ruta Híbrida (Atitlán, Antigua & Semuc Champey)',
    titleEn: 'Option C: Grand Hybrid Circuit (Atitlán, Antigua & Semuc Champey)',
    shortTitle: 'Ruta híbrida',
    shortTitleEn: 'Hybrid route',
    color: '#9333ea',
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
      'Itinerario extenuante: los tramos suman ~19 horas de manejo en solo 4 días (el último día son ~7.5 h de Lanquín a Ixhuatán).',
      'Cambios continuos de hotel cada noche sin tiempo de relajarse.',
      'Exposición a contrastes térmicos bruscos (frío en Atitlán vs. calor húmedo en Semuc).',
      '🔥 Lunes 7 Dic a las 18:00 es la Quema del Diablo en todo el país: planear llegar a Ixhuatán antes de las 17:00 (humo, cohetes y tráfico; cuidar los oídos y pulmones de Emily).'
    ],
    considerationsEn: [
      'Exhausting itinerary: the legs add up to ~19 hours in the vehicle across only 4 days (the last day alone is ~7.5 h from Lanquín to Ixhuatán).',
      'Moving hotels every single night with virtually zero downtime.',
      'Sharp temperature swings (cool highland lake vs. muggy tropical jungle).',
      '🔥 Monday Dec 7 at 6:00 PM is the nationwide Burning of the Devil: plan to be home in Ixhuatán by 5:00 PM (smoke, firecrackers and traffic; protect Emily’s ears and lungs).'
    ],
    driveSummary: 'Circuito amplio: Ixhuatán ➔ Antigua/Atitlán (4h) ➔ Cobán (5.5h) ➔ Semuc (2h) ➔ Ixhuatán (7h).',
    driveSummaryEn: 'Extensive circuit: Ixhuatán ➔ Antigua/Atitlán (4h) ➔ Cobán (5.5h) ➔ Semuc (2h) ➔ Ixhuatán (7h).',
    babyNotes: 'No recomendable para la bebé Emily: demasiadas horas en silla de auto y cambios constantes de ambiente.',
    babyNotesEn: 'Not recommended for baby Emily: excessive car-seat confinement and continuous environmental changes.',
    seniorNotes: 'Muy fatigoso para Bruce y Norma (en sus 70s): ~19 horas en carretera y caminatas complejas.',
    seniorNotesEn: 'Extremely tiring for Bruce & Norma (in their 70s): ~19 hours on the road and demanding surfaces.',
    metrics: {
      totalDriveHours: 19.5,
      longestLegHours: 7.5,
      lodgings: 4,
      passportsRequired: false,
      babyScore: 1,
      seniorScore: 2,
      climate: '11–30 °C (cambios bruscos)',
      climateEn: '52–86 °F (sharp swings)',
      nearestHospital: '3.5–4 h desde Semuc (Cobán)',
      nearestHospitalEn: '3.5–4 h from Semuc (Cobán)'
    },
    // Rough pre-quote estimates in USD — edit in the app once real quotes arrive.
    costs: [
      { id: 'lodging-antigua', label: 'Antigua (2 habitaciones × 1 noche)', labelEn: 'Antigua (2 rooms × 1 night)', quantity: 2, unitUsd: 210, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'lodging-atitlan', label: 'Panajachel (2 habitaciones × 1 noche)', labelEn: 'Panajachel (2 rooms × 1 night)', quantity: 2, unitUsd: 170, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'lodging-coban', label: 'Cobán (2 habitaciones × 1 noche)', labelEn: 'Cobán (2 rooms × 1 night)', quantity: 2, unitUsd: 70, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'lodging-lanquin', label: 'Lanquín (2 habitaciones × 1 noche)', labelEn: 'Lanquín (2 rooms × 1 night)', quantity: 2, unitUsd: 60, note: 'Pendiente de cotizar', noteEn: 'Quote pending' },
      { id: 'meals', label: 'Comidas (6 personas × 4.5 días)', labelEn: 'Meals (6 people × 4.5 days)', quantity: 27, unitUsd: 19 },
      { id: 'boat', label: 'Lancha en Atitlán', labelEn: 'Atitlán boat ride', quantity: 1, unitUsd: 90 },
      { id: 'entries', label: 'Entradas Semuc Champey', labelEn: 'Semuc Champey entry', quantity: 1, unitUsd: 50 },
      { id: 'fuel', label: 'Combustible (1 carro, ~19.5 h)', labelEn: 'Fuel (1 car, ~19.5 h)', quantity: 1, unitUsd: 150 }
    ]
  }
];
