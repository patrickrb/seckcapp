import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  where, 
  increment,
  updateDoc,
  writeBatch,
  serverTimestamp,
  Timestamp,
  FieldValue
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Generate a persistent anonymous user ID
const getAnonymousUserId = (): string => {
  let userId = localStorage.getItem('seckc-anonymous-user-id');
  if (!userId) {
    userId = 'anon_' + Math.random().toString(36).substr(2, 16) + Date.now().toString(36);
    localStorage.setItem('seckc-anonymous-user-id', userId);
  }
  return userId;
};

// RSVP interface
interface RSVP {
  eventId: string;
  userId: string;
  timestamp: Timestamp | FieldValue;
}

// RSVP Service
export const rsvpService = {
  // Get current user's RSVP status for an event
  async getUserRsvpStatus(eventId: string): Promise<boolean> {
    try {
      const userId = getAnonymousUserId();
      const rsvpDoc = await getDoc(doc(db, 'rsvps', `${eventId}_${userId}`));
      return rsvpDoc.exists();
    } catch (error) {
      console.error('Error getting RSVP status:', error);
      return false;
    }
  },

  // Get all user's RSVPs
  async getUserRsvps(): Promise<{ [eventId: string]: boolean }> {
    try {
      const userId = getAnonymousUserId();
      const rsvpsQuery = query(
        collection(db, 'rsvps'),
        where('userId', '==', userId)
      );
      const rsvpsSnapshot = await getDocs(rsvpsQuery);
      
      const userRsvps: { [eventId: string]: boolean } = {};
      rsvpsSnapshot.forEach(doc => {
        const data = doc.data() as RSVP;
        userRsvps[data.eventId] = true;
      });
      
      return userRsvps;
    } catch (error) {
      console.error('Error getting user RSVPs:', error);
      return {};
    }
  },

  // Get RSVP count for an event
  async getEventRsvpCount(eventId: string): Promise<number> {
    try {
      const eventDoc = await getDoc(doc(db, 'events', eventId));
      if (eventDoc.exists()) {
        const data = eventDoc.data();
        return data.rsvpCount || 0;
      }
      return 0;
    } catch (error) {
      console.error('Error getting RSVP count:', error);
      return 0;
    }
  },

  // Get RSVP counts for multiple events
  async getEventRsvpCounts(eventIds: string[]): Promise<{ [eventId: string]: number }> {
    try {
      const counts: { [eventId: string]: number } = {};
      
      // Batch get event documents
      const promises = eventIds.map(async (eventId) => {
        const eventDoc = await getDoc(doc(db, 'events', eventId));
        if (eventDoc.exists()) {
          const data = eventDoc.data();
          counts[eventId] = data.rsvpCount || 0;
        } else {
          counts[eventId] = 0;
        }
      });
      
      await Promise.all(promises);
      return counts;
    } catch (error) {
      console.error('Error getting RSVP counts:', error);
      return {};
    }
  },

  // RSVP to an event
  async rsvpToEvent(eventId: string): Promise<boolean> {
    try {
      const userId = getAnonymousUserId();
      const rsvpId = `${eventId}_${userId}`;
      
      // Check if already RSVP'd
      const existingRsvp = await getDoc(doc(db, 'rsvps', rsvpId));
      if (existingRsvp.exists()) {
        return false; // Already RSVP'd
      }

      const batch = writeBatch(db);
      
      // Add RSVP document
      const rsvpData: RSVP = {
        eventId,
        userId,
        timestamp: serverTimestamp()
      };
      batch.set(doc(db, 'rsvps', rsvpId), rsvpData);
      
      // Increment event RSVP count
      batch.update(doc(db, 'events', eventId), {
        rsvpCount: increment(1)
      });
      
      await batch.commit();
      return true;
    } catch (error) {
      console.error('Error RSVPing to event:', error);
      throw error;
    }
  },

  // Cancel RSVP for an event
  async cancelRsvp(eventId: string): Promise<boolean> {
    try {
      const userId = getAnonymousUserId();
      const rsvpId = `${eventId}_${userId}`;
      
      // Check if RSVP exists
      const existingRsvp = await getDoc(doc(db, 'rsvps', rsvpId));
      if (!existingRsvp.exists()) {
        return false; // No RSVP to cancel
      }

      const batch = writeBatch(db);
      
      // Remove RSVP document
      batch.delete(doc(db, 'rsvps', rsvpId));
      
      // Decrement event RSVP count (don't go below 0)
      const eventDoc = await getDoc(doc(db, 'events', eventId));
      if (eventDoc.exists()) {
        const currentCount = eventDoc.data().rsvpCount || 0;
        if (currentCount > 0) {
          batch.update(doc(db, 'events', eventId), {
            rsvpCount: increment(-1)
          });
        }
      }
      
      await batch.commit();
      return true;
    } catch (error) {
      console.error('Error canceling RSVP:', error);
      throw error;
    }
  },

  // Toggle RSVP status
  async toggleRsvp(eventId: string): Promise<{ isRsvped: boolean; newCount: number }> {
    try {
      const userId = getAnonymousUserId();
      const rsvpId = `${eventId}_${userId}`;
      
      // Check current status
      const existingRsvp = await getDoc(doc(db, 'rsvps', rsvpId));
      const isCurrentlyRsvped = existingRsvp.exists();
      
      if (isCurrentlyRsvped) {
        await this.cancelRsvp(eventId);
      } else {
        await this.rsvpToEvent(eventId);
      }
      
      // Get updated count
      const newCount = await this.getEventRsvpCount(eventId);
      
      return {
        isRsvped: !isCurrentlyRsvped,
        newCount
      };
    } catch (error) {
      console.error('Error toggling RSVP:', error);
      throw error;
    }
  }
};