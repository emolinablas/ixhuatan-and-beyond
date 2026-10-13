import { Traveler, VotePhase } from '../types/trip';

// Single source of truth for who travels on which trip and who votes.
// Emily (7 months) travels but doesn't vote; Isabella (5) gets a vote
// because it's her trip too — flip `canVote` if the family disagrees.
export const travelers: Traveler[] = [
  { id: 'ever', name: 'Ever', emoji: '🧭', role: 'Organizador y conductor', roleEn: 'Organizer & driver', trips: ['thanksgiving', 'december'], canVote: true },
  { id: 'cori', name: 'Cori', emoji: '💐', role: 'Anfitriona y mamá', roleEn: 'Host & mom', trips: ['thanksgiving', 'december'], canVote: true },
  { id: 'isabella', name: 'Isabella', emoji: '🧒', role: '5 años', roleEn: '5 years old', trips: ['thanksgiving', 'december'], canVote: true },
  { id: 'emily', name: 'Emily', emoji: '👶', role: '7 meses', roleEn: '7 months', trips: ['thanksgiving', 'december'], canVote: false },
  { id: 'bruce', name: 'Bruce', emoji: '🇺🇸', role: 'Invitado de EE.UU.', roleEn: 'Visiting from the US', trips: ['thanksgiving', 'december'], canVote: true },
  { id: 'norma', name: 'Norma', emoji: '🌷', role: 'Invitada de EE.UU.', roleEn: 'Visiting from the US', trips: ['thanksgiving', 'december'], canVote: true },
  { id: 'jonchito', name: 'Jonchito', emoji: '🚙', role: 'Papá de Ever, conductor', roleEn: 'Ever’s dad, driver', trips: ['thanksgiving'], canVote: true },
  { id: 'lidia', name: 'Lidia', emoji: '🍲', role: 'Mamá de Ever', roleEn: 'Ever’s mom', trips: ['thanksgiving'], canVote: true },
  { id: 'isabel', name: 'Doña Isabel', emoji: '🌸', role: 'Abuela · cero gradas', roleEn: 'Grandma · no stairs', trips: ['thanksgiving'], canVote: true },
  { id: 'nely', name: 'Nely', emoji: '✨', role: 'Familia', roleEn: 'Family', trips: ['thanksgiving'], canVote: true },
];

export const travelersOn = (phase: VotePhase): Traveler[] =>
  travelers.filter(t => t.trips.includes(phase));

export const votersFor = (phase: VotePhase): Traveler[] =>
  travelersOn(phase).filter(t => t.canVote);

export const travelerById = (id: string): Traveler | undefined =>
  travelers.find(t => t.id === id);
