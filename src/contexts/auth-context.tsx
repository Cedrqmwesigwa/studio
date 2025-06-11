
'use client';

import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '@/firebase/client';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin?: boolean; // For future admin features
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Critical check: If Firebase services aren't available, don't proceed.
    if (!auth || !db) {
      console.error("AuthContext: Firebase Auth or Firestore service is not available. Authentication and user profile operations will not work.");
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return () => {}; // Return an empty unsubscribe function
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        let userProfileData: UserProfile;

        if (userSnap.exists()) {
          userProfileData = userSnap.data() as UserProfile;
        } else {
          // Create a new user profile in Firestore
          userProfileData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isAdmin: false, // Default to not admin
          };
          // Re-check db before setDoc, though it should be available if auth was.
          if (db) {
            await setDoc(userRef, userProfileData);
          } else {
             // This case should ideally be caught by the initial check.
            console.error("AuthContext: Firestore service (db) became unavailable during user profile creation.");
            setUser(null);
            setIsAdmin(false);
            setLoading(false);
            return;
          }
        }
        
        setUser(userProfileData);
        setIsAdmin(!!userProfileData.isAdmin);

      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // auth and db are from module scope, their references are stable if initialized.

  // This loading state is specifically for the AuthProvider's initial setup.
  // It also handles the case where Firebase services were detected as unavailable at the start.
  if (loading && (typeof window !== 'undefined' && (!auth || !db) && !user )) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-destructive mb-4" />
        <p className="text-lg font-semibold text-destructive">Firebase Services Unavailable</p>
        <p className="text-muted-foreground">The application cannot connect to essential Firebase services needed for authentication and data. Please check your Firebase configuration and console for errors.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

