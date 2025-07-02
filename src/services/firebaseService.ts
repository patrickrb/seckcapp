import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Event, Resource, SocialPost, Notification, EventCategory, ResourceCategory } from './types';

// Helper function to convert Firestore timestamps to ISO strings and fix array fields
const convertTimestamps = (data: any): any => {
  if (data && typeof data === 'object') {
    const converted = { ...data };
    
    // Convert timestamps
    for (const key in converted) {
      if (converted[key] instanceof Timestamp) {
        converted[key] = converted[key].toDate().toISOString();
      } else if (converted[key] && typeof converted[key] === 'object') {
        converted[key] = convertTimestamps(converted[key]);
      }
    }
    
    // Convert object-based arrays to proper arrays for specific fields
    if (converted.speakerNames && typeof converted.speakerNames === 'object' && !Array.isArray(converted.speakerNames)) {
      converted.speakerNames = Object.values(converted.speakerNames);
    }
    
    if (converted.topics && typeof converted.topics === 'object' && !Array.isArray(converted.topics)) {
      converted.topics = Object.values(converted.topics);
    }
    
    if (converted.sponsorOrder && typeof converted.sponsorOrder === 'object' && !Array.isArray(converted.sponsorOrder)) {
      converted.sponsorOrder = Object.values(converted.sponsorOrder);
    }
    
    
    return converted;
  }
  return data;
};

// Events Service
export const eventsService = {
  async getEvents(filters?: {
    category?: string;
    difficulty?: string;
    upcoming?: boolean;
    featured?: boolean;
    search?: string;
    limit?: number;
  }): Promise<Event[]> {
    let q = query(collection(db, 'events'));
    
    if (filters?.category) {
      q = query(q, where('categoryId', '==', filters.category));
    }
    
    if (filters?.difficulty) {
      q = query(q, where('difficultyLevel', '==', filters.difficulty));
    }
    
    if (filters?.featured) {
      q = query(q, where('isFeatured', '==', true));
    }
    
    if (filters?.upcoming) {
      q = query(q, where('eventDate', '>', new Date().toISOString()));
    }
    
    q = query(q, orderBy('eventDate', 'desc'));
    
    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    } as Event));
  },

  async getEvent(id: string): Promise<Event | null> {
    const docRef = doc(db, 'events', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data())
      } as Event;
    }
    return null;
  },

  async createEvent(eventData: Omit<Event, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async updateEvent(id: string, eventData: Partial<Event>): Promise<void> {
    const docRef = doc(db, 'events', id);
    await updateDoc(docRef, {
      ...eventData,
      updatedAt: Timestamp.now()
    });
  },

  async deleteEvent(id: string): Promise<void> {
    const docRef = doc(db, 'events', id);
    await deleteDoc(docRef);
  },

  async rsvpToEvent(eventId: string, userId: string, status: 'attending' | 'maybe' | 'not_attending'): Promise<void> {
    const rsvpData = {
      eventId,
      userId,
      status,
      createdAt: Timestamp.now()
    };
    
    // Check if RSVP already exists
    const rsvpQuery = query(
      collection(db, 'rsvps'),
      where('eventId', '==', eventId),
      where('userId', '==', userId)
    );
    
    const existingRsvp = await getDocs(rsvpQuery);
    
    if (existingRsvp.empty) {
      await addDoc(collection(db, 'rsvps'), rsvpData);
    } else {
      const rsvpDoc = existingRsvp.docs[0];
      await updateDoc(doc(db, 'rsvps', rsvpDoc.id), {
        status,
        updatedAt: Timestamp.now()
      });
    }
  }
};

// Resources Service
export const resourcesService = {
  async getResources(filters?: {
    category?: string;
    type?: string;
    difficulty?: string;
    free?: boolean;
    featured?: boolean;
    search?: string;
    limit?: number;
  }): Promise<Resource[]> {
    let q = query(collection(db, 'resources'));
    
    if (filters?.category) {
      q = query(q, where('categoryId', '==', filters.category));
    }
    
    if (filters?.type) {
      q = query(q, where('resourceType', '==', filters.type));
    }
    
    if (filters?.difficulty) {
      q = query(q, where('difficultyLevel', '==', filters.difficulty));
    }
    
    if (filters?.free !== undefined) {
      q = query(q, where('isFree', '==', filters.free));
    }
    
    if (filters?.featured) {
      q = query(q, where('isFeatured', '==', true));
    }
    
    q = query(q, orderBy('createdAt', 'desc'));
    
    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    } as Resource));
  },

  async getResource(id: string): Promise<Resource | null> {
    const docRef = doc(db, 'resources', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data())
      } as Resource;
    }
    return null;
  },

  async createResource(resourceData: Omit<Resource, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'resources'), {
      ...resourceData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async bookmarkResource(resourceId: string, userId: string): Promise<void> {
    const bookmarkData = {
      resourceId,
      userId,
      createdAt: Timestamp.now()
    };
    
    await addDoc(collection(db, 'bookmarks'), bookmarkData);
  },

  async removeBookmark(resourceId: string, userId: string): Promise<void> {
    const bookmarkQuery = query(
      collection(db, 'bookmarks'),
      where('resourceId', '==', resourceId),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(bookmarkQuery);
    snapshot.docs.forEach(doc => deleteDoc(doc.ref));
  },

  async getUserBookmarks(userId: string): Promise<Resource[]> {
    const bookmarkQuery = query(
      collection(db, 'bookmarks'),
      where('userId', '==', userId)
    );
    
    const bookmarkSnapshot = await getDocs(bookmarkQuery);
    const resourceIds = bookmarkSnapshot.docs.map(doc => doc.data().resourceId);
    
    if (resourceIds.length === 0) return [];
    
    // Get resources for these IDs
    const resources: Resource[] = [];
    for (const resourceId of resourceIds) {
      const resource = await this.getResource(resourceId);
      if (resource) {
        resources.push(resource);
      }
    }
    
    return resources;
  }
};

// Social Service
export const socialService = {
  async getPosts(filters?: {
    platform?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<SocialPost[]> {
    let q = query(collection(db, 'socialPosts'));
    
    if (filters?.platform) {
      q = query(q, where('platform', '==', filters.platform));
    }
    
    if (filters?.featured) {
      q = query(q, where('isFeatured', '==', true));
    }
    
    q = query(q, orderBy('postedAt', 'desc'));
    
    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    } as SocialPost));
  },

  async createPost(postData: Omit<SocialPost, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'socialPosts'), {
      ...postData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  }
};

// Notifications Service
export const notificationsService = {
  async getUserNotifications(userId: string, unreadOnly = false): Promise<Notification[]> {
    let q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId)
    );
    
    if (unreadOnly) {
      q = query(q, where('isRead', '==', false));
    }
    
    q = query(q, orderBy('createdAt', 'desc'));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    } as Notification));
  },

  async markAsRead(notificationId: string): Promise<void> {
    const docRef = doc(db, 'notifications', notificationId);
    await updateDoc(docRef, { isRead: true });
  },

  async markAllAsRead(userId: string): Promise<void> {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('isRead', '==', false)
    );
    
    const snapshot = await getDocs(q);
    const batch = snapshot.docs.map(doc => 
      updateDoc(doc.ref, { isRead: true })
    );
    
    await Promise.all(batch);
  },

  async createNotification(notificationData: Omit<Notification, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'notifications'), {
      ...notificationData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  }
};