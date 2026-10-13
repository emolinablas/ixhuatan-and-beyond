import { ActivityBlock, ActivityTag, DayPhase, DayPlan } from '../types/trip';
import { dateForDay, formatIsoDate } from '../lib/dates';

// Day-by-day plans for each voting option. The itinerary swaps these in for
// Thanksgiving (days 11–16) and December (days 19–23) based on the option the
// family is looking at, so "what would Option 2 actually feel like?" has an answer.

type Txt = [es: string, en: string];
type ActSeed = Omit<ActivityBlock, 'id' | 'title' | 'titleEn' | 'description' | 'descriptionEn' | 'googleMapsUrl'> & {
  title: Txt;
  desc: Txt;
  maps?: string;
};

const act = (
  timeOfDay: ActivityBlock['timeOfDay'],
  timeLabel: string | undefined,
  tag: ActivityTag,
  title: Txt,
  desc: Txt,
  maps?: string,
): ActSeed => ({ timeOfDay, timeLabel, tag, title, desc, maps });

interface DaySeed {
  title: Txt;
  locationId: string;
  location: string;
  driveHours: number;
  lodging?: string;
  milestone?: Txt;
  activities: ActSeed[];
}

const mapsUrl = (q: string) => `https://maps.google.com/?q=${encodeURIComponent(q)}`;

const build = (optionId: string, code: string, phase: DayPhase, seeds: Record<number, DaySeed>): DayPlan[] =>
  Object.entries(seeds).map(([n, s]) => {
    const dayNumber = Number(n);
    const date = dateForDay(dayNumber);
    return {
      id: `${code}-day-${dayNumber}`,
      dayNumber,
      date,
      dateFormatted: formatIsoDate(date, 'es'),
      dateFormattedEn: formatIsoDate(date, 'en'),
      title: s.title[0],
      titleEn: s.title[1],
      locationId: s.locationId,
      locationName: s.location,
      lodgingName: s.lodging,
      isKeyMilestone: !!s.milestone,
      milestoneBadge: s.milestone?.[0],
      milestoneBadgeEn: s.milestone?.[1],
      phase,
      optionId,
      driveHours: s.driveHours,
      activities: s.activities.map((a, i) => ({
        id: `${code}-${dayNumber}-${i + 1}`,
        timeOfDay: a.timeOfDay,
        timeLabel: a.timeLabel,
        tag: a.tag,
        title: a.title[0],
        titleEn: a.title[1],
        description: a.desc[0],
        descriptionEn: a.desc[1],
        googleMapsUrl: a.maps ? mapsUrl(a.maps) : undefined,
      })),
    };
  });

// ───────────────────────── Shared building blocks ─────────────────────────

const DEGRACIELA = 'Casa Degraciela Hotel Boutique (Ataco)';
const CAPORAL = 'Hotel Grand Caporal (Chiquimula)';
const NANA_JUANA = 'Nana Juana Marina & Resort (Río Dulce)';
const SANTO_DOMINGO = 'Hotel Museo Casa Santo Domingo (Antigua)';
const HOTEL_ATITLAN = 'Hotel Atitlán (Panajachel)';
const PARK_COBAN = 'Hotel Park Cobán';
const GUAYAHA = 'Guayaha Lanquín (familiar)';

const departToAtaco: DaySeed = {
  title: ['Rumbo a Ataco por la frontera Valle Nuevo', 'Off to Ataco via the Valle Nuevo border'],
  locationId: 'ruta-flores',
  location: 'Ixhuatán → Las Chinamas → Concepción de Ataco',
  driveHours: 2.5,
  lodging: DEGRACIELA,
  milestone: ['🚗 Salida 1:00 PM', '🚗 Departure 1:00 PM'],
  activities: [
    act('afternoon', '13:00', 'logistics',
      ['Salida de Ixhuatán (10 personas, 2 carros)', 'Leave Ixhuatán (10 people, 2 cars)'],
      ['Ever sale de su permiso laboral. Ruta por la CA-8 (Jalpatagua) hacia Valle Nuevo. Tener a mano en una sola bolsa: pasaportes, DPI, tarjeta de circulación y $24 exactos para Bruce y Norma.',
       'Ever wraps up work. Route along CA-8 (Jalpatagua) to Valle Nuevo. Keep in one pouch: passports, IDs, car registration and exactly $24 cash for Bruce & Norma.']),
    act('afternoon', '14:30', 'logistics',
      ['Frontera Valle Nuevo – Las Chinamas', 'Valle Nuevo – Las Chinamas border'],
      ['Migración y aduana (30–60 min). Bruce y Norma pagan $12 c/u en efectivo: pedir y guardar el recibo. Aduana emite el permiso temporal de los carros.',
       'Immigration and customs (30–60 min). Bruce & Norma pay $12 each in cash: ask for and keep the receipt. Customs issues the cars’ temporary permit.'],
      'Frontera Las Chinamas El Salvador'),
    act('afternoon', '16:00', 'family',
      ['Check-in en Casa Degraciela', 'Check-in at Casa Degraciela'],
      ['Casona de una sola planta: cero gradas para Doña Isabel. Armar la cuna de Emily antes de que oscurezca (~17:30).',
       'Single-story manor: zero stairs for Doña Isabel. Set up Emily’s crib before dark (~5:30 PM).'],
      'Concepción de Ataco El Salvador'),
    act('evening', '18:30', 'food',
      ['Cena tranquila en Ataco', 'Easy dinner in Ataco'],
      ['Pupusas cerca del parque central y a dormir temprano.', 'Pupusas near the town square, then an early night.']),
  ],
};

