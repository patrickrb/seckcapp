// Shared types for Firebase services
export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
  linkedinUrl?: string;
  twitterHandle?: string;
  githubUsername?: string;
  profileImageUrl?: string;
  isActive: boolean;
  isAdmin: boolean;
  emailVerified: boolean;
  createdAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications?: boolean;
  darkMode?: boolean;
  language?: string;
  notificationsEvents?: boolean;
  notificationsNewEvents?: boolean;
  notificationsSocial?: boolean;
  notificationsSecurityAlerts?: boolean;
  notificationsNewsletter?: boolean;
  theme?: 'auto' | 'light' | 'dark';
  fontSize?: number;
  hapticFeedback?: boolean;
  autoRefresh?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  eventDate: string;
  endDate?: string;
  location?: string;
  address?: string;
  virtualLink?: string;
  isVirtual: boolean;
  isHybrid: boolean;
  maxAttendees?: number;
  registrationDeadline?: string;
  categoryId?: string;
  sponsorLinks?: { [key: string]: string };
  sponsorOrder?: string[];
  speakerName?: string;
  speakerNames?: string[];
  speakerTitle?: string;
  speakerBio?: string;
  speakerImageUrl?: string;
  eventImageUrl?: string;
  topics: string[];
  prerequisites?: string;
  materialsUrl?: string;
  recordingUrl?: string;
  slidesUrl?: string;
  eventUrl?: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category?: EventCategory;
  rsvpCount: number;
  userRsvpStatus?: 'attending' | 'maybe' | 'not_attending';
  userAttended?: boolean;
  isBookmarked?: boolean;
}

export interface EventCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  resourceType: 'course' | 'tool' | 'document' | 'video' | 'website' | 'book';
  categoryId?: string;
  url: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  isFree: boolean;
  price?: number;
  currency: string;
  author?: string;
  publisher?: string;
  durationMinutes?: number;
  pageCount?: number;
  rating?: number;
  ratingCount: number;
  tags: string[];
  imageUrl?: string;
  isFeatured: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  category?: ResourceCategory;
  isBookmarked?: boolean;
  userRating?: { rating: number; review?: string };
}

export interface ResourceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

export interface SocialPost {
  id: string;
  userId: string;
  platform: string;
  platformPostId?: string;
  content: string;
  postUrl?: string;
  likesCount: number;
  repliesCount: number;
  isFeatured: boolean;
  postedAt: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    profileImageUrl?: string;
  };
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  actionUrl?: string;
  expiresAt?: string;
  createdAt: string;
}