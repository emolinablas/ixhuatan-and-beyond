import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FamilyCrew: React.FC = () => {
  const { language, t } = useLanguage();

  const members = [
    {
      name: 'Bruce & Norma',
      role: language === 'es' ? 'Invitados de Honor (EE.UU.)' : 'Guests of Honor (USA)',
      ageBadge: language === 'es' ? '70s • Aventureros' : '70s • Adventurers',
      avatar: '🇺🇸',
      bgGradient: 'from-blue-500 to-indigo-600',
      tripParticipation: language === 'es' ? '🚀 Viaja en ambos: Thanksgiving & Diciembre' : '🚀 Traveling on both: Thanksgiving & December',
      isCoreSix: true,
      description: language === 'es'
        ? 'Amigos queridos que viajan desde EE.UU. Listos para maravillarse con los volcanes, el lago y compartir el calor de la familia guatemalteca.'
        : 'Cherished friends visiting from the US. Ready to experience majestic volcanoes, Lake Atitlán, and warm Guatemalan hospitality.',
      favorite: language === 'es' ? 'Atitlán & Río Dulce' : 'Atitlán & Río Dulce'
    },
    {
      name: 'Ever & Cori',
      role: language === 'es' ? 'Anfitriones & Coordinadores' : 'Hosts & Trip Coordinators',
      ageBadge: language === 'es' ? 'Ixhuatán, Santa Rosa' : 'Ixhuatán, Santa Rosa',
      avatar: '🏡',
      bgGradient: 'from-emerald-500 to-teal-600',
      tripParticipation: language === 'es' ? '🚀 Viaja en ambos: Thanksgiving & Diciembre' : '🚀 Traveling on both: Thanksgiving & December',
      isCoreSix: true,
      description: language === 'es'
        ? 'Los creadores de esta experiencia inolvidable. Abren las puertas de su hogar y organizan cada detalle con amor.'
        : 'The architects of this unforgettable adventure. Opening their family home and curating every route with love.',
      favorite: language === 'es' ? 'Cataratas Los Amates & Playa' : 'Los Amates Falls & Beach'
    },
    {
      name: 'Isabella & Emily',
      role: language === 'es' ? 'Las Pequeñas del Hogar' : 'The Little Princesses',
      ageBadge: language === 'es' ? 'Isabella & Emily (7 meses)' : 'Isabella & Emily (7 months)',
      avatar: '👶',
      bgGradient: 'from-pink-500 to-rose-500',
      tripParticipation: language === 'es' ? '🚀 Viaja en ambos: Thanksgiving & Diciembre' : '🚀 Traveling on both: Thanksgiving & December',
      isCoreSix: true,
      description: language === 'es'
        ? 'Isabella llena de energía y juegos; Emily en su primer gran viaje familiar descubriendo el mundo en brazos de todos.'
        : 'Isabella spreading pure joy and games; baby Emily on her first grand family journey discovering the world.',
      favorite: language === 'es' ? 'Tortuguitas en Monterrico' : 'Baby Turtles in Monterrico'
    },
    {
      name: 'Jonchito & Lidia',
      role: language === 'es' ? 'Los Abuelos Paternos' : 'The Loving In-Laws',
      ageBadge: language === 'es' ? '60s • Tradición y Familia' : '60s • Tradition & Family',
      avatar: '👵',
      bgGradient: 'from-amber-500 to-orange-600',
      tripParticipation: language === 'es' ? '🦃 Viaje de Thanksgiving' : '🦃 Thanksgiving Trip',
      isCoreSix: false,
      description: language === 'es'
        ? 'Pilar del hogar, expertos en cocina tradicional, calidez familiar y anécdotas de la región.'
        : 'Heart of the household, master chefs of traditional recipes, warm smiles, and local storytelling.',
      favorite: language === 'es' ? 'Cocina casera & Chiquimula' : 'Home-cooked feasts & Chiquimula'
    },
    {
      name: 'Isabel',
      role: language === 'es' ? 'Mamá & Abuela Querida' : 'Beloved Mother & Grandmother',
      ageBadge: language === 'es' ? '70s • Sabiduría' : '70s • Wisdom & Grace',
      avatar: '🌸',
      bgGradient: 'from-purple-500 to-violet-600',
      tripParticipation: language === 'es' ? '🦃 Viaje de Thanksgiving' : '🦃 Thanksgiving Trip',
      isCoreSix: false,
      description: language === 'es'
        ? 'Presencia dulce y llena de paz, disfrutando cada comida, paisaje y momento junto a sus hijos y nietas.'
        : 'Sweet, peaceful presence, savoring every garden, lake panorama, and precious moment with children and grandchildren.',
      favorite: language === 'es' ? 'Termales de Santa Teresa & Ruta de las Flores' : 'Santa Teresa Hot Springs & Ruta de las Flores'
    },
    {
      name: 'Nely',
      role: language === 'es' ? 'Cuñada & Compañera de Ruta' : 'Sister-in-Law & Travel Buddy',
      ageBadge: language === 'es' ? 'Alegre y Atenta' : 'Cheerful & Helpful',
      avatar: '✨',
      bgGradient: 'from-cyan-500 to-blue-600',
      tripParticipation: language === 'es' ? '🦃 Viaje de Thanksgiving' : '🦃 Thanksgiving Trip',
      isCoreSix: false,
      description: language === 'es'
        ? 'Siempre lista para colaborar con las niñas, apoyar en la logística y disfrutar los paseos en familia.'
        : 'Always ready to lend a loving hand with the girls, support trip logistics, and share laughs along the way.',
      favorite: language === 'es' ? 'Playas & Fotografía' : 'Beaches & Photography'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 md:pb-12">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          {language === 'es' ? 'Nuestro Grupo' : 'Our Travel Crew'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          {t.travelersTitle}
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {t.travelersSub}
        </p>
      </div>

      {/* Guest of honor welcome banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 flex items-start gap-4">
        <div className="text-3xl shrink-0 p-2 rounded-2xl bg-white shadow-sm">
          🤝
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-extrabold text-slate-900">
            {language === 'es' ? '¡Unión de Familias y Culturas!' : 'Uniting Family & Lifelong Friendship!'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.bruceNormaNote}
          </p>
        </div>
      </div>

      {/* Trip Crew Breakdown Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-200/90 text-xs">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 space-y-1">
          <span className="font-extrabold text-emerald-700 block text-sm">
            🦃 {language === 'es' ? 'Viaje de Thanksgiving (25 - 30 Nov)' : 'Thanksgiving Getaway (Nov 25 - 30)'}
          </span>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            {language === 'es'
              ? 'Viajamos los 10 integrantes: Bruce, Norma, Ever, Cori, Isabella, Emily, Jonchito, Lidia, Doña Isabel y Nely.'
              : 'All 10 members travel together: Bruce, Norma, Ever, Cori, Isabella, Emily, Jonchito, Lidia, Isabel & Nely.'}
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 space-y-1">
          <span className="font-extrabold text-indigo-700 block text-sm">
            ⛰️ {language === 'es' ? 'Escapada de Diciembre (3 - 7 Dic)' : 'December Getaway (Dec 3 - 7)'}
          </span>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            {language === 'es'
              ? 'Viajan únicamente 6 personas: Bruce, Norma, Ever, Cori, Isabella y la bebé Emily.'
              : 'Core crew of 6 only: Bruce, Norma, Ever, Cori, Isabella, and baby Emily.'}
          </p>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((m, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner">
                  {m.avatar}
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {m.ageBadge}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-lg font-extrabold text-slate-900">{m.name}</h3>
                <span className="text-xs font-bold text-emerald-600">{m.role}</span>
              </div>

              <div className="mt-2.5">
                <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-xl border ${
                  m.isCoreSix
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                    : 'bg-amber-50 text-amber-900 border-amber-200/80'
                }`}>
                  {m.tripParticipation}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                {m.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">{language === 'es' ? 'Favorito:' : 'Highlight:'}</span>
              <span className="font-bold text-slate-800">{m.favorite}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Safety & Tourist Support Numbers */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider">
            {language === 'es' ? 'Asistencia y Números Clave en Guatemala' : 'Assistance & Key Numbers in Guatemala'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 block font-medium">Asistencia al Turista (INGUAT)</span>
            <span className="text-base font-extrabold text-emerald-400">📞 1500</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Atención 24/7 en inglés y español</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 block font-medium">Policía Nacional Civil (PNC)</span>
            <span className="text-base font-extrabold text-sky-400">📞 110</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Seguridad y emergencias de tránsito</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 block font-medium">Bomberos Voluntarios (Ambulancia)</span>
            <span className="text-base font-extrabold text-rose-400">📞 122</span>
            <p className="text-[10px] text-slate-400 mt-0.5">Primeros auxilios y emergencias médicas</p>
          </div>
        </div>
      </div>

    </div>
  );
};
