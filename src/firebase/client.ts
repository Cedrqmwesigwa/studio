
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID",
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | undefined;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    // Check if any of the config values are placeholders, which would indicate setup is needed.
    const placeholderKeys: string[] = [];
    if (firebaseConfig.apiKey.startsWith("YOUR_")) placeholderKeys.push('apiKey (NEXT_PUBLIC_FIREBASE_API_KEY)');
    if (firebaseConfig.authDomain.startsWith("YOUR_")) placeholderKeys.push('authDomain (NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)');
    if (firebaseConfig.projectId.startsWith("YOUR_")) placeholderKeys.push('projectId (NEXT_PUBLIC_FIREBASE_PROJECT_ID)');
    if (firebaseConfig.storageBucket.startsWith("YOUR_")) placeholderKeys.push('storageBucket (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)');
    if (firebaseConfig.messagingSenderId.startsWith("YOUR_")) placeholderKeys.push('messagingSenderId (NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)');
    if (firebaseConfig.appId.startsWith("YOUR_")) placeholderKeys.push('appId (NEXT_PUBLIC_FIREBASE_APP_ID)');
    if (firebaseConfig.measurementId.startsWith("YOUR_")) placeholderKeys.push('measurementId (NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID)');

    if (placeholderKeys.length > 0) {
        console.warn(
            "Firebase configuration seems to be using placeholder values for: " +
            placeholderKeys.join(', ') + ". " +
            "Please ensure your .env file is correctly set up with your Firebase project's credentials. " +
            "Using config:", firebaseConfig
        );
    }
    // Initialize Analytics
    if (typeof window !== 'undefined') { // Ensure Analytics is initialized only on the client side
        analytics = getAnalytics(app);
    }

  } catch (error) {
    console.error("CRITICAL: Failed to initialize Firebase App.", error);
    console.error("Firebase config used during failed initialization:", firebaseConfig);
    throw new Error("Firebase initialization failed. Check console for details and verify your .env configuration.");
  }
} else {
  app = getApp();
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleAuthProvider, analytics };
