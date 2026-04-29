import type { Timestamp } from 'firebase/firestore';

export interface EventData {
  id?: string;
  title: string;
  tag: string;
  date: string;
  month: string;
  time: string;
  location: string;
  description?: string;
  img?: string;
  createdAt?: Timestamp | Date; // Firestore Timestamp
  isStatic?: boolean;
}

export interface ProgramData {
  id?: string;
  tag: string;
  name: string;
  desc: string;
  icon: string;
  before: string;
  after: string;
  afterPos?: string;
  isSlider: boolean;
  createdAt?: Timestamp | Date;
}

export interface RegistrationData {
  id?: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  participants: number;
  note?: string;
  createdAt?: Timestamp | Date;
}

export interface VolunteerData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Timestamp | Date;
}
