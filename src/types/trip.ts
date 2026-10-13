export type Language = 'es' | 'en';

export type ClimateType = 'tropical_beach' | 'highland_cool' | 'jungle_hot' | 'temperate';
export type RoadQuality = 'paved_smooth' | 'mixed_curves' | 'rough_4x4';

/** The two trips the family votes on. */
export type VotePhase = 'thanksgiving' | 'december';

export interface PlaceItem {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  category?: 'sight' | 'food' | 'activity' | 'relax';
  googleMapsUrl?: string;
}

export interface IntermediateStop {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  driveTimeBadge?: string;
  category?: 'rest_stop' | 'food' | 'viewpoint' | 'border';
  googleMapsUrl?: string;
}

export interface TripDestination {
  id: string;
  name: string;
  nameEn: string;
  region: string;
  regionEn: string;
  coordinates: [number, number]; // [lng, lat]
  stayDuration: string;
  stayDurationEn: string;
  description: string;
  descriptionEn: string;
  photo?: { url: string; credit: string };
  googleMapsUrl: string;
  wazeUrl?: string;
  lodgingName?: string;
  lodgingUrl?: string;
  climate: ClimateType;
  driveHoursFromIxhuatan: number;
  roadQuality: RoadQuality;
  babyFriendlyScore: number; // 1 to 5
  seniorFriendlyScore: number; // 1 to 5
  highlights: string[];
  highlightsEn: string[];
  placesToVisit?: PlaceItem[];
  intermediateStops?: IntermediateStop[];
}

/**
 * Comparable numbers for the "at a glance" matrix. Kept separate from the
 * prose so the comparison can't drift from the itinerary it summarizes.
 */
export interface OptionMetrics {
  totalDriveHours: number; // whole trip, door to door
  longestLegHours: number; // longest single drive day
  lodgings: number; // distinct hotels = times everyone packs up
  passportsRequired: boolean;
  babyScore: number; // 1 (hard) to 5 (easy)
  seniorScore: number; // 1 (hard) to 5 (easy)
  climate: string;
  climateEn: string;
  nearestHospital: string;
  nearestHospitalEn: string;
}

export interface CostLine {
  id: string;
  label: string;
  labelEn: string;
  quantity: number;
  unitUsd: number;
  note?: string;
  noteEn?: string;
}

export interface TripOption {
  id: string;
  /** Short code used in WhatsApp vote links (keeps URLs tiny). */
  code: string;
  phase: VotePhase;
  title: string;
  titleEn: string;
  shortTitle: string;
  shortTitleEn: string;
  color: string;
  tagline: string;
  taglineEn: string;
  dateRange: string;
  dateRangeEn: string;
  durationDays: number;
  destinations: string[]; // destination IDs
  isRecommendedForFamily?: boolean;
  crewSummary?: string;
  crewSummaryEn?: string;
  pros: string[];
  prosEn: string[];
  considerations: string[];
  considerationsEn: string[];
  driveSummary: string;
  driveSummaryEn: string;
  babyNotes: string;
  babyNotesEn: string;
  seniorNotes: string;
  seniorNotesEn: string;
  metrics: OptionMetrics;
  costs: CostLine[];
}

export type ActivityTag = 'logistics' | 'beach' | 'relaxation' | 'adventure' | 'thanksgiving' | 'food' | 'family';

export interface ActivityBlock {
  id: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  timeLabel?: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  locationName?: string;
  googleMapsUrl?: string;
  tag?: ActivityTag;
}

export type DayPhase = 'initial_base' | 'thanksgiving' | 'post_thanksgiving_base' | 'december' | 'farewell_base';

export interface DayPlan {
  id: string;
  dayNumber: number;
  date: string; // "2026-11-15"
  dateFormatted: string; // "Dom, 15 Nov"
  dateFormattedEn: string; // "Sun, Nov 15"
  title: string;
  titleEn: string;
  locationId: string;
  locationName: string;
  lodgingName?: string;
  lodgingUrl?: string;
  isRestDay?: boolean;
  isKeyMilestone?: boolean;
  milestoneBadge?: string;
  milestoneBadgeEn?: string;
  phase: DayPhase;
  optionId?: string; // set on days that only exist for one voting option
  driveHours?: number; // time on the road that day, for the drive-load bar
  activities: ActivityBlock[];
  notes?: string;
  notesEn?: string;
}

export type PackingCategory = 'master' | 'beach' | 'highland' | 'jungle' | 'baby' | 'seniors';

export interface PackingItem {
  id: string;
  category: PackingCategory;
  title: string;
  titleEn: string;
  description?: string;
  descriptionEn?: string;
  isEssential: boolean;
  /** Seed items that were already done when the list was written. */
  initiallyChecked?: boolean;
}

export interface Traveler {
  id: string;
  name: string;
  emoji: string;
  role: string;
  roleEn: string;
  trips: VotePhase[];
  canVote: boolean;
}

/** One person's choice per trip. */
export type Ballot = Partial<Record<VotePhase, string>>;

/**
 * Everything the family changes on a phone. Trip content (days, options,
 * destinations) ships with the code and is never persisted, so content
 * updates reach every phone without cache-busting.
 */
export interface UserState {
  version: 1;
  ballots: Record<string, Ballot>; // travelerId -> ballot
  selectedOptionIds: Record<VotePhase, string>;
  packedIds: string[];
  customPlaces: Record<string, PlaceItem[]>; // destinationId -> places
  customStops: Record<string, IntermediateStop[]>; // destinationId -> stops
  hiddenSeedIds: string[]; // seeded places/stops the family removed
  costOverrides: Record<string, number>; // `${optionId}:${lineId}` -> unit USD
}
