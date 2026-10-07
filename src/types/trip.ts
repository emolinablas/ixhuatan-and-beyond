export type Language = 'es' | 'en';

export type ClimateType = 'tropical_beach' | 'highland_cool' | 'jungle_hot' | 'temperate';
export type RoadQuality = 'paved_smooth' | 'mixed_curves' | 'rough_4x4';

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
  imageUrl: string;
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

export interface TripOption {
  id: string;
  phase: 'thanksgiving' | 'december';
  title: string;
  titleEn: string;
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
  votes: number;
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
  phase: 'initial_base' | 'thanksgiving' | 'post_thanksgiving_base' | 'december' | 'farewell_base';
  optionId?: string; // If specific to an option
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
  checked: boolean;
  isEssential: boolean;
}

export interface TripDataState {
  tripTitle: string;
  tripTitleEn: string;
  startDate: string;
  endDate: string;
  selectedThanksgivingOptionId: string;
  selectedDecemberOptionId: string;
  destinations: TripDestination[];
  options: TripOption[];
  days: DayPlan[];
  packingItems: PackingItem[];
  userVotes: Record<string, boolean>; // optionId -> boolean
}
