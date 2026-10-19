import { ActivityBlock, ActivityTag, DayPhase, DayPlan } from '../types/trip';
import { dateForDay, formatIsoDate } from '../lib/dates';

// Day-by-day for the two decided road trips: Thanksgiving (days 11–16) and
// December (days 19–23). The rest of the month lives in baseDays.ts.

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

const build = (prefix: string, phase: DayPhase, seeds: Record<number, DaySeed>): DayPlan[] =>
  Object.entries(seeds).map(([n, s]) => {
    const dayNumber = Number(n);
    const date = dateForDay(dayNumber);
    return {
      id: `${prefix}-day-${dayNumber}`,
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
      driveHours: s.driveHours,
      activities: s.activities.map((a, i) => ({
        id: `${prefix}-${dayNumber}-${i + 1}`,
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

// ───────────────────────── Thanksgiving (days 11–16) ─────────────────────────

const CARDEDEU = 'Cardedeu Hotel Coatepeque (ala frente al lago)';
const CAPORAL = 'Hotel Grand Caporal (Chiquimula)';
const NANA_JUANA = 'Nana Juana Marina & Resort (Río Dulce)';
const PARAGLIDING = 'Cabañas Paragliding Chiquimula (Saspán)';

const thanksgivingDays = build('tg', 'thanksgiving', {
  11: {
    title: ['Rumbo a Coatepeque: Cueva de Andá Mirá y pupusas en Ahuachapán', 'Off to Coatepeque: Andá Mirá cave & pupusas in Ahuachapán'],
    locationId: 'coatepeque',
    location: 'Ixhuatán → Jalpatagua → Las Chinamas → Ahuachapán → Lago de Coatepeque',
    driveHours: 2.5,
    lodging: CARDEDEU,
    milestone: ['🚗 Salida 7:30 AM', '🚗 Leave 7:30 AM'],
    activities: [
      act('morning', '07:30', 'logistics',
        ['Salida de Ixhuatán (10 personas, 2 carros)', 'Leave Ixhuatán (10 people, 2 cars)'],
        ['Por la CA-8 hacia Jalpatagua (~1 h). En una sola bolsa: pasaportes, DPI, tarjeta de circulación y $24 exactos para Bruce y Norma.',
         'Along CA-8 toward Jalpatagua (~1 h). In one pouch: passports, IDs, car registration and exactly $24 for Bruce & Norma.']),
      act('morning', '08:30', 'adventure',
        ['Cueva de Andá Mirá (Jalpatagua, km 115 CA-8)', 'Andá Mirá cave (Jalpatagua, km 115 CA-8)'],
        ['Balneario de aguas azufradas con pozas y una cueva de unos 12 m con poca luz y piso mojado (llevar linterna impermeable). Entrada Q15 adultos, Q10 niños, parqueo Q15. Emily mejor fuera del agua azufrada; traer toallas y ropa seca.',
         'Sulfur-water pools and a ~12 m cave with little light and wet floors (bring a waterproof flashlight). Entry Q15 adults, Q10 children, parking Q15. Keep Emily out of the sulfur water; bring towels and dry clothes.'],
        'Cueva Anda Mira Jalpatagua'),
      act('morning', '10:30', 'logistics',
        ['Frontera Valle Nuevo – Las Chinamas (a 15 min)', 'Valle Nuevo – Las Chinamas border (15 min away)'],
        ['Migración y aduana (30–60 min). Bruce y Norma pagan $12 c/u en efectivo: pedir y guardar el recibo. La aduana da el permiso temporal de los carros.',
         'Immigration and customs (30–60 min). Bruce & Norma pay $12 each in cash: ask for and keep the receipt. Customs issues the cars’ temporary permit.'],
        'Frontera Las Chinamas El Salvador'),
      act('afternoon', '12:00', 'food',
        ['Almuerzo de pupusas en Ahuachapán', 'Pupusa lunch in Ahuachapán'],
        ['A 15 min de la frontera. Pupuserías alrededor del parque central (Parque Menéndez): revueltas, queso con loroco y frijol con queso. Elegir por reseñas recientes en Google Maps.',
         '15 min past the border. Pupuserías around the central square (Parque Menéndez): revueltas, cheese with loroco, and bean with cheese. Pick by recent Google Maps reviews.'],
        'Parque Menendez Ahuachapan'),
      act('afternoon', '14:00', 'logistics',
        ['Ahuachapán → Lago de Coatepeque (~1 h)', 'Ahuachapán → Lake Coatepeque (~1 h)'],
        ['Por Santa Ana. La bajada al lago tiene curvas; llegar con luz para ver el cráter.', 'Via Santa Ana. The road down to the lake has curves; arrive in daylight to see the crater.']),
      act('afternoon', '15:30', 'family',
        ['Check-in en Cardedeu Hotel Coatepeque', 'Check-in at Cardedeu Hotel Coatepeque'],
        ['Pedir el ala frente al lago y habitaciones sin gradas cerca del parqueo para Doña Isabel. Atardecer sobre el lago (~17:25).',
         'Ask for the lakefront wing and step-free rooms near the parking for Doña Isabel. Sunset over the lake (~5:25 PM).'],
        'La Pampa Coatepeque'),
      act('evening', '19:00', 'food',
        ['Cena en el complejo', 'Dinner at the hotel'],
        ['Bistro del hotel o La Pampa (parrilla argentina, en el mismo complejo).', 'Hotel bistro or La Pampa (Argentine grill, same complex).']),
    ],
  },
  12: {
    title: ['🦃 Thanksgiving frente al lago y ruta a Chiquimula', '🦃 Thanksgiving by the lake & on to Chiquimula'],
    locationId: 'coatepeque',
    location: 'Lago de Coatepeque → Metapán → Anguiatú → Chiquimula',
    driveHours: 2.75,
    lodging: CAPORAL,
    milestone: ['🦃 Comida de Thanksgiving', '🦃 Thanksgiving meal'],
    activities: [
      act('morning', '07:30', 'adventure',
        ['Mañana en el lago', 'Morning on the lake'],
        ['El agua está más calmada temprano: lancha o kayak desde el hotel, o piscina. Chalecos para todos (tallas infantiles para Emily e Isabella).',
         'The water is calmest early: boat or kayak from the hotel, or the pool. Life jackets for all (child sizes for Emily & Isabella).']),
      act('afternoon', '11:30', 'thanksgiving',
        ['Comida de Acción de Gracias en La Pampa Coatepeque', 'Thanksgiving meal at La Pampa Coatepeque'],
        ['Reservar con anticipación (WhatsApp +503 7349 4582) una mesa para 10 sin gradas y preguntar si pueden preparar pavo. Brindis de las tres generaciones con vista al cráter.',
         'Book ahead (WhatsApp +503 7349 4582) a step-free table for 10 and ask whether they can prepare turkey. Three-generation toast overlooking the crater.'],
        'La Pampa Coatepeque'),
      act('afternoon', '13:30', 'logistics',
        ['Salida a Chiquimula por Metapán (~2 h 45 min)', 'Drive to Chiquimula via Metapán (~2 h 45 min)'],
        ['A más tardar 13:30 para cruzar la frontera con luz de día. Santa Ana → Metapán → Anguiatú (~2 h) → Chiquimula (~45 min).',
         'No later than 1:30 PM to cross the border in daylight. Santa Ana → Metapán → Anguiatú (~2 h) → Chiquimula (~45 min).']),
      act('afternoon', '15:30', 'logistics',
        ['Frontera Anguiatú (de vuelta a Guatemala)', 'Anguiatú border (back into Guatemala)'],
        ['Frontera pequeña y tranquila. Revisar que todos tengan sello de salida de El Salvador.', 'Small, quiet border. Make sure everyone gets an El Salvador exit stamp.'],
        'Frontera Anguiatu'),
      act('evening', '17:00', 'relaxation',
        ['Check-in en Hotel Grand Caporal', 'Check-in at Hotel Grand Caporal'],
        ['Piscinas entre jardines. Cena ligera: el banquete fue al mediodía.', 'Pools among gardens. Light dinner: the feast was at midday.'],
        'Hotel Gran Caporal Chiquimula'),
    ],
  },
  13: {
    title: ['Chiquimula → Río Dulce', 'Chiquimula → Río Dulce'],
    locationId: 'rio-dulce',
    location: 'Chiquimula → Río Hondo → Río Dulce',
    driveHours: 3.5,
    lodging: NANA_JUANA,
    activities: [
      act('morning', '07:30', 'relaxation',
        ['Desayuno y un rato de piscina', 'Breakfast & a little pool time'],
        ['Salir a las 9:00 con todo cargado.', 'Leave at 9:00 AM with everything loaded.']),
      act('morning', '09:00', 'logistics',
        ['Ruta a Río Dulce (~3 h 30 min)', 'Drive to Río Dulce (~3 h 30 min)'],
        ['Por la CA-10 y la CA-9. Parada opcional en el Museo de Paleontología de Estanzuela (mastodontes) para Isabella.',
         'Via CA-10 and CA-9. Optional stop at the Estanzuela Paleontology Museum (mastodons) for Isabella.'],
        'Museo de Paleontologia Estanzuela'),
      act('afternoon', '12:30', 'family',
        ['Check-in en Nana Juana Marina (2 noches)', 'Check-in at Nana Juana Marina (2 nights)'],
        ['Caminos planos de concreto y A/C. Mosquitero en la cuna de Emily.', 'Flat concrete paths and A/C. Mosquito net on Emily’s crib.'],
        'Nana Juana Marina Rio Dulce'),
      act('afternoon', '15:30', 'adventure',
        ['Castillo de San Felipe (5 min)', 'San Felipe fortress (5 min)'],
        ['Con el sol más suave. Jardines planos afuera; el interior tiene gradas estrechas.', 'In the softer afternoon sun. Flat lawns outside; narrow stairs inside.'],
        'Castillo de San Felipe de Lara'),
      act('evening', '19:00', 'food',
        ['Cena en la marina', 'Dinner at the marina'],
        ['Pescado fresco del lago Izabal.', 'Fresh fish from Lake Izabal.']),
    ],
  },
  14: {
    title: ['Lancha por el cañón hasta Livingston', 'Boat through the canyon to Livingston'],
    locationId: 'rio-dulce',
    location: 'Río Dulce → Livingston',
    driveHours: 0,
    lodging: NANA_JUANA,
    milestone: ['🚤 Cañón del Río Dulce', '🚤 Río Dulce canyon'],
    activities: [
      act('morning', '08:00', 'adventure',
        ['Lancha privada techada', 'Private covered boat'],
        ['Salir con el agua calma. Chalecos para todos (tallas infantiles para Emily e Isabella). Paradas en la Isla de las Garzas y las aguas termales del cañón (bajar solo con ayuda).',
         'Leave while the water is calm. Life jackets for all (child sizes for Emily & Isabella). Stops at Bird Island and the canyon hot springs (step off only with help).']),
      act('afternoon', '11:30', 'food',
        ['Almuerzo garífuna en Livingston', 'Garifuna lunch in Livingston'],
        ['Tapado frente al muelle. Las calles suben: los abuelos pueden quedarse en un restaurante cerca del muelle.',
         'Tapado by the dock. The streets climb: the grandparents can stay at a restaurant near the dock.'],
        'Livingston Izabal'),
      act('afternoon', '15:00', 'relaxation',
        ['Regreso y piscina', 'Return & pool'],
        ['Tarde libre en la piscina tipo laguna.', 'Free afternoon at the lagoon-style pool.']),
    ],
  },
  15: {
    title: ['Río Dulce → Paragliding Chiquimula', 'Río Dulce → Paragliding Chiquimula'],
    locationId: 'paragliding',
    location: 'Río Dulce → Chiquimula → San José La Arada (Saspán)',
    driveHours: 3.75,
    lodging: PARAGLIDING,
    activities: [
      act('morning', '08:00', 'relaxation',
        ['Mañana libre en la marina', 'Free morning at the marina'],
        ['Piscina o kayak, empacar con calma y almorzar temprano.', 'Pool or kayak, pack slowly and have an early lunch.']),
      act('afternoon', '12:30', 'logistics',
        ['Salida hacia Chiquimula (~3 h 45 min)', 'Drive toward Chiquimula (~3 h 45 min)'],
        ['Salir a las 12:30 para llegar con luz: el último tramo sube a la montaña en la aldea Saspán (San José La Arada).',
         'Leave at 12:30 to arrive in daylight: the last stretch climbs into the mountains at Saspán (San José La Arada).']),
      act('afternoon', '16:30', 'family',
        ['Check-in en las cabañas de Paragliding Chiquimula', 'Check-in at the Paragliding Chiquimula cabins'],
        ['Cabañas entre pinos con vista. Antes de reservar: confirmar que alcancen para 10 y que haya acceso sin gradas para Doña Isabel (si no, segunda noche en el Grand Caporal). WhatsApp +502 4995 5081.',
         'Cabins among pine trees with a view. Before booking: confirm there’s room for 10 and step-free access for Doña Isabel (otherwise a second night at Grand Caporal). WhatsApp +502 4995 5081.']),
      act('evening', '18:30', 'food',
        ['Cena en el restaurante del parque', 'Dinner at the park restaurant'],
        ['Noche fresca de montaña: llevar suéter.', 'Cool mountain night: bring a sweater.']),
    ],
  },
  16: {
    title: ['Mañana de aventura y regreso a Ixhuatán', 'Adventure morning & home to Ixhuatán'],
    locationId: 'paragliding',
    location: 'San José La Arada → Ipala → Jutiapa → Ixhuatán',
    driveHours: 2.3,
    milestone: ['🏡 Regreso al hogar', '🏡 Back home'],
    activities: [
      act('morning', '08:00', 'adventure',
        ['Parapente, canopy y piscina climatizada', 'Paragliding, zip line & heated pool'],
        ['Vuelo en tándem con piloto certificado para quien se anime (≈Q750 en 2022: confirmar precio, peso máximo y horario según el viento). Trampolines y paseo en camello para Isabella; piscina climatizada para todos.',
         'Tandem flight with a certified pilot for whoever is up for it (≈Q750 in 2022: confirm price, weight limit and wind-dependent times). Trampolines and a camel ride for Isabella; heated pool for everyone.']),
      act('afternoon', '13:00', 'food',
        ['Almuerzo en el parque', 'Lunch at the park'],
        ['Comer antes de salir para no parar en el camino.', 'Eat before leaving so there’s no need to stop on the way.']),
      act('afternoon', '14:00', 'logistics',
        ['Regreso a Ixhuatán (~2 h 20 min)', 'Drive home to Ixhuatán (~2 h 20 min)'],
        ['Por Ipala y Jutiapa. Llegada estimada 16:30–17:00. Ever regresa al trabajo mañana.', 'Via Ipala and Jutiapa. Estimated arrival 4:30–5:00 PM. Ever is back at work tomorrow.']),
    ],
  },
});

// ───────────────────────── December (days 19–23) ─────────────────────────

const SANTO_DOMINGO = 'Hotel Museo Casa Santo Domingo (Antigua)';
const HOTEL_ATITLAN = 'Hotel Atitlán (Panajachel)';

const decemberDays = build('dec', 'december', {
  19: {
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
        ['Check-in en Casa Santo Domingo (2 noches)', 'Check-in at Casa Santo Domingo (2 nights)'],
        ['Pedir habitaciones cerca de las rampas. Cena ligera en el hotel.', 'Ask for rooms near the ramps. Light dinner at the hotel.'],
        'Hotel Museo Casa Santo Domingo Antigua'),
    ],
  },
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
      act('evening', '18:00', 'family',
        ['🔥 Quema del Diablo (desde casa)', '🔥 Burning of the Devil (from home)'],
        ['Tradición guatemalteca: fogatas y cohetes a las 18:00 en todo el país. Bruce y Norma pueden verla de lejos; Emily adentro, lejos del humo y el ruido.',
         'Guatemalan tradition: bonfires and firecrackers at 6:00 PM nationwide. Bruce & Norma can watch from a distance; Emily stays inside, away from smoke and noise.']),
    ],
  },
});

export const planDays: DayPlan[] = [...thanksgivingDays, ...decemberDays];
