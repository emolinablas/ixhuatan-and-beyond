import { DayPlan } from '../types/trip';

// The home-base days of the month. The two road trips (Thanksgiving 11–16,
// December 19–23) live in planDays.ts.
export const baseDays: DayPlan[] = [
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
        title: 'Revisión de carros, papeles y maletas para el viaje de Thanksgiving',
        titleEn: 'Car, paperwork & packing check for the Thanksgiving trip',
        description: 'Pasaportes de las niñas, $24 exactos para Bruce y Norma, tarjeta de circulación y título de los carros, trajes de baño y toallas, y ropa fresca y repelente para Río Dulce. Salida mañana a las 7:30.',
        descriptionEn: 'Girls’ passports, exactly $24 for Bruce & Norma, car registration and titles, swimsuits and towels, and light clothes and repellent for Río Dulce. Leaving tomorrow at 7:30 AM.',
        tag: 'logistics'
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