const thanksgivingCoatepeque: DaySeed = {
  title: ['🦃 Thanksgiving frente al Lago de Coatepeque', '🦃 Thanksgiving over Lake Coatepeque'],
  locationId: 'coatepeque',
  location: 'Ataco → Lago de Coatepeque → Ataco',
  driveHours: 2.5,
  lodging: DEGRACIELA,
  milestone: ['🦃 Comida de Thanksgiving', '🦃 Thanksgiving meal'],
  activities: [
    act('morning', '08:30', 'family',
      ['Desayuno y murales de Ataco', 'Breakfast & Ataco’s murals'],
      ['Paseo corto y plano por las calles pintadas. En el empedrado, Emily va mejor en el fular que en la carriola.',
       'Short, flat stroll through the painted streets. On cobblestones Emily rides better in the carrier than the stroller.']),
    act('afternoon', '12:30', 'logistics',
      ['Ruta al lago (~1h15)', 'Drive to the lake (~1h15)'],
      ['Salir después de la siesta de Emily. Vía Santa Ana; asfaltado, con curvas al bajar al lago.',
       'Leave after Emily’s nap. Via Santa Ana; paved, with curves on the way down to the lake.']),
    act('afternoon', '14:00', 'thanksgiving',
      ['Comida de Acción de Gracias en Cardedeu', 'Thanksgiving meal at Cardedeu'],
      ['Reservar la terraza superior junto al parqueo (evita las escaleras al lago). Llamar antes para pedir un plato de pavo para el grupo. Brindis de las tres generaciones.',
       'Book the upper terrace next to the parking lot (no lake stairs). Call ahead to request a turkey dish for the group. Three-generation toast.'],
      'Cardedeu Lago de Coatepeque'),
    act('afternoon', '16:45', 'logistics',
      ['Regreso a Ataco antes de que oscurezca', 'Back to Ataco before dark'],
      ['El sol se pone ~17:25. Salir a tiempo para no manejar de noche las curvas del lago.',
       'Sunset is ~5:25 PM. Leave in time to avoid driving the lake curves after dark.']),
  ],
};

const hotSpringsSantaTeresa = (extra?: ActSeed): DaySeed => ({
  title: ['Termales de Santa Teresa y tarde de café', 'Santa Teresa hot springs & coffee afternoon'],
  locationId: 'ruta-flores',
  location: 'Ahuachapán · Ataco',
  driveHours: 0.75,
  lodging: DEGRACIELA,
  activities: [
    act('morning', '09:00', 'relaxation',
      ['Termales de Santa Teresa (~25 min)', 'Santa Teresa hot springs (~25 min)'],
      ['Ir temprano, antes del calor. Se llega en carro hasta las piscinas: ideal para Doña Isabel. Emily solo en agua tibia (no caliente), pocos minutos y bien hidratada.',
       'Go early, before the heat. You can drive right up to the pools: ideal for Doña Isabel. Emily only in lukewarm (not hot) water, a few minutes, well hydrated.'],
      'Termales de Santa Teresa Ahuachapán'),
    act('afternoon', '13:00', 'relaxation',
      ['Almuerzo y siesta', 'Lunch & nap time'],
      ['Tarde sin carro para que todos descansen.', 'Car-free afternoon so everyone can rest.']),
    extra ?? act('afternoon', '16:00', 'food',
      ['Café de altura y artesanías en Ataco', 'Highland coffee & crafts in Ataco'],
      ['Tostadurías y tiendas de textiles a pocas cuadras de la casona.', 'Coffee roasters and textile shops a few blocks from the manor.']),
  ],
});

const longReturnFromRioDulce: DaySeed = {
  title: ['Regreso largo a Ixhuatán (~6 h)', 'Long drive home to Ixhuatán (~6 h)'],
  locationId: 'ixhuatan',
  location: 'Río Dulce → Ixhuatán',
  driveHours: 6,
  milestone: ['🏡 Regreso al hogar', '🏡 Back home'],
  activities: [
    act('morning', '07:00', 'logistics',
      ['Salida temprana por la CA-9', 'Early start on CA-9'],
      ['Salir antes de que se llene de furgones. Paradas cada 1.5–2 h para Emily y para estirar las piernas de los abuelos.',
       'Leave before the container trucks pile up. Stop every 1.5–2 h for Emily and for the grandparents to stretch.']),
    act('afternoon', '14:00', 'family',
      ['Llegada a Ixhuatán', 'Arrive in Ixhuatán'],
      ['Tarde libre y cena en casa. Ever regresa al trabajo mañana.', 'Free afternoon and dinner at home. Ever is back at work tomorrow.']),
  ],
};

