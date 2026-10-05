export type TabType = 'home' | 'events' | 'schedule' | 'passes' | 'portal';

export interface FestEvent {
  id: string;
  title: string;
  category: 'technical' | 'cultural' | 'sports' | 'workshops';
  subCategory?: string;
  isFlagship?: boolean;
  prizePool: string;
  entryFee: string;
  isFreeForJECRC: boolean;
  dateStr: string;
  timeStr: string;
  day: number; // 1, 2, 3, 4
  duration: string;
  venue: string;
  venueCode: string;
  teamSize: string;
  image: string;
  description: string;
  slotsLeft?: number;
  tags: string[];
  rulesSummary?: string;
  eligibility: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  period: 'AM' | 'PM';
  title: string;
  subtitle: string;
  status: 'completed' | 'happening' | 'upcoming' | 'open';
  statusLabel?: string;
  day: number;
  venue: string;
  venueGate?: string;
  audience: string;
  image?: string;
  countdownRemaining?: string;
  liveStats?: string;
  icon: string;
  requiresPass?: boolean;
  tag?: string;
}

export interface UserPass {
  id: string;
  passId: string;
  eventName: string;
  studentName: string;
  rollNumber: string;
  affiliation: 'jecrc' | 'external';
  collegeName?: string;
  department: string;
  academicYear: string;
  email: string;
  phone: string;
  teamType: 'solo' | 'team';
  teamMembers?: string[];
  hostelNeeded: boolean;
  qrData: string;
  verified: boolean;
  purchaseDate: string;
  trackLabel: string;
  venue: string;
}

export interface VenueDetail {
  name: string;
  code: string;
  gate: string;
  landmark: string;
  image: string;
  description: string;
  coords: string;
}
