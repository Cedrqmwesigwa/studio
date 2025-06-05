
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
    if (!auth || !db) {
      console.error("Firebase Auth or Firestore service is not available. Authentication and user profile operations will not work.");
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return () => {}; // Return an empty unsubscribe function if services are not available
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Ensure db is checked here again if it might become unavailable, though module import usually means it's stable if initially available.
        // For safety, we can assume if auth is available, db should be too from the firebase/client.ts logic.
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
          // Ensure db is available before setDoc
          if (db) {
            await setDoc(userRef, userProfileData);
          } else {
            console.error("Firestore service (db) is not available. Cannot create user profile.");
            // Handle this case: maybe sign out the user or show an error
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
  }, []); // auth and db are from module scope, their references are stable.

  if (loading && !user && (typeof window !== 'undefined' && (!auth || !db))) {
    // If still loading AND services are not available, show a specific message or simplified loader.
    // This state indicates a fundamental issue with Firebase setup.
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-destructive mb-4" />
        <p className="text-lg font-semibold text-destructive">Firebase Services Unavailable</p>
        <p className="text-muted-foreground">The application cannot connect to essential services. Please check console for errors.</p>
      </div>
    )
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
