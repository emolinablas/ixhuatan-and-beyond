import { PackingItem } from '../types/trip';

export const packingItems: PackingItem[] = [
  // MASTER ESSENTIALS
  {
    id: 'pack-m-passports-kids',
    category: 'master',
    title: '⚠️ URGENTE: Pasaporte de Emily (nuevo) e Isabella (renovación)',
    titleEn: '⚠️ URGENT: Passports for Emily (new) & Isabella (renewal)',
    description: 'Requisito migratorio obligatorio para menores de edad si se viaja a El Salvador. Agendar cita en IGM Guatemala inmediatamente (pago Banrural $50 USD, certificados RENAP con QR y ambos padres con DPI).',
    descriptionEn: 'Mandatory immigration requirement for minors entering El Salvador. Schedule appointment at IGM Guatemala right away ($50 fee at Banrural, recent RENAP birth certificates with QR, both parents present with DPI).',
    isEssential: true
  },
  {
    id: 'pack-m-tourist-card-cash',
    category: 'master',
    title: 'Efectivo para Tarjeta de Turismo de Bruce & Norma ($12 USD c/u)',
    titleEn: 'Cash for Bruce & Norma Tourist Card ($12 USD each)',
    description: 'Migración de El Salvador cobra $12 USD exactos en efectivo por persona a ciudadanos estadounidenses al ingresar.',
    descriptionEn: 'El Salvador Immigration collects exactly $12 USD in cash per person for US passport holders upon entry.',
    isEssential: true
  },
  {
    id: 'pack-m-vehicle-docs',
    category: 'master',
    title: 'Documentos de los carros para cruzar a El Salvador',
    titleEn: 'Car documents for crossing into El Salvador',
    description: 'Tarjeta de circulación, título de propiedad y licencia vigente. Si el carro no está a nombre del conductor: carta poder autenticada por notario. Confirmar requisitos con la aduana de Valle Nuevo.',
    descriptionEn: 'Registration card, title and a valid license. If the car is not in the driver’s name: a notarized authorization letter. Confirm requirements with Valle Nuevo customs.',
    isEssential: true
  },
  {
    id: 'pack-m-birth-certs',
    category: 'master',
    title: 'Certificados de nacimiento RENAP de Isabella y Emily (respaldo)',
    titleEn: 'RENAP birth certificates for Isabella & Emily (backup)',
    description: 'Llevarlos junto a los pasaportes: algunas fronteras los piden para comprobar que viajan con sus padres.',
    descriptionEn: 'Carry them with the passports: some borders ask for them to confirm the girls are traveling with their parents.',
    isEssential: false
  },
  {
    id: 'pack-m-offline-maps',
    category: 'master',
    title: 'Mapas sin conexión en Google Maps',
    titleEn: 'Offline maps in Google Maps',
    description: 'Descargar las zonas de la ruta elegida (Izabal o Alta Verapaz no tienen señal en varios tramos). Abrir esta app una vez con internet para que quede guardada.',
    descriptionEn: 'Download the areas of the chosen route (Izabal and Alta Verapaz have long no-signal stretches). Open this app once online so it stays saved.',
    isEssential: false
  },
  {
    id: 'pack-m-1',
    category: 'master',
    title: 'Pasaportes vigentes (mínimo 6 meses de vigencia)',
    titleEn: 'Valid Passports (at least 6 months validity)',
    description: 'Imprescindible para Bruce & Norma y para cruzar a El Salvador si eligen esa opción.',
    descriptionEn: 'Crucial for Bruce & Norma and for El Salvador border crossing if chosen.',
    initiallyChecked: true,
    isEssential: true
  },
  {
    id: 'pack-m-2',
    category: 'master',
    title: 'Documentos de Identificación (DPI) de la familia guatemalteca',
    titleEn: 'Guatemalan Family IDs (DPI cards)',
    description: 'DPIs vigentes para Jonchito, Lidia, Isabel, Nely, Cori y Ever.',
    descriptionEn: 'Current national IDs for local border crossings and hotel check-ins.',
    initiallyChecked: true,
    isEssential: true
  },
  {
    id: 'pack-m-3',
    category: 'master',
    title: 'Seguro médico de viaje internacional',
    titleEn: 'International Travel Health Insurance',
    description: 'Para Bruce y Norma, guardando números de asistencia en el teléfono.',
    descriptionEn: 'Coverage policy details and 24/7 hotline saved in phones for Bruce & Norma.',
    isEssential: true
  },
  {
    id: 'pack-m-4',
    category: 'master',
    title: 'Dólares en efectivo ($ USD) y Quetzales (Q GTQ)',
    titleEn: 'Cash in US Dollars ($ USD) & Quetzales (Q GTQ)',
    description: 'Billetes limpios sin roturas. Dólares se usan en El Salvador; Quetzales en Guatemala.',
    descriptionEn: 'Crisp unmarked bills. US Dollars used in El Salvador; Quetzales across Guatemala.',
    isEssential: true
  },
  {
    id: 'pack-m-5',
    category: 'master',
    title: 'Cargadores, baterías externas (Power Banks) y cables',
    titleEn: 'Phone chargers, portable power banks & USB cables',
    description: 'Enchufe en Guatemala y El Salvador es el mismo estándar que en EE.UU. (Tipo A/B, 110V).',
    descriptionEn: 'Plugs in Guatemala and El Salvador are the exact same standard as the US (Type A/B 110V).',
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
    isEssential: true
  },
  {
    id: 'pack-b-2',
    category: 'beach',
    title: 'Sandalias / chanclas gruesas (la arena volcánica negra se calienta)',
    titleEn: 'Thick beach sandals (black volcanic sand gets very hot)',
    description: 'Indispensable para caminar de la casa/hotel a la orilla del mar.',
    descriptionEn: 'Essential for walking from the hotel patio across dark sand to the waves.',
    isEssential: true
  },
  {
    id: 'pack-b-3',
    category: 'beach',
    title: 'Sombreros de ala ancha y lentes de sol con filtro UV',
    titleEn: 'Wide-brim sun hats & UV protective sunglasses',
    description: 'Para proteger a los abuelos y a los niños del reflejo del agua.',
    descriptionEn: 'Shields seniors and children from direct tropical glare.',
    isEssential: false
  },
  {
    id: 'pack-b-4',
    category: 'beach',
    title: 'Repelente de mosquitos amigable para la piel',
    titleEn: 'Gentle mosquito repellent spray / lotion',
    description: 'Para el paseo en lancha en los manglares de Chiquimulilla.',
    descriptionEn: 'Crucial for morning mangrove canal boat cruise.',
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
    isEssential: true
  },
  {
    id: 'pack-h-2',
    category: 'highland',
    title: 'Zapatos cómodos con suela antideslizante para empedrado',
    titleEn: 'Sturdy, comfortable walking shoes with grip for cobblestones',
    description: 'Las calles de Antigua y Ataco son de piedra colonial; evitar suelas lisas o tacones.',
    descriptionEn: 'Antigua and Ataco streets are historical cobblestones; avoid smooth soles.',
    isEssential: true
  },
  {
    id: 'pack-h-3',
    category: 'highland',
    title: 'Pashmina, bufanda liviana o suéter abrigador',
    titleEn: 'Light scarf, wrap or cardigan for breezy boat rides',
    description: 'El viento en la lancha en el Lago de Atitlán puede ser frío.',
    descriptionEn: 'The breeze across Lake Atitlán during boat crossings can feel cool.',
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
    isEssential: true
  },
  {
    id: 'pack-j-2',
    category: 'jungle',
    title: 'Ropa de secado rápido y manga larga fresca transpirable',
    titleEn: 'Quick-dry breathable long-sleeve shirts (sun/bug protection)',
    description: 'Protege del sol y de picaduras mientras mantiene el cuerpo fresco.',
    descriptionEn: 'Keeps you cool while shielding arms from tropical sun and insects.',
    isEssential: false
  },
  {
    id: 'pack-j-3',
    category: 'jungle',
    title: 'Capa impermeable liviana o poncho para lluvia tropical',
    titleEn: 'Lightweight packable rain poncho / windbreaker',
    description: 'En el caribe guatemalteco puede haber chubascos repentinos y refrescantes.',
    descriptionEn: 'Caribbean Guatemala can have sudden, refreshing tropical showers.',
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
    isEssential: true
  },
  {
    id: 'pack-baby-2',
    category: 'baby',
    title: 'Fórmula infantil suficiente, biberones y agua purificada sellada',
    titleEn: 'Baby formula, sanitized bottles & sealed purified nursery water',
    description: 'Llevar marca habitual para evitar cambios en su digestión.',
    descriptionEn: 'Bring habitual formula brand to prevent digestive changes on the road.',
    isEssential: true
  },
  {
    id: 'pack-baby-3',
    category: 'baby',
    title: 'Repelente y protector solar formulado especialmente para bebés de 6+ meses',
    titleEn: 'Mineral baby-safe sunscreen & gentle baby insect lotion (6m+)',
    description: 'Fórmulas minerales de óxido de zinc recomendadas por pediatra.',
    descriptionEn: 'Pediatrician-approved zinc mineral formula safe for sensitive infant skin.',
    isEssential: true
  },
  {
    id: 'pack-baby-4',
    category: 'baby',
    title: 'Mosquitero elástico para carriola y cuna portátil',
    titleEn: 'Elastic mosquito netting for stroller & travel pack-and-play',
    description: 'Protege a Emily de zancudos durante siestas en la playa y en Río Dulce.',
    descriptionEn: 'Keeps Emily protected during shaded naps by the beach or river.',
    isEssential: true
  },
  {
    id: 'pack-baby-5',
    category: 'baby',
    title: 'Pañales para agua (Swim Diapers) y trajecito con filtro UV',
    titleEn: 'Swim diapers & UPF 50+ rashguard baby swimwear',
    description: 'Para chapotear con seguridad en la piscina de Monterrico y Chiquimula.',
    descriptionEn: 'For happy splashing in the swimming pools in Monterrico and Chiquimula.',
    isEssential: false
  },
  {
    id: 'pack-baby-6',
    category: 'baby',
    title: 'Botiquín de bebé: termómetro, acetaminofén pediátrico y suero oral',
    titleEn: 'Baby first-aid: digital thermometer, infant acetaminophen & oral electrolytes',
    description: 'Recomendaciones básicas de botiquín infantil para tranquilidad de Cori y Ever.',
    descriptionEn: 'Basic pediatrician-guided travel kit for complete peace of mind.',
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
    initiallyChecked: true,
    isEssential: true
  },
  {
    id: 'pack-sen-2',
    category: 'seniors',
    title: 'Almohadilla de viaje ergonómica / soporte lumbar para el auto',
    titleEn: 'Ergonomic neck pillow / lumbar cushion for vehicle rides',
    description: 'Mayor confort en los trayectos hacia la playa y el Altiplano.',
    descriptionEn: 'Extra comfort and lower back support during scenic drives.',
    isEssential: false
  },
  {
    id: 'pack-sen-3',
    category: 'seniors',
    title: 'Bastón plegable liviano de apoyo (opcional)',
    titleEn: 'Lightweight folding walking cane (optional)',
    description: 'Brinda firmeza al caminar sobre empedrados antiguos o escalones de miradores.',
    descriptionEn: 'Provides extra stability on historical cobblestones or dock ramps.',
    isEssential: false
  },
  {
    id: 'pack-sen-4',
    category: 'seniors',
    title: 'Calzado ortopédico acolchonado con buen soporte de tobillo',
    titleEn: 'Cushioned walking shoes with solid arch & ankle support',
    description: 'Previene cansancio en piernas durante los recorridos por Ataco, Antigua y Panajachel.',
    descriptionEn: 'Prevents leg fatigue during relaxed strolls in Ataco, Antigua, and Panajachel.',
    isEssential: true
  }
];
