
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
let analytics: Analytics | undefined;

function areEssentialConfigsPresent(config: typeof firebaseConfigValues): boolean {
  const requiredKeys: (keyof typeof firebaseConfigValues)[] = [
    'apiKey', 'authDomain', 'projectId', 'appId'
  ];
  let allPresent = true;
  for (const key of requiredKeys) {
    if (!config[key]) {
      console.error(`CRITICAL: Firebase config key "${key}" is missing (value: ${config[key]}). Check your .env file and ensure NEXT_PUBLIC_FIREBASE_${key.toUpperCase()} is set.`);
      allPresent = false;
    } else if (config[key]?.startsWith("YOUR_")) {
      console.error(`CRITICAL: Firebase config key "${key}" is using a placeholder value: "${config[key]}". Update your .env file.`);
      allPresent = false;
    }
  }
  // Check measurementId separately as it's optional but should not be a placeholder if provided
  if (config.measurementId && config.measurementId.startsWith("YOUR_")) {
      console.warn(`Firebase config key "measurementId" is using a placeholder value: "${config.measurementId}". Analytics might not work correctly.`);
      // Not returning false as measurementId is optional for app init
  }
  return allPresent;
}

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    if (areEssentialConfigsPresent(firebaseConfigValues)) {
      try {
        // Construct a clean config for initializeApp, excluding undefined optional values explicitly
        const configForInit: FirebaseOptions = {
            apiKey: firebaseConfigValues.apiKey!,
            authDomain: firebaseConfigValues.authDomain!,
            projectId: firebaseConfigValues.projectId!,
            appId: firebaseConfigValues.appId!,
        };
        if (firebaseConfigValues.storageBucket) configForInit.storageBucket = firebaseConfigValues.storageBucket;
        if (firebaseConfigValues.messagingSenderId) configForInit.messagingSenderId = firebaseConfigValues.messagingSenderId;
        if (firebaseConfigValues.measurementId && !firebaseConfigValues.measurementId.startsWith("YOUR_")) {
            configForInit.measurementId = firebaseConfigValues.measurementId;
        }

        console.log("Attempting to initialize Firebase with config:", {
            apiKey: configForInit.apiKey ? '***' : undefined,
            authDomain: configForInit.authDomain,
            projectId: configForInit.projectId,
            storageBucket: configForInit.storageBucket,
            messagingSenderId: configForInit.messagingSenderId,
            appId: configForInit.appId,
            measurementId: configForInit.measurementId,
        });

        app = initializeApp(configForInit);
        console.log("Firebase App initialized successfully.");

        if (configForInit.measurementId) {
          analytics = getAnalytics(app);
          console.log("Firebase Analytics initialized.");
        } else {
          console.warn("Firebase Analytics not initialized (measurementId missing, placeholder, or not provided).");
        }
      } catch (error) {
        console.error("CRITICAL: Firebase initializeApp() failed.", error);
        console.error("Firebase config used (some values might be from .env):", firebaseConfigValues.projectId); // Log minimal config
        // app remains undefined, subsequent service initializations will fail
      }
    } else {
      console.error("Firebase initialization skipped due to missing or placeholder essential configuration values.");
      // app remains undefined
    }
  } else {
    app = getApp();
    // console.log("Firebase App re-retrieved from existing apps.");
    if (app && firebaseConfigValues.measurementId && !firebaseConfigValues.measurementId.startsWith("YOUR_")) {
      try {
        analytics = getAnalytics(app);
        // console.log("Firebase Analytics initialized with existing app.");
      } catch (error) {
         console.error("Failed to initialize Analytics with existing app", error);
      }
    }
  }
} else {
  // This console.warn is helpful for developers to understand why Firebase might not be available during SSR/SSG
  // console.warn("Firebase client.ts: Initialization code skipped on the server-side. Firebase services will be undefined during SSR/SSG for this client-module.");
}

// Initialize other Firebase services.
// Using app! will cause a runtime error if 'app' is undefined.
// This clearly indicates that Firebase did not initialize correctly.
let auth, db, storage;
const googleAuthProvider = new GoogleAuthProvider(); // This can be initialized regardless of `app`

if (app) {
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  if (typeof window !== 'undefined') { // Only log this error on the client
    console.error("Firebase app was not initialized. Auth, Firestore, and Storage services will be unavailable.");
  }
  // auth, db, storage will be undefined. Components using them must handle this.
  // Forcing a hard error here by using app! might be preferable in many cases.
  // Let's keep it this way for now to see specific errors from AuthProvider etc.
}


export { app, auth, db, storage, googleAuthProvider, analytics };
