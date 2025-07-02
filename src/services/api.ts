import axios, { AxiosResponse, AxiosError } from 'axios';

// Types
export interface User {
  id: number;
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
  id: number;
  userId: number;
  notificationsEvents: boolean;
  notificationsNewEvents: boolean;
  notificationsSocial: boolean;
  notificationsSecurityAlerts: boolean;
  notificationsNewsletter: boolean;
  theme: 'auto' | 'light' | 'dark';
  language: string;
  fontSize: number;
  hapticFeedback: boolean;
  autoRefresh: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  eventDate: string;
  endDate?: string;
  location?: string;
  virtualLink?: string;
  isVirtual: boolean;
  isHybrid: boolean;
  maxAttendees?: number;
  registrationDeadline?: string;
  categoryId?: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  speakerName?: string;
  speakerTitle?: string;
  speakerBio?: string;
  speakerImageUrl?: string;
  eventImageUrl?: string;
  topics: string[];
  prerequisites?: string;
  materialsUrl?: string;
  recordingUrl?: string;
  slidesUrl?: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category?: EventCategory;
  attendeeCount: number;
  userRsvpStatus?: 'attending' | 'maybe' | 'not_attending';
  userAttended?: boolean;
}

export interface EventCategory {
  id: number;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  resourceType: 'course' | 'tool' | 'document' | 'video' | 'website' | 'book';
  categoryId?: number;
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
  id: number;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

export interface SocialPost {
  id: number;
  userId: number;
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
    id: number;
    firstName: string;
    lastName: string;
    displayName?: string;
    profileImageUrl?: string;
  };
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  actionUrl?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Configure axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
let authToken: string | null = localStorage.getItem('authToken');

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  }
};

// Initialize token if it exists
if (authToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      setAuthToken(null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    company?: string;
    jobTitle?: string;
  }) => {
    const response = await api.post<{ user: User; token: string; message: string }>('/auth/register', userData);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post<{ user: User; token: string; message: string }>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get<{ user: User }>('/auth/me');
    return response.data.user;
  },

  updateProfile: async (profileData: Partial<User>) => {
    const response = await api.put<{ user: User; message: string }>('/auth/profile', profileData);
    return response.data;
  },

  updatePreferences: async (preferences: Partial<UserPreferences>) => {
    const response = await api.put<{ preferences: UserPreferences; message: string }>('/auth/preferences', preferences);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

// Events API
export const eventsApi = {
  getEvents: async (params?: {
    page?: number;
    limit?: number;
    category?: number;
    difficulty?: string;
    upcoming?: boolean;
    featured?: boolean;
    search?: string;
  }) => {
    const response = await api.get<{ events: Event[]; pagination: any }>('/events', { params });
    return response.data;
  },

  getEvent: async (id: number) => {
    const response = await api.get<{ event: Event }>(`/events/${id}`);
    return response.data.event;
  },

  rsvpToEvent: async (eventId: number, status: 'attending' | 'maybe' | 'not_attending' = 'attending') => {
    const response = await api.post<{ message: string; rsvp: any }>(`/events/${eventId}/rsvp`, { status });
    return response.data;
  },

  cancelRsvp: async (eventId: number) => {
    const response = await api.delete<{ message: string }>(`/events/${eventId}/rsvp`);
    return response.data;
  },

  submitFeedback: async (eventId: number, rating: number, comment?: string) => {
    const response = await api.post<{ message: string; feedback: any }>(`/events/${eventId}/feedback`, {
      rating,
      comment,
    });
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get<{ categories: EventCategory[] }>('/events/categories');
    return response.data.categories;
  },
};

// Resources API
export const resourcesApi = {
  getResources: async (params?: {
    page?: number;
    limit?: number;
    category?: number;
    type?: string;
    difficulty?: string;
    free?: boolean;
    featured?: boolean;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const response = await api.get<{ resources: Resource[]; pagination: any }>('/resources', { params });
    return response.data;
  },

  getResource: async (id: number) => {
    const response = await api.get<{ resource: Resource }>(`/resources/${id}`);
    return response.data.resource;
  },

  bookmarkResource: async (resourceId: number) => {
    const response = await api.post<{ message: string; bookmark: any }>(`/resources/${resourceId}/bookmark`);
    return response.data;
  },

  removeBookmark: async (resourceId: number) => {
    const response = await api.delete<{ message: string }>(`/resources/${resourceId}/bookmark`);
    return response.data;
  },

  rateResource: async (resourceId: number, rating: number, review?: string) => {
    const response = await api.post<{ message: string; rating: any }>(`/resources/${resourceId}/rate`, {
      rating,
      review,
    });
    return response.data;
  },

  getBookmarks: async (params?: { page?: number; limit?: number }) => {
    const response = await api.get<{ resources: Resource[]; pagination: any }>('/resources/my-bookmarks', { params });
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get<{ categories: ResourceCategory[] }>('/resources/categories');
    return response.data.categories;
  },

  submitResource: async (resourceData: {
    title: string;
    description: string;
    resourceType: string;
    categoryId?: number;
    url: string;
    difficultyLevel?: string;
    isFree?: boolean;
    price?: number;
    author?: string;
    publisher?: string;
    durationMinutes?: number;
    pageCount?: number;
    tags?: string[];
    imageUrl?: string;
  }) => {
    const response = await api.post<{ message: string; resource: Resource }>('/resources', resourceData);
    return response.data;
  },
};

// Social API
export const socialApi = {
  getPosts: async (params?: {
    page?: number;
    limit?: number;
    platform?: string;
    featured?: boolean;
  }) => {
    const response = await api.get<{ posts: SocialPost[]; pagination: any }>('/social/posts', { params });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get<{ stats: any }>('/social/stats');
    return response.data.stats;
  },

  followUser: async (userId: number) => {
    const response = await api.post<{ message: string; follow: any }>(`/social/follow/${userId}`);
    return response.data;
  },

  unfollowUser: async (userId: number) => {
    const response = await api.delete<{ message: string }>(`/social/follow/${userId}`);
    return response.data;
  },

  getFollowing: async () => {
    const response = await api.get<{ following: User[] }>('/social/following');
    return response.data.following;
  },

  getFollowers: async () => {
    const response = await api.get<{ followers: User[] }>('/social/followers');
    return response.data.followers;
  },
};

// Notifications API
export const notificationsApi = {
  getNotifications: async (params?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
  }) => {
    const response = await api.get<{ notifications: Notification[]; unreadCount: number; pagination: any }>('/notifications', { params });
    return response.data;
  },

  markAsRead: async (notificationId: number) => {
    const response = await api.put<{ message: string; notification: Notification }>(`/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put<{ message: string }>('/notifications/read-all');
    return response.data;
  },

  deleteNotification: async (notificationId: number) => {
    const response = await api.delete<{ message: string }>(`/notifications/${notificationId}`);
    return response.data;
  },
};

// Users API
export const usersApi = {
  getUser: async (userId: number) => {
    const response = await api.get<{ user: User }>(`/users/${userId}`);
    return response.data.user;
  },

  getUserEvents: async (params?: {
    status?: string;
    upcoming?: boolean;
  }) => {
    const response = await api.get<{ events: Event[] }>('/users/me/events', { params });
    return response.data.events;
  },

  getDashboard: async () => {
    const response = await api.get<{ dashboard: any }>('/users/me/dashboard');
    return response.data.dashboard;
  },
};

export default api;