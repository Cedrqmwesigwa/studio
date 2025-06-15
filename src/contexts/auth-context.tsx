
'use client';

import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '@/firebase/client';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Added serverTimestamp
import { Loader2 } from 'lucide-react';
import type { UserProfile } from '@/types'; // Ensure UserProfile is imported

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  // Function to allow components to update user profile in context after Firestore changes
  updateUserInContext: (updatedProfileData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  updateUserInContext: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateUserInContext = (updatedProfileData: Partial<UserProfile>) => {
    setUser(prevUser => {
      if (prevUser) {
        const newUser = { ...prevUser, ...updatedProfileData };
        if (updatedProfileData.isAdmin !== undefined) {
          setIsAdmin(updatedProfileData.isAdmin);
        }
        return newUser;
      }
      return null;
    });
  };

  useEffect(() => {
    if (!auth || !db) {
      console.error("AuthContext: Firebase Auth or Firestore service is not available.");
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        let userProfileData: UserProfile;

        if (userSnap.exists()) {
          const dataFromDb = userSnap.data();
          userProfileData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: dataFromDb.displayName || firebaseUser.displayName,
            photoURL: dataFromDb.photoURL || firebaseUser.photoURL,
            isAdmin: !!dataFromDb.isAdmin,
            coins: dataFromDb.coins || 0,
            engagementScore: dataFromDb.engagementScore || 0,
          };
        } else {
          userProfileData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isAdmin: false,
            coins: 0, 
            engagementScore: 0, 
            // lastLoginClaim: serverTimestamp() // Optionally set initial claim timestamp
          };
          if (db) {
            // Add a 'createdAt' field for new users
            await setDoc(userRef, { ...userProfileData, createdAt: serverTimestamp() });
          } else {
            console.error("AuthContext: Firestore service (db) became unavailable.");
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
  }, []);

  if (loading && (typeof window !== 'undefined' && (!auth || !db) && !user )) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-destructive mb-4" />
        <p className="text-lg font-semibold text-destructive">Firebase Services Unavailable</p>
        <p className="text-muted-foreground">The application cannot connect to essential Firebase services.</p>
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
    <AuthContext.Provider value={{ user, loading, isAdmin, updateUserInContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
