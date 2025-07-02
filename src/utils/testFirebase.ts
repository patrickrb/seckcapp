import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test writing a simple document
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Hello Firebase!',
      timestamp: new Date()
    });
    
    console.log('✅ Successfully wrote test document with ID:', testDoc.id);
    
    // Test reading documents
    const snapshot = await getDocs(collection(db, 'test'));
    console.log('✅ Successfully read documents. Count:', snapshot.size);
    
    snapshot.forEach(doc => {
      console.log('Document data:', doc.data());
    });
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
};

// Make it available globally
(window as any).testFirebaseConnection = testFirebaseConnection;