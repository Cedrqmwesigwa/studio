
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
};

// Initialize Firebase
let app: FirebaseApp;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    // Check if any of the config values are placeholders, which would indicate setup is needed.
    if (Object.values(firebaseConfig).some(value => value.startsWith("YOUR_"))) {
        console.warn(
            "Firebase configuration seems to be using placeholder values. " +
            "Please ensure your .env file is correctly set up with your Firebase project's credentials. " +
            "Using config:", firebaseConfig
        );
    }
  } catch (error) {
    console.error("CRITICAL: Failed to initialize Firebase App.", error);
    console.error("Firebase config used during failed initialization:", firebaseConfig);
    // If app initialization fails, subsequent Firebase services will also fail.
    // You might want to throw an error here or handle it in a way that informs the user.
    // For now, we'll let it proceed so other errors might surface, but auth/db will not work.
    // A default, non-functional app object might be needed if we don't throw.
    // However, getAuth, getFirestore etc. will likely fail if app is undefined or misconfigured.
    // To prevent further errors, we can assign a minimal app object or throw.
    // For now, let's throw to make it clear that Firebase is not usable.
    throw new Error("Firebase initialization failed. Check console for details and verify your .env configuration.");
  }
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleAuthProvider };
