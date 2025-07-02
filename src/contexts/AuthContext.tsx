import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  company?: string;
  jobTitle?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  language: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  company?: string;
  jobTitle?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser({ ...userData, uid: firebaseUser.uid, email: firebaseUser.email! });
          } else {
            // Create default user document if it doesn't exist
            const defaultUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              firstName: '',
              lastName: '',
              preferences: {
                notifications: true,
                darkMode: false,
                language: 'en'
              }
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), defaultUser);
            setUser(defaultUser);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      
      // Create user document in Firestore
      const newUser: User = {
        uid: userCredential.user.uid,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        displayName: userData.displayName,
        company: userData.company,
        jobTitle: userData.jobTitle,
        preferences: {
          notifications: true,
          darkMode: false,
          language: 'en'
        }
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      
      // Update Firebase Auth profile
      if (userData.displayName) {
        await updateFirebaseProfile(userCredential.user, {
          displayName: userData.displayName
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    await updateDoc(doc(db, 'users', user.uid), profileData);
    setUser({ ...user, ...profileData });
    
    // Update Firebase Auth profile if displayName is being updated
    if (profileData.displayName && auth.currentUser) {
      await updateFirebaseProfile(auth.currentUser, {
        displayName: profileData.displayName
      });
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedPreferences = { ...user.preferences, ...preferences };
    await updateDoc(doc(db, 'users', user.uid), { preferences: updatedPreferences });
    setUser({ ...user, preferences: updatedPreferences });
  };

  const refreshUser = async () => {
    if (!auth.currentUser) throw new Error('No user logged in');
    
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        setUser({ ...userData, uid: auth.currentUser.uid, email: auth.currentUser.email! });
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;