const nightDriveToAntigua = (nights: 1 | 2): DaySeed => ({
  title: ['Salida nocturna a Antigua (grupo de 6)', 'Evening drive to Antigua (crew of 6)'],
  locationId: 'antigua',
  location: 'Ixhuatán → Antigua Guatemala',
  driveHours: 2.25,
  lodging: SANTO_DOMINGO,
  activities: [
    act('evening', '18:30', 'logistics',
      ['Salida por la autopista VAS', 'Depart via the VAS highway'],
      ['~2h15 esquivando el tráfico de la capital. Viajan Ever, Cori, Isabella, Emily, Bruce y Norma; Emily puede dormir en el camino.',
       '~2h15, skipping city traffic. Ever, Cori, Isabella, Emily, Bruce & Norma travel; Emily can sleep on the way.']),
    act('evening', '21:00', 'family',
      [`Check-in en Casa Santo Domingo (${nights} ${nights === 1 ? 'noche' : 'noches'})`, `Check-in at Casa Santo Domingo (${nights} ${nights === 1 ? 'night' : 'nights'})`],
      ['Pedir habitaciones cerca de las rampas. Cena ligera en el hotel.', 'Ask for rooms near the ramps. Light dinner at the hotel.'],
      'Hotel Museo Casa Santo Domingo Antigua'),
  ],
});

const semucDay = (lodging: string): DaySeed => ({
  title: ['Pozas turquesas de Semuc Champey', 'Turquoise pools of Semuc Champey'],
  locationId: 'semuc',
  location: 'Cobán → Lanquín → Semuc Champey',
  driveHours: 2.5,
  lodging,
  milestone: ['🌿 Semuc Champey', '🌿 Semuc Champey'],
  activities: [
    act('morning', '07:00', 'logistics',
      ['Cobán → Lanquín → Semuc (~2–2.5 h)', 'Cobán → Lanquín → Semuc (~2–2.5 h)'],
      ['Aunque ya tiene concreto, hay pendientes de más de 20%: bajar despacio en primera o segunda.',
       'Now paved with concrete, but grades exceed 20%: descend slowly in first or second gear.']),
    act('morning', '10:00', 'adventure',
      ['Pozas de la zona baja', 'Lower pools'],
      ['Roca caliza mojada y sin pasamanos: Bruce y Norma con zapatos acuáticos y del brazo. Emily en el fular, fuera del agua. El mirador (450+ gradas) solo para adultos ágiles.',
       'Wet limestone with no handrails: Bruce & Norma in water shoes, arm in arm. Emily stays in the carrier, out of the water. The lookout (450+ steps) is for agile adults only.'],
      'Semuc Champey'),
    act('afternoon', '15:00', 'relaxation',
      ['Check-in y descanso', 'Check-in & rest'],
      ['Hamacas y cena temprano. Sin señal en varios tramos: el itinerario queda guardado en el teléfono.',
       'Hammocks and early dinner. No signal on several stretches: the itinerary stays saved on the phone.']),
  ],
});

const quemaDelDiablo = act('evening', '18:00', 'family',
  ['🔥 Quema del Diablo (desde casa)', '🔥 Burning of the Devil (from home)'],
  ['Tradición guatemalteca: fogatas y cohetes a las 18:00 en todo el país. Bruce y Norma pueden verla de lejos; Emily adentro, lejos del humo y el ruido.',
   'Guatemalan tradition: bonfires and firecrackers at 6:00 PM nationwide. Bruce & Norma can watch from a distance; Emily stays inside, away from smoke and noise.']);

// ───────────────────────── Thanksgiving (days 11–16) ─────────────────────────

