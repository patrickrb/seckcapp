import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Site statistics interface
interface SiteStats {
  totalEvents: number;
  totalMembers: number;
  yearsActive: number;
  lastUpdated: any; // Firestore Timestamp
}

const STATS_DOC_ID = 'site-statistics';

export const statsService = {
  // Get current site statistics
  async getSiteStats(): Promise<SiteStats> {
    try {
      const statsDoc = await getDoc(doc(db, 'statistics', STATS_DOC_ID));
      
      if (statsDoc.exists()) {
        return statsDoc.data() as SiteStats;
      } else {
        // Return default stats if document doesn't exist
        return {
          totalEvents: 126,
          totalMembers: 500,
          yearsActive: 12,
          lastUpdated: serverTimestamp()
        };
      }
    } catch (error) {
      console.error('Error getting site stats:', error);
      // Return fallback stats
      return {
        totalEvents: 126,
        totalMembers: 500,
        yearsActive: 12,
        lastUpdated: serverTimestamp()
      };
    }
  },

  // Initialize site statistics (if they don't exist)
  async initializeSiteStats(): Promise<void> {
    try {
      const statsDoc = await getDoc(doc(db, 'statistics', STATS_DOC_ID));
      
      if (!statsDoc.exists()) {
        const initialStats: SiteStats = {
          totalEvents: 126,
          totalMembers: 500,
          yearsActive: 12,
          lastUpdated: serverTimestamp()
        };
        
        await setDoc(doc(db, 'statistics', STATS_DOC_ID), initialStats);
        console.log('Site statistics initialized');
      }
    } catch (error) {
      console.error('Error initializing site stats:', error);
      throw error;
    }
  },

  // Increment event count (call this when an event is completed)
  async incrementEventCount(): Promise<number> {
    try {
      const currentStats = await this.getSiteStats();
      const newEventCount = currentStats.totalEvents + 1;
      
      await updateDoc(doc(db, 'statistics', STATS_DOC_ID), {
        totalEvents: newEventCount,
        lastUpdated: serverTimestamp()
      });
      
      return newEventCount;
    } catch (error) {
      console.error('Error incrementing event count:', error);
      throw error;
    }
  },

  // Update member count
  async updateMemberCount(count: number): Promise<void> {
    try {
      await updateDoc(doc(db, 'statistics', STATS_DOC_ID), {
        totalMembers: count,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating member count:', error);
      throw error;
    }
  },

  // Update years active
  async updateYearsActive(years: number): Promise<void> {
    try {
      await updateDoc(doc(db, 'statistics', STATS_DOC_ID), {
        yearsActive: years,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating years active:', error);
      throw error;
    }
  },

  // Update all statistics at once
  async updateAllStats(stats: Partial<Omit<SiteStats, 'lastUpdated'>>): Promise<void> {
    try {
      await updateDoc(doc(db, 'statistics', STATS_DOC_ID), {
        ...stats,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating all stats:', error);
      throw error;
    }
  }
};