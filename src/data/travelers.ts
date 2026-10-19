import { Traveler, TripPhase } from '../types/trip';

// Single source of truth for who travels on which trip.
export const travelers: Traveler[] = [
  { id: 'ever', name: 'Ever', emoji: '🧭', role: 'Organizador y conductor', roleEn: 'Organizer & driver', trips: ['thanksgiving', 'december'] },
  { id: 'cori', name: 'Cori', emoji: '💐', role: 'Anfitriona y mamá', roleEn: 'Host & mom', trips: ['thanksgiving', 'december'] },
  { id: 'isabella', name: 'Isabella', emoji: '🧒', role: '5 años', roleEn: '5 years old', trips: ['thanksgiving', 'december'] },
  { id: 'emily', name: 'Emily', emoji: '👶', role: '7 meses', roleEn: '7 months', trips: ['thanksgiving', 'december'] },
  { id: 'bruce', name: 'Bruce', emoji: '🇺🇸', role: 'Invitado de EE.UU.', roleEn: 'Visiting from the US', trips: ['thanksgiving', 'december'] },
  { id: 'norma', name: 'Norma', emoji: '🌷', role: 'Invitada de EE.UU.', roleEn: 'Visiting from the US', trips: ['thanksgiving', 'december'] },
  { id: 'jonchito', name: 'Jonchito', emoji: '🚙', role: 'Papá de Ever, conductor', roleEn: 'Ever’s dad, driver', trips: ['thanksgiving'] },
  { id: 'lidia', name: 'Lidia', emoji: '🍲', role: 'Mamá de Ever', roleEn: 'Ever’s mom', trips: ['thanksgiving'] },
  { id: 'isabel', name: 'Doña Isabel', emoji: '🌸', role: 'Abuela · cero gradas', roleEn: 'Grandma · no stairs', trips: ['thanksgiving'] },
  { id: 'nely', name: 'Nely', emoji: '✨', role: 'Familia', roleEn: 'Family', trips: ['thanksgiving'] },
];

export const travelersOn = (phase: TripPhase): Traveler[] =>
  travelers.filter(t => t.trips.includes(phase));