const thanksgivingElSalvador = build('opt-thanksgiving-elsalvador', 't1', 'thanksgiving', {
  11: departToAtaco,
  12: thanksgivingCoatepeque,
  13: hotSpringsSantaTeresa(),
  14: {
    title: ['Feria gastronómica de Juayúa y viveros de Apaneca', 'Juayúa food fair & Apaneca nurseries'],
    locationId: 'ruta-flores',
    location: 'Juayúa · Apaneca',
    driveHours: 1,
    lodging: DEGRACIELA,
    activities: [
      act('morning', '10:00', 'food',
        ['Feria gastronómica de Juayúa (solo fines de semana)', 'Juayúa weekend food fair'],
        ['A ~30 min. El parque central es plano; llegar antes de mediodía para conseguir mesa a la sombra.',
         '~30 min away. The town square is flat; arrive before noon to get a shaded table.'],
        'Juayúa Sonsonate El Salvador'),
      act('afternoon', '14:00', 'adventure',
        ['Fincas y viveros de Apaneca (opcional)', 'Apaneca coffee farms & nurseries (optional)'],
        ['Paradas cortas con parqueo a la puerta. Quien prefiera descansar se queda en la casona.',
         'Short stops with door-front parking. Anyone who prefers to rest stays at the manor.']),
      act('evening', '18:30', 'family',
        ['Noche de juegos en la casona', 'Game night at the manor'],
        ['Cartas, cuentos para Isabella y sobremesa larga.', 'Cards, stories for Isabella and a long chat after dinner.']),
    ],
  },
  15: {
    title: ['Día libre sin carro', 'Car-free free day'],
    locationId: 'ruta-flores',
    location: 'Concepción de Ataco',
    driveHours: 0,
    lodging: DEGRACIELA,
    activities: [
      act('morning', undefined, 'relaxation',
        ['Jardines, hamacas y siestas', 'Gardens, hammocks & naps'],
        ['Un día para recargar antes del regreso. Un solo hotel toda la semana: nadie empaca hasta mañana.',
         'A day to recharge before heading home. One hotel all week: nobody packs until tomorrow.']),
      act('afternoon', '16:00', 'logistics',
        ['Dejar maletas listas', 'Pack the bags'],
        ['Mañana salida a las 9:00.', 'Tomorrow we leave at 9:00 AM.']),
      act('evening', '18:30', 'food',
        ['Última cena salvadoreña', 'Last Salvadoran dinner'],
        ['Yuca frita, pupusas de loroco y café de Ataco.', 'Fried yuca, loroco pupusas and Ataco coffee.']),
    ],
  },
  16: {
    title: ['Regreso a Ixhuatán', 'Back to Ixhuatán'],
    locationId: 'ixhuatan',
    location: 'Ataco → Las Chinamas → Ixhuatán',
    driveHours: 2.5,
    milestone: ['🏡 Regreso al hogar', '🏡 Back home'],
    activities: [
      act('morning', '09:00', 'logistics',
        ['Salida hacia Las Chinamas', 'Drive to Las Chinamas'],
        ['La frontera es más rápida en la mañana. Bruce y Norma: guardar el recibo de la tarjeta de turismo.',
         'The border moves faster in the morning. Bruce & Norma: keep the tourist card receipt.']),
      act('afternoon', '12:30', 'family',
        ['Almuerzo en casa y tarde libre', 'Lunch at home & free afternoon'],
        ['Ever regresa al trabajo mañana.', 'Ever is back at work tomorrow.']),
    ],
  },
});

