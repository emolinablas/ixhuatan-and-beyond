import { Ballot, TripOption, VotePhase } from '../types/trip';
import { travelerById } from '../data/travelers';

// Votes travel between phones inside a link, so the app needs no server:
//   #votos?v=bruce.t1.da,norma.t2
// Each entry is `travelerId.optionCode[.optionCode]`. Whoever opens the link
// merges those ballots into their own phone's tally.

export const VOTE_HASH_PREFIX = '#votos?v=';

export const encodeBallots = (ballots: Record<string, Ballot>, options: TripOption[]): string => {
  const codeOf = (id?: string) => options.find(o => o.id === id)?.code;
  return Object.entries(ballots)
    .map(([travelerId, ballot]) => {
      const codes = [codeOf(ballot.thanksgiving), codeOf(ballot.december)].filter(Boolean);
      return codes.length ? [travelerId, ...codes].join('.') : null;
    })
    .filter(Boolean)
    .join(',');
};

export const decodeBallots = (encoded: string, options: TripOption[]): Record<string, Ballot> => {
  const result: Record<string, Ballot> = {};
  for (const entry of encoded.split(',')) {
    const [travelerId, ...codes] = entry.split('.');
    const traveler = travelerById(travelerId);
    if (!traveler || !traveler.canVote) continue;
    const ballot: Ballot = {};
    for (const code of codes) {
      const option = options.find(o => o.code === code);
      // Ignore votes for a trip this person isn't on (e.g. December for Lidia).
      if (option && traveler.trips.includes(option.phase)) ballot[option.phase] = option.id;
    }
    if (Object.keys(ballot).length) result[travelerId] = ballot;
  }
  return result;
};

export const ballotsFromHash = (hash: string, options: TripOption[]): Record<string, Ballot> | null => {
  if (!hash.startsWith(VOTE_HASH_PREFIX)) return null;
  const decoded = decodeBallots(decodeURIComponent(hash.slice(VOTE_HASH_PREFIX.length)), options);
  return Object.keys(decoded).length ? decoded : null;
};

export const voteLink = (ballots: Record<string, Ballot>, options: TripOption[]): string =>
  `${window.location.origin}${window.location.pathname}${VOTE_HASH_PREFIX}${encodeBallots(ballots, options)}`;

export const PHASES: VotePhase[] = ['thanksgiving', 'december'];
