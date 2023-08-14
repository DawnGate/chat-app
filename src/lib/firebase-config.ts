// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);

export default firebaseApp;