const thanksgivingRioDulce = build('opt-thanksgiving-riodulce', 't2', 'thanksgiving', {
  11: {
    title: ['Rumbo a Chiquimula (noche en Grand Caporal)', 'Off to Chiquimula (night at Grand Caporal)'],
    locationId: 'chiquimula',
    location: 'Ixhuatán → Chiquimula',
    driveHours: 3.5,
    lodging: CAPORAL,
    milestone: ['🚗 Salida 1:00 PM', '🚗 Departure 1:00 PM'],
    activities: [
      act('afternoon', '13:00', 'logistics',
        ['Salida hacia el oriente (sin fronteras)', 'Head east (no borders)'],
        ['Solo DPI y los pasaportes de Bruce y Norma. Parada de descanso a mitad de camino para Emily.',
         'Just national IDs plus Bruce & Norma’s passports. Rest stop halfway for Emily.']),
      act('afternoon', '16:30', 'relaxation',
        ['Check-in y piscina en Grand Caporal', 'Check-in & pool at Grand Caporal'],
        ['Chiquimula es caliente: piscina antes de la cena.', 'Chiquimula is hot: pool time before dinner.'],
        'Hotel Grand Caporal Chiquimula'),
      act('evening', '19:00', 'food',
        ['Cena de carnes en el hotel', 'Steak dinner at the hotel'],
        ['Acostarse temprano: mañana se sale a las 8:00.', 'Early night: tomorrow we leave at 8:00 AM.']),
    ],
  },
  12: {
    title: ['🦃 Thanksgiving a la orilla del Río Dulce', '🦃 Thanksgiving on the Río Dulce'],
    locationId: 'rio-dulce',
    location: 'Chiquimula → Río Dulce',
    driveHours: 3,
    lodging: NANA_JUANA,
    milestone: ['🦃 Cena de Thanksgiving', '🦃 Thanksgiving dinner'],
    activities: [
      act('morning', '08:00', 'logistics',
        ['Chiquimula → Río Dulce (~3 h)', 'Chiquimula → Río Dulce (~3 h)'],
        ['Salir temprano para evitar el calor y los furgones de la CA-9.', 'Leave early to beat the heat and the CA-9 container trucks.']),
      act('morning', '11:30', 'family',
        ['Check-in en Nana Juana Marina', 'Check-in at Nana Juana Marina'],
        ['Caminos planos de concreto y A/C. Mosquitero en la cuna y la carriola de Emily.', 'Flat concrete paths and A/C. Mosquito net on Emily’s crib and stroller.'],
        'Nana Juana Marina Rio Dulce'),
      act('afternoon', '15:00', 'relaxation',
        ['Piscina tipo laguna', 'Lagoon-style pool'],
        ['Siesta y agua para todos.', 'Naps and water time for everyone.']),
      act('evening', '18:30', 'thanksgiving',
        ['Cena de Acción de Gracias frente al río', 'Riverside Thanksgiving dinner'],
        ['Reservar mesa y preguntar con anticipación por un menú de pavo para el grupo.', 'Reserve a table and ask ahead about a turkey menu for the group.']),
    ],
  },
  13: {
    title: ['Lancha por el cañón hasta Livingston', 'Boat through the canyon to Livingston'],
    locationId: 'rio-dulce',
    location: 'Río Dulce → Livingston',
    driveHours: 0,
    lodging: NANA_JUANA,
    milestone: ['🚤 Cañón del Río Dulce', '🚤 Río Dulce canyon'],
    activities: [
      act('morning', '08:00', 'adventure',
        ['Lancha privada techada', 'Private covered boat'],
        ['Salir con el agua calma. Chalecos para todos (pedir tallas infantiles para Emily e Isabella). Paradas en la Isla de las Garzas y las aguas termales del cañón (bajar solo con ayuda).',
         'Leave while the water is calm. Life jackets for all (ask for child sizes for Emily & Isabella). Stops at Bird Island and the canyon hot springs (step off only with help).']),
      act('afternoon', '11:30', 'food',
        ['Almuerzo garífuna en Livingston', 'Garifuna lunch in Livingston'],
        ['Tapado frente al muelle. Las calles suben: los abuelos pueden quedarse en un restaurante cerca del muelle.',
         'Tapado by the dock. The streets climb: the grandparents can stay at a restaurant near the dock.'],
        'Livingston Izabal'),
      act('afternoon', '15:00', 'relaxation',
        ['Regreso y piscina', 'Return & pool'],
        ['Tarde libre en la marina.', 'Free afternoon at the marina.']),
    ],
  },
  14: {
    title: ['Castillo de San Felipe y tarde tranquila', 'San Felipe fortress & slow afternoon'],
    locationId: 'rio-dulce',
    location: 'Castillo de San Felipe de Lara',
    driveHours: 0.5,
    lodging: NANA_JUANA,
    activities: [
      act('morning', '09:00', 'adventure',
        ['Castillo de San Felipe (5 min)', 'San Felipe fortress (5 min)'],
        ['Jardines exteriores planos. El interior tiene gradas estrechas: solo para Isabella y los más ágiles.',
         'Flat outer lawns. The inside has narrow stairs: only for Isabella and the most agile.'],
        'Castillo de San Felipe de Lara'),
      act('afternoon', '14:00', 'relaxation',
        ['Siesta y piscina', 'Nap & pool'],
        ['Las horas de más calor, a la sombra.', 'Hottest hours in the shade.']),
      act('evening', '18:30', 'food',
        ['Pescado fresco del lago Izabal', 'Fresh fish from Lake Izabal'],
        ['Cena en la marina.', 'Dinner at the marina.']),
    ],
  },
  15: {
    title: ['Día libre en la marina', 'Free day at the marina'],
    locationId: 'rio-dulce',
    location: 'Río Dulce',
    driveHours: 0,
    lodging: NANA_JUANA,
    activities: [
      act('morning', '09:00', 'adventure',
        ['Opcional: cascada caliente de Finca El Paraíso (~1 h)', 'Optional: Finca El Paraíso hot waterfall (~1 h)'],
        ['Cascada termal sobre una poza fría. Sendero corto pero con piedras: solo adultos ágiles; los demás descansan en la marina.',
         'Hot waterfall over a cool pool. Short but rocky trail: agile adults only; everyone else rests at the marina.'],
        'Finca El Paraiso Izabal'),
      act('afternoon', '15:00', 'logistics',
        ['Empacar y cargar los carros', 'Pack and load the cars'],
        ['Mañana la salida es a las 7:00.', 'Tomorrow we leave at 7:00 AM.']),
    ],
  },
  16: longReturnFromRioDulce,
});

