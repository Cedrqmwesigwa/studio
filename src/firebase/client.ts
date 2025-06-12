
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, type Analytics } from 'firebase/analytics';

const firebaseConfigValues = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined; // Renamed from 'analyticsInstance' for clarity

function areEssentialConfigsPresent(config: typeof firebaseConfigValues): boolean {
  const requiredKeys: (keyof typeof firebaseConfigValues)[] = [
    'apiKey', 'authDomain', 'projectId', 'appId'
  ];
  let allPresent = true;
  for (const key of requiredKeys) {
    if (!config[key]) {
      console.error(`CRITICAL: Firebase config key "${key}" is missing. Check your .env file and ensure NEXT_PUBLIC_FIREBASE_${key.toUpperCase()} is set.`);
      allPresent = false;
    } else if (config[key]?.startsWith("YOUR_") || config[key]?.startsWith("PASTE_")) {
      console.error(`CRITICAL: Firebase config key "${key}" is using a placeholder value: "${config[key]}". Update your .env file.`);
      allPresent = false;
    }
  }
  return allPresent;
}

function isMeasurementIdValid(measurementId?: string): boolean {
  return !!measurementId && !measurementId.startsWith("YOUR_") && !measurementId.startsWith("PASTE_") && measurementId.length > 0;
}

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    if (areEssentialConfigsPresent(firebaseConfigValues)) {
      try {
        const configForInit: FirebaseOptions = {
            apiKey: firebaseConfigValues.apiKey!,
            authDomain: firebaseConfigValues.authDomain!,
            projectId: firebaseConfigValues.projectId!,
            appId: firebaseConfigValues.appId!,
            // Conditionally add optional values if they are present and valid
            ...(firebaseConfigValues.storageBucket && { storageBucket: firebaseConfigValues.storageBucket }),
            ...(firebaseConfigValues.messagingSenderId && { messagingSenderId: firebaseConfigValues.messagingSenderId }),
            ...(isMeasurementIdValid(firebaseConfigValues.measurementId) && { measurementId: firebaseConfigValues.measurementId! }),
        };
        
        console.log("Attempting to initialize Firebase with config (API key redacted):", {
            ...configForInit,
            apiKey: configForInit.apiKey ? '***REDACTED***' : undefined,
        });

        app = initializeApp(configForInit);
        console.log("Firebase App initialized successfully. Project ID:", app.options.projectId);

        // Initialize Analytics if measurementId is valid
        if (isMeasurementIdValid(configForInit.measurementId)) {
          try {
            analytics = getAnalytics(app);
            console.log("Firebase Analytics initialized successfully. Measurement ID:", configForInit.measurementId);
          } catch (analyticsError) {
            console.error("Firebase Analytics initialization failed:", analyticsError);
          }
        } else {
          console.warn("Firebase Analytics not initialized: Measurement ID is missing, a placeholder, or invalid in .env (NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID).");
        }
      } catch (error) {
        console.error("CRITICAL: Firebase initializeApp() failed.", error);
        console.error("Firebase Project ID from config (check if this is correct):", firebaseConfigValues.projectId);
      }
    } else {
      console.error("Firebase initialization skipped due to missing or placeholder essential configuration values in .env file.");
    }
  } else {
    app = getApp();
    // console.log("Firebase App re-retrieved from existing apps.");
    if (app && isMeasurementIdValid(firebaseConfigValues.measurementId)) {
      try {
        analytics = getAnalytics(app);
        // console.log("Firebase Analytics initialized with existing app.");
      } catch (error) {
         console.error("Failed to initialize Analytics with existing app", error);
      }
    } else if (app) {
        // console.warn("Firebase Analytics not initialized with existing app: Measurement ID is missing or invalid.");
    }
  }
} else {
  // console.warn("Firebase client.ts: Initialization code skipped on the server-side.");
}

let auth, db, storage;
const googleAuthProvider = new GoogleAuthProvider();

if (app) {
  try {
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    // console.log("Firebase Auth, Firestore, and Storage services connected.");
  } catch(serviceError) {
    console.error("Error initializing Firebase services (Auth, Firestore, Storage):", serviceError);
    // auth, db, storage will remain undefined
  }
} else {
  if (typeof window !== 'undefined') {
    console.error("Firebase app was not initialized. Auth, Firestore, and Storage services will be unavailable.");
  }
}

export { app, auth, db, storage, googleAuthProvider, analytics };