const thanksgivingCombined = build('opt-thanksgiving-hibrido', 't3', 'thanksgiving', {
  11: departToAtaco,
  12: thanksgivingCoatepeque,
  13: hotSpringsSantaTeresa(
    act('afternoon', '16:00', 'logistics',
      ['Empacar: mañana cambio de hotel y de país', 'Pack: tomorrow we change hotel and country'],
      ['Dejar las maletas listas esta noche para salir a las 8:30.', 'Have bags ready tonight to leave at 8:30 AM.'])),
  14: {
    title: ['Ataco → Anguiatú → Chiquimula (~3.5 h)', 'Ataco → Anguiatú → Chiquimula (~3.5 h)'],
    locationId: 'chiquimula',
    location: 'Santa Ana → Metapán → Anguiatú → Chiquimula',
    driveHours: 3.5,
    lodging: CAPORAL,
    activities: [
      act('morning', '08:30', 'logistics',
        ['Salida hacia Santa Ana y Metapán', 'Drive toward Santa Ana & Metapán'],
        ['Parada para Emily en Metapán antes de la frontera.', 'Stop for Emily in Metapán before the border.']),
      act('morning', '11:00', 'logistics',
        ['Frontera Anguiatú (de vuelta a Guatemala)', 'Anguiatú border (back into Guatemala)'],
        ['Frontera pequeña y tranquila. Revisar que todos tengan sello de salida.', 'Small, quiet border. Make sure everyone gets an exit stamp.'],
        'Frontera Anguiatu'),
      act('afternoon', '13:30', 'relaxation',
        ['Check-in y piscina en Grand Caporal', 'Check-in & pool at Grand Caporal'],
        ['Tarde de descanso: fue un día de carretera.', 'Rest afternoon after a road day.'],
        'Hotel Grand Caporal Chiquimula'),
    ],
  },
  15: {
    title: ['Chiquimula → Río Dulce y lancha corta', 'Chiquimula → Río Dulce & short boat ride'],
    locationId: 'rio-dulce',
    location: 'Chiquimula → Río Dulce',
    driveHours: 3,
    lodging: NANA_JUANA,
    activities: [
      act('morning', '07:30', 'logistics',
        ['Chiquimula → Río Dulce (~3 h)', 'Chiquimula → Río Dulce (~3 h)'],
        ['Tercer hotel en cinco noches: llevar una maleta pequeña de noche para no abrir todo.', 'Third hotel in five nights: carry a small overnight bag so you don’t unpack everything.']),
      act('morning', '11:00', 'family',
        ['Check-in en Nana Juana Marina', 'Check-in at Nana Juana Marina'],
        ['Caminos planos de concreto y A/C.', 'Flat concrete paths and A/C.'],
        'Nana Juana Marina Rio Dulce'),
      act('afternoon', '15:00', 'adventure',
        ['Paseo corto en lancha por el cañón (2–3 h)', 'Short canyon boat ride (2–3 h)'],
        ['No da tiempo para Livingston completo; regresar antes del anochecer.', 'Not enough time for Livingston; be back before dark.']),
    ],
  },
  16: longReturnFromRioDulce,
});

// ───────────────────────── December (days 19–23) ─────────────────────────

const decemberAtitlan = build('opt-december-atitlan-antigua', 'da', 'december', {
  19: nightDriveToAntigua(2),
  20: {
    title: ['Antigua colonial: Arco de Santa Catalina y Casa Santo Domingo', 'Colonial Antigua: Santa Catalina Arch & Santo Domingo'],
    locationId: 'antigua',
    location: 'Antigua Guatemala',
    driveHours: 0,
    lodging: SANTO_DOMINGO,
    activities: [
      act('morning', '08:30', 'adventure',
        ['Arco y Parque Central', 'The Arch & Central Plaza'],
        ['Fotos con el volcán de fondo antes de que llegue la gente. En el empedrado, Emily en el fular.', 'Volcano photos before the crowds. On the cobblestones, Emily in the carrier.'],
        'Arco de Santa Catalina Antigua Guatemala'),
      act('afternoon', '14:00', 'relaxation',
        ['Museos y jardines de Casa Santo Domingo', 'Casa Santo Domingo museums & gardens'],
        ['Senderos planos con rampas, guacamayas y criptas. Ideal para la carriola y los abuelos.', 'Flat paths with ramps, macaws and crypts. Ideal for the stroller and grandparents.']),
      act('evening', '19:00', 'food',
        ['Cena en Antigua', 'Dinner in Antigua'],
        ['Llevar chumpa: las noches bajan a 12–14 °C.', 'Bring a jacket: nights drop to 54–57 °F.']),
    ],
  },
  21: {
    title: ['Mágico Lago de Atitlán: llegada a Panajachel', 'Magical Lake Atitlán: arrival in Panajachel'],
    locationId: 'atitlan',
    location: 'Antigua → Panajachel',
    driveHours: 2,
    lodging: HOTEL_ATITLAN,
    activities: [
      act('morning', '09:00', 'adventure',
        ['Ruta panorámica al lago (~2 h)', 'Scenic drive to the lake (~2 h)'],
        ['Primera vista del lago desde el mirador de Godínez.', 'First view of the lake from the Godínez lookout.'],
        'Mirador de Godinez Solola'),
      act('afternoon', '13:00', 'relaxation',
        ['Jardines del Hotel Atitlán', 'Hotel Atitlán gardens'],
        ['Rosas, hortensias y aves junto a la orilla, todo plano.', 'Roses, hydrangeas and birds along the shore, all flat.'],
        'Hotel Atitlan Panajachel'),
      act('afternoon', '16:30', 'relaxation',
        ['Piscina climatizada al atardecer', 'Heated pool at sunset'],
        ['Abrigar bien a Emily al salir del agua: en diciembre sopla viento frío.', 'Bundle Emily up after the pool: December evenings are windy and cold.']),
    ],
  },
  22: {
    title: ['Lancha privada a San Juan La Laguna', 'Private boat to San Juan La Laguna'],
    locationId: 'atitlan',
    location: 'San Juan La Laguna, Sololá',
    driveHours: 0,
    lodging: HOTEL_ATITLAN,
    milestone: ['🚤 San Juan La Laguna', '🚤 San Juan La Laguna'],
    activities: [
      act('morning', '08:30', 'adventure',
        ['Lancha con el lago en calma', 'Boat ride on calm morning water'],
        ['Salir temprano: el viento Xocomil levanta oleaje después del mediodía.', 'Go early: the Xocomil wind kicks up waves after midday.']),
      act('morning', '09:15', 'family',
        ['Tuc-tuc a las cooperativas de tejedoras', 'Tuk-tuk to the weaving co-ops'],
        ['Tuc-tuc desde el muelle (Q5–Q10) para no subir a pie. Teñido natural y chocolate artesanal.', 'Tuk-tuk from the dock (Q5–Q10) to skip the uphill walk. Natural dyes and artisan chocolate.'],
        'San Juan La Laguna'),
      act('afternoon', '12:00', 'logistics',
        ['Regreso a Panajachel antes del viento', 'Back to Panajachel before the wind'],
        ['Tarde libre en el hotel.', 'Free afternoon at the hotel.']),
    ],
  },
  23: {
    title: ['Regreso a Ixhuatán antes de la Quema del Diablo', 'Home to Ixhuatán before the Burning of the Devil'],
    locationId: 'ixhuatan',
    location: 'Panajachel → Ixhuatán',
    driveHours: 4,
    milestone: ['🏡 Regreso a base', '🏡 Back to base'],
    activities: [
      act('morning', '09:30', 'logistics',
        ['Desayuno frente al lago y salida (~4 h)', 'Lakefront breakfast & departure (~4 h)'],
        ['Llegada estimada 14:00–15:00, antes del tráfico de la tarde.', 'Estimated arrival 2:00–3:00 PM, ahead of evening traffic.']),
      quemaDelDiablo,
    ],
  },
});

const decemberSemuc = build('opt-december-semuc-antigua', 'db', 'december', {
  19: {
    title: ['Salida nocturna a la capital (noche 1)', 'Evening drive to Guatemala City (night 1)'],
    locationId: 'aeropuerto',
    location: 'Ixhuatán → Ciudad de Guatemala',
    driveHours: 1.5,
    lodging: 'Hotel en zona 17/18 (salida a la CA-9)',
    activities: [
      act('evening', '18:30', 'logistics',
        ['Salida a la capital (~1.5 h)', 'Drive to the capital (~1.5 h)'],
        ['Dormir en la ciudad evita manejar 7.5 h de noche por montaña con Emily y los abuelos.', 'Sleeping in the city avoids a 7.5 h night drive through the mountains with Emily and the grandparents.']),
    ],
  },
  20: {
    title: ['Capital → Cobán (~4.5 h)', 'Guatemala City → Cobán (~4.5 h)'],
    locationId: 'semuc',
    location: 'CA-9 → CA-14 → Cobán',
    driveHours: 4.5,
    lodging: PARK_COBAN,
    activities: [
      act('morning', '07:00', 'logistics',
        ['Salida por la CA-9 y la CA-14', 'Out via CA-9 and CA-14'],
        ['Parada en el centro de visitantes del Biotopo del Quetzal (los senderos tienen gradas).', 'Stop at the Quetzal Biotope visitor center (the trails have steps).'],
        'Biotopo del Quetzal'),
      act('afternoon', '12:30', 'food',
        ['Almuerzo en Cobán: kak’ik', 'Lunch in Cobán: kak’ik'],
        ['Sopa tradicional de chunto (pavo): un guiño a Thanksgiving.', 'Traditional turkey soup: a nod to Thanksgiving.']),
      act('afternoon', '15:00', 'relaxation',
        ['Tarde tranquila en el hotel', 'Quiet afternoon at the hotel'],
        ['Mañana se sale a las 7:00.', 'Tomorrow we leave at 7:00 AM.']),
    ],
  },
  21: semucDay(GUAYAHA),
  22: {
    title: ['Grutas de Lanquín y regreso a Cobán', 'Lanquín caves & back to Cobán'],
    locationId: 'semuc',
    location: 'Lanquín → Cobán',
    driveHours: 2,
    lodging: PARK_COBAN,
    activities: [
      act('morning', '09:00', 'adventure',
        ['Grutas de Lanquín (opcional)', 'Lanquín caves (optional)'],
        ['Gradas húmedas y poca luz: abuelos y niñas solo hasta la entrada.', 'Wet steps and low light: grandparents and girls only to the entrance.'],
        'Grutas de Lanquin'),
      act('afternoon', '13:00', 'logistics',
        ['Regreso a Cobán (~2 h)', 'Back to Cobán (~2 h)'],
        ['Subidas fuertes: sin prisa.', 'Steep climbs: no rush.']),
      act('evening', '18:00', 'logistics',
        ['Cena y empacar', 'Dinner & pack'],
        ['Mañana son ~6 h de carretera.', 'Tomorrow is ~6 h of driving.']),
    ],
  },
  23: {
    title: ['Cobán → Ixhuatán (~6 h)', 'Cobán → Ixhuatán (~6 h)'],
    locationId: 'ixhuatan',
    location: 'Cobán → Ixhuatán',
    driveHours: 6,
    milestone: ['🏡 Regreso a base', '🏡 Back to base'],
    activities: [
      act('morning', '06:30', 'logistics',
        ['Salida temprana', 'Early start'],
        ['Meta: llegar antes de las 17:00. Paradas cada 1.5–2 h para Emily.', 'Goal: arrive by 5:00 PM. Stops every 1.5–2 h for Emily.']),
      quemaDelDiablo,
    ],
  },
});

const decemberHybrid = build('opt-december-hibrido', 'dc', 'december', {
  19: nightDriveToAntigua(1),
  20: {
    title: ['Antigua → Panajachel', 'Antigua → Panajachel'],
    locationId: 'atitlan',
    location: 'Antigua → Panajachel',
    driveHours: 2,
    lodging: HOTEL_ATITLAN,
    activities: [
      act('morning', '08:30', 'adventure',
        ['Paseo corto por Antigua', 'Short walk around Antigua'],
        ['Solo el Arco y el Parque Central antes de salir.', 'Just the Arch and Central Plaza before leaving.']),
      act('morning', '11:00', 'logistics',
        ['Ruta a Panajachel (~2 h)', 'Drive to Panajachel (~2 h)'],
        ['Parada en el mirador de Godínez.', 'Stop at the Godínez lookout.']),
      act('afternoon', '16:00', 'relaxation',
        ['Atardecer en los jardines del hotel', 'Sunset in the hotel gardens'],
        ['Única tarde en el lago.', 'The only afternoon at the lake.']),
    ],
  },
  21: {
    title: ['Lancha temprano y ruta larga a Cobán (~5.5 h)', 'Early boat ride & long drive to Cobán (~5.5 h)'],
    locationId: 'semuc',
    location: 'Panajachel → Chimaltenango → capital → Cobán',
    driveHours: 5.5,
    lodging: PARK_COBAN,
    activities: [
      act('morning', '07:30', 'adventure',
        ['Lancha corta en el lago', 'Short boat ride on the lake'],
        ['Con agua calma, antes del Xocomil.', 'On calm water, before the Xocomil wind.']),
      act('morning', '10:00', 'logistics',
        ['Panajachel → Cobán (~5.5 h)', 'Panajachel → Cobán (~5.5 h)'],
        ['Cruza la capital un sábado: tráfico probable. Paradas cada 1.5–2 h.', 'Crosses the capital on a Saturday: expect traffic. Stops every 1.5–2 h.']),
      act('evening', '17:00', 'food',
        ['Llegada y cena en Cobán', 'Arrive & dinner in Cobán'],
        ['Cuarto hotel distinto en cuatro noches.', 'Fourth different hotel in four nights.']),
    ],
  },
  22: semucDay(GUAYAHA),
  23: {
    title: ['Lanquín → Ixhuatán (~7.5 h)', 'Lanquín → Ixhuatán (~7.5 h)'],
    locationId: 'ixhuatan',
    location: 'Lanquín → Ixhuatán',
    driveHours: 7.5,
    milestone: ['🏡 Regreso a base', '🏡 Back to base'],
    activities: [
      act('morning', '05:30', 'logistics',
        ['Salida antes del amanecer', 'Leave before sunrise'],
        ['El día más pesado del viaje. Llegada estimada 14:00–15:00, antes de la Quema del Diablo.', 'The heaviest day of the trip. Estimated arrival 2:00–3:00 PM, before the Burning of the Devil.']),
      quemaDelDiablo,
    ],
  },
});

export const optionItineraries: Record<string, DayPlan[]> = {
  'opt-thanksgiving-elsalvador': thanksgivingElSalvador,
  'opt-thanksgiving-riodulce': thanksgivingRioDulce,
  'opt-thanksgiving-hibrido': thanksgivingCombined,
  'opt-december-atitlan-antigua': decemberAtitlan,
  'opt-december-semuc-antigua': decemberSemuc,
  'opt-december-hibrido': decemberHybrid,
};
